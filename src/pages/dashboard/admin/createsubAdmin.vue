<template>
  <div class="w-full font-plus-jakarta-sans">
    <!-- header Section -->
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6 mb-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {{ isEditMode ? 'Edit Sub-Admin' : 'Create Sub-Admin' }}
          </h1>
          <p class="text-gray-600">
            {{ isEditMode ? 'Update the sub-admin profile information below.' : 'Fill out the form below to create a New Sub-Admin profile in the system.' }}
          </p>
        </div>
        <button 
          @click="$router.back()"
          class="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 rounded-lg transition shadow-sm border border-gray-200 whitespace-nowrap text-sm"
        >
          Back to List
        </button>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="mb-8 max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-medium text-gray-700">Step {{ currentStep }} of 2</span>
        <span class="text-sm font-medium text-gray-700">{{ currentStep === 1 ? 'Basic Info' : 'Account Security' }}</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div 
          class="bg-yellow-500 h-3 rounded-full transition-all duration-300"
          :style="{ width: `${(currentStep / 2) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- Main Form Container -->
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      
      <!-- Step 1: Basic Info -->
      <div v-if="currentStep === 1" class="p-8">
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Full Name -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                v-model="formData.fullName"
                type="text"
                placeholder="Enter Full Name"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                :class="{ 'border-red-500': errors.fullName }"
              />
              <p v-if="errors.fullName" class="text-red-500 text-sm mt-1">{{ errors.fullName }}</p>
            </div>

            <!-- Email Address -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                v-model="formData.email"
                type="email"
                placeholder="Enter email address"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                :class="{ 'border-red-500': errors.email }"
                :readonly="isEditMode"
              />
              <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
            </div>

            <!-- Phone Number -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number (optional)</label>
              <input
                v-model="formData.phone"
                type="tel"
                placeholder="Enter phone number"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
              />
            </div>
          </div>

          <!-- Action buttons -->
          <div class="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              @click="$router.back()"
              class="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="nextStep"
              class="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              Continue to Security
              <ArrowRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Step 2: Account Security -->
      <div v-if="currentStep === 2" class="p-8">
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ isEditMode ? 'New Password' : 'Password' }} 
                {{ isEditMode ? '(leave blank to keep current)' : '*' }}
              </label>
              <div class="relative">
                <input
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="isEditMode ? 'Enter new password' : 'Enter password'"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors pr-10"
                  :class="{ 'border-red-500': errors.password }"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Eye v-if="showPassword" class="w-5 h-5" />
                  <EyeOff v-else class="w-5 h-5" />
                </button>
              </div>
              <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
              <p class="text-gray-500 text-sm mt-1">Minimum 6 characters</p>
            </div>

            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ isEditMode ? 'Confirm New Password' : 'Confirm Password' }} 
                {{ isEditMode ? '' : '*' }}
              </label>
              <input
                v-model="formData.confirmPassword"
                type="password"
                :placeholder="isEditMode ? 'Confirm new password' : 'Confirm your password'"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                :class="{ 'border-red-500': errors.confirmPassword }"
              />
              <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
            </div>

            <!-- Role -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Role *</label>
              <select
                v-model="formData.role"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors appearance-none bg-white"
                :class="{ 'border-red-500': errors.role }"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="support">Support</option>
                <option value="viewer">Viewer</option>
              </select>
              <p v-if="errors.role" class="text-red-500 text-sm mt-1">{{ errors.role }}</p>
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status *</label>
              <select
                v-model="formData.status"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors appearance-none bg-white"
                :class="{ 'border-red-500': errors.status }"
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
              <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status }}</p>
            </div>

            <!-- Permissions -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-3">Permissions</label>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <label v-for="permission in availablePermissions" :key="permission.id" class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    :value="permission.id"
                    v-model="formData.permissions"
                    class="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <div>
                    <div class="font-medium text-gray-900">{{ permission.name }}</div>
                    <div class="text-sm text-gray-500">{{ permission.description }}</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="flex justify-between gap-4 pt-6 border-t border-gray-200">
            <button
              @click="previousStep"
              class="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <ArrowLeft class="w-4 h-4" />
              Back to Basic Info
            </button>
            <div class="flex gap-4">
              <button
                @click="$router.back()"
                class="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                @click="submitForm"
                class="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <Save class="w-4 h-4" />
                {{ isEditMode ? 'Update Sub-Admin' : 'Create Sub-Admin' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="showSuccess" class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
      <CheckCircle class="w-5 h-5" />
      {{ isEditMode ? 'Sub-admin updated successfully!' : 'Sub-admin created successfully!' }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowRight, ArrowLeft, Eye, EyeOff, Save, CheckCircle, X } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

// Check if in edit mode
const isEditMode = ref(false);
const currentStep = ref(1);
const showPassword = ref(false);
const showSuccess = ref(false);

// Form data
const formData = ref({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: '',
  status: 'active',
  permissions: []
});

// Errors
const errors = ref({});

// Available permissions
const availablePermissions = ref([
  { id: 'users_read', name: 'View Users', description: 'Can view user list' },
  { id: 'users_write', name: 'Manage Users', description: 'Can create/edit users' },
  { id: 'content_read', name: 'View Content', description: 'Can view all content' },
  { id: 'content_write', name: 'Manage Content', description: 'Can create/edit content' },
  { id: 'settings_read', name: 'View Settings', description: 'Can view system settings' },
  { id: 'settings_write', name: 'Manage Settings', description: 'Can modify system settings' },
  { id: 'reports_read', name: 'View Reports', description: 'Can view analytics reports' },
  { id: 'reports_write', name: 'Generate Reports', description: 'Can generate new reports' }
]);

// Sample data for edit mode (in real app, this would come from API)
const sampleAdminData = {
  id: 1,
  fullName: 'John Smith',
  email: 'john.smith@company.com',
  phone: '+1 (555) 123-4567',
  role: 'admin',
  status: 'active',
  permissions: ['users_read', 'users_write', 'content_read']
};

// Initialize form based on mode
onMounted(() => {
  const adminId = route.params.id;
  if (adminId) {
    isEditMode.value = true;
    // In real app, fetch admin data by ID
    formData.value = { ...sampleAdminData };
  }
});

// Navigation functions
const nextStep = () => {
  if (validateStep1()) {
    currentStep.value = 2;
  }
};

const previousStep = () => {
  currentStep.value = 1;
};

// Validation functions
const validateStep1 = () => {
  errors.value = {};
  
  if (!formData.value.fullName.trim()) {
    errors.value.fullName = 'Full name is required';
  }
  
  if (!formData.value.email.trim()) {
    errors.value.email = 'Email address is required';
  } else if (!isValidEmail(formData.value.email)) {
    errors.value.email = 'Please enter a valid email address';
  }
  
  return Object.keys(errors.value).length === 0;
};

const validateStep2 = () => {
  errors.value = {};
  
  if (!isEditMode.value && !formData.value.password) {
    errors.value.password = 'Password is required';
  } else if (formData.value.password && formData.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters long';
  }
  
  if (!isEditMode.value && formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match';
  }
  
  if (!formData.value.role) {
    errors.value.role = 'Role is required';
  }
  
  if (!formData.value.status) {
    errors.value.status = 'Status is required';
  }
  
  return Object.keys(errors.value).length === 0;
};

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Submit form
const submitForm = async () => {
  if (validateStep2()) {
    try {
      // Simulate API call
      // Show success message
      showSuccess.value = true;
      setTimeout(() => {
        showSuccess.value = false;
        router.push('/admin-management'); // Redirect to admin list
      }, 2000);
      
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  }
};

definePageMeta({
  layout: "adminPanel",
});
</script>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>