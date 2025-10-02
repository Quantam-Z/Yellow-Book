<template>
    <div class="w-full font-plus-jakarta-sans">
      <!-- Header Section with Gradient Background -->
      <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4 mb-4">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h1 class="text-xl md:text-2xl font-bold text-gray-900">Review Management</h1>
        </div>
  
        <!-- Search Bar -->
        <div class="w-full relative rounded-lg bg-gray-50 border-white border-solid border box-border flex items-center p-4 gap-3">
          <Search class="w-6 h-6 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            v-model="searchQuery"
            @input="filterReviews"
            placeholder="Search reviews by reviewer name, company, or review text"
            class="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400 text-base leading-[130%] capitalize min-w-0"
          />
        </div>
      </div>
  
      <!-- Stats Cards -->
      <div class="w-full relative flex items-center gap-4 text-left text-sm text-gray font-plus-jakarta-sans mb-6">
        <div class="flex-1 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-4 gap-4">
          <div class="h-11 w-11 rounded bg-blue-100 flex items-center justify-center">
            <Star class="w-6 h-6 text-blue-600" />
          </div>
          <div class="flex-1 flex flex-col items-start gap-2">
            <div class="self-stretch relative leading-[130%] capitalize">Total Reviews</div>
            <b class="self-stretch relative text-lg leading-[160%] capitalize">{{ stats.totalReviews }}</b>
          </div>
        </div>
        <div class="flex-1 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-4 gap-4">
          <div class="h-11 w-11 rounded bg-amber-100 flex items-center justify-center">
            <Clock class="w-6 h-6 text-amber-600" />
          </div>
          <div class="flex-1 flex flex-col items-start gap-2">
            <div class="self-stretch relative leading-[130%] capitalize">Pending</div>
            <b class="self-stretch relative text-lg leading-[160%] capitalize">{{ stats.pending }}</b>
          </div>
        </div>
        <div class="flex-1 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-4 gap-4">
          <div class="h-11 w-11 rounded bg-green-100 flex items-center justify-center">
            <CheckCircle class="w-6 h-6 text-green-600" />
          </div>
          <div class="flex-1 flex flex-col items-start gap-2">
            <div class="self-stretch relative leading-[130%] capitalize">Approved</div>
            <b class="self-stretch relative text-lg leading-[160%] capitalize">{{ stats.approved }}</b>
          </div>
        </div>
        <div class="flex-1 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-4 gap-4">
          <div class="h-11 w-11 rounded bg-red-100 flex items-center justify-center">
            <XCircle class="w-6 h-6 text-red-600" />
          </div>
          <div class="flex-1 flex flex-col items-start gap-2">
            <div class="self-stretch relative leading-[130%] capitalize">Rejected</div>
            <b class="self-stretch relative text-lg leading-[160%] capitalize">{{ stats.rejected }}</b>
          </div>
        </div>
        <div class="flex-1 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-4 gap-4">
          <div class="h-11 w-11 rounded bg-purple-100 flex items-center justify-center">
            <PauseCircle class="w-6 h-6 text-purple-600" />
          </div>
          <div class="flex-1 flex flex-col items-start gap-2">
            <div class="self-stretch relative leading-[130%] capitalize">On Hold</div>
            <b class="self-stretch relative text-lg leading-[160%] capitalize">{{ stats.onHold }}</b>
          </div>
        </div>
      </div>
  
      <!-- Filters Section -->
      <div class="mb-4 overflow-x-auto pb-2 scrollbar-thin">
        <div class="flex items-center gap-2 min-w-max">
          <h2 class="text-sm md:text-base font-semibold text-gray-900 whitespace-nowrap">All Review List</h2>
          
          <div class="flex items-center gap-2 bg-white rounded-lg px-2 py-1.5 shadow-sm border border-gray-200 whitespace-nowrap">
            <span class="text-gray-500 text-xs">From:</span>
            <input 
              type="date" 
              v-model="filters.dateFrom"
              @change="filterReviews"
              class="font-medium text-gray-900 text-xs outline-none cursor-pointer w-28"
            />
            <Calendar class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          </div>
  
          <div class="flex items-center gap-2 bg-white rounded-lg px-2 py-1.5 shadow-sm border border-gray-200 whitespace-nowrap">
            <span class="text-gray-500 text-xs">To:</span>
            <input 
              type="date" 
              v-model="filters.dateTo"
              @change="filterReviews"
              class="font-medium text-gray-900 text-xs outline-none cursor-pointer w-28"
            />
            <Calendar class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          </div>
  
          <select 
            v-model="filters.timeRange"
            @change="filterReviews"
            class="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-xs outline-none cursor-pointer whitespace-nowrap"
          >
            <option value="">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
          </select>
  
          <select 
            v-model="filters.rating"
            @change="filterReviews"
            class="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-xs outline-none cursor-pointer whitespace-nowrap"
          >
            <option value="">Select Rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
  
          <select 
            v-model="filters.status"
            @change="filterReviews"
            class="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-gray-200 text-gray-600 text-xs outline-none cursor-pointer whitespace-nowrap"
          >
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="On Hold">On Hold</option>
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
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Date</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Reviewer Name</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Company Name</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Review Text</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Stars</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Status</th>
                <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr 
                v-for="(review, index) in filteredReviews" 
                :key="review.id" 
                class="hover:bg-gray-50 transition"
              >
                <td class="px-3 py-2.5">
                  <input 
                    type="checkbox" 
                    v-model="review.selected"
                    class="w-4 h-4 rounded border-gray-300 cursor-pointer" 
                  />
                </td>
                <td class="px-3 py-2.5 text-gray-700 text-xs whitespace-nowrap">{{ String(index + 1).padStart(2, '0') }}</td>
                <td class="px-3 py-2.5 text-gray-700 text-xs whitespace-nowrap">{{ formatDate(review.date) }}</td>
                <td class="px-3 py-2.5 text-gray-900 font-medium text-xs whitespace-nowrap">
                  <div class="flex items-center gap-1.5">
                    {{ review.reviewerName }}
                    <CheckCircle v-if="review.verified" class="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  </div>
                </td>
                <td class="px-3 py-2.5 text-gray-600 text-xs whitespace-nowrap">{{ review.companyName }}</td>
                <td class="px-3 py-2.5 text-gray-600 text-xs max-w-xs">
                  <div class="truncate" :title="review.reviewText">
                    {{ truncateText(review.reviewText, 1) }}
                  </div>
                </td>
                <td class="px-3 py-2.5 whitespace-nowrap">
                  <div class="flex items-center gap-1">
                    <Star v-for="star in 5" :key="star" 
                      class="w-4 h-4"
                      :class="star <= review.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
                    />
                    <span class="text-xs text-gray-600 ml-1">({{ review.stars }})</span>
                  </div>
                </td>
                <td class="px-3 py-2.5 whitespace-nowrap">
                  <div 
                    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs cursor-pointer"
                    :class="getStatusClass(review.status)"
                    @click="openReviewModal(review)"
                  >
                    {{ review.status }}
                    <ChevronDown class="w-3 h-3 flex-shrink-0" />
                  </div>
                </td>
                <td class="px-3 py-2.5 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <Eye 
                      @click="openReviewModal(review)"
                      class="w-4 h-4 text-yellow-500 cursor-pointer hover:text-yellow-600 transition" 
                    />
                    <Edit 
                      @click="editReview(review)"
                      class="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-600 transition" 
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- No Results -->
        <div v-if="filteredReviews.length === 0" class="text-center py-8">
          <p class="text-gray-500 text-sm">No reviews found</p>
        </div>
      </div>
  
      <!-- Pagination -->
      <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
        <p class="text-xs text-gray-600">
          Showing {{ filteredReviews.length }} of {{ reviews.length }} reviews
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
  import { Search, Calendar, Eye, CheckCircle, ChevronDown, Star, Clock, XCircle, PauseCircle, Edit } from "lucide-vue-next";
  
  // Modal state
  const selectedReview = ref(null);
  
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