<template>
  <header class="w-full border-b border-gray-200 bg-white shadow-sm">
      <div class="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-8">
        <div class="flex min-w-0 flex-1 items-center gap-3 pl-10 sm:pl-0">
        <img
          src="/logo/logo.png"
          alt="Logo"
          class="h-7 w-auto max-w-[160px] object-contain sm:h-8"
        />
        <p class="text-xs font-medium uppercase tracking-wide text-gray-500 sm:hidden">
          User Profile
        </p>
      </div>

      <div class="flex min-w-0 flex-1 items-center justify-end gap-3 sm:gap-5">
        <button
          type="button"
          class="rounded-full border border-gray-200 p-2 text-gray-500 transition hover:border-gray-300 hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
          aria-label="Open notifications"
        >
          <Bell class="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div class="flex min-w-0 items-center gap-2 sm:gap-3">
          <UserCircle class="h-8 w-8 rounded-full text-gray-500 sm:h-9 sm:w-9" />
          <div class="hidden min-[420px]:flex flex-col items-start leading-tight">
            <b class="truncate text-sm font-semibold capitalize text-gray-900 sm:text-base">
              Jane Cooper
            </b>
            <span class="text-xs capitalize text-gray-500 sm:text-sm">
              User Profile
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Bell, UserCircle } from 'lucide-vue-next'
</script>
  