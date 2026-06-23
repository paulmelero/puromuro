# Puromuro

## Arquitectura

La página está construida con Nuxt 4 y se despliega en Cloudflare Workers.

### Contacto

El formulario de contacto usa Turnstile para evitar spam y Resend para enviar los emails.

- Turnstile: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/
- Resend: https://resend.com/

Las API keys se almacenan en el archivo `.env` en local y se almacenan como secretos en Cloudflare.

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
- [ ] Contact page
- [ ] Contact form
- [ ] CMS setup
