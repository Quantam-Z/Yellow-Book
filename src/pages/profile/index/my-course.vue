<template>
  <div>
    <div v-if="isLoading">
      <LazyCommonShareLoader />
    </div>
    <div v-else class="py-0 px-2 md:py-0 md:px-0">
      <div v-if="courses && courses.length">
        <div class="pt-0">
          <ProfileHeading title="My Courses" />
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 mt-6 gap-6 2xl:gap-20 px-4 xl:px-4 2xl:px-20">
          <div v-for="(course, i) in courses" :key="i" class="">
            <CommonCardsCourseCard :item="course" />
          </div>
        </div>
      </div>
      <div class="pt-8" v-else>
        <ProfileHeading title="My Courses" />
        <CommonAlert type="warning">No Courses found</CommonAlert>
      </div>
    </div>
  </div>
</template>

<script setup>
import $api from "~~/src/composables/useRequest";
import { useAuthStore } from "~/stores/auth";
import ProfileHeading from "~/components/common/ProfileHeading.vue";

definePageMeta({
  middleware: ["auth"],
});

const authStore = useAuthStore();

const courses = ref([]);
const isLoading = ref(false);
onMounted(() => {
  setTimeout(() => {
    init();
  }, 100);
});

const init = async () => {
  isLoading.value = true;
  const { data, pending, error, refresh } = await $api.get(`my-course`);
  if (error && error._value) {
    console.log(error);
    if (error._value.status === 401) {
      await authStore.logout();
    }
  } else {
    courses.value = data.value.data;
  }
  isLoading.value = false;
};
</script>

<style lang="scss" scoped>
.left-border {
  border-left: 3px solid #007acc;
}
</style>
