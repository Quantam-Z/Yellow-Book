<template>
  <div>
    <div>
      <div v-if="item?.course_details?.video">
        <!--        <CommonVideo :contain="item.course_details.video" />-->
        <common-youtube-video :src="item.course_details.video" />
      </div>
      <div v-else>
        <img class="w-full h-auto rounded-2xl md:h-[400px]"
          :src="item?.image?.link ? item?.image?.link : '/images/no_image.jpg'" alt="" />
      </div>
    </div>
    <!-- <div class="mt-4" v-if="item?.course_details?.description">
      <p v-html="item?.course_details?.description"></p>
    </div> -->
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});
</script>

<style scoped></style>
