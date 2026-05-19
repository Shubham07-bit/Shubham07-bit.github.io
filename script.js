// ===== Mobile Navigation =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function closeMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

hamburger?.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navbar = document.getElementById('navbar');

function updateActiveLink() {
    const scrollY = window.scrollY;
    
    // Navbar background enhancement on scroll
    if (scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    // Active link highlighting
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Scroll Reveal Animation =====
function revealOnScroll() {
    const reveals = document.querySelectorAll('.skill-card, .timeline-item, .project-card, .achievement-card, .contact-card');
    
    reveals.forEach((element, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            // Add staggered delay based on index within parent
            setTimeout(() => {
                element.classList.add('revealed');
            }, (index % 4) * 100);
        }
    });
}

// Add reveal styles dynamically
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .skill-card, .timeline-item, .project-card, .achievement-card, .contact-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .skill-card.revealed, .timeline-item.revealed, .project-card.revealed, 
    .achievement-card.revealed, .contact-card.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyle);

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Typing Effect for Hero Role (optional enhancement) =====
function initTypingEffect() {
    const roleText = document.querySelector('.hero-role');
    if (!roleText) return;
    
    const roles = ['Robotics Software Engineer', 'Autonomous Systems Specialist'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            roleText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            roleText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Uncomment below to enable typing effect (currently disabled for cleaner look)
    // type();
}

// ===== Performance: Debounce scroll events =====
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

const debouncedScroll = debounce(() => {
    updateActiveLink();
    revealOnScroll();
}, 10);

window.removeEventListener('scroll', updateActiveLink);
window.removeEventListener('scroll', revealOnScroll);
window.addEventListener('scroll', debouncedScroll);

// ===== Preloader (optional) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    revealOnScroll();
});

// ===== Console Easter Egg =====
console.log('%c👋 Hey there, fellow robotics enthusiast!', 'color: #4A90E2; font-size: 16px; font-weight: bold;');
console.log('%cFeel free to explore the code. If you want to collaborate, reach out at shubhamjolapara256@gmail.com', 'color: #94a3b8; font-size: 12px;');
