<template>
  <div class="w-full font-plus-jakarta-sans max-w-full overflow-hidden bg-gray-50 p-4 sm:p-6 space-y-6">
    <!-- Header -->
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6">
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
          placeholder="Search by reviewer or content"
          class="flex-1 outline-none border-none bg-transparent text-gray-700 placeholder-gray-400 text-base min-w-0 focus:ring-0 focus:outline-none"
        />
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="rounded-xl bg-white border border-gray-200 p-4 flex items-center gap-4">
        <MessageSquareIcon class="w-10 h-10 text-blue-500" />
        <div class="flex-1">
          <div class="text-sm text-gray-600">Total Reviews</div>
          <div class="text-xl font-bold text-gray-900">{{ totalReviews }}</div>
        </div>
      </div>
      <div class="rounded-xl bg-white border border-gray-200 p-4 flex items-center gap-4">
        <CheckCircleIcon class="w-10 h-10 text-green-500" />
        <div class="flex-1">
          <div class="text-sm text-gray-600">Approved</div>
          <div class="text-xl font-bold text-gray-900">{{ approvedCount }}</div>
        </div>
      </div>
      <div class="rounded-xl bg-white border border-gray-200 p-4 flex items-center gap-4">
        <ClockIcon class="w-10 h-10 text-amber-500" />
        <div class="flex-1">
          <div class="text-sm text-gray-600">Pending</div>
          <div class="text-xl font-bold text-gray-900">{{ pendingCount }}</div>
        </div>
      </div>
      <div class="rounded-xl bg-white border border-gray-200 p-4 flex items-center gap-4">
        <XCircleIcon class="w-10 h-10 text-red-500" />
        <div class="flex-1">
          <div class="text-sm text-gray-600">Rejected</div>
          <div class="text-xl font-bold text-gray-900">{{ rejectedCount }}</div>
        </div>
      </div>
    </div>

    <!-- Mobile Filters Toggle -->
    <div class="mb-2 flex lg:hidden items-center justify-between">
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

    <!-- Filters Section (pattern matches company management) -->
    <div class="mb-2">
      <!-- Desktop Filters -->
      <div class="hidden lg:flex items-center flex-wrap gap-3 min-w-full">
        <h2 class="text-lg font-bold text-gray-900 whitespace-nowrap">All Review List</h2>

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
            <option v-for="r in [5,4,3,2,1]" :key="r" :value="String(r)">{{ r }} Star</option>
          </select>
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>

        <!-- Status Filter -->
        <div class="relative">
          <select 
            v-model="filters.status"
            @change="handleFilterChange"
            class="h-12 rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0 min-w-[140px]"
          >
            <option value="">Select Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      <!-- Mobile Filters -->
      <div v-if="showMobileFilters" id="mobile-filters" class="mt-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 lg:hidden">
        <div class="space-y-4">
          <!-- Date Range -->
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

          <!-- Time Range -->
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

          <!-- Rating -->
          <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-700 font-medium">Rating</label>
            <div class="relative">
              <select 
                v-model="filters.rating"
                @change="handleFilterChange"
                class="h-12 w-full rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0"
              >
                <option value="">Select Rating</option>
                <option v-for="r in [5,4,3,2,1]" :key="r" :value="String(r)">{{ r }} Star</option>
              </select>
              <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          <!-- Status -->
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

    <!-- Reviews Table/Card Container -->
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
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {{ getInitials(review.reviewer) }}
                </div>
                <div class="min-w-0">
                  <div class="text-sm font-semibold text-gray-900 truncate">{{ review.reviewer }}</div>
                  <div class="text-xs text-gray-500">{{ formatDisplayDate(review.date) }} | {{ review.time }}</div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-medium px-2 py-1 rounded-full" :class="getStatusClass(review.status, 'soft') + ' bg-opacity-10'">
                  {{ review.status }}
                </span>
                <MoreIcon class="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </div>
            </div>

            <div class="flex items-center gap-2 text-sm text-gray-700 mb-2">
              <RatingStars :value="Number(review.rating)" :size-class="'w-4 h-4'" />
              <span>{{ review.rating }}</span>
            </div>

            <p class="text-sm text-gray-700 line-clamp-2 mb-3">{{ review.content }}</p>

            <div class="flex items-center justify-end gap-3 text-sm">
              <button @click="approveReview(review.id)" class="inline-flex items-center gap-1 text-green-600 hover:text-green-700">
                <CheckCircleIcon class="w-4 h-4" />
                Approve
              </button>
              <button @click="deleteReview(review.id)" class="inline-flex items-center gap-1 text-red-600 hover:text-red-700">
                <TrashIcon class="w-4 h-4" />
                Delete
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
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[180px]">Reviewer</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[140px]">Rating</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[180px]">Date & Time</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[260px]">Review</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Status</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap" style="width: 120px;">Action</th>
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
                  <div class="flex items-center gap-2 min-w-0">
                    <div class="w-8 h-8 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {{ getInitials(review.reviewer) }}
                    </div>
                    <span class="truncate">{{ review.reviewer }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <RatingStars :value="Number(review.rating)" :size-class="'w-4 h-4'" />
                    <span>{{ review.rating }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ formatDisplayDate(review.date) }} | {{ review.time }}</td>
                <td class="px-4 py-3 text-gray-700 text-sm">
                  <span class="truncate block">{{ review.content }}</span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div 
                    class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-sm"
                    :class="getStatusClass(review.status, 'badge')"
                  >
                    <span>{{ review.status }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <button @click="approveReview(review.id)" class="text-green-600 hover:text-green-700">
                      <CheckCircleIcon class="w-5 h-5" />
                    </button>
                    <button @click="deleteReview(review.id)" class="text-red-600 hover:text-red-700">
                      <TrashIcon class="w-5 h-5" />
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
            <SearchIcon class="w-8 h-8 text-gray-400" aria-hidden="true" />
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
  
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  Search as SearchIcon,
  Filter as FilterIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  CheckCircle as CheckCircleIcon,
  Trash2 as TrashIcon,
  MoreHorizontal as MoreIcon,
  MessageSquare as MessageSquareIcon,
  Clock as ClockIcon,
  XCircle as XCircleIcon,
} from 'lucide-vue-next'
import RatingStars from '~/components/common/ratingStars.vue'
import { getStatusClass } from '~/composables/useStatusClass'

