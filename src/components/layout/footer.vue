<template>
  <div class="w-full bg-white relative flex flex-col items-start pt-16 lg:pt-24 px-6 sm:px-8 lg:px-32 pb-8 gap-8 lg:gap-10 text-left text-base text-gray-900 font-plus-jakarta-sans">
    
    <div class="w-full h-px bg-gray-300 absolute top-0 left-0"></div>
    
    <div class="w-full flex flex-col items-start gap-12 lg:gap-16">
      <img 
        class="w-32 h-8 lg:w-[118px] lg:h-[30.7px] object-cover" 
        src="/logo/logo.png" 
        alt="Yellow Book Logo" 
      />
      
      <div class="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        
        <div class="flex flex-col items-start gap-5">
          <div class="text-base font-semibold leading-relaxed capitalize">category</div>
          <div class="flex flex-col items-start gap-4 text-gray-500">
            <div class="leading-relaxed capitalize font-medium cursor-pointer hover:text-gray-900 transition-colors">Travel Agencies</div>
            <div class="leading-relaxed capitalize font-medium cursor-pointer hover:text-gray-900 transition-colors">Horseback Trekking</div>
            <div class="leading-relaxed capitalize font-medium cursor-pointer hover:text-gray-900 transition-colors">Cultural Tours</div>
            <div class="leading-relaxed capitalize font-medium cursor-pointer hover:text-gray-900 transition-colors">Seasonal Packages</div>
            <div class="leading-relaxed capitalize font-medium cursor-pointer hover:text-gray-900 transition-colors">Hotels & Camps</div>
          </div>
        </div>

        <div class="flex flex-col items-start gap-5">
          <div class="text-base font-semibold leading-relaxed capitalize">For Agencies</div>
          <div class="flex flex-col items-start gap-4 text-gray-500">
            <div class="leading-relaxed capitalize font-medium cursor-pointer hover:text-gray-900 transition-colors">Register Your Company</div>
            <div class="leading-relaxed capitalize font-medium cursor-pointer hover:text-gray-900 transition-colors">How It Works</div>
            <div class="leading-relaxed capitalize font-medium cursor-pointer hover:text-gray-900 transition-colors">Agency dashboard</div>
            <div class="leading-relaxed capitalize font-medium cursor-pointer hover:text-gray-900 transition-colors">FAQs</div>
          </div>
        </div>

        <div class="flex flex-col items-start gap-5">
          <div class="text-base font-semibold leading-relaxed capitalize">Resources</div>
          <div class="flex flex-col items-start gap-4 text-gray-500">
            <div class="leading-relaxed capitalize font-medium cursor-pointer hover:text-gray-900 transition-colors">About Us</div>
            <div class="leading-relaxed capitalize font-medium cursor-pointer hover:text-gray-900 transition-colors">Contact Support</div>
            <div class="leading-relaxed capitalize font-medium cursor-pointer hover:text-gray-900 transition-colors">Blog (Coming Soon)</div>
            <div class="leading-relaxed capitalize font-medium cursor-pointer hover:text-gray-900 transition-colors">Terms & Conditions</div>
            <div class="leading-relaxed capitalize font-medium cursor-pointer hover:text-gray-900 transition-colors">Privacy Policy</div>
          </div>
        </div>

        <div class="flex flex-col items-start gap-5">
          <div class="text-base font-semibold leading-relaxed capitalize">Connect With Us</div>
          <div class="flex flex-col items-start gap-4 text-gray-500 w-full">
            
            <div class="w-full flex items-center gap-3 cursor-pointer group">
              <svg class="w-5 h-5 text-gray-500 group-hover:text-gray-900 transition-colors flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span class="leading-relaxed capitalize font-medium group-hover:text-gray-900 transition-colors whitespace-nowrap text-sm">Facebook</span>
            </div>

            <div class="w-full flex items-center gap-3 cursor-pointer group">
              <svg class="w-5 h-5 text-gray-500 group-hover:text-gray-900 transition-colors flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span class="leading-relaxed capitalize font-medium group-hover:text-gray-900 transition-colors whitespace-nowrap text-sm">Instagram</span>
            </div>

            <div class="w-full flex items-center gap-3 cursor-pointer group">
              <svg class="w-5 h-5 text-gray-500 group-hover:text-gray-900 transition-colors flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <span class="leading-relaxed capitalize font-medium group-hover:text-gray-900 transition-colors whitespace-nowrap text-sm">Twitter</span>
            </div>

            <div class="w-full flex items-center gap-3 cursor-pointer group">
              <svg class="w-5 h-5 text-gray-500 group-hover:text-gray-900 transition-colors flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span class="leading-relaxed capitalize font-medium group-hover:text-gray-900 transition-colors whitespace-nowrap text-sm">support@</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-px bg-gray-300"></div>

    <div class="w-full text-center leading-relaxed capitalize font-medium text-gray-700">
      Copyright © 2025 Yellow Book
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>