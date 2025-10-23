<template>
  <div class="w-full font-plus-jakarta-sans">
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 class="text-xl md:text-2xl font-bold text-gray-900">Admin Management</h1>
        <NuxtLink
          to="/dashboard/admin/CreatesubAdmin"
          class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition shadow-md whitespace-nowrap text-sm w-full sm:w-auto text-center"
        >
          Add Sub Admin
        </NuxtLink>
      </div>

      <!-- Search Bar (aligned with Manage Users) -->
      <div class="w-full relative rounded-lg bg-white/80 backdrop-blur-sm flex items-center px-4 py-3 gap-3">
        <Search class="w-5 h-5 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          v-model="searchQuery"
          @input="handleFilterChange"
          placeholder="Search admins by name or email"
          class="flex-1 outline-none border-none bg-transparent text-gray-700 placeholder-gray-400 text-base min-w-0 focus:ring-0 focus:outline-none"
        />
      </div>
    </div>

    <!-- Mobile Filters Toggle -->
    <div class="mb-4 flex lg:hidden items-center justify-between">
      <h2 class="text-base font-bold text-gray-900">All Admin List</h2>
      <button 
        @click="showMobileFilters = !showMobileFilters"
        class="h-12 bg-white rounded-xl px-4 py-2 border border-gray-300 text-gray-700 text-sm outline-none cursor-pointer whitespace-nowrap touch-manipulation flex items-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition"
        aria-controls="mobile-filters"
        :aria-expanded="showMobileFilters ? 'true' : 'false'"
      >
        <Filter class="w-4 h-4" aria-hidden="true" />
        <span>Filters</span>
      </button>
    </div>

    <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Users class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Total Admins</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.totalAdmins }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
          <UserCheck class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Active</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.active }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
          <UserX class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Inactive</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.inactive }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-purple-100 flex items-center justify-center flex-shrink-0">
          <Shield class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Super Admins</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.superAdmins }}</b>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="mb-6">
      <!-- Desktop Filters -->
      <div class="hidden lg:flex items-center flex-wrap gap-3 min-w-full">
        <h2 class="text-lg font-bold text-gray-900 whitespace-nowrap">All Admin List</h2>

        <!-- Date From -->
        <div class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 flex items-center px-4 gap-2 text-sm">
          <span class="text-gray-400 text-sm">From:</span>
          <input 
            type="date" 
            v-model="filters.dateFrom"
            @change="handleFilterChange"
            class="text-gray-600 text-sm outline-none bg-transparent cursor-pointer border-none touch-manipulation ring-0 focus:ring-0 w-32"
          />
        </div>

        <!-- Date To -->
        <div class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 flex items-center px-4 gap-2 text-sm">
          <span class="text-gray-400 text-sm">To:</span>
          <input 
            type="date" 
            v-model="filters.dateTo"
            @change="handleFilterChange"
            class="text-gray-600 text-sm outline-none bg-transparent cursor-pointer border-none touch-manipulation ring-0 focus:ring-0 w-32"
          />
        </div>

        <!-- Time Range -->
        <div class="relative">
          <select 
            v-model="filters.timeRange"
            @change="handleFilterChange"
            class="h-12 rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0 min-w-[140px]" 
          >
            <option value="">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
          </select>
          <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>

        <!-- Role Filter -->
        <div class="relative">
          <select 
            v-model="filters.role"
            @change="handleFilterChange"
            class="h-12 rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0 min-w-[160px]"
          >
            <option value="">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="Support">Support</option>
          </select>
          <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>

        <!-- Status Filter -->
        <div class="relative">
          <select 
            v-model="filters.status"
            @change="handleFilterChange"
            class="h-12 rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0 min-w-[160px]"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
          <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      <!-- Mobile Filters - Same design as desktop -->
      <div v-if="showMobileFilters" id="mobile-filters" class="mt-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 lg:hidden">
        <div class="space-y-4">
          <!-- Date Range -->
          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col gap-2">
              <label class="text-sm text-gray-700 font-medium">From</label>
              <div class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 flex items-center px-4 gap-2">
                <input
                  type="date"
                  v-model="filters.dateFrom"
                  @change="handleFilterChange"
                  class="text-gray-600 text-sm outline-none bg-transparent cursor-pointer border-none touch-manipulation ring-0 focus:ring-0 w-full"
                />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm text-gray-700 font-medium">To</label>
              <div class="h-12 relative rounded-xl bg-gray-100 border border-gray-200 flex items-center px-4 gap-2">
                <input
                  type="date"
                  v-model="filters.dateTo"
                  @change="handleFilterChange"
                  class="text-gray-600 text-sm outline-none bg-transparent cursor-pointer border-none touch-manipulation ring-0 focus:ring-0 w-full"
                />
              </div>
            </div>
          </div>

          <!-- Time Range -->
          <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-700 font-medium">Time Range</label>
            <div class="relative">
              <select 
                v-model="filters.timeRange"
                @change="handleFilterChange"
                class="h-12 w-full rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0" 
              >
                <option value="">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
              </select>
              <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          <!-- Role -->
          <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-700 font-medium">Role</label>
            <div class="relative">
              <select 
                v-model="filters.role"
                @change="handleFilterChange"
                class="h-12 w-full rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0"
              >
                <option value="">All Roles</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="Support">Support</option>
              </select>
              <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          <!-- Status -->
          <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-700 font-medium">Status</label>
            <div class="relative">
              <select
                v-model="filters.status"
                @change="handleFilterChange"
                class="h-12 w-full rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
              <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-3">
          <button @click="resetFilters" class="px-4 py-3 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation transition">Reset</button>
          <button @click="applyMobileFilters" class="px-4 py-3 text-sm text-gray-900 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 rounded-lg touch-manipulation transition">Apply</button>
        </div>
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="hidden lg:block w-full bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div class="overflow-x-auto">
        <table class="w-full min-w-max table-auto">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-3 py-2.5 text-left w-12">
                <input 
                  type="checkbox" 
                  :checked="allSelected"
                  @change="toggleSelectAll"
                  class="w-5 h-5 rounded border-gray-300 cursor-pointer" 
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
              v-for="(admin, index) in paginatedAdmins" 
              :key="admin.id" 
              class="hover:bg-gray-50 transition"
            >
              <td class="px-3 py-2.5">
                <input 
                  type="checkbox" 
                  v-model="admin.selected"
                  class="w-5 h-5 rounded border-gray-300 cursor-pointer" 
                />
              </td>
              <td class="px-3 py-2.5 text-gray-700 text-xs whitespace-nowrap">{{ getDisplayIndex(index) }}</td>
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
            <span class="text-xs text-gray-500 font-medium">#{{ getDisplayIndex(index) }}</span>
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

    <!-- Pagination (match manageUsers styles) -->
    <div class="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
      <p class="text-sm text-gray-600 text-center sm:text-left">
        Showing <span class="font-semibold">{{ paginatedAdmins.length }}</span> of 
        <span class="font-semibold">{{ filteredAdmins.length }}</span> admins (Page {{ currentPage }} of {{ totalPages }})
      </p>
      <div class="flex gap-2">
        <button 
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition touch-manipulation flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft class="w-4 h-4" aria-hidden="true" />
          <span>Previous</span>
        </button>
        <template v-for="page in totalPages" :key="page">
          <button 
            v-if="page === currentPage || page === currentPage - 1 || page === currentPage + 1"
            @click="currentPage = page"
            :class="[
              'px-4 py-2.5 rounded-lg text-sm font-medium transition touch-manipulation min-w-[44px]',
              page === currentPage 
                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 active:bg-yellow-600' 
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 active:bg-gray-100'
            ]"
          >
            {{ page }}
          </button>
        </template>
        <button 
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition touch-manipulation flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ChevronRight class="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getStatusClass, getRoleClass } from '~/composables/useStatusClass'
import { useSelection } from '~/composables/useSelection'
import { Search, Eye, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Edit, Trash2, Users, UserCheck, UserX, Shield, Filter } from "lucide-vue-next";

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
const showMobileFilters = ref(false)
const selectAll = ref(false);
const filters = ref({
  dateFrom: '',
  dateTo: '',
  timeRange: '',
  role: '',
  status: ''
});

