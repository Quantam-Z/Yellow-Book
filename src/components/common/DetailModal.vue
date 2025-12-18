<template>
  <Transition name="detail-modal-fade">
    <div
      v-if="open"
      class="fixed inset-0 z-[55] flex items-center justify-center p-4 sm:p-6 bg-gray-900/60"
      @click.self="handleClose"
    >
      <div class="relative w-full max-w-md rounded-2xl bg-white shadow-xl p-6 font-plus-jakarta-sans">
        <button
          type="button"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none border-0 outline-none bg-transparent"
          @click="handleClose"
          aria-label="Close details dialog"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        <h3 class="text-lg font-semibold text-gray-900 mb-5">{{ title }}</h3>

        <div class="space-y-4">
          <div
            v-for="item in items"
            :key="item.label"
            class="flex items-start justify-between gap-4 text-sm"
          >
            <span class="text-gray-500 font-medium">{{ item.label }}</span>
            <span class="text-gray-900 text-right break-all whitespace-pre-wrap">{{ item.value ?? '—' }}</span>
          </div>
        </div>

        <div v-if="$slots.footer" class="mt-6">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  items: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['close'])

const handleClose = () => emit('close')
</script>

<style scoped>
.detail-modal-fade-enter-active,
.detail-modal-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.detail-modal-fade-enter-from,
.detail-modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>
