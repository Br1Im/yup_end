// Minimal offline-shell service worker for YUP.
// Strategy:
//   - Pre-cache the public shell (icons, manifest) on install.
//   - Network-first for navigations (HTML), falling back to the cached
//     last-good HTML so /lk still opens offline once it has been visited.
//   - Cache-first for /_next/static (immutable, hashed) and same-origin
//     image/font requests.
// Skip caching for cross-origin and POST/PUT/etc.

const VERSION = "yup-v1";
const SHELL_CACHE = `${VERSION}-shell`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

const SHELL_ASSETS = [
  "/icon.svg",
  "/icon-mask.svg",
  "/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      try {
        await cache.addAll(SHELL_ASSETS);
      } catch {
        // Asset list shouldn't fail in prod, but never block install.
      }
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== SHELL_CACHE && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // HTML navigations: network-first with cache fallback.
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(req, fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match(req);
          if (cached) return cached;
          const fallback = await caches.match("/lk");
          if (fallback) return fallback;
          return new Response("Offline", {
            status: 503,
            statusText: "Offline",
          });
        }
      })(),
    );
    return;
  }

  // Hashed static assets: cache-first.
  if (
    url.pathname.startsWith("/_next/static/") ||
    /\.(svg|png|jpg|jpeg|webp|woff2?)$/i.test(url.pathname)
  ) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(req);
        if (cached) return cached;
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(req, fresh.clone());
          return fresh;
        } catch {
          return cached ?? Response.error();
        }
      })(),
    );
  }
});
