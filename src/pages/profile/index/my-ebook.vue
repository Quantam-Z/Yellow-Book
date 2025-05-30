<template>
  <div>
    <div v-if="isLoading">
      <LazyCommonShareLoader />
    </div>
    <div v-else>
      <div v-if="ebook && ebook.length" >
        <h3 class="left-border text-[24px] px-4 mx-2 md:mx-0 ">My E-books</h3>
        <CommonCardsMyEbookCard :ebooks="ebook" />
      </div>
      <div v-else>
        <CommonAlert type="warning">No E-books found</CommonAlert>
      </div>
    </div>
  </div>
</template>

<script setup>
import $api from "~~/src/composables/useRequest";
import {useAuthStore} from "~/stores/auth";

definePageMeta({
  middleware: ["auth"],
});

const authStore = useAuthStore();

const ebook = ref([]);
const isLoading = ref(false);
onMounted(() => {
  setTimeout(() => {
    init();
  }, 100);
});

const init = async () => {
  isLoading.value = true;
  const { data, pending, error, refresh } = await $api.get(`my-ebook`);
  if (error && error._value) {
    console.log(error);
      if (error._value.status === 401) {
          await authStore.logout();
      }
  } else {
    ebook.value = data.value.data;
  }
  isLoading.value = false;
};
</script>

<style lang="scss" scoped>
.left-border {
  border-left: 3px solid #8FD2FD;
}
</style>
