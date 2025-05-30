<template>
<DefaultLayout>
    <slot :courses="course" />
</DefaultLayout>
</template>

<script setup>
import DefaultLayout from "~/layouts/default.vue";
import $api from "~~/src/composables/useRequest";
import { useCourseStore } from "../stores/course";

const courseStore = useCourseStore()
const route = useRoute();
const slug = route.params.courseSlug;
const course = ref({});
const { data, pending, error, refresh } = await $api.get(`courses/${slug}`);
if (error && error._value) {
  console.log(error);
} else {
  courseStore.setCourse(data.value.data);
}

</script>

<style scoped>

</style>