// Smooth scroll animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
}

// Form validation and submission
function handleFormSubmission() {
    const form = document.getElementById('appointmentForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            department: document.getElementById('department').value,
            date: document.getElementById('date').value,
            message: document.getElementById('message').value
        };

        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.email || 
            !formData.phone || !formData.department || !formData.date) {
            alert('Please fill in all required fields.');
            return;
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        // Phone validation (basic)
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            alert('Please enter a valid phone number.');
            return;
        }
        // Date validation (not in the past)
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            alert('Please select a future date for your appointment.');
            return;
        }
        // Success message
        alert(`Thank you, ${formData.firstName}! Your appointment request has been submitted. We will contact you soon to confirm your appointment for ${formData.department} on ${formData.date}.`);
        // Reset form
        form.reset();
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Set minimum date for appointment booking
function setMinimumDate() {
    const dateInput = document.getElementById('date');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    dateInput.setAttribute('min', minDate);
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
    window.addEventListener('scroll', function() {
        animateOnScroll();
        handleNavbarScroll();
    });
    handleFormSubmission();
    initSmoothScrolling();
    setMinimumDate();
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
});

// Add loading animation for better UX
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});
