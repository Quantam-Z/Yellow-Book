<template>
  <header class="w-full border-b border-gray-200 bg-white shadow-sm">
      <div class="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-8">
        <div class="flex min-w-0 flex-1 items-center gap-3 pl-10 sm:pl-0">
        <img
          src="/logo/logo.png"
          alt="Logo"
          width="140"
          height="34"
          class="w-[140px] h-auto object-contain"
        />
        <p class="text-xs font-medium uppercase tracking-wide text-gray-500 sm:hidden">
          Sub Admin
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

        <PanelProfileMenu role-label="Sub Admin" dashboard-to="/agent/dashboard" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { Bell } from 'lucide-vue-next'
import PanelProfileMenu from '~/components/common/panelProfileMenu.vue'
</script>
  