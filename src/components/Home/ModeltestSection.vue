<template>
  <div class="w-full">
    <div class="container mx-auto">
      <div class="text-left">
      </div>
      <template v-if="modeltest && modeltest.length">
        <common-section-heading title="Featured Model Tests" />
        <slideshow-swiper-slide
          :sideNav="true"
          slideType="model_test"
          :dataArray="modeltest"
          :breakpoints="breakpoints"
        />
      </template>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  modeltest: { type: Array, default: () => [] },
});
const breakpoints = {
  "@0.00": {
    slidesPerView: 1.2,
    spaceBetween: 10,
  },
  "@0.75": {
    slidesPerView: 2.2,
    spaceBetween: 20,
  },
  "@1.00": {
    slidesPerView: 3.2,
    spaceBetween: 40,
  },
  "@1.50": {
    slidesPerView: 3.2,
    spaceBetween: 40,
  },
  "@2.00": {
    slidesPerView: 4,
    spaceBetween: 40,
  },
};
</script>

<style lang="scss" scoped></style>
