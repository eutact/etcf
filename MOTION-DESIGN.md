# Website motion design and verification

## Custom cursor — November 9, 2026

The shared app adds a precise indigo dot and a softly trailing ring in ETCF’s
indigo, gold and blue. Hover changes the ring for cards and controls, with short
context cues for photos, video players, downloads, copy actions, contact links
and tabs. Press feedback stays in the cursor overlay; component hit areas do not
move. Generic cards receive only a subtle blue ring, without implying they are
clickable. Native navigation, selection, downloads and form behaviour are retained.

The enhancement requires a hover-capable fine mouse pointer. Touch, pen,
reduced-motion and forced-colour users keep their native cursor. Form fields,
editable content, disabled controls, embedded media and fullscreen content also
keep native input. Keyboard use, page hiding, dragging and leaving the window
hide the overlay and restore the native cursor. Preference changes take effect
during the visit. The decorative overlay is hidden from assistive technology,
cannot capture clicks and is absent without JavaScript.

Motion uses direct transforms rather than React updates on every mouse move.
The centre dot follows the pointer exactly; time-based easing draws the ring
toward it, then stops requesting animation frames at rest. There is no permanent
animation loop, external library or tracking. The shared effect removes its
listeners, media-query subscriptions, frames and pulse animation when unmounted.

The implementation is in `components/site/CustomCursor.jsx`,
`src/js/custom-cursor.js` and `src/custom-cursor.css`. Future special controls can
use `data-cursor-label="View"` (18 characters maximum), or
`data-cursor="native"` to retain the native pointer in a region.

Verification: production build and 36 unit tests passed. All 38 final browser
checks passed for cursor behaviour, forms and security on desktop and phone
layouts. Additional existing button, entrance, brand-download and social-page
checks passed. Cursor checks cover every page, dynamic gallery controls, exact
pointer alignment, stopping at rest, fixed hit areas, downloads, keyboard use,
touch, no JavaScript, disabled fields, embedded media and live preference changes.
Default and contextual cursor screenshots were reviewed. External deliveries
and embeds were isolated during browser tests.

References: [pointer precision](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/pointer),
[animation frames](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
and [interaction motion preferences](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html).

Prepared November 4, 2026.

## Research and decisions

- [W3C: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html): honor reduced-motion preferences and avoid unnecessary movement. The site follows the operating-system preference, including changes made during a visit.
- [web.dev: High-performance animations](https://web.dev/articles/animations-guide): use opacity and transforms for entrances, avoiding layout-property animation. The scroll effects do not animate width, height, margin or padding.
- [MDN: Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API): observe viewport entry rather than calculate every element's position on every scroll event.
- [MDN: Animation cancellation](https://developer.mozilla.org/en-US/docs/Web/API/Animation/cancel): cancel interrupted animations and handle the rejected completion promise. Focus, interaction and page hiding settle entrances immediately.

## Motion specification

| Element / interaction | Treatment | Timing |
| --- | --- | --- |
| Headings | Fade in with a 14px upward entrance | 560ms |
| Cards and content blocks | Fade in with a 20px upward entrance | 640ms |
| Sibling groups | Gentle stagger within each group | 70ms steps, capped at 210ms |
| Button hover | Background and shadow response; click area stays fixed | 220ms |
| Button press | Brief opacity feedback; native action runs immediately | 90ms transition, up to 110ms minimum visible feedback |
| Button release | Smooth return to its normal appearance | 220ms |

Entrances use `cubic-bezier(0.22, 1, 0.36, 1)` and run once per element. The coverage includes page headings, community content, the calendar selector, committee cards, policy sections, forms, footers, gallery results and dynamically created Kids cards. Filtering the gallery can animate newly created results.

Content is never permanently hidden while waiting for JavaScript or an observer. Unsupported or failing animation APIs leave it readable. Focused content is revealed immediately. Interacting with a control settles its surrounding entrance, including game-screen entrances, without cancelling card flips.

Buttons retain their native mouse, touch, keyboard, link and form behavior. Press effects clear on release, pointer cancellation, pointer exit, focus loss, page hiding and reduced-motion changes. Disabled and `aria-disabled` controls do not receive effects. Hover effects require a hover-capable fine pointer. The controls use fixed hit areas so clicks near their borders remain reliable.

## Verification results

- Production Next.js export: passed.
- Unit tests: 26 passed.
- Browser suite: 276 passed across Chrome, Firefox and WebKit, with desktop and phone viewports.
- Responsive coverage: all six pages checked at twelve layouts from 320px to 2560px, including short landscape layouts; no horizontal overflow detected.
- Input coverage: quick and held presses, all four button edges, keyboard Enter/Space, focus rings, touch cancellation, pointer exit, disabled controls, dynamic game buttons, page hiding and reduced-motion changes.
- Scroll coverage: one-time entrances, sibling timing bounds, dynamic gallery results, individual policy sections, fixed layout geometry, missing APIs, a throwing animation engine and returning from a hidden page.
- Accessibility: axe scan of all six pages using WCAG 2 A/AA and WCAG 2.1 AA tags; zero violations detected by those automated rules.
- Emulated Chrome mobile touch: tapping activated once; a vertical swipe scrolled 105px, cancelled the press and did not activate the button.
- Controlled desktop scroll sequence: zero layout-shift score and no tasks over 50ms recorded after initial page settling, across six main sections. This measures that sequence rather than total page-load performance.

Browser tests mock external submissions and CMS responses. They do not deliver contact messages, subscribe visitors or publish Sanity content. Automated scans and emulation cover the recorded scenarios; they are not a physical-device certification.

## Contact form update — November 6, 2026

The contact section adds two soft blue and gold gradient glows behind the existing
purple palette. Their 18s and 22s transform-only loops run while the section is
visible and pause when the page is hidden. There is no visible motion control,
as requested. Reduced-motion preferences disable these decorative loops and the button
and feedback effects, including preferences changed during a visit. This follows
[MDN's reduced-motion guidance](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
for honoring device motion preferences.

The form card and send button keep their hit areas still during interaction.
Fields receive a focus treatment; the send icon shifts gently on hover and the
button gets a single 650ms sheen. Sending shows a 900ms spinner and a descriptive
status immediately, with no artificial delay or progress percentage. Success uses
a 360ms checkmark and a 260ms inline confirmation. Errors use the same brief fade.

Delivery continues through the existing Formspree endpoint. All fields are required,
native email validation remains enabled, and a pending request locks the fields
and blocks duplicate submissions. A successful response clears the fields. Server,
network and 20s timeout failures retain the entered details and allow retry. A
polite live region announces progress and results; keyboard focus is restored to
the send button when appropriate without taking it from another focused control.
The newsletter delivery flow is unchanged. The footer telephone link uses yellow
by default and white on hover, preserving its existing placement and text.

Verification for this update: production build and 31 unit tests passed. The full
suite passed 402 browser checks across Chrome, Firefox and WebKit on desktop and
phone; the 48 contact-specific checks passed again after the final narrow-screen
label adjustment and removal of the visible background-motion control. Responsive regression coverage includes 17 layouts from 280px
to 3440px. Contact checks cover native validation, the actual request payload,
duplicate prevention, success, server and network failure, timeout, keyboard retry,
focus restoration, stable button geometry, reduced motion, automatic background
suspension offscreen and on reduced-motion preferences. Automated WCAG 2 A/AA and 2.1 AA scans found zero
violations in all four form states. Desktop and phone previews were visually
reviewed. External delivery was intercepted throughout testing; no test messages
or newsletter subscriptions were sent.
