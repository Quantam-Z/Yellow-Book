<script setup lang="ts">
import Catagory from '~/components/common/Catagory.vue'
import Frequent from '~/components/common/Frequent.vue'
import Popular from '~/components/common/Popular.vue'
import Star from '~/components/common/Star.vue'
</script>

<template>
  <div class="flex flex-col gap-10">
    <!-- Navbar is included via default layout -->
    <Catagory />
    <Popular />
    <Star />
    <Frequent />
    <!-- Footer is included via default layout -->
  </div>
  
</template>

<style scoped>
</style>
