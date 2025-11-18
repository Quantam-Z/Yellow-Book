<template>
  <div class="w-full space-y-6">
   <Dashboard />
  </div>
</template>

<script setup>
import Dashboard from '~/components/Company/dashboard.vue';

definePageMeta({
  layout: "company",
});
</script>
