<template>
    <div class="p-6 max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">System Settings</h1>
      <form @submit.prevent="saveSettings" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">Site Name</label>
          <input v-model="settings.siteName" type="text"
                 class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label class="block mb-1 font-medium">Default Role</label>
          <select v-model="settings.defaultRole"
                  class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Admin</option>
            <option>Subadmin</option>
            <option>User</option>
          </select>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save Settings
        </button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue'
  
  const settings = reactive({
    siteName: 'Yellow Book',
    defaultRole: 'User'
  })
  
  const saveSettings = () => {
    console.log('Settings saved:', settings)
    // TODO: call API to save settings
  }
  </script>
  