<template>
  <div>
    <div class="flex justify-between items-center px-4">
      <h1 class="text-[26px] py-8 font-extrabold">{{ item.title }}</h1>
      <!-- <div>
          <ShareAble />
      </div> -->
    </div>
    <div v-if="item?.image?.link && item?.image?.link?.length">
      <img class="w-full" :src="item.image.link" alt="">
    </div>
    <div>
      <ShareModal :title="item.title" :slug="item.slug"/>
    </div>
    <div class="py-4">
      <p v-html="item.body"></p>
    </div>
  </div>
</template>
<script setup>
import ShareAble from '~~/src/components/common/ShareAble.vue';
import ShareModal from "~/components/common/ShareModal.vue";

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});
</script>
<style scoped></style>