<template>
  <div class="w-full font-plus-jakarta-sans min-h-screen bg-white px-3 sm:px-4 lg:px-6 py-4 overflow-x-hidden">
    <div class="mx-auto w-full max-w-7xl space-y-4">
      <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">My Assign Companies</h1>
        </div>
        <div class="w-full relative rounded-lg bg-white/90 backdrop-blur sm:bg-white border border-gray-200 box-border flex items-center px-3 py-2 sm:px-4 sm:py-3 gap-3 shadow-sm">
          <Search class="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search companies by name or category"
            class="flex-1 outline-none border-none bg-transparent text-gray-700 placeholder-gray-400 text-sm sm:text-base leading-[130%] capitalize"
          />
        </div>
      </div>

      <div class="flex items-center justify-between lg:hidden px-1">
        <h2 class="text-base font-bold text-gray-900">All Company List</h2>
        <button
          @click="showMobileFilters = !showMobileFilters"
          class="h-10 bg-gray-100 rounded-lg px-3 py-2 border-0 text-gray-700 text-sm outline-none cursor-pointer whitespace-nowrap touch-manipulation flex items-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition"
          aria-controls="mobile-filters-panel"
          :aria-expanded="showMobileFilters ? 'true' : 'false'"
        >
          <FilterIcon class="w-4 h-4" aria-hidden="true" />
          <span>Filters</span>
        </button>
      </div>

      <div
        v-if="showMobileFilters"
        id="mobile-filters-panel"
        class="mt-1 p-3 sm:p-4 bg-white rounded-lg shadow-lg border border-gray-200 lg:hidden space-y-4"
      >
        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-700 font-medium">Status</label>
          <div class="relative">
            <select
              v-model="filters.status"
              class="h-10 w-full rounded-lg bg-gray-100 border border-gray-300 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button
            @click="showMobileFilters = false"
            class="px-4 py-2 text-sm text-gray-900 bg-yellow-400 rounded-lg border-0 hover:bg-yellow-500 active:bg-yellow-600 transition"
          >
            Close Filters
          </button>
        </div>
      </div>

      <div class="hidden lg:flex items-center justify-between gap-4">
        <h2 class="text-lg font-semibold text-gray-900 whitespace-nowrap">All Company List</h2>
        <div class="flex items-center gap-3">
          <div class="relative min-w-[160px]">
            <select
              v-model="filters.status"
              class="h-10 w-full rounded-lg bg-white border border-gray-300 box-border flex items-center py-0 pl-3 pr-8 text-sm text-gray-700 font-medium appearance-none cursor-pointer focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div class="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div class="lg:hidden w-full flex flex-col gap-3 sm:gap-4">
          <div
            v-for="company in paginatedCompanies"
            :key="company.id"
            class="w-full rounded-xl border border-gray-200 p-3 sm:p-4 bg-white shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div class="flex justify-between items-start mb-3">
              <div class="flex items-start min-w-0 gap-3">
                <input
                  type="checkbox"
                  v-model="company.selected"
                  class="w-4 h-4 mt-1 rounded border-gray-300 cursor-pointer touch-manipulation flex-shrink-0"
                />
                <div class="flex flex-col min-w-0">
                  <div class="flex items-center gap-2 min-w-0">
                    <h3 class="font-semibold text-gray-900 text-base truncate">{{ company.name }}</h3>
                    <CheckCircle class="w-4 h-4 text-green-500 flex-shrink-0" v-if="company.verified" />
                  </div>
                  <span class="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 truncate">
                    {{ company.category }}
                  </span>
                </div>
              </div>

              <button
                type="button"
                class="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap cursor-pointer transition-colors"
                :class="getStatusClass(company.status)"
                @click="changeStatus(company)"
              >
                {{ company.status }}
              </button>
            </div>

            <div class="flex justify-between items-end pl-7 gap-3">
              <div class="flex flex-col gap-1 text-sm flex-1 min-w-0">
                <div class="text-gray-600 truncate">Mobile: {{ company.mobile || 'N/A' }}</div>
                <div class="text-gray-500 text-xs">ID: {{ company.id }}</div>
              </div>
              <button
                type="button"
                @click="viewDetails(company)"
                class="text-amber-500 hover:text-amber-600 font-medium text-sm cursor-pointer whitespace-nowrap bg-transparent border-0 p-0 focus:outline-none"
                :aria-expanded="expandedCompanyId === company.id ? 'true' : 'false'"
              >
                {{ expandedCompanyId === company.id ? 'Hide Details' : 'View Details' }}
              </button>
            </div>

            <Transition name="accordion">
              <div
                v-if="expandedCompanyId === company.id"
                class="mt-3 pt-3 border-t border-dashed border-gray-200 text-xs text-gray-600 space-y-2"
              >
                <div class="flex items-center justify-between">
                  <span class="text-gray-500 font-medium">Status</span>
                  <span
                    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold capitalize"
                    :class="getStatusClass(company.status)"
                  >
                    {{ company.status }}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-500 font-medium">Verified</span>
                  <span class="text-gray-800">{{ company.verified ? 'Yes' : 'No' }}</span>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <div class="hidden lg:block overflow-x-auto scrollbar-thin">
          <table class="w-full table-auto min-w-[780px]">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-4 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    v-model="selectAll"
                    @change="toggleSelectAll"
                    class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation"
                  />
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap w-16">No</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[180px]">Company Name</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[140px]">Category</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[140px]">Status</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[140px]">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="(company, index) in paginatedCompanies"
                :key="company.id"
                class="hover:bg-gray-50 active:bg-gray-100 transition"
              >
                <td class="px-4 py-3">
                  <input
                    type="checkbox"
                    v-model="company.selected"
                    class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation"
                  />
                </td>
                <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                  {{ String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, '0') }}
                </td>
                <td class="px-4 py-3 text-gray-900 font-medium text-sm">
                  <div class="flex items-center gap-2">
                    <span class="truncate">{{ company.name }}</span>
                    <CheckCircle v-if="company.verified" class="w-4 h-4 text-green-500 flex-shrink-0" />
                  </div>
                </td>
                <td class="px-4 py-3 text-gray-700 text-sm">
                  <span class="truncate block">{{ company.category }}</span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <button
                    type="button"
                    class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-sm cursor-pointer touch-manipulation transition-colors"
                    :class="getStatusClass(company.status)"
                    @click="changeStatus(company)"
                  >
                    <span class="capitalize">{{ company.status }}</span>
                    <ChevronDown class="w-3 h-3 flex-shrink-0" />
                  </button>
                </td>
                <td class="px-4 py-3 text-center">
                  <button
                    type="button"
                    @click="viewDetails(company)"
                    class="text-sm font-medium text-yellow-600 hover:text-yellow-700 active:text-yellow-800 underline cursor-pointer bg-transparent border-0 p-0 focus:outline-none"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="filteredCompanies.length === 0" class="text-center py-12">
          <div class="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
            <Search class="w-6 h-6 text-gray-400" />
          </div>
          <p class="text-gray-500 text-sm">No companies found matching your criteria</p>
          <p class="text-gray-400 text-xs mt-1">Try adjusting your search or filters</p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
        <p class="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
          Showing
          <span class="font-semibold">{{ Math.min((currentPage - 1) * itemsPerPage + 1, filteredCompanies.length) }}</span>
          to
          <span class="font-semibold">{{ Math.min(currentPage * itemsPerPage, filteredCompanies.length) }}</span>
          of
          <span class="font-semibold">{{ filteredCompanies.length }}</span>
          companies
        </p>
        <div class="flex gap-1 sm:gap-1.5 flex-wrap justify-center">
          <button
            @click="goToPage(currentPage - 1)"
            class="px-2.5 sm:px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition touch-manipulation flex items-center gap-1"
            :disabled="currentPage === 1"
            :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''"
            type="button"
          >
            <ChevronLeft class="w-3 h-3" />
            <span class="hidden sm:inline">Previous</span>
          </button>

          <button
            v-for="page in getVisiblePages()"
            :key="page"
            @click="goToPage(page)"
            class="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition touch-manipulation hidden xs:block"
            :class="page === currentPage ? 'bg-yellow-400 text-gray-900' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'"
            type="button"
          >
            {{ page }}
          </button>

          <button
            class="px-2.5 sm:px-3 py-1.5 bg-yellow-400 text-gray-900 rounded-lg text-xs sm:text-sm font-medium xs:hidden"
            type="button"
          >
            {{ currentPage }}
          </button>

          <button
            @click="goToPage(currentPage + 1)"
            class="px-2.5 sm:px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition touch-manipulation flex items-center gap-1"
            :disabled="currentPage === totalPages"
            :class="currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''"
            type="button"
          >
            <span class="hidden sm:inline">Next</span>
            <ChevronRight class="w-3 h-3" />
          </button>
        </div>
      </div>

      <DetailModal
        :open="isDetailModalOpen"
        title="Company Details"
        :items="companyDetailItems"
        @close="closeDetails"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { Search, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Filter as FilterIcon } from 'lucide-vue-next';
