<template>
    <div class="w-full font-plus-jakarta-sans">
      <!-- Header Section with Gradient Background -->
      <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4 mb-4">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h1 class="text-xl md:text-2xl font-bold text-gray-900">My Assign Companies</h1>
        </div>
  
        <!-- Search Bar -->
        <div class="w-full relative rounded-lg bg-gray-50 border-white border-solid border box-border flex items-center p-4 gap-3">
          <Search class="w-6 h-6 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search companies by name or category"
            class="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400 text-base leading-[130%] capitalize min-w-0"
          />
        </div>
      </div>
  
      <!-- Filters Section -->
      <div class="mb-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <h2 class="text-sm md:text-base font-semibold text-gray-900 whitespace-nowrap">All Company List</h2>
        
        <!-- Status Filter -->
        <div class="flex items-center gap-2">
          <select 
            v-model="filters.status"
            class="w-40 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          
          <!-- Category Filter -->
          <select 
            v-model="filters.category"
            class="w-40 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
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
                v-for="(company, index) in paginatedCompanies" 
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
                <td class="px-3 py-2.5 text-gray-700 text-xs whitespace-nowrap">{{ String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, '0') }}</td>
                <td class="px-3 py-2.5 text-gray-900 font-medium text-xs whitespace-nowrap">
                  <div class="flex items-center gap-1.5">
                    {{ company.name }}
                    <CheckCircle v-if="company.verified" class="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  </div>
                </td>
                <td class="px-3 py-2.5 text-blue-500 text-xs whitespace-nowrap hover:text-blue-600">
                  <a :href="'https://' + company.website" target="_blank" class="hover:underline">
                    {{ company.website }}
                  </a>
                </td>
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
                  <div class="flex items-center gap-2">
                    <Eye 
                      @click="viewCompany(company)"
                      class="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-600 transition" 
                      title="View Details"
                    />
                    <button 
                      @click="editCompany(company)"
                      class="w-4 h-4 text-green-500 cursor-pointer hover:text-green-600 transition"
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
        <div v-if="filteredCompanies.length === 0" class="text-center py-8">
          <p class="text-gray-500 text-sm">No companies found matching your criteria</p>
        </div>
      </div>
  
      <!-- Pagination -->
      <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
        <p class="text-xs text-gray-600">
          Showing {{ Math.min((currentPage - 1) * itemsPerPage + 1, filteredCompanies.length) }} to {{ Math.min(currentPage * itemsPerPage, filteredCompanies.length) }} of {{ filteredCompanies.length }} companies
        </p>
        <div class="flex gap-1.5">
          <button 
            @click="goToPage(currentPage - 1)"
            class="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition"
            :disabled="currentPage === 1"
            :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''"
          >
            Previous
          </button>
          <button 
            v-for="page in totalPages" 
            :key="page"
            @click="goToPage(page)"
            class="px-3 py-1.5 rounded-lg text-xs font-medium transition"
            :class="page === currentPage ? 'bg-yellow-400 text-gray-900' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'"
          >
            {{ page }}
          </button>
          <button 
            @click="goToPage(currentPage + 1)"
            class="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition"
            :disabled="currentPage === totalPages"
            :class="currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { Search, Eye, CheckCircle, ChevronDown } from "lucide-vue-next";
  
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