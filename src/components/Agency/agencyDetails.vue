<template>
  <div class="w-full my-2 bg-[#fff5f5] border border-[#eee] box-border flex flex-col items-start gap-4 sm:gap-6 text-left text-xl sm:text-2xl text-[#424242] font-plus-jakarta-sans py-2">
    <div class="w-full px-4 lg:px-6 leading-[130%] capitalize font-medium text-lg sm:text-xl">About the Agency</div>
      <div class="w-full px-4 lg:px-6 text-[15px] sm:text-base leading-[160%] sm:leading-[150%] font-medium text-[#616161]">
        {{ about || defaultAbout }}
      </div>
    </div>
   </template>
  
   <script setup lang="ts">
   const props = defineProps<{ about?: string }>();
   const defaultAbout = 'Mongolia Explorer Travel specializes in authentic Mongolian adventures, offering unique cultural experiences and breathtaking wilderness tours. With over 8 years of expertise, we provide unforgettable journeys through the vast steppes, dramatic landscapes, and rich nomadic heritage of Mongolia.';
   </script>