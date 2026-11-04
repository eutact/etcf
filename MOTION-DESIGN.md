# Website motion design and verification

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
