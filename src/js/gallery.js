(function () {
    const imageGallery = {
        2022: Array.from({ length: 55 }, (_, index) => `images/2022/image${index + 1}.jpg`),
        2023: Array.from({ length: 192 }, (_, index) => `images/2023/image${index + 1}.jpg`),
        2024: Array.from({ length: 270 }, (_, index) => `images/2024/image${index + 1}.jpg`),
    };

    let currentYear = '2024';
    let currentImages = imageGallery[currentYear];
    let currentIndex = 0;

    function ready(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback, { once: true });
        } else {
            callback();
        }
    }

    function generateYearButtons() {
        const buttonContainer = document.getElementById('year-buttons');
        if (!buttonContainer) return;
        buttonContainer.innerHTML = '';

        Object.keys(imageGallery).forEach(year => {
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = year;
            button.setAttribute('aria-pressed', year === currentYear ? 'true' : 'false');
            button.className = year === currentYear
                ? 'premium-button px-5 py-2 text-sm'
                : 'px-5 py-2 text-sm font-bold rounded-lg bg-white text-primary border border-primary/15 hover:bg-yellow-100 transition';
            button.addEventListener('click', () => {
                currentYear = year;
                currentImages = imageGallery[currentYear];
                currentIndex = 0;
                generateYearButtons();
                generateGallery();
            });
            buttonContainer.appendChild(button);
        });
    }

    function generateGallery() {
        const container = document.getElementById('gallery-container');
        if (!container) return;
        container.innerHTML = '';

        currentImages.forEach((url, index) => {
            const figure = document.createElement('figure');
            figure.className = 'gallery-card group';

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'block w-full text-left';
            button.setAttribute('aria-label', `Open ETCF ${currentYear} gallery image ${index + 1}`);
            button.addEventListener('click', () => {
                if (!button.disabled) openLightbox(index);
            });

            const thumb = document.createElement('span');
            thumb.className = 'gallery-thumb';

            const skeleton = document.createElement('span');
            skeleton.className = 'gallery-skeleton skeleton';
            skeleton.setAttribute('aria-hidden', 'true');

            const img = document.createElement('img');
            img.alt = `ETCF community gallery photo ${index + 1} from ${currentYear}`;
            img.loading = index < 8 ? 'eager' : 'lazy';
            img.decoding = 'async';

            const fallback = document.createElement('span');
            fallback.className = 'gallery-fallback';
            fallback.setAttribute('role', 'img');
            fallback.setAttribute('aria-label', `ETCF ${currentYear} gallery image ${index + 1} is unavailable`);

            const fallbackLogo = document.createElement('img');
            fallbackLogo.src = 'src/assets/logo-rounded.png';
            fallbackLogo.alt = '';
            fallbackLogo.loading = 'lazy';
            fallbackLogo.decoding = 'async';

            const fallbackText = document.createElement('span');
            fallbackText.textContent = 'Image unavailable';
            fallback.append(fallbackLogo, fallbackText);

            img.addEventListener('load', () => {
                thumb.classList.add('is-loaded');
            }, { once: true });
            img.addEventListener('error', () => {
                thumb.classList.add('is-error');
                button.disabled = true;
                button.setAttribute('aria-label', `ETCF ${currentYear} gallery image ${index + 1} is unavailable`);
            }, { once: true });

            thumb.append(skeleton, img, fallback);
            button.appendChild(thumb);

            const caption = document.createElement('figcaption');
            caption.className = 'px-4 py-3 text-sm font-semibold text-primary bg-white';
            caption.textContent = `${currentYear} ETCF Moments`;

            figure.append(button, caption);
            container.appendChild(figure);
            img.src = url;

            if (img.complete && img.naturalWidth > 0) {
                thumb.classList.add('is-loaded');
            }
        });
    }

    function openLightbox(index) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        if (!lightbox || !lightboxImg) return;

        currentIndex = index;
        lightboxImg.src = currentImages[currentIndex];
        lightboxImg.alt = `Expanded ETCF community gallery photo ${currentIndex + 1} from ${currentYear}`;
        if (lightboxCaption) {
            lightboxCaption.textContent = `${currentYear} ETCF gallery photo ${currentIndex + 1} of ${currentImages.length}`;
        }
        lightbox.classList.remove('hidden');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        document.getElementById('close-lightbox')?.focus();
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        if (!lightbox) return;
        lightbox.classList.add('hidden');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lightboxImg) lightboxImg.src = '';
    }

    function moveLightbox(direction) {
        currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
        openLightbox(currentIndex);
    }

    function setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        const closeButton = document.getElementById('close-lightbox');
        const prevButton = document.getElementById('prev-lightbox');
        const nextButton = document.getElementById('next-lightbox');

        closeButton?.addEventListener('click', closeLightbox);
        prevButton?.addEventListener('click', () => moveLightbox(-1));
        nextButton?.addEventListener('click', () => moveLightbox(1));

        lightbox?.addEventListener('click', event => {
            if (event.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', event => {
            if (!lightbox || lightbox.classList.contains('hidden')) return;
            if (event.key === 'Escape') closeLightbox();
            if (event.key === 'ArrowLeft') moveLightbox(-1);
            if (event.key === 'ArrowRight') moveLightbox(1);
        });
    }

    ready(() => {
        generateYearButtons();
        generateGallery();
        setupLightbox();
    });
}());
