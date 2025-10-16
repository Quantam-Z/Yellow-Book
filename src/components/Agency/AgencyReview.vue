<template>
  <div class="w-full relative flex flex-col lg:flex-row items-start justify-between gap-6 text-left font-plus-jakarta-sans">
    <!-- Left: Reviews & Controls -->
    <div class="flex-1 relative">
      <!-- Container -->
      <div class="rounded-lg bg-gray-100 border border-gray-200 w-full flex flex-col p-5 gap-6">
        <!-- Header row -->
        <div class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-2.5 text-[22px] sm:text-[24px] text-gray-800">
            <div class="h-6 w-6 rounded bg-goldenrod flex items-center justify-center">
              <Star class="h-4 w-4 text-white" />
            </div>
            <div class="leading-[130%] capitalize font-semibold">Customer Reviews</div>
          </div>
          <div class="flex items-center gap-3 text-[14px] sm:text-[16px]">
            <button
              class="rounded-lg border border-gray-300 bg-white flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
              @click="toggleFilters"
            >
              <Filter class="h-5 w-5" />
              <span class="font-medium">Filter</span>
            </button>
            <a
              href="#"
              class="rounded-lg border border-gold text-gold flex items-center gap-2 px-3 py-2 hover:bg-oldlace"
            >
              <span class="font-medium">Go to website</span>
              <ExternalLink class="h-5 w-5" />
            </a>
          </div>
        </div>

        <!-- Active filters (chips) -->
        <div v-if="selectedStar || dateFrom || dateTo" class="flex flex-wrap gap-2 text-sm">
          <div v-if="selectedStar" class="px-2 py-1 rounded bg-ghostwhite border border-gray-200 flex items-center gap-2">
            {{ selectedStar }} Star
            <button class="hover:text-red-500" @click="selectedStar = ''"><X class="w-4 h-4" /></button>
          </div>
          <div v-if="dateFrom" class="px-2 py-1 rounded bg-ghostwhite border border-gray-200 flex items-center gap-2">
            From: {{ dateFrom }}
            <button class="hover:text-red-500" @click="dateFrom = ''"><X class="w-4 h-4" /></button>
          </div>
          <div v-if="dateTo" class="px-2 py-1 rounded bg-ghostwhite border border-gray-200 flex items-center gap-2">
            To: {{ dateTo }}
            <button class="hover:text-red-500" @click="dateTo = ''"><X class="w-4 h-4" /></button>
          </div>
          <button class="px-2 py-1 rounded bg-white border border-gray-300 hover:bg-gray-50" @click="resetFilters">Reset</button>
        </div>

        <!-- Reviews list -->
        <div class="flex flex-col gap-5">
          <div
            v-for="review in visibleReviews"
            :key="review.id"
            class="w-full shadow-[0px_4px_16px_rgba(158,158,158,0.14)] rounded-lg bg-white flex flex-col p-5 gap-5"
          >
            <!-- Reviewer header -->
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="h-11 w-11 rounded-full bg-ghostwhite border border-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                  {{ getInitials(review.reviewerName) }}
                </div>
                <div class="flex flex-col gap-1">
                  <div class="leading-[130%] capitalize font-semibold text-gray-900">{{ review.reviewerName }}</div>
                  <div class="flex items-center gap-1">
                    <RatingStars :value="review.rating" :size-class="'w-5 h-5'" />
                  </div>
                </div>
              </div>
              <div class="text-sm text-gray-500 font-medium">Date: {{ formatDate(review.date) }}</div>
            </div>

            <!-- Content -->
            <div class="text-[15px] sm:text-[16px] leading-[160%] text-gray-700 italic">
              “{{ review.content }}”
            </div>

            <!-- Optional company response slot (if present in data) -->
            <div v-if="review.response" class="w-full flex flex-col py-5 px-4 sm:px-6 border border-gray-200 rounded-lg bg-ghostwhite relative gap-2">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                  {{ getInitials(review.response.companyName) }}
                </div>
                <div class="flex flex-col gap-0.5">
                  <div class="font-semibold text-gray-900">{{ review.response.companyName }}</div>
                  <div class="text-xs text-gray-500">Date: {{ formatDate(review.response.date) }}</div>
                </div>
              </div>
              <div class="text-sm text-gray-700">
                “{{ review.response.content }}”
              </div>
            </div>
          </div>
        </div>

        <!-- Load more -->
        <div class="flex justify-center">
          <button
            v-if="hasMore"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
            @click="loadMore"
          >
            <ChevronDown class="w-4 h-4" />
            Load More
          </button>
          <div v-else class="text-gray-500 text-sm py-2">No more reviews to load</div>
        </div>

        <!-- New review prompt (UI only) -->
        <div class="w-full shadow-[0px_0px_17px_rgba(97,97,97,0.16)] rounded-lg bg-white border border-gray-300 overflow-hidden flex flex-col p-5 gap-6 text-center">
          <div class="flex flex-col items-center gap-3">
            <div class="leading-[130%] capitalize font-semibold text-gray-900">Give me your rating & Review</div>
            <RatingStars :value="Number(selectedStar) || 0" :size-class="'w-6 h-6 sm:w-8 sm:h-8'" />
          </div>
          <div class="flex flex-col gap-4 text-left text-[16px] text-gray-500">
            <textarea
              class="w-full min-h-[100px] rounded-lg bg-gray-50 border border-gray-200 p-4 outline-none focus:ring-2 focus:ring-gold"
              placeholder="Write your review for this company..."
              disabled
            />
            <button class="h-12 rounded-lg bg-gold text-white font-semibold">Submit</button>
          </div>
        </div>
      </div>

      <!-- Filters panel -->
      <div
        v-if="showFilters"
        class="absolute top-16 right-0 z-10 w-full sm:w-[320px] shadow-[0px_4px_14px_rgba(158,158,158,0.1)] rounded-lg bg-white border border-gray-200 overflow-hidden"
      >
        <div class="bg-gray-800 text-white flex items-center justify-between py-3 pl-4 pr-2">
          <div class="leading-[130%] capitalize font-semibold">Filter</div>
          <button class="p-2 hover:bg-gray-700 rounded" @click="toggleFilters"><X class="h-5 w-5" /></button>
        </div>
        <div class="flex flex-col p-5 gap-5 text-gray-800">
          <div class="flex flex-col gap-2">
            <div class="font-medium">Review Score</div>
            <div class="rounded-lg border border-gray-300 flex flex-col p-3 gap-2 text-gray-600">
              <label v-for="s in [1,2,3,4,5]" :key="s" class="flex items-center gap-2 cursor-pointer">
                <input type="radio" class="accent-gold" name="stars" :value="s" v-model="selectedStar" />
                <div>{{ s }} Star</div>
              </label>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="font-medium">Date filter</div>
            <div class="rounded-lg border border-gray-300 flex flex-col p-3 gap-2 text-gray-600">
              <div class="flex items-center gap-2">
                <span class="w-24 text-gray-700">From</span>
                <input type="date" v-model="dateFrom" class="flex-1 border rounded px-2 py-1 text-sm" />
              </div>
              <div class="flex items-center gap-2">
                <span class="w-24 text-gray-700">To</span>
                <input type="date" v-model="dateTo" class="flex-1 border rounded px-2 py-1 text-sm" />
              </div>
            </div>
          </div>
          <div class="flex items-center justify-end gap-2">
            <button class="px-3 py-2 border rounded hover:bg-gray-50" @click="resetFilters">Reset</button>
            <button class="px-4 py-2 bg-gold text-white rounded" @click="applyFilters">Apply</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Summary -->
    <div class="w-full lg:w-[380px] xl:w-[420px] shadow-[0px_4px_16px_rgba(158,158,158,0.24)] rounded-lg bg-white overflow-hidden flex items-center p-5 gap-6 text-center">
      <div class="w-[120px] flex flex-col items-center gap-3">
        <div class="flex flex-col items-center gap-3">
          <div class="text-[40px] sm:text-[46px] leading-none capitalize font-semibold text-black">{{ averageRating }}</div>
          <div class="text-[14px] sm:text-[16px] leading-[160%] capitalize font-medium text-forestgreen">{{ ratingLabel }}</div>
        </div>
        <div class="flex flex-col items-center justify-center gap-2 text-[14px] sm:text-[16px] text-dimgray">
          <div class="flex items-center">
            <RatingStars :value="Number(averageRating)" :size-class="'w-5 h-5'" />
          </div>
          <div class="leading-[160%] capitalize font-medium">({{ totalReviews }} reviews)</div>
        </div>
      </div>
      <div class="flex-1 flex flex-col items-start gap-2 text-[18px] text-gray-800">
        <div v-for="star in [5,4,3,2,1]" :key="star" class="w-full flex items-center gap-3">
          <div class="w-10 flex items-center justify-end gap-1.5">
            <div class="leading-[130%]">{{ star }}</div>
            <Star class="h-5 w-5 text-yellow-400 fill-yellow-400" />
          </div>
          <div class="h-2 flex-1 rounded bg-gainsboro overflow-hidden">
            <div
              class="h-full bg-goldenrod"
              :style="{ width: Math.max(2, Math.round(getStarPercent(star))) + '%' }"
            />
          </div>
          <div class="w-10 text-right text-[14px] text-dimgray font-medium">{{ countsByStar[star] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import RatingStars from '@/components/common/RatingStars.vue'
import { Filter, ExternalLink, X, ChevronDown, Star } from 'lucide-vue-next'

interface CompanyResponse {
  companyName: string
  date: string
  content: string
}

interface ReviewItem {
  id: number
  reviewerName: string
  rating: number
  date: string
  time?: string
  content: string
  response?: CompanyResponse
}

const allReviews = ref<ReviewItem[]>([])
const selectedStar = ref<number | ''>('')
const dateFrom = ref<string>('')
const dateTo = ref<string>('')
const showFilters = ref(false)
const currentPage = ref(1)
const itemsPerPage = 6

// Load reviews from stub json
const { data: reviewsData } = await useFetch<ReviewItem[]>('/stubs/agencyReviews.json')

onMounted(() => {
  allReviews.value = reviewsData.value || []
})

const totalReviews = computed(() => allReviews.value.length)

const averageRating = computed(() => {
  if (!allReviews.value.length) return '0.0'
  const sum = allReviews.value.reduce((acc, r) => acc + (r.rating || 0), 0)
  return (sum / allReviews.value.length).toFixed(1)
})

const ratingLabel = computed(() => {
  const avg = Number(averageRating.value)
  if (avg >= 4.5) return 'Excellent'
  if (avg >= 4.0) return 'Great'
  if (avg >= 3.0) return 'Good'
  if (avg >= 2.0) return 'Fair'
  return 'Poor'
})

const countsByStar = computed<Record<number, number>>(() => {
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  for (const r of allReviews.value) {
    const k = (r.rating || 0) as 1 | 2 | 3 | 4 | 5
    counts[k] = (counts[k] || 0) + 1
  }
  return counts
})

function getStarPercent(star: number): number {
  if (!totalReviews.value) return 0
  return (countsByStar.value[star] / totalReviews.value) * 100
}

const filtered = computed(() => {
  let list = allReviews.value.slice()
  if (selectedStar.value) {
    list = list.filter((r) => r.rating === Number(selectedStar.value))
  }
  if (dateFrom.value) {
    list = list.filter((r) => new Date(r.date) >= new Date(dateFrom.value))
  }
  if (dateTo.value) {
    list = list.filter((r) => new Date(r.date) <= new Date(dateTo.value))
  }
  return list
})

const visibleReviews = computed(() => filtered.value.slice(0, currentPage.value * itemsPerPage))
const hasMore = computed(() => visibleReviews.value.length < filtered.value.length)

function toggleFilters() {
  showFilters.value = !showFilters.value
}

function applyFilters() {
  currentPage.value = 1
  showFilters.value = false
}

function resetFilters() {
  selectedStar.value = ''
  dateFrom.value = ''
  dateTo.value = ''
  currentPage.value = 1
}

function loadMore() {
  currentPage.value += 1
}

function formatDate(date: string): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}
</script>

<style scoped>
/***** Small helpers for nicer feel *****/
:deep(textarea[disabled]) {
  opacity: 0.8;
  cursor: not-allowed;
}
</style>
