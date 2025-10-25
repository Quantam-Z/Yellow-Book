<template>
    <div class="w-full min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      
      <!-- Header Section -->
      <div class="w-full rounded-xl bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-200 shadow-sm">
        <div class="flex items-center justify-between">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Notifications</h1>
          <button
            class="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold bg-white border border-indigo-400 text-indigo-600 shadow-md hover:bg-indigo-50 transition-colors"
          >
            <Pencil class="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>
  
      <!-- Main Content Card -->
      <!-- <div class="w-full relative bg-white flex flex-col gap-8 p-6 lg:p-8 rounded-xl shadow-2xl shadow-gray-200/50"> -->
        
        <!-- Notifications Container -->
        <div class="w-full relative shadow-lg rounded-lg bg-white overflow-hidden flex flex-col items-start">
          
          <!-- Header -->
          <div class="self-stretch border-b border-gray-200 flex items-center p-4 sm:p-5">
            <h2 class="text-lg sm:text-xl font-bold text-gray-800 capitalize">Recent Notifications</h2>
          </div>
          
          <!-- Notifications List -->
          <div class="self-stretch flex flex-col items-start">
            <div 
              v-for="n in notifications" 
              :key="n.id"
              class="self-stretch bg-white border-b border-gray-200 flex items-start justify-between p-4 sm:p-5 hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-start gap-3">
                <div class="h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center" :class="n.bgColor">
                  <component :is="n.icon" class="w-4 h-4 sm:w-5 sm:h-5" :class="n.iconColor" />
                </div>
                <div class="flex-1 flex flex-col items-start gap-3">
                  <div class="flex flex-col items-start gap-1">
                    <div class="text-sm sm:text-base font-medium text-gray-800 capitalize">{{ n.title }}</div>
                    <div class="text-xs sm:text-sm text-gray-600">{{ n.message }}</div>
                  </div>
                  <div class="text-xs text-gray-500">{{ n.time }}</div>
                </div>
              </div>
              <div v-if="n.unread" class="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
  </template>
  
  <script setup>
  import { 
    Pencil, 
    Star, 
    BadgeCheck, 
    AlertCircle, 
    Megaphone, 
    MessageCircle, 
    DollarSign
  } from 'lucide-vue-next';
  import { ref } from 'vue';

  // Map icon names from stub to actual components
  const iconMap = { Star, BadgeCheck, AlertCircle, Megaphone, MessageCircle, DollarSign };

  // Load notifications from stub JSON and keep them mutable for actions
  const notifications = ref([]);
  const { data: notificationsData } = await useFetch('/stubs/agencyNotifications.json');
  notifications.value = (notificationsData.value || []).map(n => ({
    id: n.id,
    title: n.title,
    message: n.message,
    time: n.time,
    icon: iconMap[n.icon] || MessageCircle,
    iconColor: n.iconColor || 'text-gray-600',
    bgColor: n.bgColor || 'bg-gray-100',
    unread: Boolean(n.unread),
  }));

  // Methods
  const markAllAsRead = () => {
    notifications.value.forEach(notification => {
      notification.unread = false;
    });
  };

  const clearAllNotifications = () => {
    notifications.value = [];
  };
  </script>
  
  <style scoped>
  .shadow-2xl {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 20px 50px rgba(0, 0, 0, 0.03);
  }
  </style>