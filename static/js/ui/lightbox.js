(function () {
    'use strict';

    let currentGallery = [];
    let currentIndex = 0;

    function initLightbox() {
        // Create modal HTML if it doesn't exist
        if (!document.getElementById('lightbox-modal')) {
            const modal = document.createElement('div');
            modal.id = 'lightbox-modal';
            modal.innerHTML = `
                <span id="lightbox-close">&times;</span>
                <button id="lightbox-prev" aria-label="Previous image">&lsaquo;</button>
                <button id="lightbox-next" aria-label="Next image">&rsaquo;</button>
                <div id="lightbox-image-wrapper">
                    <img id="lightbox-image" src="" alt="">
                </div>
            `;
            document.body.appendChild(modal);
        }

        const modal = document.getElementById('lightbox-modal');
        const lightboxImage = document.getElementById('lightbox-image');
        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');

        // Find all galleries
        const galleries = document.querySelectorAll('.project-gallery');

        // Add click handlers to all gallery images
        galleries.forEach(gallery => {
            const links = Array.from(gallery.querySelectorAll('a'));

            links.forEach((link, index) => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const img = this.querySelector('img');
                    if (img) {
                        currentGallery = links;
                        currentIndex = index;
                        openLightbox(img.src, img.alt);
                        updateNavigationButtons();
                    }
                });
            });
        });

        function openLightbox(src, alt) {
            lightboxImage.src = src;
            lightboxImage.alt = alt || '';
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Trigger reflow to enable transition
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        }

        function closeLightbox() {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.classList.remove('active');
                lightboxImage.src = '';
                document.body.style.overflow = '';
            }, 300);
        }

        function showPrevImage() {
            if (currentIndex > 0) {
                currentIndex--;
                const img = currentGallery[currentIndex].querySelector('img');
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                updateNavigationButtons();
            }
        }

        function showNextImage() {
            if (currentIndex < currentGallery.length - 1) {
                currentIndex++;
                const img = currentGallery[currentIndex].querySelector('img');
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                updateNavigationButtons();
            }
        }

        function updateNavigationButtons() {
            if (currentIndex === 0) {
                prevBtn.style.opacity = '0.3';
                prevBtn.style.cursor = 'not-allowed';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.cursor = 'pointer';
            }

            if (currentIndex === currentGallery.length - 1) {
                nextBtn.style.opacity = '0.3';
                nextBtn.style.cursor = 'not-allowed';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
            }
        }

        // Close on X button click
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeLightbox();
        });

        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeLightbox();
            }
        });

        // Prevent image click from closing modal
        lightboxImage.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Navigation button clicks
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showPrevImage();
        });

        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showNextImage();
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (modal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeLightbox();
                } else if (e.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                }
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLightbox);
    } else {
        initLightbox();
    }
})();