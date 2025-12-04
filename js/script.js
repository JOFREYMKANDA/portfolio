/**
 * Portfolio Website JavaScript - World Class Implementation
 * Professional-grade JavaScript with performance optimizations,
 * accessibility features, and modern UX enhancements
 */

(function () {
    'use strict';

    // ============================================
    // Constants & Configuration
    // ============================================
    const CONFIG = {
        SCROLL_THROTTLE: 16, // ~60fps
        DEBOUNCE_DELAY: 300,
        TYPING_SPEED: 100,
        TYPING_DELETE_SPEED: 50,
        TYPING_PAUSE: 2000,
        BACK_TO_TOP_THRESHOLD: 300,
        LAZY_LOAD_THRESHOLD: '100px'
    };

    // ============================================
    // Utility Functions
    // ============================================

    /**
     * Throttle function - limits function execution frequency
     */
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Debounce function - delays function execution
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Check if element is in viewport
     */
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Smooth scroll to element with offset
     */
    function smoothScrollTo(target, offset = 0) {
        if (!target) return;
        
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // ============================================
    // Toast Notification System
    // ============================================

    /**
     * Create and show toast notification
     */
    function showToast(message, type = 'success', duration = 5000) {
        // Remove existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');
        
        const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" aria-label="Close notification">×</button>
        `;

        document.body.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Close button handler
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => removeToast(toast));

        // Auto remove
        const autoRemove = setTimeout(() => removeToast(toast), duration);

        // Pause auto-remove on hover
        toast.addEventListener('mouseenter', () => clearTimeout(autoRemove));
    }

    function removeToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }

    // ============================================
    // Lazy Loading Images
    // ============================================

    /**
     * Initialize lazy loading for images
     */
    function initLazyLoading() {
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
        } else {
            // Fallback for browsers without IntersectionObserver
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // ============================================
    // Smooth Scrolling
    // ============================================

    /**
     * Initialize smooth scrolling for navigation links
     */
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);

                if (target) {
                    const nav = document.querySelector('nav');
                    const navHeight = nav ? nav.offsetHeight : 0;
                    smoothScrollTo(target, navHeight);
                    closeMobileMenu();
                    
                    // Update URL without triggering scroll
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    }
                }
            });
        });
    }

    // ============================================
    // Mobile Menu with Accessibility
    // ============================================

    /**
     * Mobile menu toggle with focus management
     */
    function initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const body = document.body;
        const firstLink = navLinks ? navLinks.querySelector('a') : null;
        const lastLink = navLinks ? navLinks.querySelectorAll('a')[navLinks.querySelectorAll('a').length - 1] : null;

        if (menuToggle && navLinks) {
            // Toggle menu
            menuToggle.addEventListener('click', function (e) {
                e.stopPropagation();
                const isOpen = navLinks.classList.contains('active');
                
                navLinks.classList.toggle('active');
                menuToggle.classList.toggle('active');
                body.classList.toggle('menu-open');
                
                // Accessibility: Update ARIA attributes
                menuToggle.setAttribute('aria-expanded', !isOpen);
                navLinks.setAttribute('aria-hidden', isOpen);
                
                // Focus management
                if (!isOpen && firstLink) {
                    setTimeout(() => firstLink.focus(), 100);
                }
            });

            // Close menu when clicking on a link
            navLinks.querySelectorAll('a').forEach((link, index, links) => {
                link.addEventListener('click', closeMobileMenu);
                
                // Keyboard navigation: trap focus in menu
                link.addEventListener('keydown', function (e) {
                    if (e.key === 'Tab') {
                        if (e.shiftKey && index === 0) {
                            e.preventDefault();
                            lastLink.focus();
                        } else if (!e.shiftKey && index === links.length - 1) {
                            e.preventDefault();
                            firstLink.focus();
                        }
                    }
                    if (e.key === 'Escape') {
                        closeMobileMenu();
                        menuToggle.focus();
                    }
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function (e) {
                if (navLinks.classList.contains('active') &&
                    !navLinks.contains(e.target) &&
                    !menuToggle.contains(e.target)) {
                    closeMobileMenu();
                }
            });

            // Close on Escape key
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                    closeMobileMenu();
                    menuToggle.focus();
                }
            });
        }
    }

    function closeMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const body = document.body;

        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            navLinks.setAttribute('aria-hidden', 'true');
        }
    }

    // ============================================
    // Active Navigation Highlighting (Optimized)
    // ============================================

    /**
     * Active navigation highlighting with throttled scroll
     */
    function initActiveNavHighlighting() {
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

        // Throttled scroll handler for performance
        const throttledUpdate = throttle(updateActiveNav, CONFIG.SCROLL_THROTTLE);
        window.addEventListener('scroll', throttledUpdate, { passive: true });
        updateActiveNav(); // Initial call
    }

    // ============================================
    // Scroll Animations (Optimized)
    // ============================================

    /**
     * Scroll animations using Intersection Observer
     */
    function initScrollAnimations() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: show all elements immediately
            document.querySelectorAll('.fade-in').forEach(el => {
                el.classList.add('fade-in-visible', 'animate-in');
            });
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    entry.target.classList.add('animate-in');
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
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

    // ============================================
    // Back to Top Button (Optimized)
    // ============================================

    /**
     * Back to top button with throttled scroll
     */
    function initBackToTop() {
        const backToTopButton = document.getElementById('back-to-top');

        if (backToTopButton) {
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
            handleScroll(); // Initial check

            // Scroll to top when clicked
            backToTopButton.addEventListener('click', function () {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                // Move focus to top of page for accessibility
                document.body.focus();
            });
        }
    }

    // ============================================
    // Enhanced Form Validation
    // ============================================

    /**
     * Enhanced form validation with better UX
     */
    function initFormValidation() {
        const contactForm = document.getElementById('contactForm');

        if (contactForm) {
            const inputs = contactForm.querySelectorAll('input, textarea');

            inputs.forEach(input => {
                // Real-time validation on blur
                input.addEventListener('blur', function () {
                    validateField(this);
                });

                // Clear errors on input
                input.addEventListener('input', function () {
                    if (this.classList.contains('error')) {
                        validateField(this);
                    }
                    // Remove error styling if field becomes valid
                    if (this.value.trim() && !this.classList.contains('error')) {
                        this.classList.add('valid');
                    }
                });

                // Remove valid class on focus for fresh validation
                input.addEventListener('focus', function () {
                    this.classList.remove('valid');
                });
            });
        }
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove previous error styling
        field.classList.remove('error', 'valid');
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Validation rules
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (field.type === 'text' && field.id === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
        } else if (field.tagName === 'TEXTAREA' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
        }

        // Show error if invalid
        if (!isValid) {
            field.classList.add('error');
            field.setAttribute('aria-invalid', 'true');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            errorDiv.setAttribute('role', 'alert');
            field.parentElement.appendChild(errorDiv);
        } else if (value) {
            field.classList.add('valid');
            field.setAttribute('aria-invalid', 'false');
        }

        return isValid;
    }

    // ============================================
    // Enhanced Typing Animation
    // ============================================

    /**
     * Enhanced typing animation with multiple texts
     */
    function initTypingAnimation() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;

        const texts = [
            'A Software Developer & A Tech enthusiast.',
            'A Full-Stack Developer.',
            'A Problem Solver.',
            'A Creative Thinker.'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = CONFIG.TYPING_SPEED;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = CONFIG.TYPING_DELETE_SPEED;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = CONFIG.TYPING_SPEED;
            }

            // When finished typing, wait then start deleting
            if (!isDeleting && charIndex === currentText.length) {
                typingSpeed = CONFIG.TYPING_PAUSE;
                isDeleting = true;
            }
            // When finished deleting, move to next text
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Brief pause before typing again
            }

            setTimeout(type, typingSpeed);
        }

        // Start typing animation after a short delay
        setTimeout(type, 1000);
    }

    // ============================================
    // Contact Form with Loading States
    // ============================================

    /**
     * Enhanced contact form with loading states and better UX
     */
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');

        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();

                // Validate all fields
                const inputs = this.querySelectorAll('input[required], textarea[required]');
                let isFormValid = true;

                inputs.forEach(input => {
                    if (!validateField(input)) {
                        isFormValid = false;
                    }
                });

                if (!isFormValid) {
                    showToast('Please fix the errors in the form', 'error');
                    // Focus on first error field
                    const firstError = this.querySelector('.error');
                    if (firstError) {
                        firstError.focus();
                    }
                    return;
                }

                // Get form data
                const formData = new FormData(this);
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject');
                const message = formData.get('message');

                // Get submit button
                const submitButton = this.querySelector('.submit-button');
                const originalText = submitButton.textContent;
                
                // Show loading state
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                submitButton.classList.add('loading');

                // Initialize EmailJS
                if (typeof emailjs === 'undefined') {
                    showToast('Email service is not available. Please try again later.', 'error');
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                    submitButton.classList.remove('loading');
                    return;
                }

                emailjs.init("2VNrJFj4PUqZJOeor");

                const templateParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message
                };

                emailjs.send("service_2j47rqf", "template_ntz9979", templateParams)
                    .then(function (response) {
                        showToast(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`, 'success', 7000);
                        contactForm.reset();
                        // Remove all validation classes
                        inputs.forEach(input => {
                            input.classList.remove('error', 'valid');
                            input.setAttribute('aria-invalid', 'false');
                        });
                    })
                    .catch(function (error) {
                        console.error('EmailJS error:', error);
                        showToast('Sorry, there was an error sending your message. Please try again or contact me directly via WhatsApp: 0652624625', 'error', 8000);
                    })
                    .finally(function () {
                        // Reset button state
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                        submitButton.classList.remove('loading');
                    });
            });
        }
    }

    // ============================================
    // Page Loader
    // ============================================

    /**
     * Page Loader - Hide loader when page is fully loaded
     */
    function initPageLoader() {
        const loader = document.getElementById('page-loader');
        const body = document.body;
        
        if (!loader) return;
        
        body.classList.add('loading');
        
        const minDisplayTime = 500;
        const startTime = Date.now();
        
        function hideLoader() {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
            
            setTimeout(function() {
                loader.classList.add('hidden');
                body.classList.remove('loading');
                
                setTimeout(function() {
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
                
                Array.from(document.images).forEach(function(img) {
                    if (img.complete) {
                        imagesLoaded++;
                        if (imagesLoaded === totalImages) {
                            hideLoader();
                        }
                    } else {
                        img.addEventListener('load', function() {
                            imagesLoaded++;
                            if (imagesLoaded === totalImages) {
                                hideLoader();
                            }
                        });
                        img.addEventListener('error', function() {
                            imagesLoaded++;
                            if (imagesLoaded === totalImages) {
                                hideLoader();
                            }
                        });
                    }
                });
            }
        } else {
            window.addEventListener('load', function() {
                hideLoader();
            });
        }
        
        setTimeout(function() {
            if (!loader.classList.contains('hidden')) {
                hideLoader();
            }
        }, 3000);
    }

    // ============================================
    // Copy to Clipboard
    // ============================================

    /**
     * Copy email to clipboard functionality
     */
    function initCopyToClipboard() {
        const emailLink = document.querySelector('a[href^="mailto:"]');
        
        if (emailLink && navigator.clipboard) {
            emailLink.addEventListener('click', function(e) {
                // Allow default mailto behavior on mobile or if Ctrl/Cmd is pressed
                if (e.ctrlKey || e.metaKey || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    return;
                }
                
                e.preventDefault();
                const email = this.getAttribute('href').replace('mailto:', '');
                
                navigator.clipboard.writeText(email).then(() => {
                    showToast('Email address copied to clipboard!', 'success');
                }).catch(() => {
                    // Fallback: select text
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        showToast('Email address copied to clipboard!', 'success');
                    } catch (err) {
                        showToast('Unable to copy. Please copy manually: ' + email, 'error');
                    }
                    document.body.removeChild(textArea);
                });
            });
        }
    }

    // ============================================
    // Keyboard Navigation
    // ============================================

    /**
     * Enhanced keyboard navigation
     */
    function initKeyboardNavigation() {
        // Skip to main content link (accessibility)
        document.addEventListener('keydown', function(e) {
            // Alt + S: Skip to main content
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                const mainContent = document.querySelector('main') || document.querySelector('#home');
                if (mainContent) {
                    mainContent.focus();
                    smoothScrollTo(mainContent, 0);
                }
            }
        });

        // Keyboard navigation for project cards
        document.querySelectorAll('.project-card').forEach(card => {
            const links = card.querySelectorAll('a[href]');
            if (links.length > 0) {
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'article');
                
                card.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const firstLink = links[0];
                        if (firstLink && !firstLink.classList.contains('coming-soon')) {
                            firstLink.click();
                        }
                    }
                });
            }
        });
    }

    // ============================================
    // Performance Monitoring
    // ============================================

    /**
     * Log performance metrics (development only)
     */
    function logPerformanceMetrics() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
                    
                    if (pageLoadTime > 3000) {
                        console.warn('Page load time is slow:', pageLoadTime + 'ms');
                    }
                }, 0);
            });
        }
    }

    // ============================================
    // Initialize All Features
    // ============================================

    /**
     * Navigation scroll effect
     */
    function initNavScrollEffect() {
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
        handleScroll(); // Initial check
    }

    /**
     * Initialize all functionality when DOM is ready
     */
    function init() {
        // Initialize page loader first (runs immediately)
        initPageLoader();
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
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
            });
        } else {
            // DOM is already loaded
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
    }

    // Start initialization
    init();

})();
