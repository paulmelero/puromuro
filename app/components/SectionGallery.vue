<script setup lang="ts">
import type { LightboxItem } from '~/composables/useLightbox';

const { data: home } = useHomeContent();
const gallery = computed(() => home.value?.gallery);

// Gallery items come from content/home.yml; derive a stable id from order.
const items = computed<LightboxItem[]>(() =>
  (gallery.value?.items ?? []).map((item, i) => ({ id: i + 1, ...item })),
);

// Build rows of bricks — alternating 3/2 pattern like a real brick wall
const brickRows = computed(() => {
  const rows: { items: LightboxItem[]; offset: boolean }[] = [];
  let idx = 0;
  let isOffset = false;
  const list = items.value;

  while (idx < list.length) {
    const count = isOffset ? 2 : 3;
    const rowItems = list.slice(idx, idx + count);
    if (rowItems.length > 0) {
      rows.push({ items: rowItems, offset: isOffset });
    }
    idx += count;
    isOffset = !isOffset;
  }
  return rows;
});

const {
  selectedItem,
  captionVisible,
  thumbnailVTName,
  setDialogRef,
  openLightbox,
  closeLightbox,
  navigate,
} = useLightbox();

function onDialogKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') navigate(1, items.value);
  if (e.key === 'ArrowLeft') navigate(-1, items.value);
}
</script>

<template>
  <LandingSection
    section-id="galeria"
    bg="ink"
    index="02"
    :label="gallery?.label"
  >
    <SectionTitle class="text-warm-white mb-4"> {{ gallery?.title }} </SectionTitle>
    <p class="text-warm-white/40 mb-12 md:mb-16 max-w-md">
      {{ gallery?.intro }}
    </p>

    <!-- Brick wall grid — rows alternate 3 and 2 items, offset like real bricks -->
    <div class="flex flex-col gap-[6px]">
      <div
        v-for="(row, rowIdx) in brickRows"
        :key="rowIdx"
        class="grid gap-[6px]"
        :class="row.offset ? 'grid-cols-2' : 'grid-cols-3'"
      >
        <button
          v-for="item in row.items"
          :key="item.id"
          class="group relative aspect-3/5 md:aspect-5/3 bg-navy overflow-hidden cursor-pointer text-left"
          :aria-label="`Ver imagen: ${item.label}, ${item.location}`"
          @click="openLightbox(item)"
        >
          <!-- Image -->
          <img
            :src="item.src"
            :alt="item.label"
            class="absolute inset-0 w-full h-full object-cover user-select-none"
            :style="{ viewTransitionName: thumbnailVTName(item.id) }"
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
        </button>
      </div>
    </div>
  </LandingSection>

  <!-- Lightbox -->
  <Teleport to="body">
    <dialog
      :ref="setDialogRef"
      class="modal z-40 !top-[4.1875rem]"
      @keydown="onDialogKeydown"
    >
      <div
        class="modal-box w-11/12 max-w-6xl bg-ink p-0 relative overflow-hidden"
      >
        <img
          v-if="selectedItem"
          :src="selectedItem.src"
          :alt="selectedItem.label"
          class="w-fit object-contain max-h-[85vh] rounded-lg mx-auto"
          :style="{ viewTransitionName: `gallery-${selectedItem.id}` }"
        />

        <!-- Caption + controls bar — animated in after the image morph finishes -->
        <Transition name="lightbox-caption">
          <div
            v-show="captionVisible"
            class="absolute bottom-0 left-0 right-0 p-4 bg-ink/80 flex items-end justify-between gap-4"
          >
            <div class="flex flex-col">
              <span class="label-mono text-warm-white/50">{{
                selectedItem?.location
              }}</span>
              <span
                class="font-heading text-sm font-bold text-warm-white uppercase tracking-wide"
                >{{ selectedItem?.label }}</span
              >
            </div>

            <div class="flex items-center gap-2">
              <!-- Prev -->
              <button
                class="btn btn-sm btn-ghost text-warm-white"
                aria-label="Imagen anterior"
                @click="navigate(-1, items)"
              >
                ←
              </button>
              <!-- Next -->
              <button
                class="btn btn-sm btn-ghost text-warm-white"
                aria-label="Imagen siguiente"
                @click="navigate(1, items)"
              >
                →
              </button>
              <!-- Close -->
              <button
                class="btn btn-sm btn-ghost text-warm-white"
                aria-label="Cerrar"
                @click="closeLightbox"
              >
                ✕
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Backdrop — click to close -->
      <div class="modal-backdrop" @click="closeLightbox" />
    </dialog>
  </Teleport>
</template>
