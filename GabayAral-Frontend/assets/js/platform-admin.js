
/* ============================================================
   GABAYARAL
   PLATFORM ADMINISTRATOR SHARED JAVASCRIPT

   VERSION: F13 CONSOLIDATED REVISION

   PAGES:
   PA-02 to PA-18

   SHARED FEATURES:
   01. Page inventory
   02. Sidebar generation
   03. Topbar generation
   04. Active navigation
   05. Profile dropdown
   06. Mobile layout compatibility
   07. Global page search
   08. Table search and filtering
   09. Table pagination
   10. Demonstration forms
   11. Demonstration actions
   12. Notification read state
   13. Security incident review
   14. Maintenance date validation
   15. Local page refresh
   16. Toast notifications

   IMPORTANT:
   This is frontend demonstration functionality.
   Django and PostgreSQL are not connected.
============================================================ */

"use strict";


/* ============================================================
   01. PAGE INVENTORY
============================================================ */

const PA_PAGES = [

    {
        id: "dashboard",
        file: "dashboard.html",
        title: "Dashboard",
        group: "Overview",
        icon: "bi-grid-1x2-fill"
    },

    {
        id: "service-health",
        file: "service-health.html",
        title: "Service Health",
        group: "Overview",
        icon: "bi-activity"
    },

    {
        id: "school-workspaces",
        file: "school-workspaces.html",
        title: "Workspace Directory",
        group: "School Workspaces",
        icon: "bi-buildings"
    },

    {
        id: "workspace-details",
        file: "workspace-details.html",
        title: "Workspace Details",
        group: "School Workspaces",
        icon: "bi-card-list"
    },

    {
        id: "deactivation-requests",
        file: "deactivation-requests.html",
        title: "Deactivation Requests",
        group: "School Workspaces",
        icon: "bi-inbox"
    },

    {
        id: "deactivation-review",
        file: "deactivation-review.html",
        title: "Deactivation Review",
        group: "School Workspaces",
        icon: "bi-shield-check"
    },

    {
        id: "restoration-review",
        file: "restoration-review.html",
        title: "Restoration Review",
        group: "School Workspaces",
        icon: "bi-arrow-counterclockwise"
    },

    {
        id: "platform-accounts",
        file: "platform-accounts.html",
        title: "Platform Accounts",
        group: "Platform Access",
        icon: "bi-people"
    },

    {
        id: "role-authorization",
        file: "role-authorization.html",
        title: "Role Authorization",
        group: "Platform Access",
        icon: "bi-person-lock"
    },

    {
        id: "developer-access-requests",
        file: "developer-access-requests.html",
        title: "Developer Access Requests",
        group: "Platform Access",
        icon: "bi-key"
    },

    {
        id: "security-incidents",
        file: "security-incidents.html",
        title: "Security and Incidents",
        group: "Security and Operations",
        icon: "bi-shield-exclamation"
    },

    {
        id: "audit-events",
        file: "audit-events.html",
        title: "Audit Events",
        group: "Security and Operations",
        icon: "bi-clock-history"
    },

    {
        id: "platform-settings",
        file: "platform-settings.html",
        title: "Platform Settings",
        group: "Security and Operations",
        icon: "bi-gear"
    },

    {
        id: "maintenance-announcements",
        file: "maintenance-announcements.html",
        title: "Maintenance and Announcements",
        group: "Security and Operations",
        icon: "bi-megaphone"
    },

    {
        id: "backup-recovery",
        file: "backup-recovery.html",
        title: "Backup and Recovery",
        group: "Security and Operations",
        icon: "bi-database-check"
    },

    {
        id: "governance-oversight",
        file: "governance-oversight.html",
        title: "Governance Oversight",
        group: "Governance",
        icon: "bi-bank"
    },

    {
        id: "notifications-security",
        file: "notifications-security.html",
        title: "Notifications and Security",
        group: "My Account",
        icon: "bi-bell"
    }

];


const PA_GROUPS = [

    "Overview",
    "School Workspaces",
    "Platform Access",
    "Security and Operations",
    "Governance",
    "My Account"

];


/* ============================================================
   02. START APPLICATION
============================================================ */

