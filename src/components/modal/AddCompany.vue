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
  
      <!-- Filters Section -->
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
  
      <!-- Add Company Modal -->
      <div 
        v-if="isModalOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closeModal"
      >
        <div class="w-full max-w-3xl relative shadow-[0px_0px_17px_rgba(0,_0,_0,_0.05)] rounded-2xl bg-white border-whitesmoke border-solid border box-border flex flex-col items-center p-8 md:p-16 gap-8 max-h-[90vh] overflow-y-auto scrollbar-thin">
          <!-- Close Button -->
          <button 
            @click="closeModal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          >
            <X class="w-6 h-6" />
          </button>
  
          <!-- Modal Header -->
          <div class="w-full max-w-md flex flex-col items-center gap-6 text-center">
            <b class="text-2xl md:text-3xl leading-[126%] capitalize text-gray-800">Add New Company Profile</b>
            <div class="text-base leading-[160%] capitalize text-slate-600">Fill out the form below to create a new company profile in the system.</div>
          </div>
  
          <div class="w-full border-whitesmoke border-dashed border-t box-border" />
  
          <!-- Form Content -->
          <div class="w-full flex flex-col items-center gap-8 text-left text-base">
            <div class="w-full flex flex-col items-start gap-8">
              <!-- Progress -->
              <div class="w-full flex flex-col items-start gap-4">
                <b class="leading-[130%] capitalize text-gray-800">Step {{ currentStep }} of 3</b>
                <div class="w-full relative h-0.5">
                  <div class="absolute top-0 left-0 bg-gray-300 w-full h-[1.5px]" />
                  <div 
                    class="absolute top-0 left-0 bg-yellow-400 h-0.5 transition-all duration-300"
                    :style="{ width: `${(currentStep / 3) * 100}%` }"
                  />
                </div>
              </div>
  
              <!-- Step 1: Basic Info -->
              <div v-if="currentStep === 1" class="w-full flex flex-col items-start gap-5 text-slate-600">
                <div class="w-full flex flex-col items-start gap-4">
                  <div class="leading-[160%] capitalize font-medium">Company Name</div>
                  <input 
                    v-model="formData.companyName"
                    type="text"
                    placeholder="e.g., Yellow.Book Travel Agency"
                    class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-[46px] px-3 text-gray-700 outline-none focus:border-yellow-400 transition"
                  />
                </div>
  
                <div class="w-full flex flex-col items-start gap-4">
                  <div class="leading-[160%] capitalize font-medium">Website</div>
                  <input 
                    v-model="formData.website"
                    type="url"
                    placeholder="https://www.yourcompany.com"
                    class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-[46px] px-3 text-gray-700 outline-none focus:border-yellow-400 transition"
                  />
                </div>
  
                <div class="w-full flex flex-col items-start gap-4">
                  <div class="leading-[160%] capitalize font-medium">Category</div>
                  <select 
                    v-model="formData.category"
                    class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-11 px-3 text-gray-700 outline-none focus:border-yellow-400 transition cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                  </select>
                </div>
              </div>
  
              <!-- Step 2: Company Details -->
              <div v-if="currentStep === 2" class="w-full flex flex-col items-start gap-5 text-slate-600">
                <div class="w-full flex flex-col items-start gap-4">
                  <div class="leading-[160%] capitalize font-medium">Number of Employees</div>
                  <select 
                    v-model="formData.employees"
                    class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-11 px-3 text-gray-700 outline-none focus:border-yellow-400 transition cursor-pointer"
                  >
                    <option value="">Select Range</option>
                    <option value="1-10">1–10</option>
                    <option value="11-30">11–30</option>
                    <option value="31-50">31–50</option>
                    <option value="51-100">51–100</option>
                    <option value="100+">100+</option>
                  </select>
                </div>
  
                <div class="w-full flex flex-col items-start gap-4">
                  <div class="leading-[160%] capitalize font-medium">Annual Revenue</div>
                  <select 
                    v-model="formData.revenue"
                    class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-11 px-3 text-gray-700 outline-none focus:border-yellow-400 transition cursor-pointer"
                  >
                    <option value="">Select Range</option>
                    <option value="0-100k">0–100K MNT</option>
                    <option value="100k-500k">100K–500K MNT</option>
                    <option value="500k-1m">500K–1M MNT</option>
                    <option value="1m+">1M+ MNT</option>
                  </select>
                </div>
  
                <div class="w-full flex flex-col items-start gap-4">
                  <div class="leading-[160%] capitalize font-medium">Company Description</div>
                  <textarea 
                    v-model="formData.description"
                    placeholder="Brief description of the company..."
                    rows="4"
                    class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border p-3 text-gray-700 outline-none focus:border-yellow-400 transition resize-none"
                  />
                </div>
              </div>
  
              <!-- Step 3: Contact Person -->
              <div v-if="currentStep === 3" class="w-full flex flex-col items-start gap-5 text-slate-600">
                <div class="w-full flex flex-col items-start gap-4">
                  <div class="leading-[160%] capitalize font-medium">First Name</div>
                  <input 
                    v-model="formData.firstName"
                    type="text"
                    placeholder="John"
                    class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-[46px] px-3 text-gray-700 outline-none focus:border-yellow-400 transition"
                  />
                </div>
  
                <div class="w-full flex flex-col items-start gap-4">
                  <div class="leading-[160%] capitalize font-medium">Last Name</div>
                  <input 
                    v-model="formData.lastName"
                    type="text"
                    placeholder="Doe"
                    class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-[46px] px-3 text-gray-700 outline-none focus:border-yellow-400 transition"
                  />
                </div>
  
                <div class="w-full flex flex-col items-start gap-4">
                  <div class="leading-[160%] capitalize font-medium">Job Title</div>
                  <input 
                    v-model="formData.jobTitle"
                    type="text"
                    placeholder="e.g., CEO, Travel Agent"
                    class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-[46px] px-3 text-gray-700 outline-none focus:border-yellow-400 transition"
                  />
                </div>
  
                <div class="w-full flex flex-col sm:flex-row items-start gap-5">
                  <div class="w-full sm:w-32 flex flex-col items-start gap-4">
                    <div class="leading-[160%] capitalize font-medium">Country</div>
                    <select 
                      v-model="formData.country"
                      class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-11 px-3 text-gray-700 outline-none focus:border-yellow-400 transition cursor-pointer"
                    >
                      <option value="+976">🇲🇳 +976</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+86">🇨🇳 +86</option>
                    </select>
                  </div>
  
                  <div class="flex-1 w-full flex flex-col items-start gap-4">
                    <div class="leading-[160%] capitalize font-medium">Phone Number</div>
                    <input 
                      v-model="formData.phone"
                      type="tel"
                      placeholder="Enter phone number"
                      class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-[46px] px-3 text-gray-700 outline-none focus:border-yellow-400 transition"
                    />
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Navigation Buttons -->
            <div class="w-full flex items-center gap-4 text-center">
              <button 
                v-if="currentStep > 1"
                @click="previousStep"
                class="flex-1 rounded bg-yellow-50 h-12 flex items-center justify-center py-[18px] px-9 font-semibold leading-[130%] capitalize text-gray-800 hover:bg-yellow-100 transition"
              >
                Previous
              </button>
              <button 
                v-if="currentStep < 3"
                @click="nextStep"
                class="flex-1 rounded bg-yellow-400 h-12 flex items-center justify-center py-[18px] px-9 font-semibold leading-[130%] capitalize text-gray-800 hover:bg-yellow-500 transition"
              >
                Next
              </button>
              <button 
                v-if="currentStep === 3"
                @click="submitForm"
                class="flex-1 rounded bg-yellow-400 h-12 flex items-center justify-center py-[18px] px-9 font-semibold leading-[130%] capitalize text-gray-800 hover:bg-yellow-500 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { Search, Calendar, Eye, CheckCircle, ChevronDown, X } from "lucide-vue-next";
  
  // Modal state
  const isModalOpen = ref(false);
  const currentStep = ref(1);
  
  // Form data
  const formData = ref({
    companyName: '',
    website: '',
    category: '',
    employees: '',
    revenue: '',
    description: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    country: '+976',
    phone: ''
  });
  
  // Companies data
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
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(company => 
        company.name.toLowerCase().includes(query) || 
        company.category.toLowerCase().includes(query)
      );
    }
    
    if (filters.value.status) {
      result = result.filter(company => company.status === filters.value.status);
    }
    
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
  
  // Modal functions
  const openAddModal = () => {
    isModalOpen.value = true;
    currentStep.value = 1;
  };
  
  const closeModal = () => {
    isModalOpen.value = false;
    currentStep.value = 1;
    resetForm();
  };
  
  const resetForm = () => {
    formData.value = {
      companyName: '',
      website: '',
      category: '',
      employees: '',
      revenue: '',
      description: '',
      firstName: '',
      lastName: '',
      jobTitle: '',
      country: '+976',
      phone: ''
    };
  };
  
  const nextStep = () => {
    if (currentStep.value < 3) {
      currentStep.value++;
    }
  };
  
  const previousStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  };
  
  const submitForm = () => {
    console.log('Form submitted:', formData.value);
    // Add your form submission logic here
    closeModal();
  };
  
  // Action handlers
  const viewCompany = (company) => {
    console.log('View company:', company);
  };
  
  const changeStatus = (company) => {
    console.log('Change status for:', company);
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