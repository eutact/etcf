const { test, expect } = require("@playwright/test");
const { isolate } = require("./visual-helpers.cjs");

async function open(page, context, path = "/brand-assets.html") {
  await isolate(context);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(path);
  await expect(page.locator(".etcf-cursor")).toHaveAttribute(
    "data-enabled",
    "true",
  );
}

test("the point stays precise, the ring settles at rest and the overlay never captures input", async ({
  page,
  context,
}) => {
  await open(page, context);
  await page.mouse.move(Math.round(page.viewportSize().width * 0.35), 180);
  const cursor = page.locator(".etcf-cursor");
  await expect(cursor).toHaveAttribute("data-visible", "true");
  const destination = Math.round(page.viewportSize().width * 0.6);
  await page.mouse.move(destination, 220);
  const point = await page.locator(".etcf-cursor-point").boundingBox();
  expect(point.x).toBe(destination);
  expect(point.y).toBe(220);
  await expect(cursor).toHaveAttribute("data-moving", "false");
  const ring = await page.locator(".etcf-cursor-follow").boundingBox();
  expect(Math.abs(ring.x - point.x)).toBeLessThan(0.1);
  expect(Math.abs(ring.y - point.y)).toBeLessThan(0.1);
  expect(
    await cursor.evaluate((el) => getComputedStyle(el).pointerEvents),
  ).toBe("none");
  await expect(page.locator("html")).toHaveAttribute(
    "data-custom-cursor",
    "active",
  );
  await page.screenshot({ path: test.info().outputPath("cursor-default.png") });
});

test("copy, download and cards get contextual cues without moving their hit areas", async ({
  page,
  context,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async (value) => (window.copiedColour = value) },
    }),
  );
  await open(page, context);
  const copy = page.getByRole("button", {
    name: "Copy Heritage Indigo hex code #211C5F",
    exact: true,
  });
  await copy.scrollIntoViewIfNeeded();
  await copy.hover();
  const before = await copy.boundingBox();
  const cursor = page.locator(".etcf-cursor");
  await expect(cursor).toHaveAttribute("data-mode", "action");
  await expect(page.locator(".etcf-cursor-caption")).toHaveText("Copy");
  await page.mouse.down();
  await expect(cursor).toHaveAttribute("data-pressed", "true");
  expect(await copy.boundingBox()).toEqual(before);
  await page.screenshot({ path: test.info().outputPath("cursor-copy.png") });
  await page.mouse.up();
  await expect(cursor).toHaveAttribute("data-pressed", "false");
  await expect
    .poll(() => page.evaluate(() => window.copiedColour))
    .toBe("#211C5F");
  const download = page.locator('a[href="/brand/ETCF-Brand-Colours.json"]');
  await download.hover();
  await expect(page.locator(".etcf-cursor-caption")).toHaveText("Download");
  const event = page.waitForEvent("download");
  await download.click();
  expect((await event).suggestedFilename()).toBe("ETCF-Brand-Colours.json");
  await page.locator(".brand-story-card").first().hover();
  await expect(cursor).toHaveAttribute("data-mode", "card");
  await page.keyboard.press("Tab");
  await expect(cursor).toHaveAttribute("data-visible", "false");
  await expect(page.locator("html")).not.toHaveAttribute("data-custom-cursor");
});

test("forms, disabled controls and embedded media keep their native cursors", async ({
  page,
  context,
}) => {
  await open(page, context, "/");
  for (const selector of [
    "#contact-name",
    "#contact-email",
    "#contact-message",
  ]) {
    await page.locator(selector).hover();
    await expect(page.locator("html")).not.toHaveAttribute(
      "data-custom-cursor",
    );
    await expect(page.locator(".etcf-cursor")).toHaveAttribute(
      "data-visible",
      "false",
    );
  }
  await page.locator("#contact-name").fill("Preview visitor");
  await expect(page.locator("#contact-name")).toHaveValue("Preview visitor");
  await page.locator("#my-form-button").hover();
  await expect(page.locator(".etcf-cursor-caption")).toHaveText("Send");
  await page.locator("#my-form-button").evaluate((el) => (el.disabled = true));
  await page.locator("#my-form-button").hover({ force: true });
  await expect(page.locator("html")).not.toHaveAttribute("data-custom-cursor");
  await page.goto("/social-media.html");
  const player = page.locator(".social-video-card").first();
  await player.getByRole("button", { name: "Load YouTube player" }).hover();
  await expect(page.locator(".etcf-cursor-caption")).toHaveText("Play");
  await player.getByRole("button", { name: "Load YouTube player" }).click();
  await player.locator("iframe").hover();
  await expect(page.locator("html")).not.toHaveAttribute("data-custom-cursor");
});