function initializePlatformAdministrator() {

    const app = document.querySelector(
        ".platform-admin-app"
    );

    if (!app) {
        return;
    }


    // Prevent duplicate initialization.

    if (app.dataset.paInitialized === "true") {
        return;
    }

    app.dataset.paInitialized = "true";


    // Shared layout.

    renderPlatformAdminShell(app);

    initializePAToast(app);

    initializePAProfile(app);

    initializePADates(app);


    // Search and tables.

    initializePAGlobalSearch(app);

    initializePATables(app);


    // Forms and actions.

    initializePAMaintenanceValidation(app);

    initializePADemoForms(app);

    initializePADemoActions(app);


    // Page-specific interactions.

    initializePANotifications(app);

    initializePASecurityIncidents(app);


    // Shared refresh.

    initializePARefresh(app);


    console.log(
        "GabayAral Platform Administrator initialized."
    );

}


/* ============================================================
   03. CURRENT PAGE
============================================================ */

function getCurrentPAPage(app) {

    const pageId = app.dataset.paPage;


    const page = PA_PAGES.find(
        item => item.id === pageId
    );


    if (!page) {

        console.error(
            "Unknown Platform Administrator page:",
            pageId
        );

        return null;

    }


    return page;

}


/* ============================================================
   04. GENERATE SIDEBAR
============================================================ */

function renderPASidebar(currentPage) {

    let navigationHTML = "";


    PA_GROUPS.forEach(group => {

        const groupPages = PA_PAGES.filter(
            page => page.group === group
        );


        if (groupPages.length === 0) {
            return;
        }


        const links = groupPages.map(page => {

            const active =
                page.id === currentPage.id;


            return `

                <a
                    href="${page.file}"
                    class="side-link${active ? " active" : ""}"
                    ${active ? 'aria-current="page"' : ""}
                >

                    <i class="bi ${page.icon}"></i>

                    <span>${page.title}</span>

                </a>

            `;

        }).join("");


        navigationHTML += `

            <div class="nav-group">

                <p class="nav-heading">
                    ${group}
                </p>

                ${links}

            </div>

        `;

    });


    return `

        <aside
            class="sidebar pa-sidebar"
            id="sidebar"
        >

            <!-- BRAND -->

            <div class="brand-block">

                <a
                    href="dashboard.html"
                    class="brand"
                >

                    <i class="bi bi-book-half"></i>

                    <span>GabayAral</span>

                </a>


                <span class="role-pill">
                    Platform Administration
                </span>

            </div>


            <!-- NAVIGATION -->

            <nav
                class="side-nav"
                aria-label="Platform Administrator navigation"
            >

                ${navigationHTML}

            </nav>


            <!-- FOOTER -->

            <div class="sidebar-footer">

                <span class="footer-dot"></span>

                Platform Administration

            </div>

        </aside>

    `;

}


/* ============================================================
   05. GENERATE TOPBAR
============================================================ */

