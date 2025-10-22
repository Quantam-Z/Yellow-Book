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
        <SearchIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          v-model="searchQuery"
          @input="filterCompanies"
          placeholder="Search Companies By Name Or Category"
          class="flex-1 outline-none border-none bg-transparent text-gray-700 placeholder-gray-400 text-xs sm:text-sm md:text-base min-w-0 
                 focus:ring-0 focus:outline-none"
        />
      </div>
    </div>

    <div class="mb-4 overflow-x-auto pb-2 scrollbar-thin"> 
      <div class="flex items-center gap-2 sm:gap-3 min-w-max pr-4">
        <h2 class="text-sm sm:text-base md:text-lg font-bold text-gray-900 whitespace-nowrap pr-2 sm:pr-3">
          All Company List
        </h2>
        
        <div class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 box-border flex items-center pl-4 pr-1 gap-2 text-sm text-silver">
          <span class="text-gray-400 text-sm hidden sm:inline">From:</span>
          <input 
            type="date" 
            v-model="filters.dateFrom"
            @change="filterCompanies"
            class="text-gray-600 text-sm outline-none bg-transparent cursor-pointer border-none touch-manipulation ring-0 focus:ring-0 w-24 sm:w-28 md:w-32"
          />
        </div>

        <div class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 box-border flex items-center pl-4 pr-1 gap-2 text-sm text-silver">
          <span class="text-gray-400 text-sm hidden sm:inline">To:</span>
          <input 
            type="date" 
            v-model="filters.dateTo"
            @change="filterCompanies"
            class="text-gray-600 text-sm outline-none bg-transparent cursor-pointer border-none touch-manipulation ring-0 focus:ring-0 w-24 sm:w-28 md:w-32"
          />
        </div>

        <div class="relative">
          <select 
            v-model="filters.timeRange"
            @change="filterCompanies"
            class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 box-border appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0 min-w-[120px]" 
          >
            <option value="">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
          </select>
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div class="relative">
          <select 
            v-model="filters.status"
            @change="filterCompanies"
            class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 box-border appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer
                   focus:outline-none focus:ring-0 min-w-[120px]"
          >
            <option value="">Select Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div class="relative">
          <select 
            v-model="filters.category"
            @change="filterCompanies"
            class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 box-border appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer
                   focus:outline-none focus:ring-0 min-w-[120px]"
          >
            <option value="">Select Category</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <button 
          @click="showMobileFilters = !showMobileFilters"
          class="h-12 bg-white rounded-xl px-4 py-2 border border-gray-300 text-gray-600 text-sm outline-none cursor-pointer whitespace-nowrap touch-manipulation lg:hidden flex items-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition"
        >
          <FilterIcon class="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      <div v-if="showMobileFilters" class="mt-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 lg:hidden">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs text-gray-500 font-medium">Time Range</label>
            <select 
              v-model="filters.timeRange"
              @change="filterCompanies"
              class="bg-gray-50 rounded-lg px-3 py-2 text-sm outline-none border border-gray-200 h-10"
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
              @change="filterCompanies"
              class="bg-gray-50 rounded-lg px-3 py-2 text-sm outline-none border border-gray-200 h-10"
            >
              <option value="">Select Category</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
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
                v-for="(company, index) in filteredCompanies" 
                :key="company.id"
                class="p-4 border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition"
              >
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        v-model="company.selected"
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
                        <ChevronDownIcon class="w-2.5 h-2.5 flex-shrink-0" />
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
                      <CheckCircleIcon v-if="company.verified" class="w-3 h-3 text-green-500 flex-shrink-0" />
                    </div>
                    
                    <div class="flex items-center justify-between text-[11px] text-gray-600">
                      <span class="bg-gray-100 px-2 py-1 rounded-md">{{ company.category }}</span>
                      <span class="flex items-center gap-1">
                        <PhoneIcon class="w-3 h-3" />
                        {{ company.mobile }}
                      </span>
                    </div>
                    
                    <div class="text-[11px] text-yellow-500 truncate flex items-center gap-1">
                      <GlobeIcon class="w-3 h-3" />
                      {{ company.website }}
                    </div>
                  </div>
              </div>
          </div>

          <div class="hidden sm:block overflow-x-auto scrollbar-thin">
            <table class="w-full table-auto" style="min-width: 600px;">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left" style="width: 40px;">
                    <input 
                      type="checkbox" 
                      v-model="selectAll"
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
                  v-for="(company, index) in filteredCompanies" 
                  :key="company.id" 
                  class="hover:bg-gray-50 active:bg-gray-100 transition"
                >
                  <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3">
                    <input 
                      type="checkbox" 
                      v-model="company.selected"
                      class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation" 
                    />
                  </td>
                  <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-700 text-[10px] sm:text-xs whitespace-nowrap">{{ getDisplayIndex(index) }}</td>
                  <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-900 font-medium text-[10px] sm:text-xs">
                    <div class="flex items-center gap-1 sm:gap-1.5 max-w-[120px] sm:max-w-[150px] md:max-w-none">
                      <span class="truncate">{{ company.name }}</span>
                      <CheckCircleIcon v-if="company.verified" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 flex-shrink-0" />
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
                      <ChevronDownIcon class="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
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

          <div v-if="filteredCompanies.length === 0" class="text-center py-8 sm:py-12">
            <div class="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
              <SearchIcon class="w-6 h-6 text-gray-400" />
            </div>
            <p class="text-gray-500 text-xs sm:text-sm">No companies found</p>
            <p class="text-gray-400 text-[10px] sm:text-xs mt-1">Try adjusting your search or filters</p>
          </div>
      </template>
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
      <p class="text-[10px] sm:text-xs text-gray-600 text-center sm:text-left">
        Showing <span class="font-semibold">{{ filteredCompanies.length }}</span> of 
        <span class="font-semibold">{{ companies.length }}</span> companies
      </p>
      <div class="flex gap-1 sm:gap-1.5 flex-wrap justify-center">
        <button class="px-2.5 sm:px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] sm:text-xs text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition touch-manipulation flex items-center gap-1">
          <ChevronLeftIcon class="w-3 h-3" />
          <span class="hidden xs:inline">Previous</span>
        </button>
        <button class="px-2.5 sm:px-3 py-1.5 bg-yellow-400 text-gray-900 rounded-lg text-[10px] sm:text-xs font-medium hover:bg-yellow-500 active:bg-yellow-600 transition touch-manipulation">
          1
        </button>
        <button class="px-2.5 sm:px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] sm:text-xs text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition touch-manipulation hidden xs:block">
          2
        </button>
        <button class="px-2.5 sm:px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] sm:text-xs text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition touch-manipulation flex items-center gap-1">
          <span class="hidden xs:inline">Next</span>
          <ChevronRightIcon class="w-3 h-3 xs:hidden" />
        </button>
      </div>
    </div>

    <AddCompany :is-open="isModalOpen" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent, onMounted } from 'vue';
