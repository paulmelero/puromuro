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
    'nuxt-studio',
  ],
  devtools: { enabled: true },

  // Nuxt Studio — in-app CMS at /_studio. Editors log in with GitHub and
  // commits land on paulmelero/puromuro; Cloudflare auto-builds on push.
  // Credentials come from env STUDIO_GITHUB_CLIENT_ID / STUDIO_GITHUB_CLIENT_SECRET
  // (v1.7.0 reads these exact names) — set as Cloudflare secrets in prod, .env in dev.
  studio: {
    repository: {
      provider: 'github',
      owner: 'paulmelero',
      repo: 'puromuro',
      branch: 'main',
      private: false,
    },
    i18n: {
      defaultLocale: 'es',
    },
    route: '/admin',
  },
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
