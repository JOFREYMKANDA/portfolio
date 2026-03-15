import { CONTACT_TIMEZONE, EMAILJS_CONFIG } from '../core/config.js';
import { showToast } from '../core/utils.js';
import { validateField } from './forms.js';

let emailServiceInitialized = false;

function getEmailService() {
    const emailService = window.emailjs;
    if (!emailService) return null;

    if (!emailServiceInitialized) {
        emailService.init({
            publicKey: EMAILJS_CONFIG.publicKey
        });
        emailServiceInitialized = true;
    }

    return emailService;
}

function formatSubmittedAt() {
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: CONTACT_TIMEZONE
    }).format(new Date());
}

export function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function handleSubmit(event) {
        event.preventDefault();

        const inputs = this.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            showToast('Please fix the errors in the form', 'error');
            const firstError = this.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
            return;
        }

        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        submitButton.classList.add('loading');

        const emailService = getEmailService();
        if (!emailService) {
            showToast('Email service is not available. Please try again later.', 'error');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.classList.remove('loading');
            return;
        }

        const templateParams = {
            from_name: name,
            from_email: email,
            subject,
            message,
            submitted_at: formatSubmittedAt()
        };

        emailService.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
            .then(() => {
                showToast(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`, 'success', 7000);
                contactForm.reset();

                inputs.forEach(input => {
                    input.classList.remove('error', 'valid');
                    input.setAttribute('aria-invalid', 'false');
                });
            })
            .catch(error => {
                console.error('EmailJS error:', error);
                showToast('Sorry, there was an error sending your message. Please try again or contact me directly via WhatsApp: 0652624625', 'error', 8000);
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                submitButton.classList.remove('loading');
            });
    });
}
