<script setup lang="ts">
const form = reactive({
  nombre: '',
  email: '',
  telefono: '',
  mensaje: '',
});

const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle');
const errorMessage = ref('');

const siteKey = useRuntimeConfig().public.turnstileSiteKey;
const captchaKey = ref(0); // bump → remount widget (reset; tokens are single-use)
const formEl = ref<HTMLFormElement | null>(null);
const messageRef = ref<HTMLElement | null>(null);

// Bring the result (success/error) into view once it renders.
watch(status, async (s) => {
  if (s === 'success' || s === 'error') {
    await nextTick();
    messageRef.value?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

// Cloudflare Turnstile — implicit rendering.
useHead({
  script: [
    {
      src: 'https://challenges.cloudflare.com/turnstile/v0/api.js',
      async: true,
      defer: true,
    },
  ],
});

async function handleSubmit() {
  status.value = 'sending';
  errorMessage.value = '';

  const token =
    (
      formEl.value?.querySelector(
        '[name="cf-turnstile-response"]',
      ) as HTMLInputElement | null
    )?.value || '';

  if (!token) {
    // Managed/invisible Turnstile issues the token automatically a beat after
    // load, so a very fast submit can outrun it — the copy reflects "wait",
    // not "complete an action" (there may be nothing visible to complete).
    status.value = 'error';
    errorMessage.value =
      'Verificación en curso. Espera un momento e inténtalo de nuevo.';
    return;
  }

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form, token },
    });
    status.value = 'success';
    form.nombre = '';
    form.email = '';
    form.telefono = '';
    form.mensaje = '';
  } catch (e: any) {
    status.value = 'error';
    errorMessage.value =
      e.data?.message || 'Error al enviar el mensaje. Inténtalo de nuevo.';
  } finally {
    captchaKey.value++; // fresh widget for the next attempt
  }
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
    <!-- Left: heading + info -->
    <div class="lg:col-span-5 lg:pr-16">
      <SectionTitle class="text-warm-white lg:text-7xl mb-8">
        HABLEMOS
        <template #stroke>
          <PaintStroke width="5rem" height="6px" class="mb-8" />
        </template>
      </SectionTitle>
      <p class="text-warm-white/50 mb-10 max-w-sm">
        ¿Tienes un proyecto en mente? Cuéntanos tu idea y te responderemos lo
        antes posible.
      </p>

      <!-- Contact details -->
      <div class="space-y-4 text-warm-white/60">
        <div>
          <span class="label-mono text-warm-white/30 block mb-1">Email</span>
          <a
            href="mailto:puromuromurales@gmail.com"
            class="text-warm-white hover:text-orange transition-colors no-underline"
          >
            puromuromurales@gmail.com
          </a>
        </div>
        <div>
          <span class="label-mono text-warm-white/30 block mb-1">Teléfono</span>
          <a
            href="tel:+34661495182"
            class="text-warm-white hover:text-orange transition-colors no-underline"
          >
            661 495 182
          </a>
        </div>
        <div>
          <span class="label-mono text-warm-white/30 block mb-1"
            >Dirección</span
          >
          <span class="text-warm-white">
            Calle Valle de Broto 6<br />Zaragoza 50015
          </span>
        </div>
        <div>
          <span class="label-mono text-warm-white/30 block mb-1"
            >Instagram</span
          >
          <NuxtLink
            to="https://instagram.com/puromuromurales"
            class="text-warm-white hover:text-orange transition-colors no-underline"
            target="_blank"
            rel="noopener"
          >
            @puromuromurales
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Right: form -->
    <div class="lg:col-span-6 lg:col-start-7">
      <div ref="messageRef" class="scroll-mt-24">
        <!-- Success message -->
        <div
          v-if="status === 'success'"
          class="border-2 border-warm-white/20 p-6 mb-8"
        >
          <p
            class="font-heading text-sm font-bold tracking-widest text-warm-white uppercase"
          >
            Mensaje enviado correctamente
          </p>
          <p class="text-warm-white/50 text-sm mt-2">
            ¡Gracias por contactarnos!
          </p>
        </div>

        <!-- Error message -->
        <div v-if="status === 'error'" class="border-2 border-brick p-6 mb-8">
          <p
            class="font-heading text-sm font-bold tracking-widest text-brick uppercase"
          >
            Error
          </p>
          <p class="text-warm-white/50 text-sm mt-2">{{ errorMessage }}</p>
        </div>
      </div>

      <form ref="formEl" @submit.prevent="handleSubmit" class="space-y-8">
        <div>
          <label for="nombre" class="label-mono text-warm-white/40 block mb-3"
            >Nombre *</label
          >
          <input
            id="nombre"
            v-model="form.nombre"
            type="text"
            required
            class="w-full bg-transparent border-0 border-b-[3px] border-warm-white/20 text-warm-white text-lg py-3 px-0 placeholder:text-warm-white/20 focus:border-brick focus:outline-none transition-colors"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label for="email" class="label-mono text-warm-white/40 block mb-3"
            >Email *</label
          >
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full bg-transparent border-0 border-b-[3px] border-warm-white/20 text-warm-white text-lg py-3 px-0 placeholder:text-warm-white/20 focus:border-brick focus:outline-none transition-colors"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label for="telefono" class="label-mono text-warm-white/40 block mb-3"
            >Teléfono</label
          >
          <input
            id="telefono"
            v-model="form.telefono"
            type="tel"
            class="w-full bg-transparent border-0 border-b-[3px] border-warm-white/20 text-warm-white text-lg py-3 px-0 placeholder:text-warm-white/20 focus:border-brick focus:outline-none transition-colors"
            placeholder="+34 600 000 000"
          />
        </div>

        <div>
          <label for="mensaje" class="label-mono text-warm-white/40 block mb-3"
            >Mensaje *</label
          >
          <textarea
            id="mensaje"
            v-model="form.mensaje"
            required
            rows="4"
            class="w-full bg-transparent border-0 border-b-[3px] border-warm-white/20 text-warm-white text-lg py-3 px-0 placeholder:text-warm-white/20 focus:border-brick focus:outline-none transition-colors resize-none"
            placeholder="Cuéntanos tu proyecto..."
          />
        </div>

        <div
          :key="captchaKey"
          class="cf-turnstile [&:not(:empty)]:mb-6"
          :data-sitekey="siteKey"
        />

        <CTAButton
          type="submit"
          class="disabled:cursor-not-allowed"
          :disabled="status === 'sending'"
        >
          {{ status === 'sending' ? 'Enviando...' : 'Enviar mensaje' }}
        </CTAButton>
      </form>
    </div>
  </div>
</template>
