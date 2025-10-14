<template>
  <div class="w-full rounded-lg border border-gray-200 box-border flex flex-col items-start p-4 lg:p-6 gap-4 text-left text-xl text-gray-900 font-plus-jakarta-sans">
    <!-- Header -->
    <div class="w-full flex items-center justify-between">
      <h2 class="relative leading-[130%] capitalize font-bold text-lg lg:text-xl">Recent Company</h2>
      <div class="relative text-sm lg:text-base leading-[130%] capitalize font-semibold text-amber-500 cursor-pointer hover:text-amber-600 transition-colors">
        See All
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="hidden lg:block w-full flex flex-col items-start text-center text-base">
      <!-- Table Header -->
      <div class="w-full relative h-12">
        <div class="absolute top-0 left-0 bg-gray-50 w-full h-12 rounded-lg" />
        <div class="absolute top-[18px] left-[11px] w-full grid grid-cols-7 gap-4 items-center text-sm font-semibold">
          <div class="text-left">Company Name</div>
          <div class="text-left">Date</div>
          <div class="text-left">Phone</div>
          <div class="text-left">Website</div>
          <div class="text-left">Category</div>
          <div class="text-left">Status</div>
          <div class="text-left">Actions</div>
        </div>
      </div>

      <!-- Table Rows -->
      <div class="w-full flex flex-col items-start text-gray-700">
        <!-- Row Template -->
        <div 
          v-for="(row, index) in rows" 
          :key="index" 
          class="w-full relative h-12 border-b border-dashed border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div class="absolute top-3 left-4 w-full grid grid-cols-7 gap-4 items-center text-sm">
            <div class="text-left truncate">{{ row.name }}</div>
            <div class="text-left truncate">{{ row.date }}</div>
            <div class="text-left truncate">{{ row.phone }}</div>
            <div class="text-left truncate text-amber-500 hover:text-amber-600 cursor-pointer">{{ row.website }}</div>
            <div class="text-left truncate">{{ row.category }}</div>
            <div class="text-left truncate font-semibold" :class="getStatusClass(row.status)">{{ row.status }}</div>
            <div class="text-left">
              <MoreHorizontal class="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer ml-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Cards -->
    <div class="lg:hidden w-full flex flex-col gap-4">
      <div 
        v-for="(row, index) in rows" 
        :key="index"
        class="w-full rounded-lg border border-gray-200 p-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <!-- Card Header -->
        <div class="flex justify-between items-start mb-3">
          <div class="flex flex-col">
            <h3 class="font-semibold text-gray-900 text-base">{{ row.name }}</h3>
            <span class="text-sm text-gray-600 mt-1">{{ row.category }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-medium px-2 py-1 rounded-full" :class="getStatusClass(row.status) + ' bg-opacity-10'">
              {{ row.status }}
            </span>
            <MoreHorizontal class="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
          </div>
        </div>

        <!-- Company Details -->
        <div class="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div class="flex flex-col">
            <span class="text-gray-500 text-xs">Date</span>
            <span class="text-gray-700">{{ row.date }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-500 text-xs">Phone</span>
            <span class="text-gray-700">{{ row.phone }}</span>
          </div>
          <div class="flex flex-col col-span-2">
            <span class="text-gray-500 text-xs">Website</span>
            <a :href="'https://' + row.website" class="text-amber-500 hover:text-amber-600 truncate" target="_blank">
              {{ row.website }}
            </a>
          </div>
        </div>

        <!-- Action Button -->
        <div class="flex justify-end">
          <button class="text-amber-500 hover:text-amber-600 font-medium text-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MoreHorizontal } from 'lucide-vue-next';
import { getStatusClass } from '~/composables/useStatusClass'

// Load recent companies from stub
const { data: rowsData } = await useFetch('/stubs/recentCompanies.json')
const rows = rowsData.value || []
</script>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>