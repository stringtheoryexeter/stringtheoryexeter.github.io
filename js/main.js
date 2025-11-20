// Smooth scrolling navigation
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active navigation based on scroll position
const sections = document.querySelectorAll('section[id]');

const observerOptions = {
    threshold: 0.3,
    rootMargin: '-20% 0px -20% 0px'
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section link
            const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    navObserver.observe(section);
});

// Fade-in animations for elements
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

document.querySelectorAll('.fade-in').forEach(element => {
    fadeInObserver.observe(element);
});

// Prevent page scroll when scrolling inside stock iframe
const stockSheet = document.querySelector('.stock-sheet');
if (stockSheet) {
    stockSheet.addEventListener('wheel', function(e) {
        e.stopPropagation();
    }, { passive: true });
    
    stockSheet.addEventListener('mouseenter', function() {
        document.body.style.overflow = 'hidden';
    });
    
    stockSheet.addEventListener('mouseleave', function() {
        document.body.style.overflow = 'auto';
    });
}
