<template>
  <div class="w-full font-plus-jakarta-sans max-w-full overflow-hidden">
    <!-- Header Section -->
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Review Management</h1>
      </div>

      <!-- Search Bar -->
      <div class="w-full relative rounded-lg bg-white/80 backdrop-blur-sm flex items-center px-4 py-3 gap-3">
        <SearchIcon class="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
        <input
          type="text"
          v-model="searchQuery"
          @input="handleFilterChange"
          placeholder="Search reviews by name or content"
          class="flex-1 outline-none border-none bg-transparent text-gray-700 placeholder-gray-400 text-base min-w-0 
                 focus:ring-0 focus:outline-none"
        />
      </div>
    </div>

    <!-- Mobile Filters Toggle -->
    <div class="mb-4 flex lg:hidden items-center justify-between">
      <h2 class="text-base font-bold text-gray-900">All Review List</h2>
      <button 
        @click="showMobileFilters = !showMobileFilters"
        class="h-12 bg-white rounded-xl px-4 py-2 border border-gray-300 text-gray-700 text-sm outline-none cursor-pointer whitespace-nowrap touch-manipulation flex items-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition"
        aria-controls="mobile-filters"
        :aria-expanded="showMobileFilters ? 'true' : 'false'"
      >
        <FilterIcon class="w-4 h-4" aria-hidden="true" />
        <span>Filters</span>
      </button>
    </div>

    <!-- Filters Section -->
    <div class="mb-6">
      <!-- Desktop Filters -->
      <div class="hidden lg:flex items-center flex-wrap gap-3 min-w-full">
        <h2 class="text-lg font-bold text-gray-900 whitespace-nowrap">
          All Review List
        </h2>
        
        <!-- Date From -->
        <div class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 flex items-center px-4 gap-2 text-sm">
          <span class="text-gray-400 text-sm">From:</span>
          <input 
            type="date" 
            v-model="filters.dateFrom"
            @change="handleFilterChange"
            class="text-gray-600 text-sm outline-none bg-transparent cursor-pointer border-none touch-manipulation ring-0 focus:ring-0 w-32"
          />
        </div>

        <!-- Date To -->
        <div class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 flex items-center px-4 gap-2 text-sm">
          <span class="text-gray-400 text-sm">To:</span>
          <input 
            type="date" 
            v-model="filters.dateTo"
            @change="handleFilterChange"
            class="text-gray-600 text-sm outline-none bg-transparent cursor-pointer border-none touch-manipulation ring-0 focus:ring-0 w-32"
          />
        </div>

        <!-- Time Range -->
        <div class="relative">
          <select 
            v-model="filters.timeRange"
            @change="handleFilterChange"
            class="h-12 rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0 min-w-[140px]" 
          >
            <option value="">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
          </select>
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>

        <!-- Rating Filter -->
        <div class="relative">
          <select 
            v-model="filters.rating"
            @change="handleFilterChange"
            class="h-12 rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0 min-w-[140px]"
          >
            <option value="">Select Rating</option>
            <option v-for="opt in [5,4,3,2,1]" :key="opt" :value="opt">{{ opt }} Star</option>
          </select>
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>

        <!-- Status Filter -->
        <div class="relative">
          <select 
            v-model="filters.status"
            @change="handleFilterChange"
            class="h-12 rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0 min-w-[160px]"
          >
            <option value="">Select Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="On Hold">On Hold</option>
          </select>
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      <!-- Mobile Filters - Same design as desktop -->
      <div v-if="showMobileFilters" id="mobile-filters" class="mt-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 lg:hidden">
        <div class="space-y-4">
          <!-- Date Range - Same as desktop -->
          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col gap-2">
              <label class="text-sm text-gray-700 font-medium">From</label>
              <div class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 flex items-center px-4 gap-2">
                <input
                  type="date"
                  v-model="filters.dateFrom"
                  @change="handleFilterChange"
                  class="text-gray-600 text-sm outline-none bg-transparent cursor-pointer border-none touch-manipulation ring-0 focus:ring-0 w-full"
                />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm text-gray-700 font-medium">To</label>
              <div class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 flex items-center px-4 gap-2">
                <input
                  type="date"
                  v-model="filters.dateTo"
                  @change="handleFilterChange"
                  class="text-gray-600 text-sm outline-none bg-transparent cursor-pointer border-none touch-manipulation ring-0 focus:ring-0 w-full"
                />
              </div>
            </div>
          </div>

          <!-- Time Range - Same as desktop -->
          <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-700 font-medium">Time Range</label>
            <div class="relative">
              <select 
                v-model="filters.timeRange"
                @change="handleFilterChange"
                class="h-12 w-full rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0" 
              >
                <option value="">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
              </select>
              <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          <!-- Rating Filter - Same as desktop -->
          <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-700 font-medium">Rating</label>
            <div class="relative">
              <select 
                v-model="filters.rating"
                @change="handleFilterChange"
                class="h-12 w-full rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0"
              >
                <option value="">Select Rating</option>
                <option v-for="opt in [5,4,3,2,1]" :key="opt" :value="opt">{{ opt }} Star</option>
              </select>
              <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          <!-- Status Filter - Same as desktop -->
          <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-700 font-medium">Status</label>
            <div class="relative">
              <select
                v-model="filters.status"
                @change="handleFilterChange"
                class="h-12 w-full rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0"
              >
                <option value="">Select Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="On Hold">On Hold</option>
              </select>
              <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </div>
        
        <div class="mt-6 flex items-center justify-end gap-3">
          <button @click="resetFilters" class="px-4 py-3 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation transition">Reset</button>
          <button @click="applyMobileFilters" class="px-4 py-3 text-sm text-gray-900 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 rounded-lg touch-manipulation transition">Apply</button>
        </div>
      </div>
    </div>

    <!-- Reviews Table -->
    <div class="w-full bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-16 text-gray-500 text-lg font-medium animate-pulse">
        <svg class="animate-spin h-8 w-8 text-yellow-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading Reviews...
      </div>

      <!-- Content -->
      <template v-else>
        <!-- Mobile Cards -->
        <div class="block lg:hidden">
          <div 
            v-for="(review, index) in paginatedReviews" 
            :key="review.id"
            class="p-4 border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-xs">
                  {{ getInitials(review.reviewerName) }}
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-semibold text-gray-900">{{ review.reviewerName }}</span>
                  <span class="text-xs text-gray-500">{{ formatDate(review.date) }} • {{ review.time }}</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium" :class="getStatusClass(review.status, 'soft')">
                  {{ review.status || 'Pending' }}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-2 text-sm text-gray-700 mb-2">
              <RatingStars :value="Number(review.rating)" :size-class="'w-4 h-4'" />
              <span class="text-gray-600">{{ review.rating }}</span>
            </div>

            <div class="text-sm text-gray-700 mb-3">
              <p class="line-clamp-2">"{{ review.content }}"</p>
            </div>

            <div class="flex items-center justify-end gap-2">
              <button 
                @click="approveReview(review)"
                class="p-2 text-green-600 hover:bg-green-50 active:bg-green-100 rounded-lg touch-manipulation transition"
                title="Approve review"
              >
                <CheckCircleIcon class="w-5 h-5" aria-hidden="true" />
              </button>
              <button 
                @click="deleteReview(review)"
                class="p-2 text-red-600 hover:bg-red-50 active:bg-red-100 rounded-lg touch-manipulation transition"
                title="Delete review"
              >
                <Trash2Icon class="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <!-- Desktop Table -->
        <div class="hidden lg:block overflow-x-auto">
          <table class="w-full table-auto min-w-[900px]">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap" style="width: 60px;">No</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[160px]">Reviewer</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Rating</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[160px]">Date & Time</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[240px]">Review</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Status</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap" style="width: 100px;">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr 
                v-for="(review, index) in paginatedReviews" 
                :key="review.id" 
                class="hover:bg-gray-50 active:bg-gray-100 transition"
              >
                <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ getDisplayIndex(index) }}</td>
                <td class="px-4 py-3 text-gray-900 font-medium text-sm">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center font-semibold text-indigo-700 text-xs">
                      {{ getInitials(review.reviewerName) }}
                    </div>
                    <span class="truncate">{{ review.reviewerName }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <RatingStars :value="Number(review.rating)" :size-class="'w-4 h-4'" />
                    <span>{{ review.rating }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                  <div>{{ formatDate(review.date) }}</div>
                  <div class="text-xs text-gray-500">{{ review.time }}</div>
                </td>
                <td class="px-4 py-3 text-gray-700 text-sm">
                  <span class="truncate block max-w-[420px]">{{ review.content }}</span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <span 
                    class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-sm"
                    :class="getStatusClass(review.status, 'soft')"
                  >
                    {{ review.status || 'Pending' }}
                  </span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <button 
                      @click="approveReview(review)"
                      class="p-2 text-green-600 hover:bg-green-50 active:bg-green-100 rounded-lg touch-manipulation transition"
                      title="Approve review"
                    >
                      <CheckCircleIcon class="w-5 h-5" aria-hidden="true" />
                    </button>
                    <button 
                      @click="deleteReview(review)"
                      class="p-2 text-red-600 hover:bg-red-50 active:bg-red-100 rounded-lg touch-manipulation transition"
                      title="Delete review"
                    >
                      <Trash2Icon class="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="paginatedReviews.length === 0" class="text-center py-12">
          <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <StarIcon class="w-8 h-8 text-gray-400" aria-hidden="true" />
          </div>
          <p class="text-gray-500 text-base">No reviews found</p>
          <p class="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      </template>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
      <p class="text-sm text-gray-600 text-center sm:text-left">
        Showing <span class="font-semibold">{{ paginatedReviews.length }}</span> of 
        <span class="font-semibold">{{ filteredReviews.length }}</span> reviews (Page {{ currentPage }} of {{ totalPages }})
      </p>
      <div class="flex gap-2">
        <button 
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition touch-manipulation flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon class="w-4 h-4" aria-hidden="true" />
          <span>Previous</span>
        </button>
        
        <template v-for="page in totalPages" :key="page">
          <button 
            v-if="page === currentPage || page === currentPage - 1 || page === currentPage + 1"
            @click="currentPage = page"
            :class="[
              'px-4 py-2.5 rounded-lg text-sm font-medium transition touch-manipulation min-w-[44px]',
              page === currentPage 
                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 active:bg-yellow-600' 
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 active:bg-gray-100'
            ]"
          >
            {{ page }}
          </button>
        </template>
        
        <button 
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition touch-manipulation flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ChevronRightIcon class="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>

  <!-- Stats Cards - Responsive Grid (match manageUsers design) -->
  <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
    <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
      <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
        <MessageSquareIcon class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
      </div>
      <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
        <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Total Reviews</div>
        <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.totalReviews }}</b>
      </div>
    </div>
    <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
      <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-yellow-100 flex items-center justify-center flex-shrink-0">
        <StarIcon class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-600" />
      </div>
      <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
        <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Average Rating</div>
        <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.avgRating }}</b>
      </div>
    </div>
    <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
      <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
        <CheckCircleIcon class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
      </div>
      <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
        <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Approved</div>
        <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.approved }}</b>
      </div>
    </div>
    <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
      <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-orange-100 flex items-center justify-center flex-shrink-0">
        <ClockIcon class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-600" />
      </div>
      <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
        <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Pending</div>
        <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.pending }}</b>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { 
  Search as SearchIcon, 
  Filter as FilterIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  CheckCircle as CheckCircleIcon,
  Trash2 as Trash2Icon,
  Star as StarIcon,
  Clock as ClockIcon,
  MessageSquare as MessageSquareIcon
} from 'lucide-vue-next'
import RatingStars from '~/components/common/ratingStars.vue'
import { getStatusClass } from '~/composables/useStatusClass'

