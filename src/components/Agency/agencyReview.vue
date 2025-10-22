<template>
  <div class="min-h-screen bg-gray-100 py-2 sm:py-4 md:py-6 lg:py-8 w-full">
    <div class="w-full px-4 flex flex-col lg:flex-row gap-6">

      <div class="w-full lg:flex-[2] space-y-6">
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
                @click="toggleFilter"
              >
                <span>{{ filterText }}</span>
                <ChevronDown class="w-5 h-5 transition-transform" :class="{ 'rotate-180': showFilter }" />
              </button>

              <div
                v-if="showFilter"
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
                        {{ star }} Star
                      </span>
                    </label>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="font-medium text-gray-800 capitalize block mb-1">
                    {{ dateFilterTitle }}
                  </label>
                  <div class="border border-gray-300 rounded p-2 space-y-1">
                    <label
                      v-for="option in dateFilterOptions"
                      :key="option.value"
                      class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                    >
                      <input
                        type="radio"
                        name="dateFilterDesktop"
                        class="w-5 h-5 accent-blue-500"
                        :value="option.value"
                        v-model="selectedDateFilter"
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
          <p v-if="!filteredReviews.length && !loading" class="text-center text-gray-500">No reviews found.</p>
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
                <StarRatingBox
                  :model-value="Number(review.rating)"
                  :readonly="true"
                  :box-size="32"
                  :icon-size="20"
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

              <div
                @click="like(review)"
                class="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors cursor-pointer"
                role="button"
                tabindex="0"
                @keyup.enter="like(review)"
              >
                <img src="/thumb_up.svg" alt="Like" class="w-5 h-5" />
                <span class="text-sm font-medium">{{ review.likes }}</span>
              </div>

              <div
                @click="dislike(review)"
                class="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
                role="button"
                tabindex="0"
                @keyup.enter="dislike(review)"
              >
                <img src="/Frame.svg" alt="Dislike" class="w-5 h-5" />
                <span class="text-sm font-medium">{{ review.dislikes }}</span>
              </div>
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

          <div
            @click="showCompanyReview = true"
            @keyup.enter="showCompanyReview = true"
            class="w-full relative rounded-lg bg-white overflow-hidden flex flex-col items-center justify-center p-5 box-border gap-4 text-lg text-darkslategray font-plus-jakarta-sans cursor-pointer border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
            role="button"
            tabindex="0"
          >
             <div class="relative leading-[130%] capitalize font-semibold text-gray-800 text-lg">
                {{ addReviewTitle }}
             </div>
             <div class="flex items-center gap-1">
                <StarRatingBox />
             </div>
          </div>
        </div>
      </div>
      
      <div class="w-full lg:flex-[1] space-y-6 min-w-0">
        <div class="bg-white rounded-lg shadow-lg p-5 md:p-6">
          <div class="flex flex-col sm:flex-row items-center gap-6">

            <div class="text-center space-y-3 shrink-0">
              <h2 class="text-5xl font-semibold text-black capitalize">
                {{ overallRating.toFixed(1) }}
              </h2>
              <p class="text-base font-medium text-green-600 capitalize">
                {{ ratingLabelText }}
              </p>
              <div class="space-y-2">
                <div class="flex items-center justify-center gap-0.5">
                  <Star
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
                  <span class="text-lg bg-white/40">{{ stars }}</span>

                  <Star class="w-5 h-5 fill-gray-700 text-gray-700 drop-shadow-sm" />
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
        v-if="showFilter"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
        @click="showFilter = false"
      >
        <div class="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl" @click.stop>
          <div class="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
            <h3 class="font-semibold capitalize">{{ filterTitle }}</h3>
            <button @click="showFilter = false">
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
                    {{ star }} Star
                  </span>
                </label>
              </div>
            </div>

            <div class="space-y-2">
              <label class="font-medium text-gray-800 capitalize">
                {{ dateFilterTitle }}
              </label>
              <div class="border border-gray-300 rounded p-2 space-y-1">
                <label
                  v-for="option in dateFilterOptions"
                  :key="option.value"
                  class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                >
                  <input
                    type="radio"
                    name="dateFilterMobile"
                    class="w-5 h-5 accent-blue-500"
                    :value="option.value"
                    v-model="selectedDateFilter"
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

      <div v-if="showFilter && isDesktop" class="fixed inset-0 z-20" @click="showFilter = false"></div>
    </div>
    
    <Teleport to="body">
      <CompanyReview
        :is-open="showCompanyReview"
        :add-review-title="addReviewTitle"
        :review-placeholder="reviewPlaceholder"
        :submit-text="submitText"
        @close="showCompanyReview = false"
        @submit="handleNewReview"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { MessageSquare, ChevronDown, ExternalLink, Star, X } from 'lucide-vue-next';
  import { Teleport } from 'vue';
  
  import StarRatingBox from '@/components/common/starRatingBox.vue';
  import CompanyReview from '@/components/modal/companyReview.vue'; 

  interface CompanyResponse {
    name: string;
    avatar?: string;
    text: string;
    date: string
  }

  interface ReviewItem {
    reviewer: string;
    rating: number;
    date: string;
    review: string;
    status?: string;
    avatar?: string;
    likes: number;
    dislikes: number;
    companyResponse?: CompanyResponse
  }

  // Configuration constants
  const TEXT_CONTENT = {
    pageTitle: 'Customer Reviews',
    filterText: 'Filter',
    websiteText: 'Go to website',
    addReviewTitle: 'Give me your rating & feedback',
    reviewPlaceholder: 'Write here your Review for this company...',
    submitText: 'Submit Review',
    filterTitle: 'Filter Options',
    reviewScoreTitle: 'Review Score',
    dateFilterTitle: 'Date Filter',
  };

  const dateFilterOptions = [
    { value: 'all', label: 'All Reviews' },
    { value: '30', label: 'Last 30 Days' },
    { value: '90', label: 'Last 3 Months' },
    { value: '180', label: 'Last 6 Months' },
    { value: '365', label: 'Last 12 Months' },
  ] as const;

  // Destructure constants for cleaner template access
  const {
      pageTitle, filterText, websiteText, addReviewTitle, reviewPlaceholder,
      submitText, filterTitle, reviewScoreTitle, dateFilterTitle
  } = TEXT_CONTENT;


  const showFilter = ref(false);
  const selectedRatings = ref<number[]>([]);
  const selectedDateFilter = ref<(typeof dateFilterOptions[number]['value'])>('all');
  
  // REMOVED: newReviewRating and newReviewText as they are now handled by the modal component
  // RENAMED: State variable to fix the bug
  const showCompanyReview = ref(false);

  // Data states for fetching
  const reviews = ref<ReviewItem[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  // removed reactionCounts; likes/dislikes are stored on each review item

  const isDesktop = ref(false);


  const fetchReviews = async () => {
    loading.value = true;
    error.value = null;
    const filePath = '/stubs/reviews.json';

    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: HTTP ${response.status}`);
      }

      const data = (await response.json()) as Array<{
        reviewer: string;
        rating: number | string;
        date: string;
        review: string;
        avatar?: string;
        companyResponse?: CompanyResponse;
      }>;

      reviews.value = data.map((r) => ({
        reviewer: r.reviewer,
        rating: Number(r.rating) || 0,
        date: r.date,
        review: r.review,
        avatar: r.avatar,
        companyResponse: r.companyResponse,
        likes: Math.floor(Math.random() * 500),
        dislikes: Math.floor(Math.random() * 100),
      }));

    } catch (err: any) {
      console.error('Error fetching reviews:', err);
      error.value = err.message || 'An unknown error occurred while fetching reviews.';
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchReviews();

    const checkScreenSize = () => {
      isDesktop.value = window.innerWidth >= 1024;
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    onUnmounted(() => {
      window.removeEventListener('resize', checkScreenSize);
    });
  });


  const totalReviews = computed(() => reviews.value.length);

  const overallRating = computed(() => {
    if (!reviews.value.length) return 0;
    const sum = reviews.value.reduce((acc, r) => acc + (r.rating || 0), 0);
    return sum / reviews.value.length;
  });

  const ratingLabelText = computed(() => {
    const avg = overallRating.value;
    if (avg >= 4.5) return 'Excellent';
    if (avg >= 4.0) return 'Great';
    if (avg >= 3.0) return 'Good';
    if (avg >= 2.0) return 'Fair';
    if (avg > 0) return 'Poor';
    return 'No ratings';
  });

  const ratingBreakdown = computed<Record<number, number>>(() => {
    const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.value.forEach((r) => {
      const rating = Math.round(r.rating || 0);
      const rounded = Math.max(1, Math.min(5, rating));
      breakdown[rounded]++;
    });
    return breakdown;
  });

  const filteredReviews = computed(() => {
    let filtered = reviews.value;

    // 1. Apply Rating Filter
    if (selectedRatings.value.length) {
      const set = new Set(selectedRatings.value.map(r => Math.round(r)));
      filtered = filtered.filter((r) => set.has(Math.round(r.rating || 0)));
    }

    // 2. Apply Date Filter
    const filterValue = selectedDateFilter.value;
    if (filterValue !== 'all') {
      const days = Number(filterValue);
      if (!isNaN(days) && days > 0) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        filtered = filtered.filter(r => {
          const reviewDate = new Date(r.date);
          return reviewDate > cutoffDate;
        });
      }
    }

    return filtered;
  });

  // NEW FUNCTION: Handle the review data emitted from the modal
  function handleNewReview(reviewData: { rating: number, text: string }) {
    const newReview: ReviewItem = {
      reviewer: 'New User',
      rating: Number(reviewData.rating) || 0,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      review: reviewData.text.trim(),
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50) + 10}`
    };

    reviews.value.unshift({ ...newReview, likes: 0, dislikes: 0 });
    
    // The modal component handles closing itself, but we ensure the state is closed here just in case.
    showCompanyReview.value = false;
    console.log('Review submitted:', newReview);
  }

  function toggleFilter() {
    showFilter.value = !showFilter.value;
  }

  function like(review: ReviewItem) {
    review.likes++;
  }

  function dislike(review: ReviewItem) {
    review.dislikes++;
  }
</script>

<style scoped>
  .reply-connector::before {
    content: '';
    position: absolute;
    left: 1px;
    top: -12px;
    width: 33px;
    height: 57px;
    border-left: 1px solid #c0c0c0;
    border-bottom: 1px solid #c0c0c0;
    border-bottom-left-radius: 12px;
  }
</style>