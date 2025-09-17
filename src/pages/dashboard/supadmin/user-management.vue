<template>
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">User Management</h1>
      <table class="w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">ID</th>
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Email</th>
            <th class="border px-4 py-2">Role</th>
            <th class="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <td class="border px-4 py-2">{{ user.id }}</td>
            <td class="border px-4 py-2">{{ user.name }}</td>
            <td class="border px-4 py-2">{{ user.email }}</td>
            <td class="border px-4 py-2">{{ user.role }}</td>
            <td class="border px-4 py-2">
              <button class="text-blue-500 hover:underline mr-2">Edit</button>
              <button class="text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  const users = ref<Array<{id:number,name:string,email:string,role:string}>>([])
  
  onMounted(() => {
    // TODO: fetch all users from API
    users.value = [
      {id:1,name:'John Doe',email:'john@example.com',role:'Admin'},
      {id:2,name:'Jane Smith',email:'jane@example.com',role:'Subadmin'}
    ]
  })
  </script>
  