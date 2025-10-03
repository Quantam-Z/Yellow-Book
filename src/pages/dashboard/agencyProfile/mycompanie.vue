<template>
    <div class="w-full space-y-6">
        <mycompanie />
    </div>
  </template>
  
  <script setup>
  
  
  import mycompanie from '@/components/common/AgencyProfile/mycompany.vue';

  definePageMeta({
    layout: "agencyprofile",
  });
  </script>
  