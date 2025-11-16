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
  { label: 'Popular Listing', to: '/popular-list' },
  { label: 'FAQ', to: '/faq' },
];

const activePath = computed(() => route.path);
</script>

<template>
  <section class="w-full bg-gradient-to-b from-[#fff9e6] via-[#fffdf5] to-[#fffefa]">
    <div
      class="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-10 text-center sm:px-6 sm:py-12 lg:px-8 lg:py-14"
    >
      <div class="flex w-full flex-col items-center gap-3">
        <p v-if="props.eyebrow" class="text-xs uppercase tracking-[0.3em] text-[#9e9e9e]">
          {{ props.eyebrow }}
        </p>
        <h1 class="text-3xl font-semibold leading-tight text-[#212121] sm:text-[40px]">
          {{ props.title }}
        </h1>
        <p v-if="props.description" class="max-w-3xl text-base text-[#616161] sm:text-lg">
          {{ props.description }}
        </p>
      </div>

      <nav
        class="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-[#fde38d] bg-white/70 p-2 shadow-sm backdrop-blur"
        aria-label="Secondary Navigation"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold transition-all sm:text-base"
          :class="
            activePath === item.to
              ? 'bg-[#212121] text-white shadow-lg'
              : 'text-[#616161] hover:bg-[#fff5d1]'
          "
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </section>
</template>
