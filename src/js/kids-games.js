(function () {
    const root = document.querySelector('[data-kids-games]');
    if (!root || !window.ETCFKidsContent || !window.ETCFKidsCore) return;
    const content = window.ETCFKidsContent;
    const core = window.ETCFKidsCore;
    const ui = content.ui;
    const allowedIds = content.activities.flatMap(activity => activity.units.map(unit => `${activity.id}:${unit.id}`));
    let storage;
    try { storage = window.localStorage; } catch (error) { storage = null; }
    const completed = core.readCompleted(storage, allowedIds);
    let saveFailed = !storage;
    let epoch = 0;
    let pendingTimer = null;
    let screen;

    function text(key, values = {}) {
        return ui[key].replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ''));
    }
    function el(tag, className, value) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (value !== undefined) node.textContent = value;
        return node;
    }
    function button(label, action, className = 'kids-button') {
        const node = el('button', className, label);
        node.type = 'button';
        const token = epoch;
        node.addEventListener('click', event => { if (token === epoch) action(event); });
        return node;
    }
    function focus(node) {
        node.tabIndex = -1;
        node.focus({ preventScroll: true });
        root.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
    function status() {
        const node = el('p', 'kids-feedback');
        node.setAttribute('role', 'status');
        node.setAttribute('aria-live', 'polite');
        node.setAttribute('aria-atomic', 'true');
        return node;
    }
    function frame(title, subtitle) {
        window.clearTimeout(pendingTimer);
        pendingTimer = null;
        epoch++;
        screen = el('div', 'kids-stage');
        const heading = el('h2', 'kids-game-title', title);
        const top = el('div', 'kids-game-top');
        top.append(heading, button(ui.back, () => home(true), 'kids-button kids-button-quiet'));
        screen.appendChild(top);
        if (subtitle) screen.appendChild(el('p', 'kids-game-intro', subtitle));
        root.replaceChildren(screen);
        focus(heading);
        return screen;
    }
    function illustration(name) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 120 88');
        svg.setAttribute('aria-hidden', 'true');
        svg.classList.add('kids-activity-art');
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttribute('href', `src/assets/kids-activities.svg#${name}`);
        svg.appendChild(use);
        return svg;
    }
    function home(shouldFocus = false, message = '') {
        window.clearTimeout(pendingTimer);
        pendingTimer = null;
        epoch++;
        const wrapper = el('div');
        const heading = el('h2', 'kids-section-title', ui.homeTitle);
        wrapper.append(heading, el('p', 'kids-game-intro', ui.homeIntro));
        const cards = el('div', 'kids-activity-grid');
        content.activities.forEach(activity => {
            const card = el('article', `kids-activity-card kids-tone-${activity.id}`);
            card.append(illustration(activity.art), el('h3', '', activity.title), el('p', '', activity.description));
            const meta = el('p', 'kids-activity-meta');
            meta.append(el('span', '', activity.ages), el('span', '', activity.duration));
            const play = button(ui.play, () => choose(activity));
            play.setAttribute('aria-label', `${ui.play}: ${activity.title}`);
            card.append(meta, play);
            cards.appendChild(card);
        });
        const progress = el('aside', 'kids-progress');
        const progressTitle = el('h3', '', ui.progress);
        progress.append(progressTitle, el('p', '', text('progressCount', { count: completed.size, total: allowedIds.length })), el('p', 'kids-small', ui.progressNote));
        progress.appendChild(button(ui.reset, () => {
            completed.clear();
            saveFailed = !core.resetProgress(storage);
            home(false, saveFailed ? ui.saveFailed : ui.resetDone);
            const title = root.querySelector('.kids-progress h3');
            title.tabIndex = -1;
            title.focus();
        }, 'kids-button kids-button-quiet'));
        const notice = status();
        if (message || saveFailed) notice.textContent = message || ui.saveFailed;
        progress.appendChild(notice);
        wrapper.append(cards, progress);
        root.replaceChildren(wrapper);
        if (shouldFocus) focus(heading);
    }
    function choose(activity) {
        const page = frame(activity.title, activity.choose);
        const list = el('div', 'kids-choice-grid');
        activity.units.forEach(unit => {
            const card = el('article', 'kids-choice-card');
            const icon = el('span', 'kids-scene-icon', unit.icon);
            icon.setAttribute('aria-hidden', 'true');
            card.append(icon, el('h3', '', unit.title), el('p', 'kids-small', unit.reference));
            if (completed.has(`${activity.id}:${unit.id}`)) card.appendChild(el('p', 'kids-completed-mark', ui.completed));
            const start = button(ui.play, () => introduction(activity, unit));
            start.setAttribute('aria-label', `${ui.play}: ${unit.title}`);
            card.appendChild(start);
            list.appendChild(card);
        });
        page.appendChild(list);
    }
    function introduction(activity, unit) {
        const page = frame(unit.title, unit.reference);
        page.appendChild(el('p', 'kids-story-intro', unit.intro));
        if (unit.adult) {
            const details = el('details', 'kids-adult-note');
            details.append(el('summary', '', ui.grownups), el('p', '', unit.adult));
            page.appendChild(details);
        }
        const controls = el('div', 'kids-controls');
        controls.append(button(ui.begin, () => start(activity, unit)), button(ui.chooseAnother, () => choose(activity), 'kids-button kids-button-quiet'));
        page.appendChild(controls);
    }
    function start(activity, unit) {
        if (activity.id === 'quiz') quiz(activity, unit, core.createQuiz(unit));
        if (activity.id === 'match') match(activity, unit);
        if (activity.id === 'order') order(activity, unit);
    }
    function complete(activity, unit, scenes) {
        completed.add(`${activity.id}:${unit.id}`);
        saveFailed = !core.saveCompleted(storage, completed);
        const page = frame(ui.completeTitle, unit.title);
        page.appendChild(el('p', 'kids-completion-note', activity.id === 'quiz' ? ui.quizDone : activity.id === 'match' ? ui.matchDone : ui.retell));
        if (scenes) {
            const sequence = el('ol', 'kids-retell');
            scenes.forEach(scene => sequence.appendChild(el('li', '', scene.caption)));
            page.appendChild(sequence);
        }
        const mission = el('div', 'kids-mission');
        mission.appendChild(el('h3', '', ui.missionTitle));
        [['talk', unit.mission.talk], ['pray', unit.mission.prayer], ['action', unit.mission.action]].forEach(([label, value]) => {
            const row = el('div');
            row.append(el('h4', '', ui[label]), el('p', '', value));
            mission.appendChild(row);
        });
        page.append(mission, el('p', 'kids-small', saveFailed ? ui.saveFailed : ui.saved));
        const controls = el('div', 'kids-controls');
        controls.append(button(ui.replay, () => start(activity, unit)), button(ui.back, () => home(true), 'kids-button kids-button-quiet'));
        page.appendChild(controls);
    }
    function quiz(activity, unit, round) {
        const page = frame(activity.title, unit.title);
        const question = round.questions[round.index];
        page.appendChild(el('p', 'kids-round-progress', text('question', { current: round.index + 1, total: round.questions.length })));
        const questionHeading = el('h3', 'kids-question', question.prompt);
        const answers = el('div', 'kids-answers');
        const feedback = status();
        const hintText = status();
        hintText.classList.add('kids-hint');
        const next = button(round.index === round.questions.length - 1 ? ui.finish : ui.next, () => {
            if (!core.advanceQuiz(round, question.id)) return;
            if (round.complete) complete(activity, unit);
            else quiz(activity, unit, round);
        });
        next.hidden = true;
        question.answers.forEach(answer => {
            const choice = button(answer.text, () => {
                const result = core.answerQuiz(round, answer.id);
                if (result === 'ignored') return;
                if (result === 'retry') {
                    feedback.textContent = ui.retry;
                    choice.classList.add('is-tried');
                } else {
                    answers.querySelectorAll('button').forEach(node => { node.disabled = true; });
                    choice.classList.add('is-correct');
                    feedback.textContent = ui.correct + question.explanation + ' (' + question.reference + ')';
                    next.hidden = false;
                    next.focus();
                }
            }, 'kids-answer');
            choice.dataset.answerId = answer.id;
            answers.appendChild(choice);
        });
        const hint = button(ui.hint, () => { hintText.textContent = ui.hintPrefix + question.hint; }, 'kids-button kids-button-quiet');
        hint.setAttribute('aria-controls', 'kids-quiz-hint');
        hintText.id = 'kids-quiz-hint';
        const controls = el('div', 'kids-controls');
        controls.append(hint, next, button(ui.restart, () => start(activity, unit), 'kids-button kids-button-quiet'));
        page.dataset.questionId = question.id;
        page.append(questionHeading, answers, feedback, hintText, controls);
        focus(questionHeading);
    }
    function match(activity, unit) {
        const board = core.createMatch(unit);
        const page = frame(activity.title, unit.title);
        const token = epoch;
        page.appendChild(el('p', 'kids-game-intro', ui.matchPrompt));
        const count = el('p', 'kids-round-progress');
        const grid = el('div', 'kids-match-grid');
        const feedback = status();
        const facts = el('ul', 'kids-facts');
        const factsBox = el('div', 'kids-discoveries');
        factsBox.append(el('h3', '', ui.discoveries), facts);
        factsBox.hidden = true;
        const finish = button(ui.finish, () => complete(activity, unit));
        finish.hidden = true;
        function sync() {
            count.textContent = text('matchCount', { count: board.found.length, total: unit.pairs.length });
            grid.querySelectorAll('button').forEach((node, index) => {
                const card = board.cards[index];
                node.classList.toggle('is-up', card.status !== 'down');
                node.classList.toggle('is-matched', card.status === 'matched');
                node.disabled = card.status === 'matched';
                node.setAttribute('aria-pressed', card.status !== 'down' ? 'true' : 'false');
                node.setAttribute('aria-label', card.status === 'matched' ? text('cardMatched', { label: card.label }) : card.status === 'up' ? text('cardUp', { label: card.label }) : text('cardDown', { number: index + 1 }));
            });
        }
        board.cards.forEach(card => {
            const tile = button('', () => {
                const result = core.flipCard(board, card.id);
                if (result.type === 'ignored') return;
                sync();
                if (result.type === 'first') feedback.textContent = ui.firstCard;
                if (result.type === 'mismatch') {
                    feedback.textContent = ui.mismatch;
                    pendingTimer = window.setTimeout(() => {
                        if (token !== epoch) return;
                        core.resolveMismatch(board);
                        sync();
                        pendingTimer = null;
                    }, 1200);
                }
                if (result.type === 'match') {
                    const pair = unit.pairs.find(pair => pair.id === result.pairId);
                    feedback.textContent = ui.matchFound + pair.fact;
                    facts.appendChild(el('li', '', `${pair.fact} (${pair.reference})`));
                    factsBox.hidden = false;
                    if (board.found.length === unit.pairs.length) {
                        finish.hidden = false;
                        finish.focus();
                    } else {
                        const nextCard = grid.querySelector('button:not(:disabled)');
                        nextCard?.focus();
                    }
                }
            }, 'kids-match-card');
            tile.dataset.cardId = card.id;
            const turn = el('span', 'kids-card-turn');
            turn.setAttribute('aria-hidden', 'true');
            const back = el('span', 'kids-card-back');
            back.append(el('span', 'kids-card-question', '?'), el('span', '', ui.discover));
            const front = el('span', 'kids-card-front');
            front.append(el('span', 'kids-scene-icon', card.icon), el('span', '', card.label), el('span', 'kids-match-mark', ui.matched));
            turn.append(back, front);
            tile.appendChild(turn);
            grid.appendChild(tile);
        });
        sync();
        const controls = el('div', 'kids-controls');
        controls.append(finish, button(ui.restart, () => start(activity, unit), 'kids-button kids-button-quiet'));
        page.append(count, grid, feedback, factsBox, controls);
    }
    function order(activity, unit) {
        let scenes = core.scrambleStory(unit.scenes);
        const page = frame(activity.title, unit.title);
        page.appendChild(el('p', 'kids-game-intro', ui.orderPrompt));
        const list = el('ol', 'kids-order-list');
        const feedback = status();
        const hint = status();
        hint.classList.add('kids-hint');
        function draw(focusId, direction) {
            list.replaceChildren();
            scenes.forEach((scene, index) => {
                const row = el('li', 'kids-order-scene');
                row.dataset.sceneId = scene.id;
                const caption = el('div', 'kids-scene-caption');
                const icon = el('span', 'kids-scene-icon', scene.icon);
                icon.setAttribute('aria-hidden', 'true');
                caption.append(icon, el('p', '', scene.caption));
                const position = el('p', 'kids-scene-position', text('scenePosition', { position: index + 1, total: scenes.length }));
                const moves = el('div', 'kids-scene-moves');
                [-1, 1].forEach(step => {
                    const label = step === -1 ? ui.earlier : ui.later;
                    const control = button(label, () => {
                        scenes = core.moveScene(scenes, scene.id, step);
                        feedback.textContent = text('moved', { position: scenes.findIndex(item => item.id === scene.id) + 1, total: scenes.length });
                        draw(scene.id, step);
                    }, 'kids-button kids-button-quiet');
                    control.dataset.direction = step;
                    control.setAttribute('aria-label', text('moveLabel', { action: label, caption: scene.caption }));
                    control.disabled = (step === -1 && index === 0) || (step === 1 && index === scenes.length - 1);
                    moves.appendChild(control);
                });
                row.append(position, caption, moves);
                list.appendChild(row);
            });
            if (focusId) {
                const row = Array.from(list.children).find(row => row.dataset.sceneId === focusId);
                const preferred = row.querySelector(`[data-direction="${direction}"]`);
                (preferred.disabled ? row.querySelector('button:not(:disabled)') : preferred).focus();
            }
        }
        draw();
        const controls = el('div', 'kids-controls');
        controls.append(
            button(ui.check, () => {
                if (core.isStoryCorrect(scenes, unit.scenes)) complete(activity, unit, scenes);
                else feedback.textContent = ui.orderRetry;
            }),
            button(ui.hint, () => { hint.textContent = ui.hintPrefix + unit.hint; }, 'kids-button kids-button-quiet'),
            button(ui.restart, () => start(activity, unit), 'kids-button kids-button-quiet')
        );
        page.append(list, feedback, hint, controls);
    }
    document.querySelectorAll('[data-kids-start]').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const activity = content.activities.find(activity => activity.id === link.dataset.kidsStart);
            const unit = activity?.units.find(unit => unit.id === link.dataset.kidsUnit);
            if (!activity) return;
            if (unit) introduction(activity, unit);
            else choose(activity);
            root.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        });
    });
    home();
}());
