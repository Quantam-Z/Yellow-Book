<template>
    <div class="min-h-screen bg-gray-50 p-4">
      <!-- Header -->
      <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4 mb-4">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h1 class="text-xl md:text-2xl font-bold text-gray-900">My Profile</h1>
        </div>
      </div>
  
      <!-- Profile Information Card -->
      <div class="w-full relative shadow-[0px_0px_9px_rgba(0,_0,_0,_0.05)] rounded-2xl bg-white border-whitesmoke border-solid border-[1px] box-border flex flex-col items-center p-6 md:p-12 gap-8 text-left text-[24px] text-gray font-plus-jakarta-sans mb-6">
        <div class="self-stretch flex flex-col items-start justify-center">
          <b class="self-stretch relative leading-[130%] capitalize">Profile information</b>
        </div>
        <div class="self-stretch relative border-whitesmoke border-dashed border-t-[1px] box-border h-px" />
        
        <div class="self-stretch flex flex-col items-center gap-8 text-num-16 text-darkslategray">
          <div class="self-stretch flex flex-col items-start">
            <div class="self-stretch flex flex-col items-start gap-5">
              <div class="self-stretch flex flex-col items-start gap-4">
                <div class="self-stretch relative leading-[160%] capitalize font-medium">Name</div>
                <input 
                  type="text" 
                  class="self-stretch rounded bg-white border-silver border-solid border-[1px] box-border h-[46px] flex items-center p-3 text-darkgray focus:outline-none focus:ring-2 focus:ring-blue-500"
                  v-model="profile.name"
                >
              </div>
              <div class="self-stretch flex flex-col items-start gap-4">
                <div class="self-stretch relative leading-[160%] capitalize font-medium">Email</div>
                <input 
                  type="email" 
                  class="self-stretch rounded bg-white border-silver border-solid border-[1px] box-border h-[46px] flex items-center p-3 text-darkgray focus:outline-none focus:ring-2 focus:ring-blue-500"
                  v-model="profile.email"
                >
              </div>
              <div class="self-stretch flex flex-col items-start gap-4">
                <div class="self-stretch relative leading-[160%] capitalize font-medium">Mobile</div>
                <input 
                  type="tel" 
                  class="self-stretch rounded bg-white border-silver border-solid border-[1px] box-border h-[46px] flex items-center p-3 text-darkgray focus:outline-none focus:ring-2 focus:ring-blue-500"
                  v-model="profile.mobile"
                >
              </div>
            </div>
          </div>
          <button 
            class="self-stretch rounded bg-gold hover:bg-yellow-500 transition-colors h-12 flex items-center justify-center py-[18px] px-9 box-border text-center text-gray cursor-pointer"
            @click="updateProfile"
          >
            <div class="relative leading-[130%] capitalize font-semibold">Update profile</div>
          </button>
        </div>
      </div>
  
      <!-- Change Password Card -->
      <div class="w-full relative shadow-[0px_0px_9px_rgba(0,_0,_0,_0.05)] rounded-2xl bg-white border-whitesmoke border-solid border-[1px] box-border flex flex-col items-center p-6 md:p-12 gap-8 text-left text-[24px] text-gray font-plus-jakarta-sans">
        <div class="self-stretch flex flex-col items-start justify-center">
          <b class="self-stretch relative leading-[130%] capitalize">Change Password</b>
        </div>
        <div class="self-stretch relative border-whitesmoke border-dashed border-t-[1px] box-border h-px" />
        
        <div class="self-stretch flex flex-col items-center gap-8 text-num-16 text-darkslategray">
          <div class="self-stretch flex flex-col items-start">
            <div class="self-stretch flex flex-col items-start gap-5">
              <div class="self-stretch flex flex-col items-start gap-4">
                <div class="self-stretch relative leading-[160%] capitalize font-medium">Current Password</div>
                <div class="self-stretch relative">
                  <input 
                    :type="showCurrentPassword ? 'text' : 'password'"
                    class="self-stretch rounded bg-white border-silver border-solid border-[1px] box-border h-[46px] flex items-center p-3 text-darkgray focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    v-model="password.currentPassword"
                    placeholder="Enter current password"
                  >
                  <button 
                    class="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    @click="showCurrentPassword = !showCurrentPassword"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="!showCurrentPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="self-stretch flex flex-col items-start gap-4">
                <div class="self-stretch relative leading-[160%] capitalize font-medium">New Password</div>
                <div class="self-stretch relative">
                  <input 
                    :type="showNewPassword ? 'text' : 'password'"
                    class="self-stretch rounded bg-white border-silver border-solid border-[1px] box-border h-[46px] flex items-center p-3 text-darkgray focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    v-model="password.newPassword"
                    placeholder="Enter new password"
                  >
                  <button 
                    class="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    @click="showNewPassword = !showNewPassword"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="!showNewPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="self-stretch flex flex-col items-start gap-4">
                <div class="self-stretch relative leading-[160%] capitalize font-medium">Confirm Password</div>
                <div class="self-stretch relative">
                  <input 
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="self-stretch rounded bg-white border-silver border-solid border-[1px] box-border h-[46px] flex items-center p-3 text-darkgray focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    v-model="password.confirmPassword"
                    placeholder="Confirm new password"
                  >
                  <button 
                    class="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="!showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button 
            class="self-stretch rounded bg-gold hover:bg-yellow-500 transition-colors h-12 flex items-center justify-center py-[18px] px-9 box-border text-center text-gray cursor-pointer"
            @click="updatePassword"
          >
            <div class="relative leading-[130%] capitalize font-semibold">Update Password</div>
          </button>
        </div>
      </div>
  
      <!-- Success Message -->
      <div 
        v-if="showMessage" 
        class="fixed top-4 right-4 rounded-lg p-4 text-white transition-all duration-300"
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
  
  <script>
  export default {
    name: 'ProfilePage',
    data() {
      return {
        profile: {
          name: 'Wade Warren',
          email: 'curtis.weaver@example.com',
          mobile: '+524164532'
        },
        password: {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        showCurrentPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
        showMessage: false,
        messageText: '',
        messageType: 'success'
      }
    },
    methods: {
      updateProfile() {
        // Simulate API call
        this.showMessage = true;
        this.messageText = 'Profile updated successfully!';
        this.messageType = 'success';
        
        setTimeout(() => {
          this.showMessage = false;
        }, 3000);
      },
      updatePassword() {
        // Validation
        if (!this.password.currentPassword || !this.password.newPassword || !this.password.confirmPassword) {
          this.showMessage = true;
          this.messageText = 'Please fill in all password fields!';
          this.messageType = 'error';
          
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
          return;
        }
        
        if (this.password.newPassword !== this.password.confirmPassword) {
          this.showMessage = true;
          this.messageText = 'New passwords do not match!';
          this.messageType = 'error';
          
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
          return;
        }
        this.showMessage = true;
        this.messageText = 'Password updated successfully!';
        this.messageType = 'success';
        
        // Reset password fields
        this.password = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        };
        
        setTimeout(() => {
          this.showMessage = false;
        }, 3000);
      }
    }
  }
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
  </style>