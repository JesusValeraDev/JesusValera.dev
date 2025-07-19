function debounce(fn, delay) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, delay);
    };
}

function createSnowContainer() {
    const container = document.createElement('div');
    container.className = 'snow-container';
    Object.assign(container.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
    });
    document.body.appendChild(container);
    return container;
}

function createFlakeElement({size, duration, startLeft, startTop, endLeft, endTop, progress}) {
    const flake = document.createElement('div');
    flake.className = 'flake';

    const transitionTime = duration * (1 - progress);

    Object.assign(flake.style, {
        position: 'absolute',
        left: `${startLeft}px`,
        top: `${startTop}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: 'var(--snowflake-bg-color)',
        filter: 'drop-shadow(0 0 10px var(--snowflake-shadow-color))',
        transition: `top ${transitionTime}ms linear, left ${transitionTime}ms linear`,
        pointerEvents: 'none',
        opacity: (0.2 + Math.random() * 0.8).toFixed(2),
    });

    // Animate flake on next frame
    requestAnimationFrame(() => {
        flake.style.top = `${endTop}px`;
        flake.style.left = `${endLeft}px`;
    });

    return flake;
}

function createFlakeFactory(container, options, getDimensions) {
    let currentFlakeCount = 0;
    let flakeTimeouts = new Set();
    let spawnInterval = null;
    let isRunning = false;

    const spawnFlake = function (progress = 0) {
        if (currentFlakeCount >= options.maxFlakes || !isRunning) {
            return;
        }

        currentFlakeCount++;

        const {width, height} = getDimensions();
        const size = options.minSize + Math.random() * (options.maxSize - options.minSize);
        const startLeft = Math.random() * (width - size);

        const endTop = height + 100;
        const startTop = -50 + (endTop + 50) * progress;

        const randomDrift = -150 + Math.random() * 300;
        const windDrift = options.windX + randomDrift;
        const endLeft = startLeft + windDrift;

        const duration = 30000 + Math.random() * 15000; // Slower, more graceful fall (30-45 seconds)

        const flake = createFlakeElement({
            size,
            duration,
            startLeft,
            startTop,
            endLeft,
            endTop,
            progress
        });

        container.appendChild(flake);

        // Calculate when flake reaches the bottom (not when animation ends)
        const timeToBottom = duration * (1 - progress) * 0.85; // Spawn new one slightly before it reaches bottom

        // Spawn replacement when this flake nears the bottom
        const replaceTimeoutId = setTimeout(() => {
            if (isRunning) {
                currentFlakeCount--; // Decrement count to allow new spawn
                flakeTimeouts.delete(replaceTimeoutId);
                spawnFlake(); // Spawn replacement immediately
            }
        }, timeToBottom);

        flakeTimeouts.add(replaceTimeoutId);

        // Clean up DOM element after full animation + buffer
        const cleanupTimeoutId = setTimeout(() => {
            if (flake.parentNode) {
                flake.remove();
            }
            flakeTimeouts.delete(cleanupTimeoutId);
        }, duration * (1 - progress) + 2000);

        flakeTimeouts.add(cleanupTimeoutId);
    };

    return {
        spawnFlake,

        clearAll: function () {
            const flakes = container.querySelectorAll('.flake');
            flakes.forEach(flake => flake.remove());

            flakeTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
            flakeTimeouts.clear();

            if (spawnInterval) {
                clearInterval(spawnInterval);
                spawnInterval = null;
            }

            currentFlakeCount = 0;
            isRunning = false;
        },

        start: function () {
            if (isRunning) return;

            isRunning = true;

            // Initial burst spawn
            for (let i = 0; i < options.maxFlakes; i++) {
                setTimeout(() => spawnFlake(Math.random()), i * 200); // Stagger initial spawn
            }

            // Continuous gentle spawning to maintain flow
            spawnInterval = setInterval(() => {
                if (currentFlakeCount < options.maxFlakes && isRunning) {
                    spawnFlake(0); // Always spawn from top
                }
            }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds
        },

        restart: function () {
            this.clearAll();
            setTimeout(() => this.start(), 100); // Small delay to ensure cleanup
        }
    };
}

function createSnow(userOptions = {}) {
    const defaults = {
        minSize: 8,
        maxSize: 12,
        windX: 30,
        maxFlakes: 10 // Slightly increased for better coverage
    };
    const options = {...defaults, ...userOptions};

    const container = createSnowContainer();

    let dimensions = {
        width: document.documentElement.clientWidth,
        height: window.innerHeight
    };

    const updateDimensions = () => {
        dimensions = {
            width: document.documentElement.clientWidth,
            height: window.innerHeight
        };
    };

    const flakeFactory = createFlakeFactory(container, options, () => dimensions);

    // Handle window resize
    const handleResize = debounce(() => {
        updateDimensions();
        flakeFactory.restart();
    }, 150);

    window.addEventListener('resize', handleResize);

    // Start the snow
    flakeFactory.start();

    // Return cleanup function
    return () => {
        window.removeEventListener('resize', handleResize);
        flakeFactory.clearAll();
        container.remove();
    };
}

function isChristmas() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    return (month === 12 && day >= 15)
        || (month === 1 && day <= 5);
}

if (isChristmas()) {
    createSnow();
}
