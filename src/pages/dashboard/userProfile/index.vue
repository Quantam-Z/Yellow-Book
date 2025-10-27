<script setup>
definePageMeta({
  layout: 'userprofile',
})

// Redirect away from dashboard to the profile page
await navigateTo('/dashboard/userProfile/review', { replace: true })
</script>

<template>
  <div />
</template>
