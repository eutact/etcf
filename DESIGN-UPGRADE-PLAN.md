# ETCF Website Design Upgrade Plan

## Current Architecture

The public ETCF website is a static cPanel-friendly site in `etcf/`. It uses HTML pages, Tailwind CSS compiled from `src/input.css` to `src/output.css`, vanilla JavaScript, and static image/media assets. There is no production server requirement.

Public pages discovered:

- `index.html`
- `gallery.html`
- `kids-resources.html`
- `privacy-policy.html`
- `terms.html`

The CMS lives in the separate `etcf-cms/` repository. It is a Sanity Studio project using project ID `xx91ckl7` and dataset `production`. The website reads `eventCard` and `tickerCard` content from Sanity at runtime.

## Existing Design System

- Primary color: deep indigo/purple `#211c5f`
- Secondary color: muted purple `#4b476c`
- Accent colors: yellow `#f5da5b`, light blue `#59afe0`, soft gray `#c8cdd5`
- Typography: browser/default sans-serif with Tailwind utility sizing; Tamil and English content are mixed.
- Brand assets: logo images in `src/assets/`, gallery/event images under `images/`.
- Current patterns: fixed top navigation, image hero carousel, scrolling ticker, white cards, rounded images, monthly event accordions, committee cards, simple footer.

## Problems Found

- The homepage Sanity event renders the latest CMS event even if it is expired. The live event dated August 8, 2026 is stale as of August 14, 2026.
- Current CMS content has inconsistent details: ticker time differs from event time, event description references July for an August event, and `calendarEndTime` is malformed.
- Navigation and footer styling is duplicated across pages and not consistently polished.
- Many interactions are inline scripts; reusable behavior can be consolidated into small vanilla JS files.
- Gallery loads many images without native lazy loading and has limited keyboard/lightbox accessibility.
- Legal pages are readable but visually basic and disconnected from the richer brand presentation.
- Kids page uses Tailwind CDN and an indigo palette that does not fully align with the ETCF brand palette.
- `.DS_Store` files are tracked/untracked and should be ignored.
- `etcf-cms` has no local `node_modules`, so the Studio cannot currently build until dependencies are installed.

## Proposed Visual Enhancements

- Keep the approved homepage structure and section order intact.
- Add a shared premium visual layer: refined containers, sacred-window inspired borders, softer shadows, stronger focus states, better button/card styling, and restrained brand gradients.
- Improve hierarchy in event, monthly events, about, vision/mission, committee, contact, newsletter, gallery, and footer sections.
- Add subtle reveal animation with `IntersectionObserver`, while honoring `prefers-reduced-motion`.
- Improve image presentation with consistent frames, aspect ratios, lazy loading, and smoother hover states.

## Page-by-Page Improvements

- `index.html`: polish nav, hero/ticker, Sanity event card, monthly accordions, about/mission, committee cards, contact/newsletter, footer, and accessibility states.
- `gallery.html`: add a branded intro, responsive gallery controls, lazy loaded image cards, accessible lightbox, mobile-friendly layout, and shared footer/nav styling.
- `kids-resources.html`: align colors with ETCF, make cards warmer and more family/community focused, preserve resource content and tab behavior.
- `privacy-policy.html`: improve reading width, page hero, typography, spacing, links, and legal section styling without changing legal content.
- `terms.html`: same legal-page treatment as privacy while preserving content.

## Reusable Component Strategy

Use `src/input.css` for shared component classes:

- `.site-shell`
- `.section-frame`
- `.section-kicker`
- `.premium-card`
- `.premium-button`
- `.ghost-button`
- `.nav-link`
- `.form-field`
- `.footer-link`
- `.reveal`
- `.legal-card`
- `.gallery-card`

Use small vanilla JS modules:

- `src/js/site.js`: navigation, reveals, accordions, forms, footer alerts, shared helpers.
- `src/js/home.js`: Sanity event/ticker rendering, stale-event protection, calendar validation, carousel.
- `src/js/gallery.js`: gallery rendering, lazy images, keyboard lightbox.
- `src/js/kids.js`: kids tabs and back-to-top behavior.

## Responsive Strategy

- Use constrained containers and fluid spacing rather than simply shrinking desktop layouts.
- Test narrow widths around 320px, 375px, 390px, and 430px for navigation, ticker, event cards, forms, and footer.
- Use stable image aspect ratios and avoid horizontal overflow.
- Ensure Tamil/English mixed strings have comfortable line height and wrapping.

## Animation Strategy

- Use CSS transitions and keyframes only.
- Use `IntersectionObserver` for one-time fade-up reveals.
- Reduce or disable non-essential animation for `prefers-reduced-motion: reduce`.
- Avoid animation libraries, heavy parallax, or constant distracting effects.

## Performance Strategy

- Do not duplicate or transform the large historical media archive.
- Add `loading="lazy"` and `decoding="async"` to non-critical images.
- Keep dependencies unchanged.
- Avoid excessive preloading.
- Improve perceived loading for the gallery with native lazy images and skeleton states.
- Keep Sanity and Font Awesome CDNs because they are already part of the site.

## Accessibility Strategy

- Preserve visible focus states and improve them globally.
- Add keyboard support for mobile navigation, accordions, tabs, lightbox, and modal/alert flows.
- Improve button/link semantics where practical.
- Add ARIA attributes for expanded/collapsed states and dynamic content.
- Use readable line heights and stronger contrast for legal/community text.

## CMS Recommendations

- Frontend should not show expired Sanity events as upcoming.
- Frontend should show a polished empty state when no valid future event exists.
- Calendar reminder fields must be validated before enabling the reminder action.
- Sanity schema should require the key event fields and validate manual calendar datetime strings with `YYYYMMDDTHHMMSS`.
- Longer-term recommendation: add structured start/end datetime fields in Sanity and migrate away from manual calendar strings after a committee-approved content migration.

## Risk Notes

- The live CMS content needs manual correction for the next real event; the frontend must not invent replacement event details.
- The large gallery is sensitive to asset paths. The upgrade should not reorganize existing media.
- cPanel deployment must remain static: upload HTML/CSS/JS/assets after Tailwind build.
- Existing Formspree, Pipedream, Google Calendar, Sanity, and social links must remain working.
