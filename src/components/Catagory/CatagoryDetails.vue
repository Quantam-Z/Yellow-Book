<template>
  <div class="relative w-full flex flex-col lg:flex-row items-start gap-4 lg:gap-6 p-3 lg:p-5 min-h-screen bg-gray-50 text-center text-[16px] lg:text-[18px] text-dimgray font-plus-jakarta-sans">
    
    <!-- Mobile Header -->
    <div class="lg:hidden w-full flex justify-center items-center mb-4">
      <div class="flex items-center gap-3">
        <div class="relative">
          <button 
            @click="toggleSortDropdown"
            class="flex items-center gap-2 bg-white border border-gainsboro border-solid rounded-[4px] px-4 py-2 hover:border-gray-400 transition-colors text-sm"
          >
            <span class="text-dimgray leading-[160%] capitalize font-medium">Sort</span>
            <div class="flex flex-col gap-0.5 w-3">
              <div class="h-0.5 bg-gray-600 rounded-full w-full"></div>
              <div class="h-0.5 bg-gray-600 rounded-full w-3/4"></div>
              <div class="h-0.5 bg-gray-600 rounded-full w-full"></div>
            </div>
          </button>
          
          <div 
            v-if="showSortOptions"
            class="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-[280px] rounded-[4px] bg-white border border-gainsboro border-solid box-border overflow-hidden flex flex-col items-start z-50 text-center text-dimgray shadow-lg"
          >
            <div class="w-full flex flex-col items-start gap-2">
              <div class="self-stretch bg-ghostwhite flex flex-col items-start p-3 text-left text-[14px] text-darkslategray">
                <div class="self-stretch flex flex-col items-start gap-0.5">
                  <div 
                    v-for="rating in ratings" 
                    :key="rating" 
                    class="self-stretch border-b border-whitesmoke border-solid box-border h-10 flex items-center gap-2 cursor-pointer hover:bg-gray-50"
                    @click="toggleRating(rating)"
                  >
                    <div class="w-5 h-5 relative overflow-hidden shrink-0">
                      <div class="w-full h-full border-2 border-gray-300 rounded-sm bg-white flex items-center justify-center">
                        <div class="w-3.5 h-3.5 border border-gray-400 rounded-xs bg-white flex items-center justify-center">
                          <div 
                            v-if="filters.ratings.has(parseInt(rating))" 
                            class="w-2 h-2 bg-blue-500 rounded-xs"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div class="relative leading-[130%] capitalize font-medium text-sm">{{ rating }} star</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          @click="showMobileFilters = !showMobileFilters"
          class="flex items-center gap-2 bg-white border border-gainsboro border-solid rounded-[4px] px-4 py-2 text-sm"
        >
          <span>Filters</span>
          <svg class="w-4 h-4 transition-transform" :class="{'rotate-180': showMobileFilters}" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </button>
      </div>
    </div>

    <!-- Sidebar Filters -->
    <div 
      class="w-full lg:w-[382px] shadow-[4px_4px_19px_rgba(158,_158,_158,_0.05)] rounded-[4px] bg-white border border-gainsboro border-solid box-border flex flex-col items-start p-4 lg:p-5 gap-4 lg:gap-5 transition-all duration-300"
      :class="{
        'hidden lg:flex': !showMobileFilters,
        'flex': showMobileFilters
      }"
    >
      
      <div class="lg:hidden w-full flex items-center gap-3 mb-2">
        <div class="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
          <span class="text-sm">📁</span>
        </div>
        <div class="text-xl font-bold text-gray-800 capitalize">
          {{ currentCategory?.name || 'Loading...' }}
        </div>
      </div>

      <!-- Price Range Filter -->
      <div class="self-stretch rounded-lg bg-white border border-gainsboro border-solid flex flex-col items-start p-3 lg:p-[10px] relative gap-4">
        <div class="w-full flex items-center justify-between gap-0 z-[0]">
          <div class="relative leading-[160%] capitalize font-medium text-sm lg:text-base">Price range (consultation)</div>
          <svg class="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </div>
        <div class="self-stretch flex flex-col items-start gap-4 z-[1] text-left text-[14px] lg:text-[16px] text-gray-500">
          <div class="self-stretch flex items-center justify-between gap-0">
            <div class="w-[34px] relative leading-[160%] capitalize font-medium inline-block shrink-0">{{ minPrice }}$</div>
            <div class="relative leading-[160%] capitalize font-medium text-right">{{ maxPrice }}$</div>
          </div>
          <div class="self-stretch relative px-2">
            <input 
              type="range" 
              :min="minPrice" 
              :max="maxPrice" 
              v-model="currentPrice"
              @input="handlePriceChange"
              class="w-full relative max-w-full overflow-hidden h-[18px] shrink-0 custom-slider"
              :style="{'--progress': `${((currentPrice - minPrice) / (maxPrice - minPrice)) * 100}%`}"
            />
            <div class="w-8 absolute top-[-25px] left-1/2 transform -translate-x-1/2 shadow-[0px_2px_4px_rgba(0,_0,_0,_0.1)] flex flex-col items-center z-[2] text-[12px] text-yellow-500">
              <div class="self-stretch rounded-[4px] bg-white flex items-center justify-center p-1">
                <b class="relative leading-[170%] capitalize">{{ currentPrice }}</b>
              </div>
              <div class="w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-yellow-500 -mt-0.5"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Emergency Service Filter -->
      <div v-if="currentCategory?.filters?.emergencyService" class="self-stretch bg-white border border-gainsboro border-solid flex flex-col items-start p-3 lg:p-[10px] gap-4 lg:gap-6">
        <div class="relative leading-[160%] capitalize font-medium text-sm lg:text-base">Emergency Service Available</div>
        <div class="flex items-center gap-4 lg:gap-[22px] text-[14px] lg:text-[16px] text-gray-500">
          <div class="flex items-center gap-2 cursor-pointer" @click="setEmergencyService(true)">
            <div class="w-5 h-5 lg:w-6 lg:h-6 border-2 border-black rounded-full bg-white flex items-center justify-center">
              <div :class="['w-3 h-3 rounded-full transition-colors', filters.emergencyService === true ? 'bg-black' : 'bg-transparent']"></div>
            </div>
            <div class="relative leading-[160%] capitalize font-medium">Yes</div>
          </div>
          <div class="flex items-center gap-2 cursor-pointer" @click="setEmergencyService(false)">
            <div class="w-5 h-5 lg:w-6 lg:h-6 border-2 border-black rounded-full bg-white flex items-center justify-center">
              <div :class="['w-3 h-3 rounded-full transition-colors', filters.emergencyService === false ? 'bg-black' : 'bg-transparent']"></div>
            </div>
            <div class="relative leading-[160%] capitalize font-medium">No</div>
          </div>
        </div>
      </div>

      <!-- Service Types Filter -->
      <div v-if="currentCategory?.filters?.serviceTypes" class="self-stretch rounded-[4px] border border-gainsboro border-solid flex flex-col items-start p-3 lg:p-[10px] gap-2">
        <div class="w-full flex items-center justify-between gap-0">
          <div class="relative leading-[160%] capitalize font-medium text-sm lg:text-base">{{ currentCategory.filters.serviceTypes.label }}</div>
          <div class="w-5 h-5 lg:w-6 lg:h-6 relative text-gray-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
        </div>
        <div class="self-stretch bg-ghostwhite flex flex-col items-start p-3 lg:p-[10px] relative text-left text-[14px] lg:text-[16px] text-darkslategray max-h-64 overflow-y-auto">
          <div class="self-stretch flex flex-col items-start gap-0.5 z-[0]">
            <div 
              v-for="service in currentCategory.filters.serviceTypes.options" 
              :key="service" 
              class="self-stretch border-b border-whitesmoke border-solid box-border h-10 flex items-center gap-2 cursor-pointer transition-colors hover:bg-gray-100"
              @click="toggleService(service)"
            >
              <div class="w-5 h-5 lg:w-6 lg:h-6 relative overflow-hidden shrink-0">
                <div class="w-full h-full border-2 border-gray-300 rounded-sm bg-white flex items-center justify-center transition-colors">
                  <div class="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5 border border-gray-400 rounded-xs bg-white flex items-center justify-center transition-colors">
                    <div v-if="filters.services.has(service)" class="w-3 h-3 flex items-center justify-center transition-all duration-200">
                      <svg viewBox="0 0 24 24" class="w-3 h-3 text-black" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="relative leading-[130%] capitalize font-medium text-sm lg:text-base">{{ service }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Specializations Filter -->
      <div v-if="currentCategory?.filters?.specializations" class="self-stretch rounded-[4px] border border-gainsboro border-solid flex flex-col items-start p-3 lg:p-[10px] gap-2">
        <div class="w-full flex items-center justify-between gap-0">
          <div class="relative leading-[160%] capitalize font-medium text-sm lg:text-base">{{ currentCategory.filters.specializations.label }}</div>
          <svg class="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </div>
        <div class="self-stretch bg-ghostwhite flex flex-col items-start p-3 lg:p-[10px] relative text-left text-[14px] lg:text-[16px] text-darkslategray max-h-64 overflow-y-auto">
          <div class="self-stretch flex flex-col items-start gap-0.5 z-[0]">
            <div 
              v-for="specialization in currentCategory.filters.specializations.options" 
              :key="specialization" 
              class="self-stretch border-b border-whitesmoke border-solid box-border h-10 flex items-center gap-2 cursor-pointer transition-colors hover:bg-gray-100"
              @click="toggleSpecialization(specialization)"
            >
              <div class="w-5 h-5 lg:w-6 lg:h-6 relative overflow-hidden shrink-0">
                <div class="w-full h-full border-2 border-gray-300 rounded-sm bg-white flex items-center justify-center transition-colors">
                  <div class="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5 border border-gray-400 rounded-xs bg-white flex items-center justify-center transition-colors">
                    <div v-if="filters.specializations.has(specialization)" class="w-3 h-3 flex items-center justify-center transition-all duration-200">
                      <svg viewBox="0 0 24 24" class="w-3 h-3 text-black" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="relative leading-[130%] capitalize font-medium text-sm lg:text-base">{{ specialization }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Apply Filters Button -->
      <div v-if="showMobileFilters" class="lg:hidden w-full flex gap-3 mt-4">
        <button 
          @click="applyMobileFilters"
          class="flex-1 bg-blue-500 text-white rounded-[4px] py-3 font-medium hover:bg-blue-600 transition-colors"
        >
          Apply Filters
        </button>
        <button 
          @click="clearAllFilters"
          class="flex-1 bg-gray-500 text-white rounded-[4px] py-3 font-medium hover:bg-gray-600 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="w-full lg:w-[792px] flex flex-col items-center relative gap-4 lg:gap-5 text-left text-darkslategray">
      
      <!-- Desktop Header -->
      <div class="hidden lg:flex w-full justify-between items-center mb-4 lg:mb-5">
        <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-2">
          <div 
            v-for="filter in activeFiltersDisplay" 
            :key="`${filter.type}-${filter.value}`"
            :class="['rounded-full px-3 py-1 text-sm flex items-center gap-2 border', getStatusClass(filter.type)]"
          >
            {{ filter.label }}
            <button @click="removeActiveFilter(filter.type, filter.value)" class="hover:opacity-70 transition-opacity">×</button>
          </div>
          <button 
            @click="clearAllFilters"
            class="bg-red-100 text-red-800 rounded-full px-3 py-1 text-sm hover:bg-red-200 transition-colors border border-red-200"
          >
            Clear All
          </button>
        </div>
        
        <div class="relative flex-shrink-0">
          <button 
            @click="toggleSortDropdown"
            class="flex items-center gap-2 bg-white border border-gainsboro border-solid rounded-[4px] px-4 py-2 hover:border-gray-400 transition-colors"
          >
            <span class="text-dimgray leading-[160%] capitalize font-medium">Sort</span>
            <div class="flex flex-col gap-0.5 w-4">
              <div class="h-0.5 bg-gray-600 rounded-full w-full"></div>
              <div class="h-0.5 bg-gray-600 rounded-full w-3/4"></div>
              <div class="h-0.5 bg-gray-600 rounded-full w-full"></div>
            </div>
          </button>
          
          <div 
            v-if="showSortOptions"
            class="absolute top-full right-0 mt-1 w-[342px] rounded-[4px] bg-white border border-gainsboro border-solid box-border overflow-hidden flex flex-col items-start z-50 text-center text-dimgray shadow-lg"
          >
            <div class="w-full flex flex-col items-start gap-2">
              <div class="self-stretch bg-ghostwhite flex flex-col items-start p-[10px] text-left text-[16px] text-darkslategray">
                <div class="self-stretch flex flex-col items-start gap-0.5">
                  <div 
                    v-for="rating in ratings" 
                    :key="rating" 
                    class="self-stretch border-b border-whitesmoke border-solid box-border h-10 flex items-center gap-1 cursor-pointer hover:bg-gray-50"
                    @click="toggleRating(rating)"
                  >
                    <div class="w-6 relative h-6 overflow-hidden shrink-0">
                      <div class="w-full h-full border-2 border-gray-300 rounded-sm bg-white flex items-center justify-center">
                        <div class="w-4.5 h-4.5 border border-gray-400 rounded-xs bg-white flex items-center justify-center">
                          <div 
                            v-if="filters.ratings.has(parseInt(rating))" 
                            class="w-3 h-3 bg-blue-500 rounded-xs transition-all duration-200"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div class="relative leading-[130%] capitalize font-medium">{{ rating }} star</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Active Filters -->
      <div v-if="hasActiveFilters" class="lg:hidden w-full flex flex-wrap gap-2 mb-4">
        <div 
          v-for="filter in activeFiltersDisplay" 
          :key="`${filter.type}-${filter.value}`"
          :class="['rounded-full px-3 py-1 text-sm flex items-center gap-2 border', getStatusClass(filter.type)]"
        >
          {{ filter.label }}
          <button @click="removeActiveFilter(filter.type, filter.value)" class="hover:opacity-70 transition-opacity">×</button>
        </div>
        <button 
          @click="clearAllFilters"
          class="bg-red-100 text-red-800 rounded-full px-3 py-1 text-sm hover:bg-red-200 transition-colors border border-red-200"
        >
          Clear All
        </button>
      </div>
      
      <!-- Listings Container -->
      <div class="w-full space-y-4">
        <div 
          v-for="listing in paginatedListings" 
          :key="listing.id" 
          class="self-stretch rounded-[4px] bg-white border border-gainsboro border-solid flex flex-col items-start p-4 lg:p-5"
        >
          <div class="self-stretch flex flex-col lg:flex-row items-start gap-4 lg:gap-[18px]">
            <div class="self-stretch lg:w-[206px] relative rounded-[4px] border border-whitesmoke border-solid border-[1.5px] box-border overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center h-40 lg:h-auto">
              <div class="w-16 h-16 lg:w-20 lg:h-20 bg-gray-300 rounded"></div>
            </div>
            
            <div class="flex-1 flex flex-col items-start gap-4 lg:gap-[18px] w-full">
              <div class="self-stretch flex flex-col items-start gap-3 lg:gap-[15px]">
                <div class="self-stretch flex flex-col lg:flex-row items-start gap-3 lg:gap-[15px]">
                  <div class="flex-1 flex flex-col items-start gap-3 lg:gap-[15px]">
                    <div class="self-stretch relative leading-[130%] capitalize font-medium text-lg lg:text-xl">{{ listing.name }}</div>
                    <div class="self-stretch flex items-center gap-0.5">
                      <svg 
                        v-for="star in 5" 
                        :key="star"
                        class="w-5 h-5 lg:w-6 lg:h-6 rounded-xs" 
                        viewBox="0 0 24 24" 
                        :fill="star <= listing.rating ? '#ffc107' : 'none'" 
                        stroke="#ffc107"
                      >
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                      </svg>
                    </div>
                  </div>
                  <svg class="h-5 w-5 lg:h-6 lg:w-6 text-gray-500 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                  </svg>
                </div>
                
                <div class="self-stretch flex flex-col items-start gap-2 lg:gap-1 text-[13px] lg:text-[14px] text-darkgray">
                  <div class="self-stretch flex flex-col items-start">
                    <div class="self-stretch flex items-center gap-2">
                      <svg class="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="m2,12 c3,5.5 7,9 10,9 s7,-3.5 10,-9"></path>
                        <path d="m2,12 c3,-5.5 7,-9 10,-9 s7,3.5 10,9"></path>
                      </svg>
                      <div class="relative leading-[170%] capitalize font-medium">{{ listing.website }}</div>
                    </div>
                  </div>
                  <div class="self-stretch flex items-center gap-2">
                    <svg class="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <div class="relative leading-[170%] capitalize font-medium">{{ listing.location }}</div>
                  </div>
                  <div class="self-stretch flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-2">
                    <div class="flex items-center gap-2 flex-1">
                      <svg class="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                      <div class="relative leading-[170%] capitalize font-medium">{{ listing.revenue }}</div>
                    </div>
                    <div class="rounded-[2px] bg-yellow-100 border border-yellow-400 flex items-center justify-center p-1 text-[11px] lg:text-[12px] text-gray-800">
                      <div class="relative leading-[170%] capitalize font-medium">Annual Revenue</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="self-stretch relative border border-gainsboro border-solid border-t-[1px] box-border h-px"></div>
              
              <div class="self-stretch flex flex-col lg:flex-row items-center gap-3 lg:gap-[25px] text-[14px] lg:text-[16px] text-darkgray">
                <div class="flex-1 rounded-[4px] bg-ghostwhite border border-whitesmoke border-solid flex items-center justify-between py-2 lg:py-1 px-3 lg:px-2 gap-0 w-full">
                  <div class="flex items-center gap-1">
                    <svg class="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400" viewBox="0 0 24 24" fill="#ffc107" stroke="#ffc107">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                    </svg>
                    <div class="relative leading-[160%] capitalize font-medium">Rating</div>
                  </div>
                  <div class="relative leading-[160%] capitalize font-medium text-gray-800">{{ listing.ratingCount }}</div>
                </div>
                <div class="flex-1 rounded-[4px] bg-ghostwhite border border-whitesmoke border-solid flex items-center justify-between py-2 lg:py-1 px-3 lg:px-2 gap-0 w-full">
                  <div class="flex items-center gap-1">
                    <svg class="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
                    </svg>
                    <div class="relative leading-[160%] capitalize font-medium">Comment</div>
                  </div>
                  <div class="relative leading-[160%] capitalize font-medium text-gray-800">{{ listing.comments }}</div>
                </div>
                <div class="flex-1 rounded-[4px] bg-ghostwhite border border-whitesmoke border-solid box-border h-8 lg:h-8 flex items-center justify-center py-2 lg:py-1 px-3 lg:px-2 text-sky-500 cursor-pointer w-full">
                  <div class="relative leading-[160%] capitalize font-medium">...More</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="w-full flex items-center justify-center py-8 lg:py-10">
        <div class="text-base lg:text-lg text-gray-500">Loading category data...</div>
      </div>

      <!-- No Results State -->
      <div v-if="!loading && currentCategory && displayedListings.length === 0" class="w-full flex flex-col items-center justify-center py-8 lg:py-10 gap-4">
        <div class="text-base lg:text-lg text-gray-500">No listings found matching your filters</div>
        <button 
          @click="clearAllFilters"
          class="bg-red-500 text-white rounded-[4px] px-4 py-2 text-sm hover:bg-red-600 transition-colors"
        >
          Clear Filters
        </button>
      </div>

      <!-- Pagination -->
      <div class="w-full flex items-center justify-center mt-4" v-if="totalPages > 1">
        <Pagination v-model="currentPage" :totalPages="totalPages" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import Pagination from '@/components/common/Pagination.vue';
import { categoryService } from '@/services/categoryService';
import { useListingsFilter } from '@/composables/useListingsFilter';
import { getStatusClass } from '@/utils/filterUtils';

export default {
  name: 'CategoryPage',
  components: { Pagination },
  
  setup() {
    const route = useRoute();
    const currentCategory = ref(null);
    const allListings = ref([]);
    const loading = ref(true);
    
    const minPrice = ref(10);
    const maxPrice = ref(500);
    const currentPrice = ref(240);
    const showSortOptions = ref(false);
    const showMobileFilters = ref(false);
    
    const ratings = ['1', '2', '3', '4', '5'];

    // Use optimized filtering composable
    const { filters, filteredListings, toggleFilter, removeFilter, clearFilters } = useListingsFilter(allListings);

    // All computed properties in component - NO external utils that cause errors
    const hasActiveFilters = computed(() => {
      const f = filters.value;
      return f.services.size > 0 ||
             f.specializations.size > 0 ||
             f.ratings.size > 0 ||
             f.emergencyService !== null ||
             f.maxPrice < Infinity;
    });

    const activeFiltersDisplay = computed(() => {
      const f = filters.value;
      const activeFilters = [];
      
      f.services.forEach(service => {
        activeFilters.push({ type: 'service', value: service, label: service });
      });
      
      f.specializations.forEach(spec => {
        activeFilters.push({ type: 'specialization', value: spec, label: spec });
      });
      
      f.ratings.forEach(rating => {
        activeFilters.push({ type: 'rating', value: rating, label: `${rating} star` });
      });
      
      if (f.emergencyService !== null) {
        activeFilters.push({ 
          type: 'emergency', 
          value: f.emergencyService, 
          label: `Emergency: ${f.emergencyService ? 'Yes' : 'No'}` 
        });
      }
      
      if (f.maxPrice < Infinity) {
        activeFilters.push({ 
          type: 'price', 
          value: f.maxPrice, 
          label: `Max: $${f.maxPrice}` 
        });
      }
      if (f.query) {
        activeFilters.push({
          type: 'query',
          value: f.query,
          label: `Search: ${f.query}`
        });
      }
      
      return activeFilters;
    });

    const displayedListings = computed(() => 
      hasActiveFilters.value ? filteredListings.value : allListings.value
    );

    // Pagination state driven by route
    const pageSize = ref(5);
    const currentPage = ref(1);
    const totalItems = computed(() => displayedListings.value.length);
    const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / pageSize.value)));
    const paginatedListings = computed(() => {
      // Clamp current page when totalPages decreases
      if (currentPage.value > totalPages.value) currentPage.value = totalPages.value;
      if (currentPage.value < 1) currentPage.value = 1;
      const start = (currentPage.value - 1) * pageSize.value;
      return displayedListings.value.slice(start, start + pageSize.value);
    });

    const syncFromRoute = () => {
      const q = typeof route.query.q === 'string' ? route.query.q : '';
      if (q !== filters.value.query) toggleFilter('query', q);
      const page = parseInt(String(route.query.page || '1'));
      currentPage.value = Number.isFinite(page) && page > 0 ? page : 1;
    };
    syncFromRoute();

    // Load category data
    const setCategoryFromURL = () => {
      loading.value = true;
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryName = urlParams.get('name');
        
        currentCategory.value = categoryService.getCategoryByName(categoryName);
        allListings.value = categoryService.getListingsByCategory(categoryName);
      } catch (error) {
        console.error('Error loading category data:', error);
        currentCategory.value = categoryService.getDefaultCategory();
        allListings.value = [];
      } finally {
        loading.value = false;
      }
    };

    // Methods
    const handlePriceChange = () => {
      toggleFilter('maxPrice', currentPrice.value);
      currentPage.value = 1;
    };

    const setEmergencyService = (value) => {
      toggleFilter('emergencyService', value);
      if (showMobileFilters.value) {
        showMobileFilters.value = false;
      }
      currentPage.value = 1;
    };

    const toggleService = (service) => {
      toggleFilter('services', service);
      if (showMobileFilters.value) {
        showMobileFilters.value = false;
      }
      currentPage.value = 1;
    };

    const toggleSpecialization = (specialization) => {
      toggleFilter('specializations', specialization);
      if (showMobileFilters.value) {
        showMobileFilters.value = false;
      }
      currentPage.value = 1;
    };

    const toggleRating = (rating) => {
      toggleFilter('ratings', parseInt(rating));
      showSortOptions.value = false;
      currentPage.value = 1;
    };

    const removeActiveFilter = (type, value) => {
      removeFilter(type, value);
      if (type === 'maxPrice') {
        currentPrice.value = maxPrice.value;
      }
    };

    const clearAllFilters = () => {
      clearFilters();
      currentPrice.value = maxPrice.value;
      showMobileFilters.value = false;
      // also clear query and reset pagination in route
      const next = { ...route.query };
      delete next.q;
      delete next.page;
      navigateTo({ query: next }, { replace: true });
    };

    const toggleSortDropdown = (event) => {
      if (event) event.stopPropagation();
      showSortOptions.value = !showSortOptions.value;
    };

    const applyMobileFilters = () => {
      showMobileFilters.value = false;
      currentPage.value = 1;
    };

    const handleClickOutside = (event) => {
      if (showSortOptions.value && !event.target.closest('.relative')) {
        showSortOptions.value = false;
      }
    };

    // Lifecycle
    onMounted(() => {
      setCategoryFromURL();
      document.addEventListener('click', handleClickOutside);
      syncFromRoute();
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    // Watch for route changes
    watch(
      () => route.query,
      () => {
        setCategoryFromURL();
        syncFromRoute();
      },
      { deep: true }
    );

    // keep route query.page in sync with currentPage changes
    watch(currentPage, (val) => {
      const next = { ...route.query, page: String(val) };
      navigateTo({ query: next }, { replace: true });
    });

    return {
      currentCategory,
      loading,
      minPrice,
      maxPrice,
      currentPrice,
      showSortOptions,
      showMobileFilters,
      ratings,
      hasActiveFilters,
      activeFiltersDisplay,
      displayedListings,
      paginatedListings,
      currentPage,
      totalPages,
      filters,
      handlePriceChange,
      setEmergencyService,
      toggleService,
      toggleSpecialization,
      toggleRating,
      removeActiveFilter,
      clearAllFilters,
      toggleSortDropdown,
      applyMobileFilters,
      getStatusClass
    };
  }
};
</script>

<style scoped>
.custom-slider {
  background: linear-gradient(to right, #fcc207 0%, #fcc207 var(--progress, 50%), #e0e0e0 var(--progress, 50%), #e0e0e0 100%);
  border-radius: 9px;
  border: none;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

.custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fcc207;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.custom-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fcc207;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.bg-ghostwhite {
  background-color: #f6fafd;
}
.border-gainsboro {
  border-color: #e0e0e0;
}
.border-whitesmoke {
  border-color: #eee;
}
.text-dimgray {
  color: #616161;
}
.text-darkslategray {
  color: #424242;
}
.text-darkgray {
  color: #9e9e9e;
}

@media (max-width: 1024px) {
  .rotate-180 {
    transform: rotate(180deg);
  }
}
</style>