<template>
  <div class="w-full flex items-center gap-2 lg:gap-3 py-2 text-base text-black font-plus-jakarta-sans overflow-x-auto whitespace-nowrap sm:whitespace-normal sm:flex-wrap">
    <!-- Back Button -->
    <button 
      @click="goBack"
      class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 flex-shrink-0"
    >
      <ArrowLeft class="w-5 h-5 flex-shrink-0" />
      <span class="text-sm lg:text-base font-medium capitalize whitespace-nowrap">Back</span>
    </button>

    <!-- Breadcrumb -->
    <div class="flex flex-1 items-center gap-2 text-gray-600 min-w-0 overflow-x-auto whitespace-nowrap sm:whitespace-normal sm:flex-wrap">
      <!-- Static Agency label -->
      <div class="flex items-center gap-1">
        <span class="text-sm lg:text-base capitalize whitespace-nowrap">Agency</span>
        <ChevronRight class="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
      </div>

      <!-- Dynamic Agency Name -->
      <div class="flex items-center gap-1">
        <span class="text-sm lg:text-base capitalize whitespace-nowrap text-sky-500 font-medium">
          {{ agencyName || 'Unknown' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ChevronRight } from "lucide-vue-next";
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const props = defineProps<{ agencyName?: string }>();

const router = useRouter();

const agencyName = computed(() => props.agencyName || '');

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/');
  }
};
</script>

<style scoped>
.font-plus-jakarta-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
</style>