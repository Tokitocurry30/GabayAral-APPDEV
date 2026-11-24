
/* =====================================================
   GABAYARAL - TEACHER WORKSPACE
   F10.1.6 - CONSOLIDATED DASHBOARD JAVASCRIPT
   FRONTEND DEMONSTRATION ONLY
   ===================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // Apply saved accessibility settings across Teacher pages.
    initializeGlobalTeacherEasyAccessPreferences();

    initializeTeacherDashboard();
    initializeTeacherSchoolSelector();
    initializeTeacherProfileDropdown();
    initializeTeacherOfferings();
    initializeTeacherStudents();
    initializeTeacherActivities();
    initializeTeacherSubmissions();
    initializeTeacherQuizzes();
    initializeTeacherGrades();
    initializeTeacherGradeReviews();
    initializeTeacherGradeReviewFollowups();
    initializeTeacherAnnouncements();
    initializeTeacherClearPost();
    initializeTeacherGuardianRequests();
    initializeTeacherParentAcknowledgments();
    initializeTeacherCalendar();
    initializeTeacherNotifications();
    initializeTeacherActivityHistory();
    initializeTeacherEasyAccess();

    console.log("GabayAral Teacher Workspace initialized.");

});

/* =====================================================
   F10.1.6.1 - TEACHER DASHBOARD
===================================================== */

function initializeTeacherDashboard() {

    const dateElement = document.getElementById(
        "teacherCurrentDate"
    );

    const yearElement = document.getElementById(
        "teacherFooterYear"
    );

    const searchInput = document.getElementById(
        "dashboardSearch"
    );

    const emptyState = document.getElementById(
        "teacherSearchEmpty"
    );

    const notificationButton = document.getElementById(
        "teacherNotificationButton"
    );

    // CURRENT DATE

    const updateDate = () => {

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

        if (yearElement) {
            yearElement.textContent = today.getFullYear();
        }

    };

    updateDate();


    // DASHBOARD SEARCH
    // Uses the same .sa-searchable approach as
    // the School Administrator Dashboard.

    if (searchInput) {

        const searchableItems = Array.from(
            document.querySelectorAll(
                ".teacher-content .sa-searchable"
            )
        );

        const filterDashboard = () => {

            const query = searchInput.value
                .trim()
                .toLowerCase();

            let visibleCount = 0;

            searchableItems.forEach(item => {

                const searchableText = item.textContent
                    .toLowerCase()
                    .replace(/\s+/g, " ")
                    .trim();

                const matches = searchableText.includes(query);

                item.hidden = query !== "" && !matches;

                if (!item.hidden) {
                    visibleCount++;
                }

            });

            if (emptyState) {

                emptyState.hidden =
                    query === "" || visibleCount > 0;

            }

        };

        searchInput.addEventListener(
            "input",
            filterDashboard
        );

        // Clear search using Escape.

        searchInput.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                searchInput.value = "";

                filterDashboard();

                searchInput.blur();

            }

        });

    }


    // F10.16 - TEACHER NOTIFICATION NAVIGATION
    // The bell opens the Notification Center from any Teacher page.

    if (notificationButton) {

        notificationButton.addEventListener("click", () => {

            const notificationCenter = document.querySelector(
                ".teacher-notification-center"
            );

            if (notificationCenter) {

                notificationCenter.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                const heading = notificationCenter.querySelector("h2");

                if (heading) {
                    heading.setAttribute("tabindex", "-1");
                    heading.focus({ preventScroll: true });
                }

                return;
            }

            window.location.href = "notifications.html";

        });

    }


    // PLACEHOLDER SIDEBAR LINKS

    const demoLinks = document.querySelectorAll(
        "[data-demo-link]"
    );

    demoLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const label = link.querySelector("span");

            const pageName = label
                ? label.textContent.trim()
                : "This feature";

            alert(
                pageName +
                "\n\nThis Teacher feature will be implemented in its own development checkpoint."
            );

        });

    });


    // PROFILE ACTIONS

    const profileActions = document.querySelectorAll(
        "[data-profile-action]"
    );

    profileActions.forEach(button => {

        button.addEventListener("click", () => {

            const action = button.dataset.profileAction;

            if (action === "profile") {

                alert(
                    "Teacher Profile Settings\n\nThis page will be developed in a future checkpoint."
                );

            }

            if (action === "security") {

                alert(
                    "Account Security\n\nThis feature requires the Django Backend."
                );

            }

            if (action === "accessibility") {

                window.location.href = "easyaccess.html";

            }

            if (action === "signout") {

                const confirmed = window.confirm(
                    "Are you sure you want to sign out of this demonstration?"
                );

                if (!confirmed) return;

                alert(
                    "Demonstration only: Sign Out was confirmed. No actual authentication session was terminated."
                );

            }

        });

    });

}


/* =====================================================
   F10.1.6.2 - SCHOOL SELECTOR
   Uses the exact Admin HTML classes and structure.
===================================================== */

function initializeTeacherSchoolSelector() {

    const wrapper = document.getElementById(
        "teacherSchoolSelectorWrapper"
    );

    const button = document.getElementById(
        "teacherSchoolSelectButton"
    );

    const menu = document.getElementById(
        "teacherSchoolSelectMenu"
    );

    const currentName = document.getElementById(
        "teacherSchoolCurrentName"
    );

    if (!wrapper || !button || !menu || !currentName) {
        return;
    }

    const options = menu.querySelectorAll(
        ".school-select-option"
    );

    const storageKey = "gabayAral.teacherDemoSchool";

    let lastFocusedElement = null;


    function openMenu() {

        lastFocusedElement = button;

        menu.hidden = false;

        button.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeMenu(restoreFocus = false) {

        menu.hidden = true;

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        if (restoreFocus && lastFocusedElement) {
            lastFocusedElement.focus();
        }

    }


    function updateSchool(selectedId, selectedName) {

        currentName.textContent = selectedName;

        options.forEach(option => {

            const selected =
                option.dataset.schoolId === selectedId;

            option.classList.toggle(
                "active",
                selected
            );

            option.setAttribute(
                "aria-checked",
                selected ? "true" : "false"
            );

            const check = option.querySelector(
                ".school-option-check"
            );

            if (check) {
                check.hidden = !selected;
            }

        });

        // Demonstration preference only.

        try {

            localStorage.setItem(
                storageKey,
                JSON.stringify({
                    id: selectedId,
                    name: selectedName
                })
            );

        } catch (error) {

            console.warn(
                "Teacher school demonstration preference could not be saved.",
                error
            );

        }

    }



// RESTORE SELECTED SCHOOL
// Supports both the old plain-text value
// and the new JSON preference format.

try {

    const savedSchool = localStorage.getItem(storageKey);

    if (savedSchool) {

        let parsed = null;

        try {

            parsed = JSON.parse(savedSchool);

        } catch (error) {

            // Previous version stored the school name
            // as plain text rather than JSON.

            parsed = {
                id: null,
                name: savedSchool
            };

        }

        const savedId =
            parsed && typeof parsed === "object"
                ? parsed.id
                : null;

        const savedName =
            parsed && typeof parsed === "object"
                ? parsed.name
                : savedSchool;

        const validOption = Array.from(options).find(
            option =>
                (savedId && option.dataset.schoolId === savedId) ||
                option.dataset.schoolName === savedName
        );

        if (validOption) {

            updateSchool(
                validOption.dataset.schoolId,
                validOption.dataset.schoolName
            );

        } else {

            // Remove an obsolete or invalid preference.

            localStorage.removeItem(storageKey);

        }

    }

} catch (error) {

    console.error(
        "Unable to restore Teacher school preference:",
        error
    );

}



    // BUTTON OPEN / CLOSE

    button.addEventListener("click", () => {

        if (menu.hidden) {
            openMenu();
        } else {
            closeMenu();
        }

    });


    // SELECT SCHOOL

    options.forEach(option => {

        option.addEventListener("click", () => {

            const schoolId = option.dataset.schoolId;
            const schoolName = option.dataset.schoolName;

            if (!schoolId || !schoolName) return;

            updateSchool(schoolId, schoolName);

            closeMenu(true);

        });

    });


    // OUTSIDE CLICK

    document.addEventListener("click", event => {

        if (
            !menu.hidden &&
            !wrapper.contains(event.target)
        ) {

            closeMenu();

        }

    });


    // ESCAPE

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            !menu.hidden
        ) {

            closeMenu(true);

        }

    });

}


/* =====================================================
   F10.1.6.3 - TEACHER PROFILE DROPDOWN
   Uses the exact Admin profile HTML classes.
===================================================== */

function initializeTeacherProfileDropdown() {

    const wrapper = document.getElementById(
        "teacherProfileWrapper"
    );

    const button = document.getElementById(
        "teacherProfileButton"
    );

    const menu = document.getElementById(
        "teacherProfileMenu"
    );

    if (!wrapper || !button || !menu) {
        return;
    }

    let lastFocusedElement = null;


    function openMenu() {

        lastFocusedElement = button;

        menu.hidden = false;

        button.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeMenu(restoreFocus = false) {

        menu.hidden = true;

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        if (restoreFocus && lastFocusedElement) {
            lastFocusedElement.focus();
        }

    }


    button.addEventListener("click", () => {

        if (menu.hidden) {
            openMenu();
        } else {
            closeMenu();
        }

    });


    // OUTSIDE CLICK

    document.addEventListener("click", event => {

        if (
            !menu.hidden &&
            !wrapper.contains(event.target)
        ) {

            closeMenu();

        }

    });


    // ESCAPE

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            !menu.hidden
        ) {

            closeMenu(true);

        }

    });

}







/* =====================================================
   F10.2 - MY SUBJECT OFFERINGS
   FRONTEND DEMONSTRATION ONLY
===================================================== */

function initializeTeacherOfferings() {

    const tableBody = document.getElementById(
        "teacherOfferingsTableBody"
    );

    if (!tableBody) return;

    const searchInput = document.getElementById(
        "offeringTableSearch"
    );

    const statusFilter = document.getElementById(
        "offeringStatusFilter"
    );

    const clearButton = document.getElementById(
        "clearOfferingFilters"
    );

    const emptyState = document.getElementById(
        "teacherOfferingsEmpty"
    );

    const recordCount = document.getElementById(
        "offeringRecordCount"
    );

    const totalElement = document.getElementById(
        "totalOfferingsCount"
    );

    const activeElement = document.getElementById(
        "activeOfferingsCount"
    );

    const studentsElement = document.getElementById(
        "offeringStudentsCount"
    );

    const gradesElement = document.getElementById(
        "gradeLevelsCount"
    );

    const modalElement = document.getElementById(
        "teacherOfferingDetailsModal"
    );

    const modalBody = document.getElementById(
        "teacherOfferingDetailsBody"
    );

    const yearElement = document.getElementById(
        "teacherFooterYear"
    );

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // SAMPLE ASSIGNED OFFERINGS
    // These are fictional frontend records.
    // They are not actual Teacher assignments.

    const offerings = [

        {
            id: "OFF-001",
            subject: "Mathematics",
            code: "MATH-7-SAM",
            grade: "Grade 7",
            section: "Sampaguita",
            students: 32,
            status: "active"
        },

        {
            id: "OFF-002",
            subject: "English",
            code: "ENG-8-ROS",
            grade: "Grade 8",
            section: "Rosal",
            students: 30,
            status: "active"
        },

        {
            id: "OFF-003",
            subject: "Science",
            code: "SCI-7-DAH",
            grade: "Grade 7",
            section: "Dahlia",
            students: 31,
            status: "active"
        },

        {
            id: "OFF-004",
            subject: "Araling Panlipunan",
            code: "AP-9-JAS",
            grade: "Grade 9",
            section: "Jasmine",
            students: 28,
            status: "active"
        },

        {
            id: "OFF-005",
            subject: "Filipino",
            code: "FIL-8-ROS",
            grade: "Grade 8",
            section: "Rosal",
            students: 0,
            status: "inactive"
        },

        {
            id: "OFF-006",
            subject: "MAPEH",
            code: "MAPEH-10-LIL",
            grade: "Grade 10",
            section: "Lily",
            students: 35,
            status: "active"
        },

        {
            id: "OFF-007",
            subject: "Mathematics",
            code: "MATH-9-JAS",
            grade: "Grade 9",
            section: "Jasmine",
            students: 0,
            status: "inactive"
        },

        {
            id: "OFF-008",
            subject: "Science",
            code: "SCI-10-LIL",
            grade: "Grade 10",
            section: "Lily",
            students: 0,
            status: "inactive"
        }

    ];


    // SAFE HTML TEXT

    function escapeHTML(value) {

        return String(value).replace(
            /[&<>"']/g,
            character => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[character]
        );

    }


    // ICON SELECTION

    function getSubjectIcon(subject) {

        const icons = {
            "Mathematics": "bi-calculator-fill",
            "English": "bi-book-fill",
            "Science": "bi-flask-fill",
            "Araling Panlipunan": "bi-globe-asia-australia",
            "Filipino": "bi-translate",
            "MAPEH": "bi-palette-fill"
        };

        return icons[subject] || "bi-journal-bookmark-fill";

    }


    // SUMMARY COUNTS

    function updateSummary() {

        const total = offerings.length;

        const active = offerings.filter(
            item => item.status === "active"
        ).length;

        const students = offerings.reduce(
            (sum, item) => sum + item.students,
            0
        );

        const grades = new Set(
            offerings.map(item => item.grade)
        ).size;

        if (totalElement) {
            totalElement.textContent = total;
        }

        if (activeElement) {
            activeElement.textContent = active;
        }

        if (studentsElement) {
            studentsElement.textContent = students;
        }

        if (gradesElement) {
            gradesElement.textContent = grades;
        }

    }


    // RENDER TABLE

    function renderTable() {

        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedStatus = statusFilter
            ? statusFilter.value
            : "all";

        const filtered = offerings.filter(item => {

            const searchableText = [
                item.id,
                item.subject,
                item.code,
                item.grade,
                item.section,
                item.status
            ].join(" ").toLowerCase();

            const matchesSearch =
                searchableText.includes(query);

            const matchesStatus =
                selectedStatus === "all" ||
                item.status === selectedStatus;

            return matchesSearch && matchesStatus;

        });


        tableBody.innerHTML = filtered.map(item => {

            const statusLabel =
                item.status === "active" ? "Active" : "Inactive";

            const statusClass =
                item.status === "active" ? "active" : "inactive";

            return `

                <tr>

                    <td>

                        <div class="teacher-offering-subject">

                            <span class="teacher-offering-subject-icon">
                                <i class="bi ${getSubjectIcon(item.subject)}"></i>
                            </span>

                            <div class="teacher-offering-subject-details">

                                <strong>${escapeHTML(item.subject)}</strong>

                                <small>${escapeHTML(item.code)}</small>

                            </div>

                        </div>

                    </td>

                    <td>
                        <span class="teacher-offering-grade">
                            ${escapeHTML(item.grade)}
                        </span>
                    </td>

                    <td>
                        <span class="teacher-offering-section">
                            ${escapeHTML(item.section)}
                        </span>
                    </td>

                    <td>

                        <span class="teacher-student-count">
                            <i class="bi bi-people"></i>
                            ${item.students}
                        </span>

                    </td>

                    <td>
                        <span class="teacher-offering-status ${statusClass}">
                            ${statusLabel}
                        </span>
                    </td>

                    <td>

                        <button type="button"
                            class="teacher-offering-view"
                            data-offering-view="${escapeHTML(item.id)}">

                            <i class="bi bi-eye"></i>
                            View

                        </button>

                    </td>

                </tr>

            `;

        }).join("");


        // RECORD COUNT

        if (recordCount) {

            recordCount.textContent =
                `${filtered.length} ${filtered.length === 1 ? "record" : "records"}`;

        }


        // EMPTY STATE

        if (emptyState) {
            emptyState.hidden = filtered.length !== 0;
        }

        tableBody.closest(".teacher-table-wrapper").hidden =
            filtered.length === 0;

    }


    // VIEW OFFERING DETAILS

    function showOfferingDetails(id) {

        const offering = offerings.find(
            item => item.id === id
        );

        if (!offering || !modalElement || !modalBody) {
            return;
        }

        const statusLabel =
            offering.status === "active" ? "Active" : "Inactive";

        modalBody.innerHTML = `

            <div class="teacher-detail-row">
                <span>Offering ID</span>
                <strong>${escapeHTML(offering.id)}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Subject</span>
                <strong>${escapeHTML(offering.subject)}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Subject Code</span>
                <strong>${escapeHTML(offering.code)}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Grade-Level</span>
                <strong>${escapeHTML(offering.grade)}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Section</span>
                <strong>${escapeHTML(offering.section)}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Enrolled Students</span>
                <strong>${offering.students}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Offering Status</span>
                <strong>${statusLabel}</strong>
            </div>

            <p style="margin:16px 0 0;color:#94A3B8;font-size:10px;">
                Demonstration information only. Actual assignment
                details will be retrieved from the Backend.
            </p>

        `;

        if (
            typeof bootstrap === "undefined" ||
            !bootstrap.Modal
        ) {

            alert(
                "Offering details are unavailable because Bootstrap Modal has not loaded."
            );

            return;

        }

        bootstrap.Modal.getOrCreateInstance(
            modalElement
        ).show();

    }


    // TABLE ACTION DELEGATION

    tableBody.addEventListener("click", event => {

        const button = event.target.closest(
            "[data-offering-view]"
        );

        if (!button) return;

        showOfferingDetails(
            button.dataset.offeringView
        );

    });


    // SEARCH

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderTable
        );

        searchInput.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                searchInput.value = "";

                renderTable();

            }

        });

    }


    // STATUS FILTER

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            renderTable
        );

    }


    // CLEAR FILTERS

    if (clearButton) {

        clearButton.addEventListener("click", () => {

            if (searchInput) {
                searchInput.value = "";
            }

            if (statusFilter) {
                statusFilter.value = "all";
            }

            renderTable();

        });

    }


    // INITIAL DISPLAY

    updateSummary();
    renderTable();

    console.log(
        "Teacher My Subject Offerings initialized. Demo records:",
        offerings.length
    );

}







/* =====================================================
   F10.3 - MY STUDENTS DIRECTORY
   FRONTEND DEMONSTRATION ONLY
===================================================== */

function initializeTeacherStudents() {

    const tableBody = document.getElementById(
        "teacherStudentTableBody"
    );

    // Do not run on other Teacher pages.

    if (!tableBody) return;

    const searchInput = document.getElementById(
        "teacherStudentSearch"
    );

    const topSearch = document.getElementById(
        "teacherStudentTopSearch"
    );

    const gradeFilter = document.getElementById(
        "teacherStudentGradeFilter"
    );

    const sectionFilter = document.getElementById(
        "teacherStudentSectionFilter"
    );

    const statusFilter = document.getElementById(
        "teacherStudentStatusFilter"
    );

    const clearButton = document.getElementById(
        "teacherStudentClearFilters"
    );

    const emptyState = document.getElementById(
        "teacherStudentEmpty"
    );

    const tableWrapper = document.getElementById(
        "teacherStudentTableWrapper"
    );

    const recordCount = document.getElementById(
        "teacherStudentRecordCount"
    );

    const totalElement = document.getElementById(
        "teacherStudentTotal"
    );

    const activeElement = document.getElementById(
        "teacherStudentActive"
    );

    const gradesElement = document.getElementById(
        "teacherStudentGrades"
    );

    const sectionsElement = document.getElementById(
        "teacherStudentSections"
    );

    const modalElement = document.getElementById(
        "teacherStudentDetailsModal"
    );

    const modalBody = document.getElementById(
        "teacherStudentDetailsBody"
    );


    // SAMPLE STUDENTS
    // Fictional demonstration data only.
    //
    // Official section placement and Subject Offering
    // are intentionally stored as separate properties.

    const students = [

        {
            id: "STU-001",
            name: "Alexandra Reyes",
            grade: "Grade 7",
            section: "Sampaguita",
            offering: "Mathematics",
            offeringCode: "MATH-7-SAM",
            status: "active"
        },

        {
            id: "STU-002",
            name: "Benjamin Santos",
            grade: "Grade 7",
            section: "Sampaguita",
            offering: "Mathematics",
            offeringCode: "MATH-7-SAM",
            status: "active"
        },

        {
            id: "STU-003",
            name: "Camille Garcia",
            grade: "Grade 7",
            section: "Dahlia",
            offering: "Science",
            offeringCode: "SCI-7-DAH",
            status: "active"
        },

        {
            id: "STU-004",
            name: "Daniel Mendoza",
            grade: "Grade 8",
            section: "Rosal",
            offering: "English",
            offeringCode: "ENG-8-ROS",
            status: "active"
        },

        {
            id: "STU-005",
            name: "Ella Fernandez",
            grade: "Grade 8",
            section: "Rosal",
            offering: "Filipino",
            offeringCode: "FIL-8-ROS",
            status: "inactive"
        },

        {
            id: "STU-006",
            name: "Francis Dela Cruz",
            grade: "Grade 9",
            section: "Jasmine",
            offering: "Araling Panlipunan",
            offeringCode: "AP-9-JAS",
            status: "active"
        },

        {
            id: "STU-007",
            name: "Gabriella Torres",
            grade: "Grade 10",
            section: "Lily",
            offering: "MAPEH",
            offeringCode: "MAPEH-10-LIL",
            status: "active"
        },

        {
            id: "STU-008",
            name: "Harrison Villanueva",
            grade: "Grade 10",
            section: "Lily",
            offering: "Science",
            offeringCode: "SCI-10-LIL",
            status: "active"
        }

    ];


    // SAFE HTML TEXT

    function escapeHTML(value) {

        return String(value).replace(
            /[&<>"']/g,
            character => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[character]
        );

    }


    // STUDENT INITIALS

    function getInitials(name) {

        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(part => part.charAt(0).toUpperCase())
            .join("");

    }


    // POPULATE FILTER OPTIONS

    function populateFilters() {

        const grades = [...new Set(
            students.map(student => student.grade)
        )].sort((a, b) => {

            return Number(a.replace(/\D/g, "")) -
                   Number(b.replace(/\D/g, ""));

        });

        const sections = [...new Set(
            students.map(student => student.section)
        )].sort();

        grades.forEach(grade => {

            const option = document.createElement("option");

            option.value = grade;
            option.textContent = grade;

            gradeFilter.appendChild(option);

        });

        sections.forEach(section => {

            const option = document.createElement("option");

            option.value = section;
            option.textContent = section;

            sectionFilter.appendChild(option);

        });

    }


    // SUMMARY COUNTS
    // Counts unique demonstration Student identities,
    // not the number of Subject Enrollment records.

    function updateSummary() {

        const total = students.length;

        const active = students.filter(
            student => student.status === "active"
        ).length;

        const grades = new Set(
            students.map(student => student.grade)
        ).size;

        const sections = new Set(
            students.map(student => student.section)
        ).size;

        totalElement.textContent = total;
        activeElement.textContent = active;
        gradesElement.textContent = grades;
        sectionsElement.textContent = sections;

    }


    // RENDER STUDENT TABLE

    function renderStudents() {

        const query = searchInput.value
            .trim()
            .toLowerCase();

        const selectedGrade = gradeFilter.value;
        const selectedSection = sectionFilter.value;
        const selectedStatus = statusFilter.value;

        const filtered = students.filter(student => {

            const searchableText = [
                student.id,
                student.name,
                student.grade,
                student.section,
                student.offering,
                student.offeringCode
            ].join(" ").toLowerCase();

            const matchesSearch =
                searchableText.includes(query);

            const matchesGrade =
                selectedGrade === "all" ||
                student.grade === selectedGrade;

            const matchesSection =
                selectedSection === "all" ||
                student.section === selectedSection;

            const matchesStatus =
                selectedStatus === "all" ||
                student.status === selectedStatus;

            return (
                matchesSearch &&
                matchesGrade &&
                matchesSection &&
                matchesStatus
            );

        });


        tableBody.innerHTML = filtered.map(student => {

            const statusLabel =
                student.status === "active" ? "Active" : "Inactive";

            const statusClass =
                student.status === "active" ? "active" : "inactive";

            return `

                <tr>

                    <td>

                        <div class="teacher-student-identity">

                            <span class="teacher-student-avatar">
                                ${escapeHTML(getInitials(student.name))}
                            </span>

                            <div class="teacher-student-name">
                                <strong>${escapeHTML(student.name)}</strong>
                                <small>Demonstration Student</small>
                            </div>

                        </div>

                    </td>

                    <td>
                        <span class="teacher-student-id">
                            ${escapeHTML(student.id)}
                        </span>
                    </td>

                    <td>

                        <div class="teacher-student-placement">
                            <strong>${escapeHTML(student.grade)}</strong>
                            <small>${escapeHTML(student.section)}</small>
                        </div>

                    </td>

                    <td>

                        <div class="teacher-student-placement">
                            <strong>${escapeHTML(student.offering)}</strong>
                            <small>${escapeHTML(student.offeringCode)}</small>
                        </div>

                    </td>

                    <td>

                        <span class="teacher-student-status ${statusClass}">
                            ${statusLabel}
                        </span>

                    </td>

                    <td>

                        <button type="button"
                            class="teacher-student-view"
                            data-student-view="${escapeHTML(student.id)}">

                            <i class="bi bi-eye"></i>
                            View

                        </button>

                    </td>

                </tr>

            `;

        }).join("");


        // RECORD COUNT

        recordCount.textContent =
            `${filtered.length} ${filtered.length === 1 ? "record" : "records"}`;


        // TABLE AND EMPTY STATE

        tableWrapper.hidden = filtered.length === 0;

        emptyState.hidden = filtered.length !== 0;

    }


    // STUDENT DETAILS

    function showStudentDetails(studentId) {

        const student = students.find(
            item => item.id === studentId
        );

        if (!student) return;

        const statusLabel =
            student.status === "active" ? "Active" : "Inactive";

        modalBody.innerHTML = `

            <div class="teacher-detail-row">
                <span>Student ID</span>
                <strong>${escapeHTML(student.id)}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Student Name</span>
                <strong>${escapeHTML(student.name)}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Official Grade-Level</span>
                <strong>${escapeHTML(student.grade)}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Official Section</span>
                <strong>${escapeHTML(student.section)}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Subject Offering</span>
                <strong>${escapeHTML(student.offering)}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Offering Code</span>
                <strong>${escapeHTML(student.offeringCode)}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Enrollment Status</span>
                <strong>${statusLabel}</strong>
            </div>

            <p style="margin:16px 0 0;color:#94A3B8;font-size:10px;">
                Demonstration information only. Official Student
                placement and subject enrollment are separate records.
                Actual access will be enforced by the Backend.
            </p>

        `;

        if (
            typeof bootstrap === "undefined" ||
            !bootstrap.Modal
        ) {

            alert(
                "Student details are unavailable because Bootstrap Modal has not loaded."
            );

            return;

        }

        bootstrap.Modal.getOrCreateInstance(
            modalElement
        ).show();

    }


    // VIEW BUTTON EVENT DELEGATION

    tableBody.addEventListener("click", event => {

        const button = event.target.closest(
            "[data-student-view]"
        );

        if (!button) return;

        showStudentDetails(
            button.dataset.studentView
        );

    });


    // DIRECTORY SEARCH

    searchInput.addEventListener(
        "input",
        () => {

            if (topSearch.value !== searchInput.value) {
                topSearch.value = searchInput.value;
            }

            renderStudents();

        }
    );


    // TOPBAR SEARCH SYNCHRONIZATION

    topSearch.addEventListener("input", () => {

        if (searchInput.value !== topSearch.value) {
            searchInput.value = topSearch.value;
        }

        renderStudents();

    });


    // ESCAPE CLEARS SEARCH

    [searchInput, topSearch].forEach(input => {

        input.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                searchInput.value = "";
                topSearch.value = "";

                renderStudents();

            }

        });

    });


    // FILTER EVENTS

    gradeFilter.addEventListener(
        "change",
        renderStudents
    );

    sectionFilter.addEventListener(
        "change",
        renderStudents
    );

    statusFilter.addEventListener(
        "change",
        renderStudents
    );


    // CLEAR FILTERS

    clearButton.addEventListener("click", () => {

        searchInput.value = "";
        topSearch.value = "";

        gradeFilter.value = "all";
        sectionFilter.value = "all";
        statusFilter.value = "all";

        renderStudents();

    });


    // INITIALIZE

    populateFilters();
    updateSummary();
    renderStudents();

    console.log(
        "Teacher My Students initialized. Demonstration records:",
        students.length
    );

}








/* =====================================================
   F10.4 - TEACHER ACTIVITIES MANAGEMENT
   FRONTEND DEMONSTRATION ONLY
===================================================== */

function initializeTeacherActivities() {

    const tableBody = document.getElementById(
        "teacherActivityTableBody"
    );

    // Run only on activities.html.
    // Activity History uses the same table-body ID, so detect the
    // Activities form instead of relying on the shared table ID.

    if (!document.getElementById("teacherActivityForm")) return;

    const searchInput = document.getElementById(
        "teacherActivitySearch"
    );

    const topSearch = document.getElementById(
        "teacherActivityTopSearch"
    );

    const subjectFilter = document.getElementById(
        "teacherActivitySubjectFilter"
    );

    const statusFilter = document.getElementById(
        "teacherActivityStatusFilter"
    );

    const clearButton = document.getElementById(
        "teacherActivityClearFilters"
    );

    const emptyState = document.getElementById(
        "teacherActivityEmpty"
    );

    const tableWrapper = document.getElementById(
        "teacherActivityTableWrapper"
    );

    const recordCount = document.getElementById(
        "teacherActivityRecordCount"
    );

    const totalElement = document.getElementById(
        "teacherActivityTotal"
    );

    const publishedElement = document.getElementById(
        "teacherActivityPublished"
    );

    const draftsElement = document.getElementById(
        "teacherActivityDrafts"
    );

    const closedElement = document.getElementById(
        "teacherActivityClosed"
    );

    const createButton = document.getElementById(
        "teacherCreateActivityButton"
    );

    const form = document.getElementById(
        "teacherActivityForm"
    );

    const formModalElement = document.getElementById(
        "teacherActivityFormModal"
    );

    const detailsModalElement = document.getElementById(
        "teacherActivityDetailsModal"
    );

    const formTitle = document.getElementById(
        "teacherActivityFormTitle"
    );

    const editIdInput = document.getElementById(
        "teacherActivityEditId"
    );

    const titleInput = document.getElementById(
        "teacherActivityTitle"
    );

    const offeringInput = document.getElementById(
        "teacherActivityOffering"
    );

    const typeInput = document.getElementById(
        "teacherActivityType"
    );

    const startDateInput = document.getElementById(
        "teacherActivityStartDate"
    );

    const dueDateInput = document.getElementById(
        "teacherActivityDueDate"
    );

    const instructionsInput = document.getElementById(
        "teacherActivityInstructions"
    );

    const formError = document.getElementById(
        "teacherActivityFormError"
    );

    const saveDraftButton = document.getElementById(
        "teacherSaveDraftButton"
    );

    const publishButton = document.getElementById(
        "teacherPublishActivityButton"
    );

    const detailsTitle = document.getElementById(
        "teacherActivityDetailsTitle"
    );

    const detailsBody = document.getElementById(
        "teacherActivityDetailsBody"
    );

    if (!form || !formModalElement || !detailsModalElement) {
        console.error("Teacher Activities form elements are missing.");
        return;
    }


    // SUBJECT OFFERINGS
    // Fictional demonstration choices only.

    const subjectOfferings = [

        {
            id: "OFF-001",
            name: "Mathematics",
            grade: "Grade 7",
            section: "Sampaguita"
        },

        {
            id: "OFF-002",
            name: "English",
            grade: "Grade 8",
            section: "Rosal"
        },

        {
            id: "OFF-003",
            name: "Science",
            grade: "Grade 7",
            section: "Dahlia"
        },

        {
            id: "OFF-004",
            name: "Araling Panlipunan",
            grade: "Grade 9",
            section: "Jasmine"
        },

        {
            id: "OFF-005",
            name: "MAPEH",
            grade: "Grade 10",
            section: "Lily"
        }

    ];


    // SAMPLE ACTIVITY RECORDS
    // No database records are created.

    let activities = [

        {
            id: "ACT-001",
            title: "Mathematics Worksheet: Fractions",
            offeringId: "OFF-001",
            type: "Worksheet",
            startDate: "2026-11-18",
            dueDate: "2026-11-24",
            instructions: "Answer all the fraction exercises. Show your complete solutions.",
            status: "published"
        },

        {
            id: "ACT-002",
            title: "Science Performance Task",
            offeringId: "OFF-003",
            type: "Performance Task",
            startDate: "2026-11-18",
            dueDate: "2026-11-26",
            instructions: "Complete the assigned Science performance task and submit your work.",
            status: "published"
        },

        {
            id: "ACT-003",
            title: "English Reading Activity",
            offeringId: "OFF-002",
            type: "Reading Activity",
            startDate: "2026-11-19",
            dueDate: "2026-11-27",
            instructions: "Read the assigned passage and answer the comprehension questions.",
            status: "published"
        },

        {
            id: "ACT-004",
            title: "Araling Panlipunan Research",
            offeringId: "OFF-004",
            type: "Project",
            startDate: "2026-11-19",
            dueDate: "2026-11-30",
            instructions: "Prepare a short research report about the assigned historical topic.",
            status: "published"
        },

        {
            id: "ACT-005",
            title: "MAPEH Group Performance",
            offeringId: "OFF-005",
            type: "Performance Task",
            startDate: "2026-11-20",
            dueDate: "2026-12-02",
            instructions: "Prepare and practice the assigned group performance.",
            status: "draft"
        },

        {
            id: "ACT-006",
            title: "Mathematics Practice Exercises",
            offeringId: "OFF-001",
            type: "Assignment",
            startDate: "",
            dueDate: "2026-12-05",
            instructions: "Complete the additional mathematics practice exercises.",
            status: "draft"
        },

        {
            id: "ACT-007",
            title: "English Vocabulary Review",
            offeringId: "OFF-002",
            type: "Worksheet",
            startDate: "",
            dueDate: "2026-12-06",
            instructions: "Review and answer the vocabulary exercises.",
            status: "draft"
        },

        {
            id: "ACT-008",
            title: "Previous Science Activity",
            offeringId: "OFF-003",
            type: "Assignment",
            startDate: "2026-11-10",
            dueDate: "2026-11-15",
            instructions: "Complete the previously assigned Science activity.",
            status: "closed"
        }

    ];


    let nextActivityNumber = 9;

    let requestedSaveStatus = "draft";


    const formModal = bootstrap.Modal.getOrCreateInstance(
        formModalElement
    );

    const detailsModal = bootstrap.Modal.getOrCreateInstance(
        detailsModalElement
    );


    // SAFE TEXT

    function escapeHTML(value) {

        return String(value).replace(
            /[&<>"']/g,
            character => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[character]
        );

    }


    // OFFERING LOOKUP

    function getOffering(id) {

        return subjectOfferings.find(
            offering => offering.id === id
        );

    }


    // DATE DISPLAY

    function formatDate(value) {

        if (!value) return "Not set";

        const date = new Date(value + "T00:00:00");

        if (Number.isNaN(date.getTime())) {
            return "Invalid date";
        }

        return date.toLocaleDateString("en-PH", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });

    }


    // STATUS LABEL

    function getStatusLabel(status) {

        const labels = {
            draft: "Draft",
            published: "Published",
            closed: "Closed"
        };

        return labels[status] || status;

    }


    // STATUS CLASS

    function getStatusClass(status) {

        return status === "published"
            ? "published"
            : status === "closed"
                ? "closed"
                : "draft";

    }


    // POPULATE OFFERING FILTERS

    function populateOfferingFilters() {

        subjectOfferings.forEach(offering => {

            const option = document.createElement("option");

            option.value = offering.id;

            option.textContent =
                `${offering.name} - ${offering.grade} ${offering.section}`;

            subjectFilter.appendChild(option);

        });

        subjectOfferings.forEach(offering => {

            const option = document.createElement("option");

            option.value = offering.id;

            option.textContent =
                `${offering.name} - ${offering.grade} ${offering.section}`;

            offeringInput.appendChild(option);

        });

    }


    // SUMMARY COUNTS

    function updateSummary() {

        totalElement.textContent = activities.length;

        publishedElement.textContent =
            activities.filter(item => item.status === "published").length;

        draftsElement.textContent =
            activities.filter(item => item.status === "draft").length;

        closedElement.textContent =
            activities.filter(item => item.status === "closed").length;

    }


    // RENDER ACTIVITY TABLE

    function renderActivities() {

        const query = searchInput.value.trim().toLowerCase();

        const selectedOffering = subjectFilter.value;

        const selectedStatus = statusFilter.value;

        const filtered = activities.filter(activity => {

            const offering = getOffering(activity.offeringId);

            if (!offering) return false;

            const searchableText = [
                activity.id,
                activity.title,
                activity.type,
                activity.instructions,
                offering.name,
                offering.grade,
                offering.section
            ].join(" ").toLowerCase();

            const matchesSearch =
                searchableText.includes(query);

            const matchesOffering =
                selectedOffering === "all" ||
                activity.offeringId === selectedOffering;

            const matchesStatus =
                selectedStatus === "all" ||
                activity.status === selectedStatus;

            return matchesSearch && matchesOffering && matchesStatus;

        });


        tableBody.innerHTML = filtered.map(activity => {

            const offering = getOffering(activity.offeringId);

            return `

                <tr>

                    <td>
                        <div class="teacher-activity-identity">

                            <span class="teacher-activity-icon">
                                <i class="bi bi-journal-text"></i>
                            </span>

                            <div>
                                <strong>${escapeHTML(activity.title)}</strong>
                                <small>${escapeHTML(activity.id)}</small>
                            </div>

                        </div>
                    </td>

                    <td>
                        <div class="teacher-activity-subject">
                            <strong>${escapeHTML(offering.name)}</strong>
                            <small>${escapeHTML(offering.grade)} · ${escapeHTML(offering.section)}</small>
                        </div>
                    </td>

                    <td>${escapeHTML(activity.type)}</td>

                    <td>
                        <span class="teacher-activity-date">
                            ${escapeHTML(formatDate(activity.dueDate))}
                        </span>
                    </td>

                    <td>
                        <span class="teacher-activity-status ${getStatusClass(activity.status)}">
                            ${getStatusLabel(activity.status)}
                        </span>
                    </td>

                    <td>
                        <div class="teacher-activity-actions">

                            <button type="button"
                                class="teacher-activity-action"
                                title="View details"
                                aria-label="View activity details"
                                data-activity-action="view"
                                data-activity-id="${escapeHTML(activity.id)}">
                                <i class="bi bi-eye"></i>
                            </button>

                            <button type="button"
                                class="teacher-activity-action"
                                title="Edit activity"
                                aria-label="Edit activity"
                                data-activity-action="edit"
                                data-activity-id="${escapeHTML(activity.id)}">
                                <i class="bi bi-pencil"></i>
                            </button>

                            ${activity.status === "draft" ? `
                                <button type="button"
                                    class="teacher-activity-action"
                                    title="Publish activity"
                                    aria-label="Publish activity"
                                    data-activity-action="publish"
                                    data-activity-id="${escapeHTML(activity.id)}">
                                    <i class="bi bi-send"></i>
                                </button>
                            ` : ""}

                            ${activity.status === "published" ? `
                                <button type="button"
                                    class="teacher-activity-action danger"
                                    title="Close activity"
                                    aria-label="Close activity"
                                    data-activity-action="close"
                                    data-activity-id="${escapeHTML(activity.id)}">
                                    <i class="bi bi-lock"></i>
                                </button>
                            ` : ""}

                        </div>
                    </td>

                </tr>

            `;

        }).join("");


        recordCount.textContent =
            `${filtered.length} ${filtered.length === 1 ? "record" : "records"}`;

        tableWrapper.hidden = filtered.length === 0;

        emptyState.hidden = filtered.length !== 0;

        updateSummary();

    }


    // RESET FORM

    function resetForm() {

        form.reset();

        editIdInput.value = "";

        formTitle.textContent = "Create Activity";

        formError.hidden = true;

        requestedSaveStatus = "draft";

    }


    // OPEN CREATE MODAL

    function openCreateModal() {

        resetForm();

        formModal.show();

    }


    // OPEN EDIT MODAL

    function openEditModal(id) {

        const activity = activities.find(
            item => item.id === id
        );

        if (!activity) return;

        resetForm();

        editIdInput.value = activity.id;

        titleInput.value = activity.title;

        offeringInput.value = activity.offeringId;

        typeInput.value = activity.type;

        startDateInput.value = activity.startDate;

        dueDateInput.value = activity.dueDate;

        instructionsInput.value = activity.instructions;

        formTitle.textContent = "Edit Activity";

        formModal.show();

    }


    // SHOW DETAILS

    function showDetails(id) {

        const activity = activities.find(
            item => item.id === id
        );

        if (!activity) return;

        const offering = getOffering(activity.offeringId);

        detailsTitle.textContent = activity.title;

        detailsBody.innerHTML = `

            <div class="teacher-detail-row">
                <span>Activity ID</span>
                <strong>${escapeHTML(activity.id)}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Activity Title</span>
                <strong>${escapeHTML(activity.title)}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Subject Offering</span>
                <strong>${escapeHTML(offering.name)}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Grade-Level and Section</span>
                <strong>${escapeHTML(offering.grade)} · ${escapeHTML(offering.section)}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Activity Type</span>
                <strong>${escapeHTML(activity.type)}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Start Date</span>
                <strong>${escapeHTML(formatDate(activity.startDate))}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Due Date</span>
                <strong>${escapeHTML(formatDate(activity.dueDate))}</strong>
            </div>

            <div class="teacher-detail-row">
                <span>Status</span>
                <strong>${getStatusLabel(activity.status)}</strong>
            </div>

            <div style="margin-top:16px;">
                <strong style="display:block;color:#16324F;font-size:12px;margin-bottom:8px;">
                    Activity Instructions
                </strong>

                <p style="white-space:pre-wrap;color:#64748B;font-size:11px;line-height:1.7;">
                    ${escapeHTML(activity.instructions)}
                </p>
            </div>

            <p style="margin-top:15px;color:#94A3B8;font-size:10px;">
                Demonstration information only. No database records are stored.
            </p>

        `;

        detailsModal.show();

    }


    // FORM VALIDATION AND SAVE

    function saveActivity(status) {

        formError.hidden = true;

        if (!form.reportValidity()) return;

        const title = titleInput.value.trim();

        const offeringId = offeringInput.value;

        const type = typeInput.value;

        const startDate = startDateInput.value;

        const dueDate = dueDateInput.value;

        const instructions = instructionsInput.value.trim();

        if (!getOffering(offeringId)) {

            formError.textContent =
                "Please select a valid assigned Subject Offering.";

            formError.hidden = false;

            return;

        }

        if (
            startDate &&
            dueDate &&
            dueDate < startDate
        ) {

            formError.textContent =
                "The due date cannot be earlier than the start date.";

            formError.hidden = false;

            dueDateInput.focus();

            return;

        }

        const existingId = editIdInput.value;

        if (existingId) {

            const existing = activities.find(
                item => item.id === existingId
            );

            if (!existing) return;

            existing.title = title;
            existing.offeringId = offeringId;
            existing.type = type;
            existing.startDate = startDate;
            existing.dueDate = dueDate;
            existing.instructions = instructions;
            existing.status = status;

        } else {

            const newId =
                "ACT-" + String(nextActivityNumber++).padStart(3, "0");

            activities.unshift({

                id: newId,
                title,
                offeringId,
                type,
                startDate,
                dueDate,
                instructions,
                status

            });

        }

        renderActivities();

        formModal.hide();

        alert(
            status === "published"
                ? "Demonstration only: Activity published in the local page."
                : "Demonstration only: Activity saved as a draft in the local page."
        );

    }


    // TABLE ACTIONS

    tableBody.addEventListener("click", event => {

        const button = event.target.closest(
            "[data-activity-action]"
        );

        if (!button) return;

        const id = button.dataset.activityId;

        const action = button.dataset.activityAction;

        const activity = activities.find(
            item => item.id === id
        );

        if (!activity) return;

        if (action === "view") {
            showDetails(id);
        }

        if (action === "edit") {
            openEditModal(id);
        }

        if (action === "publish") {

            if (activity.status !== "draft") return;

            const confirmed = window.confirm(
                "Publish this activity in the demonstration?"
            );

            if (!confirmed) return;

            activity.status = "published";

            renderActivities();

        }

        if (action === "close") {

            if (activity.status !== "published") return;

            const confirmed = window.confirm(
                "Close this published activity in the demonstration?"
            );

            if (!confirmed) return;

            activity.status = "closed";

            renderActivities();

        }

    });


    // CREATE ACTIVITY

    createButton.addEventListener(
        "click",
        openCreateModal
    );


    // SAVE DRAFT

    saveDraftButton.addEventListener("click", () => {

        requestedSaveStatus = "draft";

        saveActivity("draft");

    });


    // PUBLISH

    publishButton.addEventListener("click", () => {

        const confirmed = window.confirm(
            "Publish this activity in the demonstration?"
        );

        if (!confirmed) return;

        requestedSaveStatus = "published";

        saveActivity("published");

    });


    // FORM SUBMISSION

    form.addEventListener("submit", event => {

        event.preventDefault();

        saveActivity(requestedSaveStatus);

    });


    // DIRECTORY SEARCH

    function syncSearch(value) {

        searchInput.value = value;

        topSearch.value = value;

        renderActivities();

    }

    searchInput.addEventListener("input", () => {

        syncSearch(searchInput.value);

    });

    topSearch.addEventListener("input", () => {

        syncSearch(topSearch.value);

    });


    // ESCAPE CLEARS SEARCH

    [searchInput, topSearch].forEach(input => {

        input.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                syncSearch("");

                input.blur();

            }

        });

    });


    // FILTERS

    subjectFilter.addEventListener(
        "change",
        renderActivities
    );

    statusFilter.addEventListener(
        "change",
        renderActivities
    );


    // CLEAR FILTERS

    clearButton.addEventListener("click", () => {

        searchInput.value = "";

        topSearch.value = "";

        subjectFilter.value = "all";

        statusFilter.value = "all";

        renderActivities();

    });


    // INITIALIZE

    populateOfferingFilters();

    updateSummary();

    renderActivities();

    console.log(
        "Teacher Activities initialized. Demo records:",
        activities.length
    );

}







