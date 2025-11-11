<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="handleClose"
  >
    <div class="w-full max-w-3xl relative shadow-[0px_0px_17px_rgba(0,_0,_0,_0.05)] rounded-2xl bg-white border-whitesmoke border-solid border box-border flex flex-col items-center p-8 md:p-16 gap-8 max-h-[90vh] overflow-y-auto scrollbar-thin">
      <!-- Close Button -->
      <button 
        @click="handleClose"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
      >
        <X class="w-6 h-6" />
      </button>

      <!-- Modal Header -->
      <div class="w-full max-w-md flex flex-col items-center gap-6 text-center">
        <b class="text-2xl md:text-3xl leading-[126%] capitalize text-gray-800">Add New Company Profile</b>
        <div class="text-base leading-[160%] capitalize text-slate-600">Fill out the form below to create a new company profile in the system.</div>
      </div>

      <div class="w-full border-whitesmoke border-dashed border-t box-border" />

      <!-- Form Content -->
      <div class="w-full flex flex-col items-center gap-8 text-left text-base">
        <div class="w-full flex flex-col items-start gap-8">
          <!-- Progress -->
          <div class="w-full flex flex-col items-start gap-4">
            <b class="leading-[130%] capitalize text-gray-800">Step {{ currentStep }} of 3</b>
            <div class="w-full relative h-0.5">
              <div class="absolute top-0 left-0 bg-gray-300 w-full h-[1.5px]" />
              <div 
                class="absolute top-0 left-0 bg-yellow-400 h-0.5 transition-all duration-300"
                :style="{ width: `${(currentStep / 3) * 100}%` }"
              />
            </div>
          </div>

          <!-- Step 1: Basic Info -->
          <div v-if="currentStep === 1" class="w-full flex flex-col items-start gap-5 text-slate-600">
            <div class="w-full flex flex-col items-start gap-4">
              <div class="leading-[160%] capitalize font-medium">Company Name</div>
              <input 
                v-model="formData.companyName"
                type="text"
                placeholder="e.g., Yellow.Book Travel Agency"
                class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-[46px] px-3 text-gray-700 outline-none focus:border-yellow-400 transition"
              />
            </div>

            <div class="w-full flex flex-col items-start gap-4">
              <div class="leading-[160%] capitalize font-medium">Website</div>
              <input 
                v-model="formData.website"
                type="url"
                placeholder="https://www.yourcompany.com"
                class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-[46px] px-3 text-gray-700 outline-none focus:border-yellow-400 transition"
              />
            </div>

            <div class="w-full flex flex-col items-start gap-4">
              <div class="leading-[160%] capitalize font-medium">Category</div>
              <select 
                v-model="formData.category"
                class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-11 px-3 text-gray-700 outline-none focus:border-yellow-400 transition cursor-pointer"
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
              </select>
            </div>
          </div>

          <!-- Step 2: Company Details -->
          <div v-if="currentStep === 2" class="w-full flex flex-col items-start gap-5 text-slate-600">
            <div class="w-full flex flex-col items-start gap-4">
              <div class="leading-[160%] capitalize font-medium">Number of Employees</div>
              <select 
                v-model="formData.employees"
                class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-11 px-3 text-gray-700 outline-none focus:border-yellow-400 transition cursor-pointer"
              >
                <option value="">Select Range</option>
                <option value="1-10">1–10</option>
                <option value="11-30">11–30</option>
                <option value="31-50">31–50</option>
                <option value="51-100">51–100</option>
                <option value="100+">100+</option>
              </select>
            </div>

            <div class="w-full flex flex-col items-start gap-4">
              <div class="leading-[160%] capitalize font-medium">Annual Revenue</div>
              <select 
                v-model="formData.revenue"
                class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-11 px-3 text-gray-700 outline-none focus:border-yellow-400 transition cursor-pointer"
              >
                <option value="">Select Range</option>
                <option value="0-100k">0–100K MNT</option>
                <option value="100k-500k">100K–500K MNT</option>
                <option value="500k-1m">500K–1M MNT</option>
                <option value="1m+">1M+ MNT</option>
              </select>
            </div>

            <div class="w-full flex flex-col items-start gap-4">
              <div class="leading-[160%] capitalize font-medium">Company Description</div>
              <textarea 
                v-model="formData.description"
                placeholder="Brief description of the company..."
                rows="4"
                class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border p-3 text-gray-700 outline-none focus:border-yellow-400 transition resize-none"
              />
            </div>
          </div>

          <!-- Step 3: Contact Person -->
          <div v-if="currentStep === 3" class="w-full flex flex-col items-start gap-5 text-slate-600">
            <div class="w-full flex flex-col items-start gap-4">
              <div class="leading-[160%] capitalize font-medium">First Name</div>
              <input 
                v-model="formData.firstName"
                type="text"
                placeholder="John"
                class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-[46px] px-3 text-gray-700 outline-none focus:border-yellow-400 transition"
              />
            </div>

            <div class="w-full flex flex-col items-start gap-4">
              <div class="leading-[160%] capitalize font-medium">Last Name</div>
              <input 
                v-model="formData.lastName"
                type="text"
                placeholder="Doe"
                class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-[46px] px-3 text-gray-700 outline-none focus:border-yellow-400 transition"
              />
            </div>

            <div class="w-full flex flex-col items-start gap-4">
              <div class="leading-[160%] capitalize font-medium">Job Title</div>
              <input 
                v-model="formData.jobTitle"
                type="text"
                placeholder="e.g., CEO, Travel Agent"
                class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-[46px] px-3 text-gray-700 outline-none focus:border-yellow-400 transition"
              />
            </div>

            <div class="w-full flex flex-col sm:flex-row items-start gap-5">
              <div class="w-full sm:w-32 flex flex-col items-start gap-4">
                <div class="leading-[160%] capitalize font-medium">Country</div>
                <select 
                  v-model="formData.country"
                  class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-11 px-3 text-gray-700 outline-none focus:border-yellow-400 transition cursor-pointer"
                >
                  <option value="+976">🇲🇳 +976</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+86">🇨🇳 +86</option>
                </select>
              </div>

              <div class="flex-1 w-full flex flex-col items-start gap-4">
                <div class="leading-[160%] capitalize font-medium">Phone Number</div>
                <input 
                  v-model="formData.phone"
                  type="tel"
                  placeholder="Enter phone number"
                  class="w-full rounded bg-gray-50 border-gray-300 border-solid border box-border h-[46px] px-3 text-gray-700 outline-none focus:border-yellow-400 transition"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="w-full flex items-center gap-4 text-center">
          <button 
            v-if="currentStep > 1"
            @click="previousStep"
            class="flex-1 rounded bg-yellow-50 h-12 flex items-center justify-center py-[18px] px-9 font-semibold leading-[130%] capitalize text-gray-800 hover:bg-yellow-100 transition"
          >
            Previous
          </button>
          <button 
            v-if="currentStep < 3"
            @click="nextStep"
            class="flex-1 rounded bg-yellow-400 h-12 flex items-center justify-center py-[18px] px-9 font-semibold leading-[130%] capitalize text-gray-800 hover:bg-yellow-500 transition"
          >
            Next
          </button>
          <button 
            v-if="currentStep === 3"
            @click="submitForm"
            class="flex-1 rounded bg-yellow-400 h-12 flex items-center justify-center py-[18px] px-9 font-semibold leading-[130%] capitalize text-gray-800 hover:bg-yellow-500 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { X } from "lucide-vue-next";
