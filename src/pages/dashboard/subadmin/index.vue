<template>
  <div class="w-full space-y-6">
   <dashboard />
  </div>
</template>

<script setup>
import dashboard from '~/components/SubAdmin/dashboard.vue';



definePageMeta({
  layout: "subadminPanel",
});
</script>
