/* =====================================================
   GABAYARAL - STUDENT WORKSPACE
   F11.2-F11.13 - SHARED STUDENT WORKSPACE JAVASCRIPT
   FRONTEND DEMONSTRATION ONLY
   ===================================================== */

"use strict";


document.addEventListener("DOMContentLoaded", () => {
    initializeStudentGlobalEasyAccessPreferences();
    initializeStudentDashboard();
    initializeStudentProfileMenu();
    initializeStudentDemoLinks();
    initializeStudentPageSearch();
    initializeStudentOfferingsPage();
    initializeStudentMyTasksPage();
    initializeStudentModulePages();

    console.log("GabayAral Student Workspace initialized.");
});

/* =====================================================
   F11.2.1 - DASHBOARD DATE AND FOOTER
===================================================== */

function initializeStudentDashboard() {
    const dateElement = document.getElementById("studentCurrentDate");
    const yearElement = document.getElementById("studentFooterYear");
    const today = new Date();

    if (dateElement) {
        dateElement.textContent = today.toLocaleDateString("en-PH", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    if (yearElement) {
        yearElement.textContent = today.getFullYear();
    }
}

/* =====================================================
   F11.2.2 - STUDENT PROFILE MENU
===================================================== */

function initializeStudentProfileMenu() {
    const wrapper = document.getElementById("studentProfileWrapper");
    const button = document.getElementById("studentProfileButton");
    const menu = document.getElementById("studentProfileMenu");

    if (!wrapper || !button || !menu) {
        return;
    }

    function closeMenu() {
        menu.hidden = true;
        button.setAttribute("aria-expanded", "false");
    }

    button.addEventListener("click", () => {
        const willOpen = menu.hidden;
        menu.hidden = !willOpen;
        button.setAttribute("aria-expanded", String(willOpen));
    });

    document.addEventListener("click", (event) => {
        if (!wrapper.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !menu.hidden) {
            closeMenu();
            button.focus();
        }
    });
}

/* =====================================================
   F11.2.3 - DEMO-ONLY PLACEHOLDER NAVIGATION
   Capture phase prevents the shared layout script from
   marking an unimplemented placeholder as the active page.
===================================================== */

function initializeStudentDemoLinks() {
    document.addEventListener("click", (event) => {
        const link = event.target.closest("[data-demo-link]");

        if (!link) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const featureName = link.getAttribute("data-demo-link") || "This feature";

        window.alert(
            featureName +
            " is part of the approved Student Workspace plan and will be implemented in its own checkpoint.\n\nThis is a demonstration placeholder only."
        );
    }, true);
}

/* =====================================================
   F11.2.4 - DASHBOARD SEARCH
===================================================== */


/* =====================================================
   F11.2.4 - STUDENT PAGE SEARCH
===================================================== */

function initializeStudentPageSearch() {
    const searchInput = document.getElementById("studentPageSearch");
    const emptyState = document.getElementById("studentSearchEmpty");

    if (!searchInput || document.getElementById("studentActivitiesList")) {
        return;
    }

    function filterStudentPage() {
        const query = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        // Query dynamically so newly rendered Offering cards
        // are included without adding another event listener.
        const searchableItems = document.querySelectorAll(
            ".student-content .student-searchable"
        );

        searchableItems.forEach((item) => {
            const searchableText = item.textContent
                .toLowerCase()
                .replace(/\s+/g, " ")
                .trim();

            const matches = searchableText.includes(query);

            item.hidden = query !== "" && !matches;

            if (!item.hidden) {
                visibleCount += 1;
            }
        });

        if (emptyState) {
            emptyState.hidden = query === "" || visibleCount > 0;
        }
    }

    searchInput.addEventListener("input", filterStudentPage);

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            searchInput.value = "";
            filterStudentPage();
            searchInput.blur();
        }
    });
}







/* =====================================================
   F11.3 - MY SUBJECT OFFERINGS AND DEMO JOIN FLOW
   DEMO-ONLY: no real enrollment or persistence.
===================================================== */

function initializeStudentOfferingsPage() {
    const form = document.getElementById("studentJoinOfferingForm");
    const codeInput = document.getElementById("studentJoinOfferingCode");
    const feedback = document.getElementById("studentJoinFeedback");
    const offeringsList = document.getElementById("studentEnrolledOfferings");
    const loadingMessage = document.getElementById("studentOfferingsLoading");
    const emptyMessage = document.getElementById("studentOfferingsEmpty");
    const countElement = document.getElementById("studentEnrolledOfferingsCount");
    const recordCountElement = document.getElementById("studentOfferingRecordCount");

    // Run only on the My Subject Offerings page.
    if (!form || !codeInput || !feedback || !offeringsList) {
        return;
    }

    // Fictional sample enrollments.
    const enrolledOfferings = [
        {
            id: "demo-enrollment-math-7-samp",
            subject: "Mathematics",
            grade: "Grade 7",
            section: "Sampaguita",
            icon: "bi-calculator-fill",
            tone: "blue"
        },
        {
            id: "demo-enrollment-eng-7-samp",
            subject: "English",
            grade: "Grade 7",
            section: "Sampaguita",
            icon: "bi-book-fill",
            tone: "teal"
        },
        {
            id: "demo-enrollment-sci-7-samp",
            subject: "Science",
            grade: "Grade 7",
            section: "Sampaguita",
            icon: "bi-flask-fill",
            tone: "purple"
        }
    ];

    // One fictional code points to one exact demo Offering.
    const availableDemoOfferings = [
        {
            id: "demo-offering-fil-7-samp",
            code: "DEMO-FIL-7-SAM",
            subject: "Filipino",
            grade: "Grade 7",
            section: "Sampaguita",
            icon: "bi-translate",
            tone: "amber"
        }
    ];

    /* CREATE OFFERING CARD */

    function createOfferingCard(offering) {
        const card = document.createElement("article");
        card.className = "student-offering-card student-searchable";

        const iconWrap = document.createElement("span");
        iconWrap.className = "student-subject-icon " + offering.tone;
        iconWrap.setAttribute("aria-hidden", "true");

        const icon = document.createElement("i");
        icon.className = "bi " + offering.icon;
        iconWrap.appendChild(icon);

        const details = document.createElement("div");
        details.className = "student-offering-card-details";

        const subject = document.createElement("strong");
        subject.textContent = offering.subject;

        const placement = document.createElement("span");
        placement.textContent = offering.grade + " - " + offering.section;

        const description = document.createElement("small");
        description.textContent = "Subject Offering enrollment";

        details.append(subject, placement, description);

        const status = document.createElement("span");
        status.className = "student-status active";
        status.textContent = "Active";

        card.append(iconWrap, details, status);

        return card;
    }

    /* RENDER ENROLLED OFFERINGS */

    function renderEnrolledOfferings() {
        offeringsList.replaceChildren();

        enrolledOfferings.forEach((offering) => {
            offeringsList.appendChild(createOfferingCard(offering));
        });

        if (loadingMessage) {
            loadingMessage.hidden = true;
        }

        if (emptyMessage) {
            emptyMessage.hidden = enrolledOfferings.length > 0;
        }

        if (countElement) {
            countElement.textContent = String(
                enrolledOfferings.length
            ).padStart(2, "0");
        }

        if (recordCountElement) {
            const label = enrolledOfferings.length === 1
                ? " offering"
                : " offerings";

            recordCountElement.textContent =
                enrolledOfferings.length + label;
        }
    }

    /* JOIN FEEDBACK */

    function showJoinFeedback(message, state) {
        feedback.textContent = message;
        feedback.className = "student-join-feedback " + state;
        feedback.hidden = false;
    }

    /* CLEAR FEEDBACK WHEN STUDENT EDITS CODE */

    codeInput.addEventListener("input", () => {
        codeInput.removeAttribute("aria-invalid");
        feedback.hidden = true;
        feedback.textContent = "";
    });

    /* SUBMIT JOIN CODE */

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const enteredCode = codeInput.value.trim().toUpperCase();

        // EMPTY CODE
        if (!enteredCode) {
            codeInput.setAttribute("aria-invalid", "true");

            showJoinFeedback(
                "Enter a Student Join Code before continuing.",
                "error"
            );

            codeInput.focus();
            return;
        }

        // FIND EXACT DEMONSTRATION OFFERING
        const matchingOffering = availableDemoOfferings.find(
            (offering) => offering.code === enteredCode
        );

        // INVALID CODE
        if (!matchingOffering) {
            codeInput.setAttribute("aria-invalid", "true");

            showJoinFeedback(
                "No matching demonstration Subject Offering was found. Check the code and try again.",
                "error"
            );

            codeInput.focus();
            return;
        }

        // PREVENT DUPLICATE ACTIVE ENROLLMENT
        const alreadyEnrolled = enrolledOfferings.some(
            (offering) => offering.id === matchingOffering.id
        );

        if (alreadyEnrolled) {
            codeInput.setAttribute("aria-invalid", "false");

            showJoinFeedback(
                "You are already enrolled in this Subject Offering. No duplicate enrollment was added.",
                "info"
            );

            return;
        }

        // ADD EXACT OFFERING TO DEMONSTRATION LIST
        enrolledOfferings.push({
            id: matchingOffering.id,
            subject: matchingOffering.subject,
            grade: matchingOffering.grade,
            section: matchingOffering.section,
            icon: matchingOffering.icon,
            tone: matchingOffering.tone
        });

        // UPDATE DISPLAY AND COUNTS
        renderEnrolledOfferings();

        codeInput.value = "";
        codeInput.removeAttribute("aria-invalid");

        showJoinFeedback(
            matchingOffering.subject + " - " +
            matchingOffering.grade + " " +
            matchingOffering.section +
            " was added to your demonstration enrollment list. " +
            "This change is temporary and will reset when the page is refreshed.",
            "success"
        );

        // Clear active search so the new Offering is visible.
        const searchInput = document.getElementById("studentPageSearch");

        if (searchInput && searchInput.value) {
            searchInput.value = "";

            searchInput.dispatchEvent(
                new Event("input", { bubbles: true })
            );
        }
    });

    // INITIAL PAGE RENDER
    renderEnrolledOfferings();

    console.log(
        "Student My Subject Offerings initialized. Demo enrollments:",
        enrolledOfferings.length
    );
}

/* =====================================================
   F11.4 - MYTASKS CHECKLIST
   DEMO-ONLY: no database writes or real submissions.
===================================================== */

function initializeStudentMyTasksPage() {
    const taskList = document.getElementById("studentMyTasksList");
    const searchInput = document.getElementById("studentMyTasksSearch");
    const statusFilter = document.getElementById("studentTaskStatusFilter");
    const subjectFilter = document.getElementById("studentTaskSubjectFilter");
    const sortSelect = document.getElementById("studentTaskSort");
    const emptyState = document.getElementById("studentMyTasksEmpty");
    const recordCount = document.getElementById("studentMyTasksRecordCount");

    if (!taskList || !searchInput || !statusFilter || !subjectFilter || !sortSelect || !emptyState) return;

    const tasks = [
        {id:"demo-task-math-worksheet-3",title:"Mathematics Worksheet 3",subject:"Mathematics",offering:"Grade 7 - Sampaguita",submissionState:"not_submitted",dueDate:"2026-11-29",submittedDate:null},
        {id:"demo-task-english-reading-reflection",title:"Reading Reflection",subject:"English",offering:"Grade 7 - Sampaguita",submissionState:"not_submitted",dueDate:"2026-12-01",submittedDate:null},
        {id:"demo-task-filipino-vocabulary",title:"Filipino Vocabulary Practice",subject:"Filipino",offering:"Grade 7 - Sampaguita",submissionState:"not_submitted",dueDate:"2026-11-26",submittedDate:null},
        {id:"demo-task-science-activity-sheet",title:"Science Activity Sheet",subject:"Science",offering:"Grade 7 - Sampaguita",submissionState:"revision_required",dueDate:"2026-11-24",submittedDate:"2026-11-23",revisionDueDate:"2026-11-30"},
        {id:"demo-task-ap-source-analysis",title:"AP Source Analysis",subject:"Araling Panlipunan",offering:"Grade 7 - Sampaguita",submissionState:"submitted",dueDate:"2026-11-27",submittedDate:"2026-11-25",revisionDueDate:null}
    ];

    function localDateString(date) {
        return [date.getFullYear(), String(date.getMonth()+1).padStart(2,"0"), String(date.getDate()).padStart(2,"0")].join("-");
    }
    function statusOf(task) {
        if (task.submissionState === "revision_required") return "revision_required";
        if (task.submissionState === "submitted") return "submitted";
        return task.dueDate < localDateString(new Date()) ? "overdue" : "pending";
    }
    function deadlineOf(task) { return task.revisionDueDate || task.dueDate; }
    function formatDate(value) {
        if (!value) return "Not available";
        const [year,month,day] = value.split("-").map(Number);
        return new Intl.DateTimeFormat("en-PH", {day:"numeric",month:"short",year:"numeric"}).format(new Date(year,month-1,day));
    }
    function text(tag, className, value) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        el.textContent = value;
        return el;
    }
    function createTaskCard(task) {
        const status = statusOf(task);
        const card = document.createElement("article");
        card.className = "student-my-task-card";
        card.dataset.taskId = task.id;

        const main = document.createElement("div");
        main.className = "student-my-task-main";
        const icon = document.createElement("span");
        icon.className = "student-my-task-icon " + status;
        icon.setAttribute("aria-hidden","true");
        const iconElement = document.createElement("i");
        const iconNames = {pending:"bi-hourglass-split",overdue:"bi-calendar-x",submitted:"bi-check2-circle",revision_required:"bi-arrow-repeat"};
        iconElement.className = "bi " + iconNames[status];
        icon.appendChild(iconElement);
        const details = document.createElement("div");
        details.className = "student-my-task-details";
        details.append(text("h3","",task.title),text("span","student-my-task-subject",task.subject+" - "+task.offering));
        const labels = {pending:"Pending",overdue:"Overdue",submitted:"Submitted",revision_required:"Revision Required"};
        details.appendChild(text("span","student-my-task-status "+status,labels[status]));
        main.append(icon,details);
        card.appendChild(main);

        const deadline = document.createElement("div");
        deadline.className = "student-my-task-deadline-info";
        if (status === "revision_required") {
            deadline.append(text("p","","Original deadline: "+formatDate(task.dueDate)),text("p","student-my-task-revision-deadline","Revision deadline: "+formatDate(task.revisionDueDate)),text("small","","Revision applies to an existing submission. The original submission period is not reopened."));
        } else if (status === "submitted") {
            deadline.append(text("p","","Submitted: "+formatDate(task.submittedDate)),text("small","","Sample submission record. Review status is not represented here."));
        } else if (status === "overdue") {
            deadline.append(text("p","","Original deadline: "+formatDate(task.dueDate)),text("small","student-my-task-overdue-note","The initial submission period has closed in this demonstration."));
        } else {
            deadline.append(text("p","","Due: "+formatDate(task.dueDate)),text("small","","Initial submission deadline"));
        }
        card.appendChild(deadline);

        const actions = document.createElement("div");
        actions.className = "student-my-task-actions";

        // Route task actions to the implemented Student modules.
        const actionLink = document.createElement("a");
        actionLink.className = "student-my-task-action";

        if (status === "revision_required") {
            actionLink.href = "submissions.html#studentRevisionHeading";
            actionLink.textContent = "View Revision Request";
            actionLink.setAttribute("aria-label", "View revision request for " + task.title);
        } else if (status === "submitted") {
            actionLink.href = "submissions.html#studentSubmissionHistoryHeading";
            actionLink.textContent = "View Submission";
            actionLink.setAttribute("aria-label", "View submission record for " + task.title);
        } else {
            actionLink.href = "activities.html?activity=" + encodeURIComponent(task.id) + "#studentActivitiesList";
            actionLink.textContent = "View Activity";
            actionLink.setAttribute("aria-label", "View activities for " + task.title);
        }

        actions.appendChild(actionLink);
        card.appendChild(actions);
        return card;
    }
    function render() {
        const query = searchInput.value.trim().toLowerCase();
        const selectedStatus = statusFilter.value;
        const selectedSubject = subjectFilter.value;
        const visible = tasks.filter(task => {
            const status = statusOf(task);
            const matchesStatus = selectedStatus === "all" || status === selectedStatus;
            const matchesSubject = selectedSubject === "all" || task.subject === selectedSubject;
            const haystack = [task.title,task.subject,task.offering,status.replace(/_/g," ")].join(" ").toLowerCase();
            return matchesStatus && matchesSubject && haystack.includes(query);
        });
        visible.sort((a,b) => sortSelect.value === "latest" ? deadlineOf(b).localeCompare(deadlineOf(a)) : deadlineOf(a).localeCompare(deadlineOf(b)));
        taskList.replaceChildren(...visible.map(createTaskCard));
        emptyState.hidden = visible.length > 0;
        if (recordCount) recordCount.textContent = visible.length + (visible.length === 1 ? " task" : " tasks");
    }
    const counts = {pending:0,overdue:0,submitted:0,revision_required:0};
    tasks.forEach(task => counts[statusOf(task)]++);
    const ids = {pending:"studentTaskPendingCount",overdue:"studentTaskOverdueCount",submitted:"studentTaskSubmittedCount",revision_required:"studentTaskRevisionCount"};
    Object.entries(ids).forEach(([status,id]) => { const el=document.getElementById(id); if(el) el.textContent=String(counts[status]); });
    [...new Set(tasks.map(task=>task.subject))].sort((a,b)=>a.localeCompare(b)).forEach(subject => {
        const option=document.createElement("option"); option.value=subject; option.textContent=subject; subjectFilter.appendChild(option);
    });
    [searchInput,statusFilter,subjectFilter,sortSelect].forEach(el => el.addEventListener(el===searchInput?"input":"change",render));
    searchInput.addEventListener("keydown",event=>{if(event.key==="Escape"){searchInput.value="";render();searchInput.blur();}});
    render();
    console.log("Student MyTasks initialized. Demo tasks:",tasks.length);
}

