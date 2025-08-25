// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initAnimationObserver();
    initScrollEffects();
    initInteractiveElements();
    initHeroAnimations();
});

// Modern Mobile Navigation with Enhanced Animations
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    let isAnimating = false;

    function openMenu() {
        if (isAnimating) return;
        isAnimating = true;
        
        hamburger.classList.add('active');
        navMenu.classList.remove('mobile-closing');
        navMenu.classList.add('mobile-active');
        body.style.overflow = 'hidden';
        
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    function closeMenu() {
        if (isAnimating) return;
        isAnimating = true;
        
        hamburger.classList.remove('active');
        navMenu.classList.add('mobile-closing');
        
        setTimeout(() => {
            navMenu.classList.remove('mobile-active', 'mobile-closing');
            body.style.overflow = '';
            isAnimating = false;
        }, 500);
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (navMenu.classList.contains('mobile-active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('mobile-active')) {
                    closeMenu();
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('mobile-active')) {
                    closeMenu();
                }
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('mobile-active')) {
                closeMenu();
            }
        });
    }
}

// Enhanced Hero Animations
function initHeroAnimations() {
    const animatedElements = document.querySelectorAll('.animated-text');
    
    // Initialize all animated elements with animate-in class
    animatedElements.forEach(element => {
        element.classList.add('animate-in');
    });
    
    // Trigger animations after a brief delay
    setTimeout(() => {
        animatedElements.forEach(element => {
            element.classList.remove('animate-in');
        });
    }, 100);

    // Add interactive hover effects
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Handle "Work With Us" button and other internal links
    const workWithUsBtn = document.querySelector('.work-with-us-btn');
    const meetingBtns = document.querySelectorAll('.meeting-btn');
    const learnMoreBtn = document.querySelector('.cta-secondary');
    const startJourneyBtn = document.querySelector('.cta-primary');
    const whatsappBtns = document.querySelectorAll('.whatsapp-btn');

    // Work With Us button scroll to success CTA section
    if (workWithUsBtn) {
        workWithUsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#whatsapp-contact');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Start Your Journey button scroll to whatsapp-contact section
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#whatsapp-contact');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // WhatsApp buttons (Message Now) scroll to whatsapp-contact section
    whatsappBtns.forEach(btn => {
        // Only add scroll functionality to buttons that link to whatsapp-contact, not external WhatsApp links
        if (btn.getAttribute('href') && btn.getAttribute('href').includes('#whatsapp-contact')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = document.querySelector('#whatsapp-contact');
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });

    // Meeting buttons (Schedule Meet) scroll to whatsapp-contact section
    meetingBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#whatsapp-contact');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Learn More button scroll to features
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('.features');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Handle all anchor links with smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const targetId = href.replace('#', '');
                const targetElement = document.getElementById(targetId) || document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Enhanced Animation Observer
function initAnimationObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for feature cards
                if (entry.target.classList.contains('feature-card')) {
                    const cards = entry.target.parentElement.querySelectorAll('.feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animationDelay = `${index * 0.1}s`;
                            card.classList.add('slide-up');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.feature-card, .option-card, .section-header');
    animatableElements.forEach(el => observer.observe(el));
}

// Enhanced Scroll Effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (scrollY > lastScrollY && scrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
}

// Enhanced Interactive Elements
function initInteractiveElements() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary, .whatsapp-btn, .meeting-btn, .whatsapp-cta-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.feature-card, .option-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(0, 212, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Parallax effect for hero background
    const heroBackground = document.querySelector('.bg-animation');
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
        }, { passive: true });
    }

    // Add loading states for WhatsApp buttons
    const whatsappButtons = document.querySelectorAll('[href*="wa.me"], [href*="whatsapp.com"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fab fa-whatsapp"></i> Opening WhatsApp...';
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.opacity = '1';
            }, 2000);
        });
    });
}

// Utility Functions
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

// Add CSS for animations and effects
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .navbar.scrolled {
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(20px);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .slide-up {
            animation: slideUpFade 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .ripple {
                animation: none;
            }
            
            .slide-up {
                animation: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// Performance optimizations
window.addEventListener('scroll', debounce(function() {
    // Scroll-based optimizations
}, 10), { passive: true });

window.addEventListener('resize', debounce(function() {
    // Recalculate dimensions on resize
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && window.innerWidth < 768) {
        heroContent.style.minHeight = `${window.innerHeight - 72}px`;
    }
}, 250));

// Preload critical images
function preloadImages() {
    const images = ['portrait.jpg', 'hero-bg.jpg'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// Enhanced accessibility
window.addEventListener('load', function() {
    // Focus management for mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-controls', 'nav-menu');
        navMenu.setAttribute('id', 'nav-menu');
        
        hamburger.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }
});

// Security enhancements
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Focus trap for mobile menu
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const modal = document.querySelector('.nav-menu');

if (modal) {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && modal.classList.contains('mobile-active')) {
            const focusableContent = modal.querySelectorAll(focusableElements);
            const firstFocusableElement = focusableContent[0];
            const lastFocusableElement = focusableContent[focusableContent.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}