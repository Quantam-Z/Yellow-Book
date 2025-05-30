<template>
  <div class="text-left">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-6 px-4 md:px-2">
      <div v-for="(course, i) in courses" :key="i">
        <CommonCardsCourseCard :item="course" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  courses: { type: Array, default: () => [] }
})
</script>