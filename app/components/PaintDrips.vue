<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: 'brick' | 'orange'
    count?: number
    storageKey: string
    seed?: number
    baseDelay?: number
  }>(),
  {
    color: 'brick',
    count: 3,
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

// Straight-sided drip with rounded bottom cap (viewBox 0 0 8 100)
const dripPath = 'M0,0 L8,0 L8,88 C8,94 6.2,100 4,100 C1.8,100 0,94 0,88 Z'

const resolvedColor = computed(() =>
  props.color === 'orange' ? 'var(--color-orange)' : 'var(--color-brick)',
)

const dripPositions = Array.from({ length: props.count }, (_, i) => {
  const r = createRng(props.seed + i * 137)
  // X position is random each page load
  const x = 10 + Math.random() * 80
  const streakLength = 12 + r() * 12
  const delay = props.baseDelay + i * 300 + r() * 200
  const w = 3.5 + r() * 2.5
  return { x, streakLength, delay, w }
})

const containerRef = ref<HTMLElement | null>(null)
const hasPlayedOnMount = ref(false)
const isVisible = ref(false)

onMounted(() => {
  const key = `puromuro-drip-${props.storageKey}`

  if (sessionStorage.getItem(key)) {
    hasPlayedOnMount.value = true
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting && !isVisible.value) {
        isVisible.value = true
        sessionStorage.setItem(key, '1')
        observer.disconnect()
      }
    },
    { threshold: 0.5 },
  )

  if (containerRef.value) {
    observer.observe(containerRef.value)
  }
})
</script>

<template>
  <div ref="containerRef" class="absolute left-0 w-full top-full pointer-events-none" aria-hidden="true">
    <svg
      v-for="(drip, i) in dripPositions"
      :key="i"
      class="absolute drip"
      :class="{
        'drip--animate': isVisible && !hasPlayedOnMount,
        'drip--static': hasPlayedOnMount,
      }"
      viewBox="0 0 8 100"
      preserveAspectRatio="none"
      :style="{
        left: drip.x + '%',
        top: '-2px',
        width: drip.w + 'px',
        height: drip.streakLength + 'px',
        '--drip-delay': drip.delay + 'ms',
      }"
    >
      <path :d="dripPath" :fill="`var(--drip-color, ${resolvedColor})`" />
    </svg>
  </div>
</template>

<style scoped>
@keyframes drip-reveal {
  0% {
    clip-path: inset(0 0 100% 0 round 0 0 50% 50%);
    opacity: 0;
  }
  3% {
    opacity: 1;
  }
  35% {
    clip-path: inset(0 0 55% 0 round 0 0 50% 50%);
  }
  70% {
    clip-path: inset(0 0 10% 0 round 0 0 50% 50%);
  }
  100% {
    clip-path: inset(0 0 0% 0 round 0 0 50% 50%);
    opacity: 1;
  }
}

.drip--animate {
  clip-path: inset(0 0 100% 0 round 0 0 50% 50%);
  opacity: 0;
  animation: drip-reveal 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: var(--drip-delay, 0ms);
}

.drip--static {
  opacity: 1;
  clip-path: inset(0 0 0% 0 round 0 0 50% 50%);
}

.drip path {
  transition: fill 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
