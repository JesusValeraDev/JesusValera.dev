function initExternalLinks() {
    const currentDomain = window.location.hostname;

    // Apply rel="noopener noreferrer" to ALL anchors for safety
    document.querySelectorAll('a').forEach(link => {
        const currentRel = (link.getAttribute('rel') || '').trim();
        const needsNoopener = !currentRel.split(/\s+/).includes('noopener');
        const needsNoreferrer = !currentRel.split(/\s+/).includes('noreferrer');
        if (needsNoopener || needsNoreferrer) {
            const parts = currentRel ? currentRel.split(/\s+/) : [];
            if (needsNoopener) parts.push('noopener');
            if (needsNoreferrer) parts.push('noreferrer');
            link.setAttribute('rel', parts.join(' ').trim());
        }
    });

    // Enhance external links only
    document.querySelectorAll('a[href^="http"], a[href^="https"]').forEach(link => {
        const url = new URL(link.href);
        if (url.hostname !== currentDomain) {
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
            }

            // Accessibility hints for external links
            const ariaLabel = link.getAttribute('aria-label');
            if (ariaLabel && !ariaLabel.includes('opens in new tab')) {
                link.setAttribute('aria-label', `${ariaLabel} (opens in new tab)`);
            } else if (!ariaLabel) {
                const linkText = link.textContent.trim();
                if (linkText) {
                    link.setAttribute('aria-label', `${linkText} (opens in new tab)`);
                }
            }

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
