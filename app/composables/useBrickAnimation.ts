import { ref, onMounted, onUnmounted, type Ref } from 'vue';

const FRAME_COUNT = 72;
const FPS = 12; // 12 fps feels right for a hand-drawn spinning brick
const LERP = 0.1; // exponential ease-out: lower = more lag/smoothness

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Manages the spinning brick animation and mouse-follow logic.
 *
 * - Runs only on desktop (pointer: fine) and when prefers-reduced-motion is not set
 * - The brick is constrained to the right half of the hero section
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
  let started = false;
  let enabled = false;

  function constrainToZone(clientX: number, clientY: number, rect: DOMRect) {
    return {
      x: clamp(clientX - rect.left, rect.width * 0.5, rect.width - 60),
      y: clamp(clientY - rect.top, 40, rect.height - 60),
    };
  }

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
    const relX = e.clientX - rect.left;

    // Only show when mouse is in the right half of the hero
    if (relX < rect.width * 0.5) {
      if (isVisible.value) isVisible.value = false;
      return;
    }

    const pos = constrainToZone(e.clientX, e.clientY, rect);
    targetX = pos.x;
    targetY = pos.y;

    if (!isVisible.value) isVisible.value = true;
  }

  function onMouseEnter(e: MouseEvent) {
    if (!heroRef.value) return;
    const rect = heroRef.value.getBoundingClientRect();
    const relX = e.clientX - rect.left;

    if (relX >= rect.width * 0.5) {
      const pos = constrainToZone(e.clientX, e.clientY, rect);
      // Snap to position immediately — no lerp lag on first entry
      x.value = pos.x;
      y.value = pos.y;
      targetX = pos.x;
      targetY = pos.y;
      isVisible.value = true;
    }

    // Start the rAF loop once and keep it running (brick stays spinning after leave)
    if (!started) {
      started = true;
      rafId = requestAnimationFrame(loop);
    }
  }

  // No onMouseLeave: brick stays visible at its last position when the mouse leaves the section

  onMounted(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (reducedMotion || !hasFinePointer) return;

    enabled = true;
    const el = heroRef.value;
    el?.addEventListener('mousemove', onMouseMove);
    el?.addEventListener('mouseenter', onMouseEnter);
  });

  onUnmounted(() => {
    if (!enabled) return;
    cancelAnimationFrame(rafId);
    const el = heroRef.value;
    el?.removeEventListener('mousemove', onMouseMove);
    el?.removeEventListener('mouseenter', onMouseEnter);
  });

  return { x, y, isVisible };
}
