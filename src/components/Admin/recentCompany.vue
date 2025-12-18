<template>
  <div class="w-full rounded-lg bg-white border-whitesmoke border-solid border-[1px] flex flex-col items-start p-3 sm:p-4 lg:p-6 gap-4 text-left text-xl text-gray-900 font-plus-jakarta-sans">
    
    <div class="w-full flex items-center justify-between">
      <h2 class="relative leading-[130%] capitalize font-bold text-lg lg:text-xl">Recent Companies</h2>
      
      <div 
        class="relative text-sm lg:text-base leading-[130%] capitalize font-semibold text-amber-500 cursor-pointer hover:text-amber-600 transition-colors"
        @click="goToCompanyManagement"
      >
        SHOW ALL
      </div>
    </div>

      <div class="hidden lg:block w-full">
        <div class="panel-scroll panel-scroll--padded scrollbar-thin">
          <table class="w-full table-auto min-w-[800px]">
        <thead class="bg-gray-50 border-b border-gray-200 sticky top-0 bg-white z-10">
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
            v-for="(row, index) in paginatedRows" 
            :key="row.id || index" 
            class="hover:bg-gray-50 active:bg-gray-100 transition cursor-pointer"
            @click="openCompanyDetail(row)"
          >
            <td class="px-4 py-3 text-gray-900 font-medium text-sm truncate">{{ row.name }}</td>
            <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ row.date }}</td>
            <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ row.phone }}</td>
            <td class="px-4 py-3 text-amber-500 text-sm truncate">
                <a
                  :href="'https://' + row.website"
                  target="_blank"
                  class="hover:underline"
                  @click.stop
                >
                  {{ row.website }}
                </a>
            </td>
            <td class="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{{ row.category }}</td>
            
            <td class="px-4 py-3 whitespace-nowrap">
              <div @click.stop>
                <StatusDropdown
                  :model-value="row.status"
                  :options="statusOptions"
                  variant="soft"
                  @change="(value) => updateStatus(row, value)"
                />
              </div>
            </td>
            
            <td class="px-4 py-3 whitespace-nowrap relative">
              <button
  type="button"
  @click.stop="simulateDelete(row)"
  title="Delete Company"
  class="bg-transparent border-0 p-0 text-red-500 hover:text-red-700 focus:outline-none transition-colors inline-flex items-center cursor-pointer"
>
  <Trash2 class="w-5 h-5" />
</button>

            </td>
          </tr>
        </tbody>
          </table>
        </div>
    </div>

    <div class="lg:hidden w-full flex flex-col gap-4">
      <div
        v-for="(row, index) in paginatedRows"
        :key="row.id || index"
        class="w-full rounded-xl border border-gray-200 p-3 sm:p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] cursor-pointer"
        @click="openCompanyDetail(row)"
      >
        <div class="flex justify-between items-start mb-3">
          <div class="flex flex-col flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 text-base truncate">{{ row.name }}</h3>
            <span class="text-sm text-gray-600 mt-1 truncate">{{ row.category }}</span>
          </div>
          <div class="flex items-center gap-2 shrink-0 ml-4">
            
            <div @click.stop>
              <StatusDropdown
                :model-value="row.status"
                :options="statusOptions"
                variant="soft"
                @change="(value) => updateStatus(row, value)"
              />
            </div>
            
            <button
              type="button"
              @click.stop="simulateDelete(row)"
              title="Delete Company"
              class="text-red-500 hover:text-red-700 transition-colors cursor-pointer inline-flex items-center"
            >
              <Trash2 class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="flex justify-between items-end">
          <div class="flex flex-col gap-3 text-sm flex-1">
            
            <div class="flex flex-col">
              <span class="text-gray-500 text-xs">Date:</span>
              <span class="text-gray-700 whitespace-nowrap truncate">{{ row.date }}</span>
            </div>
            
            <div class="flex flex-col">
              <span class="text-gray-500 text-xs">Phone:</span>
              <span class="text-gray-700 whitespace-nowrap truncate">{{ row.phone }}</span>
            </div>
            
            <div v-if="expandedRowId === row.id" class="flex flex-col transition-all duration-300">
              <span class="text-gray-500 text-xs">Website:</span>
              <a
                :href="'https://' + row.website"
                class="text-amber-500 hover:text-amber-600 truncate"
                target="_blank"
                @click.stop
              >
                {{ row.website }}
              </a>
            </div>
            
          </div>

          <div class="ml-4 flex-shrink-0 self-end">
            <span
              @click.stop="toggleDetails(row.id)"
              class="text-amber-500 hover:text-amber-600 font-medium text-sm cursor-pointer whitespace-nowrap"
            >
              {{ expandedRowId === row.id ? 'Hide Details' : 'View Details' }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
// import Swal from 'sweetalert2'; // REMOVED Swal
import { Trash2 } from 'lucide-vue-next'; 
import StatusDropdown from '~/components/common/StatusDropdown.vue'
import { useStubClient } from '~/services/stubClient'

const RECENT_COMPANIES_LIMIT = 5; 
const expandedRowId = ref(null); 

const allRows = ref([]); 
const stubClient = useStubClient();
const nuxtApp = useNuxtApp();
const router = useRouter();

let nextId = 1;
const statusOptions = ['Pending', 'Approved', 'Rejected'];

const fetchData = async () => {
  try {
    const rowsData = await stubClient.list('recentCompanies', { delay: 140 });
    allRows.value = (rowsData || []).map(row => ({
      ...row,
      id: row.id || nextId++,
      status: row.status || 'Pending' 
    }));
  } catch (error) {
    console.error('Failed to load recent companies:', error);
    // AWN alert for error loading data
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.alert('Failed to load recent companies');
      } catch {}
    }
    allRows.value = [];
  }
};