/* =========================================================
   F10.5 - TEACHER SUBMISSIONS & REVISIONS
   FRONTEND DEMONSTRATION ONLY
   ========================================================= */

function initializeTeacherSubmissions() {

    const tableBody = document.getElementById(
        "teacherSubmissionTableBody"
    );

    if (!tableBody) return;

    const getElement = id => document.getElementById(id);

    const searchInput = getElement("teacherSubmissionSearch");
    const topSearch = getElement("teacherSubmissionTopSearch");
    const offeringFilter = getElement("teacherSubmissionOfferingFilter");
    const statusFilter = getElement("teacherSubmissionStatusFilter");
    const emptyState = getElement("teacherSubmissionEmpty");

    const detailsElement = getElement("teacherSubmissionDetailsModal");
    const reviewElement = getElement("teacherSubmissionReviewModal");
    const revisionElement = getElement("teacherSubmissionRevisionModal");

    if (
        !searchInput || !topSearch || !offeringFilter ||
        !statusFilter || !emptyState || !detailsElement ||
        !reviewElement || !revisionElement || !window.bootstrap
    ) {
        console.error("F10.5: Required page elements are missing.");
        return;
    }

    const detailsModal = bootstrap.Modal.getOrCreateInstance(detailsElement);
    const reviewModal = bootstrap.Modal.getOrCreateInstance(reviewElement);
    const revisionModal = bootstrap.Modal.getOrCreateInstance(revisionElement);

    let selectedId = null;

    // -----------------------------------------------------
    // 1. DEMONSTRATION SUBMISSION RECORDS
    // -----------------------------------------------------

    const submissions = [

        {
            id: "SUB-001",
            student: "Alyssa Mae Santos",
            studentId: "STU-2026-014",
            activity: "Fractions Performance Task",
            offering: "Mathematics 6 - Sampaguita",
            submittedAt: "2026-11-18T09:15",
            status: "submitted",
            method: "FILE",
            files: ["fractions-output.pdf"],
            feedback: "",
            revisionRequests: []
        },

        {
            id: "SUB-002",
            student: "Joshua Miguel Reyes",
            studentId: "STU-2026-021",
            activity: "Reading Reflection",
            offering: "English 6 - Sampaguita",
            submittedAt: "2026-11-17T16:40",
            status: "late",
            method: "LINK",
            files: ["https://example.edu/demo-reading-reflection"],
            feedback: "",
            revisionRequests: []
        },

        {
            id: "SUB-003",
            student: "Camille Dizon",
            studentId: "STU-2026-008",
            activity: "Ecosystem Poster",
            offering: "Science 6 - Rosal",
            submittedAt: "2026-11-16T13:05",
            status: "revision-requested",
            method: "FILE",
            files: ["ecosystem-poster.png"],
            feedback: "Please add labels to the food chain and cite your sources.",
            revisionRequests: [
                {
                    instructions: "Please add labels to the food chain and cite your sources.",
                    deadline: "2026-11-23T17:00",
                    requestedAt: "2026-11-17T10:00"
                }
            ]
        },

        {
            id: "SUB-004",
            student: "Daniel Cruz",
            studentId: "STU-2026-032",
            activity: "Word Problem Worksheet",
            offering: "Mathematics 6 - Rosal",
            submittedAt: "2026-11-19T08:30",
            status: "resubmitted",
            method: "FILE",
            files: ["word-problems-revised.pdf"],
            feedback: "Second version received. Check the corrected solution steps.",
            revisionRequests: [
                {
                    instructions: "Show the complete solution for items 3 and 4.",
                    deadline: "2026-11-19T17:00",
                    requestedAt: "2026-11-17T09:30"
                }
            ]
        },

        {
            id: "SUB-005",
            student: "Sophia Garcia",
            studentId: "STU-2026-011",
            activity: "Plant Growth Journal",
            offering: "Science 6 - Sampaguita",
            submittedAt: "2026-11-15T11:20",
            status: "reviewed",
            method: "FILE",
            files: ["plant-growth-journal.docx"],
            feedback: "Well-organized observations and clear conclusions. Good work!",
            revisionRequests: []
        },

        {
            id: "SUB-006",
            student: "Nathaniel Flores",
            studentId: "STU-2026-019",
            activity: "Paragraph Writing",
            offering: "English 6 - Rosal",
            submittedAt: "2026-11-18T14:10",
            status: "submitted",
            method: "LINK",
            files: ["https://example.edu/demo-paragraph"],
            feedback: "",
            revisionRequests: []
        },

        {
            id: "SUB-007",
            student: "Isabella Ramos",
            studentId: "STU-2026-027",
            activity: "Geometry Art Project",
            offering: "Mathematics 6 - Sampaguita",
            submittedAt: "2026-11-14T15:45",
            status: "reviewed",
            method: "FILE",
            files: ["geometry-art.jpg"],
            feedback: "Creative work. Your use of geometric shapes is accurate.",
            revisionRequests: [
                {
                    instructions: "Please clarify the labels for the shapes used.",
                    deadline: "2026-11-16T17:00",
                    requestedAt: "2026-11-14T16:00"
                }
            ]
        },

        {
            id: "SUB-008",
            student: "Ethan Villanueva",
            studentId: "STU-2026-005",
            activity: "Water Cycle Diagram",
            offering: "Science 6 - Rosal",
            submittedAt: "2026-11-19T10:05",
            status: "submitted",
            method: "FILE",
            files: ["water-cycle-diagram.pdf"],
            feedback: "",
            revisionRequests: []
        }

    ];

    // -----------------------------------------------------
    // 2. STATUS LABELS AND HELPERS
    // -----------------------------------------------------

    const statusLabels = {
        submitted: "Submitted",
        late: "Late",
        "revision-requested": "Revision Requested",
        resubmitted: "Resubmitted",
        reviewed: "Reviewed"
    };

    const escapeHTML = value => {

        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);

    };

    const formatDate = value => {

        if (!value) return "—";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "—";

        return date.toLocaleString("en-PH", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
        });

    };

    const statusClass = status => {

        return {
            submitted: "submitted",
            late: "late",
            "revision-requested": "revision-requested",
            resubmitted: "resubmitted",
            reviewed: "reviewed"
        }[status] || "submitted";

    };

    const getInitials = name => {

        return name
            .split(" ")
            .map(part => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

    };

    // -----------------------------------------------------
    // 3. POPULATE SUBJECT OFFERING FILTER
    // -----------------------------------------------------

    const offerings = [
        ...new Set(submissions.map(item => item.offering))
    ].sort();

    offerings.forEach(offering => {

        const option = document.createElement("option");

        option.value = offering;
        option.textContent = offering;

        offeringFilter.appendChild(option);

    });

    // -----------------------------------------------------
    // 4. SUMMARY CARDS
    // -----------------------------------------------------

    function updateSummary() {

        getElement("teacherSubmissionTotal").textContent =
            submissions.length;

        getElement("teacherSubmissionPending").textContent =
            submissions.filter(item =>
                ["submitted", "late", "resubmitted"].includes(item.status)
            ).length;

        getElement("teacherSubmissionRevision").textContent =
            submissions.filter(item =>
                item.status === "revision-requested"
            ).length;

        getElement("teacherSubmissionReviewed").textContent =
            submissions.filter(item =>
                item.status === "reviewed"
            ).length;

    }

    // -----------------------------------------------------
    // 5. RENDER SUBMISSION TABLE
    // -----------------------------------------------------

    function renderSubmissions() {

        const query = searchInput.value.trim().toLowerCase();
        const offering = offeringFilter.value;
        const status = statusFilter.value;

        const filtered = submissions.filter(item => {

            const searchableValues = [
                item.id,
                item.student,
                item.studentId,
                item.activity,
                item.offering
            ];

            const matchesSearch = searchableValues.some(value =>
                value.toLowerCase().includes(query)
            );

            const matchesOffering =
                offering === "all" || item.offering === offering;

            const matchesStatus =
                status === "all" || item.status === status;

            return matchesSearch && matchesOffering && matchesStatus;

        });

        tableBody.innerHTML = filtered.map(item => `

            <tr>

                <td>
                    <div class="teacher-student-cell">

                        <span class="teacher-student-avatar">
                            ${escapeHTML(getInitials(item.student))}
                        </span>

                        <div class="teacher-student-info">
                            <strong>${escapeHTML(item.student)}</strong>
                            <small>
                                ${escapeHTML(item.studentId)}
                                · ${escapeHTML(item.id)}
                            </small>
                        </div>

                    </div>
                </td>

                <td>
                    <div class="teacher-submission-activity">
                        <strong>${escapeHTML(item.activity)}</strong>
                        <small>${escapeHTML(item.method)} Submission</small>
                    </div>
                </td>

                <td>
                    <span class="teacher-submission-offering">
                        ${escapeHTML(item.offering)}
                    </span>
                </td>

                <td>
                    <span class="teacher-submission-date">
                        ${escapeHTML(formatDate(item.submittedAt))}
                    </span>
                </td>

                <td>
                    <span class="teacher-submission-status ${statusClass(item.status)}">
                        ${escapeHTML(statusLabels[item.status])}
                    </span>
                </td>

                <td>
                    <div class="teacher-submission-actions">

                        <button type="button"
                            class="teacher-submission-action secondary"
                            data-submission-action="view"
                            data-id="${escapeHTML(item.id)}">

                            <i class="bi bi-eye"></i>
                            View

                        </button>

                        <button type="button"
                            class="teacher-submission-action"
                            data-submission-action="review"
                            data-id="${escapeHTML(item.id)}">

                            <i class="bi bi-chat-left-text"></i>
                            Review

                        </button>

                    </div>
                </td>

            </tr>

        `).join("");

        emptyState.hidden = filtered.length !== 0;

        getElement("teacherSubmissionRecordCount").textContent =
            `${filtered.length} record${filtered.length === 1 ? "" : "s"}`;

    }

    // -----------------------------------------------------
    // 6. SELECTED SUBMISSION
    // -----------------------------------------------------

    function getSelectedSubmission() {

        return submissions.find(item => item.id === selectedId);

    }

    // -----------------------------------------------------
    // 7. SUBMISSION DETAILS
    // -----------------------------------------------------

    function showDetails(id) {

        const item = submissions.find(record => record.id === id);

        if (!item) return;

        selectedId = id;

        const history = item.revisionRequests.length

            ? item.revisionRequests.map((request, index) => `

                <div class="teacher-submission-history-item">

                    <strong>Revision Round ${index + 1}</strong>

                    <small>
                        Requested: ${escapeHTML(formatDate(request.requestedAt))}
                    </small>

                    <small>
                        Instructions: ${escapeHTML(request.instructions)}
                    </small>

                    <small>
                        Revision Deadline: ${escapeHTML(formatDate(request.deadline))}
                    </small>

                </div>

            `).join("")

            : `
                <p class="text-muted small">
                    No revision requests recorded.
                </p>
            `;

        getElement("teacherSubmissionDetailsTitle").textContent =
            item.student;

        getElement("teacherSubmissionDetailsBody").innerHTML = `

            <div class="teacher-submission-details-grid">

                <div class="teacher-submission-detail-item">
                    <span>Submission ID</span>
                    <strong>${escapeHTML(item.id)}</strong>
                </div>

                <div class="teacher-submission-detail-item">
                    <span>Student ID</span>
                    <strong>${escapeHTML(item.studentId)}</strong>
                </div>

                <div class="teacher-submission-detail-item">
                    <span>Student</span>
                    <strong>${escapeHTML(item.student)}</strong>
                </div>

                <div class="teacher-submission-detail-item">
                    <span>Activity</span>
                    <strong>${escapeHTML(item.activity)}</strong>
                </div>

                <div class="teacher-submission-detail-item">
                    <span>Subject Offering</span>
                    <strong>${escapeHTML(item.offering)}</strong>
                </div>

                <div class="teacher-submission-detail-item">
                    <span>Submitted</span>
                    <strong>${escapeHTML(formatDate(item.submittedAt))}</strong>
                </div>

                <div class="teacher-submission-detail-item">
                    <span>Submission Method</span>
                    <strong>${escapeHTML(item.method)}</strong>
                </div>

                <div class="teacher-submission-detail-item">
                    <span>Status</span>
                    <strong>${escapeHTML(statusLabels[item.status])}</strong>
                </div>

                <div class="teacher-submission-detail-item">
                    <span>Revision Rounds</span>
                    <strong>${item.revisionRequests.length}</strong>
                </div>

                <div class="teacher-submission-detail-item full">
                    <span>Submitted Files / Link</span>

                    ${item.files.map(file => `
                        <strong class="d-block mb-1">
                            <i class="bi ${item.method === "FILE" ? "bi-file-earmark" : "bi-link-45deg"} me-1"></i>
                            ${escapeHTML(file)}
                        </strong>
                    `).join("")}

                    <small class="text-muted">
                        Demonstration filename/link only. No actual file access.
                    </small>
                </div>

                <div class="teacher-submission-detail-item full">
                    <span>Latest Feedback</span>
                    <strong>
                        ${item.feedback
                            ? escapeHTML(item.feedback)
                            : "No feedback recorded yet."}
                    </strong>
                </div>

            </div>

            <div class="teacher-submission-history">

                <h6>
                    <i class="bi bi-clock-history me-1"></i>
                    Revision History
                </h6>

                ${history}

            </div>

            ${item.status === "revision-requested" ? `

                <button type="button"
                    class="teacher-secondary-button mt-3"
                    data-submission-action="demo-resubmitted"
                    data-id="${escapeHTML(item.id)}">

                    <i class="bi bi-arrow-repeat"></i>
                    Simulate Student Resubmission

                </button>

                <p class="text-muted mt-2 small">
                    Demonstration only. This allows the Teacher to review
                    another version and request another revision if needed.
                </p>

            ` : ""}

            <div class="teacher-submission-modal-notice mt-3">

                <i class="bi bi-info-circle"></i>

                <span>
                    Demonstration record only. Actual access must be
                    restricted by Backend authorization and Teacher assignment.
                </span>

            </div>

        `;

        getElement("teacherSubmissionRequestFromDetails").hidden =
            item.status === "revision-requested";

        detailsModal.show();

    }

    // -----------------------------------------------------
    // 8. OPEN REVIEW MODAL
    // -----------------------------------------------------

    function openReview(id, fromDetails = false) {

        const item = submissions.find(record => record.id === id);

        if (!item) return;

        selectedId = id;

        getElement("teacherSubmissionReviewContext").textContent =
            `${item.student} · ${item.activity}`;

        getElement("teacherSubmissionFeedback").value =
            item.feedback || "";

        getElement("teacherSubmissionReviewError").hidden = true;

        if (fromDetails) {

            detailsElement.addEventListener(
                "hidden.bs.modal",
                () => reviewModal.show(),
                { once: true }
            );

            detailsModal.hide();

        } else {

            reviewModal.show();

        }

    }

    // -----------------------------------------------------
    // 9. OPEN REVISION REQUEST MODAL
    // -----------------------------------------------------

    function openRevision(id, fromDetails = false) {

        const item = submissions.find(record => record.id === id);

        if (!item || item.status === "revision-requested") return;

        selectedId = id;

        getElement("teacherSubmissionRevisionContext").textContent =
            `${item.student} · ${item.activity}`;

        getElement("teacherSubmissionRevisionInstructions").value = "";

        getElement("teacherSubmissionRevisionDeadline").value = "";

        getElement("teacherSubmissionRevisionError").hidden = true;

        if (fromDetails) {

            detailsElement.addEventListener(
                "hidden.bs.modal",
                () => revisionModal.show(),
                { once: true }
            );

            detailsModal.hide();

        } else {

            revisionModal.show();

        }

    }

    // -----------------------------------------------------
    // 10. TABLE ACTIONS
    // -----------------------------------------------------

    tableBody.addEventListener("click", event => {

        const button = event.target.closest(
            "[data-submission-action]"
        );

        if (!button) return;

        const id = button.dataset.id;
        const action = button.dataset.submissionAction;

        if (action === "view") {
            showDetails(id);
        }

        if (action === "review") {
            openReview(id);
        }

    });

    // -----------------------------------------------------
    // 11. DETAILS MODAL ACTIONS
    // -----------------------------------------------------

    getElement("teacherSubmissionReviewFromDetails")
        .addEventListener("click", () => {

            if (selectedId) {
                openReview(selectedId, true);
            }

        });

    getElement("teacherSubmissionRequestFromDetails")
        .addEventListener("click", () => {

            if (selectedId) {
                openRevision(selectedId, true);
            }

        });

    getElement("teacherSubmissionDetailsBody")
        .addEventListener("click", event => {

            const button = event.target.closest(
                '[data-submission-action="demo-resubmitted"]'
            );

            if (!button) return;

            const item = submissions.find(
                record => record.id === button.dataset.id
            );

            if (!item || item.status !== "revision-requested") return;

            const confirmed = window.confirm(
                "Demonstration only: mark this submission as resubmitted?"
            );

            if (!confirmed) return;

            item.status = "resubmitted";

            updateSummary();
            renderSubmissions();

            showDetails(item.id);

        });

    // -----------------------------------------------------
    // 12. SAVE REVIEW AND FEEDBACK
    // -----------------------------------------------------

    getElement("teacherSubmissionReviewForm")
        .addEventListener("submit", event => {

            event.preventDefault();

            const item = getSelectedSubmission();

            if (!item) return;

            const feedback = getElement(
                "teacherSubmissionFeedback"
            ).value.trim();

            const error = getElement(
                "teacherSubmissionReviewError"
            );

            error.hidden = true;

            if (!feedback) {

                error.textContent =
                    "Please enter feedback before saving.";

                error.hidden = false;

                getElement("teacherSubmissionFeedback").focus();

                return;

            }

            item.feedback = feedback;
            item.status = "reviewed";

            reviewModal.hide();

            updateSummary();
            renderSubmissions();

            window.alert(
                "Demonstration only: review and feedback saved in this page session. No Student notification was sent."
            );

        });

    // -----------------------------------------------------
    // 13. SUBMIT REVISION REQUEST
    // -----------------------------------------------------

    getElement("teacherSubmissionRevisionForm")
        .addEventListener("submit", event => {

            event.preventDefault();

            const item = getSelectedSubmission();

            if (!item) return;

            const instructions = getElement(
                "teacherSubmissionRevisionInstructions"
            ).value.trim();

            const deadline = getElement(
                "teacherSubmissionRevisionDeadline"
            ).value;

            const error = getElement(
                "teacherSubmissionRevisionError"
            );

            error.hidden = true;

            if (!instructions || !deadline) {

                error.textContent =
                    "Complete the revision instructions and deadline.";

                error.hidden = false;

                return;

            }

            if (new Date(deadline).getTime() <= Date.now()) {

                error.textContent =
                    "The revision deadline must be in the future.";

                error.hidden = false;

                getElement(
                    "teacherSubmissionRevisionDeadline"
                ).focus();

                return;

            }

            if (item.status === "revision-requested") {

                error.textContent =
                    "A revision request is already awaiting Student resubmission.";

                error.hidden = false;

                return;

            }

            item.revisionRequests.push({

                instructions: instructions,

                deadline: deadline,

                requestedAt: new Date().toISOString()

            });

            item.feedback = instructions;

            item.status = "revision-requested";

            revisionModal.hide();

            updateSummary();
            renderSubmissions();

            window.alert(
                "Demonstration only: revision request recorded locally. The Student has not been notified. The initial submission period remains closed according to its original deadline."
            );

        });

    // -----------------------------------------------------
    // 14. SYNCHRONIZED SEARCH
    // -----------------------------------------------------

    function synchronizeSearch(value) {

        searchInput.value = value;
        topSearch.value = value;

        renderSubmissions();

    }

    searchInput.addEventListener("input", () => {

        synchronizeSearch(searchInput.value);

    });

    topSearch.addEventListener("input", () => {

        synchronizeSearch(topSearch.value);

    });

    [searchInput, topSearch].forEach(input => {

        input.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                synchronizeSearch("");

                input.blur();

            }

        });

    });

    // -----------------------------------------------------
    // 15. FILTER EVENTS
    // -----------------------------------------------------

    offeringFilter.addEventListener(
        "change",
        renderSubmissions
    );

    statusFilter.addEventListener(
        "change",
        renderSubmissions
    );

    getElement("teacherSubmissionClearFilters")
        .addEventListener("click", () => {

            searchInput.value = "";
            topSearch.value = "";

            offeringFilter.value = "all";
            statusFilter.value = "all";

            renderSubmissions();

        });

    // -----------------------------------------------------
    // 16. INITIALIZE PAGE
    // -----------------------------------------------------

    updateSummary();

    renderSubmissions();

    console.log(
        "F10.5 Teacher Submissions & Revisions initialized.",
        submissions.length,
        "demonstration records."
    );

}







/* =========================================================
   F10.6 - TEACHER QUIZ MANAGEMENT
   FRONTEND DEMONSTRATION ONLY
   ========================================================= */

function initializeTeacherQuizzes() {

    const tableBody = document.getElementById("teacherQuizTableBody");
    if (!tableBody) return;

    const $ = id => document.getElementById(id);

    const searchInput = $("teacherQuizSearch");
    const topSearch = $("teacherQuizTopSearch");
    const offeringFilter = $("teacherQuizOfferingFilter");
    const statusFilter = $("teacherQuizStatusFilter");
    const editorForm = $("teacherQuizEditorForm");
    const questionList = $("teacherQuizQuestionList");

    const editorElement = $("teacherQuizEditorModal");
    const detailsElement = $("teacherQuizDetailsModal");

    if (!searchInput || !topSearch || !offeringFilter ||
        !statusFilter || !editorForm || !questionList ||
        !editorElement || !detailsElement || !window.bootstrap) {
        console.error("F10.6: Required Quiz Management elements are missing.");
        return;
    }

    const editorModal = bootstrap.Modal.getOrCreateInstance(editorElement);
    const detailsModal = bootstrap.Modal.getOrCreateInstance(detailsElement);

    // F10.6 ACCESSIBILITY FIX - QUIZ EDITOR MODAL

let editorReturnFocus = $("teacherCreateQuizButton");

// Remove focus before Bootstrap hides the modal.
editorElement.addEventListener("hide.bs.modal", () => {

    if (editorElement.contains(document.activeElement)) {
        document.activeElement.blur();
    }

});

// Restore focus after the modal has completely closed.
editorElement.addEventListener("hidden.bs.modal", () => {

    if (
        editorReturnFocus &&
        editorReturnFocus.isConnected &&
        !editorReturnFocus.closest(".modal.show")
    ) {
        editorReturnFocus.focus();
    } else {
        searchInput.focus();
    }

});

    let selectedQuizId = null;
    let editingQuizId = null;
    let questionCounter = 0;

    const offerings = [
        "Mathematics 6 - Sampaguita",
        "Mathematics 6 - Rosal",
        "English 6 - Sampaguita",
        "English 6 - Rosal",
        "Science 6 - Sampaguita",
        "Science 6 - Rosal"
    ];

    const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);

    const formatDate = value => {
        if (!value) return "Not scheduled";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "Not scheduled";

        return date.toLocaleString("en-PH", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
        });
    };

    const statusLabels = {
        draft: "Draft",
        published: "Published",
        closed: "Closed"
    };

    // -----------------------------------------------------
    // 1. SAMPLE QUIZZES
    // Each record represents a Quiz with versioned content.
    // -----------------------------------------------------

    const quizzes = [

        {
            id: "QUIZ-001",
            title: "Fractions and Decimals Assessment",
            offering: offerings[0],
            instructions: "Read each question carefully. Select the correct answer.",
            status: "published",
            currentVersion: 1,
            versions: [{
                version: 1,
                attemptLimit: 2,
                timeLimit: 30,
                startDate: "2026-11-15T08:00",
                endDate: "2026-11-25T17:00",
                questions: [
                    {
                        id: "Q1",
                        type: "multiple-choice",
                        text: "What is 1/2 expressed as a decimal?",
                        points: 1,
                        options: [
                            { text: "0.25", correct: false },
                            { text: "0.50", correct: true },
                            { text: "0.75", correct: false },
                            { text: "1.50", correct: false }
                        ]
                    }
                ]
            }]
        },

        {
            id: "QUIZ-002",
            title: "Reading Comprehension Quiz",
            offering: offerings[2],
            instructions: "Read the passage before answering.",
            status: "draft",
            currentVersion: 1,
            versions: [{
                version: 1,
                attemptLimit: 1,
                timeLimit: 20,
                startDate: "",
                endDate: "",
                questions: [
                    {
                        id: "Q1",
                        type: "multiple-choice",
                        text: "What is the main idea of a passage?",
                        points: 2,
                        options: [
                            { text: "The central message", correct: true },
                            { text: "The longest sentence", correct: false }
                        ]
                    }
                ]
            }]
        },

        {
            id: "QUIZ-003",
            title: "Ecosystems and Food Chains",
            offering: offerings[4],
            instructions: "Choose the best answers for each question.",
            status: "published",
            currentVersion: 2,
            versions: [
                {
                    version: 1,
                    attemptLimit: 1,
                    timeLimit: 25,
                    startDate: "2026-11-10T08:00",
                    endDate: "2026-11-15T17:00",
                    questions: []
                },
                {
                    version: 2,
                    attemptLimit: 3,
                    timeLimit: 30,
                    startDate: "2026-11-18T08:00",
                    endDate: "2026-11-28T17:00",
                    questions: [
                        {
                            id: "Q1",
                            type: "multiple-select",
                            text: "Which of these are producers?",
                            points: 2,
                            options: [
                                { text: "Grass", correct: true },
                                { text: "Mushroom", correct: false },
                                { text: "Algae", correct: true },
                                { text: "Lion", correct: false }
                            ]
                        }
                    ]
                }
            ]
        },

        {
            id: "QUIZ-004",
            title: "Geometry Fundamentals",
            offering: offerings[1],
            instructions: "Answer all geometry questions.",
            status: "closed",
            currentVersion: 1,
            versions: [{
                version: 1,
                attemptLimit: 2,
                timeLimit: 40,
                startDate: "2026-11-01T08:00",
                endDate: "2026-11-12T17:00",
                questions: [
                    {
                        id: "Q1",
                        type: "multiple-choice",
                        text: "How many sides does a hexagon have?",
                        points: 1,
                        options: [
                            { text: "Five", correct: false },
                            { text: "Six", correct: true },
                            { text: "Seven", correct: false },
                            { text: "Eight", correct: false }
                        ]
                    }
                ]
            }]
        },

        {
            id: "QUIZ-005",
            title: "Parts of Speech",
            offering: offerings[3],
            instructions: "Identify the correct grammatical answer.",
            status: "draft",
            currentVersion: 1,
            versions: [{
                version: 1,
                attemptLimit: 2,
                timeLimit: 15,
                startDate: "",
                endDate: "",
                questions: []
            }]
        },

        {
            id: "QUIZ-006",
            title: "Water Cycle Review",
            offering: offerings[5],
            instructions: "Complete the water cycle assessment.",
            status: "published",
            currentVersion: 1,
            versions: [{
                version: 1,
                attemptLimit: 1,
                timeLimit: 20,
                startDate: "2026-11-19T08:00",
                endDate: "2026-11-29T17:00",
                questions: [
                    {
                        id: "Q1",
                        type: "multiple-choice",
                        text: "What process changes liquid water into vapor?",
                        points: 1,
                        options: [
                            { text: "Condensation", correct: false },
                            { text: "Evaporation", correct: true },
                            { text: "Precipitation", correct: false },
                            { text: "Collection", correct: false }
                        ]
                    }
                ]
            }]
        }

    ];

    // -----------------------------------------------------
    // 2. VERSION AND QUESTION HELPERS
    // -----------------------------------------------------

    function getCurrentVersion(quiz) {
        return quiz.versions.find(
            version => version.version === quiz.currentVersion
        );
    }

    function cloneQuestions(questions) {
        return questions.map(question => ({
            id: question.id,
            type: question.type,
            text: question.text,
            points: question.points,
            options: question.options.map(option => ({
                text: option.text,
                correct: option.correct
            }))
        }));
    }

    function getTotalPoints(questions) {
        return questions.reduce(
            (total, question) => total + Number(question.points || 0),
            0
        );
    }

    // -----------------------------------------------------
    // 3. POPULATE OFFERING FILTERS
    // -----------------------------------------------------

    offerings.forEach(offering => {

        const option = document.createElement("option");
        option.value = offering;
        option.textContent = offering;
        offeringFilter.appendChild(option);

        const formOption = document.createElement("option");
        formOption.value = offering;
        formOption.textContent = offering;
        $("teacherQuizOfferingInput").appendChild(formOption);

    });

    // -----------------------------------------------------
    // 4. SUMMARY CARDS
    // -----------------------------------------------------

    function updateSummary() {

        $("teacherQuizTotal").textContent = quizzes.length;

        $("teacherQuizDrafts").textContent =
            quizzes.filter(quiz => quiz.status === "draft").length;

        $("teacherQuizPublished").textContent =
            quizzes.filter(quiz => quiz.status === "published").length;

        $("teacherQuizClosed").textContent =
            quizzes.filter(quiz => quiz.status === "closed").length;

    }

    // -----------------------------------------------------
    // 5. RENDER QUIZ DIRECTORY
    // -----------------------------------------------------

    function renderQuizzes() {

        const query = searchInput.value.trim().toLowerCase();
        const offering = offeringFilter.value;
        const status = statusFilter.value;

        const filtered = quizzes.filter(quiz => {

            const matchesSearch = [
                quiz.id,
                quiz.title,
                quiz.offering
            ].some(value => value.toLowerCase().includes(query));

            const matchesOffering =
                offering === "all" || quiz.offering === offering;

            const matchesStatus =
                status === "all" || quiz.status === status;

            return matchesSearch && matchesOffering && matchesStatus;

        });

        tableBody.innerHTML = filtered.map(quiz => {

            const version = getCurrentVersion(quiz);

            return `
                <tr>

                    <td>
                        <div class="teacher-quiz-title-cell">
                            <strong>${escapeHTML(quiz.title)}</strong>
                            <small>${escapeHTML(quiz.id)}</small>
                        </div>
                    </td>

                    <td>${escapeHTML(quiz.offering)}</td>

                    <td>
                        <span class="teacher-quiz-version">
                            V${quiz.currentVersion}
                        </span>
                    </td>

                    <td>
                        <span class="teacher-quiz-question-count">
                            ${version.questions.length}
                        </span>
                    </td>

                    <td>
                        <span class="teacher-quiz-attempt-count">
                            ${version.attemptLimit} attempt${version.attemptLimit === 1 ? "" : "s"}
                        </span>
                    </td>

                    <td>
                        <span class="teacher-quiz-status ${quiz.status}">
                            ${escapeHTML(statusLabels[quiz.status])}
                        </span>
                    </td>

                    <td>
                        <div class="teacher-quiz-actions">

                            <button type="button"
                                class="teacher-quiz-action secondary"
                                data-quiz-action="view"
                                data-id="${escapeHTML(quiz.id)}">
                                <i class="bi bi-eye"></i> View
                            </button>

                            <button type="button"
                                class="teacher-quiz-action"
                                data-quiz-action="edit"
                                data-id="${escapeHTML(quiz.id)}">
                                <i class="bi bi-pencil"></i> Edit
                            </button>

                            ${quiz.status === "draft" ? `
                                <button type="button"
                                    class="teacher-quiz-action"
                                    data-quiz-action="publish"
                                    data-id="${escapeHTML(quiz.id)}">
                                    <i class="bi bi-broadcast"></i> Publish
                                </button>
                            ` : ""}

                            ${quiz.status === "published" ? `
                                <button type="button"
                                    class="teacher-quiz-action secondary"
                                    data-quiz-action="close"
                                    data-id="${escapeHTML(quiz.id)}">
                                    <i class="bi bi-lock"></i> Close
                                </button>
                            ` : ""}

                        </div>
                    </td>

                </tr>
            `;

        }).join("");

        $("teacherQuizEmpty").hidden = filtered.length > 0;

        $("teacherQuizRecordCount").textContent =
            `${filtered.length} record${filtered.length === 1 ? "" : "s"}`;

    }

    // -----------------------------------------------------
    // 6. QUESTION BUILDER
    // -----------------------------------------------------

    function addQuestion(question = null) {

        questionCounter++;

        const questionId = `quiz-question-${questionCounter}`;

        const defaultOptions = [
            { text: "", correct: false },
            { text: "", correct: false },
            { text: "", correct: false },
            { text: "", correct: false }
        ];

        const options = question
            ? question.options.map(option => ({ ...option }))
            : defaultOptions;

        const type = question?.type || "multiple-choice";

        const card = document.createElement("div");

        card.className = "teacher-quiz-question-card";
        card.dataset.questionId = questionId;

        card.innerHTML = `

            <div class="teacher-quiz-question-card-header">

                <div class="teacher-quiz-question-number">
                    <span class="question-number">1</span>
                    Question
                </div>

                <button type="button"
                    class="teacher-quiz-remove-question">
                    <i class="bi bi-trash"></i>
                    Remove
                </button>

            </div>

            <div class="teacher-quiz-question-fields">

                <label>
                    <span>Question Text *</span>
                    <textarea class="quiz-question-text"
                        rows="3"
                        maxlength="1000"
                        placeholder="Enter your question..."
                        required>${escapeHTML(question?.text || "")}</textarea>
                </label>

                <div>

                    <label>
                        <span>Question Type *</span>

                        <select class="quiz-question-type">

                            <option value="multiple-choice"
                                ${type === "multiple-choice" ? "selected" : ""}>
                                Multiple Choice
                            </option>

                            <option value="multiple-select"
                                ${type === "multiple-select" ? "selected" : ""}>
                                Multiple Select
                            </option>

                        </select>
                    </label>

                    <label class="mt-3">
                        <span>Points *</span>
                        <input type="number"
                            class="quiz-question-points"
                            min="1"
                            max="100"
                            step="1"
                            value="${Number(question?.points || 1)}"
                            required>
                    </label>

                </div>

            </div>

            <div class="teacher-quiz-options-heading">
                <strong>Answer Options</strong>

                <button type="button"
                    class="teacher-quiz-add-option">
                    <i class="bi bi-plus-lg"></i>
                    Add Option
                </button>
            </div>

            <div class="quiz-option-list"></div>

            <small class="text-muted d-block mt-2">
                Select the correct answer. Multiple Select allows more than one correct answer.
            </small>

        `;

        questionList.appendChild(card);

        const optionList = card.querySelector(".quiz-option-list");

        options.forEach(option => {
            addOption(optionList, type, option);
        });

        card.querySelector(".teacher-quiz-add-option")
            .addEventListener("click", () => {

                if (optionList.children.length >= 8) {
                    alert("A question can have a maximum of 8 options in this demonstration.");
                    return;
                }

                addOption(optionList, card.querySelector(".quiz-question-type").value);

            });

        card.querySelector(".teacher-quiz-remove-question")
            .addEventListener("click", () => {

                card.remove();
                updateQuestionNumbers();

            });

        card.querySelector(".quiz-question-type")
            .addEventListener("change", event => {

                const newType = event.target.value;

                const existingOptions = [...optionList.querySelectorAll(".quiz-option-row")];

                const selectedCorrect = existingOptions
                    .map(row => ({
                        text: row.querySelector(".quiz-option-text").value,
                        correct: row.querySelector(".quiz-option-correct").checked
                    }));

                optionList.innerHTML = "";

                selectedCorrect.forEach(option => {
                    addOption(optionList, newType, option);
                });

            });

        updateQuestionNumbers();

        $("teacherQuizNoQuestions").hidden =
            questionList.children.length > 0;

    }

    // -----------------------------------------------------
    // 7. ADD ANSWER OPTION
    // -----------------------------------------------------

    function addOption(container, type, option = {}) {

        const row = document.createElement("div");

        row.className = "teacher-quiz-option-row";

        const multiple = type === "multiple-select";
        const inputType = multiple ? "checkbox" : "radio";

        row.innerHTML = `

            <span class="teacher-quiz-option-marker">
                ${container.children.length + 1}
            </span>

            <input type="text"
                class="quiz-option-text"
                maxlength="300"
                placeholder="Enter answer option"
                value="${escapeHTML(option.text || "")}"
                required>

            <div class="d-flex align-items-center gap-2">

                <input type="${inputType}"
                    class="quiz-option-correct"
                    name="correct-${container.closest(".teacher-quiz-question-card").dataset.questionId}"
                    aria-label="Mark as correct answer"
                    ${option.correct ? "checked" : ""}>

                <button type="button"
                    class="teacher-quiz-option-remove"
                    aria-label="Remove option">
                    <i class="bi bi-x-lg"></i>
                </button>

            </div>

        `;

        container.appendChild(row);

        row.querySelector(".teacher-quiz-option-remove")
            .addEventListener("click", () => {

                if (container.children.length <= 2) {
                    alert("Each question must have at least two answer options.");
                    return;
                }

                row.remove();

                updateOptionNumbers(container);

            });

        updateOptionNumbers(container);

    }

    function updateOptionNumbers(container) {

        [...container.children].forEach((row, index) => {

            row.querySelector(".teacher-quiz-option-marker").textContent =
                index + 1;

        });

    }

    function updateQuestionNumbers() {

        [...questionList.children].forEach((card, index) => {

            card.querySelector(".question-number").textContent =
                index + 1;

        });

        $("teacherQuizNoQuestions").hidden =
            questionList.children.length > 0;

    }

    // -----------------------------------------------------
    // 8. READ QUESTION BUILDER DATA
    // -----------------------------------------------------

    function collectQuestions() {

        const cards = [...questionList.querySelectorAll(
            ".teacher-quiz-question-card"
        )];

        return cards.map((card, index) => {

            const text = card.querySelector(".quiz-question-text").value.trim();

            const type = card.querySelector(".quiz-question-type").value;

            const points = Number(
                card.querySelector(".quiz-question-points").value
            );

            const options = [...card.querySelectorAll(".quiz-option-row")].map(row => ({
                text: row.querySelector(".quiz-option-text").value.trim(),
                correct: row.querySelector(".quiz-option-correct").checked
            }));

            return {
                id: `Q${index + 1}`,
                type,
                text,
                points,
                options
            };

        });

    }

    // -----------------------------------------------------
    // 9. RESET EDITOR
    // -----------------------------------------------------

    function resetEditor() {

        editorForm.reset();

        editingQuizId = null;
        questionCounter = 0;

        questionList.innerHTML = "";

        $("teacherQuizEditorTitle").textContent = "Create Quiz";
        $("teacherQuizEditorError").hidden = true;

        $("teacherQuizAttemptLimit").value = 1;

        $("teacherQuizNoQuestions").hidden = false;

    }

    // -----------------------------------------------------
    // 10. OPEN CREATE QUIZ
    // -----------------------------------------------------

    $("teacherCreateQuizButton").addEventListener("click", event => {

    editorReturnFocus = event.currentTarget;

    resetEditor();

    editorModal.show();

    });


