<script setup lang="ts">
import PopularList from '~/components/common/popularList.vue';

definePageMeta({
  layout: 'info-page',
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
  <section class="min-h-screen w-full bg-white">
    <PopularList />
  </section>
</template>
