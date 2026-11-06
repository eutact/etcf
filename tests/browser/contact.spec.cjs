const { test, expect } = require("@playwright/test");
const { isolate } = require("./visual-helpers.cjs");

async function openForm(context, page, motion = "reduce") {
  await isolate(context);
  await page.emulateMedia({ reducedMotion: motion });
  await page.goto("/#contact");
  await page.waitForFunction(() => document.documentElement.dataset.etcfReady);
  await page.locator("#my-form").scrollIntoViewIfNeeded();
}
async function fillForm(page) {
  await page.getByLabel("Name", { exact: true }).fill("Contact QA");
  await page.getByLabel("Email", { exact: true }).fill("qa@example.invalid");
  await page
    .getByLabel("Message", { exact: true })
    .fill("Intercepted test message");
}

test("validation blocks empty or invalid input without sending", async ({
  context,
  page,
}) => {
  await openForm(context, page);
  let deliveries = 0;
  await page.route("https://formspree.io/**", (route) => {
    deliveries++;
    return route.fulfill({ status: 200, body: "{}" });
  });
  await page.locator("#my-form-button").click();
  expect(
    await page
      .locator("#contact-name")
      .evaluate((el) => el.validity.valueMissing),
  ).toBe(true);
  await fillForm(page);
  await page.getByLabel("Email", { exact: true }).fill("invalid-email");
  await page.locator("#my-form-button").click();
  expect(
    await page
      .locator("#contact-email")
      .evaluate((el) => el.validity.typeMismatch),
  ).toBe(true);
  expect(deliveries).toBe(0);
  await expect(page.locator("#my-form")).toHaveAttribute("data-state", "idle");
});

test("sending is immediate, prevents duplicates and confirms actual success", async ({
  context,
  page,
}) => {
  await openForm(context, page, "no-preference");
  let deliveries = 0;
  let release;
  const pending = new Promise((resolve) => {
    release = resolve;
  });
  let payload;
  await page.route("https://formspree.io/**", async (route) => {
    deliveries++;
    payload = route.request().postData();
    await pending;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: "{}",
    });
  });
  await fillForm(page);
  const button = page.locator("#my-form-button");
  const box = await button.boundingBox();
  await button.click();
  await expect(page.locator("#my-form")).toHaveAttribute("aria-busy", "true");
  await expect(button).toBeDisabled();
  await expect(button).toHaveText("Sending…");
  await expect(page.locator("#contact-name")).toBeDisabled();
  await expect(page.locator("#contact-status")).toContainText(
    "Sending your message",
  );
  await page.locator("#my-form").evaluate((form) => {
    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );
  });
  await expect.poll(() => deliveries).toBe(1);
  expect(payload).toContain("Contact QA");
  expect(payload).toContain("qa@example.invalid");
  expect(payload).toContain("Intercepted test message");
  expect(await button.boundingBox()).toEqual(box);
  release();
  await expect(page.locator("#my-form")).toHaveAttribute(
    "data-state",
    "success",
  );
  await expect(page.locator("#my-form")).toHaveAttribute("aria-busy", "false");
  await expect(page.locator("#contact-status")).toContainText(
    "Your message has been sent",
  );
  await expect(page.locator("#contact-status")).toHaveAttribute(
    "aria-live",
    "polite",
  );
  await expect(button).toBeEnabled();
  await expect(button).toBeFocused();
  await expect(button).toHaveText("Message sent");
  expect(await button.boundingBox()).toEqual(box);
  await expect(page.locator("#contact-message")).toHaveValue("");
  await page.getByLabel("Name", { exact: true }).fill("Another message");
  await expect(page.locator("#my-form")).toHaveAttribute("data-state", "idle");
});

test("server failure preserves all fields and allows keyboard retry", async ({
  context,
  page,
}) => {
  await openForm(context, page);
  let status = 500;
  await page.route("https://formspree.io/**", (route) =>
    route.fulfill({ status, body: "{}" }),
  );
  await fillForm(page);
  await page.locator("#my-form-button").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#my-form")).toHaveAttribute("data-state", "error");
  for (const [id, value] of [
    ["contact-name", "Contact QA"],
    ["contact-email", "qa@example.invalid"],
    ["contact-message", "Intercepted test message"],
  ]) {
    await expect(page.locator(`#${id}`)).toHaveValue(value);
    await expect(page.locator(`#${id}`)).toBeEnabled();
  }
  await expect(page.locator("#my-form-button")).toBeFocused();
  status = 200;
  await page.keyboard.press("Enter");
  await expect(page.locator("#my-form")).toHaveAttribute(
    "data-state",
    "success",
  );
});

