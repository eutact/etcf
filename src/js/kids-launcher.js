(function () {
    const root = document.querySelector('[data-kids-launcher]');
    if (!root || root.dataset.ready || !window.ETCFKidsContent || !window.ETCFKidsCore || !window.ETCFKidsSession) return;
    root.dataset.ready = 'true';
    const { activities, ui } = window.ETCFKidsContent;
    const core = window.ETCFKidsCore;
    const session = window.ETCFKidsSession;
    const allowedIds = activities.flatMap(activity => activity.units.map(unit => `${activity.id}:${unit.id}`));
    let storage;
    try { storage = window.localStorage; } catch (error) { storage = null; }
    const launch = session.createLauncher({ open: (...args) => window.open(...args), screen: window.screen, now: Date.now });
    const el = (tag, className, text) => {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    };
    const wrapper = el('div');
    wrapper.append(el('h2', 'kids-section-title', ui.homeTitle), el('p', 'kids-game-intro', ui.homeIntro));
    const note = el('p', 'kids-window-note', ui.opensWindow);
    note.id = 'kids-window-note';
    wrapper.appendChild(note);
    const cards = el('div', 'kids-activity-grid');
    const counts = [];
    activities.forEach(activity => {
        const card = el('article', `kids-activity-card kids-tone-${activity.id}`);
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 120 88');
        svg.setAttribute('aria-hidden', 'true');
        svg.classList.add('kids-activity-art');
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttribute('href', `src/assets/kids-activities.svg#${activity.art}`);
        svg.appendChild(use);
        const meta = el('p', 'kids-activity-meta');
        meta.append(el('span', '', activity.ages), el('span', '', activity.duration));
        const count = el('p', 'kids-small');
        counts.push({ activity, node: count });
        const play = el('a', 'kids-button', ui.play + ' ↗');
        play.href = session.gamePath(activity, null, 'window');
        play.target = '_blank';
        play.rel = 'noopener';
        play.dataset.kidsStart = activity.id;
        play.setAttribute('aria-label', `${ui.play}: ${activity.title}`);
        play.setAttribute('aria-describedby', note.id);
        card.append(svg, el('h3', '', activity.title), el('p', '', activity.description), meta, count, play);
        cards.appendChild(card);
    });
    const launchNotice = el('div', 'kids-launch-notice');
    const announcement = el('p');
    announcement.setAttribute('role', 'status');
    const fallback = el('a', 'kids-button kids-button-quiet', ui.playHere);
    fallback.hidden = true;
    launchNotice.append(announcement, fallback);
    const progress = el('aside', 'kids-progress');
    const progressTitle = el('h3', '', ui.progress);
    const progressCount = el('p');
    const saveNotice = el('p', 'kids-small');
    saveNotice.setAttribute('role', 'status');
    const reset = el('button', 'kids-button kids-button-quiet', ui.reset);
    reset.type = 'button';
    progress.append(progressTitle, progressCount, el('p', 'kids-small', ui.progressNote), reset, saveNotice);
    wrapper.append(cards, launchNotice, progress);
    root.replaceChildren(wrapper);
    function syncProgress() {
        const completed = core.readCompleted(storage, allowedIds);
        progressCount.textContent = ui.progressCount.replace('{count}', completed.size).replace('{total}', allowedIds.length);
        counts.forEach(({ activity, node }) => {
            const count = activity.units.filter(unit => completed.has(`${activity.id}:${unit.id}`)).length;
            node.textContent = ui.progressCount.replace('{count}', count).replace('{total}', activity.units.length);
        });
        if (!storage) saveNotice.textContent = ui.saveFailed;
    }
    reset.addEventListener('click', () => {
        saveNotice.textContent = core.resetProgress(storage) ? ui.resetDone : ui.saveFailed;
        syncProgress();
    });
    document.querySelectorAll('[data-kids-start]').forEach(link => {
        const activity = activities.find(item => item.id === link.dataset.kidsStart);
        const unit = activity?.units.find(item => item.id === link.dataset.kidsUnit);
        if (!activity) return;
        link.href = session.gamePath(activity, unit, 'window');
        link.target = '_blank';
        link.rel = 'noopener';
        link.setAttribute('aria-describedby', note.id);
        link.addEventListener('click', event => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            const result = launch(session.gamePath(activity, unit, 'window'));
            if (result === 'repeat') return;
            fallback.hidden = result !== 'blocked';
            if (result === 'blocked') {
                link.after(launchNotice);
                announcement.textContent = ui.popupBlocked;
                fallback.href = session.gamePath(activity, unit, 'here');
                fallback.focus();
            } else announcement.textContent = result === 'existing' ? ui.alreadyOpen : ui.gameOpened;
        });
    });
    window.addEventListener('focus', syncProgress);
    window.addEventListener('pageshow', syncProgress);
    window.addEventListener('storage', event => {
        if (event.key === core.STORAGE_KEY || event.key === null) syncProgress();
    });
    document.addEventListener('visibilitychange', () => { if (!document.hidden) syncProgress(); });
    syncProgress();
}());
