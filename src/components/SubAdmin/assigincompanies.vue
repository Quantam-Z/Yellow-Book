<template>
  <div class="w-full font-plus-jakarta-sans">
    <!-- Header Section with Gradient Background -->
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">My Assign Companies</h1>
      </div>

      <!-- Search Bar -->
      <div class="w-full relative rounded-lg bg-gray-50 border-white border-solid border box-border flex items-center p-2.5 sm:p-3 md:p-4 gap-2 sm:gap-3">
        <Search class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search companies by name or category"
          class="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400 text-xs sm:text-sm md:text-base leading-[130%] capitalize min-w-0"
        />
      </div>
    </div>

    <!-- Filters Section - Enhanced for Mobile -->
    <div class="mb-4 flex flex-col xs:flex-row gap-3 items-start xs:items-center justify-between">
      <h2 class="text-xs sm:text-sm md:text-base font-semibold text-gray-900 whitespace-nowrap hidden xs:block">
        All Company List
      </h2>
      
      <!-- Status Filter -->
      <div class="flex items-center gap-1.5 sm:gap-2 w-full xs:w-auto">
        <select 
          v-model="filters.status"
          class="flex-1 xs:w-32 sm:w-40 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-gray-200 bg-white text-[10px] sm:text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation"
        >
          <option value="">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
        
        <!-- Category Filter -->
        <select 
          v-model="filters.category"
          class="flex-1 xs:w-32 sm:w-40 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-gray-200 bg-white text-[10px] sm:text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation"
        >
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <!-- Table Container with Mobile Card View -->
    <div class="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <!-- Mobile Card View -->
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
              <div class="flex items-center gap-1">
                <Eye 
                  @click="viewCompany(company)"
                  class="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-600 transition touch-manipulation" 
                  title="View Details"
                />
                <button 
                  @click="editCompany(company)"
                  class="w-4 h-4 text-green-500 cursor-pointer hover:text-green-600 transition touch-manipulation"
                  title="Edit Company"
                >
                  ✏️
                </button>
              </div>
            </div>
          </div>
          
          <!-- Company Info -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-gray-900 truncate flex-1">{{ company.name }}</span>
              <CheckCircle v-if="company.verified" class="w-3 h-3 text-green-500 flex-shrink-0" />
            </div>
            
            <div class="text-[11px] text-blue-500 truncate">
              <a :href="'https://' + company.website" target="_blank" class="hover:underline">
                {{ company.website }}
              </a>
            </div>
            
            <div class="flex items-center justify-between text-[11px]">
              <div class="flex items-center gap-2">
                <span class="bg-gray-100 px-2 py-1 rounded text-gray-700">{{ company.category }}</span>
                <span class="text-gray-600">{{ company.mobile }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Table View -->
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
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px] hidden md:table-cell">Website</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[80px] hidden sm:table-cell">Mobile</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[90px]">Category</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[80px]">Status</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap w-16">Action</th>
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
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-blue-500 text-[10px] sm:text-xs whitespace-nowrap hidden md:table-cell">
                <a :href="'https://' + company.website" target="_blank" class="hover:underline truncate max-w-[120px] block">
                  {{ company.website }}
                </a>
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-700 text-[10px] sm:text-xs whitespace-nowrap hidden sm:table-cell">
                {{ company.mobile }}
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
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                <div class="flex items-center gap-1 sm:gap-2">
                  <Eye 
                    @click="viewCompany(company)"
                    class="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-700 transition touch-manipulation" 
                    title="View Details"
                  />
                  <button 
                    @click="editCompany(company)"
                    class="w-4 h-4 text-green-500 cursor-pointer hover:text-green-600 active:text-green-700 transition touch-manipulation"
                    title="Edit Company"
                  >
                    ✏️
                  </button>
                </div>
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
        <p class="text-gray-500 text-xs sm:text-sm">No companies found matching your criteria</p>
        <p class="text-gray-400 text-[10px] sm:text-xs mt-1">Try adjusting your search or filters</p>
      </div>
    </div>

    <!-- Enhanced Pagination -->
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
          <span class="hidden xs:inline">Previous</span>
        </button>
        
        <!-- Page Numbers - Show limited on mobile -->
        <button 
          v-for="page in getVisiblePages()" 
          :key="page"
          @click="goToPage(page)"
          class="px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition touch-manipulation hidden xs:block"
          :class="page === currentPage ? 'bg-yellow-400 text-gray-900' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'"
        >
          {{ page }}
        </button>

        <!-- Current page indicator for mobile -->
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
          <span class="hidden xs:inline">Next</span>
          <ChevronRight class="w-3 h-3 xs:hidden" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Search, Eye, CheckCircle, ChevronDown, ChevronLeft, ChevronRight } from "lucide-vue-next";

