<script setup lang="ts">
import Catagory from '~/components/common/catagory.vue'
import Frequent from '~/components/common/frequent.vue'
import Popular from '~/components/common/popular.vue'
import Star from '~/components/common/star.vue'
</script>

<template>
  <div class="flex flex-col gap-10">
    <!-- Navbar is included via default layout -->
    <Catagory />
    <Popular :limit="8" />
    <Star />
    <Frequent />
    <!-- Footer is included via default layout -->
  </div>
  
</template>

<style scoped>
</style>
