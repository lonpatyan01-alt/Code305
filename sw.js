/* Code305 Ultra Offline Service Worker — generated package */
const VERSION = 'code305-ultra-offline-v16';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
const REMOTE_ASSETS = [
  "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/",
  "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/ace.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/ext-beautify.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/ext-language_tools.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/ext-searchbox.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-assembly_x86.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-c_cpp.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-csharp.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-css.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-dart.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-golang.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-html.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-java.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-javascript.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-json.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-kotlin.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-lua.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-markdown.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-php.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-powershell.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-python.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-r.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-ruby.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-rust.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-scala.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-sh.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-sql.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-svg.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-swift.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-typescript.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-xml.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/mode-yaml.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/theme-cobalt.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/theme-dracula.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/theme-github_dark.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/theme-gruvbox.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/theme-monokai.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/theme-one_dark.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/theme-terminal.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/theme-tomorrow_night.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/theme-twilight.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.9/beautify-css.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.9/beautify-html.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.9/beautify.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/marked/9.1.6/marked.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await Promise.allSettled(SHELL.map(u => cache.add(u)));
    // Prime the CDN libraries. Failure of one optional library must not break installation.
    await Promise.allSettled(REMOTE_ASSETS.map(async url => {
      try {
        const r = await fetch(url, {mode:'cors', cache:'no-cache'});
        if (r && (r.ok || r.type === 'opaque')) await cache.put(url, r);
      } catch (_) {}
    }));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const cached = await cache.match(req, {ignoreSearch:false});
    if (cached) {
      // Refresh remote resources in the background while serving instantly.
      if (new URL(req.url).origin !== location.origin) {
        fetch(req).then(r => {
          if (r && (r.ok || r.type === 'opaque')) cache.put(req, r.clone());
        }).catch(()=>{});
      }
      return cached;
    }
    try {
      const response = await fetch(req);
      if (response && (response.ok || response.type === 'opaque')) {
        cache.put(req, response.clone()).catch(()=>{});
      }
      return response;
    } catch (_) {
      if (req.mode === 'navigate') {
        return cache.match('./index.html');
      }
      return new Response('Offline — resource is not cached yet.', {
        status: 503, headers: {'Content-Type':'text/plain;charset=utf-8'}
      });
    }
  })());
});
