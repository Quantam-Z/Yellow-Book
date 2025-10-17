<template>
<div class="w-[93%] mx-auto my-2 bg-[#fff5f5] border border-[#eee] box-border flex flex-col items-start gap-6 text-left text-2xl text-[#424242] font-plus-jakarta-sans px-4 lg:px-6 py-2 sm:text-xl">
  <div class="leading-[130%] capitalize font-medium text-xl sm:text-lg">About the Agency</div>
    <div class="w-full text-base leading-[160%] capitalize font-medium text-[#616161] sm:text-[15px] sm:leading-[150%]">
      {{ about || defaultAbout }}
    </div>
  </div>
 </template>

 <script setup lang="ts">
 const props = defineProps<{ about?: string }>();
 const defaultAbout = 'Discover our agency — delivering quality services with excellence.';
 </script>