test("motion and contrast preferences restore native input immediately", async ({
  page,
  context,
}) => {
  await open(page, context);
  await page.mouse.move(Math.round(page.viewportSize().width * 0.35), 180);
  await expect(page.locator("html")).toHaveAttribute(
    "data-custom-cursor",
    "active",
  );
  for (const preference of [
    { reducedMotion: "reduce" },
    { reducedMotion: "no-preference", forcedColors: "active" },
  ]) {
    await page.emulateMedia(preference);
    await expect(page.locator(".etcf-cursor")).toHaveAttribute(
      "data-enabled",
      "false",
    );
    await expect(page.locator("html")).not.toHaveAttribute(
      "data-custom-cursor",
    );
    await page.mouse.move(Math.round(page.viewportSize().width * 0.5), 180);
    await expect(page.locator(".etcf-cursor")).toHaveCSS("display", "none");
  }
  await page.emulateMedia({
    reducedMotion: "no-preference",
    forcedColors: "none",
  });
  await expect(page.locator(".etcf-cursor")).toHaveAttribute(
    "data-enabled",
    "true",
  );
  await page.mouse.move(Math.round(page.viewportSize().width * 0.6), 180);
  await expect(page.locator(".etcf-cursor")).toHaveAttribute(
    "data-visible",
    "true",
  );
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  await expect(page.locator("html")).not.toHaveAttribute("data-custom-cursor");
});

test("dynamic controls work and the cursor is shared across every page", async ({
  page,
  context,
}) => {
  await open(page, context);
  for (const path of [
    "/",
    "/gallery.html",
    "/kids-resources.html",
    "/kids-play.html?game=quiz",
    "/privacy-policy.html",
    "/terms.html",
    "/brand-assets.html",
    "/tamil-catholics-canada.html",
    "/registration.html",
    "/social-media.html",
    "/cursor-missing-page",
  ]) {
    await page.goto(path);
    await expect(page.locator(".etcf-cursor")).toHaveCount(1);
    await page.mouse.move(180, 100);
    await expect(page.locator(".etcf-cursor")).toHaveAttribute(
      "data-visible",
      "true",
    );
  }
  await page.goto("/gallery.html");
  const photo = page.locator(".gallery-card button").first();
  await photo.hover();
  await expect(page.locator(".etcf-cursor-caption")).toHaveText("View");
  await photo.click();
  await expect(page.locator("#lightbox")).toBeVisible();
  await page.locator("#close-lightbox").click();
  await expect(page.locator("#lightbox")).toBeHidden();
  await page.goto("/kids-resources.html");
  const tab = page.locator("#tab-paid");
  await tab.hover();
  await expect(page.locator(".etcf-cursor-caption")).toHaveText("Choose");
  await tab.click();
  await expect(tab).toHaveAttribute("aria-selected", "true");
  await page.mouse.move(389, 200);
  if (page.viewportSize().width === 390)
    await expect(page.locator(".etcf-cursor")).toHaveAttribute(
      "data-side",
      "left",
    );
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(page.viewportSize().width);
});

test("touch screens and pages without JavaScript retain their normal pointers", async ({
  browser,
}) => {
  for (const options of [
    {
      hasTouch: true,
      isMobile: true,
      viewport: { width: 390, height: 844 },
      reducedMotion: "no-preference",
    },
    { javaScriptEnabled: false },
  ]) {
    const context = await browser.newContext(options);
    await isolate(context);
    try {
      const page = await context.newPage();
      await page.goto("/registration.html");
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator(".etcf-cursor")).toHaveCSS("display", "none");
      await expect(page.locator("html")).not.toHaveAttribute(
        "data-custom-cursor",
      );
    } finally {
      await context.close();
    }
  }
});
