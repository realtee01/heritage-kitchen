/**
 * Heritage Kitchen - index.js
 * Professional Front-end Logic for Tobiloba's Portfolio
 */

const RESPONSIVE_WIDTH = 1024;
gsap.registerPlugin(ScrollTrigger);

// --- 1. HEADER & NAVIGATION LOGIC ---
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH;
const mainHeader = document.getElementById("main-header");
const collapseHeaderItems = document.getElementById("collapsed-items");
const collapseBtn = document.getElementById("collapse-btn");

// Sticky Header Effect: Change background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainHeader.classList.add('tw-bg-black', 'tw-shadow-xl', 'tw-py-2');
        mainHeader.classList.remove('tw-py-4');
    } else {
        mainHeader.classList.remove('tw-bg-black', 'tw-shadow-xl', 'tw-py-2');
        mainHeader.classList.add('tw-py-4');
    }
});

// Mobile Toggle Navigation
function toggleHeader() {
    if (isHeaderCollapsed) {
        collapseHeaderItems.classList.add("!tw-opacity-100");
        collapseHeaderItems.style.width = "70vw";
        collapseBtn.classList.replace("bi-list", "bi-x");
        isHeaderCollapsed = false;
    } else {
        collapseHeaderItems.classList.remove("!tw-opacity-100");
        collapseHeaderItems.style.width = "0vw";
        collapseBtn.classList.replace("bi-x", "bi-list");
        isHeaderCollapsed = true;
    }
}

// --- 2. GSAP REVEAL ANIMATIONS ---
// Hero Text Fade-in
gsap.from(".hero-content", {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power4.out"
});

// Section Titles Reveal
gsap.utils.toArray(".khula-font").forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 90%",
        },
        opacity: 0,
        x: -30,
        duration: 0.8
    });
});

// --- 3. MENU & INTERACTIVE LOGIC ---
const menuItemContainer = document.querySelectorAll(".menu-item-container");
menuItemContainer.forEach(container => {
    const img = container.querySelector("img");
    container.addEventListener("mouseenter", () => {
        gsap.to(img, { scale: 1.1, duration: 0.4 });
    });
    container.addEventListener("mouseleave", () => {
        gsap.to(img, { scale: 1, duration: 0.4 });
    });
});

// --- 4. RESERVATION & FEEDBACK LOGIC ---
// Set minimum date for booking to Today
const bookingDate = document.querySelector("#date");
if (bookingDate) {
    bookingDate.setAttribute('min', new Date().toISOString().split('T')[0]);
}

// Populate Timings (10:00 AM to 10:00 PM)
const timings = document.querySelector("#timings");
if (timings) {
    for (let h = 10; h <= 22; h++) {
        const timeStr = `${h}:00`;
        timings.innerHTML += `<option value="${timeStr}">${timeStr}</option>`;
        if (h !== 22) timings.innerHTML += `<option value="${h}:30">${h}:30</option>`;
    }
}

// Heritage Kitchen Themed Review System
function handleStarClicked(event) {
    const rating = event.currentTarget.getAttribute('data-value');
    
    if (rating < 4) {
        reviewModal.updateModal(
            "We value your feedback", 
            "How can we improve our traditional spices or service for your next visit?"
        );
        reviewModal.showModalInput();
        reviewModal.updateButton("Submit Feedback");
    } else {
        reviewModal.updateModal(
            "E dupe! (Thank you)", 
            "We're thrilled you enjoyed the Heritage flavor! Please share your experience on Google Maps."
        );
        reviewModal.hideModalInput();
        reviewModal.updateButton("Rate us on Maps", "https://maps.google.com");
    }
    reviewModal.show();
}

// --- 5. INITIALIZATION ---
window.addEventListener("resize", () => {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        if (collapseHeaderItems) collapseHeaderItems.style.width = "";
    }
});
