<template>
  <div class="w-full font-plus-jakarta-sans">
    <!-- Header Section with Gradient Background -->
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">User Management</h1>
      </div>

      <!-- Search Bar -->
      <div class="w-full relative rounded-lg bg-white/80 backdrop-blur-sm flex items-center px-4 py-3 gap-3">
        <SearchIcon class="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
        <input
          type="text"
          v-model="searchQuery"
          @input="handleFilterChange"
          placeholder="Search Companies By Name Or Category"
          class="flex-1 outline-none border-none bg-transparent text-gray-700 placeholder-gray-400 text-base min-w-0 
                 focus:ring-0 focus:outline-none"
        />
      </div>
    </div>

    <!-- Stats Cards - Responsive Grid -->
    <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Users class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Total Users</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.totalUsers }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
          <Google class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Google Signups</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.googleSignups }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-purple-100 flex items-center justify-center flex-shrink-0">
          <Share2 class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Social Signups</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.socialSignups }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-orange-100 flex items-center justify-center flex-shrink-0">
          <Mail class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Email Signups</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.emailSignups }}</b>
        </div>
      </div>
    </div>

    <!-- Filters Section - Enhanced for Mobile -->
    <div class="mb-4 overflow-x-auto pb-2 scrollbar-thin">
      <div class="flex items-center gap-1.5 sm:gap-2 min-w-max pr-4">
        <h2 class="text-xs sm:text-sm md:text-base font-semibold text-gray-900 whitespace-nowrap pr-1 sm:pr-2 xs:block">
  All Users List
