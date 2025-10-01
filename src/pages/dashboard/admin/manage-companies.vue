<!-- src/pages/dashboard/admin/index.vue -->
<template>
  <div class="w-full space-y-6">
   <CompanyManagement />
  </div>
</template>

<script setup>
import CompanyManagement from '~/components/common/Admin/CompanyManagement.vue';



definePageMeta({
  layout: "adminpanel",
});
</script>