<template>
  <div class="w-full rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex flex-col items-start p-4 lg:p-6 gap-4 text-left text-xl text-gray-900 font-plus-jakarta-sans">
    <!-- Header -->
    <div class="w-full flex items-center justify-between">
      <h2 class="relative leading-[130%] capitalize font-bold text-lg lg:text-xl">Recent Reviews</h2>
      <div class="relative text-sm lg:text-base leading-[130%] capitalize font-semibold text-amber-500 cursor-pointer hover:text-amber-600 transition-colors">
        See All
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="hidden lg:block w-full overflow-x-auto">
      <table class="w-full table-auto min-w-[800px]">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Reviewer</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Rating</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Date</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Review</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Status</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(review, index) in reviews" :key="index" class="hover:bg-gray-50 active:bg-gray-100 transition">
            <td class="px-4 py-3 text-gray-900 font-medium text-sm truncate">{{ review.reviewer }}</td>
            <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
              <div class="flex items-center gap-1">
                <span>{{ review.rating }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ review.date }}</td>
            <td class="px-4 py-3 text-gray-700 text-sm truncate">
  {{ review.review.split(' ').slice(0, 1).join(' ') }}
</td>
            <td class="px-4 py-3 whitespace-nowrap">
              <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-sm" :class="getStatusClass(review.status, 'soft')">
                {{ review.status }}
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
          <span
  @click="viewDetails(company)"
  class="text-amber-500 hover:text-amber-600 font-medium cursor-pointer"
>
  View Details
</span>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { MoreHorizontal } from 'lucide-vue-next';
import RatingStars from '~/components/common/RatingStars.vue'
import { getStatusClass } from '~/composables/useStatusClass'

// Load recent reviews from stub
const reviews = ref([]);

const fetchData = async () => {
  try {
    const response = await fetch('/stubs/recentReviews.json');
    const reviewsData = await response.json();
    reviews.value = reviewsData || [];
  } catch (error) {
    console.error('Failed to load recent reviews:', error);
    reviews.value = [];
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>