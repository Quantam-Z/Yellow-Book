<template>
  <div
    class="w-full rounded-lg flex flex-col items-start p-6 gap-7 bg-gradient-to-r from-blue-500 to-blue-700 text-left font-plus-jakarta-sans text-gray-900"
  >
    <!-- Title -->
    <h2 class="text-3xl font-bold text-white">Welcome back, Jane</h2>

    <!-- Search Bar -->
    <div
      class="w-full rounded-lg bg-white/30 border border-white flex items-center px-4 py-3 gap-3 text-gray-200"
    >
      <Search class="w-5 h-5" />
      <span class="capitalize">Search companies by name or category</span>
    </div>

    <!-- Stats Grid -->
    <div class="w-full flex flex-col gap-4 text-gray-800">
      <div class="flex gap-4">
        <!-- Registered Companies -->
        <div class="flex-1 min-w-[158px] bg-white rounded-lg p-6 flex flex-col gap-6 shadow">
          <div class="flex items-center gap-2">
            <Building class="w-5 h-5 text-blue-600" />
            <span class="capitalize">Registered Companies</span>
          </div>
          <b class="text-3xl text-gray-900">1,234</b>
        </div>

        <!-- Pending Verifications -->
        <div class="flex-1 min-w-[158px] bg-white rounded-lg p-6 flex flex-col gap-6 shadow">
          <div class="flex items-center gap-2">
            <Clock class="w-5 h-5 text-yellow-600" />
            <span class="capitalize">Pending Verifications</span>
          </div>
          <b class="text-3xl text-gray-900">23</b>
        </div>

        <!-- Rejected Verifications -->
        <div class="flex-1 min-w-[158px] bg-white rounded-lg p-6 flex flex-col gap-6 shadow">
          <div class="flex items-center gap-2">
            <XCircle class="w-5 h-5 text-red-600" />
            <span class="capitalize">Rejected Verifications</span>
          </div>
          <b class="text-3xl text-gray-900">1,211</b>
        </div>
      </div>

      <div class="flex gap-4">
        <!-- Total Reviews -->
        <div class="flex-1 min-w-[158px] bg-white rounded-lg p-6 flex flex-col gap-6 shadow">
          <div class="flex items-center gap-2">
            <Star class="w-5 h-5 text-indigo-600" />
            <span class="capitalize">Total Reviews</span>
          </div>
          <b class="text-3xl text-gray-900">5,678</b>
        </div>

        <!-- Pending Reviews -->
        <div class="flex-1 min-w-[158px] bg-white rounded-lg p-6 flex flex-col gap-6 shadow">
          <div class="flex items-center gap-2">
            <Hourglass class="w-5 h-5 text-orange-600" />
            <span class="capitalize">Pending Reviews</span>
          </div>
          <b class="text-3xl text-gray-900">5,678</b>
        </div>

        <!-- Admin Users -->
        <div class="flex-1 min-w-[158px] bg-white rounded-lg p-6 flex flex-col gap-6 shadow">
          <div class="flex items-center gap-2">
            <Users class="w-5 h-5 text-green-600" />
            <span class="capitalize">Admin Users</span>
          </div>
          <b class="text-3xl text-gray-900">5,678</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search, Building, Clock, XCircle, Star, Hourglass, Users } from "lucide-vue-next";
</script>
