// ==========================
// Get Elements from the Page
// ==========================
const menuToggle = document.querySelector("#menu-toggle"); // the checkbox for mobile menu
const navbar = document.querySelector("#navbar"); // the nav menu itself
const hamburger = document.querySelector(".hamburger"); // the icon that shows the menu

// ==========================
// Toggle the Mobile Menu
// ==========================
if (menuToggle && navbar && hamburger) {
  // When the menu is opened or closed
  menuToggle.addEventListener("change", () => {
    navbar.classList.toggle("active"); // show or hide the nav
  });

  // When any nav link is clicked, close the menu
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active"); // hide the nav
      menuToggle.checked = false; // uncheck the menu toggle
    });
  });
}

// ==========================
// Smooth Scrolling for Links
// ==========================
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    // Ignore if it's just "#" or empty
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault(); // stop the default jump
      target.scrollIntoView({
        behavior: "smooth", // smooth scroll effect
        block: "start"      // scroll so the top of the section is at the top
      });
    }
  });
});

// ==========================
// Highlight Active Section in Nav
// ==========================
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY + 80; // add offset for fixed header

  const sections = document.querySelectorAll("section[id]");
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);

    if (!navLink) return;

    // Check if the section is in view
    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLink.classList.add("active");
    } else {
      navLink.classList.remove("active");
    }
  });

  // ==========================
  // Fade In Elements When Scrolling
  // ==========================
  const fadeElements = document.querySelectorAll(".fade-in");

  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect(); // get element position on screen

    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible"); // show it with fade-in animation
    }
  });
});

// ==========================
// Show Fade-in Elements on Page Load
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  // Trigger the scroll event once so elements near the top appear
  window.dispatchEvent(new Event("scroll"));
});
