<script setup lang="ts">
defineProps<{
  variant?: 'light' | 'dark';
}>();
</script>

<template>
  <a
    href="/"
    class="flex items-center gap-2 no-underline"
    aria-label="Puro Muro - Inicio"
  >
    <span
      class="font-heading text-2xl font-black leading-none tracking-tight"
      :class="variant === 'light' ? 'text-white' : 'text-base-content'"
    >
      <span class="block">PURO</span>
      <span class="block">MURO</span>
    </span>
  </a>
</template>
