<template>
  <div>
    <div class="flex justify-center items-center">
      <div class="line mx-3"></div>
      <h3 class="text-[24px] py-4  text-center md:text-[36px]">{{ title }}</h3>
      <div class="line mx-3"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: "" },
});
</script>

<style lang="scss" scoped>
.line {
  width: 34px;
  height: 5px;
  background-color: #3b6b53;
  border-radius: 10px;
  flex: none;
  flex-grow: 0;
}
</style>