/* F10.6 FIX - ADD QUESTION BUTTON */

$("teacherQuizAddQuestion").addEventListener("click", () => {

    addQuestion();

});


    // -----------------------------------------------------
    // 11. OPEN EDIT QUIZ
    // -----------------------------------------------------

    function openEditor(id) {

        editorReturnFocus = searchInput;

        const quiz = quizzes.find(item => item.id === id);

        if (!quiz || quiz.status === "closed") return;

        resetEditor();

        editingQuizId = id;

        const version = getCurrentVersion(quiz);

        $("teacherQuizEditorTitle").textContent =
            quiz.status === "published"
                ? "Create New Quiz Version"
                : "Edit Draft Quiz";

        $("teacherQuizTitleInput").value = quiz.title;
        $("teacherQuizOfferingInput").value = quiz.offering;
        $("teacherQuizInstructions").value = quiz.instructions;

        $("teacherQuizTimeLimit").value = version.timeLimit || "";
        $("teacherQuizAttemptLimit").value = version.attemptLimit;

        $("teacherQuizStartDate").value = version.startDate || "";
        $("teacherQuizEndDate").value = version.endDate || "";

        version.questions.forEach(question => addQuestion(question));

        editorModal.show();

    }

    // -----------------------------------------------------
    // 12. VALIDATE QUIZ
    // -----------------------------------------------------

    function validateQuiz(data, questions, status) {

        const error = $("teacherQuizEditorError");

        error.hidden = true;

        if (!data.title || !data.offering || !data.instructions) {
            error.textContent =
                "Complete the Quiz Title, Subject Offering, and Instructions.";
            error.hidden = false;
            return false;
        }

        if (!Number.isInteger(data.attemptLimit) || data.attemptLimit < 1) {
            error.textContent = "Attempt limit must be at least 1.";
            error.hidden = false;
            return false;
        }

        if (data.timeLimit !== "" &&
            (!Number.isInteger(Number(data.timeLimit)) || Number(data.timeLimit) < 1)) {
            error.textContent = "Time limit must be a positive whole number.";
            error.hidden = false;
            return false;
        }

        if (data.startDate && data.endDate &&
            new Date(data.endDate) <= new Date(data.startDate)) {
            error.textContent =
                "Availability End must be later than Availability Start.";
            error.hidden = false;
            return false;
        }

        if (status === "published" && questions.length === 0) {
            error.textContent =
                "Add at least one question before publishing.";
            error.hidden = false;
            return false;
        }

        if (status === "published") {

            for (let i = 0; i < questions.length; i++) {

                const question = questions[i];

                if (!question.text) {
                    error.textContent = `Question ${i + 1} needs question text.`;
                    error.hidden = false;
                    return false;
                }

                if (!Number.isInteger(question.points) || question.points < 1) {
                    error.textContent = `Question ${i + 1} needs valid points.`;
                    error.hidden = false;
                    return false;
                }

                if (question.options.length < 2 ||
                    question.options.length > 8) {
                    error.textContent =
                        `Question ${i + 1} must have 2 to 8 options.`;
                    error.hidden = false;
                    return false;
                }

                if (question.options.some(option => !option.text)) {
                    error.textContent =
                        `Complete all answer options in Question ${i + 1}.`;
                    error.hidden = false;
                    return false;
                }

                if (!question.options.some(option => option.correct)) {
                    error.textContent =
                        `Select at least one correct answer for Question ${i + 1}.`;
                    error.hidden = false;
                    return false;
                }

                if (question.type === "multiple-choice" &&
                    question.options.filter(option => option.correct).length !== 1) {
                    error.textContent =
                        `Multiple Choice Question ${i + 1} must have exactly one correct answer.`;
                    error.hidden = false;
                    return false;
                }

            }

        }

        return true;

    }

    // -----------------------------------------------------
    // 13. SAVE QUIZ
    // -----------------------------------------------------

    function saveQuiz(status) {

        const questions = collectQuestions();

        const data = {

            title: $("teacherQuizTitleInput").value.trim(),

            offering: $("teacherQuizOfferingInput").value,

            instructions: $("teacherQuizInstructions").value.trim(),

            timeLimit: $("teacherQuizTimeLimit").value,

            attemptLimit: Number($("teacherQuizAttemptLimit").value),

            startDate: $("teacherQuizStartDate").value,

            endDate: $("teacherQuizEndDate").value

        };

        if (!validateQuiz(data, questions, status)) return;

        if (editingQuizId) {

            const quiz = quizzes.find(item => item.id === editingQuizId);

            if (!quiz) return;

            quiz.title = data.title;
            quiz.offering = data.offering;
            quiz.instructions = data.instructions;

            const currentVersion = getCurrentVersion(quiz);

            const newVersion = {

                version: quiz.status === "published"
                    ? quiz.currentVersion + 1
                    : quiz.currentVersion,

                attemptLimit: data.attemptLimit,

                timeLimit: data.timeLimit === ""
                    ? null
                    : Number(data.timeLimit),

                startDate: data.startDate,
                endDate: data.endDate,

                questions: questions

            };

            if (quiz.status === "published") {

                quiz.versions.push(newVersion);
                quiz.currentVersion = newVersion.version;

            } else {

                quiz.versions = [
                    ...quiz.versions.filter(version =>
                        version.version !== currentVersion.version
                    ),
                    newVersion
                ];

            }

            quiz.status = status;

        } else {

            const id = `QUIZ-${String(Date.now()).slice(-8)}`;

            quizzes.push({

                id,
                title: data.title,
                offering: data.offering,
                instructions: data.instructions,
                status,
                currentVersion: 1,

                versions: [{
                    version: 1,
                    attemptLimit: data.attemptLimit,
                    timeLimit: data.timeLimit === ""
                        ? null
                        : Number(data.timeLimit),
                    startDate: data.startDate,
                    endDate: data.endDate,
                    questions
                }]

            });

        }

        editorModal.hide();

        updateSummary();
        renderQuizzes();

        alert(
            status === "draft"
                ? "Demonstration only: Quiz saved as Draft."
                : "Demonstration only: Quiz version saved and marked Published."
        );

    }

    // -----------------------------------------------------
    // 14. SAVE BUTTONS
    // -----------------------------------------------------

    editorForm.addEventListener("submit", event => {

        event.preventDefault();

        saveQuiz("draft");

    });

    $("teacherQuizSaveDraft").addEventListener("click", () => {

        saveQuiz("draft");

    });

    // -----------------------------------------------------
    // 15. QUIZ TABLE ACTIONS
    // -----------------------------------------------------

    tableBody.addEventListener("click", event => {

        const button = event.target.closest("[data-quiz-action]");

        if (!button) return;

        const id = button.dataset.id;
        const action = button.dataset.quizAction;

        const quiz = quizzes.find(item => item.id === id);

        if (!quiz) return;

        if (action === "view") {
            showQuizDetails(id);
        }

        if (action === "edit") {
            openEditor(id);
        }

        if (action === "publish") {

            const version = getCurrentVersion(quiz);

            if (!version.questions.length) {
                alert("Add at least one question before publishing.");
                return;
            }

            if (!confirm("Publish this Quiz Version?")) return;

            quiz.status = "published";

            updateSummary();
            renderQuizzes();

        }

        if (action === "close") {

            if (!confirm("Close this quiz?")) return;

            quiz.status = "closed";

            updateSummary();
            renderQuizzes();

        }

    });

    // -----------------------------------------------------
    // 16. QUIZ DETAILS AND PREVIEW
    // -----------------------------------------------------

    function showQuizDetails(id) {

        const quiz = quizzes.find(item => item.id === id);

        if (!quiz) return;

        selectedQuizId = id;

        const version = getCurrentVersion(quiz);

        $("teacherQuizDetailsTitle").textContent = quiz.title;

        const questionsHTML = version.questions.length

            ? version.questions.map((question, index) => `

                <div class="teacher-quiz-preview-question">

                    <h6>
                        Question ${index + 1}
                        · ${escapeHTML(question.type === "multiple-select"
                            ? "Multiple Select"
                            : "Multiple Choice")}
                    </h6>

                    <p>${escapeHTML(question.text)}</p>

                    ${question.options.map(option => `

                        <div class="teacher-quiz-preview-option ${option.correct ? "correct" : ""}">

                            <i class="bi ${option.correct
                                ? "bi-check-circle-fill"
                                : "bi-circle"}"></i>

                            ${escapeHTML(option.text)}

                            ${option.correct
                                ? '<span class="ms-auto fw-bold">Correct</span>'
                                : ""}

                        </div>

                    `).join("")}

                    <small class="text-muted d-block mt-2">
                        ${question.points} point(s)
                    </small>

                </div>

            `).join("")

            : `
                <p class="text-muted small">
                    No questions have been added to this version.
                </p>
            `;

        $("teacherQuizDetailsBody").innerHTML = `

            <div class="teacher-quiz-details-grid">

                <div class="teacher-quiz-detail-item">
                    <span>Quiz ID</span>
                    <strong>${escapeHTML(quiz.id)}</strong>
                </div>

                <div class="teacher-quiz-detail-item">
                    <span>Status</span>
                    <strong>${escapeHTML(statusLabels[quiz.status])}</strong>
                </div>

                <div class="teacher-quiz-detail-item">
                    <span>Subject Offering</span>
                    <strong>${escapeHTML(quiz.offering)}</strong>
                </div>

                <div class="teacher-quiz-detail-item">
                    <span>Current Version</span>
                    <strong>Version ${quiz.currentVersion}</strong>
                </div>

                <div class="teacher-quiz-detail-item">
                    <span>Attempt Limit</span>
                    <strong>${version.attemptLimit}</strong>
                </div>

                <div class="teacher-quiz-detail-item">
                    <span>Time Limit</span>
                    <strong>${version.timeLimit
                        ? `${version.timeLimit} minutes`
                        : "No time limit"}</strong>
                </div>

                <div class="teacher-quiz-detail-item">
                    <span>Availability Start</span>
                    <strong>${escapeHTML(formatDate(version.startDate))}</strong>
                </div>

                <div class="teacher-quiz-detail-item">
                    <span>Availability End</span>
                    <strong>${escapeHTML(formatDate(version.endDate))}</strong>
                </div>

                <div class="teacher-quiz-detail-item full">
                    <span>Instructions</span>
                    <strong>${escapeHTML(quiz.instructions)}</strong>
                </div>

                <div class="teacher-quiz-detail-item">
                    <span>Number of Questions</span>
                    <strong>${version.questions.length}</strong>
                </div>

                <div class="teacher-quiz-detail-item">
                    <span>Total Points</span>
                    <strong>${getTotalPoints(version.questions)}</strong>
                </div>

            </div>

            <div class="mt-4">
                <h6 class="fw-bold text-dark">Quiz Preview</h6>
                ${questionsHTML}
            </div>

            <div class="teacher-submission-modal-notice mt-3">
                <i class="bi bi-info-circle"></i>
                This preview is for Teacher review only. It does not start a Student attempt or record an answer.
            </div>

        `;

        $("teacherQuizEditFromDetails").hidden =
            quiz.status === "closed";

        detailsModal.show();

    }

    // -----------------------------------------------------
    // 17. EDIT FROM DETAILS
    // -----------------------------------------------------

    $("teacherQuizEditFromDetails").addEventListener("click", () => {

        if (!selectedQuizId) return;

        const id = selectedQuizId;

        detailsElement.addEventListener(
            "hidden.bs.modal",
            () => openEditor(id),
            { once: true }
        );

        detailsModal.hide();

    });

    // -----------------------------------------------------
    // 18. SEARCH AND FILTERS
    // -----------------------------------------------------

    function synchronizeSearch(value) {

        searchInput.value = value;
        topSearch.value = value;

        renderQuizzes();

    }

    searchInput.addEventListener("input", () => {
        synchronizeSearch(searchInput.value);
    });

    topSearch.addEventListener("input", () => {
        synchronizeSearch(topSearch.value);
    });

    [searchInput, topSearch].forEach(input => {

        input.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                synchronizeSearch("");
                input.blur();

            }

        });

    });

    offeringFilter.addEventListener("change", renderQuizzes);
    statusFilter.addEventListener("change", renderQuizzes);

    $("teacherQuizClearFilters").addEventListener("click", () => {

        searchInput.value = "";
        topSearch.value = "";

        offeringFilter.value = "all";
        statusFilter.value = "all";

        renderQuizzes();

    });

    // -----------------------------------------------------
    // 19. INITIALIZE
    // -----------------------------------------------------

    updateSummary();
    renderQuizzes();

    console.log(
        "F10.6 Teacher Quiz Management initialized.",
        quizzes.length,
        "demonstration quizzes."
    );

}







/* =========================================================
   F10.7 - TEACHER GRADES & FEEDBACK
   FRONTEND DEMONSTRATION ONLY
   ========================================================= */

function initializeTeacherGrades() {

    const tableBody = document.getElementById("teacherGradeTableBody");
    if (!tableBody) return;

    const $ = id => document.getElementById(id);

    const search = $("teacherGradeSearch");
    const topSearch = $("teacherGradeTopSearch");
    const offeringFilter = $("teacherGradeOfferingFilter");
    const releaseFilter = $("teacherGradeReleaseFilter");
    const detailsElement = $("teacherGradeDetailsModal");
    const editElement = $("teacherGradeEditModal");
    const feedbackElement = $("teacherGradeFeedbackModal");
    const releaseElement = $("teacherGradeReleaseModal");

    if (!search || !topSearch || !offeringFilter || !releaseFilter ||
        !detailsElement || !editElement || !feedbackElement ||
        !releaseElement || !window.bootstrap) {
        console.error("F10.7: Required Grade Management elements are missing.");
        return;
    }

    const detailsModal = bootstrap.Modal.getOrCreateInstance(detailsElement);
    const editModal = bootstrap.Modal.getOrCreateInstance(editElement);
    const feedbackModal = bootstrap.Modal.getOrCreateInstance(feedbackElement);
    const releaseModal = bootstrap.Modal.getOrCreateInstance(releaseElement);

    let selectedGradeId = null;
    let returnFocus = null;

    // -----------------------------------------------------
    // 1. DEMONSTRATION GRADE RECORDS
    // -----------------------------------------------------

    const grades = [

        {
            id: "GR-001",
            enrollmentId: "ENR-2026-014",
            student: "Alyssa Mae Santos",
            studentId: "STU-2026-014",
            assessment: "Fractions Performance Task",
            source: "Activity",
            offering: "Mathematics 6 - Sampaguita",
            score: 45,
            maximum: 50,
            gradeReleased: true,
            feedback: "Excellent work. Your solutions are complete and organized.",
            feedbackReleased: true,
            history: []
        },

        {
            id: "GR-002",
            enrollmentId: "ENR-2026-021",
            student: "Joshua Miguel Reyes",
            studentId: "STU-2026-021",
            assessment: "Reading Comprehension Quiz",
            source: "Quiz Attempt",
            offering: "English 6 - Sampaguita",
            score: 18,
            maximum: 25,
            gradeReleased: false,
            feedback: "Review the main idea and supporting details.",
            feedbackReleased: false,
            history: []
        },

        {
            id: "GR-003",
            enrollmentId: "ENR-2026-008",
            student: "Camille Dizon",
            studentId: "STU-2026-008",
            assessment: "Ecosystem Poster",
            source: "Activity",
            offering: "Science 6 - Rosal",
            score: 38,
            maximum: 40,
            gradeReleased: true,
            feedback: "Very good presentation and accurate information.",
            feedbackReleased: false,
            history: []
        },

        {
            id: "GR-004",
            enrollmentId: "ENR-2026-032",
            student: "Daniel Cruz",
            studentId: "STU-2026-032",
            assessment: "Word Problem Worksheet",
            source: "Activity",
            offering: "Mathematics 6 - Rosal",
            score: 32,
            maximum: 40,
            gradeReleased: false,
            feedback: "",
            feedbackReleased: false,
            history: []
        },

        {
            id: "GR-005",
            enrollmentId: "ENR-2026-011",
            student: "Sophia Garcia",
            studentId: "STU-2026-011",
            assessment: "Plant Growth Journal",
            source: "Activity",
            offering: "Science 6 - Sampaguita",
            score: 48,
            maximum: 50,
            gradeReleased: true,
            feedback: "Outstanding observations and conclusions.",
            feedbackReleased: true,
            history: []
        },

        {
            id: "GR-006",
            enrollmentId: "ENR-2026-019",
            student: "Nathaniel Flores",
            studentId: "STU-2026-019",
            assessment: "Paragraph Writing",
            source: "Activity",
            offering: "English 6 - Rosal",
            score: 0,
            maximum: 30,
            gradeReleased: false,
            feedback: "",
            feedbackReleased: false,
            history: []
        },

        {
            id: "GR-007",
            enrollmentId: "ENR-2026-027",
            student: "Isabella Ramos",
            studentId: "STU-2026-027",
            assessment: "Geometry Fundamentals",
            source: "Quiz Attempt",
            offering: "Mathematics 6 - Sampaguita",
            score: 27,
            maximum: 30,
            gradeReleased: true,
            feedback: "Good understanding of geometric concepts.",
            feedbackReleased: true,
            history: []
        },

        {
            id: "GR-008",
            enrollmentId: "ENR-2026-005",
            student: "Ethan Villanueva",
            studentId: "STU-2026-005",
            assessment: "Water Cycle Review",
            source: "Quiz Attempt",
            offering: "Science 6 - Rosal",
            score: 16,
            maximum: 20,
            gradeReleased: false,
            feedback: "Review evaporation and condensation.",
            feedbackReleased: false,
            history: []
        }

    ];

    const offerings = [
        ...new Set(grades.map(item => item.offering))
    ].sort();

    // -----------------------------------------------------
    // 2. HELPERS
    // -----------------------------------------------------

    const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);

    const formatScore = (score, maximum) => {
        return `${Number(score).toFixed(2).replace(/\.00$/, "")} / ${Number(maximum).toFixed(2).replace(/\.00$/, "")}`;
    };

    const percentage = item => {
        return item.maximum > 0
            ? (item.score / item.maximum) * 100
            : 0;
    };

    const formatDate = value => {
        if (!value) return "—";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "—";

        return date.toLocaleString("en-PH", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    };

    const initials = name => name
        .split(" ")
        .map(part => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    function getGrade(id) {
        return grades.find(item => item.id === id);
    }

    // -----------------------------------------------------
    // 3. OFFERING FILTER
    // -----------------------------------------------------

    offerings.forEach(offering => {
        const option = document.createElement("option");
        option.value = offering;
        option.textContent = offering;
        offeringFilter.appendChild(option);
    });

    // -----------------------------------------------------
    // 4. SUMMARY CARDS
    // -----------------------------------------------------

    function updateSummary() {

        $("teacherGradeTotal").textContent = grades.length;

        $("teacherGradeUnreleased").textContent =
            grades.filter(item => !item.gradeReleased).length;

        $("teacherGradeReleased").textContent =
            grades.filter(item => item.gradeReleased).length;

        $("teacherGradeFeedbackPending").textContent =
            grades.filter(item =>
                item.feedback.trim() !== "" && !item.feedbackReleased
            ).length;

    }

    // -----------------------------------------------------
    // 5. STATUS LABELS
    // -----------------------------------------------------

    function gradeStatus(item) {

        if (!item.gradeReleased && item.withheldHistory?.length) {
            return {
                label: "Withheld",
                className: "withheld"
            };
        }

        return item.gradeReleased
            ? { label: "Released", className: "released" }
            : { label: "Not Released", className: "unreleased" };

    }

    function feedbackStatus(item) {

        if (!item.feedback.trim()) {
            return { label: "No Feedback", className: "empty" };
        }

        return item.feedbackReleased
            ? { label: "Released", className: "released" }
            : { label: "Pending", className: "pending" };

    }

    // -----------------------------------------------------
    // 6. RENDER DIRECTORY
    // -----------------------------------------------------

    function renderGrades() {

        const query = search.value.trim().toLowerCase();
        const offering = offeringFilter.value;
        const release = releaseFilter.value;

        const filtered = grades.filter(item => {

            const searchable = [
                item.id,
                item.enrollmentId,
                item.student,
                item.studentId,
                item.assessment,
                item.offering
            ];

            const matchesSearch = searchable.some(value =>
                value.toLowerCase().includes(query)
            );

            const matchesOffering =
                offering === "all" || item.offering === offering;

            const matchesRelease =
                release === "all" ||
                (release === "released" && item.gradeReleased) ||
                (release === "unreleased" && !item.gradeReleased);

            return matchesSearch && matchesOffering && matchesRelease;

        });

        tableBody.innerHTML = filtered.map(item => {

            const grade = gradeStatus(item);
            const feedback = feedbackStatus(item);

            return `
                <tr>

                    <td>
                        <div class="teacher-grade-student">

                            <span class="teacher-student-avatar">
                                ${escapeHTML(initials(item.student))}
                            </span>

                            <div class="teacher-grade-student-info">
                                <strong>${escapeHTML(item.student)}</strong>
                                <small>${escapeHTML(item.studentId)}</small>
                            </div>

                        </div>
                    </td>

                    <td>
                        <div class="teacher-grade-assessment">
                            <strong>${escapeHTML(item.assessment)}</strong>
                            <small>${escapeHTML(item.source)} · ${escapeHTML(item.id)}</small>
                        </div>
                    </td>

                    <td>${escapeHTML(item.offering)}</td>

                    <td>
                        <span class="teacher-grade-score">
                            ${escapeHTML(formatScore(item.score, item.maximum))}
                        </span>
                        <small class="d-block text-muted">
                            ${percentage(item).toFixed(1)}%
                        </small>
                    </td>

                    <td>
                        <span class="teacher-grade-status ${grade.className}">
                            ${escapeHTML(grade.label)}
                        </span>
                    </td>

                    <td>
                        <span class="teacher-feedback-status ${feedback.className}">
                            ${escapeHTML(feedback.label)}
                        </span>
                    </td>

                    <td>
                        <div class="teacher-grade-actions">

                            <button type="button"
                                class="teacher-grade-action secondary"
                                data-grade-action="view"
                                data-id="${escapeHTML(item.id)}">
                                <i class="bi bi-eye"></i> View
                            </button>

                            <button type="button"
                                class="teacher-grade-action"
                                data-grade-action="edit"
                                data-id="${escapeHTML(item.id)}">
                                <i class="bi bi-pencil"></i> Edit
                            </button>

                            <button type="button"
                                class="teacher-grade-action secondary"
                                data-grade-action="release"
                                data-id="${escapeHTML(item.id)}">
                                <i class="bi bi-eye"></i> Release
                            </button>

                        </div>
                    </td>

                </tr>
            `;

        }).join("");

        $("teacherGradeEmpty").hidden = filtered.length > 0;

        $("teacherGradeRecordCount").textContent =
            `${filtered.length} record${filtered.length === 1 ? "" : "s"}`;

    }

    // -----------------------------------------------------
    // 7. GRADE DETAILS AND HISTORY
    // -----------------------------------------------------

    function showDetails(id) {

        const item = getGrade(id);
        if (!item) return;

        selectedGradeId = id;

        const grade = gradeStatus(item);
        const feedback = feedbackStatus(item);

        const historyHTML = item.history.length
            ? item.history.map(entry => `
                <div class="teacher-grade-history-item">

                    <strong>${escapeHTML(entry.action)}</strong>

                    <small>
                        Previous: ${escapeHTML(entry.previous)}
                    </small>

                    <small>
                        New: ${escapeHTML(entry.next)}
                    </small>

                    <small>
                        Reason: ${escapeHTML(entry.reason)}
                    </small>

                    <small>
                        Date: ${escapeHTML(formatDate(entry.date))}
                    </small>

                </div>
            `).join("")
            : `<p class="text-muted small">No grade corrections recorded.</p>`;

        const withheldHTML = (item.withheldHistory || []).map(entry => `
            <div class="teacher-grade-history-item">
                <strong>Grade Withheld</strong>
                <small>Reason: ${escapeHTML(entry.reason)}</small>
                <small>Date: ${escapeHTML(formatDate(entry.date))}</small>
            </div>
        `).join("");

        $("teacherGradeDetailsTitle").textContent = item.student;

        $("teacherGradeDetailsBody").innerHTML = `

            <div class="teacher-grade-details-grid">

                <div class="teacher-grade-detail-item">
                    <span>Grade Record ID</span>
                    <strong>${escapeHTML(item.id)}</strong>
                </div>

                <div class="teacher-grade-detail-item">
                    <span>Enrollment ID</span>
                    <strong>${escapeHTML(item.enrollmentId)}</strong>
                </div>

                <div class="teacher-grade-detail-item">
                    <span>Student</span>
                    <strong>${escapeHTML(item.student)}</strong>
                </div>

                <div class="teacher-grade-detail-item">
                    <span>Student ID</span>
                    <strong>${escapeHTML(item.studentId)}</strong>
                </div>

                <div class="teacher-grade-detail-item full">
                    <span>Assessment</span>
                    <strong>${escapeHTML(item.assessment)}</strong>
                </div>

                <div class="teacher-grade-detail-item">
                    <span>Subject Offering</span>
                    <strong>${escapeHTML(item.offering)}</strong>
                </div>

                <div class="teacher-grade-detail-item">
                    <span>Assessment Source</span>
                    <strong>${escapeHTML(item.source)}</strong>
                </div>

                <div class="teacher-grade-detail-item">
                    <span>Score</span>
                    <strong>${escapeHTML(formatScore(item.score, item.maximum))}</strong>
                </div>

                <div class="teacher-grade-detail-item">
                    <span>Percentage</span>
                    <strong>${percentage(item).toFixed(2)}%</strong>
                </div>

                <div class="teacher-grade-detail-item">
                    <span>Grade Release</span>
                    <strong>${escapeHTML(grade.label)}</strong>
                </div>

                <div class="teacher-grade-detail-item">
                    <span>Feedback Release</span>
                    <strong>${escapeHTML(feedback.label)}</strong>
                </div>

                <div class="teacher-grade-detail-item full">
                    <span>Teacher Feedback</span>
                    <strong>
                        ${item.feedback
                            ? escapeHTML(item.feedback)
                            : "No feedback recorded."}
                    </strong>
                </div>

            </div>

            <div class="teacher-grade-history">

                <h6>
                    <i class="bi bi-clock-history me-1"></i>
                    Grade Correction History
                </h6>

                ${historyHTML}
                ${withheldHTML}

            </div>

            <div class="teacher-submission-modal-notice mt-3">
                <i class="bi bi-info-circle"></i>
                Only the authorized Teacher for the exact Subject Offering may manage its grades in the real system.
            </div>

        `;

        detailsModal.show();

    }

    // -----------------------------------------------------
    // 8. EDIT GRADE
    // -----------------------------------------------------

    function openEdit(id, fromDetails = false) {

        const item = getGrade(id);
        if (!item) return;

        selectedGradeId = id;
        returnFocus = fromDetails ? search : document.activeElement;

        $("teacherGradeEditContext").textContent =
            `${item.student} · ${item.assessment} · ${item.id}`;

        $("teacherGradeScore").value = item.score;
        $("teacherGradeMaximum").value = item.maximum;
        $("teacherGradeCorrectionReason").value = "";
        $("teacherGradeEditError").hidden = true;

        if (fromDetails) {
            detailsElement.addEventListener(
                "hidden.bs.modal",
                () => editModal.show(),
                { once: true }
            );
            detailsModal.hide();
        } else {
            editModal.show();
        }

    }

    $("teacherGradeEditForm").addEventListener("submit", event => {

        event.preventDefault();

        const item = getGrade(selectedGradeId);
        if (!item) return;

        const score = Number($("teacherGradeScore").value);
        const maximum = Number($("teacherGradeMaximum").value);
        const reason = $("teacherGradeCorrectionReason").value.trim();
        const error = $("teacherGradeEditError");

        error.hidden = true;

        if (!Number.isFinite(score) || !Number.isFinite(maximum) ||
            maximum <= 0 || score < 0 || score > maximum) {

            error.textContent =
                "Enter a valid score between zero and the maximum points.";

            error.hidden = false;
            return;

        }

        if (!reason) {
            error.textContent = "A correction reason is required.";
            error.hidden = false;
            return;
        }

        const previous = formatScore(item.score, item.maximum);
        const next = formatScore(score, maximum);

        item.history.push({
            action: "Grade Corrected",
            previous,
            next,
            reason,
            date: new Date().toISOString()
        });

        item.score = score;
        item.maximum = maximum;

        editModal.hide();

        updateSummary();
        renderGrades();

        alert(
            "Demonstration only: Grade correction saved locally with its previous value and reason."
        );

    });

    // -----------------------------------------------------
    // 9. MANAGE FEEDBACK
    // -----------------------------------------------------

    function openFeedback(id, fromDetails = false) {

        const item = getGrade(id);
        if (!item) return;

        selectedGradeId = id;

        $("teacherGradeFeedbackContext").textContent =
            `${item.student} · ${item.assessment}`;

        $("teacherGradeFeedbackText").value = item.feedback || "";
        $("teacherGradeFeedbackError").hidden = true;

        if (fromDetails) {
            detailsElement.addEventListener(
                "hidden.bs.modal",
                () => feedbackModal.show(),
                { once: true }
            );
            detailsModal.hide();
        } else {
            feedbackModal.show();
        }

    }

    $("teacherGradeFeedbackForm").addEventListener("submit", event => {

        event.preventDefault();

        const item = getGrade(selectedGradeId);
        if (!item) return;

        const feedback = $("teacherGradeFeedbackText").value.trim();
        const error = $("teacherGradeFeedbackError");

        error.hidden = true;

        if (!feedback) {
            error.textContent = "Please enter feedback before saving.";
            error.hidden = false;
            return;
        }

        item.feedback = feedback;

        // Editing feedback does not automatically release it.
        item.feedbackReleased = false;

        feedbackModal.hide();

        updateSummary();
        renderGrades();

        alert(
            "Demonstration only: Feedback saved. Feedback remains unreleased until separately released."
        );

    });

    // -----------------------------------------------------
    // 10. RELEASE CONTROLS
    // -----------------------------------------------------

    function openRelease(id, fromDetails = false) {

        const item = getGrade(id);
        if (!item) return;

        selectedGradeId = id;

        $("teacherGradeReleaseContext").textContent =
            `${item.student} · ${item.assessment}`;

        $("teacherGradeReleaseError").hidden = true;

        updateReleaseButtons();

        if (fromDetails) {
            detailsElement.addEventListener(
                "hidden.bs.modal",
                () => releaseModal.show(),
                { once: true }
            );
            detailsModal.hide();
        } else {
            releaseModal.show();
        }

    }

    function updateReleaseButtons() {

        const item = getGrade(selectedGradeId);
        if (!item) return;

        const gradeButton = $("teacherGradeReleaseToggle");
        const feedbackButton = $("teacherFeedbackReleaseToggle");

        gradeButton.textContent = item.gradeReleased
            ? "Withhold Grade"
            : "Release Grade";

        feedbackButton.textContent = item.feedbackReleased
            ? "Withhold Feedback"
            : "Release Feedback";

        gradeButton.classList.toggle(
            "teacher-primary-button",
            !item.gradeReleased
        );

        feedbackButton.classList.toggle(
            "teacher-primary-button",
            !item.feedbackReleased
        );

    }

    $("teacherGradeReleaseToggle").addEventListener("click", () => {

        const item = getGrade(selectedGradeId);
        if (!item) return;

        if (!item.gradeReleased) {

            if (!confirm("Release this grade in the demonstration?")) return;

            item.gradeReleased = true;

        } else {

            const reason = prompt(
                "Enter the reason for withholding this previously released grade:"
            );

            if (!reason || !reason.trim()) {
                alert("A reason is required to withhold a released grade.");
                return;
            }

            item.withheldHistory = item.withheldHistory || [];

            item.withheldHistory.push({
                reason: reason.trim(),
                date: new Date().toISOString()
            });

            item.gradeReleased = false;

        }

        updateReleaseButtons();
        updateSummary();
        renderGrades();

    });

    $("teacherFeedbackReleaseToggle").addEventListener("click", () => {

        const item = getGrade(selectedGradeId);
        if (!item) return;

        if (!item.feedback.trim()) {

            $("teacherGradeReleaseError").textContent =
                "Add feedback before releasing it.";

            $("teacherGradeReleaseError").hidden = false;
            return;

        }

        if (!item.feedbackReleased) {

            if (!confirm("Release this feedback separately from the grade?")) return;

            item.feedbackReleased = true;

        } else {

            if (!confirm("Withhold the previously released feedback?")) return;

            item.feedbackReleased = false;

        }

        $("teacherGradeReleaseError").hidden = true;

        updateReleaseButtons();
        updateSummary();
        renderGrades();

    });

    // -----------------------------------------------------
    // 11. TABLE ACTIONS
    // -----------------------------------------------------

    tableBody.addEventListener("click", event => {

        const button = event.target.closest("[data-grade-action]");
        if (!button) return;

        const id = button.dataset.id;
        const action = button.dataset.gradeAction;

        if (action === "view") {
            showDetails(id);
        }

        if (action === "edit") {
            openEdit(id);
        }

        if (action === "release") {
            openRelease(id);
        }

    });

    // -----------------------------------------------------
    // 12. DETAILS MODAL BUTTONS
    // -----------------------------------------------------

    $("teacherGradeEditFromDetails").addEventListener("click", () => {

        if (selectedGradeId) openEdit(selectedGradeId, true);

    });

    $("teacherGradeFeedbackFromDetails").addEventListener("click", () => {

        if (selectedGradeId) openFeedback(selectedGradeId, true);

    });

    // -----------------------------------------------------
    // 13. SEARCH AND FILTERS
    // -----------------------------------------------------

    function synchronizeSearch(value) {

        search.value = value;
        topSearch.value = value;

        renderGrades();

    }

    search.addEventListener("input", () => {
        synchronizeSearch(search.value);
    });

    topSearch.addEventListener("input", () => {
        synchronizeSearch(topSearch.value);
    });

    [search, topSearch].forEach(input => {

        input.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                synchronizeSearch("");
                input.blur();
            }

        });

    });

    offeringFilter.addEventListener("change", renderGrades);
    releaseFilter.addEventListener("change", renderGrades);

    $("teacherGradeClearFilters").addEventListener("click", () => {

        search.value = "";
        topSearch.value = "";

        offeringFilter.value = "all";
        releaseFilter.value = "all";

        renderGrades();

    });

    // -----------------------------------------------------
    // 14. MODAL ACCESSIBILITY
    // -----------------------------------------------------

    [detailsElement, editElement, feedbackElement, releaseElement]
        .forEach(modalElement => {

            modalElement.addEventListener("hide.bs.modal", () => {

                if (modalElement.contains(document.activeElement)) {
                    document.activeElement.blur();
                }

            });

            modalElement.addEventListener("hidden.bs.modal", () => {

                if (returnFocus && returnFocus.isConnected) {
                    returnFocus.focus();
                }

            });

        });

    // -----------------------------------------------------
    // 15. INITIALIZE
    // -----------------------------------------------------

    updateSummary();
    renderGrades();

    console.log(
        "F10.7 Teacher Grades & Feedback initialized.",
        grades.length,
        "demonstration records."
    );

}







