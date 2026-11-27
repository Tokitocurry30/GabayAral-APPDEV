/* =========================================================
   GABAYARAL - PARENT/GUARDIAN WORKSPACE
   F12.2 Parent Dashboard + F12.3 My Children/Connections
   DEMONSTRATION ONLY. No real authentication or uploads.
========================================================= */
"use strict";
const PARENT_CONNECTION_STORAGE_KEY = "gabayaral.parent.connections.demo.v1";
/* =========================================================
   SHARED PARENT NAVIGATION REGISTRY
   Add each newly implemented Parent page here ONCE.
   Every existing Parent page renders the same navigation.
   ========================================================= */
const PARENT_NAV_GROUPS = [
    {
        label: "Overview",
        items: [
            { key: "dashboard", label: "Dashboard", href: "dashboard.html", icon: "bi-grid-1x2-fill" },
            { key: "children", label: "My Children", href: "children.html", icon: "bi-people" },
            { key: "connections", label: "Child Connections", href: "connections.html", icon: "bi-person-plus" }
        ]
    },
    {
        label: "School Updates",
        items: [
            { key: "announcements", label: "Announcements", href: "announcements.html", icon: "bi-megaphone" },
            { key: "acknowledgments", label: "Acknowledgments", href: "acknowledgments.html", icon: "bi-check2-square" },
            { key: "child-progress", label: "Child Progress", href: "child-progress.html", icon: "bi-graph-up-arrow" },
            { key: "calendar", label: "Calendar", href: "calendar.html", icon: "bi-calendar3" }
        ]
    },
    {
        label: "Personal",
        items: [
            { key: "notifications", label: "Notifications", href: "notifications.html", icon: "bi-bell" },
            { key: "settings", label: "EasyAccess & Profile", href: "settings.html", icon: "bi-universal-access" }
        ]
    }
];
function initializeParentSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar)
        return;
    const currentPage = document.body.dataset.parentPage || "";
    const fragment = document.createDocumentFragment();
    const brand = document.createElement("div");
    brand.className = "brand-block";
    const brandLink = document.createElement("a");
    brandLink.href = "dashboard.html";
    brandLink.className = "brand";
    brandLink.setAttribute("aria-label", "GabayAral Parent Dashboard");
    const brandIcon = document.createElement("i");
    brandIcon.className = "bi bi-book-half";
    const brandName = document.createElement("span");
    brandName.textContent = "GabayAral";
    brandLink.append(brandIcon, brandName);
    const role = document.createElement("span");
    role.className = "role-pill";
    role.textContent = "Parent/Guardian Workspace";
    brand.append(brandLink, role);
    fragment.appendChild(brand);
    const nav = document.createElement("nav");
    nav.className = "side-nav";
    nav.setAttribute("aria-label", "Parent and Guardian navigation");
    PARENT_NAV_GROUPS.forEach(group => {
        const groupElement = document.createElement("div");
        groupElement.className = "nav-group";
        const heading = document.createElement("p");
        heading.className = "nav-heading";
        heading.textContent = group.label;
        groupElement.appendChild(heading);
        group.items.forEach(item => {
            const link = document.createElement("a");
            link.className = "side-link";
            const isActive = item.key === currentPage;
            if (isActive) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            }
            if (item.href) {
                link.href = item.href;
            }
            else {
                link.href = "#";
                link.setAttribute("data-parent-demo-link", item.label);
            }
            const icon = document.createElement("i");
            icon.className = "bi " + item.icon;
            const label = document.createElement("span");
            label.textContent = item.label;
            link.append(icon, label);
            groupElement.appendChild(link);
        });
        nav.appendChild(groupElement);
    });
    fragment.appendChild(nav);
    const footer = document.createElement("div");
    footer.className = "sidebar-footer";
    const dot = document.createElement("span");
    dot.className = "footer-dot";
    footer.append(dot, document.createTextNode("Parent/Guardian Workspace"));
    fragment.appendChild(footer);
    sidebar.replaceChildren(fragment);
}
/* Render before layout.js handles DOMContentLoaded navigation events. */
initializeParentSidebar();
document.addEventListener("DOMContentLoaded", () => {
    initializeParentDate();
    initializeParentProfileMenu();
    initializeParentProfileNavigation();
    initializeParentGlobalEasyAccessPreferences();
    initializeParentEasyAccessPage();
    initializeParentNotificationNavigation();
    initializeParentDemoLinks();
    initializeParentDashboardSearch();
    initializeParentDashboardConnectionSummary();
    initializeParentChildrenPage();
    initializeParentConnectionsPage();
    initializeParentAnnouncementsPage();
    initializeParentAcknowledgmentsPage();
    initializeParentDashboardAnnouncementSummary();
    initializeParentChildProgressPage();
    initializeParentCalendarPage();
    initializeParentNotificationsPage();
    console.log("GabayAral Parent Workspace initialized.");
});
function parentText(tag, className, text) {
    const element = document.createElement(tag);
    if (className)
        element.className = className;
    if (text !== undefined && text !== null)
        element.textContent = String(text);
    return element;
}
function initializeParentDate() {
    const date = document.getElementById("parentCurrentDate");
    const year = document.getElementById("parentFooterYear");
    const now = new Date();
    if (date)
        date.textContent = now.toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    if (year)
        year.textContent = now.getFullYear();
}
function initializeParentProfileMenu() {
    const wrapper = document.getElementById("parentProfileWrapper");
    const button = document.getElementById("parentProfileButton");
    const menu = document.getElementById("parentProfileMenu");
    if (!wrapper || !button || !menu)
        return;
    const close = () => { menu.hidden = true; button.setAttribute("aria-expanded", "false"); };
    button.addEventListener("click", () => {
        const open = menu.hidden;
        menu.hidden = !open;
        button.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", event => { if (!wrapper.contains(event.target))
        close(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape" && !menu.hidden) {
        close();
        button.focus();
    } });
}
function initializeParentDemoLinks() {
    document.addEventListener("click", event => {
        const link = event.target.closest("[data-parent-demo-link]");
        if (!link)
            return;
        event.preventDefault();
        event.stopPropagation();
        window.alert((link.getAttribute("data-parent-demo-link") || "This feature") + " will be implemented in its own Parent/Guardian checkpoint. This is a demonstration placeholder only.");
    }, true);
}
function initializeParentDashboardSearch() {
    const input = document.getElementById("parentDashboardSearch");
    const empty = document.getElementById("parentSearchEmpty");
    if (!input)
        return;
    const items = document.querySelectorAll(".parent-content .parent-searchable");
    const filter = () => {
        const query = input.value.trim().toLowerCase();
        let visible = 0;
        items.forEach(item => {
            item.hidden = query !== "" && !item.textContent.toLowerCase().replace(/\s+/g, " ").includes(query);
            if (!item.hidden)
                visible++;
        });
        if (empty)
            empty.hidden = query === "" || visible > 0;
    };
    input.addEventListener("input", filter);
    input.addEventListener("keydown", event => { if (event.key === "Escape") {
        input.value = "";
        filter();
        input.blur();
    } });
}
function readParentConnectionState() {
    try {
        const parsed = JSON.parse(localStorage.getItem(PARENT_CONNECTION_STORAGE_KEY) || "null");
        const seed = {
            id: "DEMO-PCR-001",
            sectionCode: "DEMO-SECTION-001",
            status: "pending",
            createdAt: "2026-11-27T09:00:00.000Z",
            documents: [
                { label: "Parent/Guardian Identity", name: "SAMPLE_PARENT_ID.pdf", size: 240000, type: "application/pdf" },
                { label: "Child Relationship Evidence", name: "SAMPLE_PSA_DOCUMENT.pdf", size: 310000, type: "application/pdf" }
            ]
        };
        if (!parsed || !Array.isArray(parsed.requests) || !Number.isInteger(parsed.nextNumber)) {
            return { requests: [seed], nextNumber: 2 };
        }
        const statuses = ["pending", "referred", "approved", "rejected"];
        const requests = parsed.requests.filter(request => request && typeof request.id === "string" && typeof request.sectionCode === "string" && typeof request.createdAt === "string" && statuses.includes(request.status) && Array.isArray(request.documents));
        // Keep the Dashboard's existing DEMO-PCR-001 sample consistent across Parent pages.
        if (requests.length === 0 && parsed.nextNumber === 1)
            requests.push(seed);
        return { requests, nextNumber: Math.max(2, parsed.nextNumber) };
    }
    catch (error) {
        console.warn("Parent connection demo data could not be read.", error);
        return { requests: [], nextNumber: 1 };
    }
}
function initializeParentDashboardConnectionSummary() {
    const count = document.getElementById("parentPendingRequestsCount");
    if (!count)
        return;
    const state = readParentConnectionState();
    const pending = state.requests.filter(request => request.status === "pending" || request.status === "referred").length;
    count.textContent = String(pending).padStart(2, "0");
}
/* F12.3A - MY CHILDREN */
function initializeParentChildrenPage() {
    const list = document.getElementById("parentChildrenList");
    if (!list)
        return;
    const children = [
        { id: "child-demo-001", name: "Mika Santos", grade: "Grade 7", section: "Sampaguita", school: "Sample School Workspace", status: "Approved", color: "blue" },
        { id: "child-demo-002", name: "Liam Santos", grade: "Grade 4", section: "Mabini", school: "Sample School Workspace", status: "Approved", color: "teal" }
    ];
    let selectedId = "child-demo-001";
    const byId = id => document.getElementById(id);
    const search = byId("parentChildrenSearch");
    const empty = byId("parentChildrenEmpty");
    const pendingList = byId("parentPendingConnectionsList");
    function renderSelected() {
        const child = children.find(item => item.id === selectedId);
        if (!child)
            return;
        if (byId("parentSelectedChildName"))
            byId("parentSelectedChildName").textContent = child.name;
        if (byId("parentSelectedChildGrade"))
            byId("parentSelectedChildGrade").textContent = child.grade;
        if (byId("parentSelectedChildSection"))
            byId("parentSelectedChildSection").textContent = child.section;
        if (byId("parentSelectedChildSchool"))
            byId("parentSelectedChildSchool").textContent = child.school;
        if (byId("parentSelectedChildStatus"))
            byId("parentSelectedChildStatus").textContent = child.status;
        const avatar = document.querySelector("#parentSelectedChildPanel .parent-child-avatar");
        if (avatar)
            avatar.className = "parent-child-avatar " + child.color;
        list.querySelectorAll("[data-child-id]").forEach(button => {
            const active = button.dataset.childId === selectedId;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });
    }
    function renderPending() {
        if (!pendingList)
            return;
        pendingList.replaceChildren();
        const state = readParentConnectionState();
        const pending = state.requests.filter(request => request.status === "pending" || request.status === "referred");
        const counter = byId("parentChildrenPendingCount");
        if (counter)
            counter.textContent = String(pending.length).padStart(2, "0");
        if (!pending.length) {
            pendingList.appendChild(parentText("p", "parent-empty-inline", "There are no pending connection requests."));
            return;
        }
        pending.forEach(request => {
            const card = document.createElement("article");
            card.className = "parent-pending-child-card";
            const icon = document.createElement("span");
            icon.className = "parent-connection-icon";
            icon.innerHTML = '<i class="bi bi-hourglass-split"></i>';
            const details = document.createElement("div");
            details.append(parentText("strong", "", "Request " + request.id), parentText("span", "", "Parent Section Code: " + request.sectionCode), parentText("small", "", request.status === "referred" ? "Referred for further school review. No child access is granted." : "Pending verification. No child access is granted."));
            card.append(icon, details, parentText("span", "parent-pending-status", request.status === "referred" ? "Referred" : "Pending"));
            pendingList.appendChild(card);
        });
    }
    list.addEventListener("click", event => {
        const button = event.target.closest("[data-child-id]");
        if (!button)
            return;
        const child = children.find(item => item.id === button.dataset.childId);
        if (!child || child.status !== "Approved")
            return;
        selectedId = child.id;
        renderSelected();
    });
    function filterChildren() {
        const query = (search?.value || "").trim().toLowerCase();
        let visible = 0;
        list.querySelectorAll("[data-child-id]").forEach(button => {
            button.hidden = query !== "" && !button.textContent.toLowerCase().includes(query);
            if (!button.hidden)
                visible++;
        });
        if (empty)
            empty.hidden = visible > 0;
    }
    search?.addEventListener("input", filterChildren);
    search?.addEventListener("keydown", event => { if (event.key === "Escape") {
        search.value = "";
        filterChildren();
        search.blur();
    } });
    renderSelected();
    renderPending();
    filterChildren();
}
/* F12.3B - CHILD CONNECTIONS */
function initializeParentConnectionsPage() {
    const form = document.getElementById("parentConnectionForm");
    if (!form)
        return;
    const byId = id => document.getElementById(id);
    const codeInput = byId("parentSectionCode");
    const guardianInput = byId("parentGuardianIdFile");
    const relationshipInput = byId("parentChildRelationshipFile");
    const consent = byId("parentConnectionConsent");
    const feedback = byId("parentConnectionFeedback");
    const historyHost = byId("parentConnectionHistory");
    const search = byId("parentConnectionSearch");
    const searchEmpty = byId("parentConnectionSearchEmpty");
    const allowedExtensions = ["pdf", "jpg", "jpeg", "png"];
    const maxBytes = 10 * 1024 * 1024;
    const state = readParentConnectionState();
    function save() {
        try {
            localStorage.setItem(PARENT_CONNECTION_STORAGE_KEY, JSON.stringify(state));
            return true;
        }
        catch (error) {
            console.warn("Parent connection demo data could not be saved.", error);
            return false;
        }
    }
    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = "parent-form-feedback " + type;
        feedback.hidden = false;
    }
    function getFile(input) {
        const file = input?.files?.[0];
        if (!file)
            return { error: "This document is required." };
        const parts = file.name.split(".");
        const extension = parts.length > 1 ? parts.pop().toLowerCase() : "";
        if (!allowedExtensions.includes(extension))
            return { error: "Choose a PDF, JPG, JPEG or PNG file." };
        if (file.size > maxBytes)
            return { error: "The selected file exceeds the 10 MB demonstration limit." };
        return { file: { name: file.name, size: file.size, type: file.type || "Unknown file type" } };
    }
    function formatBytes(bytes) {
        if (bytes < 1024)
            return bytes + " B";
        if (bytes < 1024 * 1024)
            return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    }
    function showFileInfo(input, hostId) {
        const host = byId(hostId);
        if (!host)
            return;
        host.replaceChildren();
        if (!input.files?.length)
            return;
        const result = getFile(input);
        host.appendChild(parentText("span", result.error ? "parent-document-error" : "parent-document-file-label", result.error || (result.file.name + " · " + formatBytes(result.file.size))));
    }
    guardianInput?.addEventListener("change", () => showFileInfo(guardianInput, "parentGuardianIdFileInfo"));
    relationshipInput?.addEventListener("change", () => showFileInfo(relationshipInput, "parentChildRelationshipFileInfo"));
    function statusName(status) {
        return { pending: "Pending", referred: "Referred", approved: "Approved", rejected: "Rejected" }[status] || "Unknown";
    }
    function renderHistory() {
        historyHost.replaceChildren();
        const sorted = state.requests.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        sorted.forEach(request => {
            const card = document.createElement("article");
            card.className = "parent-connection-history-card";
            card.dataset.requestId = request.id;
            const header = document.createElement("div");
            header.className = "parent-connection-history-header";
            const title = document.createElement("div");
            title.append(parentText("strong", "", request.id), parentText("small", "", "Submitted " + new Date(request.createdAt).toLocaleString("en-PH")));
            header.append(title, parentText("span", "parent-request-status " + request.status, statusName(request.status)));
            const code = parentText("p", "", "Parent Section Code: " + request.sectionCode);
            const documents = document.createElement("div");
            documents.className = "parent-connection-document-summary";
            request.documents.forEach(doc => {
                const item = document.createElement("div");
                item.append(parentText("strong", "", doc.label), parentText("small", "", doc.name + " · " + formatBytes(doc.size)));
                documents.appendChild(item);
            });
            const message = request.status === "approved"
                ? "This is a demonstration status only. Real academic access is granted by the Backend after authorized verification."
                : request.status === "rejected"
                    ? "This demonstration request was not approved."
                    : request.status === "referred"
                        ? "This demonstration request was referred for further authorized school review. No child access is granted."
                        : "Pending authorized verification. No child academic information is accessible.";
            card.append(header, code, documents, parentText("p", "parent-connection-history-notice", message));
            historyHost.appendChild(card);
        });
        const empty = byId("parentConnectionHistoryEmpty");
        if (empty)
            empty.hidden = sorted.length > 0;
        const count = byId("parentConnectionHistoryCount");
        if (count)
            count.textContent = sorted.length + (sorted.length === 1 ? " request" : " requests");
        const dashboardCount = document.getElementById("parentPendingRequestsCount");
        if (dashboardCount) {
            const pending = state.requests.filter(request => request.status === "pending" || request.status === "referred").length;
            dashboardCount.textContent = String(pending).padStart(2, "0");
        }
    }
    form.addEventListener("submit", event => {
        event.preventDefault();
        const sectionCode = codeInput.value.trim();
        if (!sectionCode) {
            showFeedback("Enter the Parent Section Code supplied by the school.", "error");
            codeInput.focus();
            return;
        }
        const guardian = getFile(guardianInput);
        if (guardian.error) {
            showFeedback("Parent/Guardian identity document: " + guardian.error, "error");
            guardianInput.focus();
            return;
        }
        const relationship = getFile(relationshipInput);
        if (relationship.error) {
            showFeedback("Child relationship evidence: " + relationship.error, "error");
            relationshipInput.focus();
            return;
        }
        if (!consent.checked) {
            showFeedback("Please confirm that you understand the demonstration verification process.", "error");
            consent.focus();
            return;
        }
        const duplicate = state.requests.some(request => request.sectionCode.toLowerCase() === sectionCode.toLowerCase() && ["pending", "referred", "approved"].includes(request.status));
        if (duplicate) {
            showFeedback("An active demonstration request already exists for this code. Check your request history.", "error");
            return;
        }
        const reference = "DEMO-PCR-" + String(state.nextNumber++).padStart(3, "0");
        state.requests.push({
            id: reference,
            sectionCode,
            status: "pending",
            createdAt: new Date().toISOString(),
            documents: [
                { label: "Parent/Guardian Identity", name: guardian.file.name, size: guardian.file.size, type: guardian.file.type },
                { label: "Child Relationship Evidence", name: relationship.file.name, size: relationship.file.size, type: relationship.file.type }
            ]
        });
        save();
        renderHistory();
        form.reset();
        byId("parentGuardianIdFileInfo").replaceChildren();
        byId("parentChildRelationshipFileInfo").replaceChildren();
        showFeedback("Demonstration request created. Reference: " + reference + ". Status: Pending. The section code has not been validated by a school server, and no document contents were uploaded.", "success");
        console.log("Parent demonstration connection request created:", reference);
    });
    function filterHistory() {
        const query = (search?.value || "").trim().toLowerCase();
        let visible = 0;
        historyHost.querySelectorAll(".parent-connection-history-card").forEach(card => {
            card.hidden = query !== "" && !card.textContent.toLowerCase().includes(query);
            if (!card.hidden)
                visible++;
        });
        if (searchEmpty)
            searchEmpty.hidden = query === "" || visible > 0;
    }
    search?.addEventListener("input", filterHistory);
    search?.addEventListener("keydown", event => { if (event.key === "Escape") {
        search.value = "";
        filterHistory();
        search.blur();
    } });
    renderHistory();
}
/* =========================================================
   F12.4 - PARENT/GUARDIAN ANNOUNCEMENTS
   Only Parent/Guardian-audience demo records are included.
========================================================= */
const PARENT_ACKNOWLEDGMENT_STORAGE_KEY = "gabayaral.parent.acknowledgments.demo.v1";
const PARENT_ANNOUNCEMENTS = [
    {
        id: "ANN-PAR-001",
        version: 1,
        title: "Upcoming School Activities",
        category: "School Activities",
        publishedAt: "2026-11-27T08:00:00+08:00",
        audience: "Parent/Guardian",
        requiresAcknowledgment: false,
        summary: "A reminder about upcoming school activities and the importance of checking the school calendar.",
        body: "Parents and Guardians are encouraged to review the upcoming school activities and dates shared through the Parent/Guardian Workspace. Please check the school calendar for the applicable schedule. This is a fictional demonstration announcement."
    },
    {
        id: "ANN-PAR-002",
        version: 2,
        title: "Parent Orientation and Consultation Schedule",
        category: "School Advisory",
        publishedAt: "2026-11-26T09:00:00+08:00",
        audience: "Parent/Guardian",
        requiresAcknowledgment: true,
        summary: "Please review the sample Parent Orientation and consultation schedule.",
        body: "The school invites Parents and Guardians to review the orientation and consultation schedule. Please check the official school communication for the final venue and time. Your acknowledgment confirms receipt or awareness of this announcement version; it does not mean agreement with every statement. This is a fictional demonstration announcement."
    },
    {
        id: "ANN-PAR-003",
        version: 1,
        title: "Updated School Safety and Pick-up Guidelines",
        category: "Important Notice",
        publishedAt: "2026-11-25T10:00:00+08:00",
        audience: "Parent/Guardian",
        requiresAcknowledgment: true,
        summary: "Review the sample school safety and authorized pick-up reminders.",
        body: "Parents and Guardians are reminded to follow the school's authorized pick-up procedures and safety reminders. Coordinate with the school office if your authorized pick-up arrangements need updating. Acknowledgment confirms receipt or awareness of this exact announcement version. This is a fictional demonstration announcement."
    }
];
function readParentAcknowledgments() {
    try {
        const parsed = JSON.parse(localStorage.getItem(PARENT_ACKNOWLEDGMENT_STORAGE_KEY) || "[]");
        if (!Array.isArray(parsed))
            return [];
        return parsed.filter(record => record &&
            typeof record.announcementId === "string" &&
            Number.isInteger(record.version) &&
            typeof record.acknowledgedAt === "string");
    }
    catch (error) {
        console.warn("Parent acknowledgment demo records could not be read.", error);
        return [];
    }
}
function saveParentAcknowledgments(records) {
    try {
        localStorage.setItem(PARENT_ACKNOWLEDGMENT_STORAGE_KEY, JSON.stringify(records));
        return true;
    }
    catch (error) {
        console.warn("Parent acknowledgment demo records could not be saved.", error);
        return false;
    }
}
function parentAnnouncementAcknowledged(announcement, records = readParentAcknowledgments()) {
    return records.some(record => record.announcementId === announcement.id &&
        record.version === announcement.version);
}
function formatParentAnnouncementDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime()))
        return "Date unavailable";
    return new Intl.DateTimeFormat("en-PH", {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(date);
}
function recordParentAcknowledgment(announcement) {
    if (!announcement || !announcement.requiresAcknowledgment)
        return false;
    const records = readParentAcknowledgments();
    if (parentAnnouncementAcknowledged(announcement, records))
        return true;
    const confirmed = window.confirm("Confirm that you have received or become aware of this announcement version?\n\n" +
        "This acknowledgment does not mean that you agree with every statement.");
    if (!confirmed)
        return false;
    records.push({
        announcementId: announcement.id,
        version: announcement.version,
        title: announcement.title,
        acknowledgedAt: new Date().toISOString()
    });
    const saved = saveParentAcknowledgments(records);
    if (!saved) {
        window.alert("Browser storage is unavailable. The acknowledgment could not be saved.");
        return false;
    }
    return true;
}
function updateParentAcknowledgmentCounts() {
    const required = PARENT_ANNOUNCEMENTS.filter(item => item.requiresAcknowledgment);
    const records = readParentAcknowledgments();
    const completed = required.filter(item => parentAnnouncementAcknowledged(item, records)).length;
    const pending = required.length - completed;
    const values = {
        parentAnnouncementRequiredCount: required.length,
        parentAnnouncementAcknowledgedCount: completed,
        parentAckRequiredCount: required.length,
        parentAckCompletedCount: completed,
        parentAckPendingCount: pending,
        parentAcknowledgmentRequiredCount: required.length,
        parentAcknowledgmentCompletedCount: completed,
        parentAcknowledgmentPendingCount: pending
    };
    Object.entries(values).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element)
            element.textContent = String(value).padStart(2, "0");
    });
}
function initializeParentDashboardAnnouncementSummary() {
    const count = document.getElementById("parentNewAnnouncementsCount");
    if (count)
        count.textContent = String(PARENT_ANNOUNCEMENTS.length).padStart(2, "0");
    updateParentAcknowledgmentCounts();
}
/* F12.4A - ANNOUNCEMENTS PAGE */
function initializeParentAnnouncementsPage() {
    const host = document.getElementById("parentAnnouncementsList");
    if (!host)
        return;
    const search = document.getElementById("parentAnnouncementSearch");
    const categoryFilter = document.getElementById("parentAnnouncementCategoryFilter");
    const ackFilter = document.getElementById("parentAnnouncementAckFilter");
    const empty = document.getElementById("parentAnnouncementsEmpty");
    const searchEmpty = document.getElementById("parentAnnouncementSearchEmpty");
    const count = document.getElementById("parentAnnouncementListCount");
    function render() {
        const query = (search?.value || "").trim().toLowerCase();
        const category = categoryFilter?.value || "all";
        const ackMode = ackFilter?.value || "all";
        const records = readParentAcknowledgments();
        const visible = PARENT_ANNOUNCEMENTS.filter(item => {
            // Audience is explicitly fixed to Parent/Guardian in this demo dataset.
            if (item.audience !== "Parent/Guardian")
                return false;
            const acknowledged = parentAnnouncementAcknowledged(item, records);
            const text = [item.title, item.category, item.summary, item.body, item.id].join(" ").toLowerCase();
            const matchesSearch = text.includes(query);
            const matchesCategory = category === "all" || item.category === category;
            const matchesAck = ackMode === "all" ||
                (ackMode === "required" && item.requiresAcknowledgment) ||
                (ackMode === "not-required" && !item.requiresAcknowledgment) ||
                (ackMode === "pending" && item.requiresAcknowledgment && !acknowledged) ||
                (ackMode === "acknowledged" && item.requiresAcknowledgment && acknowledged);
            return matchesSearch && matchesCategory && matchesAck;
        });
        host.replaceChildren();
        visible.forEach(item => {
            const card = document.createElement("article");
            card.className = "parent-announcement-card";
            card.dataset.announcementId = item.id;
            card.dataset.version = String(item.version);
            const top = document.createElement("div");
            top.className = "parent-announcement-card-top";
            const heading = document.createElement("div");
            heading.className = "parent-announcement-card-heading";
            heading.append(parentText("span", "parent-announcement-category", item.category), parentText("h3", "", item.title), parentText("small", "", "Published " + formatParentAnnouncementDate(item.publishedAt) + " · Version " + item.version));
            const status = item.requiresAcknowledgment
                ? parentText("span", "parent-request-status " + (parentAnnouncementAcknowledged(item, records) ? "approved" : "pending"), parentAnnouncementAcknowledged(item, records) ? "Acknowledged" : "Acknowledgment Required")
                : parentText("span", "parent-request-status approved", "Information Only");
            top.append(heading, status);
            const audience = parentText("span", "parent-announcement-audience", "Audience: " + item.audience);
            const summary = parentText("p", "parent-announcement-summary", item.summary);
            const details = document.createElement("details");
            details.className = "parent-announcement-details";
            const summaryLine = document.createElement("summary");
            summaryLine.textContent = "Read full announcement";
            details.append(summaryLine, parentText("p", "", item.body));
            const footer = document.createElement("div");
            footer.className = "parent-announcement-card-footer";
            if (item.requiresAcknowledgment && !parentAnnouncementAcknowledged(item, records)) {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "parent-primary-button";
                button.dataset.parentAckAction = item.id;
                button.textContent = "Acknowledge this announcement";
                footer.appendChild(button);
            }
            else if (item.requiresAcknowledgment) {
                footer.appendChild(parentText("span", "parent-acknowledged-note", "Acknowledged " + formatParentAnnouncementDate(records.find(record => record.announcementId === item.id && record.version === item.version).acknowledgedAt)));
            }
            else {
                footer.appendChild(parentText("span", "parent-acknowledged-note", "No acknowledgment required"));
            }
            card.append(top, audience, summary, details, footer);
            host.appendChild(card);
        });
        if (empty)
            empty.hidden = visible.length > 0 || query !== "";
        if (searchEmpty)
            searchEmpty.hidden = query === "" || visible.length > 0;
        if (count)
            count.textContent = visible.length + (visible.length === 1 ? " announcement" : " announcements");
        updateParentAcknowledgmentCounts();
    }
    host.addEventListener("click", event => {
        const button = event.target.closest("[data-parent-ack-action]");
        if (!button)
            return;
        const announcement = PARENT_ANNOUNCEMENTS.find(item => item.id === button.dataset.parentAckAction);
        if (!announcement)
            return;
        if (recordParentAcknowledgment(announcement)) {
            render();
        }
    });
    search?.addEventListener("input", render);
    categoryFilter?.addEventListener("change", render);
    ackFilter?.addEventListener("change", render);
    search?.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            search.value = "";
            render();
            search.blur();
        }
    });
    render();
}
/* F12.4B - ACKNOWLEDGMENTS PAGE */
function initializeParentAcknowledgmentsPage() {
    const host = document.getElementById("parentAcknowledgmentsList");
    if (!host)
        return;
    const search = document.getElementById("parentAcknowledgmentSearch");
    const statusFilter = document.getElementById("parentAckStatusFilter");
    const empty = document.getElementById("parentAcknowledgmentsEmpty");
    const searchEmpty = document.getElementById("parentAckSearchEmpty");
    const count = document.getElementById("parentAckListCount");
    function render() {
        const query = (search?.value || "").trim().toLowerCase();
        const filter = statusFilter?.value || "all";
        const records = readParentAcknowledgments();
        const required = PARENT_ANNOUNCEMENTS.filter(item => item.audience === "Parent/Guardian" && item.requiresAcknowledgment);
        const visible = required.filter(item => {
            const ack = records.find(record => record.announcementId === item.id && record.version === item.version);
            const status = ack ? "acknowledged" : "pending";
            const text = [item.title, item.category, item.summary, item.id, "version " + item.version].join(" ").toLowerCase();
            return text.includes(query) && (filter === "all" || filter === status);
        });
        host.replaceChildren();
        visible.forEach(item => {
            const ack = records.find(record => record.announcementId === item.id && record.version === item.version);
            const card = document.createElement("article");
            card.className = "parent-acknowledgment-card";
            card.dataset.announcementId = item.id;
            card.dataset.version = String(item.version);
            const header = document.createElement("div");
            header.className = "parent-acknowledgment-card-header";
            const title = document.createElement("div");
            title.append(parentText("span", "parent-announcement-category", item.category), parentText("h3", "", item.title), parentText("small", "", "Announcement " + item.id + " · Version " + item.version));
            header.append(title, parentText("span", "parent-request-status " + (ack ? "approved" : "pending"), ack ? "Acknowledged" : "Pending"));
            const description = parentText("p", "", item.summary);
            const meta = document.createElement("div");
            meta.className = "parent-acknowledgment-meta";
            meta.append(parentText("span", "", "Published: " + formatParentAnnouncementDate(item.publishedAt)), parentText("span", "", "Audience: Parent/Guardian"));
            const footer = document.createElement("div");
            footer.className = "parent-announcement-card-footer";
            if (ack) {
                footer.appendChild(parentText("span", "parent-acknowledged-note", "Acknowledged on " + formatParentAnnouncementDate(ack.acknowledgedAt)));
            }
            else {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "parent-primary-button";
                button.dataset.parentAckAction = item.id;
                button.textContent = "Acknowledge";
                footer.appendChild(button);
            }
            card.append(header, description, meta, footer);
            host.appendChild(card);
        });
        if (empty)
            empty.hidden = visible.length > 0 || query !== "";
        if (searchEmpty)
            searchEmpty.hidden = query === "" || visible.length > 0;
        if (count)
            count.textContent = visible.length + (visible.length === 1 ? " record" : " records");
        updateParentAcknowledgmentCounts();
    }
    host.addEventListener("click", event => {
        const button = event.target.closest("[data-parent-ack-action]");
        if (!button)
            return;
        const announcement = PARENT_ANNOUNCEMENTS.find(item => item.id === button.dataset.parentAckAction);
        if (!announcement)
            return;
        if (recordParentAcknowledgment(announcement))
            render();
    });
    search?.addEventListener("input", render);
    statusFilter?.addEventListener("change", render);
    search?.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            search.value = "";
            render();
            search.blur();
        }
    });
    render();
}

