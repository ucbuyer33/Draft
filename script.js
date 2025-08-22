// Hamburger menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
menuToggle.addEventListener("change", () => {
  const expanded = menuToggle.checked;
  navbar.classList.toggle("active", expanded);
  document.querySelector(".hamburger").setAttribute("aria-expanded", String(expanded));
  navbar.setAttribute("aria-hidden", String(!expanded));
});
// Close menu when clicking a link
document.querySelectorAll("nav ul li a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    menuToggle.checked = false; // reset hamburger animation
  });
});
// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});
// Scroll Spy
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));
      const id = entry.target.getAttribute("id");
      const activeLink = document.querySelector(`nav ul li a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }});
},{ threshold: 0.2, rootMargin: "-25% 0px -40% 0px"});
sections.forEach(section => observer.observe(section));
// Skills animation (pop-in scaling)
window.addEventListener('scroll', () => {
  const skillsSection = document.querySelector('.skills');
  const skillItems = document.querySelectorAll('.skill-card');
  const sectionTop = skillsSection.offsetTop;
  const windowHeight = window.innerHeight;
  const scrollTop = window.pageYOffset;
  if (scrollTop > (sectionTop - windowHeight + 100)) {
    skillItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.transform = 'scale(1.05)';
        item.style.transition = 'transform 0.3s ease';
      }, index * 100);
    });
  }
});
/* ==========================================================
   FADE-IN ANIMATIONS (Reusable)
   ========================================================== */
const fadeElements = document.querySelectorAll(
  ".fade-in, .section-title, .skill-card, .project-card, .contact-item"
);
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      fadeObserver.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.2 });
fadeElements.forEach(el => fadeObserver.observe(el));
