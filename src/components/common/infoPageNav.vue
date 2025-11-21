<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Menu, X } from 'lucide-vue-next';

type NavItem = {
  label: string;
  to: string;
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

const navItems: NavItem[] = [
  { label: 'Category', to: '/catagory' },
  { label: 'Popular List', to: '/popular-list' },
  { label: 'FAQ', to: '/faq' },
];

const activePath = computed(() => route.path);
const isMenuOpen = ref(false);
const isPopularListRoute = computed(() => route.path === '/popular-list');

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
  },
);

const hasHeroContent = computed(() => Boolean(props.eyebrow || props.title || props.description));
</script>

<template>
  <section
    class="info-nav-shell relative isolate w-full overflow-hidden text-[#212121]"
    :class="[
      isPopularListRoute
        ? 'bg-transparent shadow-none border-b border-[#efefef]'
        : 'bg-[#fff9e6] shadow-[0_35px_70px_rgba(15,23,42,0.08)]',
      { 'no-curve': isPopularListRoute },
    ]"
  >
    <div v-if="!isPopularListRoute" class="info-nav-accent" aria-hidden="true"></div>
    <div class="relative mx-auto flex w-full max-w-6xl flex-col px-4 pb-8 pt-6 sm:px-6 lg:px-8 lg:pb-12">
        <div class="flex min-h-[72px] items-center gap-4">
        <NuxtLink to="/" class="flex items-center gap-3" aria-label="Navigate to home">
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffd335] text-base font-semibold">
            Y
          </span>
          <span class="text-[22px] font-semibold tracking-wide">
            Yello<span class="text-base font-normal text-[#9e9e9e]">.mn</span>
          </span>
        </NuxtLink>

        <nav
          class="ml-2 hidden flex-1 items-center justify-center gap-8 text-sm font-semibold text-[#797979] md:flex"
          aria-label="Page navigation"
        >
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="relative flex flex-col items-center text-base transition-colors duration-200"
            :class="activePath === item.to ? 'text-[#212121]' : 'hover:text-[#212121]'"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="hidden items-center gap-3 text-sm font-semibold md:flex">
          <NuxtLink to="/auth/login" class="text-[#4a4a4a] transition-colors hover:text-[#212121]">
            Login
          </NuxtLink>
          <NuxtLink
            to="/agency"
            class="rounded-full border border-[#212121] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#212121] transition-all hover:bg-[#212121] hover:text-white"
          >
            List Your Agency
          </NuxtLink>
        </div>

        <button
          type="button"
          class="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#ffd335] bg-white/90 text-[#212121] shadow-sm transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#212121] md:hidden"
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
            <div v-if="isMenuOpen" class="info-mobile-overlay md:hidden" aria-hidden="true" @click="closeMenu" />
          </Transition>
          <Transition name="mobile-nav-drawer">
            <div
              v-if="isMenuOpen"
              id="info-mobile-nav"
              class="info-mobile-drawer md:hidden"
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
                  <NuxtLink
                    to="/auth/login"
                    class="w-full py-3 px-6 text-[#212121] font-semibold text-lg border-2 border-[#212121] rounded-lg hover:bg-[#212121] hover:text-white transition-all text-center no-underline"
                    @click="closeMenu"
                  >
                    Login
                  </NuxtLink>
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
  </section>
</template>

<style scoped>
.info-nav-shell {
  border-bottom-left-radius: 50% 32px;
  border-bottom-right-radius: 50% 32px;
}

.info-nav-shell.no-curve {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media (min-width: 640px) {
  .info-nav-shell {
    border-bottom-left-radius: 50% 48px;
    border-bottom-right-radius: 50% 48px;
  }
}

@media (min-width: 1024px) {
  .info-nav-shell {
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
