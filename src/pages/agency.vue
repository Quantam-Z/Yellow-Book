<template>
    <div>
      <AgencyHead />
      <CommonAgencyProfile />
      <AgencyDetails />
      <AgencyContact />
      <AgencyReview />
      <Footer />

    </div>
  </template>
  
  <script setup lang="ts">
  import CommonAgencyProfile from '@/components/Agency/AgencyProfile.vue';
import AgencyHead from '@/components/Agency/AgencyHead.vue';
import AgencyDetails from '@/components/Agency/AgencyDetails.vue';
import AgencyContact from '@/components/Agency/AgencyContact.vue';
import AgencyReview from '@/components/Agency/AgencyReview.vue';



import Footer from '@/components/layout/Footer.vue';

  
  definePageMeta({
    layout: 'catagory',
  });
  </script>