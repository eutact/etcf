# Edmonton Tamil Catholic Family

Next.js 16, React 19 and Tailwind CSS 3. All page source is in `pages/` and
`components/`. Use Node.js 24 (`.nvmrc`).

## Develop

```sh
nvm use
npm ci
npm run dev -- --port 8000
```

Open http://localhost:8000. This starts Next.js and the Tailwind watcher.

## Build and preview

```sh
npm test
npm run build
npm start
```

The build generates `out/`. `npm start` serves that static export at
http://localhost:3000; use `npm start -- --port 8000` for another port.

The existing `.html` addresses are Next.js routes, including `index.html`,
`gallery.html`, `kids-resources.html`, `kids-play.html`, `privacy-policy.html`
and `terms.html`. Their hashes and query parameters remain supported.
Generated HTML in `out/` is build output, not a separate website source.

## Source layout

- `pages/`: Next.js routes, document attributes and global styles.
- `components/home/`: homepage sections.
- `components/pages/`: the six page components.
- `components/site/`: shared navigation, footers, metadata and browser initialization.
- `data/page-meta.json`: page metadata and document classes.
- `src/input.css`: Tailwind source and design rules.
- `src/output.css`: generated stylesheet imported by Next.js.
- `src/js/`: browser controllers and game logic bundled by Next.js.
- `public/`: images, illustrations, sitemap and public PDF.
- `tests/`: Node unit tests and Playwright browser checks.
- `scripts/`: development, export finalization and local preview commands.

Internal anchors retain full-document navigation so browser-controller lifecycles
and game windows behave consistently. Images and existing public paths are retained.

## Sanity

`etcf-cms/` is a separate project. The frontend reads the existing production
dataset in the browser, using the bundled Sanity client. CMS schemas, content,
permissions and origins are not changed by frontend builds.

The annual calendar reads the published calendar for the current Edmonton year
and includes past and upcoming events from January through December. Other years
are not relabeled or reused. If the current-year calendar is missing or cannot
load, the section shows an empty/unavailable message.

A local or preview domain needs its own allowed Sanity CORS origin. The live
website redirects to `https://www.edmontontamilcatholics.ca`, so that exact origin
must be allowed. Manage allowed origins in the Sanity project’s API settings.

## Tests

```sh
npm test
npx playwright install chromium
npm run test:e2e
```

Browser checks cover all six pages, local asset responses, responsive layouts,
Ruban's portrait, calendar tabs, committee disclosures, gallery, forms and all
three games. External submissions, CMS responses and embeds are intercepted;
tests do not send messages or change published content.

For phone and desktop checks in Chrome/Chromium, Firefox and WebKit:

```sh
npx playwright install chromium firefox webkit
ETCF_CROSS_BROWSER=1 npm run test:e2e
```

The suite rebuilds the export and uses port 8003. Failed runs retain screenshots
and traces. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to use installed Chrome.

See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting and release setup.
