function initExternalLinks() {
    // Find all external links
    const allLinks = document.querySelectorAll('a[href^="http"], a[href^="https"]');
    const currentDomain = window.location.hostname;
    
    allLinks.forEach(link => {
        const url = new URL(link.href);
        
        // Check if link is external (different domain)
        if (url.hostname !== currentDomain) {
            // Add target="_blank" if not already set
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
            }
            
            // Add security attributes
            const currentRel = link.getAttribute('rel') || '';
            if (!currentRel.includes('noopener')) {
                const newRel = currentRel ? `${currentRel} noopener noreferrer` : 'noopener noreferrer';
                link.setAttribute('rel', newRel);
            }
            
            // Add accessibility attributes
            const ariaLabel = link.getAttribute('aria-label');
            if (ariaLabel && !ariaLabel.includes('opens in new tab')) {
                link.setAttribute('aria-label', `${ariaLabel} (opens in new tab)`);
            } else if (!ariaLabel) {
                const linkText = link.textContent.trim();
                if (linkText) {
                    link.setAttribute('aria-label', `${linkText} (opens in new tab)`);
                }
            }
            
            // Add title attribute for tooltip
            const title = link.getAttribute('title');
            if (!title) {
                const linkText = link.textContent.trim();
                if (linkText) {
                    link.setAttribute('title', `${linkText} - Opens in new tab`);
                }
            }
        }
    });
}

// Initialize when DOM is ready  
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExternalLinks);
} else {
    initExternalLinks();
}

// Handle bfcache restoration
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Page was restored from bfcache, reinitialize external link handling
        initExternalLinks();
    }
});
