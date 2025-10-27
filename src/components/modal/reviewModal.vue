<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4" @click.self="$emit('close')">
    <div class="w-full max-w-2xl relative rounded-2xl bg-white flex flex-col items-center p-6 box-border gap-6 text-center text-[16px] text-black font-plus-jakarta-sans max-h-[85vh] overflow-y-auto">
      
      <button 
        @click="$emit('close')"
        class="absolute top-6 right-6 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors z-[110]"
        aria-label="Close modal"
      >
        <X class="w-5 h-5 text-gray-600" />
      </button>

      <b class="self-stretch relative text-[18px] leading-[160%] capitalize text-center">Review Details</b>
      
      <div class="w-full flex flex-col items-center p-4 gap-4 text-left text-gray">
        
        <div class="self-stretch flex flex-col items-start justify-center p-4 gap-4">
          
          <div class="self-stretch flex items-start gap-4">
            <div class="w-[140px] flex items-center gap-2 flex-shrink-0">
              <div class="flex-1 relative leading-[130%] capitalize font-semibold text-xs text-gray-900">Reviewer Name</div>
              <b class="relative text-[14px] leading-[160%] capitalize text-center text-gray-600">:</b>
            </div>
            <div class="flex-1 relative leading-[160%] text-gray-700 text-sm text-left">{{ review.reviewerName }}</div>
          </div>
          
          <div class="self-stretch flex items-start gap-4">
            <div class="w-[140px] flex items-center gap-2 flex-shrink-0">
              <div class="flex-1 relative leading-[130%] capitalize font-semibold text-xs text-gray-900">Email</div>
              <b class="relative text-[14px] leading-[160%] capitalize text-center text-gray-600">:</b>
            </div>
            <div class="flex-1 relative leading-[160%] text-gray-700 text-sm text-left break-all">{{ review.email }}</div>
          </div>
          
          <div class="self-stretch flex items-start gap-4">
            <div class="w-[140px] flex items-center gap-2 flex-shrink-0">
              <div class="flex-1 relative leading-[130%] capitalize font-semibold text-xs text-gray-900">Company</div>
              <b class="relative text-[14px] leading-[160%] capitalize text-center text-gray-600">:</b>
            </div>
            <div class="flex-1 relative leading-[160%] text-gray-700 text-sm text-left">{{ review.companyName }}</div>
          </div>
          
          <div class="self-stretch flex items-start gap-4">
            <div class="w-[140px] flex items-center gap-2 flex-shrink-0">
              <div class="flex-1 relative leading-[130%] capitalize font-semibold text-xs text-gray-900">Rating</div>
              <b class="relative text-[14px] leading-[160%] capitalize text-center text-gray-600">:</b>
            </div>
            <div class="flex-1 relative leading-[160%] text-gray-700 text-sm text-left">
              <div class="flex items-center gap-1">
                <Star 
                  v-for="star in 5" 
                  :key="star" 
                  class="w-4 h-4"
                  :class="star <= review.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
                />
                <span class="ml-2 text-sm text-gray-600">({{ review.stars }}/5)</span>
              </div>
            </div>
          </div>
          
          <div class="self-stretch flex items-start gap-4">
            <div class="w-[140px] flex items-start gap-2 flex-shrink-0">
              <div class="flex-1 relative leading-[130%] capitalize font-semibold text-xs text-gray-900 pt-1">Review</div>
              <b class="relative text-[14px] leading-[160%] capitalize text-center text-gray-600 pt-1">:</b>
            </div>
            <div class="flex-1 relative leading-[160%] text-gray-700 text-sm max-h-20 overflow-y-auto text-left">
              "{{ review.reviewText }}"
            </div>
          </div>
        </div>
      </div>
      
      <div class="self-stretch flex flex-wrap sm:flex-nowrap items-center gap-3">
        
        <button 
          @click="updateStatus('Approved')"
          class="w-full sm:flex-1 rounded bg-forestgreen hover:bg-green-700 flex items-center justify-center py-3 px-2 transition-colors font-semibold text-sm min-h-[44px] text-white border-none"
          :class="[{ 'bg-green-700': review.status === 'Approved' }, 'basis-[calc(50%-0.375rem)] sm:basis-auto']"
        >
          <div class="relative leading-[130%] capitalize text-xs">Approve</div>
        </button>
        
        <button 
          @click="updateStatus('Rejected')"
          class="w-full sm:flex-1 rounded bg-firebrick hover:bg-red-700 flex items-center justify-center py-3 px-2 transition-colors font-semibold text-sm min-h-[44px] text-white border-none"
          :class="[{ 'bg-red-700': review.status === 'Rejected' }, 'basis-[calc(50%-0.375rem)] sm:basis-auto']"
        >
          <div class="relative leading-[130%] capitalize text-xs">Reject</div>
        </button>
        
        <button 
          @click="updateStatus('On Hold')"
          class="w-full sm:flex-1 rounded bg-gold hover:bg-yellow-600 flex items-center justify-center py-3 px-2 transition-colors font-semibold text-sm min-h-[44px] text-gray-900 border-none"
          :class="[{ 'bg-yellow-600': review.status === 'On Hold' }, 'basis-[calc(50%-0.375rem)] sm:basis-auto']"
        >
          <div class="relative leading-[130%] capitalize text-xs">On Hold</div>
        </button>
        
        <button 
          @click="banReviewer"
          class="w-full sm:flex-1 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center py-3 px-2 transition-colors font-semibold text-sm min-h-[44px] text-gray-700 border-none"
          :class="['basis-[calc(50%-0.375rem)] sm:basis-auto']"
        >
          <div class="relative leading-[130%] capitalize text-xs">Ban Reviewer</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Star, X } from "lucide-vue-next";
import { onMounted, onUnmounted } from 'vue';

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

const emit = defineEmits(['close', 'update-status', 'ban-reviewer']);

const updateStatus = (status) => {
  emit('update-status', { reviewId: props.review.id, status });
};

const banReviewer = () => {
  emit('ban-reviewer', props.review.id);
};

// Prevent body scroll when modal is open
onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.body.style.overflow = '';
});

// Close modal on Escape key
const handleEscape = (event) => {
  if (event.key === 'Escape') {
    emit('close');
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
});
</script>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.bg-firebrick {
  background-color: #b22222;
}

.bg-forestgreen {
  background-color: #228b22;
}

.bg-gold {
  background-color: #ffd700;
}

/* Ensure modal appears above everything */
.fixed {
  position: fixed;
}

/* Improve modal backdrop */
.bg-opacity-50 {
  backdrop-filter: blur(4px);
}

/* Better close button styling */
button[aria-label="Close modal"] {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button[aria-label="Close modal"]:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Scrollbar styling for review text */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>