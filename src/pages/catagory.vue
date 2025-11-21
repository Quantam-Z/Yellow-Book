<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import CatagoryBanner from '~/components/Catagory/catagoryBanner.vue';
import CatagoryDetails from '~/components/Catagory/catagoryDetails.vue';
import CatagoryHead from '~/components/Catagory/catagoryHead.vue';
import CatagorySearch from '~/components/Catagory/catagorySearch.vue';
import CatagoryGrid from '~/components/common/catagory.vue';

definePageMeta({
  layout: 'info-page',
});

useHead({
  title: 'Categories • Yellow Book',
  meta: [
    {
      name: 'description',
      content: 'Explore all Yellow Book categories and jump straight into the services that match your brief.',
    },
  ],
});

const route = useRoute();

const categoryName = computed(() => {
  const raw = route.query.name;
  if (typeof raw !== 'string') return '';
  return decodeURIComponent(raw).replace(/\+/g, ' ').trim();
});

const showCategoryDetails = computed(() => categoryName.value.length > 0);
</script>

<template>
  <section
    v-if="!showCategoryDetails"
    class="w-full bg-transparent px-4 pb-16 pt-10 sm:px-6 lg:px-8"
  >
    <div class="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center text-[#212121]">
      <p class="text-xs font-semibold uppercase tracking-[0.35em] text-[#a67c00]">All listings</p>
      <h1 class="text-3xl font-bold sm:text-[40px]">Discover categories</h1>
      <p class="text-base text-[#616161] sm:text-lg">
        Jump into any niche—from creative studios to legal experts—and find trusted partners ready to help.
      </p>
    </div>

    <CatagoryGrid />
  </section>

  <section
    v-else
    class="w-full bg-white px-0 pb-16 pt-4 sm:px-4 md:px-6 lg:px-8"
  >
    <div class="flex flex-col gap-4">
      <CatagoryHead />
      <CatagoryBanner />
      <CatagorySearch :category-name="categoryName" />
      <CatagoryDetails :key="categoryName" />
    </div>
  </section>
</template>
    