<template>
  <div class="w-full flex flex-wrap items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2 text-base text-black font-plus-jakarta-sans">
    <!-- Back button -->
    <button 
      @click="goBack"
      class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 flex-shrink-0"
    >
      <ArrowLeft class="w-5 h-5 flex-shrink-0" />
      <span class="text-sm lg:text-base font-medium capitalize whitespace-nowrap">Back</span>
    </button>

    <!-- Breadcrumb -->
    <div class="flex flex-1 flex-wrap items-center gap-2 text-gray-600 min-w-0">
      <!-- category -->
      <div class="flex items-center gap-1">
        <span class="text-sm lg:text-base capitalize whitespace-nowrap">category</span>
        <ChevronRight class="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
      </div>

      <!-- Dynamic category Name -->
      <div class="flex items-center gap-1">
        <span class="text-sm lg:text-base capitalize whitespace-nowrap text-sky-500 font-medium">
          {{ categoryName || 'Unknown' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft, ChevronRight } from "lucide-vue-next";
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const route = useRoute();

const categoryName = computed(() => {
  const rawName = route.query.name;
  return rawName ? decodeURIComponent(rawName).replace(/\+/g, ' ') : null;
});

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/');
  }
};
</script>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

@media (max-width: 480px) {
  .flex-wrap {
    flex-wrap: nowrap !important;
    overflow-x: auto;
    gap: 8px;
  }

  .flex-wrap > * {
    flex-shrink: 0;
  }

  .flex-wrap::-webkit-scrollbar {
    display: none;
  }

  .flex-wrap {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
</style>
