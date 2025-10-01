<template>
    <div class="w-full flex flex-col gap-6 font-plus-jakarta-sans">
      <!-- Header Section -->
      <div class="w-full rounded-lg flex flex-col gap-4 p-4 bg-gradient-to-br from-blue-50 to-white">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900 capitalize">Company Management</h1>
          <button class="bg-amber-400 hover:bg-amber-500 transition-colors rounded px-9 py-3 text-base font-semibold text-gray-900 capitalize">
            Add Company
          </button>
        </div>
        
        <div class="flex items-center gap-3 rounded-lg bg-white/35 border border-white px-4 py-4">
          <Search class="w-6 h-6 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search companies by name or category"
            class="flex-1 bg-transparent outline-none text-base text-gray-600 placeholder:text-gray-500"
          />
        </div>
      </div>
  
      <!-- Table Section -->
      <div class="w-full rounded-lg bg-white border border-gray-200 overflow-hidden">
        <!-- Table Header -->
        <div class="w-full bg-gray-50 px-5 py-3">
          <div class="grid grid-cols-7 gap-4 text-sm font-semibold text-gray-700">
            <div class="text-left">S/N</div>
            <div class="text-left">Company Name</div>
            <div class="text-left">Website</div>
            <div class="text-left">Phone Number</div>
            <div class="text-left">Category</div>
            <div class="text-left">Status</div>
            <div class="text-left">Action</div>
          </div>
        </div>
  
        <!-- Table Body -->
        <div class="w-full">
          <div 
            v-for="(company, index) in companies" 
            :key="company.id"
            class="border-b border-dashed border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div class="grid grid-cols-7 gap-4 px-5 py-4 items-center text-sm text-gray-700">
              <!-- Serial Number with Icon -->
              <div class="flex items-center gap-2">
                <Building2 class="w-5 h-5 text-gray-400" />
                <span class="font-medium">{{ String(index + 1).padStart(2, '0') }}</span>
              </div>
              
              <!-- Company Name -->
              <div class="text-left truncate font-medium">{{ company.name }}</div>
              
              <!-- Website -->
              <div class="text-left truncate text-amber-500 hover:text-amber-600 cursor-pointer">
                {{ company.website }}
              </div>
              
              <!-- Phone -->
              <div class="text-left truncate">{{ company.phone }}</div>
              
              <!-- Category -->
              <div class="text-left truncate">{{ company.category }}</div>
              
              <!-- Status Badge -->
              <div class="text-left">
                <span 
                  :class="[
                    'inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-medium',
                    getStatusClass(company.status)
                  ]"
                >
                  <CheckCircle v-if="company.status === 'Approved'" class="w-4 h-4" />
                  <span>{{ company.status }}</span>
                </span>
              </div>
              
              <!-- Action -->
              <div class="text-left">
                <MoreHorizontal class="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Search, MoreHorizontal, CheckCircle, Building2 } from 'lucide-vue-next';
  
  const companies = ref([
    { id: 1, name: 'ABC Company', website: 'www.yourwebsite.com', phone: '556265485', category: 'Technology', status: 'Approved' },
    { id: 2, name: 'XYZ Corporation', website: 'www.xyzcorp.com', phone: '556265486', category: 'Finance', status: 'Pending' },
    { id: 3, name: 'Tech Solutions Ltd', website: 'www.techsolutions.com', phone: '556265487', category: 'Technology', status: 'Approved' },
    { id: 4, name: 'Global Enterprises', website: 'www.globalent.com', phone: '556265488', category: 'Manufacturing', status: 'Approved' },
    { id: 5, name: 'Digital Innovations', website: 'www.digiinnov.com', phone: '556265489', category: 'Technology', status: 'Rejected' },
    { id: 6, name: 'Smart Systems Inc', website: 'www.smartsystems.com', phone: '556265490', category: 'IT Services', status: 'Approved' },
    { id: 7, name: 'Future Tech Labs', website: 'www.futuretech.com', phone: '556265491', category: 'Research', status: 'Pending' },
    { id: 8, name: 'Cloud Solutions Pro', website: 'www.cloudsol.com', phone: '556265492', category: 'Cloud Services', status: 'Approved' },
    { id: 9, name: 'Data Analytics Corp', website: 'www.dataanalytics.com', phone: '556265493', category: 'Analytics', status: 'Approved' },
    { id: 10, name: 'Cyber Security Ltd', website: 'www.cybersec.com', phone: '556265494', category: 'Security', status: 'Pending' },
  ]);
  
  const getStatusClass = (status) => {
    switch(status) {
      case 'Approved':
        return 'bg-green-100 text-green-600';
      case 'Pending':
        return 'bg-amber-100 text-amber-600';
      case 'Rejected':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  </script>
  
  <style scoped>
  .font-plus-jakarta-sans {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  </style>