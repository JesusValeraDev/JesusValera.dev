(function () {
    // Configuration constants
    const MAX_SNOWFLAKES = 8;
    const SNOWFLAKE_SIZE_MIN = 4;
    const SNOWFLAKE_SIZE_MAX = 12;
    const ANIMATION_DURATION_MIN = 60000; // 60 seconds
    const ANIMATION_DURATION_MAX = 90000; // 90 seconds
    const DRIFT_RANGE = 100; // -50 to +50px
    const SWAY_AMPLITUDE_MIN = 20;
    const SWAY_AMPLITUDE_MAX = 80;
    const SWAY_SPEED_MIN = 2;
    const SWAY_SPEED_MAX = 5;
    const SPAWN_INTERVAL = 3000; // 3 seconds
    const RESIZE_DEBOUNCE = 250; // 250ms
    const INITIAL_SPAWN_DELAY = 100; // 100ms between initial snowflakes
    const RANDOM_START_HEIGHT_FACTOR = 0.8; // 80% of screen height
    const SCREEN_BUFFER = 20; // Buffer distance above/below screen
    
    let snowContainer;
    let snowInterval;

    function createSnowContainer() {
        const container = document.createElement('div');
        container.id = 'snow-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        `;
        document.body.appendChild(container);
        return container;
    }

    function createSnowflake() {
        if (!snowContainer) return;
        
        const flake = document.createElement('div');
        const size = Math.random() * (SNOWFLAKE_SIZE_MAX - SNOWFLAKE_SIZE_MIN) + SNOWFLAKE_SIZE_MIN;
        const startX = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * (ANIMATION_DURATION_MAX - ANIMATION_DURATION_MIN) + ANIMATION_DURATION_MIN;
        const drift = (Math.random() - 0.5) * DRIFT_RANGE;
        
        // Start snowflakes at random positions at initial load
        let startY = -SCREEN_BUFFER;
        let adjustedDuration = animationDuration;

        const documentHeight = window.innerHeight;
        startY = Math.random() * (documentHeight * RANDOM_START_HEIGHT_FACTOR);

        const progressPercentage = startY / (documentHeight + SCREEN_BUFFER);
        adjustedDuration = animationDuration * (1 - progressPercentage);

        flake.style.cssText = `
            position: absolute;
            top: ${startY}px;
            left: ${startX}px;
            width: ${size}px;
            height: ${size}px;
            background: var(--snowflake-bg-color, #ffffff);
            border-radius: 50%;
            box-shadow: 0 0 ${size/2}px var(--snowflake-shadow-color, #cccccc);
            animation: snowfall-${Date.now()}-${Math.random()} ${animationDuration}ms linear forwards;
            --drift: ${drift}px;
            --fall-distance: ${documentHeight + SCREEN_BUFFER}px;
        `;

        const animationName = `snowfall-${Date.now()}-${Math.random()}`.replace('.', '');
        const swayAmplitude = Math.random() * (SWAY_AMPLITUDE_MAX - SWAY_AMPLITUDE_MIN) + SWAY_AMPLITUDE_MIN;
        const swaySpeed = Math.random() * (SWAY_SPEED_MAX - SWAY_SPEED_MIN) + SWAY_SPEED_MIN;
        const style = document.createElement('style');
        // Calculate distance to fall (from current position to bottom)
        const fallDistance = documentHeight + SCREEN_BUFFER - startY;

        style.textContent = `
            @keyframes ${animationName} {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: 0.8;
                }
                25% {
                    transform: translateY(${fallDistance * 0.25}px) translateX(${swayAmplitude * Math.sin(swaySpeed * 0.5 * Math.PI)}px) rotate(${Math.random() * 15 - 7.5}deg);
                    opacity: 0.7;
                }
                50% {
                    transform: translateY(${fallDistance * 0.5}px) translateX(${swayAmplitude * Math.sin(swaySpeed * Math.PI)}px) rotate(${Math.random() * 15 - 7.5}deg);
                    opacity: 0.5;
                }
                75% {
                    transform: translateY(${fallDistance * 0.75}px) translateX(${swayAmplitude * Math.sin(swaySpeed * 1.5 * Math.PI)}px) rotate(${Math.random() * 15 - 7.5}deg);
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(${fallDistance}px) translateX(${drift + swayAmplitude * Math.sin(swaySpeed * 2 * Math.PI)}px) rotate(${Math.random() * 20 - 10}deg);
                    opacity: 0.1;
                }
            }
        `;
        document.head.appendChild(style);

        flake.style.animation = `${animationName} ${adjustedDuration}ms linear forwards`;
        snowContainer.appendChild(flake);

        setTimeout(() => {
            if (flake.parentNode) {
                flake.parentNode.removeChild(flake);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, adjustedDuration);
    }

    // Add base CSS styles for snowflakes
    function addSnowCSS() {
        if (document.getElementById('snow-styles')) return;

        const style = document.createElement('style');
        style.id = 'snow-styles';
        style.textContent = `
            /* Snowflake CSS custom properties and base styles */
            :root {
                --snowflake-bg-color: var(--color-light-timeline-bg, #00a3f1);
                --snowflake-shadow-color: rgba(0, 163, 241, 0.3);
            }
            .dark {
                --snowflake-bg-color: rgba(255, 255, 255, 0.8);
                --snowflake-shadow-color: rgba(180, 180, 255, 0.4);
            }
            #snow-container {
                pointer-events: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (snowContainer) {
                const styles = document.head.querySelectorAll('style[id^="snowfall-"], style[id*="snowfall-"]');
                styles.forEach(style => style.remove());
                snowContainer.innerHTML = '';

                for (let i = 0; i < MAX_SNOWFLAKES; i++) {
                    setTimeout(() => {
                        createSnowflake();
                    }, i * INITIAL_SPAWN_DELAY);
                }
            }
        }, RESIZE_DEBOUNCE);
    }

    function startSnow() {
        if (snowInterval) return;

        addSnowCSS();
        snowContainer = createSnowContainer();

        window.addEventListener('resize', handleResize);

        // Create initial batch of snowflakes at random positions
        for (let i = 0; i < MAX_SNOWFLAKES; i++) {
            setTimeout(() => {
                createSnowflake();
            }, i * INITIAL_SPAWN_DELAY);
        }

        snowInterval = setInterval(() => {
            if (snowContainer && snowContainer.children.length < MAX_SNOWFLAKES) {
                createSnowflake();
            }
        }, SPAWN_INTERVAL);
    }

    function stopSnow() {
        if (snowInterval) {
            clearInterval(snowInterval);
            snowInterval = null;
        }

        window.removeEventListener('resize', handleResize);
        
        if (snowContainer) {
            snowContainer.remove();
            snowContainer = null;
        }
    }

    startSnow();

    window.startSnow = startSnow;
    window.stopSnow = stopSnow;
})();
