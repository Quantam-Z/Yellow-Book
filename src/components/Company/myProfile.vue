<template>
  <div class="w-full min-h-screen bg-white p-3 sm:p-4 md:p-6">
    
    <!-- Header Section -->
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

    <!-- Profile Section - Two Column Layout -->
    <div class="w-full relative shadow-[0px_4px_38px_rgba(0,_0,_0,_0.1)] rounded-xl bg-white flex flex-col items-start p-4 sm:p-5 md:p-6 box-border gap-4 sm:gap-5 md:gap-6 text-left text-dimgray font-plus-jakarta-sans">
      <b class="relative leading-[130%] capitalize text-xl sm:text-2xl">Profile</b>
      <div class="self-stretch flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-5 md:gap-6 text-center text-sm sm:text-base">
        
        <!-- Left Column - Photo Upload -->
        <div class="w-full lg:w-[398px] flex flex-col items-start gap-3 sm:gap-4">
          <div class="self-stretch flex flex-col items-start">
            <div 
              class="w-full h-[300px] sm:h-[350px] md:h-[398px] rounded border-gainsboro border-dashed border-[1px] box-border flex items-center justify-center py-4 sm:py-6 md:py-[29px] px-4 sm:px-6 md:px-num-16 bg-gray-50 cursor-pointer"
              @click="triggerFileInput('logo')"
            >
              <div v-if="!profileData.logo" class="w-full flex flex-col items-center justify-center gap-2.5">
                <Image class="w-8 h-8 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px] text-gray-400" />
                <div class="relative leading-[130%] capitalize text-gray-500 text-sm sm:text-base">JPG, GIF or PNG. Max size 2MB.</div>
              </div>
              <div v-else class="flex flex-col items-center justify-center gap-2.5">
                <img :src="profileData.logo" alt="Profile Photo" class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded" />
                <div class="relative leading-[130%] capitalize text-gray-500 text-sm sm:text-base">Click to change photo</div>
              </div>
            </div>
          </div>
          <input 
            type="file" 
            ref="logoInput"
            class="hidden" 
            accept=".jpg,.jpeg,.png,.gif"
            @change="handleLogoUpload"
          />
          <div 
            class="w-full h-12 sm:h-[52px] rounded bg-royalblue flex items-center justify-center py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8 box-border gap-2.5 text-white cursor-pointer hover:bg-blue-700 transition-colors"
            @click="triggerFileInput('logo')"
          >
            <Upload class="h-5 w-5 sm:h-6 sm:w-6" />
            <div class="relative leading-[130%] capitalize font-semibold text-sm sm:text-base">
              {{ profileData.logo ? 'Change Photo' : 'Upload New Photo' }}
            </div>
          </div>
        </div>

        <!-- Right Column - Profile Information -->
        <div class="w-full lg:w-[762px] flex flex-col items-start gap-3 sm:gap-4 text-left">
          
          <!-- Full Name -->
          <div class="w-full flex flex-col items-start gap-1.5">
            <div class="self-stretch relative leading-[130%] capitalize font-medium text-gray-700">Full name</div>
            <input
              type="text"
              v-model="profileData.fullName"
              class="self-stretch rounded border-gainsboro border-solid border-[1px] flex items-center p-3 sm:p-4 text-left text-darkslategray bg-white focus:outline-none focus:border-gray-500 transition-colors h-12 sm:h-[52px]"
              placeholder="Tech Solutions Inc."
            />
          </div>

          <!-- Phone Number -->
          <div class="w-full flex flex-col items-start gap-1.5">
            <div class="self-stretch relative leading-[130%] capitalize font-medium text-gray-700">Phone Number</div>
            <input
              type="tel"
              v-model="profileData.phoneNumber"
              class="self-stretch rounded border-gainsboro border-solid border-[1px] flex items-center p-3 sm:p-4 text-left text-darkslategray bg-white focus:outline-none focus:border-gray-500 transition-colors h-12 sm:h-[52px]"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <!-- Email -->
          <div class="w-full flex flex-col items-start gap-1.5">
            <div class="self-stretch relative leading-[130%] capitalize font-medium text-gray-700">Email</div>
            <input
              type="email"
              v-model="profileData.email"
              class="self-stretch rounded border-gainsboro border-solid border-[1px] flex items-center p-3 sm:p-4 text-left text-darkslategray bg-white focus:outline-none focus:border-gray-500 transition-colors h-12 sm:h-[52px]"
              placeholder="contact@techsolutions.com"
            />
          </div>

          <!-- Location -->
          <div class="w-full flex flex-col items-start gap-1.5">
            <div class="self-stretch relative leading-[130%] capitalize font-medium text-gray-700">Location</div>
            <select
              v-model="profileData.location"
              class="self-stretch h-12 sm:h-[52px] rounded border-gainsboro border-solid border-[1px] box-border flex items-center p-3 sm:p-4 text-left text-darkslategray bg-white focus:outline-none focus:border-gray-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="San Francisco, CA">San Francisco, CA</option>
              <option value="New York, NY">New York, NY</option>
              <option value="Remote">Remote</option>
              <option value="Los Angeles, CA">Los Angeles, CA</option>
              <option value="Chicago, IL">Chicago, IL</option>
            </select>
          </div>

          <!-- About Yourself -->
          <div class="w-full flex flex-col items-start gap-1.5">
            <div class="self-stretch relative leading-[130%] capitalize font-medium text-gray-700">About yourself</div>
            <div 
              class="self-stretch h-20 rounded border-gainsboro border-solid border-[1px] box-border flex flex-col items-start justify-start p-3 sm:p-4 text-left text-darkgray cursor-pointer bg-white hover:border-gray-400 transition-colors"
              @click="focusTextarea"
            >
              <div v-if="!profileData.about" class="self-stretch relative leading-[130%] capitalize text-gray-400">
                write about yourself in 24 words
              </div>
              <div v-else class="self-stretch relative leading-[130%] capitalize text-darkslategray text-left">
                {{ profileData.about }}
              </div>
            </div>
            <div class="self-stretch flex justify-between items-center text-xs text-darkgray">
              <span>{{ profileData.about ? profileData.about.split(' ').length : 0 }}/24 words</span>
              <span>{{ profileData.about ? profileData.about.length : 0 }}/200 characters</span>
            </div>
          </div>

            <!-- Update Profile Button -->
            <button 
              type="button"
              :disabled="isSaving"
              :class="[
                'w-full sm:w-[223px] h-12 sm:h-[52px] rounded bg-forestgreen flex items-center justify-center py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8 box-border gap-2.5 text-center text-white transition-colors mt-2',
                isSaving ? 'opacity-60 cursor-not-allowed' : 'hover:bg-green-700'
              ]"
              @click="updateProfile"
            >
              <Save class="h-5 w-5 sm:h-6 sm:w-6" />
              <div class="relative leading-[130%] capitalize font-semibold text-sm sm:text-base">
                {{ isSaving ? 'Saving...' : 'Update Profile' }}
              </div>
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
          class="w-full rounded border-gainsboro border-solid border-[1px] px-4 py-3 text-sm resize-none focus:outline-none focus:border-gray-500 transition-colors text-left"
          rows="4"
          placeholder="Write about yourself in 24 words"
          maxlength="200"
          @input="validateWordCount"
        ></textarea>
        <div class="flex justify-between items-center mt-2 text-xs text-darkgray">
          <span>{{ profileData.about ? profileData.about.split(' ').length : 0 }}/24 words</span>
          <span>{{ profileData.about ? profileData.about.length : 0 }}/200 characters</span>
        </div>
        <div class="flex justify-end mt-4">
          <button
            @click="showTextareaModal = false"
            class="px-4 py-2 bg-forestgreen text-white rounded text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>

    <!-- Success Notification -->
    <div v-if="showSuccess" class="fixed top-4 right-4 bg-forestgreen text-white px-6 py-3 rounded shadow-lg z-50 transition-all duration-300">
      <div class="flex items-center gap-2">
        <CheckCircle class="w-5 h-5" />
        <span>Profile updated successfully!</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Upload, Image, Save, CheckCircle } from 'lucide-vue-next';
