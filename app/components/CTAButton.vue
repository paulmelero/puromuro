<script setup lang="ts">
defineProps<{
  to?: string;
}>();

const classes =
  'cursor-pointer inline-block bg-brick text-white font-heading text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 hover:bg-orange [--drip-color:var(--color-brick)] hover:[--drip-color:var(--color-orange)] transition-colors no-underline rounded-md';
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else :class="classes">
    <slot />
  </button>
</template>
