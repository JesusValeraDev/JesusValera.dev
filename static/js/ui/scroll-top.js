let scrollPos = 0;

// Handle scroll visibility with bfcache-friendly event listeners
function handleScroll() {
    const topButton = document.querySelector('.top');
    if (!topButton) return;
    
    let windowY = window.scrollY;

    if (document.documentElement.scrollTop < 120) {
        topButton.style.display = 'none';
    } else if (windowY > scrollPos) {
        topButton.style.display = 'none';
    } else if (scrollPos - windowY > 10) {
        topButton.style.display = '';
    }
    scrollPos = windowY;
}

// Initialize scroll handling with bfcache support
function initScrollTop() {
    const topButton = document.querySelector('.top');

    if (topButton) {
        // Add smooth scroll to top
        topButton.addEventListener('click', function (e) {
            e.preventDefault();

            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Use addEventListener with passive for better performance and bfcache compatibility
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Handle page restoration from bfcache
function handlePageRestore() {
    // Reset scroll position tracking
    scrollPos = window.scrollY;
    handleScroll();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollTop);
} else {
    initScrollTop();
}

// Handle bfcache restoration
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Page was restored from bfcache
        handlePageRestore();
    }
});
