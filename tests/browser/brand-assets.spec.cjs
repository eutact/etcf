const { test, expect } = require("@playwright/test");
const fs = require("node:fs/promises");
const path = require("node:path");
const brand = require("../../data/brand-assets.json");
const { isolate } = require("./visual-helpers.cjs");

async function open(context, page) {
  await isolate(context);
  await page.goto("/brand-assets.html");
  await page.waitForFunction(
    () => document.documentElement.dataset.etcfReady === "brand-assets",
  );
}

test("logo background preview responds to keyboard and keeps the logo on white", async ({
  context,
  page,
}) => {
  await open(context, page);
  const group = page.getByRole("group", { name: "Logo preview background" });
  for (const value of ["Dark", "Soft", "White"]) {
    const button = group.getByRole("button", { name: value, exact: true });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".brand-preview-stage")).toHaveAttribute(
      "data-background",
      value.toLowerCase(),
    );
    await expect(group.locator('[aria-pressed="true"]')).toHaveCount(1);
    await expect(page.locator(".brand-logo-holder")).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)",
    );
  }
});

test("all colour codes copy accurately and announce the result", async ({
  context,
  page,
}) => {
  await page.addInitScript(() => {
    window.__brandClipboard = [];
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value) => window.__brandClipboard.push(value),
      },
    });
  });
  await open(context, page);
  const colours = [...brand.colours, ...brand.neutrals];
  for (const colour of colours) {
    const button = page.getByRole("button", {
      name: `Copy ${colour.name} hex code ${colour.hex}`,
      exact: true,
    });
    await button.focus();
    await page.keyboard.press("Space");
    await expect(page.locator(".brand-copy-notice")).toHaveText(
      `Copied ${colour.name}: ${colour.hex}.`,
    );
    await expect(button).toBeFocused();
  }
  expect(await page.evaluate(() => window.__brandClipboard)).toEqual(
    colours.map((colour) => colour.hex),
  );
});

test("clipboard denial leaves hex values available for manual copying", async ({
  context,
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("Permission denied");
        },
      },
    });
  });
  await open(context, page);
  await page
    .getByRole("button", {
      name: "Copy Heritage Indigo hex code #211C5F",
      exact: true,
    })
    .click();
  await expect(page.locator(".brand-copy-notice")).toHaveText(
    "Select and copy this code manually: #211C5F.",
  );
  await expect(page.locator(".brand-swatch-paint code").first()).toHaveText(
    "#211C5F",
  );
});

test("logo and guide downloads preserve original bytes and readable formats", async ({
  context,
  page,
}) => {
  await open(context, page);
  const files = [
    ...brand.logos.map((logo) => [logo.url, logo.filename]),
    ["/brand/ETCF-Brand-Colours.json", "ETCF-Brand-Colours.json"],
    ["/brand/ETCF-Brand-Guidelines.txt", "ETCF-Brand-Guidelines.txt"],
  ];
  for (const [url, filename] of files) {
    const event = page.waitForEvent("download");
    await page.locator(`a[download][href="${url}"]`).click();
    const download = await event;
    expect(download.suggestedFilename()).toBe(filename);
    expect(await fs.readFile(await download.path())).toEqual(
      await fs.readFile(path.join(__dirname, "../../public", url)),
    );
  }
  await expect(
    page.locator(`.brand-contact a[href="mailto:${brand.contact}"]`),
  ).toHaveText(brand.contact);
});

test("brand essentials and download links remain available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  await isolate(context);
  try {
    const page = await context.newPage();
    const response = await page.goto("/brand-assets.html");
    expect(response.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".brand-story-card")).toHaveCount(5);
    await expect(page.locator(".brand-swatch code")).toHaveCount(6);
    await expect(page.locator("a[download]")).toHaveCount(4);
    await expect(page.locator(".brand-logo-board img")).toHaveAttribute(
      "loading",
      "eager",
    );
    await expect(page.locator(".brand-contact a")).toHaveAttribute(
      "href",
      `mailto:${brand.contact}`,
    );
  } finally {
    await context.close();
  }
});

test("brand motion respects visibility and reduced-motion preferences", async ({
  context,
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await open(context, page);
  await expect(page.locator(".brand-hero")).toHaveAttribute(
    "data-visible",
    "true",
  );
  expect(
    await page
      .locator(".brand-hero-glow")
      .evaluate((el) => getComputedStyle(el, "::before").animationPlayState),
  ).toBe("running");
  const card = page.locator(".brand-swatch").first();
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveAttribute("data-motion-state", "entered");
  await expect(card).toHaveCSS("opacity", "1");
  await expect(page.locator(".brand-hero")).toHaveAttribute(
    "data-visible",
    "false",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator(".brand-hero-glow")
      .evaluate((el) => getComputedStyle(el, "::before").animationName),
  ).toBe("none");
});
