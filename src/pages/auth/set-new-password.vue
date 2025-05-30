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
          <p class="text-[18px]">Create new password</p>
          <p>
            <small class="text-[16px]"
              >Set up a new password to login to your account.</small
            >
          </p>
        </div>
        <div class="pt-4">
          <FormKit
            type="password"
            name="password"
            validation="required|length:6|matches:/[a-zA-Z]/"
            :validation-messages="{
              matches: 'Please include at least one symbol',
            }"
            placeholder="Password"
            help=""
          />
          <FormKit
            type="password"
            name="confirmPassword"
            validation="required|length:6|matches:/[a-zA-Z]/"
            :validation-messages="{
              matches: 'Please include at least one symbol',
            }"
            placeholder="confirm password"
            help=""
          />
          <div class="mt-6">
            <button
              class="w-full bg-[#0072BB] text-white rounded-md py-2"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from "~/components/common/Logo.vue";
const userEmail = ref("");

/* method */
const setNewOtp = () => {
  console.log(userEmail.value);
};
</script>
