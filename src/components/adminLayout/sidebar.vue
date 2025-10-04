<template>
  <div class="flex">
    <button
      @click="isOpen = !isOpen"
      class="md:hidden fixed top-3 left-4 z-50 p-1 rounded-lg bg-white border shadow-md"
      aria-label="Toggle navigation menu"
    >
      <component :is="isOpen ? X : Menu" class="w-6 h-6 text-gray-700" />
    </button>

    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
      @click="closeOnMobile"
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
          @click="closeOnMobile"
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
          @click="closeOnMobile"
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
  // NEW: Import Menu and X icons
  Menu,
  X
} from "lucide-vue-next";
// NEW: Import ref for state management
import { ref } from "vue";

// NEW: State for sidebar visibility
const isOpen = ref(false);

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

// NEW: Function to close the sidebar only on small screens
const closeOnMobile = () => {
  // Use a check against Tailwind's 'md' breakpoint (768px)
  if (window.innerWidth < 768) {
    isOpen.value = false;
  }
};
</script>

<style scoped>
/* Removes the underline for all NuxtLinks in this sidebar */
a {
  text-decoration: none !important;
}
</style>