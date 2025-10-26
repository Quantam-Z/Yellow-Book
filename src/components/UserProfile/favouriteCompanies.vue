<template>
  <section class="space-y-4">
    <h1 class="text-2xl font-semibold">Favourite Companies</h1>
    <ul class="space-y-2">
      <li v-for="i in 5" :key="i" class="p-4 border rounded-lg">
        Company #{{ i }}
      </li>
    </ul>
  </section>
</template>

<script setup>
</script>
