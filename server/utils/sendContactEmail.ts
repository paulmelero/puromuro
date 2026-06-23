import type { H3Event } from 'h3';

// puromuro.com is verified in Resend, so any @puromuro.com address works as the
// sender identity — no mailbox needs to exist for contacto@.
const FROM = 'Puro Muro <contacto@puromuro.com>';
const TO = 'puromuromurales@gmail.com';

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function sendContactEmail(
  event: H3Event,
  data: { nombre: string; email: string; telefono?: string; mensaje: string },
) {
  const config = useRuntimeConfig(event);
  return $fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.resend.apiKey}` },
    body: {
      from: FROM,
      to: [TO],
      reply_to: data.email,
      subject: `[Web] ${data.nombre}: Nuevo mensaje del formulario de contacto`,
      html: `
        <h2>Nuevo mensaje desde el formulario de contacto de puromuro.com</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(data.nombre)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(data.telefono || '—')}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(data.mensaje).replace(/\n/g, '<br>')}</p>
      `,
    },
  });
}
