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
    import CatagoryHead from '~/components/Catagory/catagoryHead.vue';
    import Footer from '~/components/layout/footer.vue';
import CatagoryBanner from '~/components/Catagory/catagoryBanner.vue';
import CatagoryDetails from '~/components/Catagory/catagoryDetails.vue';
import CatagorySearch from '~/components/Catagory/catagorySearch.vue';
    
    definePageMeta({
      layout: 'catagory',
    });
    </script>
    