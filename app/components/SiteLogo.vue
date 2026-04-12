<script setup lang="ts">
defineProps<{
  variant?: 'light' | 'dark'
}>()
</script>

<template>
  <a
    href="/"
    class="group flex items-center gap-3 no-underline"
    aria-label="Puro Muro - Inicio"
  >
    <!-- Accent bar -->
    <span class="block w-1 h-10 bg-brick group-hover:bg-orange transition-colors" aria-hidden="true" />
    <span
      class="font-heading text-xl font-black leading-[0.85] tracking-tight"
      :class="variant === 'light' ? 'text-warm-white' : 'text-ink'"
    >
      <span class="block">PURO</span>
      <span class="block">MURO</span>
    </span>
  </a>
</template>
