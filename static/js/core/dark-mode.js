window.toDarkMode = function () {
    localStorage.theme = "dark";
    window.updateTheme();
}

window.toLightMode = function () {
    localStorage.theme = "light";
    window.updateTheme();
}

function updateTheme() {
    switch (localStorage.theme) {
        case 'dark':
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('color-theme', 'dark');
            addDynamicallyCssHighlightTheme('dark');
            break;

        default:
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('color-theme', 'light');
            addDynamicallyCssHighlightTheme('light');
            break;
    }
}

function addDynamicallyCssHighlightTheme(theme) {
    const head = document.querySelector('head');

    const oldTheme = document.querySelector('.highlight_theme') ?? null;
    if (oldTheme !== null) {
        head.removeChild(oldTheme);
    }

    const style = document.createElement('link');
    style.classList.add('highlight_theme');
    style.href = `/assets/styles/syntax-theme-${theme}.css`;
    style.type = 'text/css';
    style.rel = 'stylesheet';
    head.append(style);
}

function initDarkModeButtons() {
    const lightModeBtn = document.getElementById('light-mode');
    const darkModeBtn = document.getElementById('dark-mode');

    if (lightModeBtn) {
        lightModeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.toDarkMode();
        });
    }

    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.toLightMode();
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkModeButtons);
} else {
    initDarkModeButtons();
}

window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        initDarkModeButtons();
        updateTheme();
    }
});

updateTheme();