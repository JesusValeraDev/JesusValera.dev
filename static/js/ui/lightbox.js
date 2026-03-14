(function () {
    'use strict';

    let currentGallery = [];
    let currentIndex = 0;

    function initLightbox() {
        if (!document.getElementById('lightbox-modal')) {
            const modal = document.createElement('div');
            modal.id = 'lightbox-modal';
            modal.innerHTML = `
                <span id="lightbox-close">&times;</span>
                <div id="lightbox-image-wrapper">
                    <button id="lightbox-prev" aria-label="Previous image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
                    <img id="lightbox-image" src="" alt="">
                    <button id="lightbox-next" aria-label="Next image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
                </div>
            `;
            document.body.appendChild(modal);
        }

        const modal = document.getElementById('lightbox-modal');
        const lightboxImage = document.getElementById('lightbox-image');
        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');

        const galleries = document.querySelectorAll('.project-gallery');

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
                    }
                });
            });
        });

        function openLightbox(src, alt) {
            lightboxImage.src = src;
            lightboxImage.alt = alt || '';
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            modal.classList.remove('active');
            lightboxImage.src = '';
            document.body.style.overflow = '';
        }

        function showPrevImage() {
            currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
            const img = currentGallery[currentIndex].querySelector('img');
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
        }

        function showNextImage() {
            currentIndex = (currentIndex + 1) % currentGallery.length;
            const img = currentGallery[currentIndex].querySelector('img');
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
        }

        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeLightbox();
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeLightbox();
            }
        });

        document.getElementById('lightbox-image-wrapper').addEventListener('click', function(e) {
            e.stopPropagation();
        });

        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showPrevImage();
        });

        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showNextImage();
        });

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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLightbox);
    } else {
        initLightbox();
    }
})();