import { computed } from 'vue'

/**
 * Generic selection helpers for list UIs.
 * Works with arrays of objects that include a `selected` boolean field.
 */
export function useSelection(itemsRef) {
  const anySelected = computed(() => itemsRef.value.some(item => Boolean(item.selected)))
  const allSelected = computed({
    get() {
      const items = itemsRef.value
      if (!items.length) return false
      return items.every(item => Boolean(item.selected))
    },
    set(val) {
      itemsRef.value.forEach(item => { item.selected = Boolean(val) })
    }
  })

  const toggleAll = (subset) => {
    const target = Array.isArray(subset) && subset.length ? subset : itemsRef.value
    const next = !target.every(item => Boolean(item.selected))
    target.forEach(item => { item.selected = next })
  }

  const clearSelection = () => {
    itemsRef.value.forEach(item => { item.selected = false })
  }

  return {
    anySelected,
    allSelected,
    toggleAll,
    clearSelection,
  }
}
