<template>
  <div class="py-[90px]">
    <div v-if="isLoading">
      <LazyCommonShareLoader />
    </div>
    <div v-else class="container mx-auto px-4 mt-6 md:mt-0 relative">


      <!-- Top Section: Course Title and Subtitle -->

      <div class="gradient-bg rounded-xl p-4 md:p-12 mb-8">
        <!-- Course Intro for mobile view  -->
        <div class="mb-6 md:hidden">
          <div v-if="course.course_details.video" class="rounded-md overflow-hidden">
            <common-youtube-video :src="course.course_details.video" />
             <!-- <CommonOldYTVideo :src="course.course_details.video"/> -->
          </div>
          <img v-else class="w-full h-auto rounded-md shadow-sm"
            :src="course.image?.link ? course.image?.link : '/images/no_image.jpg'" alt="Course thumbnail" />
        </div>
        <div class="mb-8 text-center md:text-left w-full md:w-3/5">
          <h1 class="text-[20px] md:text-4xl text-white font-bold mb-2">{{ course?.title }}</h1>
          <p class="text-base text-[#E0E0E0] mx-auto md:mx-0">{{ course?.subtitle || cousrseDemoSubtitle }}</p>
        </div>
      </div>


      <!-- Middle Section: Course Intro -->
      <div
        class="grid grid-cols-1 gap-8 mb-12 py-4 bg-white border rounded-xl border-black md:absolute md:right-4 md:top-0 md:w-1/3 z-10 shadow-2xl">
        <!-- Video/Image Section -->
        <div class="hidden md:block p-4">
          <div class="">
            <div v-if="course.course_details.video" class="rounded-md overflow-hidden">
              <common-youtube-video :src="course.course_details.video" />
            </div>
            <img v-else class="w-full h-auto rounded-md shadow-sm"
              :src="course.image?.link ? course.image?.link : '/images/no_image.jpg'" alt="Course thumbnail" />
          </div>

          <!-- <div v-if="course.users_count" class="flex items-center gap-x-3 mb-6 p-3 bg-gray-50 rounded-lg">
            <Icon color="#3b6b53" size="24" name="fluent-color:person-available-16" />
            <span class="text-gray-700">
              <span class="font-semibold">{{ translateToBanglaDigits(course?.users_count) }}</span> জন শিক্ষার্থী
              কোর্সটি করেছেন
            </span>
          </div> -->
        </div>




        <!-- Pricing Section -->
        <div class="px-6 pb-4 border-b border-gray-200">
          <div v-if="course?.prices && course?.prices.length && course?.prices[0]?.amount" class="space-y-2">
            <div class="flex items-end gap-3">
              <p v-if="course.prices[0]?.discount" class="text-sm  bg-[#E6F3FD] px-2 py-1 rounded-full">
                {{ Math.round((course.prices[0]?.discount / course.prices[0]?.amount) * 100) }}% ছাড়
              </p>
              <p class="text-2xl font-bold ">
                ৳{{ course?.prices[0]?.amount - (course.prices[0]?.discount || 0) }}
              </p>
              <p v-if="course.prices[0]?.discount" class="text-lg line-through text-gray-500">
                ৳{{ course.prices[0]?.amount }}
              </p>

            </div>
          </div>
          <div v-else>
            <p class="text-2xl font-bold text-[#17107F]">ফ্রি</p>
          </div>
        </div>

                <!-- Coupon Section  -->
                <!-- <div class="px-6 pb-4 border-b border-gray-200">
          <CommonCoupon
              :fullPrice="item?.prices[0]"
              @couponDetails="couponDetails($event)"
            />
         </div> -->

        <!-- Primary Action Button -->
        <div class="px-6">
          <div v-if="course.has_order === false">
            <div v-if="course.subscription_status.status != 'active'">
              <NuxtLink v-if="course?.prices && course?.prices.length" :to="`/courses/${course?.slug}/checkout`"
                class="block w-full text-center px-6 py-3 bg-[#17107F] hover:bg-[#130b6b] text-white font-medium rounded-lg transition-colors">
                কোর্সটি কিনুন
              </NuxtLink>
              <button v-else @click="enrollFree"
                class="w-full py-3 bg-[#17107F] hover:bg-[#130b6b] text-white font-medium rounded-lg transition-colors">
                ফ্রি সাবস্ক্রাইব করুন
              </button>
            </div>
            <div v-else class="text-center">
              <nuxt-link :to="`/my-courses/${course.slug}`"
                class="inline-block w-full px-6 py-3 bg-[#17107F] hover:bg-[#130b6b] text-white font-medium rounded-lg transition-colors">
                শেখা শুরু করুন
              </nuxt-link>
            </div>
          </div>
          <div v-else>
            <button class="w-full py-3 bg-red-500 text-white font-medium rounded-lg cursor-not-allowed">
              অর্ডার প্রক্রিয়াধীন
            </button>
          </div>
        </div>

        <!-- Compact Table-like Features -->
        <div class="p-4 bg-white rounded-lg border border-gray-100">
          <h3 class="text-md font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Icon name="ph:list-bullets" class="text-[#17107F]" size="18" />
            কোর্স ফিচারস
          </h3>

          <div class="flex flex-col divide-y divide-dotted divide-gray-300">
            <div v-for="(item, i) in course.course_details?.features" :key="i"
              class="flex items-start gap-2 py-2 text-sm hover:bg-gray-50 transition-colors">
              <Icon name="ph:check" size="16" class="text-[#17107F] mt-0.5 flex-shrink-0" />
              <span class="text-gray-600">{{ item }}</span>
            </div>
          </div>
        </div>


        <!-- Secondary Action Buttons -->
        <div class="px-6">
          <div class="flex gap-3">
            <!-- Wishlist Button -->
            <button @click="toggleWishlist"
              class="flex items-center justify-center gap-2 px-4 py-2.5 border rounded-lg transition-all flex-1" :class="{
                'border-red-200 bg-red-50 hover:bg-red-100': isInWishlist,
                'border-gray-200 hover:bg-gray-50': !isInWishlist
              }">
              <Icon :name="isInWishlist ? 'material-symbols:bookmark' : 'material-symbols:bookmark-outline-rounded'" size="20" :class="{
                'text-red-500 animate-pulse': isInWishlist,
                'text-gray-500 group-hover:text-red-400': !isInWishlist
              }" />
              <span :class="{
                'font-medium text-red-600': isInWishlist,
                'text-gray-600': !isInWishlist
              }">
                {{ isInWishlist ? 'Bookmarked' : 'Bookmark' }}
              </span>
            </button>

            <!-- Share Button -->
            <button @click="shareCourse"
              class="group flex items-center justify-center gap-2 px-4 py-2.5 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors flex-1">
              <Icon name="ph:share-network" size="20" class="text-blue-500 group-hover:text-blue-600" />
              <span class="text-blue-600 font-medium">Share</span>
            </button>
          </div>
        </div>


      </div>

      <!-- Bottom Section: Tabbed Content -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden w-full md:w-3/5 min-h-[500px]">
        <!-- Tab Navigation -->
        <div class="flex border-b border-gray-200 px-6">
          <button v-for="(tab, index) in tabs" :key="index" @click="activeTab = tab.id" :class="[
            'px-4 py-3 font-medium text-sm md:text-base focus:outline-none',
            activeTab === tab.id
              ? 'border-b-2 border-[#17107F] text-[#17107F]'
              : 'text-gray-500 hover:text-gray-700'
          ]">
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Course Details Tab -->
          <div v-show="activeTab === 'details'" class="animate-fade-in">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">কোর্স বিবরণ</h2>
            <div class="prose max-w-none" v-html="course?.course_details?.description"></div>
          </div>

          <!-- Instructor Tab -->
          <div v-show="activeTab === 'instructors'" class="animate-fade-in">
            <div v-if="course.instructors && course.instructors.length">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">আমাদের মেন্টর</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="(ins, i) in course.instructors" :key="i"
                  class="p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div class="flex items-center">
                    <img class="h-16 w-16 rounded-full object-cover bg-gray-100"
                      :src="ins.image ? ins.image.link : '/author/user.png'" :alt="ins.name" />
                    <div class="ml-4">
                      <p class="text-lg font-semibold text-gray-800">{{ ins.name }}</p>
                      <p class="text-sm text-gray-600 mt-1">{{ ins.designation }}</p>
                      <p class="text-sm text-gray-600">{{ ins.institute }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="flex items-center justify-center h-full">
              <p class="text-gray-500">কোর্সের মেন্টর এখনও যোগ হয়নি।</p>
            </div>
          </div>

          <!-- Syllabus Tab -->
          <div v-show="activeTab === 'syllabus'" class="animate-fade-in">
            <div v-if="course.sections && course.sections.length">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">কোর্স সিলেবাস</h2>
              <CourseBeforeEnrollSection :items="course.sections" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CourseBeforeEnrollSection from "~~/src/components/custom/CourseBeforeEnrollSection.vue";
import $api from "~~/src/composables/useRequest";
import { useCourseStore } from "~~/src/stores/course";
import { useAuthStore } from "~/stores/auth";
import { metaInfo } from "~~/metaTag";
import { redirectTo } from "~/composables/useCommon";

// Tab management
const tabs = [
  { id: 'details', label: 'কোর্স বিবরণ' },
  { id: 'instructors', label: 'মেন্টর' },
  { id: 'syllabus', label: 'সিলেবাস' }
];
const cousrseDemoSubtitle = `সময়টা যেন চোখের পলকে চলে গেল। ৩য় সেমিস্টারের এই কোর্সটা শুধু কিছু বিষয় শেখার জায়গা ছিল না—এটা ছিল একসাথে পথ চলার, শিখতে শেখাতে বড় হয়ে ওঠার একটা যাত্রা। ছবিতে যেসব কোর্সের নাম লেখা আছে, তার প্রতিটা ছিল আমাদের চিন্তা-ভাবনার জগৎকে একটু একটু করে খুলে দেয়ার চাবিকাঠি।
এই কোর্সগুলো আমাদের শুধু একাডেমিক নয়, বাস্তব জীবনের নানা দিকও বুঝতে সাহায্য করেছে। ক্লাসের নোট, টিচারদের কথা, বন্ধুরা মিলে গ্রুপ স্টাডি—সব মিলিয়ে একেকটা মুহূর্ত এখন মনে পড়ে খুব স্পেশাল লাগে।
আমরা হয়তো অনেক কিছুর মধ্য দিয়ে যাচ্ছি—প্রেশার, এক্সাম, অ্যাসাইনমেন্ট—but at the end of the day, এই শিখনটাই আমাদের গন্তব্যের দিকে একটা গুরুত্বপূর্ণ ধাপ।
এই কোর্সটার সাথে যুক্ত সবার জন্য রইল অনেক শুভকামনা। সামনে যেন আরও অনেক কিছু শেখা যায়, আরও অনেক সুন্দর স্মৃতি তৈরি হয়।`;

const activeTab = ref('details');

useSeoMeta({
  ogTitle: metaInfo.siteName,
  description: metaInfo.siteDescription,
  ogDescription: metaInfo.siteDescription,
  ogImage: metaInfo.siteLogo,
});

const courseStore = useCourseStore();
const authStore = useAuthStore();
const route = useRoute();
const slug = route.params.courseSlug;
const course = ref({});
const isLoading = ref(false);
const user = ref({});
const isInWishlist = ref(false); 
const couponInfo = ref({});

const init = async () => {
  isLoading.value = true;
  const { data, pending, error, refresh } = await $api.get(`courses/${slug}`);
  if (error && error._value) {
    console.log(error);
  } else {
    course.value = data.value;
    courseStore.setCourse(course.value);
  }
  isLoading.value = false;
};

const couponDetails = (evn) => {
  couponInfo.value = evn;
  console.log(evn);
  
};
const enrollFree = async () => {
  if (authStore?.isLoggedIn === true) {
    const url = 'free-course-purchase'
    isLoading.value = true;
    const id = course.value?.prices[0]?.id;
    const { data, pending, error } = await $api.post("/order", {
      price_id: id
    });
    if (error._value) {
      console.log(error);
    } else {
      const orderId = data.value.data.id;
      if (orderId) {
        const {
          data: payment,
          pending,
          error,
        } = await $api.post(url, { order_id: orderId });
        if (error._value) {
          console.log(error);
        } else {
          const bkashUrl = payment.value.url ? payment.value.url : '/profile/my-course';
          window.location = bkashUrl;
        }
      }
      isLoading.value = false;
    }
  }
  else {
    redirectTo("/auth/login");
  }
}

if (authStore.user?.email_verified_at === null) {
  authStore.getUser().then((res) => {
    user.value = res.data.data;
  });
} else {
  user.value = authStore.user;
}
init();


const toggleWishlist = () => {
  // Implement wishlist toggle logic
  isInWishlist.value = !isInWishlist.value;
};

const shareCourse = () => {
  // Implement share functionality
  if (navigator.share) {
    navigator.share({
      title: course.title,
      text: 'Check out this course!',
      url: window.location.href
    });
  } else {
    // Fallback for browsers that don't support Web Share API
    // Could copy to clipboard or open a modal with share options
  }
};
// dynamic meta data
useHead({
  meta: [
    {
      name: "description",
      content: () => course.value?.subtitle || '',
    },
    {
      name: "description",
      content: () => course.value?.subtitle || '',
    },
    { property: "og:title", content: () => course.value?.title || 'dmcan web' },
    { property: "og:description", content: () => course.value?.subtitle || '' },
    { property: "og:image", content: () => course.value?.image?.link || 'https://i.ibb.co/pxR9cjz/dmc-logo.png' },
  ],
});

function translateToBanglaDigits(number) {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number.toString().split('').map(digit => banglaDigits[digit]).join('');
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
.gradient-bg{
  /* background-image: linear-gradient( 180.4deg,  rgba(0,6,10,1) 1%, rgba(1,190,237,1) 91.4% ); */
  background-image: linear-gradient(135deg, rgba(0,6,10,1), rgba(1,190,237,1));

}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.prose :deep(p) {
  @apply text-gray-700 mb-3;
}

.prose :deep(ul) {
  @apply list-disc pl-5 mb-4;
}

.prose :deep(li) {
  @apply mb-2;
}
</style>