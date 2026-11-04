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

test("individual policy sections enter smoothly without changing layout geometry", async ({
  page,
  context,
}) => {
  await isolate(context);
  await trackAnimations(page);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/privacy-policy.html");
  await expect(page.locator("html")).toHaveAttribute(
    "data-site-motion",
    "ready",
  );
  const point = page.locator(".legal-content > div > div").last();
  const before = await point.evaluate((e) => ({
    width: e.offsetWidth,
    height: e.offsetHeight,
    top: e.offsetTop,
  }));
  await point.scrollIntoViewIfNeeded();
  await expect(point).toHaveAttribute("data-motion-state", "entered");
  await expect
    .poll(() => point.evaluate((e) => getComputedStyle(e).opacity))
    .toBe("1");
  const details = await point.evaluate((e) => {
    const item = window.__entrances.find((item) => item.target === e);
    return {
      layout: {
        width: e.offsetWidth,
        height: e.offsetHeight,
        top: e.offsetTop,
      },
      frames: item.animation.effect.getKeyframes(),
      timing: item.animation.effect.getTiming(),
    };
  });
  expect(details.layout).toEqual(before);
  expect(details.timing.duration).toBeLessThanOrEqual(640);
  expect(details.timing.delay).toBeLessThanOrEqual(210);
  for (const frame of details.frames)
    expect(
      Object.keys(frame).every((key) =>
        [
          "opacity",
          "transform",
          "offset",
          "computedOffset",
          "easing",
          "composite",
        ].includes(key),
      ),
    ).toBe(true);
  await page.locator(".page-hero").scrollIntoViewIfNeeded();
  await point.scrollIntoViewIfNeeded();
  expect(
    await point.evaluate(
      (e) => window.__entrances.filter((item) => item.target === e).length,
    ),
  ).toBe(1);
});

test("a failed animation engine leaves content and controls usable", async ({
  page,
  context,
}) => {
  await isolate(context);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Element.prototype.animate = () => {
      throw new Error("Animation engine unavailable");
    };
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute(
    "data-site-motion",
    "ready",
  );
  const person = page.locator(".committee-person").first();
  await person.scrollIntoViewIfNeeded();
  await expect(person).toHaveAttribute("data-motion-state", "entered");
  expect(await person.evaluate((e) => getComputedStyle(e).opacity)).toBe("1");
  await page.locator("#tab-march").click();
  await expect(page.locator("#tab-march")).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(errors).toEqual([]);
});

test("page hiding settles entrances and returning does not replay completed content", async ({
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
  await page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
  expect(
    await page.evaluate(
      () =>
        window.__entrances.filter(
          (item) => item.animation.playState === "running",
        ).length,
    ),
  ).toBe(0);
  expect(await person.evaluate((e) => getComputedStyle(e).opacity)).toBe("1");
  await page.evaluate(() =>
    window.dispatchEvent(
      new PageTransitionEvent("pageshow", { persisted: true }),
    ),
  );
  await page.locator("#about").scrollIntoViewIfNeeded();
  await person.scrollIntoViewIfNeeded();
  expect(
    await person.evaluate(
      (e) => window.__entrances.filter((item) => item.target === e).length,
    ),
  ).toBe(1);
});
