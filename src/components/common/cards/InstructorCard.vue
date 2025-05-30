<template>
  <div class="mt-12">
    <div class="">
      <div class="h-auto lg:h-[320px] text-center relative bg-[#ffffff]  px-2 pb-2 border-solid border-4 border-[#8ccfff] col-span-1 flex flex-col justify-between">
        <div class="flex justify-center py-2">
          <img class="w-[100px] h-[100px] rounded-[50%]"
            :src="instructor?.image?.link ? instructor?.image?.link : '/images/no_image.jpg'" alt="" />
        </div>
        <div v-if="instructor.name">
          <p class="text-[14px] md:text-[24px] font-[600]  text-[#3B3B3B]">{{ truncate(instructor.name, 30)
          }}</p>
        </div>
        <div v-if="instructor.designation">
          <p class="text-[12px] md:text-[20px] font-[400] font-['Li_Ador_Noirrit'] text-[#565656]">{{
            instructor.designation }}</p>
        </div>
        <div v-if="instructor.description" class="relative">
          <p
            class="text-[12px] md:text-[18px] font-[400] font-['Li_Ador_Noirrit'] text-[#3B3B3B] h-auto text-center overflow-clip">
           {{truncate(instructor.description, 150)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  instructor: {
    type: Object,
    default: {},
  },
});
</script>
<style lang="scss" scoped>
.min-height {
  overflow: hidden;
}

.profile-img {
  position: absolute;
  height: 100px;
  width: 100px;
  // top: -50px;
  // left: 50%;
  transform: translateX(-50px);
  z-index: 2;
  // background: linear-gradient(0deg, #D9D9D9, #D9D9D9);
  // background: linear-gradient(180deg, rgba(157, 50, 146, 0.12) 0%, rgba(157, 50, 146, 0.06) 70.31%, rgba(157, 50, 146, 0) 100%);
  padding: 6px;
  border-radius: 50% !important;

  img {
    height: 100%;
    width: 100%;

    border-radius: 50%;
  }
}
</style>
  
