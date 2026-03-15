import { CONFIG, TYPING_TEXTS } from '../core/config.js';
import { throttle } from '../core/utils.js';

export function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: CONFIG.LAZY_LOAD_THRESHOLD
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
        return;
    }

    document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
}

export function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.fade-in').forEach(element => {
            element.classList.add('fade-in-visible', 'animate-in');
        });
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible', 'animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const animatableElements = document.querySelectorAll(
        'section, .section-title, .about-text, .project-card, .contact-form, .form-group'
    );

    animatableElements.forEach(element => {
        if (!element.classList.contains('fade-in')) {
            element.classList.add('fade-in');
        }
        observer.observe(element);
    });
}

export function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;

    const handleScroll = throttle(() => {
        const scrollY = window.pageYOffset || window.scrollY;
        if (scrollY > CONFIG.BACK_TO_TOP_THRESHOLD) {
            backToTopButton.classList.add('visible');
            backToTopButton.setAttribute('aria-hidden', 'false');
        } else {
            backToTopButton.classList.remove('visible');
            backToTopButton.setAttribute('aria-hidden', 'true');
        }
    }, CONFIG.SCROLL_THROTTLE);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        document.body.focus();
    });
}

export function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = CONFIG.TYPING_SPEED;

    function type() {
        const currentText = TYPING_TEXTS[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex -= 1;
            typingSpeed = CONFIG.TYPING_DELETE_SPEED;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex += 1;
            typingSpeed = CONFIG.TYPING_SPEED;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = CONFIG.TYPING_PAUSE;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % TYPING_TEXTS.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

export function initPageLoader() {
    const loader = document.getElementById('page-loader');
    const body = document.body;

    if (!loader) return;

    body.classList.add('loading');

    const minDisplayTime = 500;
    const startTime = Date.now();

    function hideLoader() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

        setTimeout(() => {
            loader.classList.add('hidden');
            body.classList.remove('loading');

            setTimeout(() => {
                loader.remove();
            }, 600);
        }, remainingTime);
    }

    if (document.readyState === 'complete') {
        if (document.images.length === 0) {
            hideLoader();
        } else {
            let imagesLoaded = 0;
            const totalImages = document.images.length;

            Array.from(document.images).forEach(img => {
                if (img.complete) {
                    imagesLoaded += 1;
                    if (imagesLoaded === totalImages) {
                        hideLoader();
                    }
                } else {
                    img.addEventListener('load', () => {
                        imagesLoaded += 1;
                        if (imagesLoaded === totalImages) {
                            hideLoader();
                        }
                    });
                    img.addEventListener('error', () => {
                        imagesLoaded += 1;
                        if (imagesLoaded === totalImages) {
                            hideLoader();
                        }
                    });
                }
            });
        }
    } else {
        window.addEventListener('load', hideLoader);
    }

    setTimeout(() => {
        if (!loader.classList.contains('hidden')) {
            hideLoader();
        }
    }, 3000);
}
