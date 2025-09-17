<template>
    <header class="bg-gray-900 text-gray-100 shadow">
      <div class="container mx-auto flex justify-between items-center py-4 px-4">
        <!-- Logo -->
        <NuxtLink to="/" class="text-xl font-bold text-yellow-400">
          Yellow Book
        </NuxtLink>
  
        <!-- Nav Links -->
        <nav class="space-x-6">
          <NuxtLink to="/" class="hover:text-yellow-400">Home</NuxtLink>
          <NuxtLink to="/about" class="hover:text-yellow-400">About</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-yellow-400">Contact</NuxtLink>
        </nav>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  // ✅ No self-imports, no layout imports
  </script>
  