// --- State ---
const isLoading = ref(true)
const showMobileFilters = ref(false)
const searchQuery = ref('')
const reviews = ref([])

// Pagination
const currentPage = ref(1)
const itemsPerPage = 10

// Filters (follow Company Management pattern)
const filters = ref({
  dateFrom: '',
  dateTo: '',
  timeRange: '',
  rating: '',
  status: ''
})

// Load reviews from stubs
const { data: reviewsData } = await useFetch('/stubs/agencyReviews.json')

// Helpers
const deriveStatus = (rating) => {
  const val = Number(rating)
  if (val >= 4) return 'Approved'
  if (val <= 2) return 'Rejected'
  return 'Pending'
}

const formatDisplayDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const getInitials = (name) => {
  if (!name) return ''
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

// Derived metrics
const totalReviews = computed(() => reviews.value.length)
const approvedCount = computed(() => reviews.value.filter(r => r.status === 'Approved').length)
const pendingCount = computed(() => reviews.value.filter(r => r.status === 'Pending').length)
const rejectedCount = computed(() => reviews.value.filter(r => r.status === 'Rejected').length)

// Filtering
const filteredReviews = computed(() => {
  const q = (searchQuery.value || '').toLowerCase()
  const { rating, status, dateFrom, dateTo, timeRange } = filters.value

  const withinTimeRange = (d) => {
    if (!timeRange) return true
    const today = new Date()
    const date = new Date(d)
    const diffMs = today.setHours(0,0,0,0) - date.setHours(0,0,0,0)
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    if (timeRange === 'yesterday') return diffDays === 1
    if (timeRange === 'last7days') return diffDays >= 0 && diffDays < 7
    if (timeRange === 'last30days') return diffDays >= 0 && diffDays < 30
    return true
  }

  return reviews.value.filter(r => {
    const matchesQuery = !q || r.reviewer.toLowerCase().includes(q) || r.content.toLowerCase().includes(q)
    const matchesRating = !rating || Number(r.rating) === Number(rating)
    const matchesStatus = !status || r.status === status
    const matchesFrom = !dateFrom || new Date(r.date) >= new Date(dateFrom)
    const matchesTo = !dateTo || new Date(r.date) <= new Date(dateTo)
    const matchesTime = withinTimeRange(r.date)
    return matchesQuery && matchesRating && matchesStatus && matchesFrom && matchesTo && matchesTime
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredReviews.value.length / itemsPerPage)))

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredReviews.value.slice(start, end)
})

// Methods
const handleFilterChange = () => { currentPage.value = 1 }
const applyMobileFilters = () => { handleFilterChange(); showMobileFilters.value = false }
const resetFilters = () => {
  filters.value = { dateFrom: '', dateTo: '', timeRange: '', rating: '', status: '' }
  handleFilterChange()
}

const getDisplayIndex = (indexInPage) => {
  const trueIndex = (currentPage.value - 1) * itemsPerPage + indexInPage + 1
  return String(trueIndex).padStart(2, '0')
}

const approveReview = (id) => {
  const r = reviews.value.find(x => x.id === id)
  if (r) r.status = 'Approved'
}

const deleteReview = (id) => {
  reviews.value = reviews.value.filter(r => r.id !== id)
}

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }

// Init
onMounted(() => {
  const raw = reviewsData.value || []
  reviews.value = raw.map((r, i) => ({
    id: r.id ?? i + 1,
    reviewer: r.reviewerName || r.reviewer || 'Unknown',
    rating: Number(r.rating) || 0,
    date: r.date,
    time: r.time || '',
    content: r.content || r.review || '',
    status: deriveStatus(r.rating)
  }))
  isLoading.value = false
})
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
  input[type="date"], select, button {
    min-height: 44px;
  }
}

/* Better focus states for accessibility */
input:focus, select:focus, button:focus {
  outline: 2px solid #fbbf24;
  outline-offset: 2px;
}
</style>