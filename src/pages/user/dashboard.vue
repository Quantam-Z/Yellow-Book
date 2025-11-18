<script setup>
definePageMeta({
  layout: 'userprofile',
})

// Redirect away from dashboard to the profile page
await navigateTo('/user/review', { replace: true })
</script>

<template>
  <div />
</template>
