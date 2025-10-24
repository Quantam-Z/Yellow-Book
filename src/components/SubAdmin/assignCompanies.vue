<template>
  <div class="w-full font-plus-jakarta-sans">
    <!-- Header Section -->
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">My Assign Companies</h1>
      </div>

      <div class="w-full relative rounded-lg bg-gray-50 border-white border-solid border box-border flex items-center p-2.5 sm:p-3 md:p-4 gap-2 sm:gap-3">
        <Search class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search companies by name or category"
          class="flex-1 outline-none border-none bg-transparent text-gray-600 placeholder-gray-400 text-xs sm:text-sm md:text-base leading-[130%] capitalize min-w-0"
        />
      </div>
    </div>

    <!-- Header with "All List" and Filters -->
    <div class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
      <!-- "All List" on the left -->
      <h2 class="text-base sm:text-lg font-semibold text-gray-900 whitespace-nowrap">All List</h2>
      
      <!-- Filters on the right -->
      <div class="flex flex-wrap gap-2 sm:gap-3 items-center justify-end w-full sm:w-auto">
        <!-- Status Filter -->
        <div class="relative min-w-[120px] sm:min-w-[140px]">
          <select 
            v-model="filters.status"
            class="h-9 sm:h-10 w-full rounded-lg bg-white border border-gray-200 box-border flex items-center py-0 pl-3 pr-8 text-xs sm:text-sm text-gray-700 leading-[130%] font-medium appearance-none cursor-pointer focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
          <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"/>
        </div>

      
      </div>
    </div>

    <!-- Companies Table -->
    <div class="w-full bg-white rounded-xl shadow-md overflow-hidden">
      
      <!-- Mobile View -->
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
                v-model="company.selected"
                class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation" 
              />
              <span class="text-[10px] text-gray-500 font-medium">
                {{ String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, '0') }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <div 
                class="inline-flex items-center gap-1 px-2 py-1 rounded-md font-medium text-[9px] cursor-pointer touch-manipulation"
                :class="getStatusClass(company.status)"
                @click="changeStatus(company)"
              >
                <span>{{ getStatusShort(company.status) }}</span>
              </div>
            </div>
          </div>
          
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-gray-900 truncate flex-1">{{ company.name }}</span>
              <CheckCircle v-if="company.verified" class="w-3 h-3 text-green-500 flex-shrink-0" />
            </div>
            
            <div class="flex items-center justify-between text-[11px] flex-wrap gap-y-1">
              <div class="flex items-center gap-2">
                <span class="bg-gray-100 px-2 py-1 rounded text-gray-700">{{ company.category }}</span>
                <span class="text-gray-600">{{ company.mobile }}</span>
              </div>
            </div>

            <div class="pt-2 flex justify-center">
              <span
                role="button"
                tabindex="0"
                @click="viewDetails(company)"
                @keydown.enter="viewDetails(company)"
                @keydown.space.prevent="viewDetails(company)"
                class="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100 active:bg-blue-200 transition cursor-pointer select-none"
              >
                Details
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop View -->
      <div class="hidden sm:block overflow-x-auto scrollbar-thin">
        <table class="w-full table-auto" style="min-width: 700px;">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left w-12">
                <input 
                  type="checkbox" 
                  v-model="selectAll"
                  @change="toggleSelectAll"
                  class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation" 
                />
              </th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap w-12">No</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Company Name</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[90px]">Category</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[80px]">Status</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[90px]">Action</th>
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
                  v-model="company.selected"
                  class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation" 
                />
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-700 text-[10px] sm:text-xs whitespace-nowrap">
                {{ String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, '0') }}
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-900 font-medium text-[10px] sm:text-xs">
                <div class="flex items-center gap-1.5 max-w-[120px]">
                  <span class="truncate">{{ company.name }}</span>
                  <CheckCircle v-if="company.verified" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 flex-shrink-0" />
                </div>
              </td>
           
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

      <!-- Empty State -->
      <div v-if="filteredCompanies.length === 0" class="text-center py-8 sm:py-12">
        <div class="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
          <Search class="w-6 h-6 text-gray-400" />
        </div>
        <p class="text-gray-500 text-xs sm:text-sm">No companies found matching your criteria</p>
        <p class="text-gray-400 text-[10px] sm:text-xs mt-1">Try adjusting your search or filters</p>
      </div>
    </div>

    <!-- Pagination -->
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
          class="px-2.5 sm:px-3 py-1.5 bg-yellow-400 text-gray-900 rounded-lg text-[10px] sm:text-xs font-medium sm:hidden"
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Search, CheckCircle, ChevronDown, ChevronLeft, ChevronRight } from "lucide-vue-next";

// Status utility functions
const getStatusClass = (status) => {
  const statusMap = {
    'pending': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    'verified': 'bg-green-100 text-green-800 border border-green-200',
    'rejected': 'bg-red-100 text-red-800 border border-red-200'
  };
  return statusMap[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 border border-gray-200';
};

const getStatusShort = (status) => {
  const shortMap = {
    'pending': 'Pend',
    'verified': 'Verif',
    'rejected': 'Rej'
  };
  return shortMap[status?.toLowerCase()] || status?.substring(0, 4) || 'N/A';
};

// Load from stub
const { data: companiesData } = await useFetch('/stubs/companies.json')
const companies = ref((companiesData.value || []).map(c => ({ ...c, selected: false })))

// Search and filters
const searchQuery = ref('');
const selectAll = ref(false);
const currentPage = ref(1);
const itemsPerPage = 8;

const filters = ref({
  status: '',
  category: ''
});

// Unique categories and statuses
const categories = computed(() => {
  const seen = new Set()
  for (const c of companies.value) seen.add(c.category)
  return Array.from(seen).sort()
})

const statuses = computed(() => {
  const seen = new Set()
  for (const c of companies.value) seen.add(c.status)
  return Array.from(seen).sort()
})

// Filtered companies
const filteredCompanies = computed(() => {
  const q = (searchQuery.value || '').toLowerCase()
  const status = filters.value.status
  const category = filters.value.category
  
  const result = companies.value.filter(company => {
    // Search
    if (q) {
      const matches = company.name.toLowerCase().includes(q) || 
                     company.category.toLowerCase().includes(q) || 
                     (company.website && company.website.toLowerCase().includes(q))
      if (!matches) return false
    }
    // Status Filter
    if (status && company.status !== status) return false
    // Category Filter
    if (category && company.category !== category) return false
    
    return true
  })
  
  // Reset pagination on filter change
  currentPage.value = 1
  return result
})

// Pagination
const totalPages = computed(() => {
  return Math.ceil(filteredCompanies.value.length / itemsPerPage);
});

const paginatedCompanies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredCompanies.value.slice(start, end);
});

// Get visible pages for pagination
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

// Navigation
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const changeStatus = (company) => {
  console.log('Change status for:', company.name);
};

// Action: Details
const viewDetails = (company) => {
  // Implement navigation or modal as needed
  console.log('Viewing details for:', company.name);
};

// Watch for filter changes to reset pagination
watch([() => filters.value.status, () => filters.value.category], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Better touch targets for mobile */
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

/* Rely on Tailwind's sm breakpoint for pagination labels */
</style>