/* =====================================================
   F11.5-F11.12 - STUDENT MODULE DEMONSTRATIONS
   Shared page-specific initializers; no Backend persistence.
===================================================== */
function initializeStudentModulePages() {
    initializeStudentActivitiesPage();
    initializeStudentSubmissionsPage();
    initializeStudentQuizzesPage();
    initializeStudentGradesPage();
    initializeStudentGradeReviewsPage();
    initializeStudentAnnouncementsPage();
    initializeStudentCalendarPage();
    initializeStudentNotificationsPage();
    initializeStudentSettingsPage();
}

function studentSetFeedback(element,message,state) {
    if (!element) return;
    element.textContent=message;
    element.className="student-form-feedback "+state;
    element.hidden=false;
}
function studentFormatDate(value) {
    if (!value) return "Not available";
    const [year,month,day]=value.split("-").map(Number);
    return new Intl.DateTimeFormat("en-PH",{day:"numeric",month:"short",year:"numeric"}).format(new Date(year,month-1,day));
}
function studentCreateText(tag,className,value) {
    const element=document.createElement(tag);
    if(className) element.className=className;
    element.textContent=value;
    return element;
}

/* F11.5 - ACTIVITIES */
function initializeStudentActivitiesPage() {
    const list = document.getElementById("studentActivitiesList");
    const subjectFilter = document.getElementById("studentActivitySubjectFilter");
    const statusFilter = document.getElementById("studentActivityStatusFilter");
    const empty = document.getElementById("studentActivitiesEmpty");
    const count = document.getElementById("studentActivitiesCount");
    if (!list || !subjectFilter || !statusFilter || !empty) return;

    const activities = [
        {
            id: "demo-task-math-worksheet-3",
            title: "Mathematics Worksheet 3",
            subject: "Mathematics",
            due: "2026-11-29",
            availability: "open",
            type: "Worksheet",
            summary: "Practice problems for the current lesson.",
            attachments: [{
                name: "Math_Worksheet_3_Instructions.txt",
                content: "GABAYARAL DEMONSTRATION ATTACHMENT\n\nMathematics Worksheet 3\n\nInstructions:\n1. Read each problem carefully.\n2. Show your solutions.\n3. Review your answers before submitting.\n\nFictional sample attachment."
            }]
        },
        {
            id: "demo-task-english-reading-reflection",
            title: "Reading Reflection",
            subject: "English",
            due: "2026-12-01",
            availability: "open",
            type: "Written Activity",
            summary: "Write a short reflection using the assigned reading.",
            attachments: [{
                name: "Reading_Reflection_Guide.txt",
                content: "GABAYARAL DEMONSTRATION ATTACHMENT\n\nReading Reflection Guide\n\n1. What is the main idea?\n2. Which part is most meaningful?\n3. How can you relate it to your experience?\n\nFictional sample attachment."
            }]
        },
        {
            id: "demo-task-filipino-vocabulary",
            title: "Filipino Vocabulary Practice",
            subject: "Filipino",
            due: "2026-11-26",
            availability: "closed",
            type: "Practice Activity",
            summary: "Review the vocabulary items from the lesson.",
            attachments: [{
                name: "Filipino_Vocabulary_List.txt",
                content: "GABAYARAL DEMONSTRATION ATTACHMENT\n\nFilipino Vocabulary Practice\n\nReview the vocabulary discussed in class and write one original sentence for each word.\n\nFictional sample attachment."
            }]
        },
        {
            id: "demo-task-science-activity-sheet",
            title: "Science Activity Sheet",
            subject: "Science",
            due: "2026-11-24",
            availability: "closed",
            type: "Activity Sheet",
            summary: "Review the activity instructions and the Teacher's revision request.",
            attachments: [{
                name: "Science_Activity_Guide.txt",
                content: "GABAYARAL DEMONSTRATION ATTACHMENT\n\nScience Activity Sheet\n\nReview your original explanation. Follow the Teacher's feedback when preparing a revision.\n\nThe revision deadline is separate from the original deadline.\n\nFictional sample attachment."
            }]
        },
        {
            id: "demo-task-ap-source-analysis",
            title: "AP Source Analysis",
            subject: "Araling Panlipunan",
            due: "2026-11-27",
            availability: "closed",
            type: "Source Analysis",
            summary: "Review the submitted source analysis activity.",
            attachments: [{
                name: "AP_Source_Analysis_Guide.txt",
                content: "GABAYARAL DEMONSTRATION ATTACHMENT\n\nAP Source Analysis Guide\n\nIdentify the source, summarize its main message, and explain the details that support your interpretation.\n\nFictional sample attachment."
            }]
        }
    ];

    const modalElement = document.getElementById("studentActivityDetailsModal");
    const modalTitle = document.getElementById("studentActivityDetailsTitle");
    const modalSubject = document.getElementById("studentActivityDetailsSubject");
    const modalType = document.getElementById("studentActivityDetailsType");
    const modalDue = document.getElementById("studentActivityDetailsDue");
    const modalAvailability = document.getElementById("studentActivityDetailsAvailability");
    const modalSummary = document.getElementById("studentActivityDetailsSummary");
    const attachmentList = document.getElementById("studentActivityAttachmentsList");
    const previewPanel = document.getElementById("studentActivityAttachmentPreview");
    const previewName = document.getElementById("studentActivityAttachmentPreviewName");
    const previewContent = document.getElementById("studentActivityAttachmentPreviewContent");
    const previewClose = document.getElementById("studentActivityAttachmentPreviewClose");
    const submissionsLink = document.getElementById("studentActivityGoToSubmissions");
    const publishedCount = document.getElementById("studentPublishedActivitiesCount");

    const modalInstance = modalElement && window.bootstrap?.Modal
        ? window.bootstrap.Modal.getOrCreateInstance(modalElement)
        : null;

    if (publishedCount) publishedCount.textContent = String(activities.length).padStart(2, "0");

    function downloadAttachment(attachment) {
        const blob = new Blob([attachment.content], { type: "text/plain;charset=utf-8" });
        const objectUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = objectUrl;
        downloadLink.download = attachment.name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    }

    function renderAttachments(activity) {
        if (!attachmentList) return;
        attachmentList.replaceChildren();
        if (previewPanel) previewPanel.hidden = true;

        const attachments = activity.attachments || [];
        if (attachments.length === 0) {
            attachmentList.appendChild(studentCreateText("p", "student-activity-no-attachments", "No demonstration attachments are available."));
            return;
        }

        attachments.forEach(attachment => {
            const row = document.createElement("div");
            row.className = "student-activity-attachment-row";

            const icon = document.createElement("span");
            icon.className = "student-activity-attachment-icon";
            const iconElement = document.createElement("i");
            iconElement.className = "bi bi-file-earmark-text";
            icon.appendChild(iconElement);

            const details = document.createElement("div");
            details.className = "student-activity-attachment-details";
            details.append(
                studentCreateText("strong", "", attachment.name),
                studentCreateText("small", "", "Text document · DEMO FILE")
            );

            const actions = document.createElement("div");
            actions.className = "student-activity-attachment-actions";

            const previewButton = document.createElement("button");
            previewButton.type = "button";
            previewButton.className = "student-secondary-button";
            previewButton.textContent = "Preview";
            previewButton.addEventListener("click", () => {
                if (previewName) previewName.textContent = attachment.name;
                if (previewContent) previewContent.textContent = attachment.content;
                if (previewPanel) previewPanel.hidden = false;
            });

            const downloadButton = document.createElement("button");
            downloadButton.type = "button";
            downloadButton.className = "student-secondary-button";
            downloadButton.textContent = "Download";
            downloadButton.addEventListener("click", () => downloadAttachment(attachment));

            actions.append(previewButton, downloadButton);
            row.append(icon, details, actions);
            attachmentList.appendChild(row);
        });
    }

    function openActivityDetails(activity) {
        if (!activity || !modalElement) return;
        if (modalTitle) modalTitle.textContent = activity.title;
        if (modalSubject) modalSubject.textContent = activity.subject;
        if (modalType) modalType.textContent = activity.type;
        if (modalDue) modalDue.textContent = studentFormatDate(activity.due);
        if (modalAvailability) {
            modalAvailability.textContent = activity.availability === "open" ? "Open" : "Closed";
            modalAvailability.className = "student-task-status " + (activity.availability === "open" ? "pending" : "submitted");
        }
        if (modalSummary) modalSummary.textContent = activity.summary;
        renderAttachments(activity);

        if (submissionsLink) {
            submissionsLink.href = "submissions.html?activity=" + encodeURIComponent(activity.id);
            submissionsLink.setAttribute("aria-label", "Go to submissions for " + activity.title);
        }

        if (modalInstance) modalInstance.show();
        else if (typeof modalElement.showModal === "function") modalElement.showModal();
    }

    if (previewClose) {
        previewClose.addEventListener("click", () => {
            if (previewPanel) previewPanel.hidden = true;
        });
    }

    [...new Set(activities.map(activity => activity.subject))]
        .sort((a, b) => a.localeCompare(b))
        .forEach(subject => {
            const option = document.createElement("option");
            option.value = subject;
            option.textContent = subject;
            subjectFilter.appendChild(option);
        });

    function render() {
        const query = (document.getElementById("studentPageSearch")?.value || "").trim().toLowerCase();
        const rows = activities.filter(activity => {
            const matchesSubject = subjectFilter.value === "all" || activity.subject === subjectFilter.value;
            const matchesAvailability = statusFilter.value === "all" || activity.availability === statusFilter.value;
            const attachmentNames = (activity.attachments || []).map(file => file.name).join(" ");
            const searchable = [activity.title, activity.subject, activity.type, activity.summary, attachmentNames].join(" ").toLowerCase();
            return matchesSubject && matchesAvailability && searchable.includes(query);
        });

        list.replaceChildren();
        rows.forEach(activity => {
            const card = document.createElement("article");
            card.className = "student-module-card student-searchable";

            const icon = document.createElement("span");
            icon.className = "student-module-card-icon blue";
            const iconElement = document.createElement("i");
            iconElement.className = "bi bi-journal-text";
            icon.appendChild(iconElement);

            const body = document.createElement("div");
            body.className = "student-module-card-body";
            body.append(
                studentCreateText("h3", "", activity.title),
                studentCreateText("p", "", activity.subject + " · " + activity.type),
                studentCreateText("small", "", activity.summary + " Due: " + studentFormatDate(activity.due))
            );

            const status = studentCreateText(
                "span",
                "student-task-status " + (activity.availability === "open" ? "pending" : "submitted"),
                activity.availability === "open" ? "Open" : "Closed"
            );

            const button = document.createElement("button");
            button.type = "button";
            button.className = "student-secondary-button";
            button.textContent = "View Activity";
            button.setAttribute("aria-label", "View details for " + activity.title);
            button.addEventListener("click", () => openActivityDetails(activity));

            card.append(icon, body, status, button);
            list.appendChild(card);
        });

        empty.hidden = rows.length > 0;
        if (count) count.textContent = rows.length + (rows.length === 1 ? " activity" : " activities");
    }

    subjectFilter.addEventListener("change", render);
    statusFilter.addEventListener("change", render);
    const search = document.getElementById("studentPageSearch");
    if (search) search.addEventListener("input", render);
    render();

    const requestedActivityId = new URLSearchParams(window.location.search).get("activity");
    if (requestedActivityId) {
        const requestedActivity = activities.find(activity => activity.id === requestedActivityId);
        if (requestedActivity) {
            subjectFilter.value = "all";
            statusFilter.value = "all";
            if (search) search.value = "";
            render();
            openActivityDetails(requestedActivity);
        }
    }

    console.log("Student Activities initialized. Demo activities:", activities.length);
}


/* F11.6 - SUBMISSIONS AND REVISIONS
   Browser demonstration only. File bytes are never uploaded.
*/

