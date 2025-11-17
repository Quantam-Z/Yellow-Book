<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

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

const hasHeroContent = computed(() => Boolean(props.eyebrow || props.title || props.description));
</script>

<template>
  <section class="w-full">
    <div class="border-b border-[#e0e0e0] bg-white">
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <NuxtLink to="/" class="flex items-center gap-3 text-[#212121]" aria-label="Navigate to home">
            <span
              class="flex h-8 w-8 items-center justify-center rounded bg-[#ffd335] text-sm font-semibold text-[#212121]"
            >
              Y
            </span>
            <span class="text-xl font-semibold tracking-wide">
              Yello<span class="text-base font-normal text-[#9e9e9e]">.mn</span>
            </span>
          </NuxtLink>

          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-end md:gap-8 md:flex-1">
            <nav
              class="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-[#9e9e9e] md:flex-1 md:justify-center"
              aria-label="Page navigation"
            >
              <NuxtLink
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                class="relative pb-2 text-[15px] transition-colors duration-200 sm:text-base"
                :class="activePath === item.to ? 'text-[#212121]' : 'text-[#9e9e9e] hover:text-[#212121]'"
              >
                {{ item.label }}
                <span
                  class="pointer-events-none absolute bottom-0 left-0 right-0 mx-auto h-[2px] w-6 rounded-full bg-[#212121] transition-opacity duration-200"
                  :class="activePath === item.to ? 'opacity-100' : 'opacity-0'"
                ></span>
              </NuxtLink>
            </nav>

            <div class="flex flex-col items-center gap-3 text-sm font-semibold text-[#212121] sm:flex-row">
              <NuxtLink
                to="/auth/login"
                class="font-medium text-[#4a4a4a] transition-colors hover:text-[#212121]"
              >
                Login
              </NuxtLink>
              <NuxtLink
                to="/agency"
                class="w-full rounded border border-[#212121] px-4 py-2 text-center text-sm font-semibold uppercase tracking-wide transition-all hover:bg-[#212121] hover:text-white sm:w-auto"
              >
                List Your Agency
              </NuxtLink>
            </div>
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

