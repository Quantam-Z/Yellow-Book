<template>
  <div class="w-full font-plus-jakarta-sans min-h-screen bg-white p-3 sm:p-4 md:p-4 overflow-x-hidden">
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">My Assign Companies</h1>
      </div>

      <div class="w-full relative rounded-lg bg-white border border-gray-200 box-border flex items-center p-2.5 sm:p-3 md:p-4 gap-2 sm:gap-3 shadow-sm">
        <Search class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search companies by name or category"
          class="flex-1 outline-none border-none bg-transparent text-gray-600 placeholder-gray-400 text-xs sm:text-sm md:text-base leading-[130%] capitalize"
        />
      </div>
    </div>

    <div class="mb-4 flex sm:hidden items-center justify-between px-1">
      <h2 class="text-base font-bold text-gray-900">All Company List</h2>
      <button 
        @click="showMobileFilters = !showMobileFilters"
        class="h-9 
               bg-gray-100 rounded-lg px-3 py-1.5 border-0
               text-gray-700 text-sm outline-none cursor-pointer whitespace-nowrap 
               touch-manipulation flex items-center gap-2 
               hover:bg-gray-50 active:bg-gray-100 transition
               "
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
        class="mt-3 p-3 bg-white rounded-lg shadow-lg border border-gray-200 sm:hidden 
               relative z-10 space-y-4 mb-4" 
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
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-700 font-medium">Category</label>
          <div class="relative">
            <select
              v-model="filters.category"
              class="h-10 w-full rounded-lg bg-gray-100 border border-gray-300 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0"
            >
              <option value="">All Categories</option>
              <option 
                v-for="category in categories" 
                :key="category" 
                :value="category"
              >
                {{ category }}
              </option>
            </select>
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button 
            @click="showMobileFilters = false" 
            class="px-4 py-2 text-sm text-gray-900 bg-yellow-400 rounded-lg border-0 
                   hover:bg-yellow-500 active:bg-yellow-600 transition"
          >
            Close Filters
          </button>
        </div>
      </div>

    <div class="hidden sm:flex items-center justify-between gap-3 sm:gap-4 mb-4">
      <h2 class="text-base sm:text-lg font-semibold text-gray-900 whitespace-nowrap flex-shrink-0">All List</h2>
      
      <div class="flex flex-wrap gap-2 sm:gap-3 items-center justify-end w-full sm:w-auto">
        <div class="relative w-full xs:w-auto min-w-[120px] sm:min-w-[140px]">
          <select 
            v-model="filters.status"
            class="h-9 sm:h-10 w-full rounded-lg bg-white border border-gray-300 box-border flex items-center py-0 pl-3 pr-8 text-xs sm:text-sm text-gray-700 leading-[130%] font-medium appearance-none cursor-pointer focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
          <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"/>
        </div>
        <div class="relative w-full xs:w-auto min-w-[140px] sm:min-w-[160px]">
          <select 
            v-model="filters.category"
            class="h-9 sm:h-10 w-full rounded-lg bg-white border border-gray-300 box-border flex items-center py-0 pl-3 pr-8 text-xs sm:text-sm text-gray-700 leading-[130%] font-medium appearance-none cursor-pointer focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition"
          >
            <option value="">All Categories</option>
            <option 
              v-for="category in categories" 
              :key="category" 
              :value="category"
            >
              {{ category }}
            </option>
          </select>
          <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"/>
        </div>
        <button
          type="button"
          @click="resetFilters"
          class="px-3 sm:px-4 h-9 sm:h-10 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition"
        >
          Reset
        </button>
      </div>
    </div>

    <div class="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <div v-if="isLoading" class="flex flex-col items-center justify-center gap-3 py-10 sm:py-16">
        <div class="w-10 h-10 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin"></div>
        <p class="text-sm text-gray-600">Loading assigned companies…</p>
      </div>

      <div v-else-if="loadError" class="flex flex-col items-center gap-3 py-10 sm:py-16 px-4 text-center">
        <div class="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
          <span class="text-lg font-semibold">!</span>
        </div>
        <p class="text-sm text-gray-700">Unable to load company data.</p>
        <p class="text-xs text-gray-500 max-w-xs">Please check your connection and try again. If the issue persists, contact support.</p>
        <button
          type="button"
          @click="retryFetch"
          class="px-4 py-2 text-sm font-medium text-gray-900 bg-yellow-400 rounded-lg border-0 hover:bg-yellow-500 active:bg-yellow-600 transition"
        >
          Retry
        </button>
      </div>

      <template v-else>
        <div class="sm:hidden w-full flex flex-col gap-3">
          <div 
            v-for="company in paginatedCompanies" 
            :key="company.id"
            class="w-full rounded-xl border border-gray-200 p-3 bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] hover:bg-indigo-50"
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
                    <div class="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                      {{ company.category }}
                    </div>
                </div>
              </div>

              <div class="flex items-center gap-2 shrink-0 ml-4">
                  <span class="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap cursor-pointer" :class="getStatusClass(company.status)" @click="changeStatus(company)">
                    {{ formatStatusLabel(company.status) }}
                </span>
              </div>
            </div>

              <div class="flex flex-col gap-3 pl-7">
                <div class="flex items-end justify-between gap-3">
                  <div class="flex flex-col gap-1 text-sm flex-1 min-w-0">
                    <div class="text-gray-600 truncate">Mobile: {{ company.mobile || 'N/A' }}</div>
                    <div class="text-gray-500 text-xs">Assigned: {{ formatDate(company.assignedDate) }}</div>
                    <div class="text-gray-500 text-xs">Primary Contact: {{ company.primaryContact || 'N/A' }}</div>
                  </div>
                  <button
                    type="button"
                    @click="viewDetails(company)"
                    class="flex items-center gap-1 text-amber-500 hover:text-amber-600 font-medium text-sm cursor-pointer whitespace-nowrap transition"
                    :aria-expanded="company.expanded ? 'true' : 'false'"
                    :aria-controls="`company-details-${company.id}`"
                  >
                    <span>{{ company.expanded ? 'Hide Details' : 'View Details' }}</span>
                    <ChevronDown class="w-4 h-4 transition-transform duration-200" :class="company.expanded ? 'rotate-180' : ''" />
                  </button>
                </div>

                <Transition name="mobile-detail">
                  <div
                    v-if="company.expanded"
                    class="bg-gray-50 rounded-lg p-3 text-sm space-y-2"
                    :id="`company-details-${company.id}`"
                  >
                    <div class="flex items-start justify-between gap-4">
                      <span class="text-gray-500 font-medium">Company ID</span>
                      <span class="text-gray-900">{{ company.id }}</span>
                    </div>
                    <div class="flex items-start justify-between gap-4">
                      <span class="text-gray-500 font-medium">Email</span>
                      <span class="text-gray-900 text-right break-words">{{ company.email || '—' }}</span>
                    </div>
                    <div class="flex items-start justify-between gap-4">
                      <span class="text-gray-500 font-medium">Website</span>
                      <a
                        v-if="company.website"
                        :href="company.website"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-amber-500 hover:text-amber-600 break-all"
                      >
                        {{ company.website }}
                      </a>
                      <span v-else class="text-gray-900">—</span>
                    </div>
                    <div class="flex items-start justify-between gap-4">
                      <span class="text-gray-500 font-medium">Address</span>
                      <span class="text-gray-900 text-right break-words">{{ company.address || '—' }}</span>
                    </div>
                  </div>
                </Transition>
              </div>
          </div>
        </div>

        <div class="hidden sm:block overflow-x-auto scrollbar-thin">
        <table class="w-full table-auto" style="min-width: 700px;">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left w-12 border-r border-gray-100">
                <input 
                  type="checkbox" 
                    v-model="selectAll"
                  class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation" 
                />
              </th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap w-12 border-r border-gray-100">No</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px] border-r border-gray-100">Company Name</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[90px] border-r border-gray-100">Category</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[80px] border-r border-gray-100">Status</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[90px]">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr 
              v-for="(company, index) in paginatedCompanies" 
              :key="company.id" 
              class="hover:bg-gray-50 active:bg-gray-100 transition"
            >
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 border-r border-gray-100">
                <input 
                  type="checkbox" 
                  v-model="company.selected"
                  class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation" 
                />
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-700 text-[10px] sm:text-xs whitespace-nowrap border-r border-gray-100">
                {{ String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, '0') }}
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-900 font-medium text-[10px] sm:text-xs border-r border-gray-100">
                <div class="flex items-center gap-1.5 max-w-full">
                  <span class="truncate">{{ company.name }}</span>
                  <CheckCircle v-if="company.verified" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 flex-shrink-0" />
                </div>
              </td>
           
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-700 text-[10px] sm:text-xs border-r border-gray-100">
                <span class="truncate max-w-full block">{{ company.category }}</span>
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 whitespace-nowrap border-r border-gray-100">
                  <div 
                    class="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-medium text-[9px] sm:text-xs cursor-pointer touch-manipulation"
                    :class="getStatusClass(company.status)"
                    @click="changeStatus(company)"
                  >
                    <span>{{ formatStatusLabel(company.status) }}</span>
                  <ChevronDown class="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                </div>
              </td>

              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-center">
                  <button
                    type="button"
                  @click="viewDetails(company)"
                    class="text-[10px] sm:text-xs font-medium text-yellow-600 hover:text-yellow-700 active:text-yellow-800 transition touch-manipulation underline cursor-pointer"
                >
                  Details
                  </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

        <div v-if="filteredCompanies.length === 0" class="text-center py-8 sm:py-12">
        <div class="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
          <Search class="w-6 h-6 text-gray-400" />
        </div>
        <p class="text-gray-500 text-xs sm:text-sm">No companies found matching your criteria</p>
        <p class="text-gray-400 text-[10px] sm:text-xs mt-1">Try adjusting your search or filters</p>
      </div>
      </template>
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
      <p class="text-[10px] sm:text-xs text-gray-600 text-center sm:text-left">
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
          class="px-2.5 sm:px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] sm:text-xs text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition touch-manipulation flex items-center gap-1"
          :disabled="currentPage === 1"
          :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''"
        >
          <ChevronLeft class="w-3 h-3" />
          <span class="hidden sm:inline">Previous</span>
        </button>
        
        <button 
          v-for="page in getVisiblePages()" 
          :key="page"
          @click="goToPage(page)"
          class="px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition touch-manipulation hidden xs:block"
          :class="page === currentPage ? 'bg-yellow-400 text-gray-900' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'"
        >
          {{ page }}
        </button>

        <button 
          class="px-2.5 sm:px-3 py-1.5 bg-yellow-400 text-gray-900 rounded-lg text-[10px] sm:text-xs font-medium xs:hidden"
        >
          {{ currentPage }}
        </button>
        
        <button 
          @click="goToPage(currentPage + 1)"
          class="px-2.5 sm:px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] sm:text-xs text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition touch-manipulation flex items-center gap-1"
          :disabled="currentPage === totalPages"
          :class="currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''"
        >
          <span class="hidden sm:inline">Next</span>
          <ChevronRight class="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>

  <DetailModal
    :open="isDetailModalOpen"
    :title="detailModalTitle"
    :items="detailModalItems"
    @close="closeDetailModal"
  />
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { Search, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Filter as FilterIcon } from "lucide-vue-next";
import DetailModal from '~/components/common/DetailModal.vue';
import { useStubClient } from '~/services/stubClient';

