/* Small, dependency-free game rules. Browser and Node share the same implementation. */
(function (root, factory) {
    const core = factory();
    if (typeof module === 'object' && module.exports) module.exports = core;
    else root.ETCFKidsCore = core;
}(typeof window !== 'undefined' ? window : this, function () {
    const STORAGE_KEY = 'etcf.kids.completed.v1';
    function shuffle(items, random = Math.random) {
        const copy = items.slice();
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }
    function createQuiz(topic, random = Math.random) {
        return { questions: shuffle(topic.questions, random).slice(0, 5).map(question => ({ ...question, answers: shuffle(question.answers, random) })), index: 0, answered: false, complete: false };
    }
    function answerQuiz(round, answerId) {
        if (round.complete || round.answered) return 'ignored';
        const question = round.questions[round.index];
        if (!question.answers.some(answer => answer.id === answerId)) return 'ignored';
        if (answerId !== question.correctAnswerId) return 'retry';
        round.answered = true;
        return 'correct';
    }
    function advanceQuiz(round, questionId) {
        if (round.complete || !round.answered || round.questions[round.index].id !== questionId) return false;
        round.index++;
        round.answered = false;
        round.complete = round.index === round.questions.length;
        return true;
    }
    function createMatch(set, random = Math.random) {
        return { cards: shuffle(set.pairs.flatMap(pair => ['left', 'right'].map(side => ({ id: `${pair.id}-${side}`, pairId: pair.id, label: pair[side], icon: pair.icon, status: 'down' }))), random), selected: [], found: [], busy: false };
    }
    function flipCard(board, id) {
        const card = board.cards.find(card => card.id === id);
        if (!card || board.busy || card.status !== 'down') return { type: 'ignored' };
        card.status = 'up';
        board.selected.push(card);
        if (board.selected.length === 1) return { type: 'first' };
        const [first, second] = board.selected;
        if (first.pairId === second.pairId) {
            first.status = second.status = 'matched';
            board.found.push(first.pairId);
            board.selected = [];
            return { type: 'match', pairId: first.pairId };
        }
        board.busy = true;
        return { type: 'mismatch' };
    }
    function resolveMismatch(board) {
        if (!board.busy) return;
        board.selected.forEach(card => { card.status = 'down'; });
        board.selected = [];
        board.busy = false;
    }
    function isStoryCorrect(scenes, expected) {
        return scenes.length === expected.length && scenes.every((scene, index) => scene.id === expected[index].id);
    }
    function scrambleStory(scenes, random = Math.random) {
        const order = shuffle(scenes, random);
        if (order.length > 1 && isStoryCorrect(order, scenes)) order.push(order.shift());
        return order;
    }
    function moveScene(scenes, id, direction) {
        const order = scenes.slice();
        const from = order.findIndex(scene => scene.id === id);
        const to = from + direction;
        if (from < 0 || ![-1, 1].includes(direction) || to < 0 || to >= order.length) return order;
        [order[from], order[to]] = [order[to], order[from]];
        return order;
    }
    function readCompleted(storage, allowedIds) {
        try {
            const value = JSON.parse(storage.getItem(STORAGE_KEY));
            return new Set(Array.isArray(value) ? value.filter(id => typeof id === 'string' && allowedIds.includes(id)) : []);
        } catch (error) { return new Set(); }
    }
    function saveCompleted(storage, completed) {
        try { storage.setItem(STORAGE_KEY, JSON.stringify([...completed])); return true; }
        catch (error) { return false; }
    }
    function resetProgress(storage) {
        try { storage.removeItem(STORAGE_KEY); return true; }
        catch (error) { return false; }
    }
    return { STORAGE_KEY, shuffle, createQuiz, answerQuiz, advanceQuiz, createMatch, flipCard, resolveMismatch, isStoryCorrect, scrambleStory, moveScene, readCompleted, saveCompleted, resetProgress };
}));
