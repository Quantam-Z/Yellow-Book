<!-- src/pages/dashboard/admin/index.vue -->
<template>
  <div class="w-full space-y-6">
    <WelcomeComponent />
    
    <!-- Activity and Review in a row -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <RecentActivity />
      <RecentReview />
    </div>
    
    <RecentCompany />
  </div>
</template>

<script setup>
import WelcomeComponent from "@/components/common/Admin/Welcome.vue";
import RecentActivity from "~/components/common/Admin/RecentActivity.vue";
import RecentCompany from "~/components/common/Admin/RecentCompany.vue";
import RecentReview from "~/components/common/Admin/RecentReview.vue";

definePageMeta({
  layout: "adminpanel",
});
</script>