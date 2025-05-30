<template>
  <div>
    <div v-if="isLoading">
      <CommonShareLoader/>
    </div>
    <div v-else>
      <div class="pt-[100px] md:pt-20 md:px-2">
        <div class="">
          <CommonTextSection title="Testimonials"
                             description="Empower yourself with the knowledge and skills gained through online education and best instructors."/>
        </div>
        <div v-if="reviews && reviews.length" class="bg-[#EDF2F5]">
          <div class="container fluid mx-auto">
            <div class="md:py-20 py-8 px-2 md:px-0 flex justify-center">
              <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-x-4 md:gap-x-12 gap-y-6 md:gap-y-12">
                <div class="flex" v-for="(items, i ) in reviews" :key="i">
                  <TestimonialCard :item="items"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TestimonialCard from "../components/common/cards/TestimonialCard.vue";
import $api from "../composables/useRequest";

const isLoading = ref(false);
const reviews = ref([]);

onMounted(() => {
  setTimeout(() => {
    init();
  }, 100);
});
const init = async () => {
  isLoading.value = true;
  const {data, pending, error} = await $api.get("/testimonials");
  if (error && error._value) {
    console.log(error);
  } else {
    reviews.value = data.value.data;
  }
  isLoading.value = false;
};

init();
</script>

<style scoped></style>
  