<template>
  <div class="w-full min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
    <!-- Header Section -->
    <div
      class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6"
    >
      <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1">My Assigned Tasks</h1>
      <p class="text-xs sm:text-sm text-gray-700 max-w-3xl leading-relaxed">
        Overview of companies awaiting verification and new reviews assigned to you.
      </p>
    </div>

    <!-- Welcome Text -->
    <div class="mb-4 sm:mb-6">
      <p class="text-sm sm:text-base text-gray-600 leading-relaxed">
        Welcome! You have tasks that require your attention. This page provides a "to-do list" of items assigned to you, helping you focus on the most important actions for verification and content moderation.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      <!-- Main Content - Left Side -->
      <div class="lg:col-span-2 space-y-4 sm:space-y-6">
        <!-- Companies Awaiting Verification Section -->
        <div class="w-full relative flex flex-col items-start gap-6 text-left text-2xl text-gray-900 font-plus-jakarta-sans">
          <b class="self-stretch relative leading-[130%] capitalize">Companies Awaiting Your Verification</b>
          <div class="self-stretch flex flex-col items-start gap-2 text-base">
            <div 
              v-for="(company, index) in companies" 
              :key="index"
              class="w-full relative rounded-lg border border-gray-200 border-solid flex flex-col md:flex-row md:items-center justify-between p-4 gap-3 md:gap-5 text-left text-base text-gray-900 font-plus-jakarta-sans hover:border-yellow-400 transition-colors"
            >
              <div class="flex items-start md:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div class="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center flex-shrink-0">
                  <span class="text-white font-bold text-xs">{{ company.name.charAt(0) }}</span>
                </div>
                <div class="flex-1 min-w-0 flex flex-col items-start gap-2">
                  <b class="self-stretch relative leading-[130%] capitalize truncate">{{ company.name }}</b>
                  <div class="self-stretch flex flex-wrap items-center gap-2 text-gray-500">
                    <div class="relative leading-[130%] capitalize bg-gray-100 px-2 py-1 rounded">{{ company.category }}</div>
                    <div class="flex items-center gap-2">
                      <div class="h-1.5 w-1.5 relative rounded-[50%] bg-gray-300" />
                      <div class="relative leading-[130%] capitalize">Assigned: {{ company.assignedDate }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <button 
  @click="openCompanyVerification(company)"
  class="h-12 rounded bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center py-3 px-6 sm:px-8 md:px-9 box-border text-center touch-manipulation transition-colors w-full md:w-auto md:flex-shrink-0 mt-2 md:mt-0 border-0 ring-0 focus:ring-0 focus:border-0 outline-none focus:outline-none active:outline-none active:ring-0"
  style="border: 0 !important; box-shadow: none !important;"
>
  <div class="relative leading-[130%] capitalize font-semibold text-black">Review & Verify</div>
</button>

            </div>
          </div>
        </div>

        <!-- New Reviews for Your Companies Section -->
        <div class="w-full relative flex flex-col items-start gap-6 text-left text-2xl text-gray-900 font-plus-jakarta-sans">
          <b class="self-stretch relative leading-[130%] capitalize">New Reviews for Your Companies</b>
          <div class="self-stretch flex flex-col items-start gap-2">
            <div 
              v-for="(review, index) in reviews" 
              :key="index"
              class="w-full relative rounded-lg border border-gray-200 border-solid box-border flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-5 text-left text-base text-gray-700 font-plus-jakarta-sans hover:border-blue-400 transition-colors"
            >
              <div class="flex-1 min-w-0">
                <div class="w-full relative leading-[160%] capitalize mb-3 line-clamp-2">"{{ review.text }}"</div>
                <div class="self-stretch flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-500">
                  <div class="flex items-center gap-2">
                    <div class="relative leading-[130%] capitalize">For:</div>
                    <div class="relative leading-[130%] capitalize truncate">{{ review.company }}</div>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="relative leading-[130%] capitalize">{{ review.date }} | {{ review.time }}</div>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="relative leading-[130%] capitalize">Rating:</div>
                    <div class="flex items-center gap-2">
                      <div class="relative leading-[130%] capitalize ml-1">{{ review.rating }} Star</div>
                    </div>
                  </div>
                </div>
              </div>
              <button 
  @click="openReviewModeration(review)"
  class="h-12 rounded bg-[#FFF9E6] hover:bg-[#FFF2CC] flex items-center justify-center py-3 px-6 sm:px-8 md:px-9 box-border text-center touch-manipulation transition-colors sm:flex-shrink-0 w-full sm:w-auto border-0 outline-none focus:outline-none focus:ring-0"
>
  <div class="relative leading-[130%] capitalize font-semibold text-[#0369a1]">
    Moderate Review
  </div>
</button>

            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar - Right Side -->
      <div class="space-y-3 sm:space-y-4">
        <!-- Task Summary Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
          <h3 class="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 text-center">Task Summary</h3>
          
          <!-- Progress Chart -->
          <div class="flex justify-center mb-3 sm:mb-4">
            <div class="relative w-24 h-24 sm:w-32 sm:h-32">
              <svg class="w-full h-full" viewBox="0 0 100 100">
                <!-- Background Circle -->
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#f3f4f6" 
                  stroke-width="8"
                />
                <!-- Pending Verification -->
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
                <!-- Pending Reviews -->
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
                  <div class="text-base sm:text-lg font-bold text-gray-900">{{ totalTasks }}</div>
                  <div class="text-xs text-gray-500">Total Tasks</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Legend -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-blue-500 rounded flex-shrink-0"></div>
              <span class="text-gray-700 text-xs sm:text-sm truncate">Pending Verification ({{ companiesLen }})</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-green-500 rounded flex-shrink-0"></div>
              <span class="text-gray-700 text-xs sm:text-sm truncate">Pending Reviews ({{ reviewsLen }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Company Verification Modal -->
    <CompanyVerificationModal 
      v-if="selectedCompany"
      :company="selectedCompany"
      @close="closeCompanyVerification"
      @approve="handleCompanyApprove"
      @reject="handleCompanyReject"
    />

    <!-- Review Moderation Modal -->
    <ReviewModal 
      v-if="selectedReview"
      :review="selectedReview"
      @close="closeReviewModeration"
      @update-status="handleReviewStatusUpdate"
      @ban-reviewer="handleReviewBan"
    />
  </div>
</template>

<script setup>
import CompanyVerificationModal from '~/components/modal/verifyReview.vue';
import ReviewModal from '~/components/modal/reviewModal.vue';

definePageMeta({
  layout: "subadminpanel",
});

// Modal states
const selectedCompany = ref(null);
const selectedReview = ref(null);

// Load sample data from stubs
const { data: companiesData } = await useFetch('/stubs/subadminAssignedCompanies.json')
const companies = companiesData.value || []

const { data: reviewsData } = await useFetch('/stubs/subadminReviews.json')
const reviews = reviewsData.value || []

// Computed
const companiesLen = computed(() => companies.length);
const reviewsLen = computed(() => reviews.length);
const totalTasks = computed(() => companiesLen.value + reviewsLen.value);
const circumference = 2 * Math.PI * 45; // For the progress chart

// Company Verification Methods
const openCompanyVerification = (company) => {
  selectedCompany.value = company;
};

const closeCompanyVerification = () => {
  selectedCompany.value = null;
};

const handleCompanyApprove = ({ companyId, verification }) => {
  // Remove company from list after approval
  const index = companies.findIndex(c => c.id === companyId);
  if (index !== -1) {
    companies.splice(index, 1);
  }
  closeCompanyVerification();
};

const handleCompanyReject = ({ companyId, verification }) => {
  // Remove company from list after rejection
  const index = companies.findIndex(c => c.id === companyId);
  if (index !== -1) {
    companies.splice(index, 1);
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
  // Remove review from list after status update
  const index = reviews.findIndex(r => r.id === reviewId);
  if (index !== -1) {
    reviews.splice(index, 1);
  }
  closeReviewModeration();
};

const handleReviewBan = (reviewId) => {
  // Remove review from list after banning reviewer
  const index = reviews.findIndex(r => r.id === reviewId);
  if (index !== -1) {
    reviews.splice(index, 1);
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

/* Better touch targets for mobile */
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}
</style>