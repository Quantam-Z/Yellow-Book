<template>
    <div class="pt-[140px]">
        <div
            class="max-w-xl bg-white rounded-xl p-8 lg:p-12 flex flex-col w-full m-auto relative shadow-[0_15px_30px_#9600FF15]">
            <div>
                <div class="flex justify-center">
                    <Logo />
                </div>
                <div v-if="otpStatus !== 'success'" class="text-left pt-4">
                    <p class="text-[20px]  font-[600] text-[#3b6b53] title-font text-center pt-4">পাসওয়ার্ড ভূলে গেছেন?</p>
                    <p class="text-center">
                        <small class="text-[16px]  text-center">আপনার ফোন নম্বর লিখুন, এবং আমরা আপনার পাসওয়ার্ড রিসেট করার জন্য একটি ওটিপি পাঠাব</small>
                    </p>
                </div>
                <div class="pt-4">
                    <div v-if="otpStatus !== 'success'">
                        <FormKit type="form" id="formkitForm" submit-label="Register" @submit="submitHandler"
                            :actions="false" #default="{ value, state: { valid } }" #error="{ error }"
                            incomplete-message="Please fill in the form correctly.">
                            <FormKit v-model="phones" type="tel" name="phone" placeholder="ফোন নাম্বার লিখুন"
                                validation="required|phone" help="" />
                            <p class="text-red-500">{{ phonesNumberError }}</p>
                            <div class="mt-6">
                                <FormKit type="submit" input-class="$reset w-full" :disabled="!valid || isLoading">
                                    <p class="py-2 text-black" v-if="otpStatus == 'exists'">ওটিপি ইতোমধ্যেই পাঠানো হয়েছে! আপনার ফোন চেক করুন।</p>
                                    <!-- Custom Auth Button -->
                                    <AuthButton class-name="w-full py-4 rounded-lg" :disabled="!valid || isLoading"
                                        :isLoading="!!isLoading" text="ওটিপি পাঠান" />
                                </FormKit>
                            </div>
                            <!--      <pre wrap>{{ value }}</pre>-->
                        </FormKit>
                    </div>
                    <div v-else>
                        <p class="text-[14px] md:text-xl">
                            উক্ত নাম্বারে একটি ভেরিফিকেশন কোড পাঠানো হয়েছে
                            {{ `${phones.substring(0, 3)}xxxxx${phones.slice(-3)}` }}. অনুগ্রহ করে নিচে ভেরিফিকেশন কোডটি লিখুন
                        </p>

                        <div class="my-3 flex justify-center">
                            <v-otp-input ref="otpInput" input-classes="otp-input" separator="-" :num-inputs="6"
                                :should-auto-focus="true" :is-input-num="true" @on-change="handleOnChange"
                                @on-complete="handleOnComplete">
                            </v-otp-input>
                            <!--              <div>-->
                            <!--                <Timer :valid-until="validUntil" @timeEnd="disableResend = false" />-->
                            <!--              </div>-->
                        </div>
                        <p class="text-red-500 font-bold text-center pb-2">
                            {{ errorMessage }}
                        </p>
                        <div>
                            <FormKit :disabled="!otpNumber" v-model="password" type="password" name="password"
                                placeholder="নতুন পাসওয়ার্ড দিন " validation="required|length:6" :validation-messages="{
                                    length: 'Your password must be 6 digits',
                                }" help="" />
                        </div>
                        <p></p>
                        <FormKit :disabled="password && password.length >= 6 ? false : true" v-model="password_confirmation"
                            type="password" name="password_confirmation" placeholder="পাসওয়ার্ড নিশ্চিত করুন "
                            validation="required|password_confirmation" help="" />
                        <div v-if="password && password.length" class="flex justify-center">
                            <button
                                :class="password !== password_confirmation ? 'bg-blue-100 cursor-none' : 'bg-green-700 cursor-pointer'"
                                @click="submitNewPassword" class="px-4 py-1 rounded-md text-white">
                                সাবমিট করুন
                            </button>
                        </div>
                    </div>

                    <Alert v-if="successMessage" type="success">
                        {{ successMessage }}
                    </Alert>

                    <p class="mt-4 text-center">
                        <NuxtLink to="/auth/login" class="text-center underline text-[#3b6b53]">লগ ইন</NuxtLink>
                        পেজে ফিরে যান
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import Logo from "~/components/common/Logo.vue";
import { redirectTo, throwFormError } from "~/composables/useCommon";
import $api from "~/composables/useRequest";
import Alert from "~/components/common/Alert.vue";
import AuthButton from "~/components/common/Buttons/AuthButton.vue";

const successMessage = ref("");
const otpStatus = ref("");
const errorMessage = ref("");
const isLoading = ref(false);
const phones = ref(null);
const phonesNumberError = ref("");
const otpNumber = ref(null);
const password = ref("");
const password_confirmation = ref("");
const errors = ref({});

/* method */
const submitHandler = async (payload, node) => {
    phones.value = payload.phone;
    const { data, error } = await $api.get(`/get-otp?phone=${payload.phone}`);
    if (error && error._value) {
        throwFormError(error.value);
        if (error.value.status === 422) {
            phonesNumberError.value = "Phone number is not valid";
        } else if (error.value.status === 500) {
            phonesNumberError.value = "User not fond";
        }
    } else {
        if (data.value.status) {
            otpStatus.value = data.value.status;
        }
    }
};


const handleOnComplete = async (value) => {
    otpNumber.value = value;
};


const submitNewPassword = async () => {
    const otpInfo = {
        phone: phones.value,
        otp: otpNumber.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
        _method: "PUT",
    };
    const { data, error } = await $api.post("/otp/reset-password", otpInfo);
    if (error && error._value) {
        throwFormError(error.value);
    } else {
        if (data.value.status == "success") {
            redirectTo("/profile");
        } else {
            errorMessage.value = data.value.message;
        }
    }
};
</script>
<style>
.otp-input {
    width: 32px;
    height: 32px;
    padding: 5px;
    margin: 0 8px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
}
</style>
  