// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    initTheme();
    initHeaderScroll();
    initCursorGlow();
    initMobileMenu();
    initScrollSpy();
    initTiltCard();
    initProjectFilter();
    initContactForm();
});

/* ==========================================================================
   Theme Switcher (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    }
    
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });
}

/* ==========================================================================
   Header Scroll State
   ========================================================================== */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load
}

/* ==========================================================================
   Ambient Mouse Cursor Glow
   ========================================================================== */
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;
    
    // Check if device supports hover/mouse interactions
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        glow.style.display = 'none';
        return;
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    const speed = 0.1; // Easing speed
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
    
    // Animation loop for smooth trailing effect
    function animate() {
        const dx = mouseX - glowX;
        const dy = mouseY - glowY;
        
        glowX += dx * speed;
        glowY += dy * speed;
        
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;
        
        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================================================
   Mobile Nav Menu
   ========================================================================== */
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const openIcon = toggleBtn.querySelector('.open-icon');
    const closeIcon = toggleBtn.querySelector('.close-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');
    
    const toggleMenu = () => {
        const isOpen = mobileNav.classList.toggle('open');
        
        if (isOpen) {
            openIcon.style.display = 'none';
            closeIcon.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Disable page scroll when menu is open
        } else {
            openIcon.style.display = 'block';
            closeIcon.style.display = 'none';
            document.body.style.overflow = '';
        }
    };
    
    toggleBtn.addEventListener('click', toggleMenu);
    
    // Close mobile menu on clicking links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('open')) {
                toggleMenu();
            }
        });
    });
}

/* ==========================================================================
   Scroll Spy & Active Link Highlighting
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    const options = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the active view zone
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Update Desktop Links
                navLinks.forEach(link => {
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
                
                // Update Mobile Links
                mobileLinks.forEach(link => {
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, options);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

/* ==========================================================================
   Interactive 3D Card Tilt Effect
   ========================================================================== */
function initTiltCard() {
    const card = document.getElementById('about-card');
    if (!card) return;
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return; // Disable on mobile/touch screens
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse position inside card
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt angles (max 15 degrees)
        const rotateX = ((centerY - y) / centerY) * 12;
        const rotateY = ((x - centerX) / centerX) * 12;
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Dynamic Glow following mouse
        const glow = card.querySelector('.card-glow');
        if (glow) {
            const pctX = (x / rect.width) * 100;
            const pctY = (y / rect.height) * 100;
            glow.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(236, 72, 153, 0.18) 0%, rgba(0,0,0,0) 80%)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        // Reset transform and glow smoothly
        card.style.transform = 'rotateX(0) rotateY(0)';
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.15) 0%, rgba(0,0,0,0) 80%)`;
        }
    });
}

/* ==========================================================================
   Project Categorization Filter
   ========================================================================== */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active status from sibling buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Trigger fade-in animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Delay display: none to allow fade-out transitions
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
}

/* ==========================================================================
   Contact Form Handler (Interactive Submissions)
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const submitBtn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('form-success');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Mock Form Submission loading animation
        const origText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span> <div class="spinner"></div>`;
        
        // Custom styling for spinner
        const spinner = submitBtn.querySelector('.spinner');
        if (spinner) {
            spinner.style.width = '18px';
            spinner.style.height = '18px';
            spinner.style.border = '2px solid rgba(255, 255, 255, 0.3)';
            spinner.style.borderTopColor = '#fff';
            spinner.style.borderRadius = '50%';
            spinner.style.animation = 'spin 0.8s linear infinite';
            
            // Inject keyframe style if not already existing
            if (!document.getElementById('spinner-style')) {
                const style = document.createElement('style');
                style.id = 'spinner-style';
                style.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } }`;
                document.head.appendChild(style);
            }
        }
        
        setTimeout(() => {
            // Restore button
            submitBtn.style.display = 'none';
            successMsg.style.display = 'flex';
            
            // Clear inputs
            form.querySelectorAll('input, textarea').forEach(input => {
                input.value = '';
                input.disabled = true;
            });
        }, 1800);
    });
}
