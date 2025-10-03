<template>
  <div class="flex">
    <!-- Sidebar -->
    <aside
      class="w-[280px] min-h-screen bg-white border-r border-[#eee] shadow-[4px_12px_23px_rgba(0,0,0,0.08)] py-6 px-4 flex flex-col justify-between"
    >
      <!-- Top Menus -->
      <nav class="flex flex-col gap-2">
        <NuxtLink
          v-for="(item, index) in mainMenu"
          :key="index"
          :to="item.to"
          class="flex items-center gap-3 py-3 px-4 rounded-lg text-base font-medium text-[#212121] transition-all duration-200 ease-in-out hover:bg-[#fafafa] no-underline"
          :class="{
            'bg-[#f3f3f3] font-semibold': $route.path === item.to
          }"
        >
          <component :is="item.icon" class="w-[22px] h-[22px]" />
          <span class="leading-[130%] capitalize">{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <div class="h-px w-full border-t border-dashed border-[#e0e0e0] my-4" />

      <!-- Bottom Menus -->
      <nav class="flex flex-col gap-2">
        <NuxtLink
          v-for="(item, index) in bottomMenu"
          :key="index"
          :to="item.to"
          class="flex items-center gap-3 py-3 px-4 rounded-lg text-base font-medium text-[#212121] transition-all duration-200 ease-in-out hover:bg-[#fafafa] no-underline"
          :class="{
            'bg-[#f3f3f3] font-semibold': $route.path === item.to
          }"
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
} from "lucide-vue-next";

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
</script>

<style scoped>
/* Removes the underline for all NuxtLinks in this sidebar */
a {
  text-decoration: none !important;
}
</style>
