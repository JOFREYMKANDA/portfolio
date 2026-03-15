import {
    initBackToTop,
    initLazyLoading,
    initPageLoader,
    initScrollAnimations,
    initTypingAnimation
} from './features/animations.js';
import {
    initActiveNavHighlighting,
    initMobileMenu,
    initNavScrollEffect,
    initSmoothScrolling
} from './features/navigation.js';
import { initContactForm } from './features/contact-form.js';
import { initFormValidation } from './features/forms.js';
import {
    initCopyToClipboard,
    initKeyboardNavigation,
    logPerformanceMetrics
} from './features/accessibility.js';

function runInitializers() {
    initLazyLoading();
    initSmoothScrolling();
    initMobileMenu();
    initActiveNavHighlighting();
    initNavScrollEffect();
    initScrollAnimations();
    initBackToTop();
    initFormValidation();
    initContactForm();
    initTypingAnimation();
    initCopyToClipboard();
    initKeyboardNavigation();
    logPerformanceMetrics();
}

function init() {
    initPageLoader();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runInitializers);
    } else {
        runInitializers();
    }
}

init();
