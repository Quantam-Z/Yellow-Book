<template>
  <div class="container fluid mx-auto pt-32">
    <div>
      <div>
        <div v-if="isLoading">
          <LazyCommonShareLoader />
        </div>
        <div v-else class="px-2">
          <CommonPageBaner :item="notice" />
        </div>
        <div v-if="notice.body" class="py-3 px-6 md:px-0 text-justify">
          <p
            class="px-4 text-[16px] md:text-[20px] leading-[24px]"
            v-html="notice.body"
          ></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import $api from "~~/src/composables/useRequest";

const route = useRoute();
const slug = route.params.slug;
const notice = ref({});
const isLoading = ref(false);

const init = async () => {
  isLoading.value = true;
  const { data, pending, error, refresh } = await $api.get(`notices/${slug}`);
  if (error && error._value) {
    console.log(error);
  } else {
    notice.value = data.value.data;
  }
  isLoading.value = false;
};
init();
</script>

<style scoped></style>
