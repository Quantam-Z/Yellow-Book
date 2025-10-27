<template>
  <div class="w-full font-plus-jakarta-sans max-w-full overflow-hidden">
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
          placeholder="Search users by name or email"
          class="flex-1 outline-none border-none bg-transparent text-gray-700 placeholder-gray-400 text-base min-w-0 
                 focus:ring-0 focus:outline-none"
        />
      </div>
    </div>

    <!-- Stats Cards - Responsive Grid - SECOND ROW -->
    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
          <UsersIcon class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Total Users</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.totalUsers }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
          <UserPlusIcon class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Google Signups</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.googleSignups }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-purple-100 flex items-center justify-center flex-shrink-0">
          <Share2Icon class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Social Signups</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.socialSignups }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-orange-100 flex items-center justify-center flex-shrink-0">
          <MailIcon class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Email Signups</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.emailSignups }}</b>
        </div>
      </div>
    </div>

    <!-- Filters Section - THIRD ROW -->
    <div class="mb-6">
      <!-- Mobile Filters Toggle -->
      <div class="flex lg:hidden items-center justify-between mb-4">
        <h2 class="text-base font-bold text-gray-900">All Users List</h2>
        <button 
          @click="showMobileFilters = !showMobileFilters"
          class="h-12 bg-white rounded-xl px-4 py-2 border border-transparent sm:border-gray-300 text-gray-700 text-sm outline-none cursor-pointer whitespace-nowrap touch-manipulation flex items-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition"
          aria-controls="mobile-filters"
          :aria-expanded="showMobileFilters ? 'true' : 'false'"
        >
          <FilterIcon class="w-4 h-4" aria-hidden="true" />
          <span>Filters</span>
        </button>
      </div>

      <!-- Desktop Filters -->
      <div class="hidden lg:flex items-center flex-wrap gap-3 min-w-full">
        <h2 class="text-lg font-bold text-gray-900 whitespace-nowrap">
          All Users List
        </h2>

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
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>

        <!-- Status Filter -->
        <div class="relative">
          <select 
            v-model="filters.status"
            @change="handleFilterChange"
            class="h-12 rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0 min-w-[140px]"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
            <option value="Pending">Pending</option>
          </select>
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>

        <!-- Signup Method Filter -->
        <div class="relative">
          <select 
            v-model="filters.signupMethod"
            @change="handleFilterChange"
            class="h-12 rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0 min-w-[160px]"
          >
            <option value="">Signup Method</option>
            <option v-for="m in signupMethods" :key="m" :value="m">{{ m }}</option>
          </select>
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      <!-- Mobile Filters -->
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
              <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
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
                <option value="Pending">Pending</option>
              </select>
              <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          <!-- Signup Method -->
          <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-700 font-medium">Signup Method</label>
            <div class="relative">
              <select 
                v-model="filters.signupMethod"
                @change="handleFilterChange"
                class="h-12 w-full rounded-xl bg-gray-100 border border-gray-200 appearance-none py-0 pl-4 pr-10 text-left text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-0"
              >
                <option value="">All</option>
                <option v-for="m in signupMethods" :key="m" :value="m">{{ m }}</option>
              </select>
              <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-3">
          <button @click="resetFilters" class="px-4 py-3 text-sm text-gray-600 bg-white border border-transparent sm:border-gray-200 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation transition">Reset</button>
          <button @click="applyMobileFilters" class="px-4 py-3 text-sm text-gray-900 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 rounded-lg touch-manipulation transition">Apply</button>
        </div>
      </div>
    </div>

    <!-- Users Table / Cards - FOURTH ROW -->
    <div class="w-full bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-16 text-gray-500 text-lg font-medium animate-pulse">
        <svg class="animate-spin h-8 w-8 text-yellow-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading Users...
      </div>

      <!-- Content -->
      <template v-else>
        <!-- Mobile Card View -->
        <div class="lg:hidden w-full flex flex-col gap-4">
          <div 
            v-for="user in paginatedUsers" 
            :key="user.id"
            class="w-full rounded-xl border border-gray-200 p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] hover:bg-indigo-50"
          >
            <!-- Card header -->
            <div class="flex justify-between items-start mb-3">
              <div class="flex flex-col min-w-0">
                <div class="flex items-center gap-2 min-w-0">
                  <h3 class="font-semibold text-gray-900 text-base truncate">{{ user.name }}</h3>
                  <CheckCircleIcon v-if="user.verified" class="w-4 h-4 text-green-500 flex-shrink-0" />
                </div>
                <div class="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium" :class="getSignupMethodClass(user.signupMethod, 'soft') + ' bg-opacity-10'">
                  {{ user.signupMethod }}
                </div>
              </div>
              <div class="flex items-center gap-2 shrink-0 ml-4">
                <span class="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap" :class="getStatusClass(user.status, 'soft') + ' bg-opacity-10'" @click="changeStatus(user)">
                  {{ user.status }}
                </span>
                <MoreHorizontal class="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </div>
            </div>

            <!-- Card body -->
            <div class="flex justify-between items-end">
              <div class="flex flex-col gap-2 text-sm flex-1 min-w-0">
                <div class="text-gray-600 truncate">{{ user.email }}</div>
                <div class="text-gray-500">Signup: {{ formatDate(user.signupDate) }}</div>
              </div>
              <div class="ml-4 flex-shrink-0">
                <span @click="viewUser(user)" class="text-amber-500 hover:text-amber-600 font-medium text-sm cursor-pointer whitespace-nowrap">
                  View Details
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop Table View -->
        <div class="hidden lg:block overflow-x-auto">
          <table class="w-full table-auto min-w-[800px]">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-4 py-3 text-left" style="width: 40px;">
                  <input 
                    type="checkbox"
                    :checked="allSelected"
                    @change="toggleSelectAll"
                    class="w-5 h-5 rounded border-gray-300 cursor-pointer touch-manipulation" 
                  />
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap" style="width: 60px;">No</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[160px]">Name</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[200px]">Email</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Signup Method</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Signup Date</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Status</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap" style="width: 80px;">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr 
                v-for="(user, index) in paginatedUsers" 
                :key="user.id" 
                class="hover:bg-gray-50 active:bg-gray-100 transition"
              >
                <td class="px-4 py-3">
                  <input 
                    type="checkbox" 
                    :checked="user.selected"
                    @change="toggleSelection(user)"
                    class="w-5 h-5 rounded border-gray-300 cursor-pointer touch-manipulation" 
                  />
                </td>
                <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ getDisplayIndex(index) }}</td>
                <td class="px-4 py-3 text-gray-900 font-medium text-sm">
                  <div class="flex items-center gap-2">
                    <span class="truncate">{{ user.name }}</span>
                    <CheckCircleIcon v-if="user.verified" class="w-4 h-4 text-green-500 flex-shrink-0" />
                  </div>
                </td>
                <td class="px-4 py-3 text-gray-700 text-sm">
                  <span class="truncate block">{{ user.email }}</span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div 
                    class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-sm"
                    :class="getSignupMethodClass(user.signupMethod)"
                  >
                    <span>{{ user.signupMethod }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ formatDate(user.signupDate) }}</td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div 
                    class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-sm cursor-pointer touch-manipulation"
                    :class="getStatusClass(user.status)"
                    @click="changeStatus(user)"
                  >
                    <span>{{ user.status }}</span>
                    <ChevronDownIcon class="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                  </div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <EyeIcon 
                    @click="viewUser(user)"
                    class="w-5 h-5 text-yellow-500 cursor-pointer hover:text-yellow-600 active:text-yellow-700 transition touch-manipulation" 
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="paginatedUsers.length === 0" class="text-center py-12">
          <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <SearchIcon class="w-8 h-8 text-gray-400" aria-hidden="true" />
          </div>
          <p class="text-gray-500 text-base">No users found</p>
          <p class="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      </template>
    </div>

    <!-- Pagination - FIFTH ROW -->
    <div class="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
      <p class="text-sm text-gray-600 text-center sm:text-left">
        Showing <span class="font-semibold">{{ paginatedUsers.length }}</span> of 
        <span class="font-semibold">{{ filteredUsers.length }}</span> users (Page {{ currentPage }} of {{ totalPages }})
      </p>
      <div class="flex gap-2">
        <button 
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2.5 bg-white border border-transparent sm:border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition touch-manipulation flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon class="w-4 h-4" aria-hidden="true" />
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
                : 'bg-white border border-transparent sm:border-gray-200 text-gray-600 hover:bg-gray-50 active:bg-gray-100'
            ]"
          >
            {{ page }}
          </button>
        </template>
        
        <button 
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2.5 bg-white border border-transparent sm:border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition touch-manipulation flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ChevronRightIcon class="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import { 
  Search as SearchIcon,
  Eye as EyeIcon,
  CheckCircle as CheckCircleIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Filter as FilterIcon,
  Users as UsersIcon,
  Share2 as Share2Icon,
  Mail as MailIcon,
  UserPlus as UserPlusIcon,
  MoreHorizontal
} from 'lucide-vue-next';
import { getStatusClass, getStatusShort, getSignupMethodClass } from '~/composables/useStatusClass'
import { useSelection } from '~/composables/useSelection'

