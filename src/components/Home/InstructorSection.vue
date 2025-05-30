<template>
    <section>
        <div class="container fluid mx-auto">
            <div class="text-left">
                <div class="pt-6">
                    <CommonSectionHeading title="Instructors" />
                </div>
                <div class="px-4 md:px-0">
                    <SlideshowSwiperSlide :sideNav="false" slideType="instructor" :dataArray="instructor"
                        :breakpoints="breakpoints" />
                </div>
            </div>
            <div class="text-center mt-12 md:mt-10">
               <CommonButtonsLinkBtn link="/instructors" text="View All" styles="bg-[#0072BB] text-white px-8 py-2 rounded-2xl" />
            </div>
        </div>
    </section>
</template>
  
<script setup>
const props = defineProps({
    instructor: {
        type: Array,
        default: [],
    },
});
const breakpoints = {
  "@0.00": {
    slidesPerView: 1.2,
    spaceBetween: 10,
  },
  "@0.75": {
    slidesPerView: 1.2,
    spaceBetween: 20,
  },
  "@1.00": {
    slidesPerView: 2.8,
    spaceBetween: 40,
  },
  "@1.50": {
    slidesPerView: 3,
    spaceBetween: 40,
  },
};
</script>
  
<style lang="scss" scoped></style>
  