// Filtered admins without copying entire arrays
const filteredAdmins = computed(() => {
  const q = (searchQuery.value || '').toLowerCase()
  const role = filters.value.role
  const status = filters.value.status
  const dateFrom = filters.value.dateFrom ? new Date(filters.value.dateFrom) : null
  const dateTo = filters.value.dateTo ? new Date(filters.value.dateTo) : null

  return admins.value.filter(admin => {
    if (q) {
      const matches = admin.name.toLowerCase().includes(q) || admin.email.toLowerCase().includes(q) || admin.role.toLowerCase().includes(q)
      if (!matches) return false
    }
    if (role && admin.role !== role) return false
    if (status && admin.status !== status) return false

    if (dateFrom || dateTo) {
      const created = new Date(admin.createdOn)
      if (dateFrom && created < dateFrom) return false
      if (dateTo && created > dateTo) return false
    }

    return true
  })
})

// Action handlers
const openAddModal = () => {
  // Add your modal logic here
};

// Filtering is driven by computed; we only need a page reset
const handleFilterChange = () => { currentPage.value = 1 }

// Select all checkbox using shared selection helper
const currentPage = ref(1)
const itemsPerPage = 10
const totalPages = computed(() => Math.max(1, Math.ceil(filteredAdmins.value.length / itemsPerPage)))
const paginatedAdmins = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredAdmins.value.slice(start, end)
})

const { allSelected, toggleAll } = useSelection(admins)
const toggleSelectAll = () => {
  toggleAll(paginatedAdmins.value)
}

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
    totalAdmins: filteredAdmins.value.length,
    active: filteredAdmins.value.filter(a => a.status === 'Active').length,
    inactive: filteredAdmins.value.filter(a => a.status === 'Inactive').length,
    superAdmins: filteredAdmins.value.filter(a => a.role === 'Super Admin').length
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

// Helpers aligned with Manage Users
const getDisplayIndex = (indexInPage) => {
  const trueIndex = (currentPage.value - 1) * itemsPerPage + indexInPage + 1
  return String(trueIndex).padStart(2, '0')
}

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }

// Mobile filters helpers
const applyMobileFilters = () => { currentPage.value = 1; showMobileFilters.value = false }
const resetFilters = () => {
  filters.value = { dateFrom: '', dateTo: '', timeRange: '', role: '', status: '' }
  currentPage.value = 1
}
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