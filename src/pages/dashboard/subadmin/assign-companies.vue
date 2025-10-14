<!-- src/pages/dashboard/admin/index.vue -->
<template>
    <div class="w-full space-y-6">
      <AssignCompanies />
    </div>
  </template>
  
  <script setup>
  import AssignCompanies from '~/components/SubAdmin/AssignCompanies.vue'
  
  definePageMeta({
    layout: "subadminpanel",
  })
  </script>
  