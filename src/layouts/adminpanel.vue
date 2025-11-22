<template>
    <div class="flex flex-col min-h-screen bg-white">
      <Header />
        <div class="flex flex-1">
        <Sidebar />
        <main class="flex-1 w-full overflow-x-hidden">
          <div class="mx-auto w-full max-w-7xl px-4 py-6 sm:px-8">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '~/components/adminLayout/sidebar.vue'
  import Header from '~/components/adminLayout/header.vue'
  </script>
  