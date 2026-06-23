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
  runtimeConfig: {
    turnstile: {
      secretKey: process.env.TURNSTILE_SECRET_KEY,
    },
    resend: {
      apiKey: process.env.RESEND_API_KEY,
    },
    public: {
      turnstileSiteKey: process.env.TURNSTILE_SITE_KEY,
    },
  },
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
