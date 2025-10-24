<template>
  <header
    class="w-full sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[#eee] shadow-[0px_5px_16px_rgba(34,34,34,0.09)]"
  >
    <div class="h-[59px] px-3 sm:px-6 md:px-8 flex items-center justify-between">
      <!-- Left: Hamburger + Logo -->
      <div class="flex items-center gap-3">
        <!-- Animated Hamburger -->
        <button
          class="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg border bg-white shadow-sm transition hover:shadow-md"
          :aria-expanded="ui.isSidebarOpen ? 'true' : 'false'"
          aria-label="Toggle menu"
          @click="ui.toggleSidebar()"
        >
          <span
            class="absolute w-5 h-0.5 bg-[#212121] transition-transform duration-300"
            :class="ui.isSidebarOpen ? 'rotate-45 translate-y-[2px]' : '-translate-y-1.5'"
          />
          <span
            class="absolute w-5 h-0.5 bg-[#212121] transition-opacity duration-300"
            :class="ui.isSidebarOpen ? 'opacity-0' : 'opacity-100'"
          />
          <span
            class="absolute w-5 h-0.5 bg-[#212121] transition-transform duration-300"
            :class="ui.isSidebarOpen ? '-rotate-45 -translate-y-[2px]' : 'translate-y-1.5'"
          />
        </button>

        <NuxtLink to="/" class="flex items-center gap-2 no-underline">
          <img class="h-[28px] w-auto" src="/logo/logo.png" alt="Logo" />
        </NuxtLink>
      </div>

      <!-- Right: User -->
      <div class="flex items-center gap-3">
        <img src="/profile.png" alt="avatar" class="w-8 h-8 rounded-full object-cover" />
        <div class="hidden sm:flex flex-col leading-tight">
          <b class="text-[13px] text-[#212121]">Jane Cooper</b>
          <span class="text-[12px] text-dimgray">Super-Admin</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useUiStore } from '~/stores/ui'
const ui = useUiStore()
</script>

<style scoped>
a { text-decoration: none !important; }
</style>