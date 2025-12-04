<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Teleport to="body">
    <LoginModal :isOpen="isLoginModalOpen" @close="closeLoginModal" />
  </Teleport>
</template>

<script setup lang="ts">
import LoginModal from '@/components/common/loginModal.vue'
import { useLoginModal } from '@/composables/useLoginModal'

const { isLoginModalOpen, closeLoginModal } = useLoginModal()
</script>
