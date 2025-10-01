<template>
  <!-- Page content goes here -->
  <div
    class="w-full relative rounded-num-8 flex flex-col items-start p-num-24 box-border gap-7 
           bg-cover bg-no-repeat bg-[top] text-left text-num-16 text-gray-200 font-plus-jakarta-sans"
  >
    <WelcomeComponent />
  </div>
</template>

<script setup lang="ts">
import WelcomeComponent from '@/components/common/Admin/Welcome.vue';

// Tell Nuxt to use adminpanel layout
definePageMeta({
  layout: 'adminpanel',
});
</script>
