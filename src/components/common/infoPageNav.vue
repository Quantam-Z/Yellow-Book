<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Menu, X } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';

import LoginModal from '@/components/common/loginModal.vue';
import { useAuthStore } from '~/stores/auth';

type NavItem = {
  label: string;
  to: string;
  variant?: 'primary' | 'secondary';
};

const props = withDefaults(
  defineProps<{
    eyebrow?: string;
    title: string;
    description?: string;
  }>(),
  {
    eyebrow: '',
    description: '',
  },
);

const route = useRoute();
const router = useRouter();

const navItems: NavItem[] = [
  { label: 'Category', to: '/catagory', variant: 'primary' },
  { label: 'Popular Listing', to: '/popular-list' },
  { label: 'FAQ', to: '/faq' },
];

const activePath = computed(() => route.path);
const isMenuOpen = ref(false);
const isPopularListRoute = computed(() => route.path === '/popular-list');

const authStore = useAuthStore();
if (import.meta.client) {
  authStore.hydrateFromStorage();
}

const { isAuthenticated, user } = storeToRefs(authStore);

const showLoginModal = ref(false);
const showUserMenu = ref(false);
const userMenuRef = ref<HTMLElement | null>(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
    showUserMenu.value = false;
  },
);

const SCROLL_LOCK_CLASS = 'scroll-locked';

let originalBodyPaddingRight = '';
let originalHtmlPaddingRight = '';
let hasScrollCompensation = false;

const applyScrollCompensation = () => {
  if (!import.meta.client || hasScrollCompensation) return;
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (scrollBarWidth <= 0) return;

  originalBodyPaddingRight = document.body.style.paddingRight;
  originalHtmlPaddingRight = document.documentElement.style.paddingRight;

  const bodyPadding = parseFloat(window.getComputedStyle(document.body).paddingRight || '0') || 0;
  const htmlPadding = parseFloat(window.getComputedStyle(document.documentElement).paddingRight || '0') || 0;

  document.body.style.paddingRight = `${bodyPadding + scrollBarWidth}px`;
  document.documentElement.style.paddingRight = `${htmlPadding + scrollBarWidth}px`;
  hasScrollCompensation = true;
};

const releaseScrollCompensation = () => {
  if (!import.meta.client || !hasScrollCompensation) return;
  document.body.style.paddingRight = originalBodyPaddingRight;
  document.documentElement.style.paddingRight = originalHtmlPaddingRight;
  hasScrollCompensation = false;
};

const toggleScrollLock = (shouldLock: boolean) => {
  if (!import.meta.client) return;
  if (shouldLock) {
    applyScrollCompensation();
  } else {
    releaseScrollCompensation();
  }
  const action = shouldLock ? 'add' : 'remove';
  document.documentElement.classList[action](SCROLL_LOCK_CLASS);
  document.body.classList[action](SCROLL_LOCK_CLASS);
};

watch(isMenuOpen, (open) => {
  toggleScrollLock(open);
});

const hasHeroContent = computed(() => Boolean(props.eyebrow || props.title || props.description));

const authUserDisplay = computed(() => user.value?.name || user.value?.email || '');

const userInitials = computed(() => {
  const source = authUserDisplay.value?.trim() ?? '';
  if (!source) return 'U';
  const parts = source.split(/\s+/).filter(Boolean);
  if (!parts.length) return 'U';
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
});

const openLoginModal = () => {
  showLoginModal.value = true;
  isMenuOpen.value = false;
};

const closeLoginModal = () => {
  showLoginModal.value = false;
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const goToUserDashboard = () => {
  showUserMenu.value = false;
  isMenuOpen.value = false;
  router.push('/user/my-profile');
};

const handleUserLogout = async () => {
  await authStore.logout();
  showUserMenu.value = false;
  isMenuOpen.value = false;
};

const handleDocumentClick = (event: MouseEvent) => {
  if (!showUserMenu.value) return;
  const target = event.target as Node | null;
  if (userMenuRef.value && target && !userMenuRef.value.contains(target)) {
    showUserMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick);
  toggleScrollLock(false);
});
</script>

