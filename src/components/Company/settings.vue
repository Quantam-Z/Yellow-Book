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

    <!-- Main Content -->
    <div class="w-full relative flex flex-col lg:flex-row items-start gap-4 sm:gap-6 text-left text-black font-plus-jakarta-sans">
      
      <!-- Left Column - Change Password -->
      <div class="w-full lg:flex-1 shadow-[0px_4px_38px_rgba(0,_0,_0,_0.1)] rounded-xl bg-white flex flex-col items-start justify-end p-4 sm:p-5 md:p-6 gap-4 sm:gap-5 md:gap-6">
        <b class="relative leading-[130%] capitalize text-xl sm:text-2xl text-black">Change Password</b>
        <div class="self-stretch flex flex-col items-end gap-4 sm:gap-5 md:gap-6 text-sm sm:text-base">
          <div class="self-stretch flex flex-col items-start justify-center gap-3 sm:gap-4 md:gap-5">
            
            <!-- Current Password -->
            <div class="self-stretch flex flex-col items-start gap-2 sm:gap-3">
              <div class="self-stretch relative leading-[130%] capitalize font-medium text-black">Current Password</div>
              <div class="self-stretch rounded border-gainsboro border-solid border-[1px] flex items-center justify-between py-3 sm:py-4 md:py-5 px-3 sm:px-4 gap-3 sm:gap-4 md:gap-5 text-center text-black">
                <div class="flex items-center gap-2 sm:gap-2.5 flex-1">
                  <Lock class="h-5 w-5 sm:h-6 sm:w-6 relative text-gray-600 flex-shrink-0" />
                  <input 
                    type="password"
                    v-model="passwordData.currentPassword"
                    placeholder="Enter current password"
                    class="flex-1 bg-transparent border-none outline-none text-black placeholder-gray-400 leading-[130%] capitalize"
                  />
                </div>
                <Eye 
                  class="h-5 w-5 sm:h-6 sm:w-6 relative text-gray-600 cursor-pointer flex-shrink-0" 
                  @click="togglePasswordVisibility('currentPassword')"
                />
              </div>
            </div>
            
            <!-- New Password -->
            <div class="self-stretch flex flex-col items-start gap-2 sm:gap-3">
              <div class="self-stretch relative leading-[130%] capitalize font-medium text-black">New Password</div>
              <div class="self-stretch rounded border-gainsboro border-solid border-[1px] flex items-center justify-between py-3 sm:py-4 md:py-5 px-3 sm:px-4 gap-3 sm:gap-4 md:gap-5 text-center text-black">
                <div class="flex items-center gap-2 sm:gap-2.5 flex-1">
                  <Lock class="h-5 w-5 sm:h-6 sm:w-6 relative text-gray-600 flex-shrink-0" />
                  <input 
                    :type="passwordVisibility.newPassword ? 'text' : 'password'"
                    v-model="passwordData.newPassword"
                    placeholder="Enter new password"
                    class="flex-1 bg-transparent border-none outline-none text-black placeholder-gray-400 leading-[130%] capitalize"
                  />
                </div>
                <Eye 
                  class="h-5 w-5 sm:h-6 sm:w-6 relative text-gray-600 cursor-pointer flex-shrink-0" 
                  @click="togglePasswordVisibility('newPassword')"
                />
              </div>
            </div>
            
            <!-- Confirm New Password -->
            <div class="self-stretch flex flex-col items-start gap-3 sm:gap-4 md:gap-5">
              <div class="self-stretch relative leading-[130%] capitalize font-medium text-black">Confirm New Password</div>
              <div class="self-stretch rounded border-gainsboro border-solid border-[1px] flex items-center justify-between py-3 sm:py-4 md:py-5 px-3 sm:px-4 gap-3 sm:gap-4 md:gap-5 text-center text-black">
                <div class="flex items-center gap-2 sm:gap-2.5 flex-1">
                  <Lock class="h-5 w-5 sm:h-6 sm:w-6 relative text-gray-600 flex-shrink-0" />
                  <input 
                    :type="passwordVisibility.confirmPassword ? 'text' : 'password'"
                    v-model="passwordData.confirmPassword"
                    placeholder="Confirm new password"
                    class="flex-1 bg-transparent border-none outline-none text-black placeholder-gray-400 leading-[130%] capitalize"
                  />
                </div>
                <Eye 
                  class="h-5 w-5 sm:h-6 sm:w-6 relative text-gray-600 cursor-pointer flex-shrink-0" 
                  @click="togglePasswordVisibility('confirmPassword')"
                />
              </div>
            </div>
            
          </div>
          
          <!-- Update Password Button - No Border Radius, No Border -->
          <button 
            class="w-full sm:w-[223px] h-12 sm:h-[52px] rounded bg-forestgreen flex items-center justify-center py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8 box-border gap-2 sm:gap-2.5 text-center text-white cursor-pointer hover:bg-green-700 transition-colors whitespace-nowrap"
            @click="updatePassword"
          >
            <Save class="h-5 w-5 sm:h-6 sm:w-6 relative text-white flex-shrink-0" />
            <div class="relative leading-[130%] capitalize font-semibold text-sm sm:text-base whitespace-nowrap">Update Password</div>
          </button>

          <!-- Validation Messages -->
          <div v-if="validationMessage" class="w-full text-center">
            <div :class="validationMessage.type === 'success' ? 'text-green-600' : 'text-red-600'" class="text-sm">
              {{ validationMessage.text }}
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Notification Preferences -->
      <div class="w-full lg:flex-1 shadow-[0px_4px_38px_rgba(0,_0,_0,_0.1)] rounded-xl bg-white flex flex-col items-start justify-end p-4 sm:p-5 md:p-6 gap-4 sm:gap-5 md:gap-6 text-sm sm:text-base mt-4 sm:mt-6 lg:mt-0">
        <b class="relative leading-[130%] capitalize text-xl sm:text-2xl text-black">Notification Preferences</b>
        
        <!-- Email Notifications Toggle -->
        <div class="self-stretch flex items-start gap-4 sm:gap-5 md:gap-6">
          <div class="flex-1 flex flex-col items-start gap-2 sm:gap-2.5">
            <div class="self-stretch relative leading-[130%] capitalize font-medium text-black">Email Notifications</div>
            <div class="self-stretch relative leading-[130%] capitalize text-gray-600">Receive email notifications for new reviews and updates</div>
          </div>
          <div 
            class="w-14 sm:w-[57px] h-7 sm:h-[28px] rounded-[21px] bg-gray-100 border-lavender border-solid border-[1px] box-border flex items-center p-1 gap-1 text-xs cursor-pointer transition-all duration-300"
            :class="emailNotifications ? 'bg-royalblue justify-between' : 'bg-gray-100 justify-start'"
            @click="toggleEmailNotifications"
          >
            <div 
              class="h-5 w-5 sm:h-[23px] sm:w-[23px] relative shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_3px_rgba(0,_0,_0,_0.1)] rounded-[50%] bg-white border-gray-100 border-solid border-[1px] box-border transition-all duration-300"
              :class="emailNotifications ? 'order-2' : 'order-1'"
            ></div>
            <div 
              class="relative leading-[130%] capitalize font-medium transition-all duration-300"
              :class="emailNotifications ? 'text-white order-1' : 'text-gray-600 order-2'"
            >
              {{ emailNotifications ? 'on' : 'off' }}
            </div>
          </div>
        </div>
        
        <!-- Divider -->
        <div class="self-stretch h-px relative border-gainsboro border-solid border-t-[1px] box-border"></div>
        
        <!-- Push Notifications Toggle -->
        <div class="self-stretch flex items-start gap-4 sm:gap-5 md:gap-6">
          <div class="flex-1 flex flex-col items-start gap-2 sm:gap-2.5">
            <div class="self-stretch relative leading-[130%] capitalize font-medium text-black">Push Notifications</div>
            <div class="self-stretch relative leading-[130%] capitalize text-gray-600">Receive push notifications for important updates</div>
          </div>
          <div 
            class="w-14 sm:w-[57px] h-7 sm:h-[28px] rounded-[21px] border-lavender border-solid border-[1px] box-border flex items-center p-1 gap-1 text-xs cursor-pointer transition-all duration-300"
            :class="pushNotifications ? 'bg-royalblue justify-between' : 'bg-gray-100 justify-start'"
            @click="togglePushNotifications"
          >
            <div 
              class="h-5 w-5 sm:h-[23px] sm:w-[23px] relative shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_3px_rgba(0,_0,_0,_0.1)] rounded-[50%] bg-white border-gray-100 border-solid border-[1px] box-border transition-all duration-300"
              :class="pushNotifications ? 'order-2' : 'order-1'"
            ></div>
            <div 
              class="relative leading-[130%] capitalize font-medium transition-all duration-300"
              :class="pushNotifications ? 'text-white order-1' : 'text-gray-600 order-2'"
            >
              {{ pushNotifications ? 'on' : 'off' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Lock, Eye, Save } from 'lucide-vue-next';
import { ref, reactive, computed } from 'vue';

// Password data with reactive form fields
const passwordData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Password visibility states
const passwordVisibility = reactive({
  currentPassword: false,
  newPassword: false,
  confirmPassword: false
});

// Notification preferences
const emailNotifications = ref(false);
const pushNotifications = ref(true);

// Validation message
const validationMessage = ref(null);

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return (
    passwordData.currentPassword.trim() !== '' &&
    passwordData.newPassword.trim() !== '' &&
    passwordData.confirmPassword.trim() !== '' &&
    passwordData.newPassword === passwordData.confirmPassword
  );
});

