<template>
  <div class="w-full min-h-screen bg-white p-4 sm:p-4 space-y-6">
    <!-- Header -->
    <div class="w-full rounded-xl bg-gradient-to-br from-indigo-500/10 to-pink-500/10 p-4 sm:p-6 border border-gray-200 shadow-lg mb-4 sm:mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">Welcome John</h1>
        </div>
        <button
          class="bg-white/90 hover:bg-white text-gray-800 font-semibold px-4 py-2.5 transition shadow-md whitespace-nowrap text-sm w-full sm:w-auto text-center rounded-none border-none"
          aria-label="List Company"
        >
          List Company
        </button>
      </div>
    </div>

      <!-- Overall Rating Card -->
    <div class="w-full bg-white rounded-lg border border-darkgray border-solid box-border p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="font-semibold text-xl text-gray-800">Overall Rating</div>
      <div class="text-center sm:text-right">
        <div v-if="isLoading" class="text-3xl font-bold text-gray-900 animate-pulse bg-gray-200 w-16 h-8 rounded"></div>
        <div v-else class="text-3xl font-bold text-gray-900">{{ overallRating }}</div>
        <div class="flex justify-center sm:justify-end gap-0.5 mt-1">
          <Star
            v-for="i in 5"
            :key="i"
            :class="i <= Math.round(Number(overallRating)) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
            class="w-5 h-5"
          />
        </div>
        <div class="text-sm text-gray-500 mt-1">Based on {{ totalReviews }} reviews</div>
      </div>
    </div>

      <!-- FILTER CONTROLS -->
        <div class="w-full relative border border-darkgray border-solid box-border flex flex-col items-stretch p-5 gap-4 text-center text-base text-darkgray font-plus-jakarta-sans bg-white rounded-lg md:flex-row md:flex-wrap xl:flex-nowrap md:items-center">
        <!-- Rating Select Dropdown -->
        <div class="relative w-full md:w-[173px] flex-shrink-0">
          <select 
            v-model="selectedRating"
            class="h-[52px] w-full rounded border-darkgray border-solid border-[1px] box-border py-3 px-4 text-darkslategray cursor-pointer bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-darkslategray pointer-events-none" />
        </div>

        <!-- Date From -->
        <div class="relative w-full md:w-auto min-w-[220px] flex-shrink-0">
          <div class="flex items-center h-[52px] rounded border-darkgray border-solid border-[1px] box-border bg-white overflow-hidden">
            <span class="px-3 text-darkslategray whitespace-nowrap">From</span>
            <input
              type="date"
              v-model="dateFrom"
              class="flex-1 h-full px-2 border-none outline-none text-darkslategray bg-transparent cursor-pointer"
              @change="applyFilters"
            >
            <Calendar class="h-6 w-6 text-darkslategray mx-3 flex-shrink-0" />
          </div>
        </div>

        <!-- Date To -->
        <div class="relative w-full md:w-auto min-w-[220px] flex-shrink-0">
          <div class="flex items-center h-[52px] rounded border-darkgray border-solid border-[1px] box-border bg-white overflow-hidden">
            <span class="px-3 text-darkslategray whitespace-nowrap">To</span>
            <input
              type="date"
              v-model="dateTo"
              class="flex-1 h-full px-2 border-none outline-none text-darkslategray bg-transparent cursor-pointer"
              @change="applyFilters"
            >
            <Calendar class="h-6 w-6 text-darkslategray mx-3 flex-shrink-0" />
          </div>
        </div>

        <!-- Apply Filter Button -->
        <button 
          class="w-full md:w-[132px] flex-shrink-0 rounded bg-forestgreen flex items-center justify-center py-3 px-8 box-border text-white cursor-pointer hover:bg-green-700 transition-colors min-h-[52px] border-0 outline-none focus:outline-none focus:ring-2 focus:ring-green-300"
          @click="applyFilters"
        >
          <div class="relative leading-[130%] capitalize font-semibold text-black whitespace-nowrap">
            Apply filter
          </div>
        </button>

        <!-- Clear Filters Button -->
        <button 
          v-if="hasActiveFilters"
          class="w-full md:w-auto flex-shrink-0 rounded bg-gray-500 flex items-center justify-center py-3 px-4 box-border text-white cursor-pointer hover:bg-gray-600 transition-colors min-h-[52px] border-0 outline-none focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
          @click="resetFilters"
        >
          Clear Filters
        </button>
      </div>
    <!-- END FILTER CONTROLS -->
    
    <div v-if="isLoading" class="p-8 text-center text-gray-500">
      <Loader2 class="w-6 h-6 animate-spin mx-auto mb-2 text-green-500" />
      Loading reviews...
    </div>

    <div v-else>
      <div class="w-full relative flex flex-col items-start gap-5 text-left text-[18px] text-gray-900 font-plus-jakarta-sans">
        <b class="self-stretch relative leading-[130%] capitalize">Latest Reviews ({{ filteredReviewsCount }})</b>
        <div class="self-stretch flex flex-col items-start text-base text-gray-600 w-full">
            
            <!-- Desktop Table (visible >= lg) -->
              <div class="hidden lg:block w-full border border-table-border rounded-lg overflow-x-auto review-table-wrapper">
                  <div class="review-table">
                    <!-- Table Header - Using exact spacing and colors from reference -->
                    <div class="self-stretch bg-table-header flex items-center justify-between p-num-10 gap-5 text-left text-num-16 text-table-header-text font-plus-jakarta-sans border-b border-table-border">
                      <div class="w-num-230 flex items-center p-num-10 box-border">
                        <div class="relative leading-[160%] uppercase font-medium">Reviewer</div>
                      </div>
                      <div class="w-num-200 flex items-center justify-center p-num-10 box-border">
                        <div class="relative leading-[160%] uppercase font-medium">Rating</div>
                      </div>
                      <div class="w-num-200 flex items-center justify-center p-num-10 box-border">
                        <div class="relative leading-[160%] uppercase font-medium">Date & Time</div>
                      </div>
                      <div class="w-[379px] flex items-center justify-center p-num-10 box-border">
                        <div class="relative leading-[160%] uppercase font-medium">Review</div>
                      </div>
                      <div class="w-num-100 flex items-center justify-center p-num-10 box-border">
                        <div class="relative leading-[160%] uppercase font-medium">Actions</div>
                      </div>
                    </div>

                    <!-- Table Body with minimal border styling -->
                    <div v-if="filteredReviewsCount > 0" class="self-stretch flex flex-col items-start bg-white">
                      <div 
                        v-for="review in paginatedReviews" 
                        :key="review.id"
                        class="self-stretch border-b border-table-border flex items-center justify-between p-num-10 gap-5 hover:bg-gray-50 transition-colors last:border-b-0"
                      >
                        <!-- Reviewer Column -->
                        <div class="w-num-230 flex items-center gap-2.5">
                          <div class="h-11 w-11 relative rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                            <span class="text-white font-bold text-sm">{{ getInitials(review.reviewerName) }}</span>
                          </div>
                          <div class="w-num-250 flex items-center py-num-10 px-num-0 box-border shrink-0">
                            <div class="h-3 w-num-187 relative leading-[160%] capitalize inline-block shrink-0 text-gray-900 font-medium">{{ review.reviewerName }}</div>
                          </div>
                        </div>

                        <!-- Rating Column -->
                        <div class="w-num-200 flex items-center justify-center p-num-10 box-border">
                          <div class="flex flex-col items-center gap-1">
                            <div class="flex items-center gap-px">
                              <Star
                                v-for="i in 5"
                                :key="i"
                                :class="i <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
                                class="w-6 h-6"
                              />
                            </div>
                            <div class="text-xs text-gray-500">{{ review.rating }} Star{{ review.rating > 1 ? 's' : '' }}</div>
                          </div>
                        </div>

                        <!-- Date & Time Column -->
                        <div class="w-num-200 flex items-center justify-center p-num-10 box-border">
                          <div class="relative leading-[160%] capitalize text-center">
                            <p class="m-0 text-gray-900">{{ formatDate(review.date) }}</p>
                            <p class="m-0 text-gray-500 text-sm">{{ review.time }}</p>
                          </div>
                        </div>

                        <!-- Review Column -->
                        <div class="flex items-center justify-center p-num-10 gap-1 text-darkslategray">
                          <div class="relative leading-[160%] capitalize">"{{ truncateReview(review.content) }}"</div>
                          <span
                            @click="viewFullReview(review)"
                            class="text-deepskyblue hover:text-blue-600 cursor-pointer"
                          >
                            Full view
                          </span>
                        </div>

                        <!-- Actions Column -->
                        <div class="w-num-100 flex items-center justify-center p-num-10 box-border">
                          <div class="flex items-center gap-2">
                            <button 
                              @click="approveReview(review.id)"
                              class="p-2 text-green-600 hover:bg-green-50 rounded transition touch-manipulation border-0 outline-none"
                              title="Approve review"
                            >
                              <CheckCircle class="w-5 h-5" />
                            </button>
                            <button 
                              @click="deleteReview(review.id)"
                              class="p-2 text-red-600 hover:bg-red-50 rounded transition touch-manipulation border-0 outline-none"
                              title="Delete review"
                            >
                              <Trash2 class="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Empty State within table -->
                    <div v-else class="self-stretch flex flex-col items-start bg-white">
                      <div class="self-stretch flex items-center justify-between p-num-10 gap-5">
                        <div class="w-full bg-white p-8 text-center">
                          <div class="max-w-md mx-auto">
                            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Star class="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900 mb-2">No reviews match your filters</h3>
                            <p class="text-gray-600 mb-4">Try adjusting your search criteria or clear filters.</p>
                            <button
                              @click="resetFilters"
                              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition min-h-[44px] touch-manipulation border-0 outline-none"
                            >
                              Clear Filters
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>

            <!-- Mobile Cards (visible < lg) -->
            <div class="lg:hidden space-y-4">
              <div
                v-for="review in paginatedReviews"
                :key="review.id"
                class="bg-white border border-table-border rounded-lg p-4 shadow-sm  hover:bg-gray-50 transition-shadow"
              >
                <!-- Header -->
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700 text-sm flex-shrink-0">
                      {{ getInitials(review.reviewerName) }}
                    </div>
                    <div class="min-w-0">
                      <div class="font-medium text-gray-800 text-base truncate">{{ review.reviewerName }}</div>
                      <div class="text-sm text-gray-500 font-medium">{{ review.agency }}</div>
                    </div>
                  </div>
                  <div class="flex flex-col items-end flex-shrink-0 ml-2">
                    <div class="flex gap-0.5 mb-1">
                      <Star
                        v-for="i in 5"
                        :key="i"
                        :class="i <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
                        class="w-4 h-4"
                      />
                    </div>
                    <div class="text-xs text-gray-500 whitespace-nowrap">{{ formatDate(review.date) }}</div>
                  </div>
                </div>

                <!-- Review Content -->
                <div class="mb-4">
                  <p class="text-gray-700 text-sm leading-relaxed italic line-clamp-3">"{{ review.content }}"</p>
                  <span
                    @click="viewFullReview(review)"
                    class="text-deepskyblue hover:text-blue-600 cursor-pointer"
                  >
                    Full view
                  </span>
                </div>

                <!-- Actions -->
                <div class="flex justify-end gap-2 pt-2 border-t border-table-border">
                  <button 
                    class="flex items-center justify-center gap-1 px-3 py-1.5 text-green-600 bg-green-50 rounded-lg text-sm hover:bg-green-100 transition w-1/2 min-h-[44px] touch-manipulation border-0 outline-none"
                    @click="approveReview(review.id)"
                    aria-label="Approve review"
                  >
                    <CheckCircle class="w-4 h-4" />
                    Approve
                  </button>
                  <button 
                    class="flex items-center justify-center gap-1 px-3 py-1.5 text-red-600 bg-red-50 rounded-lg text-sm hover:bg-red-100 transition w-1/2 min-h-[44px] touch-manipulation border-0 outline-none"
                    @click="deleteReview(review.id)"
                    aria-label="Delete review"
                  >
                    <Trash2 class="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>

              <!-- Mobile Empty State -->
              <div v-if="filteredReviewsCount === 0" class="w-full bg-white rounded-lg border border-table-border border-solid p-8 text-center">
                <div class="max-w-md mx-auto">
                  <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star class="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">No reviews match your filters</h3>
                  <p class="text-gray-600 mb-4">Try adjusting your search criteria or clear filters.</p>
                  <button
                    @click="resetFilters"
                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition min-h-[44px] touch-manipulation border-0 outline-none"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

              <!-- Pagination -->
              <div
                v-if="filteredReviewsCount > 0"
                class="flex flex-col gap-3 py-4 border-t border-table-border w-full sm:flex-row sm:items-center sm:justify-between"
              >
                <p class="text-sm text-gray-500 text-center sm:text-left">
                  Showing
                  <span class="font-semibold text-gray-900">{{ pageRangeLabel }}</span>
                  of {{ filteredReviewsCount }} reviews
                </p>
                <div class="flex justify-center sm:justify-end">
                  <Pagination
                    v-model="currentPage"
                    :total-pages="totalPages"
                    :max-visible="5"
                  />
                </div>
              </div>
        </div>
      </div>
    </div>

    <!-- Full Review Modal -->
    <div v-if="selectedReview" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Review Details</h3>
          <button @click="selectedReview = null" class="text-gray-500 hover:text-gray-700">
            <X class="w-6 h-6" />
          </button>
        </div>
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span class="text-white font-bold">{{ getInitials(selectedReview.reviewerName) }}</span>
            </div>
            <div>
              <div class="font-semibold text-gray-900">{{ selectedReview.reviewerName }}</div>
              <div class="text-sm text-gray-500">{{ selectedReview.agency }}</div>
              <div class="text-sm text-gray-500">{{ formatDate(selectedReview.date) }} at {{ selectedReview.time }}</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex gap-1">
              <Star
                v-for="i in 5"
                :key="i"
                :class="i <= selectedReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
                class="w-5 h-5"
              />
            </div>
            <span class="text-gray-600">{{ selectedReview.rating }} Star{{ selectedReview.rating > 1 ? 's' : '' }}</span>
          </div>
          <div class="border-t pt-4">
            <p class="text-gray-700 leading-relaxed italic">"{{ selectedReview.content }}"</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { CheckCircle, Trash2, Star, ChevronDown, Loader2, Calendar, X } from 'lucide-vue-next'
