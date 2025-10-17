<template>
  <div class="min-h-screen flex flex-col bg-white text-gray-800">
    <!-- Navbar -->
    <Navbar />

    <!-- Page Content -->
    <main class="flex-1 container mx-auto">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
// Import layout components
import Navbar from '~/components/layout/navbar.vue'
import Footer from '~/components/layout/footer.vue'
</script>

<style scoped>
/* You can add layout-specific styles here if needed */
</style>