// Methods
const togglePasswordVisibility = (field) => {
  passwordVisibility[field] = !passwordVisibility[field];
};

const toggleEmailNotifications = () => {
  emailNotifications.value = !emailNotifications.value;
};

const togglePushNotifications = () => {
  pushNotifications.value = !pushNotifications.value;
};

const updatePassword = () => {
  // Clear previous messages
  validationMessage.value = null;

  // Validation
  if (!passwordData.currentPassword) {
    validationMessage.value = {
      type: 'error',
      text: 'Please enter your current password'
    };
    return;
  }

  if (!passwordData.newPassword) {
    validationMessage.value = {
      type: 'error',
      text: 'Please enter a new password'
    };
    return;
  }

  if (passwordData.newPassword.length < 6) {
    validationMessage.value = {
      type: 'error',
      text: 'Password must be at least 6 characters long'
    };
    return;
  }

  if (passwordData.newPassword !== passwordData.confirmPassword) {
    validationMessage.value = {
      type: 'error',
      text: 'New passwords do not match'
    };
    return;
  }

  // Simulate API call
  validationMessage.value = {
    type: 'success',
    text: 'Password updated successfully!'
  };

  // Reset form after successful update
  setTimeout(() => {
    passwordData.currentPassword = '';
    passwordData.newPassword = '';
    passwordData.confirmPassword = '';
    validationMessage.value = null;
  }, 3000);
};
</script>

<style scoped>
/* Custom colors matching the design */
.border-gainsboro {
  border-color: #DCDCDC;
}
.bg-forestgreen {
  background-color: #228B22;
}
.bg-royalblue {
  background-color: #4169E1;
}
.border-lavender {
  border-color: #E6E6FA;
}
.text-black {
  color: #000000;
}
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Remove border radius and border from update button */
button {
  border-radius: 0 !important;
  border: none !important;
}

/* Input field styling */
input {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Responsive design */
@media (max-width: 640px) {
  .shadow-\[0px_4px_38px_rgba\(0\,_0\_0\_0\.1\)\] {
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
  }
}

/* Disabled button styling */
button:disabled {
  background-color: #9CA3AF !important;
  cursor: not-allowed !important;
}
</style>