// Initial data
const companies = ref([
  { id: 1, name: "ABC Company", website: "www.yourwebsite.com", mobile: "556265485", category: "Technology", status: "Approved", verified: false, selected: false },
  { id: 2, name: "XYZ Corporation", website: "www.xyzcorp.com", mobile: "556265486", category: "Finance", status: "Pending", verified: false, selected: false },
  { id: 3, name: "Tech Solutions Ltd", website: "www.techsolutions.com", mobile: "556265487", category: "Technology", status: "Approved", verified: true, selected: false },
  { id: 4, name: "Global Enterprises", website: "www.globalent.com", mobile: "556265488", category: "Manufacturing", status: "Approved", verified: false, selected: false },
  { id: 5, name: "Digital Innovations", website: "www.digiinnov.com", mobile: "556265489", category: "Technology", status: "Rejected", verified: false, selected: false },
  { id: 6, name: "Smart Systems Inc", website: "www.smartsystems.com", mobile: "556265490", category: "IT Services", status: "Approved", verified: false, selected: false },
  { id: 7, name: "Future Tech Labs", website: "www.futuretech.com", mobile: "556265491", category: "Research", status: "Pending", verified: false, selected: false },
  { id: 8, name: "Cloud Solutions Pro", website: "www.cloudsol.com", mobile: "556265492", category: "Cloud Services", status: "Approved", verified: false, selected: false },
  { id: 9, name: "Data Analytics Corp", website: "www.dataanalytics.com", mobile: "556265493", category: "Analytics", status: "Approved", verified: false, selected: false },
  { id: 10, name: "Cyber Security Ltd", website: "www.cybersec.com", mobile: "556265494", category: "Security", status: "Pending", verified: false, selected: false },
  { id: 11, name: "Web Design Studio", website: "www.webdesign.com", mobile: "556265495", category: "Design", status: "Approved", verified: false, selected: false },
  { id: 12, name: "Mobile App Developers", website: "www.mobileapp.com", mobile: "556265496", category: "Technology", status: "Approved", verified: false, selected: false },
]);

// Search and filters
const searchQuery = ref('');
const selectAll = ref(false);
const currentPage = ref(1);
const itemsPerPage = 8;

const filters = ref({
  status: '',
  category: ''
});

// Get unique categories
const categories = computed(() => {
  return [...new Set(companies.value.map(c => c.category))];
});

// Filtered companies
const filteredCompanies = computed(() => {
  let result = [...companies.value];
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(company => 
      company.name.toLowerCase().includes(query) || 
      company.category.toLowerCase().includes(query) ||
      company.website.toLowerCase().includes(query)
    );
  }
  
  // Status filter
  if (filters.value.status) {
    result = result.filter(company => company.status === filters.value.status);
  }
  
  // Category filter
  if (filters.value.category) {
    result = result.filter(company => company.category === filters.value.category);
  }
  
  // Reset to page 1 when filters change
  currentPage.value = 1;
  
  return result;
});

// Pagination
const totalPages = computed(() => {
  return Math.ceil(filteredCompanies.value.length / itemsPerPage);
});

const paginatedCompanies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredCompanies.value.slice(start, end);
});

// Get visible pages for pagination (limited on mobile)
const getVisiblePages = () => {
  const pages = [];
  const maxVisible = 3; // Show only 3 pages on mobile
  
  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    let start = Math.max(1, currentPage.value - 1);
    let end = Math.min(totalPages.value, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }
  
  return pages;
};

// Select all checkbox
const toggleSelectAll = () => {
  paginatedCompanies.value.forEach(company => {
    company.selected = selectAll.value;
  });
};

// Get status class
const getStatusClass = (status) => {
  switch(status) {
    case 'Approved':
      return 'bg-green-100 text-green-700 hover:bg-green-200';
    case 'Pending':
      return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
    case 'Rejected':
      return 'bg-red-100 text-red-700 hover:bg-red-200';
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  }
};

// Get short status for mobile
const getStatusShort = (status) => {
  switch(status) {
    case 'Approved': return 'App';
    case 'Pending': return 'Pen';
    case 'Rejected': return 'Rej';
    default: return status;
  }
};

// Navigation
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Action handlers
const viewCompany = (company) => {
  console.log('View company:', company);
  // Add your view logic here
};

const editCompany = (company) => {
  console.log('Edit company:', company);
  // Add your edit logic here
};

const changeStatus = (company) => {
  console.log('Change status for:', company);
  // Add your status change logic here
};
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

  .xs\\:flex-row {
    flex-direction: row !important;
  }

  .xs\\:items-center {
    align-items: center !important;
  }

  .xs\\:w-auto {
    width: auto !important;
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