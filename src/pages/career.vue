<template>
  <div class="container mx-auto px-2 pt-[120px]">
    <div v-if="isLoading">
      <CommonShareLoader />
    </div>
    <div v-else class="">
      <h1 class="border_left text-[24px] font-extrabold">Career</h1>
      <div class="text left mt-4 px-2 md:px-0 text-justify text-[14px] md:text-[18px]" v-html="privacy.value"></div>
    </div>
  </div>
</template>

<script setup>
import $api from "../composables/useRequest";

const isLoading = ref(false);
const privacy = ref({});

const init = async () => {
  isLoading.value = true;
  const { data, pending, error } = await $api.get("page/privacy-policy");
  if (error && error._value) {
    console.log(error);
  } else {
      privacy.value = data.value.data;
  }
  isLoading.value = false;
};

init();
</script>

<style lang="scss" scoped>
.border_left {
  border-left: 4px solid #65caaf;
  padding-left: 10px;
}
</style>

  