const stubClient = useStubClient();

const getStatusClass = (status) => {
  const statusMap = {
    pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    verified: 'bg-green-100 text-green-800 border border-green-200',
    rejected: 'bg-red-100 text-red-800 border border-red-200',
  };
  return statusMap[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 border border-gray-200';
};

const itemsPerPage = 8;

const companies = ref([]);
const isLoading = ref(false);
const loadError = ref(null);
const searchQuery = ref('');
const currentPage = ref(1);
const showMobileFilters = ref(false);
const filters = ref({
  status: '',
  category: '',
});

const isDetailModalOpen = ref(false);
const selectedCompany = ref(null);
const isDesktop = ref(false);

let lastIsDesktop = false;

const formatStatusLabel = (status) => {
  if (!status) return 'Unknown';
  const value = status.toString();
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date);
};

const normalizeCompany = (company) => ({
  id: company.id,
  name: company.name,
  category: company.category,
  status: (company.status || 'pending').toLowerCase(),
  mobile: company.mobile || '',
  email: company.email || '',
  assignedDate: company.assignedDate || '',
  verified: Boolean(company.verified),
  primaryContact: company.primaryContact || '',
  address: company.address || '',
  website: company.website || '',
  selected: false,
  expanded: false,
});

const handleResize = () => {
  const matches = window.matchMedia('(min-width: 640px)').matches;
  if (matches && !lastIsDesktop) {
    companies.value.forEach((company) => {
      if (company.expanded) {
        company.expanded = false;
      }
    });
  }
  if (matches) {
    showMobileFilters.value = false;
  }
  isDesktop.value = matches;
  lastIsDesktop = matches;
};