function initializeStudentSubmissionsPage() {
    const form = document.getElementById("studentSubmissionForm");
    const revisionForm = document.getElementById("studentRevisionForm");

    if (!form && !revisionForm) return;

    const byId = id => document.getElementById(id);

    const activitySelect = byId("studentSubmissionActivity");
    const fileInput = byId("studentSubmissionFiles");
    const linkInput = byId("studentSubmissionLink");
    const fileFields = byId("studentFileSubmissionFields");
    const linkFields = byId("studentLinkSubmissionFields");
    const submissionFeedback = byId("studentSubmissionFeedback");
    const historyBody = byId("studentSubmissionHistory");
    const submissionCount = byId("studentSubmissionCount");
    const historyCount = byId("studentSubmissionHistoryCount");
    const historyEmpty = byId("studentSubmissionHistoryEmpty");
    const deadlineInfo = byId("studentSubmissionDeadlineInfo");
    const selectedFilesHost = byId("studentSubmissionSelectedFiles");
    const awaitingCount = byId("studentAwaitingSubmissionCount");

    const revisionFeedback = byId("studentRevisionFeedback");
    const revisionResponse = byId("studentRevisionResponse");
    const revisionFiles = byId("studentRevisionFiles");
    const revisionLink = byId("studentRevisionLink");
    const revisionFileFields = byId("studentRevisionFileFields");
    const revisionLinkFields = byId("studentRevisionLinkFields");
    const revisionSelectedFilesHost = byId("studentRevisionSelectedFiles");
    const revisionHistoryHost = byId("studentRevisionResponseHistory");
    const revisionHistoryCount = byId("studentRevisionHistoryCount");
    const revisionHistoryEmpty = byId("studentRevisionHistoryEmpty");
    const revisionStatus = byId("studentRevisionStatus");
    const revisionSubmit = byId("studentRevisionSubmit");

    const STORAGE_KEY = "gabayaral.student.submissions.demo.v1";

    const REVISION_REQUEST = {
        id: "demo-revision-science-001",
        activityId: "demo-task-science-activity-sheet",
        activityTitle: "Science Activity Sheet",
        originalReceipt: "DEMO-SUB-002",
        originalDeadline: "2026-11-24",
        revisionDeadline: "2026-11-30"
    };

    const seedSubmissions = [
        {
            activityId: "demo-task-math-worksheet-2",
            activity: "Mathematics Worksheet 2",
            method: "FILE",
            submittedAt: "2026-11-25T09:00:00",
            details: ["Mathematics_Worksheet_2.pdf"],
            status: "Submitted",
            receipt: "DEMO-SUB-001"
        },
        {
            activityId: REVISION_REQUEST.activityId,
            activity: REVISION_REQUEST.activityTitle,
            method: "FILE",
            submittedAt: "2026-11-23T10:30:00",
            details: ["Science_Activity_Sheet.pdf"],
            status: "Revision Required",
            receipt: REVISION_REQUEST.originalReceipt
        },
        {
            activityId: "demo-task-ap-source-analysis",
            activity: "AP Source Analysis",
            method: "LINK",
            submittedAt: "2026-11-25T13:15:00",
            details: ["https://example.com/demo-ap-source-analysis"],
            status: "Submitted",
            receipt: "DEMO-SUB-003"
        }
    ];

    /* BROWSER-LOCAL DEMONSTRATION RECORDS */

    function loadState() {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);

            if (!raw) {
                return {
                    submissions: seedSubmissions.slice(),
                    revisions: [],
                    nextReceipt: 4,
                    nextRevision: 1
                };
            }

            const parsed = JSON.parse(raw);

            if (
                !parsed ||
                !Array.isArray(parsed.submissions) ||
                !Array.isArray(parsed.revisions)
            ) {
                throw new Error("Invalid demonstration submission data.");
            }

            return {
                submissions: parsed.submissions,
                revisions: parsed.revisions,
                nextReceipt: Number.isInteger(parsed.nextReceipt)
                    ? parsed.nextReceipt
                    : parsed.submissions.length + 1,
                nextRevision: Number.isInteger(parsed.nextRevision)
                    ? parsed.nextRevision
                    : parsed.revisions.length + 1
            };

        } catch (error) {
            console.warn(
                "Student submission demo storage could not be read. Using in-memory records.",
                error
            );

            return {
                submissions: seedSubmissions.slice(),
                revisions: [],
                nextReceipt: 4,
                nextRevision: 1
            };
        }
    }

    const state = loadState();

    function saveState() {
        try {
            window.localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(state)
            );
        } catch (error) {
            console.warn(
                "Student submission demo storage is unavailable. Changes remain in memory for this page visit.",
                error
            );
        }
    }

    /* DATE HELPERS */

    function localDateString(date = new Date()) {
        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0")
        ].join("-");
    }

    function formatDate(value) {
        if (!value) return "Not available";

        const parts = value.slice(0, 10).split("-").map(Number);

        return new Intl.DateTimeFormat("en-PH", {
            day: "numeric",
            month: "short",
            year: "numeric"
        }).format(
            new Date(parts[0], parts[1] - 1, parts[2])
        );
    }

    function formatDateTime(value) {
        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "Not available";
        }

        return new Intl.DateTimeFormat("en-PH", {
            dateStyle: "medium",
            timeStyle: "short"
        }).format(date);
    }

    function formatBytes(bytes) {
        if (!Number.isFinite(bytes) || bytes < 0) {
            return "Size unavailable";
        }

        if (bytes < 1024) return bytes + " B";

        if (bytes < 1024 * 1024) {
            return (bytes / 1024).toFixed(1) + " KB";
        }

        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    }

    /* HTTPS VALIDATION */

    function safeHttpsUrl(value) {
        try {
            const url = new URL(value.trim());

            if (
                url.protocol !== "https:" ||
                !url.hostname ||
                url.username ||
                url.password
            ) {
                return null;
            }

            return url;

        } catch (_) {
            return null;
        }
    }

    /* FILE DETAILS */

    function fileDetails(files) {
        return Array.from(files || []).map(file => ({
            name: file.name,
            size: file.size,
            type: file.type || "Unknown file type"
        }));
    }

    function renderSelectedFiles(input, host) {
        if (!host) return;

        host.replaceChildren();

        const files = fileDetails(input?.files);

        if (!files.length) return;

        const list = document.createElement("ul");
        list.className = "student-selected-file-list";

        files.forEach(file => {
            const item = document.createElement("li");

            const name = document.createElement("span");
            name.textContent = file.name;

            const size = document.createElement("small");
            size.textContent = formatBytes(file.size);

            item.append(name, size);
            list.appendChild(item);
        });

        host.appendChild(list);
    }

    /* SUBMISSION HISTORY */

    function renderSubmissionHistory() {
        if (!historyBody) return;

        historyBody.replaceChildren();

        state.submissions
            .slice()
            .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
            .forEach(record => {

                const row = document.createElement("tr");
                row.dataset.activityId = record.activityId;

                const values = [
                    record.activity,
                    record.method,
                    formatDateTime(record.submittedAt),
                    (record.details || []).join(", ") || "No attachment details"
                ];

                values.forEach(value => {
                    const cell = document.createElement("td");
                    cell.textContent = value;
                    row.appendChild(cell);
                });

                const statusCell = document.createElement("td");
                const status = document.createElement("span");

                status.className =
                    "student-submission-status " +
                    (record.status === "Revision Required" ? "revision" : "submitted");

                status.textContent = record.status;
                statusCell.appendChild(status);
                row.appendChild(statusCell);

                const receiptCell = document.createElement("td");
                receiptCell.textContent = record.receipt;
                row.appendChild(receiptCell);

                historyBody.appendChild(row);
            });

        if (submissionCount) {
            submissionCount.textContent =
                String(state.submissions.length).padStart(2, "0");
        }

        if (historyCount) {
            historyCount.textContent =
                state.submissions.length +
                (state.submissions.length === 1 ? " record" : " records");
        }

        if (historyEmpty) {
            historyEmpty.hidden = state.submissions.length > 0;
        }
    }

    /* REVISION RESPONSE HISTORY */

    function renderRevisionHistory() {
        if (!revisionHistoryHost) return;

        revisionHistoryHost.replaceChildren();

        state.revisions
            .slice()
            .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
            .forEach(record => {

                const card = document.createElement("article");
                card.className = "student-revision-history-item";

                const heading = document.createElement("div");
                heading.className = "student-revision-history-heading";

                const title = document.createElement("strong");
                title.textContent = record.activityTitle;

                const badge = document.createElement("span");
                badge.className = "student-submission-status submitted";
                badge.textContent = "Response Recorded";

                heading.append(title, badge);

                const meta = document.createElement("small");
                meta.textContent =
                    "Response " + record.responseReceipt +
                    " · Existing receipt " + record.originalReceipt +
                    " · " + formatDateTime(record.submittedAt);

                const response = document.createElement("p");
                response.textContent = record.response;

                const attachment = document.createElement("small");
                attachment.textContent =
                    record.method + " · " +
                    (record.details || []).join(", ");

                card.append(heading, meta, response, attachment);
                revisionHistoryHost.appendChild(card);
            });

        if (revisionHistoryCount) {
            revisionHistoryCount.textContent =
                state.revisions.length +
                (state.revisions.length === 1 ? " response" : " responses");
        }

        if (revisionHistoryEmpty) {
            revisionHistoryEmpty.hidden = state.revisions.length > 0;
        }
    }

    /* INITIAL SUBMISSION DEADLINE */

    function updateInitialDeadline() {
        if (!activitySelect || !deadlineInfo) return;

        const option = activitySelect.selectedOptions[0];

        if (!option || !option.dataset.deadline) {
            deadlineInfo.textContent =
                "Select an activity to view its initial submission deadline.";
            return;
        }

        const deadline = option.dataset.deadline;
        const closed = localDateString() > deadline;

        deadlineInfo.textContent =
            "Initial submission deadline: " +
            formatDate(deadline) +
            (closed ? " · Closed" : " · Open");

        deadlineInfo.classList.toggle("is-closed", closed);
    }

    /* SUBMISSION METHOD */

    function updateInitialMethod() {
        const method =
            document.querySelector('input[name="studentSubmissionMethod"]:checked')?.value ||
            "file";

        if (fileFields) fileFields.hidden = method !== "file";
        if (linkFields) linkFields.hidden = method !== "link";

        if (fileInput) fileInput.required = method === "file";
        if (linkInput) linkInput.required = method === "link";
    }

    /* REVISION METHOD */

    function updateRevisionMethod() {
        const method =
            document.querySelector('input[name="studentRevisionMethod"]:checked')?.value ||
            "file";

        if (revisionFileFields) revisionFileFields.hidden = method !== "file";
        if (revisionLinkFields) revisionLinkFields.hidden = method !== "link";

        if (revisionFiles) revisionFiles.required = method === "file";
        if (revisionLink) revisionLink.required = method === "link";
    }

    /* DISABLE EXPIRED INITIAL ACTIVITIES */

    if (activitySelect) {
        let openActivityCount = 0;

        [...activitySelect.options].forEach(option => {
            if (!option.dataset.deadline) return;

            const isClosed =
                localDateString() > option.dataset.deadline;

            option.disabled = isClosed;

            if (isClosed) {
                option.textContent =
                    option.textContent.replace(/ · Closed$/, "") + " · Closed";
            } else {
                openActivityCount += 1;
            }
        });

        if (awaitingCount) {
            awaitingCount.textContent =
                String(openActivityCount).padStart(2, "0");
        }

        /* ACTIVITY DEEP LINK FROM F11.5 */

        const requestedId =
            new URLSearchParams(window.location.search).get("activity");

        if (requestedId) {
            const match = [...activitySelect.options].find(
                option => option.value === requestedId
            );

            if (match && !match.disabled) {
                activitySelect.value = requestedId;

                studentSetFeedback(
                    submissionFeedback,
                    "Selected activity: " +
                    match.textContent.trim() +
                    ". Confirm the method and attach your work.",
                    "info"
                );

            } else {
                studentSetFeedback(
                    submissionFeedback,
                    "This activity is not available for initial submission. It may be closed or not eligible.",
                    "error"
                );
            }
        }
    }

    /* EVENT LISTENERS */

    if (activitySelect) {
        activitySelect.addEventListener("change", updateInitialDeadline);
        updateInitialDeadline();
    }

    document.querySelectorAll('input[name="studentSubmissionMethod"]')
        .forEach(input => input.addEventListener("change", updateInitialMethod));

    document.querySelectorAll('input[name="studentRevisionMethod"]')
        .forEach(input => input.addEventListener("change", updateRevisionMethod));

    if (fileInput) {
        fileInput.addEventListener("change", () => {
            renderSelectedFiles(fileInput, selectedFilesHost);
        });
    }

    if (revisionFiles) {
        revisionFiles.addEventListener("change", () => {
            renderSelectedFiles(revisionFiles, revisionSelectedFilesHost);
        });
    }

    updateInitialMethod();
    updateRevisionMethod();

    /* INITIAL FILE OR LINK SUBMISSION */

    if (form) {
        form.addEventListener("submit", event => {
            event.preventDefault();

            const selectedOption = activitySelect?.selectedOptions[0];
            const activityId = activitySelect?.value || "";

            if (!activityId || !selectedOption || !selectedOption.dataset.deadline) {
                studentSetFeedback(
                    submissionFeedback,
                    "Select an available activity before submitting.",
                    "error"
                );

                activitySelect?.focus();
                return;
            }

            if (localDateString() > selectedOption.dataset.deadline) {
                studentSetFeedback(
                    submissionFeedback,
                    "The initial submission deadline has passed. The original submission period is closed.",
                    "error"
                );

                activitySelect.focus();
                return;
            }

            const method =
                document.querySelector('input[name="studentSubmissionMethod"]:checked')?.value ||
                "file";

            let details = [];

            if (method === "file") {
                details = fileDetails(fileInput?.files);

                if (!details.length) {
                    studentSetFeedback(
                        submissionFeedback,
                        "Choose at least one file for a FILE submission.",
                        "error"
                    );

                    fileInput?.focus();
                    return;
                }

            } else {
                const parsed = safeHttpsUrl(linkInput?.value || "");

                if (!parsed) {
                    studentSetFeedback(
                        submissionFeedback,
                        "Enter one valid HTTPS link without embedded username or password.",
                        "error"
                    );

                    linkInput?.focus();
                    return;
                }

                details = [parsed.href];
            }

            const receipt =
                "DEMO-SUB-" +
                String(state.nextReceipt++).padStart(3, "0");

            const record = {
                activityId,
                activity: selectedOption.textContent.split(" · Due")[0].trim(),
                method: method.toUpperCase(),
                submittedAt: new Date().toISOString(),

                details: method === "file"
                    ? details.map(file =>
                        file.name + " (" +
                        formatBytes(file.size) + "; " +
                        file.type + ")"
                    )
                    : details,

                status: "Submitted",
                receipt
            };

            state.submissions.push(record);

            saveState();
            renderSubmissionHistory();

            form.reset();
            updateInitialMethod();
            updateInitialDeadline();

            if (selectedFilesHost) {
                selectedFilesHost.replaceChildren();
            }

            if (linkInput) linkInput.value = "";

            studentSetFeedback(
                submissionFeedback,
                "Demonstration receipt created: " +
                receipt +
                ". File contents were not uploaded; only file details were recorded in this browser.",
                "success"
            );
        });
    }

    /* REVISION DEADLINE */

    const revisionDeadlineOpen =
        localDateString() <= REVISION_REQUEST.revisionDeadline;

    const hasRevisionResponse = state.revisions.some(
        record => record.requestId === REVISION_REQUEST.id
    );

    if (hasRevisionResponse && revisionStatus) {
        revisionStatus.textContent = "Response Submitted";
        revisionStatus.className = "student-task-status submitted";

    } else if (!revisionDeadlineOpen && revisionStatus) {
        revisionStatus.textContent = "Revision Period Closed";
        revisionStatus.className = "student-task-status submitted";
    }

    if (!revisionDeadlineOpen) {
        if (revisionSubmit) revisionSubmit.disabled = true;

        if (!hasRevisionResponse && revisionFeedback) {
            studentSetFeedback(
                revisionFeedback,
                "The revision deadline has passed. The original submission period is not reopened.",
                "error"
            );
        }
    }

    /* SUBMIT REVISION RESPONSE */

    if (revisionForm) {
        revisionForm.addEventListener("submit", event => {
            event.preventDefault();

            if (!revisionDeadlineOpen) {
                studentSetFeedback(
                    revisionFeedback,
                    "The revision deadline has passed. No further response can be recorded in this demonstration.",
                    "error"
                );
                return;
            }

            const response = revisionResponse?.value.trim() || "";

            if (!response) {
                studentSetFeedback(
                    revisionFeedback,
                    "Explain the changes made to the existing submission.",
                    "error"
                );

                revisionResponse?.focus();
                return;
            }

            const method =
                document.querySelector('input[name="studentRevisionMethod"]:checked')?.value ||
                "file";

            let details = [];

            if (method === "file") {
                details = fileDetails(revisionFiles?.files);

                if (!details.length) {
                    studentSetFeedback(
                        revisionFeedback,
                        "Choose at least one revised file.",
                        "error"
                    );

                    revisionFiles?.focus();
                    return;
                }

            } else {
                const parsed = safeHttpsUrl(revisionLink?.value || "");

                if (!parsed) {
                    studentSetFeedback(
                        revisionFeedback,
                        "Enter one valid HTTPS link for the revised work.",
                        "error"
                    );

                    revisionLink?.focus();
                    return;
                }

                details = [parsed.href];
            }

            const responseReceipt =
                "DEMO-REV-" +
                String(state.nextRevision++).padStart(3, "0");

            state.revisions.push({
                requestId: REVISION_REQUEST.id,
                activityId: REVISION_REQUEST.activityId,
                activityTitle: REVISION_REQUEST.activityTitle,
                originalReceipt: REVISION_REQUEST.originalReceipt,
                responseReceipt,
                response,
                method: method.toUpperCase(),

                details: method === "file"
                    ? details.map(file =>
                        file.name + " (" +
                        formatBytes(file.size) + "; " +
                        file.type + ")"
                    )
                    : details,

                submittedAt: new Date().toISOString()
            });

            const originalSubmission = state.submissions.find(
                record => record.receipt === REVISION_REQUEST.originalReceipt
            );

            if (originalSubmission) {
                originalSubmission.status = "Revision Response Submitted";
            }

            if (revisionStatus) {
                revisionStatus.textContent = "Response Submitted";
                revisionStatus.className = "student-task-status submitted";
            }

            saveState();
            renderSubmissionHistory();
            renderRevisionHistory();

            revisionForm.reset();
            updateRevisionMethod();

            if (revisionSelectedFilesHost) {
                revisionSelectedFilesHost.replaceChildren();
            }

            if (revisionLink) revisionLink.value = "";

            studentSetFeedback(
                revisionFeedback,
                "Revision response recorded: " +
                responseReceipt +
                ". It is linked to existing receipt " +
                REVISION_REQUEST.originalReceipt +
                ". No file contents were uploaded.",
                "success"
            );
        });
    }

    /* INITIAL RENDER */

    renderSubmissionHistory();
    renderRevisionHistory();

    console.log(
        "Student Submissions & Revisions initialized. Demo records:",
        state.submissions.length
    );
}



