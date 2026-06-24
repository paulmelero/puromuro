# Puromuro

## Arquitectura

La página está construida con Nuxt 4 y se despliega en Cloudflare Workers.

### Contacto

El formulario de contacto usa Turnstile para evitar spam y Resend para enviar los emails.

- Turnstile: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/
- Resend: https://resend.com/

Las API keys se almacenan en el archivo `.env` en local y se almacenan como secretos en Cloudflare.

### CMS - Edición de contenido

El contenido se edita en Nuxt Studio, que permite editar el contenido desde un panel de control en la propia aplicación y ver los cambios en tiempo real.

- Nuxt Studio: https://nuxt.studio/

Las credenciales se almacenan en el archivo `.env` en local y se almacenan como secretos en Cloudflare.

De momento, solo pueden editar el contenido ciertos usuarios. El email de los usuarios autorizados se configura como variable de entorno en Cloudflare en la variable `STUDIO_GITHUB_MODERATORS`. Ver documentación:

- https://nuxt.studio/auth-providers#access-control-with-moderators

---

## TODO

- [x] Typography
- [x] Colors
- [x] Animated logo
- [x] Animated brick
- [x] Services..
- [x] Splashes
- [x] Gallery
- [x] Basic SEO

---

- [x] Google maps docs
- [ ] Works page
- [ ] New gallery layout with CTA
- [x] Contact page
- [x] Contact form
- [x] CMS setup
