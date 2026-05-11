const CACHE_NAME = 'renovacion-v1';
// Archivos que se guardarán en la memoria del celular
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