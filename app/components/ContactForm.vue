<script setup lang="ts">
const form = reactive({
  nombre: '',
  email: '',
  telefono: '',
  mensaje: '',
})

const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMessage = ref('')

async function handleSubmit() {
  status.value = 'sending'
  errorMessage.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form,
    })
    status.value = 'success'
    form.nombre = ''
    form.email = ''
    form.telefono = ''
    form.mensaje = ''
  }
  catch (e: any) {
    status.value = 'error'
    errorMessage.value = e.data?.message || 'Error al enviar el mensaje. Inténtalo de nuevo.'
  }
}
</script>

<template>
  <section id="contacto" class="bg-navy py-20 md:py-32">
    <div class="px-6 md:px-10">
      <!-- Section marker -->
      <div class="flex items-center gap-4 mb-12 md:mb-16">
        <span class="label-mono text-warm-white/40">04</span>
        <div class="h-[2px] w-12 bg-warm-white/20" aria-hidden="true" />
        <span class="label-mono text-warm-white/40">Contacto</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
        <!-- Left: heading + info -->
        <div class="lg:col-span-5 lg:pr-16">
          <h2 class="font-heading text-4xl md:text-6xl lg:text-7xl font-black text-warm-white leading-[0.9] mb-8">
            HABLEMOS
          </h2>
          <div class="h-1 w-20 bg-brick mb-8" aria-hidden="true" />
          <p class="text-warm-white/50 mb-10 max-w-sm">
            ¿Tienes un proyecto en mente? Cuéntanos tu idea y te responderemos lo antes posible.
          </p>

          <!-- Contact details -->
          <div class="space-y-4 text-warm-white/60">
            <div>
              <span class="label-mono text-warm-white/30 block mb-1">Email</span>
              <a href="mailto:info@puromuro.com" class="text-warm-white hover:text-orange transition-colors no-underline">
                info@puromuro.com
              </a>
            </div>
            <div>
              <span class="label-mono text-warm-white/30 block mb-1">Social</span>
              <a href="#" class="text-warm-white hover:text-orange transition-colors no-underline">
                @puromuro
              </a>
            </div>
          </div>
        </div>

        <!-- Right: form -->
        <div class="lg:col-span-6 lg:col-start-7">
          <!-- Success message -->
          <div v-if="status === 'success'" class="border-2 border-warm-white/20 p-6 mb-8">
            <p class="font-heading text-sm font-bold tracking-[0.1em] text-warm-white uppercase">
              Mensaje enviado correctamente
            </p>
            <p class="text-warm-white/50 text-sm mt-2">¡Gracias por contactarnos!</p>
          </div>

          <!-- Error message -->
          <div v-if="status === 'error'" class="border-2 border-brick p-6 mb-8">
            <p class="font-heading text-sm font-bold tracking-[0.1em] text-brick uppercase">
              Error
            </p>
            <p class="text-warm-white/50 text-sm mt-2">{{ errorMessage }}</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-8">
            <div>
              <label for="nombre" class="label-mono text-warm-white/40 block mb-3">Nombre *</label>
              <input
                id="nombre"
                v-model="form.nombre"
                type="text"
                required
                class="w-full bg-transparent border-0 border-b-[3px] border-warm-white/20 text-warm-white text-lg py-3 px-0 placeholder:text-warm-white/20 focus:border-brick focus:outline-none transition-colors"
                placeholder="Tu nombre"
              >
            </div>

            <div>
              <label for="email" class="label-mono text-warm-white/40 block mb-3">Email *</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full bg-transparent border-0 border-b-[3px] border-warm-white/20 text-warm-white text-lg py-3 px-0 placeholder:text-warm-white/20 focus:border-brick focus:outline-none transition-colors"
                placeholder="tu@email.com"
              >
            </div>

            <div>
              <label for="telefono" class="label-mono text-warm-white/40 block mb-3">Teléfono</label>
              <input
                id="telefono"
                v-model="form.telefono"
                type="tel"
                class="w-full bg-transparent border-0 border-b-[3px] border-warm-white/20 text-warm-white text-lg py-3 px-0 placeholder:text-warm-white/20 focus:border-brick focus:outline-none transition-colors"
                placeholder="+34 600 000 000"
              >
            </div>

            <div>
              <label for="mensaje" class="label-mono text-warm-white/40 block mb-3">Mensaje *</label>
              <textarea
                id="mensaje"
                v-model="form.mensaje"
                required
                rows="4"
                class="w-full bg-transparent border-0 border-b-[3px] border-warm-white/20 text-warm-white text-lg py-3 px-0 placeholder:text-warm-white/20 focus:border-brick focus:outline-none transition-colors resize-none"
                placeholder="Cuéntanos tu proyecto..."
              />
            </div>

            <button
              type="submit"
              class="inline-block border-2 border-warm-white text-warm-white font-heading text-xs font-bold tracking-[0.2em] uppercase px-10 py-4 hover:bg-warm-white hover:text-navy transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              :disabled="status === 'sending'"
            >
              {{ status === 'sending' ? 'Enviando...' : 'Enviar mensaje' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
