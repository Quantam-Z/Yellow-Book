<template>
  <div
  class="w-1/2 max-w-[800px] mx-auto mb-2 px-5 flex flex-col items-center gap-4 text-center text-[16px] text-[#28aed8] font-['Plus_Jakarta_Sans']"
  >
    <div class="flex flex-col items-center gap-4">
      <div class="capitalize text-[16px] text-[#28aed8]">Main Category</div>
      <b
        class="text-[54px] leading-[120%] capitalize text-[#212121] text-center break-words md:text-[46px] sm:text-[36px] xs:text-[28px]"
        >{{ categoryName }}</b
      >
    </div>

    <!-- Search Form -->
    <form
      @submit.prevent="applySearch"
      class="self-stretch rounded-[4px] border border-[#e0e0e0] flex items-center justify-between px-[10px] gap-0 text-[14px] text-[#9e9e9e] max-w-full"
    >
      <div
        class="w-full relative rounded border-gainsboro border-solid border-[1px] box-border flex items-center justify-between py-0 pl-2.5 pr-0 gap-5 text-center text-sm text-darkgray font-plus-jakarta-sans"
      >
        <div class="flex items-center gap-1 flex-1">
          <Search class="h-5 w-5 text-[#9e9e9e]" />
          <input
            v-model="searchText"
            type="text"
            :placeholder="placeholder"
            aria-label="Search"
            class="flex-1 bg-transparent outline-none border-0 focus:ring-0 relative leading-[170%] capitalize placeholder-[#9e9e9e] text-[#212121]"
          />
        </div>

        <button
          type="submit"
          class="rounded-tl-none rounded-tr rounded-br rounded-bl-none bg-white border-gainsboro border-solid border-[1px] flex items-center py-3.5 px-[18px] gap-2 text-lg text-dimgray hover:bg-[#f9f9f9] transition"
        >
          <div class="relative leading-[160%] capitalize font-medium">Search</div>
          <Search class="h-7 w-7 text-[#9e9e9e]" />
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
// ✅ Lucide Vue icons import
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
  // reset pagination when searching
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
