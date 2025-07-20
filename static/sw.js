// Service Worker for Ultra-Aggressive Caching
// Maximizes cache lifetimes to overcome GitHub Pages 10m TTL limit
const CACHE_NAME = 'jesusvalera-v3';
const STATIC_CACHE_NAME = 'jesusvalera-static-v3';
const LONG_TERM_CACHE = 'jesusvalera-longterm-v2';
const FONT_CACHE = 'jesusvalera-fonts-v1';

// Ultra-long-term cacheable assets (virtually never change)
const FONT_ASSETS = [
    '/Inter-Variable.woff2',
    '/fonts/Inter-400.woff',
    '/fonts/Inter-500.woff', 
    '/fonts/Inter-600.woff',
    '/fonts/Inter-700.woff'
];

// Critical assets to cache immediately (high priority)
const CRITICAL_ASSETS = [
    '/main.css',
    '/syntax-theme-light.css', 
    '/syntax-theme-dark.css',
    '/js/dark-mode.js',
    '/favicon.webp',
    '/icon.ico',
    '/jesus-80.webp'
];

// Long-term cacheable assets (fonts, images, etc.)
const LONG_TERM_ASSETS = [
    // Large images from Lighthouse report
    '/images/2021-05-17/1.webp',
    '/images/2025-07-04/1.webp', 
    '/images/2025-03-25/1.webp',
    '/images/2024-11-29/1.webp',
    '/images/2022-03-16/1.webp',
    '/images/2022-08-17/1.webp',
    '/images/2024-07-01/1.webp',
    '/images/2024-02-09/1.webp',
    '/images/2022-12-06/1.webp',
    '/images/2020-08-20/1.webp',
    '/images/2023-02-20/1.webp',
    '/images/2020-07-02/1.webp',
    '/images/2021-08-18/1.webp',
    '/images/2020-06-11/1.webp',
    '/images/2020-04-03/1.webp'
];

// Secondary assets (lower priority)  
const SECONDARY_ASSETS = [
    '/js/scroll-top.js',
    '/js/filter-books.js', 
    '/js/external-links.js',
    '/js/image-optimizer.js',
    '/js/snow.js'
];

// Install event - ultra-aggressive caching with four tiers
self.addEventListener('install', event => {
    event.waitUntil(
        Promise.all([
            // Tier 1: Fonts (cache virtually forever)
            caches.open(FONT_CACHE)
                .then(cache => cache.addAll(FONT_ASSETS)),
            
            // Tier 2: Critical assets (high priority)
            caches.open(STATIC_CACHE_NAME)
                .then(cache => cache.addAll(CRITICAL_ASSETS)),
            
            // Tier 3: Long-term assets (images, optimized for bandwidth)
            caches.open(LONG_TERM_CACHE)
                .then(cache => cache.addAll(LONG_TERM_ASSETS)),
            
            // Tier 4: Secondary assets (lower priority)
            caches.open(STATIC_CACHE_NAME)
                .then(cache => cache.addAll(SECONDARY_ASSETS))
        ])
    );
    self.skipWaiting();
});

// Fetch event - handle caching strategy with three-tier system
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);

    // Only handle same-origin requests
    if (url.origin !== location.origin) return;

    // Ultra-long-term assets: Fonts (cache forever, ignore server headers)
    const isFontAsset = FONT_ASSETS.some(asset => request.url.includes(asset)) ||
                       request.url.includes('.woff') ||
                       request.url.includes('.woff2') ||
                       request.destination === 'font';
    
    if (isFontAsset) {
        event.respondWith(
            caches.match(request, { cacheName: FONT_CACHE }).then(response => {
                if (response) return response; // Never refetch fonts
                
                return fetch(request).then(response => {
                    if (response.ok) {
                        const responseClone = response.clone();
                        caches.open(FONT_CACHE).then(cache => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                });
            }).catch(() => caches.match(request))
        );
        return;
    }

    // Long-term assets: Large images (cache aggressively, stale-while-revalidate)
    const isLongTermAsset = LONG_TERM_ASSETS.some(asset => request.url.includes(asset)) ||
                           request.url.includes('/images/') && request.url.includes('.webp');
    
    if (isLongTermAsset) {
        event.respondWith(
            caches.match(request).then(response => {
                const fetchPromise = fetch(request).then(fetchResponse => {
                    if (fetchResponse.ok) {
                        const responseClone = fetchResponse.clone();
                        caches.open(LONG_TERM_CACHE).then(cache => {
                            cache.put(request, responseClone);
                        });
                    }
                    return fetchResponse;
                });
                
                // Return cached version immediately if available (stale-while-revalidate)
                return response || fetchPromise;
            }).catch(() => caches.match(request))
        );
        return;
    }

    if (isStaticAsset(request.url)) {
        // Static assets: Cache first, then network
        event.respondWith(
            caches.match(request).then(response => {
                if (response) {
                    return response;
                }
                return fetch(request).then(response => {
                    if (response.ok) {
                        const responseClone = response.clone();
                        caches.open(STATIC_CACHE_NAME).then(cache => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                });
            })
        );
    } else if (isImage(request.url)) {
        // Images: Cache with stale-while-revalidate
        event.respondWith(
            caches.match(request).then(response => {
                if (response) {
                    return response;
                }
                return fetch(request).then(response => {
                    if (response.ok) {
                        const responseClone = response.clone();
                        caches.open(STATIC_CACHE_NAME).then(cache => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                });
            })
        );
    } else if (isHTML(request.url)) {
        // HTML: Network first, then cache
        event.respondWith(
            fetch(request).then(response => {
                if (response.ok) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, responseClone);
                    });
                }
                return response;
            }).catch(() => {
                // Network failed, try cache
                return caches.match(request);
            })
        );
    }
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName !== CACHE_NAME && 
                           cacheName !== STATIC_CACHE_NAME && 
                           cacheName !== LONG_TERM_CACHE;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
    self.clients.claim();
});

// Helper functions
function isStaticAsset(url) {
    return /\.(css|js|woff2?|ttf|otf)$/i.test(url);
}

function isImage(url) {
    return /\.(webp|png|jpg|jpeg|gif|svg|ico)$/i.test(url);
}

function isHTML(url) {
    return !url.includes('.') || /\.html$/i.test(url);
}