function renderPATopbar(currentPage) {

    return `

        <header class="topbar pa-topbar">


            <!-- MOBILE MENU -->

            <button
                type="button"
                class="pa-icon-button mobile-menu"
                id="menuToggle"
                aria-label="Open navigation"
                aria-expanded="false"
                aria-controls="sidebar"
            >

                <i class="bi bi-list"></i>

            </button>


            <!-- BREADCRUMBS -->

            <div class="pa-breadcrumbs">

                <i class="bi bi-house-door-fill"></i>

                <span>Platform Administration</span>

                <span>/</span>

                <strong>${currentPage.title}</strong>

            </div>


            <!-- TOPBAR TOOLS -->

            <div class="topbar-tools pa-topbar-tools">


                <!-- SEARCH -->

                <label class="pa-search-box">

                    <i class="bi bi-search"></i>

                    <input
                        type="search"
                        id="paGlobalSearch"
                        placeholder="Search this page..."
                        aria-label="Search current page"
                    >

                </label>


                <!-- REFRESH -->

                <button
                    type="button"
                    class="pa-icon-button"
                    data-pa-refresh
                    aria-label="Refresh current page view"
                    title="Refresh page view"
                >

                    <i class="bi bi-arrow-clockwise"></i>

                </button>


                <!-- NOTIFICATIONS -->

                <a
                    href="notifications-security.html"
                    class="pa-icon-button"
                    aria-label="Notifications"
                    title="Notifications"
                >

                    <i class="bi bi-bell"></i>

                    <span class="pa-notification-dot"></span>

                </a>


                <!-- PROFILE -->

                <div
                    class="pa-profile-wrapper"
                    id="paProfileWrapper"
                >

                    <button
                        type="button"
                        class="pa-profile-button"
                        id="paProfileButton"
                        aria-expanded="false"
                        aria-controls="paProfileMenu"
                    >

                        <span class="pa-avatar">

                            <i class="bi bi-person-fill"></i>

                        </span>

                        <span class="pa-profile-label">
                            Platform Administrator
                        </span>

                        <i class="bi bi-chevron-down pa-profile-chevron"></i>

                    </button>


                    <!-- PROFILE MENU -->

                    <div
                        class="pa-profile-menu"
                        id="paProfileMenu"
                        hidden
                    >

                        <div class="pa-profile-menu-header">

                            <span class="pa-profile-menu-avatar">

                                <i class="bi bi-person-fill"></i>

                            </span>

                            <div>

                                <strong>
                                    Platform Administrator
                                </strong>

                                <small>
                                    Demonstration account
                                </small>

                            </div>

                        </div>


                        <div class="pa-profile-divider"></div>


                        <a
                            href="notifications-security.html"
                            class="pa-profile-menu-item"
                        >

                            <i class="bi bi-person-gear"></i>

                            <span>Account and Security</span>

                        </a>


                        <a
                            href="governance-oversight.html"
                            class="pa-profile-menu-item"
                        >

                            <i class="bi bi-bank"></i>

                            <span>Governance Oversight</span>

                        </a>


                        <div class="pa-profile-divider"></div>


                        <button
                            type="button"
                            class="pa-profile-menu-item danger"
                            data-pa-signout
                        >

                            <i class="bi bi-box-arrow-right"></i>

                            <span>Sign Out</span>

                        </button>

                    </div>

                </div>

            </div>

        </header>

    `;

}


/* ============================================================
   06. RENDER SHARED LAYOUT
============================================================ */

function renderPlatformAdminShell(app) {

    const currentPage = getCurrentPAPage(app);

    if (!currentPage) {
        return false;
    }


    const sidebarMount = document.getElementById(
        "paSidebarMount"
    );

    const topbarMount = document.getElementById(
        "paTopbarMount"
    );


    if (!sidebarMount || !topbarMount) {

        console.error(
            "Missing Platform Administrator shell mount."
        );

        return false;

    }


    // Generate the shared sidebar.

    sidebarMount.innerHTML =
        renderPASidebar(currentPage);


    // Generate the shared topbar.

    topbarMount.innerHTML =
        renderPATopbar(currentPage);


    // Update browser title.

    document.title =
        currentPage.title + " | GabayAral";


    // Validate active navigation.

    const activeLinks = sidebarMount.querySelectorAll(
        '.side-link[aria-current="page"]'
    );


    if (activeLinks.length !== 1) {

        console.error(
            "Sidebar must contain exactly one active page."
        );

        return false;

    }


    return true;

}


/* ============================================================
   07. SHARED TOAST
============================================================ */

function initializePAToast(app) {

    let toast = document.getElementById("paToast");


    if (!toast) {

        toast = document.createElement("div");

        toast.id = "paToast";

        toast.className = "pa-toast";

        toast.setAttribute("role", "status");

        toast.setAttribute("aria-live", "polite");

        toast.hidden = true;

        app.appendChild(toast);

    }


    let toastTimer = null;


    app.showPAToast = function(
        message,
        type = "info"
    ) {

        window.clearTimeout(toastTimer);


        toast.replaceChildren();


        const icon = document.createElement("i");


        const iconClasses = {

            success: "bi bi-check-circle-fill",

            error: "bi bi-exclamation-circle-fill",

            info: "bi bi-info-circle-fill"

        };


        icon.className =
            iconClasses[type] || iconClasses.info;


        const text = document.createElement("span");

        text.textContent = message;


        toast.append(icon, text);

        toast.hidden = false;


        toastTimer = window.setTimeout(() => {

            toast.hidden = true;

        }, 4500);

    };

}


/* ============================================================
   08. PROFILE DROPDOWN
============================================================ */

