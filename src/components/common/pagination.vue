<template>
  <nav class="flex items-center justify-center gap-2 select-none" role="navigation" aria-label="pagination">
    <button
      class="px-3 py-1 rounded border text-sm disabled:opacity-50"
      :disabled="modelValue <= 1"
      @click="$emit('update:modelValue', modelValue - 1)"
      aria-label="Previous page"
    >
      Prev
    </button>

    <button
      v-for="n in visiblePages"
      :key="n"
      class="px-3 py-1 rounded border text-sm"
      :class="n === modelValue ? 'bg-[#fcc207] border-[#e5b106] text-[#212121]' : 'bg-white border-gray-300 text-gray-700'"
      @click="$emit('update:modelValue', n)"
      :aria-current="n === modelValue ? 'page' : undefined"
    >
      {{ n }}
    </button>

    <button
      class="px-3 py-1 rounded border text-sm disabled:opacity-50"
      :disabled="modelValue >= totalPages"
      @click="$emit('update:modelValue', modelValue + 1)"
      aria-label="Next page"
    >
      Next
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  maxVisible: { type: Number, default: 5 },
});

defineEmits(['update:modelValue']);

const visiblePages = computed(() => {
  const pages = [];
  const { modelValue, totalPages, maxVisible } = props;
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, modelValue - half);
  let end = Math.min(totalPages, start + maxVisible - 1);
  start = Math.max(1, Math.min(start, end - maxVisible + 1));
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});
</script>

<style scoped>
/* minimal styling kept; relies on Tailwind utility classes */
</style>
