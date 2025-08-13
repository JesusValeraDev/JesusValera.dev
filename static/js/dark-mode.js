window.toDarkMode = function () {
    localStorage.theme = "dark";
    localStorage.setItem('preference-theme', "theme-dark");
    window.updateTheme();
}

window.toLightMode = function () {
    localStorage.theme = "light";
    localStorage.setItem('preference-theme', "theme-light");
    window.updateTheme();
}

function updateTheme() {
    const lightButton = document.getElementById('light-mode');
    const darkButton = document.getElementById('dark-mode');

    if (localStorage.theme === 'dark') {
        document.documentElement.classList.remove('theme-light');
        document.documentElement.classList.add('theme-dark');
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        document.documentElement.style.backgroundColor = '#161e32';
        document.documentElement.style.color = '#cbd5e1';
        setThemeMetaColor('#0f172a');
        addDynamicallyCssHighlightTheme('dark');
        if (lightButton) lightButton.style.display = 'none';
        if (darkButton) darkButton.style.display = 'inline-flex';
    } else {
        document.documentElement.classList.add('theme-light');
        document.documentElement.classList.remove('theme-dark');
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('color-theme', 'light');
        document.documentElement.style.backgroundColor = '#fcfcfd';
        document.documentElement.style.color = '#374151';
        setThemeMetaColor('#fcfcfd');
        addDynamicallyCssHighlightTheme('light');
        if (lightButton) lightButton.style.display = 'inline-flex';
        if (darkButton) darkButton.style.display = 'none';
    }
}

function setThemeMetaColor(hex) {
    let tag = document.querySelector('meta[name="theme-color"]');
    if (!tag) {
        tag = document.createElement('meta');
        tag.name = 'theme-color';
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', hex);
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

window.updateTheme = updateTheme;
updateTheme();
