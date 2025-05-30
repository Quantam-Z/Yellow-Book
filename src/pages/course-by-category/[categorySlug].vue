<template>
  <div class="pt-[80px]">
    <div class="">
      <CommonTextSection :title="route.query.title"
      description="Empower yourself with the knowledge and skills gained through online education and best instructors." />
    </div>
    <div v-if="isLoading">
      <LazyCommonShareLoader />
    </div>
    <div v-else id="myID" class="pt-10 bg-[#f1f6f5]">
      <div class="container fluid mx-auto">
        <div>
          <template v-if="courses && courses.length">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 mt-6 gap-6 2xl:gap-20 px-4 xl:px-4 2xl:px-20">
              <div v-for="(course, i) in courses" :key="i" class="">
                <CommonCardsCourseCard :item="course" />
              </div>
            </div>
          </template>
          <template v-else>
            <CommonNodata text="Courses" />
          </template>
        </div>
        <div class="flex justify-center mt-6">
          <TailwindPagination :data="response" :limit="12" @pagination-change-page="getData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import $api from "~/composables/useRequest";

const isLoading = ref(false);
const isOpen = ref(false)
const courses = ref([]);
const courseCat = ref([]);
const currentSlug = ref("");
const isActive = ref(1999);
const response = ref({});

const route = useRoute();
const slug = route.params.categorySlug;

watch(currentSlug, async function (nv, ov) {
  await getData();
});

// method

const getAllCourse = async () => {
  isActive.value = 1999;
  currentSlug.value = ''
  await getData();
  isOpen.value = false
};

const getData = async (page = 1) => {
  isLoading.value = true;
  let url = `courses?per_page=12&page=${page}&category_slug=${slug}`
  const { data, pending: loading, error, refresh } = await $api.get(url);
  if (error && error._value) {
    console.log(error);
  } else {
    courses.value = data.value.data;
    response.value = data.value
  }
  isLoading.value = false;
};

const selectCat = () => {
  isOpen.value = !isOpen.value;
};
// init method
getData();

const { data, pending, error } = await $api.get(`course-category`);
if (error && error._value) {
  console.log(error);
} else {
  courseCat.value = data.value.data;
}

// get all category

// get getagori owais course slug
const getCategoryCourse = (slug, i) => {
  courses.value = [];
  currentSlug.value = slug;
  isActive.value = i;
  isOpen.value = false
};


</script>

<style scoped></style>
