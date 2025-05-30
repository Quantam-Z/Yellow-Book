<template>
    <div class="w-full lg:w-1/2 rounded-2xl p-8 shadow-2xl transition-all duration-500 group bg-white/5 rounded-xl backdrop-blur-lg border border-[#eee]"
        :class="categoryCardClasses" :style="{ '--shadow-color': shadowColor }">
        <!-- Category Header -->
        <div class="bg-white rounded-full px-5 py-2  flex items-center space-x-3 w-max shadow-md mx-auto"
            :class="headerClasses">
            <div class="p-1 rounded-full" :class="iconBgClasses">
                <img :src="icon" :alt="category.label + ' icon'" class="h-6 w-6">
            </div>
            <span class="text-[14px] md:text-base font-[400] tracking-wide" :class="headerTextClasses">
                {{ category.label }}
            </span>
           
        </div>
        <div class="my-6 md:my-8">
          <p class="text-[20px] md:text-2xl text-white text-center">{{ subtitle }}</p>
        </div>
        <!-- Subcategories -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3  ">
            <template v-if="category.children?.length">
                <NuxtLink v-for="(item, index) in category.children" :key="index"
                    :to="`/course-by-category/${item.slug}?title=${item.label}`"
                    class="w-auto  px-4 py-3 rounded-lg bg-white/10 text-white text-xs md:text-lg font-medium text-center transition-all duration-300 border border-[#eee] hover:bg-white/20 hover:border-white/40 hover:scale-105 cursor-pointer">
                    {{ item.label }}
                </NuxtLink>
            </template>
            <template v-else>
                <div class="w-full p-6 text-center bg-white/5 rounded-lg border border-dashed border-white/20">
                    <p class="text-white/80 mb-2">No subcategories available yet</p>
                </div>
            </template>
        </div>

    </div>
</template>
  
  <script setup>
  const props = defineProps({
    category: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: value => ['live', 'recorded'].includes(value)
    },
    icon: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  })
  
  // Dynamic classes based on type
  const categoryCardClasses = computed(() => ({
    'bg-gradient-to-br from-[#0B0A2F] to-[#1A1475] hover:shadow-[0_20px_50px_var(--shadow-color)]': props.type === 'live',
    'bg-gradient-to-br from-[#0B0A2F] to-[#0E7490] hover:shadow-[0_20px_50px_var(--shadow-color)]': props.type === 'recorded'
  }))
  
  const shadowColor = computed(() => 
    props.type === 'live' ? 'rgba(74, 68, 201, 0.3)' : 'rgba(6, 182, 212, 0.3)'
  )
  
  const headerClasses = computed(() => ({
    'bg-white': true
  }))
  
  const headerTextClasses = computed(() => ({
    'text-[#1A1475]': props.type === 'live',
    'text-[#0E7490]': props.type === 'recorded'
  }))
  
  const iconBgClasses = computed(() => ({
    'bg-[#1A1475]/10': props.type === 'live',
    'bg-[#0E7490]/10': props.type === 'recorded'
  }))
  
  const buttonClasses = computed(() => ({
    'bg-[#150E72] text-white': props.type === 'live',
    'bg-[#0E7490] text-white': props.type === 'recorded'
  }))
  
  const buttonHoverClasses = computed(() => ({
    'hover:bg-[#4944C9]': props.type === 'live',
    'hover:bg-[#06B6D4]': props.type === 'recorded'
  }))
  </script>