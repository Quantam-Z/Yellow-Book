<template>
  <div class="w-full font-plus-jakarta-sans max-w-full overflow-hidden">
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 class="text-[18px] text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Company Management</h1>
        <button 
          @click="openAddModal"
          class="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-semibold px-3 sm:px-4 py-2 transition shadow-md whitespace-nowrap text-xs sm:text-sm w-full sm:w-auto touch-manipulation rounded-none border-none"
        >
          Add Company
        </button>
      </div>

      <div class="w-full relative rounded-lg bg-white/80 backdrop-blur-sm flex items-center px-3 sm:px-4 py-2.5 sm:py-3 gap-2 sm:gap-3">
        <SearchIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
        <input
          type="text"
          v-model="searchQuery"
          @input="handleFilterChange"
          placeholder="Search Companies By Name Or Category"
          class="flex-1 outline-none border-none bg-transparent text-gray-700 placeholder-gray-400 text-[16px] sm:text-sm md:text-base min-w-0 
                 focus:ring-0 focus:outline-none"
        />
      </div>
    </div>

    <!-- Mobile header with Filters toggle -->
    <div class="mb-3 flex md:hidden items-center justify-between">
      <h2 class="text-sm font-bold text-gray-900">All Company List</h2>
      <button 
        @click="showMobileFilters = !showMobileFilters"
        class="h-10 bg-white rounded-xl px-3 py-2 border border-gray-300 text-gray-700 text-sm outline-none cursor-pointer whitespace-nowrap touch-manipulation flex items-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition"
        aria-controls="mobile-filters"
        :aria-expanded="showMobileFilters ? 'true' : 'false'"
      >
        <FilterIcon class="w-4 h-4" aria-hidden="true" />
        <span>Filters</span>
      </button>
    </div>

    <div class="mb-4 md:overflow-x-auto md:pb-2 md:scrollbar-thin"> 
      <div class="hidden md:flex items-center flex-wrap gap-2 md:gap-3 min-w-full md:min-w-max pr-0 md:pr-4">
        <h2 class="text-sm sm:text-base md:text-lg font-bold text-gray-900 whitespace-nowrap pr-12 sm:pr-12">
          All Company List
        </h2>
        
        <div class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 box-border flex items-center pl-4 pr-1 gap-2 text-sm text-silver">
          <span class="text-gray-400 text-sm hidden sm:inline">From:</span>
          <input 
            type="date" 
            v-model="filters.dateFrom"
            @change="handleFilterChange"
            class="text-gray-600 text-[16px] sm:text-sm outline-none bg-transparent cursor-pointer border-none touch-manipulation ring-0 focus:ring-0 w-24 sm:w-28 md:w-32"
          />
        </div>

        <div class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 box-border flex items-center pl-4 pr-1 gap-2 text-sm text-silver">
          <span class="text-gray-400 text-sm hidden sm:inline">To:</span>
          <input 
            type="date" 
            v-model="filters.dateTo"
            @change="handleFilterChange"
            class="text-gray-600 text-[16px] sm:text-sm outline-none bg-transparent cursor-pointer border-none touch-manipulation ring-0 focus:ring-0 w-24 sm:w-28 md:w-32"
          />
        </div>

        <div class="relative">
          <select 
            v-model="filters.timeRange"
            @change="handleFilterChange"
            class="h-12 relative rounded-xl bg-gray-100 border-none box-border appearance-none py-0 pl-4 pr-10 text-left text-[16px] sm:text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0 min-w-[120px]" 
          >
              <option value="">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
          </select>
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>

        <div class="relative">
          <select 
            v-model="filters.status"
            @change="handleFilterChange"
            class="h-12 relative rounded-xl bg-gray-100 border-none box-border appearance-none py-0 pl-4 pr-10 text-left text-[16px] sm:text-sm text-gray-600 cursor-pointer
                  focus:outline-none focus:ring-0 min-w-[120px]"
          >
              <option value="">Select Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
          </select>
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>

        <div class="relative">
          <select 
            v-model="filters.category"
            @change="handleFilterChange"
            class="h-12 relative rounded-xl bg-gray-100 border-none box-border appearance-none py-0 pl-4 pr-10 text-left text-[16px] sm:text-sm text-gray-600 cursor-pointer
                  focus:outline-none focus:ring-0 min-w-[120px]"
          >
              <option value="">Select Category</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      <div v-if="showMobileFilters" id="mobile-filters" class="mt-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 lg:hidden">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs text-gray-500 font-medium">Time Range</label>
            <select 
              v-model="filters.timeRange"
              @change="handleFilterChange"
              class="bg-gray-50 rounded-lg px-3 py-2 text-[16px] sm:text-sm outline-none border border-gray-200 h-10"
            >
              <option value="">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs text-gray-500 font-medium">Category</label>
            <select 
              v-model="filters.category"
              @change="handleFilterChange"
              class="bg-gray-50 rounded-lg px-3 py-2 text-[16px] sm:text-sm outline-none border border-gray-200 h-10"
            >
              <option value="">Select Category</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs text-gray-500 font-medium">Status</label>
            <select
              v-model="filters.status"
              @change="handleFilterChange"
              class="bg-gray-50 rounded-lg px-3 py-2 text-[16px] sm:text-sm outline-none border border-gray-200 h-10"
            >
              <option value="">Select Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs text-gray-500 font-medium">From</label>
            <input
              type="date"
              v-model="filters.dateFrom"
              @change="handleFilterChange"
              class="bg-gray-50 rounded-lg px-3 py-2 text-[16px] sm:text-sm outline-none border border-gray-200 h-10 text-gray-700"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs text-gray-500 font-medium">To</label>
            <input
              type="date"
              v-model="filters.dateTo"
              @change="handleFilterChange"
              class="bg-gray-50 rounded-lg px-3 py-2 text-[16px] sm:text-sm outline-none border border-gray-200 h-10 text-gray-700"
            />
          </div>
        </div>
        <div class="mt-4 flex items-center justify-end gap-2">
          <button @click="resetFilters" class="px-3 py-2 text-xs sm:text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation">Reset</button>
          <button @click="applyMobileFilters" class="px-3 py-2 text-xs sm:text-sm text-gray-900 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 rounded-lg touch-manipulation">Apply</button>
        </div>
      </div>
    </div>

    <div class="w-full bg-white rounded-xl shadow-md overflow-hidden">
      
      <div v-if="isLoading" class="text-center py-16 text-gray-500 text-lg font-medium animate-pulse">
          <svg class="animate-spin h-6 w-6 text-yellow-500 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading Company Data...
      </div>

      <template v-else>
          
          <div class="block sm:hidden">
              <div 
                v-for="(company, index) in paginatedCompanies" 
                :key="company.id"
                class="p-4 border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition"
              >
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        :checked="company.selected"
                        @change="toggleSelection(company)"
                        class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation" 
                      />
                      <span class="text-[10px] text-gray-500 font-medium">{{ getDisplayIndex(index) }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div 
                        class="inline-flex items-center gap-1 px-2 py-1 rounded-md font-medium text-[9px] cursor-pointer touch-manipulation"
                        :class="getStatusClass(company.status)"
                        @click="changeStatus(company)"
                      >
                        <span>{{ getStatusShort(company.status) }}</span>
                        <ChevronDownIcon class="w-2.5 h-2.5 flex-shrink-0" aria-hidden="true" />
                      </div>
                      <EyeIcon 
                        @click="viewCompany(company)"
                        class="w-4 h-4 text-yellow-500 cursor-pointer hover:text-yellow-600 transition touch-manipulation" 
                      />
                    </div>
                  </div>
                  
                  <div class="space-y-2">
                    <div class="flex items-center gap-2">
                      <span class="text-sm font-semibold text-gray-900 truncate flex-1">{{ company.name }}</span>
                      <CheckCircleIcon v-if="company.verified" class="w-3 h-3 text-green-500 flex-shrink-0" title="Verified" />
                    </div>
                    
                    <div class="flex items-center justify-between text-[11px] text-gray-600">
                      <span class="bg-gray-100 px-2 py-1 rounded-md">{{ company.category }}</span>
                      <span class="flex items-center gap-1">
                        <PhoneIcon class="w-3 h-3" aria-hidden="true" />
                        {{ company.mobile }}
                      </span>
                    </div>
                    
                    <div class="text-[11px] text-yellow-500 truncate flex items-center gap-1">
                      <GlobeIcon class="w-3 h-3" aria-hidden="true" />
                      {{ company.website }}
                    </div>
                  </div>
              </div>
          </div>

          <div class="hidden sm:block overflow-x-auto scrollbar-thin">
            <table class="w-full table-auto min-w-[640px] md:min-w-[760px]">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left" style="width: 40px;">
                    <input 
                      type="checkbox" 
                      :checked="selectAll"
                      @change="toggleSelectAll"
                      class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation" 
                    />
                  </th>
                  <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap" style="width: 50px;">No</th>
                  <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Company</th>
                  <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px] hidden md:table-cell">Website</th>
                  <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[80px] hidden sm:table-cell">Mobile</th>
                  <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[90px]">Category</th>
                  <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[80px]">Status</th>
                  <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap" style="width: 60px;">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr 
                  v-for="(company, index) in paginatedCompanies" 
                  :key="company.id" 
                  class="hover:bg-gray-50 active:bg-gray-100 transition"
                >
                  <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3">
                    <input 
                      type="checkbox" 
                      :checked="company.selected"
                      @change="toggleSelection(company)"
                      class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation" 
                    />
                  </td>
                  <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-700 text-[10px] sm:text-xs whitespace-nowrap">{{ getDisplayIndex(index) }}</td>
                  <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-900 font-medium text-[10px] sm:text-xs">
                    <div class="flex items-center gap-1 sm:gap-1.5 max-w-[120px] sm:max-w-[150px] md:max-w-none">
                      <span class="truncate">{{ company.name }}</span>
                      <CheckCircleIcon v-if="company.verified" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 flex-shrink-0" title="Verified" />
                    </div>
                  </td>
                  <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-yellow-500 text-[10px] sm:text-xs hidden md:table-cell">
                    <span class="truncate max-w-[150px] block">{{ company.website }}</span>
                  </td>
                  <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-700 text-[10px] sm:text-xs whitespace-nowrap hidden sm:table-cell">{{ company.mobile }}</td>
                  <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-700 text-[10px] sm:text-xs">
                    <span class="truncate max-w-[70px] sm:max-w-[90px] md:max-w-none block">{{ company.category }}</span>
                  </td>
                  <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                    <div 
                      class="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-medium text-[9px] sm:text-xs cursor-pointer touch-manipulation"
                      :class="getStatusClass(company.status)"
                      @click="changeStatus(company)"
                    >
                      <span class="hidden sm:inline">{{ company.status }}</span>
                      <span class="sm:hidden">{{ getStatusShort(company.status) }}</span>
                      <ChevronDownIcon class="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" aria-hidden="true" />
                    </div>
                  </td>
                  <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                    <EyeIcon 
                      @click="viewCompany(company)"
                      class="w-4 h-4 text-yellow-500 cursor-pointer hover:text-yellow-600 active:text-yellow-700 transition touch-manipulation" 
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="paginatedCompanies.length === 0" class="text-center py-8 sm:py-12">
            <div class="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
              <SearchIcon class="w-6 h-6 text-gray-400" aria-hidden="true" />
            </div>
            <p class="text-gray-500 text-xs sm:text-sm">No companies found</p>
            <p class="text-gray-400 text-[10px] sm:text-xs mt-1">Try adjusting your search or filters</p>
          </div>
      </template>
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
      <p class="text-[10px] sm:text-xs text-gray-600 text-center sm:text-left">
        Showing <span class="font-semibold">{{ paginatedCompanies.length }}</span> of 
        <span class="font-semibold">{{ filteredCompanies.length }}</span> companies (Page {{ currentPage }} of {{ totalPages }})
      </p>
      <div class="flex gap-1 sm:gap-1.5 flex-wrap justify-center">
        <button 
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-2.5 sm:px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] sm:text-xs text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition touch-manipulation flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon class="w-3 h-3" aria-hidden="true" />
          <span class="hidden xs:inline">Previous</span>
        </button>
        
        <template v-for="page in totalPages" :key="page">
            <button 
                v-if="page === currentPage || page === currentPage - 1 || page === currentPage + 1"
                @click="currentPage = page"
                :class="[
                    'px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition touch-manipulation',
                    page === currentPage 
                        ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 active:bg-yellow-600' 
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                ]"
            >
                {{ page }}
            </button>
        </template>
        
        <button 
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-2.5 sm:px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] sm:text-xs text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition touch-manipulation flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span class="hidden xs:inline">Next</span>
          <ChevronRightIcon class="w-3 h-3" aria-hidden="true" />
        </button>
      </div>
    </div>

    <AddCompany :is-open="isModalOpen" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent, onMounted, watch } from 'vue';
