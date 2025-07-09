// Hero section interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll and button interactions
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle button actions
            if (this.classList.contains('btn-primary')) {
                // Add your CTA logic here
            } else if (this.classList.contains('btn-secondary')) {
                // Add your demo/tutorial logic here
            }
        });
    });
    
    // Add hover effects to feature items
    const features = document.querySelectorAll('.feature');
    
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Parallax effect for floating camera
    const floatingCamera = document.querySelector('.floating-camera');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
        
        if (floatingCamera) {
            const moveX = (mouseX - 50) * 0.1;
            const moveY = (mouseY - 50) * 0.1;
            
            floatingCamera.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.hero-title, .hero-subtitle, .cta-buttons, .features, .hero-photo');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Stagger animation for features
    const featureItems = document.querySelectorAll('.feature');
    featureItems.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }, index * 200 + 1000);
    });
    
    // Mailchimp popup functionality - SIMPLIFIED AND ROBUST
    const mailchimpPopup = document.getElementById('mc_embed_shell');
    const mailchimpForm = document.getElementById('mc_embed_signup');
    
    // Ensure elements exist before proceeding
    if (!mailchimpPopup || !mailchimpForm) {
        console.error('Mailchimp popup elements not found!');
        return;
    }
    
    // Global state management
    let popupState = {
        shown: false,
        timerFired: false,
        scrollTriggered: false
    };
    
    // DEVELOPMENT HELPER: Uncomment the line below to reset popup for testing
    //sessionStorage.removeItem('mailchimp_popup_shown'); // TEMPORARY - for testing only
    
    // Check if popup should be blocked (once per session)
    function isPopupBlocked() {
        return sessionStorage.getItem('mailchimp_popup_shown') === 'true';
    }
    
    // Main function to show popup
    function showMailchimpPopup(trigger = 'unknown') {
        // Don't show if already shown or blocked
        if (popupState.shown || isPopupBlocked()) {
            return false;
        }
        
        mailchimpPopup.classList.add('show');
        document.body.style.overflow = 'hidden';
        popupState.shown = true;
        
        return true;
    }
    
    // Function to hide popup
    function hideMailchimpPopup(setSessionStorage = true) {
        mailchimpPopup.classList.remove('show');
        document.body.style.overflow = '';
        popupState.shown = false;
        
        // Set sessionStorage to prevent showing again in this session
        if (setSessionStorage) {
            sessionStorage.setItem('mailchimp_popup_shown', 'true');
        }
    }
    
    // Timer-based trigger (30 seconds) - PRODUCTION
    setTimeout(() => {
        if (!popupState.timerFired) {
            popupState.timerFired = true;
            showMailchimpPopup('timer');
        }
    }, 30000);
    

    
    // Close popup event handlers (once per session)
    const closeButton = document.querySelector('.close-popup');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            hideMailchimpPopup(true); // Set sessionStorage
        });
    }
    
    // Close on background click (once per session)
    mailchimpPopup.addEventListener('click', function(e) {
        if (e.target === mailchimpPopup) {
            hideMailchimpPopup(true); // Set sessionStorage
        }
    });
    
    // Close on Escape key (once per session)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupState.shown) {
            hideMailchimpPopup(true); // Set sessionStorage
        }
    });
    
    // Handle form submission
    const mailchimpFormElement = document.getElementById('mc-embedded-subscribe-form');
    if (mailchimpFormElement) {
        mailchimpFormElement.addEventListener('submit', function(e) {
            // Validate required fields
            const emailField = document.getElementById('mce-EMAIL');
            const nameField = document.getElementById('mce-FNAME');
            
            if (!emailField.value.trim() || !nameField.value.trim()) {
                return false;
            }
            
            setTimeout(() => {
                hideMailchimpPopup(true); // Set sessionStorage on form submission
            }, 3000);
        });
    }
});
