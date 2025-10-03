<template>
  <div class="w-full space-y-6">
   <Dashboard />
  </div>
</template>

<script setup>
import Dashboard from '@/components/common/AgencyProfile/Dashboard.vue';



definePageMeta({
  layout: "agencyprofile",
});
</script>
