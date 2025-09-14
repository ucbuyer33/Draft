// Set current year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile navigation
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', function() {
  navMenu.classList.toggle('open');
});

// Close mobile menu when clicking a link
const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navMenu.classList.remove('open');
  });
});

// Active navigation highlighting
const sections = document.querySelectorAll('main section[id]');

function updateActiveNav() {
  const scrollPosition = window.scrollY + 100;
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.id;
    }
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Simple form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();
  const messageDiv = document.getElementById('form-message');

  if (!name || !email || !message) {
    messageDiv.textContent = 'Please fill in all fields.';
    messageDiv.className = 'form-message error';
    return;
  }

  if (!email.includes('@')) {
    messageDiv.textContent = 'Please enter a valid email address.';
    messageDiv.className = 'form-message error';
    return;
  }

  messageDiv.textContent = 'Thank you! Your message has been sent.';
  messageDiv.className = 'form-message success';
  this.reset();

  setTimeout(() => {
    messageDiv.textContent = '';
    messageDiv.className = 'form-message';
  }, 5000);
});
