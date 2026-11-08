const { test, expect } = require("@playwright/test");
const errors = require("../../data/error-pages.json");
const {
  isolate,
  horizontalOverflow,
  settleLayout,
} = require("./visual-helpers.cjs");

test("error preview routes are unavailable as ordinary public pages", async ({
  request,
}) => {
  for (const name of ["error-pages", ...Object.keys(errors)]) {
    for (const suffix of ["", ".html"]) {
      const response = await request.get(`/${name}${suffix}`);
      expect(response.status(), `${name}${suffix}`).toBe(404);
      expect(await response.text()).toContain('data-error="404"');
      expect(response.headers()["x-robots-tag"]).toContain("noindex");
    }
  }
});

test("missing nested URLs return the branded 404 with working absolute links", async ({
  page,
  context,
}) => {
  await isolate(context);
  const failures = [];
  page.on("pageerror", (error) => failures.push(error.message));
  const response = await page.goto("/a/missing/deep/page?source=test");
  expect(response.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText(errors["404"].title);
  await expect(page.locator(".error-logo img")).toHaveJSProperty(
    "naturalWidth",
    926,
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, follow",
  );
  await expect(page.locator(".error-motion-toggle")).toHaveCount(0);
  await page.getByRole("link", { name: "Back to home" }).click();
  await expect(page).toHaveURL(/:8003\/$/);
  await expect(page.locator("#home")).toBeVisible();
  expect(failures).toEqual([]);
});

test("error motion loops without controls and respects live preferences and visibility", async ({
  page,
  context,
}) => {
  await isolate(context);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/missing-motion-check");
  const ring = page.locator(".error-ring-outer");
  const looping = await ring.evaluate((el) => {
    const animation = el.getAnimations()[0];
    animation.currentTime = 33000;
    return {
      iterations: animation.effect.getTiming().iterations,
      state: animation.playState,
    };
  });
  expect(looping.iterations).toBe(Infinity);
  expect(looping.state).toBe("running");
  await expect(page.getByRole("button")).toHaveCount(0);
  for (const hidden of [true, false]) {
    await page.evaluate((hidden) => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        value: hidden,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    }, hidden);
    expect(
      await ring.evaluate((el) => getComputedStyle(el).animationPlayState),
    ).toBe(hidden ? "paused" : "running");
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await ring.evaluate((el) => el.getAnimations().length)).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  expect(await ring.evaluate((el) => el.getAnimations()[0].playState)).toBe(
    "running",
  );
});

test("a rendering failure shows recovery without private details and reload retries the URL", async ({
  page,
  context,
}) => {
  await isolate(context);
  await page.addInitScript(() => {
    const original = Array.prototype.map;
    const failThisDocument = !sessionStorage.getItem("error-boundary-tested");
    Array.prototype.map = function (...args) {
      if (failThisDocument && this[0]?.hex === "#211C5F") {
        sessionStorage.setItem("error-boundary-tested", "true");
        throw new Error(
          "Intentional rendering failure with private diagnostics",
        );
      }
      return original.apply(this, args);
    };
  });
  await page.goto("/brand-assets.html?source=recovery");
  await expect(page.locator(".error-page")).toHaveAttribute(
    "data-error",
    "client-error",
  );
  await expect(page.locator("h1")).toHaveText(errors["client-error"].title);
  await expect(page.locator("body")).not.toContainText("private diagnostics");
  await expect(page.locator(".error-motion-toggle")).toHaveCount(0);
  await Promise.all([
    page.waitForEvent("load"),
    page.getByRole("button", { name: "Try again" }).click(),
  ]);
  await expect(page).toHaveURL(/\/brand-assets\.html\?source=recovery$/);
  await expect(page.locator("#brand-story")).toBeVisible();
});

test("the genuine 404 fits narrow phones, tablets and wide screens", async ({
  page,
  context,
}, testInfo) => {
  await isolate(context);
  await page.goto("/responsive-error-check");
  for (const [width, height] of [
    [280, 640],
    [320, 640],
    [390, 844],
    [640, 800],
    [768, 1024],
    [1024, 768],
    [1440, 1000],
    [2560, 1440],
    [3440, 1440],
    [844, 390],
  ]) {
    await page.setViewportSize({ width, height });
    await settleLayout(page);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width + 1);
    expect(
      (await horizontalOverflow(page)).filter(
        (item) => !/error-(ambient|ring|star|orbit|art)/.test(item),
      ),
      `${width}`,
    ).toEqual([]);
    await expect(page.locator("h1")).toBeVisible();
  }
  await page.setViewportSize(
    testInfo.project.name.includes("phone")
      ? { width: 390, height: 844 }
      : { width: 1440, height: 1000 },
  );
  await page.screenshot({
    path: testInfo.outputPath("error-page.png"),
    fullPage: true,
  });
});

test("error content and recovery links work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  await isolate(context);
  try {
    const page = await context.newPage();
    const response = await page.goto("/deeply/missing/page");
    expect(response.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText(errors["404"].title);
    await expect(page.locator(".error-motion-toggle")).toHaveCount(0);
    await page.getByRole("link", { name: "Back to home" }).click();
    await expect(page.locator("#home")).toBeVisible();
  } finally {
    await context.close();
  }
});