/* =========================================================
   F12.5 - CHILD PROGRESS
   Displays permitted status information and released grades
   for verified demonstration child connections only.
   Does not display Student files or private Teacher notes.
========================================================= */
function initializeParentChildProgressPage() {
    const childSelect = document.getElementById("parentProgressChildSelect");
    if (!childSelect)
        return;

    const search = document.getElementById("parentProgressSearch");
    const viewButtons = document.querySelectorAll("[data-progress-view]");
    const sections = document.querySelectorAll("[data-progress-section]");
    const searchEmpty = document.getElementById("parentProgressSearchEmpty");

    const verifiedChildren = {
        "child-demo-001": {
            id: "child-demo-001",
            name: "Mika Santos",
            grade: "Grade 7",
            section: "Sampaguita",
            school: "Sample School Workspace",
            activities: [
                {
                    title: "Mathematics Worksheet 3",
                    subject: "Mathematics",
                    deadline: "2026-11-29",
                    deadlineLabel: "Initial deadline",
                    status: "Pending",
                    statusKey: "pending"
                },
                {
                    title: "Reading Reflection",
                    subject: "English",
                    deadline: "2026-12-01",
                    deadlineLabel: "Initial deadline",
                    status: "Pending",
                    statusKey: "pending"
                },
                {
                    title: "Science Activity Sheet",
                    subject: "Science",
                    deadline: "2026-11-30",
                    deadlineLabel: "Revision deadline",
                    status: "Revision Required",
                    statusKey: "revision"
                },
                {
                    title: "AP Source Analysis",
                    subject: "Araling Panlipunan",
                    deadline: "2026-11-27",
                    deadlineLabel: "Initial deadline",
                    status: "Submitted",
                    statusKey: "submitted"
                }
            ],
            submissions: [
                {
                    activity: "Mathematics Worksheet 2",
                    subject: "Mathematics",
                    method: "FILE",
                    submittedAt: "2026-11-25T09:00:00+08:00",
                    status: "Submitted",
                    statusKey: "submitted"
                },
                {
                    activity: "Science Activity Sheet",
                    subject: "Science",
                    method: "FILE",
                    submittedAt: "2026-11-23T10:30:00+08:00",
                    status: "Revision Required",
                    statusKey: "revision",
                    revisionDeadline: "2026-11-30"
                },
                {
                    activity: "AP Source Analysis",
                    subject: "Araling Panlipunan",
                    method: "LINK",
                    submittedAt: "2026-11-25T13:15:00+08:00",
                    status: "Submitted",
                    statusKey: "submitted"
                }
            ],
            subjectGrades: [
                { subject: "Mathematics", period: "First Quarter", grade: 92 },
                { subject: "English", period: "First Quarter", grade: 88 },
                { subject: "Science", period: "Second Quarter", grade: 90 }
            ],
            grades: [
                {
                    assessment: "Fractions Quiz",
                    subject: "Mathematics",
                    period: "First Quarter",
                    score: "18 / 20",
                    percentage: "90%",
                    gradeReleased: true,
                    feedbackReleased: true,
                    feedback: "Good work. Review the last two items."
                },
                {
                    assessment: "Reading Reflection",
                    subject: "English",
                    period: "First Quarter",
                    score: "88 / 100",
                    percentage: "88%",
                    gradeReleased: true,
                    feedbackReleased: true,
                    feedback: "Clear explanation and organized ideas."
                },
                {
                    assessment: "Science Activity Sheet",
                    subject: "Science",
                    period: "Second Quarter",
                    score: "90 / 100",
                    percentage: "90%",
                    gradeReleased: true,
                    feedbackReleased: true,
                    feedback: "Well-supported answers."
                },
                {
                    assessment: "Worksheet 2",
                    subject: "Mathematics",
                    period: "First Quarter",
                    score: "19 / 20",
                    percentage: "95%",
                    gradeReleased: true,
                    feedbackReleased: false,
                    feedback: null
                }
            ]
        },
        "child-demo-002": {
            id: "child-demo-002",
            name: "Liam Santos",
            grade: "Grade 4",
            section: "Mabini",
            school: "Sample School Workspace",
            activities: [
                {
                    title: "English Reading Task",
                    subject: "English",
                    deadline: "2026-11-28",
                    deadlineLabel: "Initial deadline",
                    status: "Submitted",
                    statusKey: "submitted"
                },
                {
                    title: "Mathematics Practice",
                    subject: "Mathematics",
                    deadline: "2026-11-30",
                    deadlineLabel: "Initial deadline",
                    status: "Pending",
                    statusKey: "pending"
                },
                {
                    title: "Science Project",
                    subject: "Science",
                    deadline: "2026-12-03",
                    deadlineLabel: "Initial deadline",
                    status: "In Progress",
                    statusKey: "progress"
                }
            ],
            submissions: [
                {
                    activity: "English Reading Task",
                    subject: "English",
                    method: "LINK",
                    submittedAt: "2026-11-26T14:00:00+08:00",
                    status: "Submitted",
                    statusKey: "submitted"
                }
            ],
            subjectGrades: [],
            grades: []
        }
    };

    function formatDate(value) {
        const parts = value.split("-").map(Number);
        if (parts.length !== 3 || parts.some(Number.isNaN))
            return "Date unavailable";
        return new Intl.DateTimeFormat("en-PH", {
            day: "numeric",
            month: "short",
            year: "numeric"
        }).format(new Date(parts[0], parts[1] - 1, parts[2]));
    }

    function formatDateTime(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime()))
            return "Date unavailable";
        return new Intl.DateTimeFormat("en-PH", {
            dateStyle: "medium",
            timeStyle: "short"
        }).format(date);
    }

    function makeProgressStatus(label, statusKey) {
        return parentText("span", "parent-progress-status " + statusKey, label);
    }

    function makeEmptyMessage(container, message) {
        container.replaceChildren(
            parentText("span", "parent-progress-empty-message", message)
        );
    }

    function renderActivities(child) {
        const host = document.getElementById("parentProgressActivitiesList");
        const empty = document.getElementById("parentProgressActivitiesEmpty");
        const count = document.getElementById("parentProgressActivityCount");
        if (!host)
            return;

        host.replaceChildren();
        child.activities.forEach(item => {
            const card = document.createElement("article");
            card.className = "parent-progress-item-card parent-progress-searchable";

            const icon = document.createElement("span");
            icon.className = "parent-progress-item-icon " + item.statusKey;
            const iconElement = document.createElement("i");
            iconElement.className = item.statusKey === "revision"
                ? "bi bi-arrow-repeat"
                : item.statusKey === "submitted"
                    ? "bi bi-check2-circle"
                    : "bi bi-journal-text";
            icon.appendChild(iconElement);

            const details = document.createElement("div");
            details.className = "parent-progress-item-details";
            details.append(
                parentText("strong", "", item.title),
                parentText("span", "", item.subject),
                parentText("small", "", item.deadlineLabel + ": " + formatDate(item.deadline))
            );

            card.append(icon, details, makeProgressStatus(item.status, item.statusKey));
            host.appendChild(card);
        });

        if (empty)
            empty.hidden = child.activities.length > 0;
        if (count)
            count.textContent = child.activities.length + (child.activities.length === 1 ? " activity" : " activities");
    }

    function renderSubmissions(child) {
        const host = document.getElementById("parentProgressSubmissionsList");
        const empty = document.getElementById("parentProgressSubmissionsEmpty");
        const count = document.getElementById("parentProgressSubmissionCount");
        if (!host)
            return;

        host.replaceChildren();
        child.submissions.forEach(item => {
            const card = document.createElement("article");
            card.className = "parent-progress-item-card parent-progress-searchable";

            const icon = document.createElement("span");
            icon.className = "parent-progress-item-icon " + item.statusKey;
            const iconElement = document.createElement("i");
            iconElement.className = item.statusKey === "revision"
                ? "bi bi-arrow-repeat"
                : "bi bi-file-earmark-check";
            icon.appendChild(iconElement);

            const details = document.createElement("div");
            details.className = "parent-progress-item-details";
            details.append(
                parentText("strong", "", item.activity),
                parentText("span", "", item.subject + " · " + item.method + " submission"),
                parentText("small", "", "Recorded " + formatDateTime(item.submittedAt))
            );

            const statusColumn = document.createElement("div");
            statusColumn.className = "parent-progress-status-column";
            statusColumn.appendChild(makeProgressStatus(item.status, item.statusKey));
            if (item.revisionDeadline) {
                statusColumn.appendChild(
                    parentText("small", "parent-progress-deadline-note", "Revision deadline: " + formatDate(item.revisionDeadline))
                );
            }

            card.append(icon, details, statusColumn);
            host.appendChild(card);
        });

        if (empty)
            empty.hidden = child.submissions.length > 0;
        if (count)
            count.textContent = child.submissions.length + (child.submissions.length === 1 ? " record" : " records");
    }

    function renderGrades(child) {
        const subjectHost = document.getElementById("parentProgressSubjectGrades");
        const gradeHost = document.getElementById("parentProgressGradesList");
        const empty = document.getElementById("parentProgressGradesEmpty");
        const count = document.getElementById("parentProgressGradeCount");
        if (!subjectHost || !gradeHost)
            return;

        subjectHost.replaceChildren();
        gradeHost.replaceChildren();

        child.subjectGrades.forEach(item => {
            const card = document.createElement("article");
            card.className = "parent-progress-subject-grade parent-progress-searchable";
            card.append(
                parentText("span", "", item.subject),
                parentText("strong", "", String(item.grade)),
                parentText("small", "", item.period + " · Released subject grade")
            );
            subjectHost.appendChild(card);
        });

        const releasedGrades = child.grades.filter(item => item.gradeReleased === true);
        releasedGrades.forEach(item => {
            const card = document.createElement("article");
            card.className = "parent-progress-grade-card parent-progress-searchable";

            const header = document.createElement("div");
            header.className = "parent-progress-grade-header";
            const heading = document.createElement("div");
            heading.append(
                parentText("strong", "", item.assessment),
                parentText("small", "", item.subject + " · " + item.period)
            );
            header.append(heading, makeProgressStatus("Grade Released", "submitted"));

            const result = document.createElement("div");
            result.className = "parent-progress-grade-result";
            result.append(
                parentText("strong", "", item.score),
                parentText("span", "", item.percentage)
            );

            const feedback = document.createElement("div");
            feedback.className = "parent-progress-feedback";
            if (item.feedbackReleased === true && typeof item.feedback === "string" && item.feedback.trim()) {
                feedback.append(
                    parentText("strong", "", "Released Teacher Feedback"),
                    parentText("p", "", item.feedback)
                );
            }
            else {
                // Do not render unreleased feedback content or internal notes.
                feedback.append(
                    parentText("strong", "", "Feedback Status"),
                    parentText("p", "parent-progress-feedback-pending", "Teacher feedback has not been released.")
                );
            }

            card.append(header, result, feedback);
            gradeHost.appendChild(card);
        });

        const hasAnyReleasedData = child.subjectGrades.length > 0 || releasedGrades.length > 0;
        if (empty)
            empty.hidden = hasAnyReleasedData;
        if (count)
            count.textContent = releasedGrades.length + (releasedGrades.length === 1 ? " result" : " results");
    }

    function updateSummary(child) {
        const today = new Date();
        const todayKey = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, "0"),
            String(today.getDate()).padStart(2, "0")
        ].join("-");

        const upcoming = child.activities.filter(item =>
            item.statusKey !== "submitted" && item.deadline >= todayKey
        ).length;
        const submitted = child.submissions.filter(item => item.statusKey === "submitted").length;
        const revisions = child.submissions.filter(item => item.statusKey === "revision").length;
        const released = child.grades.filter(item => item.gradeReleased === true).length;

        document.getElementById("parentProgressUpcomingCount").textContent = String(upcoming).padStart(2, "0");
        document.getElementById("parentProgressSubmittedCount").textContent = String(submitted).padStart(2, "0");
        document.getElementById("parentProgressRevisionCount").textContent = String(revisions).padStart(2, "0");
        document.getElementById("parentProgressReleasedGradeCount").textContent = String(released).padStart(2, "0");
    }

    function applySearch() {
        const query = (search?.value || "").trim().toLowerCase();
        let visibleInActiveSections = 0;
        document.querySelectorAll(".parent-progress-searchable").forEach(item => {
            const matches = item.textContent.toLowerCase().includes(query);
            item.hidden = query !== "" && !matches;

            const section = item.closest("[data-progress-section]");
            const sectionIsVisible = !section || !section.hidden;

            if (!item.hidden && sectionIsVisible)
                visibleInActiveSections++;
        });

        if (searchEmpty)
            searchEmpty.hidden = query === "" || visibleInActiveSections > 0;
    }

    function renderChild() {
        const child = verifiedChildren[childSelect.value];
        if (!child) {
            // Unknown or unverified child identifiers never expose records.
            childSelect.value = "child-demo-001";
            return renderChild();
        }

        document.getElementById("parentProgressSelectedName").textContent = child.name;
        document.getElementById("parentProgressSelectedPlacement").textContent =
            child.grade + " · " + child.section + " · " + child.school;

        renderActivities(child);
        renderSubmissions(child);
        renderGrades(child);
        updateSummary(child);
        applySearch();
    }

    function setView(view) {
        viewButtons.forEach(button => {
            const active = button.dataset.progressView === view;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        sections.forEach(section => {
            section.hidden = view !== "overview" && section.dataset.progressSection !== view;
        });

        applySearch();
    }

    childSelect.addEventListener("change", renderChild);
    viewButtons.forEach(button => {
        button.addEventListener("click", () => setView(button.dataset.progressView));
    });

    search?.addEventListener("input", applySearch);
    search?.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            search.value = "";
            applySearch();
            search.blur();
        }
    });

    renderChild();
    setView("overview");
}


