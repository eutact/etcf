const { test, expect } = require("@playwright/test");

async function isolate(context, event = null) {
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (["127.0.0.1", "localhost"].includes(url.hostname))
      return route.continue();
    if (url.hostname.endsWith(".sanity.io")) {
      const query = url.searchParams.get("query") || "";
      const result = query.includes("tickerCard")
        ? []
        : query.includes("annualCalendar")
          ? null
          : event;
      return route.fulfill({
        contentType: "application/json",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ result }),
      });
    }
    // Keep tests deterministic and prevent live embeds, messages and subscriptions.
    return route.abort();
  });
}

async function ready(page, file) {
  await page.waitForFunction(() => document.documentElement.dataset.etcfReady);
  if (file === "index.html")
    await expect(page.locator("#event-empty")).toBeVisible();
  if (file === "gallery.html")
    await expect(page.locator(".gallery-card")).toHaveCount(270);
}

const sections = {
  "index.html": [
    "#navbar",
    "#home",
    "#home + section",
    "#event-section",
    "#our-year-together",
    "#about",
    "#mission",
    "#executive-committee",
    "#past-committee",
    "#contact",
    "#newsletter-form",
    "footer",
  ],
  "gallery.html": ["#navbar", ".page-hero", "#gallery", "footer"],
  "kids-resources.html": [
    "#navbar",
    ".page-hero",
    "#kids-activities",
    "#free-section",
    "footer",
  ],
  "kids-play.html": [".game-topbar", ".game-main"],
  "privacy-policy.html": ["#navbar", ".page-hero", ".legal-content", "footer"],
  "terms.html": ["#navbar", ".page-hero", ".legal-content", "footer"],
  "tamil-catholics-canada.html": [
    "#navbar",
    ".page-hero",
    "#canada-resources",
    "footer",
  ],
};

for (const [file, selectors] of Object.entries(sections))
  test(`${file} renders its sections and assets without errors`, async ({
    context,
    page,
  }) => {
    await isolate(context);
    const errors = [];
    const failedAssets = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      const url = new URL(response.url());
      if (
        ["localhost", "127.0.0.1"].includes(url.hostname) &&
        response.status() >= 400
      )
        failedAssets.push(`${response.status()} ${url.pathname}`);
    });
    const response = await page.goto(`/${file}`);
    expect(response.status()).toBe(200);
    await ready(page, file);
    await expect(page).toHaveTitle(/ETCF|Edmonton Tamil Catholic Family/);
    for (const selector of selectors) {
      const section = page.locator(selector).first();
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
    }
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth + 1,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
    expect(failedAssets).toEqual([]);
  });

