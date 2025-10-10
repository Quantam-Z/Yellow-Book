<template>
  <div class="w-full font-plus-jakarta-sans">
    <!-- Header Section with Gradient Background -->
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Admin Management</h1>
        <NuxtLink
          to="/dashboard/admin/CreatesubAdmin"
          class="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-semibold px-3 sm:px-4 py-2 rounded-lg transition shadow-md whitespace-nowrap text-xs sm:text-sm w-full sm:w-auto touch-manipulation"
        >
          Add Sub Admin
        </NuxtLink>
      </div>

      <!-- Search Bar -->
      <div class="w-full relative rounded-lg bg-gray-50 border-white border-solid border box-border flex items-center p-2.5 sm:p-3 md:p-4 gap-2 sm:gap-3">
        <Search class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          v-model="searchQuery"
          @input="filterAdmins"
          placeholder="Search admins by name or email"
          class="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400 text-xs sm:text-sm md:text-base leading-[130%] capitalize min-w-0"
        />
      </div>
    </div>

    <!-- Stats Cards - Responsive Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <div class="rounded-lg bg-white border border-gray-200 flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Users class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Total Admins</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.totalAdmins }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border border-gray-200 flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
          <UserCheck class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Active</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.active }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border border-gray-200 flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
          <UserX class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Inactive</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.inactive }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border border-gray-200 flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-purple-100 flex items-center justify-center flex-shrink-0">
          <Shield class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Super Admins</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.superAdmins }}</b>
        </div>
      </div>
    </div>

    <!-- Filters Section - Enhanced for Mobile -->
    <div class="mb-4 overflow-x-auto pb-2 scrollbar-thin">
      <div class="flex items-center gap-1.5 sm:gap-2 min-w-max pr-4">
        <h2 class="text-xs sm:text-sm md:text-base font-semibold text-gray-900 whitespace-nowrap pr-1 sm:pr-2 hidden xs:block">
          All Admin List
        </h2>
        
        <!-- Role Filter -->
        <select 
          v-model="filters.role"
          @change="filterAdmins"
          class="bg-white rounded-lg px-2 sm:px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-[10px] sm:text-xs outline-none cursor-pointer whitespace-nowrap touch-manipulation"
        >
          <option value="">All Roles</option>
          <option value="Super Admin">Super Admin</option>
          <option value="Admin">Admin</option>
          <option value="Moderator">Moderator</option>
          <option value="Support">Support</option>
        </select>

        <!-- Status Filter -->
        <select 
          v-model="filters.status"
          @change="filterAdmins"
          class="bg-white rounded-lg px-2 sm:px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-[10px] sm:text-xs outline-none cursor-pointer whitespace-nowrap touch-manipulation"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Suspended">Suspended</option>
        </select>

        <!-- Time Range Filter -->
        <select 
          v-model="filters.timeRange"
          @change="filterAdmins"
          class="bg-white rounded-lg px-2 sm:px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-[10px] sm:text-xs outline-none cursor-pointer whitespace-nowrap touch-manipulation hidden sm:block"
        >
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>

        <!-- Mobile Filter Button -->
        <button 
          @click="showMobileFilters = !showMobileFilters"
          class="bg-white rounded-lg px-2 sm:px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-[10px] sm:text-xs outline-none cursor-pointer whitespace-nowrap touch-manipulation sm:hidden flex items-center gap-1"
        >
          <Filter class="w-3 h-3" />
          <span>More</span>
        </button>
      </div>

      <!-- Mobile Filters Dropdown -->
      <div v-if="showMobileFilters" class="mt-2 p-3 bg-white rounded-lg shadow-sm border border-gray-200 sm:hidden">
        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-1">
            <label class="text-[10px] text-gray-500">Time Range</label>
            <select 
              v-model="filters.timeRange"
              @change="filterAdmins"
              class="bg-gray-50 rounded px-2 py-1.5 text-[10px] outline-none border border-gray-200"
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Container with Mobile Card View -->
    <div class="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <!-- Mobile Card View -->
      <div class="block sm:hidden">
        <div 
          v-for="(admin, index) in filteredAdmins" 
          :key="admin.id"
          class="p-4 border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <input 
                type="checkbox" 
                v-model="admin.selected"
                class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation" 
              />
              <span class="text-[10px] text-gray-500 font-medium">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div 
                class="inline-flex items-center gap-1 px-2 py-1 rounded-md font-medium text-[9px] cursor-pointer touch-manipulation"
                :class="getStatusClass(admin.status)"
                @click="changeStatus(admin)"
              >
                <span>{{ getStatusShort(admin.status) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <Eye 
                  @click="viewAdmin(admin)"
                  class="w-4 h-4 text-yellow-500 cursor-pointer hover:text-yellow-600 transition touch-manipulation" 
                />
                <Edit 
                  @click="editAdmin(admin)"
                  class="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-600 transition touch-manipulation" 
                />
              </div>
            </div>
          </div>
          
          <!-- Admin Info -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-sm font-semibold text-gray-900 truncate">{{ admin.name }}</span>
                <CheckCircle v-if="admin.verified" class="w-3 h-3 text-green-500 flex-shrink-0" />
              </div>
            </div>
            
            <div class="text-[11px] text-gray-600 truncate">
              {{ admin.email }}
            </div>
            
            <div class="flex items-center justify-between text-[11px]">
              <div class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md font-medium"
                :class="getRoleClass(admin.role)">
                {{ getRoleShort(admin.role) }}
              </div>
              <div class="text-gray-500 text-[10px]">
                {{ formatDate(admin.lastLogin) }}
              </div>
            </div>

            <div class="text-[10px] text-gray-500">
              Created: {{ formatDate(admin.createdOn) }}
            </div>
          </div>

          <!-- Action Buttons for Mobile -->
          <div class="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
            <Trash2 
              @click="deleteAdmin(admin)"
              class="w-4 h-4 text-red-500 cursor-pointer hover:text-red-600 transition touch-manipulation" 
            />
          </div>
        </div>
      </div>

      <!-- Desktop Table View -->
      <div class="hidden sm:block overflow-x-auto scrollbar-thin">
        <table class="w-full table-auto" style="min-width: 900px;">
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
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Admin Name</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[150px]">Email</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[100px]">Role</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[90px]">Status</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[100px]">Created On</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[100px]">Last Login</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap w-24">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr 
              v-for="(admin, index) in filteredAdmins" 
              :key="admin.id" 
              class="hover:bg-gray-50 active:bg-gray-100 transition"
            >
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3">
                <input 
                  type="checkbox" 
                  v-model="admin.selected"
                  class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation" 
                />
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-700 text-[10px] sm:text-xs whitespace-nowrap">{{ String(index + 1).padStart(2, '0') }}</td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-900 font-medium text-[10px] sm:text-xs">
                <div class="flex items-center gap-1.5 max-w-[120px]">
                  <span class="truncate">{{ admin.name }}</span>
                  <CheckCircle v-if="admin.verified" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 flex-shrink-0" />
                </div>
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-600 text-[10px] sm:text-xs">
                <span class="truncate max-w-[150px] block">{{ admin.email }}</span>
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                <div class="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-medium text-[9px] sm:text-xs"
                  :class="getRoleClass(admin.role)">
                  <span class="hidden sm:inline">{{ admin.role }}</span>
                  <span class="sm:hidden">{{ getRoleShort(admin.role) }}</span>
                </div>
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                <div 
                  class="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-medium text-[9px] sm:text-xs cursor-pointer touch-manipulation"
                  :class="getStatusClass(admin.status)"
                  @click="changeStatus(admin)"
                >
                  <span class="hidden sm:inline">{{ admin.status }}</span>
                  <span class="sm:hidden">{{ getStatusShort(admin.status) }}</span>
                  <ChevronDown class="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                </div>
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-700 text-[10px] sm:text-xs whitespace-nowrap">{{ formatDate(admin.createdOn) }}</td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-700 text-[10px] sm:text-xs whitespace-nowrap">{{ formatDate(admin.lastLogin) }}</td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                <div class="flex items-center gap-1 sm:gap-2">
                  <Eye 
                    @click="viewAdmin(admin)"
                    class="w-4 h-4 text-yellow-500 cursor-pointer hover:text-yellow-600 active:text-yellow-700 transition touch-manipulation" 
                  />
                  <Edit 
                    @click="editAdmin(admin)"
                    class="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-700 transition touch-manipulation" 
                  />
                  <Trash2 
                    @click="deleteAdmin(admin)"
                    class="w-4 h-4 text-red-500 cursor-pointer hover:text-red-600 active:text-red-700 transition touch-manipulation" 
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- No Results -->
      <div v-if="filteredAdmins.length === 0" class="text-center py-8 sm:py-12">
        <div class="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
          <Search class="w-6 h-6 text-gray-400" />
        </div>
        <p class="text-gray-500 text-xs sm:text-sm">No admins found</p>
        <p class="text-gray-400 text-[10px] sm:text-xs mt-1">Try adjusting your search or filters</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
      <p class="text-[10px] sm:text-xs text-gray-600 text-center sm:text-left">
        Showing <span class="font-semibold">{{ filteredAdmins.length }}</span> of 
        <span class="font-semibold">{{ admins.length }}</span> admins
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Search, Eye, CheckCircle, ChevronDown, Edit, Trash2, Users, UserCheck, UserX, Shield, ChevronLeft, ChevronRight, Filter } from "lucide-vue-next";

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
const showMobileFilters = ref(false);
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

// Get short status for mobile
const getStatusShort = (status) => {
  switch(status) {
    case 'Active': return 'Act';
    case 'Inactive': return 'Ina';
    case 'Suspended': return 'Sus';
    default: return status;
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

// Get short role for mobile
const getRoleShort = (role) => {
  switch(role) {
    case 'Super Admin': return 'Super';
    case 'Admin': return 'Admin';
    case 'Moderator': return 'Mod';
    case 'Support': return 'Support';
    default: return role;
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