<template>
  <footer class="bg-neutral text-neutral-content py-12">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <SiteLogo variant="light" />

        <p class="text-sm text-neutral-content/60">
          &copy; {{ new Date().getFullYear() }} Puro Muro &mdash; Pintura Mural. Todos los derechos reservados.
        </p>

        <div class="flex gap-4">
          <a
            href="#"
            class="btn btn-ghost btn-circle btn-sm text-neutral-content/60 hover:text-accent"
            aria-label="Instagram"
          >
            <Icon name="lucide:instagram" size="20" />
          </a>
          <a
            href="#"
            class="btn btn-ghost btn-circle btn-sm text-neutral-content/60 hover:text-accent"
            aria-label="Facebook"
          >
            <Icon name="lucide:facebook" size="20" />
          </a>
          <a
            href="mailto:info@puromuro.com"
            class="btn btn-ghost btn-circle btn-sm text-neutral-content/60 hover:text-accent"
            aria-label="Email"
          >
            <Icon name="lucide:mail" size="20" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
