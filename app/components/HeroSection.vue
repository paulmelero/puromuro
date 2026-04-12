<script setup lang="ts">
const heroVisible = ref(false)

onMounted(() => {
  // Staggered reveal on load
  setTimeout(() => { heroVisible.value = true }, 100)
})
</script>

<template>
  <section class="relative min-h-screen flex flex-col justify-end bg-navy overflow-hidden pt-16">
    <!-- Giant background text — architectural scale -->
    <div
      class="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      <span
        class="font-heading font-black text-[28vw] leading-[0.8] text-white/[0.03] tracking-tighter"
      >
        MURO
      </span>
    </div>

    <!-- Main content -->
    <div class="relative z-10 px-6 md:px-10 pb-16 md:pb-24">
      <!-- Section marker -->
      <div
        class="mb-8 md:mb-12 transition-all duration-700"
        :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <span class="label-mono text-warm-white/40">Colectivo de arte urbano</span>
      </div>

      <!-- Title block -->
      <div class="mb-8 md:mb-12">
        <h1
          class="font-heading font-black text-warm-white leading-[0.82] transition-all duration-700 delay-100"
          :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <span class="block text-[18vw] md:text-[14vw] lg:text-[12vw]">PURO</span>
          <span class="block text-[18vw] md:text-[14vw] lg:text-[12vw] -mt-[1vw]">MURO</span>
        </h1>
      </div>

      <!-- Orange bar — the structural accent -->
      <div
        class="h-1.5 md:h-2 bg-brick w-full max-w-md mb-8 md:mb-12 transition-all duration-700 delay-200 origin-left"
        :class="heroVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'"
        aria-hidden="true"
      />

      <!-- Tagline + subtitle in a grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] gap-6 md:gap-10 max-w-3xl transition-all duration-700 delay-300"
        :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <p class="font-heading text-lg md:text-2xl font-bold tracking-[0.15em] text-warm-white uppercase">
          El muro es<br>el origen
        </p>

        <!-- Vertical divider (desktop) -->
        <div class="hidden md:block bg-warm-white/20" aria-hidden="true" />

        <p class="text-warm-white/50 text-base md:text-lg leading-relaxed max-w-sm">
          Pintura mural, graffiti y arte urbano. Transformamos espacios con arte que cuenta historias.
        </p>
      </div>

      <!-- CTA -->
      <div
        class="mt-10 md:mt-14 transition-all duration-700 delay-[400ms]"
        :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <a
          href="#contacto"
          class="inline-block border-2 border-warm-white text-warm-white font-heading text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 hover:bg-warm-white hover:text-navy transition-colors no-underline"
        >
          Háblanos de tu proyecto
        </a>
      </div>
    </div>

    <!-- Bottom edge — thick orange line -->
    <div class="h-1.5 bg-brick w-full" aria-hidden="true" />
  </section>
</template>
