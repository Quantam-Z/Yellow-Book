<template>
  <div class="min-h-screen bg-white-50 p-4">
    <div class="w-full rounded-xl bg-gradient-to-br from-indigo-500/10 to-pink-500/10 p-4 sm:p-6 border border-gray-200 shadow-lg mb-4 sm:mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-2xl font-extrabold text-gray-900">My Profile</h1>
        </div>
      </div>
    </div>

    <div class="flex gap-2 sm:gap-4 mb-6">
  <button 
    @click="activeSection = 'profile'"
    class="px-3 py-2 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap"
    :class="activeSection === 'profile' 
      ? 'bg-gold text-black' // Removed shadow-md here for mobile
      : 'bg-white text-gray-600 hover:bg-gray-50 border border-transparent'"
  >
    Profile Info
  </button>
  <button 
    @click="activeSection = 'password'"
    class="px-3 py-2 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap"
    :class="activeSection === 'password' 
      ? 'bg-gold text-black' // Removed shadow-md here for mobile
      : 'bg-white text-gray-600 hover:bg-gray-50 border border-transparent'"
  >
    Change Password
  </button>
</div>

    <div 
      v-if="activeSection === 'profile'"
      class="w-full lg:w-[60%] relative shadow-[0px_0px_9px_rgba(0,_0,_0,_0.05)] rounded-2xl bg-white border-whitesmoke border-solid border-[1px] box-border flex flex-col items-center p-6 sm:p-8 lg:p-12 gap-6 sm:gap-8 text-left text-gray font-plus-jakarta-sans"
    >
      <div class="self-stretch flex flex-col items-start justify-center gap-2">
        <b class="self-stretch relative leading-[130%] capitalize text-xl sm:text-2xl">Profile Information</b>
        <p class="self-stretch relative text-sm sm:text-base text-gray-600 leading-relaxed">
          Update your personal information and contact details
        </p>
      </div>
      
      <div class="self-stretch h-px relative border-whitesmoke border-dashed border-t-[1px] box-border" />
      
      <div class="self-stretch flex flex-col items-center gap-6 sm:gap-8 text-base sm:text-lg text-darkslategray">
        <div class="self-stretch flex flex-col items-start">
          <div class="self-stretch flex flex-col items-start gap-4 sm:gap-5">
            <div class="self-stretch flex flex-col items-start gap-3 sm:gap-4">
              <div class="self-stretch relative leading-[160%] capitalize font-medium">Name</div>
              <div class="self-stretch h-[46px] rounded bg-whitesmoke border-silver border-solid border-[1px] box-border flex items-center p-3 text-darkgray">
                <div class="relative leading-[160%] capitalize font-medium">Wade Warren</div>
              </div>
            </div>
            
            <div class="self-stretch flex flex-col items-start gap-3 sm:gap-4">
              <div class="self-stretch relative leading-[160%] capitalize font-medium">Email</div>
              <div class="self-stretch h-[46px] rounded bg-whitesmoke border-silver border-solid border-[1px] box-border flex items-center p-3 text-darkgray">
                <div class="relative leading-[160%] capitalize font-medium">curtis.weaver@example.com</div>
              </div>
            </div>
            
            <div class="self-stretch flex flex-col items-start gap-3 sm:gap-4">
              <div class="self-stretch relative leading-[160%] capitalize font-medium">Mobile</div>
              <div class="self-stretch h-[46px] rounded bg-whitesmoke border-silver border-solid border-[1px] box-border flex items-center p-3 text-darkgray">
                <div class="relative leading-[160%] capitalize font-medium">+524164532</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="self-stretch h-12 rounded bg-gold hover:bg-yellow-600 flex items-center justify-center py-[18px] px-9 box-border text-center text-gray cursor-pointer transition-colors">
          <div class="relative leading-[130%] capitalize font-semibold">Update Profile</div>
        </div>
      </div>
    </div>

    <div 
      v-if="activeSection === 'password'"
      class="w-full lg:w-[60%] relative shadow-[0px_0px_9px_rgba(0,_0,_0,_0.05)] rounded-2xl bg-white border-whitesmoke border-solid border-[1px] box-border flex flex-col items-center p-6 sm:p-8 lg:p-12 gap-6 sm:gap-8 text-left text-gray font-plus-jakarta-sans"
    >
      <div class="self-stretch flex flex-col items-start justify-center gap-2">
        <b class="self-stretch relative leading-[130%] capitalize text-xl sm:text-2xl">Change Password</b>
        <p class="self-stretch relative text-sm sm:text-base text-gray-600 leading-relaxed">
          Secure your account by updating your password regularly
        </p>
      </div>
      
      <div class="self-stretch h-px relative border-whitesmoke border-dashed border-t-[1px] box-border" />
      
      <div class="self-stretch flex flex-col items-center gap-6 sm:gap-8 text-base sm:text-lg text-darkslategray">
        <div class="self-stretch flex flex-col items-start">
          <div class="self-stretch flex flex-col items-start gap-4 sm:gap-5">
            <div class="self-stretch flex flex-col items-start gap-3 sm:gap-4">
              <div class="self-stretch relative leading-[160%] capitalize font-medium">Current Password</div>
              <div class="self-stretch h-[46px] rounded bg-whitesmoke border-silver border-solid border-[1px] box-border flex items-center p-3 text-darkgray">
                <div class="relative leading-[160%] capitalize font-medium">*******</div>
              </div>
            </div>
            
            <div class="self-stretch flex flex-col items-start gap-3 sm:gap-4">
              <div class="self-stretch relative leading-[160%] capitalize font-medium">New Password</div>
              <div class="self-stretch h-[46px] rounded bg-whitesmoke border-silver border-solid border-[1px] box-border flex items-center p-3 text-darkgray">
                <div class="relative leading-[160%] capitalize font-medium">*******</div>
              </div>
            </div>
            
            <div class="self-stretch flex flex-col items-start gap-3 sm:gap-4">
              <div class="self-stretch relative leading-[160%] capitalize font-medium">Confirm New Password</div>
              <div class="self-stretch h-[46px] rounded bg-whitesmoke border-silver border-solid border-[1px] box-border flex items-center p-3 text-darkgray">
                <div class="relative leading-[160%] capitalize font-medium">*******</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="self-stretch h-12 rounded bg-gold hover:bg-yellow-600 flex items-center justify-center py-[18px] px-9 box-border text-center text-gray cursor-pointer transition-colors">
          <div class="relative leading-[130%] capitalize font-semibold">Update Password</div>
        </div>
      </div>
    </div>

    <div 
      v-if="showMessage" 
      class="fixed top-4 right-4 rounded-lg p-4 text-white transition-all duration-300 z-50"
      :class="messageType === 'success' ? 'bg-green-500' : 'bg-red-500'"
    >
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path v-if="messageType === 'success'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>
        {{ messageText }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Reactive state
const activeSection = ref('profile');
const showMessage = ref(false);
const messageType = ref('success');
const messageText = ref('');

// Methods
const updateProfile = () => {
  showMessage.value = true;
  messageType.value = 'success';
  messageText.value = 'Profile updated successfully!';
  
  setTimeout(() => {
    showMessage.value = false;
  }, 3000);
};

const updatePassword = () => {
  showMessage.value = true;
  messageType.value = 'success';
  messageText.value = 'Password updated successfully!';
  
  setTimeout(() => {
    showMessage.value = false;
  }, 3000);
};
</script>

<style scoped>
/* Custom styles to match your design pattern */
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.border-whitesmoke {
  border-color: #f5f5f5;
}

.border-silver {
  border-color: #c0c0c0;
}

.text-darkgray {
  color: #a9a9a9;
}

.text-darkslategray {
  color: #2f4f4f;
}

.bg-gold {
  background-color: #ffd700;
}

.bg-whitesmoke {
  background-color: #f5f5f5;
}

/* Responsive design */
@media (max-width: 1024px) {
  .w-full.lg\\:w-\\[60\\%\\] {
    width: 100% !important;
  }
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease-in-out;
}

/* Button hover effects */
button:hover {
  transform: translateY(-1px);
}
</style>