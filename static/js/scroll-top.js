let scrollPos = 0;
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
