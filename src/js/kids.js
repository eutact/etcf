(function () {
    function ready(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback, { once: true });
        } else {
            callback();
        }
    }

    function setupTabs() {
        const tabFree = document.getElementById('tab-free');
        const tabPaid = document.getElementById('tab-paid');
        const freeSection = document.getElementById('free-section');
        const paidSection = document.getElementById('paid-section');
        if (!tabFree || !tabPaid || !freeSection || !paidSection) return;

        function showPaid(isPaid) {
            freeSection.classList.toggle('hidden', isPaid);
            paidSection.classList.toggle('hidden', !isPaid);
            tabFree.setAttribute('aria-selected', isPaid ? 'false' : 'true');
            tabPaid.setAttribute('aria-selected', isPaid ? 'true' : 'false');
            tabFree.tabIndex = isPaid ? -1 : 0;
            tabPaid.tabIndex = isPaid ? 0 : -1;

            tabFree.className = isPaid
                ? 'tab px-6 py-2 bg-white text-primary font-semibold rounded-lg border border-primary'
                : 'tab premium-button px-6 py-2';
            tabPaid.className = isPaid
                ? 'tab premium-button px-6 py-2'
                : 'tab px-6 py-2 bg-white text-primary font-semibold rounded-lg border border-primary';
        }

        tabFree.addEventListener('click', event => {
            event.preventDefault();
            showPaid(false);
        });
        tabPaid.addEventListener('click', event => {
            event.preventDefault();
            showPaid(true);
        });
        [tabFree, tabPaid].forEach(tab => tab.addEventListener('keydown', event => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            const isPaid = event.key === 'End' || (event.key !== 'Home' && tab === tabFree);
            showPaid(isPaid);
            (isPaid ? tabPaid : tabFree).focus();
        }));
        showPaid(false);
    }

    function setupFamilyPrayer() {
        const target = document.getElementById('familyPrayer');
        if (!target) return;
        target.textContent = 'Jesus, help us listen, learn, and care for one another today. Amen.';
    }

    function setupBackToTop() {
        const backButton = document.getElementById('back-to-top');
        if (!backButton) return;

        window.addEventListener('scroll', () => {
            backButton.classList.toggle('hidden', window.scrollY < 300);
        }, { passive: true });

        backButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        });
    }

    ready(() => {
        setupTabs();
        setupFamilyPrayer();
        setupBackToTop();
    });
}());
