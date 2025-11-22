<template>
  <div class="min-h-screen flex flex-col bg-white text-gray-900">
    <Navbar />
    <main class="flex-1 w-full bg-gradient-to-b from-gray-50 via-white to-white">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '~/components/layout/navbar.vue';
import Footer from '~/components/layout/footer.vue';
</script>
