<script setup lang="ts">
import { star } from 'lucide-vue-next'

const props = defineProps({
  value: { type: Number, default: 0 },
  max: { type: Number, default: 5 },
  filledClass: { type: String, default: 'text-yellow-400 fill-yellow-400' },
  emptyClass: { type: String, default: 'text-gray-300' },
  sizeClass: { type: String, default: 'w-4 h-4' },
})
</script>

<template>
  <div class="inline-flex items-center gap-1">
    <star
      v-for="i in props.max"
      :key="i"
      :class="[props.sizeClass, i <= Math.round(props.value) ? props.filledClass : props.emptyClass]"
    />
  </div>
</template>
