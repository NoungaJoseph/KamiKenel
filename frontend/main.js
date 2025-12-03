// Kami Kennels Website JavaScript
// Main functionality for interactive elements

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeScrollEffects();
    initializeContactForm();
    initializePuppyGallery();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');

            // Toggle icon between bars and times (X)
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');

            // Reset icon
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');

            // Reset icon
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
}

// Scroll effects and animations
function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');

    // Add/remove navbar background on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Show success message
            showNotification('Thank you for your message! We will contact you soon.', 'success');

            // Reset form
            contactForm.reset();
        });
    }
}

// Puppy gallery functionality
function initializePuppyGallery() {
    const puppyCards = document.querySelectorAll('.puppy-card');

    puppyCards.forEach(card => {
        const adoptBtn = card.querySelector('.adopt-btn');

        if (adoptBtn) {
            adoptBtn.addEventListener('click', function () {
                const puppyName = card.dataset.puppyName;
                showAdoptionModal(puppyName);
            });
        }
    });
}

// Show adoption modal
function showAdoptionModal(puppyName) {
    const modal = document.createElement('div');
    modal.className = 'adoption-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Adopt ${puppyName}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Thank you for your interest in ${puppyName}!</p>
                <p>Please fill out the form below and we'll contact you with more information about the adoption process.</p>
                <form class="adoption-form">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Email Address" required>
                    <input type="tel" placeholder="Phone Number" required>
                    <textarea placeholder="Tell us about your experience with dogs and why you'd be a good home for ${puppyName}" required></textarea>
                    <button type="submit" class="btn btn-primary">Submit Application</button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', function () {
        document.body.removeChild(modal);
    });

    // Handle form submission
    const adoptionForm = modal.querySelector('.adoption-form');
    adoptionForm.addEventListener('submit', function (e) {
        e.preventDefault();
        showNotification('Adoption application submitted successfully!', 'success');
        document.body.removeChild(modal);
    });

    // Close on background click
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Initialize animations
function initializeAnimations() {
    // Counter animation for statistics
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// FAQ accordion functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize FAQ when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    initializeFAQ();
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Function to open booking form
function openBookingForm(puppyName) {
    const modal = document.createElement('div');
    modal.className = 'adoption-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Book ${puppyName} - Kami Kennels</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="text-center mb-6">
                    <div class="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-paw text-3xl text-orange-600"></i>
                    </div>
                    <h4 class="text-2xl font-bold">Book ${puppyName}</h4>
                    <p class="text-gray-600">Complete the booking form below to start the adoption process.</p>
                </div>
                
                <form class="booking-form">
                    <div class="grid md:grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" required>
                        <input type="text" placeholder="Last Name" required>
                        <input type="email" placeholder="Email Address" required>
                        <input type="tel" placeholder="Phone Number" required>
                        <select required>
                            <option value="">Preferred Location</option>
                            <option value="canada">Canada</option>
                            <option value="usa">United States</option>
                            <option value="europe">Europe</option>
                        </select>
                        <select required>
                            <option value="">Experience Level</option>
                            <option value="first-time">First-time owner</option>
                            <option value="some-experience">Some experience</option>
                            <option value="experienced">Experienced</option>
                        </select>
                    </div>
                    <textarea placeholder="Tell us about your experience with dogs and why you'd be a good home for ${puppyName}" required></textarea>
                    <div class="bg-orange-50 p-4 rounded-lg mb-4">
                        <h5 class="font-semibold text-orange-800 mb-2">International Shipping Available</h5>
                        <p class="text-sm text-orange-700">We ship to all US states, Canada, Germany, Croatia, Denmark, and other European countries. Shipping costs will be calculated based on your location.</p>
                    </div>
                    <button type="submit" class="btn btn-primary w-full">Submit Booking Request</button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Handle booking form submission
    const bookingForm = modal.querySelector('.booking-form');
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        showNotification(`Booking request for ${puppyName} submitted successfully! We'll contact you within 24 hours.`, 'success');
        document.body.removeChild(modal);
    });

    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', function () {
        document.body.removeChild(modal);
    });

    // Close on background click
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}