function initializePAProfile(app) {

    const wrapper = document.getElementById(
        "paProfileWrapper"
    );

    const button = document.getElementById(
        "paProfileButton"
    );

    const menu = document.getElementById(
        "paProfileMenu"
    );


    if (!wrapper || !button || !menu) {
        return;
    }


    function openMenu() {

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


        if (restoreFocus) {

            button.focus();

        }

    }


    button.addEventListener("click", () => {

        if (menu.hidden) {

            openMenu();

        } else {

            closeMenu();

        }

    });


    document.addEventListener("click", event => {

        if (
            !menu.hidden &&
            !wrapper.contains(event.target)
        ) {

            closeMenu();

        }

    });


    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            !menu.hidden
        ) {

            closeMenu(true);

        }

    });


    // DEMONSTRATION SIGN OUT.

    const signOutButton = menu.querySelector(
        "[data-pa-signout]"
    );


    if (signOutButton) {

        signOutButton.addEventListener("click", () => {

            closeMenu();


            const confirmed = window.confirm(
                "Demonstration only. No actual account session " +
                "will be terminated. Continue?"
            );


            if (confirmed) {

                app.showPAToast(
                    "Demonstration sign-out selected. " +
                    "No real account session was ended."
                );

            }

        });

    }

}


/* ============================================================
   09. DATE AND YEAR
============================================================ */

function initializePADates(app) {

    updatePADates(app);

}


function updatePADates(app) {

    const now = new Date();


    const formattedDate =
        now.toLocaleDateString(
            "en-PH",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );


    const formattedTime =
        now.toLocaleTimeString(
            "en-PH",
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );


    app.querySelectorAll(
        "[data-pa-date]"
    ).forEach(element => {

        element.textContent = formattedDate;

    });


    app.querySelectorAll(
        "[data-pa-year]"
    ).forEach(element => {

        element.textContent = now.getFullYear();

    });


    app.querySelectorAll(
        "[data-pa-last-updated]"
    ).forEach(element => {

        element.textContent =
            "Page view loaded: " + formattedTime;

    });

}


/* ============================================================
   10. GLOBAL PAGE SEARCH
============================================================ */

function initializePAGlobalSearch(app) {

    const searchInput = document.getElementById(
        "paGlobalSearch"
    );

    if (!searchInput) {
        return;
    }


    function runSearch() {

        const query = searchInput.value
            .trim()
            .toLowerCase();


        const items = Array.from(
            app.querySelectorAll("[data-pa-searchable]")
        );


        let visibleCount = 0;


        items.forEach(item => {

            const content =
                item.textContent
                    .toLowerCase()
                    .replace(/\s+/g, " ")
                    .trim();


            const matches =
                content.includes(query);


            item.hidden =
                query !== "" && !matches;


            if (!item.hidden) {

                visibleCount++;

            }

        });


        // Hide sections without visible matching items.

        app.querySelectorAll(
            "[data-pa-section]"
        ).forEach(section => {

            const children = Array.from(
                section.querySelectorAll("[data-pa-searchable]")
            );


            if (children.length === 0) {
                return;
            }


            const hasVisible =
                children.some(item => !item.hidden);


            section.hidden =
                query !== "" && !hasVisible;

        });


        // Global empty state.

        const emptyState = app.querySelector(
            "[data-pa-search-empty]"
        );


        if (emptyState) {

            emptyState.hidden =
                query === "" || visibleCount > 0;

        }

    }


    searchInput.addEventListener(
        "input",
        runSearch
    );


    searchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                searchInput.value = "";

                runSearch();

                searchInput.blur();

            }

        }
    );

}


/* ============================================================
   11. GENERIC TABLE SEARCH, FILTERS AND PAGINATION
============================================================ */

