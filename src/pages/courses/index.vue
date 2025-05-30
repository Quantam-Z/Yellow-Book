<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="isLoading">
      <LazyCommonShareLoader />
    </div>
    <div v-else id="myID" class="pt-32 md:pt-24">
      <!-- Header Section -->
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <div class="text-center mb-10">
          <h1 class="text-3xl md:text-4xl font-bold text-[#17107F] mb-2">কোর্সসমূহ</h1>
          <!-- <div class="w-24 h-1 bg-[#17107F] mx-auto"></div> -->
        </div>

        <!-- Filter Controls -->
        <div class="mb-8">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <!-- All Courses Button -->
            <button 
              @click="getAllCourse" 
              :class="`px-6 py-2 rounded-full font-semibold transition-all ${isActive === 1999
                ? 'bg-[#17107F] text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`">
              সকল কোর্স
            </button>
            
            <!-- Mobile Category Dropdown -->
            <div class="md:hidden w-full">
              <button 
                @click="selectCat"
                class="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium">
                <span>ক্যাটাগরি নির্বাচন করুন</span>
                <svg :class="`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <div v-show="isOpen" class="mt-2 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
                <template v-if="courseCat && courseCat?.length">
                  <button 
                    v-for="(item, i) in courseCat" 
                    :key="i" 
                    @click="getCategoryCourse(item.slug, i)"
                    :class="`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${isActive === i
                      ? ' bg-[#17107F] text-white font-medium'
                      : 'text-gray-700'
                    }`">
                    {{ truncate(item.title, 60) }}
                  </button>
                </template>
              </div>
            </div>
            
            <!-- Desktop Category Filters -->
            <div class="hidden md:flex flex-wrap gap-2">
              <template v-if="courseCat && courseCat?.length">
                <button 
                  v-for="(item, i) in courseCat" 
                  :key="i"
                  @click="getCategoryCourse(item.slug, i)"
                  :class="`px-4 py-2 rounded-full transition-all ${isActive === i
                    ? 'bg-[#17107F] text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }`">
                  {{ truncate(item.title, 60) }}
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Course Grid -->
      <div class="container mx-auto px-4 md:px-6 lg:px-8 pb-12">
        <template v-if="courses && courses?.length">
          <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="(course, i) in courses" :key="i">
              <CommonCardsCourseCard :item="course" />
            </div>
          </div>
        </template>
        <template v-else>
          <CommonNodata text="কোন কোর্স পাওয়া যায়নি" class="py-16" />
        </template>

        <!-- Pagination -->
        <div class="mt-12 flex justify-center">
          <TailwindPagination 
            :data="response" 
            :limit="12" 
            @pagination-change-page="getData"
            class="pagination"
          />
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
  let url = `courses?per_page=12&page=${page}`
  if (currentSlug.value?.length > 1) {
    url += `&category_slug=${currentSlug.value}`
  }
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