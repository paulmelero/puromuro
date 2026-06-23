<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>

<template>
  <h2
    class="font-heading text-4xl md:text-6xl font-black leading-[0.9]"
    v-bind="$attrs"
  >
    <slot />
  </h2>
  <slot name="stroke" />
</template>
