<template>
      <div>
        <CatagoryHead />
        <CatagoryBanner />
        <CatagorySearch />
        <CatagoryDetails />
        <Footer />
      </div>
    </template>
    
    <script setup lang="ts">
    import CatagoryHead from '~/components/Catagory/CatagoryHead.vue';
    import Footer from '~/components/layout/Footer.vue';
import CatagoryBanner from '~/components/Catagory/CatagoryBanner.vue';
import CatagoryDetails from '~/components/Catagory/CatagoryDetails.vue';
import CatagorySearch from '~/components/Catagory/CatagorySearch.vue';
    
    definePageMeta({
      layout: 'catagory',
    });
    </script>
    