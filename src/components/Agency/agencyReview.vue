<template>
  <div class="min-h-screen bg-gray-100 py-3 sm:py-4 md:py-6 lg:py-8 w-full overflow-x-hidden">
    <div class="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6">

      <div class="w-full lg:flex-[2] space-y-4 sm:space-y-5 md:space-y-6">
        <div class="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div class="flex items-center gap-2 sm:gap-2.5">
              <MessageSquare class="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
              <h1 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 capitalize truncate">
                {{ pageTitle }}
              </h1>
            </div>
            <div class="relative flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap justify-center sm:justify-end">

              <button
                class="flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 md:px-4 md:py-2.5 rounded border border-[#757575] text-[#424242] text-sm sm:text-base font-medium hover:bg-black/5 transition-colors min-w-[100px] sm:min-w-[120px] justify-center"
                @click="toggleFilter"
              >
                <span class="whitespace-nowrap">{{ filterText }}</span>
                <ChevronDown class="w-4 h-4 sm:w-5 sm:h-5 transition-transform flex-shrink-0" :class="{ 'rotate-180': showFilter }" />
              </button>

              <div
                v-if="showFilter"
                class="absolute right-0 top-full mt-2 w-64 sm:w-72 md:w-80 bg-white rounded-lg shadow-xl z-30 p-3 sm:p-4 hidden lg:block"
                @click.stop
              >
                <div class="space-y-2 mb-3 sm:mb-4">
                  <label class="font-medium text-gray-800 capitalize block mb-1 text-sm sm:text-base">
                    {{ reviewScoreTitle }}
                  </label>
                  <div class="border border-gray-300 rounded p-2 space-y-1 max-h-48 overflow-y-auto">
                    <label
                      v-for="star in 5"
                      :key="star"
                      class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition-colors"
                    >
                      <input
                        type="checkbox"
                        class="w-4 h-4 sm:w-5 sm:h-5 accent-blue-500 flex-shrink-0"
                        :value="star"
                        v-model="selectedRatings"
                      />
                      <span class="text-xs sm:text-sm text-gray-600 capitalize">
                        {{ star }} Star
                      </span>
                    </label>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="font-medium text-gray-800 capitalize block mb-1 text-sm sm:text-base">
                    {{ dateFilterTitle }}
                  </label>
                  <div class="border border-gray-300 rounded p-2 space-y-1 max-h-48 overflow-y-auto">
                    <label
                      v-for="option in dateFilterOptions"
                      :key="option.value"
                      class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition-colors"
                    >
                      <input
                        type="radio"
                        name="dateFilterDesktop"
                        class="w-4 h-4 sm:w-5 sm:h-5 accent-blue-500 flex-shrink-0"
                        :value="option.value"
                        v-model="selectedDateFilter"
                      />
                      <span class="text-xs sm:text-sm text-gray-600 capitalize">
                        {{ option.label }}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <button class="flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 md:px-4 md:py-2.5 rounded border border-[#28aed8] text-[#28aed8] text-sm sm:text-base font-medium hover:bg-[#28aed8]/5 transition-colors min-w-[100px] sm:min-w-[140px] justify-center">
                <span class="whitespace-nowrap">{{ websiteText }}</span>
                <ExternalLink class="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-4 sm:space-y-5">
          <p v-if="!filteredReviews.length && !loading" class="text-center text-gray-500 py-8 text-sm sm:text-base">No reviews found.</p>
          <p v-if="loading" class="text-center text-gray-500 py-8 text-sm sm:text-base">Loading reviews...</p>

          <div
            v-for="(review, index) in filteredReviews"
            :key="index"
            class="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5"
          >
            <div class="space-y-3">
              <div class="flex items-start gap-2 sm:gap-3">
                <img
                  :src="review.avatar || `https://i.pravatar.cc/150?img=${index + 1}`"
                  :alt="review.reviewer"
                  class="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover flex-shrink-0"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-800 capitalize mb-1 break-words text-sm sm:text-base">
                    {{ review.reviewer }}
                  </h3>
              <div class="flex items-center gap-0.5">
                <StarRatingBox
                  :model-value="Number(review.rating)"
                  :readonly="true"
                  :box-size="isMobile ? 24 : (isTablet ? 28 : 32)"
                  :icon-size="isMobile ? 16 : (isTablet ? 18 : 20)"
                />
              </div>
                </div>
              </div>

              <div class="space-y-3 sm:space-y-4">
                <p class="text-gray-600 leading-relaxed italic text-xs sm:text-sm md:text-base break-words">
                  "{{ review.review }}"
                </p>
                <p class="text-xs sm:text-sm font-medium text-gray-400 capitalize">
                  Date: {{ review.date }}
                </p>
              </div>
            </div>

            <div class="border-t border-gray-200"></div>

            <div class="flex items-center flex-wrap gap-3 sm:gap-4 md:gap-6">

              <div
                @click="like(review)"
                class="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-blue-500 transition-colors cursor-pointer"
                role="button"
                tabindex="0"
                @keyup.enter="like(review)"
              >
                <img src="/thumb_up.svg" alt="Like" class="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span class="text-xs sm:text-sm font-medium">{{ review.likes }}</span>
              </div>

              <div
                @click="dislike(review)"
                class="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
                role="button"
                tabindex="0"
                @keyup.enter="dislike(review)"
              >
                <img src="/Frame.svg" alt="Dislike" class="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span class="text-xs sm:text-sm font-medium">{{ review.dislikes }}</span>
              </div>
            </div>

            <div v-if="review.companyResponse" class="ml-2 sm:ml-3 md:ml-6 lg:ml-10 pl-2 sm:pl-3 md:pl-6 lg:pl-10 py-4 sm:py-5 relative reply-connector space-y-2 sm:space-y-3">
              <div class="flex items-start gap-2 sm:gap-3">
                <img
                  :src="review.companyResponse.avatar || 'https://i.pravatar.cc/150?img=10'"
                  :alt="review.companyResponse.name"
                  class="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover flex-shrink-0"
                />
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-gray-800 capitalize mb-1 sm:mb-2 text-sm sm:text-base break-words">
                    {{ review.companyResponse.name }}
                  </h4>
                  <p class="text-xs sm:text-sm font-medium text-gray-400 capitalize">
                    Date: {{ review.companyResponse.date }}
                  </p>
                </div>
              </div>
              <p class="text-gray-600 leading-relaxed italic text-xs sm:text-sm md:text-base break-words">
                "{{ review.companyResponse.text }}"
              </p>
            </div>
          </div>

          <div
            @click="showCompanyReview = true"
            @keyup.enter="showCompanyReview = true"
            class="w-full relative rounded-lg bg-white overflow-hidden flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 box-border gap-3 sm:gap-4 text-base sm:text-lg text-darkslategray font-plus-jakarta-sans cursor-pointer border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
            role="button"
            tabindex="0"
          >
             <div class="relative leading-[130%] capitalize font-semibold text-gray-800 text-base sm:text-lg text-center">
                {{ addReviewTitle }}
             </div>
             <div class="flex items-center gap-1">
                <StarRatingBox
                  :box-size="isMobile ? 30 : (isTablet ? 34 : 38)"
                  :icon-size="isMobile ? 18 : (isTablet ? 22 : 26)"
                />
             </div>
          </div>
        </div>
      </div>
      
      <div class="w-full lg:flex-[1] space-y-4 sm:space-y-5 md:space-y-6 min-w-0">
        <div class="bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6">
          <div class="flex flex-col items-center sm:items-stretch sm:flex-row gap-4 sm:gap-5 md:gap-6">

            <div class="text-center space-y-2 sm:space-y-3 shrink-0">
              <h2 class="text-3xl sm:text-4xl md:text-5xl font-semibold text-black capitalize">
                {{ imageOverallRating.toFixed(1) }}
              </h2>
              <p class="text-sm sm:text-base font-medium text-green-600 capitalize">
                Excellent
              </p>
              <div class="flex justify-center items-center gap-0.5 sm:gap-1">
                <Star v-for="i in 5" :key="i" class="w-4 h-4 sm:w-5 sm:h-5 fill-[#FFC107] text-[#FFC107]" />
              </div>
              <p class="text-sm font-medium text-gray-500">({{ imageTotalReviews }} Reviews)</p>
            </div>

            <div class="flex-1 w-full space-y-1 sm:space-y-2">
              <div
                v-for="stars in [5, 4, 3, 2, 1]"
                :key="stars"
                class="flex items-center gap-2 sm:gap-3"
              >
                <div class="flex items-center gap-1 w-8 sm:w-10 justify-end flex-shrink-0">
                  <span class="text-sm sm:text-base md:text-lg text-gray-800">{{ stars }}</span>
                  <Star class="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#424242] text-[#424242]" />
                </div>
                <div class="flex-1 h-1.5 sm:h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gray-300 transition-all"
                    :style="{ width: `${(imageRatingBreakdown[stars] / imageRatingBreakdown[5]) * 100}%` }"
                  ></div>
                </div>
                <span class="text-xs sm:text-sm font-medium text-gray-800 w-8 sm:w-10 text-right flex-shrink-0">
                  {{ imageRatingBreakdown[stars] }}
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
            <h3 class="font-semibold capitalize text-base sm:text-lg">{{ filterTitle }}</h3>
            <button @click="showFilter = false">
              <X class="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          <div class="p-4 sm:p-5 space-y-4 sm:space-y-5 overflow-y-auto h-full pb-20">
            <div class="space-y-2">
              <label class="font-medium text-gray-800 capitalize text-sm sm:text-base">
                {{ reviewScoreTitle }}
              </label>
              <div class="border border-gray-300 rounded p-2 space-y-1">
                <label
                  v-for="star in 5"
                  :key="star"
                  class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    class="w-4 h-4 sm:w-5 sm:h-5 accent-blue-500 flex-shrink-0"
                    :value="star"
                    v-model="selectedRatings"
                  />
                  <span class="text-xs sm:text-sm text-gray-600 capitalize">
                    {{ star }} Star
                  </span>
                </label>
              </div>
            </div>

            <div class="space-y-2">
              <label class="font-medium text-gray-800 capitalize text-sm sm:text-base">
                {{ dateFilterTitle }}
              </label>
              <div class="border border-gray-300 rounded p-2 space-y-1">
                <label
                  v-for="option in dateFilterOptions"
                  :key="option.value"
                  class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition-colors"
                >
                  <input
                    type="radio"
                    name="dateFilterMobile"
                    class="w-4 h-4 sm:w-5 sm:h-5 accent-blue-500 flex-shrink-0"
                    :value="option.value"
                    v-model="selectedDateFilter"
                  />
                  <span class="text-xs sm:text-sm text-gray-600 capitalize">
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
  import { ref, computed, onMounted, onUnmounted, watch, watchEffect } from 'vue';
  import { MessageSquare, ChevronDown, ExternalLink, X, Star } from 'lucide-vue-next';
  import { Teleport } from 'vue';
  
  import StarRatingBox from '@/components/common/starRatingBox.vue';
  import CompanyReview from '@/components/modal/companyReview.vue'; 
  import RatingStars from '@/components/common/RatingStars.vue';
  import { useStubClient, useStubResource } from '~/services/stubClient';

  interface CompanyResponse {
    name: string;
    avatar?: string;
    text: string;
    date: string
  }

  interface ReviewItem {
    id: number;
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

  const imageRatingBreakdown: Record<number, number> = {
    5: 120,
    4: 100,
    3: 80,
    2: 38,
    1: 20,
  };
  const imageTotalReviews = Object.values(imageRatingBreakdown).reduce((sum, count) => sum + count, 0); // 358
  const imageOverallRating = 4.8; 

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
  
  const showCompanyReview = ref(false);

  // Data states for fetching
  const reviews = ref<ReviewItem[]>([]);
  const nuxtApp = useNuxtApp();
  const stubClient = useStubClient();
  const { data: reviewsData, error: reviewsError, pending, refresh } = await useStubResource('agencyReviews');
  const loading = computed(() => pending.value);
  const error = ref<string | null>(null);

  const isDesktop = ref(false);
  const isMobile = ref(false);
  const isTablet = ref(false);

  watchEffect(() => {
    const data = (reviewsData.value || []) as Array<any>;
    reviews.value = data.map((r) => ({
      id: Number(r.id),
      reviewer: r.reviewerName || r.reviewer || 'Anonymous',
      rating: Number(r.rating) || 0,
      date: r.date,
      review: r.content || r.review || '',
      avatar: r.avatar,
      companyResponse: r.companyResponse,
      likes: Number(r.likes ?? 0),
      dislikes: Number(r.dislikes ?? 0),
    }));
  });

  watch(reviewsError, (err) => {
    if (err) {
      console.error('Error fetching reviews:', err);
      error.value = err.message || 'An unknown error occurred while fetching reviews.';
    } else {
      error.value = null;
    }
  });

  onMounted(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      // Tailwind's default breakpoints: sm: 640px, md: 768px, lg: 1024px
      isMobile.value = width < 640;
      isTablet.value = width >= 640 && width < 1024;
      isDesktop.value = width >= 1024;
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

  function handleNewReview(reviewData: { rating: number, text: string }) {
    const payload = {
      reviewerName: 'New User',
      rating: Number(reviewData.rating) || 0,
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      content: reviewData.text.trim(),
      likes: 0,
      dislikes: 0,
    };

    stubClient
      .create('agencyReviews', payload, { delay: 200 })
      .then(() => refresh())
      .then(() => {
        showCompanyReview.value = false;
        if (import.meta.client) {
          try {
            nuxtApp.$awn?.success('Review submitted');
          } catch {}
        }
      })
      .catch((err) => {
        console.error('Failed to submit review', err);
        if (import.meta.client) {
          try {
            nuxtApp.$awn?.alert('Failed to submit review');
          } catch {}
        }
      });
  }

  function toggleFilter() {
    showFilter.value = !showFilter.value;
  }

  async function like(review: ReviewItem) {
    const nextLikes = review.likes + 1;
    review.likes = nextLikes;
    try {
      await stubClient.update('agencyReviews', review.id, { likes: nextLikes }, { delay: 120 });
    } catch (err) {
      review.likes = nextLikes - 1;
      console.error('Failed to register like', err);
      if (import.meta.client) {
        try {
          nuxtApp.$awn?.alert('Unable to like this review right now');
        } catch {}
      }
    }
  }

  async function dislike(review: ReviewItem) {
    const nextDislikes = review.dislikes + 1;
    review.dislikes = nextDislikes;
    try {
      await stubClient.update('agencyReviews', review.id, { dislikes: nextDislikes }, { delay: 120 });
    } catch (err) {
      review.dislikes = nextDislikes - 1;
      console.error('Failed to register dislike', err);
      if (import.meta.client) {
        try {
          nuxtApp.$awn?.alert('Unable to dislike this review right now');
        } catch {}
      }
    }
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

@media (max-width: 639px) {
  .reply-connector {
    padding-left: 1.25rem;
  }

  .reply-connector::before {
   
    width: 26px;
  }
}

  @media (min-width: 640px) and (max-width: 767px) {
    .reply-connector::before {
      width: 28px;
      height: 52px;
    }
  }
</style>