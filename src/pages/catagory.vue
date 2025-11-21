<script setup lang="ts">
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
</script>

<template>
  <section class="w-full bg-transparent px-4 pb-16 pt-10 sm:px-6 lg:px-8">
    <div class="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center text-[#212121]">
      <p class="text-xs font-semibold uppercase tracking-[0.35em] text-[#a67c00]">All listings</p>
      <h1 class="text-3xl font-bold sm:text-[40px]">Discover categories</h1>
      <p class="text-base text-[#616161] sm:text-lg">
        Jump into any niche—from creative studios to legal experts—and find trusted partners ready to help.
      </p>
    </div>

    <CatagoryGrid />
  </section>
</template>
    