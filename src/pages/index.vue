<script setup lang="ts">
import catagory from '~/components/common/catagory.vue'
import frequent from '~/components/common/frequent.vue'
import popular from '~/components/common/popular.vue'
import star from '~/components/common/star.vue'
</script>

<template>
  <div class="flex flex-col gap-10">
    <!-- navbar is included via default layout -->
    <catagory />
    <popular />
    <star />
    <frequent />
    <!-- footer is included via default layout -->
  </div>
  
</template>

<style scoped>
</style>
