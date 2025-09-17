<template>
    <footer class="bg-gray-900 text-gray-300 py-6 mt-8">
      <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <!-- Left -->
        <p class="text-sm">
          © {{ new Date().getFullYear() }} Yellow Book. All rights reserved.
        </p>
  
        <!-- Right -->
        <div class="flex space-x-4 mt-3 md:mt-0">
          <NuxtLink to="/about" class="hover:text-white transition">About</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-white transition">Contact</NuxtLink>
          <a href="https://github.com/" target="_blank" rel="noopener" class="hover:text-white transition">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup lang="ts">
  </script>
  