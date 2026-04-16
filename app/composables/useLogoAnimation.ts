import { onMounted, onUnmounted } from 'vue';

const FRAME_COUNT = 39;
const FPS = 12;
const CYCLE_DURATION_MS = (FRAME_COUNT / FPS) * 1000; // ~3250 ms per cycle
const LOOP_DELAY_MS = 1500; // pause at frame 0 between cycles

// Cubic bezier control points — tweak to taste
// (0.42, 0, 0.58, 1) = CSS ease-in-out: slow start, fast middle, slow end
const BEZIER = [0.42, 0, 0.58, 1] as const;

/**
 * Cubic bezier solver — same math as CSS `cubic-bezier()`.
 * Returns a function f(x) → y for x in [0, 1].
 */
function makeCubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const derivX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  function solveX(x: number): number {
    // Newton's method, binary search as fallback
    let t = x;
    for (let i = 0; i < 8; i++) {
      const dx = sampleX(t) - x;
      if (Math.abs(dx) < 1e-7) return t;
      const d = derivX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= dx / d;
    }
    let lo = 0;
    let hi = 1;
    t = x;
    for (let i = 0; i < 20; i++) {
      const sx = sampleX(t);
      if (Math.abs(sx - x) < 1e-7) break;
      if (x > sx) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return t;
  }

  return (x: number) => sampleY(solveX(x));
}

const ease = makeCubicBezier(...BEZIER);

/**
 * Drives a looping frame animation for the Puro Muro logo sprite.
 *
 * - Each cycle runs for CYCLE_DURATION_MS; frame index is derived from
 *   cycle progress mapped through a cubic bezier (not a fixed FPS clock)
 * - Pauses for LOOP_DELAY_MS between each full cycle
 * - No-ops if prefers-reduced-motion is set (stays on frame 0)
 * - SSR-safe: all browser APIs called inside onMounted
 */
export function useLogoAnimation(onFrame: (frame: number) => void) {
  let rafId = 0;
  let cycleStart = -1;
  let pauseUntil = 0;
  let lastFrame = -1;

  function loop(time: number) {
    rafId = requestAnimationFrame(loop);

    // In delay period — hold on frame 0 until the pause expires
    if (pauseUntil > 0 && time < pauseUntil) return;
    pauseUntil = 0;

    if (cycleStart < 0) cycleStart = time;

    const progress = Math.min((time - cycleStart) / CYCLE_DURATION_MS, 1);
    const frame = Math.min(
      Math.floor(ease(progress) * FRAME_COUNT),
      FRAME_COUNT - 1,
    );

    // Only fire the callback when the frame actually changes
    if (frame !== lastFrame) {
      lastFrame = frame;
      onFrame(frame);
    }

    if (progress >= 1) {
      // Cycle complete — reset for next cycle
      cycleStart = -1;
      lastFrame = -1;
      pauseUntil = time + LOOP_DELAY_MS;
    }
  }

  onMounted(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reducedMotion) return;
    rafId = requestAnimationFrame(loop);
  });

  onUnmounted(() => {
    cancelAnimationFrame(rafId);
  });
}