/* =========================================================
   F12.6 - PARENT CALENDAR
   Displays Parent/Guardian-eligible school events and
   deadlines for verified linked children only.
   Read-only demonstration. No event creation or editing.
========================================================= */
function initializeParentCalendarPage() {
    const monthGrid = document.getElementById("parentCalendarMonthGrid");
    if (!monthGrid) return;

    const $ = id => document.getElementById(id);
    const monthView = $("parentCalendarMonthView");
    const weekView = $("parentCalendarWeekView");
    const listView = $("parentCalendarListView");
    const weekGrid = $("parentCalendarWeekGrid");
    const eventList = $("parentCalendarEventList");
    const searchInput = $("parentCalendarSearch");
    const childFilter = $("parentCalendarChildFilter");
    const typeFilter = $("parentCalendarTypeFilter");
    const datePicker = $("parentCalendarJumpDate");
    const emptyState = $("parentCalendarEmpty");
    const visibleCount = $("parentCalendarVisibleCount");
    const dialog = $("parentCalendarEventDialog");
    const dialogTitle = $("parentCalendarEventTitle");
    const dialogSubtitle = $("parentCalendarEventSubtitle");
    const dialogBody = $("parentCalendarEventBody");

    const linkedChildren = {
        "child-demo-001": {
            id: "child-demo-001",
            name: "Mika Santos",
            grade: "Grade 7",
            section: "Sampaguita"
        },
        "child-demo-002": {
            id: "child-demo-002",
            name: "Liam Santos",
            grade: "Grade 4",
            section: "Mabini"
        }
    };

    const events = [
        {
            id: "parent-school-001",
            title: "Quarterly Learning Updates",
            date: "2026-11-27",
            time: "All day",
            type: "school",
            childId: null,
            subject: "School Announcement",
            description: "Parents and Guardians may review the released quarterly learning updates through the authorized Child Progress area. This is a fictional Parent/Guardian-facing calendar notice.",
            audience: "Parent/Guardian",
            status: "Published"
        },
        {
            id: "parent-learning-001",
            title: "English Reading Task",
            date: "2026-11-28",
            time: "11:59 PM",
            type: "learning",
            childId: "child-demo-002",
            subject: "English",
            description: "Sample initial activity deadline for the verified child Liam Santos. The Parent/Guardian can view the deadline and permitted submission status only.",
            audience: "Parent/Guardian of the linked child",
            status: "Submitted"
        },
        {
            id: "parent-learning-002",
            title: "Mathematics Worksheet 3",
            date: "2026-11-29",
            time: "11:59 PM",
            type: "learning",
            childId: "child-demo-001",
            subject: "Mathematics",
            description: "Sample initial activity deadline for the verified child Mika Santos. The calendar does not expose the Student's submitted files or answers.",
            audience: "Parent/Guardian of the linked child",
            status: "Pending"
        },
        {
            id: "parent-school-002",
            title: "School Activity Day",
            date: "2026-11-30",
            time: "8:00 AM - 3:00 PM",
            type: "school",
            childId: null,
            subject: "School Event",
            description: "A fictional school activity day included in the Parent/Guardian calendar. Please refer to official school communication for actual event details.",
            audience: "Parent/Guardian",
            status: "Published"
        },
        {
            id: "parent-learning-003",
            title: "Science Activity Sheet - Revision Deadline",
            date: "2026-11-30",
            time: "11:59 PM",
            type: "learning",
            childId: "child-demo-001",
            subject: "Science",
            description: "Sample revision deadline for an existing Science Activity Sheet submission. The original submission deadline and revision deadline are separate.",
            audience: "Parent/Guardian of the linked child",
            status: "Revision Required"
        },
        {
            id: "parent-learning-004",
            title: "Mathematics Practice",
            date: "2026-11-30",
            time: "11:59 PM",
            type: "learning",
            childId: "child-demo-002",
            subject: "Mathematics",
            description: "Sample initial activity deadline for the verified child Liam Santos.",
            audience: "Parent/Guardian of the linked child",
            status: "Pending"
        },
        {
            id: "parent-learning-005",
            title: "Reading Reflection",
            date: "2026-12-01",
            time: "11:59 PM",
            type: "learning",
            childId: "child-demo-001",
            subject: "English",
            description: "Sample initial activity deadline for the verified child Mika Santos.",
            audience: "Parent/Guardian of the linked child",
            status: "Pending"
        },
        {
            id: "parent-school-003",
            title: "Parent-Teacher Conference",
            date: "2026-12-03",
            time: "1:00 PM - 3:00 PM",
            type: "school",
            childId: null,
            subject: "School Event",
            description: "A fictional Parent/Guardian-facing conference schedule. Actual schedules and participation instructions must come from official school communication.",
            audience: "Parent/Guardian",
            status: "Published"
        },
        {
            id: "parent-learning-006",
            title: "Science Project",
            date: "2026-12-03",
            time: "11:59 PM",
            type: "learning",
            childId: "child-demo-002",
            subject: "Science",
            description: "Sample initial activity deadline for the verified child Liam Santos.",
            audience: "Parent/Guardian of the linked child",
            status: "In Progress"
        }
    ];

    let currentDate = new Date();
    let currentView = "month";

    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const weekdayShort = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    function dateKey(date) {
        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0")
        ].join("-");
    }

    function parseDate(value) {
        const parts = value.split("-").map(Number);
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    function addDays(date, amount) {
        const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        result.setDate(result.getDate() + amount);
        return result;
    }

    function startOfWeek(date) {
        const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const mondayOffset = (result.getDay() + 6) % 7;
        result.setDate(result.getDate() - mondayOffset);
        return result;
    }

    function formatDate(value, options = {}) {
        const date = typeof value === "string" ? parseDate(value) : value;
        return new Intl.DateTimeFormat("en-PH", {
            day: "numeric",
            month: "short",
            year: "numeric",
            ...options
        }).format(date);
    }

    function formatMonth(date) {
        return new Intl.DateTimeFormat("en-PH", {
            month: "long",
            year: "numeric"
        }).format(date);
    }

    function make(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined && text !== null) element.textContent = String(text);
        return element;
    }

    function makeEventButton(event, compact = false) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "parent-calendar-event-chip " + event.type + (compact ? " compact" : "");
        button.dataset.parentCalendarEvent = event.id;
        button.textContent = event.title;
        button.setAttribute("aria-label", event.title + ", " + formatDate(event.date));
        return button;
    }

    function getFilteredEvents() {
        const childId = childFilter.value;
        const type = typeFilter.value;
        const query = (searchInput.value || "").trim().toLowerCase();

        return events.filter(event => {
            const matchesChild = childId === "all" || event.childId === null || event.childId === childId;
            const matchesType = type === "all" || event.type === type;
            const childName = event.childId ? linkedChildren[event.childId].name : "All linked children";
            const searchable = [
                event.title,
                event.subject,
                event.description,
                event.status,
                event.audience,
                childName,
                event.type === "school" ? "school event" : "learning deadline"
            ].join(" ").toLowerCase();
            return matchesChild && matchesType && searchable.includes(query);
        }).sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
    }

    function renderSummary(filtered) {
        const today = dateKey(new Date());
        $("parentCalendarTotal").textContent = String(filtered.length).padStart(2, "0");
        $("parentCalendarSchool").textContent = String(filtered.filter(event => event.type === "school").length).padStart(2, "0");
        $("parentCalendarLearning").textContent = String(filtered.filter(event => event.type === "learning").length).padStart(2, "0");
        $("parentCalendarUpcoming").textContent = String(filtered.filter(event => event.date >= today).length).padStart(2, "0");
    }

    function renderMonth(filtered) {
        monthGrid.replaceChildren();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const offset = (firstDay.getDay() + 6) % 7;
        const start = addDays(firstDay, -offset);
        const today = dateKey(new Date());

        $("parentCalendarCurrentLabel").textContent = formatMonth(currentDate);

        weekdayShort.forEach(day => {
            monthGrid.appendChild(make("div", "parent-calendar-weekday", day));
        });

        for (let index = 0; index < 42; index++) {
            const date = addDays(start, index);
            const key = dateKey(date);
            const dayEvents = filtered.filter(event => event.date === key);
            const cell = make("div", "parent-calendar-day-cell");

            if (date.getMonth() !== month) cell.classList.add("outside-month");
            if (key === today) cell.classList.add("is-today");

            const number = make("span", "parent-calendar-day-number", date.getDate());
            cell.appendChild(number);

            const eventHost = make("div", "parent-calendar-day-events");
            dayEvents.slice(0, 3).forEach(event => {
                eventHost.appendChild(makeEventButton(event, true));
            });

            if (dayEvents.length > 3) {
                eventHost.appendChild(make("span", "parent-calendar-more-events", "+" + (dayEvents.length - 3) + " more"));
            }

            cell.appendChild(eventHost);
            monthGrid.appendChild(cell);
        }
    }

    function renderWeek(filtered) {
        weekGrid.replaceChildren();
        const start = startOfWeek(currentDate);
        const end = addDays(start, 6);
        const today = dateKey(new Date());

        $("parentCalendarCurrentLabel").textContent =
            formatDate(start, { month: "short" }) + " - " + formatDate(end);

        for (let index = 0; index < 7; index++) {
            const date = addDays(start, index);
            const key = dateKey(date);
            const day = make("section", "parent-calendar-week-day");
            if (key === today) day.classList.add("is-today");

            const heading = make("div", "parent-calendar-week-day-heading");
            heading.append(
                make("strong", "", weekdays[index]),
                make("span", "", date.getDate())
            );
            day.appendChild(heading);

            const eventHost = make("div", "parent-calendar-week-events");
            filtered.filter(event => event.date === key).forEach(event => {
                eventHost.appendChild(makeEventButton(event, true));
            });

            day.appendChild(eventHost);
            weekGrid.appendChild(day);
        }
    }

    function renderList(filtered) {
        eventList.replaceChildren();
        const monthEvents = filtered.filter(event => {
            const date = parseDate(event.date);
            return date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth();
        });

        $("parentCalendarCurrentLabel").textContent = formatMonth(currentDate);

        let lastDate = "";
        monthEvents.forEach(event => {
            if (event.date !== lastDate) {
                eventList.appendChild(make("h3", "parent-calendar-list-date-heading", formatDate(event.date, { weekday: "long" })));
                lastDate = event.date;
            }

            const row = make("article", "parent-calendar-list-item " + event.type);
            const dateBlock = make("div", "parent-calendar-list-date");
            dateBlock.append(
                make("strong", "", parseDate(event.date).getDate()),
                make("span", "", formatDate(event.date, { month: "short" }))
            );

            const info = make("div", "parent-calendar-list-info");
            info.append(
                make("strong", "", event.title),
                make("small", "", event.subject + " · " + (event.childId ? linkedChildren[event.childId].name : "All linked children") + " · " + event.time)
            );

            const action = make("button", "parent-calendar-list-action", "View");
            action.type = "button";
            action.dataset.parentCalendarEvent = event.id;
            action.setAttribute("aria-label", "View " + event.title);
            row.append(dateBlock, info, action);
            eventList.appendChild(row);
        });
    }

    function render() {
        const filtered = getFilteredEvents();
        renderSummary(filtered);

        monthView.hidden = currentView !== "month";
        weekView.hidden = currentView !== "week";
        listView.hidden = currentView !== "list";

        document.querySelectorAll("[data-parent-calendar-view]").forEach(button => {
            const active = button.dataset.parentCalendarView === currentView;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        if (currentView === "month") renderMonth(filtered);
        if (currentView === "week") renderWeek(filtered);
        if (currentView === "list") renderList(filtered);

        const displayed = currentView === "list"
            ? filtered.filter(event => {
                const date = parseDate(event.date);
                return date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth();
            })
            : currentView === "week"
                ? filtered.filter(event => {
                    const start = dateKey(startOfWeek(currentDate));
                    const end = dateKey(addDays(startOfWeek(currentDate), 6));
                    return event.date >= start && event.date <= end;
                })
                : filtered.filter(event => {
                    const date = parseDate(event.date);
                    return date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth();
                });

        emptyState.hidden = displayed.length > 0;
        visibleCount.textContent = displayed.length + (displayed.length === 1 ? " visible event" : " visible events");
        datePicker.value = dateKey(currentDate);
    }

    function showEvent(eventId) {
        const event = events.find(item => item.id === eventId);
        if (!event) return;

        const childName = event.childId ? linkedChildren[event.childId].name : "All verified linked children";
        dialogTitle.textContent = event.title;
        dialogSubtitle.textContent = (event.type === "school" ? "School Event" : "Learning Deadline") + " · " + formatDate(event.date);
        dialogBody.replaceChildren();

        const details = make("div", "parent-calendar-detail-grid");
        const fields = [
            ["Date", formatDate(event.date, { weekday: "long" })],
            ["Time", event.time],
            ["Category", event.type === "school" ? "School Event" : "Learning Deadline"],
            ["Subject", event.subject],
            ["Linked Child", childName],
            ["Status", event.status],
            ["Audience", event.audience]
        ];

        fields.forEach(([label, value]) => {
            const item = make("div", "parent-calendar-detail-item");
            item.append(make("small", "", label), make("strong", "", value));
            details.appendChild(item);
        });

        const description = make("section", "parent-calendar-detail-description");
        description.append(
            make("h3", "", "Event Information"),
            make("p", "", event.description)
        );

        const privacy = make(
            "p",
            "parent-calendar-detail-privacy",
            "This event is included as a fictional Parent/Guardian-visible record. Private Teacher notes, Student work files and unrelated Student records are not available in this calendar."
        );

        dialogBody.append(details, description, privacy);

        if (typeof dialog.showModal === "function") {
            if (!dialog.open) dialog.showModal();
        }
    }

    function movePeriod(direction) {
        if (currentView === "week") {
            currentDate = addDays(currentDate, direction * 7);
        } else {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1);
        }
        render();
    }

    document.querySelectorAll("[data-parent-calendar-view]").forEach(button => {
        button.addEventListener("click", () => {
            currentView = button.dataset.parentCalendarView;
            render();
        });
    });

    $("parentCalendarPrevious").addEventListener("click", () => movePeriod(-1));
    $("parentCalendarNext").addEventListener("click", () => movePeriod(1));
    $("parentCalendarToday").addEventListener("click", () => {
        currentDate = new Date();
        render();
    });

    datePicker.addEventListener("change", () => {
        if (!datePicker.value) return;
        currentDate = parseDate(datePicker.value);
        render();
    });

    childFilter.addEventListener("change", render);
    typeFilter.addEventListener("change", render);
    searchInput.addEventListener("input", render);

    searchInput.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            searchInput.value = "";
            render();
            searchInput.blur();
        }
    });

    $("parentCalendarClearFilters").addEventListener("click", () => {
        childFilter.value = "all";
        typeFilter.value = "all";
        searchInput.value = "";
        render();
    });

    [monthGrid, weekGrid, eventList].forEach(host => {
        host.addEventListener("click", event => {
            const button = event.target.closest("[data-parent-calendar-event]");
            if (button) showEvent(button.dataset.parentCalendarEvent);
        });
    });

    $("parentCalendarEventClose").addEventListener("click", () => {
        if (dialog.open) dialog.close();
    });

    $("parentCalendarEventDone").addEventListener("click", () => {
        if (dialog.open) dialog.close();
    });

    render();
    console.log("Parent Calendar initialized. Parent-visible demo events:", events.length);
}


