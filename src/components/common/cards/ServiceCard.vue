<template>
  <div>
    <div class="flex  gap-y-4  justify-center items-center bg-[red] px-5 rounded-xl h-[140px]">
      <p class="bg-white p-2 rounded-lg">
        <Icon size="40" color="#0C8CE9" :name="service.icon" />
      </p>
      <p class="text-[16px] md:text-[20px] pl-4 font-[600]  text-white">{{ service.text }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  service: { type: Object, default: {} },
});
</script>

<style lang="scss" scoped>
.hover-able:hover {
  box-shadow: 5px 6px 5px 5px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 5px 6px 5px 5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 5px 6px 5px 5px rgba(0, 0, 0, 0.75);
  transition: .4s;
}
</style>
