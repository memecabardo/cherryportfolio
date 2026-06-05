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
    initExpertiseAccordion();
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
    
    // Default to light-theme matching the user's reference image
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    }
    
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
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
    handleScroll();
}

/* ==========================================================================
   Ambient Mouse Cursor Glow
   ========================================================================== */
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        glow.style.display = 'none';
        return;
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    const speed = 0.08;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
    
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
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    const toggleMenu = () => {
        const isOpen = mobileNav.classList.toggle('open');
        
        if (isOpen) {
            openIcon.style.display = 'none';
            closeIcon.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            openIcon.style.display = 'block';
            closeIcon.style.display = 'none';
            document.body.style.overflow = '';
        }
    };
    
    toggleBtn.addEventListener('click', toggleMenu);
    
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
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
                
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
   Expertise Interactive Accordion List
   ========================================================================== */
function initExpertiseAccordion() {
    const expertiseRows = document.querySelectorAll('.expertise-row');
    
    // Auto-expand the first item as a showcase default
    if (expertiseRows.length > 0) {
        expertiseRows[0].classList.add('expanded');
    }
    
    expertiseRows.forEach(row => {
        row.addEventListener('click', () => {
            const isAlreadyExpanded = row.classList.contains('expanded');
            
            // Close all items
            expertiseRows.forEach(r => r.classList.remove('expanded'));
            
            // Toggle clicked item
            if (!isAlreadyExpanded) {
                row.classList.add('expanded');
            }
        });
        
        // Keyboard accessibility support
        row.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                row.click();
            }
        });
    });
}

/* ==========================================================================
   Contact Form Handler (Mock Submission)
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const submitBtn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('form-success');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const origText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>SENDING...</span> <div class="spinner-editorial"></div>`;
        
        // Custom styling for editorial form spinner
        const spinner = submitBtn.querySelector('.spinner-editorial');
        if (spinner) {
            spinner.style.width = '16px';
            spinner.style.height = '16px';
            spinner.style.border = '2px solid rgba(255, 255, 255, 0.2)';
            spinner.style.borderTopColor = '#ffffff';
            spinner.style.borderRadius = '50%';
            spinner.style.animation = 'spin 0.7s linear infinite';
            
            if (!document.getElementById('spinner-style-editorial')) {
                const style = document.createElement('style');
                style.id = 'spinner-style-editorial';
                style.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } }`;
                document.head.appendChild(style);
            }
        }
        
        setTimeout(() => {
            submitBtn.style.display = 'none';
            successMsg.style.display = 'flex';
            
            form.querySelectorAll('input, textarea').forEach(input => {
                input.value = '';
                input.disabled = true;
            });
        }, 1600);
    });
}
