<template>
  <div class="w-full min-h-screen bg-white p-4 sm:p-6">
    <div class="rounded-xl border border-gray-200 shadow-sm bg-gradient-to-r from-indigo-500/15 via-pink-500/15 to-amber-400/15 px-4 sm:px-6 py-3 sm:py-4 mb-6 flex items-center justify-between">
      <h1 class="text-lg sm:text-xl font-semibold text-gray-900">My Reviews</h1>
      <button
        type="button"
        class="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm px-4 py-2 rounded shadow border-0 focus:outline-none focus:ring-0"
      >
        List Your Company
      </button>
    </div>

    <div class="space-y-4 sm:space-y-6">
      <h2 class="text-sm font-semibold text-gray-700">All Review List</h2>

      <div
        v-for="(review, index) in reviews"
        :key="index"
        class="w-full relative rounded-lg border-whitesmoke border-solid border-[1px] box-border text-left text-lg text-gray font-plus-jakarta-sans
               hover:bg-gray-50 transition-colors"
        
        :class="[
          // **MOBILE VIEW (Default):** Optimized layout
          'flex flex-col items-start justify-start pt-6 px-4 pb-4 gap-4', 
          // **DESKTOP VIEW (sm:):** Reverting to original layout classes
          'sm:flex sm:items-end sm:justify-end sm:pt-6 sm:px-4 sm:pb-4 sm:gap-6',
        ]"
        tabindex="0"
      >
        
        <div class="sm:hidden absolute top-3 right-3 flex items-center gap-3 z-10">
          <div @click.stop.prevent="editReview(review.id)" class="p-1 rounded-full hover:bg-gainsboro transition-colors cursor-pointer" aria-label="Edit review">
            <Edit3 class="h-6 w-6 text-green-600" />
          </div>
          <div @click.stop.prevent="deleteReview(review.id)" class="p-1 rounded-full hover:bg-gainsboro transition-colors cursor-pointer" aria-label="Delete review">
            <Trash2 class="h-6 w-6 text-red-500" />
          </div>
        </div>
        
        <div class="self-stretch flex flex-col items-start gap-3 sm:gap-6">
          <div class="self-stretch flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-5">
            
            <div class="flex items-center gap-4">
              <div class="h-12 w-12 relative rounded bg-gainsboro shrink-0" />
              <div class="flex flex-col items-start justify-center gap-1">
                <b class="relative leading-[160%] capitalize text-base sm:text-lg">{{ review.company }}</b>
                <div class="hidden sm:block relative text-base leading-[130%] capitalize text-darkslategray whitespace-nowrap">
                  Reviewed on {{ review.date }}
                </div>
              </div>
            </div>
            
            <div class="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-base text-dimgray w-full sm:w-auto">
              
              <div class="flex items-center gap-2 mt-1 sm:mt-0 justify-between w-full sm:w-auto">
                <div class="flex items-center gap-2">
                   <div class="relative leading-[130%] capitalize hidden sm:block">Rating:</div>
                   <Star class="h-6 w-6 text-yellow-500" />
                   <div class="relative leading-[130%] capitalize text-gray-900 font-medium">{{ review.rating }} Star</div>
                </div>
                 <div class="block sm:hidden relative text-sm leading-[130%] capitalize text-darkslategray whitespace-nowrap">
                  on {{ review.date }}
                </div>
              </div>
            </div>
          </div>

          <div class="self-stretch relative text-base leading-[160%] capitalize text-darkslategray">
            "{{ review.comment }}"
          </div>
        </div>
        
        <div class="hidden sm:flex items-center gap-3">
          <div @click.stop.prevent="editReview(review.id)" class="p-2 rounded-lg hover:bg-gainsboro transition-colors cursor-pointer" aria-label="Edit review">
            <Edit3 class="h-6 w-6 text-green-600 cursor-pointer" />
          </div>
          <div @click.stop.prevent="deleteReview(review.id)" class="p-2 rounded-lg hover:bg-gainsboro transition-colors cursor-pointer" aria-label="Delete review">
            <Trash2 class="h-6 w-6 text-red-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star, Edit3, Trash2 } from 'lucide-vue-next'
import { computed, watch } from 'vue'
import type { Ref } from 'vue'
import { useStubClient } from '~/services/stubClient'
import { useStubResource } from '~/composables/useStubResource'

const nuxtApp = useNuxtApp()
const stubClient = useStubClient()

// Load reviews from public stubs and map to UI shape
const { data: reviewsData, error: reviewsError, refresh } = await useStubResource('recentReviews')

const reviews = computed(() => {
  const raw = (reviewsData.value || []) as Array<any>
  return raw.map((r) => ({
    id: r.id,
    company: r.company || r.reviewer || 'Company Name',
    date: r.date,
    rating: Number(r.rating) || 0,
    comment: r.review || r.content || r.text || 'No review comment provided.',
    status: r.status || 'Pending',
  }))
})

const promptValue = (message: string, defaultValue: string) => {
  if (!import.meta.client) return defaultValue
  return window.prompt(message, defaultValue) ?? defaultValue
}

// Action handlers
const editReview = async (id: number) => {
  const current = reviews.value.find((r) => r.id === id)
  if (!current) return

  const updatedComment = promptValue('Update your review comment:', current.comment)
  const updatedRating = promptValue('Update rating (1-5):', String(current.rating))
  const ratingNumber = Number(updatedRating)

  const payload: Record<string, any> = {
    review: updatedComment,
    rating: Number.isFinite(ratingNumber) ? Math.min(Math.max(ratingNumber, 1), 5) : current.rating,
  }

  try {
    await stubClient.update('recentReviews', id, payload, { delay: 160 })
    await refresh()
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.success('Review updated')
      } catch {}
    }
  } catch (error) {
    console.error('Failed to update review', error)
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.alert('Failed to update review')
      } catch {}
    }
  }
}

const deleteReview = async (id: number) => {
  if (!confirm('Are you sure you want to delete this review?')) return
  try {
    await stubClient.remove('recentReviews', id, { delay: 140 })
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

watch(reviewsError as Ref<any>, (err) => {
  if (err) {
    console.error('Failed to load reviews', err)
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.alert('Failed to load reviews')
      } catch {}
    }
  }
})
</script>

<style scoped>
/* Custom styles */
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.border-whitesmoke {
  border-color: #f5f5f5;
}

.bg-gainsboro {
  background-color: #DCDCDC;
}

.text-darkslategray {
  color: #2f4f4f;
}

.text-dimgray {
  color: #696969;
}

/* Custom hover/focus state to match the requirement */
.hover\:bg-gray-50:hover {
  background-color: #f9fafb; /* Tailwind's gray-50 */
}

/* Specific button/icon hover is Gainsboro */
.hover\:bg-gainsboro:hover,
.hover\:bg-gainsboro:focus {
  background-color: #DCDCDC; /* Gainsboro */
  outline: none;
}
</style>
