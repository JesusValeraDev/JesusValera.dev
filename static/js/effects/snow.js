(function () {
    let snowContainer;
    let snowInterval;
    
    // Create snow container
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
            z-index: 9999;
            overflow: hidden;
        `;
        document.body.appendChild(container);
        return container;
    }
    
    // Create a single snowflake
    function createSnowflake() {
        if (!snowContainer) return;
        
        const flake = document.createElement('div');
        const size = Math.random() * 8 + 4; // 4-12px
        const startX = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 4000 + 6000; // 6-10 seconds
        const drift = (Math.random() - 0.5) * 100; // Side drift
        
        flake.style.cssText = `
            position: absolute;
            top: -20px;
            left: ${startX}px;
            width: ${size}px;
            height: ${size}px;
            background: var(--snowflake-bg-color, #ffffff);
            border-radius: 50%;
            box-shadow: 0 0 ${size/2}px var(--snowflake-shadow-color, #cccccc);
            animation: snowfall ${animationDuration}ms linear forwards;
            --drift: ${drift}px;
        `;
        
        snowContainer.appendChild(flake);
        
        // Remove snowflake after animation
        setTimeout(() => {
            if (flake.parentNode) {
                flake.parentNode.removeChild(flake);
            }
        }, animationDuration);
    }
    
    // Add CSS animation
    function addSnowCSS() {
        if (document.getElementById('snow-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'snow-styles';
        style.textContent = `
            @keyframes snowfall {
                0% {
                    transform: translateY(-20px) translateX(0);
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(${window.innerHeight + 20}px) translateX(var(--drift));
                    opacity: 0.1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Start snow
    function startSnow() {
        if (snowInterval) return;
        
        addSnowCSS();
        snowContainer = createSnowContainer();
        
        // Create snowflakes at intervals
        snowInterval = setInterval(() => {
            if (snowContainer && snowContainer.children.length < 30) {
                createSnowflake();
            }
        }, 300);
    }
    
    // Stop snow
    function stopSnow() {
        if (snowInterval) {
            clearInterval(snowInterval);
            snowInterval = null;
        }
        
        if (snowContainer) {
            snowContainer.remove();
            snowContainer = null;
        }
    }
    
    // Auto-start snow
    startSnow();
    
    // Global controls
    window.startSnow = startSnow;
    window.stopSnow = stopSnow;
})();
