# ETCF Kids Corner — phase one

## Preview and checks

From `etcf/`:

```sh
npm run test:kids
npm run build:css
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/kids-resources.html`. If port 8000 is already serving the website, reuse it. Games use local scripts, content, and original SVG illustrations; no runtime API or CMS is needed. The existing shared stylesheet/icon resources and external resource library are retained. Complete the editorial review below before publication.

## Where volunteers edit content

- `src/js/kids-content.js`: English UI strings, original introductions, 30 questions, 12 matching pairs, three five-scene stories, explanations, hints, Scripture references, and Family Faith Missions.
- `src/js/kids-game-core.js`: pure game rules, shuffling, and device-progress helpers.
- `src/js/kids-games.js`: in-page rendering, focus, feedback, and cancellation of old matching timers.
- `src/js/kids.js`: existing resource tabs and back-to-top behavior; the old weekday saint rotation is replaced with an original family prayer.
- `src/assets/kids-activities.svg`: original book, matching-card, and story-path illustrations. Scene/pair emoji are decorative; visible text and accessible button names carry the meaning.
- `src/input.css`: scoped `.kids-corner` styles. Rebuild `src/output.css` with the normal CSS command after changes.
- `tests/kids-games.test.cjs`: dependency-free Node tests.

After editing assets, update their version query strings in `kids-resources.html` so returning visitors receive the new files.

Keep activity, question, answer, pair, and scene IDs stable. Correct answers use answer IDs, never array positions. Put a story's scenes in their **correct narrative order in the data**; the game shuffles them and guarantees the starting arrangement is incorrect. Within a topic, there must be six questions; each round samples five without repetition. Each question needs three or four distinct answers, exactly one correct answer ID, a hint, an explanation, and a source reference.

Every quiz topic, matching set, and ordering story needs its own relevant `mission` with `talk`, `prayer`, and `action`. Missions may reuse the same theme across games. Actions must stay free, practical, optional, and supported by a caregiver. Do not request children’s names, photos, messages, or responses.

English UI strings are in the `ui` dictionary. Activity metadata and game content are in the same editable data file, separate from the rules and renderer. For a later translation, preserve IDs and translate the dictionary, content, and the small amount of static page copy together. There is intentionally no language switcher in phase one.

## Progress and privacy

Only a JSON array of completed activity IDs is saved under `etcf.kids.completed.v1` in localStorage. Answers, attempts, names, scores, and personal details are not saved or sent anywhere. **Reset progress** removes only that key. Unknown IDs, invalid JSON, or old-format objects are ignored. If storage is unavailable or full, games still work and completion remains available for the current visit. The interface reports that saving is unavailable. Progress is local to the browser/device and can disappear when browser data is cleared.

## Faith-content references

All game wording, questions, explanations, summaries, and prayers are original adaptations; none are presented as verbatim Bible quotations. Scripture references identify the passage being taught, rather than promising a particular translation. The following primary Scripture and catechetical sources were consulted:

