const { test, expect } = require("@playwright/test");
const { PNG } = require("pngjs");
const path = require("node:path");
let pixelmatch;
test.beforeAll(async () => {
  pixelmatch = (await import("pixelmatch")).default;
});

async function isolate(context, event = null) {
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (["127.0.0.1", "localhost"].includes(url.hostname))
      return route.continue();
    if (url.hostname === "unpkg.com")
      return route.fulfill({
        path: path.resolve("node_modules/@sanity/client/umd/sanityClient.js"),
        contentType: "text/javascript",
      });
    if (url.hostname.endsWith(".sanity.io")) {
      const query = url.searchParams.get("query") || "";
      const result = query.includes("tickerCard")
        ? []
        : query.includes("annualCalendar")
          ? null
          : event;
      return route.fulfill({
        contentType: "application/json",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ result }),
      });
    }
    // External embeds and font CDNs are excluded from reproducible layout checks.
    return route.abort();
  });
}

async function ready(page, file, next) {
  if (next)
    await page.waitForFunction(
      () => document.documentElement.dataset.etcfReady,
    );
  else if (file === "gallery.html")
    await expect(page.locator(".gallery-card")).toHaveCount(270);
  else if (file.startsWith("kids-"))
    await expect(page.locator(".kids-activity-card")).toHaveCount(3);
  if (file === "index.html")
    await expect(page.locator("#event-empty")).toBeVisible();
  if (file === "gallery.html")
    await page.locator("#gallery-container img").evaluateAll((images) =>
      Promise.all(
        images
          .filter((image) => !image.closest(".gallery-fallback"))
          .slice(0, 40)
          .map((image) => {
            image.loading = "eager";
            return image.decode().catch(() => {});
          }),
      ),
    );
  await page.evaluate(() => document.fonts.ready);
}

const sections = {
  "index.html": [
    "#navbar",
    "#home",
    "#home + section",
    "#event-section",
    "#our-year-together",
    "#about",
    "#mission",
    "#executive-committee",
    "#past-committee",
    "#contact",
    "#newsletter-form",
    "footer",
  ],
  "gallery.html": ["#navbar", ".page-hero", "#gallery", "footer"],
  "kids-resources.html": [
    "#navbar",
    ".page-hero",
    "#kids-activities",
    "#free-section",
    "footer",
  ],
  "kids-play.html": [".game-topbar", ".game-main"],
  "privacy-policy.html": ["#navbar", ".page-hero", ".legal-content", "footer"],
  "terms.html": ["#navbar", ".page-hero", ".legal-content", "footer"],
};

for (const [file, selectors] of Object.entries(sections))
  test(`${file} preserves the original design`, async ({
    context,
    page,
  }, info) => {
    await isolate(context);
    const before = await context.newPage();
    if (file === "gallery.html") {
      // Keep the full gallery screenshot crop in view so WebKit paints the same
      // JPEG resolution in both pages instead of comparing off-screen previews.
      for (const target of [before, page])
        await target.setViewportSize({
          ...target.viewportSize(),
          height: 2200,
        });
    }
    const applicationErrors = [];
    page.on("pageerror", (error) => applicationErrors.push(error.message));
    const responses = await Promise.all([
      before.goto(`http://localhost:8004/${file}`),
      page.goto(`/${file}`),
    ]);
    for (const response of responses) expect(response.status()).toBe(200);
    await Promise.all([ready(before, file, false), ready(page, file, true)]);
    const text = async (p) =>
      p.evaluate(() => {
        const body = document.body.cloneNode(true);
        for (const node of body.querySelectorAll(
          "script, style, next-route-announcer",
        ))
          node.remove();
        return body.textContent.replace(/\s+/g, " ").trim();
      });
    expect(await text(page)).toBe(await text(before));
    expect(await page.title()).toBe(await before.title());
    for (let i = 0; i < selectors.length; i++) {
      const selector = selectors[i],
        captures = [],
        dimensions = [];
      for (const p of [before, page]) {
        const element = p.locator(selector).first();
        await element.scrollIntoViewIfNeeded();
        await element
          .locator("img")
          .evaluateAll((images) =>
            Promise.all(
              images.slice(0, 8).map((image) => image.decode().catch(() => {})),
            ),
          );
        const box = await element.boundingBox();
        dimensions.push({
          width: Math.round(box.width * 100),
          height: Math.round(box.height * 100),
        });
        const style = `${selector === "#navbar" ? "" : "#navbar{visibility:hidden!important}"}iframe{visibility:hidden!important}${box.height > 2000 ? `${selector}{max-height:2000px!important;overflow:hidden!important}` : ""}`;
        captures.push(
          await element.screenshot({ animations: "disabled", style }),
        );
      }
      expect(dimensions[1], selector).toEqual(dimensions[0]);
      const [a, b] = captures.map((buffer) => PNG.sync.read(buffer));
      expect([b.width, b.height], selector).toEqual([a.width, a.height]);
      const different = pixelmatch(a.data, b.data, null, a.width, a.height, {
        threshold: 0.05,
        includeAA: false,
      });
      if (different) {
        await info.attach(`${i}-before`, {
          body: captures[0],
          contentType: "image/png",
        });
        await info.attach(`${i}-next`, {
          body: captures[1],
          contentType: "image/png",
        });
      }
      expect(different, `${selector} changed pixels`).toBe(0);
    }
    expect(applicationErrors).toEqual([]);
    await before.close();
  });

