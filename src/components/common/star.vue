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
  <div class="w-full relative bg-[#fcc207] mt-12 py-[clamp(1.5rem,3vw,3rem)]">
    <div
      class="w-full mx-auto px-[clamp(1rem,3vw,5rem)] grid grid-cols-2 md:grid-cols-4 gap-[clamp(0.75rem,1.5vw,1.5rem)] text-left text-white font-['Plus_Jakarta_Sans'] items-stretch"
    >
      <div
        v-for="card in statCards"
        :key="card.id"
        class="flex items-center p-[clamp(1rem,2vw,2rem)] gap-[clamp(0.75rem,1.5vw,1.5rem)] bg-[#e5b106] rounded-lg w-full h-full"
      >
        <img class="w-[clamp(2.75rem,5vw,4.5rem)] h-auto flex-shrink-0" :src="card.iconSrc" :alt="card.altText" />
        <div class="flex flex-col justify-center gap-[clamp(0.25rem,0.6vw,0.75rem)] flex-1">
          <b class="text-[clamp(1.75rem,4.2vw,3.5rem)] font-bold leading-none capitalize">{{ card.value }}</b>
          <div class="text-[clamp(0.9rem,1.2vw,1.125rem)] font-semibold leading-normal capitalize">{{ card.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
  