<template>
    <!-- Modal Background -->
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4" @click.self="$emit('close')">
      <!-- Ultra Compact Modal -->
      <div class="modal-container relative bg-white rounded-xl shadow-xl flex flex-col p-3 sm:p-4 gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-600 font-plus-jakarta-sans">
        
        <!-- Close Button -->
        <button 
          @click="$emit('close')"
          class="absolute top-1 right-1 p-0.5 rounded bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <X class="w-2.5 h-2.5 text-gray-600" />
        </button>
  
        <!-- Title -->
        <b class="text-center text-xs sm:text-sm text-black">Moderate Review</b>
        
        <!-- Review Content -->
        <div class="border border-gray-200 rounded p-2 sm:p-3 space-y-1">
          <!-- Reviewer Info -->
          <div class="flex justify-between pb-0.5">
            <span class="font-semibold text-gray-900">Name:</span>
            <span class="text-white truncate ml-1">{{ review.reviewerName }}</span>
          </div>
          
          <div class="flex justify-between pb-0.5">
            <span class="font-semibold text-gray-900">Email:</span>
            <span class="text-white truncate ml-1">{{ review.email }}</span>
          </div>
          
          <div class="flex justify-between pb-0.5">
            <span class="font-semibold text-gray-900">Company:</span>
            <span class="text-white truncate ml-1">{{ review.companyName }}</span>
          </div>
          
          <!-- Rating -->
          <div class="flex justify-between items-center pb-0.5">
            <span class="font-semibold text-gray-900">Rating:</span>
            <div class="flex items-center gap-0.5">
              <Star 
                v-for="star in 5" 
                :key="star" 
                class="w-2.5 h-2.5"
                :class="star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
              />
            </div>
          </div>
          
          <!-- Review Text -->
          <div>
            <div class="font-semibold text-gray-900 mb-0.5">Review:</div>
            <div class="text-white max-h-12 overflow-y-auto text-[10px] leading-tight">
              {{ review.reviewText }}
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="grid grid-cols-2 gap-1 sm:gap-2">
          <button 
            @click="approveReview"
            class="bg-green-600 hover:bg-green-700 py-1 px-1.5 text-white rounded text-[10px] font-medium"
          >
            Approve
          </button>
          <button 
            @click="rejectReview"
            class="bg-red-600 hover:bg-red-700 py-1 px-1.5 text-white rounded text-[10px] font-medium"
          >
            Reject
          </button>
          <button 
            @click="holdReview"
            class="bg-gold hover:bg-goldenrod active:bg-[#d4a007] py-1 px-1.5 text-black rounded text-[10px] font-medium"
          >
            On-Hold
          </button>
          <button 
            @click="banReviewer"
            class="border border-gray-300 hover:bg-gray-50 py-1 px-1.5 text-gray-700 rounded text-[10px] font-medium"
          >
            Ban Reviewer
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { X, Star } from 'lucide-vue-next';
  
  // Define props
  const props = defineProps({
    review: {
      type: Object,
      required: true,
      default: () => ({
        reviewerName: 'John Doe',
        email: 'john.doe@example.com',
        companyName: 'Innovate Solutions',
        rating: 4,
        reviewText: 'Great experience working with this company. They were professional and helpful throughout.'
      })
    }
  });
  
  // Define emits
  const emit = defineEmits(['close', 'approve', 'reject', 'hold', 'ban']);
  
  // Action methods
  const approveReview = () => {
    emit('approve', props.review.id);
    emit('close');
  };
  
  const rejectReview = () => {
    emit('reject', props.review.id);
    emit('close');
  };
  
  const holdReview = () => {
    emit('hold', props.review.id);
    emit('close');
  };
  
  const banReviewer = () => {
    emit('ban', props.review.id);
    emit('close');
  };
  </script>
  
  <style scoped>
  .font-plus-jakarta-sans {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  
  .modal-container {
    width: 100%;
    max-width: 577px;
    height: auto;
    max-height: 90vh;
  }
  </style>