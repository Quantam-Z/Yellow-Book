<template>
  <div class="w-[95%] ml-[30px] flex gap-5 text-[#424242] leading-[1.5] font-plus-jakarta-sans max-xl:w-[97%] max-xl:ml-[15px] max-md:flex-col max-md:w-full max-md:ml-0 max-md:px-4">
    <div class="flex-1 max-w-[792px] relative">
      <div class="rounded bg-gray-100 border border-[#eee] p-5 flex flex-col gap-8">
        <!-- Header -->
        <div class="flex items-center justify-between gap-5 flex-wrap">
          <div class="flex items-center gap-2">
            <MessageCircle class="w-6 h-6" />
            <div class="text-2xl font-medium capitalize">{{ pageTitle }}</div>
          </div>
          <div class="flex items-center gap-4 flex-wrap">
            <button class="flex items-center gap-2 px-3 py-2 rounded border border-gray-500 text-[#424242] text-base font-medium hover:bg-black/5" @click="toggleFilter">
              <span>{{ filterText }}</span>
              <ChevronDown class="w-5 h-5" />
            </button>
            <button class="flex items-center gap-2 px-3 py-2 rounded border border-[#28aed8] text-[#28aed8] text-base font-medium hover:bg-[#28aed8]/5">
              <span>{{ websiteText }}</span>
              <ExternalLink class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Reviews List -->
        <div class="flex flex-col gap-5">
          <div
            v-for="(review, idx) in filteredReviews"
            :key="idx"
            class="bg-white rounded shadow-[0_4px_16px_rgba(158,158,158,0.14)] p-5 flex flex-col gap-5"
          >
            <div class="flex flex-col gap-4">
              <div class="flex items-start gap-3">
                <img :src="review.avatar || '/profile.png'" :alt="review.reviewer" class="w-11 h-11 rounded-full object-cover" />
                <div class="flex flex-col gap-1">
                  <div class="text-lg font-semibold capitalize">{{ review.reviewer }}</div>
                  <div class="flex items-center gap-1">
                    <Star v-for="star in 5" :key="star" class="w-5 h-5" :class="star <= Math.round(Number(review.rating)) ? 'text-yellow-400' : 'text-gray-300'" />
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-6">
                <div class="text-base leading-7 italic capitalize">"{{ review.review }}"</div>
                <div class="text-base font-medium text-gray-400 capitalize">{{ review.date }}</div>
              </div>
            </div>

            <div class="h-px bg-[#eee]"></div>

            <div class="flex items-center gap-5 text-gray-600">
              <button class="flex items-center gap-2" @click="like(idx)">
                <ThumbsUp class="w-5 h-5" />
                <span>{{ reactionCounts[idx]?.likes ?? 0 }}</span>
              </button>
              <button class="flex items-center gap-2" @click="dislike(idx)">
                <ThumbsDown class="w-5 h-5" />
                <span>{{ reactionCounts[idx]?.dislikes ?? 0 }}</span>
              </button>
            </div>

            <div v-if="review.companyResponse" class="relative px-10 py-5 ml-5">
              <div class="absolute -top-3 left-3 w-[33px] h-[57px] border-l border-b border-[#bdbdbd] rounded-bl-[12px]"></div>
              <div class="flex items-center gap-2 mb-4">
                <img :src="review.companyResponse.avatar || '/profile.png'" :alt="review.companyResponse.name" class="w-11 h-11 rounded-full object-cover" />
                <div class="flex flex-col gap-1">
                  <div class="text-lg font-semibold capitalize">{{ review.companyResponse.name }}</div>
                  <div class="text-base font-medium text-gray-400 capitalize">{{ review.companyResponse.date }}</div>
                </div>
              </div>
              <div class="text-base leading-7 italic capitalize">"{{ review.companyResponse.text }}"</div>
            </div>
          </div>
        </div>

        <!-- Add Review Section -->
        <div class="bg-white border border-gray-400 rounded-lg shadow-[0_0_17px_rgba(97,97,97,0.16)] p-5 flex flex-col gap-8">
          <div class="flex flex-col items-center gap-7 text-center">
            <div class="text-lg font-medium capitalize">{{ addReviewTitle }}</div>
            <div class="flex items-center gap-2">
              <Star
                v-for="star in 5"
                :key="star"
                class="w-7 h-7 cursor-pointer"
                :class="star <= newReviewRating ? 'text-yellow-400' : 'text-gray-300'"
                @click="setRating(star)"
              />
            </div>
          </div>
          <div class="flex flex-col gap-5">
            <textarea
              v-model="newReviewText"
              :placeholder="reviewPlaceholder"
              class="w-full min-h-[93px] p-5 border border-[#eee] rounded-lg bg-gray-100 text-base font-medium text-[#424242] resize-y"
            ></textarea>
            <button class="w-full h-12 bg-gold hover:bg-goldenrod text-[#212121] rounded text-base font-medium" @click="submitReview">
              <span>{{ submitText }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Filter Panel -->
      <div v-if="showFilter" class="absolute top-16 right-0 w-[274px] bg-white border border-[#eee] rounded shadow-[0_4px_14px_rgba(158,158,158,0.1)] z-10 max-md:fixed max-md:inset-0 max-md:w-full max-md:h-screen">
        <div class="flex items-center justify-between bg-[#424242] text-[#fafafa] px-4 py-3">
          <span class="text-base font-semibold capitalize">{{ filterTitle }}</span>
          <button @click="toggleFilter" class="p-1 text-[#fafafa]"><X class="w-5 h-5" /></button>
        </div>
        <div class="p-5 flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <div class="text-lg font-medium capitalize">{{ reviewScoreTitle }}</div>
            <div class="border border-[#e0e0e0] rounded p-2.5 flex flex-col gap-2">
              <label v-for="star in 5" :key="star" class="flex items-center gap-2 text-base text-[#616161]">
                <input type="checkbox" v-model="selectedRatings" :value="star" />
                <Star class="w-4 h-4 text-yellow-400" />
                <span>{{ star }} Star{{ star > 1 ? 's' : '' }}</span>
              </label>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-lg font-medium capitalize">{{ dateFilterTitle }}</div>
            <div class="border border-[#e0e0e0] rounded p-2.5 flex flex-col gap-2">
              <label v-for="option in dateFilterOptions" :key="option.value" class="flex items-center gap-2 text-base text-[#616161]">
                <input type="radio" v-model="selectedDateFilter" :value="option.value" name="dateFilter" />
                <Clock class="w-4 h-4" />
                <span>{{ option.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Rating Summary Panel -->
    <div class="w-96 bg-white rounded shadow-[0_4px_16px_rgba(158,158,158,0.24)] p-5 flex flex-col gap-6 h-fit max-xl:w-[350px] max-md:w-full max-md:max-w-[792px] max-md:mx-auto">
      <div class="flex items-center gap-6">
        <div class="flex flex-col items-center gap-3 text-center">
          <div class="text-[46px] font-semibold text-black">{{ overallRating.toFixed(1) }}</div>
          <div class="text-base font-medium text-[#0bab4b] capitalize">{{ ratingLabel }}</div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex items-center">
            <Star v-for="star in 5" :key="star" class="w-5 h-5" :class="star <= Math.round(overallRating) ? 'text-yellow-400' : 'text-gray-300'" />
          </div>
          <div class="text-base font-medium text-[#616161] capitalize">({{ totalReviews }} reviews)</div>
        </div>
      </div>

      <div class="flex flex-col gap-1.5">
        <div v-for="(count, rating) in ratingBreakdown" :key="rating" class="flex items-center gap-5">
          <div class="w-[43px] flex items-center justify-end gap-1.5 text-[20px] text-[#424242]">
            <span>{{ rating }}</span>
            <Star class="w-4 h-4 text-yellow-400" />
          </div>
          <div class="flex-1 h-[5px] bg-[#e0e0e0] rounded overflow-hidden">
            <div class="h-full bg-yellow-400" :style="{ width: `${(count / totalReviews) * 100}%` }"></div>
          </div>
          <div class="w-[30px] text-right text-base font-medium text-[#616161]">{{ count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { MessageCircle, ChevronDown, ExternalLink, Star, ThumbsUp, ThumbsDown, X, Clock } from 'lucide-vue-next';

interface CompanyResponse { name: string; avatar?: string; text: string; date: string }
interface StubReview { reviewer: string; rating: string | number; date: string; review: string; status?: string; avatar?: string; companyResponse?: CompanyResponse }

const pageTitle = 'Customer Reviews';
const filterText = 'Filter';
const websiteText = 'Go to website';
const addReviewTitle = 'Give me your rating & Review';
const reviewPlaceholder = 'Write here your Review for this company...';
const submitText = 'Submit';
const filterTitle = 'Filter';
const reviewScoreTitle = 'Review Score';
const dateFilterTitle = 'Date filter';
const ratingLabel = 'Excellent';

const showFilter = ref(false);
const selectedRatings = ref<number[]>([]);
const selectedDateFilter = ref<'all' | '30' | '90' | '180' | '365'>('all');
const newReviewRating = ref(0);
const newReviewText = ref('');

const { data: reviewsData } = await useFetch<StubReview[]>('/stubs/recentReviews.json');
const reviews = computed<StubReview[]>(() => Array.isArray(reviewsData.value) ? reviewsData.value! : []);

const reactionCounts = ref<{ likes: number; dislikes: number }[]>([]);

onMounted(() => {
  reactionCounts.value = reviews.value.map(() => ({ likes: 0, dislikes: 0 }));
});

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
  // Basic rating filter; date filter placeholder
  if (!selectedRatings.value.length) return reviews.value;
  const set = new Set(selectedRatings.value);
  return reviews.value.filter((r) => set.has(Math.round(Number(r.rating || 0))));
});

function toggleFilter() { showFilter.value = !showFilter.value }
function setRating(rating: number) { newReviewRating.value = rating }
function submitReview() {
  if (newReviewRating.value === 0 || !newReviewText.value.trim()) {
    alert('Please provide both rating and review text');
    return;
  }
  console.log('Submitting review:', { rating: newReviewRating.value, text: newReviewText.value });
  newReviewRating.value = 0;
  newReviewText.value = '';
}
function like(index: number) { if (!reactionCounts.value[index]) reactionCounts.value[index] = { likes: 0, dislikes: 0 }; reactionCounts.value[index].likes++ }
function dislike(index: number) { if (!reactionCounts.value[index]) reactionCounts.value[index] = { likes: 0, dislikes: 0 }; reactionCounts.value[index].dislikes++ }

const dateFilterOptions = [
  { value: 'all', label: 'All Reviews' },
  { value: '30', label: 'Last 30 Days' },
  { value: '90', label: 'Last 3 Months' },
  { value: '180', label: 'Last 6 Months' },
  { value: '365', label: 'Last 12 Months' },
] as const;
</script>