import { reactive, ref, watchEffect } from 'vue';
import { useStubResource } from '~/composables/useStubResource';
import { useStubClient } from '~/services/stubClient';

const stubClient = useStubClient();
const nuxtApp = useNuxtApp();

const defaultProfileState = () => ({
  fullName: '',
  phoneNumber: '',
  email: '',
  location: '',
  about: '',
  logo: null,
});

const profileData = reactive(defaultProfileState());

const logoInput = ref(null);
const showTextareaModal = ref(false);
const showSuccess = ref(false);
const isSaving = ref(false);

const { data: profileStubData, refresh: refreshCompanyProfile } = await useStubResource('companyProfile', {
  default: () => ({}),
});

watchEffect(() => {
  const payload = profileStubData.value || {};
  const defaults = defaultProfileState();
  for (const key of Object.keys(defaults)) {
    if (key === 'logo') {
      profileData.logo = payload?.avatar ?? defaults.logo;
    } else {
      profileData[key] = payload?.[key] ?? defaults[key];
    }
  }
});

const triggerFileInput = (type) => {
  if (type === 'logo' && logoInput.value) {
    logoInput.value.click();
  }
};

const handleLogoUpload = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  const maxSize = 2 * 1024 * 1024;

  if (!validTypes.includes(file.type)) {
    if (import.meta.client) {
      nuxtApp.$awn?.alert('Please upload a valid image file (JPG, PNG, GIF).');
    }
    return;
  }

  if (file.size > maxSize) {
    if (import.meta.client) {
      nuxtApp.$awn?.alert('File size must be less than 2MB.');
    }
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    profileData.logo = e.target?.result || null;
  };
  reader.readAsDataURL(file);
};

