<template>
  <div class="w-full font-plus-jakarta-sans">
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4 mb-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 class="text-xl md:text-2xl font-bold text-gray-900">Admin Management</h1>
        <NuxtLink
          to="/dashboard/admin/CreatesubAdmin"
          class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition shadow-md whitespace-nowrap text-sm w-full sm:w-auto text-center"
        >
          Add Sub Admin
        </NuxtLink>
      </div>

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

    <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <div class="rounded-lg bg-white border border-gray-200 flex items-center p-4 gap-3">
        <div class="h-11 w-11 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Users class="w-6 h-6 text-blue-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1">
          <div class="text-sm text-gray-600 leading-[130%] capitalize">Total Admins</div>
          <b class="text-lg leading-[160%] capitalize text-gray-900">{{ stats.totalAdmins }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border border-gray-200 flex items-center p-4 gap-3">
        <div class="h-11 w-11 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
          <UserCheck class="w-6 h-6 text-green-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1">
          <div class="text-sm text-gray-600 leading-[130%] capitalize">Active</div>
          <b class="text-lg leading-[160%] capitalize text-gray-900">{{ stats.active }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border border-gray-200 flex items-center p-4 gap-3">
        <div class="h-11 w-11 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
          <UserX class="w-6 h-6 text-red-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1">
          <div class="text-sm text-gray-600 leading-[130%] capitalize">Inactive</div>
          <b class="text-lg leading-[160%] capitalize text-gray-900">{{ stats.inactive }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border border-gray-200 flex items-center p-4 gap-3">
        <div class="h-11 w-11 rounded bg-purple-100 flex items-center justify-center flex-shrink-0">
          <Shield class="w-6 h-6 text-purple-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1">
          <div class="text-sm text-gray-600 leading-[130%] capitalize">Super Admins</div>
          <b class="text-lg leading-[160%] capitalize text-gray-900">{{ stats.superAdmins }}</b>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="mb-4">
      <div class="flex flex-col sm:flex-row sm:items-center gap-3">
        <h2 class="text-sm md:text-base font-semibold text-gray-900 whitespace-nowrap">All Admin List</h2>
        
        <div class="flex flex-wrap gap-2">
          <select 
            v-model="filters.role"
            @change="filterAdmins"
            class="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-xs outline-none cursor-pointer whitespace-nowrap flex-1 min-w-[120px]"
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
            class="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-xs outline-none cursor-pointer whitespace-nowrap flex-1 min-w-[120px]"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>

          <select 
            v-model="filters.timeRange"
            @change="filterAdmins"
            class="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-xs outline-none cursor-pointer whitespace-nowrap flex-1 min-w-[120px]"
          >
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="hidden lg:block w-full bg-white rounded-xl shadow-md overflow-hidden">
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

    <!-- Mobile Cards -->
    <div class="lg:hidden space-y-3">
      <div 
        v-for="(admin, index) in filteredAdmins" 
        :key="admin.id" 
        class="bg-white rounded-lg border border-gray-200 p-4"
      >
        <!-- Card Header -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <input 
              type="checkbox" 
              v-model="admin.selected"
              class="w-4 h-4 rounded border-gray-300" 
            />
            <span class="text-xs text-gray-500 font-medium">#{{ String(index + 1).padStart(2, '0') }}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <CheckCircle v-if="admin.verified" class="w-3.5 h-3.5 text-green-500" />
          </div>
        </div>

        <!-- Admin Info -->
        <div class="mb-3">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-semibold text-gray-900">{{ admin.name }}</h3>
            <div 
              class="px-2 py-1 rounded-md text-xs font-medium"
              :class="getStatusClass(admin.status)"
            >
              {{ admin.status }}
            </div>
          </div>
          <p class="text-xs text-gray-600 mb-2">{{ admin.email }}</p>
          <div class="flex items-center justify-between">
            <div 
              class="px-2 py-1 rounded-md text-xs font-medium"
              :class="getRoleClass(admin.role)"
            >
              {{ admin.role }}
            </div>
            <div class="text-xs text-gray-500">
              {{ formatDate(admin.lastLogin) }}
            </div>
          </div>
        </div>

        <!-- Dates -->
        <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>Created: {{ formatDate(admin.createdOn) }}</span>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between pt-3 border-t border-gray-100">
          <button 
            @click="viewAdmin(admin)"
            class="flex items-center gap-1 text-yellow-600 text-xs font-medium"
          >
            <Eye class="w-4 h-4" />
            View
          </button>
          <button 
            @click="editAdmin(admin)"
            class="flex items-center gap-1 text-blue-600 text-xs font-medium"
          >
            <Edit class="w-4 h-4" />
            Edit
          </button>
          <button 
            @click="deleteAdmin(admin)"
            class="flex items-center gap-1 text-red-600 text-xs font-medium"
          >
            <Trash2 class="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- No Results Mobile -->
    <div v-if="filteredAdmins.length === 0" class="lg:hidden text-center py-8 bg-white rounded-lg border border-gray-200">
      <p class="text-gray-500 text-sm">No admins found</p>
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
import { getStatusClass, getRoleClass } from '~/composables/useStatusClass'
import { Search, Eye, CheckCircle, ChevronDown, Edit, Trash2, Users, UserCheck, UserX, Shield } from "lucide-vue-next";

// Stats data
const stats = ref({
  totalAdmins: 0,
  active: 0,
  inactive: 0,
  superAdmins: 0
});

// Admins data from stub
const { data: adminsData } = await useFetch('/stubs/admins.json')
const admins = ref((adminsData.value || []).map(a => ({ ...a, selected: false })))

// Search and filters
const searchQuery = ref('');
const selectAll = ref(false);
const filters = ref({
  role: '',
  status: '',
  timeRange: ''
});

// Filtered admins without copying entire arrays
const filteredAdmins = computed(() => {
  const q = (searchQuery.value || '').toLowerCase()
  const role = filters.value.role
  const status = filters.value.status
  return admins.value.filter(admin => {
    if (q) {
      const matches = admin.name.toLowerCase().includes(q) || admin.email.toLowerCase().includes(q) || admin.role.toLowerCase().includes(q)
      if (!matches) return false
    }
    if (role && admin.role !== role) return false
    if (status && admin.status !== status) return false
    return true
  })
})

// Action handlers
const openAddModal = () => {
  // Add your modal logic here
};

// Filter function
const filterAdmins = () => {}

// Select all checkbox
const toggleSelectAll = () => {
  filteredAdmins.value.forEach(admin => {
    admin.selected = selectAll.value;
  });
};

// Status and role classes centralized in composable

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
  // Add your view logic here
};

const editAdmin = (admin) => {
  // Add your edit logic here
};

const deleteAdmin = (admin) => {
  // Add your delete logic here
};

const changeStatus = (admin) => {
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