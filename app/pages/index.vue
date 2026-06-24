<script setup lang="ts">
// Pre-load homepage content once (shared key) so SSR has it and the section
// components below can read it synchronously via useHomeContent().
await useHomeContent();
</script>

<template>
  <div>
    <HeroSection />
    <SectionAbout />
    <SectionGallery />
    <SectionServices />
    <SectionContact />
  </div>
</template>
