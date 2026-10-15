(function () {
    const SANITY_PROJECT_ID = 'xx91ckl7';
    const SANITY_DATASET = 'production';
    const EDMONTON_TIME_ZONE = 'America/Edmonton';

    function parseEventDate(value) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
        const [year, month, day] = value.split('-').map(Number);
        const date = new Date(Date.UTC(year, month - 1, day));
        return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
            ? date : null;
    }

    function element(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function renderEventCard(event) {
        const card = element('article', 'annual-event-card');
        if (event.category) card.appendChild(element('span', 'annual-event-type', event.category));
        card.appendChild(element('h4', '', event.title));
        if (event.description) card.appendChild(element('p', '', event.description));

        const date = parseEventDate(event.date);
        const dateLabel = date.toLocaleDateString('en-CA', {
            year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
        });
        const weekday = date.toLocaleDateString('en-CA', {weekday: 'long', timeZone: 'UTC'});
        const metadata = element('dl', 'annual-event-meta');
        [
            {label: 'Date', icon: 'far fa-calendar-alt', value: `${dateLabel} (${weekday})`},
            {label: 'Time', icon: 'far fa-clock', value: event.time},
            {label: 'Venue', icon: 'fas fa-location-dot', value: event.venue},
        ].forEach(item => {
            const row = element('div');
            const label = element('dt');
            const icon = element('i', item.icon);
            icon.setAttribute('aria-hidden', 'true');
            label.append(icon, document.createTextNode(item.label));
            const value = element('dd');
            if (item.label === 'Date') {
                const time = element('time', '', item.value);
                time.dateTime = event.date;
                value.appendChild(time);
            } else {
                value.textContent = item.value;
            }
            row.append(label, value);
            metadata.appendChild(row);
        });
        card.appendChild(metadata);
        if (event.note) card.appendChild(element('p', 'annual-event-note', event.note));
        return card;
    }

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

        const section = explorer.closest('#our-year-together');
        const today = new Intl.DateTimeFormat('en-CA', {
            timeZone: EDMONTON_TIME_ZONE, year: 'numeric', month: '2-digit',
        }).formatToParts(new Date());
        const currentYear = Number(today.find(part => part.type === 'year').value);
        const currentMonthIndex = Number(today.find(part => part.type === 'month').value) - 1;
        section.querySelectorAll('[data-event-year]').forEach(year => {
            year.textContent = String(currentYear);
        });

        explorer.classList.add('is-enhanced');
        explorer.dataset.calendarSource = 'fallback';

        const currentMonthTab = tabs.find(tab => Number(tab.dataset.monthIndex) === currentMonthIndex);
        tabs.forEach(tab => {
            const monthName = tab.querySelector('.annual-month-name')?.textContent.trim() || tab.dataset.monthTab;
            tab.setAttribute('aria-label', tab === currentMonthTab ? `${monthName}, current month` : monthName);
        });
        if (currentMonthTab) {
            currentMonthTab.classList.add('is-current');
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

            if (options.updateHash && window.location.hash !== activeTab.hash) {
                window.history.pushState(window.history.state, '', activeTab.hash);
            }
        }

        function renderCalendar(calendar) {
            if (!calendar || calendar.year !== currentYear || !Array.isArray(calendar.months)) return;
            const monthNumbers = calendar.months.map(month => month?.month);
            if (monthNumbers.some(month => !Number.isInteger(month) || month < 1 || month > 12)
                || new Set(monthNumbers).size !== monthNumbers.length
                || calendar.months.some(month => month.events != null && !Array.isArray(month.events))) return;

            const selectedMonth = tabs.find(tab => tab.getAttribute('aria-selected') === 'true')?.dataset.monthTab;
            const months = new Map(calendar.months.map(month => [month.month, month]));

            panels.forEach(panel => {
                const tab = tabFor(panel.dataset.monthPanel);
                const monthNumber = Number(tab.dataset.monthIndex) + 1;
                const month = months.get(monthNumber);
                const monthName = tab.querySelector('.annual-month-name').textContent.trim();
                const events = (month?.events || []).filter(event => {
                    const date = parseEventDate(event?.date);
                    return event?.active !== false && date
                        && date.getUTCFullYear() === currentYear && date.getUTCMonth() + 1 === monthNumber
                        && ['title', 'time', 'venue'].every(field => typeof event[field] === 'string' && event[field].trim());
                });
                panel.querySelector('h3').textContent = month?.heading || monthName;
                panel.querySelector('.annual-panel-count').textContent = `${events.length} listed ${events.length === 1 ? 'event' : 'events'}`;
                const list = panel.querySelector('.annual-event-list');
                list.replaceChildren(...events.map(renderEventCard));
            });

            if (typeof calendar.title === 'string' && calendar.title.trim()) {
                section.querySelector('#annual-heading').textContent = calendar.title;
            }
            section.querySelector('.annual-header p:last-child').textContent = calendar.description || '';
            explorer.dataset.calendarSource = 'sanity';
            setActiveMonth(selectedMonth || firstAvailableMonth());
        }

        function loadCalendar() {
            if (!window.SanityClient?.createClient) return;
            try {
                const client = window.SanityClient.createClient({
                    projectId: SANITY_PROJECT_ID,
                    dataset: SANITY_DATASET,
                    apiVersion: '2025-06-27',
                    useCdn: true,
                    perspective: 'published',
                });
                client.fetch(`*[_type == "annualCalendar" && year == $year && !(_id in path("drafts.**"))]
                    | order(_updatedAt desc, _id asc)[0] {
                        year, title, description,
                        months[]{month, heading, events[]{title, category, description, date, time, venue, note, active}}
                    }`, {year: currentYear})
                    .then(renderCalendar)
                    .catch(() => { /* Keep the existing schedule available if Sanity cannot load. */ });
            } catch (error) {
                // Client initialization failure also leaves the existing schedule available.
            }
        }

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', event => {
                event.preventDefault();
                setActiveMonth(tab.dataset.monthTab, { updateHash: true });
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
                    setActiveMonth(tab.dataset.monthTab, { updateHash: true });
                    return;
                } else {
                    return;
                }

                event.preventDefault();
                setActiveMonth(tabs[nextIndex].dataset.monthTab, { focus: true });
            });
        });

        const restoreHashedMonth = () => {
            const hashedMonth = monthFromHash();
            if (hashedMonth) setActiveMonth(hashedMonth);
        };
        window.addEventListener('hashchange', restoreHashedMonth);
        window.addEventListener('popstate', restoreHashedMonth);

        setActiveMonth(monthFromHash() || firstAvailableMonth());
        loadCalendar();
    });
}());
