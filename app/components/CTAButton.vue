<script setup lang="ts">
import { NuxtLink } from '#components';

const props = defineProps<{
  to?: string;
}>();

const Component = computed(() => {
  return props.to ? NuxtLink : 'button';
});
</script>

<template>
  <component
    class="cursor-pointer inline-block bg-brick text-white font-heading text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 hover:bg-orange [--drip-color:var(--color-brick)] hover:[--drip-color:var(--color-orange)] transition-colors no-underline rounded-md"
  >
    <slot />
  </component>
</template>
