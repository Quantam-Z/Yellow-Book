<template>
  <div class="container mx-auto pt-[110px]">
    <div v-if="isLoading">
      <CommonShareLoader />
    </div>
    <div v-else>
      <!-- Main Content Grid -->
      <div class="mx-2">
        <div class="grid grid-cols-1 md:grid-cols-2 pt-2 md:pt-12 gap-6 md:gap-12">
          <!-- Course Info Section -->
          <div class="rounded-lg bg-white shadow-lg p-4">
            <CommonTextSection2 @couponDetails="couponDetails($event)" @selectedPrice="selectedPrice = $event"
              :isPay="true" :item="courseStore.course" />
          </div>

          <!-- Payment Method Section -->
          <div class="rounded-lg bg-white shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              পেমেন্ট মেথড নির্বাচন করুন
            </h2>

            <div class="flex flex-col gap-y-4 md:flex-row md:gap-x-6">
              <!-- Bkash  -->
              <!-- <div @click="type = 'bkash'"
                class="flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all"
                :class="type === 'bkash' ? 'border-[#17107F] bg-[#f0f9f8]' : 'border-gray-200 hover:border-gray-300'">
                <input type="radio" id="bkash" v-model="type" value="bkash"
                  class="h-5 w-5 text-[#01524c] focus:ring-[#17107F]">
                <label for="bkash" class="ml-4 flex items-center w-full">
                  <img src="/logo/bkashlogo.svg" alt="bKash" class="h-10">
                  <span class="ml-auto text-gray-600">
                    <Icon v-if="type === 'bkash'" name="material-symbols:check-circle"
                      class="text-[#17107F] text-2xl" />
                  </span>
                </label>
              </div> -->

             <!-- SSL  -->
              <div @click="type = 'ssl'"
                class="flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all"
                :class="type === 'ssl' ? 'border-[#17107F] bg-[#f0f9f8]' : 'border-gray-200 hover:border-gray-300'">
                <input type="radio" id="nagad" v-model="type" value="ssl"
                  class="h-5 w-5 text-[#17107F] focus:ring-[#17107F]">
                <label for="ssl" class="ml-4 flex items-center w-full">
                  <img src="/logo/ssl-logo.png" alt="ssl" class="h-10">
                  <span class="ml-auto text-gray-600">
                    <Icon v-if="type === 'ssl'" name="material-symbols:check-circle"
                      class="text-[#17107F] text-2xl" />
                  </span>
                </label>
              </div>

              
              <!-- <div @click="type = 'rocket'"
                class="flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all"
                :class="type === 'rocket' ? 'border-[#17107F] bg-[#f0f9f8]' : 'border-gray-200 hover:border-gray-300'">
                <input type="radio" id="rocket" v-model="type" value="rocket"
                  class="h-5 w-5 text-[#17107F] focus:ring-[#17107F]">
                <label for="rocket" class="ml-4 flex items-center w-full">
                  <img src="/logo/rocket.png" alt="Rocket" class="h-10">
                  <span class="ml-auto text-gray-600">
                    <Icon v-if="type === 'rocket'" name="material-symbols:check-circle"
                      class="text-[#17107F] text-2xl" />
                  </span>
                </label>
              </div> -->
            </div>
          </div>

          <!-- <CommonPaymentOneTimePayment :fullPrice="selectedPrice"/> -->
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="flex flex-col gap-y-4 px-2 mt-6">
        <!-- Important Notice -->
        <div class="rounded-lg bg-white shadow-lg p-4">
          <div
            class="p-4 bg-gradient-to-r from-[#17107F] to-[#0A0752] text-white rounded-lg shadow-md border-l-4 border-blue-300">
            <div class="flex items-start">
              <div class="flex-shrink-0 pt-0.5">
                <Icon name="mdi:alert-circle-outline" class="w-5 h-5 text-blue-200" />
              </div>
              <div class="ml-3">
                <p class="text-justify text-sm md:text-base leading-relaxed">
                  <span class="font-semibold">দ্রষ্টব্য:</span> পেমেন্ট গেটওয়েতে প্রবেশ করে আপনার পেমেন্ট সম্পন্ন হওয়ার
                  পর অনুগ্রহ করে নিশ্চিতকরণের জন্য ৫-৬ সেকেন্ড অপেক্ষা করুন। নিশ্চিতকরণ না আসা পর্যন্ত পেজটি বন্ধ করবেন
                  না বা ত্যাগ করবেন না।
                </p>
              </div>
            </div>
          </div>

          <!-- Terms Checkbox -->
          <div class="flex items-center justify-center pt-4">
            <input type="checkbox" id="terms" v-model="isChecked"
              class="w-5 h-5 text-[#17107F] rounded focus:ring-[#17107F]">
            <label for="terms" class="text-gray-700 text-sm md:text-base ml-3">
              I have read and agree to the <NuxtLink to="/terms_conditions" class="text-[#17107F] font-medium">Terms &
                Conditions</NuxtLink>,
              <NuxtLink to="/privacy_policy" class="text-[#17107F] font-medium">Privacy Policy</NuxtLink>, and
              <NuxtLink to="/refund_policy" class="text-[#17107F] font-medium">Refund Policy</NuxtLink>
            </label>
          </div>
        </div>

        <!-- Payment Button -->
        <div class="flex justify-center px-4">
          <button @click="makePayment(type)" :disabled="!isChecked"
            class="w-full font-semibold text-white text-lg px-10 py-3 rounded-full transition-all" :class="isChecked
              ? 'bg-gradient-to-r from-[#17107F] to-[#06968d] hover:from-[#06968d] hover:to-[#17107F] shadow-lg'
              : 'bg-gray-400 cursor-not-allowed'">
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useCourseStore} from "~~/src/stores/course";
import $api from "~~/src/composables/useRequest";
import {redirectTo} from "~/composables/useCommon";
// import PageHeading from "~/components/common/PageHeading.vue";
import {Switch} from "@headlessui/vue";
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@headlessui/vue";
import {metaInfo} from "~~/metaTag";
// import AutoScrollButton from "~/components/common/AutoScrollButton.vue";