import { useStubClient } from '~/services/stubClient';

// Define props and emits
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close', 'created']);

const nuxtApp = useNuxtApp();
const stubClient = useStubClient();

// Modal state
const currentStep = ref(1);
const submitting = ref(false);

// Form data
const formData = ref({
  companyName: '',
  website: '',
  category: '',
  employees: '',
  revenue: '',
  description: '',
  firstName: '',
  lastName: '',
  jobTitle: '',
  country: '+976',
  phone: ''
});

// Modal functions
const handleClose = () => {
  if (submitting.value) return;
  emit('close');
  resetFormAndSteps();
};

const resetFormAndSteps = () => {
  currentStep.value = 1;
  formData.value = {
    companyName: '',
    website: '',
    category: '',
    employees: '',
    revenue: '',
    description: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    country: '+976',
    phone: ''
  };
};

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const submitForm = async () => {
  if (submitting.value) return;

  const name = formData.value.companyName.trim();
  if (!name) {
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.alert('Company name is required');
      } catch {}
    }
    return;
  }

  submitting.value = true;
  const payload = {
    name,
    website: formData.value.website?.trim() || '',
    category: formData.value.category || 'General',
    mobile: formData.value.phone?.trim() || '',
    status: 'Pending',
    verified: false,
    description: formData.value.description?.trim() || '',
  };

  try {
    const created = await stubClient.create('companies', payload, { delay: 220 });
    emit('created', created);
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.success('Company added');
      } catch {}
    }
    handleClose();
  } catch (error) {
    console.error('Failed to create company', error);
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.alert('Failed to create company');
      } catch {}
    }
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
/* Thin custom scrollbar */
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>