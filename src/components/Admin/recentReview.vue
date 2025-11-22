<template>
  <div class="w-full rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex flex-col items-start p-3 sm:p-4 lg:p-6 gap-4 text-left text-xl text-gray-900 font-plus-jakarta-sans">
    
    <div class="w-full flex items-center justify-between">
      
      <h2 class="relative leading-[130%] capitalize font-bold text-lg lg:text-xl">{{ isExpanded ? 'All Reviews' : 'Recent Reviews' }}</h2>
      
      <div 
        class="relative text-sm lg:text-base leading-[130%] capitalize font-semibold text-amber-500 cursor-pointer hover:text-amber-600 transition-colors"
        @click="handleSeeAllClick"
      >
        {{ isExpanded ? 'Show Recent' : 'See All' }} 
      </div>
      
    </div>

    <div class="hidden lg:block w-full overflow-x-auto">
      <table class="w-full table-auto min-w-[800px]">
        <thead class="bg-gray-50 border-b border-gray-200 sticky top-0 bg-white z-10">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Reviewer</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Rating</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Date</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Review</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Status</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(review, index) in displayedReviews" :key="review.id" class="hover:bg-gray-50 active:bg-gray-100 transition">
            <td class="px-4 py-3 text-gray-900 font-medium text-sm truncate">{{ review.reviewer }}</td>
            <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
              <div class="flex items-center gap-1">
                <span>{{ review.rating }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ review.date }}</td>
            <td class="px-4 py-3 text-gray-700 text-sm truncate">
              {{ review.review.split(' ').slice(0, 1).join(' ') }}
            </td>
            
            <td class="px-4 py-3 whitespace-nowrap">
              <span 
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-sm cursor-pointer hover:opacity-80 transition-opacity" 
                :class="getStatusClass(review.status, 'soft')"
                @click="toggleStatus(review)"
              >
                {{ review.status }}
              </span>
            </td>
            
            <td class="px-4 py-3 whitespace-nowrap relative">
              <span
                v-if="editingIndex === index"
                @click="simulateDelete(review)"
                title="Delete Review"
                class="w-5 h-5 text-red-600 cursor-pointer hover:text-red-700 active:text-red-800 transition touch-manipulation flex items-center justify-center"
              >
                <Trash2 class="w-5 h-5" />
              </span>
              
              <MoreHorizontal 
                v-else
                class="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer"
                @click.stop="toggleActions(index)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="lg:hidden w-full flex flex-col gap-4">
      <div 
        v-for="(review, index) in displayedReviews" 
        :key="review.id"
        class="w-full rounded-xl border border-gray-200 p-3 sm:p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] cursor-pointer hover:bg-indigo-50"
      >
        <div class="flex justify-between items-start mb-3">
          <div class="flex flex-col">
            <h3 class="font-semibold text-gray-900 text-base">{{ review.reviewer }}</h3>
            <div class="flex items-center gap-1 mt-1">
              <RatingStars :value="Number(review.rating)" :size-class="'w-4 h-4'" />
            </div>
          </div>
          
          <div class="flex items-center gap-2 shrink-0 relative">
            <span 
                class="text-xs font-medium px-2 py-1 rounded-full cursor-pointer hover:opacity-80 transition-opacity" 
                :class="getStatusClass(review.status, 'soft') + ' bg-opacity-10'"
                @click="toggleStatus(review)"
            >
              {{ review.status }}
            </span>
            
            <span
              v-if="editingIndex === index"
              @click="simulateDelete(review)"
              title="Delete Review"
              class="text-red-500 hover:text-red-700 transition-colors cursor-pointer flex items-center"
            >
              <Trash2 class="w-5 h-5" />
            </span>


            <MoreHorizontal 
                v-else
                class="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" 
                @click.stop="toggleActions(index)"
            />
          </div>
        </div>

        <div class="mb-3">
          <p class="text-sm text-gray-700">
            {{ review.id === expandedReviewId ? review.review : review.review.split(' ').slice(0, 1).join(' ') }}
          </p>
        </div>

          <div class="flex justify-between items-center text-xs text-gray-500">
          <span>{{ review.date }}</span>
          <span
              @click="toggleReviewDetails(review.id)"
            class="text-amber-500 hover:text-amber-600 font-medium cursor-pointer"
          >
            {{ review.id === expandedReviewId ? 'Show Less' : 'View Details' }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="isExpanded && totalPages > 1" class="w-full flex justify-end items-center pt-2 border-t border-gray-200 mt-2">
      <div class="flex items-center gap-3 text-sm text-gray-700">
        
        <span class="font-medium whitespace-nowrap">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button 
          @click="goToPage(currentPage - 1)" 
          :disabled="currentPage === 1"
          class="p-1 rounded-full transition-colors border"
          :class="{
            'text-amber-500 border-amber-500 hover:bg-amber-50': currentPage !== 1, 
            'text-gray-400 border-gray-200 cursor-not-allowed': currentPage === 1
          }"
        >
          <ChevronLeft class="w-5 h-5" />
        </button>

        <button 
          @click="goToPage(currentPage + 1)" 
          :disabled="currentPage === totalPages"
          class="p-1 rounded-full transition-colors border"
          :class="{
            'text-amber-500 border-amber-500 hover:bg-amber-50': currentPage !== totalPages, 
            'text-gray-400 border-gray-200 cursor-not-allowed': currentPage === totalPages
          }"
        >
          <ChevronRight class="w-5 h-5" />
        </button>

      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import { MoreHorizontal, ChevronLeft, ChevronRight, Trash2 } from 'lucide-vue-next'; 
