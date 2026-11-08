# Production security and responsive review

Prepared November 7, 2026. Scope: this repository, its production static export,
its locked npm dependencies, and browser behavior using a local production
preview. The user approved pushing the reviewed changes to `main` on November 7,
2026. Live Vercel verification remains a post-deployment check.

## Verification results

| Check | Result |
| --- | --- |
| Production export, Node.js 24.14.0 / Next.js 16.4.5 | Passed |
| Unit tests | 36 passed |
| Browser regression coverage | All 558 cases verified across Chromium, Firefox and WebKit, with desktop and phone configurations. The full run passed 556 cases; the remaining two Firefox CSP assertions passed in the security recheck after handling Firefox’s opaque blocked-navigation exception in the test. |
| Complete security recheck | 30 of 30 passed across all six browser configurations |
| Responsive coverage | All public pages and three active games passed 17 sizes from 280px to 3440px; no unintended horizontal overflow found |
| Automated accessibility | 26 scans; zero violations from the WCAG 2 A/AA and WCAG 2.1 AA rules used |
| Dependency advisory audit | Zero known vulnerabilities, including development dependencies |
| Secret-signature/artifact scan | 121 source/export text files checked; zero matching signatures |
| Formatting, whitespace and Vercel configuration schema | Passed |

No product test failures remain. The accessibility and responsive results describe
the recorded local scenarios; deployment-specific checks remain below.

## Changes prepared

| Finding | Resolution |
| --- | --- |
| Public error previews returned successful pages | Removed the gallery component, preview routes and exported preview documents. Old preview URLs now return a branded 404. Native 404/500 artifacts remain available to error handling; direct public aliases return 404. |
| Unwanted animation controls | Removed controls and associated state/styles. Continuous decorative loops remain; reduced motion and hidden-document suspension still work. |
| CMS-provided URLs accepted arbitrary schemes | Added URL validation. Registration/ticker links accept HTTPS or safe local URLs; scripts, data URLs, control characters, backslashes and embedded credentials are rejected. CMS images accept local assets and the Sanity image CDN only. Text continues to use `textContent`. |
| Missing browser security policy | Added an enforced CSP, frame protection, MIME-sniffing protection, referrer policy, device-permission restrictions, opener isolation and HSTS in `vercel.json`. The local export server applies the same headers for verification. |
| Three moderate build-dependency audit findings | Updated Sucrase compatibly to 3.35.1, removing the vulnerable Glob/Minimatch chain. Updated Next.js from 16.4.3 to the compatible 16.4.5 patch. The updated full dependency audit reports zero known advisories. |
| Navigation could briefly lose its dark backing on scroll | Added a persistent indigo backing so white navigation text and icons remain visible during the scrolled-state transition. |
| Local export preview edge cases | Corrected malformed-URL and HEAD handling, restricted methods with `Allow`, and rejected path traversal and symlinks outside the export directory. This preview binds only to localhost. Vercel provides its own HTTP/file-serving implementation. |
| Environment/hosting files could be accidentally tracked | Added `.env`, `.env.*` and `.vercel/` ignores, retaining support for a safe `.env.example`. |

## Security verification

- Full npm advisory audit includes production and build/test dependencies; no
  known vulnerabilities remain in the audited lockfile. `npm ls --all` reports
  a valid dependency tree. Production build runs using Node.js 24.14.0.
- Browser checks verify the configured headers on successful pages, assets and
  errors. CSP blocks inline script execution, unauthorized external scripts and
  form submissions to an unauthorized destination.
- CMS payload tests cover markup injection in event/ticker text, executable URL
  schemes and remote image trackers. No injected markup executes. Valid local
  images and the existing Sanity, Formspree and newsletter flows remain usable.
- Direct requests for environment files, Git configuration, package manifests,
  internal Next.js server files and source maps do not disclose those files.
  Malformed paths, encoded traversal, null bytes, backslashes, disallowed methods
  and bodyless HEAD error responses are covered on the local preview.
- Production artifacts are checked for preview documents, source maps, environment
  files and accidentally copied dependency directories. A signature scan of the
  source and exported text finds no matching private-key or common secret-token
  signatures. This does not establish that every conceivable secret is absent.
- Missing paths remain true HTTP 404 responses with `noindex`; all former error
  previews are unavailable as successful public pages. Browser-render failures
  use a generic message and retain reload/home recovery without stack traces.
- Vercel route/header configuration was checked against its official JSON schema.
  The schema uses draft-04; validation uses the compatible keywords present in
  this configuration through Next.js’s bundled schema validator.

The CSP allows inline **styles**, needed by the existing React colour previews
and dynamic layout/motion styles. It does not allow inline executable scripts,
script event attributes or `unsafe-eval`. Font Awesome styles/fonts retain their
existing fixed CDN origin. CMS API/media and form destinations are restricted to
this site’s actual configured services. HTTPS links to external community sites
remain allowed. The policy does not restrict those ordinary outbound links.

## Responsive review

The review covers all eight public page types: home, gallery, Kids Corner, the
kids’ game launcher, privacy policy, terms, Canadian resources and brand assets.
It also covers genuine 404s and active quiz, matching and story-ordering games.

Automated layout checks use 17 viewport sizes from **280px to 3440px**, including
phone, tablet, desktop and short landscape layouts. They check horizontal
geometry, readable content and reachable controls. Specific interaction checks
cover mobile navigation, calendar tabs, gallery filters/lightbox, committee
sections, brand downloads/colour previews, contact/newsletter states and games.
Desktop and 390px phone screenshots of each page and each active game are
visually reviewed; screenshots and scan output are saved locally under
`/tmp/etcf-production-review/` and are not deployed.

## Reproduction

```sh
nvm use
npm ci
npm audit
npm test
npm run build
ETCF_CROSS_BROWSER=1 npx playwright test
npm start -- --port 3002
```

Browser tests intercept CMS responses and external submissions. They do not send
contact messages, subscribe visitors or publish CMS content. A local Playwright
preview enforces the prepared headers; it does not emulate every Vercel edge
routing detail. Automated accessibility scans and device emulation complement
visual review; they are not physical-device certification or a formal penetration
test of the hosting platform and external service accounts.

## Deployment boundary

Repository changes are approved for push to `main`. After Vercel deploys the
approved commit, smoke-test the deployment’s CSP and other headers,
missing-route status, blocked direct error aliases, forms/CMS access and domain
HTTPS redirects. Vercel firewall, protection, domain/certificate configuration,
CMS access policies, server-side spam controls and external service account
permissions were not changed or certified by this local review. Replacing
Vercel-owned platform error screens still requires an eligible Enterprise plan.

References: [Vercel route/header configuration](https://vercel.com/docs/project-configuration/vercel-json),
[MDN CSP guidance for static sites](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP),
[Vercel platform error pages](https://vercel.com/docs/custom-error-pages).
