<template>
    <!-- Modal Background -->
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="$emit('close')">
      <!-- Modal Container -->
      <div class="w-full max-w-2xl relative rounded-2xl bg-white flex flex-col items-center p-6 box-border gap-6 text-center text-base text-gray font-plus-jakarta-sans max-h-[90vh] overflow-y-auto">
        
        <!-- Close Button -->
        <button 
          @click="$emit('close')"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X class="w-6 h-6" />
        </button>
  
        <!-- Modal Title -->
        <b class="self-stretch relative text-xl leading-[160%] capitalize text-black">Review Details</b>
        
        <!-- Review Content -->
        <div class="w-full [filter:drop-shadow(0px_0px_14px_rgba(0,_0,_0,_0.12))] rounded-2xl border border-gray-200 box-border flex flex-col items-center py-6 px-8 gap-4 text-left">
          
          <!-- Reviewer Name -->
          <div class="self-stretch flex items-start gap-4">
            <div class="w-48 flex items-center gap-4">
              <div class="flex-1 relative leading-[130%] capitalize font-semibold">Reviewer Name</div>
              <b class="relative text-lg leading-[160%] capitalize text-center">:</b>
            </div>
            <div class="flex-1 relative leading-[160%] capitalize text-gray-700">{{ review.reviewerName }}</div>
          </div>
          <div class="self-stretch relative border-gray-200 border-dashed border-t-[1px] box-border h-px" />
          
          <!-- Email -->
          <div class="self-stretch flex items-start gap-4">
            <div class="w-48 flex items-center gap-4">
              <div class="flex-1 relative leading-[130%] capitalize font-semibold">Email</div>
              <b class="relative text-lg leading-[160%] capitalize text-center">:</b>
            </div>
            <div class="flex-1 relative leading-[160%] text-gray-700">{{ review.email }}</div>
          </div>
          <div class="self-stretch relative border-gray-200 border-dashed border-t-[1px] box-border h-px" />
          
          <!-- Company -->
          <div class="self-stretch flex items-start gap-4">
            <div class="w-48 flex items-center gap-4">
              <div class="flex-1 relative leading-[130%] capitalize font-semibold">Company</div>
              <b class="relative text-lg leading-[160%] capitalize text-center">:</b>
            </div>
            <div class="flex-1 relative leading-[160%] capitalize text-gray-700">{{ review.companyName }}</div>
          </div>
          <div class="self-stretch relative border-gray-200 border-dashed border-t-[1px] box-border h-px" />
          
          <!-- Rating -->
          <div class="self-stretch flex items-center gap-4">
            <div class="w-48 flex items-center gap-4">
              <div class="flex-1 relative leading-[130%] capitalize font-semibold">Rating</div>
              <b class="relative text-lg leading-[160%] capitalize text-center">:</b>
            </div>
            <div class="flex items-center gap-1">
              <Star 
                v-for="star in 5" 
                :key="star" 
                class="w-6 h-6"
                :class="star <= review.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
              />
              <span class="text-sm text-gray-600 ml-2">({{ review.stars }} stars)</span>
            </div>
          </div>
          <div class="self-stretch relative border-gray-200 border-dashed border-t-[1px] box-border h-px" />
          
          <!-- Review Text -->
          <div class="self-stretch flex items-start gap-4">
            <div class="w-48 flex items-center gap-4">
              <div class="flex-1 relative leading-[130%] capitalize font-semibold">Review</div>
              <b class="relative text-lg leading-[160%] capitalize text-center">:</b>
            </div>
            <div class="flex-1 relative leading-[160%] text-gray-700">{{ review.reviewText }}</div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="self-stretch flex items-center gap-4">
          <button 
            @click="updateStatus('Approved')"
            class="flex-1 rounded bg-green-500 hover:bg-green-600 flex items-center justify-center py-4 px-8 text-white transition"
            :class="{ 'bg-green-600': review.status === 'Approved' }"
          >
            <div class="relative leading-[130%] capitalize font-semibold">Approve</div>
          </button>
          <button 
            @click="updateStatus('Rejected')"
            class="flex-1 rounded bg-red-500 hover:bg-red-600 flex items-center justify-center py-4 px-8 text-white transition"
            :class="{ 'bg-red-600': review.status === 'Rejected' }"
          >
            <div class="relative leading-[130%] capitalize font-semibold">Reject</div>
          </button>
          <button 
            @click="updateStatus('On Hold')"
            class="flex-1 rounded bg-purple-500 hover:bg-purple-600 flex items-center justify-center py-4 px-8 text-white transition"
            :class="{ 'bg-purple-600': review.status === 'On Hold' }"
          >
            <div class="relative leading-[130%] capitalize font-semibold">On Hold</div>
          </button>
          <button 
            @click="banReviewer"
            class="flex-1 rounded bg-gray-500 hover:bg-gray-600 flex items-center justify-center py-4 px-8 text-white transition"
          >
            <div class="relative leading-[130%] capitalize font-semibold">Ban Reviewer</div>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Star, X } from "lucide-vue-next";
  
  // Define props
  const props = defineProps({
    review: {
      type: Object,
      required: true,
      default: () => ({
        reviewerName: 'John Doe',
        email: 'john.doe@example.com',
        companyName: 'Tech Solution LTD',
        stars: 4,
        reviewText: 'Great experience working with this company. They were professional and helpful throughout.',
        status: 'Pending'
      })
    }
  });
  
  // Define emits
  const emit = defineEmits(['close', 'update-status', 'ban-reviewer']);
  
  // Update status function
  const updateStatus = (status) => {
    emit('update-status', { reviewId: props.review.id, status });
  };
  
  // Ban reviewer function
  const banReviewer = () => {
    emit('ban-reviewer', props.review.id);
  };
  </script>
  
  <style scoped>
  .font-plus-jakarta-sans {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  </style>