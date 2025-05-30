<template>
  <div class="flex justify-center">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <CommonShareLoader />
    </div>

    <!-- Content -->
    <div v-else class="w-full max-w-3xl bg-white rounded-xl shadow-md overflow-hidden">
      <!-- Image & Title Section -->
      <div class="flex items-center gap-4 p-4">
        <!-- Image with fixed small size -->
        <div class="flex-shrink-0">
          <img :src="item.image.link || '/placeholder-course.jpg'" :alt="item.title"
            class="object-cover rounded-lg shadow-sm w-[130px] h-[75px] md:w-[160px] md:h-[90px]">
        </div>

        <!-- Title Section -->
        <div class="flex-1 min-w-0">
          <h1 class="text-lg md:text-xl font-bold text-gray-900 line-clamp-2">
            {{ item.title }}
          </h1>
        </div>
      </div>

      <!-- Price Section -->
      <div v-if="item.subscription_status !== 'active' && item?.prices[0]" class="px-6 pb-4 text-center">
        <div class="inline-flex flex-col items-center">
          <div class="flex items-center gap-3">
            <!-- Original Price -->
            <p v-if="item?.prices[0]?.discount" class="text-lg text-gray-500 line-through">
              ৳{{ item?.prices[0]?.amount }}
            </p>

            <!-- Discounted Price -->
            <p class="text-2xl font-bold" :class="item?.prices[0]?.discount ? 'text-green-600' : 'text-[#3b6b53]'">
              ৳{{ item?.prices[0]?.amount - (item?.prices[0]?.discount || 0) }}
            </p>
            <!-- Discount Badge -->
            <p v-if="item?.prices[0]?.discount"
              class="px-3 py-1 bg-emerald-200 text-green-800 text-xs font-medium rounded-full">
              Save ৳{{ item?.prices[0]?.discount }}
            </p>
          </div>


        </div>
      </div>

      <!-- Additional Information Section -->
      <div v-if="isPay" class="p-6 pt-0 space-y-6">
        <!-- Validity Information -->
        <div v-for="(price, i) in item.prices" :key="i" class="space-y-4">
          <div v-if="price.validity_type === 'absolute'" class="flex items-start gap-3">
            <div class="mt-0.5 flex-shrink-0">
              <Icon name="mdi:calendar" class="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">মেয়াদ</p>
              <p class="text-gray-700">{{ humanReadableTime(price.validity_time) }}</p>
            </div>
          </div>

          <div v-if="price.validity_type === 'relative'" class="flex items-start gap-3">
            <div class="mt-0.5 flex-shrink-0">
              <Icon name="mdi:calendar" class="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">মেয়াদ</p>
              <p class="text-gray-700">{{ price.validity_duration }} মাস</p>
            </div>
          </div>
        </div>

        <!-- Coupon Component -->
        <CommonCoupon :fullPrice="item?.prices[0]" @couponDetails="couponDetails($event)" class="mt-6" />
      </div>
    </div>
  </div>
</template>


<script setup>
import moment from "moment";

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  loading: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "",
  },
  isPay: { type: String, default: false },
});
const emit = defineEmits(["couponDetails"]);

const couponDetails = (evn) => {
  emit("couponDetails", evn);
};

const linkTo = () => {
  return props.item;
};
</script>

<style lang="scss" scoped>
.set_border {
  border: 1px solid #007acc;
}

.paybtn {
  background-color: #2563eb;
  color: #007acc !important;
  padding: 4.5px 10px;
  margin: 0px;
  border-radius: 5px;
  text-decoration: none;
}

.designation {
  line-break: anywhere;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

a {
  color: blue;
  text-decoration: underline;
}

@media only screen and (max-width: 600px) {
  .designation {
    line-break: anywhere;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
