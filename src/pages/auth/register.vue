<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
    <form @submit.prevent="register">
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Name</label>
        <input v-model="name" type="text" placeholder="Enter your name"
               class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Email</label>
        <input v-model="email" type="email" placeholder="Enter your email"
               class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Password</label>
        <input v-model="password" type="password" placeholder="Enter your password"
               class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <button type="submit" class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
        Register
      </button>
    </form>
    <p class="mt-4 text-sm text-center">
      Already have an account?
      <NuxtLink to="/auth/login" class="text-blue-500 hover:underline">Login</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')

const register = () => {
  console.log('Register with:', name.value, email.value, password.value)
  // TODO: call your API here
}
</script>
