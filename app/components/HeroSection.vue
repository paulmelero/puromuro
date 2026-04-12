<template>
  <section class="relative min-h-screen flex items-center justify-center bg-primary overflow-hidden">
    <!-- Subtle brick texture overlay -->
    <div class="absolute inset-0 opacity-5" aria-hidden="true">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="brick" x="0" y="0" width="60" height="30" patternUnits="userSpaceOnUse">
            <rect width="28" height="13" x="1" y="1" fill="none" stroke="white" stroke-width="0.5" />
            <rect width="28" height="13" x="31" y="1" fill="none" stroke="white" stroke-width="0.5" />
            <rect width="28" height="13" x="-14" y="16" fill="none" stroke="white" stroke-width="0.5" />
            <rect width="28" height="13" x="16" y="16" fill="none" stroke="white" stroke-width="0.5" />
            <rect width="28" height="13" x="46" y="16" fill="none" stroke="white" stroke-width="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#brick)" />
      </svg>
    </div>

    <!-- Content -->
    <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <!-- Logo text -->
      <h1 class="font-heading font-black text-primary-content leading-none mb-6">
        <span class="block text-7xl md:text-9xl tracking-tight">PURO</span>
        <span class="block text-7xl md:text-9xl tracking-tight">MURO</span>
      </h1>

      <!-- Fluid stroke divider -->
      <svg
        class="mx-auto my-8 w-64 md:w-96 h-4 text-accent"
        viewBox="0 0 400 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0 8C40 2 80 14 120 8C160 2 200 14 240 8C280 2 320 14 360 8C380 5 400 8 400 8"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>

      <!-- Tagline -->
      <p class="font-heading text-lg md:text-2xl tracking-[0.2em] text-primary-content/80 mb-4">
        EL MURO ES EL ORIGEN
      </p>

      <!-- Subtitle -->
      <p class="text-primary-content/60 max-w-xl mx-auto mb-10 text-base md:text-lg">
        Colectivo de artistas especializados en pintura mural, graffiti y arte urbano.
        Transformamos espacios con arte que cuenta historias.
      </p>

      <!-- CTA Button -->
      <a
        href="#contacto"
        class="btn btn-accent btn-lg font-heading text-sm tracking-widest uppercase px-10"
      >
        Contactanos
      </a>
    </div>

    <!-- Paint drip decoration -->
    <div class="absolute bottom-0 left-0 right-0" aria-hidden="true">
      <svg
        class="w-full h-16 md:h-24"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 80V40C50 40 50 20 100 20C150 20 150 35 200 35C250 35 250 10 300 10C350 10 350 45 400 45C450 45 450 15 500 15C550 15 550 30 600 30C650 30 650 5 700 5C750 5 750 50 800 50C850 50 850 25 900 25C950 25 950 40 1000 40C1050 40 1050 20 1100 20C1150 20 1200 35 1200 35V80Z"
          fill="var(--color-warm-white, #f5f0eb)"
        />
      </svg>
    </div>
  </section>
</template>
