
/* ==========================================
   GABAYARAL - LANDING PAGE INTERACTIONS
   ========================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    initializeLandingPage();

});

function initializeLandingPage() {

    // Close the mobile navigation after selecting a link.
    const navigationLinks = document.querySelectorAll(
        ".landing-navbar .nav-link"
    );

    const navbarCollapse = document.getElementById(
        "landingNavbar"
    );

    if (navbarCollapse && window.bootstrap) {

        const collapseInstance = bootstrap.Collapse.getOrCreateInstance(
            navbarCollapse,
            { toggle: false }
        );

        navigationLinks.forEach((link) => {

            link.addEventListener("click", () => {

                if (window.innerWidth < 992) {
                    collapseInstance.hide();
                }

            });

        });

    }

    // Update footer year automatically.
    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    console.log("GabayAral Landing Page initialized.");

}
