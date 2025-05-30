<template>
    <main class="min-h-screen">
      <main class="mb-10">
        <slot></slot>
      </main>
      <Footer/>
    </main>
  </template>
  
  <script setup>
  import Footer from "~/components/common/Footer.vue";
  import { useAuthStore } from "~/stores/auth";
  const authStore = useAuthStore();
  authStore.getUser();
  </script>