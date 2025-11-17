<script setup lang="ts">
import PopularList from '~/components/common/popularList.vue';

definePageMeta({
  layout: 'info-page',
  infoNav: {
    eyebrow: 'Discover top-rated partners',
    title: 'Popular list',
    description:
      'Explore high-performing companies across industries. Filter by category, city, or service to find the right fit for your next project.',
  },
});

useHead({
  title: 'Popular List • Yellow Book',
  meta: [
    {
      name: 'description',
      content: 'Browse the most popular Yellow Book listings with filters, smart search, and responsive cards.',
    },
  ],
});
</script>

<template>
  <section class="bg-transparent">
    <PopularList />
  </section>
</template>
