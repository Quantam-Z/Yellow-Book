<template>
    <div>
      <Agencydetails />
    </div>
  </template>
  
  <script setup lang="ts">
  import Agencydetails from '~/components/common/Agencydetails.vue';
  
  definePageMeta({
    layout: 'catagory',
  });
  </script>