/* =========================================================
   F10.8 - TEACHER GRADE REVIEW CASES
   FRONTEND DEMONSTRATION ONLY
   ========================================================= */

function initializeTeacherGradeReviews() {

    const tableBody = document.getElementById(
        "teacherGradeReviewTableBody"
    );

    if (!tableBody) return;

    const $ = id => document.getElementById(id);

    const search = $("teacherGradeReviewSearch");
    const topSearch = $("teacherGradeReviewTopSearch");
    const offeringFilter = $("teacherReviewOfferingFilter");
    const statusFilter = $("teacherReviewStatusFilter");

    const detailsElement = $("teacherGradeReviewDetailsModal");
    const findingsElement = $("teacherGradeReviewFindingsModal");
    const decisionElement = $("teacherGradeReviewDecisionModal");

    if (
        !search || !topSearch || !offeringFilter ||
        !statusFilter || !detailsElement ||
        !findingsElement || !decisionElement ||
        !window.bootstrap
    ) {
        console.error(
            "F10.8: Required Grade Review elements are missing."
        );
        return;
    }

    const detailsModal =
        bootstrap.Modal.getOrCreateInstance(detailsElement);

    const findingsModal =
        bootstrap.Modal.getOrCreateInstance(findingsElement);

    const decisionModal =
        bootstrap.Modal.getOrCreateInstance(decisionElement);

    let selectedCaseId = null;
    let returnFocus = null;

    // -----------------------------------------------------
    // 1. DEMONSTRATION CASE RECORDS
    // -----------------------------------------------------

    const cases = [

        {
            id: "GRC-001",
            enrollmentId: "ENR-2026-014",
            student: "Alyssa Mae Santos",
            studentId: "STU-2026-014",
            assessment: "Fractions Performance Task",
            gradeRecordId: "GR-001",
            offering: "Mathematics 6 - Sampaguita",
            recordedScore: 45,
            maximum: 50,
            requestDate: "2026-11-17T09:30",
            reason: "The Student believes that one correct solution was not included in the score.",
            status: "pending",
            findings: "",
            outcome: "",
            decision: "",
            history: []
        },

        {
            id: "GRC-002",
            enrollmentId: "ENR-2026-021",
            student: "Joshua Miguel Reyes",
            studentId: "STU-2026-021",
            assessment: "Reading Comprehension Quiz",
            gradeRecordId: "GR-002",
            offering: "English 6 - Sampaguita",
            recordedScore: 18,
            maximum: 25,
            requestDate: "2026-11-16T13:15",
            reason: "The Student requests verification of the recorded quiz score.",
            status: "under-review",
            findings: "The original answer record is being checked against the recorded result.",
            outcome: "",
            decision: "",
            history: [
                {
                    action: "Review Started",
                    notes: "Initial verification started.",
                    date: "2026-11-17T10:00"
                }
            ]
        },

        {
            id: "GRC-003",
            enrollmentId: "ENR-2026-008",
            student: "Camille Dizon",
            studentId: "STU-2026-008",
            assessment: "Ecosystem Poster",
            gradeRecordId: "GR-003",
            offering: "Science 6 - Rosal",
            recordedScore: 38,
            maximum: 40,
            requestDate: "2026-11-14T08:40",
            reason: "The Student asks for clarification about the assessment rubric.",
            status: "completed",
            findings: "The submitted work was checked against the original assessment rubric.",
            outcome: "no-change",
            decision: "The original score is consistent with the documented rubric.",
            history: [
                {
                    action: "Review Started",
                    notes: "Assessment rubric checked.",
                    date: "2026-11-15T09:00"
                },
                {
                    action: "Decision Recorded",
                    notes: "Original grade maintained.",
                    date: "2026-11-16T14:00"
                }
            ]
        },

        {
            id: "GRC-004",
            enrollmentId: "ENR-2026-032",
            student: "Daniel Cruz",
            studentId: "STU-2026-032",
            assessment: "Word Problem Worksheet",
            gradeRecordId: "GR-004",
            offering: "Mathematics 6 - Rosal",
            recordedScore: 32,
            maximum: 40,
            requestDate: "2026-11-18T11:20",
            reason: "The Student believes that the score calculation may contain an error.",
            status: "pending",
            findings: "",
            outcome: "",
            decision: "",
            history: []
        },

        {
            id: "GRC-005",
            enrollmentId: "ENR-2026-011",
            student: "Sophia Garcia",
            studentId: "STU-2026-011",
            assessment: "Plant Growth Journal",
            gradeRecordId: "GR-005",
            offering: "Science 6 - Sampaguita",
            recordedScore: 48,
            maximum: 50,
            requestDate: "2026-11-12T10:00",
            reason: "The Student requests a second check of the assessment result.",
            status: "completed",
            findings: "The recorded score was checked against the submitted journal.",
            outcome: "no-change",
            decision: "The original grade is supported by the assessment record.",
            history: [
                {
                    action: "Review Started",
                    notes: "Journal and rubric checked.",
                    date: "2026-11-13T08:30"
                },
                {
                    action: "Decision Recorded",
                    notes: "Original grade maintained.",
                    date: "2026-11-14T15:00"
                }
            ]
        },

        {
            id: "GRC-006",
            enrollmentId: "ENR-2026-019",
            student: "Nathaniel Flores",
            studentId: "STU-2026-019",
            assessment: "Paragraph Writing",
            gradeRecordId: "GR-006",
            offering: "English 6 - Rosal",
            recordedScore: 0,
            maximum: 30,
            requestDate: "2026-11-19T09:10",
            reason: "The Student requests clarification regarding the recorded score.",
            status: "pending",
            findings: "",
            outcome: "",
            decision: "",
            history: []
        },

        {
            id: "GRC-007",
            enrollmentId: "ENR-2026-027",
            student: "Isabella Ramos",
            studentId: "STU-2026-027",
            assessment: "Geometry Fundamentals",
            gradeRecordId: "GR-007",
            offering: "Mathematics 6 - Sampaguita",
            recordedScore: 27,
            maximum: 30,
            requestDate: "2026-11-13T14:25",
            reason: "The Student asks to verify the answer checking.",
            status: "under-review",
            findings: "The answer key and recorded responses are being compared.",
            outcome: "",
            decision: "",
            history: [
                {
                    action: "Review Started",
                    notes: "Answer verification initiated.",
                    date: "2026-11-14T09:30"
                }
            ]
        },

        {
            id: "GRC-008",
            enrollmentId: "ENR-2026-005",
            student: "Ethan Villanueva",
            studentId: "STU-2026-005",
            assessment: "Water Cycle Review",
            gradeRecordId: "GR-008",
            offering: "Science 6 - Rosal",
            recordedScore: 16,
            maximum: 20,
            requestDate: "2026-11-18T15:40",
            reason: "The Student requests a review of the recorded quiz result.",
            status: "pending",
            findings: "",
            outcome: "",
            decision: "",
            history: []
        }

    ];

    // F10.9 - Shared parent case records
    window.teacherGradeReviewCases = cases;

    // -----------------------------------------------------
    // 2. HELPERS
    // -----------------------------------------------------

    const escapeHTML = value =>
        String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);

    const formatDate = value => {

        if (!value) return "—";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "—";

        return date.toLocaleString("en-PH", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
        });

    };

    const statusLabels = {
        pending: "Pending Review",
        "under-review": "Under Review",
        completed: "Completed"
    };

    const initials = name => name
        .split(" ")
        .map(part => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    function getCase(id) {
        return cases.find(item => item.id === id);
    }

    function getScore(item) {
        return `${Number(item.recordedScore).toFixed(2).replace(/\.00$/, "")} / ${Number(item.maximum).toFixed(2).replace(/\.00$/, "")}`;
    }

    // -----------------------------------------------------
    // 3. POPULATE OFFERING FILTER
    // -----------------------------------------------------

    const offerings = [
        ...new Set(cases.map(item => item.offering))
    ].sort();

    offerings.forEach(offering => {

        const option = document.createElement("option");

        option.value = offering;
        option.textContent = offering;

        offeringFilter.appendChild(option);

    });

    // -----------------------------------------------------
    // 4. SUMMARY CARDS
    // -----------------------------------------------------

    function updateSummary() {

        $("teacherReviewTotal").textContent = cases.length;

        $("teacherReviewPending").textContent =
            cases.filter(item => item.status === "pending").length;

        $("teacherReviewOngoing").textContent =
            cases.filter(item => item.status === "under-review").length;

        $("teacherReviewCompleted").textContent =
            cases.filter(item => item.status === "completed").length;

    }

    // -----------------------------------------------------
    // 5. RENDER DIRECTORY
    // -----------------------------------------------------

    function renderCases() {

        const query = search.value.trim().toLowerCase();
        const offering = offeringFilter.value;
        const status = statusFilter.value;

        const filtered = cases.filter(item => {

            const searchable = [
                item.id,
                item.enrollmentId,
                item.student,
                item.studentId,
                item.assessment,
                item.gradeRecordId,
                item.offering,
                item.reason
            ];

            const matchesSearch = searchable.some(value =>
                value.toLowerCase().includes(query)
            );

            const matchesOffering =
                offering === "all" || item.offering === offering;

            const matchesStatus =
                status === "all" || item.status === status;

            return matchesSearch && matchesOffering && matchesStatus;

        });

        tableBody.innerHTML = filtered.map(item => `

            <tr>

                <td>
                    <div class="teacher-review-student">

                        <span class="teacher-student-avatar">
                            ${escapeHTML(initials(item.student))}
                        </span>

                        <div class="teacher-review-student-info">
                            <strong>${escapeHTML(item.student)}</strong>
                            <small>
                                ${escapeHTML(item.studentId)}
                                · ${escapeHTML(item.id)}
                            </small>
                        </div>

                    </div>
                </td>

                <td>
                    <div class="teacher-review-assessment">
                        <strong>${escapeHTML(item.assessment)}</strong>
                        <small>${escapeHTML(item.gradeRecordId)}</small>
                    </div>
                </td>

                <td>${escapeHTML(item.offering)}</td>

                <td>
                    <span class="teacher-review-grade">
                        ${escapeHTML(getScore(item))}
                    </span>
                </td>

                <td>${escapeHTML(formatDate(item.requestDate))}</td>

                <td>
                    <span class="teacher-grade-review-status ${item.status}">
                        ${escapeHTML(statusLabels[item.status])}
                    </span>
                </td>

                <td>
                    <div class="teacher-grade-review-actions">

                        <button type="button"
                            class="teacher-grade-review-action secondary"
                            data-review-action="view"
                            data-id="${escapeHTML(item.id)}">

                            <i class="bi bi-eye"></i>
                            View

                        </button>

                        ${item.status !== "completed" ? `

                            <button type="button"
                                class="teacher-grade-review-action"
                                data-review-action="investigate"
                                data-id="${escapeHTML(item.id)}">

                                <i class="bi bi-search"></i>
                                Review

                            </button>

                        ` : ""}

                    </div>
                </td>

            </tr>

        `).join("");

        $("teacherGradeReviewEmpty").hidden =
            filtered.length > 0;

        $("teacherReviewRecordCount").textContent =
            `${filtered.length} record${filtered.length === 1 ? "" : "s"}`;

    }

    // -----------------------------------------------------
    // 6. SELECTED CASE
    // -----------------------------------------------------

    function getSelectedCase() {
        return getCase(selectedCaseId);
    }

    // -----------------------------------------------------
    // 7. CASE HISTORY
    // -----------------------------------------------------

    function renderHistory(item) {

        if (!item.history.length) {
            return `
                <p class="text-muted small">
                    No review actions recorded yet.
                </p>
            `;
        }

        return item.history.map(entry => `

            <div class="teacher-grade-review-history-item">

                <strong>${escapeHTML(entry.action)}</strong>

                <small>${escapeHTML(entry.notes)}</small>

                <small>
                    ${escapeHTML(formatDate(entry.date))}
                </small>

            </div>

        `).join("");

    }

    // -----------------------------------------------------
    // 8. CASE DETAILS
    // -----------------------------------------------------

    function showDetails(id) {

        const item = getCase(id);

        if (!item) return;

        selectedCaseId = id;

        $("teacherGradeReviewDetailsTitle").textContent =
            item.id;

        $("teacherGradeReviewDetailsBody").innerHTML = `

            <div class="teacher-grade-review-details-grid">

                <div class="teacher-grade-review-detail-item">
                    <span>Case ID</span>
                    <strong>${escapeHTML(item.id)}</strong>
                </div>

                <div class="teacher-grade-review-detail-item">
                    <span>Grade Record ID</span>
                    <strong>${escapeHTML(item.gradeRecordId)}</strong>
                </div>

                <div class="teacher-grade-review-detail-item">
                    <span>Student</span>
                    <strong>${escapeHTML(item.student)}</strong>
                </div>

                <div class="teacher-grade-review-detail-item">
                    <span>Student ID</span>
                    <strong>${escapeHTML(item.studentId)}</strong>
                </div>

                <div class="teacher-grade-review-detail-item">
                    <span>Enrollment ID</span>
                    <strong>${escapeHTML(item.enrollmentId)}</strong>
                </div>

                <div class="teacher-grade-review-detail-item">
                    <span>Subject Offering</span>
                    <strong>${escapeHTML(item.offering)}</strong>
                </div>

                <div class="teacher-grade-review-detail-item full">
                    <span>Assessment</span>
                    <strong>${escapeHTML(item.assessment)}</strong>
                </div>

                <div class="teacher-grade-review-detail-item">
                    <span>Recorded Score</span>
                    <strong>${escapeHTML(getScore(item))}</strong>
                </div>

                <div class="teacher-grade-review-detail-item">
                    <span>Recorded Percentage</span>
                    <strong>
                        ${((item.recordedScore / item.maximum) * 100).toFixed(2)}%
                    </strong>
                </div>

                <div class="teacher-grade-review-detail-item">
                    <span>Request Date</span>
                    <strong>${escapeHTML(formatDate(item.requestDate))}</strong>
                </div>

                <div class="teacher-grade-review-detail-item">
                    <span>Review Status</span>
                    <strong>${escapeHTML(statusLabels[item.status])}</strong>
                </div>

                <div class="teacher-grade-review-detail-item full">
                    <span>Student's Reason</span>
                    <strong>${escapeHTML(item.reason)}</strong>
                </div>

                <div class="teacher-grade-review-detail-item full">
                    <span>Teacher Findings</span>
                    <strong>
                        ${item.findings
                            ? escapeHTML(item.findings)
                            : "No investigation notes recorded."}
                    </strong>
                </div>

                <div class="teacher-grade-review-detail-item full">
                    <span>Review Outcome</span>
                    <strong>
                        ${item.outcome
                            ? escapeHTML(item.outcome)
                            : "No decision recorded."}
                    </strong>
                </div>

                <div class="teacher-grade-review-detail-item full">
                    <span>Decision Explanation</span>
                    <strong>
                        ${item.decision
                            ? escapeHTML(item.decision)
                            : "No decision explanation recorded."}
                    </strong>
                </div>

            </div>

            <div class="teacher-grade-review-history">

                <h6>
                    <i class="bi bi-clock-history me-1"></i>
                    Case History
                </h6>

                ${renderHistory(item)}

            </div>

            <div class="teacher-submission-modal-notice mt-3">
                <i class="bi bi-shield-check"></i>
                Recording a review decision does not automatically modify the original Grade Record.
            </div>

        `;

        $("teacherGradeReviewStartButton").hidden =
            item.status !== "pending";

        $("teacherGradeReviewDecisionButton").hidden =
            item.status !== "under-review";

        detailsModal.show();

    }

    // -----------------------------------------------------
    // 9. START INVESTIGATION
    // -----------------------------------------------------

    function startReview(id, fromDetails = false) {

        const item = getCase(id);

        if (!item || item.status !== "pending") return;

        selectedCaseId = id;

        if (!confirm(
            "Start the investigation for this demonstration case?"
        )) return;

        item.status = "under-review";

        item.history.push({
            action: "Review Started",
            notes: "Teacher started investigating the Student's grade concern.",
            date: new Date().toISOString()
        });

        updateSummary();
        renderCases();

        if (fromDetails) {
            showDetails(id);
        }

    }

    // -----------------------------------------------------
    // 10. OPEN FINDINGS MODAL
    // -----------------------------------------------------

    function openFindings(id) {

        const item = getCase(id);

        if (!item || item.status !== "under-review") return;

        selectedCaseId = id;

        $("teacherGradeReviewFindingsContext").textContent =
            `${item.student} · ${item.assessment} · ${item.id}`;

        $("teacherGradeReviewFindingsText").value =
            item.findings || "";

        $("teacherGradeReviewFindingsError").hidden = true;

        returnFocus = search;

        findingsModal.show();

    }

    // -----------------------------------------------------
    // 11. SAVE INVESTIGATION FINDINGS
    // -----------------------------------------------------

    $("teacherGradeReviewFindingsForm")
        .addEventListener("submit", event => {

            event.preventDefault();

            const item = getSelectedCase();

            if (!item || item.status !== "under-review") return;

            const findings = $("teacherGradeReviewFindingsText")
                .value.trim();

            const error = $("teacherGradeReviewFindingsError");

            error.hidden = true;

            if (!findings) {

                error.textContent =
                    "Investigation notes are required.";

                error.hidden = false;

                return;

            }

            item.findings = findings;

            item.history.push({
                action: "Investigation Findings Saved",
                notes: findings,
                date: new Date().toISOString()
            });

            findingsModal.hide();

            renderCases();

            alert(
                "Demonstration only: Investigation findings saved locally. The original grade has not changed."
            );

        });

    // -----------------------------------------------------
    // 12. OPEN DECISION MODAL
    // -----------------------------------------------------

    function openDecision(id, fromDetails = false) {

        const item = getCase(id);

        if (!item || item.status !== "under-review") return;

        selectedCaseId = id;

        if (!item.findings.trim()) {

            alert(
                "Record investigation findings before recording a review decision."
            );

            return;

        }

        $("teacherGradeReviewDecisionContext").textContent =
            `${item.student} · ${item.assessment} · ${item.id}`;

        $("teacherGradeReviewOutcome").value = "";
        $("teacherGradeReviewDecisionText").value = "";

        $("teacherGradeReviewDecisionError").hidden = true;

        returnFocus = search;

        if (fromDetails) {

            detailsElement.addEventListener(
                "hidden.bs.modal",
                () => decisionModal.show(),
                { once: true }
            );

            detailsModal.hide();

        } else {

            decisionModal.show();

        }

    }

    // -----------------------------------------------------
    // 13. SAVE REVIEW DECISION
    // -----------------------------------------------------

    $("teacherGradeReviewDecisionForm")
        .addEventListener("submit", event => {

            event.preventDefault();

            const item = getSelectedCase();

            if (!item || item.status !== "under-review") return;

            const outcome = $("teacherGradeReviewOutcome").value;

            const explanation = $("teacherGradeReviewDecisionText")
                .value.trim();

            const error = $("teacherGradeReviewDecisionError");

            error.hidden = true;

            if (!outcome || !explanation) {

                error.textContent =
                    "Select a review outcome and provide an explanation.";

                error.hidden = false;

                return;

            }

            if (!item.findings.trim()) {

                error.textContent =
                    "Investigation findings must be recorded first.";

                error.hidden = false;

                return;

            }

            item.outcome = outcome;
            item.decision = explanation;
            item.status = "completed";

            item.history.push({
                action: "Review Decision Recorded",
                notes: `${outcome}: ${explanation}`,
                date: new Date().toISOString()
            });

            decisionModal.hide();

            updateSummary();
            renderCases();

            alert(
                "Demonstration only: Review decision recorded. The original Grade Record remains unchanged."
            );

        });

    // -----------------------------------------------------
    // 14. DETAILS MODAL ACTIONS
    // -----------------------------------------------------

    $("teacherGradeReviewStartButton")
        .addEventListener("click", () => {

            if (!selectedCaseId) return;

            startReview(selectedCaseId, true);

        });

    $("teacherGradeReviewDecisionButton")
        .addEventListener("click", () => {

            if (!selectedCaseId) return;

            openDecision(selectedCaseId, true);

        });

    // -----------------------------------------------------
    // 15. TABLE ACTIONS
    // -----------------------------------------------------

    tableBody.addEventListener("click", event => {

        const button = event.target.closest("[data-review-action]");

        if (!button) return;

        const id = button.dataset.id;
        const action = button.dataset.reviewAction;

        if (action === "view") {
            showDetails(id);
        }

        if (action === "investigate") {

            const item = getCase(id);

            if (!item) return;

            if (item.status === "pending") {
                startReview(id, false);
            } else if (item.status === "under-review") {
                openFindings(id);
            }

        }

    });

    // -----------------------------------------------------
    // 16. SYNCHRONIZED SEARCH
    // -----------------------------------------------------

    function synchronizeSearch(value) {

        search.value = value;
        topSearch.value = value;

        renderCases();

    }

    search.addEventListener("input", () => {
        synchronizeSearch(search.value);
    });

    topSearch.addEventListener("input", () => {
        synchronizeSearch(topSearch.value);
    });

    [search, topSearch].forEach(input => {

        input.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                synchronizeSearch("");

                input.blur();

            }

        });

    });

    // -----------------------------------------------------
    // 17. FILTER EVENTS
    // -----------------------------------------------------

    offeringFilter.addEventListener("change", renderCases);
    statusFilter.addEventListener("change", renderCases);

    $("teacherReviewClearFilters")
        .addEventListener("click", () => {

            search.value = "";
            topSearch.value = "";

            offeringFilter.value = "all";
            statusFilter.value = "all";

            renderCases();

        });

    // -----------------------------------------------------
    // 18. MODAL ACCESSIBILITY
    // -----------------------------------------------------

    [detailsElement, findingsElement, decisionElement]
        .forEach(modalElement => {

            modalElement.addEventListener("hide.bs.modal", () => {

                if (modalElement.contains(document.activeElement)) {
                    document.activeElement.blur();
                }

            });

            modalElement.addEventListener("hidden.bs.modal", () => {

                if (returnFocus && returnFocus.isConnected) {
                    returnFocus.focus();
                }

            });

        });

    // -----------------------------------------------------
    // 19. INITIALIZE
    // -----------------------------------------------------

    updateSummary();
    renderCases();

    console.log(
        "F10.8 Teacher Grade Review Cases initialized.",
        cases.length,
        "demonstration cases."
    );

}







/* =========================================================
   F10.9 - GRADE REVIEW FOLLOW-UPS
   FRONTEND DEMONSTRATION ONLY
   ========================================================= */

function initializeTeacherGradeReviewFollowups() {

    const tableBody = document.getElementById(
        "teacherFollowupTableBody"
    );

    if (!tableBody) return;

    const $ = id => document.getElementById(id);

    const cases = window.teacherGradeReviewCases;

    if (!Array.isArray(cases)) {
        console.error(
            "F10.9: Parent Grade Review Cases were not initialized. Check F10.8 initialization."
        );
        return;
    }

    const search = $("teacherFollowupSearch");
    const statusFilter = $("teacherFollowupStatusFilter");
    const caseSelect = $("teacherFollowupCase");

    const addElement = $("teacherFollowupModal");
    const detailsElement = $("teacherFollowupDetailsModal");

    if (
        !search || !statusFilter || !caseSelect ||
        !addElement || !detailsElement || !window.bootstrap
    ) {
        console.error("F10.9: Required Follow-up elements are missing.");
        return;
    }

    const addModal = bootstrap.Modal.getOrCreateInstance(addElement);
    const detailsModal = bootstrap.Modal.getOrCreateInstance(detailsElement);

    let selectedFollowupId = null;
    let returnFocus = null;
    let followupCounter = 3;

    // -----------------------------------------------------
    // 1. DEMONSTRATION FOLLOW-UP RECORDS
    // -----------------------------------------------------

    const followups = [

        {
            id: "GRF-001",
            caseId: "GRC-001",
            action: "Verify the original assessment scoring sheet.",
            dueDate: "2026-11-24",
            status: "open",
            history: [
                {
                    action: "Follow-up Created",
                    notes: "Scoring sheet verification requested.",
                    date: "2026-11-18T09:00"
                }
            ]
        },

        {
            id: "GRF-002",
            caseId: "GRC-002",
            action: "Compare the recorded quiz answers with the answer key.",
            dueDate: "2026-11-22",
            status: "open",
            history: [
                {
                    action: "Follow-up Created",
                    notes: "Answer key verification requested.",
                    date: "2026-11-18T10:30"
                }
            ]
        },

        {
            id: "GRF-003",
            caseId: "GRC-003",
            action: "Document the rubric verification findings.",
            dueDate: "2026-11-20",
            status: "addressed",
            history: [
                {
                    action: "Follow-up Created",
                    notes: "Rubric verification requested.",
                    date: "2026-11-15T08:00"
                },
                {
                    action: "Marked Addressed",
                    notes: "The rubric verification was documented.",
                    date: "2026-11-19T14:00"
                }
            ]
        }

    ];

    // -----------------------------------------------------
    // 2. HELPERS
    // -----------------------------------------------------

    const escapeHTML = value =>
        String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);

    const formatDate = value => {

        if (!value) return "No due date";

        const date = new Date(value + "T00:00:00");

        if (Number.isNaN(date.getTime())) return "No due date";

        return date.toLocaleDateString("en-PH", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });

    };

    const formatDateTime = value => {

        if (!value) return "—";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "—";

        return date.toLocaleString("en-PH", {
            dateStyle: "medium",
            timeStyle: "short"
        });

    };

    function getParentCase(followup) {

        return cases.find(item =>
            item.id === followup.caseId
        );

    }

    function getFollowup(id) {

        return followups.find(item =>
            item.id === id
        );

    }

    // -----------------------------------------------------
    // 3. POPULATE PARENT CASE SELECTOR
    // -----------------------------------------------------

    cases.forEach(item => {

        const option = document.createElement("option");

        option.value = item.id;

        option.textContent =
            `${item.id} - ${item.student} - ${item.assessment}`;

        caseSelect.appendChild(option);

    });

    // -----------------------------------------------------
    // 4. STUDENT IDENTITY PREVIEW
    // -----------------------------------------------------

    function updateStudentPreview() {

        const parent = cases.find(item =>
            item.id === caseSelect.value
        );

        const preview = $("teacherFollowupStudentPreview");

        if (!parent) {

            preview.hidden = true;

            $("teacherFollowupStudentName").textContent = "";
            $("teacherFollowupStudentIdentity").textContent = "";

            return;

        }

        $("teacherFollowupStudentName").textContent =
            parent.student;

        $("teacherFollowupStudentIdentity").textContent =
            `${parent.studentId} · ${parent.enrollmentId}`;

        preview.hidden = false;

    }

    caseSelect.addEventListener(
        "change",
        updateStudentPreview
    );

    // -----------------------------------------------------
    // 5. SUMMARY CARDS
    // -----------------------------------------------------

    function updateSummary() {

        $("teacherFollowupTotal").textContent =
            followups.length;

        $("teacherFollowupOpen").textContent =
            followups.filter(item =>
                item.status === "open"
            ).length;

        $("teacherFollowupAddressed").textContent =
            followups.filter(item =>
                item.status === "addressed"
            ).length;

    }

    // -----------------------------------------------------
    // 6. RENDER FOLLOW-UP TABLE
    // -----------------------------------------------------

    function renderFollowups() {

        const query = search.value.trim().toLowerCase();
        const status = statusFilter.value;

        const filtered = followups.filter(item => {

            const parent = getParentCase(item);

            if (!parent) return false;

            const searchable = [
                item.id,
                item.caseId,
                item.action,
                parent.student,
                parent.studentId,
                parent.assessment
            ];

            const matchesSearch = searchable.some(value =>
                String(value).toLowerCase().includes(query)
            );

            const matchesStatus =
                status === "all" || item.status === status;

            return matchesSearch && matchesStatus;

        });

        tableBody.innerHTML = filtered.map(item => {

            const parent = getParentCase(item);

            if (!parent) return "";

            return `

                <tr>

                    <td>
                        <strong>${escapeHTML(item.id)}</strong>
                    </td>

                    <td>
                        <strong>${escapeHTML(parent.id)}</strong>
                        <small class="d-block text-muted">
                            ${escapeHTML(parent.gradeRecordId)}
                        </small>
                    </td>

                    <td>
                        <strong>${escapeHTML(parent.student)}</strong>
                        <small class="d-block text-muted">
                            ${escapeHTML(parent.studentId)}
                        </small>
                    </td>

                    <td>
                        ${escapeHTML(item.action)}
                    </td>

                    <td>
                        ${escapeHTML(formatDate(item.dueDate))}
                    </td>

                    <td>
                        <span class="teacher-followup-status ${item.status}">
                            ${item.status === "open" ? "Open" : "Addressed"}
                        </span>
                    </td>

                    <td>
                        <div class="teacher-followup-actions">

                            <button type="button"
                                class="teacher-followup-action"
                                data-followup-action="view"
                                data-id="${escapeHTML(item.id)}">

                                <i class="bi bi-eye"></i>
                                View

                            </button>

                        </div>
                    </td>

                </tr>

            `;

        }).join("");

        $("teacherFollowupEmpty").hidden =
            filtered.length > 0;

        $("teacherFollowupRecordCount").textContent =
            `${filtered.length} record${filtered.length === 1 ? "" : "s"}`;

    }

    // -----------------------------------------------------
    // 7. OPEN ADD FOLLOW-UP MODAL
    // -----------------------------------------------------

    $("teacherAddFollowupButton")
        .addEventListener("click", event => {

            returnFocus = event.currentTarget;

            $("teacherFollowupForm").reset();

            $("teacherFollowupError").hidden = true;

            $("teacherFollowupStudentPreview").hidden = true;

            $("teacherFollowupModalTitle").textContent =
                "Add Follow-up";

            addModal.show();

        });

    // -----------------------------------------------------
    // 8. SAVE NEW FOLLOW-UP
    // -----------------------------------------------------

    $("teacherFollowupForm")
        .addEventListener("submit", event => {

            event.preventDefault();

            const parent = cases.find(item =>
                item.id === caseSelect.value
            );

            const action = $("teacherFollowupNotes")
                .value.trim();

            const dueDate = $("teacherFollowupDueDate").value;

            const error = $("teacherFollowupError");

            error.hidden = true;

            if (!parent) {

                error.textContent =
                    "Select a valid existing Grade Review Case.";

                error.hidden = false;

                caseSelect.focus();

                return;

            }

            if (!action) {

                error.textContent =
                    "Follow-up action or notes are required.";

                error.hidden = false;

                $("teacherFollowupNotes").focus();

                return;

            }

            if (dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {

                error.textContent =
                    "Enter a valid target due date.";

                error.hidden = false;

                return;

            }

            followupCounter++;

            const id =
                `GRF-${String(followupCounter).padStart(3, "0")}`;

            followups.push({

                id,

                caseId: parent.id,

                // Student identity comes from the selected parent case.
                // It is not independently entered by the Teacher.

                action,

                dueDate,

                status: "open",

                history: [{

                    action: "Follow-up Created",

                    notes: action,

                    date: new Date().toISOString()

                }]

            });

            addModal.hide();

            updateSummary();
            renderFollowups();

            alert(
                "Demonstration only: Follow-up created and linked to " +
                parent.id + ". Student identity was inherited from the parent case."
            );

        });

    // -----------------------------------------------------
    // 9. FOLLOW-UP HISTORY
    // -----------------------------------------------------

    function renderHistory(item) {

        if (!item.history.length) {

            return `
                <p class="text-muted small">
                    No follow-up history recorded.
                </p>
            `;

        }

        return item.history.map(entry => `

            <div class="teacher-followup-history-item">

                <strong>${escapeHTML(entry.action)}</strong>

                <small>${escapeHTML(entry.notes)}</small>

                <small>
                    ${escapeHTML(formatDateTime(entry.date))}
                </small>

            </div>

        `).join("");

    }

    // -----------------------------------------------------
    // 10. SHOW FOLLOW-UP DETAILS
    // -----------------------------------------------------

    function showDetails(id, trigger = null) {

        const item = getFollowup(id);

        if (!item) return;

        const parent = getParentCase(item);

        if (!parent) {

            alert("The linked Grade Review Case could not be found.");

            return;

        }

        selectedFollowupId = id;

        returnFocus = trigger || search;

        $("teacherFollowupDetailsTitle").textContent =
            item.id;

        $("teacherFollowupDetailsBody").innerHTML = `

            <div class="teacher-followup-details-grid">

                <div class="teacher-followup-detail-item">
                    <span>Follow-up ID</span>
                    <strong>${escapeHTML(item.id)}</strong>
                </div>

                <div class="teacher-followup-detail-item">
                    <span>Parent Case ID</span>
                    <strong>${escapeHTML(parent.id)}</strong>
                </div>

                <div class="teacher-followup-detail-item">
                    <span>Student</span>
                    <strong>${escapeHTML(parent.student)}</strong>
                </div>

                <div class="teacher-followup-detail-item">
                    <span>Student ID</span>
                    <strong>${escapeHTML(parent.studentId)}</strong>
                </div>

                <div class="teacher-followup-detail-item">
                    <span>Enrollment ID</span>
                    <strong>${escapeHTML(parent.enrollmentId)}</strong>
                </div>

                <div class="teacher-followup-detail-item">
                    <span>Grade Record</span>
                    <strong>${escapeHTML(parent.gradeRecordId)}</strong>
                </div>

                <div class="teacher-followup-detail-item full">
                    <span>Assessment</span>
                    <strong>${escapeHTML(parent.assessment)}</strong>
                </div>

                <div class="teacher-followup-detail-item full">
                    <span>Follow-up Action / Notes</span>
                    <strong>${escapeHTML(item.action)}</strong>
                </div>

                <div class="teacher-followup-detail-item">
                    <span>Target Due Date</span>
                    <strong>${escapeHTML(formatDate(item.dueDate))}</strong>
                </div>

                <div class="teacher-followup-detail-item">
                    <span>Status</span>
                    <strong>${item.status === "open" ? "Open" : "Addressed"}</strong>
                </div>

            </div>

            <div class="teacher-followup-history">

                <h6>
                    <i class="bi bi-clock-history me-1"></i>
                    Follow-up History
                </h6>

                ${renderHistory(item)}

            </div>

            <div class="teacher-submission-modal-notice mt-3">

                <i class="bi bi-shield-check"></i>

                Student identity is inherited from the parent case. This follow-up cannot independently modify the original Grade Record.

            </div>

        `;

        $("teacherFollowupAddressButton").hidden =
            item.status === "addressed";

        detailsModal.show();

    }

    // -----------------------------------------------------
    // 11. TABLE ACTIONS
    // -----------------------------------------------------

    tableBody.addEventListener("click", event => {

        const button = event.target.closest(
            "[data-followup-action]"
        );

        if (!button) return;

        if (button.dataset.followupAction === "view") {

            showDetails(
                button.dataset.id,
                button
            );

        }

    });

    // -----------------------------------------------------
    // 12. MARK FOLLOW-UP ADDRESSED
    // -----------------------------------------------------

    $("teacherFollowupAddressButton")
        .addEventListener("click", () => {

            const item = getFollowup(selectedFollowupId);

            if (!item || item.status !== "open") return;

            const notes = prompt(
                "Enter the action taken to address this follow-up:"
            );

            if (!notes || !notes.trim()) {

                alert("A follow-up completion note is required.");

                return;

            }

            item.status = "addressed";

            item.history.push({

                action: "Marked Addressed",

                notes: notes.trim(),

                date: new Date().toISOString()

            });

            updateSummary();
            renderFollowups();

            showDetails(item.id);

        });

    // -----------------------------------------------------
    // 13. SEARCH AND FILTERS
    // -----------------------------------------------------

    search.addEventListener("input", renderFollowups);

    search.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            search.value = "";

            renderFollowups();

            search.blur();

        }

    });

    statusFilter.addEventListener(
        "change",
        renderFollowups
    );

    $("teacherFollowupClearFilters")
        .addEventListener("click", () => {

            search.value = "";

            statusFilter.value = "all";

            renderFollowups();

        });

    // -----------------------------------------------------
    // 14. MODAL ACCESSIBILITY
    // -----------------------------------------------------

    [addElement, detailsElement].forEach(modalElement => {

        modalElement.addEventListener("hide.bs.modal", () => {

            if (modalElement.contains(document.activeElement)) {
                document.activeElement.blur();
            }

        });

        modalElement.addEventListener("hidden.bs.modal", () => {

            if (
                returnFocus &&
                returnFocus.isConnected &&
                !returnFocus.closest(".modal.show")
            ) {

                returnFocus.focus();

            }

        });

    });

    // -----------------------------------------------------
    // 15. INITIALIZE
    // -----------------------------------------------------

    updateSummary();

    renderFollowups();

    console.log(
        "F10.9 Grade Review Follow-ups initialized.",
        followups.length,
        "demonstration records."
    );

}








/* =====================================================
   F10.11.3 - TEACHER ANNOUNCEMENTS
   FRONTEND DEMONSTRATION ONLY
   ===================================================== */

