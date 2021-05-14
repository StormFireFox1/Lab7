// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests

// installation
var CACHE_NAME = 'journal-cache';
var URLS_TO_CACHE = [
    '/',
    'https://cse110lab6.herokuapp.com/',
    'https://drive.google.com',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// activation
self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

// fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(res => {

            if (res) {
                return res;
            }

            return fetch(event.request).then((res) => {
                if (!res || res.status !== 200 || res.type !== 'basic'){
                    return res;
                }

                var responseToCache = res.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return res;
            });

        })
    );
});


