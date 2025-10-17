<!-- src/pages/dashboard/admin/index.vue -->
<template>
  <div class="w-full space-y-6">
    <!-- Welcome Section -->
    <WelcomeComponent />

    <!-- Activity (30%) + Review (70%) -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
      <!-- Recent Activity (30%) -->
      <div class="xl:col-span-4">
        <div class="w-full h-full">
          <RecentActivity />
        </div>
      </div>

      <!-- Recent Review (70%) -->
      <div class="xl:col-span-8">
        <div class="w-full h-full">
          <RecentReview />
        </div>
      </div>
    </div>

    <!-- Company Table Full Width -->
    <RecentCompany />
  </div>
</template>

<script setup>
import WelcomeComponent from "~/components/Admin/Welcome.vue";
import RecentActivity from "~/components/Admin/RecentActivity.vue";
import RecentCompany from "~/components/Admin/RecentCompany.vue";
import RecentReview from "~/components/Admin/RecentReview.vue";

definePageMeta({
  layout: "adminpanel",
});
</script>