test("network failure preserves input and never shows a success message", async ({
  context,
  page,
}) => {
  await openForm(context, page);
  await page.route("https://formspree.io/**", (route) => route.abort("failed"));
  await fillForm(page);
  await page.locator("#my-form-button").click();
  await expect(page.locator("#my-form")).toHaveAttribute("data-state", "error");
  await expect(page.locator("#contact-status")).toContainText(
    "couldn’t confirm delivery",
  );
  await expect(page.locator("#contact-message")).toHaveValue(
    "Intercepted test message",
  );
  await expect(page.locator("#my-form-button")).toBeEnabled();
});

test("stalled delivery times out and restores the controls", async ({
  context,
  page,
}) => {
  await openForm(context, page);
  await page.clock.install();
  await page.route("https://formspree.io/**", () => {});
  await fillForm(page);
  await page.locator("#my-form-button").click();
  await expect(page.locator("#my-form")).toHaveAttribute(
    "data-state",
    "sending",
  );
  await page.clock.fastForward(20001);
  await expect(page.locator("#my-form")).toHaveAttribute("data-state", "error");
  await expect(page.locator("#my-form-button")).toBeEnabled();
  await expect(page.locator("#contact-message")).toHaveValue(
    "Intercepted test message",
  );
});

test("ambient animation flows without controls and pauses offscreen or for reduced motion", async ({
  context,
  page,
}) => {
  await openForm(context, page, "no-preference");
  const section = page.locator("#contact");
  await expect(page.locator(".contact-motion-toggle")).toHaveCount(0);
  const playState = () =>
    page
      .locator(".contact-ambience")
      .evaluate((el) => getComputedStyle(el, "::before").animationPlayState);
  await expect(section).toHaveAttribute("data-contact-motion", "running");
  expect(await playState()).toBe("running");
  expect(
    await page
      .locator(".contact-ambience")
      .evaluate(
        (el) => getComputedStyle(el, "::before").animationIterationCount,
      ),
  ).toBe("infinite");
  await page.locator("#home").scrollIntoViewIfNeeded();
  await expect(section).toHaveAttribute("data-contact-motion", "paused");
  expect(await playState()).toBe("paused");
  await page.locator("#my-form").scrollIntoViewIfNeeded();
  await expect(section).toHaveAttribute("data-contact-motion", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(section).toHaveAttribute("data-contact-motion", "paused");
  expect(
    await page
      .locator(".contact-ambience")
      .evaluate((el) => getComputedStyle(el, "::before").animationName),
  ).toBe("none");
});

test("contact layout fits narrow and landscape screens in every send state", async ({
  context,
  page,
}) => {
  await openForm(context, page);
  let status = 500;
  await page.route("https://formspree.io/**", (route) =>
    route.fulfill({ status, body: "{}" }),
  );
  for (const [width, height] of [
    [280, 640],
    [320, 640],
    [390, 844],
    [768, 1024],
    [1440, 900],
    [844, 390],
  ]) {
    await page.setViewportSize({ width, height });
    await fillForm(page);
    await page.locator("#my-form-button").click();
    await expect(page.locator("#my-form")).toHaveAttribute(
      "data-state",
      "error",
    );
    for (const selector of ["#my-form", "#contact-status", "#my-form-button"]) {
      const rect = await page.locator(selector).boundingBox();
      expect(rect.x).toBeGreaterThanOrEqual(0);
      expect(rect.x + rect.width).toBeLessThanOrEqual(width);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  status = 200;
  await page.setViewportSize({ width: 280, height: 640 });
  const buttonHeight = (await page.locator("#my-form-button").boundingBox())
    .height;
  await page.locator("#my-form-button").click();
  await expect(page.locator("#my-form")).toHaveAttribute(
    "data-state",
    "success",
  );
  expect((await page.locator("#my-form-button").boundingBox()).height).toBe(
    buttonHeight,
  );
});

test("footer phone is yellow by default and white on hover", async ({
  context,
  page,
}) => {
  await openForm(context, page);
  const phone = page.locator("footer .footer-phone");
  await expect(phone).toHaveAttribute("href", "tel:+17806071212");
  await expect(phone).toHaveCSS("color", "rgb(245, 218, 91)");
  await phone.hover();
  await expect(phone).toHaveCSS("color", "rgb(255, 255, 255)");
});
