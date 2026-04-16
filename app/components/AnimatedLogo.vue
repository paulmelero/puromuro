<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const useEl = ref<SVGUseElement | null>(null);
const spriteHtml = ref('');

useLogoAnimation((frame) => {
  useEl.value?.setAttribute('href', `#logo-frame-${frame}`);
});

onMounted(async () => {
  try {
    const res = await fetch('/images/uploads/design/pm_logo_sprite.svg');
    spriteHtml.value = await res.text();
  } catch {
    // Sprite unavailable — frame 0 stays visible statically
  }
});
</script>

<template>
  <!-- Sprite inlined into the document so <use href="#id"> works without external file flicker -->
  <div
    v-html="spriteHtml"
    style="position: absolute; width: 0; height: 0; overflow: hidden"
    aria-hidden="true"
  />

  <svg
    v-bind="$attrs"
    viewBox="0 0 255.36 107.61"
    style="fill: currentColor; color: var(--color-navy); width: auto"
    aria-label="Puro Muro"
    role="img"
  >
    <use ref="useEl" href="#logo-frame-0" />
  </svg>
</template>