// --- State ---
const showMobileFilters = ref(false)
const searchQuery = ref('')
const isLoading = ref(true)
const reviews = ref([])

// Pagination State
const currentPage = ref(1)
const itemsPerPage = 10

// Filter State
const filters = ref({
  dateFrom: '',
  dateTo: '',
  timeRange: '',
  rating: '',
  status: ''
})

// --- Data Fetching ---
const { data: reviewsData } = await useFetch('/stubs/agencyReviews.json')

onMounted(() => {
  const base = (reviewsData.value || []).map(r => ({ ...r, status: 'Pending' }))
  reviews.value = base
  isLoading.value = false
  updateStats()
})

// --- Helpers ---
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const getInitials = (name) => {
  return String(name || '')
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

function isWithinTimeRange(dateStr, range) {
  const today = new Date()
  const date = new Date(dateStr)
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const msInDay = 24 * 60 * 60 * 1000
  const diffDays = Math.floor((startOfToday - startOfDate) / msInDay)

  switch (range) {
    case '':
      return diffDays === 0
    case 'yesterday':
      return diffDays === 1
    case 'last7days':
      return diffDays >= 0 && diffDays < 7
    case 'last30days':
      return diffDays >= 0 && diffDays < 30
    default:
      return true
  }
}

// --- Computed ---
const filteredReviews = computed(() => {
  if (isLoading.value) return []

  let list = [...reviews.value]

  const query = (searchQuery.value || '').toLowerCase()
  if (query) {
    list = list.filter(r => 
      String(r.reviewerName || '').toLowerCase().includes(query) || 
      String(r.content || '').toLowerCase().includes(query)
    )
  }

  if (filters.value.rating) {
    const ratingNum = Number(filters.value.rating)
    list = list.filter(r => Number(r.rating) === ratingNum)
  }

  if (filters.value.status) {
    list = list.filter(r => (r.status || 'Pending') === filters.value.status)
  }

  if (filters.value.dateFrom) {
    const from = new Date(filters.value.dateFrom)
    list = list.filter(r => new Date(r.date) >= from)
  }

  if (filters.value.dateTo) {
    const to = new Date(filters.value.dateTo)
    list = list.filter(r => new Date(r.date) <= to)
  }

  if (filters.value.timeRange) {
    list = list.filter(r => isWithinTimeRange(r.date, filters.value.timeRange))
  }

  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredReviews.value.length / itemsPerPage)))

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredReviews.value.slice(start, end)
})