function initializePATables(app) {

    const tables = app.querySelectorAll(
        "[data-pa-table]"
    );


    tables.forEach(table => {

        const tableKey = table.dataset.paTable;

        const tbody = table.querySelector("tbody");


        if (!tableKey || !tbody) {
            return;
        }


        if (table.dataset.paTableInitialized === "true") {
            return;
        }

        table.dataset.paTableInitialized = "true";


        const rows = Array.from(
            tbody.querySelectorAll("tr[data-pa-row]")
        );


        const searchInput = app.querySelector(
            `[data-pa-table-search="${tableKey}"]`
        );


        const filters = Array.from(
            app.querySelectorAll(
                `[data-pa-table-filter][data-pa-target="${tableKey}"]`
            )
        );


        const pageSizeInput = app.querySelector(
            `[data-pa-page-size="${tableKey}"]`
        );


        const pagination = app.querySelector(
            `[data-pa-pagination="${tableKey}"]`
        );


        const resultElements = app.querySelectorAll(
            `[data-pa-result-count="${tableKey}"]`
        );


        const emptyState = app.querySelector(
            `[data-pa-table-empty="${tableKey}"]`
        );


        const tableWrapper = table.closest(
            "[data-pa-table-wrapper]"
        );


        let currentPage = 1;


        let pageSize = pageSizeInput
            ? Number(pageSizeInput.value)
            : 8;


        if (
            !Number.isInteger(pageSize) ||
            pageSize < 1
        ) {

            pageSize = 8;

        }


        /* FILTER RECORDS */

        function getFilteredRows() {

            const query = searchInput
                ? searchInput.value.trim().toLowerCase()
                : "";


            return rows.filter(row => {

                const rowText =
                    row.textContent
                        .toLowerCase()
                        .replace(/\s+/g, " ")
                        .trim();


                const matchesSearch =
                    rowText.includes(query);


                const matchesFilters =
                    filters.every(filter => {

                        const field =
                            filter.dataset.paTableFilter;


                        const selected =
                            filter.value;


                        if (
                            selected === "all" ||
                            selected === ""
                        ) {

                            return true;

                        }


                        const rowValue =
                            String(row.dataset[field] || "")
                                .toLowerCase();


                        return (
                            rowValue === selected.toLowerCase()
                        );

                    });


                return (
                    matchesSearch &&
                    matchesFilters
                );

            });

        }


        /* RENDER PAGINATION */

        function renderPagination(totalPages, hasRecords) {

            if (!pagination) {
                return;
            }


            pagination.replaceChildren();

            pagination.hidden = !hasRecords;


            if (!hasRecords) {
                return;
            }


            // PREVIOUS BUTTON

            const previous = document.createElement("button");

            previous.type = "button";

            previous.className = "pa-page-button";

            previous.setAttribute(
                "aria-label",
                "Previous page"
            );

            previous.innerHTML =
                '<i class="bi bi-chevron-left"></i>';


            previous.disabled =
                currentPage <= 1;


            previous.addEventListener("click", () => {

                if (currentPage > 1) {

                    currentPage--;

                    renderTable();

                }

            });


            pagination.appendChild(previous);


            // PAGE NUMBERS

            for (
                let page = 1;
                page <= totalPages;
                page++
            ) {

                const button = document.createElement("button");

                button.type = "button";

                button.className =
                    "pa-page-button" +
                    (page === currentPage ? " active" : "");


                button.textContent = page;


                button.setAttribute(
                    "aria-label",
                    "Go to page " + page
                );


                if (page === currentPage) {

                    button.setAttribute(
                        "aria-current",
                        "page"
                    );

                }


                button.addEventListener("click", () => {

                    currentPage = page;

                    renderTable();

                });


                pagination.appendChild(button);

            }


            // NEXT BUTTON

            const next = document.createElement("button");

            next.type = "button";

            next.className = "pa-page-button";

            next.setAttribute(
                "aria-label",
                "Next page"
            );

            next.innerHTML =
                '<i class="bi bi-chevron-right"></i>';


            next.disabled =
                currentPage >= totalPages;


            next.addEventListener("click", () => {

                if (currentPage < totalPages) {

                    currentPage++;

                    renderTable();

                }

            });


            pagination.appendChild(next);

        }


        /* RENDER TABLE */

        function renderTable() {

            const filteredRows =
                getFilteredRows();


            const total =
                filteredRows.length;


            const totalPages = Math.max(
                1,
                Math.ceil(total / pageSize)
            );


            currentPage = Math.min(
                currentPage,
                totalPages
            );


            const start =
                (currentPage - 1) * pageSize;


            const end = Math.min(
                start + pageSize,
                total
            );


            const visibleRows =
                filteredRows.slice(start, end);


            // Hide all records first.

            rows.forEach(row => {

                row.hidden = true;

            });


            // Show only the current page.

            visibleRows.forEach(row => {

                row.hidden = false;

            });


            const hasRecords =
                total > 0;


            // TABLE WRAPPER.

            if (tableWrapper) {

                tableWrapper.hidden =
                    !hasRecords;

            }


            // EMPTY STATE.

            if (emptyState) {

                emptyState.hidden =
                    hasRecords;

            }


            // RESULT COUNT.

            let resultMessage = "No matching records found.";


            if (hasRecords) {

                resultMessage =
                    "Showing " +
                    (start + 1) +
                    " to " +
                    end +
                    " of " +
                    total +
                    " records";

            }


            resultElements.forEach(element => {

                element.textContent =
                    resultMessage;

            });


            // PAGINATION.

            renderPagination(
                totalPages,
                hasRecords
            );

        }


        /* SEARCH EVENT */

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                () => {

                    currentPage = 1;

                    renderTable();

                }
            );


            searchInput.addEventListener(
                "keydown",
                event => {

                    if (event.key === "Escape") {

                        searchInput.value = "";

                        currentPage = 1;

                        renderTable();

                        searchInput.blur();

                    }

                }
            );

        }


        /* FILTER EVENTS */

        filters.forEach(filter => {

            filter.addEventListener(
                "change",
                () => {

                    currentPage = 1;

                    renderTable();

                }
            );

        });


        /* PAGE SIZE EVENT */

        if (pageSizeInput) {

            pageSizeInput.addEventListener(
                "change",
                () => {

                    const selected =
                        Number(pageSizeInput.value);


                    if (
                        Number.isInteger(selected) &&
                        selected > 0
                    ) {

                        pageSize = selected;

                        currentPage = 1;

                        renderTable();

                    }

                }
            );

        }


        /* RESET FUNCTION */

        table.resetPAFilters = function() {

            if (searchInput) {

                searchInput.value = "";

            }


            filters.forEach(filter => {

                filter.value = "all";

            });


            currentPage = 1;

            renderTable();

        };


        // Initial table display.

        renderTable();

    });


    /* CLEAR FILTER BUTTONS */

    app.querySelectorAll(
        "[data-pa-clear-table]"
    ).forEach(button => {

        button.addEventListener("click", () => {

            const tableKey =
                button.dataset.paClearTable;


            const table = app.querySelector(
                `[data-pa-table="${tableKey}"]`
            );


            if (
                table &&
                typeof table.resetPAFilters === "function"
            ) {

                table.resetPAFilters();

            }

        });

    });

}


