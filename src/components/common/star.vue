<script setup lang="ts">
import { ref } from 'vue';

interface StatCard {
  id: number;
  iconSrc: string;
  altText: string;
  value: string;
  label: string;
}

const statCards = ref<StatCard[]>([
  {
    id: 1,
    iconSrc: '/Frame(7).svg',
    altText: 'Agency Icon',
    value: '1548',
    label: 'Verified agencies',
  },
  {
    id: 2,
    iconSrc: '/Frame(8).svg',
    altText: 'Users Icon',
    value: '5000+',
    label: 'Users',
  },
  {
    id: 3,
    iconSrc: '/Frame(9).svg',
    altText: 'Reviews Icon',
    value: '25k+',
    label: 'Reviews',
  },
  {
    id: 4,
    iconSrc: '/Frame(10).svg',
    altText: 'Category Icon',
    value: '145+',
    label: 'Category',
  },
]);
</script>

<template>
  <div class="w-full relative bg-gradient-to-r from-primary-200 to-primary-300 flex items-center justify-start mt-16 overflow-x-auto stat-scroll-container shadow-2xl">
    <div 
      class="flex flex-row items-center justify-start lg:justify-center px-6 lg:px-40 md:px-24 gap-8 text-left text-white font-['Plus_Jakarta_Sans'] flex-nowrap"
      :class="{ 'w-full': statCards.length <= 4 }"
    >
      <div 
        v-for="card in statCards"
        :key="card.id"
        class="flex items-center p-12 sm:p-8 gap-6 bg-gradient-to-br from-primary-300 to-primary-400 min-w-[320px] flex-shrink-0 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        <div class="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
          <img class="w-20 h-20 flex-shrink-0" :src="card.iconSrc" :alt="card.altText" />
        </div>
        <div class="flex flex-col justify-center gap-4 flex-1">
          <b class="text-6xl font-black leading-none capitalize sm:text-5xl xs:text-4xl drop-shadow-lg">{{ card.value }}</b>
          <div class="text-lg font-bold leading-normal capitalize drop-shadow-md">{{ card.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style>
/* 1. Hide the scrollbar for a cleaner look while retaining horizontal scrolling 
2. Define custom utility for extra small screens (xs:text-3xl)
*/

.stat-scroll-container {
    /* Hide scrollbar for Chrome, Safari and Opera */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
.stat-scroll-container::-webkit-scrollbar {
    display: none;
}

/* Defining custom utilities for smaller breakpoints not directly supported by Tailwind default.
    This ensures proper scaling on extra small screens.
*/
@media (max-width: 400px) {
    .xs\:text-3xl {
        font-size: 1.875rem; /* ~30px */
    }
}
</style>