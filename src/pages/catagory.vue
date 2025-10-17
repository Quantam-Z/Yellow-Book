<template>
      <div>
        <catagoryHead />
        <catagoryBanner />
        <catagorysearch />
        <catagoryDetails />
        <footer />
      </div>
    </template>
    
    <script setup lang="ts">
    import catagoryHead from '@/components/catagory/catagoryHead.vue';
    import footer from '@/components/layout/footer.vue';
import catagoryBanner from '~/components/catagory/catagoryBanner.vue';
import catagoryDetails from '~/components/catagory/catagoryDetails.vue';
import catagorysearch from '~/components/catagory/catagorysearch.vue';
    
    definePageMeta({
      layout: 'catagory',
    });
    </script>
    