<template>
  <div class="w-full font-plus-jakarta-sans max-w-full overflow-hidden">
    <!-- Header Section with Gradient Background -->
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Company Management</h1>
        <button 
          @click="openAddModal"
          class="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-semibold px-3 sm:px-4 py-2 rounded-lg transition shadow-md whitespace-nowrap text-xs sm:text-sm w-full sm:w-auto touch-manipulation"
        >
          Add Company
        </button>
      </div>

      <!-- Search Bar -->
      <div class="w-full relative rounded-lg bg-gray-50 border-white border-solid border box-border flex items-center p-2.5 sm:p-3 md:p-4 gap-2 sm:gap-3">
        <Search class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          v-model="searchQuery"
          @input="filterCompanies"
          placeholder="Search companies..."
          class="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400 text-xs sm:text-sm md:text-base leading-[130%] min-w-0"
        />
      </div>
    </div>

    <!-- Filters Section - Enhanced for Mobile -->
    <div class="mb-4 overflow-x-auto pb-2 scrollbar-thin">
      <div class="flex items-center gap-1.5 sm:gap-2 min-w-max pr-4">
        <h2 class="text-xs sm:text-sm md:text-base font-semibold text-gray-900 whitespace-nowrap pr-1 sm:pr-2 hidden xs:block">
          All Company List
        </h2>
        
        <!-- Date Filters -->
        <div class="flex items-center gap-1 sm:gap-1.5 bg-white rounded-lg px-1.5 sm:px-2 py-1.5 shadow-sm border border-gray-200 whitespace-nowrap">
          <span class="text-gray-500 text-[10px] sm:text-xs hidden xs:inline">From:</span>
          <input 
            type="date" 
            v-model="filters.dateFrom"
            @change="filterCompanies"
            class="font-medium text-gray-900 text-[10px] sm:text-xs outline-none cursor-pointer w-20 xs:w-24 sm:w-28 touch-manipulation"
          />
          <Calendar class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0 hidden xs:block" />
        </div>

        <div class="flex items-center gap-1 sm:gap-1.5 bg-white rounded-lg px-1.5 sm:px-2 py-1.5 shadow-sm border border-gray-200 whitespace-nowrap">
          <span class="text-gray-500 text-[10px] sm:text-xs hidden xs:inline">To:</span>
          <input 
            type="date" 
            v-model="filters.dateTo"
            @change="filterCompanies"
            class="font-medium text-gray-900 text-[10px] sm:text-xs outline-none cursor-pointer w-20 xs:w-24 sm:w-28 touch-manipulation"
          />
          <Calendar class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0 hidden xs:block" />
        </div>

        <!-- Time Range Filter -->
        <select 
          v-model="filters.timeRange"
          @change="filterCompanies"
          class="bg-white rounded-lg px-2 sm:px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-[10px] sm:text-xs outline-none cursor-pointer whitespace-nowrap touch-manipulation hidden xs:block"
        >
          <option value="">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
        </select>

        <!-- Status Filter -->
        <select 
          v-model="filters.status"
          @change="filterCompanies"
          class="bg-white rounded-lg px-2 sm:px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-[10px] sm:text-xs outline-none cursor-pointer whitespace-nowrap touch-manipulation"
        >
          <option value="">Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>

        <!-- Category Filter -->
        <select 
          v-model="filters.category"
          @change="filterCompanies"
          class="bg-white rounded-lg px-2 sm:px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-[10px] sm:text-xs outline-none cursor-pointer whitespace-nowrap touch-manipulation hidden sm:block"
        >
          <option value="">Category</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>

        <!-- Mobile Filter Button for extra small screens -->
        <button 
          @click="showMobileFilters = !showMobileFilters"
          class="bg-white rounded-lg px-2 sm:px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-[10px] sm:text-xs outline-none cursor-pointer whitespace-nowrap touch-manipulation xs:hidden flex items-center gap-1"
        >
          <Filter class="w-3 h-3" />
          <span>More</span>
        </button>
      </div>

      <!-- Mobile Filters Dropdown for extra small screens -->
      <div v-if="showMobileFilters" class="mt-2 p-3 bg-white rounded-lg shadow-sm border border-gray-200 xs:hidden">
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1">
            <label class="text-[10px] text-gray-500">Time Range</label>
            <select 
              v-model="filters.timeRange"
              @change="filterCompanies"
              class="bg-gray-50 rounded px-2 py-1.5 text-[10px] outline-none border border-gray-200"
            >
              <option value="">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-[10px] text-gray-500">Category</label>
            <select 
              v-model="filters.category"
              @change="filterCompanies"
              class="bg-gray-50 rounded px-2 py-1.5 text-[10px] outline-none border border-gray-200"
            >
              <option value="">All</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Container with Mobile Card View -->
    <div class="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <!-- Mobile Card View (Small screens) -->
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
              <span class="text-[10px] text-gray-500 font-medium">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div 
                class="inline-flex items-center gap-1 px-2 py-1 rounded-md font-medium text-[9px] cursor-pointer touch-manipulation"
                :class="getStatusClass(company.status)"
                @click="changeStatus(company)"
              >
                <span>{{ getStatusShort(company.status) }}</span>
                <ChevronDown class="w-2.5 h-2.5 flex-shrink-0" />
              </div>
              <Eye 
                @click="viewCompany(company)"
                class="w-4 h-4 text-yellow-500 cursor-pointer hover:text-yellow-600 transition touch-manipulation" 
              />
            </div>
          </div>
          
          <!-- Company Info -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-gray-900 truncate flex-1">{{ company.name }}</span>
              <CheckCircle v-if="company.verified" class="w-3 h-3 text-green-500 flex-shrink-0" />
            </div>
            
            <div class="flex items-center justify-between text-[11px] text-gray-600">
              <span class="bg-gray-100 px-2 py-1 rounded-md">{{ company.category }}</span>
              <span class="flex items-center gap-1">
                <Phone class="w-3 h-3" />
                {{ company.mobile }}
              </span>
            </div>
            
            <div class="text-[11px] text-yellow-500 truncate flex items-center gap-1">
              <Globe class="w-3 h-3" />
              {{ company.website }}
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Table View -->
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
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-700 text-[10px] sm:text-xs whitespace-nowrap">{{ String(index + 1).padStart(2, '0') }}</td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-900 font-medium text-[10px] sm:text-xs">
                <div class="flex items-center gap-1 sm:gap-1.5 max-w-[120px] sm:max-w-[150px] md:max-w-none">
                  <span class="truncate">{{ company.name }}</span>
                  <CheckCircle v-if="company.verified" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 flex-shrink-0" />
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
                  <ChevronDown class="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                </div>
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                <Eye 
                  @click="viewCompany(company)"
                  class="w-4 h-4 text-yellow-500 cursor-pointer hover:text-yellow-600 active:text-yellow-700 transition touch-manipulation" 
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- No Results -->
      <div v-if="filteredCompanies.length === 0" class="text-center py-8 sm:py-12">
        <div class="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
          <Search class="w-6 h-6 text-gray-400" />
        </div>
        <p class="text-gray-500 text-xs sm:text-sm">No companies found</p>
        <p class="text-gray-400 text-[10px] sm:text-xs mt-1">Try adjusting your search or filters</p>
      </div>
    </div>

    <!-- Enhanced Pagination -->
    <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
      <p class="text-[10px] sm:text-xs text-gray-600 text-center sm:text-left">
        Showing <span class="font-semibold">{{ filteredCompanies.length }}</span> of 
        <span class="font-semibold">{{ companies.length }}</span> companies
      </p>
      <div class="flex gap-1 sm:gap-1.5 flex-wrap justify-center">
        <button class="px-2.5 sm:px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] sm:text-xs text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition touch-manipulation flex items-center gap-1">
          <ChevronLeft class="w-3 h-3" />
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
          <ChevronRight class="w-3 h-3 xs:hidden" />
        </button>
      </div>
    </div>

    <!-- Add Company Modal -->
    <AddCompany :isOpen="isModalOpen" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from 'vue';