import { Search as SearchIcon, Eye as EyeIcon, CheckCircle as CheckCircleIcon, ChevronDown as ChevronDownIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Filter as FilterIcon, Phone as PhoneIcon, Globe as GlobeIcon } from "lucide-vue-next";
import { getStatusClass, getStatusShort } from '~/composables/useStatusClass'
import { useSelection } from '~/composables/useSelection'
import { noop } from '~/composables/useCommon'

const AddCompany = defineAsyncComponent(() => import('~/components/modal/addCompany.vue'))

const isModalOpen = ref(false);
const showMobileFilters = ref(false);
const searchQuery = ref('');
const selectAll = ref(false);
const isLoading = ref(true); 

const filters = ref({
  dateFrom: '',
  dateTo: '',
  timeRange: '',
  status: '',
  category: ''
});

const companies = ref([]);

const fetchData = async () => {
    isLoading.value = true;
    try {
        await new Promise(resolve => setTimeout(resolve, 800));
        const { data: companiesData } = await useFetch('/stubs/companies.json');
        companies.value = (companiesData.value || []).map(c => ({ ...c, selected: false }));
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

const categories = computed(() => {
  return [...new Set(companies.value.map(c => c.category))];
});

const filteredCompanies = computed(() => {
  if (isLoading.value) return [];
  
  const query = (searchQuery.value || '').toLowerCase();
  const { status, category } = filters.value;

  return companies.value.filter(company => {
    if (query && !company.name.toLowerCase().includes(query) && !company.category.toLowerCase().includes(query)) {
      return false;
    }
    if (status && company.status !== status) {
      return false;
    }
    if (category && company.category !== category) {
      return false;
    }
    return true;
  });
});

const getDisplayIndex = (index) => String(index + 1).padStart(2, '0');

const filterCompanies = noop;

const openAddModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const { toggleAll } = useSelection(companies); 

const toggleSelectAll = () => {
  toggleAll(filteredCompanies.value);
};

const viewCompany = (company) => {
  alert(`Viewing: ${company.name}`);
};

const changeStatus = (company) => {
  const statuses = ['Approved', 'Pending', 'Rejected'];
  const currentIndex = statuses.indexOf(company.status);
  const nextIndex = (currentIndex + 1) % statuses.length;
  company.status = statuses[nextIndex];
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

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

.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

/* Focused elements use the yellow outline, but filter elements specifically remove the ring-0 default */
input:focus, 
select:focus, 
button:focus {
  outline: 2px solid #fbbf24;
  outline-offset: 2px;
}

/* Override for date input focus to keep it clean */
input[type="date"]:focus {
  outline: none;
  border-color: #e5e7eb;
  box-shadow: none;
}

select.appearance-none {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

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