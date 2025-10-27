<template>
    <div class="flex flex-col min-h-screen bg-white">
      <Header />
        <div class="flex flex-1">
        <Sidebar />
        <main class="flex-1 p-6">
          <slot />
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '~/components/adminLayout/sidebar.vue'
  import Header from '~/components/adminLayout/header.vue'
  </script>
  