import { getStatusClass, getStatusShort } from '~/composables/useStatusClass'
import { useSelection } from '~/composables/useSelection'
import { Search, Calendar, Eye, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Filter, Phone, Globe } from "lucide-vue-next";
// Lazy-load modal, fix import case to match file system
const AddCompany = defineAsyncComponent(() => import('~/components/modal/addCompany.vue'))

// Modal state
const isModalOpen = ref(false);
const showMobileFilters = ref(false);

const openAddModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Load companies from JSON stub (SSR-friendly)
const { data: companiesData } = await useFetch('/stubs/companies.json')
const companies = ref((companiesData.value || []).map(c => ({ ...c, selected: false })))

// Search and filters
const searchQuery = ref('');
// selection state derived from filtered list
const selectAll = ref(false);
const filters = ref({
  dateFrom: '',
  dateTo: '',
  timeRange: '',
  status: '',
  category: ''
});

// Get unique categories without extra spread copies
const categories = computed(() => {
  const seen = new Set()
  for (const c of companies.value) seen.add(c.category)
  return Array.from(seen)
})

// Computed filter to avoid unnecessary array copies
const filteredCompanies = computed(() => {
  const query = (searchQuery.value || '').toLowerCase()
  const status = filters.value.status
  const category = filters.value.category

  return companies.value.filter(company => {
    if (query) {
      const matchesQuery = company.name.toLowerCase().includes(query) || company.category.toLowerCase().includes(query)
      if (!matchesQuery) return false
    }
    if (status && company.status !== status) return false
    if (category && company.category !== category) return false
    return true
  })
})

// No-op to keep template bindings; computed handles filtering
import { noop } from '~/composables/useCommon'
const filterCompanies = noop

// Selection helpers
const { toggleAll } = useSelection(companies)
// Select all checkbox only affects currently filtered rows
const toggleSelectAll = () => {
  toggleAll(filteredCompanies.value)
}

// Status helpers are centralized in composable

// Action handlers
const viewCompany = (company) => {
  alert(`Viewing: ${company.name}`);
};

const changeStatus = (company) => {
  // Cycle through statuses
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

/* Smooth scrolling for better UX */
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

/* Better focus states for accessibility */
input:focus, 
select:focus, 
button:focus {
  outline: 2px solid #fbbf24;
  outline-offset: 2px;
}

/* Prevent horizontal scroll on body */
body {
  overflow-x: hidden;
}

/* Enhanced responsive breakpoints */
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

/* Mobile specific adjustments */
@media (max-width: 640px) {
  .scrollbar-thin::-webkit-scrollbar {
    height: 4px;
  }
}

/* Extra small devices optimization */
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