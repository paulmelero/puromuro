<script setup lang="ts">
const items = [
  { id: 1, label: 'Mural exterior', location: 'Valencia' },
  { id: 2, label: 'Fachada comercial', location: 'Madrid' },
  { id: 3, label: 'Interior restaurante', location: 'Barcelona' },
  { id: 4, label: 'Graffiti urbano', location: 'Sevilla' },
  { id: 5, label: 'Mural comunitario', location: 'Bilbao' },
  { id: 6, label: 'Decoración mural', location: 'Valencia' },
]
</script>

<template>
  <section id="galeria" class="bg-ink py-20 md:py-32">
    <div class="px-6 md:px-10">
      <!-- Section marker -->
      <div class="flex items-center gap-4 mb-12 md:mb-16">
        <span class="label-mono text-warm-white/40">02</span>
        <div class="h-[2px] w-12 bg-warm-white/20" aria-hidden="true" />
        <span class="label-mono text-warm-white/40">Galería</span>
      </div>

      <h2 class="font-heading text-4xl md:text-6xl font-black text-warm-white leading-[0.9] mb-4">
        TRABAJOS
      </h2>
      <p class="text-warm-white/40 mb-12 md:mb-16 max-w-md">
        Una selección de nuestros proyectos de pintura mural y arte urbano.
      </p>

      <!-- Strict grid — thick borders, no rounding -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t-[3px] border-l-[3px] border-warm-white/15">
        <div
          v-for="item in items"
          :key="item.id"
          class="group relative aspect-[4/3] border-b-[3px] border-r-[3px] border-warm-white/15 bg-navy overflow-hidden cursor-pointer"
        >
          <!-- Placeholder fill — different tones for visual variety -->
          <div
            class="absolute inset-0 transition-colors duration-300"
            :class="item.id % 3 === 0 ? 'bg-brick/20 group-hover:bg-brick/35' : item.id % 2 === 0 ? 'bg-navy-light group-hover:bg-navy-light/80' : 'bg-navy group-hover:bg-warm-white/5'"
          />

          <!-- Overlay info — visible on hover -->
          <div class="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span class="label-mono text-warm-white/50 mb-1">{{ item.location }}</span>
            <span class="font-heading text-sm font-bold text-warm-white uppercase tracking-wide">{{ item.label }}</span>
          </div>

          <!-- Index number -->
          <span class="absolute top-4 left-5 label-mono text-warm-white/20 group-hover:text-warm-white/40 transition-colors">
            {{ String(item.id).padStart(2, '0') }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
