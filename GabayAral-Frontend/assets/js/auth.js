
/* ==========================================
   GABAYARAL - AUTHENTICATION INTERACTIONS
   Corrected Consolidated Version
   ========================================== */

"use strict";


/* ==========================================
   INITIALIZE AUTHENTICATION FUNCTIONS
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializePasswordToggles();
    initializeLoginForm();
    initializeSignupPathway();
    initializeSignupForm();
    initializeForgotPasswordForm();
    initializeResetPasswordForm();
    initializeEmailVerification();
    initializeVerifyEmail();
    initializeAccountStatus();
    initializeAuthFooter();

    console.log("GabayAral Authentication Initialized.");

});


/* ==========================================
   SHOW OR HIDE PASSWORD
   ========================================== */

function initializePasswordToggles() {

    const toggleButtons = document.querySelectorAll(
        "[data-password-toggle]"
    );

    toggleButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const inputId = button.dataset.passwordToggle;
            const input = document.getElementById(inputId);

            if (!input) return;

            const isPassword = input.type === "password";

            input.type = isPassword ? "text" : "password";

            button.innerHTML = isPassword
                ? '<i class="bi bi-eye-slash"></i>'
                : '<i class="bi bi-eye"></i>';

            button.setAttribute(
                "aria-label",
                isPassword ? "Hide password" : "Show password"
            );

        });

    });

}


/* ==========================================
   LOGIN FORM DEMONSTRATION
   ========================================== */

function initializeLoginForm() {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        if (!loginForm.checkValidity()) {

            loginForm.reportValidity();
            return;

        }

        showAuthMessage(
            "The login form is working visually. Real authentication will be connected to the Django backend."
        );

    });

}


/* ==========================================
   SHARED AUTHENTICATION MESSAGE
   ========================================== */

function showAuthMessage(message) {

    const messageElement = document.getElementById("authMessage");

    if (!messageElement) {
        console.warn(message);
        return;
    }

    messageElement.textContent = message;

    const toastElement = document.getElementById("authToast");

    if (toastElement && window.bootstrap) {

        const toast = bootstrap.Toast.getOrCreateInstance(
            toastElement,
            { delay: 4500 }
        );

        toast.show();

    } else {

        messageElement.hidden = false;

    }

}


/* ==========================================
   SIGN UP PATHWAY SELECTION
   ========================================== */

function initializeSignupPathway() {

    const pathwaySelect = document.getElementById("accountPathway");

    if (!pathwaySelect) return;

    const pathwayFields = document.querySelectorAll(
        "[data-pathway-fields]"
    );

    function updatePathway() {

        const selectedPathway = pathwaySelect.value;

        pathwayFields.forEach((section) => {

            const shouldShow =
                section.dataset.pathwayFields === selectedPathway;

            section.classList.toggle("show", shouldShow);

            section.querySelectorAll("input").forEach((input) => {

                input.disabled = !shouldShow;

                input.required =
                    shouldShow &&
                    input.dataset.required === "true";

            });

        });

    }

    pathwaySelect.addEventListener("change", updatePathway);

    updatePathway();

}


/* ==========================================
   SIGN UP FORM DEMONSTRATION
   ========================================== */

function initializeSignupForm() {

    const signupForm = document.getElementById("signupForm");

    if (!signupForm) return;

    const password = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    signupForm.addEventListener("submit", (event) => {

        event.preventDefault();

        if (!signupForm.checkValidity()) {

            signupForm.reportValidity();
            return;

        }

        if (!password || !confirmPassword) return;

        if (password.value !== confirmPassword.value) {

            confirmPassword.setCustomValidity(
                "Passwords do not match."
            );

            confirmPassword.reportValidity();
            confirmPassword.setCustomValidity("");

            return;

        }

        /*
         * FRONTEND DEMONSTRATION ONLY
         *
         * No account is created.
         * No password is transmitted or stored.
         * No email is sent.
         */

        window.location.href = "email-verification.html?demo=1";

    });

}


/* ==========================================
   FORGOT PASSWORD
   ========================================== */