test("committee disclosures, calendar tabs, and mobile menu remain usable", async ({
  context,
  page,
}) => {
  await isolate(context);
  await page.goto("/");
  await ready(page, "index.html");
  const ruban = page.locator(".committee-person").filter({
    has: page.getByRole("heading", { name: "Ruban Peppin", exact: true }),
  });
  const portrait = ruban.getByRole("img", {
    name: "Ruban Peppin",
    exact: true,
  });
  await portrait.scrollIntoViewIfNeeded();
  await expect(portrait).toHaveAttribute(
    "src",
    "images/members/rubanpeppin.png",
  );
  await expect
    .poll(() =>
      portrait.evaluate((image) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  await expect(
    page.locator('img[src="images/members/rubanpeppin.png"]'),
  ).toHaveCount(1);
  const robin = page.locator(".committee-person").filter({
    has: page.getByRole("heading", { name: "Robin Peter", exact: true }),
  });
  await expect(robin.locator(".committee-avatar--initials")).toHaveText("RP");
  const recent = page.locator(".committee-history--recent");
  await expect(recent).not.toHaveAttribute("open");
  await expect(recent.locator("summary")).toContainText("2023–2026");
  await recent.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(recent).toHaveAttribute("open", "");
  await expect(recent.locator(".history-roster > div")).toHaveCount(12);
  await expect(page.locator(".committee-roster > li").nth(1)).toContainText(
    "Juliet Mohanan (Jasmine)",
  );
  await page.getByRole("tab", { name: /^March/ }).click();
  await expect(page.locator("#month-march")).toBeVisible();
  if (await page.locator("#menu-btn").isVisible()) {
    await page.evaluate(() => scrollTo(0, 0));
    await page.locator("#menu-btn").click();
    await expect(page.locator("#menu-btn")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await page.keyboard.press("Escape");
    await expect(page.locator("#menu-btn")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  }
});

test("gallery filters and lightbox remain usable", async ({
  context,
  page,
}) => {
  await isolate(context);
  await page.goto("/gallery.html");
  await ready(page, "gallery.html");
  await page.getByRole("button", { name: "2022", exact: true }).click();
  await expect(page.locator(".gallery-card")).toHaveCount(55);
  await page
    .locator("#gallery-container button:not([disabled])")
    .first()
    .click();
  await expect(page.locator("#lightbox")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#lightbox-caption")).toContainText("photo 2");
  await page.keyboard.press("Escape");
  await expect(page.locator("#lightbox")).toBeHidden();
});

test("all past committee boxes start collapsed and reset after returning", async ({
  context,
  page,
}) => {
  await isolate(context);
  const boxes = page.locator("#past-committee details");
  const expectCollapsed = async () => {
    await expect(boxes).toHaveCount(5);
    for (const box of await boxes.all()) {
      await expect(box).not.toHaveAttribute("open");
      await expect(box.locator(".history-content")).toBeHidden();
    }
  };
  await page.goto("/");
  await ready(page, "index.html");
  await expectCollapsed();
  const recent = page.locator(".committee-history--recent");
  await recent.locator("summary").click();
  await expect(recent.locator(".history-content")).toBeVisible();
  await page.reload();
  await ready(page, "index.html");
  await expectCollapsed();
  for (const summary of await boxes.locator("summary").all())
    await summary.click();
  await page.goto("/gallery.html");
  await ready(page, "gallery.html");
  await page.goBack();
  await ready(page, "index.html");
  await expectCollapsed();
  // Exercise the pageshow reset even when automation disables the back/forward cache.
  await recent.locator("summary").click();
  await expect(recent.locator(".history-content")).toBeVisible();
  await page.evaluate(() =>
    window.dispatchEvent(
      new PageTransitionEvent("pageshow", { persisted: true }),
    ),
  );
  await expectCollapsed();
  await recent.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(recent.locator(".history-content")).toBeVisible();
});

test("navigation works immediately after load and footer actions keep the current URL", async ({
  context,
  page,
}) => {
  await isolate(context);
  await page.goto("/", { waitUntil: "load" });
  if (await page.locator("#menu-btn").isVisible()) {
    await page.locator("#menu-btn").click();
    await expect(page.locator("#menu-btn")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await page.locator("#menu-close").click();
    await expect(page.locator("#menu-btn")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  }
  await ready(page, "index.html");
  page.on("dialog", (dialog) => dialog.dismiss());
  const url = page.url();
  await page.getByRole("link", { name: "Donate Now", exact: true }).click();
  await expect(page).toHaveURL(url);
});

test("contact and newsletter submissions are handled without live delivery", async ({
  context,
  page,
}) => {
  await isolate(context);
  let status = 200;
  await page.route("https://formspree.io/**", (route) =>
    route.fulfill({ status, contentType: "application/json", body: "{}" }),
  );
  await page.route("https://*.m.pipedream.net/**", (route) =>
    route.fulfill({ status: 200, body: "Thank you for subscribing." }),
  );
  await page.goto("/");
  await ready(page, "index.html");
  for (const expected of [/Thanks for your submission/, /problem submitting/]) {
    await page.getByLabel("Name", { exact: true }).fill("Local test");
    await page.getByLabel("Email", { exact: true }).fill("qa@example.invalid");
    await page.getByLabel("Message", { exact: true }).fill("Intercepted test");
    await page.locator("#my-form-button").click();
    await expect(page.locator("#popup-text")).toHaveText(expected);
    await page.locator("#popup-message button").click();
    status = 500;
  }
  await page.locator("#subscription-form input").fill("qa@example.invalid");
  await page.locator("#subscription-form button").click();
  await expect(page.locator("#response-message")).toContainText("Thank you");
});

for (const [game, topic] of [
  ["quiz", "creation"],
  ["match", "characters"],
  ["order", "five-thousand"],
])
  test(`${game} game deep link works`, async ({ context, page }) => {
    await isolate(context);
    await page.goto(`/kids-play.html?game=${game}&topic=${topic}`);
    await page.waitForFunction(
      () => document.documentElement.dataset.etcfReady,
    );
    await page
      .getByRole("button", { name: "Let’s begin", exact: true })
      .click();
    await expect(page.locator("[data-kids-games] .kids-stage")).toBeVisible();
    await page.locator("[data-game-more]").click();
    await page.locator("[data-game-help]").click();
    await expect(page.locator("[data-game-dialog]")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("[data-game-dialog]")).not.toBeVisible();
    await expect(page.locator("[data-game-more]")).toBeFocused();
    await page.locator("[data-game-more]").click();
    await page.locator("[data-game-exit]").focus();
    await expect(page.locator("[data-game-more]")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
