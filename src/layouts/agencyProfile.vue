<template>
    <div class="flex flex-col min-h-screen bg-white">
      <!-- header at the very top -->
      <header />
  
      <!-- Below header: sidebar + main content -->
      <div class="flex flex-1">
        <sidebar />
        <main class="flex-1 p-8">
          <slot />
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import sidebar from '@/components/agencyprofileLayout/sidebar.vue'
  import header from '@/components/agencyprofileLayout/header.vue'
  </script>
  