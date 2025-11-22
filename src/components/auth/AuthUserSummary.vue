<template>
  <div class="w-full rounded-xl border border-[#dbe7ff] bg-[#f6fafd] p-4 text-center">
    <p class="text-sm text-[#424242] font-medium">You're signed in as</p>
    <p class="text-lg font-semibold text-[#212121] mt-1">
      {{ userLabel }}
    </p>
    <div class="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
      <button
        type="button"
        class="px-4 py-2 rounded-lg bg-[#212121] text-white text-sm font-semibold w-full sm:w-auto"
        @click="$emit('primary')"
      >
        {{ primaryLabel }}
      </button>
      <button
        type="button"
        class="px-4 py-2 rounded-lg border border-[#dbe7ff] text-sm text-[#424242] w-full sm:w-auto"
        @click="$emit('secondary')"
      >
        {{ secondaryLabel }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
  primaryLabel: {
    type: String,
    default: 'Go to Dashboard',
  },
  secondaryLabel: {
    type: String,
    default: 'Logout',
  },
})

defineEmits(['primary', 'secondary'])

const userLabel = computed(() => {
  if (props.user?.name) return props.user.name
  if (props.user?.email) return props.user.email
  return 'Authenticated account'
})
</script>
