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
  <div class="w-full relative bg-[#fcc207] mt-12">
    <div
      class="w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-[120px] grid grid-cols-2 md:grid-cols-4 gap-6 text-left text-white font-['Plus_Jakarta_Sans'] items-stretch"
    >
      <div
        v-for="card in statCards"
        :key="card.id"
        class="flex items-center p-6 md:p-8 gap-4 bg-[#e5b106] rounded-lg w-full h-full"
      >
        <img class="w-16 h-auto flex-shrink-0" :src="card.iconSrc" :alt="card.altText" />
        <div class="flex flex-col justify-center gap-3 flex-1">
          <b class="text-4xl md:text-5xl font-bold leading-none capitalize sm:text-3xl">{{ card.value }}</b>
          <div class="text-base font-semibold leading-normal capitalize">{{ card.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style>
/* Custom utility for extra small screens (xs:text-3xl) */
@media (max-width: 400px) {
  .xs\:text-3xl {
    font-size: 1.875rem; /* ~30px */
  }
}
</style>