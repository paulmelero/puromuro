<script setup lang="ts">
const services = [
  {
    num: '01',
    title: 'Pintura Mural',
    description:
      'Murales artísticos de gran formato para fachadas, interiores y espacios comerciales. Cada muro es un proyecto único adaptado a su contexto.',
  },
  {
    num: '02',
    title: 'Rotulación a mano',
    description:
      'Rótulos artesanales para comercios, escaparates y señalización. Letra viva que da carácter y personalidad a cualquier espacio.',
  },
  {
    num: '03',
    title: 'Workshops',
    description:
      'Talleres de pintura mural, graffiti y lettering para todos los niveles. Aprendizaje directo con artistas en activo.',
  },
  {
    num: '04',
    title: 'Ilustración',
    description:
      'Ilustración original para editoriales, marcas y proyectos creativos. Imágenes con identidad propia, hechas a mano.',
  },
];
</script>

<template>
  <LandingSection
    section-id="servicios"
    bg="warm-white"
    index="03"
    label="Servicios"
  >
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 mb-16">
      <div class="lg:col-span-5">
        <SectionTitle class="text-ink lg:text-7xl">
          LO QUE<br />HACEMOS
        </SectionTitle>
      </div>
      <div class="lg:col-span-5 lg:col-start-7 flex items-end">
        <p class="text-ink/50 max-w-sm">
          Ofrecemos soluciones completas de pintura mural y arte urbano. Cada
          proyecto empieza escuchando.
        </p>
      </div>
    </div>

    <!-- Services list — editorial, numbered -->
    <div class="border-t-[3px] border-ink">
      <div
        v-for="service in services"
        :key="service.num"
        class="group border-b-[3px] border-ink"
      >
        <div
          class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 items-baseline"
        >
          <!-- Number -->
          <div class="md:col-span-1">
            <span class="label-mono text-brick">{{ service.num }}</span>
          </div>

          <!-- Title -->
          <div class="md:col-span-4">
            <h3
              class="font-heading text-2xl md:text-3xl font-black text-ink uppercase leading-tight group-hover:text-brick transition-colors"
            >
              {{ service.title }}
            </h3>
          </div>

          <!-- Description -->
          <div class="md:col-span-6 md:col-start-7">
            <p class="text-ink/60 leading-relaxed">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </LandingSection>
</template>
