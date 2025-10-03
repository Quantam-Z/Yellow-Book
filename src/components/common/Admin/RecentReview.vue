<template>
  <div class="w-full rounded-lg bg-white border border-gray-200 box-border flex flex-col items-start p-6 gap-4 text-left text-xl text-gray-900 font-plus-jakarta-sans">
    <!-- Header -->
    <div class="w-full flex items-center justify-between">
      <h2 class="relative leading-[130%] capitalize font-bold">Recent Reviews</h2>
      <div class="relative text-base leading-[130%] capitalize font-semibold text-amber-500 cursor-pointer hover:text-amber-600 transition-colors">
        See All
      </div>
    </div>

    <!-- Table -->
    <div class="w-full flex-1 flex flex-col">
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
              <Star class="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{{ review.rating }}</span>
            </div>
            <div class="text-left truncate">{{ review.date }}</div>
            <div class="text-left truncate">{{ review.review }}</div>
            <div class="text-left truncate font-medium" :class="getStatusClass(review.status)">
              {{ review.status }}
            </div>
            <div class="text-left">
              <MoreHorizontal class="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </div>
          </div>
          
          <!-- Divider -->
          <div 
            v-if="index < reviews.length - 1" 
            class="w-full relative border-t border-dashed border-white h-px mt-3" 
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Star, MoreHorizontal } from 'lucide-vue-next';

const reviews = [
  { reviewer: 'Wade Warren', rating: '4.5', date: '12-June-2025', review: 'Great service and quick response time...', status: 'Pending' },
  { reviewer: 'Esther Howard', rating: '5.0', date: '11-June-2025', review: 'Excellent experience, highly recommend...', status: 'Approved' },
  { reviewer: 'Cameron Williamson', rating: '3.5', date: '10-June-2025', review: 'Good overall but could improve...', status: 'Pending' },
  { reviewer: 'Brooklyn Simmons', rating: '4.0', date: '09-June-2025', review: 'Very professional and courteous staff...', status: 'Approved' },
  { reviewer: 'Savannah Nguyen', rating: '2.5', date: '08-June-2025', review: 'Not satisfied with the service quality...', status: 'Rejected' },
];

const getStatusClass = (status) => {
  switch(status) {
    case 'Pending': return 'text-amber-500';
    case 'Approved': return 'text-green-500';
    case 'Rejected': return 'text-red-500';
    default: return 'text-gray-500';
  }
};
</script>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>
