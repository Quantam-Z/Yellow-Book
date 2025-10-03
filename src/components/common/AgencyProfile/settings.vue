<template>
    <div class="w-full min-h-screen bg-gray-50 p-4 sm:p-6">
      
      <!-- Header Section -->
      <div class="w-full rounded-xl bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 p-4 mb-6 border border-gray-200 shadow-sm">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
      </div>
  
      <!-- Main Content Card -->
      <div class="w-full relative bg-white flex flex-col gap-8 p-6 lg:p-8 rounded-xl shadow-2xl shadow-gray-200/50">
        
        <!-- Two Column Layout -->
        <div class="w-full relative flex flex-col lg:flex-row items-start gap-6">
          
          <!-- Left Column - Change Password -->
          <div class="flex-1 shadow-lg rounded-xl bg-white flex flex-col items-start p-6 gap-6 border border-gray-100">
            <h2 class="text-xl font-bold text-gray-800 capitalize">Change Password</h2>
            
            <div class="self-stretch flex flex-col items-end gap-6">
              <div class="self-stretch flex flex-col items-start justify-center gap-5">
                
                <!-- Current Password -->
                <div class="self-stretch flex flex-col items-start gap-3">
                  <label class="self-stretch text-sm font-medium text-gray-700 capitalize">Current Password</label>
                  <div class="self-stretch rounded-lg border border-gray-300 flex items-center justify-between py-3 px-4 gap-2">
                    <div class="flex items-center gap-2.5">
                      <Lock class="w-5 h-5 text-gray-400" />
                      <div class="text-gray-600">************</div>
                    </div>
                    <Eye class="w-5 h-5 text-gray-400 cursor-pointer" />
                  </div>
                </div>
                
                <!-- New Password -->
                <div class="self-stretch flex flex-col items-start gap-3">
                  <label class="self-stretch text-sm font-medium text-gray-700 capitalize">New Password</label>
                  <div class="self-stretch rounded-lg border border-gray-300 flex items-center justify-between py-3 px-4 gap-2">
                    <div class="flex items-center gap-2.5">
                      <Lock class="w-5 h-5 text-gray-400" />
                      <div class="text-gray-600">************</div>
                    </div>
                    <Eye class="w-5 h-5 text-gray-400 cursor-pointer" />
                  </div>
                </div>
                
                <!-- Confirm New Password -->
                <div class="self-stretch flex flex-col items-start gap-3">
                  <label class="self-stretch text-sm font-medium text-gray-700 capitalize">Confirm New Password</label>
                  <div class="self-stretch rounded-lg border border-gray-300 flex items-center justify-between py-3 px-4 gap-2">
                    <div class="flex items-center gap-2.5">
                      <Lock class="w-5 h-5 text-gray-400" />
                      <div class="text-gray-600">************</div>
                    </div>
                    <Eye class="w-5 h-5 text-gray-400 cursor-pointer" />
                  </div>
                </div>
                
              </div>
              
              <!-- Update Password Button -->
              <button 
                class="w-full sm:w-[200px] rounded-lg bg-green-500 h-12 flex items-center justify-center gap-2 text-white font-semibold shadow-md hover:bg-green-600 transition-colors"
                @click="updatePassword"
              >
                <Save class="w-5 h-5" />
                Update Password
              </button>
            </div>
          </div>
  
          <!-- Right Column - Notification Preferences -->
          <div class="flex-1 shadow-lg rounded-xl bg-white flex flex-col items-start p-6 gap-6 border border-gray-100">
            <h2 class="text-xl font-bold text-gray-800 capitalize">Notification Preferences</h2>
            
            <!-- Email Notifications Toggle -->
            <div class="self-stretch flex items-start gap-6">
              <div class="flex-1 flex flex-col items-start gap-2">
                <div class="self-stretch text-sm font-medium text-gray-700 capitalize">Email Notifications</div>
                <div class="self-stretch text-sm text-gray-500">Receive email notifications for new reviews and updates</div>
              </div>
              <div 
                class="w-14 h-7 rounded-full bg-gray-200 border border-gray-300 flex items-center p-1 cursor-pointer transition-all duration-300"
                :class="emailNotifications ? 'bg-green-500' : 'bg-gray-200'"
                @click="toggleEmailNotifications"
              >
                <div 
                  class="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300"
                  :class="emailNotifications ? 'translate-x-7' : 'translate-x-0'"
                ></div>
              </div>
            </div>
            
            <!-- Divider -->
            <div class="self-stretch border-t border-gray-200"></div>
            
            <!-- Push Notifications Toggle -->
            <div class="self-stretch flex items-start gap-6">
              <div class="flex-1 flex flex-col items-start gap-2">
                <div class="self-stretch text-sm font-medium text-gray-700 capitalize">Push Notifications</div>
                <div class="self-stretch text-sm text-gray-500">Receive push notifications for important updates</div>
              </div>
              <div 
                class="w-14 h-7 rounded-full bg-gray-200 border border-gray-300 flex items-center p-1 cursor-pointer transition-all duration-300"
                :class="pushNotifications ? 'bg-green-500' : 'bg-gray-200'"
                @click="togglePushNotifications"
              >
                <div 
                  class="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300"
                  :class="pushNotifications ? 'translate-x-7' : 'translate-x-0'"
                ></div>
              </div>
            </div>
            
            <!-- Divider -->
            <div class="self-stretch border-t border-gray-200"></div>
            
            <!-- SMS Notifications Toggle -->
            <div class="self-stretch flex items-start gap-6">
              <div class="flex-1 flex flex-col items-start gap-2">
                <div class="self-stretch text-sm font-medium text-gray-700 capitalize">SMS Notifications</div>
                <div class="self-stretch text-sm text-gray-500">Receive SMS alerts for critical updates</div>
              </div>
              <div 
                class="w-14 h-7 rounded-full bg-gray-200 border border-gray-300 flex items-center p-1 cursor-pointer transition-all duration-300"
                :class="smsNotifications ? 'bg-green-500' : 'bg-gray-200'"
                @click="toggleSmsNotifications"
              >
                <div 
                  class="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300"
                  :class="smsNotifications ? 'translate-x-7' : 'translate-x-0'"
                ></div>
              </div>
            </div>
            
            <!-- Divider -->
            <div class="self-stretch border-t border-gray-200"></div>
            
            <!-- Marketing Emails Toggle -->
            <div class="self-stretch flex items-start gap-6">
              <div class="flex-1 flex flex-col items-start gap-2">
                <div class="self-stretch text-sm font-medium text-gray-700 capitalize">Marketing Emails</div>
                <div class="self-stretch text-sm text-gray-500">Receive promotional emails and special offers</div>
              </div>
              <div 
                class="w-14 h-7 rounded-full bg-gray-200 border border-gray-300 flex items-center p-1 cursor-pointer transition-all duration-300"
                :class="marketingEmails ? 'bg-green-500' : 'bg-gray-200'"
                @click="toggleMarketingEmails"
              >
                <div 
                  class="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300"
                  :class="marketingEmails ? 'translate-x-7' : 'translate-x-0'"
                ></div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Save All Changes Button -->
        <div class="flex justify-end pt-4 border-t border-gray-100">
          <button
            class="w-full sm:w-[200px] rounded-xl bg-indigo-600 text-white py-3 font-medium flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-colors"
            @click="saveAllChanges"
          >
            <Save class="w-4 h-4" />
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Pencil, Save, Lock, Eye } from 'lucide-vue-next';
  import { ref, reactive } from 'vue';
  
  // Password data
  const passwordData = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Notification preferences
  const emailNotifications = ref(true);
  const pushNotifications = ref(false);
  const smsNotifications = ref(true);
  const marketingEmails = ref(false);
  
  // Methods
  const toggleEmailNotifications = () => {
    emailNotifications.value = !emailNotifications.value;
  };
  
  const togglePushNotifications = () => {
    pushNotifications.value = !pushNotifications.value;
  };
  
  const toggleSmsNotifications = () => {
    smsNotifications.value = !smsNotifications.value;
  };
  
  const toggleMarketingEmails = () => {
    marketingEmails.value = !marketingEmails.value;
  };
  
  const updatePassword = () => {
    // Handle password update logic here
    console.log('Updating password:', passwordData);
    // You can add API call or validation here
  };
  
  const saveAllChanges = () => {
    // Handle save all changes logic here
    const notificationPreferences = {
      email: emailNotifications.value,
      push: pushNotifications.value,
      sms: smsNotifications.value,
      marketing: marketingEmails.value
    };
    console.log('Saving all changes:', { passwordData, notificationPreferences });
    // You can add API call here
  };
  </script>
  
  <style scoped>
  .shadow-2xl {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 20px 50px rgba(0, 0, 0, 0.03);
  }
  </style>