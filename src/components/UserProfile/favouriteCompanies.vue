<template>
  <div class="w-full min-h-screen bg-white">
    <!-- Page header -->
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
        <div class="self-stretch flex items-center justify-between gap-5">
          <div class="flex items-center gap-4">
            <div class="h-10 w-10 relative rounded bg-gainsboro-200 flex items-center justify-center">
              <Building2 class="h-5 w-5 text-gray-500" />
            </div>
            <div class="w-[260px] flex flex-col items-start gap-4">
              <b class="self-stretch relative leading-[130%] capitalize">
                {{ item.name }}
              </b>
              <div class="self-stretch flex items-center gap-2 text-dimgray">
                <div class="relative leading-[130%] capitalize">
                  {{ item.category }}
                </div>
                <div class="flex items-center gap-2">
                  <div class="h-1.5 w-1.5 relative rounded-[50%] bg-gainsboro-100" />
                  <div class="relative leading-[130%] capitalize">
                    Assigned: {{ item.assigned }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 text-dimgray">
            <div class="relative leading-[130%] capitalize">Rating:</div>
            <div class="flex items-center gap-2">
              <Star class="h-6 w-6 text-yellow-500" />
              <div class="relative leading-[130%] capitalize">
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

const items = [
  {
    name: 'Innovate Solutions',
    category: 'Tech',
    assigned: '2024-10-22',
    rating: 5,
  },
  {
    name: 'Digital Dynamics Ltd.',
    category: 'Software',
    assigned: '2024-09-15',
    rating: 4,
  },
  {
    name: 'NextGen IT Solutions',
    category: 'Web Development',
    assigned: '2024-08-03',
    rating: 5,
  },
  {
    name: 'TechHive Bangladesh',
    category: 'Technology',
    assigned: '2024-07-11',
    rating: 5,
  },
]
</script>

<style scoped></style>
