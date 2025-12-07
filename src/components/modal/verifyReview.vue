<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4" @click.self="$emit('close')">
      <div class="w-full max-w-2xl relative bg-white rounded-2xl flex flex-col items-center p-6 box-border gap-6 text-center text-[16px] text-black font-plus-jakarta-sans max-h-[85vh] overflow-y-auto">
          
          <button 
              @click="$emit('close')"
              class="absolute top-6 right-6 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors z-[110]"
              aria-label="Close modal"
          >
              <X class="w-5 h-5 text-gray-600" />
          </button>

          <b class="self-stretch relative text-[18px] leading-[160%] capitalize">Review & Verify Company</b>
          
          <div class="w-full rounded-2xl border-whitesmoke border-solid border-[1px] box-border flex flex-col items-center p-4 gap-4 text-left text-gray">
              
              <div class="self-stretch rounded-lg border-whitesmoke border-solid border-[1px] flex flex-col items-start justify-center p-4 gap-4">
                  
          <div class="self-stretch grid grid-cols-2 sm:grid-cols-[212px_1fr] items-start gap-4">
                      <div class="flex items-center gap-4 flex-shrink-0 w-full sm:w-[212px]">
                          <div class="relative leading-[130%] capitalize font-semibold text-xs flex-1">Company Name</div>
                          <b class="hidden sm:block relative text-[18px] leading-[160%] capitalize text-center">:</b>
                      </div>
                      <div class="relative leading-[160%] capitalize text-darkslategray text-sm truncate col-span-1 sm:col-span-1 text-left">{{ companyDetails.name }}</div>
                  </div>
                  
                  <div class="self-stretch grid grid-cols-2 sm:grid-cols-[212px_1fr] items-start gap-4">
                      <div class="flex items-center gap-4 flex-shrink-0 w-full sm:w-[212px]">
                          <div class="relative leading-[130%] capitalize font-semibold text-xs flex-1">Category</div>
                          <b class="hidden sm:block relative text-[18px] leading-[160%] capitalize text-center">:</b>
                      </div>
                      <div class="relative leading-[160%] text-darkslategray text-sm truncate col-span-1 sm:col-span-1 text-left">{{ companyDetails.category }}</div>
                  </div>
                  
                  <div class="self-stretch grid grid-cols-2 sm:grid-cols-[212px_1fr] items-start gap-4">
                      <div class="flex items-center gap-4 flex-shrink-0 w-full sm:w-[212px]">
                          <div class="relative leading-[130%] capitalize font-semibold text-xs flex-1">Industry</div>
                          <b class="hidden sm:block relative text-[18px] leading-[160%] capitalize text-center">:</b>
                      </div>
                      <div class="relative leading-[160%] capitalize text-darkslategray text-sm truncate col-span-1 sm:col-span-1 text-left">{{ companyDetails.industry }}</div>
                  </div>
                  
                  <div class="self-stretch grid grid-cols-2 sm:grid-cols-[212px_1fr] items-start gap-4">
                      <div class="flex items-center gap-4 flex-shrink-0 w-full sm:w-[212px]">
                          <div class="relative leading-[130%] capitalize font-semibold text-xs flex-1">Contact Email</div>
                          <b class="hidden sm:block relative text-[18px] leading-[160%] capitalize text-center">:</b>
                      </div>
                      <div class="relative leading-[160%] text-darkslategray text-sm truncate col-span-1 sm:col-span-1 text-left">{{ companyDetails.email }}</div>
                  </div>
                  
                  <div class="self-stretch grid grid-cols-2 sm:grid-cols-[212px_1fr] items-start gap-4">
                      <div class="flex items-center gap-4 flex-shrink-0 w-full sm:w-[212px]">
                          <div class="relative leading-[130%] capitalize font-semibold text-xs flex-1">Phone Number</div>
                          <b class="hidden sm:block relative text-[18px] leading-[160%] capitalize text-center">:</b>
                      </div>
                      <div class="relative leading-[160%] capitalize text-darkslategray text-sm truncate col-span-1 sm:col-span-1 text-left">{{ companyDetails.phone }}</div>
                  </div>
                  
                  <div class="self-stretch grid grid-cols-2 sm:grid-cols-[212px_1fr] items-start gap-4">
                      <div class="flex items-center gap-4 flex-shrink-0 w-full sm:w-[212px]">
                          <div class="relative leading-[130%] capitalize font-semibold text-xs flex-1">Website</div>
                          <b class="hidden sm:block relative text-[18px] leading-[160%] capitalize text-center">:</b>
                      </div>
                      <div class="relative leading-[160%] text-gold text-sm truncate col-span-1 sm:col-span-1 text-left">
                          <template v-if="companyWebsiteLink">
                              <a :href="companyWebsiteLink" target="_blank" rel="noopener" class="no-underline hover:underline">{{ companyDetails.website }}</a>
                          </template>
                          <span v-else>N/A</span>
                      </div>
                  </div>
              </div>
              
              <div class="self-stretch rounded-lg border-whitesmoke border-solid border-[1px] flex flex-col items-start p-4 gap-4">
                  <div class="self-stretch flex flex-col gap-4">
                      <div class="self-stretch relative leading-[130%] capitalize font-semibold text-sm">Verification Checklist</div>
                      <p class="text-xs text-gray-500 leading-snug">
                          Select every step below before approving a company.
                      </p>
                      <div class="self-stretch flex flex-col items-start justify-center gap-4 text-center text-darkslategray">
                          
                          <label class="flex items-center gap-2 cursor-pointer select-none w-full">
                          <input
                                  :id="`phone-verified-${companyDetails.id ?? 'unknown'}`"
                                  type="checkbox"
                                  v-model="verification.phoneVerified"
                                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                              />
                              <span class="relative leading-[130%] capitalize text-sm">Verified Via Phone Call</span>
                          </label>
                          
                          <label class="flex items-center gap-2 cursor-pointer select-none w-full">
                          <input
                                  :id="`email-verified-${companyDetails.id ?? 'unknown'}`"
                                  type="checkbox"
                                  v-model="verification.emailVerified"
                                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                              />
                              <span class="relative leading-[130%] capitalize text-sm">Verified Via Email</span>
                          </label>

                          <label class="flex items-center gap-2 cursor-pointer select-none w-full">
                          <input
                                  :id="`website-verified-${companyDetails.id ?? 'unknown'}`"
                                  type="checkbox"
                                  v-model="verification.websiteVerified"
                                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                              />
                              <span class="relative leading-[130%] capitalize text-sm">Website Verified</span>
                          </label>
                      </div>
                      <p 
                          v-if="checklistWarning" 
                          class="text-xs text-red-500 leading-snug mt-2"
                      >
                          Complete every checklist item before approving this company.
                      </p>
                  </div>
              </div>
          </div>
          
          <div class="self-stretch flex flex-col sm:flex-row items-center gap-4 text-white">
              <button 
                  @click="rejectVerification"
                  :disabled="!canReject"
                  class="w-full sm:flex-1 rounded bg-firebrick hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed flex items-center justify-center py-4 px-8 transition-colors font-semibold text-sm min-h-[44px] border-none"
              >
                  <div class="relative leading-[130%] capitalize text-white">Reject Verification</div>
              </button>
              <button 
                  @click="approveVerification"
                  :disabled="!canApprove"
                  class="w-full sm:flex-1 rounded bg-forestgreen hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed flex items-center justify-center py-4 px-8 transition-colors font-semibold text-sm min-h-[44px] border-none"
              >
                  <div class="relative leading-[130%] capitalize text-black">Approve Verification</div>
              </button>
          </div>
      </div>
  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next';
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';

