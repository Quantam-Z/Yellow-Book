<script setup lang="ts">
import Frequent from '~/components/common/frequent.vue';

definePageMeta({
  layout: 'info-page',
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
  <section class="flex flex-col items-center bg-transparent px-4 pb-16 pt-10 text-center sm:px-6 lg:px-8">
    <div class="mx-auto flex max-w-3xl flex-col items-center gap-3 text-[#212121]">
      <p class="text-xs font-semibold uppercase tracking-[0.35em] text-[#a67c00]">Support center</p>
      <h1 class="text-3xl font-bold sm:text-[40px]">Frequently Asked Questions</h1>
      <p class="text-base text-[#616161] sm:text-lg">
        Everything you need to know about using Yellow Book. Can’t find the answer you’re looking for? Reach out anytime.
      </p>
    </div>

    <Frequent />
  </section>
</template>
