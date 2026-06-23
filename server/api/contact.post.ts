export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { nombre, email, telefono, mensaje } = body;
  const token = body.token || body['cf-turnstile-response'];

  if (!nombre || !email || !mensaje) {
    throw createError({
      statusCode: 400,
      message: 'Los campos nombre, email y mensaje son obligatorios.',
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({
      statusCode: 400,
      message: 'El formato del email no es válido.',
    });
  }

  if (!(await validateTurnstile(event, token))) {
    throw createError({
      statusCode: 422,
      message:
        'No se pudo verificar que no eres un robot. Recarga e inténtalo de nuevo.',
    });
  }

  try {
    await sendContactEmail(event, { nombre, email, telefono, mensaje });
  } catch (e) {
    console.error('[Contact] Resend error', e);
    throw createError({
      statusCode: 502,
      message: 'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.',
    });
  }

  return { success: true, message: 'Mensaje enviado correctamente.' };
});
