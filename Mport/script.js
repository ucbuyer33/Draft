<<<<<<< HEAD

    (function() {
      var menuButton = document.getElementById('menuButton');
      var navbar = document.getElementById('navbar');
      var navLinks = document.querySelectorAll('#navbar a, .desktop a');
      var fadeEls = document.querySelectorAll('.fade-in');
      var sections = document.querySelectorAll('section[id]');

      if (menuButton) {
        menuButton.addEventListener('click', function() {
          menuButton.classList.toggle('active');
          if (navbar) navbar.classList.toggle('active');
        });
      }

      navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          if (menuButton) menuButton.classList.remove('active');
          if (navbar) navbar.classList.remove('active');
        });
      });

      document.addEventListener('click', function(e) {
        if (!navbar) return;
        if (!navbar.classList.contains('active')) return;
        var clickedInsideMenu = navbar.contains(e.target);
        var clickedMenuButton = menuButton && menuButton.contains(e.target);
        if (!clickedInsideMenu && !clickedMenuButton) {
          if (menuButton) menuButton.classList.remove('active');
          navbar.classList.remove('active');
        }
      });

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          if (menuButton) menuButton.classList.remove('active');
          if (navbar) navbar.classList.remove('active');
        }
      });

      var internalLinks = document.querySelectorAll('a[href^="#"]');
      internalLinks.forEach(function(a) {
        a.addEventListener('click', function(e) {
          var href = this.getAttribute('href');
          if (href && href.startsWith('#') && href.length > 1) {
            var target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      });

      function checkFadeIn() {
        var windowHeight = window.innerHeight;
        fadeEls.forEach(function(el) {
          var rect = el.getBoundingClientRect();
          if (rect.top < windowHeight - 100) {
            el.classList.add('visible');
          }
        });
      }
      window.addEventListener('scroll', checkFadeIn);
      window.addEventListener('load', checkFadeIn);

      function onScrollSpy() {
        var middle = window.innerHeight / 2;
        var currentId = null;
        sections.forEach(function(section) {
          var rect = section.getBoundingClientRect();
          if (rect.top <= middle && rect.bottom >= middle) {
            currentId = section.getAttribute('id');
          }
        });

        if (currentId) {
          navLinks.forEach(function(link) {
            link.classList.remove('active');
            var href = link.getAttribute('href');
            if (href === ('#' + currentId)) {
              link.classList.add('active');
            }
          });
        }
      }
      window.addEventListener('scroll', onScrollSpy);
      window.addEventListener('load', onScrollSpy);
    })();
 
=======
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

// Smooth scrolling with block 'start'
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const navLinks = document.querySelectorAll('nav ul li a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const id = entry.target.getAttribute('id');
      const activeLink = document.querySelector(`nav ul li a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, {
  rootMargin: '-80px 0px 0px 0px', // Adjust for fixed header height (80px)
  threshold: 0.5 // Trigger when 50% of section visible
});

document.querySelectorAll('section').forEach(section => observer.observe(section));



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

// ========================
// Fade-In on Scroll
// ========================
const fadeSections = document.querySelectorAll('.fade-in');
// Fallback: if IntersectionObserver not supported
if (!('IntersectionObserver' in window)) {
  fadeSections.forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // Animate only once
      }
    });
  }, {
    threshold: 0.15,           // fire when 15% is visible
    rootMargin: '0px 0px -10% 0px'
  });

  fadeSections.forEach(el => observer.observe(el));
}
>>>>>>> b679618800d796671651b43f5d4333d7d50ce461
