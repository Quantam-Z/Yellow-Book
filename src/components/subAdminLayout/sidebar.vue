<template>
  <div class="flex">
    <button
      v-if="!isOpen"
      @click="isOpen = true"
      class="md:hidden fixed top-2 left-4 z-50 p-2 rounded-lg bg-white shadow ring-1 ring-black/5"
      aria-label="Open navigation menu"
    >
      <Menu class="w-5 h-5 text-gray-700" />
    </button>

    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/30 z-30 md:hidden"
      @click="closeSidebar"
    />

    <aside
      class="w-[260px] min-h-screen bg-white border-r border-gray-100 shadow-[4px_12px_23px_rgba(0,0,0,0.05)] py-6 px-4 flex flex-col justify-between fixed md:static top-0 left-0 z-40 transition-transform duration-300 ease-in-out"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
    >
      <nav class="flex flex-col gap-2">
        <NuxtLink
          v-for="item in primaryMenu"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 py-3 px-4 rounded-lg text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          :class="{ 'bg-gray-100 text-gray-900 font-semibold': $route.path === item.to }"
          @click="closeSidebar"
        >
          <component :is="item.icon" class="w-5 h-5 text-gray-500" />
          <span class="leading-tight">{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <div class="space-y-4">
        <div class="rounded-lg bg-yellow-50 border border-yellow-100 p-4 text-sm text-yellow-900">
          <p class="font-semibold mb-1">Today's checklist</p>
          <p class="text-xs text-yellow-800">Review assigned companies and moderate new reviews.</p>
        </div>

        <nav class="flex flex-col gap-2">
          <template v-for="item in secondaryMenu" :key="item.label">
            <NuxtLink
              v-if="item.to"
              :to="item.to"
              class="flex items-center gap-3 py-3 px-4 rounded-lg text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              :class="{ 'bg-gray-100 text-gray-900 font-semibold': $route.path === item.to }"
              @click="closeSidebar"
            >
              <component :is="item.icon" class="w-5 h-5 text-gray-500" />
              <span class="leading-tight">{{ item.label }}</span>
            </NuxtLink>
            <button
              v-else
              type="button"
              class="flex items-center gap-3 py-3 px-4 rounded-lg text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 text-left bg-transparent border-0"
              @click="handleSecondaryAction(item)"
            >
              <component :is="item.icon" class="w-5 h-5 text-gray-500" />
              <span class="leading-tight">{{ item.label }}</span>
            </button>
          </template>
        </nav>
      </div>
    </aside>
  </div>
</template>

<script setup>
import {
  Menu,
  LayoutDashboard,
  ClipboardCheck,
  MessageSquare,
  UserCircle2,
  Settings,
  LogOut,
} from 'lucide-vue-next';
import { ref } from 'vue';
import { useClientEventListener } from '@/composables/useClientEventListener';
import { useAuthStore } from '~/stores/auth';

const isOpen = ref(false);

const primaryMenu = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/agent/dashboard' },
  { label: 'Assigned Companies', icon: ClipboardCheck, to: '/agent/assign-companies' },
  { label: 'Review Queue', icon: MessageSquare, to: '/agent/dashboard#reviews' },
  { label: 'My Profile', icon: UserCircle2, to: '/agent/my-profile' },
];

const authStore = useAuthStore();

const secondaryMenu = [
  { label: 'Settings', icon: Settings, to: '/agent/my-profile#preferences' },
  { label: 'Logout', icon: LogOut, action: () => authStore.logout() },
];

const closeSidebar = () => {
  if (!import.meta.client) return;
  if (window.innerWidth < 768) {
    isOpen.value = false;
  }
};

const handleSecondaryAction = async (item) => {
  if (typeof item.action === 'function') {
    await item.action();
  }
  closeSidebar();
};

const handleResize = () => {
  if (!import.meta.client) return;
  if (window.innerWidth >= 768) {
    isOpen.value = false;
  }
};

useClientEventListener(() => window, 'resize', handleResize, { passive: true, immediate: true });
</script>