function initializeForgotPasswordForm() {

    const forgotForm = document.getElementById(
        "forgotPasswordForm"
    );

    if (!forgotForm) return;

    forgotForm.addEventListener("submit", (event) => {

        event.preventDefault();

        if (!forgotForm.checkValidity()) {

            forgotForm.reportValidity();
            return;

        }

        showAuthMessage(
            "If an account is associated with this email address, instructions for resetting the password will be sent."
        );

        forgotForm.reset();

    });

}


/* ==========================================
   RESET PASSWORD
   ========================================== */

function initializeResetPasswordForm() {

    const resetForm = document.getElementById("resetPasswordForm");

    if (!resetForm) return;

    const tokenError = document.getElementById("resetTokenError");
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("newConfirmPassword");

    const urlParams = new URLSearchParams(
        window.location.search
    );

    const resetToken = urlParams.get("token");

    if (!resetToken) {

        if (tokenError) {
            tokenError.hidden = false;
        }

        resetForm.hidden = true;

        return;

    }

    resetForm.addEventListener("submit", (event) => {

        event.preventDefault();

        if (!resetForm.checkValidity()) {

            resetForm.reportValidity();
            return;

        }

        if (!newPassword || !confirmPassword) return;

        if (newPassword.value !== confirmPassword.value) {

            confirmPassword.setCustomValidity(
                "The passwords do not match."
            );

            confirmPassword.reportValidity();
            confirmPassword.setCustomValidity("");

            return;

        }

        /*
         * DEMONSTRATION ONLY
         *
         * Token presence does not mean token validity.
         * Django must validate the token, expiry and usage.
         * No password is changed by this frontend code.
         */

        showAuthMessage(
            "Demo only: your form passed validation. The password has not been changed because backend integration is not connected."
        );

        resetForm.reset();

    });

}


/* ==========================================
   EMAIL VERIFICATION PENDING
   ========================================== */

function initializeEmailVerification() {

    const resendButton = document.getElementById(
        "resendVerification"
    );

    const demoNote = document.getElementById(
        "verificationDemoNote"
    );

    if (!resendButton) return;

    const params = new URLSearchParams(
        window.location.search
    );

    const isDemo = params.get("demo") === "1";

    if (isDemo && demoNote) {

        demoNote.textContent =
            "Demo registration flow only. No real account was created and no verification email was sent.";

    }

    resendButton.addEventListener("click", () => {

        showAuthMessage(
            "Demo only: no verification email was sent. The Django backend will handle real verification email requests."
        );

    });

}


/* ==========================================
   VERIFY EMAIL LINK
   ========================================== */

function initializeVerifyEmail() {

    const resultContainer = document.getElementById(
        "verificationResult"
    );

    if (!resultContainer) return;

    const urlParams = new URLSearchParams(
        window.location.search
    );

    const token = urlParams.get("token");

    const resultIcon = document.getElementById(
        "verificationResultIcon"
    );

    const resultTitle = document.getElementById(
        "verificationResultTitle"
    );

    const resultDescription = document.getElementById(
        "verificationResultDescription"
    );

    const loginLink = document.getElementById(
        "verificationLoginLink"
    );

    if (
        !resultIcon ||
        !resultTitle ||
        !resultDescription ||
        !loginLink
    ) {
        return;
    }

    if (!token) {

        resultIcon.className =
            "verification-icon warning";

        resultIcon.innerHTML =
            '<i class="bi bi-exclamation-triangle"></i>';

        resultTitle.textContent =
            "Verification Link Unavailable";

        resultDescription.textContent =
            "The verification link is missing its required token. Please request a new verification email.";

        loginLink.textContent =
            "Request New Verification";

        loginLink.href =
            "email-verification.html";

        return;

    }

    /*
     * DEMONSTRATION ONLY
     *
     * Receiving a token does not verify an email.
     * Django must validate authenticity, expiry and use.
     */

    resultIcon.className =
        "verification-icon";

    resultIcon.innerHTML =
        '<i class="bi bi-envelope-check"></i>';

    resultTitle.textContent =
        "Verification Link Received";

    resultDescription.textContent =
        "Your verification link has been opened. The backend must validate it before your email can be marked as verified.";

    loginLink.textContent =
        "Return to Sign In";

    loginLink.href =
        "login.html";

}