<template>
  <section
    class="info-nav-shell relative isolate w-full text-[#212121]"
    :class="
      isPopularListRoute
        ? 'bg-transparent shadow-none'
        : 'info-nav-shell--rounded overflow-hidden bg-[#fff9e6] shadow-[0_35px_70px_rgba(15,23,42,0.08)]'
    "
  >
    <div v-if="!isPopularListRoute" class="info-nav-accent" aria-hidden="true"></div>
    <div
      :class="[
        'relative w-full flex flex-col',
        isPopularListRoute
          ? 'z-10 px-4 sm:px-6 md:px-12 lg:px-[120px] py-4 sm:py-6'
          : 'mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6 lg:px-8 lg:pb-12',
      ]"
    >
      <div
        :class="[
          'w-full items-center gap-4',
          isPopularListRoute ? 'flex justify-between mb-6 sm:mb-12 md:mb-16' : 'flex min-h-[72px]',
        ]"
      >
        <NuxtLink
          to="/"
          :class="isPopularListRoute ? 'w-[120px] rounded-[4px] flex flex-col items-start p-2 box-border' : 'flex items-center gap-3'"
          aria-label="Navigate to home"
        >
          <template v-if="isPopularListRoute">
            <img
              class="self-stretch max-w-full overflow-hidden h-[34px] sm:h-[30px] md:h-[30px] flex-shrink-0 object-cover"
              src="/logo/logo.png"
              alt="Logo"
            />
          </template>
          <template v-else>
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffd335] text-base font-semibold">
              Y
            </span>
            <span class="text-[22px] font-semibold tracking-wide">
              Yello<span class="text-base font-normal text-[#9e9e9e]">.mn</span>
            </span>
          </template>
        </NuxtLink>

        <template v-if="isPopularListRoute">
          <div class="hidden lg:flex items-center gap-8">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="cursor-pointer no-underline transition-colors duration-200"
            >
              <template v-if="item.variant === 'primary'">
                <div class="flex flex-col items-center gap-[4px] text-[#212121]">
                  <div class="relative leading-[160%] font-medium text-base">
                    {{ item.label }}
                  </div>
                  <div class="w-[30px] bg-[#212121] h-[2px]" />
                </div>
              </template>
              <template v-else>
                <div
                  class="relative leading-[160%] font-normal text-base"
                  :class="activePath === item.to ? 'text-[#212121]' : 'text-[#616161]'"
                >
                  {{ item.label }}
                </div>
              </template>
            </NuxtLink>
          </div>

          <div class="hidden lg:flex items-center gap-6 text-[#212121]">
            <button
              v-if="!isAuthenticated"
              type="button"
              class="flex items-center justify-center cursor-pointer relative leading-[160%] font-normal text-base"
              @click="openLoginModal"
            >
              Login
            </button>
            <div v-else ref="userMenuRef" class="relative">
              <button
                type="button"
                class="flex items-center gap-3 rounded-full border border-[#dbe7ff] bg-white px-3 py-2 shadow-sm hover:shadow-md transition"
                @click="toggleUserMenu"
              >
                <span class="w-8 h-8 rounded-full bg-[#212121] text-white flex items-center justify-center font-semibold text-sm">
                  {{ userInitials }}
                </span>
                <span class="hidden sm:block text-sm font-medium">{{ authUserDisplay }}</span>
              </button>
              <Transition name="fade">
                <div
                  v-if="showUserMenu"
                  class="absolute right-0 mt-3 w-48 rounded-xl border border-[#dbe7ff] bg-white shadow-lg py-2 text-sm z-50"
                >
                  <button class="w-full text-left px-4 py-2 hover:bg-[#fff9e6] transition-colors" @click="goToUserDashboard">
                    My Dashboard
                  </button>
                  <button class="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition-colors" @click="handleUserLogout">
                    Logout
                  </button>
                </div>
              </Transition>
            </div>
            <NuxtLink
              to="/agency"
              class="relative rounded border-gray border-solid border-[1px] box-border h-12 flex items-center justify-center py-[18px] px-9 text-center text-base text-[#212121] font-plus-jakarta-sans no-underline"
            >
              <div class="relative leading-[130%] capitalize font-semibold">List Your Agency</div>
            </NuxtLink>
          </div>
        </template>

        <template v-else>
          <nav
            class="ml-2 hidden flex-1 items-center justify-center gap-8 text-sm font-semibold text-[#797979] md:flex"
            aria-label="Page navigation"
          >
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="relative flex flex-col items-center text-base transition-colors duration-200 no-underline"
              :class="activePath === item.to ? 'text-[#212121]' : 'hover:text-[#212121]'"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>

          <div class="hidden items-center gap-3 text-sm font-semibold md:flex">
            <button
              v-if="!isAuthenticated"
              type="button"
              class="text-[#4a4a4a] transition-colors hover:text-[#212121]"
              @click="openLoginModal"
            >
              Login
            </button>
            <div v-else ref="userMenuRef" class="relative">
              <button
                type="button"
                class="flex items-center gap-3 rounded-full border border-[#dbe7ff] bg-white px-3 py-2 shadow-sm hover:shadow-md transition"
                @click="toggleUserMenu"
              >
                <span class="w-8 h-8 rounded-full bg-[#212121] text-white flex items-center justify-center font-semibold text-sm">
                  {{ userInitials }}
                </span>
                <span class="text-sm font-medium text-[#212121]">{{ authUserDisplay }}</span>
              </button>
              <Transition name="fade">
                <div
                  v-if="showUserMenu"
                  class="absolute right-0 mt-3 w-48 rounded-xl border border-[#dbe7ff] bg-white shadow-lg py-2 text-sm z-50"
                >
                  <button class="w-full text-left px-4 py-2 hover:bg-[#fff9e6] transition-colors" @click="goToUserDashboard">
                    My Dashboard
                  </button>
                  <button class="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition-colors" @click="handleUserLogout">
                    Logout
                  </button>
                </div>
              </Transition>
            </div>
            <NuxtLink
              to="/agency"
              class="rounded-full border border-[#212121] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#212121] transition-all hover:bg-[#212121] hover:text-white no-underline"
            >
              List Your Agency
            </NuxtLink>
          </div>
        </template>

        <button
          type="button"
          :class="[
            'inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#ffd335] bg-white/90 text-[#212121] shadow-sm transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#212121]',
            isPopularListRoute ? 'lg:hidden' : 'md:hidden',
          ]"
          :aria-expanded="isMenuOpen"
          aria-controls="info-mobile-nav"
          @click="toggleMenu"
        >
          <span class="sr-only">Toggle navigation menu</span>
          <Menu v-if="!isMenuOpen" class="h-5 w-5" aria-hidden="true" />
          <X v-else class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <Teleport to="body">
        <Transition name="mobile-nav-overlay">
          <div
            v-if="isMenuOpen"
            class="info-mobile-overlay"
            :class="isPopularListRoute ? 'lg:hidden' : 'md:hidden'"
            aria-hidden="true"
            @click="closeMenu"
          />
        </Transition>
        <Transition name="mobile-nav-drawer">
          <div
            v-if="isMenuOpen"
            id="info-mobile-nav"
            class="info-mobile-drawer"
            :class="isPopularListRoute ? 'lg:hidden' : 'md:hidden'"
            role="dialog"
            aria-modal="true"
          >
            <div class="p-6 h-full flex flex-col">
              <div class="flex justify-end mb-8">
                <button
                  type="button"
                  class="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close navigation menu"
                  @click="closeMenu"
                >
                  <X class="h-6 w-6" />
                </button>
              </div>

              <nav class="flex-1 flex flex-col space-y-2 text-lg" aria-label="Page navigation">
                <NuxtLink
                  v-for="item in navItems"
                  :key="item.to"
                  :to="item.to"
                  class="py-4 px-4 text-[#616161] hover:bg-[#fff9e6] rounded-lg transition-colors border border-transparent no-underline"
                  :class="activePath === item.to ? 'bg-[#fff9e6] text-[#212121] font-semibold border-[#ffe08f]' : ''"
                  @click="closeMenu"
                >
                  {{ item.label }}
                </NuxtLink>
              </nav>

              <div class="space-y-3 mt-auto pt-6 border-t border-gray-200">
                <template v-if="!isAuthenticated">
                  <button
                    type="button"
                    class="w-full py-3 px-6 text-[#212121] font-semibold text-lg border-2 border-[#212121] rounded-lg hover:bg-[#212121] hover:text-white transition-all"
                    @click="openLoginModal"
                  >
                    Login
                  </button>
                </template>
                <template v-else>
                  <button
                    type="button"
                    class="w-full py-3 px-6 text-[#212121] font-semibold text-lg border-2 border-[#212121] rounded-lg hover:bg-[#212121] hover:text-white transition-all"
                    @click="goToUserDashboard"
                  >
                    My Dashboard
                  </button>
                  <button
                    type="button"
                    class="w-full py-3 px-6 text-red-600 font-semibold text-lg border-2 border-red-200 rounded-lg hover:bg-red-50 transition-all"
                    @click="handleUserLogout"
                  >
                    Logout
                  </button>
                </template>
                <NuxtLink
                  to="/agency"
                  class="w-full py-3 px-6 bg-[#fcc207] text-[#212121] font-semibold text-lg rounded-lg border-b-2 border-[#e5b106] hover:bg-[#e5b106] transition-all text-center no-underline block"
                  @click="closeMenu"
                >
                  List Your Agency
                </NuxtLink>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <div v-if="hasHeroContent" class="mt-10 flex flex-col items-center gap-3 pb-4 text-center sm:mt-12">
        <p v-if="props.eyebrow" class="text-xs uppercase tracking-[0.35em] text-[#a67c00]">
          {{ props.eyebrow }}
        </p>
        <h1 class="text-3xl font-semibold leading-tight text-[#212121] sm:text-[40px]">{{ props.title }}</h1>
        <p v-if="props.description" class="max-w-3xl text-base text-[#616161] sm:text-lg">
          {{ props.description }}
        </p>
      </div>
    </div>
    <LoginModal :isOpen="showLoginModal" @close="closeLoginModal" />
  </section>
