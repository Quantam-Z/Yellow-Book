<template>
    <div class="flex">
      <!-- Hamburger/Close Button -->
      <button
  v-if="!isOpen && !isScrolled" 
  @click="isOpen = true"
  class="md:hidden fixed top-2 left-4 z-50 p-2 rounded-lg bg-white 
         border border-transparent       
         shadow-md hover:shadow-xl        
         duration-200 
         outline-none ring-0 focus:outline-none focus:ring-0
         "
  aria-label="Open navigation menu"
>
  <Menu class="w-5 h-5 text-gray-700" />
</button>
  
      <!-- Overlay (only visible when sidebar is open on mobile) -->
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black bg-opacity-40 z-[51] md:hidden"
        @click="closeOnMobile"
      />
  
      <!-- Sidebar Aside -->
      <aside
        class="w-[280px] min-h-screen bg-white border-r border-[#eee] shadow-[4px_12px_23px_rgba(0,0,0,0.08)] py-6 px-4 flex flex-col
               fixed md:static top-0 left-0 h-full z-[52] transition-transform duration-300 ease-in-out"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
      >
        <div class="flex-1 flex flex-col overflow-y-auto pr-1">
          <nav class="flex flex-col gap-2">
            <NuxtLink
              v-for="(item, index) in mainMenu"
              :key="index"
              :to="item.to"
              class="flex items-center gap-3 py-3 px-4 rounded-lg text-base font-medium text-[#212121] transition-all duration-200 ease-in-out hover:bg-[#fafafa] no-underline"
              :class="{
                'bg-[#f3f3f3] font-semibold': $route.path === item.to
              }"
              @click="closeOnMobile"
            >
              <component :is="item.icon" class="w-[22px] h-[22px]" />
              <span class="leading-[130%] capitalize">{{ item.label }}</span>
            </NuxtLink>
          </nav>
        </div>

        <div
          v-if="bottomMenu.length"
          class="pt-4 mt-6 border-t border-dashed border-[#e0e0e0]"
        >
          <nav class="flex flex-col gap-2">
            <NuxtLink
              v-for="(item, index) in bottomMenu"
              :key="index"
              :to="item.to"
              class="flex items-center gap-3 py-3 px-4 rounded-lg text-base font-medium text-[#212121] transition-all duration-200 ease-in-out hover:bg-[#fafafa] no-underline"
              :class="{
                'bg-[#f3f3f3] font-semibold': $route.path === item.to
              }"
              @click="closeOnMobile"
            >
              <component :is="item.icon" class="w-[22px] h-[22px]" />
              <span class="leading-[130%] capitalize">{{ item.label }}</span>
            </NuxtLink>
          </nav>
        </div>
      </aside>
    </div>
  </template>
  
  <script setup>
import {
  Settings,
  ClipboardList,
  Briefcase,
  User,
  Menu
} from "lucide-vue-next";
import { ref } from "vue";
import { useClientEventListener } from '@/composables/useClientEventListener';
  
  const isOpen = ref(false);
  // NEW: State to track scroll position
  const isScrolled = ref(false); 
  
const mainMenu = [
  { label: "my reviews", icon: ClipboardList, to: "/user/my-reviews" },
  { label: "favourite companies", icon: Briefcase, to: "/user/favourite-companies" },
  { label: "my profile", icon: User, to: "/user/my-profile" },
];
  
const bottomMenu = [
  { label: "Settings", icon: Settings, to: "/user/settings" },
];
  
  // NEW: Function to handle scroll event
const handleScroll = () => {
  if (!import.meta.client) return;
  isScrolled.value = window.scrollY > 50; 
};
  
  // Function to close the sidebar only on small screens
const closeOnMobile = () => {
  if (!import.meta.client) return;
  // Note: Tailwind's 'md' breakpoint is 768px, so we use this value for consistency.
  if (window.innerWidth < 768) {
    isOpen.value = false;
  }
};

useClientEventListener<Event>(() => window, 'scroll', handleScroll, { passive: true, immediate: true });
  </script>
  
  <style scoped>
  a {
    text-decoration: none !important;
  }
  </style>
  