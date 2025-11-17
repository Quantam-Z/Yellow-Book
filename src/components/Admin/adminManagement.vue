<template>
  <div class="w-full font-plus-jakarta-sans max-w-full overflow-x-hidden">
    <!-- Header Section with Gradient Background -->
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-2 sm:p-4 md:p-6 mb-4">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Admin Management</h1>
    <NuxtLink
  to="/admin/create-sub-admin"
  class="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-semibold px-4 py-2.5 rounded-lg transition shadow-md whitespace-nowrap text-sm w-full sm:w-auto text-center touch-manipulation no-underline"
>
  Add Sub Admin
</NuxtLink>

      </div>

      <!-- Search Bar -->
      <div class="w-full relative rounded-lg bg-white/80 backdrop-blur-sm flex items-center px-3 py-2 sm:px-4 sm:py-3 gap-3">
        <SearchIcon class="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
        <input
          type="text"
          v-model="searchQuery"
          @input="handleFilterChange"
          placeholder="Search admins by name or email"
          class="flex-1 outline-none border-none bg-transparent text-gray-700 placeholder-gray-400 text-base min-w-0 
                 focus:ring-0 focus:outline-none"
        />
      </div>
    </div>

    <!-- Stats Cards - Responsive Grid - SECOND ROW -->
    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 px-3 lg:px-0">
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
          <UsersIcon class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Total Admins</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.totalAdmins }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
          <UserCheckIcon class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Active</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.active }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
          <UserXIcon class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Inactive</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.inactive }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-purple-100 flex items-center justify-center flex-shrink-0">
          <ShieldIcon class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Super Admins</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.superAdmins }}</b>
        </div>
      </div>
    </div>

    <!-- Mobile Filters Toggle -->
    <div class="mb-4 flex lg:hidden items-center justify-between px-3 lg:px-0">
      <h2 class="text-base font-bold text-gray-900">All Admin List</h2>
      <button 
  @click="showMobileFilters = !showMobileFilters"
  class="h-12 
         bg-gray-100 rounded-xl px-4 py-2 border-0
         text-gray-700 text-sm outline-none cursor-pointer whitespace-nowrap 
         touch-manipulation flex items-center gap-2 
         hover:bg-gray-50 active:bg-gray-100 transition
         shadow-none hover:shadow-none active:shadow-none     
         "
  aria-controls="mobile-filters"
  :aria-expanded="showMobileFilters ? 'true' : 'false'"
>
  <FilterIcon class="w-4 h-4" aria-hidden="true" />
  <span>Filters</span>
</button>
    </div>

    <!-- Filters Section - THIRD ROW -->
    <div class="mb-6 px-3 lg:px-0">
      <!-- Desktop Filters -->
      <div class="hidden lg:flex items-center flex-wrap gap-3 w-full overflow-x-auto scrollbar-thin">
        <h2 class="text-lg font-bold text-gray-900 whitespace-nowrap">
          All Admin List
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
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
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
          <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      <!-- Mobile Filters -->
      <div v-if="showMobileFilters" id="mobile-filters" class="mt-3 p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200 lg:hidden relative">
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
              </select>
              <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-3">
  <!-- Reset Button -->
  <button 
    @click="resetFilters" 
    class="px-4 py-3 text-sm text-gray-600 bg-gray-100 rounded-lg border-0 
           hover:bg-gray-50 active:bg-gray-100 touch-manipulation transition"
  >
    Reset
  </button>

  <!-- Apply Button -->
  <button 
    @click="applyMobileFilters" 
    class="px-4 py-3 text-sm text-gray-900 bg-yellow-400 rounded-lg border-0 
           hover:bg-yellow-500 active:bg-yellow-600 touch-manipulation transition"
  >
    Apply
  </button>
