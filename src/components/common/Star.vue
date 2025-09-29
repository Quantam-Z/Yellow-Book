<template>
      <div class="w-full relative bg-[#fcc207] flex items-center justify-start lg:justify-center px-4 lg:px-32 md:px-20 gap-6 text-left text-white font-['Plus_Jakarta_Sans'] mt-12">
          <div class="flex items-center p-10 sm:p-6 gap-4 bg-[#e5b106] min-w-[280px] flex-grow flex-shrink-0">
              <img class="w-16 h-auto flex-shrink-0" src="/Frame(7).svg" alt="Agency Icon" />
              <div class="flex flex-col justify-center gap-3 flex-1">
                  <b class="text-5xl font-bold leading-none capitalize sm:text-4xl xs:text-3xl">1548</b>
                  <div class="text-base font-semibold leading-normal capitalize">Verified agencies</div>
              </div>
          </div>
          
          <div class="flex items-center p-10 sm:p-6 gap-4 bg-[#e5b106] min-w-[280px] flex-grow flex-shrink-0">
              <img class="w-16 h-auto flex-shrink-0" src="/Frame(8).svg" alt="Users Icon" />
              <div class="flex flex-col justify-center gap-3 flex-1">
                  <b class="text-5xl font-bold leading-none capitalize sm:text-4xl xs:text-3xl">5000+</b>
                  <div class="text-base font-semibold leading-normal capitalize">users</div>
              </div>
          </div>
          
          <div class="flex items-center p-10 sm:p-6 gap-4 bg-[#e5b106] min-w-[280px] flex-grow flex-shrink-0">
              <img class="w-16 h-auto flex-shrink-0" src="/Frame(9).svg" alt="Reviews Icon" />
              <div class="flex flex-col justify-center gap-3 flex-1">
                  <b class="text-5xl font-bold leading-none capitalize sm:text-4xl xs:text-3xl">25k+</b>
                  <div class="text-base font-semibold leading-normal capitalize">Reviews</div>
              </div>
          </div>
          
          <!-- Stat Card 4: Category (Identical sizing logic) -->
          <div class="flex items-center p-10 sm:p-6 gap-4 bg-[#e5b106] min-w-[280px] flex-grow flex-shrink-0">
              <img class="w-16 h-auto flex-shrink-0" src="/Frame(10).svg" alt="Category Icon" />
              <div class="flex flex-col justify-center gap-3 flex-1">
                  <b class="text-5xl font-bold leading-none capitalize sm:text-4xl xs:text-3xl">145+</b>
                  <div class="text-base font-semibold leading-normal capitalize">category</div>
              </div>
          </div>
      </div>
  </template>
  
  <script setup>
  // If this were a full Vue component, the <script setup> block would be here.
  // Since there's no logic, it remains minimal.
  </script>
  <style>
  /* Defining custom utilities for smaller breakpoints not directly supported by Tailwind default.
      This ensures proper scaling on extra small screens.
  */
  @media (max-width: 400px) {
      .xs\:text-3xl {
          font-size: 1.875rem; /* ~30px */
      }
  }
  </style>
  