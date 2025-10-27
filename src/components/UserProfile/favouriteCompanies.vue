<template>
  <div class="w-full min-h-screen bg-white">
    <div
      class="rounded-xl border border-gray-200 shadow-sm bg-gradient-to-r from-indigo-500/15 via-pink-500/15 to-amber-400/15 px-4 sm:px-6 py-3 sm:py-4 mb-6 flex items-center justify-between"
    >
      <h1 class="text-lg sm:text-xl font-semibold text-gray-900">
        My Favorite Company
      </h1>
      <button
        type="button"
        class="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm px-4 py-2 rounded shadow border-0 outline-none focus:outline-none focus:ring-0"
      >
        List Your Company
      </button>
    </div>

    <div class="space-y-3">
      <h2 class="text-sm font-semibold text-gray-700">All Favorite List</h2>

      <div
        v-for="(item, index) in items"
        :key="index"
        class="w-full relative rounded-lg border-whitesmoke border-solid border-[1px] box-border flex flex-col items-end justify-end pt-6 px-4 pb-4 gap-4 text-left text-num-16 text-gray font-plus-jakarta-sans"
      >
        <div class="self-stretch flex items-start justify-between gap-5">
          <div class="flex items-start gap-4 flex-grow">
            <div class="h-10 w-10 relative rounded bg-gainsboro-200 flex items-center justify-center shrink-0">
              <Building2 class="h-5 w-5 text-gray-500" />
            </div>

            <div class="flex flex-col items-start gap-2 flex-grow min-w-0">
              <b class="relative leading-[130%] capitalize text-base sm:text-lg truncate">
                {{ item.name }}
              </b>
              
              <div class="flex items-center gap-2 text-dimgray text-sm sm:text-base min-w-0">
                
                <div class="relative leading-[130%] capitalize whitespace-nowrap">
                  {{ item.category }}
                </div>

                <div class="flex items-center gap-2 whitespace-nowrap">
                  <div class="h-1.5 w-1.5 relative rounded-[50%] bg-gainsboro-100 shrink-0" />
                  <div class="relative leading-[130%] capitalize whitespace-nowrap">
                    Assigned: {{ item.assigned }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-end sm:items-center gap-2 text-dimgray text-sm sm:text-base shrink-0">
            <div class="flex items-center gap-2">
              <div class="relative leading-[130%] capitalize whitespace-nowrap hidden sm:block">Rating:</div>
              <Star class="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
              <div class="relative leading-[130%] capitalize whitespace-nowrap">
                {{ item.rating }} Star
              </div>
            </div>
          </div>
        </div>

        <Heart class="w-6 h-6 text-red-500 cursor-pointer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, Star, Heart } from 'lucide-vue-next'
import { computed } from 'vue'

// Load favourite companies from public stubs
const { data: companiesData } = await useFetch('/stubs/companies.json')

// Map to the view model used by the design
const items = computed(() => {
  const raw = (companiesData.value || []) as Array<any>
  return raw.slice(0, 8).map((c) => ({
    name: c.name,
    category: c.category || 'Technology',
    assigned: '2024-10-22',
    rating: 4 + ((c.id || 1) % 2),
  }))
})
</script>

<style scoped></style>