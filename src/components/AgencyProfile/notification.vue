<template>
    <div class="w-full font-plus-jakarta-sans max-w-full overflow-hidden">
      
      <!-- Header Section with Gradient Background -->
      <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Notifications</h1>
          <button
            class="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-semibold px-4 py-2.5 rounded-lg transition shadow-md whitespace-nowrap text-sm w-full sm:w-auto text-center touch-manipulation flex items-center justify-center gap-2"
          >
            <Pencil class="w-4 h-4" />
            Mark All Read
          </button>
        </div>
      </div>
  
      <!-- Notifications Container -->
      <div class="w-full bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <!-- Header -->
        <div class="border-b border-gray-200 p-4 sm:p-5">
          <h2 class="text-base sm:text-lg font-bold text-gray-900">Recent Notifications</h2>
        </div>
        
        <!-- Notifications List -->
        <div>
          <div 
            v-for="n in notifications" 
            :key="n.id"
            class="border-b border-gray-200 flex items-start justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition"
          >
            <div class="flex items-start gap-3 flex-1">
              <div class="h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center flex-shrink-0" :class="n.bgColor">
                <component :is="n.icon" class="w-4 h-4 sm:w-5 sm:h-5" :class="n.iconColor" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-xs sm:text-sm font-medium text-gray-900">{{ n.title }}</div>
                <div class="text-xs sm:text-sm text-gray-600 mt-1">{{ n.message }}</div>
                <div class="text-xs text-gray-500 mt-2">{{ n.time }}</div>
              </div>
            </div>
            <div v-if="n.unread" class="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
          </div>
        </div>
      </div>
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