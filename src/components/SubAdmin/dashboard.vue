<template>
  <div class="w-full min-h-screen bg-white p-3 sm:p-4 md:p-6">
    <div
      class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6"
    >
      <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1">My Assigned Tasks</h1>
      <p class="text-xs sm:text-sm text-gray-700 max-w-3xl leading-relaxed">
        Overview of companies awaiting verification and new reviews assigned to you.
      </p>
    </div>

    <div class="mb-4 sm:mb-6">
      <p class="text-sm sm:text-base text-gray-600 leading-relaxed">
        Welcome! You have tasks that require your attention. This page provides a "to-do list" of items assigned to you, helping you focus on the most important actions for verification and content moderation.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      <div class="space-y-3 sm:space-y-4 lg:col-span-1 order-first lg:order-last">
        
        <div 
          class="w-full relative rounded-xl border-[#E5E5E5] border-solid border-[1px] box-border flex flex-col items-center justify-center p-6 sm:p-8 gap-4 sm:gap-6 text-center text-lg sm:text-2xl text-gray-900 font-plus-jakarta-sans bg-white shadow-sm sticky top-4"
        >
          <b class="self-stretch relative leading-[130%] capitalize text-xl sm:text-2xl">Task Summary</b>
          
          <div class="self-stretch flex flex-col items-center justify-center gap-4 text-left text-sm sm:text-base text-gray-700">
            
            <div class="flex justify-center mb-1">
              <div class="relative w-32 h-32 sm:w-[156px] sm:h-[156px]">
                <svg class="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#f3f4f6" 
                    stroke-width="8"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#3b82f6" 
                    stroke-width="8"
                    :stroke-dasharray="`${(companiesLen / 10) * circumference} ${circumference}`"
                    stroke-dashoffset="70.65"
                    transform="rotate(-90 50 50)"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#10b981" 
                    stroke-width="8"
                    :stroke-dasharray="`${(reviewsLen / 10) * circumference} ${circumference}`"
                    :stroke-dashoffset="70.65 - (companiesLen / 10) * circumference"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <div class="text-lg sm:text-xl font-bold text-gray-900">{{ totalTasks }}</div>
                    <div class="text-xs text-gray-500">Total Tasks</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="self-stretch flex flex-col items-center justify-center">
              <div class="flex flex-col items-start justify-center gap-2 sm:gap-4">
                <div class="flex items-center gap-3 sm:gap-4">
                  <div class="h-2.5 w-[23px] relative bg-blue-500 flex-shrink-0" />
                  <div class="relative leading-[130%] capitalize whitespace-nowrap">Pending Verification ({{ companiesLen }})</div>
                </div>
                <div class="flex items-center gap-3 sm:gap-4">
                  <div class="h-2.5 w-[23px] relative bg-green-500 flex-shrink-0" />
                  <div class="relative leading-[130%] capitalize whitespace-nowrap">Pending Reviews ({{ reviewsLen }})</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="lg:col-span-2 space-y-4 sm:space-y-6 order-last lg:order-first">
        <div class="w-full relative flex flex-col items-start gap-6 text-left text-[24px] text-gray-900 font-plus-jakarta-sans">
          <b class="self-stretch relative leading-[130%] capitalize text-xl sm:text-2xl">Companies Awaiting Your Verification</b>
          <div class="self-stretch flex flex-col items-start gap-2 text-base">
            <div 
              v-for="(company, index) in companies" 
              :key="company.id"
              class="self-stretch rounded-lg border border-[#E5E5E5] border-solid flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 sm:gap-5 hover:border-blue-400 transition-colors"
            >
              <div class="flex items-center gap-4 min-w-0 flex-1">
                <div class="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center flex-shrink-0">
                  <span class="text-white font-bold text-xs">{{ company.name.charAt(0) }}</span>
                </div>
                <div class="flex flex-col items-start gap-1 sm:gap-2 min-w-0">
                  <b class="self-stretch relative leading-[130%] capitalize truncate text-sm sm:text-base">{{ company.name }}</b>
                  <div class="self-stretch flex flex-wrap items-center gap-2 text-gray-500 text-xs sm:text-sm">
                    <div class="relative leading-[130%] capitalize bg-gray-100 px-2 py-0.5 rounded flex-shrink-0">{{ company.category }}</div>
                    <div class="flex items-center gap-2 flex-nowrap min-w-0">
                      <div class="h-1.5 w-1.5 relative rounded-[50%] bg-gray-300 flex-shrink-0 hidden sm:block" />
                      <div class="relative leading-[130%] capitalize whitespace-nowrap flex-shrink-0">Assigned: {{ company.assignedDate }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                @click="openCompanyVerification(company)"
                class="h-9 rounded bg-[#FCC207] hover:bg-[#E0A900] flex items-center justify-center py-2 px-6 box-border text-center touch-manipulation transition-colors border-0 outline-none focus:outline-none focus:ring-0 w-3/4 mx-auto sm:w-auto sm:h-12 sm:py-3 sm:px-9 flex-shrink-0"
              >
                <div class="relative leading-[130%] capitalize font-semibold text-black text-sm sm:text-base">Review & Verify</div>
              </button>
            </div>
          </div>
        </div>
        
        <div class="w-full relative flex flex-col items-start gap-6 text-left text-[24px] text-gray-900 font-plus-jakarta-sans">
          <b class="self-stretch relative leading-[130%] capitalize text-xl sm:text-2xl">New Reviews for Your Companies</b>
          <div class="self-stretch flex flex-col items-start gap-2">
            <div 
              v-for="(review, index) in reviews" 
              :key="review.id"
              class="w-full relative rounded-lg border border-[#E5E5E5] border-solid box-border flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 sm:gap-5 text-left text-base text-gray-700 font-plus-jakarta-sans hover:border-blue-400 transition-colors"
            >
              <div class="flex-1 min-w-0">
                <div class="w-full relative leading-[160%] capitalize mb-2 sm:mb-3 line-clamp-2 text-sm sm:text-base">"{{ review.text }}"</div>
                <div class="self-stretch flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-500 text-xs sm:text-sm">
                  <div class="flex items-center gap-1.5">
                    <div class="relative leading-[130%] capitalize font-medium">For:</div>
                    <div class="relative leading-[130%] capitalize truncate max-w-[150px] sm:max-w-none">{{ review.company }}</div>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <div class="relative leading-[130%] capitalize whitespace-nowrap">{{ review.date }} | {{ review.time }}</div>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <div class="relative leading-[130%] capitalize font-medium">Rating:</div>
                    <div class="flex items-center gap-1.5">
                      <div class="relative leading-[130%] capitalize ml-0.5">{{ review.rating }} Star</div>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                @click="openReviewModeration(review)"
                class="h-9 rounded bg-[#FFF9E6] hover:bg-[#FFF2CC] flex items-center justify-center py-2 px-6 box-border text-center touch-manipulation transition-colors w-3/4 mx-auto sm:w-auto sm:h-12 sm:py-3 sm:px-9 flex-shrink-0 border-0 outline-none focus:outline-none focus:ring-0"
              >
                <div class="relative leading-[130%] capitalize font-semibold text-[#0b0c0c] text-sm sm:text-base">Moderate Review</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <CompanyVerificationModal 
      v-if="selectedCompany"
      :company="selectedCompany"
      @close="closeCompanyVerification"
      @approve="handleCompanyApprove"
      @reject="handleCompanyReject"
    />

    <ReviewModal 
      v-if="selectedReview"
      :review="selectedReview"
      @close="closeReviewModeration"
      @update-status="handleReviewStatusUpdate"
      @ban-reviewer="handleReviewBan"
    />
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>



<script setup>
import { ref, computed, onMounted } from 'vue';
import RatingStars from '~/components/common/RatingStars.vue'
import CompanyVerificationModal from '~/components/modal/verifyReview.vue';
import ReviewModal from '~/components/modal/reviewModal.vue';

// Modal states
const selectedCompany = ref(null);
const selectedReview = ref(null);

// Data with proper initialization
const companies = ref([]);
const reviews = ref([]);

// Load data on component mount and handle refresh
onMounted(async () => {
  await loadData();
});

// Function to load data
const loadData = async () => {
  try {
    // Load companies data
    const { data: companiesData } = await useFetch('/stubs/subadminAssignedCompanies.json');
    companies.value = companiesData.value || [];
    
    // Load reviews data
    const { data: reviewsData } = await useFetch('/stubs/subadminReviews.json');
    reviews.value = reviewsData.value || [];
  } catch (error) {
    console.error('Error loading data:', error);
    // Fallback to empty arrays if data fails to load
    companies.value = [];
    reviews.value = [];
  }
};

// Computed properties
const companiesLen = computed(() => companies.value.length);
const reviewsLen = computed(() => reviews.value.length);
const totalTasks = computed(() => companiesLen.value + reviewsLen.value);
const circumference = 2 * Math.PI * 45;

// Company Verification Methods
const openCompanyVerification = (company) => {
  selectedCompany.value = company;
};

const closeCompanyVerification = () => {
  selectedCompany.value = null;
};

const handleCompanyApprove = ({ companyId, verification }) => {
  const index = companies.value.findIndex(c => c.id === companyId);
  if (index !== -1) {
    companies.value.splice(index, 1);
  }
  closeCompanyVerification();
};

const handleCompanyReject = ({ companyId, verification }) => {
  const index = companies.value.findIndex(c => c.id === companyId);
  if (index !== -1) {
    companies.value.splice(index, 1);
  }
  closeCompanyVerification();
};

// Review Moderation Methods
const openReviewModeration = (review) => {
  selectedReview.value = review;
};

const closeReviewModeration = () => {
  selectedReview.value = null;
};

const handleReviewStatusUpdate = ({ reviewId, status }) => {
  const index = reviews.value.findIndex(r => r.id === reviewId);
  if (index !== -1) {
    reviews.value.splice(index, 1);
  }
  closeReviewModeration();
};

const handleReviewBan = (reviewId) => {
  const index = reviews.value.findIndex(r => r.id === reviewId);
  if (index !== -1) {
    reviews.value.splice(index, 1);
  }
  closeReviewModeration();
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>