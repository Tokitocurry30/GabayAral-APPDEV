
/* ==========================================
   GABAYARAL - SCHOOL ADMINISTRATOR FRONTEND
   Consolidated Corrected Version F9.1-F9.5
   ========================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initializeSchoolAdminSearch();
    initializeSchoolAdminDate();
    initializeSchoolProfileForm();
    initializeSchoolLogoPreview();
    initializeSchoolSetupWizard();
    initializeGradeLevelManagement();
    initializeSectionManagement();
    initializeSubjectLibraryManagement();
    initializeSubjectOfferingManagement();
    initializeCopySubjects();
    initializeTeacherDirectory();
    initializeTeacherInvitationManagement();
    initializeTeacherReplacement();
    initializeStudentEnrollmentOverview();
    initializeStudentSubjectCodeManagement();
    initializeParentSectionCodeManagement();
    initializeReferredGuardianRequests();
    initializeSchoolAnnouncementManagement();
    initializeWorkspaceDeactivationRequest();
    initializeSchoolArchiveManagement();
    initializeSchoolActivityAndNotifications();
    initializeEasyAccess();
    initializeGlobalEasyAccessPreferences();
    initializeSchoolSelector();
    initializeAdminProfileDropdown();

    console.log("School Administrator Frontend initialized.");
});
/* ==========================================
   SHARED HELPERS
   ========================================== */

function escapeSchoolAdminHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => {
        const replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };
        return replacements[character];
    });
}

function configureModalFocusManagement(modalElement, getLastTrigger) {

    if (!modalElement) return;

    modalElement.addEventListener("hide.bs.modal", () => {

        if (modalElement.contains(document.activeElement)) {
            document.activeElement.blur();
        }

    });

    modalElement.addEventListener("hidden.bs.modal", () => {

        const trigger = getLastTrigger();

        if (trigger && trigger.isConnected && !trigger.disabled) {
            trigger.focus();
        }

    });

}


/* ==========================================
   F9.1 - DASHBOARD SEARCH
   ========================================== */

function initializeSchoolAdminSearch() {

    const searchInput = document.getElementById("dashboardSearch");

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {

        const query = searchInput.value.trim().toLowerCase();

        document.querySelectorAll(".sa-searchable").forEach(item => {

            const matches = item.textContent.toLowerCase().includes(query);

            item.hidden = query !== "" && !matches;

        });

    });

}


/* ==========================================
   CURRENT DATE AND FOOTER YEAR
   ========================================== */

