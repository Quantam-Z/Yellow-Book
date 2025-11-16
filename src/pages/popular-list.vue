<script setup lang="ts">
import InfoPageNav from '~/components/common/infoPageNav.vue';
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
    <InfoPageNav
      eyebrow="Discover top-rated partners"
      title="Popular list"
      description="Explore high-performing companies across industries. Filter by category, city, or service to find the right fit for your next project."
    />
    <PopularList />
  </main>
</template>