import { Search as SearchIcon, Eye as EyeIcon, CheckCircle as CheckCircleIcon, ChevronDown as ChevronDownIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Filter as FilterIcon, Phone as PhoneIcon, Globe as GlobeIcon } from "lucide-vue-next";
import { getStatusClass, getStatusShort } from '~/composables/useStatusClass'
import { useSelection } from '~/composables/useSelection'
// Note: Removed 'noop' import as it's no longer necessary.

const AddCompany = defineAsyncComponent(() => import('~/components/modal/addCompany.vue'))

// --- State ---
const isModalOpen = ref(false);
const showMobileFilters = ref(false);
const searchQuery = ref('');
const isLoading = ref(true); 
const companies = ref([]);

// Pagination State (New)
const currentPage = ref(1);
const itemsPerPage = 10; // Set a default pagination limit

// Filter State (Unchanged, but now monitored)
const filters = ref({
  dateFrom: '',
  dateTo: '',
  timeRange: '',
  status: '',
  category: ''
});

// --- Composables ---
// NOTE: Assuming useSelection provides the `selectAll` ref and `toggleSelection` / `toggleAll` methods
const { selectAll, toggleSelection, toggleAll } = useSelection(companies); 

// --- Data Fetching ---
const fetchData = async () => {
    isLoading.value = true;
    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        // Using fetch for a standard environment
        const response = await fetch('/stubs/companies.json');
        const companiesData = await response.json();
        companies.value = (companiesData || []).map(c => ({ ...c, selected: false }));
    } catch (error) {
        console.error("Failed to load companies:", error);
        companies.value = [];
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    fetchData();
});

