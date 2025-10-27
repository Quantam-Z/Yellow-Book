<template>
  <!-- Modal Background -->
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4" @click.self="$emit('close')">
      <!-- Modal Container -->
      <div class="w-full max-w-2xl relative bg-white rounded-2xl flex flex-col items-center p-6 box-border gap-6 text-center text-[16px] text-black font-plus-jakarta-sans max-h-[85vh] overflow-y-auto">
          
          <!-- Close Button -->
          <button 
              @click="$emit('close')"
              class="absolute top-6 right-6 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors z-[110]"
              aria-label="Close modal"
          >
              <X class="w-5 h-5 text-gray-600" />
          </button>

          <!-- Modal Title -->
          <b class="self-stretch relative text-[18px] leading-[160%] capitalize">Review & Verify Company</b>
          
          <!-- Content Container -->
          <div class="w-full rounded-2xl border-whitesmoke border-solid border-[1px] box-border flex flex-col items-center p-4 gap-4 text-left text-gray">
              
              <!-- Company Details Card -->
              <div class="self-stretch rounded-lg border-whitesmoke border-solid border-[1px] flex flex-col items-start justify-center p-4 gap-4">
                  
                  <!-- Company Name -->
                  <div class="self-stretch grid grid-cols-1 sm:grid-cols-[212px_1fr] items-start gap-2 sm:gap-4">
                      <div class="flex items-center gap-4">
                          <div class="relative leading-[130%] capitalize font-semibold text-xs sm:flex-1">Company Name</div>
                          <b class="hidden sm:block relative text-[18px] leading-[160%] capitalize text-center">:</b>
                      </div>
                      <div class="relative leading-[160%] capitalize text-darkslategray text-sm">{{ company.name }}</div>
                  </div>
                  
                  <!-- Category -->
                  <div class="self-stretch grid grid-cols-1 sm:grid-cols-[212px_1fr] items-start gap-2 sm:gap-4">
                      <div class="flex items-center gap-4">
                          <div class="relative leading-[130%] capitalize font-semibold text-xs sm:flex-1">Category</div>
                          <b class="hidden sm:block relative text-[18px] leading-[160%] capitalize text-center">:</b>
                      </div>
                      <div class="relative leading-[160%] text-darkslategray text-sm">{{ company.category }}</div>
                  </div>
                  
                  <!-- Industry -->
                  <div class="self-stretch grid grid-cols-1 sm:grid-cols-[212px_1fr] items-start gap-2 sm:gap-4">
                      <div class="flex items-center gap-4">
                          <div class="relative leading-[130%] capitalize font-semibold text-xs sm:flex-1">Industry</div>
                          <b class="hidden sm:block relative text-[18px] leading-[160%] capitalize text-center">:</b>
                      </div>
                      <div class="relative leading-[160%] capitalize text-darkslategray text-sm">{{ company.industry }}</div>
                  </div>
                  
                  <!-- Contact Email -->
                  <div class="self-stretch grid grid-cols-1 sm:grid-cols-[212px_1fr] items-start gap-2 sm:gap-4">
                      <div class="flex items-center gap-4">
                          <div class="relative leading-[130%] capitalize font-semibold text-xs sm:flex-1">Contact Email</div>
                          <b class="hidden sm:block relative text-[18px] leading-[160%] capitalize text-center">:</b>
                      </div>
                      <div class="relative leading-[160%] text-darkslategray text-sm break-all">{{ company.email }}</div>
                  </div>
                  
                  <!-- Phone Number -->
                  <div class="self-stretch grid grid-cols-1 sm:grid-cols-[212px_1fr] items-start gap-2 sm:gap-4">
                      <div class="flex items-center gap-4">
                          <div class="relative leading-[130%] capitalize font-semibold text-xs sm:flex-1">Phone Number</div>
                          <b class="hidden sm:block relative text-[18px] leading-[160%] capitalize text-center">:</b>
                      </div>
                      <div class="relative leading-[160%] capitalize text-darkslategray text-sm">{{ company.phone }}</div>
                  </div>
                  
                  <!-- Website -->
                  <div class="self-stretch grid grid-cols-1 sm:grid-cols-[212px_1fr] items-start gap-2 sm:gap-4">
                      <div class="flex items-center gap-4">
                          <div class="relative leading-[130%] capitalize font-semibold text-xs sm:flex-1">Website</div>
                          <b class="hidden sm:block relative text-[18px] leading-[160%] capitalize text-center">:</b>
                      </div>
                      <div class="relative leading-[160%] text-gold text-sm break-all">
                          <a :href="`https://${company.website}`" target="_blank" rel="noopener" class="no-underline hover:underline">{{ company.website }}</a>
                      </div>
                  </div>
              </div>
              
              <!-- Verification Checklist Card -->
              <div class="self-stretch rounded-lg border-whitesmoke border-solid border-[1px] flex flex-col items-start p-4 gap-4">
                  <div class="self-stretch relative leading-[130%] capitalize font-semibold text-sm">Verification Checklist</div>
                  <div class="self-stretch flex flex-col items-start justify-center gap-4 text-center text-darkslategray">
                      
                      <!-- Phone Verification -->
                      <div class="flex items-center gap-2">
                          <input
                              type="checkbox"
                              v-model="verification.phoneVerified"
                              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div class="relative leading-[130%] capitalize text-sm">Verified Via Phone Call</div>
                      </div>
                      
                      <!-- Email Verification -->
                      <div class="flex items-center gap-2">
                          <input
                              type="checkbox"
                              v-model="verification.emailVerified"
                              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div class="relative leading-[130%] capitalize text-sm">Verified Via Email</div>
                      </div>

                      <!-- Website Verification -->
                      <div class="flex items-center gap-2">
                          <input
                              type="checkbox"
                              v-model="verification.websiteVerified"
                              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div class="relative leading-[130%] capitalize text-sm">Website Verified</div>
                      </div>
                  </div>
              </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="self-stretch flex flex-col sm:flex-row items-center gap-4 text-white">
              <button 
                  @click="rejectVerification"
                  :disabled="!canReject"
                  class="w-full sm:flex-1 rounded bg-firebrick hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed flex items-center justify-center py-4 px-8 transition-colors font-semibold text-sm min-h-[44px]"
              >
                  <div class="relative leading-[130%] capitalize">Reject Verification</div>
              </button>
              <button 
                  @click="approveVerification"
                  :disabled="!canApprove"
                  class="w-full sm:flex-1 rounded bg-forestgreen hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed flex items-center justify-center py-4 px-8 transition-colors font-semibold text-sm min-h-[44px]"
              >
                  <div class="relative leading-[130%] capitalize">Approve Verification</div>
              </button>
          </div>
      </div>
  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next';
