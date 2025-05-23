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

function createFlakeElement({ size, duration, startLeft, startTop, endLeft, endTop, progress }) {
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

function createFlakeFactory(container, options, getWidth) {
    let currentFlakeCount = 0;

    return function spawnFlake(progress = 0) {
        if (currentFlakeCount >= options.maxFlakes) {
            return;
        }

        currentFlakeCount++;

        const size = options.minSize + Math.random() * (options.maxSize - options.minSize);
        const width = getWidth();
        const startLeft = Math.random() * (width - size);

        const endTop = window.innerHeight + 100;
        const startTop = -50 + (endTop + 50) * progress;

        const randomDrift = -150 + Math.random() * 300;
        const windDrift = options.windX + randomDrift;
        const endLeft = startLeft + windDrift;

        const duration = 40000 + Math.random() * 10000;

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

        setTimeout(() => {
            flake.remove();
            currentFlakeCount--;
            spawnFlake(); // keep total flake count steady
        }, duration * (1 - progress) + 1000);
    };
}

function createSnow(userOptions = {}) {
    const defaults = {
        minSize: 10,
        maxSize: 10,
        windX: 30,
        maxFlakes: 8
    };
    const options = { ...defaults, ...userOptions };

    const container = createSnowContainer();

    let width = document.documentElement.clientWidth;
    const updateWidth = () => { width = document.documentElement.clientWidth; };
    window.addEventListener('resize', debounce(updateWidth, 100));

    const createFlake = createFlakeFactory(container, options, () => width);

    for (let i = 0; i < options.maxFlakes; i++) {
        createFlake(Math.random());
    }
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
