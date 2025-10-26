<template>
  <!-- Modal Background -->
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4" @click.self="$emit('close')">
    <!-- Modal Container -->
    <div class="w-[577px] h-[408px] relative bg-white rounded-2xl flex flex-col items-center p-6 box-border gap-6 text-center text-[16px] text-black font-plus-jakarta-sans">
      
      <!-- Close Button -->
      <button 
        @click="$emit('close')"
        class="absolute top-6 right-6 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors z-[110]"
        aria-label="Close modal"
      >
        <X class="w-5 h-5 text-gray-600" />
      </button>

      <!-- Modal Title -->
      <b class="self-stretch relative text-[18px] leading-[160%] capitalize text-center">Moderate Review</b>
      
      <!-- Content Container -->
      <div class="w-full rounded-2xl border-whitesmoke border-solid border-[1px] box-border flex flex-col items-center p-4 gap-4 text-left text-gray">
        
        <!-- Review Details Card -->
        <div class="self-stretch rounded-lg border-whitesmoke border-solid border-[1px] flex flex-col items-start justify-center p-4 gap-4">
          
          <!-- Reviewer Name -->
          <div class="self-stretch flex items-start gap-4">
            <div class="w-[140px] flex items-center gap-4">
              <div class="flex-1 relative leading-[130%] capitalize font-semibold text-xs">Name</div>
              <b class="relative text-[18px] leading-[160%] capitalize text-center">:</b>
            </div>
            <div class="flex-1 relative leading-[160%] capitalize text-darkslategray text-sm">{{ review.reviewerName }}</div>
          </div>
          
          <!-- Email -->
          <div class="self-stretch flex items-start gap-4">
            <div class="w-[140px] flex items-center gap-4">
              <div class="flex-1 relative leading-[130%] capitalize font-semibold text-xs">Email</div>
              <b class="relative text-[18px] leading-[160%] capitalize text-center">:</b>
            </div>
            <div class="flex-1 relative leading-[160%] text-darkslategray text-sm">{{ review.email }}</div>
          </div>
          
          <!-- Company -->
          <div class="self-stretch flex items-start gap-4">
            <div class="w-[140px] flex items-center gap-4">
              <div class="flex-1 relative leading-[130%] capitalize font-semibold text-xs">Company</div>
              <b class="relative text-[18px] leading-[160%] capitalize text-center">:</b>
            </div>
            <div class="flex-1 relative leading-[160%] capitalize text-darkslategray text-sm">{{ review.companyName }}</div>
          </div>
          
          <!-- Rating -->
          <div class="self-stretch flex items-start gap-4">
            <div class="w-[140px] flex items-center gap-4">
              <div class="flex-1 relative leading-[130%] capitalize font-semibold text-xs">Rating</div>
              <b class="relative text-[18px] leading-[160%] capitalize text-center">:</b>
            </div>
            <div class="flex-1 relative leading-[160%] capitalize text-darkslategray text-sm">
              <div class="flex items-center gap-1">
                <Star 
                  v-for="star in 5" 
                  :key="star" 
                  class="w-4 h-4"
                  :class="star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
                />
                <span class="ml-2 text-sm">({{ review.rating }}/5)</span>
              </div>
            </div>
          </div>
          
          <!-- Review Text -->
          <div class="self-stretch flex items-start gap-4">
            <div class="w-[140px] flex items-center gap-4">
              <div class="flex-1 relative leading-[130%] capitalize font-semibold text-xs">Review</div>
              <b class="relative text-[18px] leading-[160%] capitalize text-center">:</b>
            </div>
            <div class="flex-1 relative leading-[160%] text-darkslategray text-sm max-h-20 overflow-y-auto">
              "{{ review.reviewText }}"
            </div>
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="self-stretch grid grid-cols-2 gap-4 text-white">
        <button 
          @click="approveReview"
          class="rounded bg-forestgreen hover:bg-green-700 flex items-center justify-center py-3 px-4 transition-colors font-semibold text-sm min-h-[44px]"
        >
          <div class="relative leading-[130%] capitalize">Approve</div>
        </button>
        <button 
          @click="rejectReview"
          class="rounded bg-firebrick hover:bg-red-700 flex items-center justify-center py-3 px-4 transition-colors font-semibold text-sm min-h-[44px]"
        >
          <div class="relative leading-[130%] capitalize">Reject</div>
        </button>
        <button 
          @click="holdReview"
          class="rounded bg-gold hover:bg-yellow-600 flex items-center justify-center py-3 px-4 transition-colors font-semibold text-sm min-h-[44px]"
        >
          <div class="relative leading-[130%] capitalize">On-Hold</div>
        </button>
        <button 
          @click="banReviewer"
          class="rounded bg-gray-500 hover:bg-gray-600 flex items-center justify-center py-3 px-4 transition-colors font-semibold text-sm min-h-[44px]"
        >
          <div class="relative leading-[130%] capitalize">Ban Reviewer</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X, Star } from 'lucide-vue-next';
import { onMounted, onUnmounted } from 'vue';

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

.border-whitesmoke {
  border-color: #f5f5f5;
}

.text-darkslategray {
  color: #2f4f4f;
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