function initializeTeacherAnnouncements() {
    const tableBody = document.getElementById("teacherAnnouncementTableBody");
    if (!tableBody) return;

    const el = {
        total: document.getElementById("teacherAnnouncementTotal"),
        read: document.getElementById("teacherAnnouncementRead"),
        unread: document.getElementById("teacherAnnouncementUnread"),
        scopes: document.getElementById("teacherAnnouncementScopes"),
        recordCount: document.getElementById("teacherAnnouncementRecordCount"),
        search: document.getElementById("teacherAnnouncementSearch"),
        topbarSearch: document.getElementById("teacherAnnouncementTopbarSearch"),
        audience: document.getElementById("teacherAnnouncementAudienceFilter"),
        readFilter: document.getElementById("teacherAnnouncementReadFilter"),
        clear: document.getElementById("teacherAnnouncementClear"),
        empty: document.getElementById("teacherAnnouncementEmpty"),
        modal: document.getElementById("teacherAnnouncementDetailsModal"),
        modalTitle: document.getElementById("teacherAnnouncementDetailsTitle"),
        details: document.getElementById("teacherAnnouncementDetailsBody"),
        history: document.getElementById("teacherAnnouncementVersionHistory"),
        message: document.getElementById("teacherAnnouncementMessage")
    };

    const required = [
        "total", "read", "unread", "scopes", "recordCount", "search",
        "audience", "readFilter", "clear", "empty", "modal",
        "modalTitle", "details", "history"
    ];

    const missing = required.filter(key => !el[key]);
    if (missing.length) {
        console.error("F10.11: Missing Announcements HTML elements:", missing);
        return;
    }

    // Fictional records for the frontend demonstration only.
    // Audience scopes stay empty until approved vocabulary and permissions are verified.
    const announcements = [
        {
            id: "ANN-2026-001",
            currentVersionId: "ANN-2026-001-V2",
            versions: [
                {
                    id: "ANN-2026-001-V1", number: 1,
                    title: "Welcome to Academic Year 2026-2027",
                    content: "Welcome to the new academic year. Please review the school calendar and the important information shared by your school. Contact the authorized school office if you need clarification.",
                    publishedAt: "2026-11-10",
                    changeNote: "Initial publication",
                    audienceScopes: []
                },
                {
                    id: "ANN-2026-001-V2", number: 2,
                    title: "Welcome to Academic Year 2026-2027",
                    content: "Welcome to the new academic year. Please review the updated school calendar and the important information shared by your school. This version contains revised schedule details.",
                    publishedAt: "2026-11-18",
                    changeNote: "Updated schedule information",
                    audienceScopes: []
                }
            ]
        },
        {
            id: "ANN-2026-002",
            currentVersionId: "ANN-2026-002-V1",
            versions: [
                {
                    id: "ANN-2026-002-V1", number: 1,
                    title: "Faculty Coordination Meeting",
                    content: "Please review the coordination meeting details and prepare the updates relevant to your assigned responsibilities. The final meeting arrangements will be communicated through the authorized school channel.",
                    publishedAt: "2026-11-19",
                    changeNote: "Initial publication",
                    audienceScopes: []
                }
            ]
        },
        {
            id: "ANN-2026-003",
            currentVersionId: "ANN-2026-003-V2",
            versions: [
                {
                    id: "ANN-2026-003-V1", number: 1,
                    title: "Quarterly Learning Activity Reminders",
                    content: "Please review the reminders related to upcoming learning activities and check the instructions provided through your authorized school workspace.",
                    publishedAt: "2026-11-16",
                    changeNote: "Initial publication",
                    audienceScopes: []
                },
                {
                    id: "ANN-2026-003-V2", number: 2,
                    title: "Quarterly Learning Activity Reminders",
                    content: "Please review the updated reminders related to upcoming learning activities. Check the latest instructions and dates provided through your authorized school workspace.",
                    publishedAt: "2026-11-21",
                    changeNote: "Updated activity reminders",
                    audienceScopes: []
                }
            ]
        },
        {
            id: "ANN-2026-004",
            currentVersionId: "ANN-2026-004-V1",
            versions: [
                {
                    id: "ANN-2026-004-V1", number: 1,
                    title: "Campus Facilities and Safety Advisory",
                    content: "Please observe the posted campus safety reminders and follow the instructions of authorized school personnel when using school facilities.",
                    publishedAt: "2026-11-22",
                    changeNote: "Initial publication",
                    audienceScopes: []
                }
            ]
        }
    ];

    // Read status belongs to an exact version. It resets when this demo page is refreshed.
    const readVersionIds = new Set([
        "ANN-2026-001-V1",
        "ANN-2026-002-V1",
        "ANN-2026-004-V1"
    ]);

    let returnFocusElement = null;
    const modal = window.bootstrap?.Modal
        ? window.bootstrap.Modal.getOrCreateInstance(el.modal)
        : null;

    if (!modal) {
        console.error("F10.11: Bootstrap Modal is unavailable. Check the Bootstrap bundle script.");
    }

    // F10.11 - TEMPORARY DEMONSTRATION AUDIENCE FILTER

    el.audience.replaceChildren(
        new Option("All Audiences", "all"),
        new Option("Scope Not Verified (Demo)", "__unverified__")
    );

    el.audience.value = "all";
    el.audience.disabled = false;

    el.audience.title =
        "This temporary filter identifies records with unverified audience scopes.";

    function getAnnouncement(id) {
        return announcements.find(item => item.id === id) || null;
    }

    function getVersion(announcement, versionId) {
        return announcement?.versions.find(version => version.id === versionId) || null;
    }

    function getCurrentVersion(announcement) {
        return getVersion(announcement, announcement.currentVersionId);
    }

    function isRead(versionId) {
        return readVersionIds.has(versionId);
    }

    function formatDate(value) {
        if (!value) return "Not available";
        const date = new Date(value + "T12:00:00");
        if (Number.isNaN(date.getTime())) return value;
        return new Intl.DateTimeFormat("en-PH", {
            year: "numeric", month: "short", day: "numeric"
        }).format(date);
    }

    function makeElement(tag, className = "", text = "") {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== "") node.textContent = text;
        return node;
    }

    function updateSummary() {
        const currentVersions = announcements.map(getCurrentVersion).filter(Boolean);
        const readCount = currentVersions.filter(version => isRead(version.id)).length;
        const scopeSet = new Set();

        currentVersions.forEach(version => {
            version.audienceScopes.forEach(scope => scopeSet.add(scope));
        });

        el.total.textContent = String(announcements.length);
        el.read.textContent = String(readCount);
        el.unread.textContent = String(currentVersions.length - readCount);
        el.scopes.textContent = String(scopeSet.size);
    }

    function renderTable() {
        const query = el.search.value.trim().toLowerCase();
        const selectedAudience = el.audience.value;
        const selectedRead = el.readFilter.value;

        const filtered = announcements.filter(announcement => {
            const current = getCurrentVersion(announcement);
            if (!current) return false;

            const allText = announcement.versions.map(version =>
                [version.title, version.content, version.changeNote].join(" ")
            ).join(" ");

            const searchText = (announcement.id + " " + allText).toLowerCase();
            const matchesSearch = searchText.includes(query);
            const matchesAudience = selectedAudience === "all" ||
                (
                    selectedAudience === "__unverified__" &&
                    current.audienceScopes.length === 0
                ) ||
                current.audienceScopes.includes(selectedAudience);
            const currentRead = isRead(current.id);
            const matchesRead = selectedRead === "all" ||
                (selectedRead === "read" && currentRead) ||
                (selectedRead === "unread" && !currentRead);

            return matchesSearch && matchesAudience && matchesRead;
        });

        const fragment = document.createDocumentFragment();

        filtered.forEach(announcement => {
            const current = getCurrentVersion(announcement);
            const row = document.createElement("tr");

            const titleCell = document.createElement("td");
            const titleWrap = makeElement("div", "teacher-announcement-title-cell");
            titleWrap.append(
                makeElement("strong", "", current.title),
                makeElement("small", "", announcement.id)
            );
            titleCell.appendChild(titleWrap);

            const audienceCell = document.createElement("td");
            const audienceWrap = makeElement("div", "teacher-announcement-audience");
            if (current.audienceScopes.length) {
                current.audienceScopes.forEach(scope => {
                    audienceWrap.appendChild(makeElement(
                        "span", "teacher-announcement-audience-tag", scope
                    ));
                });
            } else {
                audienceWrap.appendChild(makeElement(
                    "span", "text-secondary small", "Scope pending verification"
                ));
            }
            audienceCell.appendChild(audienceWrap);

            const versionCell = document.createElement("td");
            versionCell.appendChild(makeElement(
                "span", "teacher-announcement-version", "Version " + current.number
            ));

            const dateCell = makeElement("td", "", formatDate(current.publishedAt));

            const readCell = document.createElement("td");
            const currentRead = isRead(current.id);
            const readBadge = makeElement(
                "span",
                "teacher-announcement-read-status " + (currentRead ? "read" : "unread")
            );
            const readIcon = makeElement("i");
            readIcon.className = currentRead ? "bi bi-check-circle-fill" : "bi bi-envelope-fill";
            readBadge.append(readIcon, document.createTextNode(currentRead ? " Read" : " Unread"));
            readCell.appendChild(readBadge);

            const actionCell = document.createElement("td");
            const viewButton = makeElement(
                "button", "teacher-announcement-view-button", "View Details"
            );
            viewButton.type = "button";
            viewButton.dataset.announcementAction = "view";
            viewButton.dataset.announcementId = announcement.id;
            const viewIcon = makeElement("i");
            viewIcon.className = "bi bi-eye";
            viewButton.prepend(viewIcon);
            actionCell.appendChild(viewButton);

            row.append(titleCell, audienceCell, versionCell, dateCell, readCell, actionCell);
            fragment.appendChild(row);
        });

        tableBody.replaceChildren(fragment);
        el.empty.hidden = filtered.length > 0;
        el.recordCount.textContent = filtered.length + (filtered.length === 1 ? " record" : " records");
        updateSummary();
    }

    
function renderDetails(announcement, selectedVersion) {

    el.modalTitle.textContent = "Announcement Details";

    // ANNOUNCEMENT TITLE

    const title = makeElement(
        "h4",
        "teacher-announcement-detail-title",
        selectedVersion.title
    );


    // ANNOUNCEMENT METADATA

    const metadata = makeElement(
        "div",
        "teacher-announcement-detail-meta"
    );

    metadata.append(
        makeElement(
            "span",
            "teacher-announcement-meta-chip",
            announcement.id
        ),

        makeElement(
            "span",
            "teacher-announcement-meta-chip",
            "Version " + selectedVersion.number
        ),

        makeElement(
            "span",
            "teacher-announcement-meta-chip",
            "Published " + formatDate(selectedVersion.publishedAt)
        )
    );

    const readBadge = makeElement(
        "span",
        "teacher-announcement-detail-status " +
        (isRead(selectedVersion.id) ? "read" : "unread"),
        isRead(selectedVersion.id) ? "Read" : "Unread"
    );

    metadata.appendChild(readBadge);


    // ANNOUNCEMENT MESSAGE

    const contentCard = makeElement(
        "div",
        "teacher-announcement-content-card"
    );

    contentCard.append(
        makeElement(
            "span",
            "teacher-announcement-content-label",
            "ANNOUNCEMENT MESSAGE"
        ),

        makeElement(
            "p",
            "teacher-announcement-detail-content",
            selectedVersion.content
        )
    );


    // AUDIENCE INFORMATION

    const audienceNote = makeElement(
        "div",
        "teacher-announcement-audience-note"
    );

    const audienceIcon = makeElement("i");
    audienceIcon.className = "bi bi-info-circle-fill";

    const audienceText = selectedVersion.audienceScopes.length
        ? "Audience scopes: " + selectedVersion.audienceScopes.join(", ")
        : "Audience scope is pending verification against the approved project permissions.";

    audienceNote.append(
        audienceIcon,
        makeElement("span", "", audienceText)
    );


    // VERSION NOTE

    const versionNote = makeElement(
        "div",
        "teacher-announcement-version-note"
    );

    versionNote.append(
        makeElement("strong", "", "Version Note"),

        makeElement(
            "p",
            "",
            selectedVersion.changeNote
        )
    );


    // UPDATE DETAILS CONTENT

    el.details.replaceChildren(
        title,
        metadata,
        contentCard,
        audienceNote,
        versionNote
    );


    // VERSION HISTORY

    const versionList = makeElement(
        "div",
        "teacher-announcement-version-list"
    );

    [...announcement.versions].reverse().forEach(version => {

        const isCurrent =
            version.id === announcement.currentVersionId;

        const isSelected =
            version.id === selectedVersion.id;

        const item = makeElement(
            "article",
            "teacher-announcement-version-item" +
            (isSelected ? " is-selected" : "")
        );


        // VERSION INFORMATION

        const information = makeElement(
            "div",
            "teacher-announcement-version-info"
        );

        const heading = makeElement(
            "div",
            "teacher-announcement-version-heading"
        );

        heading.appendChild(
            makeElement(
                "strong",
                "",
                "Version " + version.number
            )
        );

        heading.appendChild(
            makeElement(
                "span",
                "teacher-announcement-version-tag " +
                (isCurrent ? "current" : "previous"),
                isCurrent ? "Current" : "Previous"
            )
        );

        const versionStatus = isRead(version.id)
            ? "Read"
            : "Unread";

        const versionMeta = makeElement(
            "small",
            "teacher-announcement-version-meta",
            "Published " + formatDate(version.publishedAt) +
            " | " + versionStatus +
            " | " + version.changeNote
        );

        information.append(
            heading,
            versionMeta
        );


        // VERSION ACTION

        const actions = makeElement(
            "div",
            "teacher-announcement-version-actions"
        );

        const versionButton = makeElement(
            "button",
            "teacher-announcement-version-button",
            isSelected ? "Currently Viewing" : "View Version"
        );

        versionButton.type = "button";

        versionButton.dataset.announcementVersionAction = "view";
        versionButton.dataset.announcementId = announcement.id;
        versionButton.dataset.versionId = version.id;

        versionButton.disabled = isSelected;

        actions.appendChild(versionButton);

        item.append(
            information,
            actions
        );

        versionList.appendChild(item);

    });

    el.history.replaceChildren(versionList);

}


    function openVersion(announcementId, versionId, trigger) {
        const announcement = getAnnouncement(announcementId);
        const version = getVersion(announcement, versionId);
        if (!announcement || !version) return;

        // Remember whether this action started outside the modal.
        // The table is re-rendered after read status changes, so its
        // replacement button becomes the focus-return target.
        const openedFromTable = Boolean(
            trigger?.isConnected && !trigger.closest(".modal")
        );

        readVersionIds.add(version.id);
        renderDetails(announcement, version);
        renderTable();

        if (openedFromTable) {
            returnFocusElement = Array.from(
                tableBody.querySelectorAll("[data-announcement-action='view']")
            ).find(button => button.dataset.announcementId === announcement.id) || null;
        }

        if (modal) {
            modal.show();
        } else if (el.message) {
            el.message.textContent = "Details are ready, but the Bootstrap modal could not open. Check the Bootstrap bundle script.";
            el.message.hidden = false;
        }
    }

    // Table: open the current published version.
    tableBody.addEventListener("click", event => {
        const button = event.target.closest("[data-announcement-action='view']");
        if (!button || !tableBody.contains(button)) return;
        const announcement = getAnnouncement(button.dataset.announcementId);
        if (!announcement) return;
        openVersion(announcement.id, announcement.currentVersionId, button);
    });

    // Version history: open only the selected historical/current version.
    el.history.addEventListener("click", event => {
        const button = event.target.closest("[data-announcement-version-action='view']");
        if (!button || !el.history.contains(button)) return;
        openVersion(button.dataset.announcementId, button.dataset.versionId, button);
    });

    function syncSearch(source) {
        el.search.value = source.value;
        if (el.topbarSearch) el.topbarSearch.value = source.value;
        renderTable();
    }

    el.search.addEventListener("input", () => syncSearch(el.search));
    if (el.topbarSearch) {
        el.topbarSearch.addEventListener("input", () => syncSearch(el.topbarSearch));
    }

    function handleEscape(event) {
        if (event.key !== "Escape") return;
        el.search.value = "";
        if (el.topbarSearch) el.topbarSearch.value = "";
        renderTable();
        event.currentTarget.blur();
    }

    el.search.addEventListener("keydown", handleEscape);
    if (el.topbarSearch) el.topbarSearch.addEventListener("keydown", handleEscape);

    el.readFilter.addEventListener("change", renderTable);
    el.audience.addEventListener("change", renderTable);

    el.clear.addEventListener("click", () => {
        el.search.value = "";
        if (el.topbarSearch) el.topbarSearch.value = "";
        el.audience.value = "all";
        el.readFilter.value = "all";
        renderTable();
    });

    el.modal.addEventListener("hide.bs.modal", () => {
        if (el.modal.contains(document.activeElement)) document.activeElement.blur();
    });

    el.modal.addEventListener("hidden.bs.modal", () => {
        if (
            returnFocusElement &&
            returnFocusElement.isConnected &&
            !returnFocusElement.closest(".modal.show")
        ) {
            returnFocusElement.focus();
        }
        returnFocusElement = null;
    });

    renderTable();
    console.log("F10.11 Teacher Announcements initialized: 4 fictional demonstration records.");
}







/* =====================================================
   F10.12.3 - TEACHER CLEARPOST
   FRONTEND DEMONSTRATION ONLY
   ===================================================== */

function initializeTeacherClearPost() {

    const $ = id => document.getElementById(id);

    const el = {
        form: $("teacherClearPostForm"),
        title: $("teacherClearPostTitle"),
        content: $("teacherClearPostContent"),
        characterCount: $("teacherClearPostCharacterCount"),
        runCheck: $("teacherClearPostRunCheck"),
        reset: $("teacherClearPostReset"),
        validationStatus: $("teacherClearPostValidationStatus"),
        results: $("teacherClearPostResults"),
        aiPrompt: $("teacherClearPostAIPrompt"),
        requestAI: $("teacherClearPostRequestAI"),
        aiStatus: $("teacherClearPostAIStatus"),
        message: $("teacherClearPostMessage"),
        topbarSearch: $("teacherClearPostTopbarSearch")
    };

    // Run only on the ClearPost page.
    if (!el.form) return;

    const requiredKeys = [
        "title",
        "content",
        "characterCount",
        "runCheck",
        "reset",
        "validationStatus",
        "results",
        "aiPrompt",
        "requestAI",
        "aiStatus",
        "message"
    ];

    const missing = requiredKeys.filter(key => !el[key]);

    if (missing.length) {
        console.error(
            "F10.12 ClearPost: Missing required HTML elements:",
            missing
        );
        return;
    }

    let hasCurrentValidation = false;


    // =====================================================
    // 1. HELPER FUNCTIONS
    // =====================================================

    function createElement(tag, className, text) {

        const node = document.createElement(tag);

        if (className) {
            node.className = className;
        }

        if (text !== undefined) {
            node.textContent = text;
        }

        return node;
    }


    function showMessage(message, type = "info") {

        el.message.textContent = message;

        el.message.className =
            "teacher-clearpost-message is-" + type;

        el.message.hidden = false;

    }


    function hideMessage() {

        el.message.textContent = "";
        el.message.hidden = true;

        el.message.className =
            "teacher-clearpost-message";

    }


    // =====================================================
    // 2. CHARACTER COUNTER
    // =====================================================

    function updateCharacterCount() {

        const count = el.content.value.length;

        el.characterCount.textContent =
            count.toLocaleString() +
            (count === 1 ? " character" : " characters");

    }


    // =====================================================
    // 3. WORKFLOW PROGRESS
    // =====================================================

    function setWorkflowStep(validationComplete) {

        const steps = document.querySelectorAll(
            ".teacher-clearpost-step"
        );

        steps.forEach((step, index) => {

            step.classList.remove("active", "completed");

            if (validationComplete && index === 0) {

                step.classList.add("completed");

            } else if (index === (validationComplete ? 1 : 0)) {

                step.classList.add("active");

            }

        });

    }


    // =====================================================
    // 4. RESET VALIDATION DISPLAY
    // =====================================================

    function resetValidation() {

        hasCurrentValidation = false;

        el.title.setAttribute("aria-invalid", "false");
        el.content.setAttribute("aria-invalid", "false");

        el.validationStatus.className =
            "teacher-clearpost-validation-status";

        const icon = el.validationStatus.querySelector(
            ".teacher-clearpost-status-icon i"
        );

        const heading = el.validationStatus.querySelector(
            "strong"
        );

        const description = el.validationStatus.querySelector(
            "span"
        );

        if (icon) {
            icon.className = "bi bi-hourglass-split";
        }

        if (heading) {
            heading.textContent = "Not Yet Checked";
        }

        if (description) {
            description.textContent =
                "Run ClearPost Check to inspect your draft.";
        }

        const empty = createElement(
            "div",
            "teacher-clearpost-empty-result"
        );

        const emptyIcon = createElement(
            "i",
            "bi bi-clipboard-check"
        );

        const emptyHeading = createElement(
            "strong",
            "",
            "No validation results yet"
        );

        const emptyDescription = createElement(
            "span",
            "",
            "Your results will appear here after running ClearPost."
        );

        empty.append(
            emptyIcon,
            emptyHeading,
            emptyDescription
        );

        el.results.replaceChildren(empty);

        setWorkflowStep(false);

    }


    // =====================================================
    // 5. VALIDATION STATUS
    // =====================================================

    function setValidationStatus(
        type,
        iconName,
        headingText,
        descriptionText
    ) {

        el.validationStatus.className =
            "teacher-clearpost-validation-status" +
            (type ? " is-" + type : "");

        const icon = el.validationStatus.querySelector(
            ".teacher-clearpost-status-icon i"
        );

        const heading = el.validationStatus.querySelector(
            "strong"
        );

        const description = el.validationStatus.querySelector(
            "span"
        );

        if (icon) {
            icon.className = "bi " + iconName;
        }

        if (heading) {
            heading.textContent = headingText;
        }

        if (description) {
            description.textContent = descriptionText;
        }

    }


    // =====================================================
    // 6. VALIDATION RESULT ITEMS
    // =====================================================

    function appendResult(type, title, description) {

        const item = createElement(
            "div",
            "teacher-clearpost-result-item " + type
        );

        const iconClass = type === "passed"
            ? "bi bi-check-circle-fill"
            : type === "failed"
                ? "bi bi-x-circle-fill"
                : "bi bi-exclamation-triangle-fill";

        const icon = createElement("i", iconClass);

        const text = createElement("div");

        text.append(
            createElement("strong", "", title),
            createElement("small", "", description)
        );

        item.append(icon, text);

        el.results.appendChild(item);

    }


    // =====================================================
    // 7. BASIC CLEARPOST VALIDATION
    // =====================================================

    function runBasicCheck() {

        const titleValue = el.title.value.trim();

        const contentValue = el.content.value.trim();

        const titlePassed = titleValue.length > 0;

        const contentPassed = contentValue.length > 0;

        const fieldsPassed = titlePassed && contentPassed;

        hasCurrentValidation = true;

        el.title.setAttribute(
            "aria-invalid",
            String(!titlePassed)
        );

        el.content.setAttribute(
            "aria-invalid",
            String(!contentPassed)
        );

        el.results.replaceChildren();


        // TITLE CHECK

        appendResult(
            titlePassed ? "passed" : "failed",

            titlePassed
                ? "Announcement title provided"
                : "Announcement title is missing",

            titlePassed
                ? "The title field contains text."
                : "Enter an announcement title before continuing."
        );


        // CONTENT CHECK

        appendResult(
            contentPassed ? "passed" : "failed",

            contentPassed
                ? "Announcement content provided"
                : "Announcement content is missing",

            contentPassed
                ? "The content field contains text."
                : "Enter announcement content before continuing."
        );


        // POLICY LIMITATION

        appendResult(
            "warning",

            "Full ClearPost policy is not configured",

            "These are basic required-field checks only. The complete approved ClearPost rules still need confirmation."
        );


        // BOTH FIELDS COMPLETED

        if (fieldsPassed) {

            setValidationStatus(
                "warning",
                "bi-exclamation-triangle-fill",
                "Basic Field Checks Complete",
                "Both required fields contain text. This is not final ClearPost approval."
            );

            setWorkflowStep(true);

            showMessage(
                "Basic field checks are complete. The draft has not been approved or published. Full ClearPost policy checks are still pending.",
                "warning"
            );

        } else {

            // MISSING REQUIRED FIELD

            setValidationStatus(
                "error",
                "bi-exclamation-circle-fill",
                "Draft Needs Attention",
                "Complete the missing required fields and run the check again."
            );

            setWorkflowStep(false);

            showMessage(
                "Please complete the required title and announcement content fields.",
                "error"
            );

            if (!titlePassed) {

                el.title.focus();

            } else if (!contentPassed) {

                el.content.focus();

            }

        }

    }


    // =====================================================
    // 8. AI STATUS
    // =====================================================

    function updateAIStatus(
        message,
        iconName = "bi-info-circle"
    ) {

        const icon = el.aiStatus.querySelector("i");

        const text = el.aiStatus.querySelector("span");

        if (icon) {
            icon.className = "bi " + iconName;
        }

        if (text) {
            text.textContent = message;
        }

    }


    // =====================================================
    // 9. INVALIDATE OLD CHECK AFTER EDITING
    // =====================================================

    function invalidateCheckAfterEdit() {

        if (!hasCurrentValidation) return;

        resetValidation();

        showMessage(
            "The draft changed after the last check. Run ClearPost Check again to review the updated draft.",
            "warning"
        );

    }


    // =====================================================
    // 10. LIVE INPUT EVENTS
    // =====================================================

    el.content.addEventListener("input", () => {

        updateCharacterCount();

        invalidateCheckAfterEdit();

    });


    el.title.addEventListener(
        "input",
        invalidateCheckAfterEdit
    );


    // =====================================================
    // 11. RUN CLEARPOST CHECK
    // =====================================================

    el.runCheck.addEventListener(
        "click",
        runBasicCheck
    );


    el.form.addEventListener("submit", event => {

        event.preventDefault();

        runBasicCheck();

    });


    // =====================================================
    // 12. CLEAR DRAFT
    // =====================================================

    el.reset.addEventListener("click", () => {

        el.title.value = "";

        el.content.value = "";

        el.aiPrompt.value = "";

        updateCharacterCount();

        resetValidation();

        updateAIStatus(
            "AI service is not connected in this frontend demonstration. AI draft requests will be handled through Django during Backend integration."
        );

        hideMessage();

        el.title.focus();

    });


    // =====================================================
    // 13. AI CONTENT ASSISTANT
    // =====================================================

    el.requestAI.addEventListener("click", () => {

        const prompt = el.aiPrompt.value.trim();

        if (!prompt) {

            updateAIStatus(
                "Enter instructions before requesting an AI draft. No request has been sent.",
                "bi-exclamation-circle"
            );

            el.aiPrompt.focus();

            showMessage(
                "Please enter instructions for the AI Content Assistant.",
                "error"
            );

            return;

        }


        updateAIStatus(
            "AI service is not connected. No request was sent and no AI draft was generated. During Backend integration, this action will use Django to request a draft that must be reviewed and approved by the Teacher.",
            "bi-info-circle"
        );

        showMessage(
            "AI assistance is currently unavailable in the frontend demonstration. Your instructions have not been sent or saved.",
            "warning"
        );

    });


    // =====================================================
    // 14. TOPBAR SEARCH
    // Searches the current draft only.
    // =====================================================

    if (el.topbarSearch) {

        el.topbarSearch.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                el.topbarSearch.value = "";

                el.topbarSearch.blur();

                return;

            }

            if (event.key !== "Enter") return;

            event.preventDefault();

            const query = el.topbarSearch.value
                .trim()
                .toLowerCase();

            if (!query) return;


            if (el.title.value.toLowerCase().includes(query)) {

                el.title.focus();

                el.title.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                showMessage(
                    "Match found in the announcement title.",
                    "info"
                );

            } else if (
                el.content.value.toLowerCase().includes(query)
            ) {

                el.content.focus();

                el.content.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                showMessage(
                    "Match found in the announcement content.",
                    "info"
                );

            } else {

                showMessage(
                    "No matching text was found in the current draft.",
                    "info"
                );

            }

        });

    }


    // =====================================================
    // 15. INITIALIZE
    // =====================================================

    updateCharacterCount();

    resetValidation();

    console.log(
        "F10.12 ClearPost initialized. Basic required-field checks only; AI and Backend are not connected."
    );

}







/* =====================================================
   F10.13.3 - TEACHER GUARDIAN REQUESTS
   FRONTEND DEMONSTRATION ONLY
   ===================================================== */

function initializeTeacherGuardianRequests() {

    const $ = id => document.getElementById(id);

    const el = {
        total: $("teacherGuardianTotal"),
        pending: $("teacherGuardianPending"),
        onHold: $("teacherGuardianOnHold"),
        approved: $("teacherGuardianApproved"),

        recordCount: $("teacherGuardianRecordCount"),
        search: $("teacherGuardianSearch"),
        topbarSearch: $("teacherGuardianTopbarSearch"),
        statusFilter: $("teacherGuardianStatusFilter"),
        clearFilters: $("teacherGuardianClearFilters"),
        tableBody: $("teacherGuardianTableBody"),
        empty: $("teacherGuardianEmpty"),
        message: $("teacherGuardianMessage"),

        modal: $("teacherGuardianRequestDetailsModal"),
        detailsTitle: $("teacherGuardianRequestDetailsTitle"),
        detailsBody: $("teacherGuardianRequestDetailsBody"),
        verificationPanel: $("teacherGuardianVerificationPanel"),
        verificationForm: $("teacherGuardianVerificationForm"),
        verificationResult: $("teacherGuardianVerificationResult"),
        reviewNote: $("teacherGuardianReviewNote"),
        rejectionWrap: $("teacherGuardianRejectionReasonWrap"),
        rejectionReason: $("teacherGuardianRejectionReason"),
        guidance: $("teacherGuardianDecisionGuidance"),
        history: $("teacherGuardianRequestHistory"),
        submitDecision: $("teacherGuardianSubmitDecision")
    };

    // Run only on the Guardian Requests page.
    if (!el.tableBody) return;

    const required = [
        "total", "pending", "onHold", "approved",
        "recordCount", "search", "statusFilter",
        "clearFilters", "empty", "modal", "detailsTitle",
        "detailsBody", "verificationPanel", "verificationForm",
        "verificationResult", "reviewNote", "rejectionWrap",
        "rejectionReason", "guidance", "history",
        "submitDecision"
    ];

    const missing = required.filter(key => !el[key]);

    if (missing.length) {
        console.error(
            "F10.13 Guardian Requests: Missing HTML elements:",
            missing
        );
        return;
    }


    // =====================================================
    // 1. FICTIONAL DEMONSTRATION RECORDS
    // =====================================================

    // These records are fictional.
    // They are not connected to official school records.

    const requests = [
        {
            id: "GR-2026-001",
            guardianName: "Liza Mendoza",
            guardianEmail: "liza.mendoza@example.test",
            studentName: "Carlo Mendoza",
            grade: "Grade 8",
            section: "Sampaguita",
            relationship: "Mother",
            submittedAt: "2026-11-23",
            status: "PENDING",
            rejectionReason: "",
            history: [
                {
                    date: "2026-11-23",
                    action: "Request submitted",
                    note: "Guardian connection request received.",
                    actor: "System (demo)"
                }
            ]
        },
        {
            id: "GR-2026-002",
            guardianName: "Ramon Dela Cruz",
            guardianEmail: "ramon.delacruz@example.test",
            studentName: "Andrea Dela Cruz",
            grade: "Grade 7",
            section: "Narra",
            relationship: "Father",
            submittedAt: "2026-11-22",
            status: "PENDING",
            rejectionReason: "",
            history: [
                {
                    date: "2026-11-22",
                    action: "Request submitted",
                    note: "Guardian connection request received.",
                    actor: "System (demo)"
                }
            ]
        },
        {
            id: "GR-2026-003",
            guardianName: "Maria Reyes",
            guardianEmail: "maria.reyes@example.test",
            studentName: "Paolo Reyes",
            grade: "Grade 9",
            section: "Molave",
            relationship: "Aunt",
            submittedAt: "2026-11-20",
            status: "ON_HOLD",
            rejectionReason: "",
            history: [
                {
                    date: "2026-11-20",
                    action: "Request submitted",
                    note: "Guardian connection request received.",
                    actor: "System (demo)"
                },
                {
                    date: "2026-11-21",
                    action: "Referred for further verification",
                    note: "Preloaded demonstration referral. Requires authorized School Administrator or registrar review.",
                    actor: "Teacher (demo)"
                }
            ]
        },
        {
            id: "GR-2026-004",
            guardianName: "Ana Garcia",
            guardianEmail: "ana.garcia@example.test",
            studentName: "Sofia Garcia",
            grade: "Grade 10",
            section: "Acacia",
            relationship: "Mother",
            submittedAt: "2026-11-19",
            status: "APPROVED",
            rejectionReason: "",
            history: [
                {
                    date: "2026-11-19",
                    action: "Request submitted",
                    note: "Guardian connection request received.",
                    actor: "System (demo)"
                },
                {
                    date: "2026-11-20",
                    action: "Approved (sample record)",
                    note: "Preloaded demonstration status. No actual identity verification or guardian link was created.",
                    actor: "Teacher (demo)"
                }
            ]
        },
        {
            id: "GR-2026-005",
            guardianName: "Joel Ramos",
            guardianEmail: "joel.ramos@example.test",
            studentName: "Miguel Ramos",
            grade: "Grade 8",
            section: "Sampaguita",
            relationship: "Uncle",
            submittedAt: "2026-11-18",
            status: "REJECTED",
            rejectionReason: "Sample rejection reason for demonstration only.",
            history: [
                {
                    date: "2026-11-18",
                    action: "Request submitted",
                    note: "Guardian connection request received.",
                    actor: "System (demo)"
                },
                {
                    date: "2026-11-19",
                    action: "Rejected (sample record)",
                    note: "Preloaded demonstration status. No real school record review was performed.",
                    actor: "Teacher (demo)"
                }
            ]
        }
    ];


    // =====================================================
    // 2. STATE
    // =====================================================

    let activeRequestId = null;
    let returnFocusId = null;

    const modal = window.bootstrap?.Modal
        ? window.bootstrap.Modal.getOrCreateInstance(el.modal)
        : null;

    if (!modal) {
        console.error(
            "F10.13: Bootstrap Modal is unavailable. Check the Bootstrap bundle."
        );
    }


    // =====================================================
    // 3. HELPER FUNCTIONS
    // =====================================================

    function makeElement(tag, className = "", text = "") {

        const node = document.createElement(tag);

        if (className) {
            node.className = className;
        }

        if (text !== "") {
            node.textContent = text;
        }

        return node;
    }


    function showMessage(message, type = "info") {

        el.message.textContent = message;

        el.message.className =
            "teacher-guardian-message is-" + type;

        el.message.hidden = false;

    }


    function hideMessage() {

        el.message.textContent = "";
        el.message.hidden = true;

        el.message.className = "teacher-guardian-message";

    }


    function getRequest(id) {

        return requests.find(request => request.id === id) || null;

    }


    function formatDate(value) {

        if (!value) return "Not available";

        const date = new Date(value + "T12:00:00");

        if (Number.isNaN(date.getTime())) {
            return value;
        }

        return new Intl.DateTimeFormat("en-PH", {
            year: "numeric",
            month: "short",
            day: "numeric"
        }).format(date);

    }


    function getStatusLabel(status) {

        const labels = {
            PENDING: "Pending",
            ON_HOLD: "On Hold",
            APPROVED: "Approved",
            REJECTED: "Rejected",
            CANCELLED: "Cancelled"
        };

        return labels[status] || status;

    }


    function getStatusClass(status) {

        const classes = {
            PENDING: "pending",
            ON_HOLD: "on-hold",
            APPROVED: "approved",
            REJECTED: "rejected",
            CANCELLED: "cancelled"
        };

        return classes[status] || "";

    }


    // =====================================================
    // 4. SUMMARY CARDS
    // =====================================================

    function updateSummary() {

        const pendingCount = requests.filter(
            request => request.status === "PENDING"
        ).length;

        const onHoldCount = requests.filter(
            request => request.status === "ON_HOLD"
        ).length;

        const approvedCount = requests.filter(
            request => request.status === "APPROVED"
        ).length;

        el.total.textContent = requests.length;
        el.pending.textContent = pendingCount;
        el.onHold.textContent = onHoldCount;
        el.approved.textContent = approvedCount;

    }


    // =====================================================
    // 5. TABLE RENDERING
    // =====================================================

    function renderTable() {

        const query = el.search.value.trim().toLowerCase();

        const selectedStatus = el.statusFilter.value;

        const filtered = requests.filter(request => {

            const searchText = [
                request.id,
                request.guardianName,
                request.guardianEmail,
                request.studentName,
                request.grade,
                request.section,
                request.relationship
            ].join(" ").toLowerCase();

            const matchesSearch = searchText.includes(query);

            const matchesStatus =
                selectedStatus === "all" ||
                request.status === selectedStatus;

            return matchesSearch && matchesStatus;

        });


        const fragment = document.createDocumentFragment();


        filtered.forEach(request => {

            const row = document.createElement("tr");


            // REQUEST ID

            const idCell = document.createElement("td");

            idCell.appendChild(
                makeElement(
                    "span",
                    "teacher-guardian-request-id",
                    request.id
                )
            );


            // GUARDIAN

            const guardianCell = document.createElement("td");

            const guardianInfo = makeElement(
                "div",
                "teacher-guardian-person-cell"
            );

            guardianInfo.append(
                makeElement("strong", "", request.guardianName),
                makeElement("small", "", request.guardianEmail)
            );

            guardianCell.appendChild(guardianInfo);


            // STUDENT

            const studentCell = document.createElement("td");

            const studentInfo = makeElement(
                "div",
                "teacher-guardian-person-cell"
            );

            studentInfo.append(
                makeElement("strong", "", request.studentName),
                makeElement("small", "", request.grade)
            );

            studentCell.appendChild(studentInfo);


            // SECTION

            const sectionCell = document.createElement("td");

            sectionCell.appendChild(
                makeElement(
                    "span",
                    "teacher-guardian-section-tag",
                    request.section
                )
            );


            // RELATIONSHIP

            const relationshipCell = document.createElement("td");

            relationshipCell.appendChild(
                makeElement(
                    "span",
                    "teacher-guardian-relationship",
                    request.relationship
                )
            );


            // SUBMISSION DATE

            const dateCell = makeElement(
                "td",
                "",
                formatDate(request.submittedAt)
            );


            // STATUS

            const statusCell = document.createElement("td");

            const statusBadge = makeElement(
                "span",
                "teacher-guardian-status " +
                getStatusClass(request.status)
            );

            const statusIcon = makeElement("i");

            const statusIcons = {
                PENDING: "bi bi-hourglass-split",
                ON_HOLD: "bi bi-arrow-up-right-circle",
                APPROVED: "bi bi-check-circle-fill",
                REJECTED: "bi bi-x-circle-fill",
                CANCELLED: "bi bi-dash-circle"
            };

            statusIcon.className =
                statusIcons[request.status] || "bi bi-circle";

            statusBadge.append(
                statusIcon,
                document.createTextNode(
                    " " + getStatusLabel(request.status)
                )
            );

            statusCell.appendChild(statusBadge);


            // VIEW BUTTON

            const actionCell = document.createElement("td");

            const viewButton = makeElement(
                "button",
                "teacher-guardian-view-button",
                request.status === "PENDING"
                    ? "Review Request"
                    : "View Details"
            );

            viewButton.type = "button";

            viewButton.dataset.guardianAction = "view";
            viewButton.dataset.requestId = request.id;

            const viewIcon = makeElement("i");
            viewIcon.className = "bi bi-eye";

            viewButton.prepend(viewIcon);

            actionCell.appendChild(viewButton);


            row.append(
                idCell,
                guardianCell,
                studentCell,
                sectionCell,
                relationshipCell,
                dateCell,
                statusCell,
                actionCell
            );

            fragment.appendChild(row);

        });


        el.tableBody.replaceChildren(fragment);

        el.empty.hidden = filtered.length > 0;

        el.recordCount.textContent =
            filtered.length +
            (filtered.length === 1 ? " record" : " records");

        updateSummary();

    }


    // =====================================================
    // 6. REQUEST DETAILS
    // =====================================================

    function addDetail(grid, label, value) {

        const item = makeElement(
            "div",
            "teacher-guardian-detail-item"
        );

        item.append(
            makeElement("small", "", label),
            makeElement("strong", "", value || "Not available")
        );

        grid.appendChild(item);

    }


    function renderDetails(request) {

        el.detailsTitle.textContent = "Guardian Request Details";

        const section = makeElement(
            "section",
            "teacher-guardian-detail-section"
        );

        section.appendChild(
            makeElement("h6", "", "Request Information")
        );

        const grid = makeElement(
            "div",
            "teacher-guardian-detail-grid"
        );

        addDetail(grid, "Request ID", request.id);
        addDetail(grid, "Date Submitted", formatDate(request.submittedAt));
        addDetail(grid, "Guardian Name", request.guardianName);
        addDetail(grid, "Guardian Email", request.guardianEmail);
        addDetail(grid, "Student Name", request.studentName);
        addDetail(grid, "Grade Level", request.grade);
        addDetail(grid, "Section", request.section);
        addDetail(grid, "Relationship", request.relationship);
        addDetail(grid, "Request Status", getStatusLabel(request.status));

        section.appendChild(grid);

        const fragment = document.createDocumentFragment();

        fragment.appendChild(section);


        // Show a sample outcome notice for completed/referral records.

        if (request.status === "ON_HOLD") {

            const notice = makeElement(
                "div",
                "teacher-guardian-decision-guidance"
            );

            notice.append(
                makeElement("i", "bi bi-info-circle"),
                makeElement(
                    "span",
                    "",
                    "This request is on hold and referred for further review by the authorized School Administrator or registrar. The Teacher cannot complete this referred case in this demonstration."
                )
            );

            fragment.appendChild(notice);

        }


        if (request.status === "APPROVED") {

            const notice = makeElement(
                "div",
                "teacher-guardian-decision-guidance"
            );

            notice.append(
                makeElement("i", "bi bi-info-circle"),
                makeElement(
                    "span",
                    "",
                    "This is a preloaded demonstration status only. No actual identity verification or guardian link was created."
                )
            );

            fragment.appendChild(notice);

        }


        if (request.status === "REJECTED") {

            const notice = makeElement(
                "div",
                "teacher-guardian-decision-guidance"
            );

            notice.append(
                makeElement("i", "bi bi-info-circle"),
                makeElement(
                    "span",
                    "",
                    "Sample rejection reason: " +
                    request.rejectionReason
                )
            );

            fragment.appendChild(notice);

        }


        el.detailsBody.replaceChildren(fragment);

        // Only pending requests can display the Teacher decision form.
        el.verificationPanel.hidden =
            request.status !== "PENDING";

        resetVerificationForm();

    }


    // =====================================================
    // 7. REQUEST HISTORY
    // =====================================================

    function renderHistory(request) {

        el.history.replaceChildren();

        if (!request.history.length) {

            el.history.appendChild(
                makeElement(
                    "p",
                    "text-secondary small",
                    "No history available."
                )
            );

            return;

        }

        const fragment = document.createDocumentFragment();

        [...request.history].reverse().forEach(event => {

            const item = makeElement(
                "div",
                "teacher-guardian-history-item"
            );

            item.append(
                makeElement("strong", "", event.action),

                makeElement(
                    "small",
                    "",
                    formatDate(event.date) +
                    " | " + event.actor +
                    " | " + event.note
                )
            );

            fragment.appendChild(item);

        });

        el.history.appendChild(fragment);

    }


    // =====================================================
    // 8. RESET VERIFICATION FORM
    // =====================================================

    function resetVerificationForm() {

        el.verificationForm.reset();

        el.rejectionWrap.hidden = true;

        el.rejectionReason.setAttribute(
            "aria-invalid",
            "false"
        );

        el.guidance.replaceChildren(
            makeElement("i", "bi bi-info-circle"),
            makeElement(
                "span",
                "",
                "Select a verification result to see the corresponding decision guidance."
            )
        );

        el.submitDecision.disabled = false;

    }


    // =====================================================
    // 9. VERIFICATION GUIDANCE
    // =====================================================

    function updateDecisionGuidance() {

        const result = el.verificationResult.value;

        const messages = {

            verified:
                "Use this result only when official school enrollment and guardian records support the connection. This frontend demonstration cannot perform that verification.",

            cannot_verify:
                "The request will be placed On Hold and referred to the authorized School Administrator or registrar for further review.",

            not_eligible:
                "Use this result only when official records confirm that the request is not eligible. A clear rejection reason is required."

        };

        const icons = {
            verified: "bi bi-shield-check",
            cannot_verify: "bi bi-arrow-up-right-circle",
            not_eligible: "bi bi-exclamation-triangle"
        };

        el.guidance.replaceChildren(
            makeElement(
                "i",
                icons[result] || "bi bi-info-circle"
            ),
            makeElement(
                "span",
                "",
                messages[result] ||
                "Select a verification result to see the corresponding decision guidance."
            )
        );

        el.rejectionWrap.hidden =
            result !== "not_eligible";

        if (result !== "not_eligible") {
            el.rejectionReason.value = "";
            el.rejectionReason.setAttribute(
                "aria-invalid",
                "false"
            );
        }

    }


    // =====================================================
    // 10. OPEN REQUEST DETAILS
    // =====================================================

    function openRequest(requestId, trigger) {

        const request = getRequest(requestId);

        if (!request) return;

        if (!modal) {

            showMessage(
                "The request details modal is unavailable. Check the Bootstrap bundle.",
                "error"
            );

            return;

        }

        activeRequestId = request.id;

        returnFocusId = trigger?.dataset.requestId || request.id;

        renderDetails(request);
        renderHistory(request);

        modal.show();

    }


    // =====================================================
    // 11. TABLE CLICK EVENTS
    // =====================================================

    el.tableBody.addEventListener("click", event => {

        const button = event.target.closest(
            "[data-guardian-action='view']"
        );

        if (!button || !el.tableBody.contains(button)) {
            return;
        }

        openRequest(button.dataset.requestId, button);

    });


    // =====================================================
    // 12. SEARCH
    // =====================================================

    function syncSearch(source) {

        el.search.value = source.value;

        if (el.topbarSearch) {
            el.topbarSearch.value = source.value;
        }

        renderTable();

    }


    el.search.addEventListener("input", () => {
        syncSearch(el.search);
    });


    if (el.topbarSearch) {

        el.topbarSearch.addEventListener("input", () => {
            syncSearch(el.topbarSearch);
        });

        el.topbarSearch.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                el.topbarSearch.value = "";
                el.search.value = "";

                renderTable();

                el.topbarSearch.blur();

            }

        });

    }


    // =====================================================
    // 13. STATUS FILTER
    // =====================================================

    el.statusFilter.addEventListener(
        "change",
        renderTable
    );


    // =====================================================
    // 14. CLEAR FILTERS
    // =====================================================

    el.clearFilters.addEventListener("click", () => {

        el.search.value = "";

        if (el.topbarSearch) {
            el.topbarSearch.value = "";
        }

        el.statusFilter.value = "all";

        renderTable();

        hideMessage();

    });


    // =====================================================
    // 15. DECISION SELECTION
    // =====================================================

    el.verificationResult.addEventListener(
        "change",
        updateDecisionGuidance
    );


    // =====================================================
    // 16. SUBMIT VERIFICATION DECISION
    // =====================================================

    el.verificationForm.addEventListener("submit", event => {

        event.preventDefault();

        const request = getRequest(activeRequestId);

        if (!request) return;

        // Only pending requests can be reviewed by the Teacher.
        if (request.status !== "PENDING") {

            showMessage(
                "This request is no longer pending and cannot be reviewed again by the Teacher.",
                "warning"
            );

            return;

        }

        const result = el.verificationResult.value;

        const reviewNote = el.reviewNote.value.trim();

        const rejectionReason =
            el.rejectionReason.value.trim();


        // REQUIRE A DECISION

        if (!result) {

            showMessage(
                "Please select a verification result.",
                "error"
            );

            el.verificationResult.focus();

            return;

        }


        // REJECTION REQUIRES A REASON

        if (
            result === "not_eligible" &&
            !rejectionReason
        ) {

            el.rejectionReason.setAttribute(
                "aria-invalid",
                "true"
            );

            el.rejectionReason.focus();

            showMessage(
                "A rejection reason is required.",
                "error"
            );

            return;

        }


        const now = new Date();

        const today = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, "0"),
            String(now.getDate()).padStart(2, "0")
        ].join("-");

        let newStatus;
        let action;
        let note;


        // VERIFIED

        if (result === "verified") {

            newStatus = "APPROVED";

            action = "Approved (demo only)";

            note = reviewNote ||
                "Teacher recorded a sample verification outcome. Official records were not checked.";

            request.rejectionReason = "";

        }


        // CANNOT INDEPENDENTLY VERIFY

        else if (result === "cannot_verify") {

            newStatus = "ON_HOLD";

            action = "Referred for further verification";

            note = reviewNote ||
                "Referred to the authorized School Administrator or registrar for further review.";

            request.rejectionReason = "";

        }


        // CONFIRMED NOT ELIGIBLE

        else if (result === "not_eligible") {

            newStatus = "REJECTED";

            action = "Rejected (demo only)";

            note = rejectionReason;

            request.rejectionReason = rejectionReason;

        }


        else {

            return;

        }


        // UPDATE ONLY THE FRONTEND DEMONSTRATION RECORD.

        request.status = newStatus;

        request.history.push({
            date: today,
            action: action,
            note: note,
            actor: "Teacher (demo)"
        });


        // Refresh the directory and counts.

        renderTable();

        renderDetails(request);

        renderHistory(request);


        // Close the modal.

        if (modal) {
            modal.hide();
        }


        const messages = {
            APPROVED:
                "Demonstration outcome recorded as Approved. No real guardian link was created or official verification performed.",

            ON_HOLD:
                "Demonstration outcome recorded as On Hold. The request must be handled by the authorized School Administrator or registrar.",

            REJECTED:
                "Demonstration outcome recorded as Rejected. The sample reason has been added to the request history."
        };

        showMessage(messages[newStatus], "warning");

    });


    // =====================================================
    // 17. MODAL FOCUS MANAGEMENT
    // =====================================================

    el.modal.addEventListener("hide.bs.modal", () => {

        if (el.modal.contains(document.activeElement)) {
            document.activeElement.blur();
        }

    });


    el.modal.addEventListener("hidden.bs.modal", () => {

        if (!returnFocusId) return;

        const target = Array.from(
            el.tableBody.querySelectorAll(
                "[data-guardian-action='view']"
            )
        ).find(button =>
            button.dataset.requestId === returnFocusId
        );

        if (target && target.isConnected) {
            target.focus();
        }

        returnFocusId = null;
        activeRequestId = null;

    });


    // =====================================================
    // 18. INITIALIZE PAGE
    // =====================================================

    renderTable();

    console.log(
        "F10.13 Guardian Requests initialized: 5 fictional demonstration records. No official verification or database connection."
    );

}







