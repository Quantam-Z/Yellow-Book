<template>
  <div class="w-full space-y-6">
    <AdminManagement />
   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AdminManagement from '@/components/common/Admin/adminManagement.vue'

// Modal state
const isModalOpen = ref(false);

// Open modal automatically on page load
onMounted(() => {
  isModalOpen.value = true;
});

// Close modal function
function closeModal() {
  isModalOpen.value = false;
}

// Page layout
definePageMeta({
  layout: "adminpanel",
});
</script>
