<template>
  <div :class="$style.frameParent">
    <div :class="$style.mainCategoryParent">
      <div :class="$style.mainCategory">Main Category</div>
      <b :class="$style.itSoftware">{{ categoryName }}</b>
    </div>
    <form :class="$style.frameGroup" @submit.prevent="applySearch">
      <div :class="$style.dellDuotoneParent">
        <svg :class="$style.dellDuotoneIcon" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
            stroke="#9e9e9e"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <input
          :class="$style.searchInput"
          type="text"
          v-model="searchText"
          placeholder="Search by name, location, website..."
          @keyup.enter="applySearch"
        />
      </div>
      <button type="submit" :class="$style.searchParent">
        <div :class="$style.search2">Search</div>
        <svg :class="$style.dellDuotoneIcon" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
            stroke="#616161"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
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

<style module>
.frameParent {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  text-align: center;
  font-size: 16px;
  color: #28aed8;
  font-family: "Plus Jakarta Sans";
  padding: 0 20px;
  margin: 0 auto 10px auto;
  box-sizing: border-box;
}

.mainCategoryParent {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.mainCategory {
  text-transform: capitalize;
  font-size: 16px;
  color: #28aed8;
}

.itSoftware {
  font-size: 54px; /* smaller and more balanced */
  line-height: 120%;
  text-transform: capitalize;
  color: #212121;
  text-align: center;
  word-break: break-word;
}

.frameGroup {
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  gap: 0;
  font-size: 14px;
  color: #9e9e9e;
  max-width: 100%;
  box-sizing: border-box;
}

.dellDuotoneParent {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.searchInput {
  width: 100%;
  border: none;
  outline: none;
  padding: 12px 8px;
  font-size: 16px;
  color: #212121;
  background: transparent;
}

.dellDuotoneIcon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.search {
  line-height: 170%;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.searchParent {
  border-radius: 0 4px 4px 0;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
  font-size: 16px;
  color: #616161;
  flex-shrink: 0;
}

.search2 {
  line-height: 160%;
  text-transform: capitalize;
  font-weight: 500;
  white-space: nowrap;
}

/* Responsive breakpoints */
@media (max-width: 1024px) {
  .itSoftware {
    font-size: 46px;
  }
}

@media (max-width: 768px) {
  .frameParent {
    width: 80%;
    gap: 24px;
  }

  .itSoftware {
    font-size: 36px;
  }

  .frameGroup {
    font-size: 12px;
  }

  .searchParent {
    padding: 10px 12px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .itSoftware {
    font-size: 28px;
  }

  .search {
    display: none;
  }

  .dellDuotoneIcon {
    width: 20px;
    height: 20px;
  }

  .searchParent {
    padding: 8px 10px;
    font-size: 13px;
  }
}

@media (max-width: 360px) {
  .itSoftware {
    font-size: 24px;
  }
}
</style>