/* =====================================================
   F10.14.3 - TEACHER PARENT ACKNOWLEDGMENTS
   FRONTEND DEMONSTRATION ONLY
   READ-ONLY REPORT
   ===================================================== */

function initializeTeacherParentAcknowledgments() {

    const $ = id => document.getElementById(id);

    const el = {
        total: $("teacherParentAckTotal"),
        acknowledged: $("teacherParentAckAcknowledged"),
        awaiting: $("teacherParentAckAwaiting"),
        announcements: $("teacherParentAckAnnouncements"),

        recordCount: $("teacherParentAckRecordCount"),
        search: $("teacherParentAckSearch"),
        topbarSearch: $("teacherParentAckTopbarSearch"),
        statusFilter: $("teacherParentAckStatusFilter"),
        clearFilters: $("teacherParentAckClearFilters"),

        tableBody: $("teacherParentAckTableBody"),
        empty: $("teacherParentAckEmpty"),
        message: $("teacherParentAckMessage"),

        modal: $("teacherParentAckDetailsModal"),
        detailsTitle: $("teacherParentAckDetailsTitle"),
        detailsBody: $("teacherParentAckDetailsBody"),
        versionInfo: $("teacherParentAckVersionInfo")
    };

    // Run only on the Parent Acknowledgments page.
    if (!el.tableBody) return;

    const required = [
        "total",
        "acknowledged",
        "awaiting",
        "announcements",
        "recordCount",
        "search",
        "statusFilter",
        "clearFilters",
        "empty",
        "message",
        "modal",
        "detailsTitle",
        "detailsBody",
        "versionInfo"
    ];

    const missing = required.filter(key => !el[key]);

    if (missing.length) {
        console.error(
            "F10.14 Parent Acknowledgments: Missing HTML elements:",
            missing
        );
        return;
    }


    // =====================================================
    // 1. FICTIONAL DEMONSTRATION RECORDS
    // =====================================================

    // Every record represents one eligible:
    // Guardian Link + exact Announcement Version combination.
    //
    // ACKNOWLEDGED:
    // An acknowledgment record exists for that combination.
    //
    // AWAITING:
    // No acknowledgment record exists for that combination.
    //
    // These records are not connected to PostgreSQL.

    const acknowledgmentRecords = [

        // ANNOUNCEMENT 1 - MATERIAL CHANGE, VERSION 2

        {
            reportRowId: "DEMO-ELIG-001",

            announcementId: "ANN-2026-001",
            announcementTitle: "Welcome to Academic Year 2026-2027",

            versionId: "ANN-2026-001-V2",
            versionNumber: 2,
            changeType: "MATERIAL",

            publishedAt: "2026-11-18T08:00:00+08:00",

            guardianLinkId: "GL-DEMO-001",
            guardianName: "Liza Mendoza",

            studentName: "Carlo Mendoza",
            grade: "Grade 8",
            section: "Sampaguita",

            status: "ACKNOWLEDGED",

            acknowledgmentId: "ACK-REC-DEMO-001",
            acknowledgedAt: "2026-11-19T09:15:00+08:00",

            content:
                "Welcome to the new academic year. Please review the updated school calendar and important school information. This version contains material schedule changes requiring fresh Parent acknowledgment."
        },


        {
            reportRowId: "DEMO-ELIG-002",

            announcementId: "ANN-2026-001",
            announcementTitle: "Welcome to Academic Year 2026-2027",

            versionId: "ANN-2026-001-V2",
            versionNumber: 2,
            changeType: "MATERIAL",

            publishedAt: "2026-11-18T08:00:00+08:00",

            guardianLinkId: "GL-DEMO-002",
            guardianName: "Ramon Dela Cruz",

            studentName: "Andrea Dela Cruz",
            grade: "Grade 7",
            section: "Narra",

            status: "AWAITING",

            acknowledgmentId: null,
            acknowledgedAt: null,

            content:
                "Welcome to the new academic year. Please review the updated school calendar and important school information. This version contains material schedule changes requiring fresh Parent acknowledgment."
        },


        // ANNOUNCEMENT 2 - INITIAL PUBLICATION, VERSION 1

        {
            reportRowId: "DEMO-ELIG-003",

            announcementId: "ANN-2026-002",
            announcementTitle: "Quarterly Learning Activity Reminders",

            versionId: "ANN-2026-002-V1",
            versionNumber: 1,
            changeType: "INITIAL",

            publishedAt: "2026-11-19T10:00:00+08:00",

            guardianLinkId: "GL-DEMO-001",
            guardianName: "Liza Mendoza",

            studentName: "Carlo Mendoza",
            grade: "Grade 8",
            section: "Sampaguita",

            status: "ACKNOWLEDGED",

            acknowledgmentId: "ACK-REC-DEMO-003",
            acknowledgedAt: "2026-11-20T14:30:00+08:00",

            content:
                "Please review the reminders related to upcoming learning activities. Check the instructions and important dates provided by the school."
        },


        {
            reportRowId: "DEMO-ELIG-004",

            announcementId: "ANN-2026-002",
            announcementTitle: "Quarterly Learning Activity Reminders",

            versionId: "ANN-2026-002-V1",
            versionNumber: 1,
            changeType: "INITIAL",

            publishedAt: "2026-11-19T10:00:00+08:00",

            guardianLinkId: "GL-DEMO-002",
            guardianName: "Ramon Dela Cruz",

            studentName: "Andrea Dela Cruz",
            grade: "Grade 7",
            section: "Narra",

            status: "ACKNOWLEDGED",

            acknowledgmentId: "ACK-REC-DEMO-004",
            acknowledgedAt: "2026-11-20T16:10:00+08:00",

            content:
                "Please review the reminders related to upcoming learning activities. Check the instructions and important dates provided by the school."
        },


        // ANNOUNCEMENT 3 - INITIAL PUBLICATION, VERSION 1

        {
            reportRowId: "DEMO-ELIG-005",

            announcementId: "ANN-2026-003",
            announcementTitle: "Campus Facilities and Safety Advisory",

            versionId: "ANN-2026-003-V1",
            versionNumber: 1,
            changeType: "INITIAL",

            publishedAt: "2026-11-21T08:30:00+08:00",

            guardianLinkId: "GL-DEMO-001",
            guardianName: "Liza Mendoza",

            studentName: "Carlo Mendoza",
            grade: "Grade 8",
            section: "Sampaguita",

            status: "AWAITING",

            acknowledgmentId: null,
            acknowledgedAt: null,

            content:
                "Please observe the posted campus safety reminders and follow the instructions of authorized school personnel when using school facilities."
        },


        {
            reportRowId: "DEMO-ELIG-006",

            announcementId: "ANN-2026-003",
            announcementTitle: "Campus Facilities and Safety Advisory",

            versionId: "ANN-2026-003-V1",
            versionNumber: 1,
            changeType: "INITIAL",

            publishedAt: "2026-11-21T08:30:00+08:00",

            guardianLinkId: "GL-DEMO-002",
            guardianName: "Ramon Dela Cruz",

            studentName: "Andrea Dela Cruz",
            grade: "Grade 7",
            section: "Narra",

            status: "AWAITING",

            acknowledgmentId: null,
            acknowledgedAt: null,

            content:
                "Please observe the posted campus safety reminders and follow the instructions of authorized school personnel when using school facilities."
        }

    ];


    // =====================================================
    // 2. STATE
    // =====================================================

    let returnFocusId = null;

    const modal = window.bootstrap?.Modal
        ? window.bootstrap.Modal.getOrCreateInstance(el.modal)
        : null;

    if (!modal) {
        console.error(
            "F10.14: Bootstrap Modal is unavailable. Check the Bootstrap bundle."
        );
    }


    // =====================================================
    // 3. HELPER FUNCTIONS
    // =====================================================

    function makeElement(tag, className = "", text = "") {

        const node = document.createElement(tag);

        if (className) {
            node.className = className;
        }

        if (text !== "") {
            node.textContent = text;
        }

        return node;

    }


    function showMessage(message, type = "info") {

        el.message.textContent = message;

        el.message.className =
            "teacher-parent-ack-message is-" + type;

        el.message.hidden = false;

    }


    function hideMessage() {

        el.message.textContent = "";
        el.message.hidden = true;

        el.message.className =
            "teacher-parent-ack-message";

    }


    function getRecord(id) {

        return acknowledgmentRecords.find(
            record => record.reportRowId === id
        ) || null;

    }


    function formatDateTime(value) {

        if (!value) return "Not acknowledged";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "Not available";
        }

        return new Intl.DateTimeFormat("en-PH", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Manila"
        }).format(date);

    }


    function formatDate(value) {

        if (!value) return "Not available";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "Not available";
        }

        return new Intl.DateTimeFormat("en-PH", {
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: "Asia/Manila"
        }).format(date);

    }


    function getStatusLabel(status) {

        return status === "ACKNOWLEDGED"
            ? "Acknowledged"
            : "Awaiting Acknowledgment";

    }


    function getStatusClass(status) {

        return status === "ACKNOWLEDGED"
            ? "acknowledged"
            : "awaiting";

    }


    // =====================================================
    // 4. SUMMARY CARDS
    // =====================================================

    function updateSummary() {

        const acknowledgedCount =
            acknowledgmentRecords.filter(
                record => record.status === "ACKNOWLEDGED"
            ).length;

        const awaitingCount =
            acknowledgmentRecords.filter(
                record => record.status === "AWAITING"
            ).length;

        const distinctAnnouncements = new Set(
            acknowledgmentRecords.map(
                record => record.announcementId
            )
        );

        el.total.textContent =
            String(acknowledgmentRecords.length);

        el.acknowledged.textContent =
            String(acknowledgedCount);

        el.awaiting.textContent =
            String(awaitingCount);

        el.announcements.textContent =
            String(distinctAnnouncements.size);

    }


    // =====================================================
    // 5. TABLE RENDERING
    // =====================================================

    function renderTable() {

        const query = el.search.value.trim().toLowerCase();

        const selectedStatus = el.statusFilter.value;


        const filtered = acknowledgmentRecords.filter(record => {

            const searchableText = [

                record.reportRowId,
                record.announcementId,
                record.announcementTitle,
                record.versionId,
                "Version " + record.versionNumber,
                record.guardianLinkId,
                record.guardianName,
                record.studentName,
                record.grade,
                record.section,
                record.changeType

            ].join(" ").toLowerCase();


            const matchesSearch =
                searchableText.includes(query);


            const matchesStatus =
                selectedStatus === "all" ||
                record.status === selectedStatus;


            return matchesSearch && matchesStatus;

        });


        const fragment = document.createDocumentFragment();


        filtered.forEach(record => {

            const row = document.createElement("tr");


            // ANNOUNCEMENT

            const announcementCell =
                document.createElement("td");

            const announcementInfo = makeElement(
                "div",
                "teacher-parent-ack-announcement"
            );

            announcementInfo.append(
                makeElement(
                    "strong",
                    "",
                    record.announcementTitle
                ),

                makeElement(
                    "small",
                    "",
                    record.announcementId
                )
            );

            announcementCell.appendChild(announcementInfo);


            // VERSION

            const versionCell =
                document.createElement("td");

            versionCell.appendChild(
                makeElement(
                    "span",
                    "teacher-parent-ack-version",
                    "Version " + record.versionNumber
                )
            );


            // GUARDIAN

            const guardianCell =
                document.createElement("td");

            const guardianInfo = makeElement(
                "div",
                "teacher-parent-ack-person"
            );

            guardianInfo.append(
                makeElement(
                    "strong",
                    "",
                    record.guardianName
                ),

                makeElement(
                    "small",
                    "",
                    record.guardianLinkId
                )
            );

            guardianCell.appendChild(guardianInfo);


            // LINKED STUDENT

            const studentCell =
                document.createElement("td");

            const studentInfo = makeElement(
                "div",
                "teacher-parent-ack-person"
            );

            studentInfo.append(
                makeElement(
                    "strong",
                    "",
                    record.studentName
                ),

                makeElement(
                    "small",
                    "",
                    record.grade
                )
            );

            studentCell.appendChild(studentInfo);


            // SECTION

            const sectionCell =
                document.createElement("td");

            sectionCell.appendChild(
                makeElement(
                    "span",
                    "teacher-parent-ack-section",
                    record.section
                )
            );


            // STATUS

            const statusCell =
                document.createElement("td");

            const statusBadge = makeElement(
                "span",
                "teacher-parent-ack-status " +
                getStatusClass(record.status)
            );

            const statusIcon = makeElement("i");

            statusIcon.className =
                record.status === "ACKNOWLEDGED"
                    ? "bi bi-check-circle-fill"
                    : "bi bi-hourglass-split";

            statusBadge.append(
                statusIcon,
                document.createTextNode(
                    " " + getStatusLabel(record.status)
                )
            );

            statusCell.appendChild(statusBadge);


            // ACKNOWLEDGMENT DATE

            const dateCell = makeElement(
                "td",
                "teacher-parent-ack-date" +
                (
                    record.status === "AWAITING"
                        ? " not-recorded"
                        : ""
                ),
                record.acknowledgedAt
                    ? formatDateTime(record.acknowledgedAt)
                    : "Not acknowledged"
            );


            // VIEW DETAILS

            const actionCell =
                document.createElement("td");

            const viewButton = makeElement(
                "button",
                "teacher-parent-ack-view-button",
                "View Details"
            );

            viewButton.type = "button";

            viewButton.dataset.ackAction = "view";
            viewButton.dataset.reportRowId = record.reportRowId;

            const viewIcon = makeElement("i");
            viewIcon.className = "bi bi-eye";

            viewButton.prepend(viewIcon);

            actionCell.appendChild(viewButton);


            row.append(
                announcementCell,
                versionCell,
                guardianCell,
                studentCell,
                sectionCell,
                statusCell,
                dateCell,
                actionCell
            );

            fragment.appendChild(row);

        });


        el.tableBody.replaceChildren(fragment);

        el.empty.hidden = filtered.length > 0;

        el.recordCount.textContent =
            filtered.length +
            (filtered.length === 1 ? " record" : " records");

        updateSummary();

    }


    // =====================================================
    // 6. DETAILS MODAL HELPERS
    // =====================================================

    function addDetail(grid, label, value) {

        const item = makeElement(
            "div",
            "teacher-parent-ack-detail-item"
        );

        item.append(
            makeElement("small", "", label),
            makeElement("strong", "", value || "Not available")
        );

        grid.appendChild(item);

    }


    // =====================================================
    // 7. RENDER ACKNOWLEDGMENT DETAILS
    // =====================================================

    function renderDetails(record) {

        el.detailsTitle.textContent =
            "Acknowledgment Details";


        // RECORD DETAILS

        const section = makeElement(
            "section",
            "teacher-parent-ack-detail-section"
        );

        section.appendChild(
            makeElement(
                "h6",
                "",
                "Guardian and Announcement Information"
            )
        );


        const grid = makeElement(
            "div",
            "teacher-parent-ack-detail-grid"
        );


        addDetail(
            grid,
            "Announcement",
            record.announcementTitle
        );

        addDetail(
            grid,
            "Announcement ID",
            record.announcementId
        );

        addDetail(
            grid,
            "Exact Version",
            "Version " + record.versionNumber
        );

        addDetail(
            grid,
            "Version ID",
            record.versionId
        );

        addDetail(
            grid,
            "Guardian",
            record.guardianName
        );

        addDetail(
            grid,
            "Guardian Link ID",
            record.guardianLinkId
        );

        addDetail(
            grid,
            "Linked Student",
            record.studentName
        );

        addDetail(
            grid,
            "Grade Level",
            record.grade
        );

        addDetail(
            grid,
            "Section",
            record.section
        );

        addDetail(
            grid,
            "Published Date",
            formatDateTime(record.publishedAt)
        );


        // STATUS

        const statusItem = makeElement(
            "div",
            "teacher-parent-ack-detail-item"
        );

        statusItem.appendChild(
            makeElement(
                "small",
                "",
                "Acknowledgment Status"
            )
        );

        const statusBadge = makeElement(
            "span",
            "teacher-parent-ack-detail-status " +
            getStatusClass(record.status)
        );

        const statusIcon = makeElement("i");

        statusIcon.className =
            record.status === "ACKNOWLEDGED"
                ? "bi bi-check-circle-fill"
                : "bi bi-hourglass-split";

        statusBadge.append(
            statusIcon,
            document.createTextNode(
                " " + getStatusLabel(record.status)
            )
        );

        statusItem.appendChild(statusBadge);

        grid.appendChild(statusItem);


        // ACKNOWLEDGMENT INFORMATION

        addDetail(
            grid,
            "Acknowledgment Record ID",
            record.acknowledgmentId || "No acknowledgment record"
        );

        addDetail(
            grid,
            "Acknowledged At",
            record.acknowledgedAt
                ? formatDateTime(record.acknowledgedAt)
                : "Not acknowledged"
        );


        section.appendChild(grid);

        el.detailsBody.replaceChildren(section);


        // VERSION INFORMATION

        const versionCard = makeElement(
            "div",
            "teacher-parent-ack-version-card"
        );

        const changeLabel = record.changeType === "MATERIAL"
            ? "Material Change - Fresh Acknowledgment Required"
            : "Initial Publication";

        const changeIcon = record.changeType === "MATERIAL"
            ? "bi bi-arrow-repeat"
            : "bi bi-file-earmark-plus";


        const changeHeading = makeElement(
            "strong",
            "",
            "Version " + record.versionNumber +
            " - " + changeLabel
        );

        const content = makeElement(
            "p",
            "",
            record.content
        );

        const versionNote = record.status === "ACKNOWLEDGED"
            ? "An explicit acknowledgment record exists for this exact Guardian Link and Announcement Version."
            : "No acknowledgment record exists yet for this eligible Guardian Link and Announcement Version.";

        const note = makeElement(
            "small",
            "",
            versionNote
        );

        const changeIconElement = makeElement(
            "i",
            changeIcon
        );

        changeIconElement.style.marginRight = "6px";

        changeHeading.prepend(changeIconElement);

        versionCard.append(
            changeHeading,
            content,
            note
        );

        el.versionInfo.replaceChildren(versionCard);

    }


    // =====================================================
    // 8. OPEN DETAILS MODAL
    // =====================================================

    function openDetails(reportRowId, trigger) {

        const record = acknowledgmentRecords.find(
            item => item.reportRowId === reportRowId
        );

        if (!record) return;


        if (!modal) {

            showMessage(
                "The details modal is unavailable. Check the Bootstrap bundle.",
                "error"
            );

            return;

        }


        returnFocusId = record.reportRowId;

        renderDetails(record);

        modal.show();

    }


    // =====================================================
    // 9. TABLE EVENT DELEGATION
    // =====================================================

    el.tableBody.addEventListener("click", event => {

        const button = event.target.closest(
            "[data-ack-action='view']"
        );

        if (!button || !el.tableBody.contains(button)) {
            return;
        }

        openDetails(
            button.dataset.reportRowId,
            button
        );

    });


    // =====================================================
    // 10. SEARCH SYNCHRONIZATION
    // =====================================================

    function syncSearch(source) {

        el.search.value = source.value;

        if (el.topbarSearch) {
            el.topbarSearch.value = source.value;
        }

        renderTable();

    }


    el.search.addEventListener("input", () => {
        syncSearch(el.search);
    });


    if (el.topbarSearch) {

        el.topbarSearch.addEventListener("input", () => {
            syncSearch(el.topbarSearch);
        });

        el.topbarSearch.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                el.topbarSearch.value = "";
                el.search.value = "";

                renderTable();

                el.topbarSearch.blur();

            }

        });

    }


    el.search.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            el.search.value = "";

            if (el.topbarSearch) {
                el.topbarSearch.value = "";
            }

            renderTable();

            el.search.blur();

        }

    });


    // =====================================================
    // 11. STATUS FILTER
    // =====================================================

    el.statusFilter.addEventListener(
        "change",
        renderTable
    );


    // =====================================================
    // 12. CLEAR FILTERS
    // =====================================================

    el.clearFilters.addEventListener("click", () => {

        el.search.value = "";

        if (el.topbarSearch) {
            el.topbarSearch.value = "";
        }

        el.statusFilter.value = "all";

        renderTable();

        hideMessage();

    });


    // =====================================================
    // 13. MODAL FOCUS MANAGEMENT
    // =====================================================

    el.modal.addEventListener("hide.bs.modal", () => {

        if (el.modal.contains(document.activeElement)) {
            document.activeElement.blur();
        }

    });


    el.modal.addEventListener("hidden.bs.modal", () => {

        if (!returnFocusId) return;

        const target = Array.from(
            el.tableBody.querySelectorAll(
                "[data-ack-action='view']"
            )
        ).find(button =>
            button.dataset.reportRowId === returnFocusId
        );

        if (target && target.isConnected) {
            target.focus();
        }

        returnFocusId = null;

    });


    // =====================================================
    // 14. INITIALIZE
    // =====================================================

    renderTable();

    console.log(
        "F10.14 Parent Acknowledgments initialized: 6 fictional read-only report records. No acknowledgment actions or database connection."
    );

}







/* =====================================================
   F10.15.3 - TEACHER CALENDAR
   FRONTEND DEMONSTRATION ONLY
   SCHOOL EVENTS: READ-ONLY
   PERSONAL EVENTS: PRIVATE TO CURRENT DEMO TEACHER
   ===================================================== */

