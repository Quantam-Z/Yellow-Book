<template>
   <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-6 mb-4">
      <h2 class="text-3xl font-bold text-black">Welcome back, {{ adminStats?.welcomeName || 'User' }}</h2>

    <div class="w-full relative rounded-lg bg-white/80 backdrop-blur-sm flex items-center px-4 py-3 gap-3 mb-4">
      <Search class="w-5 h-5 text-gray-400" />
      <input
        type="search"
        v-model="searchTerm"
        @keydown.enter.prevent="handleSearch"
        placeholder="Search companies by name or category"
        class="flex-1 min-w-0 bg-transparent text-gray-600 placeholder:text-gray-500 outline-none border-none focus:outline-none focus:ring-0"
        aria-label="Search companies by name or category"
        autocomplete="off"
      />
    </div>

    <div class="w-full flex flex-col gap-4 text-gray-800">
      <div class="flex flex-col sm:flex-row gap-4 flex-wrap">
        <div class="flex-1 min-w-[158px] bg-white rounded-lg p-6 flex flex-col gap-6 shadow border border-gray-200">
          <div class="flex items-center gap-2">
            <Building class="w-5 h-5 text-blue-600" />
            <span class="capitalize">Registered Companies</span>
          </div>
          <b class="text-3xl text-gray-900">{{ adminStats?.registeredCompanies ?? 0 }}</b>
        </div>

        <div class="flex-1 min-w-[158px] bg-white rounded-lg p-6 flex flex-col gap-6 shadow border border-gray-200">
          <div class="flex items-center gap-2">
            <Clock class="w-5 h-5 text-yellow-600" />
            <span class="capitalize">Pending Verifications</span>
          </div>
          <b class="text-3xl text-gray-900">{{ adminStats?.pendingVerifications ?? 0 }}</b>
        </div>

        <div class="flex-1 min-w-[158px] bg-white rounded-lg p-6 flex flex-col gap-6 shadow border border-gray-200">
          <div class="flex items-center gap-2">
            <XCircle class="w-5 h-5 text-red-600" />
            <span class="capitalize">Rejected Verifications</span>
          </div>
          <b class="text-3xl text-gray-900">{{ adminStats?.rejectedVerifications ?? 0 }}</b>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 flex-wrap">
        <div class="flex-1 min-w-[158px] bg-white rounded-lg p-6 flex flex-col gap-6 shadow border border-gray-200">
          <div class="flex items-center gap-2">
            <Star class="w-5 h-5 text-indigo-600" />
            <span class="capitalize">Total Reviews</span>
          </div>
          <b class="text-3xl text-gray-900">{{ adminStats?.totalReviews ?? 0 }}</b>
        </div>

        <div class="flex-1 min-w-[158px] bg-white rounded-lg p-6 flex flex-col gap-6 shadow border border-gray-200">
          <div class="flex items-center gap-2">
            <Hourglass class="w-5 h-5 text-orange-600" />
            <span class="capitalize">Pending Reviews</span>
          </div>
          <b class="text-3xl text-gray-900">{{ adminStats?.pendingReviews ?? 0 }}</b>
        </div>

        <div class="flex-1 min-w-[158px] bg-white rounded-lg p-6 flex flex-col gap-6 shadow border border-gray-200">
          <div class="flex items-center gap-2">
            <Users class="w-5 h-5 text-green-600" />
            <span class="capitalize">Admin Users</span>
          </div>
          <b class="text-3xl text-gray-900">{{ adminStats?.adminUsers ?? 0 }}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Search, Building, Clock, XCircle, Star, Hourglass, Users } from "lucide-vue-next";
import { useRouter } from 'vue-router';
import { useStubResource } from '~/services/stubClient'

const defaultStats = {
  welcomeName: 'User',
  registeredCompanies: 0,
  pendingVerifications: 0,
  rejectedVerifications: 0,
  totalReviews: 0,
  pendingReviews: 0,
  adminUsers: 0
}

const nuxtApp = useNuxtApp()
const router = useRouter()
const searchTerm = ref('')

const { data: statsData, error: statsError } = await useStubResource('adminStats', {
  default: defaultStats,
})

const adminStats = computed(() => statsData.value || defaultStats)

const handleSearch = () => {
  if (!import.meta.client) return
  const query = searchTerm.value.trim()
  const targetRoute = { path: '/dashboard/admin/manage-companies' }
  if (query) {
    targetRoute.query = { search: query }
  }

  router.push(targetRoute).catch(() => {})
}

watch(statsError, (err) => {
  if (err) {
    console.error('Failed to load admin stats', err)
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.alert('Failed to load dashboard stats')
      } catch {}
    }
  }
})
</script>

