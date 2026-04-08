/** * Heritage Kitchen - Professional Portfolio Script
 * Developer: Tobiloba (UNILAG Computer Science)
 */

const RESPONSIVE_WIDTH = 1024;
gsap.registerPlugin(ScrollTrigger);

// 1. STICKY HEADER TRANSITION
// This prevents the "white bar" look and makes it feel modern
window.addEventListener('scroll', () => {
    const header = document.getElementById("main-header");
    if (window.scrollY > 100) {
        header.classList.add('tw-bg-black/90', 'tw-backdrop-blur-md', 'tw-py-2', 'tw-shadow-2xl');
        header.classList.remove('tw-py-4');
    } else {
        header.classList.remove('tw-bg-black/90', 'tw-backdrop-blur-md', 'tw-py-2', 'tw-shadow-2xl');
        header.classList.add('tw-py-4');
    }
});

// 2. MOBILE NAVIGATION TOGGLE
let isNavOpen = false;
function toggleHeader() {
    const menu = document.getElementById("collapsed-items");
    const btn = document.getElementById("collapse-btn");
    
    if (!isNavOpen) {
        menu.classList.add("!tw-opacity-100", "tw-translate-x-0");
        menu.style.width = "75vw";
        btn.classList.replace("bi-list", "bi-x");
        isNavOpen = true;
    } else {
        menu.classList.remove("!tw-opacity-100", "tw-translate-x-0");
        menu.style.width = "0";
        btn.classList.replace("bi-x", "bi-list");
        isNavOpen = false;
    }
}

// 3. ENHANCED HOVER EFFECTS FOR MENU ITEMS
document.querySelectorAll(".tw-bg-white").forEach(card => {
    const img = card.querySelector("img");
    card.addEventListener("mouseenter", () => {
        gsap.to(img, { scale: 1.1, duration: 0.5, ease: "power2.out" });
    });
    card.addEventListener("mouseleave", () => {
        gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.inOut" });
    });
});

// 4. DATE PICKER & TIME SETTINGS
const dateInput = document.querySelector("#date");
if (dateInput) {
    dateInput.valueAsDate = new Date();
    dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
}

// 5. HERITAGE FEEDBACK LOGIC
function handleStarClicked(e) {
    const val = e.currentTarget.getAttribute('data-value');
    if (val >= 4) {
        reviewModal.updateModal("E dupe! (Thank you)", "We're glad you loved the Heritage experience. Rate us on Google Maps?");
        reviewModal.updateButton("Rate on Maps", "https://maps.google.com");
    } else {
        reviewModal.updateModal("Help us improve", "Was it the spice level? Let us know how we can make your next Heritage meal better.");
        reviewModal.showModalInput();
    }
    reviewModal.show();
}

// --- INITIALIZE GSAP REVEALS ---
gsap.from(".hero-text", { opacity: 0, y: 30, duration: 1, delay: 0.5 });
