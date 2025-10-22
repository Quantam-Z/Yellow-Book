<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  max: { type: Number, default: 5 },
  filledClass: { type: String, default: 'text-yellow-400 fill-yellow-400' },
  emptyClass: { type: String, default: 'text-gray-300' },
  sizeClass: { type: String, default: 'w-4 h-4' },
})

const clampedValue = computed(() => {
  const val = Number.isFinite(props.value) ? props.value : 0
  return Math.min(props.max, Math.max(0, Math.round(val)))
})
</script>

<template>
  <div class="inline-flex items-center gap-1" role="img" aria-label="Rating">
    <Star
      v-for="i in props.max"
      :key="i"
      :class="[props.sizeClass, i <= clampedValue ? props.filledClass : props.emptyClass]"
    />
  </div>
</template>
