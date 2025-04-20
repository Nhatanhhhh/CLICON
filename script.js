document.addEventListener('DOMContentLoaded', function () {
    // Select elements
    const signInForm = document.querySelector('.auth__form--signin');
    const signUpForm = document.querySelector('.auth__form--signup');
    const signInTab = document.getElementById('signInTab');
    const signUpTab = document.getElementById('signUpTab');
    const breadcrumbActive = document.getElementById('breadcrumb-active');

    // Toggle between forms
    function switchToSignIn() {
        signInForm.style.display = 'flex'; 
        signUpForm.style.display = 'none';
        signInForm.classList.remove('hidden');
        signUpForm.classList.add('hidden');
        signInTab.classList.add('auth__tab--active');
        signUpTab.classList.remove('auth__tab--active');
        breadcrumbActive.textContent = 'Sign In';

        // Update social button text
        document.querySelectorAll('.auth__social').forEach(btn => {
            if (btn.classList.contains('auth__social--google')) {
                btn.innerHTML = '<i class="fab fa-google"></i> Login with Google';
            } else {
                btn.innerHTML = '<i class="fab fa-apple"></i> Login with Apple';
            }
        });
    }

    function switchToSignUp() {
        signUpForm.style.display = 'flex'; 
        signInForm.style.display = 'none';
        signUpForm.classList.remove('hidden');
        signInForm.classList.add('hidden');
        signUpTab.classList.add('auth__tab--active');
        signInTab.classList.remove('auth__tab--active');
        breadcrumbActive.textContent = 'Sign Up';

        // Update social button text
        document.querySelectorAll('.auth__social').forEach(btn => {
            if (btn.classList.contains('auth__social--google')) {
                btn.innerHTML = '<i class="fab fa-google"></i> Sign up with Google';
            } else {
                btn.innerHTML = '<i class="fab fa-apple"></i> Sign up with Apple';
            }
        });
    }

    // Tab click events
    signInTab.addEventListener('click', switchToSignIn);
    signUpTab.addEventListener('click', switchToSignUp);

    // Password visibility toggle
    document.querySelectorAll('.auth__icon--eye').forEach(icon => {
        icon.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);

            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                targetInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // Validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Display error message
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorMsg = formControl.querySelector('.error-message') || document.createElement('span');
        errorMsg.className = 'error-message';
        errorMsg.style.color = 'red';
        errorMsg.style.fontSize = '12px';
        errorMsg.textContent = message;
        formControl.appendChild(errorMsg);
        input.style.borderColor = 'red';
    }

    // Remove error message
    function removeError(input) {
        const formControl = input.parentElement;
        const errorMsg = formControl.querySelector('.error-message');
        if (errorMsg) {
            formControl.removeChild(errorMsg);
        }
        input.style.borderColor = '#E4E7E9';
    }

    // Validate form inputs
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required]');

        inputs.forEach(input => {
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

        // Check password match for sign up form
        if (form.classList.contains('auth__form--signup')) {
            const password = document.getElementById('signUpPassword');
            const confirmPassword = document.getElementById('confirmPassword');

            if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'Passwords do not match');
                isValid = false;
            }
        }

        return isValid;
    }

    // Handle form submissions
    signInForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm(this)) {
            alert('Sign In Successful!');
            this.reset();
        }
    });

    signUpForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm(this)) {
            alert('Sign Up Successful!');
            this.reset();
            // Switch to sign in after successful sign up
            setTimeout(switchToSignIn, 1000);
        }
    });
});