// --- Methods ---
const handleFilterChange = () => { currentPage.value = 1 }

const getDisplayIndex = (indexInPage) => {
  const trueIndex = (currentPage.value - 1) * itemsPerPage + indexInPage + 1
  return String(trueIndex).padStart(2, '0')
}

const approveReview = (review) => { review.status = 'Approved' }

const deleteReview = (review) => { 
  reviews.value = reviews.value.filter(r => r.id !== review.id) 
}

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }

const applyMobileFilters = () => { handleFilterChange(); showMobileFilters.value = false }
const resetFilters = () => {
  filters.value = { dateFrom: '', dateTo: '', timeRange: '', rating: '', status: '' }
  handleFilterChange()
}

// --- Stats ---
const stats = ref({ totalReviews: 0, avgRating: '0.0', approved: 0, pending: 0 })

const updateStats = () => {
  const list = reviews.value
  const total = list.length
  const approved = list.filter(r => (r.status || 'Pending') === 'Approved').length
  const pending = list.filter(r => (r.status || 'Pending') === 'Pending').length
  const sumRatings = list.reduce((acc, r) => acc + Number(r.rating || 0), 0)
  const avg = total ? (sumRatings / total) : 0
  stats.value = {
    totalReviews: total,
    avgRating: avg.toFixed(1),
    approved,
    pending
  }
}

// Keep stats in sync on data changes
watch(
  () => reviews.value.map(r => ({ id: r.id, status: r.status, rating: r.rating })),
  () => updateStats(),
  { deep: true }
)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Enhanced touch targets for mobile */
@media (max-width: 640px) {
  input[type="date"] {
    min-height: 44px;
  }
  
  select {
    min-height: 44px;
  }
  
  button {
    min-height: 44px;
  }
}

/* Better focus states for accessibility */
input:focus, select:focus, button:focus {
  outline: 2px solid #fbbf24; /* yellow-400 */
  outline-offset: 2px;
}
</style>
