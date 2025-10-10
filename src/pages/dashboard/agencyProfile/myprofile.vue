<template>
    <div class="w-full space-y-6">
        <myProfile />
    </div>
  </template>
  
  <script setup>
  
  
  import myProfile from '@/components/AgencyProfile/myProfile.vue';

  definePageMeta({
    layout: "agencyprofile",
  });
  </script>
  