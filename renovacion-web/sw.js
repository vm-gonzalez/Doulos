// IMPORTANTE: Cambia el número de esta versión (v3, v4, v5...) cada vez que subas cambios a GitHub
const CACHE_NAME = 'renovacion-v7'; 

const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './verses.json'
];

// Instalar el Service Worker y guardar en caché
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// NUEVO: Activar y borrar la caché antigua
// Esto asegura que cuando cambies el CACHE_NAME, la versión vieja se borre
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Borrando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Usar la caché cuando no hay internet
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Devuelve la versión guardada o descarga una nueva si hay internet
                return response || fetch(event.request);
            })
    );
});