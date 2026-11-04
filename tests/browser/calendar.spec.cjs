const { test, expect } = require("@playwright/test");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const event = (title, date, extra = {}) => ({
  title,
  date,
  time: "7:15 PM",
  venue: "Community church",
  active: true,
  ...extra,
});
const calendar = () => ({
  year: 2026,
  title: "Our Year Together",
  description: "Our complete 2026 community calendar.",
  months: monthNames.map((heading, index) => ({
    month: index + 1,
    heading,
    events: [],
  })),
});

async function openCalendar(
  page,
  context,
  record,
  { fail = false, now = "2026-11-03T19:00:00Z", beforeCalendar } = {},
) {
  await page.clock.setFixedTime(new Date(now));
  const years = [];
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (["localhost", "127.0.0.1"].includes(url.hostname))
      return route.continue();
    if (!url.hostname.endsWith(".sanity.io")) return route.abort();
    const query = url.searchParams.get("query") || "";
    if (query.includes("annualCalendar")) {
      years.push(Number(url.searchParams.get("$year")));
      if (beforeCalendar) await beforeCalendar();
      if (fail) return route.abort();
    }
    const result = query.includes("annualCalendar")
      ? record
      : query.includes("tickerCard")
        ? []
        : null;
    return route.fulfill({
      contentType: "application/json",
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ result }),
    });
  });
  await page.goto("/");
  await page.waitForFunction(() => document.documentElement.dataset.etcfReady);
  await expect.poll(() => years.length).toBeGreaterThan(0);
  return years;
}

test("the current-year calendar includes earlier and upcoming events without mixing other years", async ({
  page,
  context,
}) => {
  const record = calendar();
  record.months[0].events = [
    event("January 2026 Mass", "2026-01-10"),
    event("Wrong year", "2025-01-11"),
    event("Wrong month", "2026-02-14"),
    event("Hidden event", "2026-01-17", { active: false }),
    event("Incomplete event", "2026-01-18", { venue: "" }),
  ];
  record.months[10].events = [event("November 2026 Mass", "2026-11-14")];
  const years = await openCalendar(page, context, record);
  await expect(page.locator("[data-annual-events]")).toHaveAttribute(
    "data-calendar-source",
    "sanity",
  );
  await expect(page.locator(".annual-year-label")).toContainText("2026");
  await page.getByRole("tab", { name: /^January/ }).click();
  await expect(page.locator("#month-january .annual-event-card")).toHaveCount(
    1,
  );
  await expect(page.locator("#month-january")).toContainText(
    "January 2026 Mass",
  );
  await expect(page.locator("#month-january time")).toHaveAttribute(
    "datetime",
    "2026-01-10",
  );
  await expect(page.locator("#month-january")).toContainText("Saturday");
  await page.getByRole("tab", { name: /^November/ }).click();
  await expect(page.locator("#month-november")).toContainText(
    "November 2026 Mass",
  );
  await expect(page.locator(".annual-event-card")).toHaveCount(2);
  expect(years.every((year) => year === 2026)).toBe(true);
});

test("a missing current-year calendar does not relabel the old schedule", async ({
  page,
  context,
}) => {
  await openCalendar(page, context, null);
  await expect(page.locator(".annual-year-label")).toContainText("2026");
  await expect(page.locator(".annual-event-card")).toHaveCount(0);
  await expect(page.locator("[data-annual-empty]")).toContainText(
    "2026 calendar is being updated",
  );
  await expect(page.locator("[data-month-tab]")).toHaveCount(12);
  await expect(page.locator("#tab-november")).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("an out-of-year response is ignored", async ({ page, context }) => {
  const record = calendar();
  record.year = 2025;
  record.months[0].events = [event("Old 2025 event", "2025-01-11")];
  await openCalendar(page, context, record);
  await expect(page.locator(".annual-event-card")).toHaveCount(0);
  await expect(page.locator("[data-annual-events]")).toHaveAttribute(
    "data-calendar-source",
    "unavailable",
  );
});

test("a published empty month stays empty", async ({ page, context }) => {
  await openCalendar(page, context, calendar());
  await expect(page.locator("[data-annual-events]")).toHaveAttribute(
    "data-calendar-source",
    "sanity",
  );
  await page.getByRole("tab", { name: /^March/ }).click();
  await expect(page.locator("#month-march .annual-panel-count")).toHaveText(
    "0 listed events",
  );
  await expect(page.locator("[data-annual-empty]")).toHaveText(
    "No event details are currently listed for this month.",
  );
});

test("calendar requests use the Edmonton year near UTC New Year", async ({
  page,
  context,
}) => {
  const years = await openCalendar(page, context, calendar(), {
    now: "2027-01-01T02:00:00Z",
  });
  expect(years.every((year) => year === 2026)).toBe(true);
  await expect(page.locator(".annual-year-label")).toContainText("2026");
  await expect(page.locator("#tab-december")).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("a failed calendar request does not display stale event dates", async ({
  page,
  context,
}) => {
  await openCalendar(page, context, null, { fail: true });
  await expect(page.locator(".annual-event-card")).toHaveCount(0);
  await expect(page.locator("[data-annual-empty]")).toContainText(
    "2026 calendar could not load",
  );
});

test("the current month stays selected even when only another month has events", async ({
  page,
  context,
}) => {
  const record = calendar();
  record.months[0].events = [event("January Mass", "2026-01-10")];
  await openCalendar(page, context, record);
  await expect(page.locator("[data-annual-events]")).toHaveAttribute(
    "data-calendar-source",
    "sanity",
  );
  await expect(page.locator("#tab-november")).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(
    page.locator('[data-month-tab][aria-selected="true"]'),
  ).toHaveCount(1);
  await expect(page.locator("#month-november")).toBeVisible();
  await expect(page.locator("#month-january")).toBeHidden();
});

test("reloading a previously selected month returns to the current month", async ({
  page,
  context,
}) => {
  await openCalendar(page, context, calendar());
  await page.getByRole("tab", { name: /^March/ }).click();
  await expect(page.locator("#tab-march")).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page).toHaveURL(/#month-march$/);
  await page.reload();
  await page.waitForFunction(() => document.documentElement.dataset.etcfReady);
  await expect(page.locator("#tab-november")).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page).toHaveURL(/#month-november$/);
  await page.getByRole("tab", { name: /^December/ }).click();
  await expect(page.locator("#tab-december")).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("the default month follows Edmonton at the UTC month boundary and rolls over on reload", async ({
  page,
  context,
}) => {
  await openCalendar(page, context, calendar(), {
    now: "2026-11-01T02:00:00Z",
  });
  await expect(page.locator("#tab-october")).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.clock.setFixedTime(new Date("2026-11-01T08:00:00Z"));
  await page.reload();
  await expect(page.locator("#tab-november")).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("a delayed CMS response preserves a month chosen after the page opens", async ({
  page,
  context,
}) => {
  let release;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  try {
    await openCalendar(page, context, calendar(), {
      beforeCalendar: () => gate,
    });
    await expect(page.locator("#tab-november")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await page.getByRole("tab", { name: /^March/ }).click();
    release();
    await expect(page.locator("[data-annual-events]")).toHaveAttribute(
      "data-calendar-source",
      "sanity",
    );
    await expect(page.locator("#tab-march")).toHaveAttribute(
      "aria-selected",
      "true",
    );
  } finally {
    release();
  }
});