/* ==========================================
   ACCOUNT STATUS
   ========================================== */

function initializeAccountStatus() {

    const statusContainer = document.getElementById(
        "accountStatusContent"
    );

    if (!statusContainer) return;

    const statusConfigs = {

        "registration-pending": {
            type: "pending",
            label: "Registration Submitted",
            icon: "bi-clipboard-check",
            title: "Your Registration Has Been Submitted",
            description:
                "Your registration request has been received. The required registration or workspace review must be completed before the requested access can be granted.",
            next:
                "Please wait for the appropriate registration update. Creating an account does not automatically authorize a School or Platform role."
        },

        "teacher-invitation-pending": {
            type: "pending",
            label: "Invitation Pending",
            icon: "bi-envelope-paper",
            title: "Teacher Invitation Pending",
            description:
                "Your Teacher registration requires a valid School invitation and the appropriate authorization.",
            next:
                "Check your invitation instructions or contact the authorized School Administrator if you need assistance."
        },

        "guardian-request-pending": {
            type: "pending",
            label: "Verification Pending",
            icon: "bi-person-check",
            title: "Guardian Request Under Review",
            description:
                "Your Parent or Guardian connection request has been submitted and is awaiting verification.",
            next:
                "The authorized Teacher or referred School Administrator must review the request. A submitted request does not yet grant access to the child's information."
        },

        "workspace-request-pending": {
            type: "pending",
            label: "Workspace Review Pending",
            icon: "bi-building-check",
            title: "School Workspace Request Submitted",
            description:
                "Your School workspace registration request has been received and is awaiting the required review and authorization.",
            next:
                "Please wait for an update from the appropriate platform authority. Submitting this request does not automatically grant School Administrator permissions."
        },

        "restricted": {
            type: "restricted",
            label: "Access Restricted",
            icon: "bi-shield-lock",
            title: "Account Access Is Restricted",
            description:
                "Access to this account or requested service is currently restricted.",
            next:
                "Please contact the appropriate authorized administrator through your school's established support process. Do not attempt to bypass account restrictions."
        },

        "access-denied": {
            type: "info",
            label: "Access Not Authorized",
            icon: "bi-shield-x",
            title: "You Cannot Access This Workspace",
            description:
                "Your current account context does not have authorization for the requested workspace or resource.",
            next:
                "Return to your authorized sign-in or workspace selection process. The backend will verify your membership, role and resource permissions."
        }

    };

    const params = new URLSearchParams(
        window.location.search
    );

    const requestedStatus = params.get("status");

    const config = statusConfigs[requestedStatus] || {

        type: "info",
        label: "Account Information",
        icon: "bi-info-circle",
        title: "Account Status Information",
        description:
            "The requested account status is unavailable or has not been recognized.",
        next:
            "Please return to Sign In or contact the appropriate authorized administrator for assistance."

    };

    const icon = document.getElementById(
        "accountStatusIcon"
    );

    const label = document.getElementById(
        "accountStatusLabel"
    );

    const title = document.getElementById(
        "accountStatusTitle"
    );

    const description = document.getElementById(
        "accountStatusDescription"
    );

    const next = document.getElementById(
        "accountStatusNext"
    );

    if (
        !icon ||
        !label ||
        !title ||
        !description ||
        !next
    ) {
        return;
    }

    icon.className =
        "account-status-icon " + config.type;

    icon.innerHTML =
        '<i class="bi ' + config.icon + '"></i>';

    label.className =
        "account-status-label " + config.type;

    label.textContent = config.label;

    title.textContent = config.title;

    description.textContent = config.description;

    next.textContent = config.next;

    console.log(
        "GabayAral account status page initialized."
    );

}


/* ==========================================
   SHARED AUTHENTICATION FOOTER
   ========================================== */

function initializeAuthFooter() {

    const yearElement = document.getElementById(
        "currentYear"
    );

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

}
