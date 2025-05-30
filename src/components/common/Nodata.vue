<template>
  <div>
    <div class="flex justify-center mt-28">
      <p class="text-center font-extrabold text-[30px]">
        No {{ text }} available....
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    text:{
        type: String,
        default:''
    }
})
</script>

<style lang="scss" scoped></style>
