<template>
  <div class="flex">
    <button
      @click="isOpen = !isOpen"
      class="md:hidden fixed top-3 left-4 z-50 p-1 rounded-lg bg-white border shadow-md"
      :class="{ 'opacity-0 pointer-events-none': isScrolled || isOpen }"
      >
      <component :is="isOpen ? X : Menu" class="w-6 h-6 text-gray-700" />
    </button>

    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
      @click="isOpen = false"
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
          :class="{ 'bg-[#f3f3f3] font-semibold': $route.path === item.to }"
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
          :class="{ 'bg-[#f3f3f3] font-semibold': $route.path === item.to }"
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
  Star,
  Shield,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-vue-next";
import { ref, onMounted, onUnmounted } from "vue";

const isOpen = ref(false);
// NEW: State to track if the user has scrolled down
const isScrolled = ref(false); 

const mainMenu = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard/agencyprofile" },
  { label: "My Company", icon: Building2, to: "/dashboard/agencyprofile/mycompanie" },
  { label: "Review", icon: Star, to: "/dashboard/agencyprofile/review" },
  { label: "My Profile", icon: Shield, to: "/dashboard/agencyprofile/myprofile" },
  { label: "Notification", icon: Shield, to: "/dashboard/agencyprofile/notification" },
];

const bottomMenu = [
  { label: "Settings", icon: Settings, to: "/dashboard/agencyprofile/settings" },
  { label: "Logout", icon: LogOut, to: "/logout" },
];

// NEW: Function to handle scroll event
const handleScroll = () => {
  // Check if the user has scrolled more than 50 pixels down
  isScrolled.value = window.scrollY > 50; 
};

// Close sidebar on mobile when clicking menu
const closeOnMobile = () => {
  if (window.innerWidth < 768) {
    isOpen.value = false;
  }
};

// NEW: Lifecycle hooks to manage scroll listener
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
a {
  text-decoration: none !important;
}

/* OPTIONAL: Add a smooth transition for the opacity change */
button {
  transition: opacity 0.3s ease-in-out;
}
</style>