/* ============================================================
   12. DEMONSTRATION FORM HANDLER
============================================================ */

function initializePADemoForms(app) {

    const forms = app.querySelectorAll(
        "form[data-pa-demo-form]"
    );


    forms.forEach(form => {

        if (form.dataset.paFormInitialized === "true") {
            return;
        }

        form.dataset.paFormInitialized = "true";


        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (!form.reportValidity()) {
                    return;
                }


                const message =
                    form.dataset.paSuccessMessage ||
                    "Demonstration form completed locally. " +
                    "Nothing was submitted to the Backend.";


                const result = form.querySelector(
                    "[data-pa-form-result]"
                );


                if (result) {

                    result.textContent = message;

                    result.hidden = false;

                }


                app.showPAToast(
                    message,
                    "success"
                );


                // Reset only when explicitly requested.

                if (
                    form.hasAttribute(
                        "data-pa-reset-on-success"
                    )
                ) {

                    form.reset();

                }

            }
        );

    });

}


/* ============================================================
   13. DEMONSTRATION ACTIONS
============================================================ */

function initializePADemoActions(app) {

    app.addEventListener("click", event => {

        const target =
            event.target instanceof Element
                ? event.target
                : null;


        if (!target) {
            return;
        }


        const button = target.closest(
            "[data-pa-demo-action]"
        );


        if (
            !button ||
            !app.contains(button)
        ) {

            return;

        }


        const action =
            button.dataset.paDemoAction;


        // Notifications have their own local read-state handler.

        if (action === "acknowledge") {
            return;
        }


        const confirmation =
            button.dataset.paConfirmMessage;


        if (confirmation) {

            const accepted = window.confirm(
                confirmation +
                "\n\nThis is a demonstration. " +
                "No real system record will change."
            );


            if (!accepted) {
                return;
            }

        }


        const messages = {

            approve:
                "Demonstration approval prepared locally. " +
                "No actual permission was granted.",

            reject:
                "Demonstration rejection selected. " +
                "No actual request was rejected.",

            return:
                "Demonstration return action selected.",

            restore:
                "Demonstration restoration selected. " +
                "No actual workspace was restored.",

            deactivate:
                "Demonstration deactivation selected. " +
                "No actual workspace was deactivated.",

            assign:
                "Demonstration assignment prepared locally.",

            publish:
                "Demonstration publishing action selected. " +
                "No real announcement was published.",

            save:
                "Demonstration settings prepared locally. " +
                "No Backend configuration was changed.",

            close:
                "Demonstration closure review prepared locally.",

            reopen:
                "Demonstration reopening request prepared locally.",

            review:
                "Demonstration review action selected.",

            export:
                "Export is not connected to an approved data source."

        };


        const message =
            button.dataset.paSuccessMessage ||
            messages[action] ||
            "Demonstration action completed locally.";


        app.showPAToast(message);

    });

}


