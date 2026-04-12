export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { nombre, email, mensaje } = body

  if (!nombre || !email || !mensaje) {
    throw createError({
      statusCode: 400,
      message: 'Los campos nombre, email y mensaje son obligatorios.',
    })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({
      statusCode: 400,
      message: 'El formato del email no es válido.',
    })
  }

  // TODO: Integrate with email service (Resend, SendGrid, etc.)
  // For now, log the contact submission
  console.log('[Contact Form]', { nombre, email, telefono: body.telefono, mensaje })

  return { success: true, message: 'Mensaje recibido correctamente.' }
})
