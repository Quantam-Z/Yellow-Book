<template>
  <div class="w-full min-h-screen bg-white">
    <!-- Page header -->
    <div class="rounded-xl border border-gray-200 shadow-sm bg-gradient-to-r from-indigo-500/15 via-pink-500/15 to-amber-400/15 px-4 sm:px-6 py-3 sm:py-4 mb-6 flex items-center justify-between">
      <h1 class="text-lg sm:text-xl font-semibold text-gray-900">My Reviews</h1>
      <button
        type="button"
        class="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm px-4 py-2 rounded shadow border-0 focus:outline-none focus:ring-0"
      >
        List Your Company
      </button>
    </div>

    <div class="space-y-3">
      <h2 class="text-sm font-semibold text-gray-700">All Review List</h2>

      <div
        v-for="(review, index) in reviews"
        :key="index"
        class="w-full relative rounded-lg border-whitesmoke border-solid border-[1px] box-border flex flex-col items-end justify-end pt-6 px-4 pb-4 gap-6 text-left text-lg text-gray font-plus-jakarta-sans"
      >
        <div class="self-stretch flex flex-col items-start gap-8">
          <div class="self-stretch flex items-center justify-between gap-5">
            <div class="flex items-center gap-4">
              <div class="h-12 w-12 relative rounded bg-gainsboro" />
              <div class="flex flex-col items-start justify-center gap-4">
                <b class="relative leading-[160%] capitalize">{{ review.company }}</b>
                <div class="relative text-base leading-[130%] capitalize text-darkslategray">
                  Reviewed on {{ review.date }}
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2 text-base text-dimgray">
              <div class="relative leading-[130%] capitalize">Rating:</div>
              <div class="flex items-center gap-2">
                <Star class="h-6 w-6 text-yellow-500" />
                <div class="relative leading-[130%] capitalize">{{ review.rating }} Star</div>
              </div>
            </div>
          </div>
          <div class="self-stretch relative text-base leading-[160%] capitalize text-darkslategray">
            "{{ review.comment }}"
          </div>
        </div>
        <div class="flex items-center gap-3">
          <Edit3 class="h-6 w-6 text-green-600 cursor-pointer" />
          <Trash2 class="h-6 w-6 text-red-500 cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star, Edit3, Trash2 } from 'lucide-vue-next'

const reviews = [
  {
    company: 'Innovate Solutions',
    date: 'October 15, 2023',
    rating: 5,
    comment: 'Absolutely fantastic service from start to finish. Highly recommend!',
  },
  {
    company: 'Digital Dynamics Ltd.',
    date: 'September 8, 2023',
    rating: 4,
    comment: 'Good communication and timely delivery.',
  },
  {
    company: 'TechHive Bangladesh',
    date: 'August 22, 2023',
    rating: 5,
    comment: 'Excellent quality and quick response from support team!',
  },
  {
    company: 'BizNest IT Solutions',
    date: 'July 19, 2023',
    rating: 3,
    comment: 'Decent service, but delivery could have been faster.',
  },
  {
    company: 'NextGen Software House',
    date: 'June 12, 2023',
    rating: 5,
    comment: 'Super smooth experience, on-time delivery, great communication.',
  },
]
</script>

<style scoped></style>
