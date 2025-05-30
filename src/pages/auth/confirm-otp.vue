<template>
  <div class="pt-[140px]">
    <div
      class="max-w-xl bg-white rounded-xl p-8 lg:p-12 flex flex-col w-full m-auto relative shadow-[0_15px_30px_#9600FF15]"
    >
      <div>
        <div class="flex justify-center">
          <Logo />
        </div>
        <div class="text-left pt-4">
          <p class="text-[18px]">Confirm Email</p>
          <p>
            <small class="text-[16px]"
              >We have sent an OTP to your Email. Enter your OTP to verify your
              email.</small
            >
          </p>
        </div>
        <div class="pt-4">
          <div class="flex justify-center">
            <div class="flex w-[200px] gap-2">
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
              />
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
              />
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
              />
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
              />
            </div>
          </div>
          <div class="mt-6">
            <button
              @click="confirmGetOtp"
              class="w-full bg-[#0072BB] text-white rounded-md py-2"
            >
              Confirm
            </button>
          </div>
          <div class="pt-4 text-center">
            <p class="text-center">Didn’t get a code?</p>
            <nuxt-link to="/auth/forget-password">Resend code</nuxt-link
            ><span class="text-blue-400 pl-2">00:30</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from "~/components/common/Logo.vue";
import { redirectTo, throwFormError } from "~/composables/useCommon";

/* method */
const confirmGetOtp = () => {
    redirectTo('/auth/set-new-password')
};
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}
</style>