// --- Computed Properties ---
const categories = computed(() => {
  return [...new Set(companies.value.map(c => c.category))];
});

const filteredCompanies = computed(() => {
  if (isLoading.value) return [];
  
  const query = (searchQuery.value || '').toLowerCase();
  const { status, category } = filters.value;

  return companies.value.filter(company => {
    // Search Filter
    const searchMatch = !query || company.name.toLowerCase().includes(query) || company.category.toLowerCase().includes(query);
    
    // Status Filter
    const statusMatch = !status || company.status === status;
    
    // Category Filter
    const categoryMatch = !category || company.category === category;
    
    // Date/Time Filter (Logic placeholder remains as in original, only allowing change detection)
    
    return searchMatch && statusMatch && categoryMatch;
  });
});

// Pagination computed properties
const totalPages = computed(() => {
    return Math.ceil(filteredCompanies.value.length / itemsPerPage);
});

const paginatedCompanies = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredCompanies.value.slice(start, end);
});


// --- Methods ---

/**
 * Resets the current page to 1 whenever a search or filter value changes.
 */
const handleFilterChange = () => {
  currentPage.value = 1;
};

const getDisplayIndex = (indexInPage) => {
    // Calculates the true index across all pages
    const trueIndex = (currentPage.value - 1) * itemsPerPage + indexInPage + 1;
    return String(trueIndex).padStart(2, '0');
};

const openAddModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const toggleSelectAll = () => {
  // Apply toggle to only the currently paginated list
  toggleAll(paginatedCompanies.value);
};

const viewCompany = (company) => {
  alert(`Viewing: ${company.name}`);
};

const changeStatus = (company) => {
  const statuses = ['Approved', 'Pending', 'Rejected'];
  const currentIndex = statuses.indexOf(company.status);
  const nextIndex = (currentIndex + 1) % statuses.length;
  // Mutate the reactive company object directly
  company.status = statuses[nextIndex];
};

const applyMobileFilters = () => {
  handleFilterChange();
  showMobileFilters.value = false;
};

const resetFilters = () => {
  filters.value = {
    dateFrom: '',
    dateTo: '',
    timeRange: '',
    status: '',
    category: ''
  };
  handleFilterChange();
};

// Pagination Methods
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};
</script>

<style scoped>
/* Keeping original styles and adding a necessary scrollbar fix */

@media (max-width: 475px) {
  .xs\\:hidden {
    display: none !important;
  }
  
  .xs\\:block {
    display: block !important;
  }
  
  .xs\\:inline {
    display: inline !important;
  }
}

@media (max-width: 640px) {
  .scrollbar-thin::-webkit-scrollbar {
    height: 4px;
  }
}

@media (max-width: 375px) {
  .text-\[10px\] {
    font-size: 9px;
  }
  
  .gap-1 {
    gap: 0.25rem;
  }
  
  .p-3 {
    padding: 0.75rem;
  }
}
</style>