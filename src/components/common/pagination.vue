<template>
  <nav class="flex select-none items-center gap-3 text-sm" role="navigation" aria-label="Pagination">
    <button
      class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-gray-400 hover:text-gray-700 disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-300"
      :disabled="modelValue <= 1"
      @click="$emit('update:modelValue', modelValue - 1)"
      aria-label="Previous page"
    >
      ‹
    </button>

    <div class="flex items-center gap-2">
      <button
        v-for="n in visiblePages"
        :key="n"
        class="inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium transition"
        :class="
          n === modelValue
            ? 'border-transparent bg-[#facc15] text-[#212121] shadow-[0_12px_24px_rgba(250,204,21,0.4)]'
            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
        "
        @click="$emit('update:modelValue', n)"
        :aria-current="n === modelValue ? 'page' : undefined"
      >
        {{ n }}
      </button>
    </div>

    <button
      class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-gray-400 hover:text-gray-700 disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-300"
      :disabled="modelValue >= totalPages"
      @click="$emit('update:modelValue', modelValue + 1)"
      aria-label="Next page"
    >
      ›
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
