<script setup lang="ts">
const placeholders = [
  { id: 1, aspect: 'aspect-[3/4]', color: 'bg-secondary/20' },
  { id: 2, aspect: 'aspect-square', color: 'bg-primary/20' },
  { id: 3, aspect: 'aspect-[4/3]', color: 'bg-accent/20' },
  { id: 4, aspect: 'aspect-[3/4]', color: 'bg-primary/30' },
  { id: 5, aspect: 'aspect-square', color: 'bg-secondary/30' },
  { id: 6, aspect: 'aspect-[4/3]', color: 'bg-accent/15' },
  { id: 7, aspect: 'aspect-[3/4]', color: 'bg-primary/15' },
  { id: 8, aspect: 'aspect-square', color: 'bg-secondary/15' },
]
</script>

<template>
  <section id="galeria" class="bg-base-200 py-20 md:py-28">
    <div class="container mx-auto px-6">
      <h2 class="font-heading text-3xl md:text-5xl font-bold text-base-content text-center mb-4">
        GALERIA
      </h2>
      <p class="text-base-content/60 text-center mb-12 max-w-lg mx-auto">
        Una selección de nuestros trabajos de pintura mural y arte urbano.
      </p>

      <!-- Masonry grid -->
      <div class="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        <div
          v-for="item in placeholders"
          :key="item.id"
          class="break-inside-avoid group cursor-pointer"
        >
          <div
            :class="[item.aspect, item.color]"
            class="rounded-lg overflow-hidden relative transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]"
          >
            <div class="absolute inset-0 flex items-center justify-center text-base-content/10 group-hover:text-base-content/20 transition-colors">
              <Icon name="lucide:image" size="48" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
