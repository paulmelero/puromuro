<script setup lang="ts">
useHead({
  title: 'Puro Muro',
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/images/favicon/favicon-96x96.png',
      sizes: '96x96',
    },
    { rel: 'icon', type: 'image/svg+xml', href: '/images/favicon/favicon.svg' },
    { rel: 'shortcut icon', href: '/images/favicon/favicon.ico' },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/images/favicon/apple-touch-icon.png',
    },
    { rel: 'manifest', href: '/images/favicon/site.webmanifest' },
  ],
  meta: [
    {
      name: 'description',
      content:
        'Puro Muro es un colectivo de arte urbano que se dedica a la pintura mural y el arte urbano.',
    },
    { name: 'apple-mobile-web-app-title', content: 'Puro Muro' },
    { name: 'og:title', content: 'Puro Muro' },
    {
      name: 'og:description',
      content:
        'Puro Muro es un colectivo de arte urbano que se dedica a la pintura mural y el arte urbano.',
    },
    { name: 'og:url', content: 'https://www.puromuro.com' },
    { name: 'og:type', content: 'website' },
    { name: 'og:locale', content: 'es_ES' },
    { name: 'og:site_name', content: 'Puro Muro' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'og:image', content: 'https://www.puromuro.com/images/cover.jpg' },
    {
      name: 'twitter:image',
      content: 'https://www.puromuro.com/images/cover.jpg',
    },
    { name: 'twitter:image:alt', content: 'Puro Muro' },
    { name: 'instagram:card', content: 'summary_large_image' },
    { name: 'instagram:title', content: 'Puro Muro' },
    {
      name: 'instagram:description',
      content:
        'Puro Muro es un colectivo de arte urbano que se dedica a la pintura mural y el arte urbano.',
    },
    {
      name: 'instagram:image',
      content: 'https://www.puromuro.com/images/cover.jpg',
    },
    { name: 'instagram:image:alt', content: 'Puro Muro' },
    { name: 'instagram:url', content: 'https://www.puromuro.com' },
    { name: 'instagram:type', content: 'website' },
    { name: 'instagram:locale', content: 'es_ES' },
    { name: 'instagram:site_name', content: 'Puro Muro' },
  ],
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <SiteHeader />
  <main>
    <NuxtPage />
  </main>
  <SiteFooter />
</template>
