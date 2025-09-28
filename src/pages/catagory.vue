<template>
      <div>
        <CatagoryHead />
        <CommonCatagoryBanner />
        <CommonCatagorySearch />
        <CommonCatagoryDetails />
     
      </div>
    </template>
    
    <script setup lang="ts">
import CatagoryHead from '~/components/common/Catagory/CatagoryHead.vue';
    
    definePageMeta({
      layout: 'catagory',
    });
    </script>