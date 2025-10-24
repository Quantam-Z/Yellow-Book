<template>
    <!-- Modal Background -->
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="$emit('close')">
      <!-- Modal Container -->
      <div class="w-full max-w-2xl relative bg-white rounded-xl shadow-xl flex flex-col items-center p-6 box-border gap-4 text-center text-base text-black font-plus-jakarta-sans max-h-[90vh] overflow-y-auto">
        
        <!-- Close Button -->
        <button 
          @click="$emit('close')"
          class="absolute top-3 right-3 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X class="w-4 h-4 text-gray-600" />
        </button>
  
        <!-- Modal Title -->
        <b class="self-stretch relative text-lg leading-[160%] capitalize">Review & Verify Company</b>
        
        <!-- Company Content -->
        <div class="w-full rounded-lg border border-gray-200 box-border flex flex-col items-center p-4 gap-3 text-left text-sm text-gray-600">
          
        <!-- Company Details Card -->
        <div class="self-stretch rounded-lg border border-gray-200 flex flex-col items-start justify-center p-4 gap-3 divide-y divide-transparent">
            
            <!-- Company Name -->
            <div class="self-stretch flex items-start gap-3 py-1">
              <div class="w-36 flex items-center gap-2">
                <div class="flex-1 relative leading-[130%] capitalize font-semibold text-gray-900 text-xs">Company Name</div>
                <b class="relative text-sm leading-[160%] capitalize text-center">:</b>
              </div>
              <div class="flex-1 relative leading-[160%] capitalize text-gray-700 text-sm">{{ company.name }}</div>
            </div>
            
            
            <!-- Category -->
            <div class="self-stretch flex items-start gap-3 py-1">
              <div class="w-36 flex items-center gap-2">
                <div class="flex-1 relative leading-[130%] capitalize font-semibold text-gray-900 text-xs">Category</div>
                <b class="relative text-sm leading-[160%] capitalize text-center">:</b>
              </div>
              <div class="flex-1 relative leading-[160%] text-gray-700 text-sm">{{ company.category }}</div>
            </div>
            
            
            <!-- Industry -->
            <div class="self-stretch flex items-start gap-3 py-1">
              <div class="w-36 flex items-center gap-2">
                <div class="flex-1 relative leading-[130%] capitalize font-semibold text-gray-900 text-xs">Industry</div>
                <b class="relative text-sm leading-[160%] capitalize text-center">:</b>
              </div>
              <div class="flex-1 relative leading-[160%] capitalize text-gray-700 text-sm">{{ company.industry }}</div>
            </div>
            
            
            <!-- Contact Email -->
            <div class="self-stretch flex items-start gap-3 py-1">
              <div class="w-36 flex items-center gap-2">
                <div class="flex-1 relative leading-[130%] capitalize font-semibold text-gray-900 text-xs">Contact Email</div>
                <b class="relative text-sm leading-[160%] capitalize text-center">:</b>
              </div>
              <div class="flex-1 relative leading-[160%] text-gray-700 text-sm">{{ company.email }}</div>
            </div>
            <div class="self-stretch relative border-gray-200 border-dashed border-t-[1px] box-border h-px" />
            
            <!-- Phone Number -->
            <div class="self-stretch flex items-start gap-3">
              <div class="w-36 flex items-center gap-2">
                <div class="flex-1 relative leading-[130%] capitalize font-semibold text-gray-900 text-xs">Phone Number</div>
                <b class="relative text-sm leading-[160%] capitalize text-center">:</b>
              </div>
              <div class="flex-1 relative leading-[160%] capitalize text-gray-700 text-sm">{{ company.phone }}</div>
            </div>
            <div class="self-stretch relative border-gray-200 border-dashed border-t-[1px] box-border h-px" />
            
            <!-- Website -->
            <div class="self-stretch flex items-start gap-3">
              <div class="w-36 flex items-center gap-2">
                <div class="flex-1 relative leading-[130%] capitalize font-semibold text-gray-900 text-xs">Website</div>
                <b class="relative text-sm leading-[160%] capitalize text-center">:</b>
              </div>
              <div class="flex-1 relative leading-[160%] text-yellow-600 hover:text-yellow-700 transition-colors text-sm">
                <a :href="`https://${company.website}`" target="_blank" class="no-underline">{{ company.website }}</a>
              </div>
            </div>
          </div>
          
          <!-- Verification Checklist Card -->
          <div class="self-stretch rounded-lg border border-gray-200 flex flex-col items-start p-4 gap-3 divide-y divide-transparent">
            <div class="self-stretch relative leading-[130%] capitalize font-semibold text-gray-900 text-sm">Verification Checklist</div>
            <div class="self-stretch flex flex-col items-start justify-center gap-3 text-center text-gray-700 text-sm">
              
              <!-- Phone Verification -->
              <div class="flex items-center gap-2 py-0.5">
                <input
                  type="checkbox"
                  v-model="verification.phoneVerified"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div class="relative leading-[130%] capitalize text-xs">Verified Via Phone Call</div>
              </div>
              
              
              <!-- Email Verification -->
              <div class="flex items-center gap-2 py-0.5">
                <input
                  type="checkbox"
                  v-model="verification.emailVerified"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div class="relative leading-[130%] capitalize text-xs">Verified Via Email</div>
              </div>
              
              <!-- Website Verification -->
              
              <div class="flex items-center gap-2 py-0.5">
                <input
                  type="checkbox"
                  v-model="verification.websiteVerified"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div class="relative leading-[130%] capitalize text-xs">Website Verified & Active</div>
              </div>
              
              <!-- Business Registration -->
              
              <div class="flex items-center gap-2 py-0.5">
                <input
                  type="checkbox"
                  v-model="verification.businessVerified"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div class="relative leading-[130%] capitalize text-xs">Business Registration Verified</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="self-stretch flex items-center gap-3">
          <button 
            @click="rejectVerification"
            :disabled="!canReject"
            class="flex-1 rounded bg-red-600 hover:bg-red-700 disabled:bg-red-400 flex items-center justify-center py-3 px-6 text-white transition-colors font-semibold text-sm"
          >
            Reject Verification
          </button>
          <button 
            @click="approveVerification"
            :disabled="!canApprove"
            class="flex-1 rounded bg-gold hover:bg-goldenrod disabled:bg-[#ffe08a] disabled:text-gray-700 active:bg-[#d4a007] flex items-center justify-center py-3 px-6 text-black transition-colors font-semibold text-sm"
          >
            Approve Verification
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { X } from 'lucide-vue-next';
  import { computed, ref } from 'vue';
  
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
    websiteVerified: false,
    businessVerified: false
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
  </script>
  
  <style scoped>
  .font-plus-jakarta-sans {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  </style>