let scrollPos = 0;

// Handle scroll visibility
window.onscroll = function () {
    const topButton = document.querySelector('.top');
    let windowY = window.scrollY;

    if (document.documentElement.scrollTop < 120) {
        topButton.style.display = 'none';
    } else if (windowY > scrollPos) {
        topButton.style.display = 'none';
    } else if (scrollPos - windowY > 10) {
        topButton.style.display = '';
    }
    scrollPos = windowY;
};

// Handle smooth scroll to top
document.addEventListener('DOMContentLoaded', function () {
    const topButton = document.querySelector('.top');

    if (topButton) {
        topButton.addEventListener('click', function (e) {
            e.preventDefault();

            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
