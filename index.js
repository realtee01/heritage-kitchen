const RESPONSIVE_WIDTH = 1024;
gsap.registerPlugin(ScrollTrigger);

let headerWhiteBg = false;
let isHeaderCollapsed = window.innerWidth < 1024;
const collapseHeaderItems = document.getElementById("collapsed-items");
const collapseBtn = document.getElementById("collapse-btn");
const expandingBg = document.getElementById("expanding-header-bg");

// Header scroll animation
gsap.to(expandingBg, {
    height: "100%",
    duration: 3,
    scrollTrigger: {
        trigger: "#hero-section",
        start: "50px 10px",
        end: "80px 50px",
        scrub: 1,
    }
});

// Menu item hover effect
const menuItemContainer = document.querySelectorAll(".menu-item-container");
menuItemContainer.forEach(e => {
    const img = e.querySelector("img");
    e.addEventListener("mouseenter", () => { img.style.scale = 1.1; });
    e.addEventListener("mouseleave", () => { img.style.scale = 1; });
});

// Booking logic
const bookingDate = document.querySelector("#date");
if(bookingDate) {
    const today = new Date().toISOString().split('T')[0];
    bookingDate.setAttribute('min', today);
}

const timings = document.querySelector("#timings");
if(timings) {
    for (let x=10; x < 22; x+=0.5){
        const nextTime = `${Math.floor(x)}:${x % 1 === 0 ? "00" : "30"}`;
        timings.innerHTML += `<option value="${nextTime}">${nextTime}</option>`;
    }
}

// Heritage Kitchen feedback
function handleStarClicked(event){
    const rating = event.currentTarget.getAttribute('data-value');
    if (rating < 4){
        reviewModal.updateModal("We value your feedback", "How can we improve our traditional dishes for you?");
        reviewModal.showModalInput();
        reviewModal.updateButton("Submit");
    } else {
        reviewModal.updateModal("E dupe! (Thank you)", "We are glad you enjoyed the Heritage experience!");
        reviewModal.hideModalInput();
        reviewModal.updateButton("Open Maps", "https://maps.google.com");
    }
    reviewModal.show();
}

function toggleHeader() {
    if (isHeaderCollapsed) {
        collapseHeaderItems.classList.add("!tw-opacity-100");
        collapseHeaderItems.style.width = "60vw";
        collapseBtn.classList.remove("bi-list");
        collapseBtn.classList.add("bi-x");
        isHeaderCollapsed = false;
    } else {
        collapseHeaderItems.classList.remove("!tw-opacity-100");
        collapseHeaderItems.style.width = "0vw";
        collapseBtn.classList.remove("bi-x");
        collapseBtn.classList.add("bi-list");
        isHeaderCollapsed = true;
    }
}
