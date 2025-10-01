<template>
    <div class="w-full rounded-lg border border-gray-200 box-border flex flex-col items-start p-6 gap-4 text-left text-xl text-gray-900 font-plus-jakarta-sans">
      <!-- Header -->
      <div class="w-full flex items-center justify-between">
        <h2 class="relative leading-[130%] capitalize font-bold">Recent Company</h2>
        <div class="relative text-base leading-[130%] capitalize font-semibold text-amber-500 cursor-pointer hover:text-amber-600 transition-colors">
          See All
        </div>
      </div>
  
      <!-- Table -->
      <div class="w-full flex flex-col items-start text-center text-base">
        <!-- Table Header -->
        <div class="w-full relative h-12">
          <div class="absolute top-0 left-0 bg-gray-50 w-full h-12" />
          <div class="absolute top-[18px] left-[11px] w-full grid grid-cols-7 gap-4 items-center text-sm font-semibold">
            <div class="text-left">Company Name</div>
            <div class="text-left">Date</div>
            <div class="text-left">Phone</div>
            <div class="text-left">Website</div>
            <div class="text-left">Category</div>
            <div class="text-left">Status</div>
            <div class="text-left">Actions</div>
          </div>
        </div>
  
        <!-- Table Rows -->
        <div class="w-full flex flex-col items-start text-gray-700">
          <!-- Row Template -->
          <div 
            v-for="(row, index) in rows" 
            :key="index" 
            class="w-full relative h-12 border-b border-dashed border-white hover:bg-gray-50 transition-colors"
          >
            <div class="absolute top-3 left-4 w-full grid grid-cols-7 gap-4 items-center text-sm">
              <div class="text-left truncate">{{ row.name }}</div>
              <div class="text-left truncate">{{ row.date }}</div>
              <div class="text-left truncate">{{ row.phone }}</div>
              <div class="text-left truncate text-amber-500 hover:text-amber-600 cursor-pointer">{{ row.website }}</div>
              <div class="text-left truncate">{{ row.category }}</div>
              <div class="text-left truncate font-semibold text-amber-500">{{ row.status }}</div>
              <div class="text-left">
                <MoreHorizontal class="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { MoreHorizontal } from 'lucide-vue-next';
  
  const rows = [
    {
      name: 'ABC Company',
      date: '12-June-2025',
      phone: '65421231465',
      website: 'www.yourwebsite.com',
      category: 'Category Name',
      status: 'Pending'
    },
    {
      name: 'XYZ Enterprises',
      date: '15-June-2025',
      phone: '9876543210',
      website: 'www.xyz.com',
      category: 'Category Name',
      status: 'Pending'
    },
    {
      name: 'Stellar Solutions',
      date: '20-June-2025',
      phone: '1234567890',
      website: 'www.stellar.com',
      category: 'Category Name',
      status: 'Pending'
    },
    {
      name: 'Nova Dynamics',
      date: '22-June-2025',
      phone: '1122334455',
      website: 'www.nova.com',
      category: 'Category Name',
      status: 'Pending'
    },
    {
      name: 'Apex Innovations',
      date: '25-June-2025',
      phone: '9988776655',
      website: 'www.apex.com',
      category: 'Category Name',
      status: 'Pending'
    }
  ];
  </script>
  
  <style scoped>
  .font-plus-jakarta-sans {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  </style>
  