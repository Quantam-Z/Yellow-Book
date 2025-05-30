<template>
  <div>
    <div class="flex justify-center">
      <div
        class="w-full md:w-[50%] rounded-md bg-white border-2 border-blue-500 mt-4 set_boxshadow"
      >
        <p class="text-center text-[20px] py-5 px-2">Monthly subscription</p>
        <div>
          <div class="mx-auto px-2 pb-5">
            <RadioGroup v-model="selected">
              <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
              <div class="space-y-2">
                <RadioGroupOption
                  as="template"
                  v-for="(item, i) in checkAllSubscriptions"
                  :key="i"
                  :value="item"
                  v-slot="{ active, checked }"
                >
                  <div
                    :class="[
                      active
                        ? 'border-2 border-[#0072BB]'
                        : 'border-2 border-emerald-200',
                      checked
                        ? 'bg-[#EAFFEA] text-black '
                        : 'bg-[#FFFFFF] text-black ',
                    ]"
                    class="relative cursor-pointer rounded-lg px-8 py-4 shadow-md focus:outline-none"
                  >
                    <div class="w-full">
                      <div class="">
                        <div class="text-sm">
                          <RadioGroupLabel
                            as="p"
                            :class="checked ? 'text-black' : 'text-gray-900'"
                            class="font-medium"
                          >
                            <p>{{ item.title }} Payment</p>
                            <div
                              v-if="item.validity_duration"
                              class="flex justify-between"
                            >
                              <p>Duration</p>
                              <p>{{ item.validity_duration }} months</p>
                            </div>
                            <div class="flex justify-between">
                              <p>Amount</p>
                              <p v-if="item.discount"><span class="line-through pr-2">{{ item.amount }}</span>{{ item.amount - item.discount }}</p>
                              <p v-else>{{ item.amount }}</p>
                            </div>
                            <div>
                            </div>
                          </RadioGroupLabel>
                        </div>
                      </div>
                    </div>
                  </div>
                </RadioGroupOption>
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
              </div>
            </RadioGroup>
            <div
              v-if="checkAllSubscriptions && checkAllSubscriptions.length"
              class="mt-4 w-full flex justify-center"
            >
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
</template>

<script setup>
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@headlessui/vue";
import $api from "~~/src/composables/useRequest";

const couponInfo = ref({});
const isLoading = ref(false);
const isOpen = ref(false);
const props = defineProps({
  checkAllSubscriptions: { type: Array, required: true },
});

const selected = ref(props.checkAllSubscriptions[0]);

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
        console.log(bkashUrl);
        window.location = bkashUrl;
      }
    }
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
