<template>
  <div class="w-full min-h-screen bg-white p-3 sm:p-4 md:p-6">
    <div class="w-full rounded-xl bg-gradient-to-br from-indigo-500/10 to-pink-500/10 p-4 sm:p-6 border border-gray-200 shadow-lg mb-4 sm:mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">Welcome John</h1>
        </div>
        <button
          class="bg-white/90 hover:bg-white text-gray-800 font-semibold px-4 py-2.5 transition shadow-md whitespace-nowrap text-sm w-full sm:w-auto text-center rounded-none border-none"
          aria-label="List Company"
        >
          List Company
        </button>
      </div>
    </div>

    <form
      @submit.prevent="saveChanges"
      class="w-full relative bg-white flex flex-col gap-4 sm:gap-6 md:gap-8 p-3 sm:p-4 md:p-6 lg:p-8 rounded border-gainsboro border-solid border-[1px]"
    >
      <!-- Branding Assets Section -->
      <div class="space-y-4">
        <div class="flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6">
          <!-- Logo Upload -->
          <div class="flex flex-col items-start gap-3 sm:gap-4 w-full lg:w-[350px]">
            <label class="font-medium text-sm text-gray-700">Company Logo</label>
            <div
              class="w-full rounded border-gainsboro border-solid border-[1px] bg-gray-50 h-[140px] sm:h-[160px] md:h-[180px] flex items-center justify-center p-3 sm:p-4 hover:border-gray-400 transition-colors cursor-pointer"
            >
              <div class="flex flex-col items-center justify-center gap-1 sm:gap-2 text-center">
                <Image class="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                <p class="text-xs text-gray-500 font-medium">Drag & drop or click to upload</p>
                <p class="text-xs text-gray-400">JPG, GIF, or PNG. Max size 2MB.</p>
              </div>
            </div>
            <input type="file" id="logo-upload" class="hidden" accept=".jpg,.gif,.png" />
            <label
              for="logo-upload"
              class="w-full bg-[#1877F2] text-white h-10 flex items-center justify-center gap-2 font-medium hover:bg-[#166FE0] transition-colors cursor-pointer rounded-none border-none text-sm sm:text-base"
            >
              <Upload class="w-4 h-4" />
              Upload Logo
            </label>
          </div>

          <!-- Cover Photo Upload -->
          <div class="flex flex-col items-start gap-3 sm:gap-4 flex-1 w-full">
            <label class="font-medium text-sm text-gray-700">Cover Photo</label>
            <div
              class="w-full rounded border-gainsboro border-solid border-[1px] bg-gray-50 h-[140px] sm:h-[160px] md:h-[180px] flex items-center justify-center p-3 sm:p-4 hover:border-gray-400 transition-colors cursor-pointer"
            >
              <div class="flex flex-col items-center justify-center gap-1 sm:gap-2 text-center">
                <Monitor class="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                <p class="text-xs text-gray-500 font-medium">Drag & drop or click to upload</p>
                <p class="text-xs text-gray-400">Optimal size 1920x400px.</p>
              </div>
            </div>
            <input type="file" id="cover-upload" class="hidden" accept=".jpg,.gif,.png" />
            <label
              for="cover-upload"
              class="w-full bg-[#1877F2] text-white h-10 flex items-center justify-center gap-2 font-medium hover:bg-[#166FE0] transition-colors cursor-pointer rounded-none border-none text-sm sm:text-base"
            >
              <Upload class="w-4 h-4" />
              Upload Cover Photo
            </label>
          </div>
        </div>
      </div>

      <!-- Core Information Section -->
      <div class="space-y-4 sm:space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <!-- Left Column -->
          <div class="space-y-3 sm:space-y-4">
            <div>
              <label class="font-medium text-sm text-gray-700 block mb-2">Company Name <span class="text-red-500">*</span></label>
              <input 
                type="text" 
                v-model="companyData.name"
                placeholder=""
                required
                class="w-full rounded-none border-gainsboro border-solid border-[1px] px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 focus:border-gray-500 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-2">Website</label>
              <input 
                type="url" 
                v-model="companyData.website"
                placeholder="https://company.com"
                class="w-full rounded-none border-gainsboro border-solid border-[1px] px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 focus:border-gray-500 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-2">Number of Employees <span class="text-red-500">*</span></label>
              <div class="relative">
                <select 
                  v-model="companyData.employees"
                  required
                  class="w-full rounded-none border-gainsboro border-solid border-[1px] appearance-none px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 focus:border-gray-500 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select range</option>
                  <option value="1-10">1-10</option>
                  <option value="10-20">10-20</option>
                  <option value="21-50">21-50</option>
                  <option value="51+">51+</option>
                </select>
                <ChevronDown class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-2">First Name <span class="text-red-500">*</span></label>
              <input 
                type="text" 
                v-model="companyData.firstName"
                required
                class="w-full rounded-none border-gainsboro border-solid border-[1px] px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 focus:border-gray-500 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>
            
            <div>
              <label class="font-medium text-sm text-gray-700 block mb-2">Job Title <span class="text-red-500">*</span></label>
              <input 
                type="text" 
                v-model="companyData.jobTitle"
                required
                class="w-full rounded-none border-gainsboro border-solid border-[1px] px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 focus:border-gray-500 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-2">Company Category <span class="text-red-500">*</span></label>
              <div class="relative">
                <select 
                  v-model="companyData.category"
                  required
                  class="w-full rounded-none border-gainsboro border-solid border-[1px] appearance-none px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 focus:border-gray-500 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select category</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-3 sm:space-y-4">
            <div>
              <label class="font-medium text-sm text-gray-700 block mb-2">Work Email <span class="text-red-500">*</span></label>
              <input 
                type="email" 
                v-model="companyData.email"
                placeholder="contact@company.com"
                required
                class="w-full rounded-none border-gainsboro border-solid border-[1px] px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 focus:border-gray-500 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-2">Phone Number</label>
              <input 
                type="tel" 
                v-model="companyData.phone"
                placeholder="+1 (555) 123-4567"
                class="w-full rounded-none border-gainsboro border-solid border-[1px] px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 focus:border-gray-500 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-2">Annual Revenue</label>
              <div class="relative">
                <select 
                  v-model="companyData.revenue"
                  class="w-full rounded-none border-gainsboro border-solid border-[1px] appearance-none px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 focus:border-gray-500 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select range</option>
                  <option value="<$1M"><$1M</option>
                  <option value="$1M-$10M">$1M - $10M</option>
                  <option value="$10M+">$10M+</option>
                </select>
                <ChevronDown class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-2">Last Name <span class="text-red-500">*</span></label>
              <input 
                type="text" 
                v-model="companyData.lastName"
                required
                class="w-full rounded-none border-gainsboro border-solid border-[1px] px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 focus:border-gray-500 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-2">Industry <span class="text-red-500">*</span></label>
              <div class="relative">
                <select 
                  v-model="companyData.industry"
                  required
                  class="w-full rounded-none border-gainsboro border-solid border-[1px] appearance-none px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 focus:border-gray-500 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select industry</option>
                  <option value="Technology">Technology</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                </select>
                <ChevronDown class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-2">Company Location <span class="text-red-500">*</span></label>
              <div class="relative">
                <select 
                  v-model="companyData.location"
                  required
                  class="w-full rounded-none border-gainsboro border-solid border-[1px] appearance-none px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 focus:border-gray-500 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select location</option>
                  <option value="San Francisco, CA">San Francisco, CA</option>
                  <option value="New York, NY">New York, NY</option>
                  <option value="Remote">Remote</option>
                </select>
                <ChevronDown class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Description Section -->
      <div class="space-y-4 sm:space-y-6">
        <div class="grid grid-cols-1 gap-3 sm:gap-4">
            <div>
              <label class="font-medium text-sm text-gray-700 block mb-2">Tagline</label>
              <input 
                type="text" 
                v-model="companyData.tagline"
                placeholder="e.g., Innovative technology solutions for modern businesses"
                class="w-full rounded-none border-gainsboro border-solid border-[1px] px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 focus:border-gray-500 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>
          
            <div>
              <label class="font-medium text-sm text-gray-700 block mb-2">Description <span class="text-red-500">*</span></label>
              <textarea
                v-model="companyData.description"
                rows="3"
                class="w-full rounded-none border-gainsboro border-solid border-[1px] px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 resize-none focus:border-gray-500 focus:bg-white transition-colors placeholder-gray-400"
                placeholder="Describe your company's mission, products, and services..."
                required
              ></textarea>
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-2">Services You Provide</label>
              <textarea
                v-model="companyData.services"
                rows="2"
                class="w-full rounded-none border-gainsboro border-solid border-[1px] px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-700 resize-none focus:border-gray-500 focus:bg-white transition-colors placeholder-gray-400"
                placeholder="e.g., Custom Software Development, Cloud Migration, Mobile App Development, ..."
              ></textarea>
            </div>
        </div>
      </div>
      
      <!-- Submit Button -->
        <div class="flex justify-end pt-4 border-t border-gainsboro">
          <button
            type="submit"
            :disabled="isSaving"
            :class="[
              'w-full sm:w-[250px] bg-[#1877F2] text-white py-3 font-medium flex items-center justify-center gap-2 transition-colors rounded-none border-none text-sm sm:text-base',
              isSaving ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#166FE0]'
            ]"
          >
            <Save class="w-4 h-4" />
            <span>{{ isSaving ? 'Saving...' : 'Save & Apply Changes' }}</span>
          </button>
        </div>
    </form>
  </div>
