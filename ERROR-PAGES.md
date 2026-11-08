# ETCF error handling

The branded error designs are available only through error handling. There is no
public error gallery or set of successful preview routes. `/error-pages.html`,
`/403.html`, `/503.html`, `/offline.html`, `/client-error.html` and the other old
preview URLs now return the ordinary branded **HTTP 404** response. No navigation
or sitemap links expose an error catalogue.

The 41 design definitions remain in `data/error-pages.json` for reuse when an
actual error needs the appropriate message. Only the native `404.html` and
`500.html` error documents are exported. Vercel routing and the local preview
return 404 for direct visits to `/404`, `/404.html`, `/500` and `/500.html`; this
keeps those implementation files from acting as normal successful pages. The
underlying 500 artifact is retained for framework/platform error handling.

## Connected fallbacks

- `pages/404.jsx` handles missing Next.js routes with the branded 404 design.
- `pages/500.jsx` provides the statically generated server-error document.
- `pages/_error.jsx` selects the matching production error design, with a 500
  fallback for unknown codes. A static export cannot emit arbitrary server errors.
- `components/errors/ErrorBoundary.jsx` handles React rendering/lifecycle
  failures. It shows a safe browser-error message without private diagnostics.
  Reload retries the current URL. A fresh route resets the boundary. React error
  boundaries do not catch event-handler exceptions, asynchronous callbacks or
  errors in the fallback itself.

The offline and maintenance designs are prepared source components. There is no
service worker or active maintenance mode. Initial visits without a connection,
TLS failures and DNS failures remain browser-owned errors.

## Continuous animation

Orbiting lights, floating cards, stars and ambient glows loop continuously. There
is no pause/resume button or reduced-motion status control. CSS still respects
operating-system reduced-motion preferences, including changes during a visit.
Animations suspend when the document is hidden. Text and interactive targets
stay still. The original ETCF logo remains unaltered on a light holding panel.

## Local review

Run `npm run build`, then `npm start -- --port 3002`. Open
`http://localhost:3002/` to review the website, or visit a nonexistent URL such as
`http://localhost:3002/missing-review-page` to review genuine error handling.
The former gallery URL intentionally returns 404. Browser crashes and recovery
are verified by the automated browser suite, without shipping a crash trigger.

## Vercel

The configuration in `vercel.json` supplies security headers and prevents direct
successful access to native error documents. Keep the Next.js preset, Node.js 24
and the existing build command.

[Vercel platform error customization](https://vercel.com/docs/custom-error-pages)
requires Enterprise. Platform-generated failures before application code runs
can still use Vercel’s own screen on other plans. Live response headers and error
routing must be smoke-tested after an approved deployment.

See [SECURITY-REVIEW.md](SECURITY-REVIEW.md) for the production-readiness review,
responsive coverage and test results. Push to `main` was approved on November 7,
2026; live Vercel checks follow deployment.