function initializeTeacherCalendar() {

    const $ = id => document.getElementById(id);

    const el = {
        total: $("teacherCalendarTotal"),
        academic: $("teacherCalendarAcademic"),
        personal: $("teacherCalendarPersonal"),
        upcoming: $("teacherCalendarUpcoming"),
        addButton: $("teacherCalendarAddPersonalEvent"),
        previous: $("teacherCalendarPrevious"),
        next: $("teacherCalendarNext"),
        today: $("teacherCalendarToday"),
        currentLabel: $("teacherCalendarCurrentLabel"),
        jumpDate: $("teacherCalendarJumpDate"),
        search: $("teacherCalendarSearch"),
        topbarSearch: $("teacherCalendarTopbarSearch"),
        visibilityFilter: $("teacherCalendarVisibilityFilter"),
        clearFilters: $("teacherCalendarClearFilters"),
        monthView: $("teacherCalendarMonthView"),
        weekView: $("teacherCalendarWeekView"),
        listView: $("teacherCalendarListView"),
        monthGrid: $("teacherCalendarMonthGrid"),
        weekGrid: $("teacherCalendarWeekGrid"),
        eventList: $("teacherCalendarEventList"),
        empty: $("teacherCalendarEmpty"),
        visibleCount: $("teacherCalendarVisibleCount"),
        message: $("teacherCalendarMessage"),
        detailsModal: $("teacherCalendarEventDetailsModal"),
        detailsTitle: $("teacherCalendarEventDetailsTitle"),
        detailsBody: $("teacherCalendarEventDetailsBody"),
        personalModal: $("teacherCalendarPersonalEventModal"),
        personalForm: $("teacherCalendarPersonalEventForm"),
        personalTitle: $("teacherCalendarPersonalTitle"),
        personalDescription: $("teacherCalendarPersonalDescription"),
        personalDate: $("teacherCalendarPersonalDate"),
        personalStart: $("teacherCalendarPersonalStart"),
        personalEnd: $("teacherCalendarPersonalEnd"),
        personalFormMessage: $("teacherCalendarPersonalFormMessage")
    };

    // Run only on the Teacher Calendar page.
    if (!el.monthGrid) return;

    const required = [
        "total", "academic", "personal", "upcoming", "addButton",
        "previous", "next", "today", "currentLabel", "jumpDate",
        "search", "visibilityFilter", "clearFilters", "monthView",
        "weekView", "listView", "weekGrid", "eventList", "empty",
        "visibleCount", "message", "detailsModal", "detailsTitle",
        "detailsBody", "personalModal", "personalForm", "personalTitle",
        "personalDescription", "personalDate", "personalStart",
        "personalEnd", "personalFormMessage"
    ];

    const missing = required.filter(key => !el[key]);

    if (missing.length) {
        console.error(
            "F10.15 Teacher Calendar: Missing HTML elements:",
            missing
        );
        return;
    }

    // Demonstration identity only.
    // Django must supply the real authenticated Teacher identity.
    const CURRENT_TEACHER_ID = "demo-teacher-current";

    let currentDate = dateAtNoon(new Date());
    const DEMO_BASE_DATE = dateAtNoon(new Date());

    let currentView = "month";
    let personalEventCounter = 1;
    let returnFocusElement = null;

    const events = createDemoEvents();

    const detailsModal = window.bootstrap?.Modal
        ? window.bootstrap.Modal.getOrCreateInstance(el.detailsModal)
        : null;

    const personalModal = window.bootstrap?.Modal
        ? window.bootstrap.Modal.getOrCreateInstance(el.personalModal)
        : null;

    if (!detailsModal || !personalModal) {
        console.error(
            "F10.15: Bootstrap Modal is unavailable. Check the Bootstrap bundle."
        );
    }


    // =====================================================
    // 1. DATE HELPERS
    // =====================================================

    function dateAtNoon(date) {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            12, 0, 0, 0
        );
    }

    function addDays(date, amount) {
        const result = dateAtNoon(date);
        result.setDate(result.getDate() + amount);
        return result;
    }

    function dateKey(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function parseDateKey(value) {

        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return null;
        }

        const [year, month, day] = value.split("-").map(Number);

        const result = new Date(
            year,
            month - 1,
            day,
            12, 0, 0, 0
        );

        if (
            result.getFullYear() !== year ||
            result.getMonth() !== month - 1 ||
            result.getDate() !== day
        ) {
            return null;
        }

        return result;
    }

    function startOfWeek(date) {
        const result = dateAtNoon(date);
        result.setDate(result.getDate() - result.getDay());
        return result;
    }

    function makeLocalDateTime(date, time) {
        return `${dateKey(date)}T${time}`;
    }

    function parseLocalDateTime(value) {
        const result = new Date(value);

        return Number.isNaN(result.getTime())
            ? null
            : result;
    }

    function formatDate(value, options = {}) {

        const date = typeof value === "string"
            ? parseLocalDateTime(value)
            : value;

        if (!date) return "Not available";

        return new Intl.DateTimeFormat("en-PH", {
            year: "numeric",
            month: "short",
            day: "numeric",
            ...options
        }).format(date);
    }

    function formatTime(value) {

        const date = parseLocalDateTime(value);

        if (!date) return "Not available";

        return new Intl.DateTimeFormat("en-PH", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        }).format(date);
    }

    function formatDateRange(start, end) {

        if (
            start.getMonth() === end.getMonth() &&
            start.getFullYear() === end.getFullYear()
        ) {

            const shortDate = date => new Intl.DateTimeFormat(
                "en-PH",
                {
                    month: "short",
                    day: "numeric"
                }
            ).format(date);

            return `${shortDate(start)} – ${shortDate(end)}, ${end.getFullYear()}`;
        }

        return `${formatDate(start)} – ${formatDate(end)}`;
    }


    // =====================================================
    // 2. DEMONSTRATION EVENT DATA
    // =====================================================

    function demoDateTime(offsetDays, time) {

        const date = addDays(DEMO_BASE_DATE, offsetDays);

        return makeLocalDateTime(date, time);
    }

    function createDemoEvents() {

        return [

            // ACADEMIC EVENT 1

            {
                id: "CAL-DEMO-SCHOOL-001",

                title: "Faculty Coordination Meeting",

                description:
                    "A sample academic calendar event for the current Teacher workspace. Confirm the official schedule through the authorized school channel.",

                displayCategory: "Academic Meeting",

                visibility: "SCHOOL",

                ownerUserId: CURRENT_TEACHER_ID,

                startAt: demoDateTime(1, "09:00"),

                endAt: demoDateTime(1, "10:00"),

                sourceLabel: "School calendar demonstration"
            },


            // ACADEMIC EVENT 2

            {
                id: "CAL-DEMO-SCHOOL-002",

                title: "Quarterly Assessment Planning",

                description:
                    "A sample academic planning event. Actual academic audience targets and event permissions must be provided by the Backend.",

                displayCategory: "Academic Planning",

                visibility: "SCHOOL",

                ownerUserId: CURRENT_TEACHER_ID,

                startAt: demoDateTime(3, "13:00"),

                endAt: demoDateTime(3, "14:30"),

                sourceLabel: "School calendar demonstration"
            },


            // ACADEMIC EVENT 3

            {
                id: "CAL-DEMO-SCHOOL-003",

                title: "School Academic Planning Day",

                description:
                    "A sample school calendar event for demonstration. It is not an official school schedule.",

                displayCategory: "Academic Event",

                visibility: "SCHOOL",

                ownerUserId: CURRENT_TEACHER_ID,

                startAt: demoDateTime(7, "08:00"),

                endAt: demoDateTime(7, "12:00"),

                sourceLabel: "School calendar demonstration"
            },


            // PRIVATE PERSONAL EVENT

            {
                id: "CAL-DEMO-PRIVATE-001",

                title: "Prepare Lesson Materials",

                description:
                    "A sample personal reminder. This event is private to the current demonstration Teacher.",

                displayCategory: "Personal Reminder",

                visibility: "PRIVATE",

                ownerUserId: CURRENT_TEACHER_ID,

                startAt: demoDateTime(2, "16:00"),

                endAt: demoDateTime(2, "17:00"),

                sourceLabel: "Personal event"
            }

        ];
    }


    // =====================================================
    // 3. GENERAL HELPERS
    // =====================================================

    function makeElement(tag, className = "", text = "") {

        const node = document.createElement(tag);

        if (className) {
            node.className = className;
        }

        if (text !== "") {
            node.textContent = text;
        }

        return node;
    }

    function showMessage(message, type = "info") {

        el.message.textContent = message;

        el.message.className =
            `teacher-calendar-message is-${type}`;

        el.message.hidden = false;
    }

    function hideMessage() {

        el.message.textContent = "";
        el.message.hidden = true;

        el.message.className =
            "teacher-calendar-message";
    }

    function getVisibilityLabel(event) {

        return event.visibility === "PRIVATE"
            ? "Private Personal Event"
            : "Academic Event";
    }

    function getVisibleEvents() {

        // Never include another user's PRIVATE events.
        return events.filter(event => {

            if (event.visibility === "PRIVATE") {

                return event.ownerUserId === CURRENT_TEACHER_ID;
            }

            return event.visibility === "SCHOOL";
        });
    }

    function getFilteredEvents() {

        const query = el.search.value.trim().toLowerCase();

        const visibility = el.visibilityFilter.value;

        return getVisibleEvents().filter(event => {

            const matchesVisibility =
                visibility === "all" ||
                event.visibility === visibility;

            const searchable = [
                event.id,
                event.title,
                event.description,
                event.displayCategory,
                event.visibility
            ].join(" ").toLowerCase();

            return matchesVisibility &&
                searchable.includes(query);
        });
    }

    function getPeriodRange() {

        if (currentView === "week") {

            const start = startOfWeek(currentDate);

            return {
                start,
                end: addDays(start, 7)
            };
        }

        const start = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1,
            12
        );

        const end = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            1,
            12
        );

        return { start, end };
    }

    function getEventsInPeriod() {

        const { start, end } = getPeriodRange();

        const startKey = dateKey(start);
        const endKey = dateKey(end);

        return getFilteredEvents()
            .filter(event => {

                const key = event.startAt.slice(0, 10);

                return key >= startKey && key < endKey;

            })
            .sort((a, b) =>
                a.startAt.localeCompare(b.startAt)
            );
    }

    function createEventButton(event, includeTime = false) {

        const isPrivate = event.visibility === "PRIVATE";

        const button = makeElement(
            "button",
            `teacher-calendar-event-chip${isPrivate ? " personal" : ""}`,
            `${includeTime ? formatTime(event.startAt) + " · " : ""}${event.title}`
        );

        button.type = "button";

        button.dataset.calendarEventId = event.id;

        button.title =
            `${event.title} (${getVisibilityLabel(event)})`;

        button.setAttribute(
            "aria-label",
            `View ${event.title}`
        );

        return button;
    }


    // =====================================================
    // 4. SUMMARY CARDS
    // =====================================================

    function updateSummary() {

        const visible = getVisibleEvents();

        const now = new Date();

        const academicCount = visible.filter(
            event => event.visibility === "SCHOOL"
        ).length;

        const personalCount = visible.filter(
            event => event.visibility === "PRIVATE"
        ).length;

        const upcomingCount = visible.filter(event => {

            const start = parseLocalDateTime(event.startAt);

            return start && start >= now;

        }).length;

        el.total.textContent = String(visible.length);

        el.academic.textContent = String(academicCount);

        el.personal.textContent = String(personalCount);

        el.upcoming.textContent = String(upcomingCount);
    }


    // =====================================================
    // 5. CALENDAR LABEL AND VIEW STATE
    // =====================================================

    function updateCalendarLabel() {

        if (currentView === "week") {

            const start = startOfWeek(currentDate);

            const end = addDays(start, 6);

            el.currentLabel.textContent =
                formatDateRange(start, end);

        } else {

            el.currentLabel.textContent =
                new Intl.DateTimeFormat("en-PH", {
                    month: "long",
                    year: "numeric"
                }).format(currentDate);
        }

        el.jumpDate.value = dateKey(currentDate);
    }

    function setCalendarView(view) {

        if (!["month", "week", "list"].includes(view)) {
            return;
        }

        currentView = view;

        document.querySelectorAll("[data-calendar-view]")
            .forEach(button => {

                const active =
                    button.dataset.calendarView === view;

                button.classList.toggle("active", active);

                button.setAttribute(
                    "aria-pressed",
                    String(active)
                );

            });

        el.monthView.hidden = view !== "month";

        el.weekView.hidden = view !== "week";

        el.listView.hidden = view !== "list";

        renderCalendar();
    }


    // =====================================================
    // 6. MONTH VIEW
    // =====================================================

    function renderMonthView(periodEvents) {

        el.monthGrid.replaceChildren();

        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            .forEach(day => {

                el.monthGrid.appendChild(
                    makeElement(
                        "div",
                        "teacher-calendar-weekday",
                        day
                    )
                );

            });

        const firstDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1,
            12
        );

        const gridStart = addDays(
            firstDay,
            -firstDay.getDay()
        );

        const todayKey = dateKey(new Date());

        // Six rows ensure a consistent monthly grid.
        for (let index = 0; index < 42; index++) {

            const day = addDays(gridStart, index);

            const key = dateKey(day);

            const outsideMonth =
                day.getMonth() !== currentDate.getMonth();

            const isToday = key === todayKey;

            const classes = [
                "teacher-calendar-day-cell"
            ];

            if (outsideMonth) {
                classes.push("is-outside-month");
            }

            if (isToday) {
                classes.push("is-today");
            }

            const cell = makeElement(
                "div",
                classes.join(" ")
            );

            cell.appendChild(
                makeElement(
                    "span",
                    "teacher-calendar-day-number",
                    String(day.getDate())
                )
            );

            const eventContainer = makeElement(
                "div",
                "teacher-calendar-day-events"
            );

            const dayEvents = outsideMonth
                ? []
                : periodEvents.filter(event =>
                    event.startAt.slice(0, 10) === key
                );

            dayEvents.slice(0, 3).forEach(event => {

                eventContainer.appendChild(
                    createEventButton(event)
                );

            });

            if (dayEvents.length > 3) {

                eventContainer.appendChild(
                    makeElement(
                        "span",
                        "teacher-calendar-more-events",
                        `+${dayEvents.length - 3} more`
                    )
                );

            }

            cell.appendChild(eventContainer);

            el.monthGrid.appendChild(cell);
        }
    }


    // =====================================================
    // 7. WEEK VIEW
    // =====================================================

    function renderWeekView(periodEvents) {

        el.weekGrid.replaceChildren();

        const start = startOfWeek(currentDate);

        const todayKey = dateKey(new Date());

        for (let index = 0; index < 7; index++) {

            const day = addDays(start, index);

            const key = dateKey(day);

            const cell = makeElement(
                "section",
                `teacher-calendar-week-day${key === todayKey ? " is-today" : ""}`
            );

            const heading = makeElement(
                "div",
                "teacher-calendar-week-day-heading"
            );

            heading.append(
                makeElement(
                    "strong",
                    "",
                    new Intl.DateTimeFormat("en-PH", {
                        weekday: "short"
                    }).format(day)
                ),

                makeElement(
                    "span",
                    "",
                    String(day.getDate())
                )
            );

            const eventContainer = makeElement(
                "div",
                "teacher-calendar-week-events"
            );

            const dayEvents = periodEvents.filter(event =>
                event.startAt.slice(0, 10) === key
            );

            dayEvents.forEach(event => {

                eventContainer.appendChild(
                    createEventButton(event, true)
                );

            });

            cell.append(heading, eventContainer);

            el.weekGrid.appendChild(cell);
        }
    }


    // =====================================================
    // 8. LIST VIEW
    // =====================================================

    function renderListView(periodEvents) {

        el.eventList.replaceChildren();

        const grouped = new Map();

        periodEvents.forEach(event => {

            const key = event.startAt.slice(0, 10);

            if (!grouped.has(key)) {
                grouped.set(key, []);
            }

            grouped.get(key).push(event);

        });

        Array.from(grouped.entries())
            .sort((a, b) => a[0].localeCompare(b[0]))
            .forEach(([key, dayEvents]) => {

                const date = parseDateKey(key);

                el.eventList.appendChild(
                    makeElement(
                        "h4",
                        "teacher-calendar-list-date-heading",
                        formatDate(date, {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                        })
                    )
                );

                dayEvents.forEach(event => {

                    const isPrivate =
                        event.visibility === "PRIVATE";

                    const row = makeElement(
                        "article",
                        `teacher-calendar-list-item${isPrivate ? " personal" : ""}`
                    );

                    const dateCell = makeElement(
                        "div",
                        "teacher-calendar-list-date"
                    );

                    dateCell.append(
                        makeElement(
                            "strong",
                            "",
                            formatDate(
                                parseLocalDateTime(event.startAt),
                                { day: "numeric" }
                            )
                        ),

                        document.createTextNode(
                            formatTime(event.startAt)
                        )
                    );

                    const info = makeElement(
                        "div",
                        "teacher-calendar-list-info"
                    );

                    info.append(
                        makeElement(
                            "strong",
                            "",
                            event.title
                        ),

                        makeElement(
                            "small",
                            "",
                            `${event.displayCategory} · ${getVisibilityLabel(event)}`
                        )
                    );

                    const action = makeElement(
                        "button",
                        "teacher-calendar-list-action"
                    );

                    action.type = "button";

                    action.dataset.calendarEventId = event.id;

                    action.setAttribute(
                        "aria-label",
                        `View ${event.title}`
                    );

                    action.appendChild(
                        makeElement("i", "bi bi-eye")
                    );

                    row.append(dateCell, info, action);

                    el.eventList.appendChild(row);
                });
            });
    }


    // =====================================================
    // 9. MAIN RENDER FUNCTION
    // =====================================================

    function renderCalendar() {

        updateCalendarLabel();

        updateSummary();

        const periodEvents = getEventsInPeriod();

        renderMonthView(periodEvents);

        renderWeekView(periodEvents);

        renderListView(periodEvents);

        el.empty.hidden = periodEvents.length > 0;

        el.visibleCount.textContent =
            `${periodEvents.length} visible ${
                periodEvents.length === 1 ? "event" : "events"
            }`;
    }


    // =====================================================
    // 10. EVENT DETAILS MODAL
    // =====================================================

    function addDetail(grid, label, value) {

        const item = makeElement(
            "div",
            "teacher-calendar-detail-item"
        );

        item.append(
            makeElement("small", "", label),

            makeElement(
                "strong",
                "",
                value || "Not available"
            )
        );

        grid.appendChild(item);
    }

    function renderEventDetails(event) {

        el.detailsTitle.textContent = "Event Details";

        el.detailsBody.replaceChildren();

        const section = makeElement(
            "section",
            "teacher-calendar-detail-section"
        );

        section.appendChild(
            makeElement(
                "h4",
                "teacher-calendar-detail-title",
                event.title
            )
        );

        const visibility = makeElement(
            "span",
            `teacher-calendar-visibility-badge${
                event.visibility === "PRIVATE" ? " personal" : ""
            }`
        );

        const visibilityIcon = makeElement(
            "i",
            event.visibility === "PRIVATE"
                ? "bi bi-lock-fill"
                : "bi bi-mortarboard"
        );

        visibility.append(
            visibilityIcon,
            document.createTextNode(" " + event.visibility)
        );

        section.appendChild(visibility);

        const grid = makeElement(
            "div",
            "teacher-calendar-detail-grid"
        );

        addDetail(
            grid,
            "Event Category",
            event.displayCategory
        );

        addDetail(
            grid,
            "Event Date",
            formatDate(event.startAt)
        );

        addDetail(
            grid,
            "Start Time",
            formatTime(event.startAt)
        );

        addDetail(
            grid,
            "End Time",
            formatTime(event.endAt)
        );

        addDetail(
            grid,
            "Visibility",
            getVisibilityLabel(event)
        );

        addDetail(
            grid,
            "Event Source",
            event.visibility === "PRIVATE"
                ? "Personal event created by you"
                : event.sourceLabel
        );

        section.appendChild(grid);

        const description = makeElement(
            "p",
            "teacher-calendar-detail-description",
            event.description || "No additional description."
        );

        el.detailsBody.append(section, description);
    }

    function openEventDetails(eventId, trigger) {

        const event = getVisibleEvents().find(
            item => item.id === eventId
        );

        if (!event) return;

        if (!detailsModal) {

            showMessage(
                "The event details modal is unavailable. Check the Bootstrap bundle.",
                "error"
            );

            return;
        }

        returnFocusElement = trigger || null;

        renderEventDetails(event);

        detailsModal.show();
    }

    function handleCalendarEventClick(event) {

        const button = event.target.closest(
            "[data-calendar-event-id]"
        );

        if (!button) return;

        const container = event.currentTarget;

        if (!container.contains(button)) return;

        openEventDetails(
            button.dataset.calendarEventId,
            button
        );
    }

    el.monthGrid.addEventListener(
        "click",
        handleCalendarEventClick
    );

    el.weekGrid.addEventListener(
        "click",
        handleCalendarEventClick
    );

    el.eventList.addEventListener(
        "click",
        handleCalendarEventClick
    );


    // =====================================================
    // 11. VIEW SWITCHING
    // =====================================================

    document.querySelectorAll("[data-calendar-view]")
        .forEach(button => {

            button.addEventListener("click", () => {

                setCalendarView(
                    button.dataset.calendarView
                );

            });

        });


    // =====================================================
    // 12. PREVIOUS / NEXT / TODAY
    // =====================================================

    function movePeriod(direction) {

        if (currentView === "week") {

            currentDate = addDays(
                currentDate,
                direction * 7
            );

        } else {

            currentDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + direction,
                1,
                12
            );
        }

        renderCalendar();
    }

    el.previous.addEventListener("click", () => {
        movePeriod(-1);
    });

    el.next.addEventListener("click", () => {
        movePeriod(1);
    });

    el.today.addEventListener("click", () => {

        currentDate = dateAtNoon(new Date());

        renderCalendar();
    });

    el.jumpDate.addEventListener("change", () => {

        const selected = parseDateKey(el.jumpDate.value);

        if (!selected) return;

        currentDate = selected;

        renderCalendar();
    });


    // =====================================================
    // 13. SEARCH AND VISIBILITY FILTERS
    // =====================================================

    function syncSearch(source) {

        el.search.value = source.value;

        if (el.topbarSearch) {
            el.topbarSearch.value = source.value;
        }

        renderCalendar();
    }

    el.search.addEventListener("input", () => {
        syncSearch(el.search);
    });

    if (el.topbarSearch) {

        el.topbarSearch.addEventListener("input", () => {
            syncSearch(el.topbarSearch);
        });

        el.topbarSearch.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                el.topbarSearch.value = "";

                el.search.value = "";

                renderCalendar();

                el.topbarSearch.blur();
            }

        });
    }

    el.search.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            el.search.value = "";

            if (el.topbarSearch) {
                el.topbarSearch.value = "";
            }

            renderCalendar();

            el.search.blur();
        }

    });

    el.visibilityFilter.addEventListener(
        "change",
        renderCalendar
    );

    el.clearFilters.addEventListener("click", () => {

        el.search.value = "";

        if (el.topbarSearch) {
            el.topbarSearch.value = "";
        }

        el.visibilityFilter.value = "all";

        renderCalendar();

        hideMessage();
    });


    // =====================================================
    // 14. OPEN PRIVATE PERSONAL EVENT FORM
    // =====================================================

    function resetPersonalForm() {

        el.personalForm.reset();

        el.personalDate.value = dateKey(currentDate);

        el.personalTitle.setAttribute(
            "aria-invalid",
            "false"
        );

        el.personalDate.setAttribute(
            "aria-invalid",
            "false"
        );

        el.personalStart.setAttribute(
            "aria-invalid",
            "false"
        );

        el.personalEnd.setAttribute(
            "aria-invalid",
            "false"
        );

        el.personalFormMessage.textContent = "";

        el.personalFormMessage.hidden = true;
    }

    function showPersonalFormError(message, field) {

        el.personalFormMessage.textContent = message;

        el.personalFormMessage.hidden = false;

        if (field) {

            field.setAttribute(
                "aria-invalid",
                "true"
            );

            field.focus();
        }
    }

    el.addButton.addEventListener("click", () => {

        if (!personalModal) {

            showMessage(
                "The personal event form is unavailable. Check the Bootstrap bundle.",
                "error"
            );

            return;
        }

        returnFocusElement = el.addButton;

        resetPersonalForm();

        personalModal.show();
    });


    // =====================================================
    // 15. CREATE PRIVATE PERSONAL EVENT
    // =====================================================

    el.personalForm.addEventListener("submit", event => {

        event.preventDefault();

        [
            el.personalTitle,
            el.personalDate,
            el.personalStart,
            el.personalEnd
        ].forEach(field => {

            field.setAttribute(
                "aria-invalid",
                "false"
            );

        });

        const title = el.personalTitle.value.trim();

        const description =
            el.personalDescription.value.trim();

        const date = el.personalDate.value;

        const startTime = el.personalStart.value;

        const endTime = el.personalEnd.value;


        // TITLE VALIDATION

        if (!title) {

            showPersonalFormError(
                "Enter an event title.",
                el.personalTitle
            );

            return;
        }


        // DATE VALIDATION

        if (!date || !parseDateKey(date)) {

            showPersonalFormError(
                "Select a valid event date.",
                el.personalDate
            );

            return;
        }


        // START TIME VALIDATION

        if (!startTime) {

            showPersonalFormError(
                "Enter the event start time.",
                el.personalStart
            );

            return;
        }


        // END TIME VALIDATION

        if (!endTime) {

            showPersonalFormError(
                "Enter the event end time.",
                el.personalEnd
            );

            return;
        }


        const startAt = `${date}T${startTime}`;

        const endAt = `${date}T${endTime}`;

        const startDateTime =
            parseLocalDateTime(startAt);

        const endDateTime =
            parseLocalDateTime(endAt);


        if (!startDateTime || !endDateTime) {

            showPersonalFormError(
                "Enter valid event date and times."
            );

            return;
        }


        // END TIME MUST BE AFTER START TIME

        if (endDateTime <= startDateTime) {

            showPersonalFormError(
                "End time must be later than start time.",
                el.personalEnd
            );

            return;
        }


        // CREATE A PRIVATE PERSONAL EVENT

        const newEvent = {

            id: `CAL-DEMO-PRIVATE-NEW-${String(
                personalEventCounter++
            ).padStart(3, "0")}`,

            title,

            description,

            displayCategory: "Personal Reminder",

            // Fixed by the application.
            // The form cannot create SCHOOL events.
            visibility: "PRIVATE",

            ownerUserId: CURRENT_TEACHER_ID,

            startAt,

            endAt,

            sourceLabel: "Personal event"

        };


        // Add to browser memory only.
        events.push(newEvent);


        // Navigate to the event's date.

        currentDate = parseDateKey(date);

        el.search.value = "";

        if (el.topbarSearch) {
            el.topbarSearch.value = "";
        }

        el.visibilityFilter.value = "all";


        renderCalendar();


        if (personalModal) {
            personalModal.hide();
        }


        showMessage(
            "Your private personal event was added to this demonstration calendar. It is visible only to the current demo Teacher and will not persist after refresh.",
            "info"
        );

    });


    // =====================================================
    // 16. MODAL FOCUS MANAGEMENT
    // =====================================================

    [el.detailsModal, el.personalModal].forEach(modalElement => {

        modalElement.addEventListener("hide.bs.modal", () => {

            if (
                modalElement.contains(document.activeElement)
            ) {

                document.activeElement.blur();

            }

        });

        modalElement.addEventListener("hidden.bs.modal", () => {

            if (
                returnFocusElement &&
                returnFocusElement.isConnected
            ) {

                returnFocusElement.focus();

            }

            returnFocusElement = null;

        });

    });


    // =====================================================
    // 17. INITIALIZE PAGE
    // =====================================================

    el.weekView.style.overflowX = "auto";

    el.jumpDate.value = dateKey(currentDate);

    renderCalendar();

    console.log(
        "F10.15 Teacher Calendar initialized: 3 fictional SCHOOL events and 1 PRIVATE event. Personal events are in-memory only."
    );

}







/* =====================================================
   F10.17.3 - TEACHER ACTIVITY HISTORY
   FRONTEND DEMONSTRATION ONLY
   OPTION A: MY ACTIVITY ONLY
   READ-ONLY AUDIT HISTORY
   ===================================================== */

function initializeTeacherActivityHistory() {

    const $ = id => document.getElementById(id);

    const el = {
        total: $("teacherActivityTotal"),
        today: $("teacherActivityToday"),
        last7Days: $("teacherActivityLast7Days"),
        targets: $("teacherActivityTargets"),

        recordCount: $("teacherActivityRecordCount"),
        search: $("teacherActivitySearch"),
        topbarSearch: $("teacherActivityTopbarSearch"),
        dateFrom: $("teacherActivityDateFrom"),
        dateTo: $("teacherActivityDateTo"),
        clearFilters: $("teacherActivityClearFilters"),

        tableBody: $("teacherActivityTableBody"),
        empty: $("teacherActivityEmpty"),
        message: $("teacherActivityMessage"),

        modal: $("teacherActivityDetailsModal"),
        detailsTitle: $("teacherActivityDetailsTitle"),
        detailsBody: $("teacherActivityDetailsBody")
    };


        // Run only on Activity History page.
        // dateFrom is unique to Activity History.
        // Activities uses the same tableBody ID.

        if (!el.dateFrom) return;


    const required = [
        "total",
        "today",
        "last7Days",
        "targets",
        "recordCount",
        "search",
        "dateFrom",
        "dateTo",
        "clearFilters",
        "empty",
        "message",
        "modal",
        "detailsTitle",
        "detailsBody"
    ];

    const missing = required.filter(key => !el[key]);

    if (missing.length) {

        console.error(
            "F10.17 Activity History: Missing HTML elements:",
            missing
        );

        return;

    }


    // =====================================================
    // 1. DEMONSTRATION TEACHER
    // =====================================================

    // This is a temporary frontend identity.
    // Django must supply the real authenticated user ID.

    const CURRENT_TEACHER_ID = "TEACHER-DEMO-CURRENT";


    // =====================================================
    // 2. SAMPLE TIMESTAMP GENERATOR
    // =====================================================

    // Sample records use dates relative to today.
    // This keeps the Today and Last 7 Days cards useful
    // whenever the page is opened.

    function createTimestamp(daysAgo, hour, minute) {

        const date = new Date();

        date.setDate(date.getDate() - daysAgo);

        date.setHours(hour, minute, 0, 0);

        return date.toISOString();

    }


    // =====================================================
    // 3. FICTIONAL AUDIT RECORDS
    // =====================================================

    // AUDIT_EVENTS structure:
    // audit_event_id
    // actor_user_id
    // action
    // target_type
    // target_id
    // reason
    // timestamp

    const activityRecords = [

        {
            audit_event_id: "AUD-DEMO-001",

            actor_user_id: CURRENT_TEACHER_ID,

            action: "CREATED",

            target_type: "ACTIVITY",

            target_id: "ACT-2026-014",

            reason:
                "Created a new learning activity for an authorized offering.",

            timestamp: createTimestamp(0, 9, 15)
        },


        {
            audit_event_id: "AUD-DEMO-002",

            actor_user_id: CURRENT_TEACHER_ID,

            action: "UPDATED",

            target_type: "ANNOUNCEMENT",

            target_id: "ANN-2026-006",

            reason:
                "Updated announcement information before publication.",

            timestamp: createTimestamp(0, 11, 30)
        },


        {
            audit_event_id: "AUD-DEMO-003",

            actor_user_id: CURRENT_TEACHER_ID,

            action: "SUBMITTED",

            target_type: "QUIZ",

            target_id: "QUIZ-2026-003",

            reason:
                "Submitted quiz changes for review.",

            timestamp: createTimestamp(1, 14, 0)
        },


        {
            audit_event_id: "AUD-DEMO-004",

            actor_user_id: CURRENT_TEACHER_ID,

            action: "REVIEWED",

            target_type: "STUDENT_SUBMISSION",

            target_id: "SUB-2026-028",

            reason:
                "Reviewed a student submission.",

            timestamp: createTimestamp(2, 10, 15)
        },


        {
            audit_event_id: "AUD-DEMO-005",

            actor_user_id: CURRENT_TEACHER_ID,

            action: "STATUS_CHANGED",

            target_type: "GUARDIAN_CONNECTION_REQUEST",

            target_id: "GR-2026-003",

            reason:
                "Referred the request for authorized School Administrator or registrar review.",

            timestamp: createTimestamp(3, 16, 30)
        },


        {
            audit_event_id: "AUD-DEMO-006",

            actor_user_id: CURRENT_TEACHER_ID,

            action: "UPDATED",

            target_type: "GRADE_FEEDBACK",

            target_id: "GRADE-2026-017",

            reason:
                "Updated feedback before official release.",

            timestamp: createTimestamp(5, 8, 45)
        },


        {
            audit_event_id: "AUD-DEMO-007",

            actor_user_id: CURRENT_TEACHER_ID,

            action: "CREATED",

            target_type: "CALENDAR_EVENT",

            target_id: "CAL-2026-022",

            reason:
                "Created a private personal calendar event.",

            timestamp: createTimestamp(6, 13, 20)
        },


        {
            audit_event_id: "AUD-DEMO-008",

            actor_user_id: CURRENT_TEACHER_ID,

            action: "UPDATED",

            target_type: "ACTIVITY",

            target_id: "ACT-2026-009",

            reason:
                "Updated the instructions of an existing learning activity.",

            timestamp: createTimestamp(9, 15, 0)
        },


        // -------------------------------------------------
        // ANOTHER USER'S ACTIVITY
        // MUST NEVER APPEAR IN THIS TEACHER'S REPORT
        // -------------------------------------------------

        {
            audit_event_id: "AUD-OTHER-001",

            actor_user_id: "OTHER-TEACHER-DEMO",

            action: "CREATED",

            target_type: "ACTIVITY",

            target_id: "ACT-OTHER-001",

            reason:
                "Sample activity belonging to another Teacher.",

            timestamp: createTimestamp(0, 10, 0)
        }

    ];


    // =====================================================
    // 4. STATE
    // =====================================================

    let returnFocusId = null;

    const modal = window.bootstrap?.Modal
        ? window.bootstrap.Modal.getOrCreateInstance(el.modal)
        : null;

    if (!modal) {

        console.error(
            "F10.17: Bootstrap Modal is unavailable. Check the Bootstrap bundle."
        );

    }


    // =====================================================
    // 5. HELPER FUNCTIONS
    // =====================================================

    function makeElement(tag, className = "", text = "") {

        const node = document.createElement(tag);

        if (className) {
            node.className = className;
        }

        if (text !== "") {
            node.textContent = text;
        }

        return node;

    }


    function showMessage(message, type = "info") {

        el.message.textContent = message;

        el.message.className =
            "teacher-history-message is-" + type;

        el.message.hidden = false;

    }


    function hideMessage() {

        el.message.textContent = "";

        el.message.hidden = true;

        el.message.className =
            "teacher-history-message";

    }


    function dateKey(date) {

        const year = date.getFullYear();

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            date.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;

    }


    function formatDateTime(value) {

        if (!value) return "Not available";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "Not available";
        }

        return new Intl.DateTimeFormat("en-PH", {

            year: "numeric",

            month: "short",

            day: "numeric",

            hour: "numeric",

            minute: "2-digit",

            hour12: true

        }).format(date);

    }


    function humanize(value) {

        return String(value || "")
            .toLowerCase()
            .split("_")
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ");

    }


    function getActionClass(action) {

        const classes = {

            CREATED: "created",

            UPDATED: "updated",

            SUBMITTED: "submitted",

            REVIEWED: "reviewed",

            STATUS_CHANGED: "status"

        };

        return classes[action] || "other";

    }


    function getOwnActivityRecords() {

        // OPTION A:
        // Only records whose actor_user_id matches
        // the current Teacher's demonstration identity.

        return activityRecords.filter(record => {

            return record.actor_user_id === CURRENT_TEACHER_ID;

        });

    }


    function getRecord(id) {

        return getOwnActivityRecords().find(record => {

            return record.audit_event_id === id;

        }) || null;

    }


    // =====================================================
    // 6. SUMMARY CARDS
    // =====================================================

    function updateSummary() {

        const ownRecords = getOwnActivityRecords();

        const now = new Date();

        const todayKey = dateKey(now);

        const sevenDaysAgo = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 6,
            0, 0, 0, 0
        );

        const sevenDaysKey = dateKey(sevenDaysAgo);


        // TODAY

        const todayCount = ownRecords.filter(record => {

            const date = new Date(record.timestamp);

            return (
                !Number.isNaN(date.getTime()) &&
                dateKey(date) === todayKey
            );

        }).length;


        // LAST SEVEN CALENDAR DAYS, INCLUDING TODAY

        const last7DaysCount = ownRecords.filter(record => {

            const date = new Date(record.timestamp);

            return (
                !Number.isNaN(date.getTime()) &&
                dateKey(date) >= sevenDaysKey &&
                dateKey(date) <= todayKey
            );

        }).length;


        // DISTINCT TARGET RECORDS

        const distinctTargets = new Set(

            ownRecords.map(record => {

                return `${record.target_type}:${record.target_id}`;

            })

        );


        el.total.textContent =
            String(ownRecords.length);

        el.today.textContent =
            String(todayCount);

        el.last7Days.textContent =
            String(last7DaysCount);

        el.targets.textContent =
            String(distinctTargets.size);

    }


    // =====================================================
    // 7. DATE FILTER VALIDATION
    // =====================================================

    function isValidDateRange() {

        const from = el.dateFrom.value;

        const to = el.dateTo.value;

        if (from && to && from > to) {

            showMessage(
                "Invalid date range. The From Date must not be later than the To Date.",
                "error"
            );

            return false;

        }

        return true;

    }


    // =====================================================
    // 8. FILTER RECORDS
    // =====================================================

    function getFilteredRecords() {

        const query = el.search.value
            .trim()
            .toLowerCase();

        const from = el.dateFrom.value;

        const to = el.dateTo.value;


        return getOwnActivityRecords()

            .filter(record => {

                const searchableText = [

                    record.audit_event_id,

                    record.actor_user_id,

                    record.action,

                    record.target_type,

                    record.target_id,

                    record.reason,

                    record.timestamp

                ].join(" ").toLowerCase();


                const matchesSearch =
                    searchableText.includes(query);


                const recordDate = dateKey(
                    new Date(record.timestamp)
                );


                const matchesFrom =
                    !from || recordDate >= from;

                const matchesTo =
                    !to || recordDate <= to;


                return (
                    matchesSearch &&
                    matchesFrom &&
                    matchesTo
                );

            })

            .sort((a, b) => {

                return new Date(b.timestamp) -
                    new Date(a.timestamp);

            });

    }


    // =====================================================
    // 9. CREATE TABLE ROW
    // =====================================================

    function createRow(record) {

        const row = document.createElement("tr");


        // DATE AND TIME

        const dateCell = makeElement(
            "td",
            "teacher-history-date-cell"
        );

        const timestamp = new Date(record.timestamp);

        dateCell.append(

            makeElement(
                "strong",
                "",
                new Intl.DateTimeFormat("en-PH", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }).format(timestamp)
            ),

            makeElement(
                "small",
                "",
                new Intl.DateTimeFormat("en-PH", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                }).format(timestamp)
            )

        );


        // ACTION

        const actionCell = document.createElement("td");

        const actionBadge = makeElement(
            "span",
            "teacher-history-action " +
            getActionClass(record.action)
        );

        const actionIcon = makeElement(
            "i",
            "bi bi-activity"
        );

        actionBadge.append(
            actionIcon,
            document.createTextNode(
                " " + humanize(record.action)
            )
        );

        actionCell.appendChild(actionBadge);


        // TARGET TYPE

        const targetTypeCell =
            document.createElement("td");

        targetTypeCell.appendChild(
            makeElement(
                "span",
                "teacher-history-target",
                humanize(record.target_type)
            )
        );


        // TARGET ID

        const targetIdCell = makeElement(
            "td",
            "teacher-history-target-id",
            record.target_id
        );


        // REASON

        const reasonCell = document.createElement("td");

        reasonCell.appendChild(
            makeElement(
                "span",
                "teacher-history-reason",
                record.reason || "No reason recorded"
            )
        );


        // DETAILS BUTTON

        const detailsCell = document.createElement("td");

        const detailsButton = makeElement(
            "button",
            "teacher-history-view-button"
        );

        detailsButton.type = "button";

        detailsButton.dataset.activityAction = "details";

        detailsButton.dataset.activityId =
            record.audit_event_id;

        detailsButton.append(
            makeElement("i", "bi bi-eye"),
            document.createTextNode(" View Details")
        );


        detailsCell.appendChild(detailsButton);


        row.append(
            dateCell,
            actionCell,
            targetTypeCell,
            targetIdCell,
            reasonCell,
            detailsCell
        );

        return row;

    }


    // =====================================================
    // 10. RENDER TABLE
    // =====================================================

    function renderTable() {

        if (!isValidDateRange()) {

            el.tableBody.replaceChildren();

            el.empty.hidden = true;

            el.recordCount.textContent =
                "Invalid date range";

            return;

        }


        const filtered = getFilteredRecords();

        const fragment =
            document.createDocumentFragment();


        filtered.forEach(record => {

            fragment.appendChild(
                createRow(record)
            );

        });


        el.tableBody.replaceChildren(fragment);

        el.empty.hidden = filtered.length > 0;

        el.recordCount.textContent =
            filtered.length +
            (filtered.length === 1
                ? " record"
                : " records");


        updateSummary();

    }


    // =====================================================
    // 11. DETAILS MODAL HELPERS
    // =====================================================

    function addDetail(grid, label, value) {

        const item = makeElement(
            "div",
            "teacher-history-detail-item"
        );

        item.append(

            makeElement(
                "small",
                "",
                label
            ),

            makeElement(
                "strong",
                "",
                value || "Not available"
            )

        );

        grid.appendChild(item);

    }


    // =====================================================
    // 12. RENDER ACTIVITY DETAILS
    // =====================================================

    function renderDetails(record) {

        el.detailsTitle.textContent =
            "Activity Record Details";


        // ACTIVITY TITLE

        const section = makeElement(
            "section",
            "teacher-history-detail-section"
        );

        section.appendChild(
            makeElement(
                "h4",
                "teacher-history-detail-title",
                humanize(record.action)
            )
        );


        // AUDIT EVENT FIELDS

        const grid = makeElement(
            "div",
            "teacher-history-detail-grid"
        );


        addDetail(
            grid,
            "Audit Event ID",
            record.audit_event_id
        );


        addDetail(
            grid,
            "Actor User ID",
            record.actor_user_id
        );


        addDetail(
            grid,
            "Action",
            humanize(record.action)
        );


        addDetail(
            grid,
            "Target Type",
            humanize(record.target_type)
        );


        addDetail(
            grid,
            "Target ID",
            record.target_id
        );


        addDetail(
            grid,
            "Recorded Timestamp",
            formatDateTime(record.timestamp)
        );


        section.appendChild(grid);


        // REASON

        const reasonBlock = makeElement(
            "div",
            "teacher-history-detail-block"
        );

        reasonBlock.append(

            makeElement(
                "strong",
                "",
                "Recorded Reason"
            ),

            makeElement(
                "p",
                "",
                record.reason || "No reason recorded."
            )

        );


        // ACTOR NOTICE

        const actorNotice = makeElement(
            "div",
            "teacher-history-actor-notice"
        );

        actorNotice.append(

            makeElement(
                "i",
                "bi bi-shield-check"
            ),

            makeElement(
                "span",
                "",
                "This demonstration record belongs to the current Teacher account. Activity History is read-only. No record has been changed."
            )

        );


        el.detailsBody.replaceChildren(
            section,
            reasonBlock,
            actorNotice
        );

    }


    // =====================================================
    // 13. OPEN ACTIVITY DETAILS
    // =====================================================

    function openDetails(activityId, trigger) {

        // Retrieve only the current Teacher's record.

        const record = getRecord(activityId);

        if (!record) {

            showMessage(
                "This activity record is unavailable or you are not authorized to view it.",
                "error"
            );

            return;

        }


        if (!modal) {

            showMessage(
                "The activity details modal is unavailable. Check the Bootstrap bundle.",
                "error"
            );

            return;

        }


        returnFocusId = activityId;

        renderDetails(record);

        modal.show();

    }


    // =====================================================
    // 14. TABLE CLICK EVENTS
    // =====================================================

    el.tableBody.addEventListener("click", event => {

        const button = event.target.closest(
            "[data-activity-action='details']"
        );

        if (!button || !el.tableBody.contains(button)) {
            return;
        }


        openDetails(
            button.dataset.activityId,
            button
        );

    });


    // =====================================================
    // 15. SEARCH SYNCHRONIZATION
    // =====================================================

    function syncSearch(source) {

        el.search.value = source.value;

        if (el.topbarSearch) {

            el.topbarSearch.value = source.value;

        }

        renderTable();

    }


    el.search.addEventListener("input", () => {

        syncSearch(el.search);

    });


    if (el.topbarSearch) {

        el.topbarSearch.addEventListener("input", () => {

            syncSearch(el.topbarSearch);

        });


        el.topbarSearch.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                el.topbarSearch.value = "";

                el.search.value = "";

                renderTable();

                el.topbarSearch.blur();

            }

        });

    }


    el.search.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            el.search.value = "";

            if (el.topbarSearch) {

                el.topbarSearch.value = "";

            }

            renderTable();

            el.search.blur();

        }

    });


    // =====================================================
    // 16. DATE FILTER EVENTS
    // =====================================================

    el.dateFrom.addEventListener(
        "change",
        renderTable
    );


    el.dateTo.addEventListener(
        "change",
        renderTable
    );


    // =====================================================
    // 17. CLEAR FILTERS
    // =====================================================

    el.clearFilters.addEventListener("click", () => {

        el.search.value = "";

        if (el.topbarSearch) {

            el.topbarSearch.value = "";

        }

        el.dateFrom.value = "";

        el.dateTo.value = "";

        hideMessage();

        renderTable();

    });


    // =====================================================
    // 18. MODAL FOCUS MANAGEMENT
    // =====================================================

    el.modal.addEventListener("hide.bs.modal", () => {

        if (el.modal.contains(document.activeElement)) {

            document.activeElement.blur();

        }

    });


    el.modal.addEventListener("hidden.bs.modal", () => {

        if (!returnFocusId) return;

        const target = Array.from(
            el.tableBody.querySelectorAll(
                "[data-activity-action='details']"
            )
        ).find(button => {

            return button.dataset.activityId === returnFocusId;

        });


        if (target && target.isConnected) {

            target.focus();

        }

        returnFocusId = null;

    });


    // =====================================================
    // 19. INITIALIZE PAGE
    // =====================================================

    renderTable();

    console.log(
        "F10.17 Activity History initialized: 8 fictional current-Teacher audit records. Other actors are excluded. Read-only mode."
    );

}

/* =====================================================
   F10.16.3 - TEACHER NOTIFICATIONS
   FRONTEND DEMONSTRATION ONLY
   RECIPIENT-SPECIFIC READ STATUS
   ===================================================== */

