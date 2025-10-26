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
  <div class="w-screen relative bg-[#fcc207] flex items-center justify-start mt-12 overflow-x-auto stat-scroll-container ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)]">
    <div 
      class="flex flex-row items-center justify-start lg:justify-center px-4 lg:px-32 md:px-20 gap-6 text-left text-white font-['Plus_Jakarta_Sans'] flex-nowrap"
      :class="{ 'w-full': statCards.length <= 4 }"
    >
      <div 
        v-for="card in statCards"
        :key="card.id"
        class="flex items-center p-10 sm:p-6 gap-4 bg-[#e5b106] min-w-[280px] flex-shrink-0"
      >
        <img class="w-16 h-auto flex-shrink-0" :src="card.iconSrc" :alt="card.altText" />
        <div class="flex flex-col justify-center gap-3 flex-1">
          <b class="text-5xl font-bold leading-none capitalize sm:text-4xl xs:text-3xl">{{ card.value }}</b>
          <div class="text-base font-semibold leading-normal capitalize">{{ card.label }}</div>
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