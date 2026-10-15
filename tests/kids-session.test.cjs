const test = require('node:test');
const assert = require('node:assert/strict');
const content = require('../src/js/kids-content.js');
const session = require('../src/js/kids-session.js');

test('every activity and topic round-trips to the shared content, preserving existing IDs', () => {
    content.activities.forEach(activity => {
        const chooser = session.route(session.gamePath(activity).split('?')[1], content.activities);
        assert.equal(chooser.activity, activity);
        assert.equal(chooser.unit, undefined);
        activity.units.forEach(unit => {
            const selected = session.route(session.gamePath(activity, unit, 'window').split('?')[1], content.activities);
            assert.equal(selected.activity, activity);
            assert.equal(selected.unit, unit);
            assert.equal(selected.mode, 'window');
            assert.equal(selected.invalid, false);
        });
    });
});
test('missing or invalid parameters recover to a chooser and cannot select foreign content', () => {
    for (const search of ['', '?game=unknown', '?topic=creation', '?game=quiz&topic=unknown', '?game=quiz&topic=church', '?game=quiz&game=order', '?game=quiz&topic=birth&topic=creation', '?game=%3Cscript%3E']) {
        const selected = session.route(search, content.activities);
        assert.equal(selected.activity == null, true);
        assert.equal(selected.unit == null, true);
    }
});
function launcherHost() {
    const events = [];
    let opener = 'parent';
    const child = {
        closed: false,
        get opener() { return opener; },
        set opener(value) { opener = value; events.push('isolated'); },
        location: { replace(path) { assert.equal(opener, null); events.push(path); } },
        focus() { events.push('focused'); },
        close() { child.closed = true; },
    };
    const host = { now: () => 1000, screen: { availWidth: 1366, availHeight: 768 }, open(...args) { events.push(args); return child; } };
    return { host, child, events };
}
test('launch opens synchronously, isolates the opener before navigation, and reuses an open game', () => {
    const { host, child, events } = launcherHost();
    const launch = session.createLauncher(host);
    assert.equal(launch('kids-play.html?game=quiz&mode=window'), 'opened');
    assert.equal(events[0][0], 'about:blank');
    assert.equal(events[0][1], 'ETCFKidsGame');
    assert.doesNotMatch(events[0][2], /noopener/);
    assert.deepEqual(events.slice(1, 3), ['isolated', 'kids-play.html?game=quiz&mode=window']);
    assert.equal(launch('kids-play.html?game=quiz&mode=window'), 'existing');
    host.now = () => 3000;
    assert.equal(launch('kids-play.html?game=order&mode=window'), 'existing');
    assert.equal(events.filter(Array.isArray).length, 1);
    child.closed = true;
    host.open = () => ({ ...child, closed: false });
    assert.equal(launch('kids-play.html?game=order&mode=window'), 'opened');
});
test('blocked and throwing opens offer fallback without duplicate attempts on rapid taps', () => {
    for (const open of [() => null, () => { throw Error('blocked'); }]) {
        let calls = 0;
        let time = 1000;
        const launch = session.createLauncher({ now: () => time, open() { calls++; return open(); } });
        assert.equal(launch('kids-play.html?game=match'), 'blocked');
        assert.equal(launch('kids-play.html?game=match'), 'repeat');
        assert.equal(calls, 1);
        time = 2000;
        assert.equal(launch('kids-play.html?game=match'), 'blocked');
        assert.equal(calls, 2);
    }
});
test('refused focus does not masquerade as a blocked popup or create another game', () => {
    const { host, child, events } = launcherHost();
    child.focus = () => { throw Error('focus refused'); };
    const launch = session.createLauncher(host);
    assert.equal(launch('kids-play.html?game=quiz'), 'opened');
    assert.equal(child.closed, false);
    assert.equal(launch('kids-play.html?game=quiz'), 'existing');
    assert.equal(events.filter(Array.isArray).length, 1);
});
test('a window that cannot be isolated is closed and offers a same-tab fallback', () => {
    const { host, child } = launcherHost();
    Object.defineProperty(child, 'opener', { get: () => 'parent', set() {} });
    assert.equal(session.createLauncher(host)('kids-play.html'), 'blocked');
    assert.equal(child.closed, true);
});
test('requested windows fit small screens, are resizable, and allow scrolling', () => {
    for (const [width, height] of [[320, 568], [844, 390], [1366, 768]]) {
        const features = Object.fromEntries(session.windowFeatures({ availWidth: width, availHeight: height }).split(',').map(part => part.split('=')));
        assert.ok(Number(features.width) <= width);
        assert.ok(Number(features.height) <= height);
        assert.equal(features.resizable, 'yes');
        assert.equal(features.scrollbars, 'yes');
    }
});
function exitHost(closeWorks = false) {
    const events = [];
    let callback;
    const host = { name: session.WINDOW_NAME, closed: false, close() { events.push('close'); host.closed = closeWorks; }, setTimeout(fn) { callback = fn; }, location: { assign(path) { events.push(path); } } };
    return { host, events, settle: () => callback?.() };
}
test('script-opened windows close, while refused closes return to the fixed Kids Corner anchor', () => {
    for (const closeWorks of [true, false]) {
        const { host, events, settle } = exitHost(closeWorks);
        session.exitGame(host, 'window');
        assert.deepEqual(events, ['close']);
        settle();
        assert.deepEqual(events, closeWorks ? ['close'] : ['close', session.RETURN_PATH]);
    }
});
test('same-tab and direct exits never depend on opener, referrer, history, or supplied return URLs', () => {
    const parsed = session.route('?game=quiz&return=https://example.com&mode=anything', content.activities);
    assert.equal(parsed.mode, 'here');
    const { host, events } = exitHost();
    session.exitGame(host, parsed.mode);
    assert.deepEqual(events, ['kids-resources.html#kids-activities']);
    host.close = () => { throw Error('close refused'); };
    const callbacks = [];
    host.setTimeout = fn => callbacks.push(fn);
    session.exitGame(host, 'window');
    callbacks[0]();
    assert.equal(events.at(-1), session.RETURN_PATH);
});
test('a copied or bookmarked window-mode URL returns directly when it is not the named game window', () => {
    const { host, events } = exitHost(true);
    host.name = '';
    session.exitGame(host, 'window');
    assert.deepEqual(events, [session.RETURN_PATH]);
    assert.equal(host.closed, false);
});