/* ============================================================
   14. NOTIFICATION READ STATE
============================================================ */

function initializePANotifications(app) {

    const notificationButtons = app.querySelectorAll(
        '.pa-setting-row button[data-pa-demo-action="acknowledge"]'
    );


    if (notificationButtons.length === 0) {
        return;
    }


    function updateUnreadCount() {

        const unreadButtons = app.querySelectorAll(
            '.pa-setting-row button[data-pa-demo-action="acknowledge"]'
        );


        const count =
            unreadButtons.length;


        // Update notification summary card.

        const statCards = Array.from(
            app.querySelectorAll(".pa-stat-card")
        );


        const notificationCard = statCards.find(card => {

            return card.textContent
                .toLowerCase()
                .includes("notifications");

        });


        if (notificationCard) {

            const number = notificationCard.querySelector(
                "strong"
            );


            if (number) {

                number.textContent =
                    String(count).padStart(2, "0");

            }

        }


        // Update notification inbox badge.

        const badge = app.querySelector(
            ".pa-panel-header .pa-badge-info"
        );


        if (badge) {

            badge.textContent =
                count === 1
                    ? "01 Unread"
                    : String(count).padStart(2, "0") + " Unread";

        }


        // Update topbar notification dot.

        const dot = app.querySelector(
            ".pa-notification-dot"
        );


        if (dot) {

            dot.hidden = count === 0;

        }

    }


    notificationButtons.forEach(button => {

        button.addEventListener("click", () => {

            const row = button.closest(
                ".pa-setting-row"
            );


            if (!row || row.dataset.paRead === "true") {
                return;
            }


            row.dataset.paRead = "true";


            const readBadge = document.createElement("span");

            readBadge.className =
                "pa-badge pa-badge-neutral";

            readBadge.textContent = "Read";


            button.replaceWith(readBadge);


            updateUnreadCount();


            app.showPAToast(
                "Sample notification marked as read. " +
                "This state is local to the current page session.",
                "success"
            );

        });

    });


    updateUnreadCount();

}


/* ============================================================
   15. SECURITY INCIDENT REVIEW
============================================================ */

