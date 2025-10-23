<template>
  <div class="w-full bg-gradient-to-br from-gray-50 to-white relative flex flex-col items-start pt-20 lg:pt-28 px-6 sm:px-8 lg:px-32 pb-12 gap-12 lg:gap-16 text-left text-base text-gray-900 font-plus-jakarta-sans shadow-2xl">
    
    <div class="w-full h-1 bg-gradient-to-r from-primary-200 to-primary-300 absolute top-0 left-0 rounded-full"></div>
    
    <div class="w-full flex flex-col items-start gap-16 lg:gap-20">
      <div class="w-full flex flex-col items-center lg:items-start gap-8">
        <img 
          class="w-40 h-10 lg:w-48 lg:h-12 object-contain hover:scale-105 transition-transform duration-300" 
          src="/logo/logo.png" 
          alt="Yellow Book Logo" 
        />
        <p class="text-lg text-gray-600 max-w-2xl text-center lg:text-left leading-relaxed">
          Your trusted directory for discovering and connecting with verified businesses across various categories. 
          Find the perfect service provider for your needs.
        </p>
      </div>
      
      <div class="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
        
        <div class="flex flex-col items-start gap-6">
          <div class="text-xl font-bold leading-relaxed capitalize text-[#212121]">Categories</div>
          <div class="flex flex-col items-start gap-5 text-gray-600">
            <div class="leading-relaxed capitalize font-semibold cursor-pointer hover:text-primary-200 transition-colors duration-300 text-lg">Travel Agencies</div>
            <div class="leading-relaxed capitalize font-semibold cursor-pointer hover:text-primary-200 transition-colors duration-300 text-lg">Horseback Trekking</div>
            <div class="leading-relaxed capitalize font-semibold cursor-pointer hover:text-primary-200 transition-colors duration-300 text-lg">Cultural Tours</div>
            <div class="leading-relaxed capitalize font-semibold cursor-pointer hover:text-primary-200 transition-colors duration-300 text-lg">Seasonal Packages</div>
            <div class="leading-relaxed capitalize font-semibold cursor-pointer hover:text-primary-200 transition-colors duration-300 text-lg">Hotels & Camps</div>
          </div>
        </div>

        <div class="flex flex-col items-start gap-6">
          <div class="text-xl font-bold leading-relaxed capitalize text-[#212121]">For Agencies</div>
          <div class="flex flex-col items-start gap-5 text-gray-600">
            <div class="leading-relaxed capitalize font-semibold cursor-pointer hover:text-primary-200 transition-colors duration-300 text-lg">Register Your Company</div>
            <div class="leading-relaxed capitalize font-semibold cursor-pointer hover:text-primary-200 transition-colors duration-300 text-lg">How It Works</div>
            <div class="leading-relaxed capitalize font-semibold cursor-pointer hover:text-primary-200 transition-colors duration-300 text-lg">Agency Dashboard</div>
            <div class="leading-relaxed capitalize font-semibold cursor-pointer hover:text-primary-200 transition-colors duration-300 text-lg">FAQs</div>
          </div>
        </div>

        <div class="flex flex-col items-start gap-6">
          <div class="text-xl font-bold leading-relaxed capitalize text-[#212121]">Resources</div>
          <div class="flex flex-col items-start gap-5 text-gray-600">
            <div class="leading-relaxed capitalize font-semibold cursor-pointer hover:text-primary-200 transition-colors duration-300 text-lg">About Us</div>
            <div class="leading-relaxed capitalize font-semibold cursor-pointer hover:text-primary-200 transition-colors duration-300 text-lg">Contact Support</div>
            <div class="leading-relaxed capitalize font-semibold cursor-pointer hover:text-primary-200 transition-colors duration-300 text-lg">Blog (Coming Soon)</div>
            <div class="leading-relaxed capitalize font-semibold cursor-pointer hover:text-primary-200 transition-colors duration-300 text-lg">Terms & Conditions</div>
            <div class="leading-relaxed capitalize font-semibold cursor-pointer hover:text-primary-200 transition-colors duration-300 text-lg">Privacy Policy</div>
          </div>
        </div>

        <div class="flex flex-col items-start gap-6">
          <div class="text-xl font-bold leading-relaxed capitalize text-[#212121]">Connect With Us</div>
          <div class="flex flex-col items-start gap-5 text-gray-600 w-full">
            
            <div class="w-full flex items-center gap-4 cursor-pointer group hover:scale-105 transition-all duration-300">
            <div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary-200 to-primary-300 flex items-center justify-center">
                <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span class="leading-relaxed capitalize font-semibold group-hover:text-primary-200 transition-colors duration-300 whitespace-nowrap text-lg">Facebook</span>
            </div>

            <div class="w-full flex items-center gap-4 cursor-pointer group hover:scale-105 transition-all duration-300">
            <div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary-200 to-primary-300 flex items-center justify-center">
                <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span class="leading-relaxed capitalize font-semibold group-hover:text-primary-200 transition-colors duration-300 whitespace-nowrap text-lg">Instagram</span>
            </div>

            <div class="w-full flex items-center gap-4 cursor-pointer group hover:scale-105 transition-all duration-300">
            <div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary-200 to-primary-300 flex items-center justify-center">
                <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
              <span class="leading-relaxed capitalize font-semibold group-hover:text-primary-200 transition-colors duration-300 whitespace-nowrap text-lg">Twitter</span>
            </div>

            <div class="w-full flex items-center gap-4 cursor-pointer group hover:scale-105 transition-all duration-300">
            <div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary-200 to-primary-300 flex items-center justify-center">
                <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <span class="leading-relaxed capitalize font-semibold group-hover:text-primary-200 transition-colors duration-300 whitespace-nowrap text-lg">support@yellowbook.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-1 bg-gradient-to-r from-primary-200 to-primary-300 rounded-full"></div>

    <div class="w-full text-center leading-relaxed capitalize font-semibold text-gray-700 text-lg">
      Copyright © 2025 Yellow Book. All rights reserved.
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