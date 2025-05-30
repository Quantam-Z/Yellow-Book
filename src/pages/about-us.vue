<template>
  <div>
    <div v-if="isLoading">
      <CommonShareLoader />
    </div>
    <div v-else>
      <div class="pt-[50px] md:pt-20">
<!--        <div class="">-->
<!--          <CommonTextSection title="আমাদের সম্পর্কে জানুন"/>-->
<!--        </div>-->
        <div class="container fluid mx-auto px-3">
          <div class="pb-8 pt-[50px] md:pt-12">
            <p class="text-center text-[24px] text-[#3b6b53] md:text-[32px] font-[600] ">আমাদের সম্পর্কে জানুন</p>
            <hr/>
          </div>
          <div class="">
            <div class="text left  px-4 md:px-0 text-justify text-[14px] md:text-[18px]" v-html="aboutUs.value"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import $api from "../composables/useRequest";

const isLoading = ref(false);
const aboutUs = ref({});

const init = async () => {
  isLoading.value = true;
  const { data, pending, error, refresh } = await $api.get("page/about");
  if (error._value) {
    console.log(error);
  } else {
    aboutUs.value = data.value.data;
  }
  isLoading.value = false;
};

init();
</script>

<style scoped>
.border-left {
  border-left: 4px solid #fd821c;
  border-radius: 10px;
  padding: 0px 6px;
}
</style>
