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
     
      </div>
    </div>

    <div class="w-full bg-white rounded-xl shadow-md overflow-hidden">
      
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
                <span 
                  class="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap cursor-pointer" 
                  :class="getStatusClass(company.status)" 
                  @click="changeStatus(company)"
                >
                  {{ company.status }}
                </span>
              </div>
            </div>

            <div class="flex flex-col pl-7">
              <div class="flex justify-between items-end">
                <div class="flex flex-col gap-1 text-sm flex-1 min-w-0">
                  <div class="text-gray-600 truncate">Mobile: {{ company.mobile || 'N/A' }}</div>
                </div>
                
                <div class="ml-4 flex-shrink-0">
                  <span 
                    @click="toggleDetails(company.id)" 
                    class="text-amber-500 hover:text-amber-600 font-medium text-sm cursor-pointer whitespace-nowrap"
                  >
                    {{ expandedCompanyId === company.id ? 'Show Less' : 'View Details' }}
                  </span>
                </div>
              </div>

              <div v-if="expandedCompanyId === company.id" class="mt-3 pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-700 transition-all duration-300">
                  <div class="flex justify-between">
                      <strong class="text-gray-900 font-semibold">ID:</strong> 
                      <span class="font-medium text-right">{{ company.id }}</span>
                  </div>
                  <div class="flex justify-between">
                      <strong class="text-gray-900 font-semibold">Email:</strong> 
                      <span class="text-right truncate max-w-[70%]">{{ company.email || 'Not Provided' }}</span>
                  </div>
                  <div class="flex justify-between">
                      <strong class="text-gray-900 font-semibold">Address:</strong> 
                      <span class="text-right truncate max-w-[70%]">{{ company.address || 'Not Provided' }}</span>
                  </div>
                  <div class="flex justify-between">
                      <strong class="text-gray-900 font-semibold">Assigned:</strong> 
                      <span class="text-right">{{ company.assignedDate || 'N/A' }}</span>
                  </div>
              </div>
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
                  @change="toggleSelectAll"
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
                  <span>{{ company.status }}</span>
                  <ChevronDown class="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                </div>
              </td>

              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-center">
                <span
                  @click="viewDetails(company)"
                  class="text-[10px] sm:text-xs font-medium text-yellow-600 hover:text-yellow-700 active:text-yellow-800 transition touch-manipulation underline cursor-pointer"
                >
                  Details
                </span>
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

    <DetailModal 
      :isVisible="showDetailModal"
      :company="selectedCompany"
      @close="closeDetailModal"
      @changeStatus="changeStatusFromModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { Search, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Filter as FilterIcon, X } from "lucide-vue-next";
import DetailModal from '@/components/common/DetailModal.vue'

import { getStatusClass } from '~/composables/useStatusClass' 
import { useStubClient } from '~/services/stubClient'

const companies = ref([]);
const searchQuery = ref('');
const selectAll = ref(false);
const currentPage = ref(1);
const itemsPerPage = 8; 
const showMobileFilters = ref(false);
const expandedCompanyId = ref(null); 

// MODAL STATE
const showDetailModal = ref(false);
const selectedCompany = ref({});

const nuxtApp = typeof useNuxtApp === 'function' ? useNuxtApp() : {};
const stubClient = typeof useStubClient === 'function' ? useStubClient() : null;

const filters = ref({
  status: '',
  category: ''
});

let nextId = 1;

// --- DATA FETCHING ---
const fetchData = async () => {
  if (!stubClient) {
    console.error("useStubClient is not available. Using empty data array.");
    return;
  }

  try {
    const endpoint = 'subadminAssignedCompanies';
    const rowsData = await stubClient.list(endpoint, { delay: 140 });

    companies.value = (rowsData || []).map((row) => ({
      ...row,
      id: row.id || nextId++,
      status: row.status || 'Pending',
      selected: false,
      mobile: row.mobile || 'N/A',
      address: row.address || 'N/A',
      email: row.email || 'N/A',
      verified: !!row.verified,
      assignedDate: row.assignedDate || 'N/A' 
    }));
    
    if (nuxtApp.$awn) {
      nuxtApp.$awn.success('Company data loaded successfully!');
    }
  } catch (error) {
    console.error('Failed to load assigned companies:', error);
    
    if (nuxtApp.$awn) {
      nuxtApp.$awn.alert('Failed to load assigned companies.');
    }
    companies.value = [];
  }
};

// --- COMPUTED PROPERTIES ---
const filteredCompanies = computed(() => {
  const q = (searchQuery.value || '').toLowerCase()
  const status = filters.value.status
  
  const result = companies.value.filter(company => {
    if (q) {
      const matches = company.name.toLowerCase().includes(q) || 
                     company.category.toLowerCase().includes(q) || 
                     (company.mobile && company.mobile.includes(q))
      if (!matches) return false
    }
    if (status && company.status.toLowerCase() !== status) return false
    
    return true
  })
  
  return result
})

const totalPages = computed(() => {
  return Math.ceil(filteredCompanies.value.length / itemsPerPage);
});

const paginatedCompanies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredCompanies.value.slice(start, end);
});

// --- METHODS ---

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
  paginatedCompanies.value.forEach(company => {
    company.selected = selectAll.value;
  });
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const changeStatus = (company) => {
  const statuses = ['Pending', 'Verified', 'Rejected'];
  const currentStatus = company.status;
  const companyIndex = companies.value.findIndex(c => c.id === company.id);

  if (companyIndex !== -1) {
    const currentIndex = statuses.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    const newStatus = statuses[nextIndex];
    
    companies.value[companyIndex].status = newStatus;
    
    if (nuxtApp.$awn) {
      nuxtApp.$awn.info(`Status for ${company.name} updated to ${newStatus}.`);
    } else {
      console.log(`Status for ${company.name} updated to ${newStatus}.`);
    }
  }
};

// Method called by the Detail Modal
const changeStatusFromModal = (company) => {
    changeStatus(company);
    // Refresh the selected company object in the modal
    const updatedCompany = companies.value.find(c => c.id === company.id);
    if(updatedCompany) {
        selectedCompany.value = updatedCompany;
    }
}


const viewDetails = (company) => {
  selectedCompany.value = company;
  showDetailModal.value = true;
  if (nuxtApp.$awn) {
      nuxtApp.$awn.info(`Showing details for ${company.name}`);
  }
};

const closeDetailModal = () => {
  showDetailModal.value = false;
};

const toggleDetails = (companyId) => {
  expandedCompanyId.value = expandedCompanyId.value === companyId ? null : companyId;
};

// --- WATCHERS & LIFECYCLE HOOKS ---
watch([searchQuery, filters], () => {
  currentPage.value = 1;
}, { deep: true });

onMounted(() => {
  fetchData();
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