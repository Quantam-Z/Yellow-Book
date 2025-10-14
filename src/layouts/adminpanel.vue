<template>
    <div class="flex flex-col min-h-screen bg-gray-50">
      <!-- Header at the very top -->
      <Header />
  
      <!-- Below header: sidebar + main content -->
      <div class="flex flex-1">
        <Sidebar />
        <main class="flex-1 p-8">
          <slot />
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '@/components/adminLayout/Sidebar.vue'
  import Header from '@/components/adminLayout/Header.vue'
  </script>
  