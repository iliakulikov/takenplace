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
                console.log('Get Started clicked');
                // Add your CTA logic here
            } else if (this.classList.contains('btn-secondary')) {
                console.log('See How It Works clicked');
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
});
