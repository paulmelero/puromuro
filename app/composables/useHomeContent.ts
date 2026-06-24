// Homepage section content (content/home.yml, edited via Nuxt Studio).
// Shared `useAsyncData` key so the page and every section component resolve
// the same single query. The page (`pages/index.vue`) awaits this once;
// section components read it synchronously via the cached result.
export function useHomeContent() {
  return useAsyncData('home', () => queryCollection('home').first())
}
