<template>
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">Manage Companies</h1>
      <table class="w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">ID</th>
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Owner</th>
            <th class="border px-4 py-2">Email</th>
            <th class="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company in companies" :key="company.id" class="hover:bg-gray-50">
            <td class="border px-4 py-2">{{ company.id }}</td>
            <td class="border px-4 py-2">{{ company.name }}</td>
            <td class="border px-4 py-2">{{ company.owner }}</td>
            <td class="border px-4 py-2">{{ company.email }}</td>
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
  
  const companies = ref<Array<{id:number,name:string,owner:string,email:string}>>([])
  
  onMounted(() => {
    // TODO: fetch companies from API
    companies.value = [
      {id:1,name:'Tech Solutions',owner:'Alice',email:'alice@tech.com'},
      {id:2,name:'Green Corp',owner:'Bob',email:'bob@green.com'},
    ]
  })
  </script>
  