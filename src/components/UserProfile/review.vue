<template>
  <section class="space-y-4">
    <h1 class="text-2xl font-semibold">My Reviews</h1>
    <div v-for="i in 3" :key="i" class="p-4 border rounded-lg">
      <h3 class="font-medium">Review {{ i }}</h3>
      <p class="text-gray-600">This is a sample review content for demo.</p>
    </div>
  </section>
</template>

<script setup>
</script>