const focusTextarea = () => {
  showTextareaModal.value = true;
};

const validateWordCount = () => {
  const words = profileData.about.trim().split(/\s+/);
  if (words.length > 24) {
    profileData.about = words.slice(0, 24).join(' ');
  }
};

const updateProfile = async () => {
  if (isSaving.value) return;
  isSaving.value = true;

  try {
    const payload = {
      fullName: profileData.fullName,
      phoneNumber: profileData.phoneNumber,
      email: profileData.email,
      location: profileData.location,
      about: profileData.about,
      avatar: profileData.logo,
    };

    await stubClient.update('companyProfile', undefined, payload, { delay: 200 });
    await refreshCompanyProfile();

    showSuccess.value = true;
    if (import.meta.client) {
      nuxtApp.$awn?.success('Profile updated successfully!');
    }
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  } catch (error) {
    console.error('Error updating profile:', error);
    if (import.meta.client) {
      nuxtApp.$awn?.alert('Error updating profile. Please try again.');
    }
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped>
/* Custom colors matching the design system */
.border-gainsboro {
  border-color: #DCDCDC;
}
.bg-royalblue {
  background-color: #4169E1;
}
.bg-forestgreen {
  background-color: #228B22;
}
.text-dimgray {
  color: #696969;
}
.text-darkslategray {
  color: #2F4F4F;
}
.text-darkgray {
  color: #A9A9A9;
}
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Custom select dropdown arrow */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23696969' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px 16px;
  padding-right: 40px;
}

/* Remove default input focus ring and use border instead */
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #696969;
}

/* Responsive design */
@media (max-width: 1024px) {
  .flex-row {
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .shadow-\[0px_4px_38px_rgba\(0\,_0\_0\_0\.1\)\] {
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
  }
}
</style>