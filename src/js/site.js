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

    function setupNavigation() {
        const navbar = document.getElementById('navbar');
        const menuBtn = document.getElementById('menu-btn');
        const menuClose = document.getElementById('menu-close');
        const menuIcon = document.getElementById('menu-icon');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileBackdrop = document.getElementById('mobile-backdrop');
        const afterPaint = typeof window.requestAnimationFrame === 'function'
            ? window.requestAnimationFrame.bind(window)
            : callback => window.setTimeout(callback, 0);

        if (navbar) {
            const updateScrolled = () => {
                navbar.classList.toggle('nav-scrolled', window.scrollY > 24);
            };
            updateScrolled();
            window.addEventListener('scroll', updateScrolled, { passive: true });
        }

        const activeByHash = {
            home: 'home',
            about: 'about',
            'event-section': 'events',
            mission: 'mission',
            contact: 'contact',
        };

        const getPageName = () => {
            const page = window.location.pathname.split('/').pop();
            return page || 'index.html';
        };

        const getActiveNav = () => {
            const page = getPageName();
            const hash = window.location.hash.replace('#', '');

            if (page === 'gallery.html') return 'gallery';
            if (page === 'kids-resources.html') return 'kids';
            if (page === 'index.html' || page === '') return activeByHash[hash] || 'home';

            return '';
        };

        const updateActiveNavigation = () => {
            const activeNav = getActiveNav();
            document.querySelectorAll('[data-nav]').forEach(link => {
                if (activeNav && link.dataset.nav === activeNav) {
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        };

        updateActiveNavigation();
        window.addEventListener('hashchange', updateActiveNavigation);

        if (menuBtn && mobileMenu && mobileBackdrop) {
            let closeTimer = 0;

            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-controls', mobileMenu.id);
            mobileMenu.setAttribute('aria-hidden', 'true');

            const isMenuOpen = () => menuBtn.getAttribute('aria-expanded') === 'true';

            const openMenu = () => {
                window.clearTimeout(closeTimer);
                mobileMenu.classList.remove('hidden');
                mobileBackdrop.classList.remove('hidden');
                afterPaint(() => {
                    mobileMenu.classList.add('is-open');
                    mobileBackdrop.classList.add('is-open');
                });
                menuBtn.setAttribute('aria-expanded', 'true');
                menuBtn.setAttribute('aria-label', 'Close navigation menu');
                mobileMenu.setAttribute('aria-hidden', 'false');
                document.body.classList.add('nav-open');
                if (menuIcon) menuIcon.classList.replace('fa-bars', 'fa-times');
                window.setTimeout(() => (menuClose || mobileMenu.querySelector('a'))?.focus(), 0);
            };

            const closeMenu = (restoreFocus = false) => {
                window.clearTimeout(closeTimer);
                mobileMenu.classList.remove('is-open');
                mobileBackdrop.classList.remove('is-open');
                closeTimer = window.setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                    mobileBackdrop.classList.add('hidden');
                }, prefersReducedMotion ? 0 : 180);
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.setAttribute('aria-label', 'Open navigation menu');
                mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('nav-open');
                if (menuIcon) menuIcon.classList.replace('fa-times', 'fa-bars');
                if (restoreFocus) menuBtn.focus();
            };

            const toggleMenu = () => {
                isMenuOpen() ? closeMenu() : openMenu();
            };

            menuBtn.addEventListener('click', toggleMenu);
            menuClose?.addEventListener('click', () => closeMenu(true));
            mobileBackdrop.addEventListener('click', () => closeMenu());
            mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
            document.addEventListener('keydown', event => {
                if (!isMenuOpen()) return;

                if (event.key === 'Escape') {
                    closeMenu(true);
                    return;
                }

                if (event.key === 'Tab') {
                    const focusable = Array.from(mobileMenu.querySelectorAll('a, button'))
                        .filter(element => {
                            const styles = window.getComputedStyle(element);
                            return !element.disabled && styles.display !== 'none' && styles.visibility !== 'hidden';
                        });
                    if (!focusable.length) return;

                    const first = focusable[0];
                    const last = focusable[focusable.length - 1];
                    if (event.shiftKey && document.activeElement === first) {
                        event.preventDefault();
                        last.focus();
                    } else if (!event.shiftKey && document.activeElement === last) {
                        event.preventDefault();
                        first.focus();
                    }
                }
            });
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 1024 && isMenuOpen()) closeMenu();
            });
        }
    }

    function setupAccordions() {
        const buttons = Array.from(document.querySelectorAll('button')).filter(button => {
            const content = button.nextElementSibling;
            return content && content.classList.contains('hidden') && !button.closest('form');
        });

        buttons.forEach((button, index) => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('svg');
            const id = content.id || `accordion-panel-${index + 1}`;

            content.id = id;
            button.setAttribute('aria-controls', id);
            button.setAttribute('aria-expanded', content.classList.contains('open') ? 'true' : 'false');

            button.addEventListener('click', () => {
                const isOpen = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
                content.classList.toggle('hidden', isOpen);
                content.classList.toggle('open', !isOpen);

                if (icon) {
                    icon.innerHTML = isOpen
                        ? '<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />'
                        : '<path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />';
                }
            });
        });
    }

    function setupRevealMotion() {
        const targets = Array.from(document.querySelectorAll(
            'section:not(#home), footer, .premium-card, .kids-card, .legal-card, .gallery-card'
        ));

        targets.forEach(target => target.classList.add('reveal'));

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            targets.forEach(target => target.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

        targets.forEach(target => observer.observe(target));
    }

    function setupImages() {
        document.querySelectorAll('img').forEach(img => {
            if (!img.closest('nav') && !img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }
            if (!img.hasAttribute('decoding')) {
                img.decoding = 'async';
            }
            if (!img.alt && img.closest('#executive-committee')) {
                const name = img.parentElement.querySelector('h3')?.textContent?.trim();
                img.alt = name ? `${name}, ETCF committee member` : 'ETCF committee member';
            }
        });
    }

    function setupForms() {
        const contactForm = document.getElementById('my-form');
        const popupMessage = document.getElementById('popup-message');
        const popupText = document.getElementById('popup-text');
        const popupIcon = document.getElementById('popup-icon');

        window.closePopup = function closePopup() {
            if (popupMessage) popupMessage.classList.add('hidden');
        };

        function showPopup(message, isSuccess) {
            if (!popupMessage || !popupText) return;
            if (popupIcon) {
                popupIcon.innerHTML = isSuccess
                    ? '<i class="fas fa-check-circle text-4xl text-green-500" aria-hidden="true"></i>'
                    : '<i class="fas fa-times-circle text-4xl text-red-500" aria-hidden="true"></i>';
            }
            popupText.textContent = message;
            popupText.className = `text-lg font-semibold ${isSuccess ? 'text-green-700' : 'text-red-700'} mb-4`;
            popupMessage.classList.remove('hidden');
        }

        if (contactForm) {
            contactForm.addEventListener('submit', async event => {
                event.preventDefault();
                const submitButton = contactForm.querySelector('[type="submit"]');
                if (submitButton) submitButton.disabled = true;

                try {
                    const response = await fetch(contactForm.action, {
                        method: contactForm.method,
                        body: new FormData(contactForm),
                        headers: { Accept: 'application/json' },
                    });

                    if (response.ok) {
                        showPopup('Thanks for your submission. Our team will contact you shortly.', true);
                        contactForm.reset();
                    } else {
                        showPopup('There was a problem submitting the form. Please try again.', false);
                    }
                } catch (error) {
                    showPopup('An error occurred. Please try again.', false);
                } finally {
                    if (submitButton) submitButton.disabled = false;
                }
            });
        }

        const subscriptionForm = document.getElementById('subscription-form');
        const responseMessage = document.getElementById('response-message');

        if (subscriptionForm && responseMessage) {
            subscriptionForm.addEventListener('submit', async event => {
                event.preventDefault();
                const submitButton = subscriptionForm.querySelector('[type="submit"]');
                if (submitButton) submitButton.disabled = true;

                try {
                    const response = await fetch(subscriptionForm.action, {
                        method: 'POST',
                        body: new FormData(subscriptionForm),
                    });
                    const message = response.ok ? await response.text() : 'Something went wrong. Please try again.';
                    responseMessage.textContent = message || 'Thank you for subscribing.';
                    responseMessage.className = response.ok
                        ? 'mt-4 text-lg font-semibold p-4 rounded-lg border bg-green-100 text-green-700 border-green-500'
                        : 'mt-4 text-lg font-semibold p-4 rounded-lg border bg-red-100 text-red-700 border-red-500';
                    responseMessage.classList.remove('hidden');
                    if (response.ok) subscriptionForm.reset();
                } catch (error) {
                    responseMessage.textContent = 'An error occurred. Please try again.';
                    responseMessage.className = 'mt-4 text-lg font-semibold p-4 rounded-lg border bg-red-100 text-red-700 border-red-500';
                    responseMessage.classList.remove('hidden');
                } finally {
                    if (submitButton) submitButton.disabled = false;
                }
            });
        }
    }

    function setupFooterCompatibility() {
        document.querySelectorAll('a[href="#"][onclick]').forEach(link => {
            link.addEventListener('click', event => event.preventDefault());
        });

        window.socialAlert = function socialAlert() {
            window.alert('Our media team is working on this social profile. Thank you for your patience.');
        };
        window.donationAlert = function donationAlert() {
            window.alert('Donations are not available right now. Please check back later.');
        };
        window.policyAlert = function policyAlert() {
            window.location.href = 'privacy-policy.html';
        };
        window.termsAlert = function termsAlert() {
            window.location.href = 'terms.html';
        };
        window.volunteerAlert = function volunteerAlert() {
            window.alert('Volunteer forms are closed right now. Please check back later.');
        };
        window.registrationClosed = function registrationClosed() {
            window.alert('Registrations for this event are closed. For questions, please contact support@edmontontamilcatholics.ca.');
        };
        window.massRegistration = function massRegistration() {
            window.alert('Mass registration will open soon. Subscribe to the newsletter or email info@edmontontamilcatholics.ca for updates.');
        };
    }

    ready(() => {
        setupNavigation();
        setupAccordions();
        setupRevealMotion();
        setupImages();
        setupForms();
        setupFooterCompatibility();
    });
}());
