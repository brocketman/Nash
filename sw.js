// Simple service worker to cache key assets for offline use
const CACHE_NAME = "nashville-birthday-itinerary-v1";
const toCache = [
  "./index.html",
  "./manifest.json",
  "./party-icon-192.png",
  "./party-icon-512.png",
  // Add CSS, JS, or font files here if needed (e.g. "./style.css")
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(toCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
