<template>
  <div class="w-full font-plus-jakarta-sans">
    <!-- Header Section with Gradient Background -->
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Review Management</h1>
      </div>

      <!-- Search Bar -->
      <div class="w-full relative rounded-lg bg-gray-50 border-white border-solid border box-border flex items-center p-2.5 sm:p-3 md:p-4 gap-2 sm:gap-3">
        <Search class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          v-model="searchQuery"
          @input="filterReviews"
          placeholder="Search reviews by reviewer name, company, or review text"
          class="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400 text-xs sm:text-sm md:text-base leading-[130%] capitalize min-w-0"
        />
      </div>
    </div>

    <!-- Stats Cards - Responsive Grid -->
    <div class="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
      <div class="rounded-lg bg-white border border-gray-200 flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Star class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Total Reviews</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.totalReviews }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border border-gray-200 flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-amber-100 flex items-center justify-center flex-shrink-0">
          <Clock class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Pending</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.pending }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border border-gray-200 flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
          <CheckCircle class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Approved</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.approved }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border border-gray-200 flex items-center p-3 sm:p-4 gap-3">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
          <XCircle class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">Rejected</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.rejected }}</b>
        </div>
      </div>
      <div class="rounded-lg bg-white border border-gray-200 flex items-center p-3 sm:p-4 gap-3 col-span-2 xs:col-span-1">
        <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded bg-purple-100 flex items-center justify-center flex-shrink-0">
          <PauseCircle class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600" />
        </div>
        <div class="flex-1 flex flex-col items-start gap-1 sm:gap-2 min-w-0">
          <div class="text-xs sm:text-sm leading-[130%] capitalize text-gray-500 truncate w-full">On Hold</div>
          <b class="text-base sm:text-lg md:text-xl leading-[160%] capitalize text-gray-900">{{ stats.onHold }}</b>
        </div>
      </div>
    </div>

    <!-- Filters Section - Enhanced for Mobile -->
    <div class="mb-4 overflow-x-auto pb-2 scrollbar-thin">
      <div class="flex items-center gap-1.5 sm:gap-2 min-w-max pr-4">
        <h2 class="text-xs sm:text-sm md:text-base font-semibold text-gray-900 whitespace-nowrap pr-1 sm:pr-2 hidden xs:block">
          All Review List
        </h2>
        
        <!-- Date Filters -->
        <div class="flex items-center gap-1 sm:gap-1.5 bg-white rounded-lg px-1.5 sm:px-2 py-1.5 shadow-sm border border-gray-200 whitespace-nowrap">
          <span class="text-gray-500 text-[10px] sm:text-xs hidden xs:inline">From:</span>
          <input 
            type="date" 
            v-model="filters.dateFrom"
            @change="filterReviews"
            class="font-medium text-gray-900 text-[10px] sm:text-xs outline-none cursor-pointer w-20 xs:w-24 sm:w-28 touch-manipulation"
          />
          <Calendar class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0 hidden xs:block" />
        </div>

        <div class="flex items-center gap-1 sm:gap-1.5 bg-white rounded-lg px-1.5 sm:px-2 py-1.5 shadow-sm border border-gray-200 whitespace-nowrap">
          <span class="text-gray-500 text-[10px] sm:text-xs hidden xs:inline">To:</span>
          <input 
            type="date" 
            v-model="filters.dateTo"
            @change="filterReviews"
            class="font-medium text-gray-900 text-[10px] sm:text-xs outline-none cursor-pointer w-20 xs:w-24 sm:w-28 touch-manipulation"
          />
          <Calendar class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0 hidden xs:block" />
        </div>

        <!-- Time Range Filter -->
        <select 
          v-model="filters.timeRange"
          @change="filterReviews"
          class="bg-white rounded-lg px-2 sm:px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-[10px] sm:text-xs outline-none cursor-pointer whitespace-nowrap touch-manipulation hidden xs:block"
        >
          <option value="">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
        </select>

        <!-- Rating Filter -->
        <select 
          v-model="filters.rating"
          @change="filterReviews"
          class="bg-white rounded-lg px-2 sm:px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-[10px] sm:text-xs outline-none cursor-pointer whitespace-nowrap touch-manipulation"
        >
          <option value="">Rating</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>

        <!-- Status Filter -->
        <select 
          v-model="filters.status"
          @change="filterReviews"
          class="bg-white rounded-lg px-2 sm:px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-[10px] sm:text-xs outline-none cursor-pointer whitespace-nowrap touch-manipulation hidden sm:block"
        >
          <option value="">Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="On Hold">On Hold</option>
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
              @change="filterReviews"
              class="bg-gray-50 rounded px-2 py-1.5 text-[10px] outline-none border border-gray-200"
            >
              <option value="">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-[10px] text-gray-500">Status</label>
            <select 
              v-model="filters.status"
              @change="filterReviews"
              class="bg-gray-50 rounded px-2 py-1.5 text-[10px] outline-none border border-gray-200"
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="On Hold">On Hold</option>
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
          v-for="(review, index) in filteredReviews" 
          :key="review.id"
          class="p-4 border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <input 
                type="checkbox" 
                v-model="review.selected"
                class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation" 
              />
              <span class="text-[10px] text-gray-500 font-medium">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div 
                class="inline-flex items-center gap-1 px-2 py-1 rounded-md font-medium text-[9px] cursor-pointer touch-manipulation"
                :class="getStatusClass(review.status)"
                @click="openReviewModal(review)"
              >
                <span>{{ getStatusShort(review.status) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <Eye 
                  @click="openReviewModal(review)"
                  class="w-4 h-4 text-yellow-500 cursor-pointer hover:text-yellow-600 transition touch-manipulation" 
                />
                <Edit 
                  @click="editReview(review)"
                  class="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-600 transition touch-manipulation" 
                />
              </div>
            </div>
          </div>
          
          <!-- Review Info -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-sm font-semibold text-gray-900 truncate">{{ review.reviewerName }}</span>
                <CheckCircle v-if="review.verified" class="w-3 h-3 text-green-500 flex-shrink-0" />
              </div>
              <span class="text-[11px] text-gray-500">{{ formatDate(review.date) }}</span>
            </div>
            
            <div class="text-[11px] text-gray-600 font-medium">
              {{ review.companyName }}
            </div>
            
            <div class="text-[11px] text-gray-600 line-clamp-2">
              {{ review.reviewText }}
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1">
                <Star v-for="star in 5" :key="star" 
                  class="w-3 h-3"
                  :class="star <= review.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
                />
                <span class="text-[10px] text-gray-600 ml-1">({{ review.stars }})</span>
              </div>
            </div>
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
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[90px]">Date</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Reviewer Name</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Company Name</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[150px]">Review Text</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[90px]">Stars</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[90px]">Status</th>
              <th class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap w-20">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr 
              v-for="(review, index) in filteredReviews" 
              :key="review.id" 
              class="hover:bg-gray-50 active:bg-gray-100 transition"
            >
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3">
                <input 
                  type="checkbox" 
                  v-model="review.selected"
                  class="w-4 h-4 rounded border-gray-300 cursor-pointer touch-manipulation" 
                />
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-700 text-[10px] sm:text-xs whitespace-nowrap">{{ String(index + 1).padStart(2, '0') }}</td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-700 text-[10px] sm:text-xs whitespace-nowrap">{{ formatDate(review.date) }}</td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-900 font-medium text-[10px] sm:text-xs">
                <div class="flex items-center gap-1.5 max-w-[120px]">
                  <span class="truncate">{{ review.reviewerName }}</span>
                  <CheckCircle v-if="review.verified" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 flex-shrink-0" />
                </div>
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-600 text-[10px] sm:text-xs">
                <span class="truncate max-w-[120px] block">{{ review.companyName }}</span>
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-gray-600 text-[10px] sm:text-xs max-w-xs">
                <div class="truncate" :title="review.reviewText">
                  {{ truncateText(review.reviewText, 1) }}
                </div>
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                <div class="flex items-center gap-1">
                  <Star v-for="star in 5" :key="star" 
                    class="w-3 h-3 sm:w-4 sm:h-4"
                    :class="star <= review.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
                  />
                  <span class="text-[10px] sm:text-xs text-gray-600 ml-1">({{ review.stars }})</span>
                </div>
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                <div 
                  class="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-medium text-[9px] sm:text-xs cursor-pointer touch-manipulation"
                  :class="getStatusClass(review.status)"
                  @click="openReviewModal(review)"
                >
                  <span class="hidden sm:inline">{{ review.status }}</span>
                  <span class="sm:hidden">{{ getStatusShort(review.status) }}</span>
                  <ChevronDown class="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                </div>
              </td>
              <td class="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                <div class="flex items-center gap-1 sm:gap-2">
                  <Eye 
                    @click="openReviewModal(review)"
                    class="w-4 h-4 text-yellow-500 cursor-pointer hover:text-yellow-600 active:text-yellow-700 transition touch-manipulation" 
                  />
                  <Edit 
                    @click="editReview(review)"
                    class="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-700 transition touch-manipulation" 
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- No Results -->
      <div v-if="filteredReviews.length === 0" class="text-center py-8 sm:py-12">
        <div class="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
          <Search class="w-6 h-6 text-gray-400" />
        </div>
        <p class="text-gray-500 text-xs sm:text-sm">No reviews found</p>
        <p class="text-gray-400 text-[10px] sm:text-xs mt-1">Try adjusting your search or filters</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
      <p class="text-[10px] sm:text-xs text-gray-600 text-center sm:text-left">
        Showing <span class="font-semibold">{{ filteredReviews.length }}</span> of 
        <span class="font-semibold">{{ reviews.length }}</span> reviews
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

    <!-- Review Modal -->
    <ReviewModal 
      v-if="selectedReview"
      :review="selectedReview"
      @close="closeReviewModal"
      @update-status="handleStatusUpdate"
      @ban-reviewer="handleBanReviewer"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ReviewModal from '~/components/modal/ReviewModal.vue';
import { Search, Calendar, Eye, CheckCircle, ChevronDown, Star, Clock, XCircle, PauseCircle, Edit, ChevronLeft, ChevronRight, Filter } from "lucide-vue-next";

// Modal state
const selectedReview = ref(null);
const showMobileFilters = ref(false);

// Stats data
const stats = ref({
  totalReviews: 156,
  pending: 23,
  approved: 108,
  rejected: 12,
  onHold: 13
});

// Reviews data
const reviews = ref([
  { 
    id: 1, 
    reviewerName: "John Doe", 
    email: "john.doe@example.com",
    companyName: "Tech Solutions Ltd", 
    reviewText: "Great service and excellent support team. Highly recommended for all business needs!", 
    stars: 5, 
    date: "2024-01-15", 
    status: "Approved", 
    verified: true, 
    selected: false 
  },
  { 
    id: 2, 
    reviewerName: "Jane Smith", 
    email: "jane.smith@example.com",
    companyName: "Digital Innovations", 
    reviewText: "Good product but delivery was delayed by two weeks which caused issues.", 
    stars: 3, 
    date: "2024-01-14", 
    status: "Pending", 
    verified: true, 
    selected: false 
  },
  { 
    id: 3, 
    reviewerName: "Mike Johnson", 
    email: "mike.johnson@example.com",
    companyName: "Cloud Solutions Pro", 
    reviewText: "Outstanding customer service and quick response time to all my queries.", 
    stars: 5, 
    date: "2024-01-13", 
    status: "Approved", 
    verified: false, 
    selected: false 
  },
  { 
    id: 4, 
    reviewerName: "Sarah Wilson", 
    email: "sarah.wilson@example.com",
    companyName: "Smart Systems Inc", 
    reviewText: "Average experience, could be better in terms of pricing and features.", 
    stars: 2, 
    date: "2024-01-12", 
    status: "Rejected", 
    verified: true, 
    selected: false 
  },
  { 
    id: 5, 
    reviewerName: "David Brown", 
    email: "david.brown@example.com",
    companyName: "Data Analytics Corp", 
    reviewText: "Very professional and delivered on time with excellent quality work.", 
    stars: 4, 
    date: "2024-01-11", 
    status: "Approved", 
    verified: false, 
    selected: false 
  },
  { 
    id: 6, 
    reviewerName: "Emily Davis", 
    email: "emily.davis@example.com",
    companyName: "Web Design Studio", 
    reviewText: "Poor quality product, not as described in the specifications document.", 
    stars: 1, 
    date: "2024-01-10", 
    status: "On Hold", 
    verified: true, 
    selected: false 
  },
  { 
    id: 7, 
    reviewerName: "Chris Lee", 
    email: "chris.lee@example.com",
    companyName: "Mobile App Developers", 
    reviewText: "Excellent work, will use again for future projects and recommend.", 
    stars: 5, 
    date: "2024-01-09", 
    status: "Pending", 
    verified: false, 
    selected: false 
  },
  { 
    id: 8, 
    reviewerName: "Amanda Taylor", 
    email: "amanda.taylor@example.com",
    companyName: "Cyber Security Ltd", 
    reviewText: "Good value for money and reliable service over the long term.", 
    stars: 4, 
    date: "2024-01-08", 
    status: "Approved", 
    verified: true, 
    selected: false 
  },
  { 
    id: 9, 
    reviewerName: "Robert Wilson", 
    email: "robert.wilson@example.com",
    companyName: "Future Tech Labs", 
    reviewText: "Satisfactory service but room for improvement in customer support.", 
    stars: 3, 
    date: "2024-01-07", 
    status: "Approved", 
    verified: false, 
    selected: false 
  },
  { 
    id: 10, 
    reviewerName: "Lisa Anderson", 
    email: "lisa.anderson@example.com",
    companyName: "Global Enterprises", 
    reviewText: "Exceptional quality and great support team available 24/7.", 
    stars: 5, 
    date: "2024-01-06", 
    status: "Approved", 
    verified: true, 
    selected: false 
  },
  { 
    id: 11, 
    reviewerName: "James Martinez", 
    email: "james.martinez@example.com",
    companyName: "ABC Company", 
    reviewText: "Not happy with the service provided and the final outcome.", 
    stars: 2, 
    date: "2024-01-05", 
    status: "Rejected", 
    verified: false, 
    selected: false 
  },
  { 
    id: 12, 
    reviewerName: "Jennifer Thomas", 
    email: "jennifer.thomas@example.com",
    companyName: "XYZ Corporation", 
    reviewText: "Fast delivery and good communication throughout the process.", 
    stars: 4, 
    date: "2024-01-04", 
    status: "Approved", 
    verified: true, 
    selected: false 
  },
]);

// Search and filters
const searchQuery = ref('');
const selectAll = ref(false);
const filters = ref({
  dateFrom: '',
  dateTo: '',
  timeRange: '',
  rating: '',
  status: ''
});

// Filtered reviews
const filteredReviews = ref([...reviews.value]);

// Modal functions
const openReviewModal = (review) => {
  selectedReview.value = review;
};

const closeReviewModal = () => {
  selectedReview.value = null;
};

// Handle status update from modal
const handleStatusUpdate = ({ reviewId, status }) => {
  const reviewIndex = reviews.value.findIndex(review => review.id === reviewId);
  if (reviewIndex !== -1) {
    reviews.value[reviewIndex].status = status;
    // Update stats
    updateStats();
    filterReviews();
  }
  closeReviewModal();
};

// Handle ban reviewer from modal
const handleBanReviewer = (reviewId) => {
  console.log('Ban reviewer for review:', reviewId);
  // Add your ban logic here
  closeReviewModal();
};

// Update stats based on current reviews
const updateStats = () => {
  stats.value = {
    totalReviews: reviews.value.length,
    pending: reviews.value.filter(r => r.status === 'Pending').length,
    approved: reviews.value.filter(r => r.status === 'Approved').length,
    rejected: reviews.value.filter(r => r.status === 'Rejected').length,
    onHold: reviews.value.filter(r => r.status === 'On Hold').length
  };
};

// Truncate text function - now shows only 1 word
const truncateText = (text, wordCount) => {
  const words = text.split(' ');
  if (words.length > wordCount) {
    return words.slice(0, wordCount).join(' ') + '...';
  }
  return text;
};

// Filter function
const filterReviews = () => {
  let result = [...reviews.value];
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(review => 
      review.reviewerName.toLowerCase().includes(query) || 
      review.companyName.toLowerCase().includes(query) ||
      review.reviewText.toLowerCase().includes(query)
    );
  }
  
  // Status filter
  if (filters.value.status) {
    result = result.filter(review => review.status === filters.value.status);
  }
  
  // Rating filter
  if (filters.value.rating) {
    result = result.filter(review => review.stars === parseInt(filters.value.rating));
  }
  
  // Date range filter
  if (filters.value.dateFrom) {
    result = result.filter(review => review.date >= filters.value.dateFrom);
  }
  
  if (filters.value.dateTo) {
    result = result.filter(review => review.date <= filters.value.dateTo);
  }
  
  filteredReviews.value = result;
};

// Select all checkbox
const toggleSelectAll = () => {
  filteredReviews.value.forEach(review => {
    review.selected = selectAll.value;
  });
};

// Get status class
const getStatusClass = (status) => {
  switch(status) {
    case 'Approved':
      return 'bg-green-100 text-green-700';
    case 'Pending':
      return 'bg-amber-100 text-amber-700';
    case 'Rejected':
      return 'bg-red-100 text-red-700';
    case 'On Hold':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// Get short status for mobile
const getStatusShort = (status) => {
  switch(status) {
    case 'Approved': return 'App';
    case 'Pending': return 'Pen';
    case 'Rejected': return 'Rej';
    case 'On Hold': return 'Hold';
    default: return status;
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
const editReview = (review) => {
  console.log('Edit review:', review);
  // Add your edit logic here
};

// Initialize with today's date
onMounted(() => {
  const today = new Date().toISOString().split('T')[0];
  filters.value.dateFrom = today;
  filters.value.dateTo = today;
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

/* Line clamp utility for mobile cards */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>