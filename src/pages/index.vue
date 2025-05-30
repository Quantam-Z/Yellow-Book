<template>
  <div>
    <div v-if="isLoading">
      <Loader />
    </div>
    <div v-else>
      <div>
        <div>
          <!-- <home-banner
            :items="items?.advertisement"
            :counter="items?.counters"
          /> -->
          <div>
            <HomeTop />
            <!-- Overlapping cards container -->
            <div v-if="items?.courseCategories.length"
              class="container fluid mx-auto flex flex-col lg:flex-row gap-8 justify-center -mt-[250px] md:-mt-[220px] relative z-20 px-4">
              <!-- Live Category -->
              <HomeCourseCategory v-if="items.courseCategories[0]" :category="items.courseCategories[0]" type="live"
                icon="/icon/present.png" subtitle="অনলাইন ব্যাচ ২০২৫ এর সকল সেমিস্টারে ভর্তি চলছে" />

              <!-- Recorded Category -->
              <HomeCourseCategory v-if="items.courseCategories[1]" :category="items.courseCategories[1]" type="recorded"
                icon="/icon/video-tut.png" subtitle="সকল সেমিস্টারের রেকর্ড ক্লাস ও রেফার্ড কোর্স সমূহ" />
            </div>
          </div>


          <div v-if="items?.courseCategories?.length" class="container fluid mx-auto py-8 md:py-24">
            <div v-for="(courseSection, i) in items.courseCategories" :key="i" :class="[
              'my-4 rounded-3xl p-4',
              (courseSection.slug?.includes('duyet') || courseSection.slug?.includes('duet')) ? 'bg-gradient-to-r from-[#e3ffe7] to-[#d9e7ff]' : '',
              (courseSection.slug?.includes('sajesn') || courseSection.slug?.includes('suggestion')) ? 'bg-[#121220]' : ''
            ]">
              <div v-if="courseSection?.courses?.length">
                <SectionHeading :title="courseSection.label" :course-slug="courseSection.slug" />
                <div v-if="courseSection?.children?.length"
                  class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-6 gap-4 justify-center">
                  <div v-for="(cat, idx) in courseSection.children" :key="idx">
                    <CourseCatCard :cat="cat" />
                  </div>
                </div>
                <HomeCourseSection :courses="courseSection.courses" />
              </div>
            </div>
          </div>


          <!-- <div class="container mx-auto border border-red-500">
            <div v-if="items?.courseCategories && items?.courseCategories.length" class="py-8 md:py-24">
              <div>
                <div class="pl-4 md:pl-0">
                  <CommonSectionHeading title="Special Offers" subtitle="Limited time discounts available"
                    :isM="true" />
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-12">
                  <div v-for="(cat, i) in items?.courseCategories" :key="i">
                    <CommonCardsCourseCatCard :cat="cat" />
                  </div>
                </div>
              </div>
            </div>
          </div> -->


          <!-- <div v-if="items.courses && items.courses.length" class="">
            <div class="">
              <home-course-section :courses="items?.courses" />
            </div>
          </div> -->

          <!-- <div>
            <home-service-banner :items="items?.bannerImage" />
          </div> -->
          <!-- <div v-if="teachers && teachers.length" class="container mx-auto px-4 py-16">
            <common-section-heading title="আমাদের শিক্ষকগণ" />
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
              <div v-for="(item, i) in teachers" :key="i"
                class="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between items-center transition transform hover:scale-105">
                <div class="mb-4 w-40 h-40">
                  <img :src="item?.image?.link" alt="" class="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                  <p class="text-lg font-semibold">{{ item?.name }}</p>
                  <p class="text-gray-600">{{ item?.designation }}</p>
                  <p class="text-sm text-gray-700">{{ item?.description }}</p>
                </div>
              </div>
            </div>
          </div> -->

          <div class="">
            <home-testimonial-section v-if="items?.testimonials && items?.testimonials.length"
              :testimonials="items?.testimonials" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CourseCatCard from "../components/common/cards/CourseCatCard.vue";
import SectionHeading from "../components/common/SectionHeading.vue";
import Loader from "../components/common/share/Loader.vue";
import $api from "../composables/useRequest";
const items = ref([]);
const teachers = ref([]);
const isLoading = ref(false);


const init = async () => {
  isLoading.value = true;
  const { data, pending, error, refresh } = await $api.get("home");
  if (error && error._value) {
    console.log(error);
  } else {
    items.value = data._value;
  }
  isLoading.value = false;
};
await init();

const getInstructor = async () => {
  isLoading.value = true;
  const { data, pending, error } = await $api.get("/team");
  if (error && error._value) {
    console.log(error);
  } else {
    teachers.value = data.value.data?.instructors;
  }
  isLoading.value = false;
};

await getInstructor();
</script>
<style lang="scss" scoped>
.custom-shadow {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}


</style>