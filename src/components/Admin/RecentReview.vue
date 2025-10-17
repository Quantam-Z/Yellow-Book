<template>
  <div class="w-full rounded-lg bg-white border border-gray-200 box-border flex flex-col items-start p-4 lg:p-6 gap-4 text-left text-xl text-gray-900 font-plus-jakarta-sans">
    <!-- Header -->
    <div class="w-full flex items-center justify-between">
      <h2 class="relative leading-[130%] capitalize font-bold text-lg lg:text-xl">Recent Reviews</h2>
      <div class="relative text-sm lg:text-base leading-[130%] capitalize font-semibold text-amber-500 cursor-pointer hover:text-amber-600 transition-colors">
        See All
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="hidden lg:block w-full flex-1 flex flex-col">
      <!-- Table Header -->
      <div class="w-full rounded-lg bg-gray-50 px-4 py-3 mb-2">
        <div class="grid grid-cols-6 gap-4 text-sm font-semibold text-gray-700">
          <div class="text-left">Reviewer</div>
          <div class="text-left">Rating</div>
          <div class="text-left">Date</div>
          <div class="text-left">Review</div>
          <div class="text-left">Status</div>
          <div class="text-left">Action</div>
        </div>
      </div>

      <!-- Table Body -->
      <div class="w-full flex-1 flex flex-col">
        <div 
          v-for="(review, index) in reviews" 
          :key="index"
          class="w-full"
        >
          <div class="grid grid-cols-6 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-sm text-gray-700">
            <div class="text-left truncate">{{ review.reviewer }}</div>
            <div class="text-left flex items-center gap-1">
              <RatingStars :value="Number(review.rating)" :size-class="'w-4 h-4'" />
              <span>{{ review.rating }}</span>
            </div>
            <div class="text-left truncate">{{ review.date }}</div>
            <div class="text-left truncate">{{ review.review }}</div>
            <div class="text-left truncate font-medium" :class="getStatusClass(review.status, 'soft')">
              {{ review.status }}
            </div>
            <div class="text-left">
              <MoreHorizontal class="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </div>
          </div>
          
          <!-- Divider -->
          <div 
            v-if="index < reviews.length - 1" 
            class="w-full relative border-t border-dashed border-gray-100 h-px mt-3" 
          />
        </div>
      </div>
    </div>

    <!-- Mobile Cards -->
    <div class="lg:hidden w-full flex flex-col gap-4">
      <div 
        v-for="(review, index) in reviews" 
        :key="index"
        class="w-full rounded-lg border border-gray-200 p-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <!-- Mobile Card Header -->
        <div class="flex justify-between items-start mb-3">
          <div class="flex flex-col">
            <h3 class="font-semibold text-gray-900 text-base">{{ review.reviewer }}</h3>
            <div class="flex items-center gap-1 mt-1">
              <RatingStars :value="Number(review.rating)" :size-class="'w-4 h-4'" />
              <span class="text-sm text-gray-600">{{ review.rating }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-medium px-2 py-1 rounded-full" :class="getStatusClass(review.status, 'soft') + ' bg-opacity-10'">
              {{ review.status }}
            </span>
            <MoreHorizontal class="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
          </div>
        </div>

        <!-- Review Content -->
        <div class="mb-3">
          <p class="text-sm text-gray-700 line-clamp-2">{{ review.review }}</p>
        </div>

        <!-- Footer -->
        <div class="flex justify-between items-center text-xs text-gray-500">
          <span>{{ review.date }}</span>
          <button class="text-amber-500 hover:text-amber-600 font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MoreHorizontal } from 'lucide-vue-next';
import RatingStars from '~/components/common/RatingStars.vue'
import { getStatusClass } from '~/composables/useStatusClass'

// Load recent reviews from stub
const { data: reviewsData } = await useFetch('/stubs/recentReviews.json')
const reviews = reviewsData.value || []
</script>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>