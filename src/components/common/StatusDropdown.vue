<template>
  <div class="relative inline-flex items-center">
    <select
      :value="modelValue ?? ''"
      :disabled="disabled"
      class="appearance-none pr-8 pl-3 py-1.5 rounded-md text-sm font-medium transition outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1"
      :class="[
        getStatusClass(modelValue, variant),
        disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
      ]"
      @change="handleChange"
    >
      <option v-if="placeholder" value="" disabled>
        {{ placeholder }}
      </option>
      <option v-for="opt in renderedOptions" :key="opt" :value="opt">
        {{ opt }}
      </option>
    </select>

    <ChevronDownIcon
      class="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-current opacity-70 pointer-events-none"
      aria-hidden="true"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronDown as ChevronDownIcon } from 'lucide-vue-next'
import { getStatusClass } from '~/composables/useStatusClass'

type StatusVariant = 'badge' | 'soft'

const props = withDefaults(
  defineProps<{
    modelValue?: string | null
    options: string[]
    variant?: StatusVariant
    disabled?: boolean
    placeholder?: string
  }>(),
  {
    variant: 'badge',
    disabled: false,
    placeholder: '',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const renderedOptions = computed(() => {
  const base = Array.isArray(props.options) ? [...props.options] : []
  const current = props.modelValue ?? ''
  if (current && !base.includes(current)) {
    base.unshift(current)
  }
  return base
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement | null
  const value = target?.value ?? ''
  emit('update:modelValue', value)
  emit('change', value)
}
</script>
