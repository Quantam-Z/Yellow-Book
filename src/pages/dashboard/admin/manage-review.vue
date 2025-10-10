<template>
    <div class="w-full space-y-6">
      <!-- Use the component with correct casing -->
      <ReviewManagement />
    </div>
  </template>
  
  <script setup>
import ReviewManagement from '~/components/Admin/ReviewManagement.vue';
  
  // Page layout
  definePageMeta({
    layout: "adminpanel",
  });
  </script>
  