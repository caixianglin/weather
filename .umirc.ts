import { defineConfig } from 'umi';
const { GenerateSW } = require('workbox-webpack-plugin');

const path = process.env.NODE_ENV === 'development' ? '/' : '/weather/';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/home/index' },
    { path: '/detail', component: '@/pages/detail/index' },
  ],
  fastRefresh: {},
  history: {
    type: 'hash',
  },
  outputPath: 'docs',
  publicPath: `${path}`,
  webpack5: {},
  chainWebpack(config) {
    config.module
      .rule('ttf')
      .test(/.(woff|eot|woff2|ttf)$/)
      .use('file-loader')
      .loader('file-loader');

    config.plugin('workbox').use(GenerateSW, [
      {
        cacheId: 'weeather-pwa',
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        swDest: 'weather-service-worker.js',
        include: ['**/*.{html,js,css,png,ttf}'],
        exclude: ['service-worker.js'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/restapi.amap\.com\//,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'cached-map-api',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 10 * 60, // 10 minutes
              },
            },
          },
          {
            urlPattern: /^https:\/\/api.openweathermap\.org\//,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'cached-weather-api',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 10 * 60,
              },
            },
          },
          {
            urlPattern: /\.(css|js)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 10 * 60,
              },
            },
          },
          {
            urlPattern: /\.png$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 10 * 60,
              },
            },
          },
          {
            urlPattern: /\//i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 10 * 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    ]);
  },
});
