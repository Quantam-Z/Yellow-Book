<template>
  <div class="min-h-screen text-gray-800 flex flex-col" :class="usesFlatShell ? 'bg-white' : 'bg-[#fffdf5]'">
    <InfoPageNav v-if="!shouldHideNav" v-bind="infoNav" />

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
const flatNavRoutes = ['/popular-list', '/faq', '/catagory'];
const usesFlatShell = computed(() => flatNavRoutes.includes(route.path));
const shouldHideNav = computed(() => {
  if (route.path !== '/catagory') {
    return false;
  }

  const raw = route.query?.name;
  if (Array.isArray(raw)) {
    return raw.some((value) => typeof value === 'string' && value.trim().length > 0);
  }
  if (typeof raw === 'string') {
    return raw.trim().length > 0;
  }
  return false;
});

const infoNav = computed<InfoNavMeta>(() => {
  const meta = (route.meta?.infoNav ?? {}) as Partial<InfoNavMeta>;

  return {
    eyebrow: meta.eyebrow ?? '',
    title: meta.title ?? '',
    description: meta.description ?? '',
  };
});
</script>