</h2>
        
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

        <!-- Time Range Filter -->
        <select 
          v-model="filters.timeRange"
          @change="filterUsers"
          class="bg-white rounded-lg px-2 sm:px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-[10px] sm:text-xs outline-none cursor-pointer whitespace-nowrap touch-manipulation hidden xs:block"
        >
          <option value="">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
        </select>

        <!-- Status Filter -->
        <!-- <select 
          v-model="filters.status"
          @change="filterUsers"
          class="bg-white rounded-lg px-2 sm:px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-[10px] sm:text-xs outline-none cursor-pointer whitespace-nowrap touch-manipulation"
        >
          <option value="">Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Suspended">Suspended</option>
          <option value="Pending">Pending</option>
        </select> -->

        <div class="relative">
          <select 
            v-model="filters.status"
            @change="handleFilterChange"
            class="h-12 rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0 min-w-[140px]"
          >
            <option value="">Select Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>

        <!-- Signup Method Filter -->
        <select 
          v-model="filters.signupMethod"
          @change="filterUsers"
          class="bg-white rounded-lg px-2 sm:px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-[10px] sm:text-xs outline-none cursor-pointer whitespace-nowrap touch-manipulation hidden sm:block"
        >
          <option value="">Signup Method</option>
          <option value="Google">Google</option>
          <option value="Facebook">Facebook</option>
          <option value="Email">Email</option>
          <option value="Twitter">Twitter</option>
        </select>

        <!-- Mobile Filter Button -->
        <button 
          @click="showMobileFilters = !showMobileFilters"
          class="bg-white rounded-lg px-2 sm:px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-[10px] sm:text-xs outline-none cursor-pointer whitespace-nowrap touch-manipulation xs:hidden flex items-center gap-1"
        >
          <Filter class="w-3 h-3" />
          <span>More</span>
        </button>
      </div>

      <!-- Mobile Filters Dropdown -->
      <div v-if="showMobileFilters" class="mt-2 p-3 bg-white rounded-lg shadow-sm border border-gray-200 xs:hidden">
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1">
            <label class="text-[10px] text-gray-500">Time Range</label>
            <select 
              v-model="filters.timeRange"
              @change="filterUsers"
              class="bg-gray-50 rounded px-2 py-1.5 text-[10px] outline-none border border-gray-200"
            >
              <option value="">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-[10px] text-gray-500">Signup Method</label>
            <select 
              v-model="filters.signupMethod"
              @change="filterUsers"
              class="bg-gray-50 rounded px-2 py-1.5 text-[10px] outline-none border border-gray-200"
            >
              <option value="">All</option>
              <option value="Google">Google</option>
              <option value="Facebook">Facebook</option>
              <option value="Email">Email</option>
              <option value="Twitter">Twitter</option>
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
          v-for="(user, index) in filteredUsers" 
          :key="user.id"
          class="p-4 border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <input 
                type="checkbox" 
                v-model="user.selected"
                class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation" 
              />
              <span class="text-[10px] text-gray-500 font-medium">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div 
                class="inline-flex items-center gap-1 px-2 py-1 rounded-md font-medium text-[9px] cursor-pointer touch-manipulation"
                :class="getStatusClass(user.status)"
                @click="changeStatus(user)"
              >
                <span>{{ getStatusShort(user.status) }}</span>
                <ChevronDown class="w-2.5 h-2.5 flex-shrink-0" />
              </div>
              <Eye 
                @click="viewUser(user)"
                class="w-4 h-4 text-yellow-500 cursor-pointer hover:text-yellow-600 transition touch-manipulation" 
              />
            </div>
          </div>
          
          <!-- User Info -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-gray-900 truncate flex-1">{{ user.name }}</span>
              <CheckCircle v-if="user.verified" class="w-3 h-3 text-green-500 flex-shrink-0" />
            </div>
            
            <div class="text-[11px] text-gray-600 truncate">
              {{ user.email }}
            </div>
            
            <div class="flex items-center justify-between text-[11px]">
              <div class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md font-medium"
                :class="getSignupMethodClass(user.signupMethod)">
                {{ user.signupMethod }}
              </div>
              <span class="text-gray-500">{{ formatDate(user.signupDate) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Table View -->
      <div class="hidden sm:block overflow-x-auto scrollbar-thin">
        <table class="w-full table-auto" style="min-width: 800px;">
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
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Name</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[150px]">Email</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[100px]">Signup Method</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[100px]">Signup Date</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[90px]">Status</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap w-16">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr 
              v-for="(user, index) in filteredUsers" 
              :key="user.id" 
              class="hover:bg-gray-50 active:bg-gray-100 transition"
            >
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3">
                <input 
                  type="checkbox" 
                  v-model="user.selected"
                  class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation" 
                />
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-700 text-[10px] sm:text-xs whitespace-nowrap">{{ String(index + 1).padStart(2, '0') }}</td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-900 font-medium text-[10px] sm:text-xs">
                <div class="flex items-center gap-1.5 max-w-[120px] sm:max-w-[150px]">
                  <span class="truncate">{{ user.name }}</span>
                  <CheckCircle v-if="user.verified" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 flex-shrink-0" />
                </div>
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-600 text-[10px] sm:text-xs">
                <span class="truncate max-w-[150px] block">{{ user.email }}</span>
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                <div class="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-medium text-[9px] sm:text-xs"
                  :class="getSignupMethodClass(user.signupMethod)">
                  {{ user.signupMethod }}
                </div>
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-700 text-[10px] sm:text-xs whitespace-nowrap">{{ formatDate(user.signupDate) }}</td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                <div 
                  class="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-medium text-[9px] sm:text-xs cursor-pointer touch-manipulation"
                  :class="getStatusClass(user.status)"
                  @click="changeStatus(user)"
                >
                  <span class="hidden sm:inline">{{ user.status }}</span>
                  <span class="sm:hidden">{{ getStatusShort(user.status) }}</span>
                  <ChevronDown class="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                </div>
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                <Eye 
                  @click="viewUser(user)"
                  class="w-4 h-4 text-yellow-500 cursor-pointer hover:text-yellow-600 active:text-yellow-700 transition touch-manipulation" 
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- No Results -->
      <div v-if="filteredUsers.length === 0" class="text-center py-8 sm:py-12">
        <div class="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
          <Search class="w-6 h-6 text-gray-400" />
        </div>
        <p class="text-gray-500 text-xs sm:text-sm">No users found</p>
        <p class="text-gray-400 text-[10px] sm:text-xs mt-1">Try adjusting your search or filters</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
      <p class="text-[10px] sm:text-xs text-gray-600 text-center sm:text-left">
        Showing <span class="font-semibold">{{ filteredUsers.length }}</span> of 
        <span class="font-semibold">{{ users.length }}</span> users
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
import { getStatusClass, getStatusShort, getSignupMethodClass } from '~/composables/useStatusClass'
import { useSelection } from '~/composables/useSelection'
import { Search, Calendar, Eye, CheckCircle, ChevronDown, Users, Mail, Share2, ChevronLeft, ChevronRight, Filter } from "lucide-vue-next";

// Stats data
const stats = ref({
  totalUsers: 245,
  googleSignups: 120,
  socialSignups: 65,
  emailSignups: 60
});

// Users data from stub
const { data: usersData } = await useFetch('/stubs/users.json')
const users = ref((usersData.value || []).map(u => ({ ...u, selected: false })))

// Search and filters
const searchQuery = ref('');
const selectAll = ref(false);
const showMobileFilters = ref(false);
const filters = ref({
  dateFrom: '',
  dateTo: '',
  timeRange: '',
  status: '',
  signupMethod: ''
});

// Get unique signup methods efficiently
const signupMethods = computed(() => {
  const seen = new Set()
  for (const u of users.value) seen.add(u.signupMethod)
  return Array.from(seen)
})

// Filtered users as computed to avoid copies
const filteredUsers = computed(() => {
  const q = (searchQuery.value || '').toLowerCase()
  const status = filters.value.status
  const signupMethod = filters.value.signupMethod
  const from = filters.value.dateFrom
  const to = filters.value.dateTo

  return users.value.filter(user => {
    if (q) {
      const matches = user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q)
      if (!matches) return false
    }
    if (status && user.status !== status) return false
    if (signupMethod && user.signupMethod !== signupMethod) return false
    if (from && user.signupDate < from) return false
    if (to && user.signupDate > to) return false
    return true
  })
})

// Filter function replaced by shared noop; computed handles filtering
import { noop } from '~/composables/useCommon'
const filterUsers = noop

// Select all checkbox using shared selection helper
const { toggleAll } = useSelection(users)
const toggleSelectAll = () => {
  toggleAll(filteredUsers.value)
}

// Status and signup method helpers are centralized in composable

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
  // Add your modal logic here
};

const viewUser = (user) => {
  // Add your view logic here
};

const changeStatus = (user) => {
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