<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    color?: 'brick' | 'orange'
    droplets?: number
    storageKey: string
    seed?: number
    baseDelay?: number
  }>(),
  {
    width: '6rem',
    height: '8px',
    color: 'brick',
    droplets: 3,
    seed: 42,
    baseDelay: 0,
  },
)

function createRng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

// Brush stroke path variants — hand-crafted organic edges
const strokeVariants = [
  {
    main: 'M1,4 C8,1.5 18,0.8 35,1.2 C55,1.8 70,0.4 95,0.8 C115,1.2 130,0.2 155,0.6 C175,1.1 188,0.3 198,1 L199,1.5 L199,9.5 C192,10.5 180,11.2 160,10.4 C140,9.6 125,11 105,10.6 C85,10.1 65,11.4 45,10.8 C28,10.2 12,11.5 3,10.8 L1,10.2 Z',
    overlay: 'M8,4.5 C22,3.2 40,2.5 65,3.5 C85,4.2 105,2.8 125,3.8 C145,4.5 165,3 185,3.8 L194,4 L192,8.5 C172,9.5 152,8 132,9 C112,9.8 92,8.2 72,9 C52,9.6 32,8.2 14,9 L6,8.5 Z',
  },
  {
    main: 'M2,3.5 C12,0.8 28,1.5 48,0.6 C68,0 88,1.8 108,0.8 C128,0 150,1.5 170,0.5 C185,0.2 195,1.2 199,2 L199,10 C190,11.5 175,10.2 155,11 C135,11.5 115,10 95,11.2 C75,11.8 55,10.2 35,11 C18,11.5 6,10.5 1,10.8 L1,4 Z',
    overlay: 'M10,4 C30,2.8 50,3.8 75,3 C95,2.5 115,4 135,3.2 C155,2.5 175,4 190,3.5 L193,4.2 L190,9 C170,10 150,8.5 130,9.5 C110,10.2 90,8.8 70,9.5 C50,10 30,8.8 12,9.5 L8,9 Z',
  },
  {
    main: 'M0,3 C10,1 22,0.5 40,1.2 C60,2 80,0.5 100,1 C120,1.5 145,0.3 165,0.8 C180,1.2 192,0.5 200,1.5 L200,10.5 C195,11 182,11.5 165,10.5 C145,9.8 120,11 100,10.5 C80,10 60,11.5 40,10.8 C22,10 8,11.2 0,10 Z',
    overlay: 'M5,4 C20,3 38,2.5 58,3.5 C78,4.2 98,3 118,3.8 C138,4.3 160,3 180,4 L195,3.5 L192,8.8 C175,9.5 155,8.5 135,9.2 C115,9.8 95,8.5 75,9.2 C55,9.8 35,8.5 15,9.5 L3,9 Z',
  },
]

const rng = createRng(props.seed)
const variantIndex = Math.floor(rng() * strokeVariants.length)
const strokePaths = strokeVariants[variantIndex]!

const resolvedColor = computed(() =>
  props.color === 'orange' ? 'var(--color-orange)' : 'var(--color-brick)',
)
</script>

<template>
  <div
    class="relative"
    :style="{ width }"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      class="block w-full"
      :style="{ height }"
    >
      <path :d="strokePaths.main" :fill="resolvedColor" />
      <path :d="strokePaths.overlay" :fill="resolvedColor" opacity="0.35" />
    </svg>

    <PaintDrips
      v-if="droplets > 0"
      :storage-key="storageKey"
      :color="color"
      :count="droplets"
      :seed="seed"
      :base-delay="baseDelay"
    />
  </div>
</template>
