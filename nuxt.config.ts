// https://nuxt.com/docs/api/configuration/nuxt-config

import wasm from 'vite-plugin-wasm';

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2025-07-20',
  css: ['~/assets/css/main.css'],
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  routeRules: {
    '/': { prerender: true },
  },
  vite: {
    optimizeDeps: {
      include: [],
    },
    plugins: [wasm()],
  },
  experimental: {
    inlineRouteRules: true,
    granularCachedData: true,
  },
  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },

  // Modules
  fonts: {
    provider: 'google',
  },
});
