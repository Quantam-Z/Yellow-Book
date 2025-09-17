<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
    <form @submit.prevent="forgotPassword">
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Email</label>
        <input v-model="email" type="email" placeholder="Enter your email"
               class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <button type="submit" class="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
        Send Reset Link
      </button>
    </form>
    <p class="mt-4 text-sm text-center">
      Remember your password?
      <NuxtLink to="/auth/login" class="text-blue-500 hover:underline">Login</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')

const forgotPassword = () => {
  console.log('Reset password link sent to:', email.value)
  // TODO: call your API here
}
</script>