function initializePASecurityIncidents(app) {

    const modal = document.getElementById(
        "paIncidentModal"
    );

    if (!modal) {
        return;
    }


    const modalFields = {

        id: document.getElementById(
            "paIncidentId"
        ),

        title: document.getElementById(
            "paIncidentTitle"
        ),

        category: document.getElementById(
            "paIncidentCategory"
        ),

        priority: document.getElementById(
            "paIncidentPriority"
        ),

        status: document.getElementById(
            "paIncidentStatus"
        ),

        date: document.getElementById(
            "paIncidentDate"
        ),

        source: document.getElementById(
            "paIncidentSource"
        ),

        scope: document.getElementById(
            "paIncidentScope"
        ),

        description: document.getElementById(
            "paIncidentDescription"
        )

    };


    const hiddenId = document.getElementById(
        "paIncidentReviewId"
    );


    const form = document.getElementById(
        "paIncidentReviewForm"
    );


    /* OPEN SELECTED INCIDENT */

    app.addEventListener("click", event => {

        const target =
            event.target instanceof Element
                ? event.target
                : null;


        if (!target) {
            return;
        }


        const button = target.closest(
            "[data-pa-incident-open]"
        );


        if (
            !button ||
            !app.contains(button)
        ) {

            return;

        }


        const values = {

            id: button.dataset.incidentId,

            title: button.dataset.incidentTitle,

            category: button.dataset.incidentCategory,

            priority: button.dataset.incidentPriority,

            status: button.dataset.incidentStatus,

            date: button.dataset.incidentDate,

            source: button.dataset.incidentSource,

            scope: button.dataset.incidentScope,

            description: button.dataset.incidentDescription

        };


        // Populate modal fields safely.

        Object.entries(modalFields).forEach(([key, field]) => {

            if (field) {

                field.textContent =
                    values[key] || "Not available";

            }

        });


        // Set hidden request ID.

        if (hiddenId) {

            hiddenId.value =
                values.id || "";

        }


        // Reset previous modal result.

        if (form) {

            const result = form.querySelector(
                "[data-pa-form-result]"
            );


            if (result) {

                result.hidden = true;

                result.textContent = "";

            }

        }


        // Open Bootstrap modal.

        if (
            !window.bootstrap ||
            !window.bootstrap.Modal
        ) {

            app.showPAToast(
                "Incident review modal is unavailable. " +
                "Check the Bootstrap JavaScript reference.",
                "error"
            );

            return;

        }


        const modalInstance =
            window.bootstrap.Modal.getOrCreateInstance(
                modal
            );


        modalInstance.show();

    });


    // Clear modal state after closing.

    modal.addEventListener(
        "hidden.bs.modal",
        () => {

            if (form) {

                form.reset();


                const result = form.querySelector(
                    "[data-pa-form-result]"
                );


                if (result) {

                    result.hidden = true;

                    result.textContent = "";

                }

            }


            if (hiddenId) {

                hiddenId.value = "";

            }

        }
    );

}


/* ============================================================
   16. MAINTENANCE DATE VALIDATION
============================================================ */

function initializePAMaintenanceValidation(app) {

    const startInput = document.getElementById(
        "maintenanceStart"
    );

    const endInput = document.getElementById(
        "maintenanceEnd"
    );


    if (!startInput || !endInput) {
        return;
    }


    const form = startInput.closest("form");

    if (!form) {
        return;
    }


    function validateMaintenanceDates() {

        endInput.setCustomValidity("");


        if (
            startInput.value &&
            endInput.value
        ) {

            const start =
                new Date(startInput.value).getTime();


            const end =
                new Date(endInput.value).getTime();


            if (
                Number.isFinite(start) &&
                Number.isFinite(end) &&
                end <= start
            ) {

                endInput.setCustomValidity(
                    "The proposed end date must be later than the start date."
                );

            }

        }

    }


    startInput.addEventListener(
        "change",
        validateMaintenanceDates
    );


    endInput.addEventListener(
        "change",
        validateMaintenanceDates
    );


    form.addEventListener(
        "reset",
        () => {

            window.setTimeout(() => {

                endInput.setCustomValidity("");

            }, 0);

        }
    );


    form.addEventListener(
        "submit",
        () => {

            validateMaintenanceDates();

        },
        true
    );

}


/* ============================================================
   17. LOCAL PAGE VIEW REFRESH
============================================================ */

function initializePARefresh(app) {

    const refreshButtons = app.querySelectorAll(
        "[data-pa-refresh]"
    );


    refreshButtons.forEach(button => {

        button.addEventListener("click", () => {

            if (button.disabled) {
                return;
            }


            button.disabled = true;


            const icon = button.querySelector("i");


            if (icon) {

                icon.classList.remove(
                    "bi-arrow-clockwise"
                );

                icon.classList.add(
                    "bi-arrow-repeat"
                );

            }


            window.setTimeout(() => {

                updatePADates(app);


                button.disabled = false;


                if (icon) {

                    icon.classList.remove(
                        "bi-arrow-repeat"
                    );

                    icon.classList.add(
                        "bi-arrow-clockwise"
                    );

                }


                app.showPAToast(
                    "Page view refreshed locally. " +
                    "No live platform data was requested.",
                    "success"
                );

            }, 300);

        });

    });

}


/* ============================================================
   18. START APPLICATION SAFELY
============================================================ */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializePlatformAdministrator,
        { once: true }
    );

} else {

    initializePlatformAdministrator();

}
