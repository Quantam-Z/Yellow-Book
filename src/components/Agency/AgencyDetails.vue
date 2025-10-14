<template>
  <div class="w-[95%] mx-auto my-2 bg-[#fff5f5] border border-[#eee] box-border flex flex-col items-start p-8 gap-6 text-left text-2xl text-[#424242] font-plus-jakarta-sans sm:p-6 sm:text-xl md:p-5">
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

