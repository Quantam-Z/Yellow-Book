<template>
    <div>
      <AgencyHead />
      <CommonAgencyProfile />
      <CommonAgencyDetails />
      <CommonAgencyContact />
      <CommonAgencyReview />
      <Footer />

    </div>
  </template>
  
  <script setup lang="ts">
  import CommonAgencyProfile from '~/components/common/Agency/AgencyProfile.vue';
import AgencyHead from '~/components/common/Agency/AgencyHead.vue';
import Footer from '~/components/layout/Footer.vue';

  
  definePageMeta({
    layout: 'catagory',
  });
  </script>