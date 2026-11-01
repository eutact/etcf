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
`design-reference/`, tests or local environment files. Do not upload the old root
HTML sources separately. The browser runtime is bundled into `_next/`; the old
standalone `src/js/` files are not required on production hosting.

Keep each deployment's HTML and `_next/` files together. New HTML references its
own hashed assets. Upload new assets before replacing HTML, and retain previous
hashed assets until existing visitors/caches no longer need them.

## Vercel

Use the `etcf/` folder as the project root, the Next.js framework preset,
Node.js 24 and `npm run build`. If the project has a manual output-directory
setting from the earlier static site, update it to `out`.

The migration does not deploy or change the Sanity project.

## Sanity content checks

The website still reads:

- Project: `xx91ckl7`.
- Dataset: `production`.
- Types: `eventCard`, `tickerCard`, `annualCalendar`.

Before a public release, review the actual published event date, description,
time, venue and calendar reminder values. An expired/missing event shows the
existing “details coming soon” state. Expired dated ticker messages are hidden.

The annual calendar uses the current published Edmonton calendar year. If no
published calendar exists, or the request fails, the existing HTML fallback is
retained. Its historical date/weekday inconsistencies have not been replaced with
unconfirmed dates. A published empty month intentionally shows no listed events.

The CMS schema, permissions, CORS settings and publishing workflow are unchanged.
Local origins must already be allowed by Sanity to preview real content; this
migration does not add any origins.

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
