/* Shared routes and window lifecycle. Dependencies are injectable for focused tests. */
(function (root, factory) {
    const session = factory();
    if (typeof module === 'object' && module.exports) module.exports = session;
    else root.ETCFKidsSession = session;
}(typeof window !== 'undefined' ? window : this, function () {
    const RETURN_PATH = 'kids-resources.html#kids-activities';
    const WINDOW_NAME = 'ETCFKidsGame';
    function route(search, activities) {
        const params = new URLSearchParams(search);
        const activity = activities.find(item => item.id === params.get('game'));
        const topic = params.get('topic');
        const unit = activity?.units.find(item => item.id === topic);
        const invalid = params.getAll('game').length > 1 || params.getAll('topic').length > 1 ||
            (params.has('game') && !activity) || (params.has('topic') && !unit);
        return { activity: invalid ? null : activity, unit: invalid ? null : unit, invalid,
            mode: params.get('mode') === 'window' ? 'window' : 'here' };
    }
    function gamePath(activity, unit, mode = 'here') {
        const params = new URLSearchParams();
        if (activity) params.set('game', activity.id);
        if (unit) params.set('topic', unit.id);
        params.set('mode', mode === 'window' ? 'window' : 'here');
        return 'kids-play.html?' + params;
    }
    function windowFeatures(screen = {}) {
        const availableWidth = Math.max(1, screen.availWidth || 1200);
        const availableHeight = Math.max(1, screen.availHeight || 800);
        const width = Math.min(1120, Math.max(1, availableWidth - 48));
        const height = Math.min(880, Math.max(1, availableHeight - 64));
        const left = Math.round((screen.availLeft || 0) + (availableWidth - width) / 2);
        const top = Math.round((screen.availTop || 0) + (availableHeight - height) / 2);
        return `popup=yes,resizable=yes,scrollbars=yes,width=${width},height=${height},left=${left},top=${top}`;
    }
    function createLauncher(host) {
        let child = null;
        let lastAttempt = -Infinity;
        return function launch(path) {
            const now = host.now();
            try {
                if (child && !child.closed) {
                    try { child.focus(); } catch (error) { /* A refused focus is still an open game. */ }
                    return 'existing';
                }
            } catch (error) { child = null; }
            if (now - lastAttempt < 800) return 'repeat';
            lastAttempt = now;
            try {
                // Opening our blank page without noopener gives an accurate blocked result.
                // Sever its opener synchronously BEFORE loading any game code.
                child = host.open('about:blank', WINDOW_NAME, windowFeatures(host.screen));
                if (!child || child.closed) { child = null; return 'blocked'; }
                child.opener = null;
                if (child.opener !== null) throw new Error('Could not isolate game window');
                child.location.replace(path);
                try { child.focus(); } catch (error) { /* Browser preferences may refuse focus. */ }
                return 'opened';
            } catch (error) {
                try { child?.close(); } catch (closeError) { /* The same-tab route is still usable. */ }
                child = null;
                return 'blocked';
            }
        };
    }
    function exitGame(host, mode) {
        // A bookmarked/copied URL must not close an unrelated tab. The named
        // browsing context survives refresh without depending on its opener.
        if (mode === 'window' && host.name === WINDOW_NAME) {
            try { host.close(); } catch (error) { /* Use the fixed return destination below. */ }
            // A script-opened window usually closes immediately. A refused close leaves
            // this callback alive, so bookmarks and windows without an opener still exit.
            host.setTimeout(() => { if (!host.closed) host.location.assign(RETURN_PATH); }, 120);
        } else host.location.assign(RETURN_PATH);
    }
    return { RETURN_PATH, WINDOW_NAME, route, gamePath, windowFeatures, createLauncher, exitGame };
}));
