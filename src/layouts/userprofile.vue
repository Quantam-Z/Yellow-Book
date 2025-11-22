<template>
  <div class="flex flex-col min-h-screen bg-white panel-shell">
    <!-- Header at the very top -->
    <Header />

    <!-- Below header: sidebar + main content -->
    <div class="flex flex-1 panel-shell__body">
      <div class="panel-shell__sidebar">
        <Sidebar />
      </div>
      <main class="flex-1 w-full overflow-x-hidden panel-shell__main">
        <div class="panel-shell__content mx-auto w-full max-w-7xl px-4 py-6 sm:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '~/components/userLayout/sidebar.vue'
import Header from '~/components/userLayout/header.vue'
</script>
