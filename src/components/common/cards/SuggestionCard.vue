<template>
    <div>
      <nuxt-link :to="linkTo(item)">
        <div :class="['course-card', { 'my-course': myCourse }]"
          class="border border-[#EEE] rounded-3xl bg-white hover:shadow-lg transition-shadow duration-300">
          
          <!-- Image Section -->
          <div class="relative w-full aspect-[16/9] overflow-hidden px-3 pt-3">
            <img class="w-full h-full object-cover rounded-2xl"
              :src="item.image?.link ? item?.image?.link : '/images/no_image.jpg'" 
              :alt="item.title" />
  
            <!-- Bookmark Button -->
            <button @click.stop.prevent="toggleBookmark(item)"
              class="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
              aria-label="Bookmark course">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                :class="isBookmarked(item.id) ? 'text-blue-600 fill-blue-600' : 'text-gray-700 fill-none'"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
  
          <!-- Content Section -->
          <div class="flex flex-col px-4">
            <!-- Title -->
            <div class="py-4 min-h-[72px] flex items-center">
              <h3 class="text-[#212121] text-lg font-semibold line-clamp-2 leading-tight">
                {{ item.title }}
              </h3>
            </div>
            
            <hr class="border-[#EEE]">
  
            <!-- Price/Status Section -->
            <div class="py-4">
              <template v-if="!isActiveStatus(item.subscription_status.status)">
                <div v-if="item.price && Object.keys(item.price).length" class="space-y-2">
                  <div class="flex items-center justify-between">
                    <!-- Discounted Price -->
                    <div class="flex items-center space-x-2">
                      <span v-if="item.price.discount" class="text-xl font-bold text-[#17107F]">
                        ৳{{ item.price.amount - item.price.discount }}
                      </span>
                      <span v-if="item.price.discount" class="text-sm line-through text-gray-500">
                        ৳{{ item.price.amount }}
                      </span>
                    </div>
                    
                    <!-- Discount Badge -->
                    <span v-if="item.price.discount" 
                      class="text-xs font-medium bg-[#E6F3FD] text-[#17107F] px-3 py-1 rounded-full">
                      {{ Math.round((item.price.discount / item.price.amount) * 100) }}% OFF
                    </span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="flex items-center space-x-2">
                  <span class="w-2 h-2 rounded-full bg-green-500"></span>
                  <span class="text-sm font-medium text-gray-600">
                    {{ statusText(item.subscription_status.status) }}
                  </span>
                </div>
              </template>
            </div>
  
            <!-- Button Section -->
            <div class="pb-4">
              <button
                :class="[
                  'w-full py-3 rounded-xl text-lg font-semibold transition-colors duration-200',
                  buttonClasses(item.subscription_status.status)
                ]"
                :disabled="item.subscription_status.status === 'expired'">
                {{ buttonText(item.subscription_status.status) }}
              </button>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    item: { type: Object, default: () => { } },
    myCourse: { type: Boolean, default: false },
  });
  
  const linkTo = (item) => {
    if (isActiveStatus(item?.subscription_status?.status)) {
      return `/my-courses/${item.slug}`;
    }
    return `/courses/${item.slug}`;
  };
  
  const isActiveStatus = (status) => {
    return ['active', 'expiring-soon'].includes(status);
  };
  
  const statusText = (status) => {
    const statusMap = {
      'active': 'Active',
      'expiring-soon': 'Expiring Soon',
      'expired': 'Expired'
    };
    return statusMap[status] || '';
  };
  
  const buttonText = (status) => {
    const textMap = {
      'active': 'শেখা শুরু করুন',
      'expiring-soon': 'শেখা শুরু করুন',
      'expired': 'কোর্সের মেয়াদ শেষ',
      'default': 'এনরোল করুন'
    };
    return textMap[status] || textMap.default;
  };
  
  const buttonClasses = (status) => {
    const classesMap = {
      'active': 'bg-[#118a7e] hover:bg-[#0e7167] text-white shadow-md hover:shadow-lg',
      'expiring-soon': 'bg-[#118a7e] hover:bg-[#0e7167] text-white shadow-md hover:shadow-lg',
      'expired': 'bg-gray-300 text-gray-600 cursor-not-allowed',
      'default': 'bg-[#17107F] hover:bg-[#0d0a5a] text-white shadow-md hover:shadow-lg'
    };
    return classesMap[status] || classesMap.default;
  };
  
  // Bookmark functionality
  const bookmarkedItems = ref([]);
  
  onMounted(() => {
    if (process.client) {
      bookmarkedItems.value = JSON.parse(localStorage.getItem('bookmarkedCourses')) || [];
    }
  });
  
  const isBookmarked = (courseId) => {
    return bookmarkedItems.value.some(item => item.id === courseId);
  };
  
  const toggleBookmark = (course) => {
    if (!process.client) return;
    
    const index = bookmarkedItems.value.findIndex(item => item.id === course.id);
    
    if (index === -1) {
      bookmarkedItems.value.push({
        id: course.id,
        title: course.title,
        slug: course.slug,
        image: course.image?.link || '/images/no_image.jpg'
      });
    } else {
      bookmarkedItems.value.splice(index, 1);
    }
    
    localStorage.setItem('bookmarkedCourses', JSON.stringify(bookmarkedItems.value));
  };
  </script>
  
  <style scoped>
  .course-card {
    @apply w-full;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .course-card:hover {
    transform: translateY(-2px);
  }
  
  @media (min-width: 1280px) {
    .course-card:not(.my-course) {
      width: 350px;
    }
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>