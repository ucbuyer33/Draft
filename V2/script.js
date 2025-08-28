// ========================
// Get elements
// ========================
const menuToggle = document.querySelector("#menu-toggle");
const navbar = document.querySelector("#navbar");
const hamburger = document.querySelector(".hamburger");

// ========================
// Hamburger Menu Toggle
// ========================
if (menuToggle && navbar && hamburger) {
  menuToggle.addEventListener("change", () => {
    // Toggle menu visible class when checkbox changes
    navbar.classList.toggle("active");
  });

  // Close menu when a nav link is clicked
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
      // uncheck the checkbox so visual state matches
      menuToggle.checked = false;
    });
  });
}

// ========================
// Smooth Scrolling (safe)
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href") || "";
    // ignore plain "#" and empty hrefs
    if (href === "#" || href === "") return;

    // try to find the target element
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// highlight nav + fade-in
window.addEventListener("scroll", () => {
  const fromTop = window.scrollY + 80; // account for fixed header

  document.querySelectorAll("section[id]").forEach(section => {
    const id = section.getAttribute("id");
    const link = document.querySelector(`nav a[href="#${id}"]`);
    if (!link) return;

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  document.querySelectorAll(".fade-in").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});


// Run once on load so items near top become visible immediately
document.addEventListener("DOMContentLoaded", () => {
  // trigger one scroll handler run
  window.dispatchEvent(new Event('scroll'));
});
