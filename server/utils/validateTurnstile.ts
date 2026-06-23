import type { H3Event } from 'h3';

export async function validateTurnstile(
  event: H3Event,
  token: string,
): Promise<boolean> {
  if (!token) return false;
  const config = useRuntimeConfig(event);
  try {
    const res = await $fetch<{ success: boolean }>(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: {
          secret: config.turnstile.secretKey,
          response: token,
          remoteip: getHeader(event, 'CF-Connecting-IP'),
        },
      },
    );
    return res.success === true;
  } catch (e) {
    // A siteverify network hiccup must surface as the Spanish 422 in the
    // handler, not an uncaught generic 500 — so swallow and treat as unverified.
    console.error('[Contact] Turnstile siteverify error', e);
    return false;
  }
}
