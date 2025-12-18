<template>
  <div class="w-full rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex flex-col items-start p-3 sm:p-4 lg:p-6 gap-4 text-left text-xl text-gray-900 font-plus-jakarta-sans">
    
    <div class="w-full flex items-center justify-between">
      
      <h2 class="relative leading-[130%] capitalize font-bold text-lg lg:text-xl">Recent Reviews</h2>
      
      <div 
        class="relative text-sm lg:text-base leading-[130%] capitalize font-semibold text-amber-500 cursor-pointer hover:text-amber-600 transition-colors"
        @click="goToReviewManagement"
      >
        SHOW ALL
      </div>
      
    </div>

      <div class="hidden lg:block w-full">
        <div class="panel-scroll panel-scroll--padded scrollbar-thin">
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
<tr
  v-for="(review, index) in displayedReviews"
  :key="review.id"
  class="hover:bg-gray-50 active:bg-gray-100 transition cursor-pointer"
  @click="openReviewDetail(review)"
>
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
              <div @click.stop>
                <StatusDropdown
                  :model-value="review.status"
                  :options="statusOptions"
                  variant="soft"
                  @change="(value) => updateStatus(review, value)"
                />
              </div>
            </td>
            
            <td class="px-4 py-3 whitespace-nowrap relative">
              <span
                v-if="editingIndex === index"
                @click.stop="simulateDelete(review)"
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
    </div>

    <div class="lg:hidden w-full flex flex-col gap-4">
      <div 
        v-for="(review, index) in displayedReviews" 
        :key="review.id"
        class="w-full rounded-xl border border-gray-200 p-3 sm:p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] cursor-pointer hover:bg-indigo-50"
        @click="openReviewDetail(review)"
      >
        <div class="flex justify-between items-start mb-3">
          <div class="flex flex-col">
            <h3 class="font-semibold text-gray-900 text-base">{{ review.reviewer }}</h3>
            <div class="flex items-center gap-1 mt-1">
              <RatingStars :value="Number(review.rating)" :size-class="'w-4 h-4'" />
            </div>
          </div>
          
          <div class="flex items-center gap-2 shrink-0 relative">
            <div @click.stop>
              <StatusDropdown
                :model-value="review.status"
                :options="statusOptions"
                variant="soft"
                @change="(value) => updateStatus(review, value)"
              />
            </div>
            
            <span
              v-if="editingIndex === index"
              @click.stop="simulateDelete(review)"
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
              @click.stop="toggleReviewDetails(review.id)"
            class="text-amber-500 hover:text-amber-600 font-medium cursor-pointer"
          >
            {{ review.id === expandedReviewId ? 'Show Less' : 'View Details' }}
          </span>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { MoreHorizontal, Trash2 } from 'lucide-vue-next'; 
import RatingStars from '~/components/common/RatingStars.vue'
import StatusDropdown from '~/components/common/StatusDropdown.vue'
import { getStatusClass } from '~/composables/useStatusClass'
import { useStubClient } from '~/services/stubClient'

const editingIndex = ref(null); 
const RECENT_REVIEWS_LIMIT = 5; 
const expandedReviewId = ref(null); 

const allReviews = ref([]); 
const stubClient = useStubClient();
const nuxtApp = useNuxtApp();
const router = useRouter();

let nextId = 1; 
const statusOptions = ['Pending', 'Approved', 'Rejected'];

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

const displayedReviews = computed(() => {
  return allReviews.value.slice(0, RECENT_REVIEWS_LIMIT);
});

const goToReviewManagement = () => {
  router.push('/admin/manage-review');
};

const toggleReviewDetails = (reviewId) => {
  expandedReviewId.value = expandedReviewId.value === reviewId ? null : reviewId;
};

const openReviewDetail = (review) => {
  if (!review?.id) return;
  router.push(`/company/review/${review.id}`);
};

const toggleActions = (index) => {
  editingIndex.value = editingIndex.value === index ? null : index;
};

const findReviewIndexById = (reviewId) => allReviews.value.findIndex(review => review.id === reviewId);

const updateStatus = async (row, nextStatus) => {
  if (!row?.id) {
    editingIndex.value = null;
    return;
  }

  const actualIndex = findReviewIndexById(row.id);
  if (actualIndex === -1) {
    editingIndex.value = null;
    return;
  }

  const currentStatus = allReviews.value[actualIndex].status || 'Pending';
  if (!nextStatus || currentStatus === nextStatus) {
    editingIndex.value = null;
    return;
  }

  allReviews.value[actualIndex].status = nextStatus;

  try {
    await stubClient.update('recentReviews', row.id, { status: nextStatus }, { delay: 140 });
    if (import.meta.client) {
      nuxtApp.$awn?.success(`Review status updated to ${nextStatus}.`);
    }
  } catch (error) {
    console.error('Failed to update review status:', error);
    allReviews.value[actualIndex].status = currentStatus;
    if (import.meta.client) {
      nuxtApp.$awn?.alert(`Failed to update the status for ${row.reviewer}.`);
    }
  } finally {
    editingIndex.value = null;
  }
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
        nuxtApp.$awn?.success(`Review by ${review.reviewer} has been permanently deleted.`);
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