</div>
      </div>
    </div>

    <!-- Admins Table / Cards - FOURTH ROW -->
    <div class="w-full bg-white rounded-xl shadow-sm border border-gray-200 px-3 pt-3 lg:px-0 lg:pt-0">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-16 text-gray-500 text-lg font-medium animate-pulse">
        <svg class="animate-spin h-8 w-8 text-yellow-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading Admins...
      </div>

      <!-- Content -->
      <template v-else>
        <!-- Mobile Card View -->
          <div class="lg:hidden w-full flex flex-col gap-4">
            <div 
              v-for="(admin, index) in paginatedAdmins" 
              :key="admin.id"
              class="w-full rounded-xl border border-gray-200 p-3 sm:p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] hover:bg-indigo-50 cursor-pointer relative"
            >
              <div class="flex justify-between items-start mb-3">
                <div class="flex flex-col min-w-0">
                  <div class="flex items-center gap-2 min-w-0">
                    <h3 class="font-semibold text-gray-900 text-base truncate">{{ admin.name }}</h3>
                    <CheckCircleIcon v-if="admin.verified" class="w-4 h-4 text-green-500 flex-shrink-0" />
                  </div>
                  <div class="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium" :class="getRoleClass(admin.role, 'soft') + ' bg-opacity-10'">
                    {{ admin.role }}
                  </div>
                </div>
                <div class="flex items-center gap-2 shrink-0 relative">
                  <span 
                    class="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap cursor-pointer transition-opacity" 
                    :class="getStatusClass(admin.status, 'soft') + ' bg-opacity-10'" 
                    @click.stop="changeStatus(admin)"
                  >
                    {{ admin.status }}
                  </span>
                  <button
                    v-if="mobileActionsIndex === index"
                    type="button"
                    class="text-red-500 hover:text-red-600 transition-colors flex items-center justify-center"
                    @click.stop="deleteAdmin(admin)"
                    title="Delete admin"
                  >
                    <Trash2Icon class="w-5 h-5" />
                  </button>
                  <MoreHorizontal 
                    v-else
                    class="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" 
                    @click.stop="toggleMobileActions(index)"
                  />
                </div>
              </div>

              <div class="mb-3">
                <p class="text-sm text-gray-700 break-all">
                  {{ admin.email }}
                </p>
              </div>

              <div class="flex justify-between items-center text-xs text-gray-500">
                <span>{{ formatDate(admin.createdOn) }}</span>
                <button
                  type="button"
                  @click.stop="viewAdmin(admin)"
                  class="text-amber-500 hover:text-amber-600 font-medium text-sm cursor-pointer whitespace-nowrap bg-transparent border-0 p-0 focus:outline-none"
                  :aria-expanded="expandedAdminId === admin.id ? 'true' : 'false'"
                >
                  {{ expandedAdminId === admin.id ? 'Hide Details' : 'View Details' }}
                </button>
              </div>

              <Transition name="collapse">
                <div
                  v-if="expandedAdminId === admin.id"
                  class="pt-3 mt-3 border-t border-dashed border-gray-200 text-sm text-gray-600 space-y-2"
                >
                  <div class="flex items-start justify-between gap-4">
                    <span class="text-gray-500 font-medium">Role</span>
                    <span class="text-gray-900 text-right">{{ admin.role }}</span>
                  </div>
                  <div class="flex items-start justify-between gap-4">
                    <span class="text-gray-500 font-medium">Status</span>
                    <span class="text-right">
                      <span
                        class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold"
                        :class="getStatusClass(admin.status, 'soft')"
                      >
                        {{ admin.status }}
                      </span>
                    </span>
                  </div>
                  <div class="flex items-start justify-between gap-4">
                    <span class="text-gray-500 font-medium">Created</span>
                    <span class="text-gray-900 text-right">{{ formatDate(admin.createdOn) }}</span>
                  </div>
                  <div class="flex items-start justify-between gap-4">
                    <span class="text-gray-500 font-medium">Last Login</span>
                    <span class="text-gray-900 text-right">{{ formatDate(admin.lastLogin) }}</span>
                  </div>
                  <div class="flex items-start justify-between gap-4">
                    <span class="text-gray-500 font-medium">Verified</span>
                    <span class="text-gray-900 text-right">{{ admin.verified ? 'Yes' : 'No' }}</span>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

        <!-- Desktop Table View -->
        <div class="hidden lg:block overflow-x-auto scrollbar-thin">
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
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[160px]">Admin Name</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[200px]">Email</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Role</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Status</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Created On</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Last Login</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap" style="width: 100px;">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr 
                v-for="(admin, index) in paginatedAdmins" 
                :key="admin.id" 
                class="hover:bg-gray-50 active:bg-gray-100 transition"
              >
                <td class="px-4 py-3">
                  <input 
                    type="checkbox" 
                    :checked="admin.selected"
                    @change="toggleSelection(admin)"
                    class="w-5 h-5 rounded border-gray-300 cursor-pointer touch-manipulation" 
                  />
                </td>
                <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ getDisplayIndex(index) }}</td>
                <td class="px-4 py-3 text-gray-900 font-medium text-sm">
                  <div class="flex items-center gap-2">
                    <span class="truncate">{{ admin.name }}</span>
                    <CheckCircleIcon v-if="admin.verified" class="w-4 h-4 text-green-500 flex-shrink-0" />
                  </div>
                </td>
                <td class="px-4 py-3 text-gray-700 text-sm">
                  <span class="truncate block">{{ admin.email }}</span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div 
                    class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-sm"
                    :class="getRoleClass(admin.role)"
                  >
                    <span>{{ admin.role }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div 
                    class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-sm cursor-pointer touch-manipulation"
                    :class="getStatusClass(admin.status)"
                    @click="changeStatus(admin)"
                  >
                    <span>{{ admin.status }}</span>
                    <ChevronDownIcon class="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                  </div>
                </td>
                <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ formatDate(admin.createdOn) }}</td>
                <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ formatDate(admin.lastLogin) }}</td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <EyeIcon 
                      @click="viewAdmin(admin)"
                      class="w-5 h-5 text-yellow-500 cursor-pointer hover:text-yellow-600 active:text-yellow-700 transition touch-manipulation" 
                      title="View admin"
                    />
                    <EditIcon 
                      @click="editAdmin(admin)"
                      class="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-700 transition touch-manipulation"
                      title="Edit admin"
                    />
                    <Trash2Icon 
                      @click="deleteAdmin(admin)"
                      class="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600 active:text-red-700 transition touch-manipulation"
                      title="Delete admin"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="paginatedAdmins.length === 0" class="text-center py-12">
          <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <UsersIcon class="w-8 h-8 text-gray-400" aria-hidden="true" />
          </div>
          <p class="text-gray-500 text-base">No admins found</p>
          <p class="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      </template>
    </div>

    <!-- Pagination - FIFTH ROW -->
    <div class="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 px-3 lg:px-0">
      <p class="text-sm text-gray-600 text-center sm:text-left">
        Showing <span class="font-semibold">{{ paginatedAdmins.length }}</span> of 
        <span class="font-semibold">{{ filteredAdmins.length }}</span> admins (Page {{ currentPage }} of {{ totalPages }})
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

    <DetailModal
      :open="isDetailModalOpen"
      title="Admin Details"
      :items="adminDetailItems"
      @close="closeAdminDetails"
    />
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, watch } from 'vue';
import { 
  Search as SearchIcon,
  Eye as EyeIcon,
  CheckCircle as CheckCircleIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Filter as FilterIcon,
  Users as UsersIcon,
  UserCheck as UserCheckIcon,
  UserX as UserXIcon,
  Shield as ShieldIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  MoreHorizontal
} from 'lucide-vue-next';
import { getStatusClass, getRoleClass } from '~/composables/useStatusClass'
import { useSelection } from '~/composables/useSelection'
import { useStubClient, useStubResource } from '~/services/stubClient'
import DetailModal from '~/components/common/DetailModal.vue'
import { useClientEventListener } from '@/composables/useClientEventListener';

