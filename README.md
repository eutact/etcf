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
`gallery.html`, `kids-resources.html`, `kids-play.html`, `privacy-policy.html`,
`terms.html` and `tamil-catholics-canada.html`. Their hashes and query parameters remain supported.
Generated HTML in `out/` is build output, not a separate website source.

## Source layout

- `pages/`: Next.js routes, document attributes and global styles.
- `components/home/`: homepage sections.
- `components/pages/`: the seven page components.
- `components/site/`: shared navigation, footers, metadata and browser initialization.
- `data/page-meta.json`: page titles, descriptions, canonical paths and document classes.
- `data/site-seo.json`: shared organization, contact and social-image details.
- `src/seo.cjs`: consistent server-rendered metadata and JSON-LD.
- `src/input.css`: Tailwind source and design rules.
- `src/output.css`: generated stylesheet imported by Next.js.
- `src/js/`: browser controllers and game logic bundled by Next.js.
- `public/`: images, illustrations, generated sitemap/robots.txt and public PDF.
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

Maintainers reuse one **Our Year Together** document (`annual-calendar`). The
Studio's **Prepare next year** action carries dates into a draft for review;
it never publishes automatically. Until the reusable document is first
published, the website falls back to the existing published current-year record.

A local or preview domain needs its own allowed Sanity CORS origin. The live
website redirects to `https://www.edmontontamilcatholics.ca`, so that exact origin
must be allowed. Manage allowed origins in the Sanity project’s API settings.

## Tests

```sh
npm test
npx playwright install chromium
npm run test:e2e
```

Browser checks cover all seven pages, local asset responses, responsive layouts,
Ruban's portrait, calendar tabs, committee disclosures, gallery, forms and all
three games. External submissions, CMS responses and embeds are intercepted;
tests do not send messages or change published content.

Responsive checks resize each page through seventeen layouts, from 280px phones to
3440px screens, including short landscape viewports. Poster checks cover both
portrait and landscape artwork without cropping. The event card stays stacked
below 1024px and limits the poster to the available screen height.

The shared motion controller adds staggered, one-time entrances and supports
dynamic gallery and Kids cards. Content remains visible when animation APIs are
absent or fail. Buttons provide hover and press feedback with fixed click areas;
keyboard, touch, disabled states and cancelled interactions retain native behavior.
Reduced-motion preferences disable nonessential effects immediately. See
[the motion design and verification notes](MOTION-DESIGN.md) for research,
timings, coverage and release checks.

For phone and desktop checks in Chrome/Chromium, Firefox and WebKit:

```sh
npx playwright install chromium firefox webkit
ETCF_CROSS_BROWSER=1 npm run test:e2e
```

The suite rebuilds the export and uses port 8003. Failed runs retain screenshots
and traces. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to use installed Chrome.

See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting and release setup.

## Search visibility

The build generates the seven-page canonical sitemap and robots.txt from the
shared SEO configuration. Page metadata and organization JSON-LD are included in
the initial HTML; the first homepage photo is visible without JavaScript. See
[the SEO plan](SEO-PLAN.md) for the Edmonton-first content strategy, Canada guide,
verified sources and Search Console rollout steps.

It also generates `/llms.txt`, an AI-readable site overview with canonical page
links, and `/llm.txt` as an identical alias. Shared contact details and page
summaries come from the SEO configuration. Each page links to `/llms.txt` through
its HTML `describedby` relation.

The shared footer credit reads “Design & development by Ruban AI Labs” and links
to `https://labs.rubangino.ca/`. The footer uses one, two or four columns with a
wrapping legal/copyright row, and the game room has a compact light version.
Credit and legal links retain a 44px minimum touch height.
