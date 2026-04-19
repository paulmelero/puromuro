import { ref, nextTick, onMounted, onUnmounted, type Ref } from 'vue';

const FRAME_COUNT = 72;
const FPS = 12; // 12 fps feels right for a hand-drawn spinning brick
const LERP = 0.1; // exponential ease-out: lower = more lag/smoothness

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getCenterPosition(rect: DOMRect) {
  return { x: rect.width * 0.75, y: rect.height / 2 };
}

/**
 * Manages the spinning brick animation and mouse-follow logic.
 *
 * - Runs only on desktop (pointer: fine) and when prefers-reduced-motion is not set
 * - Always visible by default at section center; follows cursor on hover; springs back on leave
 * - Position uses lerp for smooth non-linear easing
 * - onFrame callback fires on every frame change for direct DOM updates (no Vue reactivity)
 */
export function useBrickAnimation(
  heroRef: Ref<HTMLElement | null>,
  onFrame: (frame: number) => void,
) {
  const x = ref(0);
  const y = ref(0);
  const isVisible = ref(false);

  let targetX = 0;
  let targetY = 0;
  let rafId = 0;
  let lastFrameTime = 0;
  let frame = 0;
  let enabled = false;

  function loop(time: number) {
    rafId = requestAnimationFrame(loop);

    // Advance animation frame at target FPS — fires callback directly, no Vue reactivity
    if (time - lastFrameTime > 1000 / FPS) {
      frame = (frame + 1) % FRAME_COUNT;
      lastFrameTime = time;
      onFrame(frame);
    }

    // Lerp position toward target (exponential ease-out)
    x.value += (targetX - x.value) * LERP;
    y.value += (targetY - y.value) * LERP;
  }

  function onMouseMove(e: MouseEvent) {
    if (!heroRef.value) return;
    const rect = heroRef.value.getBoundingClientRect();
    targetX = clamp(e.clientX - rect.left, rect.width * 0.5, rect.width - 60);
    targetY = clamp(e.clientY - rect.top, 40, rect.height - 60);
  }

  onMounted(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (reducedMotion || !hasFinePointer) return;

    enabled = true;

    // Parent element refs (heroRef) are assigned via queuePostRenderEffect,
    // which runs after child onMounted hooks in the same flush. nextTick defers
    // until after the flush completes, so heroRef.value is guaranteed to be set.
    nextTick(() => {
      const el = heroRef.value;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const center = getCenterPosition(rect);
      x.value = center.x;
      y.value = center.y;
      targetX = center.x;
      targetY = center.y;
      isVisible.value = true;

      el.addEventListener('mousemove', onMouseMove);
      rafId = requestAnimationFrame(loop);
    });
  });

  onUnmounted(() => {
    if (!enabled) return;
    cancelAnimationFrame(rafId);
    const el = heroRef.value;
    el?.removeEventListener('mousemove', onMouseMove);
  });

  return { x, y, isVisible };
}