import RatingStars from '~/components/common/RatingStars.vue'
import { getStatusClass } from '~/composables/useStatusClass'
import { useStubClient } from '~/services/stubClient'

const editingIndex = ref(null); 
const isExpanded = ref(false); 
const currentPage = ref(1);
const pageSize = ref(5);
const RECENT_REVIEWS_LIMIT = 5; 
const expandedReviewId = ref(null); 

const allReviews = ref([]); 
const stubClient = useStubClient();
const nuxtApp = useNuxtApp();

let nextId = 1; 

const fetchData = async () => {
  try {
    const reviewsData = await stubClient.list('recentReviews', { delay: 150 });
    allReviews.value = (reviewsData || []).map(review => ({ ...review, id: review.id || nextId++ }));
  } catch (error) {
    console.error('Failed to load reviews:', error);
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.alert('Failed to load reviews'); 
      } catch {}
    }
    allReviews.value = [];
  }
};

const totalPages = computed(() => allReviews.value.length === 0 ? 0 : Math.ceil(allReviews.value.length / pageSize.value));

const displayedReviews = computed(() => {
  if (!isExpanded.value) return allReviews.value.slice(0, RECENT_REVIEWS_LIMIT);
  const start = (currentPage.value - 1) * pageSize.value;
  return allReviews.value.slice(start, start + pageSize.value);
});

const handleSeeAllClick = () => {
  isExpanded.value = !isExpanded.value;
  currentPage.value = 1; 
  editingIndex.value = null; 
  expandedReviewId.value = null;
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    editingIndex.value = null; 
    expandedReviewId.value = null;
  }
};

const toggleReviewDetails = (reviewId) => {
  expandedReviewId.value = expandedReviewId.value === reviewId ? null : reviewId;
};

const toggleActions = (index) => {
  editingIndex.value = editingIndex.value === index ? null : index;
};

const findReviewIndexById = (reviewId) => allReviews.value.findIndex(review => review.id === reviewId);

const toggleStatus = (row) => {
  const actualIndex = findReviewIndexById(row.id);
  if (actualIndex !== -1) {
    const currentStatus = allReviews.value[actualIndex].status;
    allReviews.value[actualIndex].status = (currentStatus === 'Approved') ? 'Rejected' : 'Approved';

    if (import.meta.client) {
      const newStatus = allReviews.value[actualIndex].status;
      nuxtApp.$awn?.success(`Review status updated to ${newStatus}.`);
    }
  }
  editingIndex.value = null; 
};

const simulateDelete = async (review) => {
  if (!review?.id) {
    editingIndex.value = null;
    return;
  }

  const confirmed = confirm(`Are you sure you want to delete the review by ${review.reviewer}?`);
  if (!confirmed) {
    editingIndex.value = null;
    return;
  }

  try {
    await stubClient.remove('recentReviews', review.id, { delay: 160 });
    allReviews.value = allReviews.value.filter(r => r.id !== review.id);

    const newTotalPages = Math.max(1, Math.ceil(allReviews.value.length / pageSize.value));
    if (currentPage.value > newTotalPages) {
      currentPage.value = newTotalPages;
    }

    if (import.meta.client) {
      nuxtApp.$awn?.error(`Review by ${review.reviewer} has been permanently deleted.`);
    }
  } catch (error) {
    console.error('Failed to delete recent review:', error);
    if (import.meta.client) {
      nuxtApp.$awn?.alert(`Failed to delete the review by ${review.reviewer}.`);
    }
  } finally {
    editingIndex.value = null;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>