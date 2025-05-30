<template>
  <div class="container mx-auto md:pt-20 pt-4">
    <CommonSectionHeading title="Our Services"/>
    <div class="rounded-3xl">
      <div v-if="services && services.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-8">
        <div v-for="(service, i) in services" :key="i">
          <CommonCardsServiceCard :service="service" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  services: { type: Array, default: [] },
});
</script>

<style lang="scss" scoped></style>

<!-- #007acc -->
