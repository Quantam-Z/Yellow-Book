<template>
  <div>
    <div class="w-[155px] md:w-[280px] rounded-3xl overflow-hidden">
        <div class="w-[160px] md:w-[280px] h-[155px] md:h-[278px]">
           <img class="rounded-t-3xl w-full h-full" :src=" founder?.image?.link ? founder?.image?.link : '/images/no_image.jpg'">
        </div>
        <div class="p-4 w-[160px] md:w-[280px] max-h-[130px] rounded-b-2xl bg-white">
            <span class="text-[12px] md:text-[14px] leading-[18px] text-[#007acc]">{{ founder.designation }}</span><br>
            <span class="text-[16px] md:text-[18px] leading-[28px]">{{ founder.name }}</span><br>
            <span class="text-[12px] md:text-[14px] leading-[18px]">{{ founder.description }}</span>
        </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  founder:{
    type: Object,
    default:{}
  }
})
</script>

<style lang="scss" scoped></style>
