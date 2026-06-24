<script setup lang="ts">
const { data: home } = useHomeContent();
const about = computed(() => home.value?.about);
</script>

<template>
  <LandingSection
    section-id="nosotros"
    bg="warm-white"
    index="01"
    :label="about?.label"
  >
    <!-- Main grid: asymmetric -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-0">
      <!-- Pull quote — large, takes most of the width -->
      <div class="lg:col-span-7 lg:border-r-[3px] lg:border-ink/10 lg:pr-12">
        <SectionTitle class="text-ink lg:text-7xl mb-8">
          {{ about?.title }}
          <template #stroke>
            <PaintStroke width="6rem" height="6px" class="mb-8" />
          </template>
        </SectionTitle>
        <p class="text-ink/60 text-lg md:text-xl leading-relaxed max-w-xl">
          {{ about?.lead }}
        </p>
      </div>

      <!-- Right column: detailed text -->
      <div class="lg:col-span-5 lg:pl-12 flex flex-col justify-end">
        <div class="space-y-6 text-ink/70 leading-relaxed">
          <p v-for="(para, i) in about?.body" :key="i">{{ para }}</p>
          <p
            class="font-heading font-bold text-ink text-sm tracking-widest uppercase pt-4 border-t-[2px] border-ink/10"
          >
            {{ about?.highlight }}
          </p>
        </div>
      </div>
    </div>
  </LandingSection>
</template>
