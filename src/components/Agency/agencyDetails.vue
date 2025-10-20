<template>
<div class="w-full my-2 bg-[#fff5f5] border border-[#eee] box-border flex flex-col items-start gap-4 sm:gap-6 text-left text-xl sm:text-2xl text-[#424242] font-plus-jakarta-sans py-2">
  <div class="leading-[130%] capitalize font-medium text-lg sm:text-xl">About the Agency</div>
    <div class="w-full text-[15px] sm:text-base leading-[160%] sm:leading-[150%] font-medium text-[#616161]">
      {{ about || defaultAbout }}
    </div>
  </div>
 </template>

 <script setup lang="ts">
 const props = defineProps<{ about?: string }>();
 const defaultAbout = 'Discover our agency — delivering quality services with excellence.';
 </script>

