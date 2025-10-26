<template>
  <div class="w-full min-h-screen bg-white">
    <!-- Page header -->
    <div class="rounded-xl border border-gray-200 shadow-sm bg-gradient-to-r from-indigo-500/15 via-pink-500/15 to-amber-400/15 px-4 sm:px-6 py-3 sm:py-4 mb-6 flex items-center justify-between">
      <h1 class="text-lg sm:text-xl font-semibold text-gray-900">My Reviews</h1>
      <button type="button" class="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm px-4 py-2 rounded shadow">
        List Your Company
      </button>
    </div>

    <div class="space-y-3">
      <h2 class="text-sm font-semibold text-gray-700">All Review List</h2>

      <div
        v-for="(review, idx) in reviews"
        :key="idx"
        class="rounded-xl border border-gray-200 shadow-sm p-4"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
              <Building2 class="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <p class="font-semibold text-gray-900">{{ review.company }}</p>
              <p class="text-xs text-gray-500">Reviewed On {{ review.date }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-600">Rating:</span>
            <Star class="w-4 h-4 text-amber-500 fill-amber-500" />
            <span class="text-gray-700">5 Star</span>
          </div>
        </div>

        <p class="mt-4 text-sm text-gray-700">"Absolutely Fantastic Service From Start To Finish. Highly Recommend!"</p>

        <div class="mt-3 flex items-center gap-3 text-gray-500">
          <button class="hover:text-emerald-600" title="Edit">
            <Edit3 class="w-4 h-4" />
          </button>
          <button class="hover:text-rose-600" title="Delete">
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, Star, Edit3, Trash2 } from 'lucide-vue-next'
const reviews = Array.from({ length: 5 }, () => ({
  company: 'Innovate Solutions',
  date: 'October 15, 2023',
}))
</script>

<style scoped>
</style>
