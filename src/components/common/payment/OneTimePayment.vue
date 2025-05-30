<template>
  <div class="pt-4">
    <!-- <div v-if="isLoading">
      <CommonShareLoader />
    </div> -->
    <div>
      <div class="bg-[#F6F8FC]">
        <div class="container mx-auto text-center">
          <p
            class="text-center text-[16px] md:text-[28px] text-[#2B2B2B] px-2 md:px-0 md:pt-[60px] leading-[44px]"
          >
            Digital Payment
          </p>
          <p
            class="text-center text-[12px] md:text-[16px] text-[#2B2B2B] px-2 md:px-0 leading-[20px]"
          >
            # You can pay us digitally through Bkash.
          </p>
          <div class="flex justify-center py-10">
            <div class="w-full">
              <div class="py-3">
                <div>
                  <p class="text-[16px]">validity duration : <span class="font-extrabold">{{ humanReadableTime(fullPrice.validity_time) }}</span></p>
                </div>
                <p v-if="fullPrice?.discount" class="text-[20px]">
                  Total amount :
                  <span class="line-through">{{ fullPrice?.amount }}</span>
                  <span class="font-extrabold pl-2">{{
                    fullPrice?.amount - fullPrice?.discount
                  }}</span>
                </p>
                <p v-else>Total amount : {{ fullPrice?.amount }}</p>
              </div>
              <div class="flex justify-center">
                <div class="w-[60%]">
                  <div class="py-2 flex justify-between px-2">
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
                  class="w-full md:w-96"
                  @couponDetails="couponDetails($event)"
                  :fullPrice="fullPrice"
                  v-if="isOpen"
                />
              </div>
              <div></div>
              <div class="flex justify-center">
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
    </div>
  </div>
</template>

<script setup>
import $api from "~~/src/composables/useRequest";
const isOpen = ref(false);
const isLoading = ref(false);
const couponInfo = ref({});
const orders = ref({});

const props = defineProps({
  fullPrice: {
    type: Object,
    default: {},
  },
});

const couponDetails = (evn) => {
  couponInfo.value = evn;
};

const makePayment = async () => {
  isLoading.value = true;
  const id = props.fullPrice.id;
  const coupon = couponInfo.value.code;
  const { data, pending, error } = await $api.post("/order", {
    price_id: id,
    coupon: coupon,
  });
  if (error._value) {
    console.log(error);
  } else {
    const orderId = data.value.data.id;
    const amount = data?.value?.data?.amount;
    orders.value = data?.value?.data;
    if (amount > 0) {
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
