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
    style.href = `/syntax-theme-${theme}.css`;
    style.type = 'text/css';
    style.rel = 'stylesheet';
    head.append(style);
}

// Initialize theme on first load if not set (respect system preference)
if (!localStorage.theme) {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.theme = prefersDark ? 'dark' : 'light';
}

updateTheme();

// Mobile-optimized theme toggle
function bindThemeButtons() {
    const lightButton = document.getElementById('light-mode');
    const darkButton = document.getElementById('dark-mode');
    
    if (lightButton) {
        lightButton.onclick = function(e) {
            e.preventDefault();
            localStorage.theme = "dark";
            updateTheme();
            return false;
        };
        lightButton.ontouchstart = function(e) {
            e.preventDefault();
            localStorage.theme = "dark";
            updateTheme();
            return false;
        };
    }
    
    if (darkButton) {
        darkButton.onclick = function(e) {
            e.preventDefault();
            localStorage.theme = "light";
            updateTheme();
            return false;
        };
        darkButton.ontouchstart = function(e) {
            e.preventDefault();
            localStorage.theme = "light";
            updateTheme();
            return false;
        };
    }
}

// Bind when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindThemeButtons);
} else {
    bindThemeButtons();
}
