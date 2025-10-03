<template>
    <div class="w-full min-h-screen bg-gray-50 p-4 sm:p-6">
      
      <div
        class="w-full rounded-xl bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 p-4 mb-6 border border-gray-200 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900">My Company Profile</h1>
          <button
            class="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-white border border-indigo-400 text-indigo-600 shadow-md hover:bg-indigo-50 transition-colors"
          >
            <Pencil class="w-4 h-4" />
            Edit Profile
          </button>
        </div>
        <p class="mt-1 text-sm text-gray-600">Manage your company's details, logo, and cover photo.</p>
      </div>
  
      <div
        class="w-full relative bg-white flex flex-col gap-8 p-6 lg:p-8 rounded-xl shadow-2xl shadow-gray-200/50"
      >
        
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-gray-800 border-b pb-2">Branding Assets</h2>
          <div class="flex flex-col md:flex-row items-start justify-between gap-6">
            
            <div class="flex flex-col items-start gap-4 w-full md:w-[350px]">
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
  
            <div class="flex flex-col items-start gap-4 flex-1">
              <label class="font-medium text-sm text-gray-700">Cover Photo</label>
              <div
                class="w-full rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 h-[180px] flex items-center justify-center p-4 hover:border-blue-400 transition-colors cursor-pointer"
              >
                <div class="flex flex-col items-center justify-center gap-2 text-center">
                  <Monitor class="w-8 h-8 text-gray-400" />
                  <p class="text-xs text-gray-500 font-medium">Drag & drop or click to upload</p>
                  <p class="text-xs text-gray-400">Optimal size 1920x400px.</p>
                </div>
              </div>
              <button
                class="w-full rounded-lg bg-indigo-600 text-white h-10 flex items-center justify-center gap-2 font-medium shadow-md hover:bg-indigo-700 transition-colors"
              >
                <Upload class="w-4 h-4" />
                Upload Cover Photo
              </button>
            </div>
          </div>
        </div>
        
        <div class="space-y-6">
          <h2 class="text-xl font-bold text-gray-800 border-b pb-2">Core Information</h2>
          <div class="w-full relative flex items-center gap-5 text-left text-sm text-dimgray font-plus-jakarta-sans">
