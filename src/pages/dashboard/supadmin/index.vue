<template>
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">Supadmin Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-blue-500 text-white p-4 rounded shadow">
          <h2 class="text-lg font-semibold">Total Users</h2>
          <p class="text-2xl mt-2">200</p>
        </div>
        <div class="bg-green-500 text-white p-4 rounded shadow">
          <h2 class="text-lg font-semibold">Total Companies</h2>
          <p class="text-2xl mt-2">80</p>
        </div>
        <div class="bg-yellow-500 text-white p-4 rounded shadow">
          <h2 class="text-lg font-semibold">Active Reports</h2>
          <p class="text-2xl mt-2">15</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // TODO: fetch dashboard stats from API
  </script>
  