const { test, expect } = require("@playwright/test");
const { isolate } = require("./visual-helpers.cjs");
async function open(page, context, path = "/kids-resources.html") {
  await isolate(context);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(path);
  await expect(page.locator("html")).toHaveAttribute(
    "data-site-motion",
    "ready",
  );
}

test("a quick pointer press gives feedback while the action runs immediately", async ({
  page,
  context,
}) => {
  await open(page, context);
  const button = page.locator("#tab-paid");
  await button.scrollIntoViewIfNeeded();
  await button.hover();
  await page.mouse.down();
  await expect(button).toHaveAttribute("data-motion-pressed", "true");
  await expect(button).toHaveAttribute("aria-selected", "false");
  await page.mouse.up();
  await expect(button).toHaveAttribute("aria-selected", "true");
  await expect(button).not.toHaveAttribute("data-motion-pressed");
  await expect
    .poll(() => button.evaluate((e) => getComputedStyle(e).opacity))
    .toBe("1");
});

test("button hit areas stay fixed and border clicks activate reliably", async ({
  page,
  context,
}) => {
  await open(page, context);
  const button = page.locator("#tab-paid");
  await button.scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    window.__clicks = 0;
    document
      .querySelector("#tab-paid")
      .addEventListener("click", () => window.__clicks++);
  });
  let expected = 0;
  for (const edge of ["left", "right", "top", "bottom"]) {
    await page.mouse.move(1, 1);
    await expect
      .poll(() => button.evaluate((e) => getComputedStyle(e).opacity))
      .toBe("1");
    const before = await button.boundingBox();
    const x =
      edge === "left"
        ? before.x + 1
        : edge === "right"
          ? before.x + before.width - 1
          : before.x + before.width / 2;
    const y =
      edge === "top"
        ? before.y + 1
        : edge === "bottom"
          ? before.y + before.height - 1
          : before.y + before.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await expect
      .poll(() => button.evaluate((e) => Number(getComputedStyle(e).opacity)))
      .toBeLessThan(0.9);
    const held = await button.boundingBox();
    expect(held).toEqual(before);
    await page.mouse.up();
    await expect
      .poll(() => page.evaluate(() => window.__clicks))
      .toBe(++expected);
    await expect(button).not.toHaveAttribute("data-motion-pressed");
  }
});

test("keyboard Enter and Space keep native activation and visible focus", async ({
  page,
  context,
}) => {
  await open(page, context);
  await page.keyboard.press("Tab");
  for (const [id, key] of [
    ["tab-paid", "Enter"],
    ["tab-free", " "],
  ]) {
    const button = page.locator(`#${id}`);
    await button.focus();
    expect(await button.evaluate((e) => e.matches(":focus-visible"))).toBe(
      true,
    );
    await page.keyboard.down(key);
    await expect(button).toHaveAttribute("data-motion-pressed", "true");
    await page.keyboard.up(key);
    await expect(button).toHaveAttribute("aria-selected", "true");
    await expect(button).not.toHaveAttribute("data-motion-pressed");
    await expect(button).toBeFocused();
    expect(
      await button.evaluate((e) => getComputedStyle(e).outlineStyle),
    ).not.toBe("none");
  }
});

test("touch cancellation, leaving a button, and losing focus clear pressed states", async ({
  page,
  context,
}) => {
  await open(page, context);
  const button = page.locator("#tab-paid");
  const pointer = {
    pointerId: 7,
    pointerType: "touch",
    isPrimary: true,
    button: 0,
  };
  await button.dispatchEvent("pointerdown", pointer);
  await expect(button).toHaveAttribute("data-motion-pressed", "true");
  await button.dispatchEvent("pointercancel", pointer);
  await expect(button).not.toHaveAttribute("data-motion-pressed");
  await button.hover();
  await page.mouse.down();
  await expect(button).toHaveAttribute("data-motion-pressed", "true");
  await page.mouse.move(1, 1);
  await expect(button).not.toHaveAttribute("data-motion-pressed");
  await page.mouse.up();
  await button.focus();
  await page.keyboard.down(" ");
  await expect(button).toHaveAttribute("data-motion-pressed", "true");
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  await expect(button).not.toHaveAttribute("data-motion-pressed");
  await page.keyboard.up(" ");
});

test("disabled controls and reduced motion do not receive press effects", async ({
  page,
  context,
}) => {
  await open(page, context);
  const button = page.locator("#tab-paid");
  await button.evaluate((e) => {
    e.disabled = true;
  });
  await button.dispatchEvent("pointerdown", {
    pointerId: 1,
    isPrimary: true,
    button: 0,
  });
  await expect(button).not.toHaveAttribute("data-motion-pressed");
  await button.evaluate((e) => {
    e.disabled = false;
    e.setAttribute("aria-disabled", "true");
  });
  await button.dispatchEvent("pointerdown", {
    pointerId: 1,
    isPrimary: true,
    button: 0,
  });
  await expect(button).not.toHaveAttribute("data-motion-pressed");
  await button.evaluate((e) => e.removeAttribute("aria-disabled"));
  await button.hover();
  await page.mouse.down();
  await expect(button).toHaveAttribute("data-motion-pressed", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(button).not.toHaveAttribute("data-motion-pressed");
  await expect
    .poll(() => button.evaluate((e) => getComputedStyle(e).opacity))
    .toBe("1");
  await page.mouse.up();
  await button.click();
  await expect(button).toHaveAttribute("aria-selected", "true");
  await expect(button).not.toHaveAttribute("data-motion-pressed");
});

test("dynamically created game buttons stay interactive and page exit clears effects", async ({
  page,
  context,
}) => {
  await open(page, context, "/kids-play.html?game=quiz&topic=creation");
  await page.getByRole("button", { name: "Let’s begin", exact: true }).click();
  const button = page.locator("[data-game-more]");
  await button.hover();
  await page.mouse.down();
  await expect(button).toHaveAttribute("data-motion-pressed", "true");
  await page.mouse.up();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(button).not.toHaveAttribute("data-motion-pressed");
  const help = page.locator("[data-game-help]");
  await help.dispatchEvent("pointerdown", {
    pointerId: 1,
    isPrimary: true,
    button: 0,
  });
  await expect(help).toHaveAttribute("data-motion-pressed", "true");
  await page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
  await expect(page.locator("[data-motion-pressed]")).toHaveCount(0);
  // The game also closes its menu when a page is hidden. Reopen it on return.
  await button.click();
  await help.click();
  await expect(page.locator("[data-game-dialog]")).toBeVisible();
});