const fetchCompanies = async () => {
  isLoading.value = true;
  loadError.value = null;
  try {
    const data = await stubClient.list('subadminAssignedCompanies', { delay: 0 });
    companies.value = (data || []).map((entry) => normalizeCompany(entry));
  } catch (error) {
    console.error('[assignCompanies] Failed to load stub data:', error);
    loadError.value = error?.message || 'Failed to load companies';
  } finally {
    isLoading.value = false;
  }
};

const retryFetch = () => fetchCompanies();

const categories = computed(() => {
  const unique = new Set();
  companies.value.forEach((company) => {
    if (company.category) {
      unique.add(company.category);
    }
  });
  return Array.from(unique).sort((a, b) => a.localeCompare(b));
});

const filteredCompanies = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  const statusFilter = filters.value.status ? filters.value.status.toLowerCase() : '';
  const categoryFilter = filters.value.category ? filters.value.category.toLowerCase() : '';

  return companies.value.filter((company) => {
    if (query) {
      const matches = [
        company.name,
        company.category,
        company.mobile,
        company.email,
        company.primaryContact,
        company.address,
      ].some((field) => field && field.toString().toLowerCase().includes(query));
      if (!matches) return false;
    }

    if (statusFilter && company.status !== statusFilter) return false;
    if (categoryFilter && company.category?.toLowerCase() !== categoryFilter) return false;

    return true;
  });
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredCompanies.value.length / itemsPerPage)));

