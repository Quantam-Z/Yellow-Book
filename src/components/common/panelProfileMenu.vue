<template>
  <div class="relative" ref="menuRoot">
    <button
      type="button"
      class="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm hover:shadow-lg transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
      @click="toggleMenu"
    >
      <span class="w-9 h-9 rounded-full bg-[#212121] text-white flex items-center justify-center font-semibold text-sm uppercase">
        {{ initials }}
      </span>
      <div class="hidden min-[420px]:flex flex-col text-left leading-tight">
        <span class="text-sm font-semibold text-gray-900 truncate">
          {{ displayName }}
        </span>
        <span class="text-[12px] text-gray-500">{{ roleHint }}</span>
      </div>
      <ChevronDown class="w-4 h-4 text-gray-500" :class="{ 'rotate-180': isOpen }" />
    </button>

    <transition name="menu-fade">
      <div
        v-if="isOpen"
        class="absolute right-0 mt-3 w-56 rounded-2xl border border-gray-100 bg-white shadow-[0_18px_45px_rgba(33,33,33,0.15)] py-2 text-sm z-50"
        role="menu"
        aria-label="Profile actions"
      >
        <div class="px-4 pb-3 border-b border-gray-100 mb-2">
          <p class="text-xs uppercase tracking-wide text-gray-400">Signed in as</p>
          <p class="text-sm font-semibold text-gray-900 truncate">
            {{ displayName }}
          </p>
          <p class="text-xs text-gray-500">{{ roleHint }}</p>
        </div>

        <div class="flex items-center justify-center gap-2 px-3 py-1">
  <button
    v-if="showDashboardLink && dashboardTo"
    class="flex items-center gap-2 px-2.5 py-1.5 text-sm hover:bg-gray-100 rounded-md transition-colors text-gray-700 
           border-none outline-none focus:outline-none focus:ring-0"
    @click="goToDashboard"
  >
    <LayoutDashboard class="w-3.5 h-3.5" />
    <span class="font-medium">Dashboard</span>
  </button>

  <button
    class="flex items-center gap-2 px-2.5 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-md transition-colors 
           border-none outline-none focus:outline-none focus:ring-0"
    @click="handleLogout"
  >
    <LogOut class="w-3.5 h-3.5" />
    <span class="font-medium">Logout</span>
  </button>
</div>

      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ChevronDown, LayoutDashboard, LogOut } from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'

const props = defineProps({
  roleLabel: {
    type: String,
    default: 'Dashboard',
  },
  dashboardTo: {
    type: String,
    default: '',
  },
  showDashboardLink: {
    type: Boolean,
    default: true,
  },
})

const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const isOpen = ref(false)
const menuRoot = ref<HTMLElement | null>(null)

const displayName = computed(() => {
  if (user.value?.name) {
    return user.value.name
  }
  if (user.value?.email) {
    return user.value.email
  }
  return 'Guest user'
})

const roleHint = computed(() => props.roleLabel || 'Profile')

const initials = computed(() => {
  const source = displayName.value.trim()
  if (!source) return 'U'
  const parts = source.split(/\s+/).filter(Boolean)
  if (!parts.length) return source.slice(0, 2).toUpperCase()
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
})

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const goToDashboard = () => {
  if (!props.dashboardTo) return
  router.push(props.dashboardTo)
  closeMenu()
}

const handleLogout = async () => {
  await authStore.logout()
  closeMenu()
}

const handleOutsideClick = (event: MouseEvent) => {
  if (!isOpen.value) return
  const target = event.target as Node | null
  if (menuRoot.value && target && !menuRoot.value.contains(target)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<style scoped>
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
