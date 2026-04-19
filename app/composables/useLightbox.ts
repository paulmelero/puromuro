export type LightboxItem = {
  id: number
  src: string
  label: string
  location: string
}

// Singleton DOM ref — set by SectionGallery when the dialog mounts.
const _dialogRef = shallowRef<HTMLDialogElement | null>(null)

export function useLightbox() {
  const selectedItem = useState<LightboxItem | null>('lightbox:selected', () => null)
  const captionVisible = useState('lightbox:caption', () => false)
  const activeTransitionId = useState<number | null>('lightbox:activeTransition', () => null)

  const prefersReducedMotion = () =>
    import.meta.client &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Called from SectionGallery's :ref binding to register the dialog element.
  function setDialogRef(el: Element | null) {
    _dialogRef.value = el as HTMLDialogElement | null
  }

  // Only the clicked thumbnail gets a view-transition-name to avoid stacking artifacts.
  const thumbnailVTName = (id: number) =>
    activeTransitionId.value === id && selectedItem.value?.id !== id
      ? `gallery-${id}`
      : 'none'

  async function openLightbox(item: LightboxItem) {
    if (!import.meta.client) return

    activeTransitionId.value = item.id
    await nextTick()

    if (!document.startViewTransition || prefersReducedMotion()) {
      selectedItem.value = item
      await nextTick()
      _dialogRef.value?.show()
      captionVisible.value = true
      return
    }

    const t = document.startViewTransition(async () => {
      selectedItem.value = item
      await nextTick()
      _dialogRef.value?.show()
    })

    await t.finished
    captionVisible.value = true
  }

  async function closeLightbox() {
    if (!import.meta.client) return

    captionVisible.value = false

    if (!document.startViewTransition || prefersReducedMotion()) {
      _dialogRef.value?.close()
      selectedItem.value = null
      activeTransitionId.value = null
      return
    }

    const t = document.startViewTransition(async () => {
      _dialogRef.value?.close()
      selectedItem.value = null
      await nextTick()
    })

    await t.finished
    activeTransitionId.value = null
  }

  // Items are passed by the caller so gallery data stays in the gallery component.
  function navigate(dir: 1 | -1, items: LightboxItem[]) {
    if (!selectedItem.value) return
    const idx = items.findIndex((i) => i.id === selectedItem.value!.id)
    const next = items[(idx + dir + items.length) % items.length]
    if (next) {
      selectedItem.value = next
      activeTransitionId.value = next.id
    }
  }

  return {
    selectedItem,
    captionVisible,
    thumbnailVTName,
    setDialogRef,
    openLightbox,
    closeLightbox,
    navigate,
  }
}
