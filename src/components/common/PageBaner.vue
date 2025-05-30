<template>
  <div>
    <div
      class="px-2 md:px-0 order-2 flex flex-col-reverse md:flex-none md:relative md:pt-[120px]"
    >
      <div
      :class="`${page=='blog'? 'md:bg-[#E0F2FE]': 'md:bg-[#FFF2FC]'}`"
        class="h-auto md:h-[620px] rounded-[30px] pb-0 md:pb-28"
      >
        <div class="text-center md:pt-96 md:px-16">
          <span class="text-center w-full text-[24px] md:text-[35px]">{{
            item.title
          }}</span>
          <div v-if="page=='blog'" class="flex justify-between">
            <div v-if="item.author_name || item.author_image" class="flex items-center">
              <div class="w-[39px] h-[39px] rounded-full bg-red-300 flex justify-center items-center">
                <img v-if="item.author_image" class="rounded-full" :src="item.author_image" />
                <div v-else>{{ item.author_name.slice(0, 2) }}</div>
              </div>
              <div  class="pl-2">
                <p class="text-[#0072BB] text-[12px] text-left">Author</p>
                <p class="text-[18px] text-left">{{ item.author_name }}</p>
              </div>
            </div>
            <div v-else></div>
            <div class="text-right">
              <span class="text-[#0072BB] text-[12px]">Published On</span><br />
              <span class="text-[18px]">{{moment(item.created_at).format('ll') }}</span>
            </div>
          </div>
          <div v-else class="text-right px-6">
              <span class="text-[#0072BB] text-[12px] md:text-[16px]">Published On</span><br />
              <span class="text-[16px] md:text-[18px]">{{ item.created_at}}</span>
          </div>
        </div>
      </div>
      <div class="order-1 rounded-[20px]">
        <img v-if="item?.image?.link"
          class="h-[150px] md:h-[450px] w-full md:px-16 px-4 md:absolute md:bottom-72 rounded-[20px]"
          :src="item?.image?.link"
        />
        <img class="h-[150px] md:h-[450px] w-full md:px-16 px-4 md:absolute md:bottom-72 rounded-[20px]" v-else src="/logo/logo.png" alt="logo">
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment';
const props = defineProps({
    item:{
        type: Object,
        default:{}
    },
    page:{
        type: String,
        default:''
    }
})
</script>

<style lang="scss" scoped>
.blog_bg{
  background-color: rgba(143, 210, 253, 0.2);
}
</style>
