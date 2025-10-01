<script setup lang="ts">
import { PawPrint, Sparkles, Utensils, Plane, Laptop, MoreHorizontal } from 'lucide-vue-next'

// Define the categories data structure
const categories = [
    { name: 'Animals & Pets', icon: PawPrint, color: 'text-black' },
    { name: 'Beauty & Well-beings', icon: Sparkles, color: 'text-black' },
    { name: 'Food & Beverage', icon: Utensils, color: 'text-black' },
    { name: 'Tourism & Hospitality', icon: Plane, color: 'text-black' },
    { name: 'IT & Software', icon: Laptop, color: 'text-black' },
    { name: 'More', icon: MoreHorizontal, color: 'text-black' },
]
</script>

<template>
  <div class="category-section w-full relative flex flex-col items-center gap-8 text-center text-[#212121] py-10 px-4 sm:px-6 md:px-10 lg:px-20">
    <div class="text-2xl sm:text-3xl lg:text-[30px] leading-[126%] capitalize font-semibold">
      Category's
    </div>

    <div class="w-full max-w-6xl">
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-[#757575]">
        
        <div 
            v-for="category in categories"
            :key="category.name"
            class="
                w-full 
                relative 
                rounded-xl 
                
                hover:border-[#fcc207] 
                hover:shadow-lg 
                hover:scale-[1.02] 
                transition-all 
                duration-300
                aspect-square 
                flex flex-col items-center justify-center 
                p-4 sm:p-6 md:p-8 
                gap-4 sm:gap-6 
                cursor-pointer
            "
            style="border: 1px solid #333333;"
        >
          <component 
              :is="category.icon" 
              class="w-10 h-10 sm:w-12 sm:h-12 md:w-[52px] md:h-[52px] text-black transition-colors"
          />
          
          <div class="text-sm sm:text-base md:text-xl leading-[130%] capitalize font-medium text-[#212121]">
              {{ category.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Style Module for component-specific styles. */
.category-section {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>