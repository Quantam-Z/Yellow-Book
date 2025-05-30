<template>
  <div class="w-full">
    <div v-if="courses && courses?.length" class="container mx-auto">
      <div class="text-left">
      </div>
      <template v-if="courses && courses?.length">
        <div class="">
          <div>
            <slideshow-swiper-slide :sideNav="true" slideType="course" :dataArray="courses"
              :breakpoints="breakpoints" />
          </div>
        </div>
      </template>
      <div v-if="courses && courses?.length" class="text-center pb-6 md:mt-0 ">
        <CommonButtonsLinkBtn link="/courses" text="See All"
          styles="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-xl" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  courses: { type: Array, default: () => [] },
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
    slidesPerView: 2.5,
    spaceBetween: 40,
  },
  "@1.50": {
    slidesPerView: 2.8,
    spaceBetween: 20,
  },
  "@1.75": {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  "@2.00": {
    slidesPerView: 3.2,
    spaceBetween: 20,
  },

};
</script>

<style lang="scss" scoped></style>