definePageMeta({
  middleware: ["auth"],
});
useSeoMeta({
  title: () => "Payment - Karigori Pathshala",
  description: metaInfo.siteDescription,
  ogDescription: metaInfo.siteDescription,
  ogImage: metaInfo.siteLogo,
});

const selectedPrice = ref({});
const isLoading = ref(false);
const courseStore = useCourseStore();
const route = useRoute();
const couponInfo = ref({});
const type = ref("ssl");
const isChecked = ref(false);
if (
    courseStore.course &&
    Object.keys(courseStore.course).length &&
    courseStore.course.slug === route.params.courseSlug
) {
  selectedPrice.value = courseStore.course.prices[0];
} else {
  isLoading.value = true;
  const {data, pending, error} = await $api.get(
      `/courses/${route.params.courseSlug}`
  );
  if (error && error._value) {
    console.log(error);
  } else {
    selectedPrice.value = data.value.prices[0];
    isLoading.value = false;
    courseStore.setCourse(data.value);
  }
  isLoading.value = false;
}

const couponDetails = (evn) => {
  couponInfo.value = evn;
};

const makePayment = async (type) => {
  isLoading.value = true;
  const id = selectedPrice.value.id;
  const coupon = couponInfo.value.code;
  const {data, pending, error} = await $api.post("/order", {
    price_id: id,
    coupon: coupon,
  });
  if (error._value) {
    console.log(error);
  } else {
    const orderId = data.value.data.id;
    if (orderId) {
      if (type === "bkash") {
        await pay("/bkash/create-payment", orderId);
      } else {
        await pay("/sslcommerz/create-payment", orderId);
      }
    }
    isLoading.value = false;
  }
};

const pay = async (url, orderId) => {
  const {
    data: payment,
    pending,
    error,
  } = await $api.post(url, {order_id: orderId});
  if (error._value) {
    console.log(error);
  } else {
    window.location = payment.value.url;
  }
};
</script>
<style lang="scss" scoped>
.hoverable {
  overflow: hidden;
}

.hoverable:hover {
  transform: scale(1.4);
  transition: 0.5s;
}

.opacity {
  position: absolute;
  opacity: 0;
  width: 0;
}
</style>