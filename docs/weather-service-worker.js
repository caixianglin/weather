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
    const i =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (n[i]) return;
    let a = {};
    const o = (e) => t(e, i),
      r = { module: { uri: i }, exports: a, require: o };
    n[i] = Promise.all(s.map((e) => r[e] || o(e))).then((e) => (c(...e), a));
  };
}
define(['./workbox-44ab555c'], function (e) {
  'use strict';
  e.setCacheNameDetails({ prefix: 'weeather-pwa' }),
    self.skipWaiting(),
    e.clientsClaim(),
    e.registerRoute(
      /^https:\/\/restapi.amap\.com\//,
      new e.NetworkFirst({
        cacheName: 'cached-map-api',
        networkTimeoutSeconds: 6,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 600 }),
          new e.CacheableResponsePlugin({ statuses: [0, 200] }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/api.openweathermap\.org\//,
      new e.NetworkFirst({
        cacheName: 'cached-weather-api',
        networkTimeoutSeconds: 6,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 600 }),
          new e.CacheableResponsePlugin({ statuses: [0, 200] }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(css|js|png|jpg|jpeg|svg|webp)$/i,
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
      new e.CacheFirst({
        cacheName: 'html-cache',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 20, maxAgeSeconds: 600 }),
        ],
      }),
      'GET',
    );
});
