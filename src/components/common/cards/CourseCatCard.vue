<template>
  <nuxt-link :to="`/course-by-category/${cat.slug}?title=${cat?.title}`">
    <div
      class="category-card text-center border-2  rounded-lg  flex items-center justify-center transition-all duration-300"
    >
      <p class="text-[12px] md:text-[16px]  font-medium px-6 md:px-8 py-3 md:py-[18px]">
        {{ cat?.label }}
      </p>
    </div>
  </nuxt-link>
</template>

<script setup>
const props = defineProps({
  cat: { type: Object, default: {} },
});
</script>

<style scoped>
.category-card {
  color: #17107F;
  background-color: #E8E7F2;
}

.category-card:hover {
  background-color: #17107F;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(23, 16, 127, 0.15);
}
</style>