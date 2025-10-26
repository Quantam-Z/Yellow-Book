<template>
  <div class="flex">
 <button
  v-if="!isOpen && !isScrolled" 
  @click="isOpen = true"
  class="md:hidden fixed top-2 left-4 z-50 p-2 rounded-lg bg-white border border-gainsboro hover:shadow-xl duration-200"
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

      <div class="h-px w-full border-t border-dashed border-[#e0e0e0] my-4" />

      <nav class="flex flex-col gap-2">
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
  LogOut,
  Menu 
} from "lucide-vue-next";
import { ref, onMounted, onUnmounted } from "vue";

const isOpen = ref(false);
const isScrolled = ref(false); 

const mainMenu = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard/admin" },
  { label: "Company Management", icon: Building2, to: "/dashboard/admin/manage-companies" },
  { label: "User Management", icon: Users, to: "/dashboard/admin/manage-users" },
  { label: "Review Management", icon: Star, to: "/dashboard/admin/manage-review" },
  { label: "Admin Management", icon: Shield, to: "/dashboard/admin/admin-management" },
];

const bottomMenu = [
  { label: "Settings", icon: Settings, to: "/dashboard/admin/settings" },
  { label: "Logout", icon: LogOut, to: "/logout" },
];

// Function to handle scroll event
const handleScroll = () => {
  isScrolled.value = window.scrollY > 100; 
};

// Close sidebar function
const closeSidebar = () => {
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
  if (window.innerWidth >= 768) {
    isOpen.value = false;
  }
};

// Add event listeners
onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey);
  window.addEventListener('resize', handleResize);
  // Add scroll listener
  window.addEventListener('scroll', handleScroll); 
});

// Remove event listeners
onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey);
  window.removeEventListener('resize', handleResize);
  // Remove scroll listener
  window.removeEventListener('scroll', handleScroll); 
});
</script>

<style scoped>
a {
  text-decoration: none !important;
}
</style>