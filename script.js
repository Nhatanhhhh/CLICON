/**
 *  script.js 
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * Select elements 
     */
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const signInTab = document.getElementById('signInTab');
    const signUpTab = document.getElementById('signUpTab');
    const breadcrumbActive = document.getElementById('breadcrumb-active');

    /**
     * Toggle between forms
     */
    signInTab.addEventListener('click', () => {
        signInForm.classList.remove('hidden');
        signUpForm.classList.add('hidden');
        signInTab.classList.add('auth__tab--active');
        signUpTab.classList.remove('auth__tab--active');
        breadcrumbActive.textContent = 'Sign In';
    });

    signUpTab.addEventListener('click', () => {
        signUpForm.classList.remove('hidden');
        signInForm.classList.add('hidden');
        signUpTab.classList.add('auth__tab--active');
        signInTab.classList.remove('auth__tab--active');
        breadcrumbActive.textContent = 'Sign Up';
    });

    /**
     * Validate email format
     */
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Display error message
     */
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorMsg = formControl.querySelector('.error-message') || document.createElement('span');
        errorMsg.className = 'error-message';
        errorMsg.style.color = 'red';
        errorMsg.style.fontSize = '0.8rem';
        errorMsg.textContent = message;
        formControl.appendChild(errorMsg);
        input.classList.add('error');
    }

    /**
     * Remove error message
     */
    function removeError(input) {
        const formControl = input.parentElement;
        const errorMsg = formControl.querySelector('.error-message');
        if (errorMsg) {
            formControl.removeChild(errorMsg);
        }
        input.classList.remove('error');
    }

    /**
     * Validate form inputs
     */
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required]');

        inputs.forEach((input) => {
            removeError(input);

            if (input.value.trim() === '') {
                showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                showError(input, 'Please enter a valid email');
                isValid = false;
            } else if (input.type === 'password' && input.value.length < 6) {
                showError(input, 'Password must be at least 6 characters');
                isValid = false;
            }
        });

        /**
         * Check password match for sign up form
         */
        if (form.id === 'signUpForm') {
            const password = form.querySelector('input[type="password"]');
            const confirmPassword = form.querySelectorAll('input[type="password"]')[1];

            if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'Passwords do not match');
                isValid = false;
            }
        }

        return isValid;
    }

    // Handle form submissions
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(signInForm)) {
            alert('Sign In Successful!');
            signInForm.reset();
        }
    });

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(signUpForm)) {
            alert('Sign Up Successful!');
            signUpForm.reset();
        }
    });
});