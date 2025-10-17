<!-- src/pages/dashboard/admin/index.vue -->
<template>
  <div class="w-full space-y-6">
    <!-- welcome Section -->
    <welcomeComponent />

    <!-- Activity (30%) + Review (70%) -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
      <!-- Recent Activity (30%) -->
      <div class="xl:col-span-4">
        <div class="w-full h-full">
          <recentActivity />
        </div>
      </div>

      <!-- Recent Review (70%) -->
      <div class="xl:col-span-8">
        <div class="w-full h-full">
          <recentReview />
        </div>
      </div>
    </div>

    <!-- Company Table Full Width -->
    <recentCompany />
  </div>
</template>

<script setup>
import welcomeComponent from "@/components/Admin/welcome.vue";
import recentActivity from "~/components/Admin/recentActivity.vue";
import recentCompany from "~/components/Admin/recentCompany.vue";
import recentReview from "~/components/Admin/recentReview.vue";

definePageMeta({
  layout: "adminPanel",
});
</script>
