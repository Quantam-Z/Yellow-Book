<template>
  <header
    class="w-full shadow-md bg-white border-b border-gray-200 h-[59px] flex items-center justify-between px-4 sm:px-8"
  >
    <!-- Left: Hamburger + Logo -->
    <div class="flex items-center gap-3">
      <!-- Mobile Hamburger -->
      <button
        class="md:hidden p-2 rounded-lg bg-white border border-gainsboro hover:shadow-xl duration-200"
        aria-label="Open navigation menu"
        @click="openSidebar"
      >
        <Menu class="w-5 h-5 text-gray-700" />
      </button>

      <!-- Logo -->
      <div class="flex items-center justify-center w-40 sm:w-64">
        <img
          src="/logo/logo.png"
          alt="Logo"
          class="h-7 sm:h-8 object-contain"
        />
      </div>
    </div>

    <!-- Right Section -->
    <div class="flex items-center gap-3 sm:gap-5">
      <!-- Notification Icon -->
      <Bell
        class="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 cursor-pointer hover:text-gray-700 transition"
      />

      <!-- Profile Section -->
      <div class="flex items-center gap-2 sm:gap-3">
        <UserCircle
          class="w-8 h-8 sm:w-9 sm:h-9 text-gray-500 rounded-full"
        />
        <div class="flex flex-col items-start leading-tight">
          <b class="text-gray-900 text-sm sm:text-base font-semibold capitalize">
            Jane Cooper
          </b>
          <span class="text-gray-500 text-xs sm:text-sm capitalize">
            Super Admin
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Bell, UserCircle, Menu } from 'lucide-vue-next'

const openSidebar = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-admin-sidebar'))
  }
}
</script>
  