/*============================================================
  Code 305 - The Perpetual Intelligence Engine (sw.js)
  Version: 3.0.0 (Ultimate Final Edition)
==============================================================*/

const CACHE_NAME = 'code 305-perpetual-v3';
const DYNAMIC_CACHE = 'code 305-dynamic-v3';

// مستقبل کی تمام ممکنہ فائلوں کی لسٹ
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './ace/ace.js',
    './ace/ext-language_tools.min.js',
    './jsbeautify/beautify.min.js',
    './jsbeautify/beautify-html.min.js',
    './jsbeautify/beautify-css.min.js',
    './jszip/jszip.min.js',
    './filesaver/FileSaver.min.js',
    './pyodide/pyodide.js',
    './icons/icon-192.png',
    './icons/icon-512.png',
    // CDN بیک اپس
    'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js',
    'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/theme-monokai.js'
];

/**
 * 📥 INSTALL: انفرادی فائل کیشنگ تاکہ کوئی ایک فائل پورا سسٹم فیل نہ کرے
 */
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.allSettled(
                ASSETS_TO_CACHE.map(url => cache.add(url))
            );
        }).then(() => self.skipWaiting())
    );
});

/**
 * ⚡ ACTIVATE: پرانے ورژن کی مکمل صفائی
 */
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME && key !== DYNAMIC_CACHE) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

/**
 * 📡 FETCH: الٹیمیٹ اسٹریٹیجی (Cache First, then Network Update)
 */
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    return caches.open(DYNAMIC_CACHE).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                }
                return networkResponse;
            }).catch(() => cachedResponse);

            return cachedResponse || fetchPromise;
        })
    );
});

/**
 * 🔄 SYNC & PUSH: مستقبل کی ضروریات کے لیے
 */
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-code') {
        console.log('🔄 بیک گراؤنڈ سنکنگ فعال ہے...');
    }
});

self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') self.skipWaiting();
});