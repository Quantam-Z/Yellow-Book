<template>
  <div >
    <img class="rounded-[15px]" :src="item.link">
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

<style lang="scss" scoped></style>
