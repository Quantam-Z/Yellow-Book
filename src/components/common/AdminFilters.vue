<template>
  <div>
    <!-- Mobile Filters Toggle -->
    <div class="mb-4 flex lg:hidden items-center justify-between">
      <h2 class="text-base font-bold text-gray-900">{{ listTitle }}</h2>
      <button 
        @click="$emit('toggle-mobile-filters')"
        class="h-12 bg-white rounded-xl px-4 py-2 border border-gray-300 text-gray-700 text-sm outline-none cursor-pointer whitespace-nowrap touch-manipulation flex items-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition"
        aria-controls="mobile-filters"
        :aria-expanded="showMobileFilters ? 'true' : 'false'"
      >
        <FilterIcon class="w-4 h-4" aria-hidden="true" />
        <span>Filters</span>
      </button>
    </div>

    <!-- Desktop Filters -->
    <div class="hidden lg:flex items-center flex-wrap gap-3 min-w-full mb-6">
      <h2 class="text-lg font-bold text-gray-900 whitespace-nowrap">
        {{ listTitle }}
      </h2>

      <!-- Date From -->
      <div class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 flex items-center px-4 gap-2 text-sm">
        <span class="text-gray-400 text-sm">From:</span>
        <input 
          type="date" 
          :value="filters.dateFrom"
          @change="$emit('update:filters', { ...filters, dateFrom: $event.target.value })"
          class="text-gray-600 text-sm outline-none bg-transparent cursor-pointer border-none touch-manipulation ring-0 focus:ring-0 w-32"
        />
      </div>

      <!-- Date To -->
      <div class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 flex items-center px-4 gap-2 text-sm">
        <span class="text-gray-400 text-sm">To:</span>
        <input 
          type="date" 
          :value="filters.dateTo"
          @change="$emit('update:filters', { ...filters, dateTo: $event.target.value })"
          class="text-gray-600 text-sm outline-none bg-transparent cursor-pointer border-none touch-manipulation ring-0 focus:ring-0 w-32"
        />
      </div>

      <!-- Time Range -->
      <div class="relative">
        <select 
          :value="filters.timeRange"
          @change="$emit('update:filters', { ...filters, timeRange: $event.target.value })"
          class="h-12 rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0 min-w-[140px]" 
        >
          <option value="">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
        </select>
        <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
      </div>

      <!-- Custom Filters Slot -->
      <slot name="custom-filters" />
    </div>

    <!-- Mobile Filters -->
    <div v-if="showMobileFilters" id="mobile-filters" class="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200 lg:hidden">
      <div class="space-y-4">
        <!-- Date Range -->
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-700 font-medium">From</label>
            <div class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 flex items-center px-4 gap-2">
              <input
                type="date"
                :value="filters.dateFrom"
                @change="$emit('update:filters', { ...filters, dateFrom: $event.target.value })"
                class="text-gray-600 text-sm outline-none bg-transparent cursor-pointer border-none touch-manipulation ring-0 focus:ring-0 w-full"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-700 font-medium">To</label>
            <div class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 flex items-center px-4 gap-2">
              <input
                type="date"
                :value="filters.dateTo"
                @change="$emit('update:filters', { ...filters, dateTo: $event.target.value })"
                class="text-gray-600 text-sm outline-none bg-transparent cursor-pointer border-none touch-manipulation ring-0 focus:ring-0 w-full"
              />
            </div>
          </div>
        </div>

        <!-- Time Range -->
        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-700 font-medium">Time Range</label>
          <div class="relative">
            <select 
              :value="filters.timeRange"
              @change="$emit('update:filters', { ...filters, timeRange: $event.target.value })"
              class="h-12 w-full rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0" 
            >
              <option value="">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
            </select>
            <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
          </div>
        </div>

        <!-- Custom Mobile Filters Slot -->
        <slot name="mobile-custom-filters" />
      </div>

      <div class="mt-6 flex items-center justify-end gap-3">
        <button @click="$emit('reset-filters')" class="px-4 py-3 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation transition">Reset</button>
        <button @click="$emit('apply-mobile-filters')" class="px-4 py-3 text-sm text-gray-900 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 rounded-lg touch-manipulation transition">Apply</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDown as ChevronDownIcon, Filter as FilterIcon } from 'lucide-vue-next'

defineProps({
  filters: {
    type: Object,
    required: true
  },
  showMobileFilters: {
    type: Boolean,
    default: false
  },
  listTitle: {
    type: String,
    default: 'All List'
  }
})

defineEmits(['update:filters', 'toggle-mobile-filters', 'reset-filters', 'apply-mobile-filters'])
</script>
