document.addEventListener('DOMContentLoaded', function () {
    // Select elements
    const signInForm = document.querySelector('.auth__form--signin');
    const signUpForm = document.querySelector('.auth__form--signup');
    const signInTab = document.getElementById('signInTab');
    const signUpTab = document.getElementById('signUpTab');
    const breadcrumbActive = document.getElementById('breadcrumb-active');
    const allCategoryButton = document.getElementById("allCategoryButton");
    const allCategoryDropdown = document.getElementById("allCategoryDropdown");
    const languageButton = document.getElementById("allLanguageButton");
    const languageDropdown = document.getElementById("allLanguageDropdown");
    const moneyButton = document.getElementById("allMoneyButton");
    const moneyDropdown = document.getElementById("allMoneyDropdown");
    const skipLink = document.querySelector('.skip-link');

    // Focus management for skip link
    skipLink.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('main-content').setAttribute('tabindex', '-1');
        document.getElementById('main-content').focus();
    });

    // Dropdown functionality
    allCategoryButton.addEventListener("click", () => {
        const isExpanded = allCategoryButton.getAttribute("aria-expanded") === "true";
        allCategoryButton.setAttribute("aria-expanded", !isExpanded);
        allCategoryDropdown.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
        if (!allCategoryButton.contains(event.target) && !allCategoryDropdown.contains(event.target)) {
            allCategoryButton.setAttribute("aria-expanded", "false");
            allCategoryDropdown.classList.remove("active");
        }
    });

    // Toggle dropdown visibility
    const toggleDropdown = (button, dropdown) => {
        const isExpanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", !isExpanded);
        dropdown.classList.toggle("active");
    };

    // Close all dropdowns
    const closeAllDropdowns = () => {
        languageButton.setAttribute("aria-expanded", "false");
        languageDropdown.classList.remove("active");
        moneyButton.setAttribute("aria-expanded", "false");
        moneyDropdown.classList.remove("active");
        allCategoryButton.setAttribute("aria-expanded", "false");
        allCategoryDropdown.classList.remove("active");
    };

    // Event listeners for language dropdown
    languageButton.addEventListener("click", (event) => {
        event.stopPropagation();
        closeAllDropdowns();
        toggleDropdown(languageButton, languageDropdown);
    });

    // Event listeners for money dropdown
    moneyButton.addEventListener("click", (event) => {
        event.stopPropagation();
        closeAllDropdowns();
        toggleDropdown(moneyButton, moneyDropdown);
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", closeAllDropdowns);

    // Keyboard navigation for dropdowns
    [languageButton, moneyButton, allCategoryButton].forEach(button => {
        button.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                const dropdownId = button.getAttribute("aria-controls");
                const dropdown = document.getElementById(dropdownId);
                toggleDropdown(button, dropdown);
            } else if (event.key === "Escape") {
                closeAllDropdowns();
            }
        });
    });

    // Tab functionality
    function switchToSignIn() {
        signInForm.hidden = false;
        signUpForm.hidden = true;
        signInTab.setAttribute("aria-selected", "true");
        signUpTab.setAttribute("aria-selected", "false");
        signInTab.classList.add("auth__tab--active");
        signUpTab.classList.remove("auth__tab--active");
        breadcrumbActive.textContent = 'Sign In';
    }

    function switchToSignUp() {
        signUpForm.hidden = false;
        signInForm.hidden = true;
        signUpTab.setAttribute("aria-selected", "true");
        signInTab.setAttribute("aria-selected", "false");
        signUpTab.classList.add("auth__tab--active");
        signInTab.classList.remove("auth__tab--active");
        breadcrumbActive.textContent = 'Sign Up';
    }

    // Tab click events
    signInTab.addEventListener('click', switchToSignIn);
    signUpTab.addEventListener('click', switchToSignUp);

    // Keyboard navigation for tabs
    [signInTab, signUpTab].forEach(tab => {
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (tab.id === 'signInTab') {
                    switchToSignIn();
                } else {
                    switchToSignUp();
                }
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                if (e.key === 'ArrowRight' && tab.id === 'signInTab') {
                    switchToSignUp();
                    signUpTab.focus();
                } else if (e.key === 'ArrowLeft' && tab.id === 'signUpTab') {
                    switchToSignIn();
                    signInTab.focus();
                }
            }
        });
    });

    // Password visibility toggle
    document.querySelectorAll('.auth__icon--eye').forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            const icon = this.querySelector('i');

            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
                this.setAttribute('aria-label', 'Hide password');
            } else {
                targetInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
                this.setAttribute('aria-label', 'Show password');
            }
        });

        // Keyboard support for password toggle
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

    // Validate email format
    function validateEmail(email) {
        const re = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
        return re.test(email);
    }

    // Display error message
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorMsg = formControl.querySelector('.error-message') || document.createElement('span');
        errorMsg.className = 'error-message';
        errorMsg.textContent = message;
        formControl.appendChild(errorMsg);
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
    }

    // Remove error message
    function removeError(input) {
        const formControl = input.parentElement;
        const errorMsg = formControl.querySelector('.error-message');
        if (errorMsg) {
            formControl.removeChild(errorMsg);
        }
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
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
            } else if (input.type === 'password' && input.value.length < (input.id === 'signUpPassword' ? 8 : 6)) {
                showError(input, `Password must be at least ${input.id === 'signUpPassword' ? 8 : 6} characters`);
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