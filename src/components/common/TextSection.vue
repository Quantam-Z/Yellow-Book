<template>
  <div class="bg-[#9FCEA3]">
    <div class=" rounded-3xl">
      <div class="w-full">
        <div class="flex justify-center py-8 md:py-16">
          <h1 class="text-[28px] text-center md:text-[40px] font-[500]  text-black">{{ title }}</h1>
<!--          <p class="text-[14px] md:text-[20px] font-[400]  text-[#2B2B2B]">{{ description }}</p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
});
</script>

<style lang="scss" scoped></style>
