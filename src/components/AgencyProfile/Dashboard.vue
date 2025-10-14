<template>
  <div class="w-full min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
    <!-- Header Section -->
    <div
      class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6"
    >
      <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">My Assigned Tasks</h1>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
      <div class="flex items-center justify-between p-3 sm:p-4 md:p-5 rounded-lg bg-white border shadow-sm">
        <div class="min-w-0 flex-1">
          <p class="text-gray-600 font-medium text-xs sm:text-sm md:text-base truncate">Total Reviews</p>
          <p class="text-xl sm:text-2xl md:text-3xl font-semibold truncate">{{ dashboard.totalReviews }}</p>
        </div>
        <MessageSquare class="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-purple-500 flex-shrink-0 ml-2" />
      </div>

      <div class="flex items-center justify-between p-3 sm:p-4 md:p-5 rounded-lg bg-white border shadow-sm">
        <div class="min-w-0 flex-1">
          <p class="text-gray-600 font-medium text-xs sm:text-sm md:text-base truncate">Average Rating</p>
          <p class="text-xl sm:text-2xl md:text-3xl font-semibold truncate">{{ dashboard.averageRating }}</p>
        </div>
        <Star class="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-yellow-500 flex-shrink-0 ml-2" />
      </div>

      <div class="flex items-center justify-between p-3 sm:p-4 md:p-5 rounded-lg bg-white border shadow-sm">
        <div class="min-w-0 flex-1">
          <p class="text-gray-600 font-medium text-xs sm:text-sm md:text-base truncate">Verification</p>
          <p class="text-xl sm:text-2xl md:text-3xl font-semibold text-green-600 truncate">{{ dashboard.verificationStatus }}</p>
        </div>
        <ShieldCheck class="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-green-500 flex-shrink-0 ml-2" />
      </div>

      <div class="flex items-center justify-between p-3 sm:p-4 md:p-5 rounded-lg bg-white border shadow-sm">
        <div class="min-w-0 flex-1">
          <p class="text-gray-600 font-medium text-xs sm:text-sm md:text-base truncate">Profile Complete</p>
          <p class="text-xl sm:text-2xl md:text-3xl font-semibold truncate">{{ dashboard.profileComplete }}</p>
        </div>
        <UserCheck class="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-blue-500 flex-shrink-0 ml-2" />
      </div>
    </div>

    <!-- Review Trend Graph -->
    <div class="rounded-lg bg-white border p-3 sm:p-4 md:p-6 shadow-sm mb-4 sm:mb-6">
      <h2 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Review Trend</h2>
      <div class="w-full h-48 sm:h-56 md:h-64 lg:h-72">
        <Line :data="chartData" :options="chartOptions" class="w-full h-full" />
      </div>
    </div>

    <!-- Latest Review Table -->
    <div class="rounded-lg bg-white border p-3 sm:p-4 md:p-6 shadow-sm">
      <h2 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Latest Reviews</h2>
      <div class="overflow-x-auto">
        <!-- Mobile Card View -->
        <div class="block sm:hidden space-y-3">
          <div 
            v-for="(review, index) in reviews" 
            :key="index"
            class="border border-gray-200 rounded-lg p-3 bg-white"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium text-gray-800 text-sm">{{ review.reviewer }}</span>
              <span class="text-gray-500 text-xs">{{ review.date }}</span>
            </div>
            <div class="flex items-center gap-1 mb-2">
              <Star
                v-for="i in 5"
                :key="i"
                class="h-3 w-3"
                :class="i <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'"
              />
            </div>
            <p class="text-gray-600 text-xs line-clamp-2">{{ review.comment }}</p>
          </div>
        </div>

        <!-- Desktop Table View -->
        <table class="min-w-full border border-gray-200 text-sm hidden sm:table">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm">Reviewer</th>
              <th class="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm">Rating</th>
              <th class="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm">Comment</th>
              <th class="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(review, index) in reviews" 
              :key="index"
              class="border-t hover:bg-gray-50 transition-colors"
            >
              <td class="px-3 sm:px-4 py-2 font-medium text-gray-800 text-xs sm:text-sm">
                {{ review.reviewer }}
              </td>
              <td class="px-3 sm:px-4 py-2">
            <div class="flex items-center gap-1">
              <RatingStars :value="review.rating" :size-class="'h-3 w-3 sm:h-4 sm:w-4'" />
            </div>
              </td>
              <td class="px-3 sm:px-4 py-2 text-gray-600 text-xs sm:text-sm max-w-xs truncate">
                {{ review.comment }}
              </td>
              <td class="px-3 sm:px-4 py-2 text-gray-500 text-xs sm:text-sm whitespace-nowrap">
                {{ review.date }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Load More Button for Mobile -->
      <div class="mt-4 text-center sm:hidden">
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors touch-manipulation">
          Load More Reviews
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ShieldCheck, MessageSquare, UserCheck } from "lucide-vue-next";
import RatingStars from '@/components/common/RatingStars.vue'
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

// Register Chart.js modules
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

// Dummy chart data
const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Reviews",
      data: [40, 65, 80, 55, 90, 70],
      borderColor: "#4f46e5",
      backgroundColor: "rgba(79,70,229,0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
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

// Reviews data from stub
const { data: latestReviewsData } = await useFetch('/stubs/agencyReviews.json')
const reviews = computed(() => (latestReviewsData.value || []).slice(0, 4).map(r => ({
  reviewer: r.reviewerName,
  rating: r.rating,
  comment: r.content,
  date: r.date
})))

// Dashboard stats
const { data: dashboard } = await useFetch('/stubs/agencyDashboard.json')
</script>

<style scoped>
/* Better touch targets for mobile */
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
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
  .xs\\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
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

  .h-8 {
    height: 1.5rem;
  }

  .w-8 {
    width: 1.5rem;
  }
}

/* Chart responsive adjustments */
@media (max-width: 768px) {
  :deep(canvas) {
    max-height: 200px !important;
  }
}

/* Ensure table scrolls properly on mobile */
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
}
</style>