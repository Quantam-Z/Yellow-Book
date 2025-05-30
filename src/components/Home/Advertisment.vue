<template>
  <div v-if="advertisement && advertisement.length" class="container mx-auto">
    <CommonSectionHeading title="আমাদের অর্জন"/>
    <div class="">
      <BannerSlider :sideNav="false" slideType="advertisements" :dataArray="advertisement"/>
    </div>
  </div>
</template>

<script setup>
import BannerSlider from "../slideshow/BannerSlider.vue";


const props = defineProps({
  advertisement: {
    type: Array,
    default: []
  }
})
</script>

<style lang="scss" scoped></style>
