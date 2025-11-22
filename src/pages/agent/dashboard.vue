<template>
  <div class="panel-stack w-full">
   <Dashboard />
  </div>
</template>

<script setup>
import Dashboard from '~/components/SubAdmin/dashboard.vue';



definePageMeta({
  layout: "agentpanel",
});
</script>