// --- State ---
const showMobileFilters = ref(false);
const searchQuery = ref('');
const users = ref([]);

// Pagination State
const currentPage = ref(1);
const itemsPerPage = 10;

// Filters
const filters = ref({
  dateFrom: '',
  dateTo: '',
  timeRange: '',
  status: '',
  signupMethod: ''
});

// Stats
const stats = ref({
  totalUsers: 0,
  googleSignups: 0,
  socialSignups: 0,
  emailSignups: 0,
});

// --- Composables ---
const { allSelected, toggleSelection, toggleAll } = useSelection(users);

// --- Data Fetching (SSR-friendly) ---
const { data: usersData, pending } = await useFetch('/stubs/users.json')
const isLoading = computed(() => pending.value)

// --- Computed ---
const signupMethods = computed(() => {
  const seen = new Set();
  for (const u of users.value) seen.add(u.signupMethod);
  return Array.from(seen);
});

const filteredUsers = computed(() => {
  if (isLoading.value) return [];
  const query = (searchQuery.value || '').toLowerCase();
  const { status, signupMethod, dateFrom, dateTo } = filters.value;

  const fromDate = dateFrom ? new Date(dateFrom) : null;
  const toDate = dateTo ? new Date(dateTo) : null;

  return users.value.filter(user => {
    const searchMatch = !query || user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
    const statusMatch = !status || user.status === status;
    const methodMatch = !signupMethod || user.signupMethod === signupMethod;

    let dateMatch = true;
    if (fromDate || toDate) {
      const userDate = new Date(user.signupDate);
      if (fromDate && userDate < fromDate) dateMatch = false;
      if (toDate && userDate > toDate) dateMatch = false;
    }

    return searchMatch && statusMatch && methodMatch && dateMatch;
  });
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredUsers.value.length / itemsPerPage)));

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredUsers.value.slice(start, end);
});

