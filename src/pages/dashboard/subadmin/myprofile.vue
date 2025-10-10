<!-- src/pages/dashboard/admin/index.vue -->
<template>
    <div class="w-full space-y-6">
      <myprofile />
    </div>
  </template>
  
  <script setup>

  import myprofile from '~/components/SubAdmin/myprofile.vue';
  definePageMeta({
    layout: "subadminpanel",
  });
  </script>
  