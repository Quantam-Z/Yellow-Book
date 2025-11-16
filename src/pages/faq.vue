<script setup lang="ts">
import InfoPageNav from '~/components/common/infoPageNav.vue';
import Frequent from '~/components/common/frequent.vue';

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
  <main class="min-h-screen bg-[#fffefa] flex flex-col items-center">
    <InfoPageNav
      title="Frequently Asked Questions"
      description="Everything you need to know about using Yellow Book."
    />
    <Frequent />
  </main>
</template>
