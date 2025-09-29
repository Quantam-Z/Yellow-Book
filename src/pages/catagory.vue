<template>
      <div>
        <CatagoryHead />
        <CommonCatagoryBanner />
        <CommonCatagorySearch />
        <CommonCatagoryDetails />
        <Footer />
      </div>
    </template>
    
    <script setup lang="ts">
    import CatagoryHead from '~/components/common/Catagory/CatagoryHead.vue';
    import Footer from '~/components/layout/Footer.vue';
    
    definePageMeta({
      layout: 'catagory',
    });
    </script>
    