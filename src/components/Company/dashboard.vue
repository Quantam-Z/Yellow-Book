<template>
  <div class="w-full min-h-screen bg-white p-3 sm:p-4 md:p-6">
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">My Assigned Tasks</h1>
        <NuxtLink
            to="/company/my-company"
          class="bg-white hover:bg-gray-50 text-gray-800 font-semibold px-4 py-2.5 transition whitespace-nowrap text-sm w-full sm:w-auto text-center no-underline rounded-none border border-gray-300"
        >
          List Company
        </NuxtLink>
      </div>
    </div>

    <div class="w-full grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      <div class="rounded border-gainsboro border-solid border-[1px] bg-white flex items-center p-3 sm:p-4 gap-3">
        <div class="flex-1 flex flex-col items-start gap-2">
          <div class="text-xs sm:text-sm font-medium text-gray-700 capitalize leading-[130%]">Total Reviews</div>
          <div class="text-xl sm:text-2xl font-semibold text-gray-900 leading-[126%]">{{ dashboard.totalReviews }}</div>
        </div>
        <MessageSquare class="h-8 w-8 sm:h-10 sm:w-10 text-purple-500 flex-shrink-0" />
      </div>

      <div class="rounded border-gainsboro border-solid border-[1px] bg-white flex items-center p-3 sm:p-4 gap-3">
        <div class="flex-1 flex flex-col items-start gap-2">
          <div class="text-xs sm:text-sm font-medium text-gray-700 capitalize leading-[130%]">Average Rating</div>
          <div class="text-xl sm:text-2xl font-semibold text-gray-900 leading-[126%]">{{ dashboard.averageRating }}</div>
        </div>
        <Star class="h-8 w-8 sm:h-10 sm:w-10 text-yellow-500 flex-shrink-0" />
      </div>

      <div class="rounded border-gainsboro border-solid border-[1px] bg-white flex items-center p-3 sm:p-4 gap-3">
        <div class="flex-1 flex flex-col items-start gap-2">
          <div class="text-xs sm:text-sm font-medium text-gray-700 capitalize leading-[130%]">Verification</div>
          <div class="text-xl sm:text-2xl font-semibold text-seagreen leading-[126%]">{{ dashboard.verificationStatus }}</div>
        </div>
        <ShieldCheck class="h-8 w-8 sm:h-10 sm:w-10 text-green-500 flex-shrink-0" />
      </div>

      <div class="rounded border-gainsboro border-solid border-[1px] bg-white flex items-center p-3 sm:p-4 gap-3">
        <div class="flex-1 flex flex-col items-start gap-2">
          <div class="text-xs sm:text-sm font-medium text-gray-700 capitalize leading-[130%]">Profile Complete</div>
          <div class="text-xl sm:text-2xl font-semibold text-gray-900 leading-[126%]">{{ dashboard.profileComplete }}%</div>
        </div>
        <UserCheck class="h-8 w-8 sm:h-10 sm:w-10 text-blue-500 flex-shrink-0" />
      </div>
    </div>

    <div class="w-full rounded border-gainsboro border-solid border-[1px] bg-white p-4 sm:p-5 mb-6 sm:mb-8">
      <div class="text-lg sm:text-xl font-bold text-gray-900 capitalize mb-4">Review Trends</div>
      <div class="w-full h-48 sm:h-56 md:h-64">
        <ClientOnly>
          <Line :data="chartData" :options="chartOptions" class="w-full h-full" />
        </ClientOnly>
      </div>
    </div>

    <div class="w-full bg-white">
      <div class="text-lg sm:text-xl font-bold text-gray-900 capitalize mb-4">Latest Reviews</div>
      
      <div class="hidden lg:block w-full border border-gainsboro border-solid rounded-lg overflow-hidden">
        <div class="w-full bg-ghostwhite flex items-center p-3 gap-4 text-sm">
          <div class="w-20 flex items-center justify-center p-2">
            <div class="font-medium text-gray-700 capitalize">Profile</div>
          </div>
          <div class="w-48 flex items-center justify-start p-2">
            <div class="font-medium text-gray-700 capitalize">Name</div>
          </div>
          <div class="w-20 flex items-center justify-center p-2">
            <div class="font-medium text-gray-700 capitalize">Rating</div>
          </div>
          <div class="w-24 flex items-center justify-center p-2">
            <div class="font-medium text-gray-700 capitalize whitespace-nowrap">Review Liked</div>
          </div>
          <div class="w-28 flex items-center justify-center p-2">
            <div class="font-medium text-gray-700 capitalize whitespace-nowrap">Review Shared</div>
          </div>
          <div class="w-24 flex items-center justify-start p-2">
            <div class="font-medium text-gray-700 capitalize">Date</div>
          </div>
          <div class="flex-1 flex items-center justify-start p-2">
            <div class="font-medium text-gray-700 capitalize">User Review</div>
          </div>
        </div>

          <div class="w-full">
            <div
              v-for="(review, index) in reviews"
              :key="index"
              class="w-full border-b border-gainsboro border-solid border-[1px] flex items-center p-3 gap-4 hover:bg-gray-50 transition-colors last:border-b-0"
            >
              <div class="w-20 flex items-center justify-center p-2">
                <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span class="text-white font-bold text-xs">{{ getInitials(review.reviewer) }}</span>
                </div>
              </div>

              <div class="w-48 flex items-center justify-start p-2">
                <div class="text-gray-800 text-sm capitalize truncate text-left">{{ review.reviewer }}</div>
              </div>

              <div class="w-20 flex items-center justify-center p-2">
                <div class="flex items-center gap-1">
                  <Star
                    v-for="i in 5"
                    :key="i"
                    class="h-4 w-4"
                    :class="i <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'"
                  />
                </div>
              </div>

              <div class="w-24 flex items-center justify-center p-2">
                <div class="text-gray-600 text-sm">{{ review.likes || '0' }}</div>
              </div>

              <div class="w-28 flex items-center justify-center p-2">
                <div class="text-gray-600 text-sm">{{ review.shares || '0' }}</div>
              </div>

              <div class="w-24 flex items-center justify-start p-2">
                <div class="text-gray-500 text-sm text-left">{{ formatDate(review.date) }}</div>
              </div>

              <div class="flex-1 flex items-center justify-between p-2 gap-2">
                <div class="text-gray-600 text-sm text-left line-clamp-2 pr-2">"{{ review.comment }}"</div>
                <button
                  type="button"
                  class="text-deepskyblue font-semibold text-sm hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 bg-transparent border-0 p-0"
                  @click="viewFullReview(review)"
                >
                  Full view
                </button>
              </div>
            </div>
          </div>
      </div>

        <div class="hidden md:block lg:hidden w-full">
          <div class="space-y-3">
            <div
              v-for="(review, index) in reviews"
              :key="index"
              class="rounded border-gainsboro border-solid border-[1px] p-3 bg-white hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span class="text-white font-bold text-xs">{{ getInitials(review.reviewer) }}</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-800 text-sm text-left">{{ review.reviewer }}</div>
                    <div class="text-gray-500 text-xs text-left">{{ formatDate(review.date) }}</div>
                  </div>
                </div>
                <div class="flex items-center gap-1">
                  <Star
                    v-for="i in 5"
                    :key="i"
                    class="h-3 w-3"
                    :class="i <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'"
                  />
                </div>
              </div>
              <div class="flex justify-start items-center mb-2">
                <div class="text-gray-600 text-xs text-left">
                  <span class="mr-2">{{ review.likes || '0' }} likes</span>
                  <span>{{ review.shares || '0' }} shares</span>
                </div>
              </div>
              <p class="text-gray-600 text-sm line-clamp-2 mb-2 text-left">"{{ review.comment }}"</p>
              <button
                type="button"
                class="text-deepskyblue font-semibold text-sm hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap text-left block w-full bg-transparent border-0 p-0"
                @click="viewFullReview(review)"
              >
                Full view
              </button>
            </div>
          </div>
        </div>

        <div class="block md:hidden w-full">
          <div class="space-y-3">
            <div
              v-for="(review, index) in reviews"
              :key="index"
              class="rounded border-gainsboro border-solid border-[1px] p-3 bg-white hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-start justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span class="text-white font-bold text-xs">{{ getInitials(review.reviewer) }}</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-800 text-sm text-left">{{ review.reviewer }}</div>
                    <div class="text-gray-500 text-xs text-left">{{ formatDate(review.date) }}</div>
                  </div>
                </div>
                <div class="flex items-center gap-1">
                  <Star
                    v-for="i in 5"
                    :key="i"
                    class="h-3 w-3"
                    :class="i <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'"
                  />
                </div>
              </div>
              <p class="text-gray-600 text-xs line-clamp-2 mb-2 text-left">"{{ review.comment }}"</p>
              <div class="flex justify-start items-center text-xs text-gray-500 gap-3">
                <span>{{ review.likes || '0' }} likes</span>
                <span>{{ review.shares || '0' }} shares</span>
                <button
                  type="button"
                  class="text-deepskyblue font-semibold cursor-pointer text-right ml-auto bg-transparent border-0 p-0"
                  @click="viewFullReview(review)"
                >
                  Full view
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Teleport to="body">
        <transition name="fade">
          <div
            v-if="isModalOpen"
            class="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="full-review-title"
            aria-describedby="full-review-content"
          >
            <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="closeModal"></div>

            <div
              class="relative z-10 w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden focus:outline-none"
              tabindex="-1"
              role="document"
            >
              <button
                type="button"
                class="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
                @click="closeModal"
                aria-label="Close"
              >
                <X class="h-5 w-5" />
              </button>
              <div v-if="selectedReview" class="p-6 sm:p-8 space-y-4">
                <div class="flex items-center gap-4">
                  <div class="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span class="text-white font-bold text-sm">{{ getInitials(selectedReview.reviewer) }}</span>
                  </div>
                  <div>
                    <h2 id="full-review-title" class="text-lg font-semibold text-gray-900 text-left">
                      {{ selectedReview.reviewer }}
                    </h2>
                    <p class="text-sm text-gray-500 text-left">{{ formatDate(selectedReview.date) }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-2 text-left">
                  <div class="flex items-center gap-1">
                    <Star
                      v-for="i in 5"
                      :key="i"
                      class="h-4 w-4"
                      :class="i <= selectedReview.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'"
                    />
                  </div>
                  <span class="text-sm text-gray-600">{{ selectedReview.rating }} / 5</span>
                </div>

                <p id="full-review-content" class="text-gray-700 text-sm sm:text-base leading-relaxed text-left">
                  "{{ selectedReview.comment }}"
                </p>

                <div class="flex flex-wrap gap-4 text-sm text-gray-500 text-left">
                  <span>{{ selectedReview.likes || '0' }} likes</span>
                  <span>{{ selectedReview.shares || '0' }} shares</span>
                </div>

                <div class="flex justify-end pt-2">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition"
                    @click="closeModal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </Teleport>
    </div>
  </template>

<script setup>
import { ShieldCheck, MessageSquare, UserCheck, Star, X } from "lucide-vue-next";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Line } from "vue-chartjs";
import { computed, watchEffect, ref, onMounted, onBeforeUnmount } from 'vue';
import { useStubResource } from '~/services/stubClient';

