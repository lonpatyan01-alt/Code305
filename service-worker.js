
const CACHE_NAME = 'code305-cache-v1';
const FILES_TO_CACHE = [
  '/index.html',
  '/manifest.json',
  '/ace/ace.js',
  '/ace/ext-language_tools.min.js',
  '/jsbeautify/beautify.min.js',
  '/jsbeautify/beautify-html.min.js',
  '/jsbeautify/beautify-css.min.js',
  '/jszip/jszip.min.js',
  '/filesaver/FileSaver.min.js',
  '/pyodide/pyodide.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
