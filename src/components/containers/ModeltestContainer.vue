<template>
    <div class="text-left">
      <div class="grid grid-cols-2 md:grid-cols-4 mt-6 gap-6 px-4 md:px-2">
        <div v-for="(model, i) in modeltest" :key="i">
          <CommonCardsCourseCard :item="model" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    modeltest: { type: Array, default: () => [] }
  })
  </script>