// Register Chart.js modules
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

// ====================================================================
// 1. DATA FETCHING (from stubs/mock data)
// ====================================================================

// Use stub resources to load data with error handling
const { data: latestReviewsData, error: reviewsError } = await useStubResource('agencyReviews');
const { data: dashboardData, error: dashboardError } = await useStubResource('agencyDashboard');

watchEffect(() => {
  if (reviewsError.value) {
    console.error('Failed to load latest reviews', reviewsError.value);
  }
  if (dashboardError.value) {
    console.error('Failed to load dashboard stats', dashboardError.value);
  }
});


const reviews = computed(() => {
    const data = latestReviewsData.value || []; // Use this line in Nuxt environment
    
    return data.slice(0, 4).map(r => ({
        reviewer: r.reviewerName,
        rating: r.rating,
        comment: r.content,
        date: r.date,
        // Generate random engagement stats since they aren't in the stub
        likes: Math.floor(Math.random() * 100),
        shares: Math.floor(Math.random() * 50)
    }));
});

const dashboard = computed(() => {
  return dashboardData.value ?? {
    totalReviews: 0,
    averageRating: 0.0,
    verificationStatus: 'Pending',
    profileComplete: 0,
  }; 
});


// ====================================================================
// 2. UTILITIES & HANDLERS
// ====================================================================

