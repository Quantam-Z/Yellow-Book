<template>
  <div
    class="max-w-xl bg-white rounded-xl p-8 lg:p-6 flex flex-col w-full m-auto relative shadow-[0_15px_30px_#9600FF15]"
  >
    <Logo class=" mx-auto" />
    <h2 class="text-xl mb-1   font-[600] text-[#17107F] title-font text-center pt-4">সাইন আপ</h2>
    <p class="leading-relaxed mb-5 text-base text-gray-600  text-center">
      আমাদের সাথে শুরু করার জন্য একটি নতুন অ্যাকাউন্ট তৈরি করুন এবং আপনার যাত্রা শুরু করুন।
    </p>
    <!--        :form-class="isLoading.value ? 'hide' : 'show'"-->
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 py-0 my-0">
        <FormKit
          type="text"
          name="name"
          placeholder="সম্পূর্ন নাম"
          validation="required"
          help="Your full name."
        />
        <!-- <FormKit
          type="text"
          name="institution"
          placeholder="Educational Institute"
          validation="required"
          help=""
        /> -->
<!--        <div>-->
<!--          <div>-->
<!--            <FormKit-->
<!--              v-model="guardian_phone"-->
<!--              type="tel"-->
<!--              name="guardian_phone"-->
<!--              placeholder="আপনার অভিবাবকের ফোন নাম্বার"-->
<!--              validation="matches:/^01[3-9]\d{8}$/"-->
<!--              help=""-->
<!--              :validation-messages="{-->
<!--                matches: 'Guardian phone number must be a valid number.',-->
<!--              }"-->
<!--            />-->
<!--          </div>-->
<!--          <small v-if="errors.guardian_phone" class="text-red-500">{{-->
<!--            errors.guardian_phone && errors.guardian_phone[0]-->
<!--          }}</small>-->
<!--        </div>-->
        <div>
          <div>
            <FormKit
              type="tel"
              name="phone"
              placeholder="আপনার ফোন নাম্বার"
              validation="required | matches:/^01[3-9]\d{8}$/"
              help=""
              :validation-messages="{
                matches: 'phone number must be a valid number.',
              }"
            />
          </div>
          <small v-if="errors.phone" class="text-red-500">{{
            errors.phone && errors.phone[0]
          }}</small>
        </div>
        <!-- <FormKit
          type="tel"
          name="educational_session"
          placeholder="Educational Session"
          validation="required | matches:/^[0-9]/"
          help=""
          :validation-messages="{
            matches: 'educational_session must be a number.',
          }"
        /> -->
        <div class="">
          <div class="relative">
            <!-- |matches:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/ -->
            <FormKit
              v-model="password"
              :type="isShow ? 'text' : 'password'"
              name="password"
              validation="required|length:6"
              :validation-messages="{
                length:
                  'Your password must be 6 digits',
              }"
              placeholder="পাসওয়ার্ড দিন"
              help="At-least 6 characters."
            />
            <div
              @click="isShowPassword"
              class="absolute top-4 right-2 cursor-pointer"
            >
              <Icon
                size="20"
                colo="green"
                :name="isShow ? 'mdi:eye' : 'mdi:eye-off'"
              />
            </div>
          </div>
        </div>
        <div>
          <div class="relative">
            <FormKit
              :disabled="password && password.length ? false : true"
              :type="isShowConfirm ? 'text' : 'password'"
              name="password_confirm"
              placeholder="পুনরায় পাসওয়ার্ড দিন"
              validation="required|confirm"
              help=""
            />
            <div
              @click="isShowConfirmPassword"
              class="absolute top-4 right-2 cursor-pointer"
            >
              <Icon
                size="20"
                colo="green"
                :name="isShowConfirm ? 'mdi:eye' : 'mdi:eye-off'"
              />
            </div>
          </div>
        </div>
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
            text="রেজিস্টার করুন"
          />
        </FormKit>
      </div>
      <!--      <pre wrap>{{ value }}</pre>-->
    </FormKit>
    <p class="mt-2 md:text-[16px] text-center">আপনার কি একাউন্ট আছে?</p>
    <div class="mx-auto">
      <NuxtLink to="/auth/login" class="text-center md:text-[16px] text-[#17107F]"
        >লগ ইন করুন</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
import Logo from "~/components/common/Logo.vue";
import { useAuthStore } from "~/stores/auth";
import AuthButton from "~/components/common/Buttons/AuthButton.vue";

definePageMeta({ layout: "auth" });

const authStore = useAuthStore();
const isLoading = ref(false);
const errors = ref({});
const password = ref(null);
const isShow = ref(false);
const isShowConfirm = ref(false);

// Handel Registration Form Submit ...
const submitHandler = async (payload, node) => {
  if (isLoading.value) return;
  node.clearErrors(); // clear Previous form errors ...
  isLoading.value = true;

  // Prepare data for Upload ..
  const formData = new FormData();

  formData.append("name", payload.name);
  // formData.append("email", payload.email);
  formData.append("phone", payload.phone);
  formData.append("educational_session", payload.educational_session);
  formData.append("institution", payload.institution);
  formData.append("password", payload.password);
  formData.append("password_confirmation", payload.password_confirm);
  if(payload.guardian_phone) formData.append("guardian_phone", payload.guardian_phone);

  const { data, pending, error, refresh } = await authStore.register(formData); // call to login action in the auth store ...
  if (error && error.value) {
    throwFormError(error.value, node); // Show Server side errors in form ...
    errors.value = error.value.data;
  } else {
    node.reset();
    redirectTo("/"); /// Redirect to ?next or to given path ...
  }

  isLoading.value = false;
};

const isShowPassword = () => {
  isShow.value = !isShow.value;
};
const isShowConfirmPassword = () => {
  isShowConfirm.value = !isShowConfirm.value;
};
</script>

<!--           :validation-rules="{ emerrors.email[0]ail }"
          :validation-messages="errors.email && errors.email[0]" -->
