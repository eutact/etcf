const { test, expect } = require("@playwright/test");
const { isolate, horizontalOverflow } = require("./visual-helpers.cjs");
const social = require("../../data/social-media.json");

test("every footer uses the supplied official social links", async ({
  context,
  page,
}) => {
  await isolate(context);
  for (const path of [
    "/",
    "/gallery.html",
    "/kids-resources.html",
    "/privacy-policy.html",
    "/terms.html",
  ]) {
    await page.goto(path);
    for (const [platform, label] of [
      ["youtube", "YouTube"],
      ["facebook", "Facebook"],
      ["instagram", "Instagram"],
    ]) {
      const link = page
        .locator("footer")
        .getByRole("link", { name: `ETCF on ${label}`, exact: true });
      await expect(link).toHaveAttribute(
        "href",
        `https://${platform}.edmontontamilcatholics.ca/`,
      );
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  }
});

test("registration preserves the certificate facts and contact on every layout", async ({
  context,
  page,
}) => {
  await isolate(context);
  await page.goto("/registration.html");
  await expect(page.locator("h1")).toContainText("Registered in Alberta");
  for (const value of [
    "EDMONTON TAMIL CATHOLIC FAMILY",
    "September 25, 2025",
    "Alberta, Canada",
    "Companies Act",
    "Company limited by shares",
    "Government of Alberta · Registrar of Companies",
  ])
    await expect(
      page.locator(".registration-facts dd").filter({ hasText: value }),
    ).toHaveCount(1);
  await expect(page.locator(".information-contact a")).toHaveAttribute(
    "href",
    "mailto:info@edmontontamilcatholics.ca",
  );
  await expect(page.locator('footer a[href="/registration.html"]')).toHaveCount(
    1,
  );
  await expect(page.locator('footer a[href="/social-media.html"]')).toHaveCount(
    1,
  );
  expect(await horizontalOverflow(page)).toEqual([]);
});

test("social embeds load only on request, use the right accounts and can be closed", async ({
  context,
  page,
}) => {
  await isolate(context);
  const violations = [];
  await page.addInitScript(() => {
    window.feedCsp = [];
    document.addEventListener("securitypolicyviolation", (event) =>
      window.feedCsp.push(event.violatedDirective),
    );
  });
  await page.goto("/social-media.html");
  await page.waitForFunction(
    () => document.documentElement.dataset.etcfReady === "social-media",
  );
  await expect(page.locator("main iframe")).toHaveCount(0);
  await expect(page.locator(".social-video-card")).toHaveCount(
    social.featured.length,
  );
  for (const platform of ["Facebook", "Instagram"]) {
    const card = page
      .locator(".social-feed-card")
      .filter({ hasText: `Follow ETCF on ${platform}` });
    await card.getByRole("button", { name: `Load ${platform} feed` }).click();
    const frame = card.locator("iframe");
    await expect(frame).toHaveCount(1);
    await expect(frame).toHaveAttribute(
      "src",
      platform === "Facebook"
        ? /www\.facebook\.com\/plugins\/page\.php\?href=https%3A%2F%2Fwww.facebook.com%2Fedmontontamilcatholics&/
        : /www\.instagram\.com\/edmontontamilcatholics\/embed\//,
    );
    await card.getByRole("button", { name: `Close ${platform} embed` }).click();
    await expect(frame).toHaveCount(0);
  }
  const uploads = page.locator(".social-youtube-feed");
  await uploads.getByRole("button", { name: "Load YouTube player" }).click();
  await expect(uploads.locator("iframe")).toHaveAttribute(
    "src",
    `https://www.youtube-nocookie.com/embed/videoseries?list=${social.youtube.uploadsPlaylist}&rel=0`,
  );
  const featured = page.locator(".social-video-card").first();
  await featured.getByRole("button", { name: "Load YouTube player" }).click();
  await expect(featured.locator("iframe")).toHaveAttribute(
    "src",
    `https://www.youtube-nocookie.com/embed/${social.featured[0].id}?rel=0`,
  );
  violations.push(...(await page.evaluate(() => window.feedCsp)));
  expect(violations).not.toContain("frame-src");
  expect(await horizontalOverflow(page)).toEqual([]);
});

test("both pages retain useful content and official links without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  await isolate(context);
  try {
    const page = await context.newPage();
    await page.goto("/registration.html");
    await expect(page.locator(".registration-facts time")).toHaveText(
      "September 25, 2025",
    );
    await page.goto("/social-media.html");
    for (const platform of ["youtube", "facebook", "instagram"])
      await expect(
        page.locator(`main a[href="${social[platform].url}"]`),
      ).toBeVisible();
    for (const video of social.featured)
      await expect(
        page.locator(`a[href="https://www.youtube.com/watch?v=${video.id}"]`),
      ).toBeVisible();
  } finally {
    await context.close();
  }
});