function initializeSchoolAdminDate() {

    const dateElement = document.getElementById("saCurrentDate");
    const footerYear = document.getElementById("saFooterYear");

    const today = new Date();

    if (dateElement) {

        dateElement.textContent = today.toLocaleDateString("en-PH", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

    }

    if (footerYear) {
        footerYear.textContent = String(today.getFullYear());
    }

}


/* ==========================================
   F9.2 - SCHOOL PROFILE FORM
   ========================================== */

function initializeSchoolProfileForm() {

    const profileForm = document.getElementById("schoolProfileForm");

    if (!profileForm) return;

    const message = document.getElementById("schoolProfileMessage");
    const schoolName = document.getElementById("schoolName");
    const previewName = document.getElementById("previewSchoolName");
    const contactEmail = document.getElementById("schoolContactEmail");
    const contactPhone = document.getElementById("schoolContactPhone");
    const previewEmail = document.getElementById("previewSchoolEmail");
    const previewPhone = document.getElementById("previewSchoolPhone");

    function updatePreview() {

        if (previewName && schoolName) {
            previewName.textContent = schoolName.value.trim() || "School Name";
        }

        if (previewEmail && contactEmail) {
            previewEmail.textContent = contactEmail.value.trim() || "Not provided";
        }

        if (previewPhone && contactPhone) {
            previewPhone.textContent = contactPhone.value.trim() || "Not provided";
        }

    }

    profileForm.addEventListener("input", updatePreview);

    profileForm.addEventListener("change", updatePreview);

    profileForm.addEventListener("submit", event => {

        event.preventDefault();

        if (!profileForm.checkValidity()) {
            profileForm.reportValidity();
            return;
        }

        updatePreview();

        if (message) {
            message.className = "sa-profile-message success show";
            message.textContent =
                "Demo only: your form passed validation. No school information has been saved. Backend integration is required to update the official school profile.";
        }

    });

    profileForm.addEventListener("reset", () => {

        window.setTimeout(() => {

            updatePreview();

            if (message) {
                message.className = "sa-profile-message";
                message.textContent = "";
            }

        }, 0);

    });

}


/* ==========================================
   F9.2 - SCHOOL LOGO PREVIEW
   ========================================== */

function initializeSchoolLogoPreview() {

    const logoInput = document.getElementById("schoolLogo");
    const logoPreview = document.getElementById("schoolLogoPreview");

    if (!logoInput || !logoPreview) return;

    let currentObjectUrl = null;

    function resetLogoPreview() {

        if (currentObjectUrl) {
            URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = null;
        }

        logoPreview.innerHTML = '<i class="bi bi-building"></i>';

    }

    logoInput.addEventListener("change", () => {

        const file = logoInput.files && logoInput.files[0];

                if (!file) return;

                const allowedLogoTypes = [
            "image/png",
            "image/jpeg",
            "image/webp"
        ];

        if (!allowedLogoTypes.includes(file.type)) {

            logoInput.value = "";

            showSchoolProfileMessage(
                "Please upload a PNG, JPG, JPEG or WEBP image.",
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

        const image = document.createElement("img");

        image.src = currentObjectUrl;
        image.alt = "Selected school logo preview";

        logoPreview.replaceChildren(image);

    });

    const profileForm = document.getElementById("schoolProfileForm");

    if (profileForm) {
        profileForm.addEventListener("reset", () => {
            window.setTimeout(resetLogoPreview, 0);
        });
    }

}

function showSchoolProfileMessage(messageText, type) {

    const element = document.getElementById("schoolProfileMessage");

    if (!element) return;

    element.className = "sa-profile-message " + type + " show";
    element.textContent = messageText;

}


/* ==========================================
   F9.3 - SCHOOL SETUP WIZARD
   ========================================== */

function initializeSchoolSetupWizard() {

    const form = document.getElementById("schoolSetupForm");

    if (!form) return;

    const panels = Array.from(form.querySelectorAll(".sa-wizard-panel"));
    const steps = Array.from(form.querySelectorAll(".sa-wizard-step"));

    const progressFill = document.getElementById("wizardProgressFill");
    const stepLabel = document.getElementById("wizardStepLabel");
    const previousButton = document.getElementById("wizardPrevious");
    const nextButton = document.getElementById("wizardNext");
    const finishButton = document.getElementById("wizardFinish");
    const message = document.getElementById("wizardMessage");

    if (
        !panels.length ||
        !previousButton ||
        !nextButton ||
        !finishButton ||
        !message
    ) {
        console.error("School Setup Wizard is missing required elements.");
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
                summary.textContent = input.value.trim() || "Not provided";
            }

        });

    }

    function showStep(index) {

        currentStep = Math.max(0, Math.min(index, panels.length - 1));

        panels.forEach((panel, i) => {
            panel.classList.toggle("active", i === currentStep);
        });

        steps.forEach((step, i) => {

            step.classList.toggle("active", i === currentStep);
            step.classList.toggle("completed", i < currentStep);

        });

        if (progressFill) {

            const progress = ((currentStep + 1) / panels.length) * 100;

            progressFill.style.width = progress + "%";

        }

        if (stepLabel) {
            stepLabel.textContent = `Step ${currentStep + 1} of ${panels.length}`;
        }

        previousButton.hidden = currentStep === 0;
        nextButton.hidden = currentStep === panels.length - 1;
        finishButton.hidden = currentStep !== panels.length - 1;

        if (currentStep === panels.length - 1) {
            updateSummary();
        }

        
        const heading = panels[currentStep].querySelector("h2");

        if (heading) {
            heading.setAttribute("tabindex", "-1");

            // Keep keyboard accessibility without moving the page.
            heading.focus({ preventScroll: true });
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

    form.addEventListener("submit", event => {

        event.preventDefault();

        if (!validateCurrentStep()) return;

        updateSummary();

        message.className = "sa-wizard-message success show";

        message.textContent =
            "Demo only: your School Setup information passed the frontend review. No grade spaces, sections, subjects or offerings have been created or saved.";

        finishButton.disabled = true;
        finishButton.textContent = "Demo Review Completed";

    });

    showStep(0);

    console.log("School Setup Wizard initialized.");

}


/* ==========================================
   F9.4 - GRADE-LEVEL SPACE MANAGEMENT
   ========================================== */

function initializeGradeLevelManagement() {

    const tableBody = document.getElementById("gradeLevelTableBody");
    const searchInput = document.getElementById("gradeLevelSearch");
    const statusFilter = document.getElementById("gradeLevelStatusFilter");
    const form = document.getElementById("gradeLevelForm");
    const modalElement = document.getElementById("gradeLevelModal");

    if (!tableBody || !form || !modalElement) return;

    if (!window.bootstrap) {
        console.error("Bootstrap Modal is unavailable on the Grade-Level page.");
        return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    /* FIX: Separate focus variable for Grade-Level modal */
    let lastModalTrigger = null;

    configureModalFocusManagement(
        modalElement,
        () => lastModalTrigger
    );

    const nameInput = document.getElementById("gradeLevelName");
    const descriptionInput = document.getElementById("gradeLevelDescription");
    const recordIdInput = document.getElementById("gradeLevelRecordId");
    const modalTitle = document.getElementById("gradeLevelModalTitle");
    const message = document.getElementById("gradeLevelMessage");
    const modalMessage = document.getElementById("gradeLevelModalMessage");

    const activeCount = document.getElementById("gradeActiveCount");
    const archivedCount = document.getElementById("gradeArchivedCount");
    const totalCount = document.getElementById("gradeTotalCount");
    const resultCount = document.getElementById("gradeResultCount");
    const emptyState = document.getElementById("gradeEmptyState");

    let gradeSpaces = [
        { id: 1, name: "Grade 7", description: "Junior High School", status: "active" },
        { id: 2, name: "Grade 8", description: "Junior High School", status: "active" },
        { id: 3, name: "Grade 9", description: "Junior High School", status: "active" },
        { id: 4, name: "Grade 10", description: "Junior High School", status: "active" },
        { id: 5, name: "Grade 11", description: "Senior High School", status: "archived" }
    ];

    function showMessage(text, type = "success") {

        if (!message) return;

        message.className = "sa-grade-message " + type + " show";
        message.textContent = text;

    }

    function updateSummary() {

        const active = gradeSpaces.filter(
            item => item.status === "active"
        ).length;

        const archived = gradeSpaces.filter(
            item => item.status === "archived"
        ).length;

        if (activeCount) activeCount.textContent = active;
        if (archivedCount) archivedCount.textContent = archived;
        if (totalCount) totalCount.textContent = gradeSpaces.length;

    }

    function renderTable() {

        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedStatus = statusFilter
            ? statusFilter.value
            : "all";

        const filtered = gradeSpaces.filter(item => {

            const matchesSearch =
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query);

            const matchesStatus =
                selectedStatus === "all" ||
                item.status === selectedStatus;

            return matchesSearch && matchesStatus;

        });

        tableBody.replaceChildren();

        filtered.forEach(item => {

            const row = document.createElement("tr");
            const isActive = item.status === "active";

            const statusHTML = isActive
                ? '<span class="status-pill status-success">Active</span>'
                : '<span class="status-pill status-info">Archived</span>';

            const actionHTML = isActive
                ? `
                    <button type="button" class="sa-grade-action-btn"
                        data-action="edit" data-id="${item.id}"
                        aria-label="Edit grade space">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button type="button" class="sa-grade-action-btn danger"
                        data-action="archive" data-id="${item.id}"
                        aria-label="Archive grade space">
                        <i class="bi bi-archive"></i>
                    </button>
                `
                : `
                    <button type="button" class="sa-grade-action-btn"
                        data-action="edit" data-id="${item.id}"
                        aria-label="Edit archived grade space">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button type="button" class="sa-grade-action-btn"
                        data-action="restore" data-id="${item.id}"
                        aria-label="Restore grade space">
                        <i class="bi bi-arrow-counterclockwise"></i>
                    </button>
                `;

            row.innerHTML = `
                <td>
                    <div class="sa-grade-name">
                        <div class="sa-grade-icon">
                            <i class="bi bi-diagram-3"></i>
                        </div>
                        <div>
                            <strong>${escapeSchoolAdminHTML(item.name)}</strong>
                            <span>Grade-Level Space</span>
                        </div>
                    </div>
                </td>
                <td>${escapeSchoolAdminHTML(item.description || "—")}</td>
                <td>${statusHTML}</td>
                <td class="text-end">
                    <div class="sa-grade-actions">${actionHTML}</div>
                </td>
            `;

            tableBody.appendChild(row);

        });

        if (emptyState) emptyState.hidden = filtered.length !== 0;

        if (resultCount) {
            resultCount.textContent = `${filtered.length} record(s) displayed`;
        }

        updateSummary();

    }

    function openCreateModal() {

        /* FIX: Remember the button that opened this modal */
        lastModalTrigger = document.activeElement;

        form.reset();
        recordIdInput.value = "";

        modalTitle.textContent = "Create Grade-Level Space";

        if (modalMessage) modalMessage.textContent = "";

        modal.show();

    }

    function openEditModal(id) {

        const record = gradeSpaces.find(item => item.id === id);

        if (!record) return;

        /* FIX: Remember the Edit button */
        lastModalTrigger = document.activeElement;

        recordIdInput.value = record.id;
        nameInput.value = record.name;
        descriptionInput.value = record.description;

        modalTitle.textContent = "Edit Grade-Level Space";

        if (modalMessage) modalMessage.textContent = "";

        modal.show();

    }

    function saveRecord(event) {

        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const name = nameInput.value.trim();
        const description = descriptionInput.value.trim();
        const recordId = Number(recordIdInput.value);

        const duplicate = gradeSpaces.some(item =>
            item.name.toLowerCase() === name.toLowerCase() &&
            item.id !== recordId
        );

        if (duplicate) {

            if (modalMessage) {
                modalMessage.textContent =
                    "A Grade-Level Space with this name already exists in this demonstration.";
            }

            return;

        }

        if (recordId) {

            const record = gradeSpaces.find(item => item.id === recordId);

            if (!record) return;

            record.name = name;
            record.description = description;

            modal.hide();

            showMessage(
                "Demo only: Grade-Level Space updated in temporary browser memory. No database record was changed."
            );

        } else {

            const nextId = Math.max(
                0,
                ...gradeSpaces.map(item => item.id)
            ) + 1;

            gradeSpaces.push({
                id: nextId,
                name,
                description,
                status: "active"
            });

            modal.hide();

            showMessage(
                "Demo only: Grade-Level Space added to temporary browser memory. No database record was created."
            );

        }

        renderTable();

    }

    function handleTableAction(event) {

        const button = event.target.closest("[data-action]");

        if (!button) return;

        const action = button.dataset.action;
        const id = Number(button.dataset.id);

        const record = gradeSpaces.find(item => item.id === id);

        if (!record) return;

        if (action === "edit") {
            openEditModal(id);
            return;
        }

        if (action === "archive") {

            if (!window.confirm(
                `Archive "${record.name}" in this demonstration? This does not permanently delete it.`
            )) return;

            record.status = "archived";

            showMessage(
                "Demo only: Grade-Level Space archived in temporary browser memory. Related academic history has not been deleted."
            );

        }

        if (action === "restore") {

            if (!window.confirm(
                `Restore "${record.name}" in this demonstration?`
            )) return;

            record.status = "active";

            showMessage(
                "Demo only: Grade-Level Space restored in temporary browser memory."
            );

        }

        renderTable();

    }

    const createButton = document.getElementById("createGradeLevelButton");

    if (createButton) {
        createButton.addEventListener("click", openCreateModal);
    }

    if (searchInput) {
        searchInput.addEventListener("input", renderTable);
    }

    if (statusFilter) {
        statusFilter.addEventListener("change", renderTable);
    }

    form.addEventListener("submit", saveRecord);
    tableBody.addEventListener("click", handleTableAction);

    renderTable();

    console.log("Grade-Level Space Management initialized.");

}


/* ==========================================
   F9.5 - SECTION MANAGEMENT
   ========================================== */

function initializeSectionManagement() {

    const tableBody = document.getElementById("sectionTableBody");
    const form = document.getElementById("sectionForm");
    const modalElement = document.getElementById("sectionModal");

    if (!tableBody || !form || !modalElement) return;

    if (!window.bootstrap) {
        console.error("Bootstrap is required for Section Management.");
        return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    /* Separate focus variable for Section modal */
    let lastModalTrigger = null;

    configureModalFocusManagement(
        modalElement,
        () => lastModalTrigger
    );

    const searchInput = document.getElementById("sectionSearch");
    const gradeFilter = document.getElementById("sectionGradeFilter");
    const statusFilter = document.getElementById("sectionStatusFilter");

    const gradeSelect = document.getElementById("sectionGradeLevel");
    const sectionNameInput = document.getElementById("sectionName");
    const descriptionInput = document.getElementById("sectionDescription");
    const recordIdInput = document.getElementById("sectionRecordId");
    const modalTitle = document.getElementById("sectionModalTitle");

    const message = document.getElementById("sectionMessage");
    const modalMessage = document.getElementById("sectionModalMessage");

    const totalCount = document.getElementById("sectionTotalCount");
    const activeCount = document.getElementById("sectionActiveCount");
    const archivedCount = document.getElementById("sectionArchivedCount");
    const resultCount = document.getElementById("sectionResultCount");
    const emptyState = document.getElementById("sectionEmptyState");

    const createButton = document.getElementById("createSectionButton");

    const gradeSpaces = [
        { id: 1, name: "Grade 7", status: "active" },
        { id: 2, name: "Grade 8", status: "active" },
        { id: 3, name: "Grade 9", status: "active" },
        { id: 4, name: "Grade 10", status: "active" },
        { id: 5, name: "Grade 11", status: "archived" }
    ];

    let sections = [
        { id: 1, gradeSpaceId: 1, name: "Section A", description: "Grade 7 class section", status: "active" },
        { id: 2, gradeSpaceId: 1, name: "Section B", description: "Grade 7 class section", status: "active" },
        { id: 3, gradeSpaceId: 2, name: "Section A", description: "Grade 8 class section", status: "active" },
        { id: 4, gradeSpaceId: 2, name: "Section B", description: "Grade 8 class section", status: "active" },
        { id: 5, gradeSpaceId: 3, name: "Section A", description: "Grade 9 class section", status: "active" },
        { id: 6, gradeSpaceId: 5, name: "Section A", description: "Archived sample section", status: "archived" }
    ];

    function getGradeName(gradeSpaceId) {

        const grade = gradeSpaces.find(
            item => item.id === gradeSpaceId
        );

        return grade ? grade.name : "Unknown Grade Space";

    }

    function showMessage(text, type = "success") {

        if (!message) return;

        message.className = "sa-section-message " + type + " show";
        message.textContent = text;

    }

    function updateSummary() {

        const active = sections.filter(
            item => item.status === "active"
        ).length;

        const archived = sections.filter(
            item => item.status === "archived"
        ).length;

        if (totalCount) totalCount.textContent = sections.length;
        if (activeCount) activeCount.textContent = active;
        if (archivedCount) archivedCount.textContent = archived;

    }

    function populateGradeOptions() {

        gradeSelect.innerHTML =
            '<option value="">Select Grade-Level Space</option>';

        gradeSpaces.forEach(grade => {

            const option = document.createElement("option");

            option.value = grade.id;
            option.textContent =
                grade.name +
                (grade.status === "archived" ? " (Archived)" : "");

            option.disabled = grade.status !== "active";

            gradeSelect.appendChild(option);

        });

    }

    function populateGradeFilter() {

        gradeFilter.innerHTML =
            '<option value="all">All Grade-Level Spaces</option>';

        gradeSpaces.forEach(grade => {

            const option = document.createElement("option");

            option.value = grade.id;
            option.textContent = grade.name;

            gradeFilter.appendChild(option);

        });

    }

    function renderTable() {

        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedGrade = gradeFilter
            ? gradeFilter.value
            : "all";

        const selectedStatus = statusFilter
            ? statusFilter.value
            : "all";

        const filtered = sections.filter(item => {

            const gradeName = getGradeName(item.gradeSpaceId);

            const matchesSearch =
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                gradeName.toLowerCase().includes(query);

            const matchesGrade =
                selectedGrade === "all" ||
                item.gradeSpaceId === Number(selectedGrade);

            const matchesStatus =
                selectedStatus === "all" ||
                item.status === selectedStatus;

            return matchesSearch && matchesGrade && matchesStatus;

        });

        tableBody.replaceChildren();

        filtered.forEach(item => {

            const row = document.createElement("tr");
            const isActive = item.status === "active";

            const statusHTML = isActive
                ? '<span class="status-pill status-success">Active</span>'
                : '<span class="status-pill status-info">Archived</span>';

            const actionHTML = isActive
                ? `
                    <button type="button" class="sa-section-action-btn"
                        data-action="edit" data-id="${item.id}"
                        aria-label="Edit section">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button type="button" class="sa-section-action-btn danger"
                        data-action="archive" data-id="${item.id}"
                        aria-label="Archive section">
                        <i class="bi bi-archive"></i>
                    </button>
                `
                : `
                    <button type="button" class="sa-section-action-btn"
                        data-action="edit" data-id="${item.id}"
                        aria-label="Edit archived section">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button type="button" class="sa-section-action-btn"
                        data-action="restore" data-id="${item.id}"
                        aria-label="Restore section">
                        <i class="bi bi-arrow-counterclockwise"></i>
                    </button>
                `;

            row.innerHTML = `
                <td>
                    <div class="sa-section-name">
                        <div class="sa-section-icon">
                            <i class="bi bi-people"></i>
                        </div>
                        <div>
                            <strong>${escapeSchoolAdminHTML(item.name)}</strong>
                            <span>School Section</span>
                        </div>
                    </div>
                </td>
                <td>${escapeSchoolAdminHTML(getGradeName(item.gradeSpaceId))}</td>
                <td>${escapeSchoolAdminHTML(item.description || "—")}</td>
                <td>${statusHTML}</td>
                <td class="text-end">
                    <div class="sa-section-actions">${actionHTML}</div>
                </td>
            `;

            tableBody.appendChild(row);

        });

        if (emptyState) {
            emptyState.hidden = filtered.length !== 0;
        }

        if (resultCount) {
            resultCount.textContent = `${filtered.length} record(s) displayed`;
        }

        updateSummary();

    }

    function openCreateModal() {

        lastModalTrigger = document.activeElement;

        form.reset();
        recordIdInput.value = "";

        modalTitle.textContent = "Create Section";

        if (modalMessage) modalMessage.textContent = "";

        modal.show();

    }

    function openEditModal(id) {

        const record = sections.find(item => item.id === id);

        if (!record) return;

        lastModalTrigger = document.activeElement;

        recordIdInput.value = record.id;
        gradeSelect.value = record.gradeSpaceId;
        sectionNameInput.value = record.name;
        descriptionInput.value = record.description;

        modalTitle.textContent = "Edit Section";

        if (modalMessage) modalMessage.textContent = "";

        modal.show();

    }

    function saveSection(event) {

        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const gradeSpaceId = Number(gradeSelect.value);
        const name = sectionNameInput.value.trim();
        const description = descriptionInput.value.trim();
        const recordId = Number(recordIdInput.value);

        const grade = gradeSpaces.find(
            item => item.id === gradeSpaceId
        );

        if (!grade) {

            if (modalMessage) {
                modalMessage.textContent =
                    "Please select a valid Grade-Level Space.";
            }

            return;

        }

        if (grade.status !== "active") {

            if (modalMessage) {
                modalMessage.textContent =
                    "A Section must belong to an active Grade-Level Space in this demonstration.";
            }

            return;

        }

        const duplicate = sections.some(item => {

            return item.gradeSpaceId === gradeSpaceId &&
                item.name.toLowerCase() === name.toLowerCase() &&
                item.id !== recordId;

        });

        if (duplicate) {

            if (modalMessage) {
                modalMessage.textContent =
                    "A Section with this name already exists under the selected Grade-Level Space.";
            }

            return;

        }

        if (recordId) {

            const record = sections.find(
                item => item.id === recordId
            );

            if (!record) return;

            record.gradeSpaceId = gradeSpaceId;
            record.name = name;
            record.description = description;

            modal.hide();

            showMessage(
                "Demo only: Section updated in temporary browser memory. No database record was changed."
            );

        } else {

            const nextId = Math.max(
                0,
                ...sections.map(item => item.id)
            ) + 1;

            sections.push({
                id: nextId,
                gradeSpaceId,
                name,
                description,
                status: "active"
            });

            modal.hide();

            showMessage(
                "Demo only: Section added to temporary browser memory. No database record was created."
            );

        }

        renderTable();

    }

    function handleTableAction(event) {

        const button = event.target.closest("[data-action]");

        if (!button) return;

        const action = button.dataset.action;
        const id = Number(button.dataset.id);

        const record = sections.find(
            item => item.id === id
        );

        if (!record) return;

        if (action === "edit") {
            openEditModal(id);
            return;
        }

        if (action === "archive") {

            const confirmed = window.confirm(
                `Archive "${record.name}" under ${getGradeName(record.gradeSpaceId)} in this demonstration?`
            );

            if (!confirmed) return;

            record.status = "archived";

            showMessage(
                "Demo only: Section archived in temporary browser memory. Related academic history has not been deleted."
            );

        }

        if (action === "restore") {

            const grade = gradeSpaces.find(
                item => item.id === record.gradeSpaceId
            );

            if (!grade || grade.status !== "active") {

                showMessage(
                    "This Section cannot be restored while its Grade-Level Space is archived. Restore the parent Grade-Level Space first.",
                    "error"
                );

                return;

            }

            const confirmed = window.confirm(
                `Restore "${record.name}" under ${grade.name} in this demonstration?`
            );

            if (!confirmed) return;

            record.status = "active";

            showMessage(
                "Demo only: Section restored in temporary browser memory."
            );

        }

        renderTable();

    }

    if (createButton) {
        createButton.addEventListener("click", openCreateModal);
    }

    if (searchInput) {
        searchInput.addEventListener("input", renderTable);
    }

    if (gradeFilter) {
        gradeFilter.addEventListener("change", renderTable);
    }

    if (statusFilter) {
        statusFilter.addEventListener("change", renderTable);
    }

    form.addEventListener("submit", saveSection);
    tableBody.addEventListener("click", handleTableAction);

    populateGradeOptions();
    populateGradeFilter();
    renderTable();

    console.log("Section Management initialized.");

}


/* ==========================================
   F9.6 - SCHOOL SUBJECT LIBRARY
   FRONTEND DEMONSTRATION
   ========================================== */

function initializeSubjectLibraryManagement() {

    const tableBody = document.getElementById("subjectTableBody");
    const form = document.getElementById("subjectForm");
    const modalElement = document.getElementById("subjectModal");

    if (!tableBody || !form || !modalElement) return;

    if (!window.bootstrap) {
        console.error("Bootstrap Modal is unavailable on Subject Library page.");
        return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    let lastModalTrigger = null;

    /* Reuse the tested shared accessibility helper. */
    configureModalFocusManagement(
        modalElement,
        () => lastModalTrigger
    );

    const searchInput = document.getElementById("subjectSearch");
    const statusFilter = document.getElementById("subjectStatusFilter");

    const nameInput = document.getElementById("subjectName");
    const recordIdInput = document.getElementById("subjectRecordId");
    const modalTitle = document.getElementById("subjectModalTitle");

    const message = document.getElementById("subjectMessage");
    const modalMessage = document.getElementById("subjectModalMessage");

    const totalCount = document.getElementById("subjectTotalCount");
    const activeCount = document.getElementById("subjectActiveCount");
    const archivedCount = document.getElementById("subjectArchivedCount");
    const resultCount = document.getElementById("subjectResultCount");
    const emptyState = document.getElementById("subjectEmptyState");

    const createButton = document.getElementById("createSubjectButton");

    /*
     * SAMPLE SUBJECT CATALOG.
     * Actual records will be retrieved from the Django API.
     *
     * Fields follow the current logical design:
     * subject_id, school_id, subject_name, catalog_status.
     */

    let subjects = [
        {
            id: 1,
            schoolId: 1,
            name: "Mathematics",
            status: "active"
        },
        {
            id: 2,
            schoolId: 1,
            name: "Science",
            status: "active"
        },
        {
            id: 3,
            schoolId: 1,
            name: "English",
            status: "active"
        },
        {
            id: 4,
            schoolId: 1,
            name: "Filipino",
            status: "active"
        },
        {
            id: 5,
            schoolId: 1,
            name: "Araling Panlipunan",
            status: "active"
        },
        {
            id: 6,
            schoolId: 1,
            name: "Sample Archived Subject",
            status: "archived"
        }
    ];

    function showMessage(text, type = "success") {

        if (!message) return;

        message.className =
            "sa-subject-message " + type + " show";

        message.textContent = text;

    }

    function updateSummary() {

        const active = subjects.filter(
            item => item.status === "active"
        ).length;

        const archived = subjects.filter(
            item => item.status === "archived"
        ).length;

        if (totalCount) totalCount.textContent = subjects.length;
        if (activeCount) activeCount.textContent = active;
        if (archivedCount) archivedCount.textContent = archived;

    }

    function renderTable() {

        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedStatus = statusFilter
            ? statusFilter.value
            : "all";

        const filtered = subjects.filter(item => {

            const matchesSearch =
                item.name.toLowerCase().includes(query);

            const matchesStatus =
                selectedStatus === "all" ||
                item.status === selectedStatus;

            return matchesSearch && matchesStatus;

        });

        tableBody.replaceChildren();

        filtered.forEach(item => {

            const row = document.createElement("tr");
            const isActive = item.status === "active";

            const statusHTML = isActive
                ? '<span class="status-pill status-success">Active</span>'
                : '<span class="status-pill status-info">Archived</span>';

            const actionHTML = isActive
                ? `
                    <button type="button"
                        class="sa-subject-action-btn"
                        data-action="edit"
                        data-id="${item.id}"
                        aria-label="Edit subject">
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button type="button"
                        class="sa-subject-action-btn danger"
                        data-action="archive"
                        data-id="${item.id}"
                        aria-label="Archive subject">
                        <i class="bi bi-archive"></i>
                    </button>
                `
                : `
                    <button type="button"
                        class="sa-subject-action-btn"
                        data-action="edit"
                        data-id="${item.id}"
                        aria-label="Edit archived subject">
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button type="button"
                        class="sa-subject-action-btn"
                        data-action="restore"
                        data-id="${item.id}"
                        aria-label="Restore subject">
                        <i class="bi bi-arrow-counterclockwise"></i>
                    </button>
                `;

            row.innerHTML = `
                <td>
                    <div class="sa-subject-name">
                        <div class="sa-subject-icon">
                            <i class="bi bi-book"></i>
                        </div>
                        <div>
                            <strong>${escapeSchoolAdminHTML(item.name)}</strong>
                            <span>Reusable School Subject</span>
                        </div>
                    </div>
                </td>

                <td>${statusHTML}</td>

                <td class="text-end">
                    <div class="sa-subject-actions">
                        ${actionHTML}
                    </div>
                </td>
            `;

            tableBody.appendChild(row);

        });

        if (emptyState) {
            emptyState.hidden = filtered.length !== 0;
        }

        if (resultCount) {
            resultCount.textContent =
                `${filtered.length} record(s) displayed`;
        }

        updateSummary();

    }

    function openCreateModal() {

        lastModalTrigger = document.activeElement;

        form.reset();

        recordIdInput.value = "";

        modalTitle.textContent = "Add School Subject";

        if (modalMessage) modalMessage.textContent = "";

        modal.show();

    }

    function openEditModal(id) {

        const record = subjects.find(
            item => item.id === id
        );

        if (!record) return;

        lastModalTrigger = document.activeElement;

        recordIdInput.value = record.id;
        nameInput.value = record.name;

        modalTitle.textContent = "Edit School Subject";

        if (modalMessage) modalMessage.textContent = "";

        modal.show();

    }

    function saveSubject(event) {

        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const name = nameInput.value.trim();
        const recordId = Number(recordIdInput.value);

        const duplicate = subjects.some(item => {

            return item.name.toLowerCase() === name.toLowerCase() &&
                item.id !== recordId;

        });

        if (duplicate) {

            if (modalMessage) {
                modalMessage.textContent =
                    "This subject name already exists in the demonstration catalog.";
            }

            return;

        }

        if (recordId) {

            const record = subjects.find(
                item => item.id === recordId
            );

            if (!record) return;

            record.name = name;

            modal.hide();

            showMessage(
                "Demo only: Subject name updated in temporary browser memory. No database record was changed."
            );

        } else {

            const nextId = Math.max(
                0,
                ...subjects.map(item => item.id)
            ) + 1;

            subjects.push({
                id: nextId,
                schoolId: 1,
                name,
                status: "active"
            });

            modal.hide();

            showMessage(
                "Demo only: Subject added to temporary browser memory. No database record was created."
            );

        }

        renderTable();

    }

    function handleTableAction(event) {

        const button = event.target.closest("[data-action]");

        if (!button) return;

        const action = button.dataset.action;
        const id = Number(button.dataset.id);

        const record = subjects.find(
            item => item.id === id
        );

        if (!record) return;

        if (action === "edit") {

            openEditModal(id);
            return;

        }

        if (action === "archive") {

            const confirmed = window.confirm(
                `Archive "${record.name}" in this demonstration? This does not permanently delete the subject.`
            );

            if (!confirmed) return;

            record.status = "archived";

            showMessage(
                "Demo only: Subject archived in temporary browser memory. Historical offerings and academic records are not deleted."
            );

        }

        if (action === "restore") {

            const confirmed = window.confirm(
                `Restore "${record.name}" in this demonstration?`
            );

            if (!confirmed) return;

            record.status = "active";

            showMessage(
                "Demo only: Subject restored in temporary browser memory."
            );

        }

        renderTable();

    }

    if (createButton) {
        createButton.addEventListener("click", openCreateModal);
    }

    if (searchInput) {
        searchInput.addEventListener("input", renderTable);
    }

    if (statusFilter) {
        statusFilter.addEventListener("change", renderTable);
    }

    form.addEventListener("submit", saveSubject);

    tableBody.addEventListener("click", handleTableAction);

    renderTable();

    console.log("School Subject Library initialized.");

}


/* ==========================================
   F9.7 - SUBJECT OFFERING MANAGEMENT
   FRONTEND DEMONSTRATION
   ========================================== */

function initializeSubjectOfferingManagement() {

    const tableBody = document.getElementById("offeringTableBody");
    const form = document.getElementById("offeringForm");
    const modalElement = document.getElementById("offeringModal");

    if (!tableBody || !form || !modalElement) return;

    if (!window.bootstrap) {
        console.error("Bootstrap Modal is unavailable on Subject Offering page.");
        return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    let lastModalTrigger = null;

    configureModalFocusManagement(
        modalElement,
        () => lastModalTrigger
    );

    const searchInput = document.getElementById("offeringSearch");
    const gradeFilter = document.getElementById("offeringGradeFilter");
    const sectionFilter = document.getElementById("offeringSectionFilter");
    const subjectFilter = document.getElementById("offeringSubjectFilter");
    const statusFilter = document.getElementById("offeringStatusFilter");

    const gradeSelect = document.getElementById("offeringGradeLevel");
    const sectionSelect = document.getElementById("offeringSection");
    const subjectSelect = document.getElementById("offeringSubject");

    const message = document.getElementById("offeringMessage");
    const modalMessage = document.getElementById("offeringModalMessage");

    const totalCount = document.getElementById("offeringTotalCount");
    const activeCount = document.getElementById("offeringActiveCount");
    const archivedCount = document.getElementById("offeringArchivedCount");
    const resultCount = document.getElementById("offeringResultCount");
    const emptyState = document.getElementById("offeringEmptyState");

    const createButton = document.getElementById("createOfferingButton");

    /*
     * SAMPLE GRADE-LEVEL SPACES.
     * Replace with API data during Backend integration.
     */

    const gradeSpaces = [
        { id: 1, name: "Grade 7", status: "active" },
        { id: 2, name: "Grade 8", status: "active" },
        { id: 3, name: "Grade 9", status: "active" },
        { id: 4, name: "Grade 10", status: "active" },
        { id: 5, name: "Grade 11", status: "active" }
    ];

    /*
     * SAMPLE SECTIONS.
     * Each Section belongs to one Grade-Level Space.
     */

    const sections = [
        { id: 1, gradeSpaceId: 1, name: "Section A", status: "active" },
        { id: 2, gradeSpaceId: 1, name: "Section B", status: "active" },
        { id: 3, gradeSpaceId: 2, name: "Section A", status: "active" },
        { id: 4, gradeSpaceId: 2, name: "Section B", status: "active" },
        { id: 5, gradeSpaceId: 3, name: "Section A", status: "active" },
        { id: 6, gradeSpaceId: 4, name: "Section A", status: "active" },
        { id: 7, gradeSpaceId: 5, name: "Section A", status: "active" }
    ];

    /*
     * SAMPLE SCHOOL SUBJECT CATALOG.
     * These records are demonstration copies, not shared storage.
     */

    const subjects = [
        { id: 1, name: "Mathematics", status: "active" },
        { id: 2, name: "Science", status: "active" },
        { id: 3, name: "English", status: "active" },
        { id: 4, name: "Filipino", status: "active" },
        { id: 5, name: "Araling Panlipunan", status: "active" },
        { id: 6, name: "Music, Arts, PE and Health", status: "active" },
        { id: 7, name: "Sample Archived Subject", status: "archived" }
    ];

    /*
     * SAMPLE SUBJECT OFFERINGS.
     * One row represents one specific subject in one Section.
     */

    let offerings = [
        { id: 1, sectionId: 1, subjectId: 1, status: "active" },
        { id: 2, sectionId: 1, subjectId: 2, status: "active" },
        { id: 3, sectionId: 1, subjectId: 3, status: "active" },
        { id: 4, sectionId: 2, subjectId: 1, status: "active" },
        { id: 5, sectionId: 2, subjectId: 2, status: "active" },
        { id: 6, sectionId: 3, subjectId: 1, status: "active" },
        { id: 7, sectionId: 3, subjectId: 3, status: "archived" }
    ];

    function getGrade(gradeSpaceId) {

        return gradeSpaces.find(
            item => item.id === gradeSpaceId
        );

    }

    function getSection(sectionId) {

        return sections.find(
            item => item.id === sectionId
        );

    }

    function getSubject(subjectId) {

        return subjects.find(
            item => item.id === subjectId
        );

    }

    function getOfferingDetails(offering) {

        const section = getSection(offering.sectionId);
        const subject = getSubject(offering.subjectId);

        if (!section || !subject) return null;

        const grade = getGrade(section.gradeSpaceId);

        if (!grade) return null;

        return { section, subject, grade };

    }

    function showMessage(text, type = "success") {

        if (!message) return;

        message.className =
            "sa-offering-message " + type + " show";

        message.textContent = text;

    }

    function updateSummary() {

        const active = offerings.filter(
            item => item.status === "active"
        ).length;

        const archived = offerings.filter(
            item => item.status === "archived"
        ).length;

        if (totalCount) totalCount.textContent = offerings.length;
        if (activeCount) activeCount.textContent = active;
        if (archivedCount) archivedCount.textContent = archived;

    }

    function addSelectOption(select, value, label) {

        const option = document.createElement("option");

        option.value = value;
        option.textContent = label;

        select.appendChild(option);

    }

    function populateGradeSelects() {

        gradeSelect.innerHTML = "";
        gradeFilter.innerHTML = "";

        addSelectOption(gradeSelect, "", "Select Grade-Level Space");
        addSelectOption(gradeFilter, "all", "All Grade-Level Spaces");

        gradeSpaces
            .filter(item => item.status === "active")
            .forEach(grade => {

                addSelectOption(
                    gradeSelect,
                    grade.id,
                    grade.name
                );

                addSelectOption(
                    gradeFilter,
                    grade.id,
                    grade.name
                );

            });

    }

    function populateSectionFilter() {

        sectionFilter.innerHTML = "";

        addSelectOption(sectionFilter, "all", "All Sections");

        sections.forEach(section => {

            const grade = getGrade(section.gradeSpaceId);

            if (!grade) return;

            addSelectOption(
                sectionFilter,
                section.id,
                `${grade.name} - ${section.name}`
            );

        });

    }

    function populateSubjectFilters() {

        subjectSelect.innerHTML = "";
        subjectFilter.innerHTML = "";

        addSelectOption(subjectSelect, "", "Select Subject");
        addSelectOption(subjectFilter, "all", "All Subjects");

        subjects
            .filter(item => item.status === "active")
            .forEach(subject => {

                addSelectOption(
                    subjectSelect,
                    subject.id,
                    subject.name
                );

                addSelectOption(
                    subjectFilter,
                    subject.id,
                    subject.name
                );

            });

    }

    function updateSectionOptions() {

        const selectedGradeId = Number(gradeSelect.value);

        sectionSelect.innerHTML = "";

        addSelectOption(sectionSelect, "", "Select Section");

        if (!selectedGradeId) return;

        sections
            .filter(section =>
                section.gradeSpaceId === selectedGradeId &&
                section.status === "active"
            )
            .forEach(section => {

                addSelectOption(
                    sectionSelect,
                    section.id,
                    section.name
                );

            });

    }

    function renderTable() {

        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedGrade = gradeFilter.value;
        const selectedSection = sectionFilter.value;
        const selectedSubject = subjectFilter.value;
        const selectedStatus = statusFilter.value;

        const filtered = offerings.filter(offering => {

            const details = getOfferingDetails(offering);

            if (!details) return false;

            const matchesSearch =
                details.subject.name.toLowerCase().includes(query) ||
                details.section.name.toLowerCase().includes(query) ||
                details.grade.name.toLowerCase().includes(query);

            const matchesGrade =
                selectedGrade === "all" ||
                details.grade.id === Number(selectedGrade);

            const matchesSection =
                selectedSection === "all" ||
                offering.sectionId === Number(selectedSection);

            const matchesSubject =
                selectedSubject === "all" ||
                offering.subjectId === Number(selectedSubject);

            const matchesStatus =
                selectedStatus === "all" ||
                offering.status === selectedStatus;

            return (
                matchesSearch &&
                matchesGrade &&
                matchesSection &&
                matchesSubject &&
                matchesStatus
            );

        });

        tableBody.replaceChildren();

        filtered.forEach(offering => {

            const details = getOfferingDetails(offering);

            const row = document.createElement("tr");

            const isActive = offering.status === "active";

            const statusHTML = isActive
                ? '<span class="status-pill status-success">Active</span>'
                : '<span class="status-pill status-info">Archived</span>';

            const actionHTML = isActive
                ? `
                    <button type="button"
                        class="sa-offering-action-btn danger"
                        data-action="archive"
                        data-id="${offering.id}"
                        aria-label="Archive offering">
                        <i class="bi bi-archive"></i>
                    </button>
                `
                : `
                    <button type="button"
                        class="sa-offering-action-btn"
                        data-action="restore"
                        data-id="${offering.id}"
                        aria-label="Restore offering">
                        <i class="bi bi-arrow-counterclockwise"></i>
                    </button>
                `;

            row.innerHTML = `
                <td>
                    <div class="sa-offering-subject">
                        <div class="sa-offering-icon">
                            <i class="bi bi-journal-bookmark"></i>
                        </div>
                        <div>
                            <strong>${escapeSchoolAdminHTML(details.subject.name)}</strong>
                            <span>Subject Offering #${offering.id}</span>
                        </div>
                    </div>
                </td>

                <td>${escapeSchoolAdminHTML(details.grade.name)}</td>

                <td>${escapeSchoolAdminHTML(details.section.name)}</td>

                <td>${statusHTML}</td>

                <td class="text-end">
                    <div class="sa-offering-actions">
                        ${actionHTML}
                    </div>
                </td>
            `;

            tableBody.appendChild(row);

        });

        if (emptyState) {
            emptyState.hidden = filtered.length !== 0;
        }

        if (resultCount) {
            resultCount.textContent =
                `${filtered.length} record(s) displayed`;
        }

        updateSummary();

    }

    function openCreateModal() {

        lastModalTrigger = document.activeElement;

        form.reset();

        updateSectionOptions();

        if (modalMessage) {
            modalMessage.textContent = "";
        }

        modal.show();

    }

    function createOffering(event) {

        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const gradeSpaceId = Number(gradeSelect.value);
        const sectionId = Number(sectionSelect.value);
        const subjectId = Number(subjectSelect.value);

        const grade = getGrade(gradeSpaceId);
        const section = getSection(sectionId);
        const subject = getSubject(subjectId);

        if (!grade || grade.status !== "active") {

            modalMessage.textContent =
                "Please select a valid active Grade-Level Space.";

            return;

        }

        if (
            !section ||
            section.status !== "active" ||
            section.gradeSpaceId !== gradeSpaceId
        ) {

            modalMessage.textContent =
                "The selected Section does not belong to the selected active Grade-Level Space.";

            return;

        }

        if (!subject || subject.status !== "active") {

            modalMessage.textContent =
                "Please select an active Subject from the School Subject Library.";

            return;

        }

        const duplicate = offerings.some(item =>
            item.sectionId === sectionId &&
            item.subjectId === subjectId
        );

        if (duplicate) {

            modalMessage.textContent =
                "This Subject already has an active Offering in the selected Section.";

            return;

        }

        const nextId = Math.max(
            0,
            ...offerings.map(item => item.id)
        ) + 1;

        offerings.push({
            id: nextId,
            sectionId,
            subjectId,
            status: "active"
        });

        modal.hide();

        showMessage(
            "Demo only: Subject Offering created in temporary browser memory. No database record was created."
        );

        renderTable();

    }

    function handleTableAction(event) {

        const button = event.target.closest("[data-action]");

        if (!button) return;

        const action = button.dataset.action;
        const id = Number(button.dataset.id);

        const offering = offerings.find(
            item => item.id === id
        );

        if (!offering) return;

        const details = getOfferingDetails(offering);

        if (!details) return;

        if (action === "archive") {

            const confirmed = window.confirm(
                `Archive ${details.subject.name} for ${details.grade.name} - ${details.section.name}? Historical records will not be deleted.`
            );

            if (!confirmed) return;

            offering.status = "archived";

            showMessage(
                "Demo only: Subject Offering archived in temporary browser memory. Related academic history has not been deleted."
            );

        }

        if (action === "restore") {

            const grade = getGrade(details.grade.id);
            const section = getSection(details.section.id);
            const subject = getSubject(details.subject.id);

            if (
                !grade ||
                grade.status !== "active" ||
                !section ||
                section.status !== "active" ||
                !subject ||
                subject.status !== "active"
            ) {

                showMessage(
                    "This Offering cannot be restored because its Grade-Level Space, Section or Subject is not active.",
                    "error"
                );

                return;

            }

            const duplicate = offerings.some(item =>
                item.id !== offering.id &&
                item.sectionId === offering.sectionId &&
                item.subjectId === offering.subjectId &&
                item.status === "active"
            );

            if (duplicate) {

                showMessage(
                    "Another active Offering already exists for this Subject and Section.",
                    "error"
                );

                return;

            }

            const confirmed = window.confirm(
                `Restore ${details.subject.name} for ${details.grade.name} - ${details.section.name}?`
            );

            if (!confirmed) return;

            offering.status = "active";

            showMessage(
                "Demo only: Subject Offering restored in temporary browser memory."
            );

        }

        renderTable();

    }

    if (createButton) {
        createButton.addEventListener("click", openCreateModal);
    }

    gradeSelect.addEventListener("change", updateSectionOptions);

    if (searchInput) {
        searchInput.addEventListener("input", renderTable);
    }

    [gradeFilter, sectionFilter, subjectFilter, statusFilter].forEach(filter => {
        filter.addEventListener("change", renderTable);
    });

    form.addEventListener("submit", createOffering);

    tableBody.addEventListener("click", handleTableAction);

    populateGradeSelects();
    populateSectionFilter();
    populateSubjectFilters();
    updateSectionOptions();
    renderTable();

    console.log("Subject Offering Management initialized.");

}


/* ==========================================
   F9.8 - COPY SUBJECTS
   FRONTEND DEMONSTRATION
   ========================================== */

function initializeCopySubjects() {

    const form = document.getElementById("copySubjectsForm");

    if (!form) return;

    const panels = Array.from(
        form.querySelectorAll(".sa-copy-panel")
    );

    const steps = Array.from(
        form.querySelectorAll(".sa-copy-step")
    );

    const sourceSelect = document.getElementById("copySourceSection");
    const destinationSelect = document.getElementById("copyDestinationSection");

    const subjectList = document.getElementById("copySubjectList");
    const teacherList = document.getElementById("copyTeacherList");

    const previousButton = document.getElementById("copyPrevious");
    const nextButton = document.getElementById("copyNext");
    const finishButton = document.getElementById("copyFinish");

    const progressFill = document.getElementById("copyProgressFill");
    const stepLabel = document.getElementById("copyStepLabel");

    const message = document.getElementById("copySubjectsMessage");

    const sourceSummary = document.getElementById("copySummarySource");
    const destinationSummary = document.getElementById("copySummaryDestination");
    const subjectSummary = document.getElementById("copySummarySubjects");
    const teacherSummary = document.getElementById("copySummaryTeachers");
    const resultSummary = document.getElementById("copySummaryResult");

    const selectAllButton = document.getElementById("copySelectAll");
    const clearAllButton = document.getElementById("copyClearAll");

    if (
        !panels.length ||
        !sourceSelect ||
        !destinationSelect ||
        !subjectList ||
        !teacherList ||
        !previousButton ||
        !nextButton ||
        !finishButton
    ) {
        console.error("Copy Subjects is missing required HTML elements.");
        return;
    }

    /*
     * SAMPLE DATA ONLY.
     * The real Backend will provide these records.
     */

    const sections = [
        { id: 1, grade: "Grade 7", name: "Section A", status: "active" },
        { id: 2, grade: "Grade 7", name: "Section B", status: "active" },
        { id: 3, grade: "Grade 8", name: "Section A", status: "active" },
        { id: 4, grade: "Grade 8", name: "Section B", status: "active" },
        { id: 5, grade: "Grade 9", name: "Section A", status: "active" },
        { id: 6, grade: "Grade 10", name: "Section A", status: "active" },
        { id: 7, grade: "Grade 11", name: "Section A", status: "active" }
    ];

    const subjects = [
        { id: 1, name: "Mathematics" },
        { id: 2, name: "Science" },
        { id: 3, name: "English" },
        { id: 4, name: "Filipino" },
        { id: 5, name: "Araling Panlipunan" },
        { id: 6, name: "Music, Arts, PE and Health" }
    ];

    /*
     * Source Subject Offerings and sample Teacher assignment suggestions.
     * Suggestions are not active destination assignments.
     */

    let offerings = [
        { id: 1, sectionId: 1, subjectId: 1, teacher: "Maria Santos", status: "active" },
        { id: 2, sectionId: 1, subjectId: 2, teacher: "Juan Reyes", status: "active" },
        { id: 3, sectionId: 1, subjectId: 3, teacher: "Ana Cruz", status: "active" },
        { id: 4, sectionId: 1, subjectId: 4, teacher: "", status: "active" },
        { id: 5, sectionId: 1, subjectId: 5, teacher: "Pedro Garcia", status: "active" },
        { id: 6, sectionId: 1, subjectId: 6, teacher: "", status: "active" },

        { id: 7, sectionId: 2, subjectId: 1, teacher: "Maria Santos", status: "active" },
        { id: 8, sectionId: 2, subjectId: 2, teacher: "Juan Reyes", status: "active" },

        { id: 9, sectionId: 3, subjectId: 1, teacher: "Maria Santos", status: "active" },
        { id: 10, sectionId: 3, subjectId: 2, teacher: "Juan Reyes", status: "active" }
    ];

    let currentStep = 0;
    let selectedSubjectIds = [];
    let teacherSuggestions = {};
    let completedCopy = false;

    function getSection(id) {

        return sections.find(item => item.id === Number(id));

    }

    function getSubject(id) {

        return subjects.find(item => item.id === Number(id));

    }

    function getOfferingDetails(offering) {

        const section = getSection(offering.sectionId);
        const subject = getSubject(offering.subjectId);

        if (!section || !subject) return null;

        return { section, subject };

    }

    function showMessage(text, type = "error") {

        if (!message) return;

        message.className =
            "sa-copy-message " + type + " show";

        message.textContent = text;

    }

    function clearMessage() {

        if (!message) return;

        message.className = "sa-copy-message";
        message.textContent = "";

    }

    function populateSectionSelects() {

        [sourceSelect, destinationSelect].forEach(select => {

            select.innerHTML = "";

            const placeholder = document.createElement("option");

            placeholder.value = "";
            placeholder.textContent = "Select Section";

            select.appendChild(placeholder);

            sections
                .filter(section => section.status === "active")
                .forEach(section => {

                    const option = document.createElement("option");

                    option.value = section.id;
                    option.textContent =
                        `${section.grade} - ${section.name}`;

                    select.appendChild(option);

                });

        });

    }

    function getSourceOfferings() {

        const sourceId = Number(sourceSelect.value);

        return offerings.filter(item =>
            item.sectionId === sourceId &&
            item.status === "active"
        );

    }

    
function getDestinationDuplicates() {

    const destinationId = Number(destinationSelect.value);

    return offerings.filter(item =>
        item.sectionId === destinationId
    );

}


    function renderSubjectSelection() {

        const sourceId = Number(sourceSelect.value);
        const destinationId = Number(destinationSelect.value);

        const sourceItems = getSourceOfferings();
        const destinationItems = getDestinationDuplicates();

        subjectList.replaceChildren();

        selectedSubjectIds = [];
        teacherSuggestions = {};

        if (!sourceItems.length) {

            const empty = document.createElement("p");

            empty.className = "text-secondary small";
            empty.textContent =
                "The selected source Section has no active Subject Offerings to copy.";

            subjectList.appendChild(empty);

            return;

        }

        sourceItems.forEach(offering => {

            const details = getOfferingDetails(offering);

            if (!details) return;

            const duplicate = destinationItems.some(item =>
                item.subjectId === offering.subjectId
            );

            const label = document.createElement("label");

            label.className = "sa-copy-selection";

            if (duplicate) {
                label.classList.add("is-disabled");
            }

            const checkbox = document.createElement("input");

            checkbox.type = "checkbox";
            checkbox.value = offering.subjectId;
            checkbox.disabled = duplicate;
            checkbox.checked = !duplicate;

            const text = document.createElement("div");

            const strong = document.createElement("strong");

            strong.textContent = details.subject.name;

            const description = document.createElement("span");

            if (duplicate) {

                    const existing = destinationItems.find(
                        item => item.subjectId === offering.subjectId
                    );

                    description.textContent =
                        existing.status === "archived"
                            ? "An archived Offering already exists in the destination Section. Review or restore it instead."
                            : "An active Offering already exists in the destination Section. It will be skipped.";

                }else {

                description.textContent =
                    offering.teacher
                        ? `Source Teacher suggestion: ${offering.teacher}`
                        : "No source Teacher assignment suggestion available.";

                selectedSubjectIds.push(offering.subjectId);

                teacherSuggestions[offering.subjectId] = {
                    teacher: offering.teacher,
                    include: Boolean(offering.teacher)
                };

            }

            text.appendChild(strong);
            text.appendChild(description);

            label.appendChild(checkbox);
            label.appendChild(text);

            subjectList.appendChild(label);

            checkbox.addEventListener("change", () => {

                const id = Number(checkbox.value);

                if (checkbox.checked) {

                    if (!selectedSubjectIds.includes(id)) {
                        selectedSubjectIds.push(id);
                    }

                } else {

                    selectedSubjectIds =
                        selectedSubjectIds.filter(item => item !== id);

                }

                renderTeacherReview();

            });

        });

        renderTeacherReview();

    }

    function renderTeacherReview() {

        teacherList.replaceChildren();

        const selectedOfferings = getSourceOfferings().filter(item =>
            selectedSubjectIds.includes(item.subjectId)
        );

        if (!selectedOfferings.length) {

            const empty = document.createElement("p");

            empty.className = "text-secondary small";
            empty.textContent =
                "Select at least one subject to review available Teacher suggestions.";

            teacherList.appendChild(empty);

            return;

        }

        selectedOfferings.forEach(offering => {

            const details = getOfferingDetails(offering);

            if (!details) return;

            const suggestion = teacherSuggestions[offering.subjectId];

            const row = document.createElement("div");

            row.className = "sa-copy-teacher-row";

            const info = document.createElement("div");

            info.className = "sa-copy-teacher-info";

            const title = document.createElement("strong");

            title.textContent = details.subject.name;

            const teacher = document.createElement("span");

            teacher.textContent = suggestion.teacher
                ? `Suggested Teacher: ${suggestion.teacher}`
                : "No Teacher assignment suggestion is available.";

            info.appendChild(title);
            info.appendChild(teacher);

            const control = document.createElement("label");

            control.className = "form-check small";

            const checkbox = document.createElement("input");

            checkbox.type = "checkbox";
            checkbox.className = "form-check-input";
            checkbox.checked = suggestion.include;
            checkbox.disabled = !suggestion.teacher;

            checkbox.addEventListener("change", () => {
                suggestion.include = checkbox.checked;
            });

            const checkboxText = document.createElement("span");

            checkboxText.className = "form-check-label";
            checkboxText.textContent =
                "Keep as assignment suggestion for review";

            control.appendChild(checkbox);
            control.appendChild(checkboxText);

            row.appendChild(info);
            row.appendChild(control);

            teacherList.appendChild(row);

        });

    }

    function validateStep() {

        if (currentStep === 0) {

            if (!getSection(sourceSelect.value)) {

                showMessage("Please select a valid source Section.");
                return false;

            }

        }

        if (currentStep === 1) {

            const sourceId = Number(sourceSelect.value);
            const destinationId = Number(destinationSelect.value);

            if (!getSection(destinationId)) {

                showMessage("Please select a valid destination Section.");
                return false;

            }

            if (sourceId === destinationId) {

                showMessage(
                    "The source and destination Sections must be different."
                );

                return false;

            }

            renderSubjectSelection();

            if (!getSourceOfferings().length) {

                showMessage(
                    "The selected source Section has no active Subject Offerings to copy."
                );

                return false;

            }

        }

        if (currentStep === 2) {

            if (!selectedSubjectIds.length) {

                showMessage(
                    "Please select at least one Subject Offering to copy."
                );

                return false;

            }

        }

        return true;

    }

    function updateSummary() {

        const source = getSection(sourceSelect.value);
        const destination = getSection(destinationSelect.value);

        if (sourceSummary && source) {

            sourceSummary.textContent =
                `${source.grade} - ${source.name}`;

        }

        if (destinationSummary && destination) {

            destinationSummary.textContent =
                `${destination.grade} - ${destination.name}`;

        }

        if (subjectSummary) {

            subjectSummary.textContent =
                selectedSubjectIds
                    .map(id => getSubject(id)?.name)
                    .filter(Boolean)
                    .join("\n") || "None selected";

        }

        if (teacherSummary) {

            const suggestions = selectedSubjectIds
                .map(id => {

                    const subject = getSubject(id);
                    const suggestion = teacherSuggestions[id];

                    if (!subject || !suggestion || !suggestion.teacher) {
                        return null;
                    }

                    if (!suggestion.include) return null;

                    return `${subject.name}: ${suggestion.teacher}`;

                })
                .filter(Boolean);

            teacherSummary.textContent =
                suggestions.join("\n") ||
                "No Teacher suggestions selected.";

        }

        if (resultSummary) {

            const destinationItems = getDestinationDuplicates();

            const skipped = selectedSubjectIds.filter(id =>
                destinationItems.some(item => item.subjectId === id)
            );

            resultSummary.textContent =
                `${selectedSubjectIds.length - skipped.length} proposed new Offering(s)\n` +
                `${skipped.length} duplicate(s) skipped`;

        }

    }

    function showStep(index) {

        currentStep = Math.max(
            0,
            Math.min(index, panels.length - 1)
        );

        panels.forEach((panel, i) => {
            panel.classList.toggle("active", i === currentStep);
        });

        steps.forEach((step, i) => {

            step.classList.toggle("active", i === currentStep);
            step.classList.toggle("completed", i < currentStep);

        });

        if (progressFill) {

            progressFill.style.width =
                ((currentStep + 1) / panels.length * 100) + "%";

        }

        if (stepLabel) {

            stepLabel.textContent =
                `Step ${currentStep + 1} of ${panels.length}`;

        }

        previousButton.hidden = currentStep === 0;
        nextButton.hidden = currentStep === panels.length - 1;
        finishButton.hidden = currentStep !== panels.length - 1;

        if (currentStep === 3) {
            renderTeacherReview();
        }

        if (currentStep === 4) {
            updateSummary();
        }

        
        const heading = panels[currentStep].querySelector("h2");

        if (heading) {
            heading.setAttribute("tabindex", "-1");

            // Prevent automatic page scrolling during initialization.
            heading.focus({ preventScroll: true });
        }


        clearMessage();

    }

    function completeCopy() {

        if (completedCopy) return;

        const sourceId = Number(sourceSelect.value);
        const destinationId = Number(destinationSelect.value);

        const sourceItems = offerings.filter(item =>
            item.sectionId === sourceId &&
            item.status === "active" &&
            selectedSubjectIds.includes(item.subjectId)
        );

        let copiedCount = 0;
        let skippedCount = 0;

        sourceItems.forEach(sourceOffering => {

            const duplicate = offerings.some(item =>
                item.sectionId === destinationId &&
                item.subjectId === sourceOffering.subjectId
            );

            if (duplicate) {

                skippedCount++;
                return;

            }

            const nextId = Math.max(
                0,
                ...offerings.map(item => item.id)
            ) + 1;

            const suggestion =
                teacherSuggestions[sourceOffering.subjectId];

            offerings.push({

                id: nextId,
                sectionId: destinationId,
                subjectId: sourceOffering.subjectId,
                status: "active",

                /*
                 * This is a review suggestion only.
                 * It is NOT an active Teacher assignment.
                 */

                teacherSuggestion:
                    suggestion && suggestion.include
                        ? suggestion.teacher
                        : ""

            });

            copiedCount++;

        });

        completedCopy = true;

        finishButton.disabled = true;
        finishButton.textContent = "Demo Copy Completed";

        const result = document.getElementById("copyCompletionResult");

        if (result) {

            result.hidden = false;

            result.innerHTML = `
                <i class="bi bi-check-circle-fill"></i>
                <strong>Demo Copy Completed</strong>
                <span>
                    ${copiedCount} new Subject Offering(s) added to temporary browser memory.
                    ${skippedCount} duplicate(s) skipped.
                    Teacher information was retained only as a review suggestion,
                    not as an active assignment.
                </span>
            `;

        }

        showMessage(
            "Demo only: Copy operation completed in temporary browser memory. No official database records or Teacher assignments were created.",
            "success"
        );

        updateSummary();

    }

    if (selectAllButton) {

        selectAllButton.addEventListener("click", () => {

            subjectList.querySelectorAll(
                'input[type="checkbox"]:not(:disabled)'
            ).forEach(checkbox => {

                checkbox.checked = true;

                const id = Number(checkbox.value);

                if (!selectedSubjectIds.includes(id)) {
                    selectedSubjectIds.push(id);
                }

            });

            renderTeacherReview();

        });

    }

    if (clearAllButton) {

        clearAllButton.addEventListener("click", () => {

            subjectList.querySelectorAll(
                'input[type="checkbox"]:not(:disabled)'
            ).forEach(checkbox => {
                checkbox.checked = false;
            });

            selectedSubjectIds = [];

            renderTeacherReview();

        });

    }

    sourceSelect.addEventListener("change", () => {

        destinationSelect.value = "";

        subjectList.replaceChildren();
        teacherList.replaceChildren();

        selectedSubjectIds = [];
        teacherSuggestions = {};

        clearMessage();

    });

    destinationSelect.addEventListener("change", () => {

        subjectList.replaceChildren();
        teacherList.replaceChildren();

        selectedSubjectIds = [];
        teacherSuggestions = {};

        clearMessage();

    });

    nextButton.addEventListener("click", () => {

        if (!validateStep()) return;

        showStep(currentStep + 1);

    });

    previousButton.addEventListener("click", () => {

        showStep(currentStep - 1);

    });

    finishButton.addEventListener("click", () => {

        if (currentStep !== panels.length - 1) return;

        completeCopy();

    });

    populateSectionSelects();

    showStep(0);

    console.log("Copy Subjects initialized.");

}


/* ==========================================
   F9.9 - TEACHER DIRECTORY AND ASSIGNMENT
   FRONTEND DEMONSTRATION
   ========================================== */

function initializeTeacherDirectory() {

    const teacherBody = document.getElementById("teacherTableBody");
    const assignmentBody = document.getElementById("teacherAssignmentTableBody");
    const modalElement = document.getElementById("teacherAssignmentModal");
    const form = document.getElementById("teacherAssignmentForm");

    if (!teacherBody || !assignmentBody || !modalElement || !form) return;

    if (!window.bootstrap) {
        console.error("Bootstrap Modal is unavailable on Teacher Directory page.");
        return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    let lastModalTrigger = null;

    configureModalFocusManagement(
        modalElement,
        () => lastModalTrigger
    );

    const teacherSearch = document.getElementById("teacherSearch");
    const teacherStatusFilter = document.getElementById("teacherStatusFilter");

    const assignmentSearch = document.getElementById("assignmentSearch");
    const assignmentStatusFilter = document.getElementById("assignmentStatusFilter");

    const teacherSelect = document.getElementById("assignmentTeacher");
    const offeringSelect = document.getElementById("assignmentOffering");

    const message = document.getElementById("teacherDirectoryMessage");
    const modalMessage = document.getElementById("teacherAssignmentModalMessage");

    const createButton = document.getElementById("createTeacherAssignmentButton");

    const totalTeachers = document.getElementById("teacherTotalCount");
    const activeTeachers = document.getElementById("teacherActiveCount");
    const inactiveTeachers = document.getElementById("teacherInactiveCount");
    const assignedOfferings = document.getElementById("teacherAssignedOfferingCount");

    const teacherResultCount = document.getElementById("teacherResultCount");
    const assignmentResultCount = document.getElementById("assignmentResultCount");

    const teacherEmptyState = document.getElementById("teacherEmptyState");
    const assignmentEmptyState = document.getElementById("assignmentEmptyState");

    /*
     * SAMPLE TEACHER MEMBERSHIPS.
     * Actual eligible Teachers must come from the Backend.
     */

    const teachers = [
        {
            id: 101,
            name: "Maria Santos",
            email: "maria.santos@example.edu.ph",
            membershipStatus: "active",
            roleStatus: "active"
        },
        {
            id: 102,
            name: "Juan Reyes",
            email: "juan.reyes@example.edu.ph",
            membershipStatus: "active",
            roleStatus: "active"
        },
        {
            id: 103,
            name: "Ana Cruz",
            email: "ana.cruz@example.edu.ph",
            membershipStatus: "active",
            roleStatus: "active"
        },
        {
            id: 104,
            name: "Pedro Garcia",
            email: "pedro.garcia@example.edu.ph",
            membershipStatus: "active",
            roleStatus: "active"
        },
        {
            id: 105,
            name: "Elena Ramos",
            email: "elena.ramos@example.edu.ph",
            membershipStatus: "inactive",
            roleStatus: "inactive"
        }
    ];

    /*
     * SAMPLE SUBJECT OFFERINGS.
     * Each assignment references an exact Offering.
     */

    const offerings = [
        { id: 1, grade: "Grade 7", section: "Section A", subject: "Mathematics" },
        { id: 2, grade: "Grade 7", section: "Section A", subject: "Science" },
        { id: 3, grade: "Grade 7", section: "Section A", subject: "English" },
        { id: 4, grade: "Grade 7", section: "Section B", subject: "Mathematics" },
        { id: 5, grade: "Grade 7", section: "Section B", subject: "Science" },
        { id: 6, grade: "Grade 8", section: "Section A", subject: "Mathematics" },
        { id: 7, grade: "Grade 8", section: "Section A", subject: "English" },
        { id: 8, grade: "Grade 9", section: "Section A", subject: "Science" }
    ];

    /*
     * SAMPLE ASSIGNMENT HISTORY.
     * Historical records remain visible.
     */

    let assignments = [
        { id: 1, offeringId: 1, teacherId: 101, status: "active", startDate: "2026-06-01", endDate: "" },
        { id: 2, offeringId: 2, teacherId: 102, status: "active", startDate: "2026-06-01", endDate: "" },
        { id: 3, offeringId: 3, teacherId: 103, status: "active", startDate: "2026-06-01", endDate: "" },
        { id: 4, offeringId: 4, teacherId: 101, status: "active", startDate: "2026-06-01", endDate: "" },
        { id: 5, offeringId: 6, teacherId: 104, status: "ended", startDate: "2025-06-01", endDate: "2026-03-31" }
    ];

    function getTeacher(id) {
        return teachers.find(item => item.id === Number(id));
    }

    function getOffering(id) {
        return offerings.find(item => item.id === Number(id));
    }

    function getActiveAssignment(offeringId) {

        return assignments.find(item =>
            item.offeringId === Number(offeringId) &&
            item.status === "active"
        );

    }

    function showMessage(text, type = "success") {

        if (!message) return;

        message.className =
            "sa-teacher-message " + type + " show";

        message.textContent = text;

    }

    function initials(name) {

        return name.split(" ")
            .map(part => part.charAt(0))
            .slice(0, 2)
            .join("")
            .toUpperCase();

    }

    function updateSummary() {

        const active = teachers.filter(item =>
            item.membershipStatus === "active" &&
            item.roleStatus === "active"
        ).length;

        const inactive = teachers.length - active;

        const assigned = offerings.filter(item =>
            Boolean(getActiveAssignment(item.id))
        ).length;

        if (totalTeachers) totalTeachers.textContent = teachers.length;
        if (activeTeachers) activeTeachers.textContent = active;
        if (inactiveTeachers) inactiveTeachers.textContent = inactive;
        if (assignedOfferings) assignedOfferings.textContent = assigned;

    }

    function renderTeachers() {

        const query = teacherSearch
            ? teacherSearch.value.trim().toLowerCase()
            : "";

        const selectedStatus = teacherStatusFilter
            ? teacherStatusFilter.value
            : "all";

        const filtered = teachers.filter(teacher => {

            const matchesSearch =
                teacher.name.toLowerCase().includes(query) ||
                teacher.email.toLowerCase().includes(query);

            const isActive =
                teacher.membershipStatus === "active" &&
                teacher.roleStatus === "active";

            const matchesStatus =
                selectedStatus === "all" ||
                (selectedStatus === "active" && isActive) ||
                (selectedStatus === "inactive" && !isActive);

            return matchesSearch && matchesStatus;

        });

        teacherBody.replaceChildren();

        filtered.forEach(teacher => {

            const row = document.createElement("tr");

            const isActive =
                teacher.membershipStatus === "active" &&
                teacher.roleStatus === "active";

            row.innerHTML = `
                <td>
                    <div class="sa-teacher-profile">
                        <div class="sa-teacher-avatar">
                            ${escapeSchoolAdminHTML(initials(teacher.name))}
                        </div>
                        <div>
                            <strong>${escapeSchoolAdminHTML(teacher.name)}</strong>
                            <span>${escapeSchoolAdminHTML(teacher.email)}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="status-pill ${isActive ? "status-success" : "status-info"}">
                        ${isActive ? "Active" : "Inactive"}
                    </span>
                </td>
                <td>
                    <span class="status-pill ${teacher.roleStatus === "active" ? "status-success" : "status-info"}">
                        ${teacher.roleStatus === "active" ? "Active" : "Inactive"}
                    </span>
                </td>
            `;

            teacherBody.appendChild(row);

        });

        if (teacherEmptyState) {
            teacherEmptyState.hidden = filtered.length !== 0;
        }

        if (teacherResultCount) {
            teacherResultCount.textContent =
                `${filtered.length} Teacher(s) displayed`;
        }

        updateSummary();

    }

    function renderAssignments() {

        const query = assignmentSearch
            ? assignmentSearch.value.trim().toLowerCase()
            : "";

        const selectedStatus = assignmentStatusFilter
            ? assignmentStatusFilter.value
            : "all";

        const filtered = assignments.filter(assignment => {

            const teacher = getTeacher(assignment.teacherId);
            const offering = getOffering(assignment.offeringId);

            if (!teacher || !offering) return false;

            const matchesSearch =
                teacher.name.toLowerCase().includes(query) ||
                offering.subject.toLowerCase().includes(query) ||
                offering.grade.toLowerCase().includes(query) ||
                offering.section.toLowerCase().includes(query);

            const matchesStatus =
                selectedStatus === "all" ||
                assignment.status === selectedStatus;

            return matchesSearch && matchesStatus;

        });

        assignmentBody.replaceChildren();

        filtered.forEach(assignment => {

            const teacher = getTeacher(assignment.teacherId);
            const offering = getOffering(assignment.offeringId);

            const row = document.createElement("tr");

            const statusHTML = assignment.status === "active"
                ? '<span class="status-pill status-success">Active</span>'
                : '<span class="status-pill status-info">Ended</span>';

            row.innerHTML = `
                <td>
                    <strong>${escapeSchoolAdminHTML(teacher.name)}</strong>
                </td>
                <td>${escapeSchoolAdminHTML(offering.subject)}</td>
                <td>${escapeSchoolAdminHTML(offering.grade)} - ${escapeSchoolAdminHTML(offering.section)}</td>
                <td>${escapeSchoolAdminHTML(assignment.startDate)}</td>
                <td>${escapeSchoolAdminHTML(assignment.endDate || "—")}</td>
                <td>${statusHTML}</td>
            `;

            assignmentBody.appendChild(row);

        });

        if (assignmentEmptyState) {
            assignmentEmptyState.hidden = filtered.length !== 0;
        }

        if (assignmentResultCount) {
            assignmentResultCount.textContent =
                `${filtered.length} assignment record(s) displayed`;
        }

        updateSummary();

    }

    function populateTeacherOptions() {

        teacherSelect.innerHTML =
            '<option value="">Select eligible Teacher</option>';

        teachers
            .filter(teacher =>
                teacher.membershipStatus === "active" &&
                teacher.roleStatus === "active"
            )
            .forEach(teacher => {

                const option = document.createElement("option");

                option.value = teacher.id;
                option.textContent = teacher.name;

                teacherSelect.appendChild(option);

            });

    }

    function populateOfferingOptions() {

        offeringSelect.innerHTML =
            '<option value="">Select unassigned Offering</option>';

        offerings.forEach(offering => {

            const activeAssignment = getActiveAssignment(offering.id);

            if (activeAssignment) return;

            const option = document.createElement("option");

            option.value = offering.id;

            option.textContent =
                `${offering.grade} - ${offering.section} - ${offering.subject}`;

            offeringSelect.appendChild(option);

        });

    }

    function openAssignmentModal() {

        lastModalTrigger = document.activeElement;

        form.reset();

        if (modalMessage) modalMessage.textContent = "";

        populateTeacherOptions();
        populateOfferingOptions();

        modal.show();

    }

    function createAssignment(event) {

        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const teacherId = Number(teacherSelect.value);
        const offeringId = Number(offeringSelect.value);

        const teacher = getTeacher(teacherId);
        const offering = getOffering(offeringId);

        if (!teacher || !offering) {

            modalMessage.textContent =
                "Please select a valid Teacher and Subject Offering.";

            return;

        }

        if (
            teacher.membershipStatus !== "active" ||
            teacher.roleStatus !== "active"
        ) {

            modalMessage.textContent =
                "Only Teachers with active School membership and active Teacher role may be assigned.";

            return;

        }

        if (getActiveAssignment(offeringId)) {

            modalMessage.textContent =
                "This Subject Offering already has an active Teacher assignment.";

            return;

        }

        const nextId = Math.max(
            0,
            ...assignments.map(item => item.id)
        ) + 1;

        const today = new Date().toISOString().slice(0, 10);

        assignments.push({
            id: nextId,
            offeringId,
            teacherId,
            status: "active",
            startDate: today,
            endDate: ""
        });

        modal.hide();

        showMessage(
            "Demo only: Teacher assignment added to temporary browser memory. No invitation was sent and no database record was created."
        );

        renderAssignments();

        populateOfferingOptions();

    }

    if (createButton) {
        createButton.addEventListener("click", openAssignmentModal);
    }

    if (teacherSearch) {
        teacherSearch.addEventListener("input", renderTeachers);
    }

    if (teacherStatusFilter) {
        teacherStatusFilter.addEventListener("change", renderTeachers);
    }

    if (assignmentSearch) {
        assignmentSearch.addEventListener("input", renderAssignments);
    }

    if (assignmentStatusFilter) {
        assignmentStatusFilter.addEventListener("change", renderAssignments);
    }

    form.addEventListener("submit", createAssignment);

    renderTeachers();
    renderAssignments();

    console.log("Teacher Directory and Assignment initialized.");

}


/* ==========================================
   F9.10 - TEACHER INVITATION MANAGEMENT
   FRONTEND DEMONSTRATION
   ========================================== */

function initializeTeacherInvitationManagement() {

    const tableBody = document.getElementById("invitationTableBody");
    const form = document.getElementById("teacherInvitationForm");
    const modalElement = document.getElementById("teacherInvitationModal");

    if (!tableBody || !form || !modalElement) return;

    if (!window.bootstrap) {
        console.error("Bootstrap Modal is unavailable on Teacher Invitation page.");
        return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    let lastModalTrigger = null;

    configureModalFocusManagement(
        modalElement,
        () => lastModalTrigger
    );

    const searchInput = document.getElementById("invitationSearch");
    const statusFilter = document.getElementById("invitationStatusFilter");

    const emailInput = document.getElementById("invitedTeacherEmail");
    const offeringSelect = document.getElementById("invitationOffering");

    const modalMessage = document.getElementById("invitationModalMessage");
    const pageMessage = document.getElementById("invitationMessage");

    const createButton = document.getElementById("createTeacherInvitationButton");

    const totalCount = document.getElementById("invitationTotalCount");
    const pendingCount = document.getElementById("invitationPendingCount");
    const acceptedCount = document.getElementById("invitationAcceptedCount");
    const otherCount = document.getElementById("invitationOtherCount");

    const resultCount = document.getElementById("invitationResultCount");
    const emptyState = document.getElementById("invitationEmptyState");

    /*
     * PROPOSED FRONTEND DISPLAY VOCABULARY:
     * pending, accepted, declined, expired, revoked.
     *
     * Final status vocabulary and transitions must be
     * validated against the approved Backend specification.
     */

    const offerings = [
        { id: 1, grade: "Grade 7", section: "Section A", subject: "Mathematics", status: "active" },
        { id: 2, grade: "Grade 7", section: "Section A", subject: "Science", status: "active" },
        { id: 3, grade: "Grade 7", section: "Section A", subject: "English", status: "active" },
        { id: 4, grade: "Grade 7", section: "Section B", subject: "Mathematics", status: "active" },
        { id: 5, grade: "Grade 7", section: "Section B", subject: "Science", status: "active" },
        { id: 6, grade: "Grade 8", section: "Section A", subject: "Mathematics", status: "active" },
        { id: 7, grade: "Grade 8", section: "Section A", subject: "English", status: "active" },
        { id: 8, grade: "Grade 9", section: "Section A", subject: "Science", status: "active" }
    ];

    /*
     * SAMPLE INVITATION RECORDS.
     * These are not real emails or tokens.
     */

    let invitations = [
        {
            id: 1,
            offeringId: 1,
            email: "teacher.one@example.edu.ph",
            status: "pending",
            createdAt: "2026-11-15",
            expiresAt: "2026-11-25"
        },
        {
            id: 2,
            offeringId: 2,
            email: "teacher.two@example.edu.ph",
            status: "accepted",
            createdAt: "2026-11-12",
            expiresAt: "2026-11-22"
        },
        {
            id: 3,
            offeringId: 3,
            email: "teacher.three@example.edu.ph",
            status: "declined",
            createdAt: "2026-11-10",
            expiresAt: "2026-11-20"
        },
        {
            id: 4,
            offeringId: 4,
            email: "teacher.four@example.edu.ph",
            status: "expired",
            createdAt: "2026-10-01",
            expiresAt: "2026-10-08"
        },
        {
            id: 5,
            offeringId: 5,
            email: "teacher.five@example.edu.ph",
            status: "revoked",
            createdAt: "2026-11-05",
            expiresAt: "2026-11-15"
        }
    ];

    function getOffering(id) {

        return offerings.find(
            item => item.id === Number(id)
        );

    }

    function getInvitationDetails(invitation) {

        const offering = getOffering(invitation.offeringId);

        if (!offering) return null;

        return { offering };

    }

    function showMessage(text, type = "success") {

        if (!pageMessage) return;

        pageMessage.className =
            "sa-invitation-message " + type + " show";

        pageMessage.textContent = text;

    }

    function updateSummary() {

        const pending = invitations.filter(
            item => item.status === "pending"
        ).length;

        const accepted = invitations.filter(
            item => item.status === "accepted"
        ).length;

        const other = invitations.length - pending - accepted;

        if (totalCount) totalCount.textContent = invitations.length;
        if (pendingCount) pendingCount.textContent = pending;
        if (acceptedCount) acceptedCount.textContent = accepted;
        if (otherCount) otherCount.textContent = other;

    }

    function statusLabel(status) {

        const labels = {
            pending: "Pending",
            accepted: "Accepted",
            declined: "Declined",
            expired: "Expired",
            revoked: "Revoked"
        };

        return labels[status] || status;

    }

    function statusClass(status) {

        const classes = {
            pending: "status-warning",
            accepted: "status-success",
            declined: "status-info",
            expired: "status-info",
            revoked: "status-info"
        };

        return classes[status] || "status-info";

    }

    function populateOfferingOptions() {

        offeringSelect.innerHTML =
            '<option value="">Select Subject Offering</option>';

        offerings
            .filter(offering => offering.status === "active")
            .forEach(offering => {

                const option = document.createElement("option");

                option.value = offering.id;

                option.textContent =
                    `${offering.grade} - ${offering.section} - ${offering.subject}`;

                offeringSelect.appendChild(option);

            });

    }

    function renderTable() {

        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedStatus = statusFilter
            ? statusFilter.value
            : "all";

        const filtered = invitations.filter(invitation => {

            const details = getInvitationDetails(invitation);

            if (!details) return false;

            const offering = details.offering;

            const matchesSearch =
                invitation.email.toLowerCase().includes(query) ||
                offering.subject.toLowerCase().includes(query) ||
                offering.grade.toLowerCase().includes(query) ||
                offering.section.toLowerCase().includes(query);

            const matchesStatus =
                selectedStatus === "all" ||
                invitation.status === selectedStatus;

            return matchesSearch && matchesStatus;

        });

        tableBody.replaceChildren();

        filtered.forEach(invitation => {

            const details = getInvitationDetails(invitation);

            const offering = details.offering;

            const row = document.createElement("tr");

            const canRevoke = invitation.status === "pending";

            const actionHTML = canRevoke
                ? `
                    <button type="button"
                        class="sa-invitation-action-btn danger"
                        data-action="revoke"
                        data-id="${invitation.id}"
                        aria-label="Revoke invitation">
                        <i class="bi bi-x-circle me-1"></i>
                        Revoke
                    </button>
                `
                : '<span class="text-secondary small">No available action</span>';

            row.innerHTML = `
                <td>
                    <div class="sa-invitation-email">
                        <strong>${escapeSchoolAdminHTML(invitation.email)}</strong>
                        <span>Invitation #${invitation.id}</span>
                    </div>
                </td>

                <td>
                    ${escapeSchoolAdminHTML(offering.subject)}
                    <div class="text-secondary small">
                        ${escapeSchoolAdminHTML(offering.grade)} - ${escapeSchoolAdminHTML(offering.section)}
                    </div>
                </td>

                <td>${escapeSchoolAdminHTML(invitation.createdAt)}</td>

                <td>${escapeSchoolAdminHTML(invitation.expiresAt)}</td>

                <td>
                    <span class="status-pill ${statusClass(invitation.status)}">
                        ${statusLabel(invitation.status)}
                    </span>
                </td>

                <td class="text-end">
                    <div class="sa-invitation-actions">
                        ${actionHTML}
                    </div>
                </td>
            `;

            tableBody.appendChild(row);

        });

        if (emptyState) {
            emptyState.hidden = filtered.length !== 0;
        }

        if (resultCount) {
            resultCount.textContent =
                `${filtered.length} invitation record(s) displayed`;
        }

        updateSummary();

    }

    function openCreateModal() {

        lastModalTrigger = document.activeElement;

        form.reset();

        if (modalMessage) {
            modalMessage.textContent = "";
        }

        populateOfferingOptions();

        modal.show();

    }

    function createInvitation(event) {

        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const email = emailInput.value.trim().toLowerCase();
        const offeringId = Number(offeringSelect.value);

        const offering = getOffering(offeringId);

        if (!offering || offering.status !== "active") {

            modalMessage.textContent =
                "Please select a valid active Subject Offering.";

            return;

        }

        const duplicate = invitations.some(item =>
            item.offeringId === offeringId &&
            item.email.toLowerCase() === email &&
            item.status === "pending"
        );

        if (duplicate) {

            modalMessage.textContent =
                "A pending invitation already exists for this email and Subject Offering.";

            return;

        }

        const nextId = Math.max(
            0,
            ...invitations.map(item => item.id)
        ) + 1;

        const today = new Date();

        const createdAt = today.toISOString().slice(0, 10);

        /*
         * Demonstration-only expiration date.
         * Seven days is NOT an approved system policy.
         */

        const demoExpiry = new Date(today);

        demoExpiry.setDate(demoExpiry.getDate() + 7);

        const expiresAt = demoExpiry.toISOString().slice(0, 10);

        invitations.push({
            id: nextId,
            offeringId,
            email,
            status: "pending",
            createdAt,
            expiresAt
        });

        modal.hide();

        showMessage(
            "Demo only: Invitation record prepared in temporary browser memory. No email was sent and no real invitation token was created."
        );

        renderTable();

    }

    function handleTableAction(event) {

        const button = event.target.closest("[data-action]");

        if (!button) return;

        const action = button.dataset.action;
        const id = Number(button.dataset.id);

        const invitation = invitations.find(
            item => item.id === id
        );

        if (!invitation) return;

        if (action === "revoke") {

            if (invitation.status !== "pending") {

                showMessage(
                    "Only pending invitations can be revoked in this demonstration.",
                    "error"
                );

                return;

            }

            const confirmed = window.confirm(
                `Revoke the pending invitation sent to ${invitation.email}?`
            );

            if (!confirmed) return;

            invitation.status = "revoked";

            showMessage(
                "Demo only: Invitation revoked in temporary browser memory. Its history remains visible."
            );

            renderTable();

        }

    }

    if (createButton) {
        createButton.addEventListener("click", openCreateModal);
    }

    if (searchInput) {
        searchInput.addEventListener("input", renderTable);
    }

    if (statusFilter) {
        statusFilter.addEventListener("change", renderTable);
    }

    form.addEventListener("submit", createInvitation);

    tableBody.addEventListener("click", handleTableAction);

    populateOfferingOptions();
    renderTable();

    console.log("Teacher Invitation Management initialized.");

}


/* ==========================================
   F9.11 - TEACHER REPLACEMENT
   FRONTEND DEMONSTRATION
   ========================================== */

function initializeTeacherReplacement() {

    const replacementBody = document.getElementById("replacementTableBody");
    const historyBody = document.getElementById("replacementHistoryBody");
    const modalElement = document.getElementById("teacherReplacementModal");
    const form = document.getElementById("teacherReplacementForm");

    if (!replacementBody || !historyBody || !modalElement || !form) return;

    if (!window.bootstrap) {
        console.error("Bootstrap Modal is unavailable on Teacher Replacement page.");
        return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    let lastModalTrigger = null;

    configureModalFocusManagement(
        modalElement,
        () => lastModalTrigger
    );

    const assignmentSelect = document.getElementById("replacementAssignment");
    const teacherSelect = document.getElementById("replacementTeacher");

    const searchInput = document.getElementById("replacementSearch");
    const statusFilter = document.getElementById("replacementStatusFilter");

    const historySearch = document.getElementById("replacementHistorySearch");

    const createButton = document.getElementById("createReplacementButton");

    const modalMessage = document.getElementById("replacementModalMessage");
    const pageMessage = document.getElementById("replacementMessage");

    const totalCount = document.getElementById("replacementTotalCount");
    const pendingCount = document.getElementById("replacementPendingCount");
    const completedCount = document.getElementById("replacementCompletedCount");
    const cancelledCount = document.getElementById("replacementCancelledCount");

    const resultCount = document.getElementById("replacementResultCount");
    const historyResultCount = document.getElementById("replacementHistoryResultCount");

    const emptyState = document.getElementById("replacementEmptyState");
    const historyEmptyState = document.getElementById("replacementHistoryEmptyState");

    /*
     * SAMPLE TEACHER RECORDS.
     * Actual eligibility must be verified by the Backend.
     */

    const teachers = [
        { id: 101, name: "Maria Santos", email: "maria.santos@example.edu.ph", membershipStatus: "active", roleStatus: "active" },
        { id: 102, name: "Juan Reyes", email: "juan.reyes@example.edu.ph", membershipStatus: "active", roleStatus: "active" },
        { id: 103, name: "Ana Cruz", email: "ana.cruz@example.edu.ph", membershipStatus: "active", roleStatus: "active" },
        { id: 104, name: "Pedro Garcia", email: "pedro.garcia@example.edu.ph", membershipStatus: "active", roleStatus: "active" },
        { id: 105, name: "Elena Ramos", email: "elena.ramos@example.edu.ph", membershipStatus: "inactive", roleStatus: "inactive" }
    ];

    const offerings = [
        { id: 1, grade: "Grade 7", section: "Section A", subject: "Mathematics" },
        { id: 2, grade: "Grade 7", section: "Section A", subject: "Science" },
        { id: 3, grade: "Grade 7", section: "Section A", subject: "English" },
        { id: 4, grade: "Grade 7", section: "Section B", subject: "Mathematics" },
        { id: 5, grade: "Grade 7", section: "Section B", subject: "Science" },
        { id: 6, grade: "Grade 8", section: "Section A", subject: "Mathematics" },
        { id: 7, grade: "Grade 8", section: "Section A", subject: "English" },
        { id: 8, grade: "Grade 9", section: "Section A", subject: "Science" }
    ];

    /*
     * SAMPLE ASSIGNMENT HISTORY.
     * Assignment IDs are separate from Offering IDs.
     */

    let assignments = [
        { id: 1, offeringId: 1, teacherId: 101, status: "active", startDate: "2026-06-01", endDate: "" },
        { id: 2, offeringId: 2, teacherId: 102, status: "active", startDate: "2026-06-01", endDate: "" },
        { id: 3, offeringId: 3, teacherId: 103, status: "active", startDate: "2026-06-01", endDate: "" },
        { id: 4, offeringId: 4, teacherId: 101, status: "active", startDate: "2026-06-01", endDate: "" },
        { id: 5, offeringId: 6, teacherId: 104, status: "active", startDate: "2026-06-01", endDate: "" }
    ];

    /*
     * PROPOSED FRONTEND REPLACEMENT STATUS LABELS.
     * These must be reconciled with the final Backend vocabulary.
     */

    let replacements = [];

    function getTeacher(id) {
        return teachers.find(item => item.id === Number(id));
    }

    function getOffering(id) {
        return offerings.find(item => item.id === Number(id));
    }

    function getAssignment(id) {
        return assignments.find(item => item.id === Number(id));
    }

    function getActiveAssignmentForOffering(offeringId) {

        return assignments.find(item =>
            item.offeringId === Number(offeringId) &&
            item.status === "active"
        );

    }

    function getReplacementStatusLabel(status) {

        const labels = {
            pending: "Awaiting Acceptance",
            accepted: "Accepted",
            declined: "Declined",
            revoked: "Revoked"
        };

        return labels[status] || status;

    }

    function getReplacementStatusClass(status) {

        const classes = {
            pending: "status-warning",
            accepted: "status-success",
            declined: "status-info",
            revoked: "status-info"
        };

        return classes[status] || "status-info";

    }

    function getOfferingLabel(offeringId) {

        const offering = getOffering(offeringId);

        if (!offering) return "Unknown Offering";

        return `${offering.grade} - ${offering.section} - ${offering.subject}`;

    }

    function showMessage(text, type = "success") {

        if (!pageMessage) return;

        pageMessage.className =
            "sa-replacement-message " + type + " show";

        pageMessage.textContent = text;

    }

    function updateSummary() {

        const pending = replacements.filter(
            item => item.status === "pending"
        ).length;

        const completed = replacements.filter(
            item => item.status === "accepted"
        ).length;

        const cancelled = replacements.filter(
            item => item.status === "declined" ||
                    item.status === "revoked"
        ).length;

        if (totalCount) totalCount.textContent = replacements.length;
        if (pendingCount) pendingCount.textContent = pending;
        if (completedCount) completedCount.textContent = completed;
        if (cancelledCount) cancelledCount.textContent = cancelled;

    }

    function populateAssignmentOptions() {

        assignmentSelect.innerHTML =
            '<option value="">Select Current Assignment</option>';

        assignments
            .filter(item => item.status === "active")
            .forEach(assignment => {

                const teacher = getTeacher(assignment.teacherId);

                if (!teacher) return;

                const option = document.createElement("option");

                option.value = assignment.id;

                option.textContent =
                    `${getOfferingLabel(assignment.offeringId)} — ${teacher.name}`;

                assignmentSelect.appendChild(option);

            });

    }

    function populateReplacementTeachers() {

        teacherSelect.innerHTML =
            '<option value="">Select Proposed Replacement Teacher</option>';

        teachers
            .filter(teacher =>
                teacher.membershipStatus === "active" &&
                teacher.roleStatus === "active"
            )
            .forEach(teacher => {

                const option = document.createElement("option");

                option.value = teacher.id;
                option.textContent = teacher.name;

                teacherSelect.appendChild(option);

            });

    }

    function renderPendingReplacements() {

        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedStatus = statusFilter
            ? statusFilter.value
            : "all";

        const filtered = replacements.filter(replacement => {

            const oldTeacher = getTeacher(replacement.oldTeacherId);
            const newTeacher = getTeacher(replacement.newTeacherId);

            const offeringLabel = getOfferingLabel(replacement.offeringId);

            if (!oldTeacher || !newTeacher) return false;

            const matchesSearch =
                oldTeacher.name.toLowerCase().includes(query) ||
                newTeacher.name.toLowerCase().includes(query) ||
                offeringLabel.toLowerCase().includes(query);

            const matchesStatus =
                selectedStatus === "all" ||
                replacement.status === selectedStatus;

            return matchesSearch && matchesStatus;

        });

        replacementBody.replaceChildren();

        filtered.forEach(replacement => {

            const oldTeacher = getTeacher(replacement.oldTeacherId);
            const newTeacher = getTeacher(replacement.newTeacherId);

            const row = document.createElement("tr");

            let actionHTML = '<span class="text-secondary small">No action available</span>';

            if (replacement.status === "pending") {

                actionHTML = `
                    <div class="sa-replacement-actions">

                        <button type="button"
                            class="sa-replacement-action-btn"
                            data-action="simulate-accept"
                            data-id="${replacement.id}">
                            Simulate Acceptance
                        </button>

                        <button type="button"
                            class="sa-replacement-action-btn danger"
                            data-action="revoke"
                            data-id="${replacement.id}">
                            Revoke
                        </button>

                    </div>
                `;

            }

            row.innerHTML = `
                <td>
                    <div class="sa-replacement-person">
                        <div class="sa-replacement-avatar">
                            ${escapeSchoolAdminHTML(oldTeacher.name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase())}
                        </div>
                        <div>
                            <strong>${escapeSchoolAdminHTML(oldTeacher.name)}</strong>
                            <span>Current Teacher</span>
                        </div>
                    </div>
                </td>

                <td>
                    <div class="sa-replacement-person">
                        <div class="sa-replacement-avatar">
                            ${escapeSchoolAdminHTML(newTeacher.name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase())}
                        </div>
                        <div>
                            <strong>${escapeSchoolAdminHTML(newTeacher.name)}</strong>
                            <span>Proposed Replacement</span>
                        </div>
                    </div>
                </td>

                <td>${escapeSchoolAdminHTML(getOfferingLabel(replacement.offeringId))}</td>

                <td>${escapeSchoolAdminHTML(replacement.createdAt)}</td>

                <td>
                    <span class="status-pill ${getReplacementStatusClass(replacement.status)}">
                        ${getReplacementStatusLabel(replacement.status)}
                    </span>
                </td>

                <td class="text-end">
                    ${actionHTML}
                </td>
            `;

            replacementBody.appendChild(row);

        });

        if (emptyState) {
            emptyState.hidden = filtered.length !== 0;
        }

        if (resultCount) {
            resultCount.textContent =
                `${filtered.length} replacement request(s) displayed`;
        }

        updateSummary();

    }

    function renderAssignmentHistory() {

        const query = historySearch
            ? historySearch.value.trim().toLowerCase()
            : "";

        const filtered = assignments.filter(assignment => {

            const teacher = getTeacher(assignment.teacherId);
            const offeringLabel = getOfferingLabel(assignment.offeringId);

            if (!teacher) return false;

            return (
                teacher.name.toLowerCase().includes(query) ||
                offeringLabel.toLowerCase().includes(query)
            );

        });

        historyBody.replaceChildren();

        filtered.forEach(assignment => {

            const teacher = getTeacher(assignment.teacherId);

            const row = document.createElement("tr");

            const statusHTML = assignment.status === "active"
                ? '<span class="status-pill status-success">Active</span>'
                : '<span class="status-pill status-info">Ended</span>';

            row.innerHTML = `
                <td>${assignment.id}</td>

                <td>
                    <strong>${escapeSchoolAdminHTML(teacher.name)}</strong>
                </td>

                <td>${escapeSchoolAdminHTML(getOfferingLabel(assignment.offeringId))}</td>

                <td>${escapeSchoolAdminHTML(assignment.startDate)}</td>

                <td>${escapeSchoolAdminHTML(assignment.endDate || "—")}</td>

                <td>${statusHTML}</td>
            `;

            historyBody.appendChild(row);

        });

        if (historyEmptyState) {
            historyEmptyState.hidden = filtered.length !== 0;
        }

        if (historyResultCount) {
            historyResultCount.textContent =
                `${filtered.length} assignment record(s) displayed`;
        }

    }

    function openReplacementModal() {

        lastModalTrigger = document.activeElement;

        form.reset();

        if (modalMessage) {
            modalMessage.textContent = "";
        }

        populateAssignmentOptions();
        populateReplacementTeachers();

        modal.show();

    }

    function createReplacement(event) {

        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const assignmentId = Number(assignmentSelect.value);
        const replacementTeacherId = Number(teacherSelect.value);

        const currentAssignment = getAssignment(assignmentId);
        const newTeacher = getTeacher(replacementTeacherId);

        if (!currentAssignment || currentAssignment.status !== "active") {

            modalMessage.textContent =
                "Please select a valid active Teacher Assignment.";

            return;

        }

        if (
            !newTeacher ||
            newTeacher.membershipStatus !== "active" ||
            newTeacher.roleStatus !== "active"
        ) {

            modalMessage.textContent =
                "The proposed replacement must have active School membership and an active Teacher role.";

            return;

        }

        if (currentAssignment.teacherId === replacementTeacherId) {

            modalMessage.textContent =
                "The proposed replacement must be different from the current Teacher.";

            return;

        }

        const offeringId = currentAssignment.offeringId;

        const existingPending = replacements.some(item =>
            item.offeringId === offeringId &&
            item.status === "pending"
        );

        if (existingPending) {

            modalMessage.textContent =
                "A replacement request is already pending for this Subject Offering.";

            return;

        }

        const nextId = Math.max(
            0,
            ...replacements.map(item => item.id)
        ) + 1;

        const today = new Date().toISOString().slice(0, 10);

        replacements.push({
            id: nextId,
            offeringId,
            oldAssignmentId: currentAssignment.id,
            oldTeacherId: currentAssignment.teacherId,
            newTeacherId: replacementTeacherId,
            status: "pending",
            createdAt: today,
            acceptedAt: "",
            resolvedAt: ""
        });

        modal.hide();

        showMessage(
            "Demo only: Replacement request created in temporary browser memory. The current Teacher remains assigned until the proposed replacement accepts."
        );

        renderPendingReplacements();

    }

    function simulateAcceptance(replacement) {

        if (!replacement || replacement.status !== "pending") return;

        const oldAssignment = getAssignment(replacement.oldAssignmentId);

        const newTeacher = getTeacher(replacement.newTeacherId);

        if (!oldAssignment || oldAssignment.status !== "active") {

            showMessage(
                "The previous active assignment could not be verified. Replacement was not activated.",
                "error"
            );

            return;

        }

        if (
            !newTeacher ||
            newTeacher.membershipStatus !== "active" ||
            newTeacher.roleStatus !== "active"
        ) {

            showMessage(
                "The proposed Teacher is no longer eligible. Replacement was not activated.",
                "error"
            );

            return;

        }

        const existingActive = getActiveAssignmentForOffering(
            replacement.offeringId
        );

        if (!existingActive || existingActive.id !== oldAssignment.id) {

            showMessage(
                "The current Offering assignment has changed. Replacement was not activated.",
                "error"
            );

            return;

        }

        const confirmed = window.confirm(
            "DEMO ONLY: Simulate the proposed Teacher accepting this replacement? The previous assignment will end and the new assignment will become active."
        );

        if (!confirmed) return;

        const today = new Date().toISOString().slice(0, 10);

        /*
         * DEMONSTRATION TRANSACTION:
         * Validate first, then update the previous assignment
         * and add the replacement assignment together.
         */

        const nextAssignmentId = Math.max(
            0,
            ...assignments.map(item => item.id)
        ) + 1;

        oldAssignment.status = "ended";
        oldAssignment.endDate = today;

        assignments.push({
            id: nextAssignmentId,
            offeringId: replacement.offeringId,
            teacherId: replacement.newTeacherId,
            status: "active",
            startDate: today,
            endDate: ""
        });

        replacement.status = "accepted";
        replacement.acceptedAt = today;
        replacement.resolvedAt = today;

        showMessage(
            "Demo only: Acceptance simulated. The previous assignment was preserved as Ended and the replacement assignment is now Active. No real invitation was accepted."
        );

        renderPendingReplacements();
        renderAssignmentHistory();

    }

    function handleReplacementAction(event) {

        const button = event.target.closest("[data-action]");

        if (!button) return;

        const action = button.dataset.action;
        const id = Number(button.dataset.id);

        const replacement = replacements.find(
            item => item.id === id
        );

        if (!replacement || replacement.status !== "pending") return;

        if (action === "simulate-accept") {

            simulateAcceptance(replacement);
            return;

        }

        if (action === "revoke") {

            const confirmed = window.confirm(
                "Revoke this pending replacement request? The current Teacher assignment will remain active."
            );

            if (!confirmed) return;

            replacement.status = "revoked";
            replacement.resolvedAt =
                new Date().toISOString().slice(0, 10);

            showMessage(
                "Demo only: Replacement request revoked. The previous Teacher assignment remains active."
            );

            renderPendingReplacements();

        }

    }

    if (createButton) {
        createButton.addEventListener("click", openReplacementModal);
    }

    if (searchInput) {
        searchInput.addEventListener("input", renderPendingReplacements);
    }

    if (statusFilter) {
        statusFilter.addEventListener("change", renderPendingReplacements);
    }

    if (historySearch) {
        historySearch.addEventListener("input", renderAssignmentHistory);
    }

    form.addEventListener("submit", createReplacement);

    replacementBody.addEventListener("click", handleReplacementAction);

    renderPendingReplacements();
    renderAssignmentHistory();

    console.log("Teacher Replacement initialized.");

}


/* ==========================================
   F9.12 - STUDENT ENROLLMENT OVERVIEW
   FRONTEND DEMONSTRATION
   ========================================== */

function initializeStudentEnrollmentOverview() {

    const placementBody = document.getElementById("sectionPlacementTableBody");
    const subjectBody = document.getElementById("studentSubjectEnrollmentTableBody");

    if (!placementBody || !subjectBody) return;

    const placementSearch = document.getElementById("placementSearch");
    const placementGradeFilter = document.getElementById("placementGradeFilter");
    const placementStatusFilter = document.getElementById("placementStatusFilter");

    const subjectSearch = document.getElementById("studentSubjectSearch");
    const subjectGradeFilter = document.getElementById("studentSubjectGradeFilter");
    const subjectStatusFilter = document.getElementById("studentSubjectStatusFilter");

    const totalStudents = document.getElementById("enrollmentTotalStudents");
    const activePlacements = document.getElementById("enrollmentActivePlacements");
    const activeSubjectEnrollments = document.getElementById("enrollmentActiveSubjects");
    const historicalRecords = document.getElementById("enrollmentHistoricalRecords");

    const placementCount = document.getElementById("placementResultCount");
    const subjectCount = document.getElementById("studentSubjectResultCount");

    const placementEmpty = document.getElementById("placementEmptyState");
    const subjectEmpty = document.getElementById("studentSubjectEmptyState");

    const tabs = Array.from(document.querySelectorAll("[data-enrollment-tab]"));
    const panels = Array.from(document.querySelectorAll("[data-enrollment-panel]"));

    /*
     * SAMPLE ACADEMIC STRUCTURE.
     * These records are independent demonstration data.
     */

    const gradeSpaces = [
        { id: 1, name: "Grade 7" },
        { id: 2, name: "Grade 8" },
        { id: 3, name: "Grade 9" }
    ];

    const sections = [
        { id: 1, gradeSpaceId: 1, name: "Section A" },
        { id: 2, gradeSpaceId: 1, name: "Section B" },
        { id: 3, gradeSpaceId: 2, name: "Section A" },
        { id: 4, gradeSpaceId: 3, name: "Section A" }
    ];

    /*
     * SAMPLE STUDENTS.
     * IDs are fictional demonstration identifiers.
     */

    const students = [
        { id: 201, name: "Alex Santos", reference: "STU-001" },
        { id: 202, name: "Bea Reyes", reference: "STU-002" },
        { id: 203, name: "Carlo Cruz", reference: "STU-003" },
        { id: 204, name: "Diana Garcia", reference: "STU-004" },
        { id: 205, name: "Ethan Ramos", reference: "STU-005" }
    ];

    /*
     * OFFICIAL SECTION PLACEMENTS.
     * Separate from Subject Enrollments.
     *
     * Multiple active placements are intentionally allowed.
     */

    const sectionPlacements = [
        { id: 1, studentId: 201, sectionId: 1, status: "active", date: "2026-06-01" },
        { id: 2, studentId: 202, sectionId: 1, status: "active", date: "2026-06-01" },
        { id: 3, studentId: 203, sectionId: 2, status: "active", date: "2026-06-01" },
        { id: 4, studentId: 204, sectionId: 3, status: "active", date: "2026-06-01" },
        { id: 5, studentId: 201, sectionId: 2, status: "active", date: "2026-08-01" },
        { id: 6, studentId: 205, sectionId: 4, status: "ended", date: "2025-06-01" }
    ];

    /*
     * SUBJECT OFFERINGS.
     */

    const offerings = [
        { id: 1, sectionId: 1, subject: "Mathematics" },
        { id: 2, sectionId: 1, subject: "Science" },
        { id: 3, sectionId: 1, subject: "English" },
        { id: 4, sectionId: 2, subject: "Mathematics" },
        { id: 5, sectionId: 2, subject: "Science" },
        { id: 6, sectionId: 3, subject: "Mathematics" },
        { id: 7, sectionId: 3, subject: "English" },
        { id: 8, sectionId: 4, subject: "Science" }
    ];

    /*
     * STUDENT SUBJECT ENROLLMENTS.
     * Each enrollment references an exact placement and Offering.
     */

    const subjectEnrollments = [
        { id: 1, studentId: 201, sectionPlacementId: 1, offeringId: 1, status: "active", date: "2026-06-02" },
        { id: 2, studentId: 201, sectionPlacementId: 1, offeringId: 2, status: "active", date: "2026-06-02" },
        { id: 3, studentId: 202, sectionPlacementId: 1, offeringId: 1, status: "active", date: "2026-06-02" },
        { id: 4, studentId: 202, sectionPlacementId: 1, offeringId: 3, status: "active", date: "2026-06-02" },
        { id: 5, studentId: 203, sectionPlacementId: 3, offeringId: 4, status: "active", date: "2026-06-02" },
        { id: 6, studentId: 204, sectionPlacementId: 4, offeringId: 6, status: "active", date: "2026-06-02" },
        { id: 7, studentId: 205, sectionPlacementId: 6, offeringId: 8, status: "ended", date: "2025-06-02" }
    ];

    function getStudent(id) {
        return students.find(item => item.id === Number(id));
    }

    function getSection(id) {
        return sections.find(item => item.id === Number(id));
    }

    function getGrade(id) {
        return gradeSpaces.find(item => item.id === Number(id));
    }

    function getPlacement(id) {
        return sectionPlacements.find(item => item.id === Number(id));
    }

    function getOffering(id) {
        return offerings.find(item => item.id === Number(id));
    }

    function getPlacementDetails(placement) {

        const student = getStudent(placement.studentId);
        const section = getSection(placement.sectionId);

        if (!student || !section) return null;

        const grade = getGrade(section.gradeSpaceId);

        if (!grade) return null;

        return { student, section, grade };

    }

    function getSubjectEnrollmentDetails(enrollment) {

        const student = getStudent(enrollment.studentId);
        const placement = getPlacement(enrollment.sectionPlacementId);
        const offering = getOffering(enrollment.offeringId);

        if (!student || !placement || !offering) return null;

        const section = getSection(placement.sectionId);
        const grade = section ? getGrade(section.gradeSpaceId) : null;

        if (
            !section ||
            !grade ||
            offering.sectionId !== placement.sectionId
        ) {
            return null;
        }

        return {
            student,
            placement,
            section,
            grade,
            offering
        };

    }

    function initials(name) {

        return name.split(" ")
            .map(part => part.charAt(0))
            .slice(0, 2)
            .join("")
            .toUpperCase();

    }

    function updateSummary() {

        const activeStudentIds = new Set(
            sectionPlacements
                .filter(item => item.status === "active")
                .map(item => item.studentId)
        );

        const activePlacementCount = sectionPlacements.filter(
            item => item.status === "active"
        ).length;

        const activeSubjectCount = subjectEnrollments.filter(
            item => item.status === "active"
        ).length;

        const historicalCount =
            sectionPlacements.filter(item => item.status !== "active").length +
            subjectEnrollments.filter(item => item.status !== "active").length;

        if (totalStudents) totalStudents.textContent = activeStudentIds.size;
        if (activePlacements) activePlacements.textContent = activePlacementCount;
        if (activeSubjectEnrollments) activeSubjectEnrollments.textContent = activeSubjectCount;
        if (historicalRecords) historicalRecords.textContent = historicalCount;

    }

    function populateGradeFilter(select) {

        if (!select) return;

        gradeSpaces.forEach(grade => {

            const option = document.createElement("option");

            option.value = grade.id;
            option.textContent = grade.name;

            select.appendChild(option);

        });

    }

    function renderPlacements() {

        const query = placementSearch
            ? placementSearch.value.trim().toLowerCase()
            : "";

        const selectedGrade = placementGradeFilter
            ? placementGradeFilter.value
            : "all";

        const selectedStatus = placementStatusFilter
            ? placementStatusFilter.value
            : "all";

        const filtered = sectionPlacements.filter(placement => {

            const details = getPlacementDetails(placement);

            if (!details) return false;

            const matchesSearch =
                details.student.name.toLowerCase().includes(query) ||
                details.student.reference.toLowerCase().includes(query) ||
                details.section.name.toLowerCase().includes(query) ||
                details.grade.name.toLowerCase().includes(query);

            const matchesGrade =
                selectedGrade === "all" ||
                details.grade.id === Number(selectedGrade);

            const matchesStatus =
                selectedStatus === "all" ||
                placement.status === selectedStatus;

            return matchesSearch && matchesGrade && matchesStatus;

        });

        placementBody.replaceChildren();

        filtered.forEach(placement => {

            const details = getPlacementDetails(placement);

            const row = document.createElement("tr");

            const isActive = placement.status === "active";

            row.innerHTML = `
                <td>
                    <div class="sa-enrollment-student">
                        <div class="sa-enrollment-avatar">
                            ${escapeSchoolAdminHTML(initials(details.student.name))}
                        </div>
                        <div>
                            <strong>${escapeSchoolAdminHTML(details.student.name)}</strong>
                            <span>${escapeSchoolAdminHTML(details.student.reference)}</span>
                        </div>
                    </div>
                </td>

                <td>${escapeSchoolAdminHTML(details.grade.name)}</td>

                <td>${escapeSchoolAdminHTML(details.section.name)}</td>

                <td>${escapeSchoolAdminHTML(placement.date)}</td>

                <td>
                    <span class="status-pill ${isActive ? "status-success" : "status-info"}">
                        ${isActive ? "Active" : "Ended"}
                    </span>
                </td>

                <td>${placement.id}</td>
            `;

            placementBody.appendChild(row);

        });

        if (placementEmpty) {
            placementEmpty.hidden = filtered.length !== 0;
        }

        if (placementCount) {
            placementCount.textContent =
                `${filtered.length} placement record(s) displayed`;
        }

        updateSummary();

    }

    function renderSubjectEnrollments() {

        const query = subjectSearch
            ? subjectSearch.value.trim().toLowerCase()
            : "";

        const selectedGrade = subjectGradeFilter
            ? subjectGradeFilter.value
            : "all";

        const selectedStatus = subjectStatusFilter
            ? subjectStatusFilter.value
            : "all";

        const filtered = subjectEnrollments.filter(enrollment => {

            const details = getSubjectEnrollmentDetails(enrollment);

            if (!details) return false;

            const matchesSearch =
                details.student.name.toLowerCase().includes(query) ||
                details.student.reference.toLowerCase().includes(query) ||
                details.offering.subject.toLowerCase().includes(query) ||
                details.section.name.toLowerCase().includes(query) ||
                details.grade.name.toLowerCase().includes(query);

            const matchesGrade =
                selectedGrade === "all" ||
                details.grade.id === Number(selectedGrade);

            const matchesStatus =
                selectedStatus === "all" ||
                enrollment.status === selectedStatus;

            return matchesSearch && matchesGrade && matchesStatus;

        });

        subjectBody.replaceChildren();

        filtered.forEach(enrollment => {

            const details = getSubjectEnrollmentDetails(enrollment);

            const row = document.createElement("tr");

            const isActive = enrollment.status === "active";

            row.innerHTML = `
                <td>
                    <div class="sa-enrollment-student">
                        <div class="sa-enrollment-avatar">
                            ${escapeSchoolAdminHTML(initials(details.student.name))}
                        </div>
                        <div>
                            <strong>${escapeSchoolAdminHTML(details.student.name)}</strong>
                            <span>${escapeSchoolAdminHTML(details.student.reference)}</span>
                        </div>
                    </div>
                </td>

                <td>${escapeSchoolAdminHTML(details.offering.subject)}</td>

                <td>${escapeSchoolAdminHTML(details.grade.name)}</td>

                <td>${escapeSchoolAdminHTML(details.section.name)}</td>

                <td>${escapeSchoolAdminHTML(enrollment.date)}</td>

                <td>
                    <span class="status-pill ${isActive ? "status-success" : "status-info"}">
                        ${isActive ? "Active" : "Ended"}
                    </span>
                </td>

                <td>${enrollment.id}</td>
            `;

            subjectBody.appendChild(row);

        });

        if (subjectEmpty) {
            subjectEmpty.hidden = filtered.length !== 0;
        }

        if (subjectCount) {
            subjectCount.textContent =
                `${filtered.length} subject enrollment record(s) displayed`;
        }

        updateSummary();

    }

    function activateTab(tabName) {

        tabs.forEach(tab => {

            const active = tab.dataset.enrollmentTab === tabName;

            tab.classList.toggle("active", active);
            tab.setAttribute("aria-selected", String(active));

        });

        panels.forEach(panel => {

            const active = panel.dataset.enrollmentPanel === tabName;

            panel.classList.toggle("active", active);
            panel.hidden = !active;

        });

    }

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {
            activateTab(tab.dataset.enrollmentTab);
        });

    });

    if (placementSearch) {
        placementSearch.addEventListener("input", renderPlacements);
    }

    if (placementGradeFilter) {
        placementGradeFilter.addEventListener("change", renderPlacements);
    }

    if (placementStatusFilter) {
        placementStatusFilter.addEventListener("change", renderPlacements);
    }

    if (subjectSearch) {
        subjectSearch.addEventListener("input", renderSubjectEnrollments);
    }

    if (subjectGradeFilter) {
        subjectGradeFilter.addEventListener("change", renderSubjectEnrollments);
    }

    if (subjectStatusFilter) {
        subjectStatusFilter.addEventListener("change", renderSubjectEnrollments);
    }

    populateGradeFilter(placementGradeFilter);
    populateGradeFilter(subjectGradeFilter);

    renderPlacements();
    renderSubjectEnrollments();

    activateTab("placements");

    console.log("Student Enrollment Overview initialized.");

}





/* ==========================================
   F9.13 - STUDENT SUBJECT CODE MANAGEMENT
   FRONTEND DEMONSTRATION
   ========================================== */

function initializeStudentSubjectCodeManagement() {

    const tableBody = document.getElementById("studentCodeTableBody");
    const form = document.getElementById("studentCodeForm");
    const modalElement = document.getElementById("studentCodeModal");

    if (!tableBody || !form || !modalElement) return;

    if (!window.bootstrap) {
        console.error("Bootstrap Modal is unavailable on Student Code page.");
        return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    let lastModalTrigger = null;

    configureModalFocusManagement(
        modalElement,
        () => lastModalTrigger
    );

    const offeringSelect = document.getElementById("studentCodeOffering");
    const searchInput = document.getElementById("studentCodeSearch");
    const statusFilter = document.getElementById("studentCodeStatusFilter");

    const modalMessage = document.getElementById("studentCodeModalMessage");
    const pageMessage = document.getElementById("studentCodeMessage");

    const createButton = document.getElementById("createStudentCodeButton");

    const totalCount = document.getElementById("studentCodeTotalCount");
    const activeCount = document.getElementById("studentCodeActiveCount");
    const revokedCount = document.getElementById("studentCodeRevokedCount");
    const historicalCount = document.getElementById("studentCodeHistoricalCount");

    const resultCount = document.getElementById("studentCodeResultCount");
    const emptyState = document.getElementById("studentCodeEmptyState");

    /*
     * SAMPLE SUBJECT OFFERINGS.
     * Actual Offering records must be loaded from the Backend.
     */

    const offerings = [
        { id: 1, grade: "Grade 7", section: "Section A", subject: "Mathematics", status: "active" },
        { id: 2, grade: "Grade 7", section: "Section A", subject: "Science", status: "active" },
        { id: 3, grade: "Grade 7", section: "Section A", subject: "English", status: "active" },
        { id: 4, grade: "Grade 7", section: "Section B", subject: "Mathematics", status: "active" },
        { id: 5, grade: "Grade 7", section: "Section B", subject: "Science", status: "active" },
        { id: 6, grade: "Grade 8", section: "Section A", subject: "Mathematics", status: "active" },
        { id: 7, grade: "Grade 8", section: "Section A", subject: "English", status: "active" },
        { id: 8, grade: "Grade 9", section: "Section A", subject: "Science", status: "active" }
    ];

    /*
     * SAMPLE CODE HISTORY.
     *
     * The demo codes below are fictional.
     * Production raw codes must never be stored in plaintext.
     */

    let codes = [
        {
            id: 1,
            offeringId: 1,
            displayCode: "DEMO-MATH-7A",
            status: "active",
            createdAt: "2026-11-10",
            expiresAt: "Not configured"
        },
        {
            id: 2,
            offeringId: 2,
            displayCode: "DEMO-SCI-7A",
            status: "active",
            createdAt: "2026-11-10",
            expiresAt: "Not configured"
        },
        {
            id: 3,
            offeringId: 3,
            displayCode: "DEMO-ENG-7A",
            status: "revoked",
            createdAt: "2026-10-15",
            expiresAt: "Not configured"
        },
        {
            id: 4,
            offeringId: 3,
            displayCode: "DEMO-ENG-7A-NEW",
            status: "active",
            createdAt: "2026-11-12",
            expiresAt: "Not configured"
        },
        {
            id: 5,
            offeringId: 4,
            displayCode: "DEMO-MATH-7B",
            status: "active",
            createdAt: "2026-11-12",
            expiresAt: "Not configured"
        }
    ];

    function getOffering(id) {

        return offerings.find(
            item => item.id === Number(id)
        );

    }

    function getActiveCode(offeringId) {

        return codes.find(item =>
            item.offeringId === Number(offeringId) &&
            item.status === "active"
        );

    }

    function showMessage(text, type = "success") {

        if (!pageMessage) return;

        pageMessage.className =
            "sa-student-code-message " + type + " show";

        pageMessage.textContent = text;

    }

    function updateSummary() {

        const active = codes.filter(
            item => item.status === "active"
        ).length;

        const revoked = codes.filter(
            item => item.status === "revoked"
        ).length;

        const historical = codes.filter(
            item => item.status !== "active"
        ).length;

        if (totalCount) totalCount.textContent = codes.length;
        if (activeCount) activeCount.textContent = active;
        if (revokedCount) revokedCount.textContent = revoked;
        if (historicalCount) historicalCount.textContent = historical;

    }

    function statusLabel(status) {

        const labels = {
            active: "Active",
            revoked: "Revoked"
        };

        return labels[status] || status;

    }

    function statusClass(status) {

        return status === "active"
            ? "status-success"
            : "status-info";

    }

    function populateOfferingOptions() {

        offeringSelect.innerHTML =
            '<option value="">Select Subject Offering</option>';

        offerings
            .filter(item => item.status === "active")
            .forEach(offering => {

                const option = document.createElement("option");

                option.value = offering.id;

                option.textContent =
                    `${offering.grade} - ${offering.section} - ${offering.subject}`;

                const existing = getActiveCode(offering.id);

                option.disabled = Boolean(existing);

                if (existing) {
                    option.textContent += " (Active code already exists)";
                }

                offeringSelect.appendChild(option);

            });

    }

    function renderTable() {

        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedStatus = statusFilter
            ? statusFilter.value
            : "all";

        const filtered = codes.filter(code => {

            const offering = getOffering(code.offeringId);

            if (!offering) return false;

            const matchesSearch =
                offering.subject.toLowerCase().includes(query) ||
                offering.grade.toLowerCase().includes(query) ||
                offering.section.toLowerCase().includes(query) ||
                code.displayCode.toLowerCase().includes(query);

            const matchesStatus =
                selectedStatus === "all" ||
                code.status === selectedStatus;

            return matchesSearch && matchesStatus;

        });

        tableBody.replaceChildren();

        filtered.forEach(code => {

            const offering = getOffering(code.offeringId);

            const row = document.createElement("tr");

            const actions = code.status === "active"
                ? `
                    <div class="sa-student-code-actions">

                        <button type="button"
                            class="sa-student-code-action"
                            data-action="copy"
                            data-id="${code.id}">
                            <i class="bi bi-copy me-1"></i>
                            Copy
                        </button>

                        <button type="button"
                            class="sa-student-code-action"
                            data-action="regenerate"
                            data-id="${code.id}">
                            <i class="bi bi-arrow-repeat me-1"></i>
                            Regenerate
                        </button>

                        <button type="button"
                            class="sa-student-code-action danger"
                            data-action="revoke"
                            data-id="${code.id}">
                            Revoke
                        </button>

                    </div>
                `
                : `
                    <span class="text-secondary small">
                        Historical record
                    </span>
                `;

            row.innerHTML = `
                <td>
                    <div class="sa-student-code-offering">
                        <strong>${escapeSchoolAdminHTML(offering.subject)}</strong>
                        <span>${escapeSchoolAdminHTML(offering.grade)} - ${escapeSchoolAdminHTML(offering.section)}</span>
                    </div>
                </td>

                <td>
                    <span class="sa-student-code-value">
                        ${escapeSchoolAdminHTML(code.displayCode)}
                    </span>
                </td>

                <td>${escapeSchoolAdminHTML(code.createdAt)}</td>

                <td>${escapeSchoolAdminHTML(code.expiresAt)}</td>

                <td>
                    <span class="status-pill ${statusClass(code.status)}">
                        ${statusLabel(code.status)}
                    </span>
                </td>

                <td class="text-end">
                    ${actions}
                </td>
            `;

            tableBody.appendChild(row);

        });

        if (emptyState) {
            emptyState.hidden = filtered.length !== 0;
        }

        if (resultCount) {
            resultCount.textContent =
                `${filtered.length} code record(s) displayed`;
        }

        updateSummary();

    }

    function createDemoCode() {

        const randomPart = Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();

        return "DEMO-" + randomPart;

    }

    function openCreateModal() {

        lastModalTrigger = document.activeElement;

        form.reset();

        if (modalMessage) {
            modalMessage.textContent = "";
        }

        populateOfferingOptions();

        modal.show();

    }

    function createCode(event) {

        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const offeringId = Number(offeringSelect.value);
        const offering = getOffering(offeringId);

        if (!offering || offering.status !== "active") {

            modalMessage.textContent =
                "Please select a valid active Subject Offering.";

            return;

        }

        if (getActiveCode(offeringId)) {

            modalMessage.textContent =
                "An active Student Join Code already exists for this exact Subject Offering. Regenerate the existing code instead.";

            return;

        }

        const nextId = Math.max(
            0,
            ...codes.map(item => item.id)
        ) + 1;

        const newCode = {
            id: nextId,
            offeringId,
            displayCode: createDemoCode(),
            status: "active",
            createdAt: new Date().toISOString().slice(0, 10),
            expiresAt: "Not configured"
        };

        codes.push(newCode);

        modal.hide();

        showMessage(
            "Demo only: A fictional code was generated in temporary browser memory. It is not a real Student Join Code and cannot enroll a Student."
        );

        renderTable();

    }

    function handleTableAction(event) {

        const button = event.target.closest("[data-action]");

        if (!button) return;

        const action = button.dataset.action;
        const id = Number(button.dataset.id);

        const record = codes.find(
            item => item.id === id
        );

        if (!record) return;

        if (record.status !== "active") return;

        if (action === "copy") {

            if (navigator.clipboard && window.isSecureContext) {

                navigator.clipboard.writeText(record.displayCode)
                    .then(() => {

                        showMessage(
                            "Demo code copied. Remember, it is not a valid production Student Join Code."
                        );

                    })
                    .catch(() => {

                        showMessage(
                            "The browser could not copy this demonstration code. You may select and copy it manually.",
                            "error"
                        );

                    });

            } else {

                showMessage(
                    "Clipboard access is unavailable in this browser context. You may select and copy the demonstration code manually.",
                    "error"
                );

            }

            return;

        }

        if (action === "regenerate") {

            const confirmed = window.confirm(
                "Regenerate this demonstration code? The current code will be revoked and retained in history."
            );

            if (!confirmed) return;

            record.status = "revoked";

            const nextId = Math.max(
                0,
                ...codes.map(item => item.id)
            ) + 1;

            codes.push({
                id: nextId,
                offeringId: record.offeringId,
                displayCode: createDemoCode(),
                status: "active",
                createdAt: new Date().toISOString().slice(0, 10),
                expiresAt: "Not configured"
            });

            showMessage(
                "Demo only: Previous code revoked and a fictional replacement code generated. The previous record remains in history."
            );

            renderTable();

            return;

        }

        if (action === "revoke") {

            const confirmed = window.confirm(
                "Revoke this demonstration Student Join Code? The code will no longer be active in this demo."
            );

            if (!confirmed) return;

            record.status = "revoked";

            showMessage(
                "Demo only: Student Join Code revoked in temporary browser memory. The record remains in history."
            );

            renderTable();

        }

    }

    if (createButton) {
        createButton.addEventListener("click", openCreateModal);
    }

    if (searchInput) {
        searchInput.addEventListener("input", renderTable);
    }

    if (statusFilter) {
        statusFilter.addEventListener("change", renderTable);
    }

    form.addEventListener("submit", createCode);

    tableBody.addEventListener("click", handleTableAction);

    populateOfferingOptions();
    renderTable();

    console.log("Student Subject Code Management initialized.");

}






/* ==========================================
   F9.14 - PARENT SECTION CODE MANAGEMENT
   FRONTEND DEMONSTRATION
   ========================================== */

function initializeParentSectionCodeManagement() {

    const tableBody = document.getElementById("parentCodeTableBody");
    const form = document.getElementById("parentCodeForm");
    const modalElement = document.getElementById("parentCodeModal");

    if (!tableBody || !form || !modalElement) return;

    if (!window.bootstrap) {
        console.error("Bootstrap Modal is unavailable on Parent Section Code page.");
        return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    let lastModalTrigger = null;

    configureModalFocusManagement(
        modalElement,
        () => lastModalTrigger
    );

    const sectionSelect = document.getElementById("parentCodeSection");
    const searchInput = document.getElementById("parentCodeSearch");
    const statusFilter = document.getElementById("parentCodeStatusFilter");

    const modalMessage = document.getElementById("parentCodeModalMessage");
    const pageMessage = document.getElementById("parentCodeMessage");

    const createButton = document.getElementById("createParentCodeButton");

    const totalCount = document.getElementById("parentCodeTotalCount");
    const activeCount = document.getElementById("parentCodeActiveCount");
    const revokedCount = document.getElementById("parentCodeRevokedCount");
    const historicalCount = document.getElementById("parentCodeHistoricalCount");

    const resultCount = document.getElementById("parentCodeResultCount");
    const emptyState = document.getElementById("parentCodeEmptyState");

    /*
     * SAMPLE SCHOOL ACADEMIC STRUCTURE.
     * Replace with authorized Backend data during integration.
     */

    const sections = [
        { id: 1, grade: "Grade 7", name: "Section A", status: "active" },
        { id: 2, grade: "Grade 7", name: "Section B", status: "active" },
        { id: 3, grade: "Grade 8", name: "Section A", status: "active" },
        { id: 4, grade: "Grade 8", name: "Section B", status: "active" },
        { id: 5, grade: "Grade 9", name: "Section A", status: "active" },
        { id: 6, grade: "Grade 10", name: "Section A", status: "active" }
    ];

    /*
     * FICTIONAL CODE HISTORY.
     * No real Guardian access can be obtained using these values.
     */

    let codes = [
        {
            id: 1,
            sectionId: 1,
            displayCode: "DEMO-PARENT-7A",
            status: "active",
            createdAt: "2026-11-10",
            expiresAt: "Not configured"
        },
        {
            id: 2,
            sectionId: 2,
            displayCode: "DEMO-PARENT-7B",
            status: "active",
            createdAt: "2026-11-10",
            expiresAt: "Not configured"
        },
        {
            id: 3,
            sectionId: 3,
            displayCode: "DEMO-PARENT-8A-OLD",
            status: "revoked",
            createdAt: "2026-10-15",
            expiresAt: "Not configured"
        },
        {
            id: 4,
            sectionId: 3,
            displayCode: "DEMO-PARENT-8A-NEW",
            status: "active",
            createdAt: "2026-11-12",
            expiresAt: "Not configured"
        },
        {
            id: 5,
            sectionId: 5,
            displayCode: "DEMO-PARENT-9A",
            status: "active",
            createdAt: "2026-11-12",
            expiresAt: "Not configured"
        }
    ];

    /*
     * SAMPLE CONNECTION REQUEST COUNTS.
     * These are separate from code records and do not grant access.
     */

    const connectionRequests = [
        { id: 1, sectionId: 1, status: "pending" },
        { id: 2, sectionId: 1, status: "verified" },
        { id: 3, sectionId: 2, status: "pending" },
        { id: 4, sectionId: 3, status: "referred" },
        { id: 5, sectionId: 5, status: "verified" }
    ];

    function getSection(id) {

        return sections.find(
            item => item.id === Number(id)
        );

    }

    function getActiveCode(sectionId) {

        return codes.find(item =>
            item.sectionId === Number(sectionId) &&
            item.status === "active"
        );

    }

    function showMessage(text, type = "success") {

        if (!pageMessage) return;

        pageMessage.className =
            "sa-parent-code-message " + type + " show";

        pageMessage.textContent = text;

    }

    function updateSummary() {

        const active = codes.filter(
            item => item.status === "active"
        ).length;

        const revoked = codes.filter(
            item => item.status === "revoked"
        ).length;

        const historical = revoked;

        if (totalCount) totalCount.textContent = codes.length;
        if (activeCount) activeCount.textContent = active;
        if (revokedCount) revokedCount.textContent = revoked;
        if (historicalCount) historicalCount.textContent = historical;

    }

    function getConnectionCount(sectionId, status) {

        return connectionRequests.filter(item =>
            item.sectionId === Number(sectionId) &&
            item.status === status
        ).length;

    }

    function populateSectionOptions() {

        sectionSelect.innerHTML =
            '<option value="">Select Section</option>';

        sections
            .filter(item => item.status === "active")
            .forEach(section => {

                const option = document.createElement("option");

                option.value = section.id;

                option.textContent =
                    `${section.grade} - ${section.name}`;

                const existing = getActiveCode(section.id);

                option.disabled = Boolean(existing);

                if (existing) {
                    option.textContent += " (Active code already exists)";
                }

                sectionSelect.appendChild(option);

            });

    }

    function renderTable() {

        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedStatus = statusFilter
            ? statusFilter.value
            : "all";

        const filtered = codes.filter(code => {

            const section = getSection(code.sectionId);

            if (!section) return false;

            const matchesSearch =
                section.grade.toLowerCase().includes(query) ||
                section.name.toLowerCase().includes(query) ||
                code.displayCode.toLowerCase().includes(query);

            const matchesStatus =
                selectedStatus === "all" ||
                code.status === selectedStatus;

            return matchesSearch && matchesStatus;

        });

        tableBody.replaceChildren();

        filtered.forEach(code => {

            const section = getSection(code.sectionId);

            const row = document.createElement("tr");

            const pendingRequests =
                getConnectionCount(section.id, "pending");

            const referredRequests =
                getConnectionCount(section.id, "referred");

            const actions = code.status === "active"
                ? `
                    <div class="sa-parent-code-actions">

                        <button type="button"
                            class="sa-parent-code-action"
                            data-action="copy"
                            data-id="${code.id}">
                            <i class="bi bi-copy me-1"></i>
                            Copy
                        </button>

                        <button type="button"
                            class="sa-parent-code-action"
                            data-action="regenerate"
                            data-id="${code.id}">
                            <i class="bi bi-arrow-repeat me-1"></i>
                            Regenerate
                        </button>

                        <button type="button"
                            class="sa-parent-code-action danger"
                            data-action="revoke"
                            data-id="${code.id}">
                            Revoke
                        </button>

                    </div>
                `
                : '<span class="text-secondary small">Historical record</span>';

            row.innerHTML = `
                <td>
                    <div class="sa-parent-code-section-info">
                        <strong>${escapeSchoolAdminHTML(section.grade)} - ${escapeSchoolAdminHTML(section.name)}</strong>
                        <span>Section ID: ${section.id}</span>
                    </div>
                </td>

                <td>
                    <span class="sa-parent-code-value">
                        ${escapeSchoolAdminHTML(code.displayCode)}
                    </span>
                </td>

                <td>${escapeSchoolAdminHTML(code.createdAt)}</td>

                <td>${escapeSchoolAdminHTML(code.expiresAt)}</td>

                <td>
                    <span class="status-pill ${code.status === "active" ? "status-success" : "status-info"}">
                        ${code.status === "active" ? "Active" : "Revoked"}
                    </span>
                </td>

                <td>
                    <span class="small">
                        ${pendingRequests} pending
                        <br>
                        ${referredRequests} referred
                    </span>
                </td>

                <td class="text-end">
                    ${actions}
                </td>
            `;

            tableBody.appendChild(row);

        });

        if (emptyState) {
            emptyState.hidden = filtered.length !== 0;
        }

        if (resultCount) {
            resultCount.textContent =
                `${filtered.length} code record(s) displayed`;
        }

        updateSummary();

    }

    function createDemoCode() {

        const randomPart = Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();

        return "DEMO-PARENT-" + randomPart;

    }

    function openCreateModal() {

        lastModalTrigger = document.activeElement;

        form.reset();

        if (modalMessage) {
            modalMessage.textContent = "";
        }

        populateSectionOptions();

        modal.show();

    }

    function createCode(event) {

        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const sectionId = Number(sectionSelect.value);
        const section = getSection(sectionId);

        if (!section || section.status !== "active") {

            modalMessage.textContent =
                "Please select a valid active Section.";

            return;

        }

        if (getActiveCode(sectionId)) {

            modalMessage.textContent =
                "An active Parent Section Code already exists for this Section. Regenerate the existing code instead.";

            return;

        }

        const nextId = Math.max(
            0,
            ...codes.map(item => item.id)
        ) + 1;

        codes.push({
            id: nextId,
            sectionId,
            displayCode: createDemoCode(),
            status: "active",
            createdAt: new Date().toISOString().slice(0, 10),
            expiresAt: "Not configured"
        });

        modal.hide();

        showMessage(
            "Demo only: A fictional Parent Section Code was generated. It cannot establish a real Guardian connection."
        );

        renderTable();

    }

    function handleTableAction(event) {

        const button = event.target.closest("[data-action]");

        if (!button) return;

        const action = button.dataset.action;
        const id = Number(button.dataset.id);

        const record = codes.find(
            item => item.id === id
        );

        if (!record || record.status !== "active") return;

        if (action === "copy") {

            if (navigator.clipboard && window.isSecureContext) {

                navigator.clipboard.writeText(record.displayCode)
                    .then(() => {

                        showMessage(
                            "Demo code copied. It cannot establish a real Guardian connection."
                        );

                    })
                    .catch(() => {

                        showMessage(
                            "Clipboard access failed. You may select and copy the demonstration code manually.",
                            "error"
                        );

                    });

            } else {

                showMessage(
                    "Clipboard access is unavailable. You may select and copy the demonstration code manually.",
                    "error"
                );

            }

            return;

        }

        if (action === "regenerate") {

            const confirmed = window.confirm(
                "Regenerate this Parent Section Code? The previous code will be revoked and retained in history."
            );

            if (!confirmed) return;

            record.status = "revoked";

            const nextId = Math.max(
                0,
                ...codes.map(item => item.id)
            ) + 1;

            codes.push({
                id: nextId,
                sectionId: record.sectionId,
                displayCode: createDemoCode(),
                status: "active",
                createdAt: new Date().toISOString().slice(0, 10),
                expiresAt: "Not configured"
            });

            showMessage(
                "Demo only: Previous code revoked and a fictional replacement code generated. Previous history is preserved."
            );

            renderTable();

            return;

        }

        if (action === "revoke") {

            const confirmed = window.confirm(
                "Revoke this Parent Section Code? The previous record will remain in history."
            );

            if (!confirmed) return;

            record.status = "revoked";

            showMessage(
                "Demo only: Parent Section Code revoked in temporary browser memory."
            );

            renderTable();

        }

    }

    if (createButton) {
        createButton.addEventListener("click", openCreateModal);
    }

    if (searchInput) {
        searchInput.addEventListener("input", renderTable);
    }

    if (statusFilter) {
        statusFilter.addEventListener("change", renderTable);
    }

    form.addEventListener("submit", createCode);

    tableBody.addEventListener("click", handleTableAction);

    populateSectionOptions();
    renderTable();

    console.log("Parent Section Code Management initialized.");

}







/* ==========================================
   F9.15 - REFERRED GUARDIAN REQUEST REVIEW
   FRONTEND DEMONSTRATION
   ========================================== */

function initializeReferredGuardianRequests() {

    const tableBody = document.getElementById("guardianRequestTableBody");
    const reviewModalElement = document.getElementById("guardianReviewModal");
    const decisionModalElement = document.getElementById("guardianDecisionModal");

    if (!tableBody || !reviewModalElement || !decisionModalElement) return;

    if (!window.bootstrap) {
        console.error("Bootstrap Modal is unavailable on Guardian Request page.");
        return;
    }

    const reviewModal = bootstrap.Modal.getOrCreateInstance(reviewModalElement);
    const decisionModal = bootstrap.Modal.getOrCreateInstance(decisionModalElement);

    let lastReviewTrigger = null;
    let lastDecisionTrigger = null;
    let selectedRequestId = null;
    let selectedDecision = null;

    configureModalFocusManagement(
        reviewModalElement,
        () => lastReviewTrigger
    );

    configureModalFocusManagement(
        decisionModalElement,
        () => lastDecisionTrigger
    );

    const searchInput = document.getElementById("guardianRequestSearch");
    const statusFilter = document.getElementById("guardianRequestStatusFilter");
    const gradeFilter = document.getElementById("guardianRequestGradeFilter");

    const message = document.getElementById("guardianRequestMessage");

    const totalCount = document.getElementById("guardianRequestTotalCount");
    const pendingCount = document.getElementById("guardianRequestPendingCount");
    const approvedCount = document.getElementById("guardianRequestApprovedCount");
    const rejectedCount = document.getElementById("guardianRequestRejectedCount");

    const resultCount = document.getElementById("guardianRequestResultCount");
    const emptyState = document.getElementById("guardianRequestEmptyState");

    const reviewGuardian = document.getElementById("reviewGuardianName");
    const reviewEmail = document.getElementById("reviewGuardianEmail");
    const reviewStudent = document.getElementById("reviewStudentName");
    const reviewPlacement = document.getElementById("reviewStudentPlacement");
    const reviewReference = document.getElementById("reviewPlacementReference");
    const reviewReason = document.getElementById("reviewReferralReason");
    const reviewTeacher = document.getElementById("reviewReferringTeacher");
    const reviewDate = document.getElementById("reviewReferralDate");
    const reviewHistory = document.getElementById("reviewGuardianHistory");

    const decisionTitle = document.getElementById("guardianDecisionTitle");
    const decisionDescription = document.getElementById("guardianDecisionDescription");
    const decisionReason = document.getElementById("guardianDecisionReason");
    const decisionMessage = document.getElementById("guardianDecisionMessage");
    const confirmDecisionButton = document.getElementById("confirmGuardianDecision");

    /*
     * SAMPLE DATA ONLY.
     * These records are fictional and do not represent actual people.
     *
     * sectionEnrollmentId is the canonical placement reference.
     * Every request has its own exact Student/Section relationship.
     */

    const students = [
        { id: 201, name: "Alex Santos", reference: "STU-001" },
        { id: 202, name: "Bea Reyes", reference: "STU-002" },
        { id: 203, name: "Carlo Cruz", reference: "STU-003" },
        { id: 204, name: "Diana Garcia", reference: "STU-004" }
    ];

    const sections = [
        { id: 1, grade: "Grade 7", name: "Section A", schoolId: 1 },
        { id: 2, grade: "Grade 7", name: "Section B", schoolId: 1 },
        { id: 3, grade: "Grade 8", name: "Section A", schoolId: 1 }
    ];

    const placements = [
        { id: 501, studentId: 201, sectionId: 1, schoolId: 1, status: "active" },
        { id: 502, studentId: 202, sectionId: 1, schoolId: 1, status: "active" },
        { id: 503, studentId: 203, sectionId: 2, schoolId: 1, status: "active" },
        { id: 504, studentId: 204, sectionId: 3, schoolId: 1, status: "active" }
    ];

    /*
     * Status vocabulary used by this demonstration:
     * referred, approved, rejected.
     * Production vocabulary/transitions must match the Backend contract.
     */

    let requests = [
        {
            id: 1,
            guardianName: "Patricia Santos",
            guardianEmail: "patricia.santos@example.com",
            studentId: 201,
            sectionEnrollmentId: 501,
            sectionId: 1,
            schoolId: 1,
            status: "referred",
            referralReason: "The submitted Guardian details require additional verification against the school's official records.",
            referringTeacher: "Maria Santos",
            referralDate: "2026-11-15",
            decisionReason: "",
            history: [
                {
                    action: "Request submitted",
                    actor: "Guardian",
                    date: "2026-11-12",
                    note: "Initial connection request received."
                },
                {
                    action: "Referred for further review",
                    actor: "Maria Santos",
                    date: "2026-11-15",
                    note: "Additional verification required."
                }
            ]
        },
        {
            id: 2,
            guardianName: "Roberto Reyes",
            guardianEmail: "roberto.reyes@example.com",
            studentId: 202,
            sectionEnrollmentId: 502,
            sectionId: 1,
            schoolId: 1,
            status: "referred",
            referralReason: "The Teacher could not conclusively match the submitted relationship information.",
            referringTeacher: "Maria Santos",
            referralDate: "2026-11-16",
            decisionReason: "",
            history: [
                {
                    action: "Request submitted",
                    actor: "Guardian",
                    date: "2026-11-14",
                    note: "Initial connection request received."
                },
                {
                    action: "Referred for further review",
                    actor: "Maria Santos",
                    date: "2026-11-16",
                    note: "Relationship information needs further checking."
                }
            ]
        },
        {
            id: 3,
            guardianName: "Elena Cruz",
            guardianEmail: "elena.cruz@example.com",
            studentId: 203,
            sectionEnrollmentId: 503,
            sectionId: 2,
            schoolId: 1,
            status: "approved",
            referralReason: "Sample previously referred request.",
            referringTeacher: "Juan Reyes",
            referralDate: "2026-11-08",
            decisionReason: "Sample verification completed against official school records.",
            history: [
                {
                    action: "Request submitted",
                    actor: "Guardian",
                    date: "2026-11-05",
                    note: "Initial connection request received."
                },
                {
                    action: "Referred for further review",
                    actor: "Juan Reyes",
                    date: "2026-11-08",
                    note: "Additional review required."
                },
                {
                    action: "Approved",
                    actor: "School Administrator",
                    date: "2026-11-10",
                    note: "Sample verification completed."
                }
            ]
        }
    ];

    function getStudent(id) {
        return students.find(item => item.id === Number(id));
    }

    function getSection(id) {
        return sections.find(item => item.id === Number(id));
    }

    function getPlacement(id) {
        return placements.find(item => item.id === Number(id));
    }

    function getRequest(id) {
        return requests.find(item => item.id === Number(id));
    }

    function getRequestDetails(request) {

        const student = getStudent(request.studentId);
        const placement = getPlacement(request.sectionEnrollmentId);
        const section = getSection(request.sectionId);

        if (!student || !placement || !section) return null;

        /*
         * Validate exact placement, Student, Section and School consistency.
         */

        if (
            placement.studentId !== request.studentId ||
            placement.sectionId !== request.sectionId ||
            placement.schoolId !== request.schoolId ||
            section.schoolId !== request.schoolId
        ) {
            return null;
        }

        return { student, placement, section };

    }

    function initials(name) {

        return name.split(" ")
            .map(part => part.charAt(0))
            .slice(0, 2)
            .join("")
            .toUpperCase();

    }

    function showMessage(text, type = "success") {

        if (!message) return;

        message.className =
            "sa-guardian-message " + type + " show";

        message.textContent = text;

    }

    function updateSummary() {

        const referred = requests.filter(
            item => item.status === "referred"
        ).length;

        const approved = requests.filter(
            item => item.status === "approved"
        ).length;

        const rejected = requests.filter(
            item => item.status === "rejected"
        ).length;

        if (totalCount) totalCount.textContent = requests.length;
        if (pendingCount) pendingCount.textContent = referred;
        if (approvedCount) approvedCount.textContent = approved;
        if (rejectedCount) rejectedCount.textContent = rejected;

    }

    function populateGradeFilter() {

        if (!gradeFilter) return;

        sections.forEach(section => {

            const exists = Array.from(gradeFilter.options).some(
                option => option.value === section.grade
            );

            if (exists) return;

            const option = document.createElement("option");

            option.value = section.grade;
            option.textContent = section.grade;

            gradeFilter.appendChild(option);

        });

    }

    function renderTable() {

        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedStatus = statusFilter
            ? statusFilter.value
            : "all";

        const selectedGrade = gradeFilter
            ? gradeFilter.value
            : "all";

        const filtered = requests.filter(request => {

            const details = getRequestDetails(request);

            if (!details) return false;

            const matchesSearch =
                request.guardianName.toLowerCase().includes(query) ||
                request.guardianEmail.toLowerCase().includes(query) ||
                details.student.name.toLowerCase().includes(query) ||
                details.section.name.toLowerCase().includes(query) ||
                details.student.reference.toLowerCase().includes(query);

            const matchesStatus =
                selectedStatus === "all" ||
                request.status === selectedStatus;

            const matchesGrade =
                selectedGrade === "all" ||
                details.section.grade === selectedGrade;

            return matchesSearch && matchesStatus && matchesGrade;

        });

        tableBody.replaceChildren();

        filtered.forEach(request => {

            const details = getRequestDetails(request);

            const row = document.createElement("tr");

            const statusClass = {
                referred: "status-warning",
                approved: "status-success",
                rejected: "status-info"
            }[request.status] || "status-info";

            const actions = request.status === "referred"
                ? `
                    <div class="sa-guardian-actions">

                        <button type="button"
                            class="sa-guardian-action"
                            data-action="review"
                            data-id="${request.id}">
                            Review
                        </button>

                        <button type="button"
                            class="sa-guardian-action approve"
                            data-action="approve"
                            data-id="${request.id}">
                            Approve
                        </button>

                        <button type="button"
                            class="sa-guardian-action reject"
                            data-action="reject"
                            data-id="${request.id}">
                            Reject
                        </button>

                    </div>
                `
                : `
                    <button type="button"
                        class="sa-guardian-action"
                        data-action="review"
                        data-id="${request.id}">
                        View History
                    </button>
                `;

            row.innerHTML = `
                <td>
                    <div class="sa-guardian-person">
                        <div class="sa-guardian-avatar">
                            ${escapeSchoolAdminHTML(initials(request.guardianName))}
                        </div>
                        <div>
                            <strong>${escapeSchoolAdminHTML(request.guardianName)}</strong>
                            <span>${escapeSchoolAdminHTML(request.guardianEmail)}</span>
                        </div>
                    </div>
                </td>

                <td>
                    <strong>${escapeSchoolAdminHTML(details.student.name)}</strong>
                    <div class="text-secondary small">
                        ${escapeSchoolAdminHTML(details.student.reference)}
                    </div>
                </td>

                <td>
                    ${escapeSchoolAdminHTML(details.section.grade)}
                    <div class="text-secondary small">
                        ${escapeSchoolAdminHTML(details.section.name)}
                    </div>
                </td>

                <td>${escapeSchoolAdminHTML(request.referralDate)}</td>

                <td>
                    <span class="status-pill ${statusClass}">
                        ${escapeSchoolAdminHTML(request.status.charAt(0).toUpperCase() + request.status.slice(1))}
                    </span>
                </td>

                <td class="text-end">
                    ${actions}
                </td>
            `;

            tableBody.appendChild(row);

        });

        if (emptyState) {
            emptyState.hidden = filtered.length !== 0;
        }

        if (resultCount) {
            resultCount.textContent =
                `${filtered.length} Guardian request(s) displayed`;
        }

        updateSummary();

    }

    function renderHistory(request) {

        reviewHistory.replaceChildren();

        request.history.forEach(item => {

            const entry = document.createElement("div");

            entry.className = "sa-guardian-history-item";

            const title = document.createElement("strong");
            title.textContent = item.action;

            const detail = document.createElement("span");

            detail.textContent =
                `${item.actor} · ${item.date}\n${item.note}`;

            entry.appendChild(title);
            entry.appendChild(detail);

            reviewHistory.appendChild(entry);

        });

    }

    function openReview(requestId, trigger) {

        const request = getRequest(requestId);

        if (!request) return;

        const details = getRequestDetails(request);

        if (!details) {

            showMessage(
                "This request has an inconsistent Student, placement, Section or School reference. It cannot be reviewed in this demonstration.",
                "error"
            );

            return;

        }

        lastReviewTrigger = trigger || document.activeElement;

        reviewGuardian.textContent = request.guardianName;
        reviewEmail.textContent = request.guardianEmail;
        reviewStudent.textContent =
            `${details.student.name} (${details.student.reference})`;

        reviewPlacement.textContent =
            `${details.section.grade} - ${details.section.name}`;

        reviewReference.textContent =
            `Placement ID: ${details.placement.id}`;

        reviewReason.textContent = request.referralReason;
        reviewTeacher.textContent = request.referringTeacher;
        reviewDate.textContent = request.referralDate;

        renderHistory(request);

        reviewModal.show();

    }

    function openDecision(requestId, decision, trigger) {

        const request = getRequest(requestId);

        if (!request || request.status !== "referred") return;

        const details = getRequestDetails(request);

        if (!details) {

            showMessage(
                "The exact Student Section Placement could not be verified. Decision unavailable.",
                "error"
            );

            return;

        }

        selectedRequestId = requestId;
        selectedDecision = decision;
        lastDecisionTrigger = trigger || document.activeElement;

        decisionReason.value = "";
        decisionMessage.textContent = "";

        if (decision === "approve") {

            decisionTitle.textContent = "Approve Guardian Connection";
            decisionDescription.textContent =
                `Approve the specific connection between ${request.guardianName} and ${details.student.name} for ${details.section.grade} - ${details.section.name}?`;

            confirmDecisionButton.textContent = "Confirm Approval";
            confirmDecisionButton.className = "btn-ga btn-ga-primary";

        } else {

            decisionTitle.textContent = "Reject Guardian Connection";
            decisionDescription.textContent =
                `Reject the connection request from ${request.guardianName} for ${details.student.name}?`;

            confirmDecisionButton.textContent = "Confirm Rejection";
            confirmDecisionButton.className = "btn-ga btn-ga-outline";

        }

        decisionModal.show();

    }

    function confirmDecision() {

        const request = getRequest(selectedRequestId);

        if (!request || request.status !== "referred") {

            decisionMessage.textContent =
                "This request is no longer awaiting review.";

            return;

        }

        const details = getRequestDetails(request);

        if (!details || details.placement.status !== "active") {

            decisionMessage.textContent =
                "The exact official Student Section Placement is not active or could not be verified. No decision was recorded.";

            return;

        }

        const reason = decisionReason.value.trim();

        if (!reason) {

            decisionMessage.textContent =
                "Enter a reason for the decision. This will be preserved in the demonstration history.";

            decisionReason.focus();

            return;

        }

        const today = new Date().toISOString().slice(0, 10);

        request.status = selectedDecision === "approve"
            ? "approved"
            : "rejected";

        request.decisionReason = reason;

        request.history.push({

            action: selectedDecision === "approve"
                ? "Approved"
                : "Rejected",

            actor: "School Administrator / Authorized Registrar",

            date: today,

            note: reason

        });

        decisionModal.hide();

        showMessage(
            selectedDecision === "approve"
                ? "Demo only: The specific Guardian connection request was marked Approved. No real Guardian access or database relationship was created."
                : "Demo only: The specific Guardian connection request was marked Rejected. The decision reason remains in history."
        );

        renderTable();

    }

    tableBody.addEventListener("click", event => {

        const button = event.target.closest("[data-action]");

        if (!button) return;

        const id = Number(button.dataset.id);
        const action = button.dataset.action;

        if (action === "review") {
            openReview(id, button);
        }

        if (action === "approve") {
            openDecision(id, "approve", button);
        }

        if (action === "reject") {
            openDecision(id, "reject", button);
        }

    });

    if (searchInput) {
        searchInput.addEventListener("input", renderTable);
    }

    if (statusFilter) {
        statusFilter.addEventListener("change", renderTable);
    }

    if (gradeFilter) {
        gradeFilter.addEventListener("change", renderTable);
    }

    if (confirmDecisionButton) {
        confirmDecisionButton.addEventListener("click", confirmDecision);
    }

    populateGradeFilter();
    renderTable();

    console.log("Referred Guardian Request Review initialized.");

}







/* ==========================================
   F9.16 - SCHOOL ANNOUNCEMENT MANAGEMENT
   FRONTEND DEMONSTRATION
   ========================================== */

function initializeSchoolAnnouncementManagement() {

    const tableBody = document.getElementById("schoolAnnouncementTableBody");
    const form = document.getElementById("schoolAnnouncementForm");
    const modalElement = document.getElementById("schoolAnnouncementModal");

    if (!tableBody || !form || !modalElement) return;

    if (!window.bootstrap) {
        console.error("Bootstrap Modal is unavailable on School Announcement page.");
        return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    let lastModalTrigger = null;
    let editingAnnouncementId = null;
    let editingVersionId = null;

    configureModalFocusManagement(
        modalElement,
        () => lastModalTrigger
    );

    const titleInput = document.getElementById("schoolAnnouncementTitle");
    const contentInput = document.getElementById("schoolAnnouncementContent");
    const scheduleInput = document.getElementById("schoolAnnouncementSchedule");
    const changeTypeInput = document.getElementById("schoolAnnouncementChangeType");
    const statusFilter = document.getElementById("schoolAnnouncementStatusFilter");
    const searchInput = document.getElementById("schoolAnnouncementSearch");

    const message = document.getElementById("schoolAnnouncementMessage");
    const modalMessage = document.getElementById("schoolAnnouncementModalMessage");

    const createButton = document.getElementById("createSchoolAnnouncementButton");

    const totalCount = document.getElementById("schoolAnnouncementTotalCount");
    const publishedCount = document.getElementById("schoolAnnouncementPublishedCount");
    const draftCount = document.getElementById("schoolAnnouncementDraftCount");
    const scheduledCount = document.getElementById("schoolAnnouncementScheduledCount");

    const resultCount = document.getElementById("schoolAnnouncementResultCount");
    const emptyState = document.getElementById("schoolAnnouncementEmptyState");

    const saveDraftButton = document.getElementById("saveSchoolAnnouncementDraft");
    const publishButton = document.getElementById("publishSchoolAnnouncement");
    const scheduleButton = document.getElementById("scheduleSchoolAnnouncement");

    const versionModalElement = document.getElementById("announcementVersionModal");
    const versionModal = bootstrap.Modal.getOrCreateInstance(versionModalElement);
    const versionHistory = document.getElementById("announcementVersionHistory");
    const versionModalTitle = document.getElementById("announcementVersionModalTitle");

    const readSummary = document.getElementById("announcementReadSummary");
    const acknowledgmentSummary = document.getElementById("announcementAcknowledgmentSummary");

    /*
     * Audience scopes are proposed sample scopes.
     * Actual scope authorization must be enforced by the Backend.
     */

    const audienceCheckboxes = Array.from(
        form.querySelectorAll("[name='announcementAudience']")
    );

    /*
     * SAMPLE ANNOUNCEMENT DATA.
     * All data is temporary and fictional.
     */

    let announcements = [
        {
            id: 1,
            currentVersionId: 1,
            status: "published",
            versions: [
                {
                    id: 1,
                    number: 1,
                    title: "Welcome to Academic Year 2026–2027",
                    content: "Welcome to the new academic year. Please review the school calendar and important announcements.",
                    audiences: ["school", "grade7"],
                    status: "published",
                    publishedAt: "2026-11-10",
                    changeType: "initial",
                    reads: 18,
                    acknowledgments: 12
                }
            ]
        },
        {
            id: 2,
            currentVersionId: 2,
            status: "draft",
            versions: [
                {
                    id: 2,
                    number: 1,
                    title: "Upcoming School Activities",
                    content: "Please prepare for the upcoming school activities and review the information from your respective Grade-Level Space.",
                    audiences: ["grade7", "grade8"],
                    status: "draft",
                    publishedAt: "",
                    changeType: "initial",
                    reads: 0,
                    acknowledgments: 0
                }
            ]
        },
        {
            id: 3,
            currentVersionId: 3,
            status: "scheduled",
            versions: [
                {
                    id: 3,
                    number: 1,
                    title: "Quarterly Examination Reminder",
                    content: "Please check the examination schedule and prepare the required materials.",
                    audiences: ["school"],
                    status: "scheduled",
                    scheduledAt: "2026-11-25T08:00",
                    publishedAt: "",
                    changeType: "initial",
                    reads: 0,
                    acknowledgments: 0
                }
            ]
        }
    ];

    function getCurrentVersion(announcement) {

        return announcement.versions.find(
            version => version.id === announcement.currentVersionId
        );

    }

    function getAnnouncement(id) {

        return announcements.find(
            item => item.id === Number(id)
        );

    }

    function getSelectedAudiences() {

        return audienceCheckboxes
            .filter(input => input.checked)
            .map(input => input.value);

    }

    function audienceLabel(value) {

        const labels = {
            school: "Whole School",
            grade7: "Grade 7",
            grade8: "Grade 8",
            grade9: "Grade 9",
            grade10: "Grade 10",
            grade11: "Grade 11",
            grade12: "Grade 12"
        };

        return labels[value] || value;

    }

    function showMessage(text, type = "success") {

        if (!message) return;

        message.className =
            "sa-announcement-message " + type + " show";

        message.textContent = text;

    }

    function updateSummary() {

        const published = announcements.filter(
            item => item.status === "published"
        ).length;

        const drafts = announcements.filter(
            item => item.status === "draft"
        ).length;

        const scheduled = announcements.filter(
            item => item.status === "scheduled"
        ).length;

        if (totalCount) totalCount.textContent = announcements.length;
        if (publishedCount) publishedCount.textContent = published;
        if (draftCount) draftCount.textContent = drafts;
        if (scheduledCount) scheduledCount.textContent = scheduled;

    }

    function statusLabel(status) {

        const labels = {
            draft: "Draft",
            scheduled: "Scheduled",
            published: "Published",
            withdrawn: "Withdrawn"
        };

        return labels[status] || status;

    }

    function statusClass(status) {

        const classes = {
            draft: "status-info",
            scheduled: "status-warning",
            published: "status-success",
            withdrawn: "status-info"
        };

        return classes[status] || "status-info";

    }

    function renderTable() {

        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedStatus = statusFilter
            ? statusFilter.value
            : "all";

        const filtered = announcements.filter(announcement => {

            const version = getCurrentVersion(announcement);

            if (!version) return false;

            const audienceText = version.audiences
                .map(audienceLabel)
                .join(" ");

            const matchesSearch =
                version.title.toLowerCase().includes(query) ||
                version.content.toLowerCase().includes(query) ||
                audienceText.toLowerCase().includes(query);

            const matchesStatus =
                selectedStatus === "all" ||
                announcement.status === selectedStatus;

            return matchesSearch && matchesStatus;

        });

        tableBody.replaceChildren();

        filtered.forEach(announcement => {

            const version = getCurrentVersion(announcement);

            const row = document.createElement("tr");

            const audienceHTML = version.audiences
                .map(item =>
                    `<span class="sa-announcement-audience">${escapeSchoolAdminHTML(audienceLabel(item))}</span>`
                )
                .join("");

            const actions = announcement.status === "draft"
                ? `
                    <button type="button"
                        class="sa-announcement-action"
                        data-action="edit"
                        data-id="${announcement.id}">
                        Edit
                    </button>

                    <button type="button"
                        class="sa-announcement-action"
                        data-action="publish"
                        data-id="${announcement.id}">
                        Publish
                    </button>
                `
                : announcement.status === "scheduled"
                ? `
                    <button type="button"
                        class="sa-announcement-action"
                        data-action="edit"
                        data-id="${announcement.id}">
                        Edit
                    </button>

                    <button type="button"
                        class="sa-announcement-action danger"
                        data-action="withdraw"
                        data-id="${announcement.id}">
                        Cancel
                    </button>
                `
                : announcement.status === "published"
                ? `
                    <button type="button"
                        class="sa-announcement-action"
                        data-action="edit"
                        data-id="${announcement.id}">
                        New Version
                    </button>

                    <button type="button"
                        class="sa-announcement-action"
                        data-action="history"
                        data-id="${announcement.id}">
                        History
                    </button>

                    <button type="button"
                        class="sa-announcement-action danger"
                        data-action="withdraw"
                        data-id="${announcement.id}">
                        Withdraw
                    </button>
                `
                : `
                    <button type="button"
                        class="sa-announcement-action"
                        data-action="history"
                        data-id="${announcement.id}">
                        History
                    </button>
                `;

            row.innerHTML = `
                <td>
                    <div class="sa-announcement-title-cell">
                        <strong>${escapeSchoolAdminHTML(version.title)}</strong>
                        <span>Announcement #${announcement.id} · Version ${version.number}</span>
                    </div>
                </td>

                <td>
                    <div class="sa-announcement-audiences">
                        ${audienceHTML}
                    </div>
                </td>

                <td>
                    <span class="status-pill ${statusClass(announcement.status)}">
                        ${statusLabel(announcement.status)}
                    </span>
                </td>

                <td>${version.publishedAt || version.scheduledAt || "Not published"}</td>

                <td>${version.reads}</td>

                <td>${version.acknowledgments}</td>

                <td class="text-end">
                    <div class="sa-announcement-actions">
                        ${actions}
                    </div>
                </td>
            `;

            tableBody.appendChild(row);

        });

        if (emptyState) {
            emptyState.hidden = filtered.length !== 0;
        }

        if (resultCount) {
            resultCount.textContent =
                `${filtered.length} announcement(s) displayed`;
        }

        updateSummary();

    }

    function resetForm() {

        form.reset();

        changeTypeInput.value = "material";

        editingAnnouncementId = null;
        editingVersionId = null;

        audienceCheckboxes.forEach(input => {
            input.checked = false;
        });

        if (modalMessage) modalMessage.textContent = "";

        document.getElementById("schoolAnnouncementModalTitle").textContent =
            "Create School Announcement";

        publishButton.hidden = false;
        scheduleButton.hidden = false;

    }

    function openCreateModal() {

        lastModalTrigger = document.activeElement;

        resetForm();

        modal.show();

    }

    function openEditModal(id) {

        const announcement = getAnnouncement(id);

        if (!announcement) return;

        const version = getCurrentVersion(announcement);

        if (!version) return;

        lastModalTrigger = document.activeElement;

        resetForm();

        editingAnnouncementId = announcement.id;
        editingVersionId = version.id;

        titleInput.value = version.title;
        contentInput.value = version.content;

        audienceCheckboxes.forEach(input => {
            input.checked = version.audiences.includes(input.value);
        });

        if (announcement.status === "published") {

            document.getElementById("schoolAnnouncementModalTitle").textContent =
                "Create New Announcement Version";

        } else {

            document.getElementById("schoolAnnouncementModalTitle").textContent =
                "Edit Announcement Draft";

            if (announcement.status === "scheduled") {
                scheduleInput.value = version.scheduledAt || "";
            }

        }

        modal.show();

    }

    function validateForm() {

        if (!form.checkValidity()) {

            form.reportValidity();
            return false;

        }

        if (!getSelectedAudiences().length) {

            if (modalMessage) {
                modalMessage.textContent =
                    "Select at least one authorized audience scope.";
            }

            return false;

        }

        if (!titleInput.value.trim() || !contentInput.value.trim()) {

            if (modalMessage) {
                modalMessage.textContent =
                    "Announcement title and content are required.";
            }

            return false;

        }

        return true;

    }

    function saveAnnouncement(mode) {

        if (!validateForm()) return;

        const audiences = getSelectedAudiences();

        if (mode === "scheduled") {

            if (!scheduleInput.value) {

                if (modalMessage) {
                    modalMessage.textContent =
                        "Select a publication date and time.";
                }

                scheduleInput.focus();
                return;

            }

            const scheduledDate = new Date(scheduleInput.value);

            if (
                Number.isNaN(scheduledDate.getTime()) ||
                scheduledDate <= new Date()
            ) {

                if (modalMessage) {
                    modalMessage.textContent =
                        "Select a valid future publication date and time.";
                }

                return;

            }

        }

        const today = new Date().toISOString().slice(0, 10);

        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        const changeType = changeTypeInput.value;

        if (editingAnnouncementId !== null) {

            const announcement = getAnnouncement(editingAnnouncementId);

            if (!announcement) return;

            const oldVersion = getCurrentVersion(announcement);

            /*
             * Published versions are immutable.
             * Editing creates a new version.
             */

            if (announcement.status === "published") {

                const nextVersionNumber =
                    Math.max(...announcement.versions.map(item => item.number)) + 1;

                const nextVersionId = Math.max(
                    0,
                    ...announcements.flatMap(item =>
                        item.versions.map(version => version.id)
                    )
                ) + 1;

                const version = {
                    id: nextVersionId,
                    number: nextVersionNumber,
                    title,
                    content,
                    audiences,
                    status: mode,
                    publishedAt: mode === "published" ? today : "",
                    scheduledAt: mode === "scheduled" ? scheduleInput.value : "",  
                    changeType,
                    reads: 0,
                    acknowledgments:
                        changeType === "minor"
                            ? oldVersion.acknowledgments
                            : 0

                };

                announcement.versions.push(version);
                announcement.currentVersionId = version.id;
                announcement.status = mode;

            } else {

                oldVersion.title = title;
                oldVersion.content = content;
                oldVersion.audiences = audiences;
                oldVersion.status = mode;
                oldVersion.publishedAt = mode === "published" ? today : "";
                oldVersion.scheduledAt = mode === "scheduled" ? scheduleInput.value : "";

                announcement.status = mode;

            }

        } else {

            const nextAnnouncementId = Math.max(
                0,
                ...announcements.map(item => item.id)
            ) + 1;

            const nextVersionId = Math.max(
                0,
                ...announcements.flatMap(item =>
                    item.versions.map(version => version.id)
                )
            ) + 1;

            const version = {
                id: nextVersionId,
                number: 1,
                title,
                content,
                audiences,
                status: mode,
                publishedAt: mode === "published" ? today : "",
                scheduledAt: mode === "scheduled" ? scheduleInput.value : "",
                changeType: "initial",
                reads: 0,
                acknowledgments: 0
            };

            announcements.push({
                id: nextAnnouncementId,
                currentVersionId: nextVersionId,
                status: mode,
                versions: [version]
            });

        }

        modal.hide();

        showMessage(
            mode === "draft"
                ? "Demo only: Announcement draft saved in temporary browser memory."
                : mode === "scheduled"
                ? "Demo only: Announcement scheduled in temporary browser memory. It is not published or visible to audiences."
                : "Demo only: Announcement published in temporary browser memory. No actual notifications were delivered."
        );

        renderTable();

    }

    function withdrawAnnouncement(id) {

        const announcement = getAnnouncement(id);

        if (!announcement) return;

        if (
            announcement.status !== "published" &&
            announcement.status !== "scheduled"
        ) return;

        const confirmed = window.confirm(
            "Withdraw or cancel this announcement? Its version history will be preserved."
        );

        if (!confirmed) return;

        announcement.status = "withdrawn";

        const version = getCurrentVersion(announcement);

        if (version) {
            version.status = "withdrawn";
        }

        showMessage(
            "Demo only: Announcement withdrawn or scheduled publication cancelled. Historical versions remain preserved."
        );

        renderTable();

    }

    function openVersionHistory(id) {

        const announcement = getAnnouncement(id);

        if (!announcement) return;

        lastModalTrigger = document.activeElement;

        versionModalTitle.textContent =
            `Announcement #${announcement.id} — Version History`;

        versionHistory.replaceChildren();

        announcement.versions.forEach(version => {

            const entry = document.createElement("div");

            entry.className = "sa-announcement-version";

            const heading = document.createElement("strong");

            heading.textContent =
                `Version ${version.number}: ${version.title}`;

            const detail = document.createElement("span");

            detail.textContent =
                `Status: ${version.status} · Audiences: ${version.audiences.map(audienceLabel).join(", ")} · Reads: ${version.reads} · Guardian acknowledgments: ${version.acknowledgments}`;

            entry.appendChild(heading);
            entry.appendChild(detail);

            versionHistory.appendChild(entry);

        });

        const current = getCurrentVersion(announcement);

        if (readSummary) {
            readSummary.textContent =
                current ? current.reads : 0;
        }

        if (acknowledgmentSummary) {
            acknowledgmentSummary.textContent =
                current ? current.acknowledgments : 0;
        }

        versionModal.show();

    }

    function handleTableAction(event) {

        const button = event.target.closest("[data-action]");

        if (!button) return;

        const action = button.dataset.action;
        const id = Number(button.dataset.id);

        if (action === "edit") {
            openEditModal(id);
        }

        if (action === "publish") {
            openEditModal(id);
        }

        if (action === "history") {
            openVersionHistory(id);
        }

        if (action === "withdraw") {
            withdrawAnnouncement(id);
        }

    }

    if (createButton) {
        createButton.addEventListener("click", openCreateModal);
    }

    if (searchInput) {
        searchInput.addEventListener("input", renderTable);
    }

    if (statusFilter) {
        statusFilter.addEventListener("change", renderTable);
    }

    if (saveDraftButton) {
        saveDraftButton.addEventListener("click", () => saveAnnouncement("draft"));
    }

    if (publishButton) {
        publishButton.addEventListener("click", () => saveAnnouncement("published"));
    }

    if (scheduleButton) {
        scheduleButton.addEventListener("click", () => saveAnnouncement("scheduled"));
    }

    tableBody.addEventListener("click", handleTableAction);

    renderTable();

    console.log("School Announcement Management initialized.");

}







/* ==========================================
   F9.17 - SCHOOL ARCHIVE AND RESTORATION
   FRONTEND DEMONSTRATION
   ========================================== */

function initializeSchoolArchiveManagement() {

    const tableBody = document.getElementById("archiveTableBody");

    if (!tableBody) return;

    const searchInput = document.getElementById("archiveSearch");
    const categoryFilter = document.getElementById("archiveCategoryFilter");
    const statusFilter = document.getElementById("archiveStatusFilter");

    const message = document.getElementById("archiveMessage");

    const totalCount = document.getElementById("archiveTotalCount");
    const restorableCount = document.getElementById("archiveRestorableCount");
    const blockedCount = document.getElementById("archiveBlockedCount");
    const restoredCount = document.getElementById("archiveRestoredCount");

    const resultCount = document.getElementById("archiveResultCount");
    const emptyState = document.getElementById("archiveEmptyState");

    const detailModalElement = document.getElementById("archiveDetailModal");
    const detailModal = detailModalElement
        ? bootstrap.Modal.getOrCreateInstance(detailModalElement)
        : null;

    const detailName = document.getElementById("archiveDetailName");
    const detailCategory = document.getElementById("archiveDetailCategory");
    const detailDate = document.getElementById("archiveDetailDate");
    const detailReason = document.getElementById("archiveDetailReason");
    const detailDependency = document.getElementById("archiveDetailDependency");
    const detailStatus = document.getElementById("archiveDetailStatus");

    let lastModalTrigger = null;

    if (detailModalElement) {
        configureModalFocusManagement(
            detailModalElement,
            () => lastModalTrigger
        );
    }

    /*
     * Fictional sample records.
     *
     * Eligibility is demonstration-only. The Backend must
     * perform real dependency and authorization checks.
     */

    let records = [
        {
            id: 1,
            name: "Grade 9 - Pilot Space",
            category: "Grade-Level Space",
            date: "2026-10-15",
            reason: "Academic structure cleanup.",
            status: "archived",
            restorable: true,
            dependency: "No blocking dependency in this demonstration."
        },
        {
            id: 2,
            name: "Grade 8 - Section C",
            category: "Section",
            date: "2026-10-18",
            reason: "Section restructuring.",
            status: "archived",
            restorable: true,
            dependency: "Sample dependencies pass the demonstration check."
        },
        {
            id: 3,
            name: "Science - Grade 7 Section A",
            category: "Subject Offering",
            date: "2026-10-20",
            reason: "Offering no longer required.",
            status: "archived",
            restorable: false,
            dependency: "A simulated conflicting active record blocks restoration."
        },
        {
            id: 4,
            name: "Sample School Announcement",
            category: "Announcement",
            date: "2026-10-22",
            reason: "Information is no longer current.",
            status: "archived",
            restorable: true,
            dependency: "Historical announcement versions remain preserved."
        },
        {
            id: 5,
            name: "English - Grade 8",
            category: "Subject",
            date: "2026-10-25",
            reason: "Catalog cleanup.",
            status: "archived",
            restorable: true,
            dependency: "No blocking dependency in this demonstration."
        }
    ];

    function showMessage(text, type = "success") {

        if (!message) return;

        message.className =
            "sa-archive-message " + type + " show";

        message.textContent = text;

    }

    function updateSummary() {

        const archived = records.filter(
            item => item.status === "archived"
        );

        const restorable = archived.filter(
            item => item.restorable
        ).length;

        const blocked = archived.filter(
            item => !item.restorable
        ).length;

        const restored = records.filter(
            item => item.status === "restored"
        ).length;

        if (totalCount) totalCount.textContent = records.length;
        if (restorableCount) restorableCount.textContent = restorable;
        if (blockedCount) blockedCount.textContent = blocked;
        if (restoredCount) restoredCount.textContent = restored;

    }

    function renderTable() {

        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const category = categoryFilter
            ? categoryFilter.value
            : "all";

        const status = statusFilter
            ? statusFilter.value
            : "all";

        const filtered = records.filter(record => {

            const matchesSearch =
                record.name.toLowerCase().includes(query) ||
                record.category.toLowerCase().includes(query) ||
                record.reason.toLowerCase().includes(query);

            const matchesCategory =
                category === "all" ||
                record.category === category;

            const matchesStatus =
                status === "all" ||
                record.status === status;

            return matchesSearch && matchesCategory && matchesStatus;

        });

        tableBody.replaceChildren();

        filtered.forEach(record => {

            const row = document.createElement("tr");

            const isArchived = record.status === "archived";

            const statusHTML = isArchived
                ? '<span class="status-pill status-info">Archived</span>'
                : '<span class="status-pill status-success">Restored</span>';

            const actionHTML = isArchived
                ? `
                    <div class="sa-archive-actions">

                        <button type="button"
                            class="sa-archive-action"
                            data-action="details"
                            data-id="${record.id}">
                            Details
                        </button>

                        <button type="button"
                            class="sa-archive-action restore"
                            data-action="restore"
                            data-id="${record.id}"
                            ${record.restorable ? "" : "disabled"}>
                            Restore
                        </button>

                    </div>
                `
                : `
                    <button type="button"
                        class="sa-archive-action"
                        data-action="details"
                        data-id="${record.id}">
                        History
                    </button>
                `;

            row.innerHTML = `
                <td>
                    <div class="sa-archive-record">
                        <strong>${escapeSchoolAdminHTML(record.name)}</strong>
                        <span>Record #${record.id}</span>
                    </div>
                </td>

                <td>${escapeSchoolAdminHTML(record.category)}</td>

                <td>${escapeSchoolAdminHTML(record.date)}</td>

                <td>
                    ${statusHTML}
                </td>

                <td>
                    <span class="small">
                        ${record.restorable ? "Eligible in demo" : "Dependency check blocked"}
                    </span>
                </td>

                <td class="text-end">
                    ${actionHTML}
                </td>
            `;

            tableBody.appendChild(row);

        });

        if (emptyState) {
            emptyState.hidden = filtered.length !== 0;
        }

        if (resultCount) {
            resultCount.textContent =
                `${filtered.length} record(s) displayed`;
        }

        updateSummary();

    }

    function openDetails(record, trigger) {

        if (!detailModal) return;

        lastModalTrigger = trigger || document.activeElement;

        detailName.textContent = record.name;
        detailCategory.textContent = record.category;
        detailDate.textContent = record.date;
        detailReason.textContent = record.reason;
        detailDependency.textContent = record.dependency;
        detailStatus.textContent = record.status;

        detailModal.show();

    }

    function restoreRecord(record) {

        if (!record || record.status !== "archived") return;

        if (!record.restorable) {

            showMessage(
                "Restoration blocked: the sample dependency check failed. Resolve the dependency before restoration.",
                "error"
            );

            return;

        }

        const confirmed = window.confirm(
            `Restore "${record.name}"? Its original record identifier and historical information will be preserved.`
        );

        if (!confirmed) return;

        /*
         * Demonstration only.
         * Real restoration must be a protected Backend transaction.
         */

        record.status = "restored";

        showMessage(
            "Demo only: Record marked Restored in temporary browser memory. No database record was changed."
        );

        renderTable();

    }

    tableBody.addEventListener("click", event => {

        const button = event.target.closest("[data-action]");

        if (!button) return;

        const record = records.find(
            item => item.id === Number(button.dataset.id)
        );

        if (!record) return;

        if (button.dataset.action === "details") {
            openDetails(record, button);
        }

        if (button.dataset.action === "restore") {
            restoreRecord(record);
        }

    });

    if (searchInput) {
        searchInput.addEventListener("input", renderTable);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", renderTable);
    }

    if (statusFilter) {
        statusFilter.addEventListener("change", renderTable);
    }

    renderTable();

    console.log("School Archive and Restoration initialized.");

}







/* ==========================================
   F9.19 - WORKSPACE DEACTIVATION REQUEST
   FRONTEND DEMONSTRATION
   ========================================== */

function initializeWorkspaceDeactivationRequest() {

    const form = document.getElementById("deactivationRequestForm");

    if (!form) return;

    const reasonInput = document.getElementById("deactivationReason");
    const confirmation = document.getElementById("deactivationConfirmation");
    const message = document.getElementById("deactivationMessage");
    const tableBody = document.getElementById("deactivationHistoryBody");
    const emptyState = document.getElementById("deactivationEmptyState");

    const totalCount = document.getElementById("deactivationTotalCount");
    const pendingCount = document.getElementById("deactivationPendingCount");
    const completedCount = document.getElementById("deactivationCompletedCount");

    const resultCount = document.getElementById("deactivationResultCount");

    if (
        !reasonInput ||
        !confirmation ||
        !tableBody ||
        !message
    ) {
        console.error("Workspace Deactivation page is missing required elements.");
        return;
    }

    /*
     * FICTIONAL SAMPLE DATA.
     * These statuses are demonstration labels, not a finalized
     * Backend status vocabulary.
     */

    let requests = [
        {
            id: "WDR-DEMO-001",
            schoolName: "San Isidro National High School",
            reason: "Sample historical request for demonstration.",
            submittedAt: "2026-11-10",
            status: "approved",
            decision: "Sample Platform Administrator decision.",
            decidedAt: "2026-11-12"
        },
        {
            id: "WDR-DEMO-002",
            schoolName: "San Isidro National High School",
            reason: "Sample request awaiting Platform Administrator review.",
            submittedAt: "2026-11-16",
            status: "under_review",
            decision: "",
            decidedAt: ""
        }
    ];

    function showMessage(text, type = "success") {

        message.className =
            "sa-deactivation-message " + type + " show";

        message.textContent = text;

    }

    function updateSummary() {

        const pending = requests.filter(item =>
            item.status === "submitted" ||
            item.status === "under_review"
        ).length;

        const completed = requests.filter(item =>
            item.status === "approved" ||
            item.status === "rejected"
        ).length;

        if (totalCount) totalCount.textContent = requests.length;
        if (pendingCount) pendingCount.textContent = pending;
        if (completedCount) completedCount.textContent = completed;

    }

    function getStatusLabel(status) {

        const labels = {
            submitted: "Submitted",
            under_review: "Under Review",
            approved: "Approved",
            rejected: "Rejected",
            returned: "Returned for Clarification"
        };

        return labels[status] || "Unknown";

    }

    function getStatusClass(status) {

        const classes = {
            submitted: "status-warning",
            under_review: "status-warning",
            approved: "status-success",
            rejected: "status-info",
            returned: "status-info"
        };

        return classes[status] || "status-info";

    }

    function renderHistory() {

        tableBody.replaceChildren();

        requests.forEach(request => {

            const row = document.createElement("tr");

            const status = document.createElement("span");
            status.className =
                "status-pill " + getStatusClass(request.status);
            status.textContent = getStatusLabel(request.status);

            const cells = [
                request.id,
                request.submittedAt,
                request.reason,
                request.status,
                request.decidedAt || "Awaiting decision"
            ];

            cells.forEach((value, index) => {

                const cell = document.createElement("td");

                if (index === 3) {
                    cell.appendChild(status);
                } else {
                    cell.textContent = value;
                }

                row.appendChild(cell);

            });

            tableBody.appendChild(row);

        });

        if (emptyState) {
            emptyState.hidden = requests.length !== 0;
        }

        if (resultCount) {
            resultCount.textContent =
                `${requests.length} request(s) displayed`;
        }

        updateSummary();

    }

    form.addEventListener("submit", event => {

        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const reason = reasonInput.value.trim();

        if (reason.length < 20) {

            showMessage(
                "Please provide a more detailed reason of at least 20 characters.",
                "error"
            );

            reasonInput.focus();
            return;

        }

        if (!confirmation.checked) {

            showMessage(
                "Please confirm that you understand this is a request and does not immediately deactivate the School workspace.",
                "error"
            );

            confirmation.focus();
            return;

        }

        const hasOpenRequest = requests.some(request =>
            request.status === "submitted" ||
            request.status === "under_review" ||
            request.status === "returned"
        );

        if (hasOpenRequest) {

            showMessage(
                "An unresolved deactivation request already exists in this demonstration. Review its status before submitting another.",
                "error"
            );

            return;

        }

        const nextNumber = requests.length + 1;

        const request = {
            id: `WDR-DEMO-${String(nextNumber).padStart(3, "0")}`,
            schoolName: "San Isidro National High School",
            reason,
            submittedAt: new Date().toISOString().slice(0, 10),
            status: "submitted",
            decision: "",
            decidedAt: ""
        };

        requests.unshift(request);

        form.reset();

        showMessage(
            "Demo only: Your workspace deactivation request has been submitted in temporary browser memory. The School remains active. Platform Administrator review is required."
        );

        renderHistory();

    });

    renderHistory();

    console.log("Workspace Deactivation Request initialized.");

}







/* ==========================================
   F9.20 - SCHOOL ACTIVITY HISTORY
   AND NOTIFICATIONS
   FRONTEND DEMONSTRATION
   ========================================== */

function initializeSchoolActivityAndNotifications() {

    const activityBody = document.getElementById("schoolActivityTableBody");
    const notificationList = document.getElementById("schoolNotificationList");

    if (!activityBody || !notificationList) return;

    const activitySearch = document.getElementById("schoolActivitySearch");
    const activityCategory = document.getElementById("schoolActivityCategory");
    const activityDateFilter = document.getElementById("schoolActivityDateFilter");

    const notificationSearch = document.getElementById("schoolNotificationSearch");
    const notificationStatus = document.getElementById("schoolNotificationStatus");
    const notificationCategory = document.getElementById("schoolNotificationCategory");

    const activityCount = document.getElementById("schoolActivityCount");
    const notificationCount = document.getElementById("schoolNotificationCount");
    const unreadCount = document.getElementById("schoolUnreadCount");
    const readCount = document.getElementById("schoolReadCount");

    const activityResultCount = document.getElementById("schoolActivityResultCount");
    const notificationResultCount = document.getElementById("schoolNotificationResultCount");

    const activityEmpty = document.getElementById("schoolActivityEmpty");
    const notificationEmpty = document.getElementById("schoolNotificationEmpty");

    const message = document.getElementById("schoolActivityMessage");
    const markAllReadButton = document.getElementById("markAllNotificationsRead");

    const tabs = Array.from(document.querySelectorAll("[data-school-activity-tab]"));
    const panels = Array.from(document.querySelectorAll("[data-school-activity-panel]"));

    /*
     * FICTIONAL DEMONSTRATION DATA.
     *
     * Audit events are read-only.
     * Notification read status belongs to each recipient record.
     * NOTIFICATION_EVENTS and NOTIFICATIONS remain separate.
     */

    const auditEvents = [
        {
            id: "AUD-DEMO-001",
            schoolId: "SAMPLE-SCHOOL-ID",
            actor: "Maria Santos",
            actorRole: "School Administrator",
            action: "Created Grade-Level Space",
            category: "academic_structure",
            targetType: "GRADE_SPACE",
            targetReference: "GRADE-DEMO-001",
            description: "Created a Grade 7 academic space.",
            timestamp: "2026-11-18T09:15:00"
        },
        {
            id: "AUD-DEMO-002",
            schoolId: "SAMPLE-SCHOOL-ID",
            actor: "Maria Santos",
            actorRole: "School Administrator",
            action: "Created Subject Offering",
            category: "academic_structure",
            targetType: "SUBJECT_OFFERING",
            targetReference: "OFFERING-DEMO-001",
            description: "Created Mathematics for Grade 7 Section A.",
            timestamp: "2026-11-18T10:30:00"
        },
        {
            id: "AUD-DEMO-003",
            schoolId: "SAMPLE-SCHOOL-ID",
            actor: "Maria Santos",
            actorRole: "School Administrator",
            action: "Submitted Workspace Deactivation Request",
            category: "workspace",
            targetType: "WORKSPACE_LIFECYCLE_REQUEST",
            targetReference: "WDR-DEMO-002",
            description: "Submitted a workspace lifecycle request for review.",
            timestamp: "2026-11-18T11:45:00"
        },
        {
            id: "AUD-DEMO-004",
            schoolId: "SAMPLE-SCHOOL-ID",
            actor: "Juan Reyes",
            actorRole: "Teacher",
            action: "Published School Announcement",
            category: "communication",
            targetType: "ANNOUNCEMENT_VERSION",
            targetReference: "ANNOUNCEMENT-VERSION-DEMO-001",
            description: "Published an announcement for authorized school audiences.",
            timestamp: "2026-11-18T13:20:00"
        },
        {
            id: "AUD-DEMO-005",
            schoolId: "SAMPLE-SCHOOL-ID",
            actor: "Maria Santos",
            actorRole: "School Administrator",
            action: "Restored Grade-Level Space",
            category: "archive",
            targetType: "GRADE_SPACE",
            targetReference: "GRADE-DEMO-002",
            description: "Restored an eligible archived Grade-Level Space.",
            timestamp: "2026-11-18T14:10:00"
        },
        {
            id: "AUD-DEMO-006",
            schoolId: "SAMPLE-SCHOOL-ID",
            actor: "Maria Santos",
            actorRole: "School Administrator",
            action: "Generated Student Join Code",
            category: "codes",
            targetType: "STUDENT_JOIN_CODE",
            targetReference: "JOIN-CODE-DEMO-001",
            description: "Generated a demonstration code for a specific Subject Offering.",
            timestamp: "2026-11-18T15:05:00"
        }
    ];

    /*
     * Shared source events.
     * One event may have multiple recipient notifications.
     */

    const notificationEvents = [
        {
            id: "NE-DEMO-001",
            sourceType: "WORKSPACE_LIFECYCLE_REQUEST",
            sourceReference: "WDR-DEMO-002"
        },
        {
            id: "NE-DEMO-002",
            sourceType: "ANNOUNCEMENT_VERSION",
            sourceReference: "ANNOUNCEMENT-VERSION-DEMO-001"
        },
        {
            id: "NE-DEMO-003",
            sourceType: "GUARDIAN_CONNECTION_REQUEST",
            sourceReference: "GUARDIAN-REQUEST-DEMO-001"
        },
        {
            id: "NE-DEMO-004",
            sourceType: "TEACHER_INVITATION",
            sourceReference: "INVITATION-DEMO-001"
        },
        {
            id: "NE-DEMO-005",
            sourceType: "SUBJECT_OFFERING",
            sourceReference: "OFFERING-DEMO-001"
        }
    ];

    /*
     * These notification records belong to the current
     * fictional School Administrator recipient.
     *
     * Read state is stored per notification, not per event.
     */

    let notifications = [
        {
            id: "NOTIF-DEMO-001",
            eventId: "NE-DEMO-001",
            recipient: "SCHOOL-ADMIN-DEMO",
            title: "Workspace request submitted",
            body: "A workspace deactivation request is awaiting Platform Administrator review.",
            category: "workspace",
            relatedType: "WORKSPACE_LIFECYCLE_REQUEST",
            relatedReference: "WDR-DEMO-002",
            createdAt: "2026-11-18T11:45:00",
            readAt: "",
            status: "unread"
        },
        {
            id: "NOTIF-DEMO-002",
            eventId: "NE-DEMO-002",
            recipient: "SCHOOL-ADMIN-DEMO",
            title: "School announcement published",
            body: "A school announcement has been published for its selected audiences.",
            category: "communication",
            relatedType: "ANNOUNCEMENT_VERSION",
            relatedReference: "ANNOUNCEMENT-VERSION-DEMO-001",
            createdAt: "2026-11-18T13:20:00",
            readAt: "",
            status: "unread"
        },
        {
            id: "NOTIF-DEMO-003",
            eventId: "NE-DEMO-003",
            recipient: "SCHOOL-ADMIN-DEMO",
            title: "Guardian request referred",
            body: "A Guardian connection request has been referred for additional review.",
            category: "guardian",
            relatedType: "GUARDIAN_CONNECTION_REQUEST",
            relatedReference: "GUARDIAN-REQUEST-DEMO-001",
            createdAt: "2026-11-18T14:00:00",
            readAt: "2026-11-18T14:10:00",
            status: "read"
        },
        {
            id: "NOTIF-DEMO-004",
            eventId: "NE-DEMO-004",
            recipient: "SCHOOL-ADMIN-DEMO",
            title: "Teacher invitation update",
            body: "A Teacher invitation status has changed.",
            category: "teacher",
            relatedType: "TEACHER_INVITATION",
            relatedReference: "INVITATION-DEMO-001",
            createdAt: "2026-11-18T15:00:00",
            readAt: "",
            status: "unread"
        },
        {
            id: "NOTIF-DEMO-005",
            eventId: "NE-DEMO-005",
            recipient: "SCHOOL-ADMIN-DEMO",
            title: "Subject Offering updated",
            body: "A Subject Offering record has been updated.",
            category: "academic",
            relatedType: "SUBJECT_OFFERING",
            relatedReference: "OFFERING-DEMO-001",
            createdAt: "2026-11-18T15:30:00",
            readAt: "2026-11-18T15:45:00",
            status: "read"
        }
    ];

    const eventById = new Map(
        notificationEvents.map(item => [item.id, item])
    );

    function showMessage(text, type = "success") {

        if (!message) return;

        message.className =
            "sa-activity-message " + type + " show";

        message.textContent = text;

    }

    function formatDate(value) {

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return value;

        return date.toLocaleString("en-PH", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

    }

    function initials(name) {

        return name.split(" ")
            .map(part => part.charAt(0))
            .slice(0, 2)
            .join("")
            .toUpperCase();

    }

    function updateSummary() {

        const unread = notifications.filter(
            item => item.status === "unread"
        ).length;

        const read = notifications.filter(
            item => item.status === "read"
        ).length;

        if (activityCount) activityCount.textContent = auditEvents.length;
        if (notificationCount) notificationCount.textContent = notifications.length;
        if (unreadCount) unreadCount.textContent = unread;
        if (readCount) readCount.textContent = read;

    }

    function renderActivities() {

        const query = activitySearch
            ? activitySearch.value.trim().toLowerCase()
            : "";

        const category = activityCategory
            ? activityCategory.value
            : "all";

        const dateFilter = activityDateFilter
            ? activityDateFilter.value
            : "all";

        const filtered = auditEvents.filter(item => {

            const searchable = [
                item.actor,
                item.actorRole,
                item.action,
                item.description,
                item.targetType,
                item.targetReference
            ].join(" ").toLowerCase();

            const matchesSearch = searchable.includes(query);

            const matchesCategory =
                category === "all" ||
                item.category === category;

            const eventDate = item.timestamp.slice(0, 10);
            const today = new Date().toISOString().slice(0, 10);

            let matchesDate = true;

            if (dateFilter === "today") {
                matchesDate = eventDate === today;
            }

            if (dateFilter === "older") {
                matchesDate = eventDate < today;
            }

            return matchesSearch && matchesCategory && matchesDate;

        });

        activityBody.replaceChildren();

        filtered.forEach(item => {

            const row = document.createElement("tr");

            const actorCell = document.createElement("td");

            const actor = document.createElement("div");
            actor.className = "sa-activity-actor";

            const avatar = document.createElement("div");
            avatar.className = "sa-activity-avatar";
            avatar.textContent = initials(item.actor);

            const actorDetails = document.createElement("div");

            const actorName = document.createElement("strong");
            actorName.textContent = item.actor;

            const actorRole = document.createElement("span");
            actorRole.textContent = item.actorRole;

            actorDetails.append(actorName, actorRole);
            actor.append(avatar, actorDetails);
            actorCell.appendChild(actor);

            const actionCell = document.createElement("td");

            const action = document.createElement("div");
            action.className = "sa-activity-description";

            const actionTitle = document.createElement("strong");
            actionTitle.textContent = item.action;

            const actionDescription = document.createElement("span");
            actionDescription.textContent = item.description;

            action.append(actionTitle, actionDescription);
            actionCell.appendChild(action);

            const targetCell = document.createElement("td");
            targetCell.textContent =
                `${item.targetType} · ${item.targetReference}`;

            const categoryCell = document.createElement("td");
            categoryCell.textContent = item.category.replaceAll("_", " ");

            const dateCell = document.createElement("td");
            dateCell.textContent = formatDate(item.timestamp);

            const referenceCell = document.createElement("td");
            referenceCell.textContent = item.id;

            row.append(
                actorCell,
                actionCell,
                targetCell,
                categoryCell,
                dateCell,
                referenceCell
            );

            activityBody.appendChild(row);

        });

        if (activityEmpty) {
            activityEmpty.hidden = filtered.length !== 0;
        }

        if (activityResultCount) {
            activityResultCount.textContent =
                `${filtered.length} audit event(s) displayed`;
        }

        updateSummary();

    }

    function getNotificationIcon(category) {

        const icons = {
            workspace: "bi-building",
            communication: "bi-megaphone",
            guardian: "bi-person-check",
            teacher: "bi-person-workspace",
            academic: "bi-mortarboard",
            system: "bi-info-circle"
        };

        return icons[category] || "bi-bell";

    }

    function renderNotifications() {

        const query = notificationSearch
            ? notificationSearch.value.trim().toLowerCase()
            : "";

        const selectedStatus = notificationStatus
            ? notificationStatus.value
            : "all";

        const selectedCategory = notificationCategory
            ? notificationCategory.value
            : "all";

        const filtered = notifications.filter(item => {

            const sourceEvent = eventById.get(item.eventId);

            if (!sourceEvent) return false;

            const searchable = [
                item.title,
                item.body,
                item.category,
                item.relatedType,
                item.relatedReference
            ].join(" ").toLowerCase();

            const matchesSearch = searchable.includes(query);

            const matchesStatus =
                selectedStatus === "all" ||
                item.status === selectedStatus;

            const matchesCategory =
                selectedCategory === "all" ||
                item.category === selectedCategory;

            return matchesSearch && matchesStatus && matchesCategory;

        });

        notificationList.replaceChildren();

        filtered.forEach(item => {

            const sourceEvent = eventById.get(item.eventId);

            const card = document.createElement("article");

            card.className =
                "sa-notification-item" +
                (item.status === "unread" ? " unread" : "");

            const icon = document.createElement("div");
            icon.className = "sa-notification-icon";

            const iconElement = document.createElement("i");
            iconElement.className =
                `bi ${getNotificationIcon(item.category)}`;

            icon.appendChild(iconElement);

            const content = document.createElement("div");
            content.className = "sa-notification-content";

            const title = document.createElement("strong");
            title.textContent = item.title;

            const body = document.createElement("p");
            body.textContent = item.body;

            const metadata = document.createElement("span");
            metadata.textContent =
                `${formatDate(item.createdAt)} · ${item.category} · ${item.status}`;

            const source = document.createElement("span");
            source.className = "d-block mt-1";

            source.textContent =
                `Event: ${sourceEvent.id} · ${item.relatedType}: ${item.relatedReference}`;

            const actions = document.createElement("div");
            actions.className = "sa-notification-actions";

            if (item.status === "unread") {

                const markRead = document.createElement("button");
                markRead.type = "button";
                markRead.className = "sa-notification-action";
                markRead.dataset.action = "read";
                markRead.dataset.id = item.id;
                markRead.textContent = "Mark as Read";

                actions.appendChild(markRead);

            }

            content.append(title, body, metadata, source, actions);

            if (item.status === "unread") {

                const dot = document.createElement("span");
                dot.className = "sa-notification-dot";
                dot.setAttribute("aria-label", "Unread");

                card.append(icon, content, dot);

            } else {

                card.append(icon, content);

            }

            notificationList.appendChild(card);

        });

        if (notificationEmpty) {
            notificationEmpty.hidden = filtered.length !== 0;
        }

        if (notificationResultCount) {
            notificationResultCount.textContent =
                `${filtered.length} notification(s) displayed`;
        }

        updateSummary();

    }

    function activateTab(name) {

        tabs.forEach(tab => {

            const active =
                tab.dataset.schoolActivityTab === name;

            tab.classList.toggle("active", active);
            tab.setAttribute("aria-selected", String(active));

        });

        panels.forEach(panel => {

            const active =
                panel.dataset.schoolActivityPanel === name;

            panel.classList.toggle("active", active);
            panel.hidden = !active;

        });

    }

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {
            activateTab(tab.dataset.schoolActivityTab);
        });

    });

    if (activitySearch) {
        activitySearch.addEventListener("input", renderActivities);
    }

    if (activityCategory) {
        activityCategory.addEventListener("change", renderActivities);
    }

    if (activityDateFilter) {
        activityDateFilter.addEventListener("change", renderActivities);
    }

    if (notificationSearch) {
        notificationSearch.addEventListener("input", renderNotifications);
    }

    if (notificationStatus) {
        notificationStatus.addEventListener("change", renderNotifications);
    }

    if (notificationCategory) {
        notificationCategory.addEventListener("change", renderNotifications);
    }

    notificationList.addEventListener("click", event => {

        const button = event.target.closest("[data-action='read']");

        if (!button) return;

        const notification = notifications.find(
            item => item.id === button.dataset.id
        );

        if (!notification || notification.status === "read") return;

        notification.status = "read";
        notification.readAt = new Date().toISOString();

        showMessage(
            "Demo only: This recipient's notification has been marked as read. The shared notification event and audit history were not changed."
        );

        renderNotifications();

    });

    if (markAllReadButton) {

        markAllReadButton.addEventListener("click", () => {

            const unread = notifications.filter(
                item => item.status === "unread"
            );

            if (!unread.length) {

                showMessage("There are no unread notifications.");
                return;

            }

            const readAt = new Date().toISOString();

            unread.forEach(item => {

                item.status = "read";
                item.readAt = readAt;

            });

            showMessage(
                `Demo only: ${unread.length} notification(s) for this recipient were marked as read.`
            );

            renderNotifications();

        });

    }

    renderActivities();
    renderNotifications();

    activateTab("activities");

    console.log("School Activity History and Notifications initialized.");

}







/* =====================================================
   F9.22.4 - EASYACCESS PERSONAL ACCESSIBILITY SETTINGS
   FRONTEND DEMONSTRATION
   ===================================================== */

function initializeEasyAccess() {

    const saveButton = document.getElementById("eaSaveButton");

    // Do nothing on other School Administrator pages.
    if (!saveButton) return;

    const STORAGE_KEY = "gabayAral.schoolAdmin.easyAccess.v1";

    const defaults = {
        fontSize: "normal",
        highContrast: false,
        simplified: false,
        speechEnabled: false,
        reduceMotion: false,
        language: "en"
    };

    const allowedLanguages = ["en", "fil", "ceb", "ilo"];
    const allowedFontSizes = ["normal", "large", "extra-large"];

    const fontRadios = document.querySelectorAll(
        'input[name="eaFontSize"]'
    );

    const highContrast = document.getElementById("eaHighContrast");
    const simplified = document.getElementById("eaSimplified");
    const speechEnabled = document.getElementById("eaSpeechEnabled");
    const reduceMotion = document.getElementById("eaReduceMotion");
    const language = document.getElementById("eaLanguage");

    const resetButton = document.getElementById("eaResetButton");
    const readButton = document.getElementById("eaReadPreview");
    const speechStatus = document.getElementById("eaSpeechStatus");
    const saveMessage = document.getElementById("eaSaveMessage");

    function readSavedPreferences() {

        try {

            const stored = localStorage.getItem(STORAGE_KEY);

            if (!stored) {
                return { ...defaults };
            }

            const saved = JSON.parse(stored);

            if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
                return { ...defaults };
            }

            return {
                fontSize: allowedFontSizes.includes(saved.fontSize)
                    ? saved.fontSize
                    : defaults.fontSize,

                highContrast: saved.highContrast === true,

                simplified: saved.simplified === true,

                speechEnabled: saved.speechEnabled === true,

                reduceMotion: saved.reduceMotion === true,

                language: allowedLanguages.includes(saved.language)
                    ? saved.language
                    : defaults.language
            };

        } catch (error) {

            console.warn(
                "EasyAccess preferences could not be read.",
                error
            );

            return { ...defaults };

        }

    }

    function collectPreferences() {

        const selectedFont = document.querySelector(
            'input[name="eaFontSize"]:checked'
        );

        return {

            fontSize: selectedFont
                ? selectedFont.value
                : defaults.fontSize,

            highContrast: highContrast.checked,

            simplified: simplified.checked,

            speechEnabled: speechEnabled.checked,

            reduceMotion: reduceMotion.checked,

            language: language.value

        };

    }

    function applyPreferences(preferences) {

        const root = document.documentElement;

        root.dataset.eaFont = preferences.fontSize;

        root.dataset.eaContrast = preferences.highContrast
            ? "high"
            : "standard";

        root.dataset.eaSimplified = String(
            preferences.simplified
        );

        root.dataset.eaMotion = preferences.reduceMotion
            ? "reduced"
            : "standard";

    }

    function populateControls(preferences) {

        fontRadios.forEach(radio => {

            radio.checked = radio.value === preferences.fontSize;

        });

        highContrast.checked = preferences.highContrast;

        simplified.checked = preferences.simplified;

        speechEnabled.checked = preferences.speechEnabled;

        reduceMotion.checked = preferences.reduceMotion;

        language.value = preferences.language;

    }

    function showMessage(message, isError = false) {

        if (!saveMessage) return;

        saveMessage.textContent = message;

        saveMessage.style.color = isError
            ? "#B91C1C"
            : "#15803D";

    }

    function updateSpeechStatus(enabled) {

        if (!speechStatus) return;

        speechStatus.textContent = enabled
            ? "Text-to-speech is enabled. Use the reading preview button to test browser support."
            : "Text-to-speech is off. Turn it on to try the reading preview.";

    }

    // LOAD SAVED SETTINGS

    const savedPreferences = readSavedPreferences();

    populateControls(savedPreferences);

    applyPreferences(savedPreferences);

    updateSpeechStatus(savedPreferences.speechEnabled);

    // SAVE PREFERENCES

    saveButton.addEventListener("click", () => {

        const preferences = collectPreferences();

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(preferences)
            );

            applyPreferences(preferences);

            updateSpeechStatus(preferences.speechEnabled);

            showMessage(
                "Your personal accessibility preferences have been saved in this browser."
            );

        } catch (error) {

            console.error(
                "EasyAccess preferences could not be saved.",
                error
            );

            showMessage(
                "The browser could not save your preferences. Check browser storage settings.",
                true
            );

        }

    });

    // RESTORE DEFAULT SETTINGS

    resetButton.addEventListener("click", () => {

        populateControls(defaults);

        applyPreferences(defaults);

        updateSpeechStatus(defaults.speechEnabled);

        try {

            localStorage.removeItem(STORAGE_KEY);

            showMessage(
                "Default accessibility preferences restored."
            );

        } catch (error) {

            console.error(
                "EasyAccess defaults could not be restored.",
                error
            );

            showMessage(
                "Defaults are displayed, but browser storage could not be cleared.",
                true
            );

        }

    });

    // UPDATE SPEECH STATUS

    speechEnabled.addEventListener("change", () => {

        updateSpeechStatus(speechEnabled.checked);

    });

    // TEXT-TO-SPEECH PREVIEW

    readButton.addEventListener("click", () => {

        if (!speechEnabled.checked) {

            showMessage(
                "Please enable text-to-speech first.",
                true
            );

            return;

        }

        if (
            !("speechSynthesis" in window) ||
            typeof window.SpeechSynthesisUtterance === "undefined"
        ) {

            showMessage(
                "Text-to-speech is not supported by this browser.",
                true
            );

            return;

        }

        try {

            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(
                "Welcome to GabayAral EasyAccess. " +
                "These are your personal accessibility preferences. " +
                "You can adjust text size, contrast, motion, and language preference."
            );

            window.speechSynthesis.speak(utterance);

            showMessage(
                "Reading preview started."
            );

        } catch (error) {

            console.error(
                "Text-to-speech preview failed.",
                error
            );

            showMessage(
                "The reading preview could not be started.",
                true
            );

        }

    });

    console.log(
        "EasyAccess personal preferences initialized. Frontend demonstration only."
    );

}







/* =====================================================
   F9.22.4.2 - GLOBAL EASYACCESS PREFERENCES
   Applies saved personal accessibility preferences
   across all School Administrator pages.
   ===================================================== */

function initializeGlobalEasyAccessPreferences() {

    const STORAGE_KEY = "gabayAral.schoolAdmin.easyAccess.v1";

    const allowedFontSizes = [
        "normal",
        "large",
        "extra-large"
    ];

    const defaults = {
        fontSize: "normal",
        highContrast: false,
        simplified: false,
        speechEnabled: false,
        reduceMotion: false,
        language: "en"
    };

    let preferences = { ...defaults };

    /*
     * LOAD SAVED PERSONAL PREFERENCES
     */

    try {

        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData) {

            const parsed = JSON.parse(savedData);

            if (
                parsed &&
                typeof parsed === "object" &&
                !Array.isArray(parsed)
            ) {

                preferences = {

                    fontSize: allowedFontSizes.includes(parsed.fontSize)
                        ? parsed.fontSize
                        : defaults.fontSize,

                    highContrast: parsed.highContrast === true,

                    simplified: parsed.simplified === true,

                    speechEnabled: parsed.speechEnabled === true,

                    reduceMotion: parsed.reduceMotion === true,

                    language: ["en", "fil", "ceb", "ilo"].includes(
                        parsed.language
                    )
                        ? parsed.language
                        : defaults.language

                };

            }

        }

    } catch (error) {

        console.warn(
            "Global EasyAccess preferences could not be loaded.",
            error
        );

        preferences = { ...defaults };

    }

    /*
     * APPLY PREFERENCES TO THE CURRENT PAGE
     */

    const root = document.documentElement;

    root.dataset.eaFont = preferences.fontSize;

    root.dataset.eaContrast = preferences.highContrast
        ? "high"
        : "standard";

    root.dataset.eaSimplified = String(
        preferences.simplified
    );

    root.dataset.eaMotion = preferences.reduceMotion
        ? "reduced"
        : "standard";

    /*
     * ACCESSIBILITY PREFERENCE STATUS
     * Language and speech preferences are loaded too,
     * but do not automatically translate or read pages.
     */

    console.log(
        "Global EasyAccess preferences applied.",
        {
            fontSize: preferences.fontSize,
            highContrast: preferences.highContrast,
            simplified: preferences.simplified,
            reduceMotion: preferences.reduceMotion,
            language: preferences.language,
            speechEnabled: preferences.speechEnabled
        }
    );

}







/* =====================================================
   F9.22.5.1 - SCHOOL SELECTOR DROPDOWN
   Dashboard school workspace selection.
   FRONTEND DEMONSTRATION ONLY.
   ===================================================== */

function initializeSchoolSelector() {

    const wrapper = document.getElementById(
        "schoolSelectorWrapper"
    );

    // Run only on pages containing the School Selector.
    if (!wrapper) return;

    const selectButton = document.getElementById(
        "schoolSelectButton"
    );

    const dropdown = document.getElementById(
        "schoolSelectMenu"
    );

    const currentName = document.getElementById(
        "schoolSelectCurrentName"
    );

    if (!selectButton || !dropdown || !currentName) {
        console.warn(
            "School Selector elements are incomplete."
        );
        return;
    }

    const schoolOptions = dropdown.querySelectorAll(
        ".school-select-option"
    );

    function openDropdown() {

        dropdown.hidden = false;

        selectButton.setAttribute(
            "aria-expanded",
            "true"
        );

    }

    function closeDropdown(returnFocus = false) {

        dropdown.hidden = true;

        selectButton.setAttribute(
            "aria-expanded",
            "false"
        );

        if (returnFocus) {
            selectButton.focus();
        }

    }

    function toggleDropdown() {

        const isOpen =
            selectButton.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }

    }

    // OPEN / CLOSE DROPDOWN

    selectButton.addEventListener(
        "click",
        toggleDropdown
    );

    // SELECT A SCHOOL

    schoolOptions.forEach(option => {

        option.addEventListener("click", () => {

            const schoolId = option.dataset.schoolId;

            const schoolName = option.dataset.schoolName;

            if (!schoolId || !schoolName) {
                console.warn(
                    "School option is missing its identifying information."
                );
                return;
            }

            // Update the displayed school.
            currentName.textContent = schoolName;

            // Update selected option appearance.
            schoolOptions.forEach(item => {

                const selected = item === option;

                item.classList.toggle(
                    "active",
                    selected
                );

                item.setAttribute(
                    "aria-checked",
                    String(selected)
                );

                // Remove an old selection indicator.
                const oldCheck = item.querySelector(
                    ".school-option-check"
                );

                if (oldCheck) {
                    oldCheck.remove();
                }

            });

            // Add check icon to the selected option.
            const checkIcon = document.createElement("i");

            checkIcon.className =
                "bi bi-check-circle-fill school-option-check";

            option.appendChild(checkIcon);

            // Store the temporary frontend selection.
            try {

                sessionStorage.setItem(
                    "gabayAral.schoolAdmin.demoSelectedSchool",
                    JSON.stringify({
                        schoolId: schoolId,
                        schoolName: schoolName
                    })
                );

            } catch (error) {

                console.warn(
                    "Demo school selection could not be stored.",
                    error
                );

            }

            closeDropdown(true);

            console.log(
                "Demo school workspace selected:",
                schoolName
            );

        });

    });

    // CLOSE WHEN CLICKING OUTSIDE

    document.addEventListener("click", event => {

        if (!wrapper.contains(event.target)) {
            closeDropdown();
        }

    });

    // CLOSE USING ESCAPE KEY

    document.addEventListener("keydown", event => {

        if (event.key === "Escape" && !dropdown.hidden) {

            event.preventDefault();

            closeDropdown(true);

        }

    });

    // RESTORE THE CURRENT DEMONSTRATION SELECTION

    try {

        const savedSelection = sessionStorage.getItem(
            "gabayAral.schoolAdmin.demoSelectedSchool"
        );

        if (savedSelection) {

            const selected = JSON.parse(savedSelection);

            const matchingOption = Array.from(
                schoolOptions
            ).find(option => {

                return (
                    option.dataset.schoolId === selected.schoolId
                );

            });

            if (matchingOption) {

                currentName.textContent =
                    matchingOption.dataset.schoolName;

                schoolOptions.forEach(option => {

                    const isSelected = option === matchingOption;

                    option.classList.toggle(
                        "active",
                        isSelected
                    );

                    option.setAttribute(
                        "aria-checked",
                        String(isSelected)
                    );

                    const oldCheck = option.querySelector(
                        ".school-option-check"
                    );

                    if (oldCheck) {
                        oldCheck.remove();
                    }

                });

                const checkIcon = document.createElement("i");

                checkIcon.className =
                    "bi bi-check-circle-fill school-option-check";

                matchingOption.appendChild(checkIcon);

            }

        }

    } catch (error) {

        console.warn(
            "Saved demonstration school selection could not be restored.",
            error
        );

    }

    console.log(
        "School Selector initialized. Frontend demonstration only."
    );

}







/* =====================================================
   F9.22.6 - ADMINISTRATOR PROFILE DROPDOWN
   School Administrator Frontend
   DEMONSTRATION ONLY
   ===================================================== */

function initializeAdminProfileDropdown() {

    const wrapper = document.getElementById(
        "adminProfileWrapper"
    );

    // Only initialize on pages containing the profile menu.
    if (!wrapper) return;

    const profileButton = document.getElementById(
        "adminProfileButton"
    );

    const profileMenu = document.getElementById(
        "adminProfileMenu"
    );

    const securityButton = document.getElementById(
        "adminAccountSecurityButton"
    );

    const signOutButton = document.getElementById(
        "adminSignOutButton"
    );

    if (
        !profileButton ||
        !profileMenu ||
        !securityButton ||
        !signOutButton
    ) {

        console.warn(
            "Administrator Profile dropdown elements are incomplete."
        );

        return;

    }

    // OPEN DROPDOWN

    function openProfileMenu() {

        profileMenu.hidden = false;

        profileButton.setAttribute(
            "aria-expanded",
            "true"
        );

    }

    // CLOSE DROPDOWN

    function closeProfileMenu(returnFocus = false) {

        profileMenu.hidden = true;

        profileButton.setAttribute(
            "aria-expanded",
            "false"
        );

        if (returnFocus) {
            profileButton.focus();
        }

    }

    // TOGGLE DROPDOWN

    profileButton.addEventListener("click", () => {

        const isOpen =
            profileButton.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeProfileMenu();
        } else {
            openProfileMenu();
        }

    });

    // CLOSE WHEN CLICKING OUTSIDE

    document.addEventListener("click", event => {

        if (!wrapper.contains(event.target)) {
            closeProfileMenu();
        }

    });

    // CLOSE WITH ESCAPE KEY

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            !profileMenu.hidden
        ) {

            event.preventDefault();

            closeProfileMenu(true);

        }

    });

    // ACCOUNT SECURITY PLACEHOLDER

    securityButton.addEventListener("click", () => {

        closeProfileMenu();

        alert(
            "Account Security is not yet available. " +
            "This feature will be implemented in a future checkpoint."
        );

    });

    // SAFE DEMONSTRATION SIGN OUT

    signOutButton.addEventListener("click", () => {

        const confirmed = window.confirm(
            "Are you sure you want to sign out? " +
            "This is currently a frontend demonstration."
        );

        if (!confirmed) {
            return;
        }

        closeProfileMenu();

        alert(
            "This is a demonstration only. " +
            "Actual account sign-out will be connected " +
            "when the GabayAral authentication backend is implemented."
        );

    });

    console.log(
        "Administrator Profile dropdown initialized. " +
        "Frontend demonstration only."
    );

}
