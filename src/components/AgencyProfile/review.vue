<template>
  <div class="w-full font-plus-jakarta-sans max-w-full overflow-hidden">
    <!-- Header Section with Gradient Background -->
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div>
          <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Review Management</h1>
          <p class="text-gray-600 mt-1 text-sm">Manage and monitor customer feedback</p>
        </div>
        <button
          class="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-semibold px-4 py-2.5 rounded-lg transition shadow-md whitespace-nowrap text-sm w-full sm:w-auto text-center touch-manipulation flex items-center justify-center gap-2"
        >
          <Pencil class="w-4 h-4" />
          Manage Reviews
        </button>
      </div>
    </div>

    <!-- Overall Rating -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex flex-col items-center p-3 sm:p-4 gap-2">
      <div class="font-semibold text-base sm:text-lg text-gray-800">Overall Rating</div>
        <div class="text-2xl sm:text-3xl font-bold text-yellow-500">{{ overallRating }}</div>
        <div class="flex justify-center gap-1">
          <RatingStars :value="Number(overallRating)" :size-class="'w-4 h-4'" />
        </div>
        <div class="text-xs sm:text-sm text-gray-500">Based on {{ totalReviews }} reviews</div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="mb-4">
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <select v-model="selectedRating" class="border rounded-lg px-3 py-2 text-gray-700 flex-1">
          <option value="">All ratings</option>
          <option v-for="opt in [5,4,3,2,1]" :key="opt" :value="opt">{{ opt }} Stars</option>
        </select>

        <div class="flex gap-2">
          <input type="date" v-model="dateFrom" class="border rounded-lg px-3 py-2 text-gray-700 flex-1 text-sm" />
          <input type="date" v-model="dateTo" class="border rounded-lg px-3 py-2 text-gray-700 flex-1 text-sm" />
        </div>

        <button
          class="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow transition flex items-center justify-center gap-2 w-full sm:w-auto touch-manipulation"
          @click="applyFilters"
        >
          <Filter class="w-4 h-4" />
          Apply Filters
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="w-full bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- Desktop Table -->
      <div class="hidden lg:block">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
            <tr>
              <th class="px-4 py-3">Reviewer</th>
              <th class="px-4 py-3 text-center">Rating</th>
              <th class="px-4 py-3 text-center">Date & Time</th>
              <th class="px-4 py-3">Review</th>
              <th class="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="review in filteredReviews"
              :key="review.id"
              class="border-t hover:bg-gray-50 transition"
            >
              <td class="px-4 py-3 flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
                  {{ getInitials(review.reviewerName) }}
                </div>
                <span class="font-medium text-gray-800">{{ review.reviewerName }}</span>
              </td>
              <td class="px-4 py-3 text-center">
                <div class="flex justify-center gap-1">
                  <RatingStars :value="review.rating" />
                </div>
              </td>
              <td class="px-4 py-3 text-center text-sm text-gray-600">
                <div>{{ formatDate(review.date) }}</div>
                <div class="text-xs">{{ review.time }}</div>
              </td>
              <td class="px-4 py-3 text-gray-700">
                <p class="line-clamp-2">"{{ review.content }}"</p>
              </td>
              <td class="px-4 py-3 text-center flex justify-center gap-2">
                <button 
                  class="p-2 text-green-500 hover:bg-green-50 rounded transition"
                  @click="approveReview(review.id)"
                  title="Approve review"
                >
                  <CheckCircle class="w-5 h-5" />
                </button>
                <button 
                  class="p-2 text-red-500 hover:bg-red-50 rounded transition"
                  @click="deleteReview(review.id)"
                  title="Delete review"
                >
                  <Trash2 class="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards -->
      <div class="lg:hidden space-y-4 p-4">
        <div
          v-for="review in filteredReviews"
          :key="review.id"
          class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <!-- Header -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-sm">
                {{ getInitials(review.reviewerName) }}
              </div>
              <div>
                <div class="font-medium text-gray-800 text-sm">{{ review.reviewerName }}</div>
                <div class="text-xs text-gray-500">{{ formatDate(review.date) }} at {{ review.time }}</div>
              </div>
            </div>
            <div class="flex gap-1">
              <RatingStars :value="review.rating" :size-class="'w-3 h-3'" />
            </div>
          </div>

          <!-- Review Content -->
          <div class="mb-3">
            <p class="text-gray-700 text-sm leading-relaxed">"{{ review.content }}"</p>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button 
              class="flex items-center gap-1 px-3 py-1.5 text-green-600 bg-green-50 rounded-lg text-sm hover:bg-green-100 transition"
              @click="approveReview(review.id)"
            >
              <CheckCircle class="w-4 h-4" />
              Approve
            </button>
            <button 
              class="flex items-center gap-1 px-3 py-1.5 text-red-600 bg-red-50 rounded-lg text-sm hover:bg-red-100 transition"
              @click="deleteReview(review.id)"
            >
              <Trash2 class="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Load more -->
      <div class="flex justify-center py-4 border-t border-gray-100">
        <button
          v-if="hasMoreReviews"
          class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
          @click="loadMoreReviews"
        >
          <Plus class="w-4 h-4" />
          Load More Reviews
        </button>
        <div v-else class="text-gray-500 text-sm py-2">
          No more reviews to load
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredReviews.length === 0" class="w-full bg-white rounded-xl shadow-lg p-8 text-center">
      <div class="max-w-md mx-auto">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No reviews found</h3>
        <p class="text-gray-600 mb-4">Try adjusting your filters or check back later for new reviews.</p>
        <button
          @click="resetFilters"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Reset Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Pencil, CheckCircle, Trash2, Filter, Plus } from 'lucide-vue-next'
import RatingStars from '~/components/common/ratingStars.vue'

const reviews = ref([])
const selectedRating = ref('')
const currentPage = ref(1)
const reviewsPerPage = 10
const dateFrom = ref('')
const dateTo = ref('')

// Load reviews from stub json
const { data: reviewsData } = await useFetch('/stubs/agencyReviews.json')

// Format date
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Get initials
const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

// Computed
const overallRating = computed(() => {
  if (!reviews.value.length) return 0
  const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

const totalReviews = computed(() => reviews.value.length)

const filteredReviews = computed(() => {
  let filtered = reviews.value

  if (selectedRating.value) {
    filtered = filtered.filter(r => r.rating === parseInt(selectedRating.value))
  }

  if (dateFrom.value) {
    filtered = filtered.filter(r => new Date(r.date) >= new Date(dateFrom.value))
  }
  if (dateTo.value) {
    filtered = filtered.filter(r => new Date(r.date) <= new Date(dateTo.value))
  }

  return filtered.slice(0, currentPage.value * reviewsPerPage)
})

const hasMoreReviews = computed(() => {
  let filtered = reviews.value
  if (selectedRating.value) {
    filtered = filtered.filter(r => r.rating === parseInt(selectedRating.value))
  }
  return filteredReviews.value.length < filtered.length
})

// Methods
const applyFilters = () => { 
  currentPage.value = 1 
}

const resetFilters = () => {
  selectedRating.value = ''
  dateFrom.value = ''
  dateTo.value = ''
  currentPage.value = 1
}

const approveReview = (id) => { 
  // In a real app, you'd update the review status
}

const deleteReview = (id) => { 
  reviews.value = reviews.value.filter(r => r.id !== id) 
}

const loadMoreReviews = () => { 
  currentPage.value++ 
}

// Init
onMounted(() => { 
  reviews.value = reviewsData.value || [] 
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Improve mobile touch targets */
@media (max-width: 640px) {
  button, select, input {
    min-height: 44px;
  }
}
</style>