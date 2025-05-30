<template>
  <div class="relative w-full flex flex-col space-y-2">
    <label for="coupon" class="text-[16px] font-semibold text-gray-700"> 
      🎟️ কুপন কোড
    </label>
    
    <div class="relative flex items-center w-full">
      <input
        v-model="couponCode"
        class="w-full border border-gray-300 rounded-lg px-4 h-12 pr-[100px] bg-white shadow-sm focus:ring-1 focus:ring-[#17107F] focus:17107F-[#3b6b53] transition-all"
        placeholder="প্রোমো কোড দিন"
        type="text"
        id="coupon"
      />
      <button
        :disabled="isTrue"
        v-if="couponCode && couponCode.length"
        @click="submitCoupon"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#17107F] text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-[#17107D] disabled:opacity-50 disabled:cursor-not-allowed"
      >
      Apply Coupon
      </button>
    </div>

    <div v-if="coupon && coupon.discount" class="mt-2">
      <CommonAlert type="success">
        <p class="text-green-700 font-medium">
          🎉 Final price: <strong>{{ fullPrice.amount - coupon.discount }} &#x9F3;</strong>
        </p>
      </CommonAlert>
    </div>

    <p class="text-red-500 text-sm font-medium" v-if="erMessage && erMessage.length">
      ❌ {{ erMessage }}
    </p>
  </div>
</template>


<script setup>
import $api from "~~/src/composables/useRequest";

const emit = defineEmits(["couponDetails"]);
const couponCode = ref(null);
const isTrue = ref(false);
const coupon = ref({});
const erMessage = ref("");
const props = defineProps({
  fullPrice: {
    type: Object,
    default: {},
  },
});

const submitCoupon = async () => {
  const couponData = {
    price_id: props.fullPrice.id,
    code: couponCode.value,
  };
  const { data, pending, error } = await $api.post(
    "/verify-coupon",
    couponData
  );
  if (error._value) {
    erMessage.value = "This code is not valid";
  } else {
    isTrue.value = true;
    coupon.value = data.value;
    erMessage.value = "";
    emit("couponDetails", data.value);
  }
};
</script>

<style lang="scss" scoped></style>
