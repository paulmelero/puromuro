<script setup lang="ts">
const navLinks = [
  { label: 'Inicio', href: '#' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto', href: '#contacto' },
];

const mobileMenuOpen = ref(false);

function onLinkClick(href: string) {
  if (href === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-warm-white border-b-[3px] border-ink"
  >
    <div class="flex items-center justify-between px-6 md:px-10 h-16">
      <!-- Logo -->
      <NuxtLink to="/" class="block" aria-label="Puro Muro - Inicio">
        <BrandLogo variant="brand" :show-subtitle="false" class="h-8" />
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden lg:block">
        <ul class="flex items-center gap-0">
          <li
            v-for="(link, i) in navLinks"
            :key="link.href"
            class="flex items-center"
          >
            <span
              v-if="i > 0"
              class="text-warm-300 mx-4 select-none"
              aria-hidden="true"
              >/</span
            >
            <NuxtLink
              :to="link.href"
              @click="onLinkClick(link.href)"
              class="font-heading text-xs font-bold tracking-[0.15em] text-ink hover:text-brick transition-colors no-underline uppercase"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Mobile hamburger -->
      <button
        class="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
        aria-label="Abrir menú"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <span
          class="block w-6 h-[3px] bg-ink transition-transform"
          :class="{ 'rotate-45 translate-y-[8px]': mobileMenuOpen }"
        />
        <span
          class="block w-6 h-[3px] bg-ink transition-opacity"
          :class="{ 'opacity-0': mobileMenuOpen }"
        />
        <span
          class="block w-6 h-[3px] bg-ink transition-transform"
          :class="{ '-rotate-45 -translate-y-[8px]': mobileMenuOpen }"
        />
      </button>
    </div>

    <!-- Mobile menu -->
    <Teleport to="body">
      <Transition name="menu">
        <div
          v-if="mobileMenuOpen"
          class="fixed inset-0 z-100 bg-navy flex flex-col items-start justify-center pl-10 gap-2"
        >
          <button
            class="absolute top-5 right-6 flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            aria-label="Cerrar menú"
            @click="mobileMenuOpen = false"
          >
            <span
              class="block w-6 h-[3px] bg-warm-white rotate-45 translate-y-[4px]"
            />
            <span
              class="block w-6 h-[3px] bg-warm-white -rotate-45 -translate-y-[4px]"
            />
          </button>

          <!-- Section marker -->
          <span class="label-mono text-warm-white/40 mb-6">Navegación</span>

          <NuxtLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            class="font-heading text-5xl font-black text-warm-white hover:text-orange transition-colors no-underline uppercase leading-tight"
            @click="
              mobileMenuOpen = false;
              onLinkClick(link.href);
            "
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.25s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>
