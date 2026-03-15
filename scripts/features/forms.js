export function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const inputs = contactForm.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', function handleBlur() {
            validateField(this);
        });

        input.addEventListener('input', function handleInput() {
            if (this.classList.contains('error')) {
                validateField(this);
            }

            if (this.value.trim() && !this.classList.contains('error')) {
                this.classList.add('valid');
            }
        });

        input.addEventListener('focus', function handleFocus() {
            this.classList.remove('valid');
        });
    });
}

export function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    field.classList.remove('error', 'valid');
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

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
