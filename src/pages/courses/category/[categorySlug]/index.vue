<template>
  <div class="py-[90px]">
    <div v-if="isLoading">
      <LazyCommonShareLoader />
    </div>
    <div v-else>
      <div class="mx-3 md:mx-2">
        <!-- <div>
          <CommonTextSection title="Courses"
                             description="Empower yourself with the knowledge and skills gained through online education and best instructors." />
        </div> -->
      </div>
      <div id="myID" class="py-10 h-auto bg-[#f1f6f5]">
        <div class="container fluid mx-auto">
          <div class="container fluid mx-auto md:px-14">
            <div class="pl-2 md:pl-0 flex items-center md:items-start justify-between md:justify-start gap-4">
              <div class="block md:hidden pl-2 md:pl-0 md:pr-4">
                <button @click="selectCat"
                        class="bg-[#426058] text-[14px] md:text-[18px] text-white px-2 md:px-3 py-1 rounded-md">Select
                  category</button>
              </div>
              <div >
                <div class="hidden md:flex md:flex-wrap gap-2" v-for="(item, i) in categories" :key="i">
                  <div v-for="(n , i) in item.course_categories" :key="i">
                    <button @click="getCategoryCourse(n.slug, i)" :class="`${isActive === i
                  ? 'bg-[#426058] text-white '
                  : 'text-[#808080] bg-[white]'
                  } text-[14px] md:text-[16px] py-1 my-1 px-4 rounded-md text-left`">
                      {{ truncate(n.title, 60) }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div >
              <div :class="`${isOpen ? 'block' : 'hidden'} md:hidden mt-2`" class="px-4 md:px-0 " v-for="(item, i) in categories" :key="i">
                <div v-for="(n , i) in item.course_categories" :key="i">
                  <button @click="getCategoryCourse(n.slug, i)" :class="`${isActive === i
                  ? 'bg-[#426058] text-white '
                  : 'text-[#808080] bg-[white]'
                  } text-[14px] md:text-[16px] py-1 my-1 px-4 rounded-md text-left`">
                    {{ truncate(n.title, 60) }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <template v-if="courses && courses.length">
              <div
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-y-4 xl:gap-y-12 lg:gap-y-6 md:gap-4 mt-6 md:px-2">
                <div class="flex justify-center" v-for="(course, i) in courses" :key="i">
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
  </div>
</template>

<script setup>
import $api from "~~/src/composables/useRequest";

const isLoading = ref(false);
const courses = ref([]);
const categoryCourses = ref([]);
const route = useRoute();
const response = ref({});
const courseCat = ref([]);
const categories = ref([]);
const isOpen = ref(false);
const isActive = ref(1999);
const currentSlug = ref("");


watch(currentSlug, async function (nv, ov) {
  await getData();
});

// method

const init = async (page = 1) => {
  isLoading.value = true;
  let url = `courses?per_page=12&page=${page}?&category_slug=${route.params.categorySlug}`;
  const { data, pending: loading, error, refresh } = await $api.get(url);
  if (error && error._value) {
    console.log(error);
  } else {
    courses.value = data.value.data;
    response.value = data.value;

    isLoading.value = false;
  };
}


const getData = async (page = 1) => {
  isLoading.value = true;
  let url = `courses?per_page=12&page=${page}`;
  if (currentSlug.value.length > 1) {
    url += `&category_slug=${currentSlug.value}`;
  }
  const { data, pending: loading, error, refresh } = await $api.get(url);
  if (error && error._value) {
    console.log(error);
  } else {
    courses.value = data.value.data;
    response.value = data.value;
  }
  isLoading.value = false;
};

const getCategory = async () => {
  const { data, pending, error } = await $api.get(`course-category`);
  if (error && error._value) {
    console.log(error);
  } else {
    courseCat.value = data.value.data;
    categories.value = courseCat.value.filter((el)=>{
      return el.slug == route.params.categorySlug
    })
  }
}


const selectCat = () => {
  isOpen.value = !isOpen.value;
};

const getCategoryCourse = (slug, i) => {
  courses.value = [];
  currentSlug.value = slug;
  isActive.value = i;
  isOpen.value = false;
};

// init method
getData();
init();
getCategory();


</script>

<style scoped></style>
