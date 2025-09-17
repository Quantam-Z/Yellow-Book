<template>
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">Subadmin Reports</h1>
      <table class="w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">ID</th>
            <th class="border px-4 py-2">User</th>
            <th class="border px-4 py-2">Action</th>
            <th class="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report.id" class="hover:bg-gray-50">
            <td class="border px-4 py-2">{{ report.id }}</td>
            <td class="border px-4 py-2">{{ report.user }}</td>
            <td class="border px-4 py-2">{{ report.action }}</td>
            <td class="border px-4 py-2">{{ report.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  const reports = ref<Array<{id:number,user:string,action:string,date:string}>>([])
  
  onMounted(() => {
    // TODO: fetch reports from API
    reports.value = [
      {id:1,user:'John Doe',action:'Updated Company',date:'2025-09-17'},
      {id:2,user:'Jane Smith',action:'Deleted User',date:'2025-09-16'}
    ]
  })
  </script>
  