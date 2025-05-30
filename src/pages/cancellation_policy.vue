<template>
  <div class="pt-[80px]">
<!--    <div class="">-->
<!--      <CommonTextSection title="Cancellation Policy"-->
<!--                         description="Empower yourself with the knowledge and skills gained through online education and best instructors."/>-->
<!--    </div>-->
    <div class="container mx-auto px-2">
      <div v-if="isLoading">
        <CommonShareLoader/>
      </div>
      <div v-else class="">
        <div class="pb-4 md:pb-8 pt-[50px] md:pt-12">
          <p class="text-center text-[24px] md:text-[28px] font-[600] ">Cancellation Policy</p>
          <hr/>
        </div>
        <div class="text left mt-4 px-2 md:px-0 text-justify text-[14px] md:text-[18px]"
             v-html="cancellation.value"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import $api from "../composables/useRequest";

const isLoading = ref(false);
const cancellation = ref({});

const init = async () => {
  isLoading.value = true;
  const {data, pending, error} = await $api.get("page/cancellation-policy");
  if (error && error._value) {
    console.log(error);
  } else {
    cancellation.value = data.value.data;
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
