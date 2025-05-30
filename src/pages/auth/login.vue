<template>
  <div class="max-w-xl bg-[#ffffff] rounded-xl p-8 lg:p-12 flex flex-col w-full m-auto relative shadow-[0_20px_35px_#9600FF15]">
    <Logo class=" mb-6 mx-auto" />
    <h2 class="text-xl mb-1 text-[20px]  font-[600] text-[#17107F] title-font text-center pt-4">মোবাইল নাম্বার দিয়ে এগিয়ে যান</h2>
    <p class="leading-relaxed mb-5 text-base  text-[#414141] text-center">
      আপনার কোর্স শুরু করতে আপনার একাউন্টে লগ ইন করুন
    </p>
    <FormKit
      type="form"
      id="formkitForm"
      submit-label="Register"
      @submit="submitHandler"
      :actions="false"
      #default="{ value, state: { valid } }"
      #error="{ error }"
      incomplete-message="Please fill in the form correctly."
    >
      <div>
        <div>
          <FormKit
            type="text"
            name="phone"
            placeholder="মোবাইল নম্বর"
            validation="required|phone"
            help=""
          />
        </div>
        <small v-if="errors.phone" class="text-red-500">{{
          errors.phone
        }}</small>
      </div>
      <div>
        <div>
          <FormKit
            type="password"
            name="password"
            validation="required|length:6"
            :validation-messages="{
              length: 'Your password must be 6 digits',
            }"
            placeholder="আপনার পাসওয়ার্ড"
            help=""
          />
        </div>
        <small v-if="errors.password" class="text-red-500">{{
            errors.password
          }}</small>
      </div>

      <div class="mt-6">
        <FormKit
          type="submit"
          input-class="$reset w-full"
          :disabled="!valid || isLoading"
        >
          <!-- Custom Auth Button -->
          <AuthButton
            class-name="w-full py-4 rounded-lg"
            :disabled="!valid || isLoading"
            :isLoading="!!isLoading"
            text="লগ ইন করুন"
          />
        </FormKit>
      </div>
      <!--      <pre wrap>{{ value }}</pre>-->
    </FormKit>

    <NuxtLink
      to="/auth/forget-password-phone"
      class="my-4 text-right md:text-[16px] text-[#17107F]"
      >পাসওয়ার্ড ভূলে গেছেন?</NuxtLink
    >

    <p class="mt-4 text-center md:text-[16px]">আপনার কি নতুন ইউজার?</p>
    <div class="mx-auto">
      <NuxtLink to="/auth/register" class="text-center md:text-[16px] text-[#17107F]"
        >সাইন আপ করুন</NuxtLink
      >
    </div>

    <!--    <div v-if="submitted">-->
    <!--      <h2>Submission successful!</h2>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import Logo from "~/components/common/Logo.vue";
import { useAuthStore } from "~/stores/auth";
import AuthButton from "~/components/common/Buttons/AuthButton.vue";
import { redirectTo, throwFormError } from "~/composables/useCommon";

definePageMeta({
  layout: "auth",
  middleware: ["guest"],
});

const authStore = useAuthStore();
const isLoading = ref(false);
const errors = ref({
  email:'',
  password:''
});

const submitHandler = async (payload, node) => {
  if (isLoading.value) return;
  node.clearErrors(); // clear Previous form errors ...
  isLoading.value = true;

  // Prepare data for Upload ..
  const formData = new FormData();
  formData.append("phone", payload.phone);
  formData.append("password", payload.password);

  const { data, pending, error, refresh } = await authStore.login(formData); // call to login action in the auth store ...
  if (error.value) {
    errors.value.email = '';
    errors.value.password = '';
    throwFormError(error.value, node); // Show Server side errors in form ...
    if(error.value.data.phone == 'Account does not exist'){
      errors.value.phone = "The phone doesn't match"
    }
    else{
      errors.value.password = "Password doesn't match"
    }
  } else {
    node.reset();
    redirectTo("/"); /// Redirect to ?next or to given path ...
  }

  isLoading.value = false;
};
</script>
