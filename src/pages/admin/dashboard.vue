<template>
  <div class="panel-stack w-full">
    <WelcomeComponent />
    <div class="grid grid-cols-1 gap-6 items-stretch">
      <RecentReview class="h-full w-full" />
    </div>

    <RecentCompany />
  </div>
</template>

<script setup>
import WelcomeComponent from "~/components/Admin/welcome.vue";
import RecentCompany from "~/components/Admin/recentCompany.vue";
import RecentReview from "~/components/Admin/recentReview.vue";

definePageMeta({
  layout: "adminpanel",
});
</script>
