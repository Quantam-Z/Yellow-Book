<template>
  <div class="category-section w-full relative flex flex-col items-center gap-8 text-center text-[#212121]  px-4 sm:px-6 md:px-10 lg:px-20 z-0 mt-7">
    <div class="text-2xl sm:text-3xl lg:text-[30px] leading-[126%] capitalize font-semibold">
      Category's
    </div>

    <div class="w-full max-w-6xl">
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-[#757575]">
        
        <div 
  v-for="category in categories"
  :key="category.name"
  @click="goToCategory(category.name)"
  class="
    w-full 
    relative 
    rounded-xl 
    hover:border-[#fcc207] active:border-[#fcc207] focus:border-[#fcc207]
    hover:shadow-lg active:shadow-lg focus:shadow-lg
    hover:scale-[1.02] active:scale-[1.02] focus:scale-[1.02] 
    transition-all 
    duration-300
    h-[150px] sm:h-[180px] lg:h-[200px] 
    flex flex-col items-center justify-center 
    p-3 sm:p-5 md:p-6 
    gap-2 sm:gap-3 
    cursor-pointer
    border-[1px] border-solid border-[#DCDCDC]
  "
>
  <component 
    :is="category.icon" 
    class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black transition-colors"
  />
  
  <div class="text-sm sm:text-base md:text-xl leading-[130%] capitalize font-medium text-[#212121]">
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
  const normalized = categoryName?.toLowerCase().trim()
  if (!normalized) return

  if (normalized === 'more') {
    router.push('/catagory')
    return
  }

  router.push({ path: '/catagory', query: { name: categoryName } })
}
</script>

<style scoped>
.category-section {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>