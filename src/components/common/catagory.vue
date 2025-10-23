<template>
  <div class="category-section w-full relative flex flex-col items-center gap-12 text-center text-[#212121] px-4 sm:px-6 md:px-10 lg:px-20 z-0 mt-16">
    <div class="text-3xl sm:text-4xl lg:text-5xl leading-[120%] capitalize font-bold bg-gradient-to-r from-[#212121] to-[#616161] bg-clip-text text-transparent">
      Categories
    </div>

    <div class="w-full max-w-7xl">
      <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 text-[#757575]">
        
        <div 
          v-for="category in categories"
          :key="category.name"
          @click="goToCategory(category.name)"
          class="
            w-full 
            relative 
            rounded-2xl 
            hover:border-primary-200 active:border-primary-200 focus:border-primary-200
            hover:shadow-2xl active:shadow-2xl focus:shadow-2xl
            hover:scale-[1.05] active:scale-[1.02] focus:scale-[1.05] 
            transition-all 
            duration-500
            h-[180px] sm:h-[220px] lg:h-[250px] 
            flex flex-col items-center justify-center 
            p-6 sm:p-8 md:p-10 
            gap-4 sm:gap-5 
            cursor-pointer
            border-2 border-solid border-[#DCDCDC]
            bg-gradient-to-br from-white to-[#fafafa]
            hover:bg-gradient-to-br hover:from-[#fff9e6] hover:to-[#feecb2]
            group
          "
        >
          <div class="p-4 rounded-2xl bg-gradient-to-br from-primary-200/10 to-primary-300/10 group-hover:from-primary-200/20 group-hover:to-primary-300/20 transition-all duration-300">
            <component 
              :is="category.icon" 
              class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[#212121] group-hover:text-primary-200 transition-all duration-300"
            />
          </div>
          
          <div class="text-base sm:text-lg md:text-xl leading-[130%] capitalize font-bold text-[#212121] group-hover:text-primary-200 transition-colors duration-300">
            {{ category.name }}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { categoryService } from '@/services/categoryService'
import { PawPrint, Sparkles, Utensils, Plane, Laptop, MoreHorizontal } from 'lucide-vue-next'

const router = useRouter()

const iconMap: Record<string, any> = { PawPrint, Sparkles, Utensils, Plane, Laptop, MoreHorizontal }

const categories = computed(() => {
  return categoryService.getCategories().map(cat => ({
    ...cat,
    icon: iconMap[cat.icon] || MoreHorizontal
  }))
})

const goToCategory = (categoryName: string) => {
  router.push({ path: '/catagory', query: { name: categoryName } })
}
</script>

<style scoped>
.category-section {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>