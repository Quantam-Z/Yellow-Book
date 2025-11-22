<template>
  <div class="w-full space-y-6">
   <Dashboard />
  </div>
</template>

<script setup>
import Dashboard from '~/components/SubAdmin/dashboard.vue';



definePageMeta({
  layout: "subadminpanel",
});
</script>
