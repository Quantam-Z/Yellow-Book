<template>
    <div class="w-full rounded-lg flex flex-col items-start p-5 gap-4 text-left text-lg text-gray-900 font-plus-jakarta-sans" style="background: linear-gradient(135deg, #bbdefb 0%, #ffffff 100%);">
      <h2 class="w-full relative leading-[130%] capitalize font-bold">Recent Activity</h2>
      
      <div class="w-full flex flex-col items-start gap-3 text-sm">
        <!-- Activity Items -->
        <div 
          v-for="(activity, index) in activities" 
          :key="index"
          class="w-full"
        >
          <div class="w-full flex items-start gap-3">
            <component 
              :is="activity.icon" 
              class="w-5 h-5 relative flex-shrink-0 text-black stroke-[2]" 
            />
            <div class="flex-1 flex flex-col items-start gap-1">
              <div class="w-full relative leading-[130%] font-medium text-gray-900">
                {{ activity.title }}
              </div>
              <div class="w-full relative leading-[130%] text-gray-500 text-xs">
                {{ activity.time }}
              </div>
            </div>
          </div>
          
          <div 
  v-if="index < activities.length - 1" 
  class="w-full relative border-t border-dashed border-white h-px mt-3" 
/>

        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Plus, CheckCircle, MessageSquare, UserPlus, Building2 } from 'lucide-vue-next';
  
  const activities = [
    {
      icon: Building2,
      title: 'New company added: Stellar Solutions',
      time: '2 hours ago'
    },
    {
      icon: CheckCircle,
      title: 'Company verified: Aurora Enterprises',
      time: '4 hours ago'
    },
    {
      icon: MessageSquare,
      title: 'Review submitted for Zenith Corp',
      time: '6 hours ago'
    },
    {
      icon: Building2,
      title: 'New company added: Apex Innovations',
      time: '8 hours ago'
    },
    {
      icon: CheckCircle,
      title: 'Company verified: Nova Dynamics',
      time: '10 hours ago'
    },
  ];
  </script>
  
  <style scoped>
  .font-plus-jakarta-sans {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  </style>