/* =====================================================
   F11.7 - QUIZZES
   One-question attempts, preserved answers, review,
   confirmation, demo scoring and browser-local history.
===================================================== */
function initializeStudentQuizzesPage() {
    const $ = id => document.getElementById(id);
    const dialog = $("studentQuizDialog");
    const host = $("studentQuizQuestions");
    const actions = $("studentQuizDialogActions");
    const historyBody = $("studentQuizHistoryBody");
    const search = $("studentPageSearch");
    const subjectFilter = $("studentQuizSubjectFilter");
    const quizList = $("studentQuizzesList");

    if (!dialog || !host || !actions || !historyBody || !quizList) return;

    const STORAGE_KEY = "gabayaral.student.quizAttempts.demo.v1";

    const quizzes = {
        math: {
            id: "math",
            title: "Mathematics - Fractions Quiz",
            subject: "Mathematics",
            offering: "Grade 7 - Sampaguita",
            coverage: "Fractions and equivalent fractions",
            instructions: [
                "Read each question carefully before choosing an answer.",
                "Select one answer for each question.",
                "Use Previous, Next or the question numbers to move between questions.",
                "Review your answers before submitting the attempt."
            ],
            questions: [
                {
                    q: "What is 1/2 + 1/4?",
                    options: ["2/6", "3/4", "1/8"],
                    answer: 1,
                    explanation: "Convert 1/2 to 2/4, then add 2/4 + 1/4 = 3/4."
                },
                {
                    q: "Which fraction is equivalent to 2/4?",
                    options: ["1/2", "1/3", "3/4"],
                    answer: 0,
                    explanation: "Dividing the numerator and denominator of 2/4 by 2 gives 1/2."
                }
            ]
        },

        science: {
            id: "science",
            title: "Science - Matter and Energy",
            subject: "Science",
            offering: "Grade 7 - Sampaguita",
            coverage: "States of matter and changes of state",
            instructions: [
                "Read each question and all answer choices.",
                "Select the best answer for each question.",
                "You may move between questions without losing selected answers.",
                "Review your responses before confirming submission."
            ],
            questions: [
                {
                    q: "Which state of matter has a fixed volume but no fixed shape?",
                    options: ["Solid", "Liquid", "Gas"],
                    answer: 1,
                    explanation: "A liquid has a definite volume but takes the shape of its container."
                },
                {
                    q: "What is needed to change liquid water into water vapor?",
                    options: ["Cooling", "Heating", "Freezing"],
                    answer: 1,
                    explanation: "Heating provides energy for liquid water to change into water vapor."
                }
            ]
        }
    };

    let currentQuizId = null;
    let stage = "closed";

    function loadState() {
        const empty = {
            completed: [],
            active: {},
            nextAttempt: 1
        };

        try {
            const parsed = JSON.parse(
                localStorage.getItem(STORAGE_KEY) || "null"
            );

            if (
                !parsed ||
                !Array.isArray(parsed.completed) ||
                !parsed.active ||
                typeof parsed.active !== "object"
            ) {
                return empty;
            }

            const completed = parsed.completed.filter(record =>
                record &&
                typeof record.id === "string" &&
                quizzes[record.quizId] &&
                Array.isArray(record.answers) &&
                Number.isFinite(record.score) &&
                Number.isFinite(record.total)
            );

            const active = {};

            Object.entries(parsed.active).forEach(([id, attempt]) => {
                const quiz = quizzes[id];

                if (!quiz || !attempt || !Array.isArray(attempt.answers)) {
                    return;
                }

                active[id] = {
                    id: typeof attempt.id === "string"
                        ? attempt.id
                        : "DEMO-ACTIVE-RESTORED",

                    quizId: id,

                    startedAt: typeof attempt.startedAt === "string"
                        ? attempt.startedAt
                        : new Date().toISOString(),

                    attemptNumber:
                        Number.isInteger(attempt.attemptNumber) &&
                        attempt.attemptNumber > 0
                            ? attempt.attemptNumber
                            : 1,

                    currentIndex: Number.isInteger(attempt.currentIndex)
                        ? Math.max(
                            0,
                            Math.min(
                                attempt.currentIndex,
                                quiz.questions.length - 1
                            )
                        )
                        : 0,

                    answers: quiz.questions.map((question, index) => {
                        const value = attempt.answers[index];

                        return Number.isInteger(value) &&
                            value >= 0 &&
                            value < question.options.length
                                ? value
                                : null;
                    })
                };
            });

            return {
                completed,
                active,
                nextAttempt:
                    Number.isInteger(parsed.nextAttempt) &&
                    parsed.nextAttempt > 0
                        ? parsed.nextAttempt
                        : completed.length + Object.keys(active).length + 1
            };

        } catch (error) {
            console.warn(
                "Quiz demo storage could not be read. Starting with empty attempt history.",
                error
            );

            return empty;
        }
    }

    const state = loadState();

    const activeAttempt = id => state.active[id] || null;

    const el = (tag, cls, text) =>
        studentCreateText(tag, cls || "", text == null ? "" : String(text));

    function btn(label, action, cls = "student-secondary-button") {
        const button = document.createElement("button");

        button.type = "button";
        button.className = cls;
        button.dataset.quizAction = action;
        button.textContent = label;

        return button;
    }

    const setActions = list => actions.replaceChildren(...list);

    function heading(eyebrow, title, subtitle) {
        $("studentQuizDialogEyebrow").textContent = eyebrow;
        $("studentQuizDialogTitle").textContent = title;
        $("studentQuizDialogSubtitle").textContent = subtitle;
    }

    function show() {
        if (!dialog.open && dialog.showModal) {
            dialog.showModal();
        } else if (!dialog.showModal) {
            dialog.setAttribute("open", "");
        }
    }

    function close() {
        if (dialog.open && dialog.close) {
            dialog.close();
        } else {
            dialog.removeAttribute("open");
        }

        stage = "closed";
    }

    const say = (message, type) =>
        studentSetFeedback($("studentQuizFeedback"), message, type);

    function clearFeedback() {
        $("studentQuizFeedback").hidden = true;
        $("studentQuizFeedback").textContent = "";
    }

    function formatDateTime(value) {
        const date = new Date(value);

        return Number.isNaN(date.getTime())
            ? "Not available"
            : new Intl.DateTimeFormat("en-PH", {
                dateStyle: "medium",
                timeStyle: "short"
            }).format(date);
    }

    function save() {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(state)
            );
        } catch (error) {
            console.warn(
                "Quiz demo storage unavailable; changes remain in memory for this visit.",
                error
            );

            say(
                "Browser storage is unavailable. Your answers will remain only until this page is closed.",
                "info"
            );
        }
    }

    /* SUMMARY COUNTS */

    function updateSummary() {
        $("studentAvailableQuizCount").textContent =
            String(Object.keys(quizzes).length).padStart(2, "0");

        $("studentCompletedQuizCount").textContent =
            String(state.completed.length).padStart(2, "0");

        $("studentInProgressQuizCount").textContent =
            String(Object.keys(state.active).length).padStart(2, "0");

        $("studentQuizRecordCount").textContent =
            Object.keys(quizzes).length + " quizzes";

        document.querySelectorAll(".student-quiz-start").forEach(button => {
            button.textContent = activeAttempt(button.dataset.quiz)
                ? "Resume Attempt"
                : "View Instructions";
        });
    }

    /* COMPLETED ATTEMPT HISTORY */

    function renderHistory() {
        historyBody.replaceChildren();

        state.completed
            .slice()
            .sort((a, b) =>
                String(b.submittedAt).localeCompare(String(a.submittedAt))
            )
            .forEach(record => {
                const quiz = quizzes[record.quizId];

                if (!quiz) return;

                const row = document.createElement("tr");

                [
                    quiz.title,
                    "Attempt " + record.attemptNumber,
                    formatDateTime(record.submittedAt),
                    record.score + " / " + record.total +
                        " (" + record.percentage + "%)"
                ].forEach(value => {
                    const cell = document.createElement("td");
                    cell.textContent = value;
                    row.appendChild(cell);
                });

                const statusCell = document.createElement("td");
                statusCell.appendChild(
                    el("span", "student-quiz-result-status", "Demo result available")
                );
                row.appendChild(statusCell);

                const actionCell = document.createElement("td");
                const view = btn("View Result", "view-result");

                view.dataset.attemptId = record.id;
                actionCell.appendChild(view);
                row.appendChild(actionCell);

                historyBody.appendChild(row);
            });

        $("studentQuizHistoryCount").textContent =
            state.completed.length +
            (state.completed.length === 1 ? " attempt" : " attempts");

        $("studentQuizHistoryEmpty").hidden =
            state.completed.length > 0;
    }

    function refresh() {
        updateSummary();
        renderHistory();
    }

    /* INSTRUCTIONS */

    function renderInstructions(id) {
        const quiz = quizzes[id];

        if (!quiz) return;

        currentQuizId = id;
        stage = "instructions";
        clearFeedback();

        heading(
            "QUIZ INSTRUCTIONS",
            quiz.title,
            quiz.subject + " · " + quiz.offering
        );

        const summary = document.createElement("div");
        summary.className = "student-quiz-instruction-summary";

        summary.append(
            el("strong", "", "Before you begin"),
            el("span", "", quiz.questions.length + " questions"),
            el("span", "", "Coverage: " + quiz.coverage),
            el("span", "", "No timer or attempt limit is configured in this demonstration.")
        );

        const list = document.createElement("ol");
        list.className = "student-quiz-instructions-list";

        quiz.instructions.forEach(text => {
            list.appendChild(el("li", "", text));
        });

        const note = el(
            "p",
            "student-quiz-instruction-note",
            "Answers are saved in this browser while you move between questions. Closing the dialog does not discard an unfinished attempt."
        );

        host.replaceChildren(
            summary,
            el("h3", "student-quiz-section-heading", "Instructions"),
            list,
            note
        );

        setActions([
            btn("Cancel", "close"),
            btn(
                activeAttempt(id) ? "Resume Attempt" : "Begin Demo Attempt",
                "begin",
                "student-primary-button"
            )
        ]);

        show();
    }

    /* ONE QUESTION AT A TIME */

    function renderQuestion() {
        const quiz = quizzes[currentQuizId];
        const attempt = activeAttempt(currentQuizId);

        if (!quiz || !attempt) return;

        stage = "question";
        clearFeedback();

        const index = attempt.currentIndex;
        const answered = attempt.answers.filter(a => a !== null).length;

        heading(
            "DEMO QUIZ ATTEMPT",
            quiz.title,
            "Question " + (index + 1) + " of " + quiz.questions.length
        );

        const progress = document.createElement("div");
        progress.className = "student-quiz-progress-wrap";

        const meta = document.createElement("div");
        meta.className = "student-quiz-progress-meta";

        meta.append(
            el("span", "", "Answered " + answered + " of " + quiz.questions.length),
            el("span", "", "Attempt " + attempt.attemptNumber)
        );

        const track = document.createElement("div");
        track.className = "student-quiz-progress-track";
        track.setAttribute("role", "progressbar");
        track.setAttribute("aria-valuemin", "0");
        track.setAttribute("aria-valuemax", String(quiz.questions.length));
        track.setAttribute("aria-valuenow", String(answered));

        const fill = document.createElement("span");
        fill.style.width =
            (answered / quiz.questions.length * 100) + "%";

        track.appendChild(fill);
        progress.append(meta, track);

        const question = quiz.questions[index];

        const card = document.createElement("section");
        card.className = "student-quiz-active-question";

        card.append(
            el(
                "span",
                "student-quiz-question-label",
                "QUESTION " + String(index + 1).padStart(2, "0")
            ),
            el("h3", "", question.q)
        );

        const options = document.createElement("div");
        options.className = "student-quiz-options";

        question.options.forEach((option, optionIndex) => {
            const label = document.createElement("label");

            label.className =
                "student-quiz-option" +
                (attempt.answers[index] === optionIndex ? " selected" : "");

            const input = document.createElement("input");

            input.type = "radio";
            input.name = "studentQuizAnswer";
            input.value = String(optionIndex);
            input.checked = attempt.answers[index] === optionIndex;
            input.dataset.questionIndex = String(index);

            label.append(
                input,
                el("span", "", option)
            );

            options.appendChild(label);
        });

        card.appendChild(options);

        /* QUESTION NUMBER NAVIGATION */

        const nav = document.createElement("div");
        nav.className = "student-quiz-question-navigation";
        nav.id = "studentQuizQuestionNavigation";
        nav.setAttribute("aria-label", "Question navigation");

        quiz.questions.forEach((question, i) => {
            const button = btn(
                String(i + 1),
                "goto-question",
                "student-quiz-question-number"
            );

            button.dataset.questionIndex = String(i);
            button.setAttribute(
                "aria-label",
                "Go to question " + (i + 1)
            );

            button.setAttribute(
                "aria-current",
                i === index ? "step" : "false"
            );

            if (attempt.answers[i] !== null) {
                button.classList.add("answered");
            }

            if (i === index) {
                button.classList.add("current");
            }

            nav.appendChild(button);
        });

        host.replaceChildren(
            progress,
            card,
            nav,
            el(
                "p",
                "student-quiz-navigation-note",
                "Select a question number to move directly to it. Your selected answers are preserved."
            )
        );

        const buttons = [
            btn("Close and Resume Later", "close")
        ];

        if (index > 0) {
            buttons.push(btn("Previous", "previous"));
        }

        buttons.push(
            index < quiz.questions.length - 1
                ? btn("Next", "next", "student-primary-button")
                : btn("Review Answers", "review", "student-primary-button")
        );

        setActions(buttons);
    }

    /* REVIEW ANSWERS */

    function renderReview() {
        const quiz = quizzes[currentQuizId];
        const attempt = activeAttempt(currentQuizId);

        if (!quiz || !attempt) return;

        stage = "review";
        clearFeedback();

        heading(
            "REVIEW YOUR ANSWERS",
            quiz.title,
            "Check your responses before submitting."
        );

        const answered = attempt.answers.filter(a => a !== null).length;

        const summary = document.createElement("div");
        summary.className = "student-quiz-review-summary";

        summary.append(
            el("strong", "", answered + " of " + quiz.questions.length + " questions answered"),
            el("span", "", "Return to any question before final submission.")
        );

        host.replaceChildren(summary);

        quiz.questions.forEach((question, index) => {
            const item = document.createElement("article");
            item.className = "student-quiz-review-item";

            item.append(
                el("strong", "", "Question " + (index + 1) + ". " + question.q),
                el(
                    "p",
                    attempt.answers[index] === null ? "unanswered" : "",
                    attempt.answers[index] === null
                        ? "Not answered"
                        : "Your answer: " + question.options[attempt.answers[index]]
                )
            );

            const change = btn("Change Answer", "goto-question");
            change.dataset.questionIndex = String(index);

            item.appendChild(change);
            host.appendChild(item);
        });

        const submit = btn(
            "Submit Demo Attempt",
            "confirm-submit",
            "student-primary-button"
        );

        submit.disabled = answered !== quiz.questions.length;

        setActions([
            btn("Back to Questions", "back-to-questions"),
            submit
        ]);

        if (answered !== quiz.questions.length) {
            say(
                "Answer all questions before submitting. " +
                (quiz.questions.length - answered) +
                " remain unanswered.",
                "error"
            );
        }
    }

    /* SUBMISSION CONFIRMATION */

    function renderConfirmation() {
        const quiz = quizzes[currentQuizId];
        const attempt = activeAttempt(currentQuizId);

        if (!quiz || !attempt) return;

        stage = "confirmation";
        clearFeedback();

        heading(
            "SUBMISSION CONFIRMATION",
            "Submit this quiz attempt?",
            quiz.title
        );

        const answered = attempt.answers.filter(a => a !== null).length;

        const card = document.createElement("div");
        card.className = "student-quiz-confirmation-card";

        card.append(
            el("strong", "", "Ready to submit"),
            el("p", "", answered + " of " + quiz.questions.length + " questions have been answered."),
            el(
                "small",
                "",
                "After confirmation, this demonstration attempt will be recorded and its sample result will be shown. Answers cannot be changed after submission."
            )
        );

        host.replaceChildren(card);

        setActions([
            btn("Back to Review", "back-to-review"),
            btn("Confirm Submission", "confirm-final-submit", "student-primary-button")
        ]);
    }

    /* DEMONSTRATION RESULTS */

    function renderResult(record) {
        const quiz = quizzes[record.quizId];

        if (!quiz) return;

        currentQuizId = record.quizId;
        stage = "result";
        clearFeedback();

        heading("DEMO RESULT", "Attempt Result", quiz.title);

        const summary = document.createElement("div");
        summary.className = "student-quiz-result-summary";

        summary.append(
            el("span", "", "SAMPLE SCORE"),
            el("strong", "", record.score + " / " + record.total),
            el("p", "", record.percentage + "% correct"),
            el(
                "small",
                "",
                "Receipt: " + record.id +
                " · Submitted " + formatDateTime(record.submittedAt)
            )
        );

        host.replaceChildren(
            summary,
            el("h3", "student-quiz-section-heading", "Answer Review")
        );

        quiz.questions.forEach((question, index) => {
            const correct = record.answers[index] === question.answer;

            const item = document.createElement("article");
            item.className = "student-quiz-result-item";

            item.append(
                el("strong", "", "Question " + (index + 1) + ". " + question.q),
                el(
                    "p",
                    correct ? "correct-answer" : "incorrect-answer",
                    "Your answer: " +
                    (record.answers[index] === null
                        ? "Not answered"
                        : question.options[record.answers[index]])
                )
            );

            if (!correct) {
                item.appendChild(
                    el(
                        "p",
                        "student-quiz-correct-answer",
                        "Correct answer: " + question.options[question.answer]
                    )
                );
            }

            item.appendChild(el("small", "", question.explanation));
            host.appendChild(item);
        });

        host.appendChild(
            el(
                "p",
                "student-quiz-instruction-note",
                "This result is shown immediately for demonstration purposes only. It is not an official grade and is not sent to Grades & Feedback."
            )
        );

        setActions([
            btn("Close Results", "close", "student-primary-button")
        ]);

        show();
    }

    /* FINALIZE ATTEMPT */

    function submitAttempt() {
        const quiz = quizzes[currentQuizId];
        const attempt = activeAttempt(currentQuizId);

        if (!quiz || !attempt) return;

        if (attempt.answers.some(answer => answer === null)) {
            renderReview();
            say("Answer all questions before submitting.", "error");
            return;
        }

        const score = quiz.questions.reduce(
            (total, question, index) =>
                total + (attempt.answers[index] === question.answer ? 1 : 0),
            0
        );

        const record = {
            id: "DEMO-QUIZ-ATT-" +
                String(state.nextAttempt++).padStart(3, "0"),

            quizId: currentQuizId,
            attemptNumber: attempt.attemptNumber,
            startedAt: attempt.startedAt,
            submittedAt: new Date().toISOString(),
            answers: attempt.answers.slice(),
            score,
            total: quiz.questions.length,
            percentage: Math.round(
                score / quiz.questions.length * 100
            )
        };

        state.completed.push(record);
        delete state.active[currentQuizId];

        save();
        refresh();
        renderResult(record);
    }

    /* START OR RESUME ATTEMPT */

    function beginAttempt(id) {
        const quiz = quizzes[id];

        if (!quiz) return;

        let attempt = activeAttempt(id);

        if (!attempt) {
            attempt = {
                id: "DEMO-QUIZ-ACTIVE-" + Date.now(),
                quizId: id,
                startedAt: new Date().toISOString(),

                attemptNumber:
                    state.completed.filter(record => record.quizId === id).length + 1,

                currentIndex: 0,
                answers: quiz.questions.map(() => null)
            };

            state.active[id] = attempt;
            save();
        }

        refresh();
        renderQuestion();
    }

    /* SEARCH AND SUBJECT FILTER */

    function applyFilters() {
        const query = (search?.value || "").trim().toLowerCase();
        const subject = subjectFilter?.value || "all";

        let visible = 0;

        quizList.querySelectorAll(".student-quiz-card").forEach(card => {
            const matches =
                (subject === "all" || card.dataset.subject === subject) &&
                card.textContent.toLowerCase().includes(query);

            card.hidden = !matches;

            if (matches) visible++;
        });

        $("studentQuizEmpty").hidden = visible > 0;

        $("studentQuizRecordCount").textContent =
            visible + (visible === 1 ? " quiz" : " quizzes");
    }

    /* QUIZ CARD EVENTS */

    quizList.addEventListener("click", event => {
        const button = event.target.closest(".student-quiz-start");

        if (!button || !quizzes[button.dataset.quiz]) return;

        const id = button.dataset.quiz;

        if (activeAttempt(id)) {
            currentQuizId = id;
            show();
            renderQuestion();
        } else {
            renderInstructions(id);
        }
    });

    /* QUESTION NUMBER NAVIGATION */

    host.addEventListener("click", event => {
        const jump = event.target.closest(
            'button[data-quiz-action="goto-question"]'
        );

        if (!jump) return;

        const quiz = quizzes[currentQuizId];
        const attempt = activeAttempt(currentQuizId);
        const index = Number(jump.dataset.questionIndex);

        if (
            !quiz ||
            !attempt ||
            !Number.isInteger(index) ||
            index < 0 ||
            index >= quiz.questions.length
        ) {
            return;
        }

        attempt.currentIndex = index;
        save();
        renderQuestion();
    });

    /* ANSWER SELECTION */

    host.addEventListener("change", event => {
        const input = event.target.closest(
            'input[name="studentQuizAnswer"]'
        );

        if (!input || stage !== "question") return;

        const quiz = quizzes[currentQuizId];
        const attempt = activeAttempt(currentQuizId);
        const index = Number(input.dataset.questionIndex);
        const value = Number(input.value);

        if (
            !quiz ||
            !attempt ||
            !Number.isInteger(index) ||
            !Number.isInteger(value) ||
            !quiz.questions[index] ||
            value < 0 ||
            value >= quiz.questions[index].options.length
        ) {
            return;
        }

        attempt.answers[index] = value;
        save();

        host.querySelectorAll(".student-quiz-option").forEach(label => {
            const radio = label.querySelector("input");

            label.classList.toggle(
                "selected",
                Boolean(radio && radio.checked)
            );
        });

        host.querySelectorAll(".student-quiz-question-number").forEach(button => {
            const i = Number(button.dataset.questionIndex);
            button.classList.toggle("answered", attempt.answers[i] !== null);
        });

        const answered = attempt.answers.filter(a => a !== null).length;
        const meta = host.querySelector(
            ".student-quiz-progress-meta span:first-child"
        );

        if (meta) {
            meta.textContent =
                "Answered " + answered + " of " + quiz.questions.length;
        }

        const track = host.querySelector(".student-quiz-progress-track");

        if (track) {
            track.setAttribute("aria-valuenow", String(answered));

            const fill = track.querySelector("span");

            if (fill) {
                fill.style.width =
                    (answered / quiz.questions.length * 100) + "%";
            }
        }
    });

    /* DIALOG ACTIONS */

    actions.addEventListener("click", event => {
        const button = event.target.closest("button[data-quiz-action]");

        if (!button || button.disabled) return;

        const action = button.dataset.quizAction;
        const quiz = quizzes[currentQuizId];
        const attempt = activeAttempt(currentQuizId);

        if (action === "close") {
            close();
            return;
        }

        if (action === "begin") {
            beginAttempt(currentQuizId);
            return;
        }

        if (!quiz || !attempt) return;

        if (action === "previous") {
            attempt.currentIndex = Math.max(0, attempt.currentIndex - 1);
            save();
            renderQuestion();

        } else if (action === "next") {
            attempt.currentIndex = Math.min(
                quiz.questions.length - 1,
                attempt.currentIndex + 1
            );
            save();
            renderQuestion();

        } else if (action === "goto-question") {
            const index = Number(button.dataset.questionIndex);

            if (
                Number.isInteger(index) &&
                index >= 0 &&
                index < quiz.questions.length
            ) {
                attempt.currentIndex = index;
                save();
                renderQuestion();
            }

        } else if (
            action === "review" ||
            action === "back-to-review"
        ) {
            renderReview();

        } else if (action === "back-to-questions") {
            renderQuestion();

        } else if (action === "confirm-submit") {
            const unanswered =
                attempt.answers.filter(a => a === null).length;

            if (unanswered) {
                say(
                    "Answer all questions before submitting. " +
                    unanswered + " remain unanswered.",
                    "error"
                );
            } else {
                renderConfirmation();
            }

        } else if (action === "confirm-final-submit") {
            submitAttempt();
        }
    });

    /* VIEW PREVIOUS RESULTS */

    historyBody.addEventListener("click", event => {
        const button = event.target.closest(
            'button[data-quiz-action="view-result"]'
        );

        if (!button) return;

        const record = state.completed.find(
            item => item.id === button.dataset.attemptId
        );

        if (record) renderResult(record);
    });

    /* PAGE CONTROLS */

    $("studentQuizClose").addEventListener("click", close);

    subjectFilter?.addEventListener("change", applyFilters);
    search?.addEventListener("input", applyFilters);

    search?.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            search.value = "";
            applyFilters();
        }
    });

    refresh();
    applyFilters();

    console.log(
        "Student Quizzes initialized. Available demo quizzes:",
        Object.keys(quizzes).length
    );
}