const paginatedRows = computed(() => {
    return allRows.value.slice(0, RECENT_COMPANIES_LIMIT);
});

const goToCompanyManagement = () => {
  router.push('/admin/manage-companies');
};

const toggleDetails = (rowId) => {
    expandedRowId.value = expandedRowId.value === rowId ? null : rowId;
};

const findRowIndexById = (rowId) => {
  return allRows.value.findIndex(row => row.id === rowId);
};

const updateStatus = async (row, nextStatus) => {
    if (!row?.id) {
        return;
    }

    const actualIndex = findRowIndexById(row.id);
    if (actualIndex === -1) {
        return;
    }

    const currentStatus = allRows.value[actualIndex].status || 'Pending';
    if (!nextStatus || currentStatus === nextStatus) {
      return;
    }

    allRows.value[actualIndex].status = nextStatus;

    try {
        await stubClient.update('recentCompanies', row.id, { status: nextStatus }, { delay: 140 });
        if (import.meta.client) {
            nuxtApp.$awn?.success(`Company ${row.name} status changed to ${nextStatus}.`);
        }
    } catch (error) {
        console.error('Failed to update company status:', error);
        allRows.value[actualIndex].status = currentStatus;
        if (import.meta.client) {
            nuxtApp.$awn?.alert(`Failed to update status for ${row.name}. Please try again.`);
        }
    } finally {
    }
};


const simulateDelete = async (row) => {
  if (!row?.id) {
    return;
  }

  const confirmed = confirm(`Are you sure you want to delete ${row.name}?`);
  if (!confirmed) {
    return;
  }

  try {
    await stubClient.remove('recentCompanies', row.id, { delay: 160 });
    allRows.value = allRows.value.filter(r => r.id !== row.id);

    if (import.meta.client) {
      nuxtApp.$awn?.success(`The company ${row.name} has been successfully deleted.`);
    }
  } catch (error) {
    console.error('Failed to delete recent company:', error);
    if (import.meta.client) {
      nuxtApp.$awn?.alert(`Failed to delete ${row.name}. Please try again.`);
    }
  } finally {
  }
};


const openCompanyDetail = (row) => {
  if (!row) return;
  const query = {};
  if (row.id) {
    query.id = String(row.id);
  }
  if (row.slug) {
    query.slug = row.slug;
  }
  if (row.name) {
    query.title = row.name;
  }
  router.push({
    path: '/agency',
    query,
  });
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