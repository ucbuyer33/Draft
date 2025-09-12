// Wait for page to load completely
document.addEventListener('DOMContentLoaded', function() {
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on menu items
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (name === '' || email === '' || message === '') {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Success message (since this is client-side only)
        showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
    
    // Function to show form messages
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        
        // Hide message after 5 seconds
        setTimeout(function() {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    }
});

// Function for CTA button smooth scroll
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    }
}
