<script setup lang="ts">
const heroVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

onMounted(() => {
  setTimeout(() => {
    heroVisible.value = true;
  }, 100);
});
</script>

<template>
  <section
    ref="sectionRef"
    class="relative flex flex-col justify-end bg-navy overflow-hidden h-[calc(100vh-4rem)]"
  >
    <!-- Animated brick cursor (desktop only, respects prefers-reduced-motion) -->
    <BrickCursor :hero-ref="sectionRef" />

    <!-- Background image -->
    <div
      class="absolute inset-0 pointer-events-none select-none"
      aria-hidden="true"
    >
      <NuxtImg
        src="/images/uploads/design/foto_fondo_headerbajo.avif"
        alt=""
        class="w-full h-full object-cover object-center md:object-bottom-right"
        loading="eager"
      />
    </div>

    <!-- Main content -->
    <div class="relative z-10 px-6 md:px-10 pb-10 md:pb-16">
      <!-- Section marker -->
      <div
        class="mb-6 md:mb-8 transition-all duration-700"
        :class="
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        "
      >
        <span class="label-mono text-warm-white/40"
          >Colectivo de arte urbano</span
        >
      </div>

      <!-- Title block — brand logo (smaller) -->
      <div
        class="mb-6 md:mb-8 transition-all duration-700 delay-100"
        :class="
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        "
      >
        <h1 class="sr-only">Puro Muro — Pintura Mural</h1>
        <BrandLogo variant="light-accent" class="w-full max-w-xl" />
      </div>

      <!-- Paint stroke accent -->
      <div
        class="max-w-sm mb-6 md:mb-8 transition-all duration-700 delay-200 origin-left"
        :class="
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        "
      >
        <img
          src="/images/uploads/design/adornos/Recurso_1.svg"
          alt=""
          aria-hidden="true"
          class="w-full h-auto"
        />
      </div>

      <!-- Tagline + subtitle in a grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] gap-4 md:gap-8 max-w-2xl transition-all duration-700 delay-300"
        :class="
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        "
      >
        <p
          class="font-heading text-lg md:text-xl font-bold tracking-[0.15em] text-warm-white uppercase"
        >
          El muro es<br />el origen
        </p>

        <!-- Vertical divider (desktop) -->
        <div class="hidden md:block bg-warm-white/20" aria-hidden="true" />

        <p
          class="text-warm-white/50 text-sm md:text-base leading-relaxed max-w-sm"
        >
          Pintura mural, graffiti y arte urbano. Transformamos espacios con arte
          que cuenta historias.
        </p>
      </div>

      <!-- CTA — solid secondary color -->
      <div
        class="mt-8 md:mt-10 transition-all duration-700 delay-400"
        :class="
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        "
      >
        <NuxtLink
          to="#contacto"
          class="relative inline-block bg-brick text-white font-heading text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 hover:bg-orange [--drip-color:var(--color-brick)] hover:[--drip-color:var(--color-orange)] transition-colors no-underline"
        >
          Háblanos de tu proyecto
          <PaintDrips
            storage-key="cta-hero"
            color="brick"
            :count="2"
            :seed="71"
            :base-delay="1200"
          />
        </NuxtLink>
      </div>
    </div>

    <!-- Bottom edge — thick orange line -->
    <div class="h-1.5 bg-brick w-full" aria-hidden="true" />
  </section>
</template>
