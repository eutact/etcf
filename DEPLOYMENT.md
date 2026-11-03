# ETCF Website Deployment Guide

The Next.js frontend is configured with `output: 'export'`. Production consists
of static HTML, JavaScript, CSS and media files; shared cPanel hosting does not
need a Node.js server. The separate Sanity Studio is not part of this deployment.

## Build locally

Use Node.js 24:

```sh
nvm use
npm ci
npm test
npm run build
```

The build compiles the existing Tailwind design, prerenders the six React pages,
and normalizes the exported `.html` filenames to preserve existing URLs.

For browser/visual regression checks:

```sh
npx playwright install chromium
npm run test:e2e
```

Preview the resulting files:

```sh
npm start
```

Open `http://localhost:3000`. This previews `out/`, including game deep links,
legacy `.html` URLs and the generated 404 page.

## Upload to shared hosting

Upload **the contents of `out/`** to `public_html`, including:

- All generated `.html` files, including `kids-play.html` and `404.html`.
- `_next/`: required React/Next.js JavaScript, data files and styles.
- `images/` and `src/assets/`: original media with unchanged URLs.
- `sitemap.xml` and the public PDF.

Do not upload the source repository, `node_modules/`, `.git/`, `.next/`,
tests or local environment files. The browser runtime is bundled into `_next/`;
source `src/js/` files are not required on production hosting.

Keep each deployment's HTML and `_next/` files together. New HTML references its
own hashed assets. Upload new assets before replacing HTML, and retain previous
hashed assets until existing visitors/caches no longer need them.

## Vercel

For the `eutact/etcf` GitHub repository, use its repository root (`.`), the Next.js
framework preset, Node.js 24 and `npm run build`. Keep Vercel’s framework output
setting at its default unless the project is deliberately configured to serve
`out/` as a plain static site. If connecting a parent monorepo instead, select the
folder containing this `package.json`.

Keep `main` as the Production Branch. Review changes locally with `npm run dev`
or the production export preview before pushing approved updates to `main`.

The migration does not deploy or change the Sanity project.

## Sanity content checks

The website still reads:

- Project: `xx91ckl7`.
- Dataset: `production`.
- Types: `eventCard`, `tickerCard`, `annualCalendar`.

Before a public release, review the actual published event date, description,
time, venue and calendar reminder values. An expired/missing event shows the
existing “details coming soon” state. Expired dated ticker messages are hidden.

The annual calendar uses the current published Edmonton calendar year and shows
that year’s past and upcoming events. If no published calendar exists, or the
request fails, an empty/unavailable state is shown. Dates from other years are
never relabeled as the current year. A published empty month intentionally shows
no listed events. Review the stored dates before publishing; weekdays are
calculated from those dates.

The Studio uses one reusable `annual-calendar` document. Deploy the Studio and
frontend updates together; review and publish its prepared 2026 draft in Studio.
Until its first publication, the frontend reads the existing current-year
published record. Thereafter the reusable record takes priority. Use **Prepare
next year** to save the following year's changes as a draft, review dates and
weekdays, and publish when the calendar should replace the current live year.

The public website uses `https://www.edmontontamilcatholics.ca`; this exact origin
is allowed in Sanity CORS with credentials disabled. Local preview origins need
their own explicit allowlist entries. Drafts remain private and do not appear on
the public website until published.

## Final production smoke check

- Check homepage navigation on mobile and desktop.
- Check current and past committee records and their disclosures.
- Check the event, ticker and all calendar tabs.
- Filter gallery years and open/close the lightbox.
- Open each kids' activity, including direct `kids-play.html?game=…` links.
- Check contact/newsletter behavior with the service owners; automated tests mock delivery.
- Check the legal pages and footer links.
- Confirm `_next/` assets load without 404s or hydration errors.

## Rollback

Restore a complete prior `out/` deployment, keeping its HTML and hashed `_next/`
assets together. Clear hosting/CDN caches where applicable. Do not mix HTML from
one build with JavaScript/CSS from another.
