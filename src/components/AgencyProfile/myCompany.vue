<template>
  <div class="w-full min-h-screen bg-gray-50 p-4 sm:p-6">
    <div
      class="w-full rounded-xl bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 p-4 mb-6 border border-gray-200 shadow-sm"
    >
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">My Company Profile</h1>
        <button
          @click="isEditing = !isEditing"
          class="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-white border border-indigo-400 text-indigo-600 shadow-md hover:bg-indigo-50 transition-colors"
        >
          <Pencil class="w-4 h-4" />
          {{ isEditing ? 'Viewing Mode' : 'Edit' }}
        </button>
      </div>
      <p class="mt-1 text-sm text-gray-600">
        {{ isEditing ? 'Fields below are editable.' : 'Click "Edit Profile" to modify the details.' }}
      </p>
    </div>

    <form
      @submit.prevent="saveChanges"
      class="w-full relative bg-white flex flex-col gap-8 p-6 lg:p-8 rounded-xl shadow-2xl shadow-gray-200/50"
    >
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-gray-800 border-b pb-2">Branding Assets</h2>
        <div class="flex flex-col md:flex-row items-start justify-between gap-6">
          <div class="flex flex-col items-start gap-4 w-full md:w-[350px]">
            <label class="font-medium text-sm text-gray-700">Company Logo</label>
            <div
              class="w-full rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 h-[180px] flex items-center justify-center p-4 hover:border-blue-400 transition-colors cursor-pointer"
            >
              <div class="flex flex-col items-center justify-center gap-2 text-center">
                <Image class="w-8 h-8 text-gray-400" />
                <p class="text-xs text-gray-500 font-medium">Drag & drop or click to upload</p>
                <p class="text-xs text-gray-400">JPG, GIF, or PNG. Max size 2MB.</p>
              </div>
            </div>
            <input type="file" id="logo-upload" class="hidden" accept=".jpg,.gif,.png" />
            <label
              for="logo-upload"
              class="w-full rounded-lg bg-indigo-600 text-white h-10 flex items-center justify-center gap-2 font-medium shadow-md hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              <Upload class="w-4 h-4" />
              Upload Logo
            </label>
          </div>

          <div class="flex flex-col items-start gap-4 flex-1">
            <label class="font-medium text-sm text-gray-700">Cover Photo</label>
            <div
              class="w-full rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 h-[180px] flex items-center justify-center p-4 hover:border-blue-400 transition-colors cursor-pointer"
            >
              <div class="flex flex-col items-center justify-center gap-2 text-center">
                <Monitor class="w-8 h-8 text-gray-400" />
                <p class="text-xs text-gray-500 font-medium">Drag & drop or click to upload</p>
                <p class="text-xs text-gray-400">Optimal size 1920x400px.</p>
              </div>
            </div>
            <input type="file" id="cover-upload" class="hidden" accept=".jpg,.gif,.png" />
            <label
              for="cover-upload"
              class="w-full rounded-lg bg-indigo-600 text-white h-10 flex items-center justify-center gap-2 font-medium shadow-md hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              <Upload class="w-4 h-4" />
              Upload Cover Photo
            </label>
          </div>
        </div>
      </div>
      <hr class="border-gray-100" />

      <div class="space-y-6">
        <h2 class="text-xl font-bold text-gray-800 border-b pb-2">Core Information</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-6">
            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1">Company Name <span class="text-red-500">*</span></label>
              <input 
                type="text" 
                v-model="companyData.name"
                placeholder="e.g., Tech Solutions Inc."
                required
                class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-indigo-500 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1">Website</label>
              <input 
                type="url" 
                v-model="companyData.website"
                placeholder="https://company.com"
                class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-indigo-500 focus:bg-white transition-colors placeholder-gray-400"
                :class="{ 'text-blue-600 underline': companyData.website }"
              />
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1">Number of Employees <span class="text-red-500">*</span></label>
              <div class="relative">
                <select 
                  v-model="companyData.employees"
                  required
                  class="w-full rounded-lg border border-gray-300 bg-gray-50 appearance-none px-4 py-3 text-sm text-gray-700 focus:border-indigo-500 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select range</option>
                  <option value="1-10">1-10</option>
                  <option value="10-20">10-20</option>
                  <option value="21-50">21-50</option>
                  <option value="51+">51+</option>
                </select>
                <ChevronDown class="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1">First Name <span class="text-red-500">*</span></label>
              <input 
                type="text" 
                v-model="companyData.firstName"
                required
                class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-indigo-500 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>
            
            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1">Job Title <span class="text-red-500">*</span></label>
              <input 
                type="text" 
                v-model="companyData.jobTitle"
                required
                class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-indigo-500 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1">Company Category <span class="text-red-500">*</span></label>
              <div class="relative">
                <select 
                  v-model="companyData.category"
                  required
                  class="w-full rounded-lg border border-gray-300 bg-gray-50 appearance-none px-4 py-3 text-sm text-gray-700 focus:border-indigo-500 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select category</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown class="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1">Work Email <span class="text-red-500">*</span></label>
              <input 
                type="email" 
                v-model="companyData.email"
                placeholder="contact@company.com"
                required
                class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-indigo-500 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1">Phone Number</label>
              <input 
                type="tel" 
                v-model="companyData.phone"
                placeholder="+1 (555) 123-4567"
                class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-indigo-500 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1">Annual Revenue</label>
              <div class="relative">
                <select 
                  v-model="companyData.revenue"
                  class="w-full rounded-lg border border-gray-300 bg-gray-50 appearance-none px-4 py-3 text-sm text-gray-700 focus:border-indigo-500 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select range</option>
                  <option value="<$1M"><$1M</option>
                  <option value="$1M-$10M">$1M - $10M</option>
                  <option value="$10M+">$10M+</option>
                </select>
                <ChevronDown class="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1">Last Name <span class="text-red-500">*</span></label>
              <input 
                type="text" 
                v-model="companyData.lastName"
                required
                class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-indigo-500 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1">Industry <span class="text-red-500">*</span></label>
              <div class="relative">
                <select 
                  v-model="companyData.industry"
                  required
                  class="w-full rounded-lg border border-gray-300 bg-gray-50 appearance-none px-4 py-3 text-sm text-gray-700 focus:border-indigo-500 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select industry</option>
                  <option value="Technology">Technology</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                </select>
                <ChevronDown class="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1">Company Location <span class="text-red-500">*</span></label>
              <div class="relative">
                <select 
                  v-model="companyData.location"
                  required
                  class="w-full rounded-lg border border-gray-300 bg-gray-50 appearance-none px-4 py-3 text-sm text-gray-700 focus:border-indigo-500 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select location</option>
                  <option value="San Francisco, CA">San Francisco, CA</option>
                  <option value="New York, NY">New York, NY</option>
                  <option value="Remote">Remote</option>
                </select>
                <ChevronDown class="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-gray-100" />

      <div class="space-y-6">
        <h2 class="text-xl font-bold text-gray-800 border-b pb-2">Detailed Description</h2>

        <div class="grid md:grid-cols-1 gap-6">
            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1">Tagline</label>
              <input 
                type="text" 
                v-model="companyData.tagline"
                placeholder="e.g., Innovative technology solutions for modern businesses"
                class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-indigo-500 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>
          
            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1">Description <span class="text-red-500">*</span></label>
              <textarea
                v-model="companyData.description"
                rows="4"
                class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 resize-none focus:border-indigo-500 focus:bg-white transition-colors placeholder-gray-400"
                placeholder="Describe your company's mission, products, and services..."
                required
              ></textarea>
            </div>

            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1"
                >Services You Provide (Comma Separated)</label
              >
              <textarea
                v-model="companyData.services"
                rows="3"
                class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 resize-none focus:border-indigo-500 focus:bg-white transition-colors placeholder-gray-400"
                placeholder="e.g., Custom Software Development, Cloud Migration, Mobile App Development, ..."
              ></textarea>
            </div>
        </div>
      </div>
      <div class="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="submit"
          class="w-full sm:w-[250px] rounded-xl bg-green-500 text-white py-3 font-medium flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors"
        >
          <Save class="w-4 h-4" />
          Save & Apply Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { Upload, Image, Monitor, Pencil, Save, ChevronDown } from 'lucide-vue-next';
import { ref } from 'vue';

// --- Form Data State ---
const companyData = ref({
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

const isEditing = ref(false);

// --- Form Submission Handler ---
const saveChanges = () => {
    // In a real application, you would send companyData.value to an API endpoint here.
    alert('Profile changes simulated.');
    // Optional: set isEditing to false after save
    isEditing.value = false; 
};
</script>

<style scoped>
/* Optional: Adding a small custom style for better shadow depth */
.shadow-2xl {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 20px 50px rgba(0, 0, 0, 0.03);
}

/* Fix for background color on select fields in some browsers */
select:required:invalid {
  color: #6b7280; /* text-gray-500/600 for a placeholder effect */
}
</style>