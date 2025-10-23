<template>
  <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
      <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{{ title }}</h1>
      <slot name="action-button" />
    </div>

    <!-- Search Bar -->
    <div class="w-full relative rounded-lg bg-white/80 backdrop-blur-sm flex items-center px-4 py-3 gap-3">
      <SearchIcon class="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
      <input
        type="text"
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        :placeholder="searchPlaceholder"
        class="flex-1 outline-none border-none bg-transparent text-gray-700 placeholder-gray-400 text-base min-w-0 
               focus:ring-0 focus:outline-none"
      />
    </div>
  </div>
</template>

<script setup>
import { Search as SearchIcon } from 'lucide-vue-next'

defineProps({
  title: {
    type: String,
    required: true
  },
  searchQuery: {
    type: String,
    default: ''
  },
  searchPlaceholder: {
    type: String,
    default: 'Search...'
  }
})

defineEmits(['update:searchQuery'])
</script>
