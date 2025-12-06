<template>
  <div class="w-full rounded-lg bg-white border border-whitesmoke border-solid flex flex-col items-start p-4 sm:p-5 lg:p-6 gap-4 text-left text-base text-gray-900 font-plus-jakarta-sans">
    <h2 class="w-full relative leading-[130%] capitalize font-semibold text-lg">Recent Activity</h2>
    
    <div class="w-full flex flex-col items-start gap-3 text-sm text-gray-600">
      <!-- Activity Items -->
      <div 
        v-for="(activity, index) in activities" 
        :key="index"
        class="w-full"
      >
        <div class="w-full flex items-start gap-3">
          <component 
            :is="activity.icon" 
            class="w-5 h-5 relative flex-shrink-0 text-gray-500 stroke-[2]" 
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
  class="w-full relative border-t border-solid border-gray-100 mt-3" 
/>

      </div>
    </div>
  </div>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue';
  import { Plus, CheckCircle, MessageSquare, UserPlus, Building2 } from 'lucide-vue-next';
import { useStubClient } from '~/services/stubClient'
  
  const iconMap = { Building2, CheckCircle, MessageSquare };
  const activities = ref([]);
const stubClient = useStubClient();
const nuxtApp = useNuxtApp();
  
  const fetchData = async () => {
    try {
    const activitiesData = await stubClient.list('recentActivities', { delay: 140 });
      activities.value = (activitiesData || []).map(a => ({
        icon: iconMap[a.icon] || MessageSquare,
        title: a.title,
        time: a.time
      }));
    } catch (error) {
      console.error('Failed to load recent activities:', error);
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.alert('Failed to load recent activities');
      } catch {}
    }
      activities.value = [];
    }
  };
  
  onMounted(() => {
    fetchData();
  });
  </script>
  
  <style scoped>
  .font-plus-jakarta-sans {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  </style>