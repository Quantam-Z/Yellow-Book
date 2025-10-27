<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Header at the very top -->
    <Header />

    <!-- Below header: sidebar + main content -->
    <div class="flex flex-1">
      <Sidebar />
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '~/components/userLayout/sidebar.vue'
import Header from '~/components/userLayout/header.vue'
</script>
