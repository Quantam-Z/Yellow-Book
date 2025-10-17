<template>
    <div class="w-full min-h-screen bg-gray-50 p-4 sm:p-6">
      
      <!-- header Section -->
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
              
              <!-- Update Password button -->
              <button 
                class="w-full sm:w-[200px] rounded-lg bg-green-500 h-12 flex items-center justify-center gap-2 text-white font-semibold shadow-md hover:bg-green-600 transition-colors"
                @click="updatePassword"
              >
                <Save class="w-5 h-5" />
                Update Password
              </button>
            </div>
          </div>
  
          <!-- Right Column - notification Preferences -->
          <div class="flex-1 shadow-lg rounded-xl bg-white flex flex-col items-start p-6 gap-6 border border-gray-100">
            <h2 class="text-xl font-bold text-gray-800 capitalize">notification Preferences</h2>
            
            <!-- Email notifications Toggle -->
            <div class="self-stretch flex items-start gap-6">
              <div class="flex-1 flex flex-col items-start gap-2">
                <div class="self-stretch text-sm font-medium text-gray-700 capitalize">Email notifications</div>
                <div class="self-stretch text-sm text-gray-500">Receive email notifications for new reviews and updates</div>
              </div>
              <div 
                class="w-14 h-7 rounded-full bg-gray-200 border border-gray-300 flex items-center p-1 cursor-pointer transition-all duration-300"
                :class="emailnotifications ? 'bg-green-500' : 'bg-gray-200'"
                @click="toggleEmailnotifications"
              >
                <div 
                  class="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300"
                  :class="emailnotifications ? 'translate-x-7' : 'translate-x-0'"
                ></div>
              </div>
            </div>
            
            <!-- Divider -->
            <div class="self-stretch border-t border-gray-200"></div>
            
            <!-- Push notifications Toggle -->
            <div class="self-stretch flex items-start gap-6">
              <div class="flex-1 flex flex-col items-start gap-2">
                <div class="self-stretch text-sm font-medium text-gray-700 capitalize">Push notifications</div>
                <div class="self-stretch text-sm text-gray-500">Receive push notifications for important updates</div>
              </div>
              <div 
                class="w-14 h-7 rounded-full bg-gray-200 border border-gray-300 flex items-center p-1 cursor-pointer transition-all duration-300"
                :class="pushnotifications ? 'bg-green-500' : 'bg-gray-200'"
                @click="togglePushnotifications"
              >
                <div 
                  class="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300"
                  :class="pushnotifications ? 'translate-x-7' : 'translate-x-0'"
                ></div>
              </div>
            </div>
            
            <!-- Divider -->
            <div class="self-stretch border-t border-gray-200"></div>
            
            <!-- SMS notifications Toggle -->
            <div class="self-stretch flex items-start gap-6">
              <div class="flex-1 flex flex-col items-start gap-2">
                <div class="self-stretch text-sm font-medium text-gray-700 capitalize">SMS notifications</div>
                <div class="self-stretch text-sm text-gray-500">Receive SMS alerts for critical updates</div>
              </div>
              <div 
                class="w-14 h-7 rounded-full bg-gray-200 border border-gray-300 flex items-center p-1 cursor-pointer transition-all duration-300"
                :class="smsnotifications ? 'bg-green-500' : 'bg-gray-200'"
                @click="toggleSmsnotifications"
              >
                <div 
                  class="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300"
                  :class="smsnotifications ? 'translate-x-7' : 'translate-x-0'"
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
  
        <!-- Save All Changes button -->
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
  
  // notification preferences
  const emailnotifications = ref(true);
  const pushnotifications = ref(false);
  const smsnotifications = ref(true);
  const marketingEmails = ref(false);
  
  // Methods
  const toggleEmailnotifications = () => {
    emailnotifications.value = !emailnotifications.value;
  };
  
  const togglePushnotifications = () => {
    pushnotifications.value = !pushnotifications.value;
  };
  
  const toggleSmsnotifications = () => {
    smsnotifications.value = !smsnotifications.value;
  };
  
  const toggleMarketingEmails = () => {
    marketingEmails.value = !marketingEmails.value;
  };
  
  const updatePassword = () => {
    // Handle password update logic here
    // You can add API call or validation here
  };
  
  const saveAllChanges = () => {
    // Handle save all changes logic here
    const notificationPreferences = {
      email: emailnotifications.value,
      push: pushnotifications.value,
      sms: smsnotifications.value,
      marketing: marketingEmails.value
    };
    // You can add API call here
  };
  </script>
  
  <style scoped>
  .shadow-2xl {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 20px 50px rgba(0, 0, 0, 0.03);
  }
  </style>