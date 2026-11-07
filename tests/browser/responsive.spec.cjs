const { test, expect } = require("@playwright/test");
const {
  isolate,
  settleLayout,
  horizontalOverflow,
} = require("./visual-helpers.cjs");
const sizes = [
  [280, 640],
  [320, 640],
  [360, 800],
  [375, 667],
  [390, 844],
  [412, 915],
  [640, 800],
  [768, 1024],
  [820, 1180],
  [1024, 768],
  [1280, 800],
  [1440, 900],
  [1536, 864],
  [1920, 1080],
  [2560, 1440],
  [3440, 1440],
  [844, 390],
];
for (const file of [
  "index.html",
  "gallery.html",
  "kids-resources.html",
  "privacy-policy.html",
  "terms.html",
  "tamil-catholics-canada.html",
  "brand-assets.html",
  "kids-play.html?game=quiz",
]) {
  test(`${file} fits phones, tablets, wide screens and landscape`, async ({
    page,
    context,
  }) => {
    await isolate(context);
    await page.goto(`/${file}`);
    await page.waitForFunction(
      () => document.documentElement.dataset.etcfReady,
    );
    const credit = page.locator(".footer-credit a");
    await expect(credit).toHaveCount(1);
    await expect(credit).toHaveAttribute("href", "https://labs.rubangino.ca/");
    await expect(credit).toHaveAttribute("rel", "noopener noreferrer");
    if (file === "index.html") {
      await expect(page.locator("#event-title")).toHaveText(
        "November 2026 - Tamil Mass",
      );
      await expect
        .poll(() =>
          page
            .locator("#event-image")
            .evaluate((image) => image.complete && image.naturalWidth),
        )
        .toBeGreaterThan(0);
    }
    for (const [width, height] of sizes) {
      await page.setViewportSize({ width, height });
      await settleLayout(page);
      expect(
        await horizontalOverflow(page),
        `${width}x${height}: overflowing content`,
      ).toEqual([]);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
      const creditSize = await credit.boundingBox();
      // Firefox can report 43.99994 for a 44px target at fractional offsets.
      expect(Math.round(creditSize.height * 100) / 100).toBeGreaterThanOrEqual(44);
      expect(creditSize.x).toBeGreaterThanOrEqual(0);
      expect(creditSize.x + creditSize.width).toBeLessThanOrEqual(width + 1);
      if (file === "index.html") {
        const poster = await page.locator("#event-image").evaluate((image) => ({
          width: image.clientWidth,
          height: image.clientHeight,
          ratio: image.naturalHeight / image.naturalWidth,
        }));
        expect(
          Math.abs(poster.height - poster.width * poster.ratio),
        ).toBeLessThanOrEqual(1);
        expect(poster.height).toBeLessThanOrEqual(
          Math.min(height * 0.62, 576) + 1,
        );
        // A compact poster should still make useful use of the available space.
        expect(poster.width).toBeGreaterThan(
          Math.min(width * 0.4, height * 0.25, 200),
        );
      }
    }
  });
}

test("landscape navigation and gallery controls stay reachable", async ({
  page,
  context,
}) => {
  await isolate(context);
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/gallery.html");
  await page.waitForFunction(() => document.documentElement.dataset.etcfReady);
  await page.locator("#menu-btn").click();
  const contact = page.locator("#mobile-menu a[data-nav=contact]");
  await contact.scrollIntoViewIfNeeded();
  await expect(contact).toBeInViewport();
  await page.keyboard.press("Escape");
  await page
    .locator("#gallery-container button:not([disabled])")
    .first()
    .click();
  for (const id of ["close-lightbox", "prev-lightbox", "next-lightbox"])
    await expect(page.locator(`#${id}`)).toBeInViewport();
  await page.keyboard.press("Escape");
  await expect(page.locator("#lightbox")).toBeHidden();
});
