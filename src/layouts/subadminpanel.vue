<template>
    <div class="flex flex-col min-h-screen bg-white">
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
  import Sidebar from '~/components/subadminLayout/sidebar.vue'
  import Header from '~/components/subadminLayout/header.vue'
  </script>
  