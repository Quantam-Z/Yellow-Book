<template>
  <div class="pt-[70px] overflow-x-hidden">
    <div v-if="isLoading">
      <LazyCommonShareLoader />
    </div>
    <div class="" v-else>
      <div>
        <div class="container mt-8 md:mt-12 rounded-md fluid mx-auto px-2 md:px-4">
          <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-x-12 py-6">
            <div class="p-2 md:p-4 rounded-lg order-2 md:order-1 border hidden md:block">
              <!-- Course Contents -->
              <div v-if="checkAccess.value.sections && checkAccess.value.sections.length" class="">
                <p class="w-full font-bold text-[18px] md:text-[24px] leading-[150%] text-[#212121]">কোর্স কন্টেন্টঃ</p>
                <div class="h-[calc(100vh-200px)] overflow-y-auto  ">
                  <CourseAfterEnrolSection :slug="checkAccess.value.slug" :items="checkAccess.value.sections"
                    :course="checkAccess.value" />
                </div>
              </div>
            </div>
            <!-- course intro -->
            <div class="order-1 md:order-2">
              <NuxtPage :item="checkAccess.value" />

              <!-- Tab Navigation -->
              <div class="mt-6">
                <div class="flex justify-around border-b border-gray-300 w-full overflow-x-auto">
                  <button v-for="(tab, index) in tabs" :key="tab.name" @click="activeTab = tab.name"
                    class="px-4 py-2 text-gray-600 text-base md:text-xl font-medium hover:text-[#17107F] border-b-2 transition-all"
                    :class="{ 'border-[#17107F] text-[#17107F] font-semibold': activeTab === tab.name, 'block md:hidden': index === 1 }">
                    {{ tab.label }}
                  </button>
                </div>
                <div class="mt-4 py-4 px-3 bg-gray-100 rounded-lg shadow-sm space-y-4">

                  <!-- Course Details -->
                  <div v-if="activeTab === 'course-details'">
                    <p v-if="checkAccess.value.course_details?.description" class="text-[16px] break-words leading-[160%] text-justify"
                    v-html="checkAccess.value.course_details?.description  "></p>
                    <p v-else>'কোর্স সম্পর্কিত কোন তথ্য পাওয়া যায়নি।'  </p>
                  </div>

                  <!-- Course Content (Mobile Only) -->
                  <div class="block md:hidden" v-if="activeTab === 'course-content'">
                    <CourseAfterEnrolSection :slug="checkAccess.value.slug" :items="checkAccess.value.sections"
                      :course="checkAccess.value" />
                  </div>

                  <!-- Instructors -->
                  <div v-if="activeTab === 'instructors'" class="p-6">
                    <div v-if="checkAccess.value.instructors?.length">
                      <p class="text-xl font-semibold mb-4 text-[#212121]">এই কোর্সের ইন্সট্রাকটর পরিচিতিঃ</p>
                      <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                        <div v-for="(ins, i) in checkAccess.value.instructors" :key="i"
                          class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
                          <img :src="ins.instructor?.image || '/placeholder.png'" alt="Instructor Image"
                            class="w-24 h-24 rounded-full object-cover mb-3" />
                          <h3 class="text-lg font-bold text-[#212121]">{{ ins.instructor?.name }}</h3>
                          <p class="text-sm text-gray-600 mt-1">{{ ins.instructor?.designation }}</p>
                          <p class="text-sm text-gray-500">{{ ins.instructor?.institute }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Fallback State -->
                    <div v-else class="text-gray-600 italic">
                      <!-- <h3 class="mt-4 text-lg font-medium text-gray-900">ইন্সট্রাকটর পাওয়া যায়নি</h3> -->
                      <p class="mt-2 text-gray-600">এই কোর্সের ইন্সট্রাকটর সম্পর্কিত তথ্য এখনো আপলোড করা হয়নি</p>

                    </div>
                  </div>

                  <!-- Routine -->
                  <div v-if="activeTab === 'routine'">
                    <div v-if="checkAccess.value?.course_details?.pdf_links?.length">
                      <div v-for="(routine, i) in checkAccess.value.course_details.pdf_links" :key="i" class="mb-4">
                        <!-- <CommonPdfViwer :pdf="routine" /> -->
                      </div>
                    </div>
                    <div v-else class="text-gray-600 italic">ক্লাস রুটিন আপলোড করা হয়নি।</div>
                  </div>
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
import CourseAfterEnrolSection from "~~/src/components/custom/CourseAfterEnrolSection.vue";
import $api from "~~/src/composables/useRequest";
import { redirectTo } from "~/composables/useCommon";
import { metaInfo } from "~~/metaTag";
import { useAuthStore } from "~/stores/auth";




definePageMeta({
  middleware: ["auth"],
});

useSeoMeta({
  ogTitle: metaInfo.siteName,
  description: metaInfo.siteDescription,
  ogDescription: metaInfo.siteDescription,
  ogImage: metaInfo.siteLogo,
});

const route = useRoute();
const authStore = useAuthStore();
const slug = route.params.myCourseSlug;
const isLoading = ref(false);
const myCourse = ref({});
const activeTab = ref("course-details"); // Default active tab
const contentSlugs = ref([]);
const currentIndex = ref(0);
authStore.getUser();

// Define tab options
const tabs = [
{ name: "course-details", label: "কোর্স ডিটেইলস" },
  { name: "course-content", label: "কোর্স কনটেন্ট" },
  { name: "routine", label: "ক্লাস রুটিন" },
  { name: "instructors", label: "কোর্স ইন্সট্রাকটর" },
];


const checkAccess = computed(() => {
  const isAccess =
      myCourse.value.subscription_status?.status === "active" ||
      myCourse.value.subscription_status?.status === "expiring-soon";
  if (isAccess) {
    return myCourse;
  } else {
    redirectTo(`/courses/${slug}`);
  }
});

const init = async () => {
  isLoading.value = true;
  const { data, pending, error, refresh } = await $api.get(`courses/${slug}`);
  if (error && error._value) {
    console.log(error);j
    if (error._value.status === 401) {
      await authStore.logout();
    }
  } else {
    myCourse.value = data.value;
  }
  isLoading.value = false;
};


// Watch for route changes to update currentIndex
watch(() => route.params.contentSlug, (newSlug) => {
  currentIndex.value = contentSlugs.value.indexOf(newSlug);
});


init();

</script>
<style lang="scss" scoped>
.btn-gradient {
  background: linear-gradient(98deg, #5B31E1 1.98%, #435BF6 46.09%, #5171F0 100%);
}

.btn-gradient:hover {
  filter: brightness(1.1); /* Slightly increases brightness */
  box-shadow: 0px 4px 10px rgba(67, 91, 246, 0.4); /* Adds a soft shadow */
}
</style>