// --- State ---
const showMobileFilters = ref(false);
const searchQuery = ref('');
const admins = ref([]);
const expandedAdminId = ref(null);
const mobileActionsIndex = ref(null);
const isDetailModalOpen = ref(false);
const selectedAdmin = ref(null);
const isMobileView = ref(false);

// Pagination State
const currentPage = ref(1);
const itemsPerPage = 10;

// Filters
const filters = ref({
  dateFrom: '',
  dateTo: '',
  timeRange: '',
  role: '',
  status: ''
});

// Stats
const stats = ref({
  totalAdmins: 0,
  active: 0,
  inactive: 0,
  superAdmins: 0
});

// --- Composables ---
const { allSelected, toggleSelection, toggleAll } = useSelection(admins);
const stubClient = useStubClient()
const nuxtApp = useNuxtApp()

const notifyError = (message) => {
  if (!import.meta.client) return
  try {
    nuxtApp.$awn?.alert(message)
  } catch {}
}

const notifySuccess = (message) => {
  if (!import.meta.client) return
  try {
    nuxtApp.$awn?.success(message)
  } catch {}
}

// --- Data Fetching (SSR-friendly) ---
const { data: adminsData, pending, error: adminsError, refresh } = await useStubResource('admins')
const isLoading = computed(() => pending.value)

// --- Computed ---
const filteredAdmins = computed(() => {
  if (isLoading.value) return [];
  const query = (searchQuery.value || '').toLowerCase();
  const { status, role, dateFrom, dateTo } = filters.value;

  const fromDate = dateFrom ? new Date(dateFrom) : null;
  const toDate = dateTo ? new Date(dateTo) : null;

  return admins.value.filter(admin => {
    const searchMatch = !query || 
      admin.name.toLowerCase().includes(query) || 
      admin.email.toLowerCase().includes(query) ||
      admin.role.toLowerCase().includes(query);
    const statusMatch = !status || admin.status === status;
    const roleMatch = !role || admin.role === role;

    let dateMatch = true;
    if (fromDate || toDate) {
      const adminDate = new Date(admin.createdOn);
      if (fromDate && adminDate < fromDate) dateMatch = false;
      if (toDate && adminDate > toDate) dateMatch = false;
    }

    return searchMatch && statusMatch && roleMatch && dateMatch;
  });
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredAdmins.value.length / itemsPerPage)));