</template>

<style scoped>
.info-nav-shell {
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}

.info-nav-shell--rounded {
  border-bottom-left-radius: 50% 32px;
  border-bottom-right-radius: 50% 32px;
}

@media (min-width: 640px) {
  .info-nav-shell--rounded {
    border-bottom-left-radius: 50% 48px;
    border-bottom-right-radius: 50% 48px;
  }
}

@media (min-width: 1024px) {
  .info-nav-shell--rounded {
    border-bottom-left-radius: 50% 70px;
    border-bottom-right-radius: 50% 70px;
  }
}

.info-nav-accent {
  position: absolute;
  inset: auto -20% -180px auto;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle at 30% 30%, rgba(255, 211, 53, 0.55), rgba(255, 249, 230, 0));
  filter: blur(12px);
  opacity: 0.8;
  pointer-events: none;
}

.info-mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 40;
}

.info-mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(80vw, 400px);
  background: #ffffff;
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
  box-shadow: -12px 0 45px rgba(15, 23, 42, 0.2);
  padding: 24px;
  z-index: 50;
  overflow-y: auto;
  height: 100vh;
}

.mobile-nav-overlay-enter-active,
.mobile-nav-overlay-leave-active {
  transition: opacity 0.25s ease;
}

.mobile-nav-overlay-enter-from,
.mobile-nav-overlay-leave-to {
  opacity: 0;
}

.mobile-nav-drawer-enter-active,
.mobile-nav-drawer-leave-active {
  transition: transform 0.35s ease, opacity 0.35s ease;
}

.mobile-nav-drawer-enter-from,
.mobile-nav-drawer-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.mobile-nav-drawer-enter-to,
.mobile-nav-drawer-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