/* =====================================================
   F11.8 - GRADES AND FEEDBACK
   Released grades and feedback are independent.
   Frontend demonstration only.
===================================================== */

function initializeStudentGradesPage() {

    const $ = id => document.getElementById(id);

    const table = $("studentGradesTable");
    const subjectFilter = $("studentGradeSubjectFilter");
    const periodFilter = $("studentGradePeriodFilter");
    const search = $("studentPageSearch");

    if (!table || !subjectFilter || !periodFilter) return;

    const detailsDialog = $("studentGradeDetailsDialog");
    const detailsTitle = $("studentGradeDetailsTitle");
    const detailsSubtitle = $("studentGradeDetailsSubtitle");
    const detailsBody = $("studentGradeDetailsBody");

    const gradeRecords = [

        {
            id: "demo-grade-math-fractions",
            assessment: "Fractions Quiz",
            subject: "Mathematics",
            period: "First Quarter",
            score: 18,
            maximum: 20,
            gradeReleased: true,
            feedbackReleased: true,
            feedback: "Good work. Review the last two items.",
            releasedDate: "2026-11-26"
        },

        {
            id: "demo-grade-english-reading",
            assessment: "Reading Reflection",
            subject: "English",
            period: "First Quarter",
            score: 88,
            maximum: 100,
            gradeReleased: true,
            feedbackReleased: true,
            feedback: "Clear explanation and organized ideas.",
            releasedDate: "2026-11-25"
        },

        {
            id: "demo-grade-science-activity",
            assessment: "Science Activity Sheet",
            subject: "Science",
            period: "Second Quarter",
            score: 90,
            maximum: 100,
            gradeReleased: true,
            feedbackReleased: true,
            feedback: "Well-supported answers.",
            releasedDate: "2026-11-24"
        },

        {
            id: "demo-grade-math-worksheet-2",
            assessment: "Worksheet 2",
            subject: "Mathematics",
            period: "First Quarter",
            score: 19,
            maximum: 20,
            gradeReleased: true,
            feedbackReleased: false,
            feedback: null,
            releasedDate: "2026-11-22"
        }
    ];

    // These are separate fictional subject-grade records.
    // They are not calculated from individual assessment scores.
    const subjectGrades = [
        {
            subject: "Mathematics",
            period: "First Quarter",
            grade: 92,
            releasedDate: "2026-11-26"
        },
        {
            subject: "English",
            period: "First Quarter",
            grade: 88,
            releasedDate: "2026-11-25"
        },
        {
            subject: "Science",
            period: "Second Quarter",
            grade: 90,
            releasedDate: "2026-11-24"
        }
    ];

    /* SAFE ELEMENT CREATION */

    function makeElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== undefined && text !== null) {
            element.textContent = String(text);
        }

        return element;
    }

    function formatScore(record) {
        return record.score + " / " + record.maximum;
    }

    function formatPercentage(record) {
        return Math.round(
            record.score / record.maximum * 100
        ) + "%";
    }

    /* FILTERED DATA */

    function getVisibleRecords() {
        const subject = subjectFilter.value;
        const period = periodFilter.value;
        const query = (search?.value || "").trim().toLowerCase();

        return gradeRecords.filter(record => {

            // Never render unreleased grade records.
            if (!record.gradeReleased) return false;

            const matchesSubject =
                subject === "all" ||
                record.subject === subject;

            const matchesPeriod =
                period === "all" ||
                record.period === period;

            const searchableText = [
                record.assessment,
                record.subject,
                record.period,
                formatScore(record),
                formatPercentage(record),
                record.feedbackReleased ? record.feedback : ""
            ].join(" ").toLowerCase();

            const matchesSearch =
                searchableText.includes(query);

            return matchesSubject &&
                matchesPeriod &&
                matchesSearch;
        });
    }

    function getVisibleSubjectGrades() {
        const subject = subjectFilter.value;
        const period = periodFilter.value;
        const query = (search?.value || "").trim().toLowerCase();

        return subjectGrades.filter(record => {

            const matchesSubject =
                subject === "all" ||
                record.subject === subject;

            const matchesPeriod =
                period === "all" ||
                record.period === period;

            const searchableText = [
                record.subject,
                record.period,
                record.grade,
                formatDate(record.releasedDate)
            ].join(" ").toLowerCase();

            return matchesSubject &&
                matchesPeriod &&
                searchableText.includes(query);
        });
    }

    function formatDate(value) {
        if (typeof studentFormatDate === "function") {
            return studentFormatDate(value);
        }

        const [year, month, day] = value.split("-").map(Number);

        return new Intl.DateTimeFormat("en-PH", {
            day: "numeric",
            month: "short",
            year: "numeric"
        }).format(new Date(year, month - 1, day));
    }

    /* RELEASE STATUS */

    function createReleaseBadge(released) {
        return makeElement(
            "span",
            "student-task-status " +
                (released ? "submitted" : "pending"),
            released ? "Released" : "Not Released"
        );
    }

    /* SUBJECT GRADE OVERVIEW */

    function renderSubjectGrades() {
        const host = $("studentSubjectGradeList");
        const empty = $("studentSubjectGradeEmpty");

        if (!host) return;

        const records = getVisibleSubjectGrades();

        host.replaceChildren();

        records.forEach(record => {

            const card = document.createElement("article");
            card.className = "student-subject-grade-card";

            const header = document.createElement("div");
            header.className = "student-subject-grade-header";

            const icon = document.createElement("span");
            icon.className = "student-subject-grade-icon";

            const iconElement = document.createElement("i");
            iconElement.className = "bi bi-journal-check";
            icon.appendChild(iconElement);

            const name = document.createElement("div");
            name.className = "student-subject-grade-name";

            name.append(
                makeElement("strong", "", record.subject),
                makeElement("small", "", record.period)
            );

            header.append(icon, name);

            const grade = makeElement(
                "strong",
                "student-subject-grade-value",
                record.grade
            );

            const gradeCaption = makeElement(
                "span",
                "student-subject-grade-caption",
                "Released subject grade"
            );

            const release = createReleaseBadge(true);

            card.append(
                header,
                grade,
                gradeCaption,
                release
            );

            host.appendChild(card);
        });

        if (empty) {
            empty.hidden = records.length > 0;
        }

        const count = $("studentSubjectGradeCount");

        if (count) {
            count.textContent = String(records.length).padStart(2, "0");
        }
    }

    /* ASSESSMENT TABLE */

    function renderAssessmentTable() {
        const records = getVisibleRecords();
        table.replaceChildren();

        records.forEach(record => {

            const row = document.createElement("tr");
            row.dataset.gradeId = record.id;
            row.dataset.subject = record.subject;
            row.dataset.period = record.period;

            row.appendChild(
                makeElement("td", "", record.assessment)
            );

            row.appendChild(
                makeElement("td", "", record.subject)
            );

            row.appendChild(
                makeElement("td", "", record.period)
            );

            const scoreCell = document.createElement("td");

            const score = makeElement(
                "strong",
                "student-grade-score",
                formatScore(record)
            );

            const percentage = makeElement(
                "small",
                "student-grade-percentage",
                formatPercentage(record)
            );

            scoreCell.append(score, percentage);
            row.appendChild(scoreCell);

            const gradeReleaseCell = document.createElement("td");

            gradeReleaseCell.appendChild(
                createReleaseBadge(record.gradeReleased)
            );

            row.appendChild(gradeReleaseCell);

            const feedbackReleaseCell = document.createElement("td");

            feedbackReleaseCell.appendChild(
                createReleaseBadge(record.feedbackReleased)
            );

            row.appendChild(feedbackReleaseCell);

            const actionCell = document.createElement("td");

            const button = document.createElement("button");
            button.type = "button";
            button.className = "student-secondary-button";
            button.textContent = "View Details";
            button.dataset.gradeId = record.id;

            button.setAttribute(
                "aria-label",
                "View grade details for " + record.assessment
            );

            button.addEventListener("click", () => {
                openGradeDetails(record);
            });

            actionCell.appendChild(button);
            row.appendChild(actionCell);

            table.appendChild(row);
        });

        const empty = $("studentGradesEmpty");

        if (empty) {
            empty.hidden = records.length > 0;
        }

        const count = $("studentGradeRecordCount");

        if (count) {
            count.textContent =
                records.length +
                (records.length === 1 ? " record" : " records");
        }
    }

    /* SUMMARY COUNTS */

    function updateSummary() {
        const releasedGrades = gradeRecords.filter(
            record => record.gradeReleased
        );

        const releasedFeedback = releasedGrades.filter(
            record => record.feedbackReleased
        );

        const gradeCount = $("studentReleasedGradeCount");
        const feedbackCount = $("studentReleasedFeedbackCount");

        if (gradeCount) {
            gradeCount.textContent =
                String(releasedGrades.length).padStart(2, "0");
        }

        if (feedbackCount) {
            feedbackCount.textContent =
                String(releasedFeedback.length).padStart(2, "0");
        }
    }

    /* GRADE DETAILS */

    function openGradeDetails(record) {
        if (!detailsDialog || !detailsBody) return;

        if (!record.gradeReleased) return;

        if (detailsTitle) {
            detailsTitle.textContent = record.assessment;
        }

        if (detailsSubtitle) {
            detailsSubtitle.textContent =
                record.subject + " · " + record.period;
        }

        detailsBody.replaceChildren();

        const resultGrid = document.createElement("div");
        resultGrid.className = "student-grade-detail-grid";

        const resultItems = [
            ["Assessment Result", formatScore(record)],
            ["Percentage", formatPercentage(record)],
            ["Grading Period", record.period],
            ["Grade Released", formatDate(record.releasedDate)]
        ];

        resultItems.forEach(([label, value]) => {
            const item = document.createElement("div");
            item.className = "student-grade-detail-item";

            item.append(
                makeElement("span", "", label),
                makeElement("strong", "", value)
            );

            resultGrid.appendChild(item);
        });

        const gradeStatus = document.createElement("section");
        gradeStatus.className = "student-grade-detail-section";

        gradeStatus.append(
            makeElement("h3", "", "Grade Release Status"),
            createReleaseBadge(record.gradeReleased)
        );

        const feedbackSection = document.createElement("section");
        feedbackSection.className = "student-grade-detail-section";

        feedbackSection.appendChild(
            makeElement("h3", "", "Teacher Feedback")
        );

        if (record.feedbackReleased && record.feedback) {

            feedbackSection.appendChild(
                createReleaseBadge(true)
            );

            feedbackSection.appendChild(
                makeElement(
                    "p",
                    "student-grade-feedback-content",
                    record.feedback
                )
            );

        } else {
            feedbackSection.appendChild(
                createReleaseBadge(false)
            );

            feedbackSection.appendChild(
                makeElement(
                    "p",
                    "student-grade-feedback-unavailable",
                    "Teacher feedback has not been released for this assessment."
                )
            );
        }

        detailsBody.append(
            resultGrid,
            gradeStatus,
            feedbackSection
        );

        if (typeof detailsDialog.showModal === "function") {
            detailsDialog.showModal();
        } else {
            detailsDialog.setAttribute("open", "");
        }
    }

    /* CLOSE DETAILS DIALOG */

    function closeDetails() {
        if (detailsDialog?.open && detailsDialog.close) {
            detailsDialog.close();
        } else {
            detailsDialog?.removeAttribute("open");
        }
    }

    $("studentGradeDetailsClose")?.addEventListener(
        "click",
        closeDetails
    );

    $("studentGradeDetailsDone")?.addEventListener(
        "click",
        closeDetails
    );

    /* FILTER EVENTS */

    subjectFilter.addEventListener("change", renderAll);
    periodFilter.addEventListener("change", renderAll);

    if (search) {
        search.addEventListener("input", renderAll);
    }

    function renderAll() {
        renderSubjectGrades();
        renderAssessmentTable();
        updateSummary();
    }

    renderAll();

    console.log(
        "Student Grades & Feedback initialized.",
        {
            releasedGrades: gradeRecords.length,
            feedbackReleased: gradeRecords.filter(
                record => record.feedbackReleased
            ).length,
            subjectGrades: subjectGrades.length
        }
    );
}



