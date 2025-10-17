<template>
  <div class="min-h-screen bg-gray-100 pt-1 pb-1 md:py-6 lg:py-8 w-[93%] mx-auto">
        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 px-4">
        
        <div class="flex-1 space-y-6">
          <div class="bg-white rounded-lg border border-gray-200 p-5 md:p-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-2.5">
                <MessageSquare class="w-6 h-6 text-blue-500" />
                <h1 class="text-xl md:text-2xl font-semibold text-gray-800 capitalize">
                  {{ pageTitle }}
                </h1>
              </div>
              <div class="relative flex items-center gap-4 flex-wrap max-[991px]:justify-center max-[575px]:flex-col max-[575px]:w-full max-[575px]:gap-[10px]">
                
                <button 
                  class="flex items-center gap-2 px-3 py-2 rounded border border-[#757575] text-[#424242] text-base font-medium hover:bg-black/5 max-[575px]:w-full max-[575px]:justify-center max-[575px]:py-3" 
                  @click="togglefilter"
                >
                  <span>{{ filterText }}</span>
                  <ChevronDown class="w-5 h-5 transition-transform" :class="{ 'rotate-180': showfilter }" />
                </button>
                
                <div 
                  v-if="showfilter"
                  class="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-xl z-30 p-4 hidden lg:block"
                  @click.stop
                >
                  <div class="space-y-2 mb-4">
                    <label class="font-medium text-gray-800 capitalize block mb-1">
                      {{ reviewScoreTitle }}
                    </label>
                    <div class="border border-gray-300 rounded p-2 space-y-1">
                      <label
                        v-for="star in 5"
                        :key="star"
                        class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      >
                        <input
                          type="checkbox"
                          class="w-5 h-5 accent-blue-500"
                          :value="star"
                          v-model="selectedRatings"
                        />
                        <span class="text-sm text-gray-600 capitalize">
                          {{ star }} star
                        </span>
                      </label>
                    </div>
                  </div>
  
                  <div class="space-y-2">
                    <label class="font-medium text-gray-800 capitalize block mb-1">
                      {{ datefilterTitle }}
                    </label>
                    <div class="border border-gray-300 rounded p-2 space-y-1">
                      <label
                        v-for="option in datefilterOptions"
                        :key="option.value"
                        class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      >
                        <input
                          type="radio"
                          name="datefilterDesktop"
                          class="w-5 h-5 accent-blue-500"
                          :value="option.value"
                          v-model="selectedDatefilter"
                        />
                        <span class="text-sm text-gray-600 capitalize">
                          {{ option.label }}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
  
                <button class="flex items-center gap-2 px-3 py-2 rounded border border-[#28aed8] text-[#28aed8] text-base font-medium hover:bg-[#28aed8]/5 max-[575px]:w-full max-[575px]:justify-center max-[575px]:py-3">
                  <span>{{ websiteText }}</span>
                  <ExternalLink class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
  
          <div class="space-y-5">
            <p v-if="!reviews.length && !loading" class="text-center text-gray-500">No reviews found.</p>
            <p v-if="loading" class="text-center text-gray-500">Loading reviews...</p>
  
            <div
              v-for="(review, index) in filteredReviews"
              :key="index"
              class="bg-white rounded-lg shadow-md p-5 md:p-6 space-y-5"
            >
              <div class="space-y-3">
                <div class="flex items-start gap-3">
                  <img
                    :src="review.avatar || `https://i.pravatar.cc/150?img=${index + 1}`"
                    :alt="review.reviewer"
                    class="w-11 h-11 rounded-full object-cover"
                  />
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-800 capitalize mb-1">
                      {{ review.reviewer }}
                    </h3>
                    <div class="flex items-center gap-0.5">
                      <star
                        v-for="star in 5"
                        :key="star"
                        class="w-5 h-5"
                        :class="star <= Number(review.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'"
                      />
                    </div>
                  </div>
                </div>
                
                <div class="space-y-4">
                  <p class="text-gray-600 leading-relaxed italic">
                    "{{ review.review }}"
                  </p>
                  <p class="text-sm font-medium text-gray-400 capitalize">
                    Date: {{ review.date }}
                  </p>
                </div>
              </div>
  
              <div class="border-t border-gray-200"></div>
  
              <div class="flex items-center gap-6">
                <button @click="like(index)" class="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <ThumbsUp class="w-5 h-5" />
                  <span class="text-sm font-medium">{{ reactionCounts[index]?.likes || 0 }}</span>
                </button>
                <button @click="dislike(index)" class="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                  <ThumbsDown class="w-5 h-5" />
                  <span class="text-sm font-medium">{{ reactionCounts[index]?.dislikes || 0 }}</span>
                </button>
              </div>
  
              <div v-if="review.companyResponse" class="ml-6 md:ml-10 pl-6 md:pl-10 py-5 relative reply-connector space-y-3">
                <div class="flex items-start gap-3">
                  <img
                    :src="review.companyResponse.avatar || 'https://i.pravatar.cc/150?img=10'"
                    :alt="review.companyResponse.name"
                    class="w-11 h-11 rounded-full object-cover"
                  />
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-800 capitalize mb-2">
                      {{ review.companyResponse.name }}
                    </h4>
                    <p class="text-sm font-medium text-gray-400 capitalize">
                      Date: {{ review.companyResponse.date }}
                    </p>
                  </div>
                </div>
                <p class="text-gray-600 leading-relaxed italic">
                  "{{ review.companyResponse.text }}"
                </p>
              </div>
            </div>
          </div>
  
          <div class="bg-white rounded-lg shadow-lg border border-gray-300 p-5 md:p-6 space-y-6">
            <div class="text-center space-y-5">
              <h2 class="text-lg font-semibold text-gray-800 capitalize">
                {{ addReviewTitle }}
              </h2>
              <div class="flex items-center justify-center gap-1">
                <star
                  v-for="star in 5"
                  :key="star"
                  class="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
                  :class="star <= newReviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'"
                  @click="setRating(star)"
                />
              </div>
            </div>
            
            <div class="space-y-4">
              <textarea
                v-model="newReviewText"
                :placeholder="reviewPlaceholder"
                class="w-full h-24 p-4 bg-gray-100 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700"
              ></textarea>
              <button
                @click="submitReview"
                class="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded capitalize transition-colors"
              >
                {{ submitText }}
              </button>
            </div>
          </div>
        </div>
  
        <div class="lg:w-96 space-y-6">
          <div class="bg-white rounded-lg shadow-lg p-5 md:p-6">
            <div class="flex flex-col sm:flex-row items-center gap-6"> 
              
              <div class="text-center space-y-3 shrink-0">
                <h2 class="text-5xl font-semibold text-black capitalize">
                  {{ overallRating.toFixed(1) }}
                </h2>
                <p class="text-base font-medium text-green-600 capitalize">
                  {{ ratingLabel }}
                </p>
                <div class="space-y-2">
                  <div class="flex items-center justify-center gap-0.5">
                    <star
                      v-for="star in 5"
                      :key="star"
                      class="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  </div>
                  <p class="text-sm font-medium text-gray-600 capitalize">
                    ({{ totalReviews }} reviews)
                  </p>
                </div>
              </div>
  
              <div class="flex-1 w-full space-y-2">
                <div
                  v-for="stars in [5, 4, 3, 2, 1]"
                  :key="stars"
                  class="flex items-center gap-3"
                >
                  <div class="flex items-center gap-1 w-12 justify-end">
                    <span class="text-lg text-black">{{ stars }}</span> 
                    
                    <star class="w-5 h-5 fill-gray-700 text-gray-700 drop-shadow-sm" /> 
                  </div>
                  <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-gray-700 transition-all"
                      :style="{ width: `${totalReviews > 0 ? (ratingBreakdown[stars] / totalReviews) * 100 : 0}%` }"
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-gray-600 w-12 text-right">
                    {{ ratingBreakdown[stars] }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div
          v-if="showfilter"
          class="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          @click="showfilter = false"
        >
          <div class="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl" @click.stop>
            <div class="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
              <h3 class="font-semibold capitalize">{{ filterTitle }}</h3>
              <button @click="showfilter = false">
                <X class="w-6 h-6" />
              </button>
            </div>
            <div class="p-5 space-y-5 overflow-y-auto h-full pb-20">
              <div class="space-y-2">
                <label class="font-medium text-gray-800 capitalize">
                  {{ reviewScoreTitle }}
                </label>
                <div class="border border-gray-300 rounded p-2 space-y-1">
                  <label
                    v-for="star in 5"
                    :key="star"
                    class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      class="w-5 h-5 accent-blue-500"
                      :value="star"
                      v-model="selectedRatings"
                    />
                    <span class="text-sm text-gray-600 capitalize">
                      {{ star }} star
                    </span>
                  </label>
                </div>
              </div>
  
              <div class="space-y-2">
                <label class="font-medium text-gray-800 capitalize">
                  {{ datefilterTitle }}
                </label>
                <div class="border border-gray-300 rounded p-2 space-y-1">
                  <label
                    v-for="option in datefilterOptions"
                    :key="option.value"
                    class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                  >
                    <input
                      type="radio"
                      name="datefilterMobile"
                      class="w-5 h-5 accent-blue-500"
                      :value="option.value"
                      v-model="selectedDatefilter"
                    />
                    <span class="text-sm text-gray-600 capitalize">
                      {{ option.label }}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="showfilter && isDesktop" class="fixed inset-0 z-20" @click="showfilter = false"></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { MessageSquare, ChevronDown, ExternalLink, star, ThumbsUp, ThumbsDown, X } from 'lucide-vue-next';
  
  // --- Interface Definitions ---
  interface CompanyResponse { 
    name: string; 
    avatar?: string; 
    text: string; 
    date: string 
  }
  
  interface StubReview { 
    reviewer: string; 
    rating: string | number; 
    date: string; 
    review: string; 
    status?: string; 
    avatar?: string; 
    companyResponse?: CompanyResponse 
  }
  
  // --- Constants ---
  const pageTitle = 'Customer Reviews';
  const filterText = 'filter';
  const websiteText = 'Go to website';
  const addReviewTitle = 'Give me your rating & Review';
  const reviewPlaceholder = 'Write here your Review for this company...';
  const submitText = 'Submit';
  const filterTitle = 'filter';
  const reviewScoreTitle = 'Review Score';
  const datefilterTitle = 'Date filter';
  const ratingLabel = 'Excellent';
  
  // --- Reactive State ---
  const showfilter = ref(false);
  const selectedRatings = ref<number[]>([]);
  const selectedDatefilter = ref<'all' | '30' | '90' | '180' | '365'>('all');
  const newReviewRating = ref(0);
  const newReviewText = ref('');
  
  // Data states for fetching
  const reviews = ref<StubReview[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  
  const reactionCounts = ref<{ likes: number; dislikes: number }[]>([]);
  
  // Utility State for Dropdown Closing
  const isDesktop = ref(false);
  
  // --- Fetch Data Function ---
  const fetchReviews = async () => {
    loading.value = true;
    error.value = null;
    // NOTE: This path is relative to the Vite project's public folder or assets depending on setup.
    const filePath = 'stubs/reviews.json'; 
    
    try {
      const response = await fetch(filePath);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.statusText}`);
      }
      
      const data: StubReview[] = await response.json();
      reviews.value = data;
      
      // Initialize reaction counts based on fetched reviews
      reactionCounts.value = data.map(() => ({ 
        likes: Math.floor(Math.random() * 500), 
        dislikes: Math.floor(Math.random() * 100) 
      }));
      
    } catch (err: any) {
      console.error('Error fetching reviews:', err);
      error.value = err.message || 'An unknown error occurred while fetching reviews.';
    } finally {
      loading.value = false;
    }
  };
  
  // --- Lifecycle Hook ---
  onMounted(() => {
    // 1. Fetch the JSON data
    fetchReviews(); 
    
    // 2. Set up event listener for screen size
    const checkScreenSize = () => {
      isDesktop.value = window.innerWidth >= 1024;
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });
  
  // --- Computed Properties ---
  const totalReviews = computed(() => reviews.value.length);
  
  const overallRating = computed(() => {
    if (reviews.value.length === 0) return 0;
    const sum = reviews.value.reduce((acc, r) => acc + Number(r.rating || 0), 0);
    return sum / reviews.value.length;
  });
  
  const ratingBreakdown = computed<Record<number, number>>(() => {
    const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.value.forEach((r) => {
      const rounded = Math.max(1, Math.min(5, Math.round(Number(r.rating || 0))));
      breakdown[rounded]++;
    });
    return breakdown;
  });
  
  const filteredReviews = computed(() => {
    let filtered = reviews.value;
    // Apply Rating filter
    if (selectedRatings.value.length) {
      const set = new Set(selectedRatings.value);
      filtered = filtered.filter((r) => set.has(Math.round(Number(r.rating || 0))));
    }
  
    // NOTE: Date filtering logic would be applied here based on selectedDatefilter.value
  
    return filtered;
  });
  
  
  // --- Functions ---
  function togglefilter() { 
    showfilter.value = !showfilter.value;
  }
  
  function setRating(rating: number) { 
    newReviewRating.value = rating;
  }
  
  function submitReview() {
    if (newReviewRating.value === 0 || !newReviewText.value.trim()) {
      alert('Please provide both rating and review text');
      return;
    }
    
    // Add the new review to the list (for demonstration)
    reviews.value.unshift({
      reviewer: 'New User',
      rating: newReviewRating.value,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      review: newReviewText.value,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50) + 10}`
    });
  
    // Also add reaction count for the new review
    reactionCounts.value.unshift({ likes: 0, dislikes: 0 });
  
    alert(`Review submitted!\nRating: ${newReviewRating.value} stars\nReview: ${newReviewText.value}`);
    
    // Reset form
    newReviewRating.value = 0;
    newReviewText.value = '';
  }
  
  function like(index: number) { 
    if (!reactionCounts.value[index]) {
      reactionCounts.value[index] = { likes: 0, dislikes: 0 };
    }
    reactionCounts.value[index].likes++;
  }
  
  function dislike(index: number) { 
    if (!reactionCounts.value[index]) {
      reactionCounts.value[index] = { likes: 0, dislikes: 0 };
    }
    reactionCounts.value[index].dislikes++;
  }
  
  const datefilterOptions = [
    { value: 'all', label: 'All Reviews' },
    { value: '30', label: 'Last 30 Days' },
    { value: '90', label: 'Last 3 Months' },
    { value: '180', label: 'Last 6 Months' },
    { value: '365', label: 'Last 12 Months' },
  ] as const;
  </script>
  
  <style scoped>
  .reply-connector::before {
    content: '';
    position: absolute;
    left: 4px; 
    top: -12px;
    width: 33px;
    height: 57px;
    border-left: 1px solid #c0c0c0;
    border-bottom: 1px solid #c0c0c0;
    border-bottom-left-radius: 12px;
  }
  </style>