- Creation: [Genesis 1](https://bible.usccb.org/bible/genesis/1) and [Genesis 2:1–3](https://bible.usccb.org/bible/genesis/2), USCCB.
- Nativity: [Luke 2:1–20](https://bible.usccb.org/bible/luke/2), USCCB. This is Luke's account with shepherds; Magi from Matthew are not blended into this sequence.
- Lost Sheep: [Luke 15:1–7](https://bible.usccb.org/bible/luke/15), USCCB. Turning back to God is explained gently, without shaming a child.
- Good Samaritan: Luke 10:25–37, checked against the [NRSV Catholic Edition Scripture text](https://www.biblegateway.com/passage/?search=Luke+10%3A25-37&version=NRSVCE). The USCCB chapter endpoint was unavailable during checking. Children are not encouraged to enter unsafe situations; missions include a caregiver.
- Feeding the Five Thousand: [John 6:1–15](https://bible.usccb.org/bible/john/6), USCCB. The boy, five barley loaves, two fish, thanks, and twelve baskets follow John. The story is a sign performed by Jesus, rather than merely a lesson about sharing.
- People/object matching: [Genesis 6:14–22](https://bible.usccb.org/bible/genesis/6) (Noah/ark), [Exodus 14:15–22](https://bible.usccb.org/bible/exodus/14) (Moses/staff), [Luke 5:1–11](https://bible.usccb.org/bible/luke/5) (Simon Peter/net), and John 6:8–13 (boy/barley loaves).
- Church matching: Catechism of the Catholic Church 1154 (Scripture in liturgy), 1185 (Baptism/font), 1235 (cross), and 1243 (baptismal candle/light of Christ). See [USCCB Catechism, church furnishings](https://www.usccb.org/sites/default/files/flipbooks/catechism/308/) and the [Vatican text on Baptism](https://www.vatican.va/content/catechism/en/part_two/section_two/chapter_one/article_1/iii_how_is_the_sacrament_of_baptism_celebrated.html).

Illustrations and emoji are learning aids, not claims about historical appearance. No content has received catechist, priest, diocesan, or Church approval as part of this implementation.

## Maintainer review before publication

Have an ETCF catechist or priest and a caregiver review the actual game screens. Record reviewer, date, and requested corrections in this document or your normal review system.

- [ ] Read all five cited passages and verify every question, distractor, answer, hint, and explanation.
- [ ] Check the 12 matching connections, Catholic terminology, and learning facts.
- [ ] Play all three story sequences and confirm their order agrees with the selected Gospel account.
- [ ] Review original prayers and all eleven mission endings for Catholic accuracy and suitability for ages 5–10.
- [ ] Confirm gentle language, adult support, safe offline actions, and accessibility for different families.
- [ ] Review whether the Creation introduction needs additional local catechetical guidance. It celebrates the goodness of creation and does not introduce scientific timelines.
- [ ] Confirm parish-preferred wording for “baptismal font,” “saving love,” and the baptismal candle explanation. These are child-friendly adaptations, not formal definitions.
- [ ] Check that the unavailable David & Goliath and Tamil resources are clearly labelled; no inactive learning controls should promise content.
- [ ] Test with a parent and child on a phone, including large text, keyboard use, hints, retries, and taking turns.
- [ ] Review the existing external free/paid library links independently; this phase adds no endorsement or Church approval for those services.

Outstanding editorial work: the catechist/priest review above is still pending. English wording and the simplified presentation of Catholic symbols should receive local review before publication. This checklist is an editorial deliverable; implementation and local testing do not confer religious approval.

## Manual verification for future edits

- Quiz: choose each topic, read its introduction, reveal a hint, retry a wrong answer, finish five unique questions, read the explanation before Next, and check the mission. Try repeated answer/Next taps and replay.
- Match: reveal a card twice; try a mismatched pair and an extra card during the pause. Restart or exit while the pair is visible, then start another board. Finish all four pairs and read their facts and mission.
- Order: use only earlier/later buttons and the keyboard. Check a wrong order and confirm it is unchanged; use the hint, reset, solve, retell, and read the mission.
- Progress: complete activities, refresh, reset, and confirm other site storage remains intact. Test blocked/full storage; gameplay must remain available.
- Layout: inspect 320, 375, 390, 430, 768, 1024, 1440, and 1920 pixel widths. Check wrapping, 44px touch targets, reduced motion, announcements, focus, resource tabs, mobile navigation, local assets, and browser console.

## Verification performed for this implementation

- All 11 `npm run test:kids` tests passed, including the 30-question content audit and pure game/progress rules.
- DOM integration checks completed all eleven units and their mission screens. Checks covered hints, wrong-answer retries, repeated/stale button taps, matching mismatch/restart/exit cancellation, button-only story ordering, unchanged incorrect arrangements, and completion with storage blocked.
- Chrome keyboard play completed a Creation quiz, the Church matching set, and the Good Samaritan ordering story. Native mismatch resolution, restart, exit during a pause, visible facts, and mission screens were inspected.
- Chrome confirmed completed progress survived refresh, and reset returned it to zero after another refresh.
- Layouts were inspected at 320, 375, 390, 430, 768, 1024, 1440, and 1920px. No horizontal overflow was found; activity controls measured at least 44px. Narrow-screen matching labels and ordering controls were checked.
- Existing free/paid tabs and the mobile menu still worked. Browser console checks found no new warnings or errors.
- JavaScript syntax, local asset paths, SVG symbol IDs, unique HTML IDs, unchanged shared navigation/footer, preserved earlier CSS, and `git diff --check` passed.
- `npm run build:css` passed with the existing outdated Browserslist-data warning.

Not performed: a live screen-reader session, a parent/child usability session, or the catechist/priest review above. Those remain review work before publication. This implementation changes no CMS files or production content. Deployment is a separate step.
