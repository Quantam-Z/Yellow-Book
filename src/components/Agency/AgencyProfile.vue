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
  <div class="w-full flex flex-col items-center gap-6 text-center text-black font-plus-jakarta-sans">
    <!-- Image Container -->
    <div class="relative w-full max-w-7xl">
      <img 
        class="w-full h-auto object-cover  rounded-lg" 
        :src="heroImageSrc" 
        alt="Main background" 
      />
      <img 
        class="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 w-1/5 max-w-[200px] h-auto aspect-square object-cover rounded-lg" 
        :src="logoImageSrc" 
        alt="Overlay logo" 
      />
    </div>

    <!-- Content Section -->
    <div class="flex flex-col items-center gap-5 pt-32">
      <!-- Title and Description -->
      <div class="flex flex-col items-center gap-4">
        <h1 class="text-4xl lg:text-5xl font-bold leading-tight capitalize">
          {{ safeAgencyName }}
        </h1>
        <p class="text-base text-gray-600 leading-relaxed text-center max-w-2xl">
          {{ taglineText }}
        </p>
      </div>

      <!-- Rating Section -->
      <div class="flex items-center gap-2 text-base text-gray-600">
        <!-- Stars -->
        <div class="flex items-center">
          <Star v-for="n in 5" :key="n" class="w-6 h-6 text-black" />
        </div>
        <!-- Rating Number -->
        <b class="leading-relaxed capitalize">{{ roundedRating }}</b>
        <!-- Reviews -->
        <span class="leading-relaxed font-medium text-gray-500">{{ ratingCountText }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Tablet */
@media (max-width: 1024px) {
  .text-4xl {
    font-size: 2rem;
  }
  .w-1\/5 {
    width: 25%;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .text-4xl {
    font-size: 1.5rem;
  }
  .w-1\/5 {
    width: 35%;
  }
  .text-base {
    font-size: 0.9rem;
  }
}
</style>