import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Markdown pages, rendered via the catch-all route. Scoped to .md so it
    // does not try to parse the structured data files below.
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),

    // Homepage section content — edited in Nuxt Studio as a single form.
    // `.editor({ input: 'textarea' })` gives multi-line fields a proper
    // textarea in Studio; `input: 'media'` gives images a media picker.
    home: defineCollection({
      type: 'data',
      source: 'home.yml',
      schema: z.object({
        hero: z.object({
          eyebrow: z.string(),
          title: z.string().editor({ input: 'textarea' }),
          subtitle: z.string().editor({ input: 'textarea' }),
          ctaLabel: z.string(),
        }),
        about: z.object({
          label: z.string(),
          title: z.string().editor({ input: 'textarea' }),
          lead: z.string().editor({ input: 'textarea' }),
          body: z.array(z.string().editor({ input: 'textarea' })),
          highlight: z.string().editor({ input: 'textarea' }),
        }),
        gallery: z.object({
          label: z.string(),
          title: z.string(),
          intro: z.string().editor({ input: 'textarea' }),
          items: z.array(
            z.object({
              src: z.string().editor({ input: 'media' }),
              label: z.string(),
              location: z.string(),
            }),
          ),
        }),
        services: z.object({
          label: z.string(),
          title: z.string().editor({ input: 'textarea' }),
          intro: z.string().editor({ input: 'textarea' }),
          items: z.array(
            z.object({
              num: z.string(),
              title: z.string(),
              description: z.string().editor({ input: 'textarea' }),
            }),
          ),
        }),
      }),
    }),
  },
})