/* =========================================================
   F12.7 - PARENT/GUARDIAN NOTIFICATIONS
   Parent-account and verified-child demo notifications only.
   Read state is stored locally for frontend demonstration.
   No real push delivery or backend notification is performed.
========================================================= */

const PARENT_NOTIFICATION_STORAGE_KEY = "gabayaral.parent.notifications.demo.v1";

const PARENT_NOTIFICATIONS = [
    {
        id: "PN-DEMO-001",
        title: "Parent Orientation and Consultation Schedule",
        category: "Announcements",
        message: "A new Parent/Guardian announcement is available. Review the sample orientation and consultation schedule.",
        createdAt: "2026-11-26T09:00:00+08:00",
        childName: "",
        reference: "ANN-PAR-002 · Version 2",
        href: "announcements.html",
        actionLabel: "View Announcement",
        initialRead: false
    },
    {
        id: "PN-DEMO-002",
        title: "Acknowledgment required: Updated School Safety and Pick-up Guidelines",
        category: "Acknowledgments",
        message: "Please review the applicable announcement version and acknowledge receipt or awareness if required.",
        createdAt: "2026-11-25T10:15:00+08:00",
        childName: "",
        reference: "ANN-PAR-003 · Version 1",
        href: "acknowledgments.html",
        actionLabel: "Review Acknowledgment",
        initialRead: false
    },
    {
        id: "PN-DEMO-003",
        title: "Your child connection request is awaiting verification",
        category: "Connections",
        message: "Your demonstration connection request has been received. Authorized verification is still required. A pending request does not grant access to child records.",
        createdAt: "2026-11-27T08:30:00+08:00",
        childName: "",
        reference: "DEMO-PCR-001",
        href: "connections.html",
        actionLabel: "View Request",
        initialRead: false
    },
    {
        id: "PN-DEMO-004",
        title: "Mathematics Worksheet 3 deadline is approaching",
        category: "Learning",
        message: "A sample activity deadline for a verified linked child is approaching. Check the Child Progress page for permitted activity status and deadline information.",
        createdAt: "2026-11-27T07:45:00+08:00",
        childName: "Mika Santos",
        reference: "Mathematics · November 29, 2026",
        href: "child-progress.html",
        actionLabel: "View Child Progress",
        initialRead: false
    },
    {
        id: "PN-DEMO-005",
        title: "A released assessment grade is available",
        category: "Grades",
        message: "A sample released assessment result is available for a verified linked child. Only released grades and feedback may be viewed.",
        createdAt: "2026-11-26T14:20:00+08:00",
        childName: "Mika Santos",
        reference: "Mathematics · Fractions Quiz",
        href: "child-progress.html",
        actionLabel: "View Released Progress",
        initialRead: true
    },
    {
        id: "PN-DEMO-006",
        title: "Parent-Teacher Conference added to the calendar",
        category: "Calendar",
        message: "A Parent/Guardian-visible sample school event has been added to the calendar. Please review the event details and refer to official school communication for actual arrangements.",
        createdAt: "2026-11-26T11:00:00+08:00",
        childName: "",
        reference: "December 3, 2026",
        href: "calendar.html",
        actionLabel: "Open Calendar",
        initialRead: true
    },
    {
        id: "PN-DEMO-007",
        title: "Science Activity Sheet revision deadline",
        category: "Learning",
        message: "A sample revision deadline is recorded for a verified linked child. The original submission deadline and revision deadline are separate.",
        createdAt: "2026-11-25T15:30:00+08:00",
        childName: "Mika Santos",
        reference: "Revision deadline · November 30, 2026",
        href: "child-progress.html",
        actionLabel: "View Revision Status",
        initialRead: true
    },
    {
        id: "PN-DEMO-008",
        title: "Your announcement acknowledgment was recorded",
        category: "Acknowledgments",
        message: "A sample acknowledgment record has been saved for the exact announcement version. Acknowledgment confirms receipt or awareness, not agreement.",
        createdAt: "2026-11-24T16:10:00+08:00",
        childName: "",
        reference: "DEMO-ACK-001",
        href: "acknowledgments.html",
        actionLabel: "View Acknowledgments",
        initialRead: true
    }
];

