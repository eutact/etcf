// The reusable calendar takes priority. Keep the year-based query only as a
// transition until maintainers publish the migrated single calendar.
const calendarQuery = `coalesce(
  *[_type == "annualCalendar" && _id == "annual-calendar"][0],
  *[_type == "annualCalendar" && year == $year && !(_id in path("drafts.**"))]
    | order(_updatedAt desc, _id asc)[0]
) {
  year, title, description,
  months[]{month, heading, events[]{title, category, description, date, time, venue, note, active}}
}`;

module.exports = { calendarQuery };
