<script setup lang="ts">
import Frequent from '~/components/common/frequent.vue';

definePageMeta({
  layout: 'info-page',
  infoNav: {
    title: 'Frequently Asked Questions',
    description: 'Everything you need to know about using Yellow Book.',
  },
});

useHead({
  title: 'FAQ • Yellow Book',
  meta: [
    {
      name: 'description',
      content: 'Answers to the most common questions about joining and using Yellow Book.',
    },
  ],
});
</script>

<template>
  <section class="bg-transparent flex flex-col items-center">
    <Frequent />
  </section>
</template>
