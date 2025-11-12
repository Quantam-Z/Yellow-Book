import { ref, computed } from 'vue';
import { useClientEventListener } from '@/composables/useClientEventListener';

export function useVirtualScroll(items, itemHeight = 200, buffer = 3) {
  const scrollTop = ref(0);
  const containerHeight = ref(0);

  const visibleCount = computed(() => 
    Math.ceil(containerHeight.value / itemHeight) + buffer * 2
  );

  const startIndex = computed(() =>
    Math.max(0, Math.floor(scrollTop.value / itemHeight) - buffer)
  );

  const endIndex = computed(() =>
    Math.min(items.value.length, startIndex.value + visibleCount.value)
  );

  const visibleItems = computed(() => {
    return items.value
      .slice(startIndex.value, endIndex.value)
      .map((item, index) => ({
        data: item,
        index: startIndex.value + index,
        offset: (startIndex.value + index) * itemHeight
      }));
  });

  const totalHeight = computed(() => items.value.length * itemHeight);

  const handleScroll = (event) => {
    scrollTop.value = event.target.scrollTop;
  };

  const updateContainerHeight = () => {
    if (!import.meta.client) return;
    // Calculate available height based on viewport minus header/footer
    const headerHeight = 80;
    const footerHeight = 60;
    containerHeight.value = window.innerHeight - headerHeight - footerHeight;
  };

  useClientEventListener(() => window, 'resize', updateContainerHeight, { passive: true, immediate: true });

  return {
    visibleItems,
    totalHeight,
    handleScroll,
    scrollTop
  };
}