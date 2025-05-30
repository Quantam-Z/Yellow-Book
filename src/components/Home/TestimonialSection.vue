<template>
  <section>
    <div
      v-if="testimonials && testimonials.length"
      class="container fluid mx-auto"
    >
      <div class="text-left">
        <div class="px-4">
          
          <div class="bg-[#F6F6F6] px-2 md:px-[67px] py-[24px] md:py-[40px]  rounded-2xl">
            <CommonSectionHeading title="শিক্ষার্থীদের অভিমত" subtitle="জেনে নিন আমাদের কোর্স ও সেবার বিষয়ে শিক্ষার্থীদের মতামত"/>
            <SlideshowSwiperSlide
            :sideNav="false"
            slideType="review"
            :navigation="true"
            :pagination="{ clickable: true }"
            :dataArray="testimonials"
            :breakpoints="breakpoints"
          />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  testimonials: {
    type: Array,
    default: [],
  },
});

const breakpoints = {
  0: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 2.2,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 40,
  },
};
</script>

<style lang="scss" scoped>

</style>
