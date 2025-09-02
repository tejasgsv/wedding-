// Wedding date
const weddingDate = new Date('November 30, 2025 10:00:00').getTime();

// Countdown function
function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    // Update home countdown
    document.getElementById('homeDays').textContent = days;
    document.getElementById('homeHours').textContent = hours;
    document.getElementById('homeMinutes').textContent = minutes;
}

// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Update active navigation link
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Navigation click handlers
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Lightbox functionality
let currentImageIndex = 0;
const images = [
    'IMAGE/a (1).jpg', 'IMAGE/a (2).jpg', 'IMAGE/a (3).jpg', 'IMAGE/a (4).jpg', 'IMAGE/a (5).jpg',
    'IMAGE/a (6).jpg', 'IMAGE/a (7).jpg', 'IMAGE/a (9).jpg', 'IMAGE/a (10).jpg', 'IMAGE/a (11).jpg',
    'IMAGE/a (12).jpg', 'IMAGE/a (13).jpg', 'IMAGE/a (16).jpg', 'IMAGE/a (19).jpg', 'IMAGE/a (20).jpg',
    'IMAGE/a (21).jpg', 'IMAGE/a (23).jpg', 'IMAGE/a (25).jpg', 'IMAGE/a (26).jpg', 'IMAGE/a (27).jpg',
    'IMAGE/a (28).jpg', 'IMAGE/a (32).jpg'
];

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = images[index];
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.getElementById('lightbox-img').src = images[currentImageIndex];
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    document.getElementById('lightbox-img').src = images[currentImageIndex];
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

// Close lightbox when clicking outside image
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.photo-item, .event-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }
    });
}

// Initialize animations
function initAnimations() {
    const elements = document.querySelectorAll('.photo-item, .event-card');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(60px) scale(0.9)';
        element.style.transition = `all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;
    });
    
    // Add entrance animation to wedding invitation
    const invitation = document.querySelector('.wedding-invitation');
    if (invitation) {
        invitation.style.opacity = '0';
        invitation.style.transform = 'scale(0.8) translateY(30px)';
        invitation.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        setTimeout(() => {
            invitation.style.opacity = '1';
            invitation.style.transform = 'scale(1) translateY(0)';
        }, 500);
    }
}

// Event listeners
window.addEventListener('scroll', () => {
    updateActiveNav();
    animateOnScroll();
});

window.addEventListener('load', () => {
    initAnimations();
    animateOnScroll();
    updateCountdown();
});

// Update countdown every second
setInterval(updateCountdown, 1000);