/* =====================================================
   F11.9 - GRADE REVIEW REQUESTS
   Browser-local demonstration with request lifecycle.
   No real staff processing or database submission.
===================================================== */

function initializeStudentGradeReviewsPage() {

    const $ = id => document.getElementById(id);

    const form = $("studentGradeReviewForm");
    const recordSelect = $("studentGradeReviewRecord");
    const reasonInput = $("studentGradeReviewReason");
    const feedback = $("studentGradeReviewFeedback");
    const history = $("studentGradeReviewHistory");

    if (!form || !recordSelect || !reasonInput || !history) {
        return;
    }

    const STORAGE_KEY =
        "gabayaral.student.gradeReviewRequests.demo.v1";

    /* RELEASED GRADE RECORDS
       IDs match the F11.8 Grades & Feedback module.
    */

    const eligibleGrades = {
        "demo-grade-math-fractions": {
            id: "demo-grade-math-fractions",
            title: "Mathematics - Fractions Quiz",
            subject: "Mathematics",
            period: "First Quarter",
            score: "18 / 20",
            percentage: "90%"
        },

        "demo-grade-english-reading": {
            id: "demo-grade-english-reading",
            title: "English - Reading Reflection",
            subject: "English",
            period: "First Quarter",
            score: "88 / 100",
            percentage: "88%"
        },

        "demo-grade-science-activity": {
            id: "demo-grade-science-activity",
            title: "Science - Science Activity Sheet",
            subject: "Science",
            period: "Second Quarter",
            score: "90 / 100",
            percentage: "90%"
        },

        "demo-grade-math-worksheet-2": {
            id: "demo-grade-math-worksheet-2",
            title: "Mathematics - Worksheet 2",
            subject: "Mathematics",
            period: "First Quarter",
            score: "19 / 20",
            percentage: "95%"
        }
    };

    const STATUS_LABELS = {
        submitted: "Submitted",
        under_review: "Under Review",
        responded: "Responded",
        closed: "Closed"
    };

    const ACTIVE_STATUSES = new Set([
        "submitted",
        "under_review",
        "responded"
    ]);

    const STAFF_DEMO_RESPONSE =
        "Your grade review request has been examined in this demonstration. " +
        "The recorded assessment result has been reviewed against the sample " +
        "assessment information. This demonstration does not change the grade.";

    /* LOAD BROWSER-LOCAL RECORDS */

    function loadRequests() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);

            if (!raw) {
                return {
                    requests: [],
                    nextNumber: 1
                };
            }

            const parsed = JSON.parse(raw);

            if (
                !parsed ||
                !Array.isArray(parsed.requests) ||
                !Number.isInteger(parsed.nextNumber)
            ) {
                throw new Error("Invalid demonstration request storage.");
            }

            const validRequests = parsed.requests.filter(request =>
                request &&
                typeof request.id === "string" &&
                eligibleGrades[request.gradeId] &&
                typeof request.reason === "string" &&
                STATUS_LABELS[request.status] &&
                typeof request.createdAt === "string"
            );

            return {
                requests: validRequests,
                nextNumber: Math.max(1, parsed.nextNumber)
            };

        } catch (error) {
            console.warn(
                "Grade Review demo storage could not be read. Starting with empty history.",
                error
            );

            return {
                requests: [],
                nextNumber: 1
            };
        }
    }

    const state = loadRequests();

    function saveRequests() {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(state)
            );

            return true;

        } catch (error) {
            console.warn(
                "Grade Review demo storage is unavailable. Changes remain in memory.",
                error
            );

            return false;
        }
    }

    /* ELEMENT HELPERS */

    function makeElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== undefined && text !== null) {
            element.textContent = String(text);
        }

        return element;
    }

    function formatDateTime(value) {
        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "Not available";
        }

        return new Intl.DateTimeFormat("en-PH", {
            dateStyle: "medium",
            timeStyle: "short"
        }).format(date);
    }

    function showFeedback(message, type) {
        studentSetFeedback(feedback, message, type);
    }

    function activeRequestForGrade(gradeId) {
        return state.requests.find(request =>
            request.gradeId === gradeId &&
            ACTIVE_STATUSES.has(request.status)
        );
    }

    /* SELECTED GRADE DETAILS */

    function renderSelectedGrade() {
        const host = $("studentGradeReviewGradeDetails");

        if (!host) return;

        const grade = eligibleGrades[recordSelect.value];

        host.replaceChildren();

        if (!grade) {
            host.hidden = true;
            return;
        }

        host.hidden = false;

        const heading = makeElement(
            "strong",
            "",
            grade.title
        );

        const details = makeElement(
            "span",
            "",
            grade.subject + " · " + grade.period
        );

        const score = makeElement(
            "span",
            "",
            "Released result: " + grade.score + " (" +
            grade.percentage + ")"
        );

        host.append(heading, details, score);

        const existing = activeRequestForGrade(grade.id);

        if (existing) {
            host.appendChild(
                makeElement(
                    "small",
                    "student-review-duplicate-note",
                    "An active review request already exists: " + existing.id
                )
            );
        }
    }

    recordSelect.addEventListener("change", renderSelectedGrade);

    /* STATUS BADGE */

    function createStatusBadge(status) {
        return makeElement(
            "span",
            "student-review-status " + status,
            STATUS_LABELS[status] || "Unknown"
        );
    }

    /* DEMO STATUS TRANSITIONS */

    function advanceDemoStatus(request) {

        if (request.status === "submitted") {

            request.status = "under_review";
            request.updatedAt = new Date().toISOString();

            request.staffResponse = null;
            request.responseReleased = false;

        } else if (request.status === "under_review") {

            request.status = "responded";
            request.updatedAt = new Date().toISOString();

            request.staffResponse = STAFF_DEMO_RESPONSE;
            request.responseReleased = true;
            request.respondedAt = new Date().toISOString();

        } else if (request.status === "responded") {

            request.status = "closed";
            request.updatedAt = new Date().toISOString();
            request.closedAt = new Date().toISOString();
        }

        saveRequests();
        renderHistory();
        renderSummary();
        renderSelectedGrade();
    }

    /* REQUEST CARD */

    function createRequestCard(request) {

        const grade = eligibleGrades[request.gradeId];

        if (!grade) return null;

        const card = document.createElement("article");

        card.className =
            "student-grade-review-request-card student-searchable";

        card.dataset.requestId = request.id;
        card.dataset.gradeId = request.gradeId;

        /* HEADER */

        const header = document.createElement("div");
        header.className = "student-review-request-header";

        const titleGroup = document.createElement("div");

        titleGroup.append(
            makeElement("strong", "", grade.title),
            makeElement("small", "", request.id)
        );

        header.append(
            titleGroup,
            createStatusBadge(request.status)
        );

        /* REQUEST DETAILS */

        const details = document.createElement("div");
        details.className = "student-review-request-details";

        details.append(
            makeElement(
                "span",
                "",
                "Submitted: " + formatDateTime(request.createdAt)
            ),
            makeElement(
                "span",
                "",
                "Released grade: " + grade.score
            ),
            makeElement(
                "span",
                "",
                "Grading period: " + grade.period
            )
        );

        /* REASON */

        const reasonSection = document.createElement("div");
        reasonSection.className = "student-review-request-reason";

        reasonSection.append(
            makeElement("strong", "", "Reason for Review"),
            makeElement("p", "", request.reason)
        );

        /* STAFF RESPONSE
           Response content is shown only after release.
        */

        const responseSection = document.createElement("div");
        responseSection.className = "student-review-staff-response";

        if (
            request.responseReleased === true &&
            typeof request.staffResponse === "string"
        ) {
            responseSection.append(
                makeElement("strong", "", "Released Staff Response"),
                makeElement("p", "", request.staffResponse),
                makeElement(
                    "small",
                    "",
                    "Response released: " +
                    formatDateTime(request.respondedAt)
                )
            );

        } else {
            responseSection.append(
                makeElement(
                    "strong",
                    "",
                    "Staff Response"
                ),
                makeElement(
                    "p",
                    "student-review-response-pending",
                    "No staff response has been released in this demonstration."
                )
            );
        }

        /* STATUS TIMELINE */

        const timeline = document.createElement("div");
        timeline.className = "student-review-timeline";

        const stages = [
            "submitted",
            "under_review",
            "responded",
            "closed"
        ];

        const currentIndex = stages.indexOf(request.status);

        stages.forEach((status, index) => {
            const step = document.createElement("div");

            step.className =
                "student-review-timeline-step" +
                (index <= currentIndex ? " completed" : "");

            step.append(
                makeElement(
                    "span",
                    "student-review-timeline-dot",
                    index < currentIndex ? "✓" : String(index + 1)
                ),
                makeElement(
                    "small",
                    "",
                    STATUS_LABELS[status]
                )
            );

            timeline.appendChild(step);
        });

        /* DEMO STATUS CONTROL */

        const footer = document.createElement("div");
        footer.className = "student-review-request-footer";

        const updated = makeElement(
            "small",
            "",
            "Last updated: " +
            formatDateTime(request.updatedAt || request.createdAt)
        );

        footer.appendChild(updated);

        if (request.status !== "closed") {

            const advanceButton = document.createElement("button");

            advanceButton.type = "button";
            advanceButton.className = "student-secondary-button";
            advanceButton.textContent =
                request.status === "submitted"
                    ? "Demo: Move to Under Review"
                    : request.status === "under_review"
                        ? "Demo: Release Staff Response"
                        : "Demo: Close Request";

            advanceButton.setAttribute(
                "aria-label",
                "Simulate next staff status for " + request.id
            );

            advanceButton.addEventListener("click", () => {
                advanceDemoStatus(request);
            });

            footer.appendChild(advanceButton);

        } else {
            footer.appendChild(
                makeElement(
                    "span",
                    "student-review-closed-note",
                    "This demonstration request is closed."
                )
            );
        }

        card.append(
            header,
            details,
            reasonSection,
            responseSection,
            timeline,
            footer
        );

        return card;
    }

    /* REQUEST HISTORY */

    function renderHistory() {

        history.replaceChildren();

        const sorted = state.requests
            .slice()
            .sort((a, b) =>
                b.createdAt.localeCompare(a.createdAt)
            );

        sorted.forEach(request => {
            const card = createRequestCard(request);

            if (card) {
                history.appendChild(card);
            }
        });

        const empty = $("studentGradeReviewEmpty");

        if (empty) {
            empty.hidden = sorted.length > 0;
        }

        const count = $("studentGradeReviewCount");

        if (count) {
            count.textContent =
                sorted.length +
                (sorted.length === 1 ? " request" : " requests");
        }
    }

    /* SUMMARY COUNTS */

    function renderSummary() {

        const counts = {
            submitted: 0,
            under_review: 0,
            responded: 0,
            closed: 0
        };

        state.requests.forEach(request => {
            if (Object.hasOwn(counts, request.status)) {
                counts[request.status]++;
            }
        });

        const targets = {
            submitted: "studentReviewSubmittedCount",
            under_review: "studentReviewUnderReviewCount",
            responded: "studentReviewRespondedCount",
            closed: "studentReviewClosedCount"
        };

        Object.entries(targets).forEach(([status, id]) => {
            const element = $(id);

            if (element) {
                element.textContent =
                    String(counts[status]).padStart(2, "0");
            }
        });
    }

    /* SUBMIT NEW REQUEST */

    form.addEventListener("submit", event => {

        event.preventDefault();

        const gradeId = recordSelect.value;
        const grade = eligibleGrades[gradeId];
        const reason = reasonInput.value.trim();

        if (!grade) {
            showFeedback(
                "Select a valid released grade record.",
                "error"
            );

            recordSelect.focus();
            return;
        }

        if (reason.length < 15) {
            showFeedback(
                "Please provide at least 15 characters explaining your concern.",
                "error"
            );

            reasonInput.focus();
            return;
        }

        if (reason.length > 1000) {
            showFeedback(
                "Your explanation exceeds the 1,000-character limit.",
                "error"
            );

            reasonInput.focus();
            return;
        }

        const existing = activeRequestForGrade(gradeId);

        if (existing) {
            showFeedback(
                "An active request already exists for this released grade. Reference: " +
                existing.id +
                ". Review its status before submitting another request.",
                "error"
            );

            return;
        }

        const reference =
            "DEMO-GRR-" +
            String(state.nextNumber).padStart(4, "0");

        state.nextNumber++;

        const now = new Date().toISOString();

        const request = {
            id: reference,
            gradeId: gradeId,
            reason: reason,
            status: "submitted",
            createdAt: now,
            updatedAt: now,
            responseReleased: false,
            staffResponse: null,
            respondedAt: null,
            closedAt: null
        };

        state.requests.push(request);

        saveRequests();
        renderHistory();
        renderSummary();

        form.reset();
        renderSelectedGrade();

        showFeedback(
            "Your demonstration request was created successfully. Reference: " +
            reference +
            ". It has the status Submitted. No real school staff were notified.",
            "success"
        );

        console.log(
            "Student Grade Review Request created:",
            reference
        );
    });

    /* INITIAL PAGE RENDER */

    renderHistory();
    renderSummary();
    renderSelectedGrade();

    console.log(
        "Student Grade Review Requests initialized. Demo requests:",
        state.requests.length
    );
}


