<template>
  <div class="w-full space-y-6">
   <dashboard />
  </div>
</template>

<script setup>
import dashboard from '@/components/agencyProfile/dashboard.vue';



definePageMeta({
  layout: "agencyProfile",
});
</script>
