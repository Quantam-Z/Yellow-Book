<template>
  <div>
    <div class="container mx-auto pt-[120px]">
      <div class="h-auto py-6 w-full">
        <p
          class="text-[12px] md:text-[28px] text-[#484FA3] lending-[32px] md:leading-[44px] text-center"
        >
          {{ courseStore.course.title }}
        </p>
        <p
          class="text-[20px] md:text-[44px] text-[#2B2B2B] py-2 md:py-4 lending-[32px] md:leading-[44px] text-center"
        ></p>
        <p
          class="text-[14px] md:text-[18px] text-[#2B2B2B] lending-[32px] md:leading-[44px] text-center"
        ></p>
      </div>
    </div>
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
          <div>
            <div class="py-3">
              <p class="text-[20px]">Total amount : {{ fullPayment.amount }}</p>
            </div>
            <div>
              <div>
                <div class="py-2 flex justify-between px-2">
                  <p
                    @click="isOpen = !isOpen"
                    class="text-[#0072BB] underline cursor-pointer"
                  >
                    প্রোমো কোড
                  </p>
                  <p class="text-[#0072BB] font-extrabold">
                    {{ fullPayment.amount }}
                  </p>
                </div>
              </div>
              <CommonCoupon v-if="isOpen" />
            </div>
            <button
              @click="makePayment"
              class="bg-[#0072BB] text-white px-6 md:px-16 md:py-3 py-2 text-[16px] rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import $api from "~~/src/composables/useRequest";
import { useCourseStore } from "~~/src/stores/course";
const courseStore = useCourseStore();
const route = useRoute();
const id = route.params.orderId;
const isOpen = ref(true);

/* computed */
const fullPayment = computed(() => {
  if (
    courseStore.course &&
    courseStore.course.prices &&
    courseStore.course.prices.length
  ) {
    const payment = courseStore.course.prices.find((it) => {
      return it.type === "full" || it.type === "subscription";
    });
    return payment;
  }
});

const makePayment = async () => {
  const { data, pending, error } = await $api.post("/order", { price_id: id });
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
        console.log(bkashUrl);
        window.location = bkashUrl;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
