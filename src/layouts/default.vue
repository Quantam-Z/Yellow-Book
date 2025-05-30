<template>
  <main class="min-h-screen">
    <div class="">
      <Header/>
    </div>
    <main class="min-h-[70vh] mb-12">
      <slot></slot>
    </main>
    <Footer/>
  </main>
</template>

<script setup>
import Header from "~/components/common/Header.vue";
import Footer from "~/components/common/Footer.vue";
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
authStore.getUser();
</script>
