<template>
  <div class="min-h-screen text-gray-800 flex flex-col" :class="isPopularListRoute ? 'bg-white' : 'bg-[#fffdf5]'">
    <InfoPageNav v-bind="infoNav" />

    <main class="flex-1 w-full">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import InfoPageNav from '@/components/common/infoPageNav.vue';
import Footer from '@/components/layout/footer.vue';

type InfoNavMeta = {
  eyebrow?: string;
  title: string;
  description?: string;
};

const route = useRoute();
const isPopularListRoute = computed(() => route.path === '/popular-list');

const infoNav = computed<InfoNavMeta>(() => {
  const meta = (route.meta?.infoNav ?? {}) as Partial<InfoNavMeta>;

  return {
    eyebrow: meta.eyebrow ?? '',
    title: meta.title ?? '',
    description: meta.description ?? '',
  };
});
</script>
