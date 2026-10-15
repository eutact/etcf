(function () {
    const root = document.querySelector('.kids-game-page [data-kids-games]');
    if (!root || root.dataset.ready || !window.ETCFKidsContent || !window.ETCFKidsCore || !window.ETCFKidsSession) return;
    root.dataset.ready = 'true';
    const content = window.ETCFKidsContent;
    const core = window.ETCFKidsCore;
    const ui = content.ui;
    const session = window.ETCFKidsSession;
    const initialRoute = session.route(window.location.search, content.activities);
    const mode = initialRoute.mode;
    const shell = document.querySelector('[data-game-shell]');
    const more = document.querySelector('[data-game-more]');
    const menu = document.querySelector('[data-game-menu]');
    const restart = document.querySelector('[data-game-restart]');
    const fullscreen = document.querySelector('[data-game-fullscreen]');
    const dialog = document.querySelector('[data-game-dialog]');
    const notice = document.querySelector('[data-game-notice]');
    let selectedActivity = null;
    let selectedUnit = null;
    let activeRound = false;
    let exiting = false;
    let dialogReturnFocus = null;
    const allowedIds = content.activities.flatMap(activity => activity.units.map(unit => `${activity.id}:${unit.id}`));
    let storage;
    try { storage = window.localStorage; } catch (error) { storage = null; }
    let completed = core.readCompleted(storage, allowedIds);
    let saveFailed = !storage;
    let epoch = 0;
    let pendingTimer = null;
    let settlePending = null;
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
        root.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    function status() {
        const node = el('p', 'kids-feedback');
        node.setAttribute('role', 'status');
        node.setAttribute('aria-live', 'polite');
        node.setAttribute('aria-atomic', 'true');
        return node;
    }
    function clearTimer() {
        window.clearTimeout(pendingTimer);
        pendingTimer = null;
        settlePending = null;
    }
    function progress(label, value = 0, max = 1) {
        document.querySelector('[data-game-progress]').textContent = label;
        const meter = document.querySelector('[data-game-meter]');
        meter.max = max;
        meter.value = value;
    }
    function address() {
        window.history.replaceState(null, '', session.gamePath(selectedActivity, selectedUnit, mode));
    }
    function frame(title, subtitle, stage = 'play') {
        clearTimer();
        closeMenu();
        notice.textContent = '';
        epoch++;
        screen = el('div', 'kids-stage');
        screen.dataset.stage = stage;
        const heading = el('h1', 'kids-game-title', title);
        const eyebrow = el('p', 'game-eyebrow', selectedActivity ? selectedActivity.title : 'ETCF · Play Together');
        screen.append(eyebrow, heading);
        if (subtitle) screen.appendChild(el('p', 'kids-game-intro', subtitle));
        root.replaceChildren(screen);
        document.querySelector('[data-game-name]').textContent = selectedActivity?.title || 'Play Together';
        document.title = title + ' · ETCF Kids Corner';
        restart.hidden = !selectedUnit || stage === 'intro';
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
    function home() {
        activeRound = false;
        selectedActivity = selectedUnit = null;
        address();
        const wrapper = frame(ui.chooserTitle, ui.chooserIntro, 'chooser');
        progress('Choose an activity');
        if (initialRoute.invalid) wrapper.appendChild(el('p', 'kids-feedback', ui.invalidGame));
        const cards = el('div', 'kids-activity-grid');
        content.activities.forEach(activity => {
            const card = el('article', `kids-activity-card kids-tone-${activity.id}`);
            card.append(illustration(activity.art), el('h2', '', activity.title), el('p', '', activity.description));
            const meta = el('p', 'kids-activity-meta');
            meta.append(el('span', '', activity.ages), el('span', '', activity.duration));
            const play = button(ui.select, () => choose(activity));
            play.setAttribute('aria-label', `${ui.select}: ${activity.title}`);
            card.append(meta, play);
            cards.appendChild(card);
        });
        wrapper.appendChild(cards);
    }
    function choose(activity) {
        activeRound = false;
        selectedActivity = activity;
        selectedUnit = null;
        if (!saveFailed) completed = core.readCompleted(storage, allowedIds);
        address();
        const page = frame(activity.choose, activity.description, 'chooser');
        progress(activity.choose);
        const list = el('div', 'kids-choice-grid');
        activity.units.forEach(unit => {
            const card = el('article', 'kids-choice-card');
            const icon = el('span', 'kids-scene-icon', unit.icon);
            icon.setAttribute('aria-hidden', 'true');
            card.append(icon, el('h2', '', unit.title), el('p', 'kids-small', unit.reference));
            if (completed.has(`${activity.id}:${unit.id}`)) card.appendChild(el('p', 'kids-completed-mark', ui.completed));
            const start = button(ui.select, () => introduction(activity, unit));
            start.setAttribute('aria-label', `${ui.select}: ${unit.title}`);
            card.appendChild(start);
            list.appendChild(card);
        });
        page.appendChild(list);
        page.appendChild(button(ui.chooseAnother, home, 'kids-button kids-button-quiet game-choose-another'));
    }
    function introduction(activity, unit) {
        activeRound = false;
        selectedActivity = activity;
        selectedUnit = unit;
        address();
        const page = frame(unit.title, unit.reference, 'intro');
        progress(ui.ready);
        const art = illustration(activity.art);
        art.classList.add('game-intro-art');
        page.insertBefore(art, page.querySelector('h1'));
        page.appendChild(el('p', 'kids-story-intro', unit.intro));
        page.appendChild(el('p', 'game-instructions', ui[activity.id + 'Instructions']));
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
        selectedActivity = activity;
        selectedUnit = unit;
        activeRound = true;
        if (activity.id === 'quiz') quiz(activity, unit, core.createQuiz(unit));
        if (activity.id === 'match') match(activity, unit);
        if (activity.id === 'order') order(activity, unit);
    }
    function saveUnit(activity, unit) {
        // Merge with the latest device progress so another game never loses its work.
        const latest = saveFailed ? completed : core.readCompleted(storage, allowedIds);
        latest.add(`${activity.id}:${unit.id}`);
        completed = latest;
        saveFailed = !core.saveCompleted(storage, completed);
    }
    function complete(activity, unit, scenes) {
        activeRound = false;
        saveUnit(activity, unit);
        const page = frame(ui.completeTitle, unit.title, 'result');
        progress(ui.resultProgress, 1);
        page.appendChild(el('span', 'game-complete-badge', '✓ ' + ui.resultProgress));
        page.appendChild(el('p', 'kids-completion-note', activity.id === 'quiz' ? ui.quizDone : activity.id === 'match' ? ui.matchDone : ui.retell));
        if (scenes) {
            const sequence = el('ol', 'kids-retell');
            scenes.forEach(scene => sequence.appendChild(el('li', '', scene.caption)));
            page.appendChild(sequence);
        }
        page.appendChild(el('p', 'kids-small', saveFailed ? ui.saveFailed : ui.saved));
        const controls = el('div', 'kids-controls');
        controls.appendChild(button(ui.continue, () => mission(activity, unit)));
        page.appendChild(controls);
    }
    function mission(activity, unit) {
        activeRound = false;
        const page = frame(ui.missionTitle, unit.title, 'mission');
        progress(ui.missionProgress, 1);
        const mission = el('div', 'kids-mission');
        [['talk', unit.mission.talk], ['pray', unit.mission.prayer], ['action', unit.mission.action]].forEach(([label, value]) => {
            const row = el('div');
            row.append(el('h2', '', ui[label]), el('p', '', value));
            mission.appendChild(row);
        });
        page.append(mission, el('p', 'kids-small', saveFailed ? ui.saveFailed : ui.saved));
        const controls = el('div', 'kids-controls');
        controls.append(button(ui.replay, () => start(activity, unit)), button(ui.chooseAnother, () => choose(activity), 'kids-button kids-button-quiet'));
        page.appendChild(controls);
    }
    function quiz(activity, unit, round) {
        const page = frame(unit.title, unit.reference);
        const question = round.questions[round.index];
        const roundLabel = text('question', { current: round.index + 1, total: round.questions.length });
        progress(roundLabel, round.index, round.questions.length);
        page.appendChild(el('p', 'kids-round-progress', roundLabel));
        const questionHeading = el('h2', 'kids-question', question.prompt);
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
                    progress(roundLabel, round.index + 1, round.questions.length);
                    if (round.index === round.questions.length - 1) { activeRound = false; saveUnit(activity, unit); }
                    next.hidden = false;
                    next.focus();
                }
            }, 'kids-answer');
            choice.dataset.answerId = answer.id;
            answers.appendChild(choice);
        });
        const hint = button(ui.hint, () => { hintText.textContent = ui.hintPrefix + question.hint; hint.setAttribute('aria-expanded', 'true'); }, 'kids-button kids-button-quiet');
        hint.setAttribute('aria-controls', 'kids-quiz-hint');
        hint.setAttribute('aria-expanded', 'false');
        hintText.id = 'kids-quiz-hint';
        const controls = el('div', 'kids-controls');
        controls.append(next, hint);
        page.dataset.questionId = question.id;
        page.append(questionHeading, answers, feedback, hintText, controls);
    }
    function match(activity, unit) {
        const board = core.createMatch(unit);
        const page = frame(unit.title, unit.reference);
        const token = epoch;
        page.appendChild(el('p', 'kids-game-intro', ui.matchPrompt));
        const count = el('p', 'kids-round-progress');
        const grid = el('div', 'kids-match-grid');
        const feedback = status();
        const facts = el('ul', 'kids-facts');
        const factsBox = el('div', 'kids-discoveries');
        factsBox.append(el('h2', '', ui.discoveries), facts);
        factsBox.hidden = true;
        const finish = button(ui.finish, () => complete(activity, unit));
        finish.hidden = true;
        function sync() {
            count.textContent = text('matchCount', { count: board.found.length, total: unit.pairs.length });
            progress(count.textContent, board.found.length, unit.pairs.length);
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
                        settlePending = null;
                    }, 1200);
                    settlePending = () => { core.resolveMismatch(board); sync(); };
                }
                if (result.type === 'match') {
                    const pair = unit.pairs.find(pair => pair.id === result.pairId);
                    feedback.textContent = ui.matchFound + pair.fact;
                    facts.appendChild(el('li', '', `${pair.fact} (${pair.reference})`));
                    factsBox.hidden = false;
                    if (board.found.length === unit.pairs.length) {
                        activeRound = false;
                        saveUnit(activity, unit);
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
        controls.append(finish);
        page.append(count, grid, feedback, factsBox, controls);
    }
    function order(activity, unit) {
        let scenes = core.scrambleStory(unit.scenes);
        const page = frame(unit.title, unit.reference);
        progress(text('storyProgress', { total: scenes.length }));
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
            button(ui.hint, () => { hint.textContent = ui.hintPrefix + unit.hint; }, 'kids-button kids-button-quiet')
        );
        page.append(list, feedback, hint, controls);
    }
    function closeMenu(restoreFocus = false) {
        menu.hidden = true;
        more.setAttribute('aria-expanded', 'false');
        if (restoreFocus) more.focus();
    }
    function closeDialog() { dialog.close(); }
    function showDialog(title, body, actions, returnFocus = document.activeElement) {
        if (dialog.open) return;
        dialogReturnFocus = returnFocus;
        const heading = el('h2', '', title);
        heading.id = 'game-dialog-title';
        const controls = el('div', 'kids-controls');
        actions.forEach(([label, action, quiet]) => controls.appendChild(button(label, action, 'kids-button' + (quiet ? ' kids-button-quiet' : ''))));
        dialog.replaceChildren(heading);
        if (body) dialog.appendChild(el('p', '', body));
        dialog.appendChild(controls);
        dialog.showModal();
        controls.querySelector('button').focus();
    }
    dialog.addEventListener('close', () => {
        if (dialogReturnFocus?.isConnected && !exiting) dialogReturnFocus.focus({ preventScroll: true });
    });
    function leave() {
        if (exiting) return;
        exiting = true;
        clearTimer();
        epoch++;
        if (dialog.open) closeDialog();
        session.exitGame(window, mode);
    }
    document.querySelector('[data-game-exit]').addEventListener('click', () => {
        closeMenu();
        if (!activeRound) leave();
        else showDialog(ui.leaveTitle, '', [[ui.keepPlaying, closeDialog], [ui.exitGame, leave, true]]);
    });
    more.addEventListener('click', () => {
        const opening = menu.hidden;
        menu.hidden = !opening;
        more.setAttribute('aria-expanded', String(opening));
        if (opening) menu.querySelector('button:not([hidden])').focus();
    });
    document.addEventListener('click', event => {
        if (!event.target.closest('.game-more-wrap')) closeMenu();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !menu.hidden) { event.preventDefault(); closeMenu(true); }
    });
    menu.addEventListener('focusout', event => {
        if (!event.relatedTarget?.closest('.game-more-wrap')) closeMenu();
    });
    document.querySelector('[data-game-help]').addEventListener('click', () => {
        closeMenu();
        const instructions = selectedActivity ? ui[selectedActivity.id + 'Instructions'] : ui.chooserIntro;
        showDialog(ui.howToPlay, instructions + ' ' + ui.instructionNote, [[ui.gotIt, closeDialog]], more);
    });
    restart.addEventListener('click', () => {
        closeMenu();
        if (!selectedUnit) return;
        const playAgain = () => { dialogReturnFocus = null; closeDialog(); start(selectedActivity, selectedUnit); };
        if (activeRound) showDialog(ui.restartTitle, ui.restartNote, [[ui.keepPlaying, closeDialog], [ui.restart, playAgain, true]], more);
        else start(selectedActivity, selectedUnit);
    });
    if (document.fullscreenEnabled && typeof shell.requestFullscreen === 'function') {
        fullscreen.hidden = false;
        fullscreen.addEventListener('click', async () => {
            closeMenu(true);
            try {
                if (document.fullscreenElement) await document.exitFullscreen();
                else await shell.requestFullscreen();
                notice.textContent = '';
            } catch (error) { notice.textContent = ui.fullScreenFailed; }
        });
        document.addEventListener('fullscreenchange', () => {
            fullscreen.textContent = document.fullscreenElement ? ui.leaveFullScreen : ui.fullScreen;
        });
    }
    window.addEventListener('pagehide', () => {
        window.clearTimeout(pendingTimer);
        settlePending?.();
        pendingTimer = settlePending = null;
        closeMenu();
    });
    window.addEventListener('pageshow', event => {
        if (!event.persisted || !exiting) return;
        // Back can restore the exact document we explicitly left. Recreate its
        // controls after invalidating old callbacks; discarded rounds start fresh.
        exiting = false;
        activeRound = false;
        dialogReturnFocus = null;
        if (selectedUnit) introduction(selectedActivity, selectedUnit);
        else if (selectedActivity) choose(selectedActivity);
        else home();
    });
    if (typeof ResizeObserver === 'function') {
        new ResizeObserver(entries => {
            shell.style.setProperty('--game-bar-height', entries[0].target.offsetHeight + 'px');
        }).observe(document.querySelector('.game-topbar'));
    }
    if (initialRoute.unit) introduction(initialRoute.activity, initialRoute.unit);
    else if (initialRoute.activity) choose(initialRoute.activity);
    else home();
}());