</template>

<script setup>
import { Upload, Image, Monitor, Pencil, Save, ChevronDown } from 'lucide-vue-next';
import { reactive, ref, watchEffect } from 'vue';
import { useStubResource } from '~/composables/useStubResource';
import { useStubClient } from '~/services/stubClient';

const stubClient = useStubClient();
const nuxtApp = useNuxtApp();

const defaultCompanyState = () => ({
  name: '',
  website: '',
  employees: '',
  firstName: '',
  jobTitle: '',
  category: '',
  email: '',
  phone: '',
  revenue: '',
  lastName: '',
  industry: '',
  location: '',
  tagline: '',
  description: '',
  services: '',
});

const companyData = reactive(defaultCompanyState());
const isEditing = ref(false);
const isSaving = ref(false);

const { data: agencyCompanyData, refresh: refreshAgencyCompany } = await useStubResource('agencyCompany', {
  default: () => defaultCompanyState(),
});

watchEffect(() => {
  const payload = agencyCompanyData.value || {};
  const defaults = defaultCompanyState();
  for (const key of Object.keys(defaults)) {
    companyData[key] = payload?.[key] ?? defaults[key];
  }
});

const saveChanges = async () => {
  if (isSaving.value) return;
  isSaving.value = true;

  try {
    const payload = JSON.parse(JSON.stringify(companyData));
    await stubClient.update('agencyCompany', undefined, payload, { delay: 200 });
    await refreshAgencyCompany();
    isEditing.value = false;
    if (import.meta.client) {
      nuxtApp.$awn?.success('Company profile updated.');
    }
  } catch (error) {
    console.error('Failed to update company profile:', error);
    if (import.meta.client) {
      nuxtApp.$awn?.alert('Failed to save changes. Please try again.');
    }
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped>
/* Define gainsboro border color */
.border-gainsboro {
  border-color: #DCDCDC;
}

/* Focus states for inputs */
input:focus, 
select:focus, 
textarea:focus {
  outline: none;
  border-color: #6b7280;
}

/* Select dropdown styling */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Improved mobile responsiveness */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  input, select, textarea {
    font-size: 16px; /* Prevents zoom on iOS */
  }
}
</style>