import Pagination from '~/components/common/pagination.vue'
import { useStubClient } from '~/services/stubClient'
import { useStubResource } from '~/composables/useStubResource'

const reviews = ref([])
const selectedRating = ref('')
const currentPage = ref(1)
const reviewsPerPage = 10
const dateFrom = ref('')
const dateTo = ref('')
const selectedReview = ref(null)
const nuxtApp = useNuxtApp()
const stubClient = useStubClient()

// Load reviews from stub json
const { data: reviewsData, pending, error: reviewsError, refresh } = await useStubResource('agencyReviews')
const isLoading = computed(() => pending.value)

watchEffect(() => {
  const raw = Array.isArray(reviewsData.value) ? reviewsData.value : []
  reviews.value = raw.map((r) => ({
    ...r,
    rating: Number(r.rating) || 0,
  }))
})

watch(reviewsError, (err) => {
  if (err) {
    console.error('Failed to load agency reviews', err)
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.alert('Failed to load reviews')
      } catch {}
    }
  }
})

// Format date for display
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Format date for comparison (YYYY-MM-DD)
const formatDateForComparison = (date) => {
  if (!date) return ''
  return new Date(date).toISOString().split('T')[0]
}

// Get initials
const getInitials = (name) => {
  if (!name) return '??'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

// Truncate review content like in reference
const truncateReview = (content) => {
  if (!content) return ''
  if (content.length > 30) {
    return content.substring(0, 30) + '...'
  }
  return content
}

// Computed properties
const overallRating = computed(() => {
  if (!reviews.value.length) return '0.0'
  const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

const totalReviews = computed(() => reviews.value.length)

const hasActiveFilters = computed(() => {
  return selectedRating.value !== '' || dateFrom.value !== '' || dateTo.value !== ''
})

const filteredReviews = computed(() => {
  let filtered = [...reviews.value]

  // Filter by rating
  if (selectedRating.value) {
    filtered = filtered.filter(r => r.rating === parseInt(selectedRating.value))
  }

  // Filter by date range
  if (dateFrom.value) {
    const fromDate = formatDateForComparison(dateFrom.value)
    filtered = filtered.filter(r => formatDateForComparison(r.date) >= fromDate)
  }
  if (dateTo.value) {
    const toDate = formatDateForComparison(dateTo.value)
    filtered = filtered.filter(r => formatDateForComparison(r.date) <= toDate)
  }

  return filtered
})

const filteredReviewsCount = computed(() => filteredReviews.value.length)

const totalPages = computed(() => Math.max(1, Math.ceil(filteredReviewsCount.value / reviewsPerPage)))

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * reviewsPerPage
  return filteredReviews.value.slice(start, start + reviewsPerPage)
})

const pageRangeLabel = computed(() => {
  if (!filteredReviewsCount.value) return ''
  const start = (currentPage.value - 1) * reviewsPerPage + 1
  const end = Math.min(start + reviewsPerPage - 1, filteredReviewsCount.value)
  return `${start}-${end}`
})

// Methods
const applyFilters = () => { 
  currentPage.value = 1 
  console.log('Filters applied:', { 
    rating: selectedRating.value, 
    dateFrom: dateFrom.value, 
    dateTo: dateTo.value,
    filteredCount: filteredReviewsCount.value
  })
}

const resetFilters = () => {
  selectedRating.value = ''
  dateFrom.value = ''
  dateTo.value = ''
  currentPage.value = 1
  console.log('Filters reset')
}

const approveReview = async (id) => { 
  try {
    await stubClient.update('agencyReviews', id, { status: 'Approved' }, { delay: 140 })
    await refresh()
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.success('Review approved')
      } catch {}
    }
  } catch (error) {
    console.error('Failed to approve review', error)
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.alert('Failed to approve review')
      } catch {}
    }
  }
}

