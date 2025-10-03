<template>
    <div class="w-full min-h-screen bg-gray-50 p-4">
      <!-- Header Section -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">My Assigned Tasks</h1>
        <p class="text-base text-gray-600 max-w-4xl leading-relaxed">
          Welcome! You have tasks that require your attention. This page provides a "to-do list" of items assigned to you, 
          helping you focus on the most important actions for verification and content moderation.
        </p>
      </div>
  
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Main Content - Left Side -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Companies Awaiting Verification Section -->
          <section class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Companies Awaiting Your Verification</h2>
            
            <div class="space-y-3">
              <div 
                v-for="(company, index) in companies" 
                :key="index"
                class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-yellow-400 transition-colors"
              >
                <div class="flex items-center gap-3 flex-1">
                  <!-- Company Avatar -->
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span class="text-white font-bold text-xs">{{ company.name.charAt(0) }}</span>
                  </div>
                  
                  <!-- Company Info -->
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-gray-900 text-base mb-1 truncate">{{ company.name }}</h3>
                    <div class="flex items-center gap-3 text-xs text-gray-500">
                      <span class="bg-gray-100 px-2 py-1 rounded">{{ company.category }}</span>
                      <div class="flex items-center gap-1">
                        <div class="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                        <span>Assigned: {{ company.assignedDate }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Action Button -->
                <button 
                  @click="openCompanyVerification(company)"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-sm"
                >
                  Review & Verify
                </button>
              </div>
            </div>
          </section>
  
          <!-- New Reviews Section -->
          <section class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h2 class="text-xl font-bold text-gray-900 mb-4">New Reviews for Your Companies</h2>
            
            <div class="space-y-3">
              <div 
                v-for="(review, index) in reviews" 
                :key="index"
                class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-400 transition-colors"
              >
                <div class="flex-1 min-w-0">
                  <!-- Review Text -->
                  <p class="text-gray-700 text-sm mb-2 line-clamp-2 leading-relaxed">{{ review.text }}</p>
                  
                  <!-- Review Meta -->
                  <div class="flex items-center gap-4 text-xs text-gray-500">
                    <div class="flex items-center gap-1">
                      <span class="font-medium">For:</span>
                      <span>{{ review.company }} • {{ review.date }} | {{ review.time }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <span class="font-medium">Rating:</span>
                      <div class="flex items-center gap-1">
                        <Star 
                          v-for="star in 5" 
                          :key="star"
                          class="w-3 h-3"
                          :class="star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
                        />
                        <span class="ml-1">{{ review.rating }} Star</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Action Button -->
                <button 
                  @click="openReviewModeration(review)"
                  class="bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-lg transition-colors border border-blue-200 whitespace-nowrap text-sm ml-3"
                >
                  Moderate Review
                </button>
              </div>
            </div>
          </section>
        </div>
  
        <!-- Sidebar - Right Side -->
        <div class="space-y-4">
          <!-- Task Summary Card -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 class="text-lg font-bold text-gray-900 mb-4 text-center">Task Summary</h3>
            
            <!-- Progress Chart -->
            <div class="flex justify-center mb-4">
              <div class="relative w-32 h-32">
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
                    <div class="text-lg font-bold text-gray-900">{{ totalTasks }}</div>
                    <div class="text-xs text-gray-500">Total Tasks</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Legend -->
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-blue-500 rounded"></div>
                <span class="text-gray-700 text-sm">Pending Verification ({{ companies.length }})</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-green-500 rounded"></div>
                <span class="text-gray-700 text-sm">Pending Reviews ({{ reviews.length }})</span>
              </div>
            </div>
          </div>
  
          <!-- Quick Stats -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 class="text-lg font-bold text-gray-900 mb-3">Quick Stats</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-600 text-sm">Completed Today</span>
                <span class="font-semibold text-gray-900 text-sm">12</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 text-sm">Avg. Response Time</span>
                <span class="font-semibold text-gray-900 text-sm">2.3h</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 text-sm">SLA Compliance</span>
                <span class="font-semibold text-green-600 text-sm">98%</span>
              </div>
            </div>
          </div>
  
          <!-- Recent Activity -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 class="text-lg font-bold text-gray-900 mb-3">Recent Activity</h3>
            <div class="space-y-2">
              <div 
                v-for="(activity, index) in recentActivities" 
                :key="index"
                class="flex items-center gap-2 text-xs"
              >
                <div 
                  class="w-1.5 h-1.5 rounded-full"
                  :class="activity.type === 'verification' ? 'bg-blue-500' : 'bg-green-500'"
                ></div>
                <span class="text-gray-600 flex-1 leading-tight">{{ activity.description }}</span>
                <span class="text-gray-400 text-xs whitespace-nowrap">{{ activity.time }}</span>
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
  import { Star } from 'lucide-vue-next';
  import CompanyVerificationModal from '@/components/modal/VerifyReview.vue';
  import ReviewModal from '@/components/modal/ReviewModal.vue';
  
  definePageMeta({
    layout: "subadminpanel",
  });
  
  // Modal states
  const selectedCompany = ref(null);
  const selectedReview = ref(null);
  
  // Sample data
  const companies = [
    { id: 1, name: "Innovate Solutions", category: "Tech", assignedDate: "2024-10-22" },
    { id: 2, name: "Global Enterprises", category: "Finance", assignedDate: "2024-10-21" },
    { id: 3, name: "Tech Startup Inc", category: "Technology", assignedDate: "2024-10-20" },
    { id: 4, name: "Creative Agency Co", category: "Marketing", assignedDate: "2024-10-19" },
  ];
  
  const reviews = [
    { 
      id: 1, 
      text: "Absolutely fantastic service from start to finish. Highly recommend!", 
      company: "Innovate Solutions", 
      date: "2024-10-22", 
      time: "10:30 PM", 
      rating: 5,
      reviewerName: "John Doe",
      email: "john.doe@example.com",
      companyName: "Innovate Solutions"
    },
    { 
      id: 2, 
      text: "Great product quality and excellent customer support team.", 
      company: "Global Enterprises", 
      date: "2024-10-21", 
      time: "02:15 PM", 
      rating: 4,
      reviewerName: "Jane Smith",
      email: "jane.smith@example.com",
      companyName: "Global Enterprises"
    },
    { 
      id: 3, 
      text: "Very professional and delivered on time with excellent quality work.", 
      company: "Tech Startup Inc", 
      date: "2024-10-20", 
      time: "09:45 AM", 
      rating: 5,
      reviewerName: "Mike Johnson",
      email: "mike.johnson@example.com",
      companyName: "Tech Startup Inc"
    },
  ];
  
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
    console.log('Approving company:', companyId, verification);
    // Remove company from list after approval
    const index = companies.findIndex(c => c.id === companyId);
    if (index !== -1) {
      companies.splice(index, 1);
    }
    closeCompanyVerification();
  };
  
  const handleCompanyReject = ({ companyId, verification }) => {
    console.log('Rejecting company:', companyId, verification);
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
    console.log('Approving review:', reviewId);
    // Remove review from list after approval
    const index = reviews.findIndex(r => r.id === reviewId);
    if (index !== -1) {
      reviews.splice(index, 1);
    }
    closeReviewModeration();
  };
  
  const handleReviewReject = (reviewId) => {
    console.log('Rejecting review:', reviewId);
    // Remove review from list after rejection
    const index = reviews.findIndex(r => r.id === reviewId);
    if (index !== -1) {
      reviews.splice(index, 1);
    }
    closeReviewModeration();
  };
  
  const handleReviewHold = (reviewId) => {
    console.log('Putting review on hold:', reviewId);
    // You might want to keep the review in the list but mark it as on hold
    closeReviewModeration();
  };
  
  const handleReviewBan = (reviewId) => {
    console.log('Banning reviewer for review:', reviewId);
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
  </style>