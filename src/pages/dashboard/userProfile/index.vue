<script setup>
definePageMeta({
  layout: 'userprofile',
})

// Redirect away from dashboard to the profile page
await navigateTo('/dashboard/userProfile/my-profile', { replace: true })
</script>

<template>
  <div />
  <!-- intentionally empty: page redirects to my-profile -->
</template>
