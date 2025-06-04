const CACHE_NAME = "egg-timer-cache-v1";
const urlsToCache = [
  "index.html",
  "choice.html",
  "timer.html",
  "timerEnd.html",
  "style.css",
  "timer.js",
  "images/softboiled.png",
  "images/hardboiled.png",
  "images/runnyyolk.png",
  "images/overcooked.png",
  "images/best.png",
  "images/icon.icns",
  "images/alarm.way"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
