# Next.js migration review

Converted all six website pages to Next.js 16.4.3 and React 19.3.1. The site uses
static export so its existing hosting can continue serving static files.
The migration was reviewed and approved for the website’s `main` branch after
the validation below. Hosting deployment uses the static export described in
`DEPLOYMENT.md`.

## Preserved behavior and design

- Original Tailwind design, content, typography, colors, spacing and responsive rules.
- Existing `.html` URLs, hashes, game query strings, navigation and forms.
- Current committee order and the collapsed 2023–2026 past committee disclosure.
- All 550 relocated public files are byte-identical to the original tracked files.
- Existing Sanity project, dataset, API version, queries and client version.
  The frontend bundles its client instead of fetching it from a CDN.

Original HTML/CSS is archived in `design-reference/` for repeatable visual checks.
Actual rendered pages are React components under `components/`, routed by `pages/`.
Original browser controllers initialize after hydration. Shared navigation initializes
in a layout effect so mobile navigation is ready without waiting for CMS requests.

## Validation

Validated November 1, 2026:

- Clean `npm ci` installation and production static export passed.
- 21 Node unit tests passed.
- 84 maintained browser tests passed across phone and desktop configurations in
  Chrome, WebKit and Firefox.
  They cover all six pages, design comparisons, disclosures, calendar tabs, gallery
  filtering/lightbox, mobile navigation, footer actions, forms and three game types.
  Past committee panels are checked for hidden content on first load, reload,
  return navigation and restored pages, as well as keyboard opening.
  A WebKit focus issue found during testing was fixed so game Help buttons activate
  before their menu closes; keyboard focus leaving the menu still closes it.
- 186 before/after section screenshots (62 per browser engine) matched with zero
  changed pixels at the configured comparison threshold; normalized page text also
  matched. These checks use controlled CMS responses and omit external embeds
  and icon fonts. An earlier migration check also allowed the existing icon font CDN.
- 336 responsive and interaction states across Chrome, WebKit and Firefox had no
  detected horizontal overflow, clipped text or application errors. Viewports span
  phones, tablets, desktops and mobile landscape.
- All seven development entry URLs (root plus six `.html` URLs) returned HTTP 200
  without browser application errors. Mobile menu open/close also passed in dev.
- All 550 moved public files were compared with their original Git blob hashes;
  no bytes changed. Exported local HTML references resolve successfully.
- 36 automated accessibility audits passed: 24 page/viewport combinations at
  320, 390, 768 and 1440 pixels, plus 12 active-game and Help-dialog states.
- Eight additional form and navigation integration checks passed, including
  success, server error and network failure paths. No live submissions were sent.
- `git diff --check` passed.
- Production dependency audit reports zero vulnerabilities. The complete audit
  retains three moderate findings in development-only `glob`, `minimatch` and
  `sucrase`; compatible fixes removed the high-severity build-tool findings.

Form submissions are intercepted in tests; live message delivery and subscriptions
were not sent. Real Sanity reads were checked using the existing allowed production
origin; expired content retains the existing fallback behavior.

## Sanity invariant

No CMS files, schemas, documents, access settings or CORS origins were changed.
The separate CMS repository remains clean at
`0f97cbbef467b0ef4d2b94be082ee6e1b7136b8f`, matching its migration-start state.
The existing localhost:8000 CORS restriction can make local content use fallback
states; this migration leaves that setting unchanged.

## Local review and deployment

The Next.js development preview runs at `http://localhost:8000`.
Use Node.js 24 and `npm run dev -- --port 8000` to restart it.

`npm run build` writes the production website to `out/`. Deploy the contents of
that directory, including `_next/`, as described in `DEPLOYMENT.md`.
