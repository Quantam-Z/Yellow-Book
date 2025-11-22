<template>
  <div class="panel-stack w-full">
    <WelcomeComponent />
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
      
      <div class="xl:col-span-4">
        <RecentActivity class="h-full w-full" />
      </div>

      <div class="xl:col-span-8">
        <RecentReview class="h-full w-full" />
      </div>
    </div>

    <RecentCompany />
  </div>
</template>

<script setup>
import WelcomeComponent from "~/components/Admin/welcome.vue";
import RecentActivity from "~/components/Admin/recentActivity.vue";
import RecentCompany from "~/components/Admin/recentCompany.vue";
import RecentReview from "~/components/Admin/recentReview.vue";

definePageMeta({
  layout: "adminpanel",
});
</script>
