<template>
    <div class="w-full font-plus-jakarta-sans max-w-full overflow-hidden">
      
      <!-- Header Section with Gradient Background -->
      <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">My Profile</h1>
          <button
            class="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-semibold px-4 py-2.5 rounded-lg transition shadow-md whitespace-nowrap text-sm w-full sm:w-auto text-center touch-manipulation flex items-center justify-center gap-2"
          >
            <Pencil class="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>
  
      <!-- Main Content Card -->
      <div class="w-full bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <div class="p-4 sm:p-6 md:p-8 space-y-6">
          <!-- Two Column Layout -->
        <div class="flex flex-col md:flex-row gap-8">
          
          <!-- Left Column - Branding Assets -->
          <div class="w-full md:w-[350px] space-y-4">
            <h2 class="text-xl font-bold text-gray-800 border-b pb-2">Branding Assets</h2>
            <div class="flex flex-col items-start gap-4">
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
              <button
                class="w-full rounded-lg bg-indigo-600 text-white h-10 flex items-center justify-center gap-2 font-medium shadow-md hover:bg-indigo-700 transition-colors"
              >
                <Upload class="w-4 h-4" />
                Upload Logo
              </button>
            </div>
          </div>
  
          <!-- Right Column - Core Information -->
          <div class="flex-1 space-y-6">
            <h2 class="text-xl font-bold text-gray-800 border-b pb-2">Core Information</h2>
            
            <!-- Form Fields -->
            <div class="space-y-6">
              <!-- Full Name -->
              <div class="flex flex-col gap-3">
                <label class="font-medium text-sm text-gray-700">Full name</label>
                <div class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                  {{ profileData.fullName }}
                </div>
              </div>
  
              <!-- Contact Info Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Phone Number -->
                <div class="flex flex-col gap-3">
                  <label class="font-medium text-sm text-gray-700">Phone Number</label>
                  <div class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                    {{ profileData.phoneNumber }}
                  </div>
                </div>
  
                <!-- Email -->
                <div class="flex flex-col gap-3">
                  <label class="font-medium text-sm text-gray-700">Email</label>
                  <div class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                    {{ profileData.email }}
                  </div>
                </div>
              </div>
  
              <!-- Location -->
              <div class="flex flex-col gap-3">
                <label class="font-medium text-sm text-gray-700">Location</label>
                <div class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                  {{ profileData.location }}
                </div>
              </div>
  
              <!-- About Yourself -->
              <div class="flex flex-col gap-3">
                <label class="font-medium text-sm text-gray-700">About yourself</label>
                <div 
                  class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-500 min-h-[80px] flex items-start cursor-text"
                  @click="focusTextarea"
                >
                  <span v-if="!profileData.about" class="text-gray-400">Write about yourself in 24 words</span>
                  <span v-else>{{ profileData.about }}</span>
                </div>
              </div>
  
              <!-- Update Profile Button -->
              <button
                class="w-full md:w-[223px] rounded-lg bg-green-500 text-white h-[52px] flex items-center justify-center gap-2 font-semibold shadow-md hover:bg-green-600 transition-colors mt-4"
                @click="updateProfile"
              >
                <Save class="w-5 h-5" />
                Update Profile
              </button>
            </div>
          </div>
          
          <!-- Save Button -->
        <div class="flex justify-end pt-4 border-t border-gray-100">
          <button
            class="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-lg transition shadow-md touch-manipulation flex items-center justify-center gap-2 w-full sm:w-auto"
            @click="saveChanges"
          >
            <Save class="w-4 h-4" />
            Save & Apply Changes
          </button>
        </div>
        </div>
      </div>
  
      <!-- Textarea Modal -->
      <div v-if="showTextareaModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h3 class="text-lg font-semibold mb-4">About Yourself</h3>
          <textarea
            v-model="profileData.about"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm resize-none focus:border-indigo-500 transition-colors"
            rows="4"
            placeholder="Write about yourself in 24 words"
            maxlength="200"
          ></textarea>
          <div class="flex justify-between items-center mt-2">
            <span class="text-xs text-gray-500">{{ profileData.about ? profileData.about.length : 0 }}/200 characters</span>
            <button
              @click="showTextareaModal = false"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Upload, Image, Pencil, Save } from 'lucide-vue-next';
  import { ref, reactive } from 'vue';
  
  // Profile data
  const profileData = reactive({
    fullName: 'Tech Solutions Inc.',
    phoneNumber: '+1 (555) 123-4567',
    email: 'contact@techsolutions.com',
    location: 'San Francisco, CA',
    about: ''
  });
  
  // Modal state
  const showTextareaModal = ref(false);
  
  // Methods
  const focusTextarea = () => {
    showTextareaModal.value = true;
  };
  
  const updateProfile = () => {
    // Handle profile update logic here
    // You can add API call or state management here
  };
  
  const saveChanges = () => {
    // Handle save changes logic here
    // You can add API call or state management here
  };
  </script>
  
  <style scoped>
  .shadow-2xl {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 20px 50px rgba(0, 0, 0, 0.03);
  }
  </style>