test("committee disclosures, calendar tabs, and mobile menu remain usable", async ({
  context,
  page,
}) => {
  await isolate(context);
  await page.goto("/");
  await ready(page, "index.html", true);
  const recent = page.locator(".committee-history--recent");
  await expect(recent).not.toHaveAttribute("open");
  await expect(recent.locator("summary")).toContainText("2023–2026");
  await recent.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(recent).toHaveAttribute("open", "");
  await expect(recent.locator(".history-roster > div")).toHaveCount(12);
  await expect(page.locator(".committee-roster > li").nth(1)).toContainText(
    "Juliet Mohanan (Jasmine)",
  );
  await page.getByRole("tab", { name: /^March/ }).click();
  await expect(page.locator("#month-march")).toBeVisible();
  if (await page.locator("#menu-btn").isVisible()) {
    await page.evaluate(() => scrollTo(0, 0));
    await page.locator("#menu-btn").click();
    await expect(page.locator("#menu-btn")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await page.keyboard.press("Escape");
    await expect(page.locator("#menu-btn")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  }
});

test("gallery filters and lightbox remain usable", async ({
  context,
  page,
}) => {
  await isolate(context);
  await page.goto("/gallery.html");
  await ready(page, "gallery.html", true);
  await page.getByRole("button", { name: "2022", exact: true }).click();
  await expect(page.locator(".gallery-card")).toHaveCount(55);
  await page
    .locator("#gallery-container button:not([disabled])")
    .first()
    .click();
  await expect(page.locator("#lightbox")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#lightbox-caption")).toContainText("photo 2");
  await page.keyboard.press("Escape");
  await expect(page.locator("#lightbox")).toBeHidden();
});

test("all past committee boxes start collapsed and reset after returning", async ({
  context,
  page,
}) => {
  await isolate(context);
  const boxes = page.locator("#past-committee details");
  const expectCollapsed = async () => {
    await expect(boxes).toHaveCount(5);
    for (const box of await boxes.all()) {
      await expect(box).not.toHaveAttribute("open");
      await expect(box.locator(".history-content")).toBeHidden();
    }
  };
  await page.goto("/");
  await ready(page, "index.html", true);
  await expectCollapsed();
  const recent = page.locator(".committee-history--recent");
  await recent.locator("summary").click();
  await expect(recent.locator(".history-content")).toBeVisible();
  await page.reload();
  await ready(page, "index.html", true);
  await expectCollapsed();
  for (const summary of await boxes.locator("summary").all())
    await summary.click();
  await page.goto("/gallery.html");
  await ready(page, "gallery.html", true);
  await page.goBack();
  await ready(page, "index.html", true);
  await expectCollapsed();
  // Exercise the pageshow reset even when automation disables the back/forward cache.
  await recent.locator("summary").click();
  await expect(recent.locator(".history-content")).toBeVisible();
  await page.evaluate(() =>
    window.dispatchEvent(
      new PageTransitionEvent("pageshow", { persisted: true }),
    ),
  );
  await expectCollapsed();
  await recent.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(recent.locator(".history-content")).toBeVisible();
});

test("navigation works immediately after load and footer actions keep the current URL", async ({
  context,
  page,
}) => {
  await isolate(context);
  await page.goto("/", { waitUntil: "load" });
  if (await page.locator("#menu-btn").isVisible()) {
    await page.locator("#menu-btn").click();
    await expect(page.locator("#menu-btn")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await page.locator("#menu-close").click();
    await expect(page.locator("#menu-btn")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  }
  await ready(page, "index.html", true);
  page.on("dialog", (dialog) => dialog.dismiss());
  const url = page.url();
  await page.getByRole("link", { name: "Donate Now", exact: true }).click();
  await expect(page).toHaveURL(url);
});

test("contact and newsletter submissions are handled without live delivery", async ({
  context,
  page,
}) => {
  await isolate(context);
  let status = 200;
  await page.route("https://formspree.io/**", (route) =>
    route.fulfill({ status, contentType: "application/json", body: "{}" }),
  );
  await page.route("https://*.m.pipedream.net/**", (route) =>
    route.fulfill({ status: 200, body: "Thank you for subscribing." }),
  );
  await page.goto("/");
  await ready(page, "index.html", true);
  for (const expected of [/Thanks for your submission/, /problem submitting/]) {
    await page.getByLabel("Name", { exact: true }).fill("Local test");
    await page.getByLabel("Email", { exact: true }).fill("qa@example.invalid");
    await page.getByLabel("Message", { exact: true }).fill("Intercepted test");
    await page.locator("#my-form-button").click();
    await expect(page.locator("#popup-text")).toHaveText(expected);
    await page.locator("#popup-message button").click();
    status = 500;
  }
  await page.locator("#subscription-form input").fill("qa@example.invalid");
  await page.locator("#subscription-form button").click();
  await expect(page.locator("#response-message")).toContainText("Thank you");
});

for (const [game, topic] of [
  ["quiz", "creation"],
  ["match", "characters"],
  ["order", "five-thousand"],
])
  test(`${game} game deep link works`, async ({ context, page }) => {
    await isolate(context);
    await page.goto(`/kids-play.html?game=${game}&topic=${topic}`);
    await page.waitForFunction(
      () => document.documentElement.dataset.etcfReady,
    );
    await page
      .getByRole("button", { name: "Let’s begin", exact: true })
      .click();
    await expect(page.locator("[data-kids-games] .kids-stage")).toBeVisible();
    await page.locator("[data-game-more]").click();
    await page.locator("[data-game-help]").click();
    await expect(page.locator("[data-game-dialog]")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("[data-game-dialog]")).not.toBeVisible();
    await expect(page.locator("[data-game-more]")).toBeFocused();
    await page.locator("[data-game-more]").click();
    await page.locator("[data-game-exit]").focus();
    await expect(page.locator("[data-game-more]")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
