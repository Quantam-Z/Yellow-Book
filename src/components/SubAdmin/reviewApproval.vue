<template>
  <div class="w-full font-plus-jakarta-sans max-w-full overflow-x-hidden">
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-2 sm:p-4 md:p-6 mb-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Review Approval</h1>
      </div>

      <div class="w-full relative rounded-lg bg-white/80 backdrop-blur-sm flex items-center px-4 py-3 gap-3">
        <SearchIcon class="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
        <input
          type="text"
          v-model="searchQuery"
          @input="handleFilterChange"
          placeholder="Search reviews by name or content"
          class="flex-1 outline-none border-none bg-transparent text-gray-700 placeholder-gray-400 text-base min-w-0 focus:ring-0 focus:outline-none"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 px-3 lg:px-0">
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
          <UsersIcon class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Total</div>
          <b class="text-base sm:text-lg leading-[160%] capitalize text-gray-900">{{ stats.totalReviews }}</b>
        </div>
      </div>

      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 rounded bg-yellow-100 flex items-center justify-center flex-shrink-0">
          <UserPlusIcon class="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Pending</div>
          <b class="text-base sm:text-lg leading-[160%] capitalize text-gray-900">{{ stats.pending }}</b>
        </div>
      </div>

      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
          <CheckCircleIcon class="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Approved</div>
          <b class="text-base sm:text-lg leading-[160%] capitalize text-gray-900">{{ stats.approved }}</b>
        </div>
      </div>

      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
          <XCircleIcon class="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Rejected</div>
          <b class="text-base sm:text-lg leading-[160%] capitalize text-gray-900">{{ stats.rejected }}</b>
        </div>
      </div>

      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
          <AlertCircleIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">On Hold</div>
          <b class="text-base sm:text-lg leading-[160%] capitalize text-gray-900">{{ stats.onHold }}</b>
        </div>
      </div>

      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 rounded bg-orange-100 flex items-center justify-center flex-shrink-0">
          <UserXIcon class="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Banned</div>
          <b class="text-base sm:text-lg leading-[160%] capitalize text-gray-900">{{ stats.bannedUsers }}</b>
        </div>
      </div>
    </div>

    <div class="mb-4 px-3 lg:px-0">
      <div class="flex items-center gap-3 flex-wrap">
        <h2 class="text-base sm:text-lg font-semibold text-gray-900 whitespace-nowrap">All Reviews</h2>

        <div class="relative">
          <select
            v-model="filters.status"
            @change="handleFilterChange"
            class="h-10 rounded-lg bg-white border border-gray-300 appearance-none py-0 pl-3 pr-8 text-sm text-gray-700 leading-[130%] font-medium cursor-pointer focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition min-w-[160px]"
          >
            <option value="">All statuses</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="On Hold">On Hold</option>
            <option value="Banned">Banned</option>
          </select>
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    </div>

    <div class="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <div class="panel-scroll panel-scroll--padded scrollbar-thin">
        <table class="w-full table-auto" style="min-width: 820px;">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-3 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap w-14 border-r border-gray-100">No</th>
              <th class="px-3 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[200px] border-r border-gray-100">Reviewer</th>
              <th class="px-3 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[200px] border-r border-gray-100">Company</th>
              <th class="px-3 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px] border-r border-gray-100">Date</th>
              <th class="px-3 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[110px] border-r border-gray-100">Rating</th>
              <th class="px-3 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[140px] border-r border-gray-100">Status</th>
              <th class="px-3 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Review</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr v-for="(review, index) in paginatedReviews" :key="review.id" class="hover:bg-gray-50">
              <td class="px-3 py-3 text-xs text-gray-700 whitespace-nowrap border-r border-gray-100">
                {{ getDisplayIndex(index) }}
              </td>
              <td class="px-3 py-3 text-xs text-gray-900 font-medium border-r border-gray-100">
                <div class="flex flex-col">
                  <span class="truncate">{{ review.reviewerName || 'Unknown' }}</span>
                  <span class="text-[11px] text-gray-500 truncate">{{ review.email || '' }}</span>
                </div>
              </td>
              <td class="px-3 py-3 text-xs text-gray-700 border-r border-gray-100">
                <span class="truncate block">{{ review.companyName || review.company || '—' }}</span>
              </td>
              <td class="px-3 py-3 text-xs text-gray-700 whitespace-nowrap border-r border-gray-100">
                {{ formatDate(review.date) }}
              </td>
              <td class="px-3 py-3 text-xs text-gray-700 whitespace-nowrap border-r border-gray-100">
                <div class="flex items-center gap-2">
                  <RatingStars :rating="Number(review.rating || 0)" />
                  <span class="text-[11px] text-gray-500">{{ Number(review.rating || 0) }}/5</span>
                </div>
              </td>
              <td class="px-3 py-3 text-xs whitespace-nowrap border-r border-gray-100">
                <StatusDropdown
                  :model-value="review.status || 'Pending'"
                  :options="statusOptions"
                  @change="(value) => updateStatus(review, value)"
                />
              </td>
              <td class="px-3 py-3 text-xs text-gray-700">
                <span class="line-clamp-2">{{ review.content || review.text || '' }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="totalResults === 0" class="text-center py-10">
        <p class="text-gray-500 text-sm">No reviews found.</p>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 px-3 lg:px-0">
      <p class="text-xs text-gray-600">
        {{ totalResults }} reviews (Page {{ currentPage }} of {{ totalPages }})
      </p>

      <div class="flex items-center gap-2">
        <button
          @click="prevPage"
          class="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="currentPage === 1"
        >
          <ChevronLeftIcon class="w-4 h-4" /> Prev
        </button>

        <div class="hidden sm:flex items-center gap-1">
          <template v-for="page in totalPages" :key="page">
            <button
              v-if="page === currentPage || page === currentPage - 1 || page === currentPage + 1"
              @click="currentPage = page"
              class="h-9 w-9 rounded-full border text-xs font-semibold transition"
              :class="page === currentPage ? 'border-transparent bg-yellow-400 text-gray-900' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'"
            >
              {{ page }}
            </button>
          </template>
        </div>

        <button
          @click="nextPage"
          class="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="currentPage === totalPages"
        >
          Next <ChevronRightIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Search as SearchIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  CheckCircle as CheckCircleIcon,
  Users as UsersIcon,
  UserPlus as UserPlusIcon,
  XCircle as XCircleIcon,
  AlertCircle as AlertCircleIcon,
  UserX as UserXIcon,
} from 'lucide-vue-next'

