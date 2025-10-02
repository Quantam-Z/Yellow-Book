<template>
    <div class="w-full font-plus-jakarta-sans">
      <!-- Header Section with Gradient Background -->
      <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4 mb-4">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h1 class="text-xl md:text-2xl font-bold text-gray-900">Admin Management</h1>
          <NuxtLink
  to="/dashboard/admin/CreatesubAdmin"
  class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition shadow-md whitespace-nowrap text-sm"
>
  Add Sub Admin
</NuxtLink>

        </div>
  
        <!-- Search Bar -->
        <div class="w-full relative rounded-lg bg-gray-50 border-white border-solid border box-border flex items-center p-4 gap-3">
          <Search class="w-6 h-6 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            v-model="searchQuery"
            @input="filterAdmins"
            placeholder="Search admins by name or email"
            class="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400 text-base leading-[130%] capitalize min-w-0"
          />
        </div>
      </div>
  
      <!-- Stats Cards -->
      <div class="w-full relative flex items-center gap-4 text-left text-sm text-gray font-plus-jakarta-sans mb-6">
        <div class="flex-1 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-4 gap-4">
          <div class="h-11 w-11 rounded bg-blue-100 flex items-center justify-center">
            <Users class="w-6 h-6 text-blue-600" />
          </div>
          <div class="flex-1 flex flex-col items-start gap-2">
            <div class="self-stretch relative leading-[130%] capitalize">Total Admins</div>
            <b class="self-stretch relative text-lg leading-[160%] capitalize">{{ stats.totalAdmins }}</b>
          </div>
        </div>
        <div class="flex-1 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-4 gap-4">
          <div class="h-11 w-11 rounded bg-green-100 flex items-center justify-center">
            <UserCheck class="w-6 h-6 text-green-600" />
          </div>
          <div class="flex-1 flex flex-col items-start gap-2">
            <div class="self-stretch relative leading-[130%] capitalize">Active</div>
            <b class="self-stretch relative text-lg leading-[160%] capitalize">{{ stats.active }}</b>
          </div>
        </div>
        <div class="flex-1 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-4 gap-4">
          <div class="h-11 w-11 rounded bg-red-100 flex items-center justify-center">
            <UserX class="w-6 h-6 text-red-600" />
          </div>
          <div class="flex-1 flex flex-col items-start gap-2">
            <div class="self-stretch relative leading-[130%] capitalize">Inactive</div>
            <b class="self-stretch relative text-lg leading-[160%] capitalize">{{ stats.inactive }}</b>
          </div>
        </div>
        <div class="flex-1 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-4 gap-4">
          <div class="h-11 w-11 rounded bg-purple-100 flex items-center justify-center">
            <Shield class="w-6 h-6 text-purple-600" />
          </div>
          <div class="flex-1 flex flex-col items-start gap-2">
            <div class="self-stretch relative leading-[130%] capitalize">Super Admins</div>
            <b class="self-stretch relative text-lg leading-[160%] capitalize">{{ stats.superAdmins }}</b>
          </div>
        </div>
      </div>
  
      <!-- Filters Section -->
      <div class="mb-4 overflow-x-auto pb-2 scrollbar-thin">
        <div class="flex items-center gap-2 min-w-max">
          <h2 class="text-sm md:text-base font-semibold text-gray-900 whitespace-nowrap">All Admin List</h2>
          
          <select 
            v-model="filters.role"
            @change="filterAdmins"
            class="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-xs outline-none cursor-pointer whitespace-nowrap"
          >
            <option value="">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="Support">Support</option>
          </select>
  
          <select 
            v-model="filters.status"
            @change="filterAdmins"
            class="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-xs outline-none cursor-pointer whitespace-nowrap"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
  
          <select 
            v-model="filters.timeRange"
            @change="filterAdmins"
            class="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-xs outline-none cursor-pointer whitespace-nowrap"
          >
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
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
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Admin Name</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Email</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Role</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Status</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Created On</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Last Login</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr 
                v-for="(admin, index) in filteredAdmins" 
                :key="admin.id" 
                class="hover:bg-gray-50 transition"
              >
                <td class="px-3 py-2.5">
                  <input 
                    type="checkbox" 
                    v-model="admin.selected"
                    class="w-4 h-4 rounded border-gray-300 cursor-pointer" 
                  />
                </td>
                <td class="px-3 py-2.5 text-gray-700 text-xs whitespace-nowrap">{{ String(index + 1).padStart(2, '0') }}</td>
                <td class="px-3 py-2.5 text-gray-900 font-medium text-xs whitespace-nowrap">
                  <div class="flex items-center gap-1.5">
                    {{ admin.name }}
                    <CheckCircle v-if="admin.verified" class="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  </div>
                </td>
                <td class="px-3 py-2.5 text-gray-600 text-xs whitespace-nowrap">{{ admin.email }}</td>
                <td class="px-3 py-2.5 whitespace-nowrap">
                  <div 
                    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs"
                    :class="getRoleClass(admin.role)"
                  >
                    {{ admin.role }}
                  </div>
                </td>
                <td class="px-3 py-2.5 whitespace-nowrap">
                  <div 
                    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs cursor-pointer"
                    :class="getStatusClass(admin.status)"
                    @click="changeStatus(admin)"
                  >
                    {{ admin.status }}
                    <ChevronDown class="w-3 h-3 flex-shrink-0" />
                  </div>
                </td>
                <td class="px-3 py-2.5 text-gray-700 text-xs whitespace-nowrap">{{ formatDate(admin.createdOn) }}</td>
                <td class="px-3 py-2.5 text-gray-700 text-xs whitespace-nowrap">{{ formatDate(admin.lastLogin) }}</td>
                <td class="px-3 py-2.5 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <Eye 
                      @click="viewAdmin(admin)"
                      class="w-4 h-4 text-yellow-500 cursor-pointer hover:text-yellow-600 transition" 
                    />
                    <Edit 
                      @click="editAdmin(admin)"
                      class="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-600 transition" 
                    />
                    <Trash2 
                      @click="deleteAdmin(admin)"
                      class="w-4 h-4 text-red-500 cursor-pointer hover:text-red-600 transition" 
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- No Results -->
        <div v-if="filteredAdmins.length === 0" class="text-center py-8">
          <p class="text-gray-500 text-sm">No admins found</p>
        </div>
      </div>
  
      <!-- Pagination -->
      <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
        <p class="text-xs text-gray-600">
          Showing {{ filteredAdmins.length }} of {{ admins.length }} admins
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
  import { ref, computed, onMounted } from 'vue';
  import { Search, Eye, CheckCircle, ChevronDown, Edit, Trash2, Users, UserCheck, UserX, Shield } from "lucide-vue-next";
  
  // Stats data
  const stats = ref({
    totalAdmins: 0,
    active: 0,
    inactive: 0,
    superAdmins: 0
  });
  
  // Admins data
  const admins = ref([
    { 
      id: 1, 
      name: "John Smith", 
      email: "john.smith@company.com", 
      role: "Super Admin", 
      status: "Active", 
      verified: true, 
      createdOn: "2024-01-15", 
      lastLogin: "2024-03-20", 
      selected: false 
    },
    { 
      id: 2, 
      name: "Sarah Johnson", 
      email: "sarah.j@company.com", 
      role: "Admin", 
      status: "Active", 
      verified: true, 
      createdOn: "2024-02-10", 
      lastLogin: "2024-03-19", 
      selected: false 
    },
    { 
      id: 3, 
      name: "Mike Chen", 
      email: "mike.chen@company.com", 
      role: "Moderator", 
      status: "Inactive", 
      verified: false, 
      createdOn: "2024-01-25", 
      lastLogin: "2024-03-15", 
      selected: false 
    },
    { 
      id: 4, 
      name: "Emily Davis", 
      email: "emily.davis@company.com", 
      role: "Support", 
      status: "Active", 
      verified: true, 
      createdOn: "2024-03-01", 
      lastLogin: "2024-03-20", 
      selected: false 
    },
    { 
      id: 5, 
      name: "Robert Wilson", 
      email: "robert.w@company.com", 
      role: "Admin", 
      status: "Suspended", 
      verified: true, 
      createdOn: "2024-01-08", 
      lastLogin: "2024-03-10", 
      selected: false 
    },
    { 
      id: 6, 
      name: "Lisa Brown", 
      email: "lisa.brown@company.com", 
      role: "Super Admin", 
      status: "Active", 
      verified: true, 
      createdOn: "2024-02-20", 
      lastLogin: "2024-03-21", 
      selected: false 
    },
    { 
      id: 7, 
      name: "David Miller", 
      email: "david.m@company.com", 
      role: "Moderator", 
      status: "Active", 
      verified: false, 
      createdOn: "2024-03-05", 
      lastLogin: "2024-03-18", 
      selected: false 
    },
    { 
      id: 8, 
      name: "Amanda Taylor", 
      email: "amanda.t@company.com", 
      role: "Support", 
      status: "Inactive", 
      verified: true, 
      createdOn: "2024-02-15", 
      lastLogin: "2024-03-12", 
      selected: false 
    },
  ]);
  
  // Search and filters
  const searchQuery = ref('');
  const selectAll = ref(false);
  const filters = ref({
    role: '',
    status: '',
    timeRange: ''
  });
  
  // Filtered admins
  const filteredAdmins = ref([...admins.value]);
  
  // Action handlers
  const openAddModal = () => {
    console.log('Open add admin modal');
    // Add your modal logic here
  };
  
  // Filter function
  const filterAdmins = () => {
    let result = [...admins.value];
    
    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(admin => 
        admin.name.toLowerCase().includes(query) || 
        admin.email.toLowerCase().includes(query) ||
        admin.role.toLowerCase().includes(query)
      );
    }
    
    // Role filter
    if (filters.value.role) {
      result = result.filter(admin => admin.role === filters.value.role);
    }
    
    // Status filter
    if (filters.value.status) {
      result = result.filter(admin => admin.status === filters.value.status);
    }
    
    filteredAdmins.value = result;
  };
  
  // Select all checkbox
  const toggleSelectAll = () => {
    filteredAdmins.value.forEach(admin => {
      admin.selected = selectAll.value;
    });
  };
  
  // Get status class
  const getStatusClass = (status) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Inactive':
        return 'bg-gray-100 text-gray-700';
      case 'Suspended':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  // Get role class
  const getRoleClass = (role) => {
    switch(role) {
      case 'Super Admin':
        return 'bg-purple-100 text-purple-700';
      case 'Admin':
        return 'bg-blue-100 text-blue-700';
      case 'Moderator':
        return 'bg-orange-100 text-orange-700';
      case 'Support':
        return 'bg-teal-100 text-teal-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Update stats
  const updateStats = () => {
    stats.value = {
      totalAdmins: admins.value.length,
      active: admins.value.filter(a => a.status === 'Active').length,
      inactive: admins.value.filter(a => a.status === 'Inactive').length,
      superAdmins: admins.value.filter(a => a.role === 'Super Admin').length
    };
  };
  
  // Action handlers
  const viewAdmin = (admin) => {
    console.log('View admin:', admin);
    // Add your view logic here
  };
  
  const editAdmin = (admin) => {
    console.log('Edit admin:', admin);
    // Add your edit logic here
  };
  
  const deleteAdmin = (admin) => {
    console.log('Delete admin:', admin);
    // Add your delete logic here
  };
  
  const changeStatus = (admin) => {
    console.log('Change status for:', admin);
    // Add your status change logic here
  };
  
  // Initialize
  onMounted(() => {
    updateStats();
  });
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