function readParentNotificationState() {
    try {
        const parsed = JSON.parse(
            localStorage.getItem(PARENT_NOTIFICATION_STORAGE_KEY) || "null"
        );

        if (!parsed || !Array.isArray(parsed.readIds)) {
            return { readIds: [] };
        }

        return {
            readIds: parsed.readIds.filter(id =>
                typeof id === "string" &&
                PARENT_NOTIFICATIONS.some(item => item.id === id)
            )
        };
    }
    catch (error) {
        console.warn("Parent notification demo state could not be read.", error);
        return { readIds: [] };
    }
}

function saveParentNotificationState(state) {
    try {
        localStorage.setItem(
            PARENT_NOTIFICATION_STORAGE_KEY,
            JSON.stringify({ readIds: state.readIds })
        );
        return true;
    }
    catch (error) {
        console.warn("Parent notification demo state could not be saved.", error);
        return false;
    }
}

function isParentNotificationRead(notification, readIds) {
    return notification.initialRead === true || readIds.includes(notification.id);
}

function getParentNotificationUnreadCount() {
    const state = readParentNotificationState();

    return PARENT_NOTIFICATIONS.filter(notification =>
        !isParentNotificationRead(notification, state.readIds)
    ).length;
}

function updateParentNotificationBadges() {
    const unreadCount = getParentNotificationUnreadCount();

    document.querySelectorAll("a.parent-notification-button").forEach(link => {
        let dot = link.querySelector(".parent-notification-dot");

        if (!dot) {
            dot = document.createElement("span");
            dot.className = "parent-notification-dot";
            dot.setAttribute("aria-hidden", "true");
            link.appendChild(dot);
        }

        dot.hidden = unreadCount === 0;

        let countBadge = link.querySelector(".parent-notification-count");

        if (!countBadge) {
            countBadge = document.createElement("span");
            countBadge.className = "parent-notification-count";
            countBadge.setAttribute("aria-hidden", "true");
            link.appendChild(countBadge);
        }

        countBadge.textContent = unreadCount > 9 ? "9+" : String(unreadCount);
        countBadge.hidden = unreadCount === 0;
        link.setAttribute(
            "aria-label",
            unreadCount > 0
                ? "Open notifications, " + unreadCount + " unread"
                : "Open notifications"
        );
    });
}

