<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden px-4">
    <!-- Upper Section -->
    <div class="flex p-4 items-center">
      <!-- Photo -->
      <div class="w-12 h-12 rounded-full overflow-hidden ">
        <img 
          class="w-full h-full object-cover"
          :src="item.image?.link || '/images/no_image.jpg'" 
          :alt="item.name || 'Profile'"
        />
      </div>
      
      <!-- Name and Designation -->
      <div class="ml-4 flex-1 min-w-0">
        <h3 v-if="item.name" class="text-base md:text-lg font-semibold text-gray-800 truncate">
          {{ item.name }}
        </h3>
        <p v-if="item.designation" class="text-gray-500 text-[12px] truncate">
          {{ item.designation }}
        </p>
      </div>
    </div>

    <!-- Divider -->
    <hr class="border-gray-100">

    <!-- Lower Section - Description -->
    <div class="bg-white py-4 relative">
      <!-- Quotation Mark Icon -->
      <div class="absolute top-3 left-4 text-[#1D4ED8]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
      </div>
      
      <p class="text-sm text-[#424242] pl-10 pr-4 text-center">
        {{ item.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      name: '',
      designation: '',
      description: '',
      image: { link: '' }
    }),
  },
});
</script>

<style scoped>
/* Smooth transitions for hover effects */
.hover-scale {
  transition: transform 0.2s ease;
}
.hover-scale:hover {
  transform: scale(1.02);
}
</style>