/* F11.10 - ANNOUNCEMENTS AND VERSION READS */
function initializeStudentAnnouncementsPage() {
    const list=document.getElementById("studentAnnouncementsList");const unread=document.getElementById("studentUnreadAnnouncements");if(!list)return;
    const readVersions=new Set();
    list.querySelectorAll(".student-announcement-open").forEach(button=>button.addEventListener("click",()=>{const card=button.closest("[data-version-id]");if(!card)return;const versionId=card.dataset.versionId;readVersions.add(versionId);const state=card.querySelector("[data-read-state]");if(state){state.textContent="Read";state.className="student-task-status submitted";}button.textContent="Opened · Read";button.disabled=true;if(unread)unread.textContent=String(list.querySelectorAll("[data-version-id]").length-readVersions.size).padStart(2,"0");}));
    console.log("Student Announcements initialized with version-specific demo reads.");
}

/* F11.11 - STUDENT CALENDAR */
/* F11.11 - STUDENT CALENDAR: MONTH, WEEK, LIST AND EVENT DETAILS */
function initializeStudentCalendarPage() {
    const monthGrid = document.getElementById("studentCalendarMonthGrid");
    if (!monthGrid) return;

    const el = {
        total: document.getElementById("studentCalendarTotal"),
        school: document.getElementById("studentCalendarSchool"),
        learning: document.getElementById("studentCalendarLearning"),
        upcoming: document.getElementById("studentCalendarUpcoming"),
        previous: document.getElementById("studentCalendarPrevious"),
        next: document.getElementById("studentCalendarNext"),
        today: document.getElementById("studentCalendarToday"),
        label: document.getElementById("studentCalendarCurrentLabel"),
        jumpDate: document.getElementById("studentCalendarJumpDate"),
        topbarSearch: document.getElementById("studentCalendarTopbarSearch"),
        search: document.getElementById("studentCalendarSearch"),
        typeFilter: document.getElementById("studentCalendarTypeFilter"),
        clear: document.getElementById("studentCalendarClearFilters"),
        monthView: document.getElementById("studentCalendarMonthView"),
        weekView: document.getElementById("studentCalendarWeekView"),
        listView: document.getElementById("studentCalendarListView"),
        weekGrid: document.getElementById("studentCalendarWeekGrid"),
        eventList: document.getElementById("studentCalendarEventList"),
        empty: document.getElementById("studentCalendarEmpty"),
        visibleCount: document.getElementById("studentCalendarVisibleCount"),
        modal: document.getElementById("studentCalendarEventDetailsModal"),
        modalTitle: document.getElementById("studentCalendarEventDetailsTitle"),
        modalBody: document.getElementById("studentCalendarEventDetailsBody")
    };

    const required = ["total", "school", "learning", "upcoming", "previous", "next", "today", "label", "jumpDate", "topbarSearch", "search", "typeFilter", "clear", "monthView", "weekView", "listView", "weekGrid", "eventList", "empty", "visibleCount", "modal", "modalTitle", "modalBody"];
    if (required.some(key => !el[key])) {
        console.error("Student Calendar is missing one or more required page elements.");
        return;
    }

    const today = atNoon(new Date());
    let currentDate = atNoon(today);
    let currentView = "month";
    const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const fullWeekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthFormatter = new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric" });
    const dateFormatter = new Intl.DateTimeFormat("en-PH", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    const modalInstance = window.bootstrap?.Modal ? window.bootstrap.Modal.getOrCreateInstance(el.modal) : null;

    function atNoon(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0);
    }
    function addDays(date, amount) {
        const result = atNoon(date);
        result.setDate(result.getDate() + amount);
        return result;
    }
    function dateKey(date) {
        const d = atNoon(date);
        return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
    }
    function parseDate(value) {
        const parts = value.split("-").map(Number);
        return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0, 0);
    }
    function startOfWeek(date) {
        return addDays(date, -date.getDay());
    }
    function makeEvent(id, title, category, offset, time, details, subject, location) {
        return { id, title, category, date: dateKey(addDays(today, offset)), time, details, subject, location };
    }

    // Fictional sample events use relative dates so the calendar remains current.
    const events = [
        makeEvent("student-school-assembly", "School Assembly", "school", 1, "8:00 AM", "A sample school assembly for eligible Student participants.", "School Activity", "School Grounds"),
        makeEvent("student-math-deadline", "Mathematics Worksheet 3 Deadline", "learning", 2, "11:59 PM", "Submit the Mathematics Worksheet 3 activity before the published deadline.", "Mathematics · Grade 7 - Sampaguita", "Online Activity"),
        makeEvent("student-preparation", "School Activity Preparation", "school", 3, "9:00 AM", "A sample preparation activity visible to the Student audience.", "School Activity", "Assigned School Venue"),
        makeEvent("student-english-deadline", "English Reading Reflection Deadline", "learning", 5, "11:59 PM", "Complete and submit the assigned English Reading Reflection.", "English · Grade 7 - Sampaguita", "Online Activity"),
        makeEvent("student-science-revision", "Science Activity Sheet Revision Deadline", "learning", 7, "5:00 PM", "A sample revision deadline for an existing Science submission. This does not reopen the original submission period.", "Science · Grade 7 - Sampaguita", "Online Activity"),
        makeEvent("student-community-program", "School Community Program", "school", 9, "1:00 PM", "A sample school community program with Student audience visibility.", "School Activity", "School Auditorium"),
        makeEvent("student-filipino-deadline", "Filipino Vocabulary Practice Deadline", "learning", 12, "11:59 PM", "Review and complete the Filipino vocabulary practice.", "Filipino · Grade 7 - Sampaguita", "Online Activity"),
        makeEvent("student-library-day", "School Library Day", "school", 16, "10:00 AM", "A sample library activity intended for eligible Students.", "School Activity", "School Library")
    ];

    function node(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }
    function visibleEvents() {
        const query = el.search.value.trim().toLowerCase();
        const type = el.typeFilter.value;
        return events.filter(event => {
            const matchesType = type === "all" || event.category === type;
            const haystack = [event.title, event.details, event.subject, event.location, event.category].join(" ").toLowerCase();
            return matchesType && haystack.includes(query);
        }).sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
    }
    function updateSummary() {
        const upcoming = events.filter(event => event.date >= dateKey(today));
        el.total.textContent = String(events.length);
        el.school.textContent = String(events.filter(event => event.category === "school").length);
        el.learning.textContent = String(events.filter(event => event.category === "learning").length);
        el.upcoming.textContent = String(upcoming.length);
    }
    function updateLabel() {
        if (currentView === "month" || currentView === "list") {
            el.label.textContent = monthFormatter.format(currentDate);
        } else if (currentView === "week") {
            const start = startOfWeek(currentDate);
            const end = addDays(start, 6);
            el.label.textContent = `${start.toLocaleDateString("en-PH", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}`;
        }
        el.jumpDate.value = dateKey(currentDate);
    }
    function eventButton(event, compact = false) {
        const button = node("button", `student-calendar-event-chip ${event.category === "learning" ? "learning" : "academic"}`, compact ? event.title : `${event.time} · ${event.title}`);
        button.type = "button";
        button.dataset.eventId = event.id;
        button.title = `${event.title} — ${event.time}`;
        return button;
    }
    function renderMonth(filtered) {
        monthGrid.replaceChildren();
        weekdayNames.forEach(day => monthGrid.appendChild(node("div", "student-calendar-weekday", day)));
        const first = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12);
        const gridStart = addDays(first, -first.getDay());
        for (let index = 0; index < 42; index += 1) {
            const day = addDays(gridStart, index);
            const key = dateKey(day);
            const cell = node("div", "student-calendar-day-cell");
            if (day.getMonth() !== currentDate.getMonth()) cell.classList.add("is-outside-month");
            if (key === dateKey(today)) cell.classList.add("is-today");
            cell.appendChild(node("span", "student-calendar-day-number", String(day.getDate())));
            const eventWrap = node("div", "student-calendar-day-events");
            const dayEvents = filtered.filter(event => event.date === key);
            dayEvents.slice(0, 3).forEach(event => eventWrap.appendChild(eventButton(event, true)));
            if (dayEvents.length > 3) eventWrap.appendChild(node("span", "student-calendar-more-events", `+${dayEvents.length - 3} more`));
            cell.appendChild(eventWrap);
            monthGrid.appendChild(cell);
        }
    }
    function renderWeek(filtered) {
        el.weekGrid.replaceChildren();
        const start = startOfWeek(currentDate);
        for (let index = 0; index < 7; index += 1) {
            const day = addDays(start, index);
            const key = dateKey(day);
            const column = node("section", "student-calendar-week-day");
            if (key === dateKey(today)) column.classList.add("is-today");
            const heading = node("div", "student-calendar-week-day-heading");
            heading.appendChild(node("strong", "", fullWeekdayNames[index]));
            heading.appendChild(node("span", "", String(day.getDate())));
            column.appendChild(heading);
            const eventsWrap = node("div", "student-calendar-week-events");
            filtered.filter(event => event.date === key).forEach(event => eventsWrap.appendChild(eventButton(event)));
            column.appendChild(eventsWrap);
            el.weekGrid.appendChild(column);
        }
    }
    function renderList(filtered) {
        el.eventList.replaceChildren();
        let lastDate = "";
        filtered.forEach(event => {
            if (event.date !== lastDate) {
                lastDate = event.date;
                el.eventList.appendChild(node("h3", "student-calendar-list-date-heading", dateFormatter.format(parseDate(event.date))));
            }
            const row = node("div", `student-calendar-list-item ${event.category === "learning" ? "learning" : "academic"}`);
            const dateBlock = node("div", "student-calendar-list-date");
            dateBlock.appendChild(node("strong", "", String(parseDate(event.date).getDate()).padStart(2, "0")));
            dateBlock.appendChild(node("span", "", parseDate(event.date).toLocaleDateString("en-PH", { month: "short" }).toUpperCase()));
            const info = node("div", "student-calendar-list-info");
            info.appendChild(node("strong", "", event.title));
            info.appendChild(node("small", "", `${event.time} · ${event.subject} · ${event.location}`));
            const action = node("button", "student-calendar-list-action");
            action.type = "button";
            action.dataset.eventId = event.id;
            action.setAttribute("aria-label", `View ${event.title}`);
            action.appendChild(node("i", "bi bi-arrow-right"));
            row.append(dateBlock, info, action);
            el.eventList.appendChild(row);
        });
    }
    function renderDetails(event) {
        el.modalTitle.textContent = event.title;
        el.modalBody.replaceChildren();
        const section = node("div", "student-calendar-detail-section");
        const badge = node("span", "student-calendar-visibility-badge", event.category === "school" ? "School Event" : "Learning Deadline");
        section.appendChild(badge);
        const grid = node("div", "student-calendar-detail-grid");
        [["Date", dateFormatter.format(parseDate(event.date))], ["Time", event.time], ["Subject / Type", event.subject], ["Location", event.location]].forEach(([label, value]) => {
            const item = node("div", "student-calendar-detail-item");
            item.appendChild(node("small", "", label));
            item.appendChild(node("strong", "", value));
            grid.appendChild(item);
        });
        section.appendChild(grid);
        section.appendChild(node("p", "student-calendar-detail-description", event.details));
        el.modalBody.appendChild(section);
        if (modalInstance) modalInstance.show();
    }
    function render() {
        const filtered = visibleEvents();
        el.monthView.hidden = currentView !== "month";
        el.weekView.hidden = currentView !== "week";
        el.listView.hidden = currentView !== "list";
        document.querySelectorAll("[data-calendar-view]").forEach(button => {
            const active = button.dataset.calendarView === currentView;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });
        if (currentView === "month") renderMonth(filtered);
        if (currentView === "week") renderWeek(filtered);
        if (currentView === "list") renderList(filtered);
        const periodEvents = currentView === "month"
            ? filtered.filter(event => { const d = parseDate(event.date); return d.getFullYear() === currentDate.getFullYear() && d.getMonth() === currentDate.getMonth(); })
            : currentView === "week"
                ? filtered.filter(event => { const d = parseDate(event.date); const start = startOfWeek(currentDate); return d >= start && d <= addDays(start, 6); })
                : filtered.filter(event => { const d = parseDate(event.date); return d.getFullYear() === currentDate.getFullYear() && d.getMonth() === currentDate.getMonth(); });
        el.empty.hidden = periodEvents.length > 0;
        el.visibleCount.textContent = `${periodEvents.length} visible event${periodEvents.length === 1 ? "" : "s"}`;
        updateLabel();
    }
    function setView(view) {
        if (!["month", "week", "list"].includes(view)) return;
        currentView = view;
        render();
    }
    function movePeriod(direction) {
        if (currentView === "month") currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1, 12);
        else currentDate = addDays(currentDate, direction * (currentView === "week" ? 7 : 30));
        render();
    }
    function syncSearch(source) {
        const target = source === el.search ? el.topbarSearch : el.search;
        if (target.value !== source.value) target.value = source.value;
        render();
    }
    function handleEventClick(event) {
        const button = event.target.closest("[data-event-id]");
        if (!button) return;
        const selected = events.find(item => item.id === button.dataset.eventId);
        if (selected) renderDetails(selected);
    }

    el.previous.addEventListener("click", () => movePeriod(-1));
    el.next.addEventListener("click", () => movePeriod(1));
    el.today.addEventListener("click", () => { currentDate = atNoon(today); render(); });
    el.jumpDate.addEventListener("change", () => { if (el.jumpDate.value) { currentDate = parseDate(el.jumpDate.value); render(); } });
    el.search.addEventListener("input", () => syncSearch(el.search));
    el.topbarSearch.addEventListener("input", () => syncSearch(el.topbarSearch));
    el.typeFilter.addEventListener("change", render);
    el.clear.addEventListener("click", () => { el.search.value = ""; el.topbarSearch.value = ""; el.typeFilter.value = "all"; render(); });
    document.querySelectorAll("[data-calendar-view]").forEach(button => button.addEventListener("click", () => setView(button.dataset.calendarView)));
    [monthGrid, el.weekGrid, el.eventList].forEach(container => container.addEventListener("click", handleEventClick));

    updateSummary();
    render();
    console.log("Student Calendar initialized with month, week, list, search, filters and event details.");
}



/* F11.12 - STUDENT NOTIFICATIONS */
function initializeStudentNotificationsPage() {
    const list=document.getElementById("studentNotificationsList");if(!list)return;
    const unreadCount=document.getElementById("studentUnreadNotificationCount");const allCount=document.getElementById("studentAllNotificationCount");
    function update(){const items=[...list.querySelectorAll("[data-notification-id]")];const unread=items.filter(item=>item.classList.contains("unread")).length;if(unreadCount)unreadCount.textContent=String(unread).padStart(2,"0");if(allCount)allCount.textContent=String(items.length).padStart(2,"0");}
    function markRead(item){item.classList.remove("unread");item.classList.add("read");const button=item.querySelector(".student-notification-read");if(button){const badge=studentCreateText("span","student-task-status submitted","Read");button.replaceWith(badge);}}
    list.querySelectorAll(".student-notification-read").forEach(button=>button.addEventListener("click",()=>{const item=button.closest("[data-notification-id]");if(item)markRead(item);update();}));
    const markAll=document.getElementById("studentMarkAllNotificationsRead");if(markAll)markAll.addEventListener("click",()=>{list.querySelectorAll("[data-notification-id].unread").forEach(markRead);update();});
    update();console.log("Student Notifications initialized.");
}

