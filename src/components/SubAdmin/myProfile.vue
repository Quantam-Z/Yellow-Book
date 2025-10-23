<template>
    <div class="w-full font-plus-jakarta-sans max-w-full overflow-hidden">
      <!-- Header Section with Gradient Background -->
      <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">My Profile</h1>
        </div>
      </div>
  
      <!-- Profile Information Card -->
      <div class="w-full bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 mb-6">
        <div class="p-4 sm:p-6 md:p-8 space-y-6">
          <h2 class="text-lg sm:text-xl font-bold text-gray-900 capitalize">Profile Information</h2>
          <div class="border-t border-gray-200"></div>
          
          <div class="space-y-5">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-700 capitalize">Name</label>
              <input 
                type="text" 
                class="w-full rounded-lg bg-gray-100 border border-gray-200 h-[46px] px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                v-model="profile.name"
              >
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-700 capitalize">Email</label>
              <input 
                type="email" 
                class="w-full rounded-lg bg-gray-100 border border-gray-200 h-[46px] px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                v-model="profile.email"
              >
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-700 capitalize">Mobile</label>
              <input 
                type="tel" 
                class="w-full rounded-lg bg-gray-100 border border-gray-200 h-[46px] px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                v-model="profile.mobile"
              >
            </div>
          </div>
          <div class="flex justify-end">
            <button 
              class="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-lg transition shadow-md touch-manipulation"
              @click="updateProfile"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
  
      <!-- Change Password Card -->
      <div class="w-full bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <div class="p-4 sm:p-6 md:p-8 space-y-6">
          <h2 class="text-lg sm:text-xl font-bold text-gray-900 capitalize">Change Password</h2>
          <div class="border-t border-gray-200"></div>
          
          <div class="space-y-5">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-700 capitalize">Current Password</label>
              <div class="relative">
                <input 
                  :type="showCurrentPassword ? 'text' : 'password'"
                  class="w-full rounded-lg bg-gray-100 border border-gray-200 h-[46px] px-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                  v-model="password.currentPassword"
                  placeholder="Enter current password"
                >
                <button 
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  @click="showCurrentPassword = !showCurrentPassword"
                  type="button"
                >
                  <EyeIcon v-if="!showCurrentPassword" class="w-5 h-5" />
                  <EyeOffIcon v-else class="w-5 h-5" />
                </button>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-700 capitalize">New Password</label>
              <div class="relative">
                <input 
                  :type="showNewPassword ? 'text' : 'password'"
                  class="w-full rounded-lg bg-gray-100 border border-gray-200 h-[46px] px-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                  v-model="password.newPassword"
                  placeholder="Enter new password"
                >
                <button 
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  @click="showNewPassword = !showNewPassword"
                  type="button"
                >
                  <EyeIcon v-if="!showNewPassword" class="w-5 h-5" />
                  <EyeOffIcon v-else class="w-5 h-5" />
                </button>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-700 capitalize">Confirm Password</label>
              <div class="relative">
                <input 
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="w-full rounded-lg bg-gray-100 border border-gray-200 h-[46px] px-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                  v-model="password.confirmPassword"
                  placeholder="Confirm new password"
                >
                <button 
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  @click="showConfirmPassword = !showConfirmPassword"
                  type="button"
                >
                  <EyeIcon v-if="!showConfirmPassword" class="w-5 h-5" />
                  <EyeOffIcon v-else class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button 
              class="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-lg transition shadow-md touch-manipulation"
              @click="updatePassword"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
  
      <!-- Success Message -->
      <div 
        v-if="showMessage" 
        class="fixed top-4 right-4 rounded-lg p-4 text-white transition-all duration-300 z-50 shadow-lg"
        :class="messageType === 'success' ? 'bg-green-500' : 'bg-red-500'"
      >
        <div class="flex items-center gap-2">
          <CheckCircleIcon v-if="messageType === 'success'" class="w-5 h-5" />
          <XCircleIcon v-else class="w-5 h-5" />
          {{ messageText }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Eye as EyeIcon, EyeOff as EyeOffIcon, CheckCircle as CheckCircleIcon, XCircle as XCircleIcon } from 'lucide-vue-next';
  
  // State
  const profile = ref({
    name: 'Wade Warren',
    email: 'curtis.weaver@example.com',
    mobile: '+524164532'
  });
  
  const password = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const showCurrentPassword = ref(false);
  const showNewPassword = ref(false);
  const showConfirmPassword = ref(false);
  const showMessage = ref(false);
  const messageText = ref('');
  const messageType = ref('success');
  
  // Methods
  const updateProfile = () => {
    // Simulate API call
    showMessage.value = true;
    messageText.value = 'Profile updated successfully!';
    messageType.value = 'success';
    
    setTimeout(() => {
      showMessage.value = false;
    }, 3000);
  };
  
  const updatePassword = () => {
    // Validation
    if (!password.value.currentPassword || !password.value.newPassword || !password.value.confirmPassword) {
      showMessage.value = true;
      messageText.value = 'Please fill in all password fields!';
      messageType.value = 'error';
      
      setTimeout(() => {
        showMessage.value = false;
      }, 3000);
      return;
    }
    
    if (password.value.newPassword !== password.value.confirmPassword) {
      showMessage.value = true;
      messageText.value = 'New passwords do not match!';
      messageType.value = 'error';
      
      setTimeout(() => {
        showMessage.value = false;
      }, 3000);
      return;
    }
    showMessage.value = true;
    messageText.value = 'Password updated successfully!';
    messageType.value = 'success';
    
    // Reset password fields
    password.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    
    setTimeout(() => {
      showMessage.value = false;
    }, 3000);
  };
  </script>
  
  <style scoped>
  .font-plus-jakarta-sans {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  
  /* Enhanced touch targets for mobile */
  @media (max-width: 640px) {
    input[type="text"],
    input[type="email"],
    input[type="tel"],
    input[type="password"] {
      min-height: 44px;
    }
    
    button {
      min-height: 44px;
    }
  }
  
  /* Better focus states for accessibility */
  input:focus, button:focus {
    outline: 2px solid #fbbf24;
    outline-offset: 2px;
  }
  
  /* Improved transitions */
  .transition {
    transition: all 0.2s ease-in-out;
  }
  
  /* Touch manipulation for better mobile experience */
  .touch-manipulation {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  </style>