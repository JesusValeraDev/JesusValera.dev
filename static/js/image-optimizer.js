(function () {
    'use strict';

    // Check for AVIF support and upgrade images
    function checkModernImageSupport() {
        const avifSupported = new Promise(resolve => {
            const avif = new Image();
            avif.onload = avif.onerror = () => resolve(avif.height === 2);
            avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=';
        });

        return avifSupported;
    }

    // Optimize image loading with Intersection Observer
    function optimizeImageLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;

                        // Add loading animation
                        img.style.transition = 'opacity 0.3s ease';
                        img.style.opacity = '0.7';

                        img.onload = () => {
                            img.style.opacity = '1';
                        };

                        imageObserver.unobserve(img);
                    }
                });
            }, {
                // Start loading images 50px before they're visible
                rootMargin: '50px'
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Preload next page images on hover
    function preloadNextPageImages() {
        const internalLinks = document.querySelectorAll('a[href]:not([href^="http"]):not([href^="mailto"])');

        internalLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const url = link.getAttribute('href');
                if (!url || document.querySelector(`link[href="${url}"]`)) return;

                const preloadLink = document.createElement('link');
                preloadLink.rel = 'prefetch';
                preloadLink.as = 'document';
                preloadLink.href = url;
                document.head.appendChild(preloadLink);
            }, { once: true });
        });
    }

    // Suggest WebP alternatives for PNG/JPEG images
    function suggestWebPAlternatives() {
        // Handle regular img elements with PNG/JPEG src
        const imgSelectors = [
            'img[src$=".png"]',
            'img[src$=".jpg"]', 
            'img[src$=".jpeg"]'
        ];

        imgSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(img => {
                const webpSrc = convertToWebP(img.src);
                testAndReplaceImage(webpSrc, (newSrc) => {
                    img.src = newSrc;
                });
            });
        });

        // Handle inline style background images
        const elementsWithInlineBackground = document.querySelectorAll('[style*="background-image"]');
        elementsWithInlineBackground.forEach(element => {
            const style = element.getAttribute('style');
            const match = style.match(/background-image:\s*url\(['"]?([^'"]*\.(png|jpe?g))['"]*\)/i);
            if (match) {
                const originalUrl = match[1];
                const webpUrl = convertToWebP(originalUrl);
                testAndReplaceImage(webpUrl, (newUrl) => {
                    const newStyle = style.replace(match[0], `background-image: url('${newUrl}')`);
                    element.setAttribute('style', newStyle);
                });
            }
        });

        // Handle CSS background images from computed styles
        const elementsWithBackground = document.querySelectorAll('.catalogue-image, .company-logo, .timeline-item');
        elementsWithBackground.forEach(element => {
            const computedStyle = getComputedStyle(element);
            const backgroundImage = computedStyle.backgroundImage;
            if (backgroundImage && /\.(png|jpe?g)/i.test(backgroundImage)) {
                const match = backgroundImage.match(/url\(['"]?([^'"]*\.(png|jpe?g))['"]*\)/i);
                if (match) {
                    const originalUrl = match[1];
                    const webpUrl = convertToWebP(originalUrl);
                    testAndReplaceImage(webpUrl, (newUrl) => {
                        element.style.backgroundImage = `url('${newUrl}')`;
                    });
                }
            }
        });
    }

    // Convert file extension to WebP
    function convertToWebP(originalUrl) {
        return originalUrl
            .replace(/\.png$/i, '.webp')
            .replace(/\.jpe?g$/i, '.webp');
    }

    // Test if WebP version exists and replace if successful
    function testAndReplaceImage(webpUrl, successCallback) {
        const testImg = new Image();
        testImg.onload = () => {
            successCallback(webpUrl);
        };
        testImg.onerror = () => {
            // WebP version doesn't exist, keep original
        };
        testImg.src = webpUrl;
    }

    // Initialize all optimizations
    function init() {
        // Check for modern image format support
        checkModernImageSupport().then(avifSupported => {
            if (avifSupported) {
                document.documentElement.classList.add('avif-supported');
            }
        });

        // Set up lazy loading improvements
        optimizeImageLoading();

        // Set up page prefetching on link hover
        preloadNextPageImages();

        // Upgrade existing images to WebP when available
        suggestWebPAlternatives();
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
