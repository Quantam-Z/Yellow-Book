<template>
  <div v-if="video && video.value">
    <div class="flex justify-center pb-12">
      <div>
        <div class="text-center pt-12 px-2 md:px-24">
          <h1 class="text-[22px] md:text-[24px] lg:text-[48px]">
            কেন ব্যাংক জব নিয়োগ প্রস্তুতির জন্য মাস্টারক্লাসে ভর্তি হবেন?
          </h1>
          <p class="text-[18px] md:text-[20px]">
            আমাদের কোর্সগুলো পরিচালনা করেছেন দক্ষ, অভিজ্ঞ এবং স্বনামধন্য সব
            শিক্ষকেরা, যারা আবার বাংলাদেশ ব্যাংকে বিভিন্ন পদে কর্মরত রয়েছেন।
          </p>
        </div>
        <div class="">
          <div class="relative">
            <div
              class="vedio_index py-10 md:py-2 mx-2 md:m-10 flex justify-center items-center rounded-[20px] md:rounded-[40px]"
            >
              <iframe
                :src="getEmbededUrl(video.value)"
                class="rounded-2xl md:w-[700px] h-auto md:h-[400px]"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div class="hidden md:flex justify-center">
              <div class="flex flex-col items-center bar_index w-[90%] absolute top-[25%]">
                <div class="w-[80%] h-[50px] bg-[#EDF6F4] rounded-lg"></div>
                <div class="my-6 w-full h-[50px] bg-[#EDF6F4] rounded-lg"></div>
                <div class="w-[90%] h-[50px] bg-[#EDF6F4] rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <CommonButtonsLinkBtn
            text="Start Course"
            link="/profile/my-course"
            styles="bg-[#007acc] text-white px-6 py-2 rounded-md "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  video: {
    type: Object,
    default: {},
  },
});
const getEmbededUrl = (url) => {
  const youtubeUrl = url.replace("watch?v=", "embed/");
  if (youtubeUrl.includes("&")) {
    return youtubeUrl.split("&")[0];
  } else {
    return youtubeUrl;
  }
};
</script>

<style lang="scss" scoped>
.vedio_index {
  z-index: 13 !important;
}
.bar_index {
  z-index: -1 !important;
}
</style>
