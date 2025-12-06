<template>
  <div class="w-full min-h-screen bg-white p-4 sm:p-6">
    <div class="rounded-xl border border-gray-200 shadow-sm bg-gradient-to-r from-indigo-500/15 via-pink-500/15 to-amber-400/15 px-4 sm:px-6 py-3 sm:py-4 mb-6 flex items-center justify-between">
      <h1 class="text-lg sm:text-xl font-semibold text-gray-900">My Reviews</h1>
     
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

  <Teleport to="body">
    <Transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isEditModalOpen"
        class="fixed inset-0 z-[70] flex items-center justify-center px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-review-title"
      >
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="closeEditModal" aria-hidden="true"></div>
        <div class="relative z-10 w-full max-w-xl rounded-2xl bg-white shadow-2xl">
          <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div>
              <p class="text-xs uppercase tracking-wide text-gray-500">Editing review for</p>
              <h2 id="edit-review-title" class="text-lg font-semibold text-gray-900">
                {{ editingReview?.company || 'Selected Listing' }}
              </h2>
              <p v-if="editingReview?.date" class="text-xs text-gray-500">Reviewed on {{ editingReview.date }}</p>
            </div>
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              @click="closeEditModal"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <form class="space-y-5 px-6 py-6" @submit.prevent="submitReviewUpdate">
            <div>
              <label for="rating" class="block text-sm font-medium text-gray-700">Rating</label>
              <div class="mt-2 flex items-center gap-3">
                <select
                  id="rating"
                  v-model.number="editForm.rating"
                  class="block w-32 rounded-lg border border-gray-200 px-3 py-2 text-base text-gray-900 focus:border-amber-400 focus:ring-amber-400"
                >
                  <option v-for="star in 5" :key="star" :value="star">{{ star }} Star{{ star > 1 ? 's' : '' }}</option>
                </select>
                <span class="text-sm text-gray-500">Select a value between 1 &amp; 5</span>
              </div>
            </div>

            <div>
              <label for="comment" class="block text-sm font-medium text-gray-700">Your review</label>
              <textarea
                id="comment"
                v-model="editForm.comment"
                rows="4"
                class="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:ring-amber-400"
                placeholder="Tell us a bit more about your experience..."
              ></textarea>
              <p class="mt-2 text-xs text-gray-500">Keep it helpful and constructive for other directory users.</p>
            </div>

            <div class="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 sm:w-auto"
                @click="closeEditModal"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="w-full rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                :disabled="isSavingReview"
              >
                {{ isSavingReview ? 'Updating...' : 'Update Review' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Star, Edit3, Trash2, X } from 'lucide-vue-next'
import { computed, reactive, ref, watch } from 'vue'
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

const editingReviewId = ref<number | null>(null)
const editForm = reactive({
  comment: '',
  rating: 1,
})
const isSavingReview = ref(false)

const editingReview = computed(() => {
  if (editingReviewId.value === null) return null
  return reviews.value.find((r) => r.id === editingReviewId.value) ?? null
})

const isEditModalOpen = computed(() => editingReviewId.value !== null)

const notify = (type: 'success' | 'alert', message: string) => {
  if (!import.meta.client) return
  try {
    nuxtApp.$awn?.[type](message)
  } catch {}
}

const resetEditForm = () => {
  editForm.comment = ''
  editForm.rating = 1
}

const editReview = (id: number) => {
  const current = reviews.value.find((r) => r.id === id)
  if (!current) return

  editingReviewId.value = id
  editForm.comment = current.comment
  editForm.rating = current.rating
}

const closeEditModal = () => {
  editingReviewId.value = null
  resetEditForm()
}

const clampRating = (value: number) => {
  if (!Number.isFinite(value)) return 1
  return Math.min(Math.max(Math.round(value), 1), 5)
}

const submitReviewUpdate = async () => {
  if (editingReviewId.value === null || isSavingReview.value) return
  const current = reviews.value.find((r) => r.id === editingReviewId.value)
  if (!current) return

  const trimmedComment = editForm.comment.trim()
  const payload: Record<string, any> = {
    review: trimmedComment || current.comment,
    rating: clampRating(editForm.rating),
  }

  try {
    isSavingReview.value = true
    await stubClient.update('recentReviews', editingReviewId.value, payload, { delay: 160 })
    await refresh()
    notify('success', 'Review updated')
    closeEditModal()
  } catch (error) {
    console.error('Failed to update review', error)
    notify('alert', 'Failed to update review')
  } finally {
    isSavingReview.value = false
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
