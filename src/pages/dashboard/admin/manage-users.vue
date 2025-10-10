<template>
  <div class="w-full space-y-6">
    <!-- Use the component with correct casing -->
    <ManageUsers />
  </div>
</template>

<script setup>
import ManageUsers from '~/components/Admin/manage-users.vue';

// Page layout
definePageMeta({
  layout: "adminpanel",
});
</script>
