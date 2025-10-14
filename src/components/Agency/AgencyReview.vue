<template>
  <div class="w-[95%] ml-[30px] flex gap-5 text-[#424242] leading-[1.5] font-plus-jakarta-sans max-[1199px]:w-[97%] max-[1199px]:ml-[15px] max-[991px]:flex-col max-[991px]:w-full max-[991px]:ml-0 max-[991px]:px-[15px] max-[767px]:px-[10px] max-[767px]:gap-[15px] max-[575px]:px-[8px] max-[575px]:gap-3 max-[375px]:px-[5px]">
    <div class="flex-1 max-w-[792px] relative max-[991px]:max-w-full">
      <div class="rounded bg-gray-100 border border-[#eee] p-5 flex flex-col gap-8 max-[991px]:p-[15px] max-[767px]:p-[15px] max-[767px]:gap-6 max-[575px]:p-[12px] max-[575px]:gap-5 max-[375px]:p-[10px]">
        <!-- Header -->
        <div class="flex items-center justify-between gap-5 flex-wrap max-[991px]:flex-col max-[991px]:items-stretch max-[991px]:gap-[15px]">
          <div class="flex items-center gap-2">
            <MessageCircle class="w-6 h-6" />
            <div class="text-2xl font-medium capitalize max-[575px]:text-xl">{{ pageTitle }}</div>
          </div>
          <div class="flex items-center gap-4 flex-wrap max-[991px]:justify-center max-[575px]:flex-col max-[575px]:w-full max-[575px]:gap-[10px]">
            <button class="flex items-center gap-2 px-3 py-2 rounded border border-[#757575] text-[#424242] text-base font-medium hover:bg-black/5 max-[575px]:w-full max-[575px]:justify-center max-[575px]:py-3" @click="toggleFilter">
              <span>{{ filterText }}</span>
              <ChevronDown class="w-5 h-5" />
            </button>
            <button class="flex items-center gap-2 px-3 py-2 rounded border border-[#28aed8] text-[#28aed8] text-base font-medium hover:bg-[#28aed8]/5 max-[575px]:w-full max-[575px]:justify-center max-[575px]:py-3">
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
            class="bg-white rounded shadow-[0_4px_16px_rgba(158,158,158,0.14)] p-5 flex flex-col gap-5 max-[767px]:p-[15px] max-[767px]:gap-[15px] max-[575px]:p-[12px] max-[575px]:gap-3 max-[375px]:p-[10px]"
          >
            <div class="flex flex-col gap-4">
              <div class="flex items-start gap-3 max-[575px]:flex-col max-[575px]:items-start max-[575px]:gap-2">
                <img :src="review.avatar || '/profile.png'" :alt="review.reviewer" class="w-11 h-11 rounded-full object-cover" />
                <div class="flex flex-col gap-1">
                  <div class="text-lg font-semibold capitalize max-[575px]:text-base max-[375px]:text-[15px]">{{ review.reviewer }}</div>
                  <div class="flex items-center gap-[2px]">
                    <Star v-for="star in 5" :key="star" class="w-5 h-5" :class="star <= Math.round(Number(review.rating)) ? 'text-[#ffc107]' : 'text-[#e0e0e0]'" />
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-6">
                <div class="text-base leading-7 italic capitalize max-[575px]:text-sm max-[375px]:text-[13px]">"{{ review.review }}"</div>
                <div class="text-base font-medium text-gray-400 capitalize max-[575px]:text-sm">{{ review.date }}</div>
              </div>
            </div>

            <div class="h-px bg-[#eee]"></div>

            <div class="flex items-center gap-5 text-[#616161] hover:[&>button]:text-[#424242] max-[575px]:gap-[15px] max-[575px]:justify-center">
              <button class="flex items-center gap-2" @click="like(idx)">
                <ThumbsUp class="w-5 h-5" />
                <span>{{ reactionCounts[idx]?.likes ?? 0 }}</span>
              </button>
              <button class="flex items-center gap-2" @click="dislike(idx)">
                <ThumbsDown class="w-5 h-5" />
                <span>{{ reactionCounts[idx]?.dislikes ?? 0 }}</span>
              </button>
            </div>

            <div v-if="review.companyResponse" class="relative px-10 py-5 ml-5 max-[767px]:px-5 max-[767px]:py-[15px] max-[767px]:ml-[10px] max-[575px]:px-[15px] max-[575px]:py-3 max-[575px]:ml-0">
              <div class="absolute -top-3 left-3 w-[33px] h-[57px] border-l border-b border-[#bdbdbd] rounded-bl-[12px] max-[767px]:left-2 max-[767px]:w-[25px] max-[767px]:h-[45px]"></div>
              <div class="flex items-center gap-2 mb-4 max-[575px]:flex-col max-[575px]:items-start max-[575px]:gap-2">
                <img :src="review.companyResponse.avatar || '/profile.png'" :alt="review.companyResponse.name" class="w-11 h-11 rounded-full object-cover" />
                <div class="flex flex-col gap-1">
                  <div class="text-lg font-semibold capitalize max-[575px]:text-base">{{ review.companyResponse.name }}</div>
                  <div class="text-base font-medium text-gray-400 capitalize max-[575px]:text-sm">{{ review.companyResponse.date }}</div>
                </div>
              </div>
              <div class="text-base leading-7 italic capitalize max-[575px]:text-sm">"{{ review.companyResponse.text }}"</div>
            </div>
          </div>
        </div>

        <!-- Add Review Section -->
        <div class="bg-white border border-[#bdbdbd] rounded-lg shadow-[0_0_17px_rgba(97,97,97,0.16)] p-5 flex flex-col gap-8 max-[767px]:p-[15px] max-[767px]:gap-6 max-[575px]:p-[12px] max-[575px]:gap-5 max-[375px]:p-[10px]">
          <div class="flex flex-col items-center gap-7 text-center max-[767px]:gap-5">
            <div class="text-lg font-medium capitalize max-[575px]:text-base">{{ addReviewTitle }}</div>
            <div class="flex items-center gap-2">
              <Star
                v-for="star in 5"
                :key="star"
                class="w-7 h-7 cursor-pointer max-[575px]:w-6 max-[575px]:h-6"
                :class="star <= newReviewRating ? 'text-[#ffc107]' : 'text-[#e0e0e0]'"
                @click="setRating(star)"
              />
            </div>
          </div>
          <div class="flex flex-col gap-5">
            <textarea
              v-model="newReviewText"
              :placeholder="reviewPlaceholder"
              class="w-full min-h-[93px] p-5 border border-[#eee] rounded-lg bg-gray-100 text-base font-medium text-[#424242] resize-y max-[767px]:p-[15px] max-[767px]:min-h-[80px] max-[575px]:p-3 max-[575px]:min-h-[70px] max-[575px]:text-sm"
            ></textarea>
            <button class="w-full h-12 bg-[#fcc207] hover:bg-[#e6af06] text-[#212121] rounded text-base font-medium max-[575px]:h-11 max-[575px]:text-sm" @click="submitReview">
              <span>{{ submitText }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Filter Panel -->
      <div v-if="showFilter" class="absolute top-16 right-0 w-[274px] bg-white border border-[#eee] rounded shadow-[0_4px_14px_rgba(158,158,158,0.1)] z-10 max-[767px]:fixed max-[767px]:inset-0 max-[767px]:w-full max-[767px]:h-screen">
        <div class="flex items-center justify-between bg-[#424242] text-[#fafafa] px-4 py-3">
          <span class="text-base font-semibold capitalize">{{ filterTitle }}</span>
          <button @click="toggleFilter" class="p-1 text-[#fafafa]"><X class="w-5 h-5" /></button>
        </div>
        <div class="p-5 flex flex-col gap-5 max-[767px]:p-[15px]">
          <div class="flex flex-col gap-2">
            <div class="text-lg font-medium capitalize max-[767px]:text-base">{{ reviewScoreTitle }}</div>
            <div class="border border-[#e0e0e0] rounded p-2.5 flex flex-col gap-2">
              <label v-for="star in 5" :key="star" class="flex items-center gap-2 text-base text-[#616161] max-[767px]:text-sm">
                <input type="checkbox" v-model="selectedRatings" :value="star" />
                <Star class="w-4 h-4 text-[#ffc107]" />
                <span>{{ star }} Star{{ star > 1 ? 's' : '' }}</span>
              </label>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-lg font-medium capitalize max-[767px]:text-base">{{ dateFilterTitle }}</div>
            <div class="border border-[#e0e0e0] rounded p-2.5 flex flex-col gap-2">
              <label v-for="option in dateFilterOptions" :key="option.value" class="flex items-center gap-2 text-base text-[#616161] max-[767px]:text-sm">
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
    <div class="w-96 bg-white rounded shadow-[0_4px_16px_rgba(158,158,158,0.24)] p-5 flex flex-col gap-6 h-fit max-[1199px]:w-[350px] max-[991px]:w-full max-[991px]:max-w-[792px] max-[991px]:mx-auto max-[767px]:p-[15px] max-[575px]:p-[12px] max-[375px]:p-[10px]">
      <div class="flex items-center gap-6 max-[991px]:justify-center max-[991px]:text-center max-[575px]:flex-col max-[575px]:gap-[15px]">
        <div class="flex flex-col items-center gap-3 text-center">
          <div class="text-[46px] font-semibold text-black max-[767px]:text-[36px] max-[575px]:text-[32px] max-[375px]:text-[28px]">{{ overallRating.toFixed(1) }}</div>
          <div class="text-base font-medium text-[#0bab4b] capitalize max-[767px]:text-sm">{{ ratingLabel }}</div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex items-center">
            <Star v-for="star in 5" :key="star" class="w-5 h-5" :class="star <= Math.round(overallRating) ? 'text-[#ffc107]' : 'text-[#e0e0e0]'" />
          </div>
          <div class="text-base font-medium text-[#616161] capitalize">({{ totalReviews }} reviews)</div>
        </div>
      </div>

      <div class="flex flex-col gap-1.5 max-[575px]:gap-1">
        <div v-for="(count, rating) in ratingBreakdown" :key="rating" class="flex items-center gap-5 max-[575px]:gap-[10px]">
          <div class="w-[43px] flex items-center justify-end gap-1.5 text-[20px] text-[#424242] max-[575px]:w-[35px] max-[575px]:text-[16px]">
            <span>{{ rating }}</span>
            <Star class="w-4 h-4 text-yellow-400" />
          </div>
          <div class="flex-1 h-[5px] bg-[#e0e0e0] rounded overflow-hidden">
            <div class="h-full bg-[#ffc107]" :style="{ width: `${(count / totalReviews) * 100}%` }"></div>
          </div>
          <div class="w-[30px] text-right text-base font-medium text-[#616161] max-[575px]:w-[25px] max-[575px]:text-sm">{{ count }}</div>
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
