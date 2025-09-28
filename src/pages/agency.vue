<template>
    <div>
      <AgencyHead />
      <CommonAgencyProfile />
      <CommonAgencyDetails />
      <CommonAgencyContact />
      <CommonAgencyReview />
    </div>
  </template>
  
  <script setup lang="ts">
  import CommonAgencyProfile from '~/components/common/Agency/AgencyProfile.vue';
import AgencyHead from '~/components/common/Agency/AgencyHead.vue';
  
  definePageMeta({
    layout: 'catagory',
  });
  </script>