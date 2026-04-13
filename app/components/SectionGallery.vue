<script setup lang="ts">
const items = [
  {
    id: 1,
    src: '/images/uploads/13.jpg',
    label: 'Mural exterior',
    location: 'Valencia',
  },
  {
    id: 2,
    src: '/images/uploads/14.jpg',
    label: 'Fachada comercial',
    location: 'Madrid',
  },
  {
    id: 3,
    src: '/images/uploads/15.jpg',
    label: 'Fachada de gran formato',
    location: 'Barcelona',
  },
  {
    id: 4,
    src: '/images/uploads/16.jpg',
    label: 'Graffiti urbano',
    location: 'Sevilla',
  },
  {
    id: 5,
    src: '/images/uploads/17.jpg',
    label: 'Mural comunitario',
    location: 'Bilbao',
  },
  {
    id: 6,
    src: '/images/uploads/18.jpg',
    label: 'Decoración mural',
    location: 'Valencia',
  },
  {
    id: 7,
    src: '/images/uploads/19.jpg',
    label: 'Parking artístico',
    location: 'Málaga',
  },
  {
    id: 8,
    src: '/images/uploads/20.jpg',
    label: 'Festival urbano',
    location: 'Zaragoza',
  },
];

// Build rows of bricks — alternating 3/2 pattern like a real brick wall
const brickRows = computed(() => {
  const rows: { items: typeof items; offset: boolean }[] = [];
  let idx = 0;
  let isOffset = false;

  while (idx < items.length) {
    const count = isOffset ? 2 : 3;
    const rowItems = items.slice(idx, idx + count);
    if (rowItems.length > 0) {
      rows.push({ items: rowItems, offset: isOffset });
    }
    idx += count;
    isOffset = !isOffset;
  }
  return rows;
});
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

      <h2
        class="font-heading text-4xl md:text-6xl font-black text-warm-white leading-[0.9] mb-4"
      >
        TRABAJOS
      </h2>
      <p class="text-warm-white/40 mb-12 md:mb-16 max-w-md">
        Una selección de nuestros proyectos de pintura mural y arte urbano.
      </p>

      <!-- Brick wall grid — rows alternate 3 and 2 items, offset like real bricks -->
      <div class="flex flex-col gap-[6px]">
        <div
          v-for="(row, rowIdx) in brickRows"
          :key="rowIdx"
          class="grid gap-[6px]"
          :class="row.offset ? 'grid-cols-2' : 'grid-cols-3'"
        >
          <div
            v-for="item in row.items"
            :key="item.id"
            class="group relative aspect-[5/3] bg-navy overflow-hidden cursor-pointer"
          >
            <!-- Image -->
            <img
              :src="item.src"
              :alt="item.label"
              class="absolute inset-0 w-full h-full object-cover"
            />

            <!-- Dark overlay on hover -->
            <div
              class="absolute inset-0 bg-navy/0 group-hover:bg-navy/95 transition-[background-color] duration-300"
            />

            <!-- Info — visible on hover -->
            <div
              class="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <span class="label-mono text-warm-white/50 mb-1">{{
                item.location
              }}</span>
              <span
                class="font-heading text-sm font-bold text-warm-white uppercase tracking-wide"
                >{{ item.label }}</span
              >
            </div>

            <!-- Index number -->
            <span
              class="absolute top-4 left-5 label-mono text-warm-white/0 group-hover:text-warm-white/40 transition-colors duration-300"
            >
              {{ String(item.id).padStart(2, '0') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
