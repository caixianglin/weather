if (!self.define) {
  let e,
    n = {};
  const t = (t, s) => (
    (t = new URL(t + '.js', s).href),
    n[t] ||
      new Promise((n) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = t), (e.onload = n), document.head.appendChild(e);
        } else (e = t), importScripts(t), n();
      }).then(() => {
        let e = n[t];
        if (!e) throw new Error(`Module ${t} didn’t register its module`);
        return e;
      })
  );
  self.define = (s, c) => {
    const a =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (n[a]) return;
    let i = {};
    const r = (e) => t(e, a),
      o = { module: { uri: a }, exports: i, require: r };
    n[a] = Promise.all(s.map((e) => o[e] || r(e))).then((e) => (c(...e), i));
  };
}
define(['./workbox-b6c1ab40'], function (e) {
  'use strict';
  e.setCacheNameDetails({ prefix: 'weeather-pwa' }),
    self.skipWaiting(),
    e.clientsClaim(),
    e.registerRoute(
      /^https:\/\/restapi.amap\.com\//,
      new e.StaleWhileRevalidate({
        cacheName: 'cached-map-api',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 600 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/api.openweathermap\.org\//,
      new e.StaleWhileRevalidate({
        cacheName: 'cached-weather-api',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 600 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(css|js|png)$/i,
      new e.CacheFirst({
        cacheName: 'static-cache',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 20, maxAgeSeconds: 600 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\//i,
      new e.NetworkFirst({
        cacheName: 'html-cache',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 20, maxAgeSeconds: 600 }),
          new e.CacheableResponsePlugin({ statuses: [0, 200] }),
        ],
      }),
      'GET',
    );
});