// Define props
const defaultCompany = {
  id: null,
  name: 'Innovate Solutions',
  category: 'Travel',
  industry: 'Travel Tour Operator',
  email: 'contact@innovate.com',
  phone: '+123456789',
  mobile: '+123456789',
  website: 'www.innovatesolution.com',
  assignedDate: '',
  address: ''
};

const props = defineProps({
  company: {
      type: Object,
      required: true,
      default: () => ({ ...defaultCompany })
  }
});

// Define emits
const emit = defineEmits(['close', 'approve', 'reject']);

// Verification state
const createVerificationState = () => ({
  phoneVerified: false,
  emailVerified: false,
  websiteVerified: false
});

const verification = ref(createVerificationState());
const checklistWarning = ref(false);

const resetVerification = () => {
  verification.value = createVerificationState();
  checklistWarning.value = false;
};

const hydrateCompanyDetails = (companyData) => {
  if (!companyData) {
    return { ...defaultCompany };
  }

  const normalizedPhone = companyData.phone ?? companyData.mobile ?? defaultCompany.phone;
  const normalizedIndustry = companyData.industry ?? companyData.category ?? defaultCompany.industry;
  const normalizedWebsite = companyData.website ?? '';

  return {
    ...defaultCompany,
    ...companyData,
    phone: normalizedPhone,
    industry: normalizedIndustry,
    website: normalizedWebsite
  };
};

const companyDetails = ref(hydrateCompanyDetails(props.company));

watch(
  () => props.company,
  (newCompany) => {
      companyDetails.value = hydrateCompanyDetails(newCompany);
      resetVerification();
  },
  { immediate: true }
);

const companyWebsiteLink = computed(() => {
  const website = companyDetails.value.website?.trim();
  if (!website) {
    return '';
  }
  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
});

// Computed properties for button states
const canApprove = computed(() => {
  return verification.value.phoneVerified && 
         verification.value.emailVerified && 
         verification.value.websiteVerified;
});

const canReject = computed(() => {
  // Can reject if any item is unchecked, allowing an auditor to register an incomplete review.
  return !canApprove.value;
});

watch(
  () => canApprove.value,
  (isReady) => {
      if (isReady) {
          checklistWarning.value = false;
      }
  }
);

// Action methods
const approveVerification = () => {
  if (!canApprove.value) {
      checklistWarning.value = true;
      return;
  }

  emit('approve', {
      companyId: companyDetails.value.id ?? props.company?.id,
      verification: verification.value
  });
  emit('close');
};

const rejectVerification = () => {
  // NOTE: You might want to add a required reason for rejection here
  emit('reject', {
      companyId: companyDetails.value.id ?? props.company?.id,
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