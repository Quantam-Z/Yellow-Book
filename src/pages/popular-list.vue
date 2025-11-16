<script setup lang="ts">
import PopularList from '~/components/common/popularList.vue';

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
  <main class="min-h-screen bg-[#fffdf5]">
    <PopularList />
  </main>
</template>
