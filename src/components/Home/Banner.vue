<template>
  <div class="set_bg">
    <Container>
      <div class="text-center pt-[90px]">
        <div class="overflow-hidden">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 items-center">
            <div class="text-center md:text-left">
              <div class="mb-4">
                <h1
                  class="text-[#3b6b53] text-[24px] md:text-[26px] lg:text-[30px] pt-5  xl:text-[44px] font-extrabold leading-2 md:leading-[40px] lg:leading-[60px]"
                >
                ব্রেইনবাজ: এক্সপ্লোর করো, শিখো, সফল হও!
                </h1>
                <p
                  class="text-[16px] md:text-[20px]  font-[400] py-4 text-justify"
                >
                  গ্যাজেট আর টেকনোলজির যুগে সব বিষয়ের জ্ঞান যখন উন্মুক্ত তখন
                  শিক্ষার্থীরা এনালগ থাকবে কেন। উন্নত শিক্ষা কেবল কোন নির্দিষ্ট
                  গন্ডিতে সীমাবদ্ধ না রেখে Brain Buzz চায় তা সকলের কাছে উন্মুক্ত
                  করে দিতে।সকলের ভিতরেই কোনো না পোটেনিশিয়াল সুপ্ত থাকে।সেই সুপ্ত
                  প্রতিভাকে পাখা দিতেই অভিজ্ঞ শিক্ষক নিয়ে অভিনব পদ্ধতিতে পাঠদানে
                  Brain Buzz এর পথচলা ।
                </p>
              </div>
              <div
                class="flex items-center gap-x-4 justify-center md:justify-start"
              >
                <div class="pt-2">
                  <CommonButtonsLinkBtn
                    text="কোর্স শুরু করুন"
                    link="/profile/my-course"
                    styles="bg-blue text-[12px] md:text-[16px]  text-white px-4 md:px-6 py-2 md:py-4 rounded-md "
                  />
                </div>
                <div>
                  <a href="https://www.etestpaper.net/?source=brainbuzz">
                    <img
                      class="h-[40px] md:h-[46px]"
                      src="/images/ebtn.png"
                      alt="etest-paper"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div v-if="items && items.length">
              <BannerSlider
                :sideNav="true"
                slideType="advertisements"
                :dataArray="items"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>
  <!-- <div>
    <div class="container mx-auto -mt-14">
      <div class="py-4 md:py-0 h-auto md:h-32 w-full bg-[#3b6b53] md:rounded-lg">
        <div class="grid grid-cols-3 gap-5 items-center h-full">
          <div class=" border-r-2 border-white">
            <div  class="flex flex-col items-center">
              <p class="text-white text-[16px] md:text-[32px] font-[500] ">Courses</p>
              <p class="text-[20px] md:text-[32px] font-bold text-white">{{ counter[0].value }}</p>
            </div>
          </div>
          <div class=" border-r-2 border-white pl-2 md:pl-0">
            <div class="flex flex-col items-center">
              <p class="text-white text-[16px] md:text-[32px] font-[500] ">Instructor</p>
              <p class="text-[20px] md:text-[32px] font-bold text-white">{{ counter[1].value }}</p>
            </div>
          </div>
          <div class="">
            <div class="flex flex-col items-center">
              <p class="text-white text-[16px] md:text-[32px] font-[500] ">Students</p>
              <p class="text-[20px] md:text-[32px] font-bold text-white">{{ counter[2].value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>
<script setup>
import Container from "~/components/common/Container.vue";
import BannerSlider from "~/components/slideshow/BannerSlider.vue";
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  counter: { type: Array, default: () => [] },
});
</script>
<style scoped>
.set_bg {
  background: #f1f6f5;
  padding: 5px 0;
}
</style>
