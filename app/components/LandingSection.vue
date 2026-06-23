<script setup lang="ts">
const props = defineProps<{
  sectionId: string;
  bg: 'warm-white' | 'ink' | 'navy';
  index: string;
  label: string;
}>();

const isDark = computed(() => props.bg !== 'warm-white');

const bgClass = computed(
  () =>
    ({
      'warm-white': 'bg-warm-white',
      ink: 'bg-ink',
      navy: 'bg-navy',
    })[props.bg],
);

const markerText = computed(() =>
  isDark.value ? 'text-warm-white/40' : 'text-ink/40',
);
const markerDivider = computed(() =>
  isDark.value ? 'bg-warm-white/20' : 'bg-ink/20',
);
</script>

<template>
  <section :id="sectionId" class="py-20 md:py-32" :class="bgClass">
    <div class="px-6 md:px-10">
      <!-- Section marker -->
      <div class="flex items-center gap-4 mb-12 md:mb-16">
        <span class="label-mono" :class="markerText">{{ index }}</span>
        <div class="h-[2px] w-12" :class="markerDivider" aria-hidden="true" />
        <span class="label-mono" :class="markerText">{{ label }}</span>
      </div>

      <slot />
    </div>
  </section>
</template>
