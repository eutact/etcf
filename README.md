# Edmonton Tamil Catholic Family

The website uses Next.js 16, React 19 and Tailwind CSS 3. It exports static files,
so the existing shared hosting setup can serve it without a Node.js process.
Use Node.js 24 (`.nvmrc`).

## Develop

```sh
nvm use
npm ci
npm run dev
```

Open `http://localhost:3000`. To use another port:

```sh
npm run dev -- --port 8000
```

The development command starts Next.js and the Tailwind watcher together.

## Build and preview

```sh
npm test
npm run build
npm start
```

`npm run build` creates `out/`. `npm start` previews that production export at
`http://localhost:3000`; it is a static preview, not `next start`.

All existing public URLs are preserved, including `index.html`, `gallery.html`,
`kids-resources.html`, `kids-play.html`, `privacy-policy.html` and `terms.html`.
The export finalization script removes Next's additional extension for the
first-class `.html` routes. Their query parameters and hash links keep working.

## Source layout

- `pages/`: Next.js routes, document attributes and global styles.
- `components/home/`: individual homepage sections.
- `components/pages/`: the six React pages.
- `components/site/`: shared navigation, footer variants, metadata and browser initialization.
- `src/input.css`: the original Tailwind stylesheet and design rules.
- `src/output.css`: generated stylesheet imported by Next.js.
- `src/js/`: existing browser behavior and kids' game logic, loaded after hydration.
- `public/images/` and `public/src/assets/`: original media files with unchanged public URLs.
- `design-reference/`: original HTML and CSS used only for visual regression tests; not deployed.

Internal links retain their existing full-document navigation. This preserves
browser-controller lifecycles, game-window behavior and the existing `.html` URLs.

## Sanity

`etcf-cms/` is a separate project and was not modified by this migration. The
website uses the same project, production dataset, API version, queries and client
version as before. The Sanity client is now bundled with the frontend rather than
loaded from unpkg. Event, ticker and calendar content still load in the browser;
there is no build-time content snapshot or new CMS schema requirement.

Sanity currently rejects `http://localhost:8000` as an origin. A local preview can
therefore show the existing fallback states even though the production origin
works. This migration does not change CORS or CMS access settings.

## Browser and visual checks

```sh
npx playwright install chromium
npm run test:e2e
```

This rebuilds the export and compares it with the archived design on phone and
desktop layouts. It also checks the calendar, history disclosures, gallery,
forms and all three game types. Tests intercept external submissions and CMS data;
they do not publish content, send messages or subscribe anyone.

To include Firefox and WebKit on both screen sizes:

```sh
npx playwright install chromium firefox webkit
ETCF_CROSS_BROWSER=1 npm run test:e2e
```

The test servers use ports 8003 and 8004.

On a machine with Chrome already installed, an executable can be specified with
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` instead of downloading Chromium.

See [NEXTJS-MIGRATION.md](NEXTJS-MIGRATION.md) for the migration validation results
and [DEPLOYMENT.md](DEPLOYMENT.md) for the production upload steps.
