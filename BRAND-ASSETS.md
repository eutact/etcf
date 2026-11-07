# Brand Assets page — design and review

Prepared November 7, 2026. The implementation is in the frontend; no CMS updates are needed.

## Source checks and research

- The supplied reference explains the Holy Trinity, men, women, children and Canada. The page follows those meanings. The Holy Trinity card uses a transparent PNG processed from the supplied image (`public/brand/holy-trinity.png`). The Canada card uses `public/brand/canadian-maple-leaf.svg`, converted directly from the outline in [Canadian Heritage's maple-leaf EPS](https://www.canada.ca/en/canadian-heritage/services/flag-canada-description.html) and rendered in the page's existing red. The other supporting symbols use SVG illustrations. These are explanatory graphics, not replacement logos or downloadable logo fragments.
- The existing primary artwork is `public/src/assets/logo.png`: 926 × 906 pixels, full-colour PNG with an alpha channel. The existing white-background JPG is 402 × 393 pixels. Both are downloaded directly with descriptive filenames; neither original is altered, traced or upscaled.
- The website's established colours come from `src/input.css` and `tailwind.config.js`: indigo `#211C5F`, purple `#4B476C`, blue `#59AFE0`, yellow `#F5DA5B`, white `#FFFFFF` and grey `#C8CDD5`.
- Green `#60B347` and red `#D21F25` are sampled screen references from the supplied primary PNG. The PNG contains many colour variations. These are clearly distinguished from website tokens and are not presented as certified print, CMYK or Pantone specifications.
- [MDN: Clipboard.writeText](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText): clipboard writes are asynchronous and subject to browser security permissions. Copy actions announce success; rejected or unavailable writes show a manual-copy instruction while every code remains visible.
- [W3C: Reduced motion](https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html): decorative effects are enabled only when the visitor has not requested reduced motion. The existing site's accessible focus and press treatment is reused.
- [Copyright Board of Canada: FAQ](https://www.cb-cda.gc.ca/en/faq) informed the distinction between access to a file and permission to reuse it. The site's existing Terms already require permission to copy or distribute website content. The page retains that permission-based approach; it makes no claim of trademark registration and grants no new open licence.

## Layout and interaction plan

1. A purple gradient hero presents the complete logo on white, with restrained blue/gold ambient motion and clear download/colour navigation.
2. Five illustrated explanations connect the emblem to its supplied meaning.
3. A white/soft/dark background preview demonstrates a white holding panel. Original PNG and JPG downloads include their actual dimensions.
4. Six main swatches and two neutrals expose HEX values, with RGB values for the main swatches and all eight colours in a JSON download. Keyboard-operable copy actions use a polite live region and preserve focus.
5. A clear-space illustration and four usage cards explain proportions, backgrounds, legibility and preserving the complete emblem. One-fifth clear space is presented as a practical guide, not a historical specification.
6. Reuse guidance, a downloadable text guide and the media-team email make permissions and specialist formats easy to request.

There are no new dependencies. Hero motion suspends offscreen and when the document is hidden. Card/heading entrances and button feedback reuse the existing motion controller. Core text, hex values, logos and download links remain present without JavaScript.

## Integration and maintenance

- Public route: `/brand-assets.html`, with unique metadata, canonical URL, sitemap entry and llms.txt/llm.txt reference.
- Footer Resources links appear in each full footer; the Kids game room has a compact footer link.
- Homepage footer section links now point to root-page anchors so the shared footer also works on inner resource pages.
- `data/brand-assets.json` supplies the palette, logo metadata and media contact. `scripts/generate-brand-resources.mjs` generates the public JSON/text downloads as part of `npm run build`.
- The existing Sanity configuration, schemas and published content are unchanged.

## Review points

Confirm the page's wording, the screen-reference colour labels and permission-first reuse notice before publishing. Vector artwork and print-ready files were not present in the repository; the page directs those requests to `media@edmontontamilcatholics.ca` rather than fabricating those formats.

## Verification

- Production build: passed; all eight public routes and generated brand files are exported.
- Unit tests: 34 passed, including source artwork metadata, generated palette consistency and reuse-guide content.
- The 456 browser scenarios were verified across Chrome, Firefox and WebKit on desktop and phone. The full run passed 454 immediately; two Firefox Kids-footer assertions reported 43.99994px for a 44px target. The assertion now rounds to a hundredth of a CSS pixel. All 12 Brand Assets/Kids responsive cases passed on recheck, including both affected cases.
- Responsive coverage: all eight pages at 17 layouts from 280px to 3440px, including short landscape screens.
- New interactions: every colour code, keyboard copying, clipboard denial, preview selection, actual download filenames/bytes, no-JavaScript content, viewport motion and reduced-motion changes passed across all three engines.
- Accessibility: automated WCAG 2 A/AA and 2.1 AA scans of all eight pages found zero violations. Homepage visitor answers were expanded; the brand preview was also checked on its dark background.
- Desktop, 390px phone and 280px narrow-screen layouts were visually reviewed. Original logo files remain unchanged in Git.
- Browser tests isolate external services. No contact messages, subscriptions or CMS writes were sent.

Local preview: http://localhost:8002/brand-assets.html.
