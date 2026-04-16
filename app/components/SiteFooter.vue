<template>
  <footer class="bg-ink border-t-[3px] border-warm-white/15 py-10">
    <div class="px-6 md:px-10">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <a href="/" class="block" aria-label="Puro Muro - Inicio">
          <BrandLogo variant="light-accent" :show-subtitle="false" class="h-10" />
        </a>

        <div class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <a
            href="https://instagram.com/puromuromurales"
            class="label-mono text-warm-white/40 hover:text-orange transition-colors no-underline"
            target="_blank"
            rel="noopener"
          >
            @puromuromurales
          </a>
          <a
            href="mailto:puromuromurales@gmail.com"
            class="label-mono text-warm-white/40 hover:text-orange transition-colors no-underline"
          >
            puromuromurales@gmail.com
          </a>
        </div>

        <p class="label-mono text-warm-white/25">
          &copy; {{ new Date().getFullYear() }} Puro Muro
        </p>
      </div>
    </div>
  </footer>
</template>
