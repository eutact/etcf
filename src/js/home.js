(function () {
    const SANITY_PROJECT_ID = 'xx91ckl7';
    const SANITY_DATASET = 'production';
    const EDMONTON_TIME_ZONE = 'America/Edmonton';
    const CALENDAR_DATETIME_PATTERN = /^\d{8}T\d{6}$/;
    let eventDetails = null;

    function ready(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback, { once: true });
        } else {
            callback();
        }
    }

    function getClient() {
        if (!window.SanityClient || !window.SanityClient.createClient) return null;
        return window.SanityClient.createClient({
            projectId: SANITY_PROJECT_ID,
            dataset: SANITY_DATASET,
            useCdn: true,
            apiVersion: '2025-06-27',
            requestTagPrefix: 'website',
        });
    }

    function edmontonTodayYmd() {
        const parts = new Intl.DateTimeFormat('en-CA', {
            timeZone: EDMONTON_TIME_ZONE,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).formatToParts(new Date());

        const year = parts.find(part => part.type === 'year').value;
        const month = parts.find(part => part.type === 'month').value;
        const day = parts.find(part => part.type === 'day').value;
        return `${year}-${month}-${day}`;
    }

    function isFutureOrToday(dateString) {
        return /^\d{4}-\d{2}-\d{2}$/.test(dateString || '') && dateString >= edmontonTodayYmd();
    }

    function formatEventDate(dateString) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString || '')) return 'Date to be announced';
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day).toLocaleDateString('en-CA', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: EDMONTON_TIME_ZONE,
        });
    }

    function setText(id, value) {
        const element = document.getElementById(id);
        if (element) element.textContent = value || '';
    }

    function setActionDisabled(element, disabled) {
        if (!element) return;
        element.classList.toggle('pointer-events-none', disabled);
        element.classList.toggle('opacity-50', disabled);
        element.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    }

    function renderEmptyEvent(message) {
        const card = document.getElementById('event-card');
        const details = document.getElementById('event-details');
        const empty = document.getElementById('event-empty');
        const image = document.getElementById('event-image');
        const registerLink = document.getElementById('register-link');
        const reminderButton = document.getElementById('reminder-button');

        if (card) card.dataset.state = 'empty';
        if (details) details.classList.add('hidden');
        if (empty) {
            empty.classList.remove('hidden');
            empty.querySelector('[data-empty-message]').textContent = message;
        }
        if (image) {
            image.src = 'images/events/willupdate.png';
            image.alt = 'ETCF event details will be announced soon';
        }
        if (registerLink) {
            registerLink.href = '#newsletter-form';
            setActionDisabled(registerLink, false);
        }
        if (reminderButton) {
            reminderButton.textContent = 'Reminder unavailable';
            reminderButton.disabled = true;
        }
        eventDetails = null;
    }

    function renderEvent(event) {
        if (!event || !isFutureOrToday(event.date)) {
            renderEmptyEvent('The latest CMS event has passed. The next Tamil Mass details will be announced after the committee updates Sanity.');
            return;
        }

        const details = document.getElementById('event-details');
        const empty = document.getElementById('event-empty');
        const image = document.getElementById('event-image');
        const registerLink = document.getElementById('register-link');
        const reminderButton = document.getElementById('reminder-button');

        if (details) details.classList.remove('hidden');
        if (empty) empty.classList.add('hidden');

        if (image) {
            image.src = event.image?.asset?.url || 'images/events/willupdate.png';
            image.alt = event.title ? `${event.title} poster` : 'ETCF upcoming event poster';
        }

        setText('event-title', event.title || 'Tamil Mass');
        setText('event-subtitle', event.subtitle || '');
        setText('event-description', event.description || '');
        setText('event-date', formatEventDate(event.date));
        setText('event-time', event.time || 'Time to be announced');
        setText('event-venue', event.venue || 'Venue to be announced');

        if (registerLink) {
            registerLink.href = event.registerURL || '#newsletter-form';
            setActionDisabled(registerLink, false);
        }

        eventDetails = {
            title: event.calendarTitle || event.title || 'ETCF Tamil Mass',
            description: event.calendarDescription || event.description || '',
            location: event.calendarLocation || event.venue || '',
            startDate: event.calendarStartTime || '',
            endDate: event.calendarEndTime || '',
        };

        const calendarReady = CALENDAR_DATETIME_PATTERN.test(eventDetails.startDate)
            && CALENDAR_DATETIME_PATTERN.test(eventDetails.endDate);

        if (reminderButton) {
            reminderButton.textContent = event.reminderButtonText || 'Set Reminder';
            reminderButton.disabled = !calendarReady;
            reminderButton.title = calendarReady
                ? 'Add this event to Google Calendar'
                : 'Calendar details need to be corrected in Sanity';
        }
    }

    function setupSanityEvent() {
        const client = getClient();
        if (!client) {
            renderEmptyEvent('Event details could not load. Please check back soon.');
            return;
        }

        client.fetch(`*[_type == "eventCard"] | order(_createdAt desc)[0] {
            title,
            subtitle,
            description,
            date,
            time,
            venue,
            reminderButtonText,
            registerURL,
            calendarTitle,
            calendarDescription,
            calendarLocation,
            calendarStartTime,
            calendarEndTime,
            image { asset->{ url } }
        }`, { tag: 'homepage-event' })
            .then(renderEvent)
            .catch(() => renderEmptyEvent('Event details could not load. Please check back soon.'));
    }

    function messageIsCurrent(message) {
        const months = {
            january: '01',
            february: '02',
            march: '03',
            april: '04',
            may: '05',
            june: '06',
            july: '07',
            august: '08',
            september: '09',
            october: '10',
            november: '11',
            december: '12',
        };
        const match = String(message || '').match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s+(\d{4})\b/i);
        if (!match) return true;
        const month = months[match[1].toLowerCase()];
        const day = match[2].padStart(2, '0');
        const year = match[3];
        return `${year}-${month}-${day}` >= edmontonTodayYmd();
    }

    function renderTicker(items) {
        const track = document.getElementById('tickerTrack');
        if (!track) return;

        const safeItems = (items || []).filter(item => item?.message && messageIsCurrent(item.message));
        const list = safeItems.length
            ? safeItems
            : [{ message: 'Welcome to ETCF - Tamil Holy Mass details are shared here when confirmed.' }];

        track.innerHTML = '';
        const run = document.createElement('div');
        run.className = 'flex';

        list.forEach((item, index) => {
            if (index > 0) {
                const divider = document.createElement('span');
                divider.textContent = ' | ';
                divider.className = 'opacity-70';
                divider.style.padding = '0 1rem';
                run.appendChild(divider);
            }

            const span = document.createElement('span');
            span.className = 'news-item text-white text-lg md:text-2xl font-semibold';
            span.style.padding = '0 1rem';

            if (item.link) {
                const anchor = document.createElement('a');
                anchor.href = item.link;
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
                anchor.textContent = item.message;
                span.appendChild(anchor);
            } else {
                span.textContent = item.message;
            }

            run.appendChild(span);
        });

        const duplicate = run.cloneNode(true);
        duplicate.setAttribute('aria-hidden', 'true');
        track.append(run, duplicate);

        requestAnimationFrame(() => {
            const runWidth = run.getBoundingClientRect().width;
            track.style.setProperty('--distance', `${runWidth}px`);
            track.style.setProperty('--duration', `${Math.max(20, Math.round(runWidth / 110))}s`);
        });
    }

    function setupTicker() {
        const client = getClient();
        if (!client) {
            renderTicker([]);
            return;
        }

        client.fetch(`
            *[_type == "tickerCard" && active == true
              && (!defined(start) || start <= now())
              && (!defined(end) || end >= now())
            ] | order(priority asc, _createdAt desc){ _id, message, link }
        `, { tag: 'homepage-ticker' })
            .then(renderTicker)
            .catch(() => renderTicker([]));
    }

    function setupCarousel() {
        const slides = Array.from(document.querySelectorAll('.carousel-slide'));
        if (!slides.length) return;

        let currentSlide = 0;
        const showSlide = index => {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        };

        showSlide(currentSlide);
        const reducedMotion = typeof window.matchMedia === 'function'
            ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
            : false;
        if (reducedMotion) return;

        window.setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5200);
    }

    window.setReminder = function setReminder() {
        if (!eventDetails || !CALENDAR_DATETIME_PATTERN.test(eventDetails.startDate) || !CALENDAR_DATETIME_PATTERN.test(eventDetails.endDate)) {
            window.alert('Calendar reminder details are not available yet.');
            return;
        }

        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}&dates=${eventDetails.startDate}/${eventDetails.endDate}`;
        window.open(calendarUrl, '_blank', 'noopener,noreferrer');
    };

    ready(() => {
        setupCarousel();
        setupSanityEvent();
        setupTicker();
    });
}());
