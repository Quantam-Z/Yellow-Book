<template>
  <div class="min-h-screen flex flex-col bg-white text-gray-800">
    <!-- navbar -->
    <navbar />

    <!-- Page Content -->
    <main class="flex-1 container mx-auto">
      <slot />
    </main>

    <!-- footer -->
    <footer />
  </div>
</template>

<script setup lang="ts">
// Import layout components
import navbar from '@/components/layout/navbar.vue'
import footer from '@/components/layout/footer.vue'
</script>

<style scoped>
/* You can add layout-specific styles here if needed */
</style>
