var CACHE = 'pf-v5';
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('message', function (e) { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  if (url.pathname.slice(-12) === 'version.json') return;
  var isStatic = /^\/(photos|fonts)\//.test(url.pathname);
  if (isStatic) {
    e.respondWith(caches.open(CACHE).then(function (cache) {
      return cache.match(e.request).then(function (hit) {
        var fetcher = fetch(e.request).then(function (res) {
          if (res.ok) cache.put(e.request, res.clone());
          return res;
        }).catch(function () { return hit; });
        return hit || fetcher;
      });
    }));
  } else {
    e.respondWith(fetch(e.request).catch(function () {
      return caches.match(e.request);
    }));
  }
});
