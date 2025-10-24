<template>
  <div class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" @click.self="closeModal">
    <div class="relative w-full max-w-lg mx-auto">
      <div class="relative rounded-2xl bg-white flex flex-col items-center p-6 gap-6 text-center font-plus-jakarta-sans">
        <button 
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
          @click="closeModal"
          aria-label="Close"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <b class="self-stretch text-lg leading-[160%] capitalize text-black text-left">Review Details</b>

        <div class="w-full shadow-sm rounded-2xl border border-gray-200 flex flex-col items-stretch py-6 px-4 sm:px-6 gap-4 text-left">
          <div class="flex items-start gap-4">
            <div class="w-40 flex items-center gap-4">
              <div class="flex-1 leading-[130%] capitalize font-semibold text-gray-700">Reviewer Name</div>
              <b class="text-sm leading-[160%] capitalize text-center text-gray-500">:</b>
            </div>
            <div class="flex-1 leading-[160%] capitalize text-gray-900">{{ review?.reviewerName || '-' }}</div>
          </div>

          <div class="h-px border-t border-dashed border-gray-200" />

          <div class="flex items-start gap-4">
            <div class="w-40 flex items-center gap-4">
              <div class="flex-1 leading-[130%] capitalize font-semibold text-gray-700">Email</div>
              <b class="text-sm leading-[160%] capitalize text-center text-gray-500">:</b>
            </div>
            <div class="flex-1 leading-[160%] text-gray-900">{{ review?.email || '-' }}</div>
          </div>

          <div class="h-px border-t border-dashed border-gray-200" />

          <div class="flex items-start gap-4">
            <div class="w-40 flex items-center gap-4">
              <div class="flex-1 leading-[130%] capitalize font-semibold text-gray-700">Company</div>
              <b class="text-sm leading-[160%] capitalize text-center text-gray-500">:</b>
            </div>
            <div class="flex-1 leading-[160%] capitalize text-gray-900">{{ review?.company || '-' }}</div>
          </div>

          <div class="h-px border-t border-dashed border-gray-200" />

          <div class="flex items-center gap-4">
            <div class="w-40 flex items-center gap-4">
              <div class="flex-1 leading-[130%] capitalize font-semibold text-gray-700">Rating</div>
              <b class="text-sm leading-[160%] capitalize text-center text-gray-500">:</b>
            </div>
            <div class="flex items-center gap-2">
              <RatingStars :value="Number(review?.rating || 0)" :size-class="'w-5 h-5'" />
              <span class="text-sm text-gray-600">{{ review?.rating ?? '-' }}</span>
            </div>
          </div>

          <div class="h-px border-t border-dashed border-gray-200" />

          <div class="flex items-start gap-4">
            <div class="w-40 flex items-center gap-4">
              <div class="flex-1 leading-[130%] capitalize font-semibold text-gray-700">Review</div>
              <b class="text-sm leading-[160%] capitalize text-center text-gray-500">:</b>
            </div>
            <div class="flex-1 leading-[160%] text-gray-700">{{ review?.content || '-' }}</div>
          </div>
        </div>

        <div class="self-stretch grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button class="rounded bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 py-3 px-4 font-semibold" @click="onApprove">Approved</button>
          <button class="rounded bg-red-600 hover:bg-red-700 active:bg-red-800 text-white py-3 px-4 font-semibold" @click="onReject">Reject</button>
          <button class="rounded border border-gray-300 hover:bg-gray-50 py-3 px-4 font-semibold text-gray-700" @click="onHold">On-Hold</button>
          <button class="rounded border border-gray-300 hover:bg-gray-50 py-3 px-4 font-semibold text-gray-700" @click="onBan">Ban Reviewer</button>
        </div>
      </div>
    </div>
  </div>
  </template>

<script setup>
import RatingStars from '~/components/common/RatingStars.vue'

const props = defineProps({
  review: { type: Object, default: null }
})

const emit = defineEmits(['close', 'update-status'])

const closeModal = () => emit('close')
const onApprove = () => emit('update-status', { review: props.review, status: 'Approved' })
const onReject = () => emit('update-status', { review: props.review, status: 'Rejected' })
const onHold = () => emit('update-status', { review: props.review, status: 'On Hold' })
const onBan = () => emit('update-status', { review: props.review, status: 'Banned' })
</script>