<template>
  <div class="w-full min-h-screen bg-white p-3 sm:p-4 md:p-6">
    
    <!-- Header Section -->
    <div class="w-full rounded-xl bg-gradient-to-br from-indigo-500/10 to-pink-500/10 p-4 sm:p-6 border border-gray-200 shadow-lg mb-4 sm:mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">Welcome John</h1>
          <p class="text-sm text-gray-600">Review and manage agency feedback.</p>
        </div>
        <button
          class="bg-white/90 hover:bg-white text-gray-800 font-semibold px-4 py-2.5 transition shadow-md whitespace-nowrap text-sm w-full sm:w-auto text-center rounded-none border-none"
          aria-label="List Company"
        >
          List Company
        </button>
      </div>
    </div>

    <!-- Notifications Container -->
    <div class="w-full lg:w-[65%] relative shadow-lg rounded-lg bg-white overflow-hidden flex flex-col items-start">
      
      <!-- Header -->
      <div class="self-stretch border-b border-gray-200 flex items-center p-4 sm:p-5">
        <h2 class="text-lg sm:text-xl font-bold text-gray-800 capitalize">Recent Notifications</h2>
      </div>
      
      <!-- Notifications List -->
      <div class="self-stretch flex flex-col items-start w-full">
        <div 
          v-for="n in notifications" 
          :key="n.id"
          class="self-stretch bg-white border-b border-gray-200 flex items-start justify-between p-4 sm:p-5 hover:bg-gray-50 transition-colors w-full"
        >
          <div class="flex items-start gap-3 w-full">
            <div class="h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center flex-shrink-0" :class="n.bgColor">
              <component :is="n.icon" class="w-4 h-4 sm:w-5 sm:h-5" :class="n.iconColor" />
            </div>
            <div class="flex-1 flex flex-col items-start gap-2 min-w-0">
              <div class="flex flex-col items-start gap-1 w-full">
                <div class="text-sm sm:text-base font-medium text-gray-800 capitalize truncate w-full">{{ n.title }}</div>
                <div class="text-xs sm:text-sm text-gray-600 line-clamp-2 w-full">{{ n.message }}</div>
              </div>
              <div class="text-xs text-gray-500">{{ n.time }}</div>
            </div>
          </div>
          <div v-if="n.unread" class="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0 ml-2"></div>
        </div>

        <!-- Empty State -->
        <div v-if="notifications.length === 0" class="w-full p-8 sm:p-12 text-center">
          <div class="max-w-md mx-auto">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle class="w-8 h-8 text-gray-400" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
            <p class="text-gray-600 mb-4">You're all caught up! Check back later for new updates.</p>
          </div>
        </div>
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

/* Ensure proper text truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>