const paginatedCompanies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredCompanies.value.slice(start, end);
});

const selectAll = computed({
  get() {
    const visible = paginatedCompanies.value;
    if (!visible.length) return false;
    return visible.every((company) => company.selected);
  },
  set(value) {
    paginatedCompanies.value.forEach((company) => {
      company.selected = value;
    });
  },
});

const getVisiblePages = () => {
  const pages = [];
  const maxVisible = 5;
  const total = totalPages.value;

  if (total <= maxVisible) {
    for (let i = 1; i <= total; i += 1) {
      pages.push(i);
    }
  } else {
    let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
    let end = Math.min(total, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }
  }

  return pages;
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const changeStatus = (company) => {
  console.log('Change status for:', company.name);
};

const closeDetailModal = () => {
  isDetailModalOpen.value = false;
  selectedCompany.value = null;
};

const detailModalTitle = computed(() => {
  if (!selectedCompany.value) return 'Company Details';
  return `${selectedCompany.value.name} Details`;
});

const detailModalItems = computed(() => {
  if (!selectedCompany.value) return [];
  const company = selectedCompany.value;

  return [
    { label: 'Company ID', value: company.id },
    { label: 'Category', value: company.category || '—' },
    { label: 'Status', value: formatStatusLabel(company.status) },
    { label: 'Primary Contact', value: company.primaryContact || '—' },
    { label: 'Mobile', value: company.mobile || '—' },
    { label: 'Email', value: company.email || '—' },
    { label: 'Website', value: company.website || '—' },
    { label: 'Assigned Date', value: formatDate(company.assignedDate) },
    { label: 'Address', value: company.address || '—' },
  ];
});

const viewDetails = (company) => {
  if (isDesktop.value) {
    selectedCompany.value = company;
    isDetailModalOpen.value = true;
    return;
  }

  const nextState = !company.expanded;
  companies.value.forEach((item) => {
    item.expanded = item.id === company.id ? nextState : false;
  });
};

const resetFilters = () => {
  filters.value.status = '';
  filters.value.category = '';
  searchQuery.value = '';
};

watch([searchQuery, filters], () => {
  currentPage.value = 1;
}, { deep: true });

watch(filteredCompanies, () => {
  const total = totalPages.value;
  if (currentPage.value > total) {
    currentPage.value = total;
  }
});

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize, { passive: true });
  fetchCompanies();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
/* Scoped styles are largely unchanged but retained for completeness */
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* Thin custom scrollbar */
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

.mobile-detail-enter-active,
.mobile-detail-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.mobile-detail-enter-from,
.mobile-detail-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Added a small breakpoint for buttons to help with responsive wrapping */
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