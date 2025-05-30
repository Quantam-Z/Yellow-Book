<template>
  <div class="pt-[30px] md:pt-[80px]">
<!--    <div class="">-->
<!--      <CommonTextSection title="Terms and Conditions"-->
<!--        description="Empower yourself with the knowledge and skills gained through online education and best instructors." />-->
<!--    </div>-->
    <div class="container mx-auto px-2">
      <div v-if="isLoading">
        <CommonShareLoader />
      </div>
      <div v-else class="">
        <div class="md:pb-8 pb-4 pt-[50px] md:pt-12">
          <p class="text-center text-[24px] text-[#3b6b53] md:text-[32px] font-[600] ">আমাদের শর্তাবলী (টার্মস এন্ড কন্ডিশন) সম্পর্কে জানুন</p>
          <hr/>
        </div>
        <div class="text left mt-4  px-2 md:px-0 text-justify text-[14px] md:text-[18px]" v-html="terms.value"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import $api from "../composables/useRequest";

const isLoading = ref(false);
const terms = ref({});

const init = async () => {
  isLoading.value = true;
  const { data, pending, error } = await $api.get("page/terms-and-conditions");
  if (error && error._value) {
    console.log(error);
  } else {
    terms.value = data.value.data;
  }
  isLoading.value = false;
};

init();
</script>

<style lang="scss" scoped>
.border_left {
  border-left: 4px solid #fd821c;
  border-radius: 10px;
  padding: 0px 6px;
}
</style>
