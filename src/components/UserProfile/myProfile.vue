<template>
  <div class="w-full min-h-screen bg-white">
    <!-- Top gradient header -->
    <div class="rounded-xl border border-gray-200 shadow-sm bg-gradient-to-r from-indigo-500/15 via-pink-500/15 to-amber-400/15 px-4 sm:px-6 py-3 sm:py-4 mb-6 flex items-center justify-between">
      <h1 class="text-lg sm:text-xl font-semibold text-gray-900">My Profile</h1>
      <button type="button" class="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm px-4 py-2 rounded shadow">
        List Your Company
      </button>
    </div>

    <!-- Profile information card -->
    <div class="rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 max-w-3xl">
      <div class="pb-4 mb-4 border-b border-dashed">
        <h2 class="text-base sm:text-lg font-semibold text-gray-900">Profile Information</h2>
      </div>

      <form @submit.prevent="updateProfile" class="space-y-4">
        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            id="name"
            type="text"
            v-model="form.name"
            class="w-full h-11 rounded-md bg-white px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-transparent border-none shadow-none"
            placeholder="Wade Warren"
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            class="w-full h-11 rounded-md bg-white px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-transparent border-none shadow-none"
            placeholder="Curtis.Weaver@Example.Com"
          />
        </div>

        <!-- Mobile -->
        <div>
          <label for="mobile" class="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
          <input
            id="mobile"
            type="tel"
            v-model="form.mobile"
            class="w-full h-11 rounded-md bg-white px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-transparent border-none shadow-none"
            placeholder="+521464532"
          />
        </div>

        <div class="pt-2">
          <button
            type="submit"
            class="w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold px-6 py-3 rounded shadow"
          >
            Update Profile
          </button>
        </div>
      </form>

      <p v-if="success" class="mt-4 text-sm text-green-600">Profile updated successfully.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  name: 'Wade Warren',
  email: 'Curtis.Weaver@Example.Com',
  mobile: '+521464532',
})

const success = ref(false)

function updateProfile() {
  success.value = true
  setTimeout(() => (success.value = false), 2500)
}
</script>

<style scoped>
</style>
