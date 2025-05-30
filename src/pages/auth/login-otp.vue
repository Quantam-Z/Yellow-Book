<template>
    <div class="container mx-auto">
        <div class=" grid grid-cols-1  items-center justify-center  ">
            <div class="order-2 md:order-1">
                <div class="flex justify-center">
                    <div v-if="isLoading">
                        <Loader />
                    </div>
                    <div v-else class="border-2 rounded-lg mx-4 md:mx-0 p-4 md:p-16">
                        <!--            Phone Number Section -->
                        <div class="flex justify-center">
                            <CommonLogo class-name="w-[156px] h-[85px] " />
                        </div>

                        <div v-if="!isPhoneHave">
                            <!-- Title -->
                            <p class="text-center text-[18px] md:text-[30px] text-[#17107F] font-[600] pb-2">
                                মোবাইল নাম্বার দিয়ে এগিয়ে যান
                            </p>

                            <!-- Subtitle -->
                            <p class="text-center text-[16px] md:text-[20px] font-[400] pb-2">
                                আপনার কোর্স শুরু করতে আপনার একাউন্টে লগইন করুন
                            </p>

                            <!-- Mobile number input field -->
                            <input @keyup.enter="checkIsUser" placeholder="মোবাইল নাম্বার দিন" v-model="phone"
                                class="h-10 md:h-12 w-full border-2 text-[16px] md:text-[20px] rounded-md  focus:border-[#5B31E1] px-1"
                                type="text" />

                            <!-- Submit button -->
                            <button @click="checkIsUser"
                                :class="phone && phone.length == 11 ? 'bg-[#5B31E1] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'"
                                class="w-full mt-3 md:mt-5 text-[16px] md:text-[22px] text-white font-[600] px-6 py-2 md:py-2 rounded-md">
                                সাবমিট করুন
                            </button>
                        </div>
                        <div v-else class="">
                            <!--              Password Section -->
                            <div v-if="isUserExist" class=" w-[300px] md:w-full">
                                <button @click="goPhone">
                                    <Icon size="35" color="#5B31E1" name="system-uicons:arrow-left-circle" />
                                </button>
                                <p class="text-center text-[18px] md:text-[30px] font-['Roboto'] font-[600] pb-2">
                                    Continue with your
                                    password</p>
                                <input @keyup.enter="loginHere" placeholder="Write your password"
                                    v-model="loginPassword"
                                    class="h-10 md:h-12 w-full border-2 text-[16px] md:text-[22px] border-[#5B31E1] rounded-md px-1"
                                    type="password" />
                                <div class="py-2 flex justify-end">
                                    <button @click="forgetPass"
                                        class="text-right md:text-[16px] font-['Roboto'] text-[#5B31E1]">Forgot
                                        password?</button>
                                </div>

                                <button @click="loginHere"
                                    :class="loginPassword && loginPassword.length ? 'bg-[#5B31E1] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'"
                                    class="w-full mt-3 md:mt-5 text-[16px] md:text-[22px] text-white px-6 font-['Roboto'] py-2 rounded-md">Continue</button>
                            </div>
                            <div v-else>
                                <div >
                                    <!-- OTP Section -->
                                    <div v-if="otpStatus != 'accepted'" class="">
                                        <button @click="goPhone">
                                            <Icon size="35" color="#5B31E1" name="system-uicons:arrow-left-circle" />
                                        </button>
                                        <p
                                            class="text-center text-[18px] md:text-[24px] text-[#17107F] font-[600] pb-2">
                                            ওটিপি যাচাইকরন</p>
                                        <div class="mt-2">
                                            <p
                                                class="text-[14px] md:text-xl  text-center">
                                                আপনার মোবাইল নম্বর {{ phone }} পাঠানো OTP প্রবেশ করুন। 
                                                <br> পাসওয়ার্ড রিসেট করার জন্য OTP যাচাই করা আবশ্যক</p>

                                            <div class="mt-3 flex justify-center">
                                                <v-otp-input ref="otpInput" input-classes="otp-input" separator="-"
                                                    :num-inputs="6" :should-auto-focus="true" :is-input-num="true"
                                                    @on-change="" @on-complete="getUserOtp">
                                                </v-otp-input>
                                            </div>
                                            <div class="my-2 text-center">
                                                <p class="text-red-600 font-['Roboto']">{{ errorMessage }}</p>
                                            </div>
                                            <div class="px-3 md:px-0">
                                                <div class="my-2 flex justify-between align-middle">
                                                    <button :disabled="disableResend" type="button"
                                                        :class="disableResend ? 'text-center rounded-md underline text-[#5B31E1]' : 'text-center rounded-md underline'"
                                                        @click="checkIsUser()">Resend Otp</button>
                                                    <Timer :valid-until="validUntil" @timeEnd="disableResend = false" />
                                                </div>
                                            </div>
                                            <div class="px-3 md:px-0">
                                                <button @click="verifyOtp"
                                                    :class="phone && phone.length ? 'bg-[#5B31E1] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'"
                                                    class="w-full mt-3 text-[22px]  text-white px-6 py-2 rounded-md">ভেরিফাই</button>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- when set the otp get to register as a user -->
                                    <div v-if="otpStatus == 'accepted'">
                                        <button @click="goOtp">
                                            <Icon size="35" color="#5B31E1" name="system-uicons:arrow-left-circle" />
                                        </button>
                                        <p
                                            class="text-center text-[24px] md:text-[30px] font-['Roboto'] font-[600] pb-4 md:pb-4">
                                            Continue
                                            with your information</p>
                                        <input v-if="isForgetPass" placeholder="your name" v-model="name"
                                            class="h-10 md:h-12 font-['Roboto'] w-full border-2 text-[16px] md:text-[22px] border-[#5B31E1] rounded-md px-1"
                                            type="text" />
                                        <input placeholder="password" v-model="password"
                                            class="my-2 h-10 md:h-12 font-['Roboto'] w-full border-2 text-[16px] md:text-[22px] border-[#5B31E1] rounded-md px-1"
                                            type="password" />
                                        <input placeholder="retype your password" v-model="con_password"
                                            class="h-10 md:h-12 font-['Roboto'] w-full border-2 text-[16px] md:text-[22px] border-[#5B31E1] rounded-md px-1"
                                            type="password" />
                                        <button @click="isForgetPass ? registerHere() : resetPassword()"
                                            :class="(name && name.length) || (password && password.length && con_password && con_password.length) ? 'bg-[#5B31E1] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'"
                                            class="w-full mt-3 text-[22px] font-['Roboto'] text-white px-6 py-2 rounded-md">Continue</button>
                                    </div>
                                </div>
                                <!-- when user register ge to login -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
  
  <script setup>
  import $api from '~~/src/composables/useRequest';
  import { useAuthStore } from "~/stores/auth";
  import { redirectTo, throwFormError } from "~/composables/useCommon";
  import Timer from '~~/src/components/common/Timer.vue';
  import Loader from '~~/src/components/common/share/Loader.vue';
  
  definePageMeta({
    layout: "auth",
    middleware: ["guest"],
  });
  
  const authStore = useAuthStore();
  const phone = ref(null);
  const name = ref('');
  const password = ref('');
  const loginPassword = ref('');
  const con_password = ref('');
  const isLoading = ref(false);
  const isUserExist = ref(false);
  const isPhoneHave = ref(false);
  const isForgetPass = ref(true);
  const validUntil = ref('');
  const isSent = ref(false);
  const otpInput = ref(null)
  const otp = ref(null);
  const errorMessage = ref('');
  const disableResend = ref(false);
  const otpStatus = ref('');
  const errors = ref({
    email: '',
    password: ''
  });
  
  //   const { data, pending, error, refresh } = await authStore.login(formData);
  
  //method
  
  const goPhone = () => {
    isPhoneHave.value = false
  }
  // check is user 
  
  const checkIsUser = async () => {
    isLoading.value = true
    const { data, pending, error, refresh } = await $api.get(`get-otp?phone=${phone.value}`);
    if (error && error.value) {
      console.log(error);
    }
    else {
      const user = data.value;
      isUserExist.value = user.user_exist;
      isPhoneHave.value = true;
      disableResend.value = true;
      if (data.value?.status === "success") {
        isSent.value = true;
        validUntil.value = data.value.valid_until;
      } else if (data.value?.status === "exists") {
        isSent.value = true;
        validUntil.value = data.value.valid_until;
      }
    }
    isLoading.value = false
  };
  
  const forgetPass = async () => {
    isForgetPass.value = false
    isLoading.value = true
    const { data, pending, error, refresh } = await $api.post('forget-password', { phone: `${phone.value}` });
    if (error && error.value) {
      console.log(error);
    }
    else {
      const user = data.value;
      isUserExist.value = user.user_exist;
      isPhoneHave.value = true;
      disableResend.value = true;
      if (data.value?.status === "success") {
        isSent.value = true;
        validUntil.value = data.value.valid_until;
      } else if (data.value?.status === "exists") {
        isSent.value = true;
        validUntil.value = data.value.valid_until;
      }
    }
    isLoading.value = false
  };
  
  const getUserOtp = (value) => {
    otp.value = value
  }
  const goOtp = () => {
    otpStatus.value = 'anek hoice'
  }
  
  const verifyOtp = async () => {
    isLoading.value = true
    const { data, pending, error, refresh } = await $api.post(`verify-otp`, { otp: otp.value });
    if (error && error.value) {
      throwFormError(error.value);
    }
    else {
      if (data.value?.status === "accepted") {
        otpStatus.value = data.value.status;
        isSent.value = false;
      } else {
        errorMessage.value = data.value.message;
      }
    }
    isLoading.value = false
  };
  
  const loginHere = async () => {
    if (isLoading.value) return;
    isLoading.value = true;
  
    // Prepare data for Upload ..
    const formData = new FormData();
    formData.append("phone", phone.value);
    formData.append("password", loginPassword.value);
  
    const { data, pending, error, refresh } = await authStore.login(formData); // call to login action in the auth store ...
    if (error.value) {
      errors.value.email = '';
      errors.value.password = '';
      throwFormError(error.value); // Show Server side errors in form ...
      if (error.value.data.phone == 'Account does not exist') {
        errors.value.phone = "The phone doesn't match"
      }
      else {
        errors.value.password = "Password doesn't match"
      }
    } else {
      redirectTo("/"); /// Redirect to ?next or to given path ...
    }
  
    isLoading.value = false;
  };
  
  
  const registerHere = async () => {
    if (isLoading.value) return;
    isLoading.value = true;
  
    // Prepare data for Upload ..
    const formData = new FormData();
  
    formData.append("name", name.value);
    formData.append("phone", phone.value);
    formData.append("password", password.value);
    formData.append("password_confirmation", con_password.value);
  
    const { data, pending, error, refresh } = await authStore.register(formData); // call to login action in the auth store ...
    if (error && error.value) {
      throwFormError(error.value); // Show Server side errors in form ...
      errors.value = error.value.data;
    } else {
      redirectTo("/"); /// Redirect to ?next or to given path ...
    }
  
    isLoading.value = false;
  }
  const resetPassword = async () => {
    if (isLoading.value) return;
    isLoading.value = true;
  
    // Prepare data for Upload ..
    const payload = {
      phone: phone.value,
      password: password.value,
      password_confirmation: con_password.value,
    }
  
  
    const { data, pending, error, refresh } = await authStore.reset(payload);
    console.log(data.value);
    if (error && error._value) {
      throwFormError(error.value);
    }
    else {
      redirectTo("/");
    }
  
    isLoading.value = false;
  }
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
  }</style>