/* F11.13 - PROFILE, SECURITY AND EASYACCESS */
/* F11.13 - STUDENT EASYACCESS, PROFILE, SECURITY AND ACCOMMODATION */
const STUDENT_EASYACCESS_STORAGE_KEY = "gabayAral.student.easyAccess.v1.demo-student";

function getStudentEasyAccessDefaults() {
    return {
        fontFamily: "inter",
        textSize: "normal",
        highContrast: false,
        simplified: false,
        reduceMotion: false,
        language: "en",
        speechEnabled: false,
        speechVoice: "",
        speechSpeed: 1
    };
}

function readStudentEasyAccessPreferences() {
    const defaults = getStudentEasyAccessDefaults();
    try {
        const saved = JSON.parse(localStorage.getItem(STUDENT_EASYACCESS_STORAGE_KEY) || "null");
        if (!saved || typeof saved !== "object") return defaults;
        return {
            fontFamily: ["inter", "arial", "verdana"].includes(saved.fontFamily) ? saved.fontFamily : defaults.fontFamily,
            textSize: ["normal", "large", "extra-large"].includes(saved.textSize) ? saved.textSize : defaults.textSize,
            highContrast: saved.highContrast === true,
            simplified: saved.simplified === true,
            reduceMotion: saved.reduceMotion === true,
            language: ["en", "fil", "ceb", "ilo"].includes(saved.language) ? saved.language : defaults.language,
            speechEnabled: saved.speechEnabled === true,
            speechVoice: typeof saved.speechVoice === "string" ? saved.speechVoice : "",
            speechSpeed: Number.isFinite(Number(saved.speechSpeed)) ? Math.min(2, Math.max(0.5, Number(saved.speechSpeed))) : defaults.speechSpeed
        };
    } catch (error) {
        console.warn("Student EasyAccess preferences could not be read.", error);
        return defaults;
    }
}

function applyStudentEasyAccessPreferences(preferences) {
    const root = document.documentElement;
    root.dataset.studentEaFontFamily = preferences.fontFamily;
    root.dataset.studentEaTextSize = preferences.textSize;
    root.dataset.studentEaContrast = preferences.highContrast ? "high" : "normal";
    root.dataset.studentEaSimplified = String(preferences.simplified);
    root.dataset.studentEaMotion = preferences.reduceMotion ? "reduced" : "normal";

    const textScale = {
        normal: 1,
        large: 1.15,
        "extra-large": 1.30
    };
    applyStudentTextSizeScale(textScale[preferences.textSize] || 1);
}

/* Match Teacher EasyAccess text scaling without scaling card geometry. */
function applyStudentTextSizeScale(scale) {
    const roots = [...document.querySelectorAll(".student-app")];
    const excluded = "i,svg,path,img,script,style,link,meta,br,hr,canvas,video,audio";

    function hasDirectText(element) {
        return Array.from(element.childNodes).some(node =>
            node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
        );
    }

    function isTextElement(element) {
        return element instanceof HTMLElement &&
            !element.matches(excluded) &&
            (hasDirectText(element) || element.matches("input,select,textarea"));
    }

    function prepareElement(element) {
        if (!isTextElement(element)) return;
        if (!element.hasAttribute("data-student-ea-base-font-size")) {
            let baseSize = parseFloat(window.getComputedStyle(element).fontSize);
            const parent = element.parentElement;
            if (parent && parent.hasAttribute("data-student-ea-base-font-size")) {
                const parentCurrent = parseFloat(window.getComputedStyle(parent).fontSize);
                const parentBase = parseFloat(parent.dataset.studentEaBaseFontSize);
                if (Number.isFinite(parentCurrent) && Number.isFinite(parentBase) && Math.abs(baseSize - parentCurrent) < 0.5) {
                    baseSize = parentBase;
                }
            }
            element.dataset.studentEaBaseFontSize = String(baseSize);
        }
        const originalSize = parseFloat(element.dataset.studentEaBaseFontSize);
        if (!Number.isFinite(originalSize)) return;
        element.style.setProperty("font-size", `${(originalSize * scale).toFixed(2)}px`, "important");
    }

    roots.forEach(root => {
        const elements = [root, ...root.querySelectorAll("*")];
        elements.forEach(element => {
            if (!element.hasAttribute("data-student-ea-base-font-size") && isTextElement(element)) {
                let baseSize = parseFloat(window.getComputedStyle(element).fontSize);
                const parent = element.parentElement;
                if (parent && parent.hasAttribute("data-student-ea-base-font-size")) {
                    const parentCurrent = parseFloat(window.getComputedStyle(parent).fontSize);
                    const parentBase = parseFloat(parent.dataset.studentEaBaseFontSize);
                    if (Number.isFinite(parentCurrent) && Number.isFinite(parentBase) && Math.abs(baseSize - parentCurrent) < 0.5) {
                        baseSize = parentBase;
                    }
                }
                element.dataset.studentEaBaseFontSize = String(baseSize);
            }
        });
        elements.forEach(prepareElement);

        if (root.dataset.studentEaTextObserverAttached !== "true") {
            const observer = new MutationObserver(mutations => {
                const added = new Set();
                mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        added.add(node);
                        node.querySelectorAll("*").forEach(child => added.add(child));
                    } else if (node.nodeType === Node.TEXT_NODE) {
                        added.add(mutation.target);
                    }
                }));
                const candidates = [...added].filter(isTextElement);
                candidates.forEach(element => {
                    if (!element.hasAttribute("data-student-ea-base-font-size")) {
                        let baseSize = parseFloat(window.getComputedStyle(element).fontSize);
                        const parent = element.parentElement;
                        if (parent && parent.hasAttribute("data-student-ea-base-font-size")) {
                            const parentCurrent = parseFloat(window.getComputedStyle(parent).fontSize);
                            const parentBase = parseFloat(parent.dataset.studentEaBaseFontSize);
                            if (Number.isFinite(parentCurrent) && Number.isFinite(parentBase) && Math.abs(baseSize - parentCurrent) < 0.5) {
                                baseSize = parentBase;
                            }
                        }
                        element.dataset.studentEaBaseFontSize = String(baseSize);
                    }
                });
                candidates.forEach(prepareElement);
            });
            observer.observe(root, { childList: true, subtree: true });
            root.dataset.studentEaTextObserverAttached = "true";
        }
    });
}

function initializeStudentGlobalEasyAccessPreferences() {
    applyStudentEasyAccessPreferences(readStudentEasyAccessPreferences());
}

function initializeStudentSettingsPage() {
    const page = document.querySelector(".student-ea-page");
    const accommodationForm = document.getElementById("studentAccommodationForm");
    if (!page && !accommodationForm) return;

    const controls = {
        fontFamily: document.getElementById("studentEaFontFamily"),
        textSize: [...document.querySelectorAll('input[name="studentEaTextSize"]')],
        highContrast: document.getElementById("studentEaHighContrast"),
        simplified: document.getElementById("studentEaSimplified"),
        reduceMotion: document.getElementById("studentEaReduceMotion"),
        language: document.getElementById("studentEaLanguage"),
        speechEnabled: document.getElementById("studentEaSpeechEnabled"),
        speechVoice: document.getElementById("studentEaTtsVoice"),
        speechSpeed: document.getElementById("studentEaSpeechSpeed"),
        speechSpeedValue: document.getElementById("studentEaSpeechSpeedValue"),
        speechStatus: document.getElementById("studentEaSpeechStatus"),
        voiceStatus: document.getElementById("studentEaVoiceStatus"),
        preview: document.getElementById("studentEaPreview"),
        readButton: document.getElementById("studentEaReadPreview"),
        stopButton: document.getElementById("studentEaStopPreview"),
        saveButton: document.getElementById("studentEaSaveButton"),
        resetButton: document.getElementById("studentEaResetButton"),
        saveMessage: document.getElementById("studentEaSaveMessage")
    };

    const speechSupported = "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";
    let availableVoices = [];
    let currentUtterance = null;
    let preferences = readStudentEasyAccessPreferences();

    function showSaveMessage(message, isError = false) {
        if (!controls.saveMessage) return;
        controls.saveMessage.textContent = message;
        controls.saveMessage.classList.toggle("is-error", isError);
        controls.saveMessage.hidden = false;
    }
    function selectedTextSize() {
        return controls.textSize.find(input => input.checked)?.value || "normal";
    }
    function readFormPreferences() {
        return {
            fontFamily: controls.fontFamily.value,
            textSize: selectedTextSize(),
            highContrast: controls.highContrast.checked,
            simplified: controls.simplified.checked,
            reduceMotion: controls.reduceMotion.checked,
            language: controls.language.value,
            speechEnabled: controls.speechEnabled.checked,
            speechVoice: controls.speechVoice.value,
            speechSpeed: Number(controls.speechSpeed.value)
        };
    }
    function populateForm(value) {
        controls.fontFamily.value = value.fontFamily;
        controls.textSize.forEach(input => { input.checked = input.value === value.textSize; });
        controls.highContrast.checked = value.highContrast;
        controls.simplified.checked = value.simplified;
        controls.reduceMotion.checked = value.reduceMotion;
        controls.language.value = value.language;
        controls.speechEnabled.checked = value.speechEnabled;
        controls.speechSpeed.value = String(value.speechSpeed);
        controls.speechSpeedValue.textContent = Number(value.speechSpeed).toFixed(1) + "x";
        if ([...controls.speechVoice.options].some(option => option.value === value.speechVoice)) controls.speechVoice.value = value.speechVoice;
    }
    function applyLivePreview() {
        preferences = readFormPreferences();
        applyStudentEasyAccessPreferences(preferences);
        if (controls.preview) {
            controls.preview.style.fontFamily = preferences.fontFamily === "arial" ? "Arial, sans-serif" : preferences.fontFamily === "verdana" ? "Verdana, sans-serif" : "Inter, sans-serif";
            controls.preview.dataset.previewSize = preferences.textSize;
            controls.preview.dataset.previewContrast = preferences.highContrast ? "high" : "normal";
            controls.preview.dataset.previewSimplified = String(preferences.simplified);
        }
        if (controls.speechSpeedValue) controls.speechSpeedValue.textContent = preferences.speechSpeed.toFixed(1) + "x";
        updateSpeechStatus();
    }
    function updateSpeechStatus(message) {
        if (!controls.speechStatus) return;
        if (message) {
            controls.speechStatus.textContent = message;
            return;
        }
        if (!speechSupported) {
            controls.speechStatus.textContent = "Text-to-speech is not supported by this browser or device.";
            return;
        }
        controls.speechStatus.textContent = controls.speechEnabled.checked
            ? "Text-to-speech preview is enabled. Select Play Reading Preview to listen."
            : "Text-to-speech is currently disabled.";
    }
    function loadVoices() {
        if (!speechSupported) {
            controls.speechEnabled.disabled = true;
            controls.speechVoice.disabled = true;
            controls.readButton.disabled = true;
            controls.stopButton.disabled = true;
            if (controls.voiceStatus) controls.voiceStatus.textContent = "Speech voices are unavailable on this browser or device.";
            updateSpeechStatus();
            return;
        }
        availableVoices = window.speechSynthesis.getVoices();
        const selected = controls.speechVoice.value || preferences.speechVoice;
        controls.speechVoice.replaceChildren();
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Default Device Voice";
        controls.speechVoice.appendChild(defaultOption);
        availableVoices.slice().sort((a, b) => a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name)).forEach(voice => {
            const option = document.createElement("option");
            option.value = voice.voiceURI;
            option.textContent = `${voice.name} (${voice.lang})`;
            controls.speechVoice.appendChild(option);
        });
        if (availableVoices.some(voice => voice.voiceURI === selected)) controls.speechVoice.value = selected;
        if (controls.voiceStatus) controls.voiceStatus.textContent = `${availableVoices.length} device voice(s) available. Availability depends on your browser and device.`;
        updateSpeechStatus();
    }
    function stopSpeech(message = "Speech preview stopped.") {
        if (speechSupported) window.speechSynthesis.cancel();
        currentUtterance = null;
        updateSpeechStatus(message);
    }

    if (page) {
        populateForm(preferences);
        applyLivePreview();

        [controls.fontFamily, controls.highContrast, controls.simplified, controls.reduceMotion, controls.language, controls.speechEnabled, controls.speechVoice, controls.speechSpeed, ...controls.textSize].forEach(control => {
            control.addEventListener("input", applyLivePreview);
            control.addEventListener("change", applyLivePreview);
        });

        controls.saveButton.addEventListener("click", () => {
            const next = readFormPreferences();
            try {
                localStorage.setItem(STUDENT_EASYACCESS_STORAGE_KEY, JSON.stringify(next));
                preferences = next;
                applyStudentEasyAccessPreferences(preferences);
                showSaveMessage("Your accessibility preferences have been saved in this browser for the demonstration Student account.");
            } catch (error) {
                console.error("Student EasyAccess preferences could not be saved.", error);
                showSaveMessage("Preferences could not be saved in this browser. Check browser storage settings and try again.", true);
            }
        });

        controls.resetButton.addEventListener("click", () => {
            stopSpeech("Speech preview stopped. Default preferences restored.");
            const defaults = getStudentEasyAccessDefaults();
            populateForm(defaults);
            applyLivePreview();
            try {
                localStorage.setItem(STUDENT_EASYACCESS_STORAGE_KEY, JSON.stringify(defaults));
                preferences = defaults;
                showSaveMessage("Default accessibility preferences restored and saved in this browser.");
            } catch (error) {
                console.error("Student EasyAccess defaults could not be saved.", error);
                showSaveMessage("Defaults were applied for this page but could not be saved in browser storage.", true);
            }
        });

        controls.readButton.addEventListener("click", () => {
            if (!speechSupported) {
                updateSpeechStatus("Text-to-speech is not supported by this browser or device.");
                return;
            }
            if (!controls.speechEnabled.checked) {
                updateSpeechStatus("Enable Text-to-Speech before playing the reading preview.");
                return;
            }
            stopSpeech("");
            const text = controls.preview?.innerText || "Welcome to GabayAral Student Workspace. You can adjust your accessibility preferences here.";
            currentUtterance = new window.SpeechSynthesisUtterance(text);
            const languageMap = { en: "en-US", fil: "fil-PH", ceb: "ceb-PH", ilo: "ilo-PH" };
            currentUtterance.lang = languageMap[controls.language.value] || "en-US";
            currentUtterance.rate = Number(controls.speechSpeed.value);
            const chosenVoice = availableVoices.find(voice => voice.voiceURI === controls.speechVoice.value);
            if (chosenVoice) currentUtterance.voice = chosenVoice;
            currentUtterance.onstart = () => updateSpeechStatus("Reading the accessibility preview.");
            currentUtterance.onend = () => { currentUtterance = null; updateSpeechStatus("Reading preview finished."); };
            currentUtterance.onerror = event => { currentUtterance = null; updateSpeechStatus(event.error === "canceled" ? "Reading preview stopped." : "The device could not complete the speech preview. Try again."); };
            try {
                window.speechSynthesis.speak(currentUtterance);
            } catch (error) {
                console.error("Student speech preview could not start.", error);
                updateSpeechStatus("The reading preview could not be started on this device.");
            }
        });
        controls.stopButton.addEventListener("click", () => stopSpeech());

        if (speechSupported) {
            loadVoices();
            if (typeof window.speechSynthesis.addEventListener === "function") {
                window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
            } else {
                window.speechSynthesis.onvoiceschanged = loadVoices;
            }
        } else {
            loadVoices();
        }
    }

    if (accommodationForm) {
        const message = document.getElementById("studentAccommodationMessage");
        const feedback = document.getElementById("studentAccommodationFeedback");
        accommodationForm.addEventListener("submit", event => {
            event.preventDefault();
            if (!message.value.trim()) {
                studentSetFeedback(feedback, "Describe your concern before preparing the demonstration report.", "error");
                message.focus();
                return;
            }
            studentSetFeedback(feedback, "Demonstration report prepared locally. It was not sent or stored. Do not enter sensitive personal or medical information in this sample form.", "info");
            accommodationForm.reset();
        });
    }
    console.log("Student EasyAccess initialized. Preferences are browser-local demonstration settings.");
}

