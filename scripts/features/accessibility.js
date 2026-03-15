import { showToast, smoothScrollTo } from '../core/utils.js';

export function initCopyToClipboard() {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (!emailLink || !navigator.clipboard) return;

    emailLink.addEventListener('click', function handleEmailClick(event) {
        const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (event.ctrlKey || event.metaKey || isMobileDevice) {
            return;
        }

        event.preventDefault();
        const email = this.getAttribute('href').replace('mailto:', '');

        navigator.clipboard.writeText(email)
            .then(() => {
                showToast('Email address copied to clipboard!', 'success');
            })
            .catch(() => {
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();

                try {
                    document.execCommand('copy');
                    showToast('Email address copied to clipboard!', 'success');
                } catch (error) {
                    showToast(`Unable to copy. Please copy manually: ${email}`, 'error');
                }

                document.body.removeChild(textArea);
            });
    });
}

export function initKeyboardNavigation() {
    document.addEventListener('keydown', event => {
        if (event.altKey && event.key === 's') {
            event.preventDefault();
            const mainContent = document.querySelector('main') || document.querySelector('#home');
            if (mainContent) {
                mainContent.focus();
                smoothScrollTo(mainContent, 0);
            }
        }
    });

    document.querySelectorAll('.project-card').forEach(card => {
        const links = card.querySelectorAll('a[href]');
        if (links.length === 0) return;

        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');

        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const firstLink = links[0];
                if (firstLink && !firstLink.classList.contains('coming-soon')) {
                    firstLink.click();
                }
            }
        });
    });
}

export function logPerformanceMetrics() {
    if (!window.performance || !window.performance.timing) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

            if (pageLoadTime > 3000) {
                console.warn('Page load time is slow:', `${pageLoadTime}ms`);
            }
        }, 0);
    });
}
