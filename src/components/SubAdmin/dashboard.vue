<template>
  <div class="w-full min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
    <!-- Header Section -->
    <div class="mb-4 sm:mb-6">
      <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">My Assigned Tasks</h1>
      <p class="text-sm sm:text-base text-gray-600 max-w-4xl leading-relaxed">
        Welcome! You have tasks that require your attention. This page provides a "to-do list" of items assigned to you, 
        helping you focus on the most important actions for verification and content moderation.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      <!-- Main Content - Left Side -->
      <div class="lg:col-span-2 space-y-4 sm:space-y-6">
        <!-- Companies Awaiting Verification Section -->
        <section class="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6">
          <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Companies Awaiting Your Verification</h2>
          
          <div class="space-y-2 sm:space-y-3">
            <div 
              v-for="(company, index) in companies" 
              :key="index"
              class="flex flex-col xs:flex-row xs:items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-yellow-400 transition-colors gap-3"
            >
              <div class="flex items-center gap-3 flex-1 min-w-0">
                <!-- Company Avatar -->
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-white font-bold text-xs">{{ company.name.charAt(0) }}</span>
                </div>
                
                <!-- Company Info -->
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-900 text-sm sm:text-base mb-1 truncate">{{ company.name }}</h3>
                  <div class="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3 text-xs text-gray-500">
                    <span class="bg-gray-100 px-2 py-1 rounded w-fit">{{ company.category }}</span>
                    <div class="flex items-center gap-1">
                      <div class="w-1.5 h-1.5 bg-gray-300 rounded-full hidden xs:block"></div>
                      <span class="text-xs">Assigned: {{ company.assignedDate }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Action Button -->
              <button 
                @click="openCompanyVerification(company)"
                class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-xs sm:text-sm w-full xs:w-auto touch-manipulation"
              >
                Review & Verify
              </button>
            </div>
          </div>
        </section>

        <!-- New Reviews Section -->
        <section class="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6">
          <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">New Reviews for Your Companies</h2>
          
          <div class="space-y-2 sm:space-y-3">
            <div 
              v-for="(review, index) in reviews" 
              :key="index"
              class="flex flex-col xs:flex-row xs:items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-400 transition-colors gap-3"
            >
              <div class="flex-1 min-w-0">
                <!-- Review Text -->
                <p class="text-gray-700 text-xs sm:text-sm mb-2 line-clamp-2 leading-relaxed">{{ review.text }}</p>
                
                <!-- Review Meta -->
                <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-gray-500">
                  <div class="flex items-center gap-1">
                    <span class="font-medium hidden sm:inline">For:</span>
                    <span class="truncate">{{ review.company }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-400 hidden sm:inline">•</span>
                    <span>{{ review.date }} | {{ review.time }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="font-medium">Rating:</span>
                    <div class="flex items-center gap-1">
                      <RatingStars :value="review.rating" :size-class="'w-3 h-3'" />
                      <span class="ml-1 text-xs">{{ review.rating }} Star</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Action Button -->
              <button 
                @click="openReviewModeration(review)"
                class="bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors border border-blue-200 whitespace-nowrap text-xs sm:text-sm w-full xs:w-auto touch-manipulation"
              >
                Moderate Review
              </button>
            </div>
          </div>
        </section>
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
                  :stroke-dasharray="`${(companies.length / 10) * 282.6} 282.6`"
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
                  :stroke-dasharray="`${(reviews.length / 10) * 282.6} 282.6`"
                  :stroke-dashoffset="70.65 - (companies.length / 10) * 282.6"
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
              <span class="text-gray-700 text-xs sm:text-sm truncate">Pending Verification ({{ companies.length }})</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-green-500 rounded flex-shrink-0"></div>
              <span class="text-gray-700 text-xs sm:text-sm truncate">Pending Reviews ({{ reviews.length }})</span>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
          <h3 class="text-base sm:text-lg font-bold text-gray-900 mb-3">Quick Stats</h3>
          <div class="space-y-2 sm:space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 text-xs sm:text-sm">Completed Today</span>
              <span class="font-semibold text-gray-900 text-xs sm:text-sm">12</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 text-xs sm:text-sm">Avg. Response Time</span>
              <span class="font-semibold text-gray-900 text-xs sm:text-sm">2.3h</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 text-xs sm:text-sm">SLA Compliance</span>
              <span class="font-semibold text-green-600 text-xs sm:text-sm">98%</span>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
          <h3 class="text-base sm:text-lg font-bold text-gray-900 mb-3">Recent Activity</h3>
          <div class="space-y-2">
            <div 
              v-for="(activity, index) in recentActivities" 
              :key="index"
              class="flex items-center gap-2 text-xs"
            >
              <div 
                class="w-1.5 h-1.5 rounded-full flex-shrink-0"
                :class="activity.type === 'verification' ? 'bg-blue-500' : 'bg-green-500'"
              ></div>
              <span class="text-gray-600 flex-1 leading-tight text-xs line-clamp-1">{{ activity.description }}</span>
              <span class="text-gray-400 text-xs whitespace-nowrap flex-shrink-0">{{ activity.time }}</span>
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
      @approve="handleReviewApprove"
      @reject="handleReviewReject"
      @hold="handleReviewHold"
      @ban="handleReviewBan"
    />
  </div>
</template>

<script setup>
import RatingStars from '~/components/common/ratingStars.vue'
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

const recentActivities = [
  { type: 'verification', description: 'Verified Creative Design Studio', time: '2h ago' },
  { type: 'review', description: 'Moderated review for Tech Corp', time: '4h ago' },
  { type: 'verification', description: 'Rejected incomplete application', time: '6h ago' },
  { type: 'review', description: 'Approved 5-star review', time: '8h ago' },
];

// Computed
const totalTasks = computed(() => companies.length + reviews.length);

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

const handleReviewApprove = (reviewId) => {
  // Remove review from list after approval
  const index = reviews.findIndex(r => r.id === reviewId);
  if (index !== -1) {
    reviews.splice(index, 1);
  }
  closeReviewModeration();
};

const handleReviewReject = (reviewId) => {
  // Remove review from list after rejection
  const index = reviews.findIndex(r => r.id === reviewId);
  if (index !== -1) {
    reviews.splice(index, 1);
  }
  closeReviewModeration();
};

const handleReviewHold = (reviewId) => {
  // You might want to keep the review in the list but mark it as on hold
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

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Better touch targets for mobile */
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* Enhanced responsive breakpoints */
@media (max-width: 475px) {
  .xs\\:hidden {
    display: none !important;
  }
  
  .xs\\:block {
    display: block !important;
  }
  
  .xs\\:inline {
    display: inline !important;
  }

  .xs\\:flex-row {
    flex-direction: row !important;
  }

  .xs\\:items-center {
    align-items: center !important;
  }

  .xs\\:w-auto {
    width: auto !important;
  }
}

/* Mobile specific adjustments */
@media (max-width: 640px) {
  .min-h-screen {
    min-height: auto;
  }
}

/* Extra small devices optimization */
@media (max-width: 375px) {
  .text-xs {
    font-size: 11px;
  }
  
  .gap-1 {
    gap: 0.25rem;
  }
  
  .p-3 {
    padding: 0.75rem;
  }
}
</style>