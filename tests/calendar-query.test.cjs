const test = require("node:test");
const assert = require("node:assert/strict");
const { parse, evaluate } = require("groq-js");
const { calendarQuery } = require("../src/js/calendar-query.cjs");
const document = (id, year, title = id, updated = "2026-11-03T00:00:00Z") => ({
  _id: id,
  _type: "annualCalendar",
  year,
  title,
  _updatedAt: updated,
  months: [],
});
async function select(dataset, year = 2026) {
  return (
    await evaluate(parse(calendarQuery), { dataset, params: { year } })
  ).get();
}
test("the reusable published calendar takes priority over a newer legacy record", async () => {
  const result = await select([
    document("annual-calendar", 2026, "Reusable"),
    document("old-calendar", 2026, "Legacy", "2099-01-01T00:00:00Z"),
  ]);
  assert.equal(result.title, "Reusable");
});
test("the current-year legacy calendar remains available before the reusable calendar is published", async () => {
  const result = await select([
    document("drafts.annual-calendar", 2026, "Unpublished"),
    document("old-calendar", 2026, "Live"),
  ]);
  assert.equal(result.title, "Live");
});
test("unpublished records and calendars for other years are not used as the legacy fallback", async () => {
  assert.equal(
    await select([
      document("drafts.other", 2026),
      document("old-calendar", 2025),
    ]),
    null,
  );
});
test("a future published singleton is not silently replaced by an obsolete legacy record", async () => {
  const result = await select([
    document("annual-calendar", 2027, "Future"),
    document("old-calendar", 2026, "Legacy"),
  ]);
  assert.equal(result.year, 2027); // The renderer checks this against the current Edmonton year.
});
test("preparing next year as a draft leaves the current published singleton selected", async () => {
  const result = await select([
    document("annual-calendar", 2026, "Live"),
    document("drafts.annual-calendar", 2027, "Draft"),
  ]);
  assert.equal(result.year, 2026);
  assert.equal(result.title, "Live");
});
