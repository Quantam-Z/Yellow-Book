<template>
  <div class="w-full space-y-6">
    <AdminManagement />
   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AdminManagement from '@/components/Admin/AdminManagement.vue'

const isModalOpen = ref(false);

onMounted(() => {
  isModalOpen.value = true;
});

function closeModal() {
  isModalOpen.value = false;
}

definePageMeta({
  layout: "adminpanel",
});
</script>