function initializeParentNotificationNavigation() {
    document.querySelectorAll(
        'a.parent-notification-button, a[data-parent-demo-link="Notifications"]'
    ).forEach(link => {
        link.href = "notifications.html";
        link.removeAttribute("data-parent-demo-link");
        link.classList.add("parent-notification-button");
    });

    updateParentNotificationBadges();
}

function initializeParentNotificationsPage() {
    const list = document.getElementById("parentNotificationsList");

    if (!list) return;

    const searchInput = document.getElementById("parentNotificationsSearch");
    const categoryFilter = document.getElementById("parentNotificationCategoryFilter");
    const statusFilter = document.getElementById("parentNotificationStatusFilter");
    const markAllButton = document.getElementById("parentMarkAllNotificationsRead");
    const emptyState = document.getElementById("parentNotificationsEmpty");
    const emptyMessage = document.getElementById("parentNotificationsEmptyMessage");
    const dialog = document.getElementById("parentNotificationDetailsDialog");
    const dialogTitle = document.getElementById("parentNotificationDetailsTitle");
    const dialogMeta = document.getElementById("parentNotificationDetailsMeta");
    const dialogBody = document.getElementById("parentNotificationDetailsBody");
    const dialogStatus = document.getElementById("parentNotificationDetailsStatus");
    const dialogMarkRead = document.getElementById("parentNotificationDetailsMarkRead");
    const dialogOpenLink = document.getElementById("parentNotificationDetailsOpenLink");

    if (!categoryFilter || !statusFilter || !dialog) return;

    let state = readParentNotificationState();
    let selectedNotificationId = null;

    function isRead(notification) {
        return isParentNotificationRead(notification, state.readIds);
    }

    function markRead(notificationId) {
        const notification = PARENT_NOTIFICATIONS.find(item => item.id === notificationId);
        if (!notification || isRead(notification)) return;

        state.readIds.push(notificationId);
        state.readIds = [...new Set(state.readIds)];
        saveParentNotificationState(state);
        render();
        updateParentNotificationBadges();
    }

    function markAllRead() {
        state.readIds = [...new Set([
            ...state.readIds,
            ...PARENT_NOTIFICATIONS.map(item => item.id)
        ])];

        saveParentNotificationState(state);
        render();
        updateParentNotificationBadges();
    }

    function formatDate(value) {
        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "Date unavailable";

        return new Intl.DateTimeFormat("en-PH", {
            dateStyle: "medium",
            timeStyle: "short"
        }).format(date);
    }

    function iconForCategory(category) {
        const icons = {
            Announcements: "bi-megaphone-fill",
            Acknowledgments: "bi-check2-square",
            Connections: "bi-person-check-fill",
            Learning: "bi-journal-text",
            Grades: "bi-award-fill",
            Calendar: "bi-calendar-event-fill"
        };

        return icons[category] || "bi-bell-fill";
    }

    function colorForCategory(category) {
        const colors = {
            Announcements: "blue",
            Acknowledgments: "teal",
            Connections: "amber",
            Learning: "purple",
            Grades: "teal",
            Calendar: "blue"
        };

        return colors[category] || "blue";
    }

    function createActionButton(label, action, notificationId, className) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = className;
        button.dataset.notificationAction = action;
        button.dataset.notificationId = notificationId;
        button.textContent = label;
        return button;
    }

    function getVisibleNotifications() {
        const query = (searchInput?.value || "").trim().toLowerCase();
        const category = categoryFilter.value;
        const status = statusFilter.value;

        return PARENT_NOTIFICATIONS.filter(notification => {
            const read = isRead(notification);
            const matchesCategory = category === "all" || notification.category === category;
            const matchesStatus = status === "all" ||
                (status === "read" && read) ||
                (status === "unread" && !read);

            const searchableText = [
                notification.title,
                notification.message,
                notification.category,
                notification.childName,
                notification.reference
            ].join(" ").toLowerCase();

            return matchesCategory && matchesStatus && searchableText.includes(query);
        }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    function renderSummary() {
        const unread = PARENT_NOTIFICATIONS.filter(item => !isRead(item)).length;
        const read = PARENT_NOTIFICATIONS.length - unread;

        document.getElementById("parentNotificationTotalCount").textContent =
            String(PARENT_NOTIFICATIONS.length).padStart(2, "0");
        document.getElementById("parentNotificationUnreadCount").textContent =
            String(unread).padStart(2, "0");
        document.getElementById("parentNotificationReadCount").textContent =
            String(read).padStart(2, "0");

        markAllButton.disabled = unread === 0;
        markAllButton.textContent = unread === 0 ? "All caught up" : "Mark All as Read";
    }

    function render() {
        const visible = getVisibleNotifications();
        list.replaceChildren();

        visible.forEach(notification => {
            const read = isRead(notification);
            const card = document.createElement("article");
            card.className = "parent-notification-card " + (read ? "is-read" : "is-unread");
            card.dataset.notificationId = notification.id;

            const icon = document.createElement("span");
            icon.className = "parent-notification-card-icon " + colorForCategory(notification.category);
            const iconElement = document.createElement("i");
            iconElement.className = "bi " + iconForCategory(notification.category);
            icon.appendChild(iconElement);

            const content = document.createElement("div");
            content.className = "parent-notification-card-content";

            const top = document.createElement("div");
            top.className = "parent-notification-card-top";
            top.append(
                parentText("span", "parent-notification-category", notification.category),
                parentText("time", "parent-notification-date", formatDate(notification.createdAt))
            );

            const title = parentText("h3", "", notification.title);
            const message = parentText("p", "", notification.message);
            const context = document.createElement("div");
            context.className = "parent-notification-context";

            if (notification.childName) {
                context.appendChild(parentText("span", "", "Linked child: " + notification.childName));
            }

            if (notification.reference) {
                context.appendChild(parentText("span", "", notification.reference));
            }

            const actions = document.createElement("div");
            actions.className = "parent-notification-card-actions";
            actions.appendChild(
                createActionButton("View Details", "details", notification.id, "parent-secondary-button")
            );

            if (!read) {
                actions.appendChild(
                    createActionButton("Mark as Read", "mark-read", notification.id, "parent-text-button")
                );
            }

            content.append(top, title, message, context, actions);
            card.append(icon, content);

            if (!read) {
                const unreadIndicator = parentText("span", "parent-notification-unread-indicator", "Unread");
                card.appendChild(unreadIndicator);
            }

            list.appendChild(card);
        });

        if (emptyState) {
            emptyState.hidden = visible.length > 0;
            if (emptyMessage) {
                emptyMessage.textContent = PARENT_NOTIFICATIONS.length === 0
                    ? "You do not have any notifications yet."
                    : "No notifications match your search or selected filters.";
            }
        }

        const count = document.getElementById("parentNotificationResultsCount");
        if (count) {
            count.textContent = visible.length + (visible.length === 1 ? " notification" : " notifications");
        }

        renderSummary();
    }

    function openDetails(notificationId) {
        const notification = PARENT_NOTIFICATIONS.find(item => item.id === notificationId);
        if (!notification) return;

        selectedNotificationId = notification.id;
        dialogTitle.textContent = notification.title;
        dialogMeta.textContent = notification.category + " · " + formatDate(notification.createdAt);
        dialogBody.replaceChildren(
            parentText("p", "parent-notification-detail-message", notification.message)
        );

        if (notification.childName) {
            dialogBody.appendChild(
                parentText("p", "parent-notification-detail-context", "Linked child: " + notification.childName)
            );
        }

        if (notification.reference) {
            dialogBody.appendChild(
                parentText("p", "parent-notification-detail-context", "Reference: " + notification.reference)
            );
        }

        dialogStatus.textContent = isRead(notification) ? "Read" : "Unread";
        dialogStatus.className = "parent-notification-detail-status " + (isRead(notification) ? "read" : "unread");
        dialogMarkRead.hidden = isRead(notification);
        dialogOpenLink.href = notification.href;
        dialogOpenLink.textContent = notification.actionLabel;

        if (!dialog.open) dialog.showModal();
    }

    function closeDetails() {
        if (dialog.open) dialog.close();
        selectedNotificationId = null;
    }

    list.addEventListener("click", event => {
        const button = event.target.closest("[data-notification-action]");
        if (!button) return;

        const id = button.dataset.notificationId;
        if (button.dataset.notificationAction === "details") {
            openDetails(id);
        }
        else if (button.dataset.notificationAction === "mark-read") {
            markRead(id);
        }
    });

    markAllButton.addEventListener("click", markAllRead);

    dialogMarkRead.addEventListener("click", () => {
        if (selectedNotificationId) {
            markRead(selectedNotificationId);
            dialogStatus.textContent = "Read";
            dialogStatus.className = "parent-notification-detail-status read";
            dialogMarkRead.hidden = true;
        }
    });

    dialogOpenLink.addEventListener("click", event => {
        if (selectedNotificationId) {
            markRead(selectedNotificationId);
        }
        // The anchor performs normal navigation to its related Parent page.
    });

    document.getElementById("parentNotificationDetailsClose").addEventListener("click", closeDetails);
    document.getElementById("parentNotificationDetailsDone").addEventListener("click", closeDetails);

    categoryFilter.addEventListener("change", render);
    statusFilter.addEventListener("change", render);
    searchInput?.addEventListener("input", render);

    searchInput?.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            searchInput.value = "";
            render();
            searchInput.blur();
        }
    });

    render();
    updateParentNotificationBadges();
    console.log("Parent Notifications initialized. Demo notifications:", PARENT_NOTIFICATIONS.length);
}


