<script setup>
import { Star } from "lucide-vue-next";
import { ref, onMounted } from 'vue';

const agencyName = ref("Creative Agency");

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  agencyName.value = decodeURIComponent(params.get("title") || "Creative Agency");
});
</script>

<template>
  <div class="w-full flex flex-col items-center gap-6 text-center text-black font-plus-jakarta-sans">
    <!-- Image Container -->
    <div class="relative w-full max-w-7xl">
      <img 
        class="w-full h-auto object-cover  rounded-lg" 
        src="/logo/image6.png" 
        alt="Main background" 
      />
      <img 
        class="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 w-1/5 max-w-[200px] h-auto aspect-square object-cover rounded-lg" 
        src="/logo/image7.png" 
        alt="Overlay logo" 
      />
    </div>

    <!-- Content Section -->
    <div class="flex flex-col items-center gap-5 pt-32">
      <!-- Title and Description -->
      <div class="flex flex-col items-center gap-4">
        <h1 class="text-4xl lg:text-5xl font-bold leading-tight capitalize">
          {{ agencyName }}
        </h1>
        <p class="text-base text-gray-600 leading-relaxed text-center max-w-2xl">
          Innovative technology solutions for modern businesses
        </p>
      </div>

      <!-- Rating Section -->
      <div class="flex items-center gap-2 text-base text-gray-600">
        <!-- Stars -->
        <div class="flex items-center">
          <Star class="w-6 h-6 text-black" />
          <Star class="w-6 h-6 text-black" />
          <Star class="w-6 h-6 text-black" />
          <Star class="w-6 h-6 text-black" />
          <Star class="w-6 h-6 text-black" />
        </div>
        <!-- Rating Number -->
        <b class="leading-relaxed capitalize">4.8</b>
        <!-- Reviews -->
        <span class="leading-relaxed font-medium text-gray-500">(458 reviews)</span>
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