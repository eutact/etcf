const test = require('node:test');
const assert = require('node:assert/strict');
const content = require('../src/js/kids-content.js');
const core = require('../src/js/kids-game-core.js');
const random = seed => () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
const ids = content.activities.flatMap(activity => activity.units.map(unit => `${activity.id}:${unit.id}`));

test('all 30 questions have stable IDs, one valid answer, references, hints, and explanations', () => {
    assert.equal(content.quiz.length, 5);
    const all = content.quiz.flatMap(topic => {
        assert.equal(topic.questions.length, 6);
        return topic.questions;
    });
    assert.equal(all.length, 30);
    assert.equal(new Set(all.map(question => question.id)).size, 30);
    all.forEach(question => {
        assert.ok(question.answers.length >= 3 && question.answers.length <= 4);
        assert.equal(new Set(question.answers.map(answer => answer.id)).size, question.answers.length);
        assert.equal(question.answers.filter(answer => answer.id === question.correctAnswerId).length, 1);
        for (const key of ['id', 'prompt', 'hint', 'explanation', 'reference']) assert.ok(question[key].trim());
        question.answers.forEach(answer => assert.ok(answer.id && answer.text.trim()));
    });
});
test('all eleven activity endings have a discussion, original prayer, and offline mission', () => {
    assert.equal(ids.length, 11);
    assert.equal(new Set(ids).size, 11);
    content.activities.forEach(activity => activity.units.forEach(unit => {
        assert.ok(unit.id && unit.reference && unit.intro);
        for (const key of ['talk', 'prayer', 'action']) assert.ok(unit.mission[key].trim());
    }));
});
test('quiz rounds have five unique questions from the selected topic and retain answer IDs after shuffling', () => {
    content.quiz.forEach(topic => {
        for (let seed = 1; seed <= 50; seed++) {
            const round = core.createQuiz(topic, random(seed));
            assert.equal(round.questions.length, 5);
            assert.equal(new Set(round.questions.map(question => question.id)).size, 5);
            round.questions.forEach(question => {
                const original = topic.questions.find(item => item.id === question.id);
                assert.ok(original);
                assert.equal(question.correctAnswerId, original.correctAnswerId);
                assert.deepEqual(new Set(question.answers.map(answer => answer.id)), new Set(original.answers.map(answer => answer.id)));
            });
        }
    });
});
test('quiz retries and rapid taps cannot advance a question or count it twice', () => {
    const round = core.createQuiz(content.quiz[0], random(4));
    while (!round.complete) {
        const question = round.questions[round.index];
        const before = round.index;
        const wrong = question.answers.find(answer => answer.id !== question.correctAnswerId);
        assert.equal(core.advanceQuiz(round, question.id), false);
        assert.equal(core.answerQuiz(round, wrong.id), 'retry');
        assert.equal(core.answerQuiz(round, 'missing'), 'ignored');
        assert.equal(round.index, before);
        assert.equal(core.answerQuiz(round, question.correctAnswerId), 'correct');
        assert.equal(core.answerQuiz(round, question.correctAnswerId), 'ignored');
        assert.equal(core.advanceQuiz(round, question.id), true);
        assert.equal(core.advanceQuiz(round, question.id), false);
    }
    assert.equal(round.index, 5);
    assert.equal(core.answerQuiz(round, 'anything'), 'ignored');
});
test('each matching set has four pairs and a fact and source for every pair', () => {
    assert.equal(content.matching.length, 3);
    content.matching.forEach(set => {
        assert.equal(set.pairs.length, 4);
        assert.equal(new Set(set.pairs.map(pair => pair.id)).size, 4);
        set.pairs.forEach(pair => ['left', 'right', 'fact', 'reference'].forEach(key => assert.ok(pair[key].trim())));
        const board = core.createMatch(set, random(5));
        assert.equal(board.cards.length, 8);
        assert.equal(new Set(board.cards.map(card => card.id)).size, 8);
        set.pairs.forEach(pair => assert.equal(board.cards.filter(card => card.pairId === pair.id).length, 2));
    });
});
test('matching prevents same-card and extra selection while a mismatch resolves', () => {
    const board = core.createMatch(content.matching[0], random(5));
    const first = board.cards[0];
    const other = board.cards.find(card => card.pairId !== first.pairId);
    const third = board.cards.find(card => card.id !== first.id && card.id !== other.id);
    assert.equal(core.flipCard(board, first.id).type, 'first');
    assert.equal(core.flipCard(board, first.id).type, 'ignored');
    assert.equal(core.flipCard(board, other.id).type, 'mismatch');
    assert.equal(core.flipCard(board, third.id).type, 'ignored');
    assert.equal(board.selected.length, 2);
    core.resolveMismatch(board);
    assert.equal(board.selected.length, 0);
    assert.equal(board.busy, false);
    assert.equal(first.status, 'down');
});
test('matching finishes once per pair, and a replay has an independent shuffled board', () => {
    const set = content.matching[1];
    const board = core.createMatch(set, random(8));
    set.pairs.forEach(pair => {
        const [a, b] = board.cards.filter(card => card.pairId === pair.id);
        assert.equal(core.flipCard(board, a.id).type, 'first');
        assert.equal(core.flipCard(board, b.id).type, 'match');
        assert.equal(core.flipCard(board, a.id).type, 'ignored');
    });
    assert.equal(board.found.length, 4);
    assert.ok(board.cards.every(card => card.status === 'matched'));
    const replay = core.createMatch(set, random(99));
    assert.equal(replay.found.length, 0);
    assert.ok(replay.cards.every(card => card.status === 'down'));
    assert.notDeepEqual(replay.cards.map(card => card.id), board.cards.map(card => card.id));
});
test('three stories have four to six unique scenes and always begin out of order', () => {
    assert.equal(content.ordering.length, 3);
    content.ordering.forEach(story => {
        assert.ok(story.scenes.length >= 4 && story.scenes.length <= 6);
        assert.equal(new Set(story.scenes.map(scene => scene.id)).size, story.scenes.length);
        assert.ok(story.hint.trim());
        for (const rng of [random(3), () => 0.999999]) {
            const order = core.scrambleStory(story.scenes, rng);
            assert.equal(core.isStoryCorrect(order, story.scenes), false);
            assert.deepEqual(new Set(order.map(scene => scene.id)), new Set(story.scenes.map(scene => scene.id)));
        }
    });
});
test('story ordering uses non-mutating moves, handles boundaries, and checks without changing the arrangement', () => {
    const story = content.ordering[0];
    const scenes = core.scrambleStory(story.scenes, random(10));
    const before = scenes.map(scene => scene.id);
    core.isStoryCorrect(scenes, story.scenes);
    assert.deepEqual(scenes.map(scene => scene.id), before);
    assert.deepEqual(core.moveScene(scenes, scenes[0].id, -1), scenes);
    let order = scenes;
    story.scenes.forEach((scene, target) => {
        while (order.findIndex(item => item.id === scene.id) > target) order = core.moveScene(order, scene.id, -1);
    });
    assert.equal(core.isStoryCorrect(order, story.scenes), true);
    assert.deepEqual(scenes.map(scene => scene.id), before);
});
function memoryStorage() {
    const values = new Map();
    return { values, getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
}
test('only valid completed activity IDs persist, and reset never touches other storage', () => {
    const storage = memoryStorage();
    storage.setItem('another-feature', 'keep me');
    assert.equal(core.saveCompleted(storage, new Set([ids[0], ids[1]])), true);
    assert.deepEqual([...core.readCompleted(storage, ids)], [ids[0], ids[1]]);
    assert.deepEqual(JSON.parse(storage.getItem(core.STORAGE_KEY)), [ids[0], ids[1]]);
    storage.setItem(core.STORAGE_KEY, JSON.stringify([ids[0], ids[0], 'obsolete', 123]));
    assert.deepEqual([...core.readCompleted(storage, ids)], [ids[0]]);
    core.resetProgress(storage);
    assert.equal(storage.getItem('another-feature'), 'keep me');
    assert.equal(storage.getItem(core.STORAGE_KEY), null);
});
test('corrupt, outdated, unavailable, and quota-limited storage never prevents play', () => {
    const storage = memoryStorage();
    for (const value of ['bad json', '{"version":0}', 'null', '42']) {
        storage.setItem(core.STORAGE_KEY, value);
        assert.equal(core.readCompleted(storage, ids).size, 0);
    }
    const blocked = { getItem() { throw Error('blocked'); }, setItem() { throw Error('quota'); }, removeItem() { throw Error('blocked'); } };
    for (const value of [null, blocked]) {
        assert.equal(core.readCompleted(value, ids).size, 0);
        assert.equal(core.saveCompleted(value, new Set([ids[0]])), false);
        assert.equal(core.resetProgress(value), false);
    }
    const round = core.createQuiz(content.quiz[0], random(2));
    assert.equal(core.answerQuiz(round, round.questions[0].correctAnswerId), 'correct');
});
