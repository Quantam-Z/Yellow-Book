<template>
  <div class="w-1/2 max-w-[800px] mx-auto mb-2 px-5 flex flex-col items-center gap-7 text-center text-[16px] text-[#28aed8] font-['Plus_Jakarta_Sans']">
    <div class="flex flex-col items-center gap-4">
      <div class="capitalize text-[16px] text-[#28aed8]">Main Category</div>
      <b class="text-[54px] leading-[120%] capitalize text-[#212121] text-center break-words md:text-[46px] sm:text-[36px] xs:text-[28px]">{{ categoryName }}</b>
    </div>
    <form @submit.prevent="applySearch" class="self-stretch rounded-[4px] border border-[#e0e0e0] flex items-center justify-between px-[10px] gap-0 text-[14px] text-[#9e9e9e] max-w-full">
      <div class="flex items-center gap-1 flex-1">
        <svg class="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#9e9e9e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <input
          class="w-full border-none outline-none py-3 px-2 text-[16px] text-[#212121] bg-transparent"
          type="text"
          v-model="searchText"
          placeholder="Search by name, location, website..."
          @keyup.enter="applySearch"
        />
      </div>
      <button type="submit" class="rounded-r-[4px] bg-white border border-[#e0e0e0] flex items-center py-3 px-4 gap-2 text-[16px] text-[#616161] flex-shrink-0 sm:py-[10px] sm:px-3 sm:text-[14px]">
        <div class="leading-[160%] capitalize font-medium whitespace-nowrap">Search</div>
        <svg class="w-6 h-6 flex-shrink-0 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none">
          <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#616161" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </form>
  </div>
  
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const categoryName = ref("Loading...");
const searchText = ref("");

const applySearch = () => {
  const q = searchText.value.trim();
  const nextQuery = { ...route.query };
  if (q) nextQuery.q = q; else delete nextQuery.q;
  // reset pagination when searching
  delete nextQuery.page;
  router.push({ query: nextQuery });
};

onMounted(() => {
  categoryName.value = decodeURIComponent(String(route.query.name || "Unknown"));
  searchText.value = typeof route.query.q === 'string' ? route.query.q : '';
});

// reflect route query updates into input field
watch(
  () => route.query.q,
  (q) => {
    searchText.value = typeof q === 'string' ? q : '';
  }
);
</script>

<style scoped>
/* No custom CSS; all styling via Tailwind to match original design */
</style>
