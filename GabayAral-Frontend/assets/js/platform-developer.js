
/* ============================================================
   GABAYARAL
   PLATFORM DEVELOPER SHARED JAVASCRIPT

   VERSION: F14.4
   ROLE: PLATFORM DEVELOPER

   PAGE INVENTORY:
   PDEV-01 TO PDEV-12

   FEATURES:
   01. Page inventory
   02. Sidebar generation
   03. Topbar generation
   04. Active navigation
   05. Profile dropdown
   06. Date and time
   07. Global search
   08. Table search and filters
   09. Pagination
   10. Demonstration forms
   11. Demonstration actions
   12. Notification read state
   13. Issue review modal
   14. Refresh interaction
   15. Toast notifications

   BACKEND:
   Django and PostgreSQL are not connected.

   IMPORTANT:
   This controller is independent of platform-admin.js.
============================================================ */

(function () {

    "use strict";


    /* ========================================================
       01. PAGE INVENTORY
    ======================================================== */

    const PDEV_PAGES = [

        {
            id: "dashboard",
            file: "dashboard.html",
            title: "Dashboard",
            group: "Overview",
            icon: "bi-grid-1x2-fill"
        },

        {
            id: "technical-issues",
            file: "technical-issues.html",
            title: "Technical Issues",
            group: "Development",
            icon: "bi-bug"
        },

        {
            id: "code-quality-assurance",
            file: "code-quality-assurance.html",
            title: "Code and Quality Assurance",
            group: "Development",
            icon: "bi-code-slash"
        },

        {
            id: "release-management",
            file: "release-management.html",
            title: "Release Management",
            group: "Release and Deployment",
            icon: "bi-box-seam"
        },

        {
            id: "deployment-management",
            file: "deployment-management.html",
            title: "Deployment Management",
            group: "Release and Deployment",
            icon: "bi-rocket-takeoff"
        },

        {
            id: "rollback-management",
            file: "rollback-management.html",
            title: "Rollback Management",
            group: "Release and Deployment",
            icon: "bi-arrow-counterclockwise"
        },

        {
            id: "database-integrations",
            file: "database-integrations.html",
            title: "Database and Integrations",
            group: "Technical Operations",
            icon: "bi-database"
        },

        {
            id: "security-vulnerabilities",
            file: "security-vulnerabilities.html",
            title: "Security Vulnerabilities",
            group: "Technical Operations",
            icon: "bi-shield-exclamation"
        },

        {
            id: "backup-recovery",
            file: "backup-recovery.html",
            title: "Backup and Recovery",
            group: "Technical Operations",
            icon: "bi-database-check"
        },

        {
            id: "technical-documentation",
            file: "technical-documentation.html",
            title: "Technical Documentation",
            group: "Documentation and Access",
            icon: "bi-file-earmark-text"
        },

        {
            id: "access-requests",
            file: "access-requests.html",
            title: "Access Requests",
            group: "Documentation and Access",
            icon: "bi-key"
        },

        {
            id: "notifications-security",
            file: "notifications-security.html",
            title: "Notifications and Security",
            group: "My Account",
            icon: "bi-bell"
        }

    ];


    const PDEV_GROUPS = [

        "Overview",
        "Development",
        "Release and Deployment",
        "Technical Operations",
        "Documentation and Access",
        "My Account"

    ];


    /* ========================================================
       02. APPLICATION INITIALIZATION
    ======================================================== */

    function initializePlatformDeveloper() {

        const app = document.querySelector(
            ".platform-developer-app"
        );


        if (!app) {
            return;
        }


        // Prevent duplicate initialization.

        if (
            app.dataset.pdevInitialized === "true"
        ) {

            return;

        }


        const currentPage = getCurrentPage(app);


        if (!currentPage) {

            console.error(
                "Unknown Platform Developer page:",
                app.dataset.pdevPage
            );

            return;

        }


        // Generate the shell before layout.js initializes.

        const shellReady = renderDeveloperShell(
            app,
            currentPage
        );


        if (!shellReady) {

            console.error(
                "Platform Developer layout could not initialize."
            );

            return;

        }


        app.dataset.pdevInitialized = "true";


        initializeToast(app);

        initializeProfile(app);

        initializeDates(app);

        initializeGlobalSearch(app);

        initializeTables(app);

        initializeDemoForms(app);

        initializeDemoActions(app);

        initializeNotifications(app);

        initializeIssueModal(app);

        initializeRefresh(app);


        console.log(
            "GabayAral Platform Developer initialized:",
            currentPage.id
        );

    }


    /* ========================================================
       03. GET CURRENT PAGE
    ======================================================== */

    function getCurrentPage(app) {

        const pageId = app.dataset.pdevPage;


        return PDEV_PAGES.find(
            page => page.id === pageId
        ) || null;

    }


    /* ========================================================
       04. GENERATE SIDEBAR
    ======================================================== */

    function renderDeveloperSidebar(currentPage) {

        let navigationHTML = "";


        PDEV_GROUPS.forEach(group => {

            const pages = PDEV_PAGES.filter(
                page => page.group === group
            );


            if (pages.length === 0) {
                return;
            }


            const links = pages.map(page => {

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
                class="sidebar pdev-sidebar"
                id="sidebar"
            >

                <div class="brand-block">

                    <a
                        href="dashboard.html"
                        class="brand"
                    >

                        <i class="bi bi-book-half"></i>

                        <span>GabayAral</span>

                    </a>


                    <span class="role-pill">
                        Platform Developer
                    </span>

                </div>


                <nav
                    class="side-nav"
                    aria-label="Platform Developer navigation"
                >

                    ${navigationHTML}

                </nav>


                <div class="sidebar-footer">

                    <span class="footer-dot"></span>

                    Developer Workspace

                </div>

            </aside>

        `;

    }


    /* ========================================================
       05. GENERATE TOPBAR
    ======================================================== */

    function renderDeveloperTopbar(currentPage) {

        return `

            <header class="topbar pdev-topbar">


                <!-- MOBILE MENU -->

                <button
                    type="button"
                    class="pdev-icon-button mobile-menu"
                    id="menuToggle"
                    aria-label="Open navigation"
                    aria-expanded="false"
                    aria-controls="sidebar"
                >

                    <i class="bi bi-list"></i>

                </button>


                <!-- BREADCRUMBS -->

                <div class="breadcrumbs">

                    <i class="bi bi-house-door-fill"></i>

                    <span>Platform Development</span>

                    <span>/</span>

                    <strong>${currentPage.title}</strong>

                </div>


                <!-- TOPBAR TOOLS -->

                <div class="topbar-tools pdev-topbar-tools">


                    <!-- SEARCH -->

                    <label class="search-box pdev-search-box">

                        <i class="bi bi-search"></i>

                        <input
                            type="search"
                            id="pdevGlobalSearch"
                            placeholder="Search this page..."
                            aria-label="Search current page"
                        >

                    </label>


                    <!-- REFRESH -->

                    <button
                        type="button"
                        class="pdev-icon-button"
                        data-pdev-refresh
                        aria-label="Refresh page view"
                        title="Refresh page view"
                    >

                        <i class="bi bi-arrow-clockwise"></i>

                    </button>


                    <!-- NOTIFICATIONS -->

                    <a
                        href="notifications-security.html"
                        class="pdev-icon-button"
                        aria-label="Notifications"
                        title="Notifications"
                    >

                        <i class="bi bi-bell"></i>

                        <span
                            class="pdev-notification-dot"
                            data-pdev-notification-dot
                        ></span>

                    </a>


                    <!-- PROFILE -->

                    <div
                        class="pdev-profile-wrapper"
                        id="pdevProfileWrapper"
                    >

                        <button
                            type="button"
                            class="pdev-profile-button"
                            id="pdevProfileButton"
                            aria-expanded="false"
                            aria-controls="pdevProfileMenu"
                        >

                            <span class="pdev-avatar">

                                <i class="bi bi-person-fill"></i>

                            </span>

                            <span class="pdev-profile-label">
                                Platform Developer
                            </span>

                            <i class="bi bi-chevron-down"></i>

                        </button>


                        <!-- PROFILE MENU -->

                        <div
                            class="pdev-profile-menu"
                            id="pdevProfileMenu"
                            hidden
                        >

                            <div class="pdev-profile-menu-header">

                                <span class="pdev-profile-menu-avatar">

                                    <i class="bi bi-person-fill"></i>

                                </span>

                                <div>

                                    <strong>
                                        Platform Developer
                                    </strong>

                                    <small>
                                        Demonstration account
                                    </small>

                                </div>

                            </div>


                            <div class="pdev-profile-divider"></div>


                            <a
                                href="notifications-security.html"
                                class="pdev-profile-menu-item"
                            >

                                <i class="bi bi-person-gear"></i>

                                Account and Security

                            </a>


                            <a
                                href="access-requests.html"
                                class="pdev-profile-menu-item"
                            >

                                <i class="bi bi-key"></i>

                                My Access Requests

                            </a>


                            <div class="pdev-profile-divider"></div>


                            <button
                                type="button"
                                class="pdev-profile-menu-item"
                                data-pdev-signout
                            >

                                <i class="bi bi-box-arrow-right"></i>

                                Sign Out

                            </button>

                        </div>

                    </div>

                </div>

            </header>

        `;

    }


    /* ========================================================
       06. RENDER SHARED SHELL
    ======================================================== */

    function renderDeveloperShell(app, currentPage) {

        const sidebarMount = document.getElementById(
            "pdevSidebarMount"
        );


        const topbarMount = document.getElementById(
            "pdevTopbarMount"
        );


        if (!sidebarMount || !topbarMount) {

            console.error(
                "Missing Developer sidebar or topbar mount."
            );

            return false;

        }


        sidebarMount.innerHTML =
            renderDeveloperSidebar(currentPage);


        topbarMount.innerHTML =
            renderDeveloperTopbar(currentPage);


        document.title =
            currentPage.title + " | GabayAral";


        // Exactly one page must be active.

        const activeLinks =
            sidebarMount.querySelectorAll(
                '.side-link[aria-current="page"]'
            );


        if (activeLinks.length !== 1) {

            console.error(
                "Developer sidebar must have exactly one active link."
            );

            return false;

        }


        return true;

    }


    /* ========================================================
       07. TOAST NOTIFICATION
    ======================================================== */

    function initializeToast(app) {

        let toast = app.querySelector(
            "#pdevToast"
        );


        if (!toast) {

            toast = document.createElement("div");

            toast.id = "pdevToast";

            toast.className = "pdev-toast";

            toast.setAttribute("role", "status");

            toast.setAttribute("aria-live", "polite");

            toast.hidden = true;

            app.appendChild(toast);

        }


        let timer = null;


        app.showPDEVToast = function (
            message,
            type = "info"
        ) {

            window.clearTimeout(timer);


            const icons = {

                success: "bi-check-circle-fill",

                error: "bi-exclamation-circle-fill",

                info: "bi-info-circle-fill"

            };


            const icon = document.createElement("i");

            icon.className =
                "bi " + (icons[type] || icons.info);


            const text = document.createElement("span");

            text.textContent = message;


            toast.replaceChildren(icon, text);

            toast.hidden = false;


            timer = window.setTimeout(() => {

                toast.hidden = true;

            }, 4500);

        };

    }


    /* ========================================================
       08. PROFILE MENU
    ======================================================== */

    function initializeProfile(app) {

        const wrapper = app.querySelector(
            "#pdevProfileWrapper"
        );


        const button = app.querySelector(
            "#pdevProfileButton"
        );


        const menu = app.querySelector(
            "#pdevProfileMenu"
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


        const signOutButton = menu.querySelector(
            "[data-pdev-signout]"
        );


        if (signOutButton) {

            signOutButton.addEventListener("click", () => {

                closeMenu();


                const accepted = window.confirm(
                    "Demonstration only. No real account session " +
                    "will be terminated. Continue?"
                );


                if (accepted) {

                    app.showPDEVToast(
                        "Demonstration sign-out selected. " +
                        "No real account session was ended."
                    );

                }

            });

        }

    }


    /* ========================================================
       09. DATE AND TIME
    ======================================================== */

    function initializeDates(app) {

        updateDates(app);

    }


    function updateDates(app) {

        const now = new Date();


        const date = now.toLocaleDateString(
            "en-PH",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );


        const time = now.toLocaleTimeString(
            "en-PH",
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );


        app.querySelectorAll(
            "[data-pdev-date]"
        ).forEach(element => {

            element.textContent = date;

        });


        app.querySelectorAll(
            "[data-pdev-year]"
        ).forEach(element => {

            element.textContent =
                now.getFullYear();

        });


        app.querySelectorAll(
            "[data-pdev-last-updated]"
        ).forEach(element => {

            element.textContent =
                "Page view loaded: " + time;

        });

    }


    /* ========================================================
       10. GLOBAL PAGE SEARCH
    ======================================================== */

    function initializeGlobalSearch(app) {

        const input = app.querySelector(
            "#pdevGlobalSearch"
        );


        if (!input) {
            return;
        }


        function runSearch() {

            const query = input.value
                .trim()
                .toLowerCase();


            const items = Array.from(
                app.querySelectorAll(
                    "[data-pdev-searchable]"
                )
            );


            let visibleCount = 0;


            items.forEach(item => {

                const content = item.textContent
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


            app.querySelectorAll(
                "[data-pdev-section]"
            ).forEach(section => {

                const children = Array.from(
                    section.querySelectorAll(
                        "[data-pdev-searchable]"
                    )
                );


                if (children.length === 0) {
                    return;
                }


                const hasVisible = children.some(
                    item => !item.hidden
                );


                section.hidden =
                    query !== "" && !hasVisible;

            });


            const emptyState = app.querySelector(
                "[data-pdev-global-empty]"
            );


            if (emptyState) {

                emptyState.hidden =
                    query === "" || visibleCount > 0;

            }

        }


        input.addEventListener(
            "input",
            runSearch
        );


        input.addEventListener(
            "keydown",
            event => {

                if (event.key === "Escape") {

                    input.value = "";

                    runSearch();

                    input.blur();

                }

            }
        );

    }


    /* ========================================================
       11. TABLE SEARCH, FILTERS AND PAGINATION
    ======================================================== */

    function initializeTables(app) {

        const tables = app.querySelectorAll(
            "[data-pdev-table]"
        );


        tables.forEach(table => {

            const key = table.dataset.pdevTable;

            const tbody = table.querySelector("tbody");


            if (!key || !tbody) {
                return;
            }


            if (
                table.dataset.pdevInitialized === "true"
            ) {
                return;
            }


            table.dataset.pdevInitialized = "true";


            const rows = Array.from(
                tbody.querySelectorAll(
                    "tr[data-pdev-row]"
                )
            );


            const searchInput = app.querySelector(
                `[data-pdev-table-search="${key}"]`
            );


            const filters = Array.from(
                app.querySelectorAll(
                    `[data-pdev-filter][data-pdev-target="${key}"]`
                )
            );


            const pageSizeInput = app.querySelector(
                `[data-pdev-page-size="${key}"]`
            );


            const pagination = app.querySelector(
                `[data-pdev-pagination="${key}"]`
            );


            const resultElements = app.querySelectorAll(
                `[data-pdev-result-count="${key}"]`
            );


            const emptyState = app.querySelector(
                `[data-pdev-table-empty="${key}"]`
            );


            const tableWrapper = table.closest(
                "[data-pdev-table-wrapper]"
            );


            let currentPage = 1;


            let pageSize = pageSizeInput
                ? Number(pageSizeInput.value)
                : 5;


            if (
                !Number.isInteger(pageSize) ||
                pageSize < 1
            ) {

                pageSize = 5;

            }


            function getFilteredRows() {

                const query = searchInput
                    ? searchInput.value.trim().toLowerCase()
                    : "";


                return rows.filter(row => {

                    const text = row.textContent
                        .toLowerCase()
                        .replace(/\s+/g, " ")
                        .trim();


                    const matchesSearch =
                        text.includes(query);


                    const matchesFilters = filters.every(
                        filter => {

                            const field =
                                filter.dataset.pdevFilter;


                            const selected =
                                filter.value;


                            if (
                                selected === "all" ||
                                selected === ""
                            ) {

                                return true;

                            }


                            const rowValue = String(
                                row.dataset[field] || ""
                            ).toLowerCase();


                            return rowValue ===
                                selected.toLowerCase();

                        }
                    );


                    return matchesSearch && matchesFilters;

                });

            }


            function renderPagination(totalPages, hasRecords) {

                if (!pagination) {
                    return;
                }


                pagination.replaceChildren();

                pagination.hidden = !hasRecords;


                if (!hasRecords) {
                    return;
                }


                const previous = document.createElement(
                    "button"
                );


                previous.type = "button";

                previous.className = "pdev-page-button";

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


                for (
                    let page = 1;
                    page <= totalPages;
                    page++
                ) {

                    const button = document.createElement(
                        "button"
                    );


                    button.type = "button";

                    button.className =
                        "pdev-page-button" +
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


                const next = document.createElement(
                    "button"
                );


                next.type = "button";

                next.className = "pdev-page-button";

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


            function renderTable() {

                const filteredRows =
                    getFilteredRows();


                const total = filteredRows.length;


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


                rows.forEach(row => {

                    row.hidden = true;

                });


                visibleRows.forEach(row => {

                    row.hidden = false;

                });


                const hasRecords = total > 0;


                if (tableWrapper) {

                    tableWrapper.hidden = !hasRecords;

                }


                if (emptyState) {

                    emptyState.hidden = hasRecords;

                }


                const message = hasRecords
                    ? `Showing ${start + 1} to ${end} of ${total} records`
                    : "No matching records found.";


                resultElements.forEach(element => {

                    element.textContent = message;

                });


                renderPagination(
                    totalPages,
                    hasRecords
                );

            }


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


            filters.forEach(filter => {

                filter.addEventListener(
                    "change",
                    () => {

                        currentPage = 1;

                        renderTable();

                    }
                );

            });


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


            table.resetPDEVFilters = function () {

                if (searchInput) {

                    searchInput.value = "";

                }


                filters.forEach(filter => {

                    filter.value = "all";

                });


                currentPage = 1;

                renderTable();

            };


            renderTable();

        });


        // CLEAR FILTER BUTTONS.

        app.querySelectorAll(
            "[data-pdev-clear-table]"
        ).forEach(button => {

            button.addEventListener("click", () => {

                const key =
                    button.dataset.pdevClearTable;


                const table = app.querySelector(
                    `[data-pdev-table="${key}"]`
                );


                if (
                    table &&
                    typeof table.resetPDEVFilters === "function"
                ) {

                    table.resetPDEVFilters();

                }

            });

        });

    }


    /* ========================================================
       12. DEMONSTRATION FORMS
    ======================================================== */

    function initializeDemoForms(app) {

        const forms = app.querySelectorAll(
            "form[data-pdev-demo-form]"
        );


        forms.forEach(form => {

            if (
                form.dataset.pdevFormInitialized === "true"
            ) {
                return;
            }


            form.dataset.pdevFormInitialized = "true";


            form.addEventListener("submit", event => {

                event.preventDefault();


                if (!form.reportValidity()) {
                    return;
                }


                const message =
                    form.dataset.pdevSuccessMessage ||
                    "Demonstration request prepared locally. " +
                    "No Backend record was created.";


                const result = form.querySelector(
                    "[data-pdev-form-result]"
                );


                if (result) {

                    result.textContent = message;

                    result.hidden = false;

                }


                app.showPDEVToast(
                    message,
                    "success"
                );


                if (
                    form.hasAttribute(
                        "data-pdev-reset-on-success"
                    )
                ) {

                    form.reset();

                }

            });


            form.addEventListener("reset", () => {

                window.setTimeout(() => {

                    const result = form.querySelector(
                        "[data-pdev-form-result]"
                    );


                    if (result) {

                        result.hidden = true;

                        result.textContent = "";

                    }

                }, 0);

            });

        });

    }


    /* ========================================================
       13. DEMONSTRATION ACTIONS
    ======================================================== */

    function initializeDemoActions(app) {

        const messages = {

            review:
                "Technical review prepared locally.",

            submit:
                "Demonstration submission prepared locally. " +
                "No Backend record was created.",

            request:
                "Access or authorization request prepared locally.",

            validate:
                "Demonstration validation completed locally.",

            release:
                "Release candidate prepared locally. " +
                "No production release was authorized.",

            deploy:
                "Deployment action is demonstration-only. " +
                "No actual deployment occurred.",

            rollback:
                "Rollback request prepared locally. " +
                "No actual rollback was executed.",

            investigate:
                "Technical investigation note prepared locally.",

            acknowledge:
                "Acknowledgment prepared locally.",

            export:
                "Export is not connected to an approved data source.",

            close:
                "Demonstration closure review prepared locally."

        };


        app.addEventListener("click", event => {

            const target =
                event.target instanceof Element
                    ? event.target
                    : null;


            if (!target) {
                return;
            }


            const button = target.closest(
                "[data-pdev-action]"
            );


            if (
                !button ||
                !app.contains(button)
            ) {
                return;
            }


            const action =
                button.dataset.pdevAction;


            const confirmation =
                button.dataset.pdevConfirm;


            if (confirmation) {

                const accepted = window.confirm(
                    confirmation +
                    "\n\nDemonstration only. " +
                    "No real system record will change."
                );


                if (!accepted) {
                    return;
                }

            }


            const message =
                button.dataset.pdevMessage ||
                messages[action] ||
                "Demonstration action completed locally.";


            app.showPDEVToast(message);

        });

    }


    /* ========================================================
       14. NOTIFICATION READ STATE
    ======================================================== */

    function initializeNotifications(app) {

        const items = Array.from(
            app.querySelectorAll(
                "[data-pdev-notification]"
            )
        );


        if (items.length === 0) {
            return;
        }


        const storageKey =
            "gabayaral_pdev_read_notifications";


        function getReadIds() {

            try {

                const stored =
                    sessionStorage.getItem(storageKey);


                const parsed = stored
                    ? JSON.parse(stored)
                    : [];


                return Array.isArray(parsed)
                    ? parsed
                    : [];

            } catch (error) {

                return [];

            }

        }


        function saveReadIds(ids) {

            try {

                sessionStorage.setItem(
                    storageKey,
                    JSON.stringify(ids)
                );

            } catch (error) {

                // The current page still updates without storage.

            }

        }


        const readIds = new Set(
            getReadIds()
        );


        function updateUnreadCount() {

            const unread = items.filter(item => {

                return item.dataset.read !== "true";

            }).length;


            const badge = app.querySelector(
                "#pdevUnreadBadge"
            );


            if (badge) {

                badge.textContent =
                    unread + " Unread";

                badge.hidden = unread === 0;

            }


            const dot = app.querySelector(
                "[data-pdev-notification-dot]"
            );


            if (dot) {

                dot.hidden = unread === 0;

            }

        }


        function markAsRead(item) {

            const id =
                item.dataset.notificationId;


            if (!id || item.dataset.read === "true") {
                return;
            }


            item.dataset.read = "true";

            readIds.add(id);

            saveReadIds(Array.from(readIds));


            const button = item.querySelector(
                "[data-pdev-mark-read]"
            );


            if (button) {

                const badge = document.createElement(
                    "span"
                );

                badge.className =
                    "pdev-badge pdev-badge-neutral";

                badge.textContent = "Read";

                button.replaceWith(badge);

            }


            updateUnreadCount();


            app.showPDEVToast(
                "Sample notification marked as read. " +
                "The state is stored for this browser tab session.",
                "success"
            );

        }


        items.forEach(item => {

            const id =
                item.dataset.notificationId;


            if (id && readIds.has(id)) {

                item.dataset.read = "true";


                const button = item.querySelector(
                    "[data-pdev-mark-read]"
                );


                if (button) {

                    const badge = document.createElement(
                        "span"
                    );

                    badge.className =
                        "pdev-badge pdev-badge-neutral";

                    badge.textContent = "Read";

                    button.replaceWith(badge);

                }

            }


            const button = item.querySelector(
                "[data-pdev-mark-read]"
            );


            if (button) {

                button.addEventListener("click", () => {

                    markAsRead(item);

                });

            }

        });


        updateUnreadCount();

    }


 
/* ========================================================
   15. TECHNICAL ISSUE MODAL
======================================================== */

function initializeIssueModal(app) {

    const modal = app.querySelector(
        "#pdevIssueModal"
    );

    if (!modal) {
        return;
    }


    const fields = {

        id: modal.querySelector("#pdevIssueId"),

        title: modal.querySelector("#pdevIssueTitle"),

        component: modal.querySelector("#pdevIssueComponent"),

        priority: modal.querySelector("#pdevIssuePriority"),

        status: modal.querySelector("#pdevIssueStatus"),

        description: modal.querySelector("#pdevIssueDescription")

    };


    const hiddenId = modal.querySelector(
        "#pdevIssueReference"
    );


    app.addEventListener("click", event => {

        const target =
            event.target instanceof Element
                ? event.target
                : null;


        if (!target) {
            return;
        }


        const button = target.closest(
            "[data-pdev-open-issue]"
        );


        if (
            !button ||
            !app.contains(button)
        ) {
            return;
        }


        const values = {

            id: button.dataset.issueId,

            title: button.dataset.issueTitle,

            component: button.dataset.issueComponent,

            priority: button.dataset.issuePriority,

            status: button.dataset.issueStatus,

            description: button.dataset.issueDescription

        };


        const form = modal.querySelector(
            "#pdevIssueReviewForm"
        );


        // Reset the previous review before assigning the new ID.

        if (form) {
            form.reset();
        }


        Object.entries(fields).forEach(([key, field]) => {

            if (field) {

                field.textContent =
                    values[key] || "Not available";

            }

        });


        // Assign the selected reference after resetting.

        if (hiddenId) {

            hiddenId.value =
                values.id || "";

        }


        if (
            !window.bootstrap ||
            !window.bootstrap.Modal
        ) {

            app.showPDEVToast(
                "Issue review modal is unavailable. " +
                "Check the Bootstrap JavaScript reference.",
                "error"
            );

            return;

        }


        window.bootstrap.Modal
            .getOrCreateInstance(modal)
            .show();

    });


    modal.addEventListener(
        "hidden.bs.modal",
        () => {

            const form = modal.querySelector(
                "#pdevIssueReviewForm"
            );


            if (form) {
                form.reset();
            }


            if (hiddenId) {
                hiddenId.value = "";
            }

        }
    );

}



    /* ========================================================
       16. PAGE VIEW REFRESH
    ======================================================== */

    function initializeRefresh(app) {

        const buttons = app.querySelectorAll(
            "[data-pdev-refresh]"
        );


        buttons.forEach(button => {

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

                    updateDates(app);


                    button.disabled = false;


                    if (icon) {

                        icon.classList.remove(
                            "bi-arrow-repeat"
                        );

                        icon.classList.add(
                            "bi-arrow-clockwise"
                        );

                    }


                    app.showPDEVToast(
                        "Page view refreshed locally. " +
                        "No live Backend data was requested.",
                        "success"
                    );

                }, 300);

            });

        });

    }


    /* ========================================================
       17. START APPLICATION
    ======================================================== */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initializePlatformDeveloper,
            { once: true }
        );

    } else {

        initializePlatformDeveloper();

    }


})();
