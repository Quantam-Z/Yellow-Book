<template>
  <div class="min-h-screen bg-[#fffdf5] text-gray-800 flex flex-col">
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

const infoNav = computed<InfoNavMeta>(() => {
  const meta = (route.meta?.infoNav ?? {}) as Partial<InfoNavMeta>;

  return {
    eyebrow: meta.eyebrow ?? '',
    title: meta.title ?? '',
    description: meta.description ?? '',
  };
});
</script>
