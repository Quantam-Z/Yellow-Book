<script setup lang="ts">
import { Star } from "lucide-vue-next";
import { computed } from 'vue';

const props = defineProps<{
  agencyName?: string,
  rating?: number,
  ratingCount?: number,
  tagline?: string,
  heroImage?: string,
  logoImage?: string,
}>();

const safeAgencyName = computed(() => props.agencyName || 'Agency');
const roundedRating = computed(() => Number(props.rating || 0).toFixed(1));
const ratingCountText = computed(() => `(${Number(props.ratingCount || 0)} reviews)`);
const taglineText = computed(() => props.tagline || '');
const heroImageSrc = computed(() => props.heroImage || '/logo/image6.png');
const logoImageSrc = computed(() => props.logoImage || '/logo/image7.png');
</script>

<template>
  <div class="w-[97%] max-w-7xl mx-auto flex flex-col items-center gap-6 text-center text-black font-plus-jakarta-sans px-4 sm:px-6 lg:px-8 py-2">

    <!-- Image Container -->
    <div class="relative w-full">
      <img 
        class="w-full h-auto object-cover rounded-lg" 
        :src="heroImageSrc" 
        alt="Main background" 
      />
      <img 
        class="absolute -bottom-16 sm:-bottom-20 md:-bottom-24 left-1/2 -translate-x-1/2 w-1/2 max-w-[150px] sm:w-1/3 sm:max-w-[180px] md:w-1/4 md:max-w-[200px] h-auto aspect-square object-cover rounded-lg"
        :src="logoImageSrc" 
        alt="Overlay logo" 
      />
    </div>

    <!-- Content Section -->
    <div class="flex flex-col items-center gap-5 pt-24 sm:pt-28 md:pt-32">
      <!-- Title and Description -->
      <div class="flex flex-col items-center gap-4">
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight capitalize">
          {{ safeAgencyName }}
        </h1>
        <p class="text-sm sm:text-base text-gray-600 leading-relaxed text-center max-w-2xl px-2">
          {{ taglineText }}
        </p>
      </div>

      <!-- Rating Section -->
      <div class="flex items-center gap-2 text-sm sm:text-base text-gray-600">
        <!-- Stars -->
        <div class="flex items-center gap-0.5">
          <Star v-for="n in 5" :key="n" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black" />
        </div>
        <!-- Rating Number -->
        <b class="leading-relaxed capitalize text-sm sm:text-base">{{ roundedRating }}</b>
        <!-- Reviews -->
        <span class="leading-relaxed font-medium text-gray-500 text-xs sm:text-sm">{{ ratingCountText }}</span>
      </div>
    </div>

  </div>
</template>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>
