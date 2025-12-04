<template>
  <div class="flex">
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


    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
      @click="closeSidebar"
    />

    <aside
      class="w-[280px] min-h-screen bg-white border-r border-[#eee] shadow-[4px_12px_23px_rgba(0,0,0,0.08)] py-6 px-4 flex flex-col justify-between
             fixed md:static top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
    >
      <nav class="flex flex-col gap-2">
        <NuxtLink
          v-for="(item, index) in mainMenu"
          :key="index"
          :to="item.to"
          class="flex items-center gap-3 py-3 px-4 rounded-lg text-base font-medium text-[#212121] transition-all duration-200 ease-in-out hover:bg-[#fafafa] no-underline"
          :class="{
            'bg-[#f3f3f3] font-semibold': $route.path === item.to
          }"
          @click="closeSidebar"
        >
          <component :is="item.icon" class="w-[22px] h-[22px]" />
          <span class="leading-[130%] capitalize">{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <div v-if="bottomMenu.length" class="h-px w-full border-t border-solid border-white my-4" />

      <nav v-if="bottomMenu.length" class="flex flex-col gap-2">
        <NuxtLink
          v-for="(item, index) in bottomMenu"
          :key="index"
          :to="item.to"
          class="flex items-center gap-3 py-3 px-4 rounded-lg text-base font-medium text-[#212121] transition-all duration-200 ease-in-out hover:bg-[#fafafa] no-underline"
          :class="{
            'bg-[#f3f3f3] font-semibold': $route.path === item.to
          }"
          @click="closeSidebar"
        >
          <component :is="item.icon" class="w-[22px] h-[22px]" />
          <span class="leading-[130%] capitalize">{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </aside>
  </div>
</template>

<script setup>
import {
  LayoutDashboard,
  Building2,
  Users,
  Star,
  Shield,
  Settings,
  Menu 
} from "lucide-vue-next";
import { ref } from "vue";
import { useClientEventListener } from '@/composables/useClientEventListener';

const isOpen = ref(false);
const isScrolled = ref(false); 

const mainMenu = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin/dashboard" },
  { label: "Company Management", icon: Building2, to: "/admin/manage-companies" },
  { label: "User Management", icon: Users, to: "/admin/manage-users" },
  { label: "Review Management", icon: Star, to: "/admin/manage-review" },
  { label: "Admin Management", icon: Shield, to: "/admin/admin-management" },
];

const bottomMenu = [
  { label: "Settings", icon: Settings, to: "/admin/settings" },
];

// Function to handle scroll event
const handleScroll = () => {
  if (!import.meta.client) return;
  isScrolled.value = window.scrollY > 100; 
};

// Close sidebar function
const closeSidebar = () => {
  if (!import.meta.client) return;
  if (window.innerWidth < 768) {
    isOpen.value = false;
  }
};

// Handle escape key press
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    closeSidebar();
  }
};

// Handle resize
const handleResize = () => {
  if (!import.meta.client) return;
  if (window.innerWidth >= 768) {
    isOpen.value = false;
  }
};

useClientEventListener(() => document, 'keydown', handleEscapeKey);
useClientEventListener(() => window, 'resize', handleResize, { passive: true, immediate: true });
useClientEventListener(() => window, 'scroll', handleScroll, { passive: true, immediate: true }); 
</script>

<style scoped>
a {
  text-decoration: none !important;
}
</style>