const { test, expect } = require("@playwright/test");
const { isolate } = require("./visual-helpers.cjs");
const { metadataForPage, pages } = require("../../src/seo.cjs");

for (const [key, config] of Object.entries(pages)) {
  test(`${key} serves complete crawlable metadata before JavaScript runs`, async ({
    page,
    context,
  }) => {
    await isolate(context);
    const response = await page.goto(config.path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    const rendered = await page.evaluate((source) => {
      const doc = new DOMParser().parseFromString(source, "text/html");
      return {
        title: doc.title,
        canonical: [...doc.querySelectorAll('link[rel="canonical"]')].map(
          (link) => link.getAttribute("href"),
        ),
        description: doc.querySelector('meta[name="description"]')?.content,
        graph: JSON.parse(
          doc.querySelector('script[type="application/ld+json"]').textContent,
        ),
        h1: doc.querySelectorAll("h1").length,
        viewport: doc.querySelectorAll('meta[name="viewport"]').length,
      };
    }, html);
    const metadata = metadataForPage(key);
    expect(rendered.title).toBe(config.title);
    expect(rendered.description).toBe(config.description);
    expect(rendered.canonical).toEqual([
      metadata.links.find((link) => link.rel === "canonical").href,
    ]);
    expect(rendered.graph).toEqual(metadata.structuredData[0]);
    expect(rendered.h1).toBe(1);
    expect(rendered.viewport).toBe(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  });
}

test("the legacy homepage alias points to the root canonical", async ({
  page,
  context,
}) => {
  await isolate(context);
  await page.goto("/index.html");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.edmontontamilcatholics.ca/",
  );
});

test("homepage content and the first photo are visible without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  await isolate(context);
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("dmonton");
    const first = page.locator(".carousel-slide").first();
    await expect(first).toBeVisible();
    await expect(first).toHaveAttribute(
      "alt",
      /Edmonton Tamil Catholic Family/,
    );
    await expect(first).toHaveAttribute("loading", "eager");
    await expect(first).toHaveAttribute("fetchpriority", "high");
    await expect(
      page.locator(
        'link[rel="preload"][as="image"][href="/src/assets/home1.jpg"]',
      ),
    ).toHaveAttribute("href", "/src/assets/home1.jpg");
    await expect(page.locator(".community-question")).toHaveCount(3);
  } finally {
    await context.close();
  }
});

test("visitor information is keyboard accessible and links to real site sections", async ({
  page,
  context,
}) => {
  await isolate(context);
  await page.goto("/");
  const questions = page.locator(".community-question");
  for (let index = 0; index < 3; index++) {
    const question = questions.nth(index);
    await question.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(question).toHaveAttribute("open", "");
    await expect(question.locator("p")).toBeVisible();
  }
  await expect(questions.last()).toContainText("Canada");
  for (const href of ["#event-section", "#contact"]) {
    await expect(page.locator(href)).toHaveCount(1);
    await expect(
      page.locator(`.community-visitor a[href="${href}"]`),
    ).toHaveCount(1);
  }
  await expect(
    page.locator('.community-visitor a[href="kids-resources.html"]'),
  ).toHaveCount(1);
});

test("missing pages return a real 404 and stay out of the index", async ({
  page,
  context,
}) => {
  await isolate(context);
  const response = await page.goto("/missing-seo-check.html");
  expect(response.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});
