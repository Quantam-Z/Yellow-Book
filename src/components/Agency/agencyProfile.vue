<template>
  <div class="w-full flex flex-col items-center gap-6 text-center text-black font-plus-jakarta-sans py-2">

    <div class="relative w-full">
      <img 
        class="w-full h-auto md:h-[70vh] object-cover rounded-lg" 
        :src="heroImageSrc" 
        alt="Main background" 
      />
      
      <div 
        class="absolute -bottom-16 sm:-bottom-20 md:-bottom-24 left-1/2 -translate-x-1/2 
               w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 
               flex items-center justify-center p-1 sm:p-1.5 
               bg-white rounded-lg shadow-md"
      >
        <img 
          class="w-full h-full object-cover rounded-lg"
          :src="logoImageSrc" 
          alt="Overlay logo" 
        />
      </div>
    </div>

    <div class="flex flex-col items-center gap-5 pt-24 sm:pt-28 md:pt-32">
      <div class="flex flex-col items-center gap-4">
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight capitalize">
          {{ safeAgencyName }}
        </h1>
        <p class="text-sm sm:text-base text-gray-600 leading-relaxed text-center w-full">
          {{ taglineText }}
        </p>
      </div>

      <div class="flex items-center gap-2 text-sm sm:text-base text-gray-600">
        <RatingStars
          :rating="Number(props.rating || 0)"
          :max="5"
          size="sm"
          color="#FFC107"
          empty-color="#E0E0E0"
          stroke-color="#FFC107"
          :gap="2"
          :show-value="false"
        />
        <b class="leading-relaxed capitalize text-sm sm:text-base">{{ roundedRating }}</b>
        <span class="leading-relaxed font-medium text-gray-500 text-xs sm:text-sm">{{ ratingCountText }}</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import RatingStars from '@/components/common/RatingStars.vue';

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
// UPDATED DEFAULT: The tagline will default to this text if not provided
const taglineText = computed(() => props.tagline || 'Your trusted partner for global adventures and professional services.');
const heroImageSrc = computed(() => props.heroImage || '/logo/image6.png');
const logoImageSrc = computed(() => props.logoImage || '/logo/image7.png');
</script>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>