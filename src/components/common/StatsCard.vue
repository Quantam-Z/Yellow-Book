<template>
  <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
    <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded flex items-center justify-center flex-shrink-0" :class="iconBgClass">
      <component :is="icon" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" :class="iconColorClass" />
    </div>
    <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
      <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">{{ label }}</div>
      <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ value }}</b>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: [Object, Function],
    required: true
  },
  iconBgClass: {
    type: String,
    default: 'bg-blue-100'
  },
  iconColorClass: {
    type: String,
    default: 'text-blue-600'
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  }
})
</script>