function initializeTeacherNotifications() {

    const $ = id => document.getElementById(id);

    const el = {
        total: $("teacherNotificationTotal"),
        unread: $("teacherNotificationUnread"),
        read: $("teacherNotificationRead"),
        events: $("teacherNotificationEvents"),
        list: $("teacherNotificationList"),
        search: $("teacherNotificationSearch"),
        topbarSearch: $("teacherNotificationTopbarSearch"),
        statusFilter: $("teacherNotificationStatusFilter"),
        clearFilters: $("teacherNotificationClearFilters"),
        recordCount: $("teacherNotificationRecordCount"),
        markAll: $("teacherNotificationMarkAll"),
        empty: $("teacherNotificationEmpty"),
        message: $("teacherNotificationMessage"),
        modal: $("teacherNotificationDetailsModal"),
        detailsTitle: $("teacherNotificationDetailsTitle"),
        detailsBody: $("teacherNotificationDetailsBody")
    };

    if (!el.list) return;

    const required = [
        "total", "unread", "read", "events", "search",
        "statusFilter", "clearFilters", "recordCount",
        "markAll", "empty", "message", "modal",
        "detailsTitle", "detailsBody"
    ];

    const missing = required.filter(key => !el[key]);

    if (missing.length) {
        console.error("F10.16 Notifications: Missing HTML elements:", missing);
        return;
    }

    // Demo identity only. The Backend must use the authenticated user.
    const CURRENT_RECIPIENT_ID = "TEACHER-DEMO-CURRENT";

    const notificationEvents = [
        { id: "NE-DEMO-001", sourceType: "ANNOUNCEMENT_VERSION", sourceReference: "ANN-2026-001-V2" },
        { id: "NE-DEMO-002", sourceType: "GUARDIAN_CONNECTION_REQUEST", sourceReference: "GR-2026-003" },
        { id: "NE-DEMO-003", sourceType: "SUBJECT_OFFERING", sourceReference: "OFFERING-DEMO-001" },
        { id: "NE-DEMO-004", sourceType: "TEACHER_INVITATION", sourceReference: "INVITATION-DEMO-001" },
        { id: "NE-DEMO-005", sourceType: "WORKSPACE_LIFECYCLE_REQUEST", sourceReference: "WDR-DEMO-002" }
    ];

    const notifications = [
        {
            id: "NOTIF-TEACHER-001", eventId: "NE-DEMO-001",
            recipient: CURRENT_RECIPIENT_ID,
            title: "School announcement published",
            body: "A school announcement has been published for its selected academic audiences. Please review the announcement in your authorized Teacher workspace.",
            category: "communication",
            relatedType: "ANNOUNCEMENT_VERSION",
            relatedReference: "ANN-2026-001-V2",
            createdAt: "2026-11-23T09:15:00+08:00",
            readAt: "", status: "unread"
        },
        {
            id: "NOTIF-TEACHER-002", eventId: "NE-DEMO-002",
            recipient: CURRENT_RECIPIENT_ID,
            title: "Guardian request referred",
            body: "A Guardian connection request has been referred for additional review by the authorized School Administrator or registrar.",
            category: "guardian",
            relatedType: "GUARDIAN_CONNECTION_REQUEST",
            relatedReference: "GR-2026-003",
            createdAt: "2026-11-23T10:30:00+08:00",
            readAt: "", status: "unread"
        },
        {
            id: "NOTIF-TEACHER-003", eventId: "NE-DEMO-003",
            recipient: CURRENT_RECIPIENT_ID,
            title: "Subject Offering updated",
            body: "A Subject Offering record has been updated. Review your authorized academic workspace for the latest information.",
            category: "academic",
            relatedType: "SUBJECT_OFFERING",
            relatedReference: "OFFERING-DEMO-001",
            createdAt: "2026-11-22T13:20:00+08:00",
            readAt: "2026-11-22T13:45:00+08:00",
            status: "read"
        },
        {
            id: "NOTIF-TEACHER-004", eventId: "NE-DEMO-004",
            recipient: CURRENT_RECIPIENT_ID,
            title: "Teacher invitation update",
            body: "A Teacher invitation status has changed. Review the relevant information through the authorized school workspace.",
            category: "teacher",
            relatedType: "TEACHER_INVITATION",
            relatedReference: "INVITATION-DEMO-001",
            createdAt: "2026-11-22T15:00:00+08:00",
            readAt: "", status: "unread"
        },
        {
            id: "NOTIF-TEACHER-005", eventId: "NE-DEMO-005",
            recipient: CURRENT_RECIPIENT_ID,
            title: "Teacher workspace update",
            body: "A school workspace update is available. Check the information provided through the authorized school channel.",
            category: "workspace",
            relatedType: "WORKSPACE_LIFECYCLE_REQUEST",
            relatedReference: "WDR-DEMO-002",
            createdAt: "2026-11-21T11:10:00+08:00",
            readAt: "2026-11-21T11:30:00+08:00",
            status: "read"
        },
        // Another recipient's record: deliberately excluded from this Teacher.
        {
            id: "NOTIF-OTHER-001", eventId: "NE-DEMO-001",
            recipient: "OTHER-TEACHER-DEMO",
            title: "School announcement published",
            body: "Sample notification belonging to another Teacher.",
            category: "communication",
            relatedType: "ANNOUNCEMENT_VERSION",
            relatedReference: "ANN-2026-001-V2",
            createdAt: "2026-11-23T09:15:00+08:00",
            readAt: "2026-11-23T09:30:00+08:00",
            status: "read"
        }
    ];

    const eventById = new Map(notificationEvents.map(item => [item.id, item]));
    let returnFocusId = null;

    const modal = window.bootstrap?.Modal
        ? window.bootstrap.Modal.getOrCreateInstance(el.modal)
        : null;

    if (!modal) {
        console.error("F10.16: Bootstrap Modal is unavailable.");
    }

    function node(tag, className = "", text = "") {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== "") element.textContent = text;
        return element;
    }

    function showMessage(message, type = "success") {
        el.message.textContent = message;
        el.message.className = "teacher-notification-message is-" + type;
        el.message.hidden = false;
    }

    function hideMessage() {
        el.message.textContent = "";
        el.message.hidden = true;
        el.message.className = "teacher-notification-message";
    }

    function formatDateTime(value) {
        if (!value) return "Not available";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "Not available";

        return new Intl.DateTimeFormat("en-PH", {
            year: "numeric", month: "short", day: "numeric",
            hour: "numeric", minute: "2-digit",
            hour12: true, timeZone: "Asia/Manila"
        }).format(date);
    }

    function ownNotifications() {
        return notifications.filter(item =>
            item.recipient === CURRENT_RECIPIENT_ID &&
            eventById.has(item.eventId)
        );
    }

    function getNotification(id) {
        return ownNotifications().find(item => item.id === id) || null;
    }

    function categoryLabel(category) {
        const labels = {
            workspace: "Workspace",
            communication: "Communication",
            guardian: "Guardian",
            teacher: "Teacher",
            academic: "Academic",
            system: "System"
        };
        return labels[category] || "General";
    }

    function categoryIcon(category) {
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

    function updateSummary() {
        const own = ownNotifications();
        const unreadCount = own.filter(item => item.status === "unread").length;
        const readCount = own.filter(item => item.status === "read").length;
        const eventCount = new Set(own.map(item => item.eventId)).size;

        el.total.textContent = String(own.length);
        el.unread.textContent = String(unreadCount);
        el.read.textContent = String(readCount);
        el.events.textContent = String(eventCount);
        el.markAll.disabled = unreadCount === 0;
    }

    function filteredNotifications() {
        const query = el.search.value.trim().toLowerCase();
        const status = el.statusFilter.value;

        return ownNotifications().filter(item => {
            const source = eventById.get(item.eventId);
            const searchable = [
                item.id, item.eventId, item.title, item.body,
                item.category, item.relatedType, item.relatedReference,
                source?.sourceType, source?.sourceReference
            ].join(" ").toLowerCase();

            return searchable.includes(query) &&
                (status === "all" || item.status === status);
        }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    function createCard(item) {
        const unread = item.status === "unread";
        const source = eventById.get(item.eventId);
        const card = node(
            "article",
            "teacher-notification-item " + (unread ? "unread" : "read")
        );

        const icon = node("div", "teacher-notification-icon");
        icon.appendChild(node("i", "bi " + categoryIcon(item.category)));

        const content = node("div", "teacher-notification-content");
        content.append(
            node("strong", "", item.title),
            node("p", "", item.body)
        );

        const meta = node("div", "teacher-notification-meta");
        meta.append(
            node("span", "", formatDateTime(item.createdAt)),
            node("span", "", "·"),
            node("span", "", categoryLabel(item.category))
        );

        const sourceText = node(
            "span",
            "teacher-notification-source",
            `Event: ${source.id} · ${item.relatedType}: ${item.relatedReference}`
        );

        const actions = node("div", "teacher-notification-actions");
        const detailsButton = node("button", "teacher-notification-action");
        detailsButton.type = "button";
        detailsButton.dataset.notificationAction = "details";
        detailsButton.dataset.notificationId = item.id;
        detailsButton.append(
            node("i", "bi bi-eye"),
            document.createTextNode(" View Details")
        );
        actions.appendChild(detailsButton);

        if (unread) {
            const readButton = node("button", "teacher-notification-action");
            readButton.type = "button";
            readButton.dataset.notificationAction = "read";
            readButton.dataset.notificationId = item.id;
            readButton.append(
                node("i", "bi bi-check2"),
                document.createTextNode(" Mark as Read")
            );
            actions.appendChild(readButton);
        }

        content.append(meta, sourceText, actions);

        const badge = node(
            "span",
            "teacher-notification-read-badge " + item.status
        );

        if (unread) {
            badge.appendChild(node("span", "teacher-notification-unread-dot"));
        } else {
            badge.appendChild(node("i", "bi bi-check-circle-fill"));
        }

        badge.appendChild(document.createTextNode(unread ? " Unread" : " Read"));
        card.append(icon, content, badge);

        return card;
    }

    function renderList() {
        const filtered = filteredNotifications();
        const fragment = document.createDocumentFragment();

        filtered.forEach(item => fragment.appendChild(createCard(item)));

        el.list.replaceChildren(fragment);
        el.empty.hidden = filtered.length > 0;
        el.recordCount.textContent =
            `${filtered.length} notification${filtered.length === 1 ? "" : "s"}`;

        updateSummary();
    }

    function addDetail(grid, label, value) {
        const item = node("div", "teacher-notification-detail-item");
        item.append(
            node("small", "", label),
            node("strong", "", value || "Not available")
        );
        grid.appendChild(item);
    }

    function renderDetails(item) {
        const source = eventById.get(item.eventId);
        if (!source) return;

        el.detailsTitle.textContent = "Notification Details";
        el.detailsBody.replaceChildren();

        const section = node("section", "teacher-notification-detail-section");
        section.appendChild(
            node("h4", "teacher-notification-detail-title", item.title)
        );

        const badge = node(
            "span",
            "teacher-notification-read-badge " + item.status
        );
        badge.append(
            node(
                "i",
                item.status === "read"
                    ? "bi bi-check-circle-fill"
                    : "bi bi-envelope-fill"
            ),
            document.createTextNode(item.status === "read" ? " Read" : " Unread")
        );
        section.appendChild(badge);

        const grid = node("div", "teacher-notification-detail-grid");
        addDetail(grid, "Notification ID", item.id);
        addDetail(grid, "Shared Event ID", item.eventId);
        addDetail(grid, "Recipient", item.recipient);
        addDetail(grid, "Category", categoryLabel(item.category));
        addDetail(grid, "Created At", formatDateTime(item.createdAt));
        addDetail(grid, "Read At", item.readAt ? formatDateTime(item.readAt) : "Not yet read");
        addDetail(grid, "Current Status", item.status === "read" ? "Read" : "Unread");
        section.appendChild(grid);

        const body = node("div", "teacher-notification-detail-body", item.body);
        const sourceInfo = node("div", "teacher-notification-source-info");
        sourceInfo.append(
            node("strong", "", "Related Source Record"),
            node("span", "", "Source Type: " + source.sourceType),
            node("br"),
            node("span", "", "Source Reference: " + source.sourceReference)
        );

        const explanation = node(
            "p",
            "text-secondary small mt-3 mb-0",
            "Read status belongs to this individual notification. It does not change the shared event or another recipient's notification."
        );

        el.detailsBody.append(section, body, sourceInfo, explanation);

        if (item.status === "unread") {
            const actions = node("div", "teacher-notification-actions mt-3");
            const button = node("button", "teacher-notification-action");
            button.type = "button";
            button.dataset.notificationAction = "read-details";
            button.dataset.notificationId = item.id;
            button.append(
                node("i", "bi bi-check2"),
                document.createTextNode(" Mark as Read")
            );
            actions.appendChild(button);
            el.detailsBody.appendChild(actions);
        }
    }

    function openDetails(id) {
        const item = getNotification(id);

        if (!item) {
            showMessage(
                "This notification is unavailable or you are not authorized to view it.",
                "error"
            );
            return;
        }

        if (!modal) {
            showMessage("The details modal is unavailable. Check Bootstrap.", "error");
            return;
        }

        returnFocusId = item.id;
        renderDetails(item);
        modal.show();
    }

    function markAsRead(id, fromModal = false) {
        const item = getNotification(id);
        if (!item || item.status === "read") return;

        item.status = "read";
        item.readAt = new Date().toISOString();
        renderList();

        if (fromModal) renderDetails(item);

        showMessage(
            "Your notification was marked as read. Other recipients' records were not changed.",
            "success"
        );

        if (!fromModal) {
            const target = Array.from(
                el.list.querySelectorAll("[data-notification-action='details']")
            ).find(button => button.dataset.notificationId === id);

            if (target) target.focus();
        }
    }

    function handleAction(event) {
        const button = event.target.closest("[data-notification-action]");
        if (!button) return;

        const action = button.dataset.notificationAction;
        const id = button.dataset.notificationId;

        if (action === "details") openDetails(id);
        if (action === "read") markAsRead(id);
        if (action === "read-details") markAsRead(id, true);
    }

    el.list.addEventListener("click", handleAction);
    el.detailsBody.addEventListener("click", handleAction);

    el.markAll.addEventListener("click", () => {
        const unread = ownNotifications().filter(item => item.status === "unread");

        if (!unread.length) {
            showMessage("You have no unread notifications.", "info");
            return;
        }

        const readAt = new Date().toISOString();

        unread.forEach(item => {
            item.status = "read";
            item.readAt = readAt;
        });

        renderList();

        if (returnFocusId) {
            const activeItem = getNotification(returnFocusId);
            if (activeItem) renderDetails(activeItem);
        }

        showMessage(
            `${unread.length} of your notifications were marked as read. Other recipients remain unchanged.`,
            "success"
        );
    });

    function syncSearch(source) {
        el.search.value = source.value;
        if (el.topbarSearch) el.topbarSearch.value = source.value;
        renderList();
    }

    el.search.addEventListener("input", () => syncSearch(el.search));

    if (el.topbarSearch) {
        el.topbarSearch.addEventListener("input", () => syncSearch(el.topbarSearch));
        el.topbarSearch.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                el.topbarSearch.value = "";
                el.search.value = "";
                renderList();
                el.topbarSearch.blur();
            }
        });
    }

    el.search.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            el.search.value = "";
            if (el.topbarSearch) el.topbarSearch.value = "";
            renderList();
            el.search.blur();
        }
    });

    el.statusFilter.addEventListener("change", renderList);

    el.clearFilters.addEventListener("click", () => {
        el.search.value = "";
        if (el.topbarSearch) el.topbarSearch.value = "";
        el.statusFilter.value = "all";
        renderList();
        hideMessage();
    });

    el.modal.addEventListener("hide.bs.modal", () => {
        if (el.modal.contains(document.activeElement)) {
            document.activeElement.blur();
        }
    });

    el.modal.addEventListener("hidden.bs.modal", () => {
        if (!returnFocusId) return;

        const target = Array.from(
            el.list.querySelectorAll("[data-notification-action='details']")
        ).find(button => button.dataset.notificationId === returnFocusId);

        if (target && target.isConnected) target.focus();
        returnFocusId = null;
    });

    renderList();

    console.log(
        "F10.16 Notifications initialized: 5 current-Teacher demo records; another recipient's record is excluded."
    );
}







/* =====================================================
   F10.18.3 - TEACHER EASYACCESS
   PERSONAL ACCESSIBILITY PREFERENCES
   FRONTEND DEMONSTRATION ONLY
   ===================================================== */


/* =====================================================
   1. DEFAULT PREFERENCES
   ===================================================== */

// These six fields correspond to the approved
// ACCESSIBILITY_PREFERENCES entity.

const TEACHER_EA_DEFAULTS = Object.freeze({

    font: "inter",
    text_size: "normal",
    colors: "standard",
    language: "en",
    tts_voice: "",
    speech_speed: 1,

    // Frontend-only settings.
    // These are not separate approved database fields.
    simplified: false,
    reduce_motion: false,
    speech_enabled: false

});


/* =====================================================
   2. USER-SCOPED STORAGE KEY
   ===================================================== */

function getTeacherEasyAccessStorageKey() {

    const userId =
        document.documentElement.dataset.userId ||
        document.body?.dataset.userId ||
        "demo-teacher";

    return `gabayAral.teacher.easyAccess.v1.${encodeURIComponent(userId)}`;

}


/* =====================================================
   3. LOAD AND VALIDATE SAVED PREFERENCES
   ===================================================== */

function readTeacherEasyAccessPreferences() {

    const defaults = { ...TEACHER_EA_DEFAULTS };

    try {

        const stored = localStorage.getItem(
            getTeacherEasyAccessStorageKey()
        );

        if (!stored) return defaults;

        const saved = JSON.parse(stored);

        if (
            !saved ||
            typeof saved !== "object" ||
            Array.isArray(saved)
        ) {
            return defaults;
        }

        const localOnly =
            saved.local_only &&
            typeof saved.local_only === "object"
                ? saved.local_only
                : {};

        const allowedFonts = [
            "inter",
            "arial",
            "verdana"
        ];

        const allowedSizes = [
            "normal",
            "large",
            "extra-large"
        ];

        const allowedColors = [
            "standard",
            "high-contrast"
        ];

        const allowedLanguages = [
            "en",
            "fil",
            "ceb",
            "ilo"
        ];

        const speed = Number(saved.speech_speed);

        return {

            font: allowedFonts.includes(saved.font)
                ? saved.font
                : defaults.font,

            text_size: allowedSizes.includes(saved.text_size)
                ? saved.text_size
                : defaults.text_size,

            colors: allowedColors.includes(saved.colors)
                ? saved.colors
                : defaults.colors,

            language: allowedLanguages.includes(saved.language)
                ? saved.language
                : defaults.language,

            tts_voice: typeof saved.tts_voice === "string"
                ? saved.tts_voice
                : defaults.tts_voice,

            speech_speed: Number.isFinite(speed)
                ? Math.min(2, Math.max(0.5, speed))
                : defaults.speech_speed,

            simplified: localOnly.simplified === true,

            reduce_motion: localOnly.reduce_motion === true,

            speech_enabled: localOnly.speech_enabled === true

        };

    } catch (error) {

        console.warn(
            "Teacher EasyAccess preferences could not be read.",
            error
        );

        return defaults;

    }

}





/* =====================================================
   F10.18.4 - PROPER TEXT SIZE SCALING
   Scale text without scaling card backgrounds.
   ===================================================== */

function applyTeacherTextSizeScale(scale) {

    const roots = [
        document.querySelector(".teacher-app"),
        ...document.querySelectorAll(".teacher-app ~ .modal")
    ].filter(Boolean);

    const excluded = [
        "i",
        "svg",
        "path",
        "img",
        "script",
        "style",
        "link",
        "meta",
        "br",
        "hr",
        "canvas",
        "video",
        "audio"
    ].join(",");

    function hasDirectText(element) {

        return Array.from(element.childNodes).some(node =>
            node.nodeType === Node.TEXT_NODE &&
            node.textContent.trim().length > 0
        );

    }

    function isTextElement(element) {

        if (!(element instanceof HTMLElement)) {
            return false;
        }

        if (element.matches(excluded)) {
            return false;
        }

        return (
            hasDirectText(element) ||
            element.matches("input, select, textarea")
        );

    }

    function prepareElement(element) {

        if (!isTextElement(element)) return;

        // Capture the original size only once.
        if (!element.hasAttribute("data-ea-base-font-size")) {

            let baseSize = parseFloat(
                window.getComputedStyle(element).fontSize
            );

            // Preserve inherited font sizes from an already
            // prepared parent element.
            const parent = element.parentElement;

            if (parent &&
                parent.hasAttribute("data-ea-base-font-size")) {

                const parentCurrent = parseFloat(
                    window.getComputedStyle(parent).fontSize
                );

                const parentBase = parseFloat(
                    parent.dataset.eaBaseFontSize
                );

                if (
                    Number.isFinite(parentCurrent) &&
                    Number.isFinite(parentBase) &&
                    Math.abs(baseSize - parentCurrent) < 0.5
                ) {

                    baseSize = parentBase;

                }

            }

            element.dataset.eaBaseFontSize =
                String(baseSize);

        }

        const originalSize = parseFloat(
            element.dataset.eaBaseFontSize
        );

        if (!Number.isFinite(originalSize)) return;

        const newSize = originalSize * scale;

        element.style.setProperty(
            "font-size",
            `${newSize.toFixed(2)}px`,
            "important"
        );

    }

    roots.forEach(root => {

        const elements = [
            root,
            ...root.querySelectorAll("*")
        ];

        // Prepare all original sizes before scaling.
        elements.forEach(element => {

            if (!element.hasAttribute("data-ea-base-font-size") &&
                isTextElement(element)) {

                const parent = element.parentElement;

                let baseSize = parseFloat(
                    window.getComputedStyle(element).fontSize
                );

                if (
                    parent &&
                    parent.hasAttribute("data-ea-base-font-size")
                ) {

                    const parentCurrent = parseFloat(
                        window.getComputedStyle(parent).fontSize
                    );

                    const parentBase = parseFloat(
                        parent.dataset.eaBaseFontSize
                    );

                    if (
                        Number.isFinite(parentCurrent) &&
                        Number.isFinite(parentBase) &&
                        Math.abs(baseSize - parentCurrent) < 0.5
                    ) {

                        baseSize = parentBase;

                    }

                }

                element.dataset.eaBaseFontSize =
                    String(baseSize);

            }

        });

        // Apply the selected scale without compounding.
        elements.forEach(prepareElement);


        // Support dynamically generated table rows,
        // notifications and other page content.
        if (root.dataset.eaTextObserverAttached !== "true") {

            const observer = new MutationObserver(mutations => {

                const added = new Set();

                mutations.forEach(mutation => {

                    mutation.addedNodes.forEach(node => {

                        if (node.nodeType === Node.ELEMENT_NODE) {

                            added.add(node);

                            node.querySelectorAll("*").forEach(child => {
                                added.add(child);
                            });

                        } else if (
                            node.nodeType === Node.TEXT_NODE
                        ) {

                            added.add(mutation.target);

                        }

                    });

                });

                // Capture original sizes before applying scaling.
                const candidates = Array.from(added).filter(
                    isTextElement
                );

                candidates.forEach(element => {

                    if (
                        !element.hasAttribute("data-ea-base-font-size")
                    ) {

                        const parent = element.parentElement;

                        let baseSize = parseFloat(
                            window.getComputedStyle(element).fontSize
                        );

                        if (
                            parent &&
                            parent.hasAttribute("data-ea-base-font-size")
                        ) {

                            const parentCurrent = parseFloat(
                                window.getComputedStyle(parent).fontSize
                            );

                            const parentBase = parseFloat(
                                parent.dataset.eaBaseFontSize
                            );

                            if (
                                Number.isFinite(parentCurrent) &&
                                Number.isFinite(parentBase) &&
                                Math.abs(baseSize - parentCurrent) < 0.5
                            ) {

                                baseSize = parentBase;

                            }

                        }

                        element.dataset.eaBaseFontSize =
                            String(baseSize);

                    }

                });

                candidates.forEach(prepareElement);

            });

            observer.observe(root, {
                childList: true,
                subtree: true
            });

            root.dataset.eaTextObserverAttached = "true";

        }

    });

}







/* =====================================================
   4. APPLY PREFERENCES GLOBALLY
   ===================================================== */

function applyTeacherEasyAccessPreferences(preferences) {

    const root = document.documentElement;

    root.dataset.eaFontFamily = preferences.font;

    root.dataset.eaFont = preferences.text_size;

    root.dataset.eaContrast =
        preferences.colors === "high-contrast"
            ? "high"
            : "standard";

    root.dataset.eaSimplified =
        String(preferences.simplified);

    root.dataset.eaMotion =
        preferences.reduce_motion
            ? "reduced"
            : "standard";


    const textScale = {
    normal: 1,
    large: 1.15,
    "extra-large": 1.30
};

applyTeacherTextSizeScale(
    textScale[preferences.text_size] || 1
);



}


/* =====================================================
   5. GLOBAL EASYACCESS INITIALIZATION
   Runs on every Teacher page.
   ===================================================== */

function initializeGlobalTeacherEasyAccessPreferences() {

    const preferences =
        readTeacherEasyAccessPreferences();

    applyTeacherEasyAccessPreferences(preferences);

}


/* =====================================================
   6. EASYACCESS PAGE INITIALIZATION
   ===================================================== */

function initializeTeacherEasyAccess() {

    const $ = id => document.getElementById(id);

    const el = {

        font: $("teacherEaFontFamily"),

        textSizeRadios: document.querySelectorAll(
            'input[name="teacherEaTextSize"]'
        ),

        highContrast: $("teacherEaHighContrast"),

        simplified: $("teacherEaSimplified"),

        reduceMotion: $("teacherEaReduceMotion"),

        language: $("teacherEaLanguage"),

        speechEnabled: $("teacherEaSpeechEnabled"),

        voice: $("teacherEaTtsVoice"),

        speed: $("teacherEaSpeechSpeed"),

        speedValue: $("teacherEaSpeechSpeedValue"),

        voiceStatus: $("teacherEaVoiceStatus"),

        speechStatus: $("teacherEaSpeechStatus"),

        readButton: $("teacherEaReadPreview"),

        stopButton: $("teacherEaStopPreview"),

        saveButton: $("teacherEaSaveButton"),

        resetButton: $("teacherEaResetButton"),

        saveMessage: $("teacherEaSaveMessage"),

        globalMessage: $("teacherEasyAccessMessage"),

        topbarSearch: $("teacherEasyAccessTopbarSearch")

    };


    // Run only on easyaccess.html.

    if (!el.saveButton) return;


    const required = [

        "font",
        "highContrast",
        "simplified",
        "reduceMotion",
        "language",
        "speechEnabled",
        "voice",
        "speed",
        "speedValue",
        "voiceStatus",
        "speechStatus",
        "readButton",
        "stopButton",
        "resetButton",
        "saveMessage",
        "globalMessage"

    ];

    const missing = required.filter(key => !el[key]);

    if (missing.length || !el.textSizeRadios.length) {

        console.error(
            "F10.18 EasyAccess: Missing HTML controls:",
            missing
        );

        return;

    }


    // =====================================================
    // 7. SPEECH SUPPORT
    // =====================================================

    const speechSupported =

        "speechSynthesis" in window &&

        typeof window.SpeechSynthesisUtterance === "function";


    let availableVoices = [];


    // =====================================================
    // 8. MESSAGE HELPERS
    // =====================================================

    function showSaveMessage(message, isError = false) {

        el.saveMessage.textContent = message;

        el.saveMessage.className =
            "teacher-ea-save-message" +
            (isError ? " is-error" : "");

        el.saveMessage.hidden = false;

    }


    function showGlobalMessage(message, isError = false) {

        el.globalMessage.textContent = message;

        el.globalMessage.className =
            "teacher-ea-global-message" +
            (isError ? " is-error" : "");

        el.globalMessage.hidden = false;

    }


    function hideGlobalMessage() {

        el.globalMessage.textContent = "";

        el.globalMessage.hidden = true;

        el.globalMessage.className =
            "teacher-ea-global-message";

    }


    // =====================================================
    // 9. COLLECT PREFERENCES
    // =====================================================

    function selectedTextSize() {

        const selected = document.querySelector(
            'input[name="teacherEaTextSize"]:checked'
        );

        return selected
            ? selected.value
            : TEACHER_EA_DEFAULTS.text_size;

    }


    function collectPreferences() {

        return {

            // Approved database fields.

            font: el.font.value,

            text_size: selectedTextSize(),

            colors: el.highContrast.checked
                ? "high-contrast"
                : "standard",

            language: el.language.value,

            tts_voice: el.voice.value,

            speech_speed: Number(el.speed.value),


            // Frontend-only preferences.

            simplified: el.simplified.checked,

            reduce_motion: el.reduceMotion.checked,

            speech_enabled:
                speechSupported && el.speechEnabled.checked

        };

    }


    // =====================================================
    // 10. POPULATE SETTINGS CONTROLS
    // =====================================================

    function populateControls(preferences) {

        el.font.value = preferences.font;


        el.textSizeRadios.forEach(radio => {

            radio.checked =
                radio.value === preferences.text_size;

        });


        el.highContrast.checked =
            preferences.colors === "high-contrast";


        el.simplified.checked =
            preferences.simplified;


        el.reduceMotion.checked =
            preferences.reduce_motion;


        el.language.value =
            preferences.language;


        el.speechEnabled.checked =
            preferences.speech_enabled;


        el.voice.value =
            preferences.tts_voice;


        el.speed.value =
            String(preferences.speech_speed);


        updateSpeedLabel();

    }


    // =====================================================
    // 11. SPEECH SPEED LABEL
    // =====================================================

    function updateSpeedLabel() {

        el.speedValue.textContent =
            `${Number(el.speed.value).toFixed(1)}x`;

    }


    // =====================================================
    // 12. SPEECH STATUS
    // =====================================================

    function updateSpeechStatus(message, type = "") {

        if (message) {

            el.speechStatus.textContent = message;

        } else if (!speechSupported) {

            el.speechStatus.textContent =
                "Text-to-speech is not supported by this browser or device.";

            type = "is-warning";

        } else if (el.speechEnabled.checked) {

            el.speechStatus.textContent =
                "Text-to-speech is enabled. Use Play Reading Preview to test your device voice.";

            type = "is-enabled";

        } else {

            el.speechStatus.textContent =
                "Text-to-speech is currently disabled.";

        }


        el.speechStatus.className =
            "teacher-ea-speech-status" +
            (type ? ` ${type}` : "");

    }


    // =====================================================
    // 13. STOP SPEECH
    // =====================================================

    function stopSpeech() {

        if (speechSupported) {

            window.speechSynthesis.cancel();

        }

    }


    // =====================================================
    // 14. LOAD AVAILABLE DEVICE VOICES
    // =====================================================

    function loadVoices(preferredVoice) {

        if (!speechSupported) {

            el.voice.disabled = true;

            el.speechEnabled.disabled = true;

            el.readButton.disabled = true;

            el.stopButton.disabled = true;

            el.voiceStatus.textContent =
                "Your browser or device does not provide speech synthesis.";

            updateSpeechStatus();

            return;

        }


        availableVoices =
            window.speechSynthesis.getVoices();


        const savedVoice = preferredVoice !== undefined
            ? preferredVoice
            : (
                el.voice.value ||
                readTeacherEasyAccessPreferences().tts_voice
            );


        el.voice.replaceChildren();


        const defaultOption =
            document.createElement("option");

        defaultOption.value = "";

        defaultOption.textContent =
            "Default Device Voice";

        el.voice.appendChild(defaultOption);


        availableVoices

            .slice()

            .sort((a, b) => {

                const languageCompare =
                    a.lang.localeCompare(b.lang);

                return languageCompare ||
                    a.name.localeCompare(b.name);

            })

            .forEach(voice => {

                const option =
                    document.createElement("option");

                option.value = voice.voiceURI;

                option.textContent =
                    `${voice.name} (${voice.lang})`;

                el.voice.appendChild(option);

            });


        const savedVoiceExists =
            availableVoices.some(voice => {

                return voice.voiceURI === savedVoice;

            });


        el.voice.value =
            savedVoiceExists ? savedVoice : "";


        el.voiceStatus.textContent =
            availableVoices.length

                ? `${availableVoices.length} device voice(s) available. Voice availability depends on your browser and device.`

                : "No named device voices are currently listed. The browser default voice may still be available.";


        el.voice.disabled = false;

        el.speechEnabled.disabled = false;

        el.readButton.disabled = false;

        el.stopButton.disabled = false;


        updateSpeechStatus();

    }


    // =====================================================
    // 15. LIVE PREVIEW
    // =====================================================

    function applyCurrentControls() {

        const preferences = collectPreferences();

        applyTeacherEasyAccessPreferences(preferences);

        updateSpeedLabel();

        updateSpeechStatus();

    }


    // =====================================================
    // 16. LOAD INITIAL PREFERENCES
    // =====================================================

    const savedPreferences =
        readTeacherEasyAccessPreferences();


    populateControls(savedPreferences);

    applyTeacherEasyAccessPreferences(savedPreferences);

    loadVoices();


    // Load voices when the browser finishes providing them.

    if (speechSupported) {

        if (
            typeof window.speechSynthesis.addEventListener === "function"
        ) {

            window.speechSynthesis.addEventListener(
                "voiceschanged",
                () => loadVoices()
            );

        } else {

            window.speechSynthesis.onvoiceschanged =
                () => loadVoices();

        }

    }


    // =====================================================
    // 17. LIVE SETTING CHANGES
    // =====================================================

    [

        el.font,
        el.highContrast,
        el.simplified,
        el.reduceMotion,
        el.language,
        el.speechEnabled,
        el.voice

    ].forEach(control => {

        control.addEventListener(
            "change",
            applyCurrentControls
        );

    });


    el.textSizeRadios.forEach(radio => {

        radio.addEventListener(
            "change",
            applyCurrentControls
        );

    });


    el.speed.addEventListener("input", () => {

        updateSpeedLabel();

    });


    el.speed.addEventListener(
        "change",
        applyCurrentControls
    );


    // =====================================================
    // 18. SAVE PREFERENCES
    // =====================================================

    el.saveButton.addEventListener("click", () => {

        const preferences = collectPreferences();


        const storedPreferences = {

            // ACCESSIBILITY_PREFERENCES fields.

            font: preferences.font,

            text_size: preferences.text_size,

            colors: preferences.colors,

            language: preferences.language,

            tts_voice: preferences.tts_voice,

            speech_speed: preferences.speech_speed,


            // Local-only prototype settings.

            local_only: {

                simplified: preferences.simplified,

                reduce_motion: preferences.reduce_motion,

                speech_enabled: preferences.speech_enabled

            }

        };


        try {

            localStorage.setItem(

                getTeacherEasyAccessStorageKey(),

                JSON.stringify(storedPreferences)

            );


            applyTeacherEasyAccessPreferences(preferences);

            updateSpeechStatus();


            showSaveMessage(
                "Your accessibility preferences have been saved in this browser for the current demonstration account."
            );


        } catch (error) {

            console.error(
                "Teacher EasyAccess preferences could not be saved.",
                error
            );

            showSaveMessage(
                "The browser could not save your preferences. Check browser storage settings.",
                true
            );

        }

    });


    // =====================================================
    // 19. RESTORE DEFAULTS
    // =====================================================

    el.resetButton.addEventListener("click", () => {

        stopSpeech();

        let storageCleared = true;


        try {

            localStorage.removeItem(
                getTeacherEasyAccessStorageKey()
            );

        } catch (error) {

            storageCleared = false;

            console.error(
                "Teacher EasyAccess defaults could not be restored.",
                error
            );

        }


        populateControls(TEACHER_EA_DEFAULTS);

        applyTeacherEasyAccessPreferences(
            TEACHER_EA_DEFAULTS
        );

        updateSpeechStatus();

        loadVoices("");


        if (storageCleared) {

            showSaveMessage(
                "Default accessibility preferences restored."
            );

        } else {

            showSaveMessage(
                "Defaults are displayed, but browser storage could not be cleared.",
                true
            );

        }

    });


    // =====================================================
    // 20. TEXT-TO-SPEECH READING PREVIEW
    // =====================================================

    el.readButton.addEventListener("click", () => {


        if (!el.speechEnabled.checked) {

            updateSpeechStatus(
                "Turn on Enable Text-to-Speech before playing the preview.",
                "is-warning"
            );

            return;

        }


        if (!speechSupported) {

            updateSpeechStatus(
                "Text-to-speech is not supported by this browser or device.",
                "is-warning"
            );

            return;

        }


        try {

            stopSpeech();


            const utterance =
                new window.SpeechSynthesisUtterance(

                    "Welcome to GabayAral EasyAccess. " +
                    "This is a reading preview of your personal accessibility preferences."

                );


            const selectedVoice =
                availableVoices.find(voice => {

                    return voice.voiceURI === el.voice.value;

                });


            const languageLocales = {

                en: "en-US",

                fil: "fil-PH",

                ceb: "ceb-PH",

                ilo: "ilo-PH"

            };


            if (selectedVoice) {

                utterance.voice = selectedVoice;

                utterance.lang = selectedVoice.lang;

            } else {

                utterance.lang =
                    languageLocales[el.language.value] || "en-US";

            }


            utterance.rate =
                Number(el.speed.value);


            utterance.onstart = () => {

                updateSpeechStatus(
                    "Reading preview is playing.",
                    "is-enabled"
                );

            };


            utterance.onend = () => {

                updateSpeechStatus(
                    "Reading preview finished.",
                    "is-enabled"
                );

            };


            
                utterance.onerror = event => {

                    // These are expected when speech is intentionally stopped
                    // or replaced by another reading preview.

                    if (
                        event.error === "interrupted" ||
                        event.error === "canceled"
                    ) {
                        return;
                    }

                    // Only report unexpected speech errors.
                    console.error(
                        "Teacher EasyAccess speech preview error:",
                        event.error
                    );

                    updateSpeechStatus(
                        "The reading preview could not be completed. Please try again.",
                        "is-warning"
                    );

                };



            window.speechSynthesis.speak(utterance);


        } catch (error) {

            console.error(
                "Teacher EasyAccess speech preview failed.",
                error
            );

            updateSpeechStatus(
                "The reading preview could not be started.",
                "is-warning"
            );

        }

    });


    // =====================================================
    // 21. STOP READING PREVIEW
    // =====================================================

    el.stopButton.addEventListener("click", () => {

        stopSpeech();

        updateSpeechStatus(
            "Reading preview stopped."
        );

    });


    // =====================================================
    // 22. EASYACCESS TOPBAR SEARCH
    // =====================================================

    if (el.topbarSearch) {

        const searchableCards = Array.from(

            document.querySelectorAll(
                "[data-ea-searchable]"
            )

        );


        el.topbarSearch.addEventListener("input", () => {

            const query =
                el.topbarSearch.value.trim().toLowerCase();

            let visibleCount = 0;


            searchableCards.forEach(card => {

                const searchableText = (

                    card.dataset.eaSearchable +
                    " " +
                    card.textContent

                ).toLowerCase();


                const matches =
                    !query || searchableText.includes(query);


                card.hidden = !matches;


                if (matches) {

                    visibleCount++;

                }

            });


            if (query && visibleCount === 0) {

                showGlobalMessage(
                    "No accessibility settings matched your search."
                );

            } else {

                hideGlobalMessage();

            }

        });


        el.topbarSearch.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                el.topbarSearch.value = "";

                searchableCards.forEach(card => {

                    card.hidden = false;

                });

                hideGlobalMessage();

                el.topbarSearch.blur();

            }

        });

    }


    // =====================================================
    // 23. STOP SPEECH WHEN LEAVING THE PAGE
    // =====================================================

    window.addEventListener(
        "pagehide",
        stopSpeech,
        { once: true }
    );


    // =====================================================
    // 24. INITIALIZATION MESSAGE
    // =====================================================

    console.log(
        "F10.18 Teacher EasyAccess initialized. Browser preferences only; Backend persistence is pending."
    );

}
