<script setup lang="ts">
const url = 'https://www.puromuro.com/contacto';

useSeoMeta({
  title: 'Contacto | Puro Muro',
  description:
    'Ponte en contacto con Puro Muro. Cuéntanos tu proyecto de pintura mural o arte urbano y te responderemos lo antes posible.',
  ogTitle: 'Contacto | Puro Muro',
  ogDescription:
    'Ponte en contacto con Puro Muro. Cuéntanos tu proyecto de pintura mural o arte urbano.',
  ogUrl: url,
  ogType: 'website',
});

useHead({
  link: [{ rel: 'canonical', href: url }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Puro Muro',
        url: 'https://www.puromuro.com',
        image: 'https://www.puromuro.com/images/cover.jpg',
        email: 'puromuromurales@gmail.com',
        telephone: '+34661495182',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Calle Valle de Broto 6',
          addressLocality: 'Zaragoza',
          postalCode: '50015',
          addressCountry: 'ES',
        },
        sameAs: ['https://instagram.com/puromuromurales'],
      }),
    },
  ],
});
</script>

<template>
  <section class="bg-navy px-6 md:px-10 pt-32 md:pt-40 pb-20 md:pb-32">
    <h1 class="sr-only">Contacto</h1>
    <ContactForm />
  </section>
</template>