import { computed, ref, onMounted, onUnmounted } from 'vue';

// Define props
const props = defineProps({
  company: {
      type: Object,
      required: true,
      default: () => ({
          id: 1,
          name: 'Innovate Solutions',
          category: 'Travel',
          industry: 'Travel Tour Operator',
          email: 'contact@innovate.com',
          phone: '+123456789',
          website: 'www.innovatesolution.com'
      })
  }
});

// Define emits
const emit = defineEmits(['close', 'approve', 'reject']);

// Verification state
const verification = ref({
  phoneVerified: false,
  emailVerified: false,
  websiteVerified: false
});

// Computed properties for button states
const canApprove = computed(() => {
  return verification.value.phoneVerified && 
         verification.value.emailVerified && 
         verification.value.websiteVerified;
});

const canReject = computed(() => {
  return !verification.value.phoneVerified || 
         !verification.value.emailVerified || 
         !verification.value.websiteVerified;
});

// Action methods
const approveVerification = () => {
  if (canApprove.value) {
      emit('approve', {
          companyId: props.company.id,
          verification: verification.value
      });
      emit('close');
  }
};

const rejectVerification = () => {
  emit('reject', {
      companyId: props.company.id,
      verification: verification.value
  });
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

.text-gold {
  color: #ffd700;
}

.bg-firebrick {
  background-color: #b22222;
}

.bg-forestgreen {
  background-color: #228b22;
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
</style>