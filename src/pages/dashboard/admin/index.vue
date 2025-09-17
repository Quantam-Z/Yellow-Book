<template>
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-blue-500 text-white p-4 rounded shadow">
          <h2 class="text-lg font-semibold">Total Users</h2>
          <p class="text-2xl mt-2">123</p>
        </div>
        <div class="bg-green-500 text-white p-4 rounded shadow">
          <h2 class="text-lg font-semibold">Total Companies</h2>
          <p class="text-2xl mt-2">45</p>
        </div>
        <div class="bg-yellow-500 text-white p-4 rounded shadow">
          <h2 class="text-lg font-semibold">Pending Approvals</h2>
          <p class="text-2xl mt-2">8</p>
        </div>
        <div class="bg-red-500 text-white p-4 rounded shadow">
          <h2 class="text-lg font-semibold">Reports</h2>
          <p class="text-2xl mt-2">12</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // You can fetch dashboard stats from API here
  </script>
  