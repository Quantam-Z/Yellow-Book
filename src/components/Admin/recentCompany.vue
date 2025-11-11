<template>
  <div class="w-full rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex flex-col items-start p-3 sm:p-4 lg:p-6 gap-4 text-left text-xl text-gray-900 font-plus-jakarta-sans">
    <!-- Header -->
    <div class="w-full flex items-center justify-between">
      <h2 class="relative leading-[130%] capitalize font-bold text-lg lg:text-xl">Recent Company</h2>
      <NuxtLink
        to="/dashboard/admin/manage-companies"
        class="relative text-sm lg:text-base leading-[130%] capitalize font-semibold text-amber-500 hover:text-amber-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-md px-2 py-1 cursor-pointer"
      >
        See All
      </NuxtLink>
    </div>

    <!-- Desktop Table -->
    <div class="hidden lg:block w-full overflow-x-auto">
      <table class="w-full table-auto min-w-[800px]">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[160px]">Company Name</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Date</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Phone</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[160px]">Website</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Category</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Status</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="(row, index) in rows"
            :key="index"
            class="hover:bg-gray-50 active:bg-gray-100 transition"
          >
            <td class="px-4 py-3 text-gray-900 font-medium text-sm truncate">{{ row.name }}</td>
            <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ row.date }}</td>
            <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ row.phone }}</td>
            <td class="px-4 py-3 text-yellow-500 text-sm truncate">{{ row.website }}</td>
            <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ row.category }}</td>
            <td class="px-4 py-3 whitespace-nowrap">
              <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-sm" :class="getStatusClass(row.status)">
                {{ row.status }}
              </span>
            </td>
            <td class="px-4 py-3 whitespace-nowrap">
              <button
                type="button"
                class="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 transition"
                @click.stop="viewDetails(row)"
                :aria-label="`View details for ${row.name}`"
              >
                <MoreHorizontal class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Cards -->
    <div class="lg:hidden w-full flex flex-col gap-4">
      <div
        v-for="(row, index) in rows"
        :key="index"
        class="w-full rounded-xl border border-gray-200 p-3 sm:p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] cursor-pointer hover:bg-indigo-50"
      >
        <div class="flex justify-between items-start mb-3">
          <div class="flex flex-col flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 text-base truncate">{{ row.name }}</h3>
            <span class="text-sm text-gray-600 mt-1 truncate">{{ row.category }}</span>
          </div>
          <div class="flex items-center gap-2 shrink-0 ml-4">
            <span class="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap" :class="getStatusClass(row.status) + ' bg-opacity-10'">
              {{ row.status }}
            </span>
            <button
              type="button"
              class="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 transition"
              @click.stop="viewDetails(row)"
              :aria-label="`View details for ${row.name}`"
            >
              <MoreHorizontal class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="flex justify-between items-end">
          <div class="flex flex-col gap-3 text-sm flex-1">
            <div class="flex flex-col">
              <span class="text-gray-700 whitespace-nowrap truncate">{{ row.date }}</span>
            </div>

            <div class="flex flex-col">
              <span class="text-gray-700 whitespace-nowrap truncate">{{ row.phone }}</span>
            </div>

            <div class="flex flex-col">
              <a :href="'https://' + row.website" class="text-amber-500 hover:text-amber-600 truncate" target="_blank">
                {{ row.website }}
              </a>
            </div>
          </div>

          <div class="ml-4 flex-shrink-0">
            <button
              type="button"
              class="text-amber-500 hover:text-amber-600 font-medium text-sm cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 rounded-md px-2 py-0.5"
              @click="viewDetails(row)"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { MoreHorizontal } from 'lucide-vue-next';
import { getStatusClass } from '~/composables/useStatusClass'
import { useStubClient } from '~/services/stubClient'
import { useRouter } from 'vue-router'

// Load recent companies from stub
const rows = ref([]);
const stubClient = useStubClient();
const nuxtApp = useNuxtApp();
const router = useRouter();

const fetchData = async () => {
  try {
    const rowsData = await stubClient.list('recentCompanies', { delay: 140 });
    rows.value = rowsData || [];
  } catch (error) {
    console.error('Failed to load recent companies:', error);
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.alert('Failed to load recent companies');
      } catch {}
    }
    rows.value = [];
  }
};

onMounted(() => {
  fetchData();
});

const viewDetails = (company) => {
  const query = company?.name ? { company: company.name } : {};
  router.push({ path: '/dashboard/admin/manage-companies', query }).catch((error) => {
    if (error?.name !== 'NavigationDuplicated') {
      console.error('Failed to navigate to company details:', error);
    }
  });
};
</script>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>