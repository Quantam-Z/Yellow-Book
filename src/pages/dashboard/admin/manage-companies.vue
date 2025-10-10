<template>
  <div class="w-full space-y-6">
    <AdminManagement />
    <!-- <AddCompany :isOpen="isModalOpen" @close="closeModal" /> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import AddCompany from '~/components/modal/AddCompany.vue';
import AdminManagement from '@/components/Admin/CompanyManagement.vue';

// const isModalOpen = ref(false);

// onMounted(() => {
//   isModalOpen.value = true;
// });

// function closeModal() {
//   isModalOpen.value = false;
// }

definePageMeta({
  layout: "adminpanel",
});
</script>