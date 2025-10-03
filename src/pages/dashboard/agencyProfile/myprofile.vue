<template>
    <div class="w-full space-y-6">
        <myProfile />
    </div>
  </template>
  
  <script setup>
  
  
  import myProfile from '@/components/common/AgencyProfile/myProfile.vue';

  definePageMeta({
    layout: "agencyprofile",
  });
  </script>
  