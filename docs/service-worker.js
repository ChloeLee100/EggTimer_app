const CACHE_NAME = "egg-timer-cache-v1";
const urlsToCache = [
  "index.html",
  "choice.html",
  "timer.html",
  "timerEnd.html",
  "style.css",
  "timer.js",
  "../images/softBoiled.PNG",
  "../images/hardBoiled.PNG",
  "../images/runnyYolk.PNG",
  "../images/overCooked.PNG",
  "../images/best.PNG",
  "../images/icon.icns",
  "../images/alarm.way"
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
