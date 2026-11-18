
/* ==========================================
   GABAYARAL - SCHOOL ADMINISTRATOR DASHBOARD
   ========================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    initializeSchoolAdminSearch();
    initializeSchoolAdminDate();
    initializeSchoolProfileForm();
    initializeSchoolLogoPreview();

    initializeSchoolSetupWizard();

    console.log("School Administrator Frontend initialized.");

});

/* DASHBOARD SEARCH */

function initializeSchoolAdminSearch() {

    const searchInput = document.getElementById("dashboardSearch");

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {

        const query = searchInput.value.trim().toLowerCase();

        const searchableItems = document.querySelectorAll(
            ".sa-searchable"
        );

        searchableItems.forEach((item) => {

            const matches = item.textContent
                .toLowerCase()
                .includes(query);

            item.hidden = query !== "" && !matches;

        });

    });

}


/* CURRENT DATE */


function initializeSchoolAdminDate() {

    const dateElement = document.getElementById("saCurrentDate");
    const footerYear = document.getElementById("saFooterYear");

    const today = new Date();

    if (dateElement) {

        dateElement.textContent = today.toLocaleDateString(
            "en-PH",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

    }

    if (footerYear) {
        footerYear.textContent = today.getFullYear();
    }

}



/* ==========================================
   F9.2 - SCHOOL PROFILE FORM
   ========================================== */

function initializeSchoolProfileForm() {

    const profileForm = document.getElementById(
        "schoolProfileForm"
    );

    if (!profileForm) return;

    const message = document.getElementById(
        "schoolProfileMessage"
    );

    const schoolName = document.getElementById(
        "schoolName"
    );

    const previewName = document.getElementById(
        "previewSchoolName"
    );

    const contactEmail = document.getElementById(
        "schoolContactEmail"
    );

    const contactPhone = document.getElementById(
        "schoolContactPhone"
    );

    const address = document.getElementById(
        "schoolAddress"
    );

    const previewEmail = document.getElementById(
        "previewSchoolEmail"
    );

    const previewPhone = document.getElementById(
        "previewSchoolPhone"
    );

    function updatePreview() {

        if (previewName) {
            previewName.textContent =
                schoolName.value.trim() || "School Name";
        }

        if (previewEmail) {
            previewEmail.textContent =
                contactEmail.value.trim() || "Not provided";
        }

        if (previewPhone) {
            previewPhone.textContent =
                contactPhone.value.trim() || "Not provided";
        }

    }

    profileForm.addEventListener("input", updatePreview);

    profileForm.addEventListener("submit", (event) => {

        event.preventDefault();

        if (!profileForm.checkValidity()) {
            profileForm.reportValidity();
            return;
        }

        updatePreview();

        message.className = "sa-profile-message success show";

        message.textContent =
            "Demo only: your form passed validation. No school information has been saved. Backend integration is required to update the official school profile.";

    });

    profileForm.addEventListener("reset", () => {

        window.setTimeout(() => {

            updatePreview();

            message.className = "sa-profile-message";
            message.textContent = "";

        }, 0);

    });

}


/* ==========================================
   F9.2 - SCHOOL LOGO PREVIEW
   ========================================== */

function initializeSchoolLogoPreview() {

    const logoInput = document.getElementById(
        "schoolLogo"
    );

    const logoPreview = document.getElementById(
        "schoolLogoPreview"
    );

    if (!logoInput || !logoPreview) return;

    let currentObjectUrl = null;

    logoInput.addEventListener("change", () => {

        const file = logoInput.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {

            logoInput.value = "";

            showSchoolProfileMessage(
                "Please select a valid image file.",
                "error"
            );

            return;

        }

        if (file.size > 2 * 1024 * 1024) {

            logoInput.value = "";

            showSchoolProfileMessage(
                "The selected image exceeds the 2 MB demonstration limit.",
                "error"
            );

            return;

        }

        if (currentObjectUrl) {
            URL.revokeObjectURL(currentObjectUrl);
        }

        currentObjectUrl = URL.createObjectURL(file);

        logoPreview.innerHTML = "";

        const image = document.createElement("img");

        image.src = currentObjectUrl;
        image.alt = "Selected school logo preview";

        logoPreview.appendChild(image);

    });

    const profileForm = document.getElementById("schoolProfileForm");

if (profileForm) {

    profileForm.addEventListener("reset", () => {

        if (currentObjectUrl) {
            URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = null;
        }

        logoPreview.innerHTML =
            '<i class="bi bi-building"></i>';

    });

}

}


/* ==========================================
   F9.2 - PROFILE MESSAGE
   ========================================== */

function showSchoolProfileMessage(message, type) {

    const element = document.getElementById(
        "schoolProfileMessage"
    );

    if (!element) return;

    element.className =
        "sa-profile-message " + type + " show";

    element.textContent = message;

}


/* ==========================================
   F9.3 - SCHOOL SETUP WIZARD
   FRONTEND DEMONSTRATION
   ========================================== */

function initializeSchoolSetupWizard() {

    const wizard = document.getElementById("schoolSetupForm");

    if (!wizard) return;

    const panels = Array.from(
        wizard.querySelectorAll(".sa-wizard-panel")
    );

    const steps = Array.from(
        wizard.querySelectorAll(".sa-wizard-step")
    );

    const progressFill = document.getElementById(
        "wizardProgressFill"
    );

    const stepLabel = document.getElementById(
        "wizardStepLabel"
    );

    const previousButton = document.getElementById(
        "wizardPrevious"
    );

    const nextButton = document.getElementById(
        "wizardNext"
    );

    const finishButton = document.getElementById(
        "wizardFinish"
    );

    const message = document.getElementById(
        "wizardMessage"
    );

    const form = document.getElementById(
        "schoolSetupForm"
    );

    if (
        !panels.length ||
        !previousButton ||
        !nextButton ||
        !finishButton ||
        !form
    ) {
        return;
    }

    let currentStep = 0;

    function updateSummary() {

        const fields = [
            ["summarySchool", "setupSchoolName"],
            ["summaryGrades", "setupGradeSpaces"],
            ["summarySections", "setupSections"],
            ["summarySubjects", "setupSubjects"],
            ["summaryOfferings", "setupOfferings"]
        ];

        fields.forEach(([summaryId, inputId]) => {

            const summary = document.getElementById(summaryId);
            const input = document.getElementById(inputId);

            if (summary && input) {
                summary.textContent =
                    input.value.trim() || "Not provided";
            }

        });

    }

    function showStep(index) {

        currentStep = Math.max(
            0,
            Math.min(index, panels.length - 1)
        );

        panels.forEach((panel, i) => {

            panel.classList.toggle(
                "active",
                i === currentStep
            );

        });

        steps.forEach((step, i) => {

            step.classList.toggle(
                "active",
                i === currentStep
            );

            step.classList.toggle(
                "completed",
                i < currentStep
            );

        });

        if (progressFill) {

        const progress =
            ((currentStep + 1) / panels.length) * 100;

        progressFill.style.width = progress + "%";

        }

        if (stepLabel) {

            stepLabel.textContent =
                `Step ${currentStep + 1} of ${panels.length}`;

        }

        previousButton.hidden = currentStep === 0;

        nextButton.hidden =
            currentStep === panels.length - 1;

        finishButton.hidden =
            currentStep !== panels.length - 1;

        if (currentStep === panels.length - 1) {
            updateSummary();
        }

        const heading = panels[currentStep].querySelector("h2");

        if (heading) {
            heading.setAttribute("tabindex", "-1");
            heading.focus();
        }

    }

    function validateCurrentStep() {

        const inputs = panels[currentStep].querySelectorAll(
            "input[required], textarea[required], select[required]"
        );

        for (const input of inputs) {

            if (!input.checkValidity()) {

                input.reportValidity();
                return false;

            }

        }

        return true;

    }

    nextButton.addEventListener("click", () => {

        if (!validateCurrentStep()) return;

        showStep(currentStep + 1);

    });

    previousButton.addEventListener("click", () => {

        showStep(currentStep - 1);

    });

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        if (!validateCurrentStep()) return;

        updateSummary();

        message.className =
            "sa-wizard-message success show";

        message.textContent =
            "Demo only: your School Setup information passed the frontend review. No grade spaces, sections, subjects or offerings have been created or saved.";

        finishButton.disabled = true;
        finishButton.textContent = "Demo Review Completed";

    });

    showStep(0);

    console.log("School Setup Wizard initialized.");

}
