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
  <section class="w-full">
      <div class="border-b border-[#ededed] bg-white">
        <div class="mx-auto flex w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
          <div class="flex h-20 items-center gap-3">
            <NuxtLink to="/" class="flex items-center gap-3 text-[#212121]" aria-label="Navigate to home">
              <span class="flex h-9 w-9 items-center justify-center rounded bg-[#ffd335] text-sm font-semibold text-[#212121]">
                Y
              </span>
              <span class="text-[22px] font-semibold tracking-wide">
                Yello<span class="text-base font-normal text-[#9e9e9e]">.mn</span>
              </span>
            </NuxtLink>

            <nav
              class="ml-6 hidden flex-1 items-center gap-8 text-[15px] font-medium text-[#9e9e9e] md:flex"
              aria-label="Page navigation"
            >
              <NuxtLink
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                class="relative pb-2 transition-colors duration-200"
                :class="activePath === item.to ? 'text-[#212121]' : 'hover:text-[#212121]'"
              >
                {{ item.label }}
                <span
                  class="pointer-events-none absolute bottom-0 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-[#212121] transition-opacity duration-200"
                  :class="activePath === item.to ? 'opacity-100' : 'opacity-0'"
                ></span>
              </NuxtLink>
            </nav>

            <div class="hidden items-center gap-4 text-sm font-semibold text-[#212121] md:flex">
              <NuxtLink to="/auth/login" class="font-medium text-[#4a4a4a] transition-colors hover:text-[#212121]">
                Login
              </NuxtLink>
              <NuxtLink
                to="/agency"
                class="rounded border border-[#212121] px-5 py-2 text-center text-sm font-semibold uppercase tracking-wide transition-all hover:bg-[#212121] hover:text-white"
              >
                List Your Agency
              </NuxtLink>
            </div>

            <button
              type="button"
              class="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e5e5] text-[#212121] shadow-sm transition hover:border-[#212121] hover:text-[#212121] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#212121] md:hidden"
              :aria-expanded="isMenuOpen"
              aria-controls="info-mobile-nav"
              @click="toggleMenu"
            >
              <span class="sr-only">Toggle navigation menu</span>
              <Menu v-if="!isMenuOpen" class="h-5 w-5" aria-hidden="true" />
              <X v-else class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div
            v-if="isMenuOpen"
            id="info-mobile-nav"
            class="flex flex-col gap-4 border-t border-[#f1f1f1] py-4 text-center md:hidden"
          >
            <nav class="flex flex-col gap-3 text-base font-medium text-[#212121]" aria-label="Page navigation">
              <NuxtLink
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                class="rounded-full px-4 py-2 transition-colors duration-200"
                :class="activePath === item.to ? 'bg-[#212121]/5 text-[#212121]' : 'text-[#9e9e9e] hover:text-[#212121]'"
                @click="closeMenu"
              >
                {{ item.label }}
              </NuxtLink>
            </nav>
            <div class="flex flex-col gap-3 text-sm font-semibold text-[#212121]">
              <NuxtLink
                to="/auth/login"
                class="rounded-full border border-[#e5e5e5] px-4 py-2 font-medium text-[#4a4a4a] transition hover:border-[#212121] hover:text-[#212121]"
                @click="closeMenu"
              >
                Login
              </NuxtLink>
              <NuxtLink
                to="/agency"
                class="rounded-full border border-[#212121] px-4 py-2 uppercase tracking-wide transition hover:bg-[#212121] hover:text-white"
                @click="closeMenu"
              >
                List Your Agency
              </NuxtLink>
            </div>
          </div>
      </div>
    </div>

    <div
      v-if="hasHeroContent"
      class="bg-gradient-to-b from-[#fff9e6] via-[#fffdf5] to-[#fffefa] px-4 py-10 text-center sm:px-6 sm:py-12 lg:px-8 lg:py-14"
    >
      <div class="mx-auto flex w-full max-w-4xl flex-col items-center gap-3">
        <p v-if="props.eyebrow" class="text-xs uppercase tracking-[0.3em] text-[#9e9e9e]">
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
