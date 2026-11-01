# Website test results — November 1, 2026

This report records the checks completed before the Next.js release was approved
for `main`. The local preview is available at http://localhost:8000. No hosting
deployment or CMS write was performed during testing.

## Changes verified

All five past committee/spiritual history boxes start collapsed. Their contents
are hidden on first load, reload, return navigation and restored-page events.
Mouse and keyboard expansion remain available. The 2023–2026 roster is unchanged.

The full browser run also found and fixed a WebKit game-menu focus issue: clicking
Help could hide the menu before its action ran. Help now opens correctly in all
three game types, restores focus on dismissal and closes the menu when focus
moves outside it. No design, content or CMS changes were needed.

## Final results

| Check | Result |
| --- | --- |
| Production static export | Passed; all six pages built |
| Node unit tests | 21 passed |
| Browser regression tests | 84 passed; 14 tests × 3 engines × 2 layouts |
| Visual section comparisons | 186 matched; zero pixel differences at the configured threshold |
| Responsive and interaction checks | 336 passed; widths 320–2560, tablets and mobile landscape |
| Accessibility | 36 audits; no detected WCAG A/AA violations |
| Additional form/navigation integration | 8 passed; no live submissions |
| Original static files | All 550 moved files byte-identical |
| Exported local links/assets/fragments | No missing references or invalid fragments |
| Existing Sanity content reads | 3 successful HTTP 200 responses |
| Production dependency audit | 0 findings |
| Complete dependency audit | 3 moderate development-only findings; no high/critical findings |
| Whitespace check | `git diff --check` passed |
| Separate Sanity CMS repository | Unchanged HEAD and clean working tree |

Browser engines: Chrome/Chromium, WebKit and Firefox. The maintained suite tests
phone and desktop layouts, all six pages, calendar tabs, committee disclosures,
gallery filters/lightbox, navigation, footer actions, forms and all three games.

Visual comparisons use the archived original HTML/CSS, controlled CMS responses
and excluded external embeds/icon fonts. Gallery captures keep the compared image
area in view to avoid different off-screen JPEG decoding in WebKit. Responsive
checks separately cover normal phone, tablet and desktop viewports.

## Remaining limits

The three moderate dependency findings are in development-only `glob`, `minimatch`
and `sucrase`, used by the build tooling. They are not included in the exported
runtime. Compatible dependency updates have already removed the high-severity
findings; no forced major upgrades or dependency overrides were applied.

Contact and newsletter tests intercept submissions and cover success, server error,
network failure and validation. Live message delivery and subscriptions were not
sent or independently verified. Automated accessibility and visual checks cover
the tested states; they do not replace a manual editorial or assistive-technology review.

Real Sanity reads retain the existing expired-event/ticker and calendar fallback
behavior. No content, schema, permissions, CORS or Studio configuration was changed.
The existing localhost:8000 CORS restriction can still produce local fallback content.

## Repeat the maintained checks

Use Node.js 24:

```sh
npm ci
npm test
npx playwright install chromium firefox webkit
ETCF_CROSS_BROWSER=1 npm run test:e2e
```

The suite builds the static export and starts temporary servers on ports 8003 and
8004. If using installed Chrome, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.
See `DEPLOYMENT.md` for the hosting upload process.
