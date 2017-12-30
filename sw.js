// Version 0.57
let version = '0.57';

self.addEventListener('install', e => {
  let timeStamp = Date.now();
  e.waitUntil(
    caches.open('thinkshell').then(cache => {
      return cache.addAll([
        `/`,
        `/index.html?timestamp=${timeStamp}`,
        `/css/main.css?timestamp=${timeStamp}`,
        `/css/grid.css?timestamp=${timeStamp}`,
        `/js/main.js?timestamp=${timeStamp}`,
        `/js/jquery-3.0.0.min.js?timestamp=${timeStamp}`,
        `/js/realtime-utils.js?timestamp=${timeStamp}`
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
