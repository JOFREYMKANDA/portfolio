import { CONFIG } from '../core/config.js';
import { smoothScrollTo, throttle } from '../core/utils.js';

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;

    if (!navLinks || !menuToggle) return;

    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
    }
}

export function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function handleAnchorClick(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const nav = document.querySelector('nav');
                const navHeight = nav ? nav.offsetHeight : 0;
                smoothScrollTo(target, navHeight);
                closeMobileMenu();

                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

export function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const firstLink = navLinks ? navLinks.querySelector('a') : null;
    const navItems = navLinks ? navLinks.querySelectorAll('a') : [];
    const lastLink = navItems.length > 0 ? navItems[navItems.length - 1] : null;

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', function handleMenuToggle(event) {
        event.stopPropagation();
        const isOpen = navLinks.classList.contains('active');

        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', String(!isOpen));
        navLinks.setAttribute('aria-hidden', String(isOpen));

        if (!isOpen && firstLink) {
            setTimeout(() => firstLink.focus(), 100);
        }
    });

    navItems.forEach((link, index, links) => {
        link.addEventListener('click', closeMobileMenu);
        link.addEventListener('keydown', function handleMenuKeydown(event) {
            if (event.key === 'Tab') {
                if (event.shiftKey && index === 0 && lastLink) {
                    event.preventDefault();
                    lastLink.focus();
                } else if (!event.shiftKey && index === links.length - 1 && firstLink) {
                    event.preventDefault();
                    firstLink.focus();
                }
            }

            if (event.key === 'Escape') {
                closeMobileMenu();
                menuToggle.focus();
            }
        });
    });

    document.addEventListener('click', event => {
        if (
            navLinks.classList.contains('active') &&
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMobileMenu();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
            menuToggle.focus();
        }
    });
}

export function initActiveNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.pageYOffset || window.scrollY;
        const nav = document.querySelector('nav');
        const navHeight = nav ? nav.offsetHeight : 0;
        const offset = navHeight + 100;

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            if (href === `#${currentSection}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    const throttledUpdate = throttle(updateActiveNav, CONFIG.SCROLL_THROTTLE);
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    updateActiveNav();
}

export function initNavScrollEffect() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const handleScroll = throttle(() => {
        const scrollY = window.pageYOffset || window.scrollY;
        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, CONFIG.SCROLL_THROTTLE);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}
