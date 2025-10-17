<template>
  <div class="min-h-screen flex justify-center px-4 lg:px-6 py-2 bg-white">
    
    <div class="flex flex-col lg:flex-row items-stretch justify-center gap-6 w-[97%] max-w-6xl lg:h-[80vh]">

      <div class="w-full lg:flex-1 shadow-lg shadow-gray-200/50 bg-white border border-gray-200 rounded-xl flex flex-col items-start p-6 gap-6 min-w-0 h-full">
        <div class="w-full border-b border-gray-200 flex items-center pb-3 gap-2 text-lg font-semibold text-gray-800 shrink-0">
          <Building class="w-5 h-5 text-indigo-500" />
          <div class="leading-relaxed capitalize">Company Information</div>
        </div>

        <div class="self-stretch flex flex-col items-start pl-0 sm:pl-7 gap-4 text-left text-sm text-gray-600 flex-grow overflow-y-auto pr-2">
          
          <div class="flex items-center gap-3 w-full flex-wrap">
            <div class="w-full sm:w-56 flex items-center justify-between gap-2 shrink-0">
              <div class="flex items-center gap-2">
                <Globe class="w-4 h-4 text-gray-500" />
                <div class="font-medium">Website</div>
              </div>
              <div class="font-medium hidden sm:block">:</div>
            </div>
            <a 
              v-if="website"
              :href="computedWebsiteHref" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center text-blue-600 hover:underline break-all"
            >
              {{ website }}
              <ExternalLink class="w-4 h-4 ml-1" />
            </a>
            <span v-else class="break-words text-gray-500">Not provided</span>
          </div>

          <!-- Phone -->
          <div class="flex items-center gap-3 w-full flex-wrap">
            <div class="w-full sm:w-56 flex items-center justify-between gap-2 shrink-0">
              <div class="flex items-center gap-2">
                <Phone class="w-4 h-4 text-gray-500" />
                <div class="font-medium">Phone Number</div>
              </div>
              <div class="font-medium hidden sm:block">:</div>
            </div>
            <div class="break-words text-gray-700">{{ phone || 'Not provided' }}</div>
          </div>

          <!-- Email -->
          <div class="flex items-center gap-3 w-full flex-wrap">
            <div class="w-full sm:w-56 flex items-center justify-between gap-2 shrink-0">
              <div class="flex items-center gap-2">
                <Mail class="w-4 h-4 text-gray-500" />
                <div class="font-medium">Work email</div>
              </div>
              <div class="font-medium hidden sm:block">:</div>
            </div>
            <div class="break-words text-gray-700">{{ email || 'Not provided' }}</div>
          </div>

          <!-- Location -->
          <div class="flex items-center gap-3 w-full flex-wrap">
            <div class="w-full sm:w-56 flex items-center justify-between gap-2 shrink-0">
              <div class="flex items-center gap-2">
                <MapPin class="w-4 h-4 text-gray-500" />
                <div class="font-medium">Location</div>
              </div>
              <div class="font-medium hidden sm:block">:</div>
            </div>
            <div class="break-words text-gray-700">{{ location || 'Not provided' }}</div>
          </div>

          <!-- Revenue -->
          <div class="flex items-center gap-3 w-full flex-wrap">
            <div class="w-full sm:w-56 flex items-center justify-between gap-2 shrink-0">
              <div class="flex items-center gap-2">
                <DollarSign class="w-4 h-4 text-gray-500" />
                <div class="font-medium">Annual Revenue</div>
              </div>
              <div class="font-medium hidden sm:block">:</div>
            </div>
            <div class="break-words text-gray-700">{{ revenue || 'Not provided' }}</div>
          </div>

          <!-- Employees -->
          <div class="flex items-center gap-3 w-full flex-wrap">
            <div class="w-full sm:w-56 flex items-center justify-between gap-2 shrink-0">
              <div class="flex items-center gap-2">
                <Users class="w-4 h-4 text-gray-500" />
                <div class="font-medium">Number of Employees</div>
              </div>
              <div class="font-medium hidden sm:block">:</div>
            </div>
            <div class="break-words text-gray-700">{{ employees || 'Not provided' }}</div>
          </div>

          <!-- Industry -->
          <div class="flex items-center gap-3 w-full flex-wrap">
            <div class="w-full sm:w-56 flex items-center justify-between gap-2 shrink-0">
              <div class="flex items-center gap-2">
                <Briefcase class="w-4 h-4 text-gray-500" />
                <div class="font-medium">Industry</div>
              </div>
              <div class="font-medium hidden sm:block">:</div>
            </div>
            <div class="break-words text-gray-700">{{ industry || 'Not provided' }}</div>
          </div>

          <!-- Category -->
          <div class="flex items-center gap-3 w-full flex-wrap">
            <div class="w-full sm:w-56 flex items-center justify-between gap-2 shrink-0">
              <div class="flex items-center gap-2">
                <Tag class="w-4 h-4 text-gray-500" />
                <div class="font-medium">Company Category</div>
              </div>
              <div class="font-medium hidden sm:block">:</div>
            </div>
            <div class="break-words text-gray-700">{{ category || 'Not provided' }}</div>
          </div>

        </div>
      </div>

      <!-- Right Card -->
      <div class="w-full lg:w-[480px] lg:flex-shrink-0 shadow-lg shadow-gray-200/50 bg-white border border-gray-200 rounded-xl flex flex-col items-center p-6 gap-6 min-h-0 h-full overflow-y-auto">
        
        <div class="flex flex-col items-center gap-4 w-full shrink-0">
          <img class="w-36 h-36 rounded-full object-cover shadow-md" :src="profileImage || '/profile.png'" :alt="ownerName || 'Owner'" />
          
          <div class="flex flex-col items-center justify-center gap-2.5">
            <div class="text-xl font-semibold text-gray-800">{{ ownerName || 'Owner' }}</div>
            <div class="text-base text-gray-500 text-center">{{ ownerTitle || '' }}</div>
          </div>
        </div>
        
        <div class="text-base leading-relaxed italic text-gray-700 text-center flex-grow">
          "{{ ownerBio || '' }}"
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Building, Globe, Phone, Mail, MapPin, DollarSign, Users, Briefcase, Tag, ExternalLink 
} from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{
  website?: string,
  phone?: string,
  email?: string,
  location?: string,
  revenue?: string,
  employees?: string,
  industry?: string,
  category?: string,
  profileImage?: string,
  ownerName?: string,
  ownerTitle?: string,
  ownerBio?: string,
}>();

const computedWebsiteHref = computed(() => {
  const raw = props.website || '';
  if (!raw) return '';
  return raw.startsWith('http://') || raw.startsWith('https://') ? raw : `https://${raw}`;
});
</script>

<style scoped>
.shadow-lg {
  box-shadow: 0 4px 16px rgba(158, 158, 158, 0.24);
}
</style>
