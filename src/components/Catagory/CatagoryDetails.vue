<template>
  <div class="relative w-full flex flex-col lg:flex-row items-start gap-4 lg:gap-6 p-3 lg:p-5 min-h-screen bg-gray-50 text-center text-[16px] lg:text-[18px] text-dimgray font-plus-jakarta-sans">
    
    <!-- Mobile Header - Filters and Sort in Same Row -->
    <div class="lg:hidden w-full flex justify-between items-center mb-4">
      <div class="flex items-center gap-3">
        <component 
          :is="currentCategory?.icon" 
          :class="['w-6 h-6', currentCategory?.color || 'text-black']" 
        />
        <div class="text-xl font-bold text-gray-800 capitalize">
          {{ currentCategory?.name || 'Loading...' }}
        </div>
      </div>
      <div class="flex items-center gap-2">
        <!-- Sort Button -->
        <div class="relative">
          <button 
            @click="toggleSortDropdown"
            class="flex items-center gap-2 bg-white border border-gainsboro border-solid rounded-[4px] px-3 py-2 hover:border-gray-400 transition-colors text-sm"
          >
            <span class="text-dimgray leading-[160%] capitalize font-medium">Sort</span>
            <div class="flex flex-col gap-0.5 w-3">
              <div class="h-0.5 bg-gray-600 rounded-full w-full"></div>
              <div class="h-0.5 bg-gray-600 rounded-full w-3/4"></div>
              <div class="h-0.5 bg-gray-600 rounded-full w-full"></div>
            </div>
          </button>
          
          <!-- Mobile Sort Dropdown -->
          <div 
            v-if="showSortOptions"
            class="absolute top-full right-0 mt-1 w-[280px] rounded-[4px] bg-white border border-gainsboro border-solid box-border overflow-hidden flex flex-col items-start z-[4] text-center text-dimgray shadow-lg"
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
                            v-if="selectedRatings.includes(rating)" 
                            class="w-2 h-2 bg-blue-500 rounded-xs"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div class="relative leading-[130%] capitalize font-medium text-sm">{{ rating }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Filter Toggle Button -->
        <button 
          @click="showMobileFilters = !showMobileFilters"
          class="flex items-center gap-2 bg-white border border-gainsboro border-solid rounded-[4px] px-3 py-2 text-sm"
        >
          <span>Filters</span>
          <svg class="w-4 h-4" :class="{'rotate-180': showMobileFilters}" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
              class="w-full relative max-w-full overflow-hidden h-[18px] shrink-0"
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
            <div class="w-5 h-5 lg:w-6 lg:h-6 border-2 border-gray-300 rounded-full bg-white flex items-center justify-center">
              <div :class="['w-3 h-3 rounded-full transition-colors', emergencyService === true ? 'bg-yellow-400' : 'bg-transparent']"></div>
            </div>
            <div class="relative leading-[160%] capitalize font-medium">Yes</div>
          </div>
          <div class="flex items-center gap-2 cursor-pointer" @click="setEmergencyService(false)">
            <div class="w-5 h-5 lg:w-6 lg:h-6 border-2 border-gray-300 rounded-full bg-white flex items-center justify-center">
              <div :class="['w-3 h-3 rounded-full transition-colors', emergencyService === false ? 'bg-yellow-400' : 'bg-transparent']"></div>
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
        <div class="self-stretch bg-ghostwhite flex flex-col items-start p-3 lg:p-[10px] relative text-left text-[14px] lg:text-[16px] text-darkslategray">
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
                    <div 
                      v-if="selectedServices.includes(service)" 
                      class="w-3 h-3 bg-blue-500 rounded-xs transition-all duration-200"
                    ></div>
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
        <div class="self-stretch bg-ghostwhite flex flex-col items-start p-3 lg:p-[10px] relative text-left text-[14px] lg:text-[16px] text-darkslategray">
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
                    <div 
                      v-if="selectedSpecializations.includes(specialization)" 
                      class="w-3 h-3 bg-blue-500 rounded-xs transition-all duration-200"
                    ></div>
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
      
      <!-- Desktop Header with Sort and Clear Filters in Same Line -->
      <div class="hidden lg:flex w-full justify-between items-center mb-4 lg:mb-5">
        <!-- Active Filters Display -->
        <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-2">
          <div 
            v-for="service in selectedServices" 
            :key="'service-' + service"
            class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm flex items-center gap-2"
          >
            {{ service }}
            <button @click="removeService(service)" class="text-blue-600 hover:text-blue-800">×</button>
          </div>
          <div 
            v-for="specialization in selectedSpecializations" 
            :key="'spec-' + specialization"
            class="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm flex items-center gap-2"
          >
            {{ specialization }}
            <button @click="removeSpecialization(specialization)" class="text-green-600 hover:text-green-800">×</button>
          </div>
          <div 
            v-if="emergencyService !== null"
            class="bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-sm flex items-center gap-2"
          >
            Emergency: {{ emergencyService ? 'Yes' : 'No' }}
            <button @click="emergencyService = null" class="text-yellow-600 hover:text-yellow-800">×</button>
          </div>
          <div 
            v-if="selectedRatings.length > 0"
            class="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm flex items-center gap-2"
          >
            Ratings: {{ selectedRatings.join(', ') }}
            <button @click="selectedRatings = []" class="text-purple-600 hover:text-purple-800">×</button>
          </div>
          <button 
            @click="clearAllFilters"
            class="bg-red-100 text-red-800 rounded-full px-3 py-1 text-sm hover:bg-red-200 transition-colors"
          >
            Clear All
          </button>
        </div>
        
        <!-- Sort Filter -->
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
          
          <!-- Desktop Sort Dropdown -->
          <div 
            v-if="showSortOptions"
            class="absolute top-full right-0 mt-1 w-[342px] rounded-[4px] bg-white border border-gainsboro border-solid box-border overflow-hidden flex flex-col items-start z-[4] text-center text-dimgray shadow-lg"
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
                            v-if="selectedRatings.includes(rating)" 
                            class="w-3 h-3 bg-blue-500 rounded-xs transition-all duration-200"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div class="relative leading-[130%] capitalize font-medium">{{ rating }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Active Filters Display -->
      <div v-if="hasActiveFilters" class="lg:hidden w-full flex flex-wrap gap-2 mb-4">
        <div 
          v-for="service in selectedServices" 
          :key="'service-' + service"
          class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm flex items-center gap-2"
        >
          {{ service }}
          <button @click="removeService(service)" class="text-blue-600 hover:text-blue-800">×</button>
        </div>
        <div 
          v-for="specialization in selectedSpecializations" 
          :key="'spec-' + specialization"
          class="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm flex items-center gap-2"
        >
          {{ specialization }}
          <button @click="removeSpecialization(specialization)" class="text-green-600 hover:text-green-800">×</button>
        </div>
        <div 
          v-if="emergencyService !== null"
          class="bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-sm flex items-center gap-2"
        >
          Emergency: {{ emergencyService ? 'Yes' : 'No' }}
          <button @click="emergencyService = null" class="text-yellow-600 hover:text-yellow-800">×</button>
        </div>
        <div 
          v-if="selectedRatings.length > 0"
          class="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm flex items-center gap-2"
        >
          Ratings: {{ selectedRatings.join(', ') }}
          <button @click="selectedRatings = []" class="text-purple-600 hover:text-purple-800">×</button>
        </div>
        <button 
          @click="clearAllFilters"
          class="bg-red-100 text-red-800 rounded-full px-3 py-1 text-sm hover:bg-red-200 transition-colors"
        >
          Clear All
        </button>
      </div>
      
      <!-- Dynamic Service Listings -->
      <div 
        v-for="(listing, index) in displayedListings" 
        :key="listing.id" 
        class="self-stretch rounded-[4px] bg-white border border-gainsboro border-solid flex flex-col items-start p-4 lg:p-5"
      >
        <div class="self-stretch flex flex-col lg:flex-row items-start gap-4 lg:gap-[18px]">
          <!-- Listing Image -->
          <div class="self-stretch lg:w-[206px] relative rounded-[4px] border border-whitesmoke border-solid border-[1.5px] box-border overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center h-40 lg:h-auto">
            <div class="w-16 h-16 lg:w-20 lg:h-20 bg-gray-300 rounded"></div>
          </div>
          
          <!-- Listing Content -->
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
              
              <!-- Listing Details -->
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
            
            <!-- Stats Section -->
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

      <!-- Loading State -->
      <div v-if="!currentCategory" class="w-full flex items-center justify-center py-8 lg:py-10">
        <div class="text-base lg:text-lg text-gray-500">Loading category data...</div>
      </div>

      <!-- No Results State -->
      <div v-if="currentCategory && displayedListings.length === 0" class="w-full flex items-center justify-center py-8 lg:py-10">
        <div class="text-base lg:text-lg text-gray-500">No listings found matching your filters</div>
        <button 
          @click="clearAllFilters"
          class="ml-4 bg-red-500 text-white rounded-[4px] px-4 py-2 text-sm hover:bg-red-600 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { categoryData, defaultCategoryData, allListings } from '@/js/categoryData.js';

export default {
  name: 'CategoryPage',
  data() {
    return {
      minPrice: 10,
      maxPrice: 500,
      currentPrice: 240,
      emergencyService: null,
      showSortOptions: false,
      showMobileFilters: false,
      selectedServices: [],
      selectedSpecializations: [],
      selectedRatings: [],
      
      ratings: [
        '1 star', 
        '2 Star', 
        '3 star', 
        '4 star', 
        '5 star'
      ],
      
      categories: categoryData,
      allListings: allListings,
      currentCategory: null
    }
  },
  
  computed: {
    hasActiveFilters() {
      return this.selectedServices.length > 0 || 
             this.selectedSpecializations.length > 0 || 
             this.emergencyService !== null ||
             this.selectedRatings.length > 0 ||
             this.currentPrice < this.maxPrice;
    },

    categoryListings() {
      if (!this.currentCategory) return [];
      // Cache the category listings to avoid recalculating
      return this.allListings.filter(listing => listing.category === this.currentCategory.name);
    },
    
    filteredListings() {
      if (!this.currentCategory) return [];
      
      // Use the cached category listings
      return this.categoryListings.filter(listing => {
        // Service type filter
        if (this.selectedServices.length > 0 && !this.selectedServices.includes(listing.serviceType)) {
          return false;
        }
        
        // Specialization filter
        if (this.selectedSpecializations.length > 0 && !this.selectedSpecializations.includes(listing.specialization)) {
          return false;
        }
        
        // Emergency service filter
        if (this.emergencyService !== null && listing.emergencyService !== this.emergencyService) {
          return false;
        }
        
        // Price filter (only apply if price is changed from default)
        if (this.currentPrice < this.maxPrice && listing.price > this.currentPrice) {
          return false;
        }
        
        // Rating filter
        if (this.selectedRatings.length > 0) {
          const ratingText = `${listing.rating} star`;
          if (!this.selectedRatings.includes(ratingText)) {
            return false;
          }
        }
        
        return true;
      });
    },

    displayedListings() {
      // Show filtered results only when filters are active, otherwise show all category listings
      return this.hasActiveFilters ? this.filteredListings : this.categoryListings;
    }
  },
  
  mounted() {
    this.setCategoryFromURL();
    document.addEventListener('click', this.handleClickOutside);
  },
  
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  
  watch: {
    '$route': 'setCategoryFromURL'
  },
  
  methods: {
    setCategoryFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryName = urlParams.get('name');
      
      if (categoryName && this.categories) {
        const decodedCategoryName = decodeURIComponent(categoryName).replace(/\+/g, ' ');
        
        const foundCategory = this.categories.find(cat => 
          cat.name.toLowerCase() === decodedCategoryName.toLowerCase() ||
          this.normalizeCategoryName(cat.name) === this.normalizeCategoryName(decodedCategoryName)
        );
        
        this.currentCategory = foundCategory || defaultCategoryData;
      } else {
        this.currentCategory = this.categories?.[0] || defaultCategoryData;
      }
      
      // Reset filters when category changes
      this.selectedServices = [];
      this.selectedSpecializations = [];
      this.emergencyService = null;
      this.currentPrice = 240;
      this.selectedRatings = [];
    },
    
    normalizeCategoryName(name) {
      if (!name) return '';
      return name.toLowerCase().replace(/[&\s+]/g, '');
    },
    
    toggleSortDropdown(event) {
      if (event) {
        event.stopPropagation();
      }
      this.showSortOptions = !this.showSortOptions;
    },
    
    handleClickOutside(event) {
      if (this.showSortOptions) {
        this.showSortOptions = false;
      }
    },
    
    setEmergencyService(value) {
      this.emergencyService = value;
      // Auto-apply filter
      if (this.showMobileFilters) {
        this.showMobileFilters = false;
      }
    },
    
    toggleService(service) {
      const index = this.selectedServices.indexOf(service);
      if (index > -1) {
        this.selectedServices.splice(index, 1);
      } else {
        this.selectedServices.push(service);
      }
      // Auto-apply filter on mobile
      if (this.showMobileFilters) {
        this.showMobileFilters = false;
      }
    },
    
    removeService(service) {
      const index = this.selectedServices.indexOf(service);
      if (index > -1) {
        this.selectedServices.splice(index, 1);
      }
    },
    
    toggleSpecialization(specialization) {
      const index = this.selectedSpecializations.indexOf(specialization);
      if (index > -1) {
        this.selectedSpecializations.splice(index, 1);
      } else {
        this.selectedSpecializations.push(specialization);
      }
      // Auto-apply filter on mobile
      if (this.showMobileFilters) {
        this.showMobileFilters = false;
      }
    },
    
    removeSpecialization(specialization) {
      const index = this.selectedSpecializations.indexOf(specialization);
      if (index > -1) {
        this.selectedSpecializations.splice(index, 1);
      }
    },
    
    toggleRating(rating) {
      const index = this.selectedRatings.indexOf(rating);
      if (index > -1) {
        this.selectedRatings.splice(index, 1);
      } else {
        this.selectedRatings.push(rating);
      }
      this.showSortOptions = false;
    },
    
    applyMobileFilters() {
      this.showMobileFilters = false;
    },
    
    clearAllFilters() {
      this.selectedServices = [];
      this.selectedSpecializations = [];
      this.emergencyService = null;
      this.currentPrice = 240;
      this.selectedRatings = [];
      this.showMobileFilters = false;
    }
  }
}
</script>

<style scoped>
/* Your existing styles remain the same */
input[type="range"] {
  background: linear-gradient(to right, #fcc207 0%, #fcc207 var(--progress, 50%), #e0e0e0 var(--progress, 50%), #e0e0e0 100%);
  border-radius: 9px;
  border: none;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
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

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fcc207;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* Custom color definitions */
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

/* Mobile responsive utilities */
@media (max-width: 1024px) {
  .rotate-180 {
    transform: rotate(180deg);
  }
}
</style>