<template>
  <div class="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">

    <!-- Header -->
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Settings</h1>
      </div>
    </div>

    <div class="h-px bg-gray-200"></div>

    <div class="flex flex-col lg:flex-row gap-8">

      <!-- Sidebar Navigation -->
      <div class="lg:w-1/4 w-full bg-white rounded-lg">
  <nav class="flex lg:flex-col gap-1 text-base font-plus-jakarta-sans">

    <a 
      href="#" 
      @click.prevent="activeTab = 'password'"
      :class="{ 
        'bg-gray-50 text-gold-600 font-semibold border-l-4 border-gold': activeTab === 'password',
        'text-gray-700 hover:bg-gray-50': activeTab !== 'password' 
      }"
      class="px-4 py-3 rounded-lg transition-colors capitalize no-underline"
    >
      Change Password
    </a>

    <a 
      href="#" 
      @click.prevent="activeTab = 'role'"
      :class="{ 
        'bg-gray-50 text-gold-600 font-semibold border-l-4 border-gold': activeTab === 'role',
        'text-gray-700 hover:bg-gray-50': activeTab !== 'role' 
      }"
      class="px-4 py-3 rounded-lg transition-colors capitalize no-underline"
    >
      Role & Permission
    </a>

  </nav>
</div>


      <!-- Content Area -->
      <div class="lg:w-3/4 w-full relative bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 font-plus-jakarta-sans">
        
        <!-- Change Password -->
        <div v-if="activeTab === 'password'">
          <h2 class="text-xl font-bold text-black mb-8 capitalize">Change Password</h2>
          <div class="h-px bg-gray-200 mb-8"></div>

          <form class="flex flex-col gap-5 w-full">
            
            <div class="flex flex-col gap-4">
              <label for="current-password" class="text-sm font-medium text-gray-700">Current Password</label>
              <input
                id="current-password"
                type="password"
                placeholder="Enter current password"
                class="h-[46px] rounded bg-gray-50 border-gray-300 border-solid border box-border p-3 text-gray-700 w-full focus:outline-none focus:border-yellow-400"
              />
            </div>
            
            <div class="flex flex-col gap-4">
              <label for="new-password" class="text-sm font-medium text-gray-700">New Password</label>
              <input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                class="h-[46px] rounded bg-gray-50 border-gray-300 border-solid border box-border p-3 text-gray-700 w-full focus:outline-none focus:border-yellow-400"
              />
            </div>
            
            <div class="flex flex-col gap-4">
              <label for="confirm-password" class="text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                class="h-[46px] rounded bg-gray-50 border-gray-300 border-solid border box-border p-3 text-gray-700 w-full focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div class="flex justify-end w-full mt-6">
              <button 
  type="submit" 
  class="h-12 rounded bg-yellow-400 text-gray-900 font-semibold text-base px-9 
         hover:bg-yellow-500 active:bg-yellow-600 transition-colors shadow-md 
         border-0 focus:outline-none focus:ring-0"
>
  Update Password
</button>
            </div>
          </form>
        </div>

        <!-- Role & Permission -->
        <div v-if="activeTab === 'role'">
          <h2 class="text-xl font-bold text-black mb-6">Role & Permission</h2>
          <div class="h-px bg-gray-200 mb-6"></div>

          <div class="border border-gray-100 rounded-lg divide-y divide-gray-100">
            
            <div class="flex items-center justify-between p-4 cursor-pointer">
              <label class="flex items-center gap-3 text-lg text-gray-800">
                <input type="checkbox" checked class="h-5 w-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400" />
                Manage Users
              </label>
            </div>

            <div class="flex items-center justify-between p-4 cursor-pointer">
              <label class="flex items-center gap-3 text-lg text-gray-800">
                <input type="checkbox" class="h-5 w-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400" />
                Review Management
              </label>
            </div>

            <div class="flex items-center justify-between p-4 cursor-pointer">
              <label class="flex items-center gap-3 text-lg text-gray-800">
                <input type="checkbox" class="h-5 w-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400" />
                Company Verification
              </label>
            </div>
          </div>

          <div class="flex justify-end mt-8">
            <button 
  class="h-12 rounded bg-yellow-400 text-gray-900 font-semibold text-base px-9 
         hover:bg-yellow-500 active:bg-yellow-600 transition-colors shadow-md 
         border-0 focus:outline-none focus:ring-0"
>
  Update Permissions
</button>

          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Default tab set to "Change Password"
const activeTab = ref('password')
</script>
