<script setup lang="ts">
const props = defineProps<{
  heroRef: HTMLElement | null;
}>();

const useEl = ref<SVGUseElement | null>(null);
const spriteHtml = ref('');

const { x, y, isVisible } = useBrickAnimation(
  toRef(props, 'heroRef'),
  // Direct DOM update — bypasses Vue reactivity for flicker-free frame switching
  (frame) => {
    useEl.value?.setAttribute('href', `#brick-frame-${frame}`);
  },
);

onMounted(async () => {
  try {
    const res = await fetch('/images/uploads/design/pm_ladrillo_sprite.svg');
    spriteHtml.value = await res.text();
  } catch {
    // Sprite unavailable — animation won't show
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

  <Transition name="brick-fade">
    <div
      v-show="isVisible"
      class="absolute pointer-events-none z-[5]"
      :style="{
        left: 0,
        top: 0,
        willChange: 'transform',
        transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
      }"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 251.92 213.34"
        width="150"
        height="127"
        style="fill: currentColor; color: rgba(245, 240, 235, 0.65)"
      >
        <use ref="useEl" href="#brick-frame-0" />
      </svg>
    </div>
  </Transition>
</template>

<style scoped>
.brick-fade-enter-active,
.brick-fade-leave-active {
  transition: opacity 0.3s ease;
}
.brick-fade-enter-from,
.brick-fade-leave-to {
  opacity: 0;
}
</style>