/* =========================================================
   F12.8 - PARENT/GUARDIAN EASYACCESS AND PROFILE
   Preferences are stored separately for the demo Parent account.
   They apply across Parent pages in this browser only.
========================================================= */

const PARENT_EASYACCESS_STORAGE_KEY = "gabayaral.parent.easyAccess.demo.v1";

function getParentEasyAccessDefaults() {
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

function readParentEasyAccessPreferences() {
    const defaults = getParentEasyAccessDefaults();

    try {
        const saved = JSON.parse(
            localStorage.getItem(PARENT_EASYACCESS_STORAGE_KEY) || "null"
        );

        if (!saved || typeof saved !== "object") {
            return defaults;
        }

        return {
            fontFamily: ["inter", "arial", "verdana"].includes(saved.fontFamily)
                ? saved.fontFamily
                : defaults.fontFamily,
            textSize: ["normal", "large", "extra-large"].includes(saved.textSize)
                ? saved.textSize
                : defaults.textSize,
            highContrast: saved.highContrast === true,
            simplified: saved.simplified === true,
            reduceMotion: saved.reduceMotion === true,
            language: ["en", "fil", "ceb", "ilo"].includes(saved.language)
                ? saved.language
                : defaults.language,
            speechEnabled: saved.speechEnabled === true,
            speechVoice: typeof saved.speechVoice === "string"
                ? saved.speechVoice
                : defaults.speechVoice,
            speechSpeed: Number.isFinite(Number(saved.speechSpeed))
                ? Math.min(2, Math.max(0.5, Number(saved.speechSpeed)))
                : defaults.speechSpeed
        };
    }
    catch (error) {
        console.warn("Parent EasyAccess preferences could not be read.", error);
        return defaults;
    }
}

function applyParentTextSizeScale(scale) {
    const roots = [...document.querySelectorAll(".parent-app")];
    const excluded = "i, svg, path, img, script, style, link, meta, br, hr, canvas, video, audio";

    function isTextElement(element) {
        return element instanceof HTMLElement &&
            !element.matches(excluded) &&
            (Array.from(element.childNodes).some(node =>
                node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
            ) || element.matches("input, select, textarea"));
    }

    function rememberBaseSize(element) {
        if (!isTextElement(element) || element.hasAttribute("data-parent-ea-base-font-size")) {
            return;
        }

        let baseSize = parseFloat(window.getComputedStyle(element).fontSize);
        const parent = element.parentElement;

        if (parent && parent.hasAttribute("data-parent-ea-base-font-size")) {
            const parentCurrent = parseFloat(window.getComputedStyle(parent).fontSize);
            const parentBase = parseFloat(parent.dataset.parentEaBaseFontSize);

            if (
                Number.isFinite(parentCurrent) &&
                Number.isFinite(parentBase) &&
                Math.abs(baseSize - parentCurrent) < 0.5
            ) {
                baseSize = parentBase;
            }
        }

        if (Number.isFinite(baseSize)) {
            element.dataset.parentEaBaseFontSize = String(baseSize);
        }
    }

    function applyToElement(element) {
        if (!isTextElement(element)) return;

        rememberBaseSize(element);
        const baseSize = parseFloat(element.dataset.parentEaBaseFontSize);

        if (Number.isFinite(baseSize)) {
            element.style.setProperty(
                "font-size",
                (baseSize * scale).toFixed(2) + "px",
                "important"
            );
        }
    }

    roots.forEach(root => {
        const elements = [root, ...root.querySelectorAll("*")];
        elements.forEach(rememberBaseSize);
        elements.forEach(applyToElement);

        if (root.dataset.parentEaObserverAttached !== "true") {
            const observer = new MutationObserver(mutations => {
                const added = new Set();

                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            added.add(node);
                            node.querySelectorAll("*").forEach(child => added.add(child));
                        }
                        else if (node.nodeType === Node.TEXT_NODE) {
                            added.add(mutation.target);
                        }
                    });
                });

                const candidates = [...added].filter(isTextElement);
                candidates.forEach(rememberBaseSize);
                candidates.forEach(applyToElement);
            });

            observer.observe(root, { childList: true, subtree: true });
            root.dataset.parentEaObserverAttached = "true";
        }
    });
}

