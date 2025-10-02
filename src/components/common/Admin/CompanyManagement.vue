<template>
  <div class="w-full font-plus-jakarta-sans">
    <!-- Header Section with Gradient Background -->
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4 mb-4">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 class="text-xl md:text-2xl font-bold text-gray-900">Company Management</h1>
        <button 
          @click="openAddModal"
          class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition shadow-md whitespace-nowrap text-sm"
        >
          Add Company
        </button>
      </div>

      <!-- Search Bar -->
      <div class="w-full relative rounded-lg bg-gray-50 border-white border-solid border box-border flex items-center p-4 gap-3">
        <Search class="w-6 h-6 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          v-model="searchQuery"
          @input="filterCompanies"
          placeholder="Search companies by name or category"
          class="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400 text-base leading-[130%] capitalize min-w-0"
        />
      </div>
    </div>

    <!-- Filters Section - Single Line with Horizontal Scroll -->
    <div class="mb-4 overflow-x-auto pb-2 scrollbar-thin">
      <div class="flex items-center gap-2 min-w-max">
        <h2 class="text-sm md:text-base font-semibold text-gray-900 whitespace-nowrap">All Company List</h2>
        
        <div class="flex items-center gap-2 bg-white rounded-lg px-2 py-1.5 shadow-sm border border-gray-200 whitespace-nowrap">
          <span class="text-gray-500 text-xs">From:</span>
          <input 
            type="date" 
            v-model="filters.dateFrom"
            @change="filterCompanies"
            class="font-medium text-gray-900 text-xs outline-none cursor-pointer w-28"
          />
          <Calendar class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        </div>

        <div class="flex items-center gap-2 bg-white rounded-lg px-2 py-1.5 shadow-sm border border-gray-200 whitespace-nowrap">
          <span class="text-gray-500 text-xs">To:</span>
          <input 
            type="date" 
            v-model="filters.dateTo"
            @change="filterCompanies"
            class="font-medium text-gray-900 text-xs outline-none cursor-pointer w-28"
          />
          <Calendar class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        </div>

        <select 
          v-model="filters.timeRange"
          @change="filterCompanies"
          class="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-xs outline-none cursor-pointer whitespace-nowrap"
        >
          <option value="">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
        </select>

        <select 
          v-model="filters.status"
          @change="filterCompanies"
          class="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-xs outline-none cursor-pointer whitespace-nowrap"
        >
          <option value="">Select Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select 
          v-model="filters.category"
          @change="filterCompanies"
          class="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-xs outline-none cursor-pointer whitespace-nowrap"
        >
          <option value="">Select Category</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <div class="overflow-x-auto scrollbar-thin">
        <table class="w-full min-w-max table-auto">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-3 py-2.5 text-left w-12">
                <input 
                  type="checkbox" 
                  v-model="selectAll"
                  @change="toggleSelectAll"
                  class="w-4 h-4 rounded border-gray-300 cursor-pointer" 
                />
              </th>
              <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">No</th>
              <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Company Name</th>
              <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Website</th>
              <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Mobile</th>
              <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Category</th>
              <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Status</th>
              <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr 
              v-for="(company, index) in filteredCompanies" 
              :key="company.id" 
              class="hover:bg-gray-50 transition"
            >
              <td class="px-3 py-2.5">
                <input 
                  type="checkbox" 
                  v-model="company.selected"
                  class="w-4 h-4 rounded border-gray-300 cursor-pointer" 
                />
              </td>
              <td class="px-3 py-2.5 text-gray-700 text-xs whitespace-nowrap">{{ String(index + 1).padStart(2, '0') }}</td>
              <td class="px-3 py-2.5 text-gray-900 font-medium text-xs whitespace-nowrap">
                <div class="flex items-center gap-1.5">
                  {{ company.name }}
                  <CheckCircle v-if="company.verified" class="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                </div>
              </td>
              <td class="px-3 py-2.5 text-yellow-500 text-xs whitespace-nowrap">{{ company.website }}</td>
              <td class="px-3 py-2.5 text-gray-700 text-xs whitespace-nowrap">{{ company.mobile }}</td>
              <td class="px-3 py-2.5 text-gray-700 text-xs whitespace-nowrap">{{ company.category }}</td>
              <td class="px-3 py-2.5 whitespace-nowrap">
                <div 
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs cursor-pointer"
                  :class="getStatusClass(company.status)"
                  @click="changeStatus(company)"
                >
                  {{ company.status }}
                  <ChevronDown class="w-3 h-3 flex-shrink-0" />
                </div>
              </td>
              <td class="px-3 py-2.5 whitespace-nowrap">
                <Eye 
                  @click="viewCompany(company)"
                  class="w-4 h-4 text-yellow-500 cursor-pointer hover:text-yellow-600 transition" 
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- No Results -->
      <div v-if="filteredCompanies.length === 0" class="text-center py-8">
        <p class="text-gray-500 text-sm">No companies found</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
      <p class="text-xs text-gray-600">
        Showing {{ filteredCompanies.length }} of {{ companies.length }} companies
      </p>
      <div class="flex gap-1.5">
        <button class="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition">
          Previous
        </button>
        <button class="px-3 py-1.5 bg-yellow-400 text-gray-900 rounded-lg text-xs font-medium hover:bg-yellow-500 transition">
          1
        </button>
        <button class="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition">
          2
        </button>
        <button class="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Search, Calendar, Eye, CheckCircle, ChevronDown } from "lucide-vue-next";

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
const filters = ref({
  dateFrom: '2025-10-09',
  dateTo: '2025-10-09',
  timeRange: '',
  status: '',
  category: ''
});

// Get unique categories
const categories = computed(() => {
  return [...new Set(companies.value.map(c => c.category))];
});

// Filtered companies
const filteredCompanies = ref([...companies.value]);

// Filter function
const filterCompanies = () => {
  let result = [...companies.value];
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(company => 
      company.name.toLowerCase().includes(query) || 
      company.category.toLowerCase().includes(query)
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
  
  filteredCompanies.value = result;
};

// Select all checkbox
const toggleSelectAll = () => {
  filteredCompanies.value.forEach(company => {
    company.selected = selectAll.value;
  });
};

// Get status class
const getStatusClass = (status) => {
  switch(status) {
    case 'Approved':
      return 'bg-green-100 text-green-700';
    case 'Pending':
      return 'bg-amber-100 text-amber-700';
    case 'Rejected':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// Action handlers
const openAddModal = () => {
  console.log('Open add company modal');
  // Add your modal logic here
};

const viewCompany = (company) => {
  console.log('View company:', company);
  // Add your view logic here
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
</style>