const getInitials = (name) => {
  if (!name) return '??'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const formatDate = (date) => {
  if (!date) return ''
  // Use a shorter format for better fitting in the dashboard view
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
}

const isModalOpen = ref(false)
const selectedReview = ref(null)

const closeModal = () => {
  isModalOpen.value = false
  selectedReview.value = null
}

const viewFullReview = (review) => {
  selectedReview.value = review
  isModalOpen.value = true
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeModal()
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
})



const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Reviews Received",
      data: [40, 65, 80, 55, 90, 70, 85, 75, 95, 80, 70, 85],
      borderColor: "#4169E1",
      backgroundColor: "rgba(65,105,225,0.2)",
      tension: 0.4,
      fill: true,
      borderWidth: 2,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { 
      display: false
    },
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    }
  }
};
</script>

<style scoped>
/* Custom colors matching the design system */
.border-gainsboro {
  border-color: #DCDCDC;
}
.bg-ghostwhite {
  background-color: #F8F8FF;
}
.text-seagreen {
  color: #2E8B57;
}
.text-deepskyblue {
  color: #00BFFF;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Enhanced responsive breakpoints */
@media (max-width: 475px) {
  .xs\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

/* Better touch targets for mobile */
button, [role="button"] {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  min-height: 44px;
}

/* Focus states for accessibility */
button:focus-visible,
span:focus-visible {
  outline: 2px solid #4169E1;
  outline-offset: 2px;
}

/* Ensure no horizontal overflow */
.w-full {
  max-width: 100%;
  overflow-x: hidden;
}

/* Table responsive fixes */
@media (max-width: 1024px) {
  .hidden.lg\:block {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .hidden.md\:block {
    display: none !important;
  }
}

:deep(.fade-enter-active),
:deep(.fade-leave-active) {
  transition: opacity 0.2s ease;
}

:deep(.fade-enter-from),
:deep(.fade-leave-to) {
  opacity: 0;
}
</style>
