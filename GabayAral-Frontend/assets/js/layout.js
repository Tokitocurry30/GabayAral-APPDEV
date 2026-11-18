
/* ==========================================
   GABAYARAL - SHARED LAYOUT INTERACTIONS
   ========================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("sidebar");
    const backdrop = document.getElementById("sidebarBackdrop");
    const menuToggle = document.getElementById("menuToggle");

    if (!sidebar || !backdrop || !menuToggle) {
        return;
    }

    function openSidebar() {
        sidebar.classList.add("open");
        backdrop.classList.add("show");
        menuToggle.setAttribute("aria-expanded", "true");
    }

    function closeSidebar() {
        sidebar.classList.remove("open");
        backdrop.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = sidebar.classList.contains("open");

        if (isOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    backdrop.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSidebar();
        }
    });

    const navigationLinks = sidebar.querySelectorAll(".side-link");

    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navigationLinks.forEach((item) => {
                item.classList.remove("active");
                item.removeAttribute("aria-current");
            });

            link.classList.add("active");
            link.setAttribute("aria-current", "page");

            closeSidebar();

        });

    });

    console.log("GabayAral shared layout initialized.");

});
