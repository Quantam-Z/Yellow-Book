<template>
  <div
    class="w-full max-w-[800px] mx-auto mb-2 px-3 sm:px-5 flex flex-col items-center gap-4 text-center text-[16px] text-[#28aed8] font-['Plus_Jakarta_Sans']"
  >
    <div class="flex flex-col items-center gap-3 sm:gap-4">
      <div class="capitalize text-[14px] sm:text-[16px] text-[#28aed8]">Main Category</div>
      <b
        class="text-[28px] xs:text-[32px] sm:text-[36px] md:text-[46px] lg:text-[54px] leading-[120%] capitalize text-[#212121] text-center break-words"
        >{{ categoryName }}</b
      >
    </div>

    <!-- Search Form -->
    <form
      @submit.prevent="applySearch"
      class="w-full self-stretch rounded-[4px] border border-[#e0e0e0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-[6px] sm:px-[10px] gap-2 sm:gap-0 text-[14px] text-[#9e9e9e]"
    >
      <div
        class="w-full relative rounded border-gainsboro border-solid border-[1px] box-border flex items-center justify-between py-1.5 sm:py-0 pl-2 sm:pl-2.5 pr-0 gap-3 sm:gap-5 text-center text-sm text-darkgray font-plus-jakarta-sans"
      >
        <div class="flex items-center gap-2 flex-1">
          <Search class="h-5 w-5 text-[#9e9e9e]" />
          <input
            v-model="searchText"
            type="text"
            :placeholder="placeholder"
            aria-label="Search"
            class="flex-1 bg-transparent outline-none border-0 focus:ring-0 relative leading-[170%] capitalize placeholder-[#9e9e9e] text-[#212121] text-sm sm:text-base"
          />
        </div>

        <button
          type="submit"
          class="rounded-tl-none sm:rounded-tr rounded-br sm:rounded-bl-none bg-white border-gainsboro border-solid border-[1px] flex items-center justify-center py-2 sm:py-3.5 px-3 sm:px-[18px] gap-1.5 sm:gap-2 text-[14px] sm:text-lg text-dimgray hover:bg-[#f9f9f9] transition"
        >
          <div class="relative leading-[160%] capitalize font-medium hidden sm:block">Search</div>
          <Search class="h-6 w-6 sm:h-7 sm:w-7 text-[#9e9e9e]" />
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Search } from "lucide-vue-next";

const props = defineProps({
  modelValue: { type: String, default: null },
  categoryName: { type: String, default: null },
  placeholder: { type: String, default: "Search" },
});

const emit = defineEmits(["update:modelValue", "search"]);

const route = useRoute();
const router = useRouter();

const categoryName = ref("Loading...");
const searchText = ref("");

const applySearch = () => {
  const q = searchText.value.trim();
  const nextQuery = { ...route.query };
  if (q) nextQuery.q = q;
  else delete nextQuery.q;
  delete nextQuery.page;
  router.push({ query: nextQuery });
  emit("update:modelValue", q);
  emit("search", q);
};

onMounted(() => {
  categoryName.value = props.categoryName ?? decodeURIComponent(String(route.query.name || "Unknown"));
  if (props.modelValue !== null && props.modelValue !== undefined) {
    searchText.value = String(props.modelValue ?? "");
  } else {
    searchText.value = typeof route.query.q === "string" ? route.query.q : "";
  }
});

watch(
  () => route.query.q,
  (q) => {
    const next = typeof q === "string" ? q : "";
    if (next !== searchText.value) {
      searchText.value = next;
      emit("update:modelValue", next);
    }
  }
);

watch(
  () => route.query.name,
  (name) => {
    if (props.categoryName == null) {
      categoryName.value = decodeURIComponent(String(name || "Unknown"));
    }
  }
);

watch(
  () => props.modelValue,
  (val) => {
    const next = val == null ? "" : String(val);
    if (next !== searchText.value) {
      searchText.value = next;
    }
  }
);

watch(
  () => props.categoryName,
  (val) => {
    if (val != null) {
      categoryName.value = String(val);
    }
  }
);
</script>

<style scoped>
/* All Tailwind-based styling */
</style>
