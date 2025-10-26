<template>
  <div class="w-full min-h-screen bg-white">
    <!-- Page header -->
    <div class="rounded-xl border border-gray-200 shadow-sm bg-gradient-to-r from-indigo-500/15 via-pink-500/15 to-amber-400/15 px-4 sm:px-6 py-3 sm:py-4 mb-6 flex items-center justify-between">
      <h1 class="text-lg sm:text-xl font-semibold text-gray-900">My Favorite Company</h1>
      <button type="button" class="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm px-4 py-2 rounded shadow">
        List Your Company
      </button>
    </div>

    <div class="space-y-3">
      <h2 class="text-sm font-semibold text-gray-700">All Favorite List</h2>

      <div
        v-for="(item, idx) in items"
        :key="idx"
        class="rounded-xl border border-gray-200 shadow-sm p-4 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
            <Building2 class="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <p class="font-semibold text-gray-900">{{ item.name }}</p>
            <p class="text-xs text-gray-500">{{ item.category }} • Assigned: {{ item.assigned }}</p>
          </div>
        </div>

        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-600">Rating:</span>
            <Star class="w-4 h-4 text-amber-500 fill-amber-500" />
            <span class="text-gray-700">5 Star</span>
          </div>
          <button class="text-rose-500 hover:text-rose-600" title="Remove from favorites">
            <Heart class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, Star, Heart } from 'lucide-vue-next'
const items = Array.from({ length: 4 }, () => ({
  name: 'Innovate Solutions',
  category: 'Tech',
  assigned: '2024-10-22',
}))
</script>

<style scoped>
</style>