function applyParentEasyAccessPreferences(preferences) {
    const root = document.documentElement;

    root.dataset.parentEaFontFamily = preferences.fontFamily;
    root.dataset.parentEaTextSize = preferences.textSize;
    root.dataset.parentEaContrast = preferences.highContrast ? "high" : "normal";
    root.dataset.parentEaSimplified = String(preferences.simplified);
    root.dataset.parentEaMotion = preferences.reduceMotion ? "reduced" : "normal";

    const scale = {
        normal: 1,
        large: 1.15,
        "extra-large": 1.30
    }[preferences.textSize] || 1;

    applyParentTextSizeScale(scale);
}

function initializeParentGlobalEasyAccessPreferences() {
    applyParentEasyAccessPreferences(readParentEasyAccessPreferences());
}

/* Route all existing Parent profile-menu shortcuts to the implemented page. */
function initializeParentProfileNavigation() {
    document.querySelectorAll('[data-parent-demo-link="Profile Settings"], [data-parent-demo-link="EasyAccess"]').forEach(link => {
        link.href = "settings.html";
        link.removeAttribute("data-parent-demo-link");
    });

    document.querySelectorAll('[data-parent-demo-link="Account Security"]').forEach(link => {
        link.href = "settings.html#parentSecurityPanel";
        link.removeAttribute("data-parent-demo-link");
    });
}

function initializeParentEasyAccessPage() {
    const page = document.querySelector(".parent-ea-page");
    if (!page) return;

    const controls = {
        fontFamily: document.getElementById("parentEaFontFamily"),
        textSize: [...document.querySelectorAll('input[name="parentEaTextSize"]')],
        highContrast: document.getElementById("parentEaHighContrast"),
        simplified: document.getElementById("parentEaSimplified"),
        reduceMotion: document.getElementById("parentEaReduceMotion"),
        language: document.getElementById("parentEaLanguage"),
        speechEnabled: document.getElementById("parentEaSpeechEnabled"),
        speechVoice: document.getElementById("parentEaTtsVoice"),
        speechSpeed: document.getElementById("parentEaSpeechSpeed"),
        speechSpeedValue: document.getElementById("parentEaSpeechSpeedValue"),
        speechStatus: document.getElementById("parentEaSpeechStatus"),
        voiceStatus: document.getElementById("parentEaVoiceStatus"),
        preview: document.getElementById("parentEaPreview"),
        readButton: document.getElementById("parentEaReadPreview"),
        stopButton: document.getElementById("parentEaStopPreview"),
        saveButton: document.getElementById("parentEaSaveButton"),
        resetButton: document.getElementById("parentEaResetButton"),
        saveMessage: document.getElementById("parentEaSaveMessage")
    };

    const speechSupported =
        "speechSynthesis" in window &&
        typeof window.SpeechSynthesisUtterance === "function";

    let availableVoices = [];
    let currentUtterance = null;
    let preferences = readParentEasyAccessPreferences();

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
        controls.textSize.forEach(input => {
            input.checked = input.value === value.textSize;
        });
        controls.highContrast.checked = value.highContrast;
        controls.simplified.checked = value.simplified;
        controls.reduceMotion.checked = value.reduceMotion;
        controls.language.value = value.language;
        controls.speechEnabled.checked = value.speechEnabled;
        controls.speechSpeed.value = String(value.speechSpeed);
        controls.speechSpeedValue.textContent = Number(value.speechSpeed).toFixed(1) + "x";

        if ([...controls.speechVoice.options].some(option => option.value === value.speechVoice)) {
            controls.speechVoice.value = value.speechVoice;
        }
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

    function updatePreview() {
        const current = readFormPreferences();
        applyParentEasyAccessPreferences(current);

        if (controls.preview) {
            controls.preview.dataset.previewSize = current.textSize;
            controls.preview.dataset.previewContrast = current.highContrast ? "high" : "normal";
            controls.preview.dataset.previewSimplified = String(current.simplified);
            controls.preview.style.fontFamily = {
                inter: "Inter, sans-serif",
                arial: "Arial, sans-serif",
                verdana: "Verdana, sans-serif"
            }[current.fontFamily];
        }

        controls.speechSpeedValue.textContent = current.speechSpeed.toFixed(1) + "x";
        updateSpeechStatus();
    }

    function loadVoices() {
        if (!speechSupported) {
            controls.speechEnabled.disabled = true;
            controls.speechVoice.disabled = true;
            controls.readButton.disabled = true;
            controls.stopButton.disabled = true;

            if (controls.voiceStatus) {
                controls.voiceStatus.textContent = "Speech voices are unavailable on this browser or device.";
            }

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

        availableVoices
            .slice()
            .sort((a, b) => a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name))
            .forEach(voice => {
                const option = document.createElement("option");
                option.value = voice.voiceURI;
                option.textContent = voice.name + " (" + voice.lang + ")";
                controls.speechVoice.appendChild(option);
            });

        if (availableVoices.some(voice => voice.voiceURI === selected)) {
            controls.speechVoice.value = selected;
        }

        if (controls.voiceStatus) {
            controls.voiceStatus.textContent = availableVoices.length +
                " device voice(s) available. Availability depends on your browser and device.";
        }

        updateSpeechStatus();
    }

    function stopSpeech(message = "Speech preview stopped.") {
        if (speechSupported) window.speechSynthesis.cancel();
        currentUtterance = null;
        updateSpeechStatus(message);
    }

    populateForm(preferences);
    updatePreview();

    [
        controls.fontFamily,
        controls.highContrast,
        controls.simplified,
        controls.reduceMotion,
        controls.language,
        controls.speechEnabled,
        controls.speechVoice,
        controls.speechSpeed,
        ...controls.textSize
    ].forEach(control => {
        control.addEventListener("input", updatePreview);
        control.addEventListener("change", updatePreview);
    });

    controls.saveButton.addEventListener("click", () => {
        const next = readFormPreferences();

        try {
            localStorage.setItem(PARENT_EASYACCESS_STORAGE_KEY, JSON.stringify(next));
            preferences = next;
            applyParentEasyAccessPreferences(preferences);
            showSaveMessage("Your accessibility preferences have been saved in this browser for the demonstration Parent/Guardian account.");
        }
        catch (error) {
            console.error("Parent EasyAccess preferences could not be saved.", error);
            showSaveMessage("Preferences could not be saved in this browser. Check browser storage settings and try again.", true);
        }
    });

    controls.resetButton.addEventListener("click", () => {
        stopSpeech("Speech preview stopped. Default preferences restored.");
        const defaults = getParentEasyAccessDefaults();
        populateForm(defaults);
        preferences = defaults;
        updatePreview();

        try {
            localStorage.setItem(PARENT_EASYACCESS_STORAGE_KEY, JSON.stringify(defaults));
            showSaveMessage("Default accessibility preferences restored and saved in this browser.");
        }
        catch (error) {
            console.error("Parent EasyAccess defaults could not be saved.", error);
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
        const text = controls.preview?.innerText ||
            "Welcome to GabayAral Parent and Guardian Workspace. You can adjust your accessibility preferences here.";

        currentUtterance = new window.SpeechSynthesisUtterance(text);
        const languageMap = {
            en: "en-US",
            fil: "fil-PH",
            ceb: "ceb-PH",
            ilo: "ilo-PH"
        };

        currentUtterance.lang = languageMap[controls.language.value] || "en-US";
        currentUtterance.rate = Number(controls.speechSpeed.value);

        const chosenVoice = availableVoices.find(
            voice => voice.voiceURI === controls.speechVoice.value
        );

        if (chosenVoice) currentUtterance.voice = chosenVoice;

        currentUtterance.onstart = () => updateSpeechStatus("Reading the accessibility preview.");
        currentUtterance.onend = () => {
            currentUtterance = null;
            updateSpeechStatus("Reading preview finished.");
        };
        currentUtterance.onerror = event => {
            currentUtterance = null;
            updateSpeechStatus(
                event.error === "canceled"
                    ? "Reading preview stopped."
                    : "The device could not complete the speech preview. Try again."
            );
        };

        try {
            window.speechSynthesis.speak(currentUtterance);
        }
        catch (error) {
            console.error("Parent speech preview could not start.", error);
            updateSpeechStatus("The reading preview could not be started on this device.");
        }
    });

    controls.stopButton.addEventListener("click", () => stopSpeech());

    if (speechSupported) {
        loadVoices();

        if (typeof window.speechSynthesis.addEventListener === "function") {
            window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
        }
        else {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }
    else {
        loadVoices();
    }

    window.addEventListener("pagehide", () => {
        if (speechSupported) window.speechSynthesis.cancel();
    }, { once: true });

    /* Settings search is local to this page. */
    const search = document.getElementById("parentEasyAccessSearch");
    const empty = document.getElementById("parentEasyAccessSearchEmpty");
    const searchable = [...page.querySelectorAll(".parent-ea-searchable")];

    function filterSettings() {
        const query = (search?.value || "").trim().toLowerCase();
        let visible = 0;

        searchable.forEach(item => {
            const matches = item.textContent.toLowerCase().includes(query);
            item.hidden = query !== "" && !matches;
            if (!item.hidden) visible++;
        });

        if (empty) empty.hidden = query === "" || visible > 0;
    }

    search?.addEventListener("input", filterSettings);
    search?.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            search.value = "";
            filterSettings();
            search.blur();
        }
    });

    console.log("Parent EasyAccess initialized. Preferences are browser-local demonstration settings.");
}