import DetailModal from '~/components/common/DetailModal.vue';

const getStatusClass = (status) => {
  const statusMap = {
    pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    verified: 'bg-green-100 text-green-800 border border-green-200',
    rejected: 'bg-red-100 text-red-800 border border-red-200',
  };
  return statusMap[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 border border-gray-200';
};

const companiesData = ref([
  { id: 1, name: 'Tech Solutions Inc.', category: 'Software', status: 'verified', mobile: '123-456-7890', verified: true },
  { id: 2, name: 'Global Logistics Corp.', category: 'Shipping', status: 'pending', mobile: '987-654-3210', verified: false },
  { id: 3, name: 'Creative Marketing Agency', category: 'Advertising', status: 'rejected', mobile: '555-123-4567', verified: true },
  { id: 4, name: 'Eco-Farm Produce', category: 'Agriculture', status: 'verified', mobile: '111-222-3333', verified: false },
  { id: 5, name: 'Secure Bank Holdings', category: 'Finance', status: 'pending', mobile: '444-555-6666', verified: true },
  { id: 6, name: 'E-commerce Retailer', category: 'Retail', status: 'verified', mobile: '777-888-9999', verified: true },
  { id: 7, name: 'Consulting Group X', category: 'Consulting', status: 'pending', mobile: '111-999-0000', verified: false },
  { id: 8, name: 'Health & Wellness Co.', category: 'Health', status: 'rejected', mobile: '222-333-4444', verified: true },
  { id: 9, name: 'Construction Dynamics', category: 'Construction', status: 'verified', mobile: '555-666-7777', verified: false },
  { id: 10, name: 'Digital Media House', category: 'Media', status: 'pending', mobile: '888-999-0000', verified: true },
]);

const companies = ref((companiesData.value || []).map((company) => ({ ...company, selected: false })));

const searchQuery = ref('');
const selectAll = ref(false);
const currentPage = ref(1);
const itemsPerPage = 8;
const showMobileFilters = ref(false);

const filters = ref({
  status: '',
  category: '',
});

const isDesktopView = ref(false);
const expandedCompanyId = ref(null);
const selectedCompany = ref(null);
const isDetailModalOpen = ref(false);

const filteredCompanies = computed(() => {
  const q = (searchQuery.value || '').toLowerCase();
  const status = filters.value.status;
  const category = filters.value.category;

  return companies.value.filter((company) => {
    if (q) {
      const matches =
        company.name.toLowerCase().includes(q) ||
        company.category.toLowerCase().includes(q) ||
        (company.mobile && company.mobile.toLowerCase().includes(q));
      if (!matches) return false;
    }

    if (status && company.status.toLowerCase() !== status) return false;
    if (category && company.category !== category) return false;

    return true;
  });
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredCompanies.value.length / itemsPerPage)));

