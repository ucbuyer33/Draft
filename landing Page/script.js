// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Auto-insert current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');
    
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                nav.classList.remove('active');
            }
        });
    });
    
    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill in all fields.';
            formMessage.style.color = 'red';
            return;
        }
        
        // Simple email pattern check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.style.color = 'red';
            return;
        }
        
        // Success message (client-side only)
        formMessage.textContent = 'Thank you! Your message has been sent successfully.';
        formMessage.style.color = 'green';
        
        // Reset form
        contactForm.reset();
    });
});

// Function to scroll to specific section (used by CTA button)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}