<div class="flex-1 flex flex-col items-start gap-5">
<div class="self-stretch flex flex-col items-start gap-3">
<div class="self-stretch relative leading-[130%] capitalize font-medium">Tech Solutions Inc.</div>
<div class="self-stretch rounded-num-4 border-gainsboro border-solid border-[1px] flex items-center py-num-16 px-num-12 text-center text-darkgray">
<div class="relative leading-[130%] capitalize">Tech Solutions Inc.</div>
</div>
</div>
<div class="self-stretch flex flex-col items-start gap-3">
<div class="self-stretch relative leading-[130%] capitalize font-medium">Website</div>
<div class="self-stretch rounded-num-4 border-gainsboro border-solid border-[1px] flex items-center py-num-16 px-num-12 text-center text-darkgray">
<div class="relative [text-decoration:underline] leading-[130%] capitalize">https://techsolutions.com</div>
</div>
</div>
<div class="self-stretch flex flex-col items-start gap-3">
<div class="self-stretch relative leading-[130%] capitalize font-medium">Number of Employees</div>
<div class="self-stretch rounded-num-4 border-gainsboro border-solid border-[1px] box-border h-num-48 flex items-center justify-between py-num-16 px-num-12 gap-0 text-center text-darkslategray">
<div class="relative leading-[130%] capitalize">10-20</div>
<img class="w-5 relative h-5" alt="" />
</div>
</div>
<div class="self-stretch flex flex-col items-start gap-3">
<div class="self-stretch relative leading-[130%] capitalize font-medium">First Name</div>
<div class="self-stretch rounded-num-4 border-gainsboro border-solid border-[1px] box-border h-num-48 flex items-center py-num-16 px-num-12 text-center text-darkgray">
<div class="relative leading-[130%] capitalize">John</div>
</div>
</div>
<div class="self-stretch flex flex-col items-start gap-3">
<div class="self-stretch relative leading-[130%] capitalize font-medium">Job Title</div>
<div class="self-stretch rounded-num-4 border-gainsboro border-solid border-[1px] box-border h-num-48 flex items-center py-num-16 px-num-12 text-center text-darkgray">
<div class="relative leading-[130%] capitalize">CEO & Founder</div>
</div>
</div>
<div class="self-stretch flex flex-col items-start gap-3">
<div class="self-stretch relative leading-[130%] capitalize font-medium">Company Category</div>
<div class="self-stretch rounded-num-4 border-gainsboro border-solid border-[1px] box-border h-num-48 flex items-center justify-between py-num-16 px-num-12 gap-0 text-center text-darkslategray">
<div class="relative leading-[130%] capitalize">Software development</div>
<img class="w-5 relative h-5" alt="" />
</div>
</div>
</div>
<div class="flex-1 flex flex-col items-start gap-5">
<div class="self-stretch flex flex-col items-start gap-3">
<div class="self-stretch relative leading-[130%] capitalize font-medium">Work Email</div>
<div class="self-stretch rounded-num-4 border-gainsboro border-solid border-[1px] flex items-center py-num-16 px-num-12 text-center text-darkgray">
<div class="relative leading-[130%] capitalize">contact@techsolutions.com</div>
</div>
</div>
<div class="self-stretch flex flex-col items-start gap-3">
<div class="self-stretch relative leading-[130%] capitalize font-medium">Phone Number</div>
<div class="self-stretch rounded-num-4 border-gainsboro border-solid border-[1px] flex items-center py-num-16 px-num-12 text-center text-darkgray">
<div class="relative leading-[130%] capitalize">+1 (555) 123-4567</div>
</div>
</div>
<div class="self-stretch flex flex-col items-start gap-3">
<div class="self-stretch relative leading-[130%] capitalize font-medium">Annual Revenue</div>
<div class="self-stretch rounded-num-4 border-gainsboro border-solid border-[1px] box-border h-num-48 flex items-center justify-between py-num-16 px-num-12 gap-0 text-center text-darkslategray">
<div class="relative leading-[130%] capitalize">$1M-$10</div>
<img class="w-5 relative h-5" alt="" />
</div>
</div>
<div class="self-stretch flex flex-col items-start gap-3">
<div class="self-stretch relative leading-[130%] capitalize font-medium">Last Name</div>
<div class="self-stretch rounded-num-4 border-gainsboro border-solid border-[1px] box-border h-num-48 flex items-center py-num-16 px-num-12 text-center text-darkslategray">
<div class="relative leading-[130%] capitalize">Doe</div>
</div>
</div>
<div class="self-stretch flex flex-col items-start gap-3">
<div class="self-stretch relative leading-[130%] capitalize font-medium">Industry</div>
<div class="self-stretch rounded-num-4 border-gainsboro border-solid border-[1px] box-border h-num-48 flex items-center justify-between py-num-16 px-num-12 gap-0 text-center text-darkslategray">
<div class="relative leading-[130%] capitalize">Technology</div>
<img class="w-5 relative h-5" alt="" />
</div>
</div>
<div class="self-stretch flex flex-col items-start gap-3">
<div class="self-stretch relative leading-[130%] capitalize font-medium">Company Destination</div>
<div class="self-stretch rounded-num-4 border-gainsboro border-solid border-[1px] box-border h-num-48 flex items-center justify-between py-num-16 px-num-12 gap-0 text-center text-darkslategray">
<div class="relative leading-[130%] capitalize">San Francisco, CA</div>
<img class="w-5 relative h-5" alt="" />
</div>
</div>
</div>
</div>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-6">
              <FormField label="Company Name" value="Tech Solutions Inc." type="text" disabled />
              <FormField label="Website" value="https://techsolutions.com" type="url" disabled class="text-blue-600 underline" />
              <FormField label="Number of Employees" value="10-20" type="select" disabled />
              <FormField label="First Name" value="John" type="text" disabled />
              <FormField label="Job Title" value="CEO & Founder" type="text" disabled />
              <FormField label="Company Category" value="Software Development" type="select" disabled />
            </div>
  
            <div class="space-y-6">
              <FormField label="Work Email" value="contact@techsolutions.com" type="email" disabled />
              <FormField label="Phone Number" value="+1 (555) 123-4567" type="tel" disabled />
              <FormField label="Annual Revenue" value="$1M - $10M" type="select" disabled />
              <FormField label="Last Name" value="Doe" type="text" disabled />
              <FormField label="Industry" value="Technology" type="select" disabled />
              <FormField label="Company Location" value="San Francisco, CA" type="select" disabled />
            </div>
          </div>
        </div>
        
        <div class="space-y-6">
          <h2 class="text-xl font-bold text-gray-800 border-b pb-2">Detailed Description</h2>
  
          <div class="grid md:grid-cols-1 gap-6">
            <FormField label="Tagline" value="Innovative technology solutions for modern businesses" type="text" disabled />
            
            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1">Description</label>
              <textarea
                disabled
                rows="4"
                class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 resize-none focus:border-indigo-500 transition-colors disabled:opacity-100 disabled:cursor-not-allowed"
              >
                We are a leading technology company specializing in custom software
                development, cloud solutions, and digital transformation services. Our
                team of experienced developers and consultants work closely with
                clients to deliver innovative solutions that drive business growth.
              </textarea>
            </div>
  
            <div>
              <label class="font-medium text-sm text-gray-700 block mb-1">Services You Provide (Comma Separated)</label>
              <textarea
                disabled
                rows="3"
                class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 resize-none focus:border-indigo-500 transition-colors disabled:opacity-100 disabled:cursor-not-allowed"
              >
                Custom Software Development, Cloud Migration, Mobile App Development,
                DevOps Services, Technical Consulting, API Integration
              </textarea>
            </div>
          </div>
        </div>
  
        <div class="flex justify-end pt-4 border-t border-gray-100">
          <button
            class="w-full sm:w-[200px] rounded-xl bg-green-500 text-white py-3 font-medium flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors"
          >
            <Save class="w-4 h-4" />
            Save & Apply Changes
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Upload, Image, Monitor, Pencil, Save, ChevronDown } from 'lucide-vue-next';
  import { ref } from 'vue';
  
  // --- Reusable Form Field Component (Local definition) ---
  const FormField = {
    props: {
      label: String,
      value: String,
      type: {
        type: String,
        default: 'text',
      },
      disabled: Boolean,
      class: String,
    },
    template: `
      <div>
        <label class="font-medium text-sm text-gray-700 block mb-1">{{ label }}</label>
        <div class="relative">
          <input 
            v-if="type !== 'select'"
            :type="type"
            :value="value"
            :disabled="disabled"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-indigo-500 transition-colors disabled:opacity-100 disabled:cursor-not-allowed"
            :class="class"
          />
          <div v-else class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 flex justify-between items-center disabled:opacity-100 disabled:cursor-not-allowed">
              <span :class="class">{{ value }}</span>
              <ChevronDown class="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>
    `,
    components: { ChevronDown },
  };
  
  // Data simulation would go here if needed for reactivity
  const companyData = ref({
      name: 'Tech Solutions Inc.',
      // ... other fields
  });
  </script>
  
  <style scoped>
  /* Optional: Adding a small custom style for better shadow depth */
  .shadow-2xl {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 20px 50px rgba(0, 0, 0, 0.03);
  }
  </style>