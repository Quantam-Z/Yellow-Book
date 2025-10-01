<template>
  <div class="flex">
    <!-- Sidebar -->
    <aside class="w-[280px] min-h-screen bg-white border-r border-[#eee] shadow-[4px_12px_23px_rgba(0,0,0,0.08)] py-6 px-4 flex flex-col justify-between">
      <!-- Top Menus -->
      <nav class="flex flex-col gap-2">
        <div
          v-for="(item, index) in mainMenu"
          :key="index"
          :class="[
            'flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer text-base font-medium text-[#212121] transition-all duration-200 ease-in-out hover:bg-[#fafafa]',
            { 'bg-[#f3f3f3] font-semibold': activeMenu === item.label }
          ]"
          @click="setActive(item.label)"
        >
          <component :is="item.icon" class="w-[22px] h-[22px]" />
          <span class="leading-[130%] capitalize">{{ item.label }}</span>
        </div>
      </nav>

      <div class="h-px w-full border-t border-dashed border-[#e0e0e0] my-4" />

      <!-- Bottom Menus -->
      <nav class="flex flex-col gap-2">
        <div
          v-for="(item, index) in bottomMenu"
          :key="index"
          :class="[
            'flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer text-base font-medium text-[#212121] transition-all duration-200 ease-in-out hover:bg-[#fafafa]',
            { 'bg-[#f3f3f3] font-semibold': activeMenu === item.label }
          ]"
          @click="setActive(item.label)"
        >
          <component :is="item.icon" class="w-[22px] h-[22px]" />
          <span class="leading-[130%] capitalize">{{ item.label }}</span>
        </div>
      </nav>
    </aside>

  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  LayoutDashboard,
  Building2,
  Users,
  Star,
  Shield,
  Settings,
  LogOut,
} from "lucide-vue-next";

const activeMenu = ref("Dashboard");

const mainMenu = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Company Management", icon: Building2 },
  { label: "User Management", icon: Users },
  { label: "Review Management", icon: Star },
  { label: "Admin Management", icon: Shield },
];

const bottomMenu = [
  { label: "Settings", icon: Settings },
  { label: "Logout", icon: LogOut },
];

const setActive = (menu) => {
  activeMenu.value = menu;
};
</script>