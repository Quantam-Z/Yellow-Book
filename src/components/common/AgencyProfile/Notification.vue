<template>
    <div class="w-full min-h-screen bg-gray-50 p-4 sm:p-6">
      
      <!-- Header Section -->
      <div class="w-full rounded-xl bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 p-4 mb-6 border border-gray-200 shadow-sm">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900">Notifications</h1>
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
          <div class="self-stretch border-b border-gray-200 flex items-center p-5">
            <h2 class="text-xl font-bold text-gray-800 capitalize">Recent Notifications</h2>
          </div>
          
          <!-- Notifications List -->
          <div class="self-stretch flex flex-col items-start">
            
            <!-- Notification 1 - New Review -->
            <div class="self-stretch bg-white border-b border-gray-200 flex items-start justify-between p-5 hover:bg-gray-50 transition-colors">
              <div class="flex items-start gap-3">
                <div class="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center">
                  <Star class="w-5 h-5 text-green-600" />
                </div>
                <div class="flex-1 flex flex-col items-start gap-3">
                  <div class="flex flex-col items-start gap-1">
                    <div class="text-sm font-medium text-gray-800 capitalize">New Review Received</div>
                    <div class="text-sm text-gray-600">Sarah Johnson left a 5-star review for your company</div>
                  </div>
                  <div class="text-xs text-gray-500">2 hours ago</div>
                </div>
              </div>
              <div class="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
            </div>
  
            <!-- Notification 2 - Verification -->
            <div class="self-stretch bg-white border-b border-gray-200 flex items-start p-5 hover:bg-gray-50 transition-colors">
              <div class="flex items-start gap-3">
                <div class="h-11 w-11 rounded-full bg-blue-100 flex items-center justify-center">
                  <BadgeCheck class="w-5 h-5 text-blue-600" />
                </div>
                <div class="flex-1 flex flex-col items-start gap-3">
                  <div class="flex flex-col items-start gap-1">
                    <div class="text-sm font-medium text-gray-800 capitalize">Company Verification Complete</div>
                    <div class="text-sm text-gray-600">Your company profile has been successfully verified</div>
                  </div>
                  <div class="text-xs text-gray-500">1 day ago</div>
                </div>
              </div>
            </div>
  
            <!-- Notification 3 - Profile Reminder -->
            <div class="self-stretch bg-white border-b border-gray-200 flex items-start p-5 hover:bg-gray-50 transition-colors">
              <div class="flex items-start gap-3">
                <div class="h-11 w-11 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle class="w-5 h-5 text-yellow-600" />
                </div>
                <div class="flex-1 flex flex-col items-start gap-3">
                  <div class="flex flex-col items-start gap-1">
                    <div class="text-sm font-medium text-gray-800 capitalize">Profile Update Reminder</div>
                    <div class="text-sm text-gray-600">Complete your profile to improve visibility (85% complete)</div>
                  </div>
                  <div class="text-xs text-gray-500">2 days ago</div>
                </div>
              </div>
            </div>
  
            <!-- Notification 4 - Platform Announcement -->
            <div class="self-stretch bg-white border-b border-gray-200 flex items-start p-5 hover:bg-gray-50 transition-colors">
              <div class="flex items-start gap-3">
                <div class="h-11 w-11 rounded-full bg-purple-100 flex items-center justify-center">
                  <Megaphone class="w-5 h-5 text-purple-600" />
                </div>
                <div class="flex-1 flex flex-col items-start gap-3">
                  <div class="flex flex-col items-start gap-1">
                    <div class="text-sm font-medium text-gray-800 capitalize">Platform Announcement</div>
                    <div class="text-sm text-gray-600">New features have been added to the dashboard</div>
                  </div>
                  <div class="text-xs text-gray-500">3 days ago</div>
                </div>
              </div>
            </div>
  
            <!-- Notification 5 - New Message -->
            <div class="self-stretch bg-white border-b border-gray-200 flex items-start p-5 hover:bg-gray-50 transition-colors">
              <div class="flex items-start gap-3">
                <div class="h-11 w-11 rounded-full bg-indigo-100 flex items-center justify-center">
                  <MessageCircle class="w-5 h-5 text-indigo-600" />
                </div>
                <div class="flex-1 flex flex-col items-start gap-3">
                  <div class="flex flex-col items-start gap-1">
                    <div class="text-sm font-medium text-gray-800 capitalize">New Message</div>
                    <div class="text-sm text-gray-600">You have a new message from a potential client</div>
                  </div>
                  <div class="text-xs text-gray-500">4 days ago</div>
                </div>
              </div>
            </div>
  
            <!-- Notification 6 - Payment Received -->
            <div class="self-stretch bg-white flex items-start p-5 hover:bg-gray-50 transition-colors">
              <div class="flex items-start gap-3">
                <div class="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign class="w-5 h-5 text-green-600" />
                </div>
                <div class="flex-1 flex flex-col items-start gap-3">
                  <div class="flex flex-col items-start gap-1">
                    <div class="text-sm font-medium text-gray-800 capitalize">Payment Received</div>
                    <div class="text-sm text-gray-600">Your invoice #INV-001 has been paid</div>
                  </div>
                  <div class="text-xs text-gray-500">1 week ago</div>
                </div>
              </div>
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
    DollarSign,
    CheckCircle,
    Trash2
  } from 'lucide-vue-next';
  import { ref } from 'vue';
  
  // Notifications data
  const notifications = ref([
    {
      id: 1,
      title: "New Review Received",
      message: "Sarah Johnson left a 5-star review for your company",
      time: "2 hours ago",
      icon: Star,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      unread: true
    },
    {
      id: 2,
      title: "Company Verification Complete",
      message: "Your company profile has been successfully verified",
      time: "1 day ago",
      icon: BadgeCheck,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      unread: false
    },
    {
      id: 3,
      title: "Profile Update Reminder",
      message: "Complete your profile to improve visibility (85% complete)",
      time: "2 days ago",
      icon: AlertCircle,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
      unread: false
    },
    {
      id: 4,
      title: "Platform Announcement",
      message: "New features have been added to the dashboard",
      time: "3 days ago",
      icon: Megaphone,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      unread: false
    },
    {
      id: 5,
      title: "New Message",
      message: "You have a new message from a potential client",
      time: "4 days ago",
      icon: MessageCircle,
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-100",
      unread: false
    },
    {
      id: 6,
      title: "Payment Received",
      message: "Your invoice #INV-001 has been paid",
      time: "1 week ago",
      icon: DollarSign,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      unread: false
    }
  ]);
  
  // Methods
  const markAllAsRead = () => {
    notifications.value.forEach(notification => {
      notification.unread = false;
    });
    console.log('All notifications marked as read');
  };
  
  const clearAllNotifications = () => {
    notifications.value = [];
    console.log('All notifications cleared');
  };
  </script>
  
  <style scoped>
  .shadow-2xl {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 20px 50px rgba(0, 0, 0, 0.03);
  }
  </style>