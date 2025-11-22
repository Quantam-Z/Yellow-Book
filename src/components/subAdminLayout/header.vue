<template>
  <header
    class="w-full shadow-sm bg-white border-b border-gray-200 h-[64px] flex items-center justify-between px-4 sm:px-8"
  >
    <div class="flex items-center gap-3">
      <NuxtLink
        to="/agent/dashboard"
        class="flex items-center gap-2 font-semibold text-gray-900 tracking-tight"
      >
        <img src="/logo/logo.png" alt="Panel Logo" class="h-7 w-auto object-contain" />
        <span class="text-sm sm:text-base">Sub Admin Panel</span>
      </NuxtLink>
      <span class="hidden md:inline text-xs uppercase tracking-wide text-gray-400">
        Moderation Workspace
      </span>
    </div>

    <div class="flex items-center gap-3 sm:gap-5">
      <div
        class="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50"
      >
        <Search class="w-4 h-4 text-gray-400" />
        <input
          class="bg-transparent border-0 focus:ring-0 text-sm placeholder:text-gray-400 text-gray-700"
          placeholder="Search tasks or companies"
          type="text"
        />
      </div>

      <button
        type="button"
        class="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
        aria-label="Notifications"
      >
        <Bell class="w-5 h-5" />
      </button>

      <div class="flex items-center gap-2">
        <div class="hidden sm:flex flex-col items-end leading-tight">
          <span class="text-sm font-semibold text-gray-900">Alex Johnson</span>
          <span class="text-xs text-gray-500">Sub Admin</span>
        </div>
        <CircleUser class="w-9 h-9 text-gray-500" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { Bell, Search, CircleUser } from 'lucide-vue-next';
</script>
