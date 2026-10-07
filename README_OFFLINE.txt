CODE305 ULTRA — OFFLINE / PWA PACKAGE
=======================================

This package upgrades the supplied Code305 Ultra HTML editor with:
• Real same-origin PWA service worker (instead of a Blob service worker)
• Offline-first caching of the application shell and CDN dependencies
• Installable standalone app experience on supported browsers
• Mobile install prompt / iOS Add to Home Screen guidance
• Local PWA manifest + 192/512 icons
• Local launcher scripts for desktop
• Existing multi-language editors, project manager, import/download center,
  console, live preview, settings, themes, shortcuts and ZIP export preserved
• Remote runtime dependencies are automatically cached on first online launch,
  including Pyodide resources when Python is first executed

IMPORTANT BROWSER LIMITATION
----------------------------
A normal browser cannot install a PWA or run a service worker directly from
file://index.html. For the app-install/offline features, serve this folder from
localhost or HTTPS.

DESKTOP QUICK START
-------------------
Windows:
  Double-click start-windows.bat

macOS / Linux:
  Run: ./start-linux-macos.sh

Then open:
  http://127.0.0.1:8765/

FIRST LAUNCH
------------
The first launch should be online so the browser can cache the Ace editor and
other external runtime libraries. After the cache is populated, the editor is
designed to continue working offline.

INSTALL
-------
When supported, use the Install button shown by the app. Otherwise use your
browser's menu → Install app / Add to Home Screen.

100% OFFLINE NOTE
-----------------
The application shell and runtime libraries are cacheable, but browser
security prevents a fresh PWA installation from an arbitrary file:// URL.
Also, some language runtimes (for example Python/Pyodide) are downloaded the
first time they are used and then cached. Therefore "100% offline" is
achieved after the initial dependency-cache step, not from a cold ZIP opened
directly with no prior cache.
