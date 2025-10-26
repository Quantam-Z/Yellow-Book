<template>
  <div class="w-full space-y-6">
    <Dashboard />
  </div>
</template>

<script setup>
import Dashboard from '~/components/UserProfile/dashboard.vue'

definePageMeta({
  layout: 'userprofile',
})
</script>
