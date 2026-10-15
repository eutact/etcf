# ETCF Website Deployment Guide

This website is designed for ordinary shared cPanel hosting. Production does not require Node.js, a server framework, Docker, or a build service.

## Local Prerequisites

- Node.js and npm on the local computer
- Access to this `etcf` repository
- cPanel or FTP access to the hosting account
- Optional: access to the Sanity Studio in `etcf-cms` for event/ticker content updates

## One-Time Setup

From the `etcf` folder:

```bash
npm install
```

## Build CSS

Run this before uploading changes:

```bash
npm run build:css
```

For active styling work, use:

```bash
npm run watch:css
```

The compiled production CSS is:

```text
src/output.css
```

## Files To Upload To `public_html`

Upload the public website files and folders from `etcf/`, including:

- `index.html`
- `gallery.html`
- `kids-resources.html`
- `privacy-policy.html`
- `terms.html`
- `sitemap.xml`
- `src/`
- `images/`
- `ETCF Vision_Mission_Final - July 2024.pdf`

Do not upload:

- `.git/`
- `node_modules/`
- `.DS_Store`
- local editor files
- `DESIGN-UPGRADE-PLAN.md`
- this deployment guide unless you intentionally want it public

## Sanity CMS Considerations

The homepage event, scrolling ticker, and Our Year Together calendar are loaded from Sanity:

- Project ID: `xx91ckl7`
- Dataset: `production`
- Schemas: `eventCard`, `tickerCard`, `annualCalendar`

Before deployment, confirm:

- The current event date is today or in the future.
- Event title, description, time, venue, and registration URL are correct.
- Google Calendar fields use `YYYYMMDDTHHMMSS`, for example `20250614T180000`.
- Ticker messages do not mention expired event dates.
- Our Year Together has one published calendar for the current year, with confirmed dates, times, and venues. Deploy the updated Studio before editing this new content type.

If no valid future event exists, the website will show a polished "details coming soon" state.

For Our Year Together, the website uses the current year's published `annualCalendar`. If that calendar does not exist or the request fails, it keeps the existing static schedule. A published empty month intentionally shows no listed events. Existing fallback dates have not been migrated; confirm them with the committee before entering new calendar content.

## Verification Checklist

After upload, check:

- Homepage loads at `https://edmontontamilcatholics.ca/`
- Navigation works on desktop and mobile
- Upcoming event area does not show expired events
- Register and reminder buttons behave correctly
- Gallery filters by year and opens/closes the lightbox
- Kids resources tabs switch correctly
- Contact form submits through Formspree
- Newsletter form submits through Pipedream
- Privacy and terms pages load
- Footer links work
- No horizontal scrolling on mobile

## Cache Clearing

If a browser still shows the old design:

1. Hard refresh the browser.
2. Clear browser cache.
3. If cPanel or a CDN cache is enabled, clear that cache.
4. Confirm `src/output.css` has the latest upload timestamp.

## Rollback

To roll back:

1. Re-upload the previous known-good HTML/CSS/JS files.
2. Keep the `images/` folder unless image files were part of the issue.
3. Clear hosting/browser cache.
4. Recheck the homepage, gallery, and forms.
