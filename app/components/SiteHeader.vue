<script setup lang="ts">
const navLinks = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto', href: '#contacto' },
]

const mobileMenuOpen = ref(false)
</script>

<template>
  <header class="navbar bg-primary text-primary-content sticky top-0 z-50 shadow-lg">
    <div class="navbar-start">
      <SiteLogo variant="light" />
    </div>

    <!-- Desktop nav -->
    <nav class="navbar-end hidden lg:flex">
      <ul class="menu menu-horizontal gap-1">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            class="font-heading text-sm tracking-wider text-primary-content/80 hover:text-accent transition-colors"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </nav>

    <!-- Mobile hamburger -->
    <div class="navbar-end lg:hidden">
      <button
        class="btn btn-ghost btn-square"
        aria-label="Abrir menú"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <Icon name="lucide:menu" size="24" />
      </button>
    </div>

    <!-- Mobile menu -->
    <Teleport to="body">
      <Transition name="slide">
        <div
          v-if="mobileMenuOpen"
          class="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center gap-8"
        >
          <button
            class="absolute top-4 right-4 btn btn-ghost btn-square text-primary-content"
            aria-label="Cerrar menú"
            @click="mobileMenuOpen = false"
          >
            <Icon name="lucide:x" size="28" />
          </button>
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="font-heading text-2xl tracking-widest text-primary-content hover:text-accent transition-colors"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </a>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