const deleteReview = async (id) => { 
  if (!confirm('Are you sure you want to delete this review?')) return
  try {
    await stubClient.remove('agencyReviews', id, { delay: 140 })
    await refresh()
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.success('Review removed')
      } catch {}
    }
  } catch (error) {
    console.error('Failed to delete review', error)
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.alert('Failed to delete review')
      } catch {}
    }
  }
}

const viewFullReview = (review) => {
  selectedReview.value = review
}

// Watch for filter changes to reset pagination
watch([selectedRating, dateFrom, dateTo], () => {
  currentPage.value = 1
})

watch(filteredReviewsCount, () => {
  const maxPage = totalPages.value
  if (currentPage.value > maxPage) {
    currentPage.value = maxPage
  }
})

</script>

<style scoped>
/* Ensure buttons/inputs are easily tappable on touch devices */
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* Custom colors to match the design */
.border-darkgray {
  border-color: #A9A9A9;
}
.border-table-border {
  border-color: #E5E7EB; /* Clean light gray border like in reference */
}
.bg-table-header {
  background-color: #F9FAFB; /* Very light gray header background */
}
.text-table-header-text {
  color: #6B7280; /* Medium gray for header text */
}
.text-darkgray {
  color: #A9A9A9;
}
.text-darkslategray {
  color: #2F4F4F;
}
.text-deepskyblue {
  color: #00BFFF; /* deepskyblue color */
}
.bg-forestgreen {
  background-color: #228B22;
}
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Custom styles for date inputs */
input[type="date"] {
  color: #2F4F4F;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/* Custom select styles */
select {
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #2F4F4F;
}

/* Custom number values for spacing consistency */
.p-num-10 {
  padding: 10px;
}
.w-num-230 {
  width: 230px;
}
.w-num-200 {
  width: 200px;
}
.w-num-250 {
  width: 250px;
}
.w-num-187 {
  width: 187px;
}
.w-num-100 {
  width: 100px;
}
.rounded-num-22 {
  border-radius: 22px;
}

/* Text size utility */
.text-num-16 {
  font-size: 16px;
}

.review-table-wrapper {
  overflow-x: auto;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
}

.review-table {
  min-width: 68rem;
}

@media (min-width: 1280px) {
  .review-table {
    min-width: 100%;
  }
}
</style>

