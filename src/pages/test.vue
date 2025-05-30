<template>
  <div class="py-4">
      <TailwindPagination
          :limit="12"
          :data="response"
          @pagination-change-page="init"
      />
  </div>
</template>

<script setup>
import $api from "~/composables/useRequest";

const response = ref({});
const courses = ref([]);
const isLoading = ref(false);

const init = async (page = 1) => {
  isLoading.value = true
  const { data, pending: loading, error, refresh } = await $api.get(`courses?page=${page}`);
  if (error && error._value) {
    console.log(error);
  } else {
    courses.value = data.value.data
    response.value = data.value;
  }
  isLoading.value = false;
}

init();
</script>