import RatingStars from '~/components/common/RatingStars.vue'
import StatusDropdown from '~/components/common/StatusDropdown.vue'
import { useStubClient } from '~/services/stubClient'
import { useStubSearch } from '~/composables/useStubSearch'

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

const filters = ref({
  status: '',
})

const statusOptions = ['Pending', 'Approved', 'Rejected', 'On Hold', 'Banned']
const stubClient = useStubClient()
const nuxtApp = useNuxtApp()

const toast = (type: 'success' | 'error', message: string) => {
  if (!import.meta.client) return
  try {
    if (type === 'success') nuxtApp.$awn?.success(message)
    else nuxtApp.$awn?.alert(message)
  } catch {}
}

const fallbackMeta = {
  page: 1,
  totalPages: 1,
  total: 0,
  limit: itemsPerPage,
}

const reviewQueryParams = computed(() => ({
  search: searchQuery.value.trim() || undefined,
  page: currentPage.value,
  limit: itemsPerPage,
  status: filters.value.status || undefined,
}))

const { data: reviewsPayload, error: reviewsError, refresh: refreshReviews } = await useStubSearch('subadminReviews', {
  key: 'agent-review-approval',
  query: () => reviewQueryParams.value,
  watch: [currentPage, searchQuery, () => filters.value.status],
  default: () => ({ items: [], meta: fallbackMeta }),
})

const paginationMeta = computed(() => reviewsPayload.value?.meta ?? fallbackMeta)
const totalPages = computed(() => paginationMeta.value.totalPages || 1)
const totalResults = computed(() => paginationMeta.value.total ?? 0)
const paginatedReviews = computed(() => reviewsPayload.value?.items ?? [])
const stats = computed(() => ({
  totalReviews: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
  onHold: 0,
  bannedUsers: 0,
  ...(paginationMeta.value.stats || {}),
}))

watch(
  () => paginationMeta.value.totalPages,
  (nextTotal) => {
    const maxPages = nextTotal || 1
    if (currentPage.value > maxPages) currentPage.value = maxPages
  },
)

const handleFilterChange = () => {
  currentPage.value = 1
}

const formatDate = (date: unknown) => {
  if (!date) return ''
  return new Date(String(date)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const getDisplayIndex = (indexInPage: number) => {
  const trueIndex = (currentPage.value - 1) * itemsPerPage + indexInPage + 1
  return String(trueIndex).padStart(2, '0')
}

const updateStatus = async (review: any, nextStatus: string) => {
  if (!review?.id || !nextStatus || (review.status || 'Pending') === nextStatus) return
  try {
    await stubClient.update('subadminReviews', review.id, { status: nextStatus }, { delay: 160 })
    await refreshReviews()
    toast('success', `Review marked as ${nextStatus}`)
  } catch (error) {
    console.error('Failed to update review status', error)
    toast('error', 'Failed to update review status')
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

watch(reviewsError, (err) => {
  if (!err) return
  console.error('Failed to load reviews', err)
  toast('error', (err as any)?.message || 'Failed to load reviews')
})
</script>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>

