<template>
  <div class="w-full rounded-lg  bg-white border-whitesmoke border-solid border-[1px]r flex flex-col items-start p-4 lg:p-6 gap-4 text-left text-xl text-gray-900 font-plus-jakarta-sans">
    <!-- Header -->
    <div class="w-full flex items-center justify-between">
      <h2 class="relative leading-[130%] capitalize font-bold text-lg lg:text-xl">Recent Company</h2>
      <div class="relative text-sm lg:text-base leading-[130%] capitalize font-semibold text-amber-500 cursor-pointer hover:text-amber-600 transition-colors">
        See All
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="hidden lg:block w-full overflow-x-auto">
      <table class="w-full table-auto min-w-[800px]">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[160px]">Company Name</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Date</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Phone</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[160px]">Website</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Category</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Status</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr 
            v-for="(row, index) in rows" 
            :key="index" 
            class="hover:bg-gray-50 active:bg-gray-100 transition"
          >
            <td class="px-4 py-3 text-gray-900 font-medium text-sm truncate">{{ row.name }}</td>
            <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ row.date }}</td>
            <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ row.phone }}</td>
            <td class="px-4 py-3 text-yellow-500 text-sm truncate">{{ row.website }}</td>
            <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ row.category }}</td>
            <td class="px-4 py-3 whitespace-nowrap">
              <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-sm" :class="getStatusClass(row.status)">
                {{ row.status }}
              </span>
            </td>
            <td class="px-4 py-3 whitespace-nowrap">
              <MoreHorizontal class="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </td>
          </tr>
        </tbody>
      </table>
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
import { ref, onMounted } from 'vue';
import { MoreHorizontal } from 'lucide-vue-next';
import { getStatusClass } from '~/composables/useStatusClass'

// Load recent companies from stub
const rows = ref([]);

const fetchData = async () => {
  try {
    const response = await fetch('/stubs/recentCompanies.json');
    const rowsData = await response.json();
    rows.value = rowsData || [];
  } catch (error) {
    console.error('Failed to load recent companies:', error);
    rows.value = [];
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>