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
        showPaid(false);
    }

    function setupSaintText() {
        const target = document.getElementById('saintToday');
        if (!target) return;
        const saints = ['Peter', 'Paul', 'Joseph', 'Patrick', 'Michael', 'Francis', 'George'];
        const saint = saints[new Date().getDay()] || saints[0];
        const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        target.textContent = `Today's Saint: St. ${saint} - ${dateStr}. Ask St. ${saint} to pray for all kids and families.`;
    }

    function setupBackToTop() {
        const backButton = document.getElementById('back-to-top');
        if (!backButton) return;

        window.addEventListener('scroll', () => {
            backButton.classList.toggle('hidden', window.scrollY < 300);
        }, { passive: true });

        backButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    ready(() => {
        setupTabs();
        setupSaintText();
        setupBackToTop();
    });
}());