const paginatedAdmins = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredAdmins.value.slice(start, end);
});

const adminDetailItems = computed(() => {
  if (!selectedAdmin.value) return [];
  const admin = selectedAdmin.value;
  return [
    { label: 'Name', value: admin.name },
    { label: 'Email', value: admin.email },
    { label: 'Role', value: admin.role },
    { label: 'Status', value: admin.status },
    { label: 'Verified', value: admin.verified ? 'Yes' : 'No' },
    { label: 'Created On', value: admin.createdOn ? formatDate(admin.createdOn) : '—' },
    { label: 'Last Login', value: admin.lastLogin ? formatDate(admin.lastLogin) : '—' }
  ];
});

// --- Methods ---
const handleFilterChange = () => {
  currentPage.value = 1;
  mobileActionsIndex.value = null;
  expandedAdminId.value = null;
};

const getDisplayIndex = (indexInPage) => {
  const trueIndex = (currentPage.value - 1) * itemsPerPage + indexInPage + 1;
  return String(trueIndex).padStart(2, '0');
};

const toggleSelectAll = () => {
  toggleAll(paginatedAdmins.value);
  mobileActionsIndex.value = null;
};

const toggleMobileActions = (index) => {
  mobileActionsIndex.value = mobileActionsIndex.value === index ? null : index;
};

const viewAdmin = (admin) => {
  mobileActionsIndex.value = null;
  if (isMobileView.value) {
    expandedAdminId.value = expandedAdminId.value === admin.id ? null : admin.id;
    return;
  }

  selectedAdmin.value = admin;
  isDetailModalOpen.value = true;
};

const closeAdminDetails = () => {
  isDetailModalOpen.value = false;
  selectedAdmin.value = null;
};

const editAdmin = async (admin) => {
  // Hook for edit functionality
  // alert(`Editing: ${admin.name}`)
};

const deleteAdmin = async (admin) => {
  // Hook for delete functionality
  if (!confirm(`Are you sure you want to delete ${admin.name}?`)) return;
  try {
    await stubClient.remove('admins', admin.id, { delay: 180 });
    await refresh();
    notifySuccess(`${admin.name} removed`);
    mobileActionsIndex.value = null;
  } catch (error) {
    console.error('Failed to delete admin', error);
    notifyError(`Failed to delete ${admin.name}`);
  }
};

const changeStatus = async (admin) => {
  // Cycle through statuses to demo behavior
  const statuses = ['Active', 'Inactive', 'Suspended'];
  const currentIndex = statuses.indexOf(admin.status);
  const nextIndex = (currentIndex + 1) % statuses.length;
  const nextStatus = statuses[nextIndex];

  try {
    await stubClient.update('admins', admin.id, { status: nextStatus }, { delay: 160 });
    await refresh();
    notifySuccess(`${admin.name} marked as ${nextStatus}`);
    mobileActionsIndex.value = null;
  } catch (error) {
    console.error('Failed to update status', error);
    notifyError(`Failed to update ${admin.name}`);
  }
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
    role: '',
    status: ''
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
  const total = admins.value.length;
  const active = admins.value.filter(u => u.status === 'Active').length;
  const inactive = admins.value.filter(u => u.status === 'Inactive').length;
  const superAdmins = admins.value.filter(u => u.role === 'Super Admin').length;
  
  stats.value = {
    totalAdmins: total,
    active: active,
    inactive: inactive,
    superAdmins: superAdmins
  };
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    mobileActionsIndex.value = null;
    expandedAdminId.value = null;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    mobileActionsIndex.value = null;
    expandedAdminId.value = null;
  }
};

// Populate admins when fetch completes
watchEffect(() => {
  const raw = adminsData?.value || []
  admins.value = raw.map(u => ({ ...u, selected: false }))
  updateStats()
  mobileActionsIndex.value = null
  expandedAdminId.value = null
})

watch(adminsError, (err) => {
  if (err) {
    console.error('Failed to load admins', err);
    notifyError(err?.message || 'Failed to load admin data');
  }
})

const updateViewport = () => {
  if (!import.meta.client) return;
  isMobileView.value = window.innerWidth < 1024;
};

useClientEventListener<Event>(() => window, 'resize', updateViewport, { passive: true, immediate: true });

watch(isMobileView, (isMobile) => {
  if (!isMobile) {
    expandedAdminId.value = null;
  } else {
    isDetailModalOpen.value = false;
  }
  mobileActionsIndex.value = null;
});
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
    z-index: 10; /* below sidebar overlay (z-30) and sidebar (z-40) */
    max-height: 80vh;
    overflow-y: auto;
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

.collapse-enter-active,
.collapse-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>