import { defineConfig } from 'umi';
const { GenerateSW } = require('workbox-webpack-plugin');

const repo = process.env.NODE_ENV === 'development' ? '/' : '/weather/';

const mfsu =
  process.env.NODE_ENV === 'development'
    ? {}
    : { production: { output: '.mfsu-production' } };
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/Home' },
    { path: '/detail', component: '@/pages/Detail' },
  ],
  fastRefresh: {},
  history: {
    type: 'hash',
  },
  outputPath: 'docs',
  base: `${repo}`,
  publicPath: `${repo}`,
  webpack5: {},
  chainWebpack(config) {
    config.module
      .rule('ttf')
      .test(/.(woff|eot|woff2|ttf)$/)
      .use('file-loader')
      .loader('file-loader');

    config.plugin('workbox').use(GenerateSW, [
      {
        cacheId: 'webpack-pwa',
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        swDest: 'weather-service-worker.js',
        include: ['**/*.{html,js,css,png,jpg,ttf}'],
        exclude: ['service-worker.js'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/restapi.amap\.com\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'cached-map-api',
              networkTimeoutSeconds: 6,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 10 * 60, // 10 minutes
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/api.openweathermap\.org\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'cached-weather-api',
              networkTimeoutSeconds: 6,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 10 * 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /.*\.js.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'seed-js',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 10 * 60,
              },
            },
          },
          {
            urlPattern: /\//i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'seed-html',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 10 * 60,
              },
            },
          },
          {
            urlPattern: /.*css.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'seed-css',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 10 * 60,
              },
            },
          },
          {
            urlPattern: /.*(png|svga).*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'seed-image',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 10 * 60,
              },
            },
          },
        ],
      },
    ]);
  },
});