const paginatedCompanies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredCompanies.value.slice(start, end);
});

const companyDetailItems = computed(() => {
  if (!selectedCompany.value) return [];
  const company = selectedCompany.value;
  return [
    { label: 'Company', value: company.name },
    { label: 'Category', value: company.category },
    { label: 'Status', value: company.status },
    { label: 'Mobile', value: company.mobile || 'N/A' },
    { label: 'ID', value: company.id },
    { label: 'Verified', value: company.verified ? 'Yes' : 'No' },
  ];
});

const getVisiblePages = () => {
  const pages = [];
  const maxVisible = 5;
  const total = totalPages.value;

  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
    let end = Math.min(total, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }

  return pages;
};

const toggleSelectAll = () => {
  paginatedCompanies.value.forEach((company) => {
    company.selected = selectAll.value;
  });
  expandedCompanyId.value = null;
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    selectAll.value = false;
    expandedCompanyId.value = null;
  }
};

const changeStatus = (company) => {
  console.log('Change status for:', company.name);
};

const viewDetails = (company) => {
  if (isDesktopView.value) {
    selectedCompany.value = company;
    isDetailModalOpen.value = true;
    return;
  }

  expandedCompanyId.value = expandedCompanyId.value === company.id ? null : company.id;
};

const closeDetails = () => {
  isDetailModalOpen.value = false;
  selectedCompany.value = null;
};

const updateViewport = () => {
  if (!import.meta.client) return;
  isDesktopView.value = window.innerWidth >= 1024;
};

watch(
  [searchQuery, filters],
  () => {
    currentPage.value = 1;
    selectAll.value = false;
    expandedCompanyId.value = null;
    if (isDetailModalOpen.value) {
      closeDetails();
    }
  },
  { deep: true }
);

watch(
  paginatedCompanies,
  (companiesOnPage) => {
    if (!companiesOnPage.length) {
      selectAll.value = false;
      return;
    }
    selectAll.value = companiesOnPage.every((company) => company.selected);
  },
  { deep: true }
);

watch(isDesktopView, (isDesktop) => {
  if (isDesktop) {
    expandedCompanyId.value = null;
    showMobileFilters.value = false;
  } else {
    closeDetails();
  }
});

onMounted(() => {
  if (!import.meta.client) return;
  updateViewport();
  window.addEventListener('resize', updateViewport, { passive: true });
});

onBeforeUnmount(() => {
  if (!import.meta.client) return;
  window.removeEventListener('resize', updateViewport);
});
</script>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.2s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 480px) {
  .xs\:hidden {
    display: none !important;
  }
}

@media (min-width: 481px) {
  .xs\:block {
    display: block !important;
  }
}
</style>
