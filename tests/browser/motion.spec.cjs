const { test, expect } = require("@playwright/test");
const { isolate } = require("./visual-helpers.cjs");
async function trackAnimations(page) {
  await page.addInitScript(() => {
    window.__entrances = [];
    const original = Element.prototype.animate;
    Element.prototype.animate = function (...args) {
      const animation = original.apply(this, args);
      window.__entrances.push({ target: this, animation });
      return animation;
    };
  });
}

test("entrances run once, keyboard focus stays visible, and changing motion preference stops them", async ({
  page,
  context,
}) => {
  await isolate(context);
  await trackAnimations(page);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute(
    "data-site-motion",
    "ready",
  );
  const person = page.locator(".committee-person").first();
  await person.scrollIntoViewIfNeeded();
  await expect(person).toHaveAttribute("data-motion-state", "entered");
  await expect
    .poll(() => person.evaluate((element) => getComputedStyle(element).opacity))
    .toBe("1");
  await page.locator("#about").scrollIntoViewIfNeeded();
  await person.scrollIntoViewIfNeeded();
  expect(
    await person.evaluate(
      (element) =>
        window.__entrances.filter((item) => item.target === element).length,
    ),
  ).toBe(1);
  await page.locator("#my-form").scrollIntoViewIfNeeded();
  await page.locator("#my-form input").first().focus();
  expect(
    await page
      .locator("#my-form")
      .evaluate((element) => getComputedStyle(element).opacity),
  ).toBe("1");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute(
    "data-site-motion",
    "reduced",
  );
  expect(
    await page.evaluate(
      () =>
        window.__entrances.filter(
          (item) => item.animation.playState === "running",
        ).length,
    ),
  ).toBe(0);
});

test("new gallery results receive entrances after filtering", async ({
  page,
  context,
}) => {
  await isolate(context);
  await trackAnimations(page);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/gallery.html");
  await expect(page.locator("html")).toHaveAttribute(
    "data-site-motion",
    "ready",
  );
  await page.getByRole("button", { name: "2022", exact: true }).click();
  await expect(page.locator(".gallery-card")).toHaveCount(55);
  const first = page.locator(".gallery-card").first();
  await first.scrollIntoViewIfNeeded();
  await expect(first).toHaveAttribute("data-motion-state", "entered");
  await expect
    .poll(() => first.evaluate((element) => getComputedStyle(element).opacity))
    .toBe("1");
  await first.locator("button").click();
  await expect(page.locator("#lightbox")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#lightbox")).toBeHidden();
});

test("reduced motion leaves all content readable without entrance animations", async ({
  page,
  context,
}) => {
  await isolate(context);
  await trackAnimations(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/privacy-policy.html");
  await expect(page.locator("html")).toHaveAttribute(
    "data-site-motion",
    "reduced",
  );
  const policy = page.locator(".legal-content");
  await policy.scrollIntoViewIfNeeded();
  await expect(policy).toBeVisible();
  expect(
    await policy.evaluate((element) => getComputedStyle(element).opacity),
  ).toBe("1");
  expect(await page.evaluate(() => window.__entrances.length)).toBe(0);
});

test("content stays visible when the browser cannot run viewport animations", async ({
  page,
  context,
}) => {
  await isolate(context);
  await page.addInitScript(() => {
    window.IntersectionObserver = undefined;
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute(
    "data-site-motion",
    "unsupported",
  );
  const section = page.locator("#about");
  await section.scrollIntoViewIfNeeded();
  await expect(section).toBeVisible();
  expect(
    await section.evaluate((element) => getComputedStyle(element).opacity),
  ).toBe("1");
  await expect(page.locator(".reveal")).toHaveCount(0);
});