// --- Methods ---
const handleFilterChange = () => {
  currentPage.value = 1;
};

const getDisplayIndex = (indexInPage) => {
  const trueIndex = (currentPage.value - 1) * itemsPerPage + indexInPage + 1;
  return String(trueIndex).padStart(2, '0');
};

const toggleSelectAll = () => {
  toggleAll(paginatedUsers.value);
};

const viewUser = (user) => {
  // Hook for future detail modal
  // alert(`Viewing: ${user.name}`)
};

const changeStatus = (user) => {
  // Cycle through common statuses to demo behavior
  const statuses = ['Active', 'Inactive', 'Suspended', 'Pending'];
  const currentIndex = statuses.indexOf(user.status);
  const nextIndex = (currentIndex + 1) % statuses.length;
  user.status = statuses[nextIndex];
};

const applyMobileFilters = () => {
  handleFilterChange();
  showMobileFilters.value = false;
};

const resetFilters = () => {
  filters.value = {
    dateFrom: '',
    dateTo: '',
    timeRange: '',
    status: '',
    signupMethod: ''
  };
  handleFilterChange();
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const updateStats = () => {
  const total = users.value.length;
  const google = users.value.filter(u => u.signupMethod === 'Google').length;
  const social = users.value.filter(u => u.signupMethod === 'Facebook' || u.signupMethod === 'Twitter').length;
  const email = users.value.filter(u => u.signupMethod === 'Email').length;
  stats.value = {
    totalUsers: total,
    googleSignups: google,
    socialSignups: social,
    emailSignups: email,
  };
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// Populate users when fetch completes
watchEffect(() => {
  const raw = usersData?.value || []
  users.value = raw.map(u => ({ ...u, selected: false }))
  updateStats()
})
</script>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Enhanced touch targets for mobile */
@media (max-width: 640px) {
  input[type="date"] {
    min-height: 44px;
  }
  
  select {
    min-height: 44px;
  }
  
  button {
    min-height: 44px;
  }
}

/* Improved scrollbar for tables */
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Better focus states for accessibility */
input:focus, select:focus, button:focus {
  outline: 2px solid #fbbf24;
  outline-offset: 2px;
}

/* Improved transitions */
.transition {
  transition: all 0.2s ease-in-out;
}

/* Fix for mobile dropdown overflow */
@media (max-width: 1024px) {
  #mobile-filters {
    position: relative;
    z-index: 40;
    max-height: 80vh;
    overflow-y: auto;
  }
  
  /* Prevent body scroll when filters are open */
  body:has(#mobile-filters[style*="display: block"]) {
    overflow: hidden;
  }
}

/* Ensure date inputs and selects have consistent styling */
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0.6;
  cursor: pointer;
}

input[type="date"]:hover::-webkit-calendar-picker-indicator {
  opacity: 1;
}

/* Consistent border radius and styling */
.rounded-xl {
  border-radius: 12px;
}

/* Ensure consistent background colors */
.bg-gray-100 {
  background-color: #f3f4f6;
}

.border-gray-200 {
  border-color: #e5e7eb;
}
</style>