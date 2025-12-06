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
      <div class="flex flex-col">
        <h1 class="text-2xl font-semibold text-gray-900">Review Details</h1>
        <p class="text-sm text-gray-500">for {{ companyInfo.name }}</p>
      </div>
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
      <div class="grid gap-6 lg:grid-cols-3">
        <section class="lg:col-span-2 w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4">
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

        <aside class="space-y-6">
          <div class="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-4">
            <div>
              <p class="text-sm uppercase tracking-wide text-gray-500">Company snapshot</p>
              <p class="text-xl font-semibold text-gray-900">{{ companyInfo.name }}</p>
              <p class="text-sm text-gray-600">{{ companyInfo.tagline }}</p>
            </div>
            <div class="space-y-3 text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <MapPin class="w-4 h-4 text-gray-400" />
                <span>{{ companyInfo.location }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Globe class="w-4 h-4 text-gray-400" />
                <template v-if="companyInfo.website">
                  <a
                    :href="companyInfo.website"
                    target="_blank"
                    rel="noopener"
                    class="text-blue-600 hover:underline"
                  >
                    {{ formatWebsite(companyInfo.website) }}
                  </a>
                </template>
                <span v-else>Website coming soon</span>
              </div>
              <div class="flex items-center gap-2">
                <Phone class="w-4 h-4 text-gray-400" />
                <span>{{ companyInfo.phone }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Mail class="w-4 h-4 text-gray-400" />
                <span>{{ companyInfo.email }}</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-xl bg-gray-50 p-3">
                <p class="text-xs text-gray-500 uppercase tracking-wide">Industry</p>
                <p class="text-sm font-semibold text-gray-900">{{ companyInfo.industry }}</p>
              </div>
              <div class="rounded-xl bg-gray-50 p-3">
                <p class="text-xs text-gray-500 uppercase tracking-wide">Team size</p>
                <p class="text-sm font-semibold text-gray-900">{{ companyInfo.employees }}</p>
              </div>
              <div class="rounded-xl bg-gray-50 p-3">
                <p class="text-xs text-gray-500 uppercase tracking-wide">Revenue</p>
                <p class="text-sm font-semibold text-gray-900">{{ companyInfo.revenue }}</p>
              </div>
              <div class="rounded-xl bg-gray-50 p-3">
                <p class="text-xs text-gray-500 uppercase tracking-wide">Response status</p>
                <p class="text-sm font-semibold text-gray-900">
                  {{ hasExistingResponse ? 'Reply published' : 'Awaiting response' }}
                </p>
              </div>
            </div>
            <div v-if="companyServiceTags.length" class="pt-4 border-t border-gray-100">
              <p class="text-xs uppercase tracking-wide text-gray-500 mb-2">Focus areas</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="service in companyServiceTags"
                  :key="service"
                  class="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium"
                >
                  {{ service }}
                </span>
              </div>
            </div>
          </div>

          <div class="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-4">
            <div class="flex items-center justify-between gap-2">
              <h3 class="text-lg font-semibold text-gray-900">More reviews</h3>
              <span class="text-xs uppercase tracking-wide text-gray-400">Stub data</span>
            </div>
            <div v-if="moreReviews.length" class="space-y-3">
              <button
                v-for="item in moreReviews"
                :key="item.id"
                type="button"
                class="w-full text-left border border-gray-100 rounded-xl p-4 hover:border-green-400 hover:bg-green-50/50 transition focus:outline-none focus:ring-2 focus:ring-green-200"
                @click="viewAnotherReview(item.id)"
              >
                <div class="flex items-center justify-between gap-3">
                  <span class="font-semibold text-gray-900 truncate">{{ item.reviewerName }}</span>
                  <span class="text-sm text-gray-500">{{ formatDate(item.date) }}</span>
                </div>
                <p class="text-sm text-gray-600 mt-1 line-clamp-2">
                  "{{ item.content }}"
                </p>
                <div class="flex items-center gap-1 text-yellow-500 text-xs font-semibold mt-2">
                  <Star class="w-4 h-4" />
                  {{ item.rating }} / 5
                </div>
              </button>
            </div>
            <p v-else class="text-sm text-gray-500">No additional reviews yet.</p>
          </div>
        </aside>
      </div>

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
import { ArrowLeft, Loader2, MessageSquare, Star, MapPin, Globe, Mail, Phone } from 'lucide-vue-next'

import { useStubClient } from '~/services/stubClient'
import { useStubResource } from '~/composables/useStubResource'
import type { AgencyCompanyStub } from '@/services/directoryMapper'

type AgencyReviewRecord = {
  id: number
  reviewerName: string
  rating: number
  date: string
  time: string
  content: string
  companyResponse?: {
    name?: string
    title?: string
    text?: string
    date?: string
    time?: string
    avatar?: string
  } | null
}

definePageMeta({
  layout: 'company',
})

const route = useRoute()
const router = useRouter()
const nuxtApp = useNuxtApp()
const stubClient = useStubClient()
const { data: companyDetailData } = await useStubResource<AgencyCompanyStub>('agencyCompany')
const { data: allReviewsData } = await useStubResource<AgencyReviewRecord[]>('agencyReviews', {
  default: () => [],
})

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

const companyDetail = computed<AgencyCompanyStub | null>(() => {
  const detail = companyDetailData.value
  if (detail && typeof detail === 'object') {
    return detail as AgencyCompanyStub
  }
  return null
})

const defaultCompanyName = 'Tech Solutions Inc.'

const companyInfo = computed(() => {
  const detail = companyDetail.value
  const name = detail?.name?.trim() || defaultCompanyName
  return {
    name,
    tagline: detail?.tagline || 'Respond with warmth and clarity to every review.',
    location: detail?.location || 'Worldwide',
    website: detail?.website || '',
    industry: detail?.industry || detail?.category || 'Professional Services',
    employees: detail?.employees || '10-20',
    revenue: detail?.revenue || '$1M-$10M',
    email: detail?.email || 'contact@example.com',
    phone: detail?.phone || '+1 (555) 123-4567',
    contact: [detail?.firstName, detail?.lastName].filter(Boolean).join(' ').trim() || name,
    contactTitle: detail?.jobTitle || 'Customer Success Lead',
  }
})

const companyServiceTags = computed(() => {
  const raw = companyDetail.value?.services
  if (typeof raw !== 'string') return []
  return raw
    .split(',')
    .map(entry => entry.trim())
    .filter(Boolean)
    .slice(0, 4)
})

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

const formatWebsite = (url?: string | null) => {
  if (!url) return ''
  return url.replace(/^https?:\/\//i, '').replace(/\/$/, '')
}

const formattedReviewDate = computed(() => formatDate(review.value?.date))

const moreReviews = computed<AgencyReviewRecord[]>(() => {
  const list = Array.isArray(allReviewsData.value)
    ? (allReviewsData.value as AgencyReviewRecord[])
    : []
  const currentId = reviewId.value
  return list
    .filter(entry => entry && entry.id !== currentId)
    .slice(0, 3)
})

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

const viewAnotherReview = (id: number | string) => {
  if (!id) return
  router.push(`/company/review/${id}`)
}
</script>
