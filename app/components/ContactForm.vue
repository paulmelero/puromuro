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
  <section id="contacto" class="bg-primary py-20 md:py-28 relative overflow-hidden">
    <!-- Paint drip decoration top -->
    <div class="absolute -top-1 left-0 right-0" aria-hidden="true">
      <svg
        class="w-full h-8 md:h-12 rotate-180"
        viewBox="0 0 1200 50"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 50V20C100 20 100 40 200 40C300 40 300 10 400 10C500 10 500 35 600 35C700 35 700 15 800 15C900 15 900 45 1000 45C1100 45 1200 25 1200 25V50Z"
          fill="var(--color-warm-white, #f5f0eb)"
        />
      </svg>
    </div>

    <div class="container mx-auto px-6 max-w-2xl">
      <h2 class="font-heading text-3xl md:text-5xl font-bold text-primary-content text-center mb-4">
        CONTACTO
      </h2>
      <p class="text-primary-content/60 text-center mb-12 max-w-lg mx-auto">
        ¿Tienes un proyecto en mente? Cuéntanos tu idea y te responderemos lo antes posible.
      </p>

      <!-- Success message -->
      <div v-if="status === 'success'" class="alert bg-success text-success-content mb-8">
        <Icon name="lucide:check-circle" size="20" />
        <span>Mensaje enviado correctamente. ¡Gracias por contactarnos!</span>
      </div>

      <!-- Error message -->
      <div v-if="status === 'error'" class="alert bg-error text-error-content mb-8">
        <Icon name="lucide:alert-circle" size="20" />
        <span>{{ errorMessage }}</span>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="form-control">
          <label class="label" for="nombre">
            <span class="label-text text-primary-content/80 font-heading text-sm tracking-wider">NOMBRE *</span>
          </label>
          <input
            id="nombre"
            v-model="form.nombre"
            type="text"
            required
            class="input input-bordered bg-white/10 border-primary-content/20 text-primary-content placeholder:text-primary-content/30 focus:border-accent focus:outline-accent"
            placeholder="Tu nombre"
          >
        </div>

        <div class="form-control">
          <label class="label" for="email">
            <span class="label-text text-primary-content/80 font-heading text-sm tracking-wider">EMAIL *</span>
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="input input-bordered bg-white/10 border-primary-content/20 text-primary-content placeholder:text-primary-content/30 focus:border-accent focus:outline-accent"
            placeholder="tu@email.com"
          >
        </div>

        <div class="form-control">
          <label class="label" for="telefono">
            <span class="label-text text-primary-content/80 font-heading text-sm tracking-wider">TELEFONO</span>
          </label>
          <input
            id="telefono"
            v-model="form.telefono"
            type="tel"
            class="input input-bordered bg-white/10 border-primary-content/20 text-primary-content placeholder:text-primary-content/30 focus:border-accent focus:outline-accent"
            placeholder="+34 600 000 000"
          >
        </div>

        <div class="form-control">
          <label class="label" for="mensaje">
            <span class="label-text text-primary-content/80 font-heading text-sm tracking-wider">MENSAJE *</span>
          </label>
          <textarea
            id="mensaje"
            v-model="form.mensaje"
            required
            rows="5"
            class="textarea textarea-bordered bg-white/10 border-primary-content/20 text-primary-content placeholder:text-primary-content/30 focus:border-accent focus:outline-accent"
            placeholder="Cuéntanos tu proyecto..."
          />
        </div>

        <button
          type="submit"
          class="btn btn-accent btn-block font-heading text-sm tracking-widest uppercase"
          :disabled="status === 'sending'"
        >
          <span v-if="status === 'sending'" class="loading loading-spinner loading-sm" />
          {{ status === 'sending' ? 'Enviando...' : 'Enviar mensaje' }}
        </button>
      </form>
    </div>
  </section>
</template>
