<template>
    <div class="w-full min-h-screen bg-gray-50 p-6 space-y-6">
      <!-- Header -->
      <div class="w-full rounded-xl bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 p-6 border border-gray-200 shadow-sm">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-extrabold text-gray-900">Reviews</h1>
          <button
            class="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold bg-white border border-indigo-400 text-indigo-600 shadow-md hover:bg-indigo-50 transition-colors"
          >
            <Pencil class="w-4 h-4" />
            Manage
          </button>
        </div>
      </div>
  
      <!-- Overall Rating -->
      <div class="w-full bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
        <div class="font-semibold text-xl text-gray-800">Overall Rating</div>
        <div class="text-right">
          <div class="text-3xl font-bold text-gray-900">{{ overallRating }}</div>
          <div class="flex justify-end gap-1 mt-1">
            <Star
              v-for="i in 5"
              :key="i"
              class="w-5 h-5"
              :class="i <= Math.round(overallRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
            />
          </div>
          <div class="text-sm text-gray-500">Based on {{ totalReviews }} reviews</div>
        </div>
      </div>
  
      <!-- Filters -->
      <div class="w-full bg-white rounded-xl shadow-lg p-6 flex flex-wrap items-center gap-4">
        <select v-model="selectedRating" class="border rounded-lg px-3 py-2 text-gray-700">
          <option value="">All ratings</option>
          <option v-for="opt in [5,4,3,2,1]" :key="opt" :value="opt">{{ opt }} Stars</option>
        </select>
  
        <input type="date" v-model="dateFrom" class="border rounded-lg px-3 py-2 text-gray-700" />
        <input type="date" v-model="dateTo" class="border rounded-lg px-3 py-2 text-gray-700" />
  
        <button
          class="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
          @click="applyFilters"
        >
          Apply filter
        </button>
      </div>
  
      <!-- Table -->
      <div class="w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <table class="w-full text-left border-collapse">
          <!-- Table Header -->
          <thead class="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
            <tr>
              <th class="px-4 py-3">Reviewer</th>
              <th class="px-4 py-3 text-center">Rating</th>
              <th class="px-4 py-3 text-center">Date & Time</th>
              <th class="px-4 py-3">Review</th>
              <th class="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <!-- Table Body -->
          <tbody>
            <tr
              v-for="review in filteredReviews"
              :key="review.id"
              class="border-t hover:bg-gray-50 transition"
            >
              <!-- Reviewer -->
              <td class="px-4 py-3 flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
                  {{ getInitials(review.reviewerName) }}
                </div>
                <span class="font-medium text-gray-800">{{ review.reviewerName }}</span>
              </td>
  
              <!-- Rating -->
              <td class="px-4 py-3 text-center">
                <div class="flex justify-center gap-1">
                  <Star
                    v-for="star in 5"
                    :key="star"
                    class="w-4 h-4"
                    :class="star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
                  />
                </div>
              </td>
  
              <!-- Date -->
              <td class="px-4 py-3 text-center text-sm text-gray-600">
                <div>{{ formatDate(review.date) }}</div>
                <div class="text-xs">{{ review.time }}</div>
              </td>
  
              <!-- Review -->
              <td class="px-4 py-3 text-gray-700">
                <p class="line-clamp-2">"{{ review.content }}"</p>
              </td>
  
              <!-- Actions -->
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
  
        <!-- Load more -->
        <div class="flex justify-center py-4">
          <button
            v-if="hasMoreReviews"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            @click="loadMoreReviews"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { Pencil, Star, CheckCircle, Trash2 } from 'lucide-vue-next'
  
  const reviews = ref([])
  const selectedRating = ref('')
  const currentPage = ref(1)
  const reviewsPerPage = 5
  const dateFrom = ref('')
  const dateTo = ref('')
  
  // Dummy reviews
  const sampleReviews = [
    { id: 1, reviewerName: 'Alice Johnson', rating: 5, date: '2023-11-15', time: '2:30 PM', content: 'Amazing service, highly recommend!' },
    { id: 2, reviewerName: 'Bob Smith', rating: 4, date: '2023-11-14', time: '10:15 AM', content: 'Good experience, will use again.' },
    { id: 3, reviewerName: 'Charlie Davis', rating: 3, date: '2023-11-13', time: '1:45 PM', content: 'It was okay, not great, not bad.' },
    { id: 4, reviewerName: 'Diana Prince', rating: 5, date: '2023-11-12', time: '11:00 AM', content: 'Absolutely loved it, exceeded expectations!' },
    { id: 5, reviewerName: 'Ethan Clark', rating: 2, date: '2023-11-11', time: '4:10 PM', content: 'Service was slow and not very helpful.' },
    { id: 6, reviewerName: 'Fiona Lee', rating: 1, date: '2023-11-10', time: '9:00 AM', content: 'Very disappointed, would not recommend.' }
  ]
  
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
  const hasMoreReviews = computed(() => filteredReviews.value.length < reviews.value.length)
  
  // Methods
  const applyFilters = () => { currentPage.value = 1 }
  const approveReview = (id) => { console.log('Approved review', id) }
  const deleteReview = (id) => { reviews.value = reviews.value.filter(r => r.id !== id) }
  const loadMoreReviews = () => { currentPage.value++ }
  
  // Init
  onMounted(() => { reviews.value = sampleReviews })
  </script>
  
  <style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>
  