<template>
  <div>
    <div class="my-6 bg-[#F6F8FC] rounded-3xl p-2">
      <p class="text-[24px] text-center">Partial Payment</p>
      <div v-if="payments && payments.length" class="">
        <div class="py-8 px-8">
          <div class="flex justify-between">
            <p class="text-[20px] text-[#0072BB]">Total Price</p>
            <p v-if="payments[0]?.discount" class="text-[20px]">
              <span class="line-through">{{ payments[0]?.amount }}</span>
              <span class="font-extrabold pl-2">{{ payments[0]?.amount - payments[0]?.discount }}</span>
            </p>
            <p v-else class="text-[20px]">{{ payments[0]?.amount }}</p>
          </div>
          <div class="flex py-4 justify-between">
            <p class="text-[20px] text-[#0072BB]">Number Of Payments</p>
            <p class="text-[20px]">{{ payments.length }}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-[20px] text-[#0072BB]">Payment Schedule:</p>
            <p class="text-[20px]">{{ payments.length }}</p>
          </div>
        </div>
        <div>
          <div>
            <div class="mx-auto px-2 pb-5">
              <!-- all partial payment -->
              <div v-if="payments && payments.length">
                <div
                  v-for="(item, i) in payments"
                  :key="i"
                  :class="
                    i === 0
                      ? 'bg-sky-200 border-green-400 cursor-pointer'
                      : 'bg-gray-300 border-gray-500 text-gray-600'
                  "
                  class="text-sm mb-3 p-3 border-2 rounded-md"
                >
                  <p>{{ item.title }} Payment</p>
                  <div class="inline">
                    <div
                      v-if="item.validity_duration && item.validity_type ==='relative'"
                      class="flex justify-between"
                    >
                      <p>Duration
                      </p>
                      <p>{{ item.validity_duration }} months</p>
                    </div>
                    <div v-if="item.amount" class="flex justify-between">
                      <p>Amount</p>
                      <p>{{ item.amount }}</p>
                    </div>
                    <div v-if="item.discount" class="flex justify-between">
                      <p>Discount</p>
                      <p>{{ item.discount }}</p>
                    </div>
                    <div v-if="item.discount" class="flex justify-between">
                      <p>Sub total</p>
                      <p>{{ item.amount - item.discount }}</p>
                    </div>
                    <div
                      v-if="item.validity_type === 'absolute'"
                      class="flex justify-between"
                    >
                      <p>Validity time</p>
                      <p>{{ humanReadableTime(item.validity_time) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- coupon -->
              <div>
                <div class="flex">
                  <div class="w-[60%]">
                    <div class="py-2 flex justify-between px-1">
                      <p
                        @click="isOpen = !isOpen"
                        class="text-[#0072BB] underline cursor-pointer"
                      >
                        প্রোমো কোড
                      </p>
                    </div>
                  </div>
                </div>
                <div class="flex justify-center">
                  <CommonCoupon
                    @couponDetails="couponDetails($event)"
                    class="w-full mt-2"
                    :fullPrice="selected"
                    v-if="isOpen"
                  />
                </div>
              </div>
              <!-- payment btn -->
              <div class="mt-4 w-full flex justify-center">
                <div v-if="isLoading">
                  <CommonShareBtnLoader />
                </div>
                <div v-else>
                  <button
                    @click="makePayment"
                    class="bg-[#0072BB] text-white px-6 md:px-24 md:py-3 py-2 text-[16px] rounded-lg"
                  >
                    Pay now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <CommonAlert type="warning"
          ><p>No partial payment is available</p></CommonAlert
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import $api from "~~/src/composables/useRequest";

const couponInfo = ref({});
const isLoading = ref(false);
const isOpen = ref(false);
const props = defineProps({
  payments: {
    type: Array,
    required: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  courseSubtitle: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
});

const selected = ref(props.payments[0]);

/* method */

const couponDetails = (evn) => {
  couponInfo.value = evn;
};

const makePayment = async () => {
  isLoading.value = true;
  const id = selected.value.id;
  const coupon = couponInfo.value.code;
  const { data, pending, error } = await $api.post("/order", {
    price_id: id,
    coupon: coupon,
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
      } = await $api.post("/bkash/create-payment", { order_id: orderId });
      if (error._value) {
        console.log(error);
      } else {
        const bkashUrl = payment.value.url;
        window.location = bkashUrl;
      }
    }
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
