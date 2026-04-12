<script setup lang="ts">
const services = [
  {
    icon: 'lucide:brush',
    title: 'Pintura Mural',
    description: 'Murales artísticos de gran formato para fachadas, interiores y espacios comerciales.',
  },
  {
    icon: 'lucide:spray-can',
    title: 'Graffiti',
    description: 'Arte urbano profesional que transforma paredes en lienzos con identidad propia.',
  },
  {
    icon: 'lucide:palette',
    title: 'Decoracion',
    description: 'Pintura decorativa artesanal para locales, oficinas y espacios residenciales.',
  },
  {
    icon: 'lucide:hammer',
    title: 'Restauracion',
    description: 'Recuperación y restauración de murales y pinturas murales existentes.',
  },
]
</script>

<template>
  <section id="servicios" class="bg-primary py-20 md:py-28 relative">
    <div class="container mx-auto px-6">
      <h2 class="font-heading text-3xl md:text-5xl font-bold text-primary-content text-center mb-4">
        SERVICIOS
      </h2>
      <p class="text-primary-content/60 text-center mb-12 max-w-lg mx-auto">
        Ofrecemos soluciones completas de pintura mural y arte urbano.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="service in services"
          :key="service.title"
          class="card bg-white/5 border border-primary-content/10 hover:border-accent/50 transition-colors"
        >
          <div class="card-body items-center text-center">
            <div class="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
              <Icon :name="service.icon" size="28" class="text-accent" />
            </div>
            <h3 class="card-title font-heading text-lg text-primary-content">
              {{ service.title }}
            </h3>
            <p class="text-primary-content/60 text-sm">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
