(function () {
    const prefersReducedMotion = typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    function ready(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback, { once: true });
        } else {
            callback();
        }
    }

    ready(() => {
        const explorer = document.querySelector('[data-annual-events]');
        if (!explorer) return;

        const tabs = Array.from(explorer.querySelectorAll('[data-month-tab]'));
        const panels = Array.from(explorer.querySelectorAll('[data-month-panel]'));
        const emptyState = explorer.querySelector('[data-annual-empty]');
        if (!tabs.length || !panels.length) return;

        const currentYear = String(new Date().getFullYear());
        document.querySelectorAll('[data-event-year]').forEach(element => {
            element.textContent = currentYear;
        });

        explorer.classList.add('is-enhanced');

        const currentMonthIndex = new Date().getMonth();
        const currentMonthTab = tabs.find(tab => Number(tab.dataset.monthIndex) === currentMonthIndex);
        if (currentMonthTab) {
            currentMonthTab.classList.add('is-current');
            currentMonthTab.setAttribute('aria-label', `${currentMonthTab.textContent.trim()} current month`);
        }

        const panelFor = month => panels.find(panel => panel.dataset.monthPanel === month);
        const tabFor = month => tabs.find(tab => tab.dataset.monthTab === month);
        const hasListedEvents = month => Boolean(panelFor(month)?.querySelector('.annual-event-card'));
        const monthFromHash = () => {
            const match = window.location.hash.match(/^#month-([a-z]+)$/);
            return match && tabFor(match[1]) ? match[1] : '';
        };

        const firstAvailableMonth = () => {
            const currentMonth = currentMonthTab?.dataset.monthTab || '';
            if (currentMonth && hasListedEvents(currentMonth)) return currentMonth;
            return tabs.find(tab => hasListedEvents(tab.dataset.monthTab))?.dataset.monthTab || tabs[0].dataset.monthTab;
        };

        function setActiveMonth(month, options = {}) {
            const activeTab = tabFor(month) || tabs[0];
            const activeMonth = activeTab.dataset.monthTab;
            const activePanel = panelFor(activeMonth);
            if (!activePanel) return;

            tabs.forEach(tab => {
                const isActive = tab === activeTab;
                tab.classList.toggle('is-active', isActive);
                tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
                tab.tabIndex = isActive ? 0 : -1;
            });

            panels.forEach(panel => {
                const isActive = panel === activePanel;
                panel.classList.toggle('is-active', isActive);
                panel.hidden = !isActive;
                panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
            });

            if (emptyState) {
                emptyState.hidden = hasListedEvents(activeMonth);
            }

            if (options.focus) {
                activeTab.focus();
            }

            if (options.center && typeof activeTab.scrollIntoView === 'function') {
                activeTab.scrollIntoView({
                    block: 'nearest',
                    inline: 'center',
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                });
            }
        }

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                setActiveMonth(tab.dataset.monthTab, { center: true });
            });

            tab.addEventListener('keydown', event => {
                const key = event.key;
                const lastIndex = tabs.length - 1;
                let nextIndex = index;

                if (key === 'ArrowRight' || key === 'ArrowDown') {
                    nextIndex = index === lastIndex ? 0 : index + 1;
                } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
                    nextIndex = index === 0 ? lastIndex : index - 1;
                } else if (key === 'Home') {
                    nextIndex = 0;
                } else if (key === 'End') {
                    nextIndex = lastIndex;
                } else if (key === ' ' || key === 'Enter') {
                    event.preventDefault();
                    setActiveMonth(tab.dataset.monthTab, { center: true });
                    return;
                } else {
                    return;
                }

                event.preventDefault();
                setActiveMonth(tabs[nextIndex].dataset.monthTab, { focus: true, center: true });
            });
        });

        window.addEventListener('hashchange', () => {
            const hashedMonth = monthFromHash();
            if (hashedMonth) setActiveMonth(hashedMonth, { center: true });
        });

        setActiveMonth(monthFromHash() || firstAvailableMonth(), { center: true });
    });
}());
