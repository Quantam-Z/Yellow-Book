<template>
  <div class="flex flex-col min-h-screen bg-[#f8fafc]">
    <SubAdminHeader />
    <div class="flex flex-1">
      <SubAdminSidebar />
      <main class="flex-1 p-4 sm:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import SubAdminSidebar from '~/components/subAdminLayout/sidebar.vue';
import SubAdminHeader from '~/components/subAdminLayout/header.vue';
</script>
