<template>
  <div class="w-full min-h-screen bg-white p-4 sm:p-6 lg:p-8 space-y-6">
    <div class="flex flex-wrap items-center gap-3">
      <button
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
        @click="goBack"
      >
        <ArrowLeft class="w-4 h-4" />
        Back to reviews
      </button>
    <button
      type="button"
      class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
      @click="openPublicReview"
    >
      <ExternalLink class="w-4 h-4" />
      View public page
    </button>
      <h1 class="text-2xl font-semibold text-gray-900">Review Details</h1>
      <span v-if="reviewId" class="text-sm text-gray-500">#{{ reviewId }}</span>
    </div>

    <div v-if="isLoading" class="flex items-center gap-3 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
      <Loader2 class="w-5 h-5 animate-spin text-green-600" />
      Loading review…
    </div>

    <div
      v-else-if="loadError"
      class="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
    >
      <span>We couldn’t load this review. Please try again.</span>
      <button
        type="button"
        class="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
        @click="refresh"
      >
        Retry
      </button>
    </div>

    <div v-else-if="!review" class="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4">
      Review not found. It may have been removed.
    </div>

    <div v-else class="space-y-6">
      <section class="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4">
        <div class="flex flex-wrap items-start gap-4">
          <div class="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
            {{ getInitials(review.reviewerName) }}
          </div>
          <div class="flex-1 min-w-[220px]">
            <p class="text-lg font-semibold text-gray-900">{{ review.reviewerName }}</p>
            <p class="text-sm text-gray-500">Shared on {{ formattedReviewDate }} at {{ review.time }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <div class="flex items-center gap-0.5">
            <Star
              v-for="i in 5"
              :key="i"
              class="w-5 h-5"
              :class="i <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
            />
          </div>
          <span class="text-sm text-gray-600 font-medium">{{ review.rating }} / 5</span>
        </div>

        <div class="border-t border-dashed border-gray-200 pt-4">
          <p class="text-gray-700 leading-relaxed text-base italic">"{{ review.content }}"</p>
        </div>
      </section>

      <section class="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-5">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Company Reply</h2>
            <p class="text-sm text-gray-500">Respond publicly to this customer</p>
          </div>
          <span
            v-if="hasExistingResponse"
            class="inline-flex items-center gap-1 text-green-600 text-sm font-medium"
          >
            <MessageSquare class="w-4 h-4" />
            Reply published
          </span>
        </div>

        <div
          v-if="review.companyResponse?.text"
          class="w-full border border-gray-100 rounded-xl bg-gray-50 p-4 space-y-3"
        >
          <div class="flex items-start gap-3">
            <img
              :src="review.companyResponse.avatar || '/profile.png'"
              alt="Company representative avatar"
              class="h-12 w-12 rounded-full object-cover"
            />
            <div class="flex-1">
              <p class="font-semibold text-gray-800">{{ review.companyResponse.name }}</p>
              <p class="text-sm text-gray-500">{{ review.companyResponse.title }}</p>
              <p class="text-xs text-gray-400">
                {{ formatDate(review.companyResponse.date) }} · {{ review.companyResponse.time }}
              </p>
            </div>
          </div>
          <p class="text-gray-700 leading-relaxed">"{{ review.companyResponse.text }}"</p>
        </div>

        <form class="space-y-4" @submit.prevent="saveReply">
          <div class="grid gap-4 md:grid-cols-2">
            <label class="flex flex-col gap-1 text-sm font-medium text-gray-700">
              Representative name
              <input
                v-model="replyForm.name"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Company representative"
              />
            </label>

            <label class="flex flex-col gap-1 text-sm font-medium text-gray-700">
              Title
              <input
                v-model="replyForm.title"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Customer success lead"
              />
            </label>
          </div>

          <label class="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Reply
            <textarea
              v-model="replyForm.text"
              rows="5"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Write your public reply for this review..."
            ></textarea>
          </label>

          <div class="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 text-white font-semibold text-sm hover:bg-green-700 disabled:bg-green-300 transition-colors min-w-[140px]"
              :disabled="isSaving"
            >
              <Loader2 v-if="isSaving" class="w-4 h-4 animate-spin" />
              {{ hasExistingResponse ? 'Update reply' : 'Publish reply' }}
            </button>
            <button
              type="button"
              class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              @click="resetReplyForm"
            >
              Reset
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { ArrowLeft, Loader2, MessageSquare, Star, ExternalLink } from 'lucide-vue-next'

import { useStubClient } from '~/services/stubClient'

definePageMeta({
  layout: 'company',
})

const route = useRoute()
const router = useRouter()
const nuxtApp = useNuxtApp()
const stubClient = useStubClient()

const reviewId = computed(() => {
  const raw = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  const parsed = Number(raw)
  return Number.isFinite(parsed) ? parsed : null
})

const { data: review, pending, error, refresh } = await useAsyncData(
  () => `company-review-detail-${reviewId.value ?? 'none'}`,
  async () => {
    if (!reviewId.value) {
      return null
    }
    return stubClient.get('agencyReviews', reviewId.value, { delay: 150 })
  },
  {
    watch: [reviewId],
    default: () => null,
  },
)

const isLoading = computed(() => pending.value)
const loadError = computed(() => error.value)

const replyForm = reactive({
  name: '',
  title: '',
  text: '',
})

const defaultName = 'Company Representative'
const defaultTitle = 'Customer Success Lead'

watch(
  review,
  value => {
    replyForm.name = value?.companyResponse?.name || defaultName
    replyForm.title = value?.companyResponse?.title || defaultTitle
    replyForm.text = value?.companyResponse?.text || ''
  },
  { immediate: true },
)

const hasExistingResponse = computed(() => Boolean(review.value?.companyResponse?.text))
const isSaving = ref(false)

const formatDate = (date?: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const formattedReviewDate = computed(() => formatDate(review.value?.date))

const getInitials = (name?: string) => {
  if (!name) return '??'
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const notify = (type: 'success' | 'alert', message: string) => {
  if (!import.meta.client) return
  try {
    nuxtApp.$awn?.[type](message)
  } catch {
    // noop
  }
}

const saveReply = async () => {
  if (!review.value?.id) return
  if (!replyForm.text.trim()) {
    notify('alert', 'Please add a reply before publishing.')
    return
  }

  const now = new Date()

  try {
    isSaving.value = true
    await stubClient.update(
      'agencyReviews',
      review.value.id,
      {
        companyResponse: {
          name: replyForm.name.trim() || defaultName,
          title: replyForm.title.trim() || defaultTitle,
          text: replyForm.text.trim(),
          date: now.toISOString().split('T')[0],
          time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          avatar: review.value.companyResponse?.avatar || '/profile.png',
        },
      },
      { delay: 180 },
    )
    await refresh()
    notify('success', 'Reply saved.')
  } catch (err) {
    console.error('Failed to save reply', err)
    notify('alert', 'Unable to save reply right now.')
  } finally {
    isSaving.value = false
  }
}

const resetReplyForm = () => {
  replyForm.name = review.value?.companyResponse?.name || defaultName
  replyForm.title = review.value?.companyResponse?.title || defaultTitle
  replyForm.text = review.value?.companyResponse?.text || ''
}

const goBack = () => {
  router.push('/company/review')
}

const openPublicReview = () => {
  const id = review.value?.id
  if (!id) return
  const target = { path: '/agency', query: { reviewId: id } }
  if (import.meta.client) {
    const href = router.resolve(target).href
    window.open(href, '_blank', 'noopener')
    return
  }
  router.push(target)
}
</script>
