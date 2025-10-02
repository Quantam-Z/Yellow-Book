<template>
    <div class="w-full font-plus-jakarta-sans">
      <!-- Header Section with Gradient Background -->
      <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4 mb-4">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h1 class="text-xl md:text-2xl font-bold text-gray-900">User Management</h1>
        </div>
  
        <!-- Search Bar -->
        <div class="w-full relative rounded-lg bg-gray-50 border-white border-solid border box-border flex items-center p-4 gap-3">
          <Search class="w-6 h-6 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            v-model="searchQuery"
            @input="filterUsers"
            placeholder="Search users by name or email"
            class="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400 text-base leading-[130%] capitalize min-w-0"
          />
        </div>
      </div>
  
      <!-- Stats Cards -->
      <div class="w-full relative flex items-center gap-4 text-left text-sm text-gray font-plus-jakarta-sans mb-6">
        <div class="flex-1 rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center justify-center p-4 gap-4">
          <div class="h-11 w-11 rounded bg-blue-100 flex items-center justify-center">
            <Users class="w-6 h-6 text-blue-600" />
          </div>
          <div class="flex-1 flex flex-col items-start gap-2">
            <div class="self-stretch relative leading-[130%] capitalize">Total Users</div>
            <b class="self-stretch relative text-lg leading-[160%] capitalize">{{ stats.totalUsers }}</b>
          </div>
        </div>
        <div class="flex-1 rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center justify-center p-4 gap-4">
          <div class="h-11 w-11 rounded bg-green-100 flex items-center justify-center">
            <Google class="w-6 h-6 text-green-600" />
          </div>
          <div class="flex-1 flex flex-col items-start gap-2">
            <div class="self-stretch relative leading-[130%] capitalize">Signup by Google</div>
            <b class="self-stretch relative text-lg leading-[160%] capitalize">{{ stats.googleSignups }}</b>
          </div>
        </div>
        <div class="flex-1 rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center justify-center p-4 gap-4">
          <div class="h-11 w-11 rounded bg-purple-100 flex items-center justify-center">
            <Share2 class="w-6 h-6 text-purple-600" />
          </div>
          <div class="flex-1 flex flex-col items-start gap-2">
            <div class="self-stretch relative leading-[130%] capitalize">Signup by Social Media</div>
            <b class="self-stretch relative text-lg leading-[160%] capitalize">{{ stats.socialSignups }}</b>
          </div>
        </div>
        <div class="flex-1 rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center justify-center p-4 gap-4">
          <div class="h-11 w-11 rounded bg-orange-100 flex items-center justify-center">
            <Mail class="w-6 h-6 text-orange-600" />
          </div>
          <div class="flex-1 flex flex-col items-start gap-2">
            <div class="self-stretch relative leading-[130%] capitalize">Signup by Email</div>
            <b class="self-stretch relative text-lg leading-[160%] capitalize">{{ stats.emailSignups }}</b>
          </div>
        </div>
      </div>
  
      <!-- Filters Section - Single Line with Horizontal Scroll -->
      <div class="mb-4 overflow-x-auto pb-2 scrollbar-thin">
        <div class="flex items-center gap-2 min-w-max">
          <h2 class="text-sm md:text-base font-semibold text-gray-900 whitespace-nowrap">All Users List</h2>
          
          <div class="flex items-center gap-2 bg-white rounded-lg px-2 py-1.5 shadow-sm border border-gray-200 whitespace-nowrap">
            <span class="text-gray-500 text-xs">From:</span>
            <input 
              type="date" 
              v-model="filters.dateFrom"
              @change="filterUsers"
              class="font-medium text-gray-900 text-xs outline-none cursor-pointer w-28"
            />
            <Calendar class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          </div>
  
          <div class="flex items-center gap-2 bg-white rounded-lg px-2 py-1.5 shadow-sm border border-gray-200 whitespace-nowrap">
            <span class="text-gray-500 text-xs">To:</span>
            <input 
              type="date" 
              v-model="filters.dateTo"
              @change="filterUsers"
              class="font-medium text-gray-900 text-xs outline-none cursor-pointer w-28"
            />
            <Calendar class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          </div>
  
          <select 
            v-model="filters.timeRange"
            @change="filterUsers"
            class="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-xs outline-none cursor-pointer whitespace-nowrap"
          >
            <option value="">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
          </select>
  
          <select 
            v-model="filters.status"
            @change="filterUsers"
            class="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-xs outline-none cursor-pointer whitespace-nowrap"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
            <option value="Pending">Pending</option>
          </select>
  
          <select 
            v-model="filters.signupMethod"
            @change="filterUsers"
            class="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-xs outline-none cursor-pointer whitespace-nowrap"
          >
            <option value="">Signup Method</option>
            <option value="Google">Google</option>
            <option value="Facebook">Facebook</option>
            <option value="Email">Email</option>
            <option value="Twitter">Twitter</option>
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
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Name</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Email</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Signup Method</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Signup Date</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Status</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr 
                v-for="(user, index) in filteredUsers" 
                :key="user.id" 
                class="hover:bg-gray-50 transition"
              >
                <td class="px-3 py-2.5">
                  <input 
                    type="checkbox" 
                    v-model="user.selected"
                    class="w-4 h-4 rounded border-gray-300 cursor-pointer" 
                  />
                </td>
                <td class="px-3 py-2.5 text-gray-700 text-xs whitespace-nowrap">{{ String(index + 1).padStart(2, '0') }}</td>
                <td class="px-3 py-2.5 text-gray-900 font-medium text-xs whitespace-nowrap">
                  <div class="flex items-center gap-1.5">
                    {{ user.name }}
                    <CheckCircle v-if="user.verified" class="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  </div>
                </td>
                <td class="px-3 py-2.5 text-gray-600 text-xs whitespace-nowrap">{{ user.email }}</td>
                <td class="px-3 py-2.5 whitespace-nowrap">
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs"
                    :class="getSignupMethodClass(user.signupMethod)">
                    {{ user.signupMethod }}
                  </div>
                </td>
                <td class="px-3 py-2.5 text-gray-700 text-xs whitespace-nowrap">{{ formatDate(user.signupDate) }}</td>
                <td class="px-3 py-2.5 whitespace-nowrap">
                  <div 
                    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs cursor-pointer"
                    :class="getStatusClass(user.status)"
                    @click="changeStatus(user)"
                  >
                    {{ user.status }}
                    <ChevronDown class="w-3 h-3 flex-shrink-0" />
                  </div>
                </td>
                <td class="px-3 py-2.5 whitespace-nowrap">
                  <Eye 
                    @click="viewUser(user)"
                    class="w-4 h-4 text-yellow-500 cursor-pointer hover:text-yellow-600 transition" 
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- No Results -->
        <div v-if="filteredUsers.length === 0" class="text-center py-8">
          <p class="text-gray-500 text-sm">No users found</p>
        </div>
      </div>
  
      <!-- Pagination -->
      <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
        <p class="text-xs text-gray-600">
          Showing {{ filteredUsers.length }} of {{ users.length }} users
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
  import { Search, Calendar, Eye, CheckCircle, ChevronDown, Users, Mail, Share2 } from "lucide-vue-next";
  
  // Stats data
  const stats = ref({
    totalUsers: 245,
    googleSignups: 120,
    socialSignups: 65,
    emailSignups: 60
  });
  
  // Users data
  const users = ref([
    { id: 1, name: "John Doe", email: "john.doe@example.com", signupMethod: "Google", signupDate: "2024-01-15", status: "Active", verified: true, selected: false },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", signupMethod: "Email", signupDate: "2024-01-14", status: "Active", verified: true, selected: false },
    { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com", signupMethod: "Facebook", signupDate: "2024-01-13", status: "Inactive", verified: false, selected: false },
    { id: 4, name: "Sarah Wilson", email: "sarah.wilson@example.com", signupMethod: "Google", signupDate: "2024-01-12", status: "Active", verified: true, selected: false },
    { id: 5, name: "David Brown", email: "david.brown@example.com", signupMethod: "Twitter", signupDate: "2024-01-11", status: "Suspended", verified: false, selected: false },
    { id: 6, name: "Emily Davis", email: "emily.davis@example.com", signupMethod: "Email", signupDate: "2024-01-10", status: "Active", verified: true, selected: false },
    { id: 7, name: "Chris Lee", email: "chris.lee@example.com", signupMethod: "Google", signupDate: "2024-01-09", status: "Pending", verified: false, selected: false },
    { id: 8, name: "Amanda Taylor", email: "amanda.taylor@example.com", signupMethod: "Facebook", signupDate: "2024-01-08", status: "Active", verified: true, selected: false },
    { id: 9, name: "Robert Wilson", email: "robert.wilson@example.com", signupMethod: "Email", signupDate: "2024-01-07", status: "Active", verified: false, selected: false },
    { id: 10, name: "Lisa Anderson", email: "lisa.anderson@example.com", signupMethod: "Google", signupDate: "2024-01-06", status: "Inactive", verified: true, selected: false },
    { id: 11, name: "James Martinez", email: "james.martinez@example.com", signupMethod: "Twitter", signupDate: "2024-01-05", status: "Active", verified: false, selected: false },
    { id: 12, name: "Jennifer Thomas", email: "jennifer.thomas@example.com", signupMethod: "Email", signupDate: "2024-01-04", status: "Active", verified: true, selected: false },
  ]);
  
  // Search and filters
  const searchQuery = ref('');
  const selectAll = ref(false);
  const filters = ref({
    dateFrom: '',
    dateTo: '',
    timeRange: '',
    status: '',
    signupMethod: ''
  });
  
  // Get unique signup methods
  const signupMethods = computed(() => {
    return [...new Set(users.value.map(u => u.signupMethod))];
  });
  
  // Filtered users
  const filteredUsers = ref([...users.value]);
  
  // Filter function
  const filterUsers = () => {
    let result = [...users.value];
    
    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(query) || 
        user.email.toLowerCase().includes(query)
      );
    }
    
    // Status filter
    if (filters.value.status) {
      result = result.filter(user => user.status === filters.value.status);
    }
    
    // Signup method filter
    if (filters.value.signupMethod) {
      result = result.filter(user => user.signupMethod === filters.value.signupMethod);
    }
    
    // Date range filter
    if (filters.value.dateFrom) {
      result = result.filter(user => user.signupDate >= filters.value.dateFrom);
    }
    
    if (filters.value.dateTo) {
      result = result.filter(user => user.signupDate <= filters.value.dateTo);
    }
    
    filteredUsers.value = result;
  };
  
  // Select all checkbox
  const toggleSelectAll = () => {
    filteredUsers.value.forEach(user => {
      user.selected = selectAll.value;
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
      case 'Pending':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  // Get signup method class
  const getSignupMethodClass = (method) => {
    switch(method) {
      case 'Google':
        return 'bg-red-50 text-red-600';
      case 'Facebook':
        return 'bg-blue-50 text-blue-600';
      case 'Twitter':
        return 'bg-sky-50 text-sky-600';
      case 'Email':
        return 'bg-orange-50 text-orange-600';
      default:
        return 'bg-gray-50 text-gray-600';
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
  
  // Action handlers
  const openAddModal = () => {
    console.log('Open add user modal');
    // Add your modal logic here
  };
  
  const viewUser = (user) => {
    console.log('View user:', user);
    // Add your view logic here
  };
  
  const changeStatus = (user) => {
    console.log('Change status for:', user);
    // Add your status change logic here
  };
  
  // Initialize with today's date
  onMounted(() => {
    const today = new Date().toISOString().split('T')[0];
    filters.value.dateFrom = today;
    filters.value.dateTo = today;
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