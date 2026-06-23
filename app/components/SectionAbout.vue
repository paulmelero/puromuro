<template>
  <LandingSection
    section-id="nosotros"
    bg="warm-white"
    index="01"
    label="Nosotros"
  >
    <!-- Main grid: asymmetric -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-0">
      <!-- Pull quote — large, takes most of the width -->
      <div class="lg:col-span-7 lg:border-r-[3px] lg:border-ink/10 lg:pr-12">
        <SectionTitle class="text-ink lg:text-7xl mb-8">
          EL PRIMER SOPORTE DE LA EXPRESIÓN HUMANA
          <template #stroke>
            <PaintStroke width="6rem" height="6px" class="mb-8" />
          </template>
        </SectionTitle>
        <p class="text-ink/60 text-lg md:text-xl leading-relaxed max-w-xl">
          Puro Muro nace de una redundancia fonética que busca subrayar una
          verdad absoluta: el muro es el origen.
        </p>
      </div>

      <!-- Right column: detailed text -->
      <div class="lg:col-span-5 lg:pl-12 flex flex-col justify-end">
        <div class="space-y-6 text-ink/70 leading-relaxed">
          <p>
            Somos un colectivo de personas que entienden la pintura como un
            ejercicio de respeto hacia el entorno. Venimos de una escuela de
            pintura rápida y de una relación puramente pasional con el espacio
            público; un impulso inicial que, con el tiempo, hemos transformado
            en un método de trabajo profesional y meticuloso.
          </p>
          <p>
            No buscamos imponer una identidad artística personal ni el
            exhibicionismo creativo. Nuestra formación en diseño gráfico nos
            permite abordar cada proyecto con una mentalidad distinta: escuchar
            y resolver.
          </p>
          <p
            class="font-heading font-bold text-ink text-sm tracking-widest uppercase pt-4 border-t-[2px] border-ink/10"
          >
            Entendemos la pintura artesana como una herramienta capaz de
            adaptarse a la naturaleza de cada lugar.
          </p>
        </div>
      </div>
    </div>
  </LandingSection>
</template>
