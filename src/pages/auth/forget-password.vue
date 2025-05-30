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
          <p class="text-[18px]">Forgot Password?</p>
          <p>
            <small class="text-[16px]"
              >Enter your account email and we will send you an link to
              reset your password.</small
            >
          </p>
        </div>
        <div class="pt-4">
          <FormKit
              type="form"
              id="formkitForm"
              submit-label="Register"
              @submit="submitHandler"
              :actions="false"
              #default="{ value, state: { valid } }"
              #error="{error}"
              incomplete-message="Please fill in the form correctly."
          >
            <FormKit
                type="text"
                name="email"
                placeholder="Email Address"
                validation="required|email"
                help=""
            />
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
                    text="Send Password Reset Link"
                />
              </FormKit>
            </div>
            <!--      <pre wrap>{{ value }}</pre>-->
          </FormKit>

          <Alert v-if="successMessage" type="success">
            {{ successMessage }}
          </Alert>

          <p class="mt-4 md:text-[16px] text-center">Go Back to
            <NuxtLink to="/auth/login" class="text-center md:text-[16px] underline text-[#007acc]">Login</NuxtLink>
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

const successMessage = ref('')
const isLoading = ref(false)


/* method */
const submitHandler = async (payload, node) => {
  if (isLoading.value) return
  node.clearErrors() // clear Previous form errors ...
  isLoading.value = true

  // Prepare data for Upload ..
  const formData = new FormData()
  formData.append('email', payload.email)
  formData.append('password_reset_link', window.location.host + '/auth/reset-password')

  const options = {showSuccess: true, showError: true, successMessage: 'An Email with password reset link has been sent to your email address!'}
  const {data, pending, error, refresh} = await $api.post('send-password-reset-link', formData, options)

  if (error.value) {
    throwFormError(error.value, node) // Show Server side errors in form ...
  } else {
    successMessage.value = data.value?.status || data.value?.email || ''
  }

  isLoading.value = false
}
</script>
