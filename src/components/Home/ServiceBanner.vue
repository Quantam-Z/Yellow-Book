<template>
  <div class="bg-[#3b6b53] py-16">
    <div class="container mx-auto">
      <div class="md:flex justify-between items-center">
        <div class="md:flex md:flex-col justify-center py-2 px-2 order-2 md:order-1">
          <div class="md:pb-8 py-4 md:py-0">
            <p class="text-[24px] md:text-[36px] text-center md:text-left text-white font-[600]">কেন Brain Buzz - এ আস্থা রাখবে?</p>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="flex items-center p-4 md:p-6 gap-x-2 bg-white rounded-md">
              <img class="h-[30px] md:h-[50px]" src="/icon/exam.svg"/>
              <p class="text-[16px] md:text-[20px] font-[600]">ভিন্নধর্মী পরীক্ষা পদ্ধতি</p>
            </div>
            <div class="flex items-center p-4 md:p-6 gap-x-2 bg-white rounded-md">
              <img class="h-[30px] md:h-[50px]" src="/icon/curriculam.svg"/>
              <p class="text-[16px] md:text-[20px] font-[600]">নতুন কারিকুলামে পাঠ্যদান</p>
            </div>
            <div class="flex items-center p-4 md:p-6 gap-x-2 bg-white rounded-md">
              <img class="h-[30px] md:h-[50px]" src="/icon/instructor.svg"/>
              <p class="text-[16px] md:text-[20px] font-[600]">অভিজ্ঞ শিক্ষক প্যানেল</p>
            </div>
            <div class="flex items-center p-4 md:p-6 gap-x-2 bg-white rounded-md">
              <img class="h-[30px] md:h-[50px]" src="/icon/solution.svg"/>
              <p class="text-[16px] md:text-[20px] font-[600]">একাডেমিক ও এডমিশন সল্যুশন</p>
            </div>
          </div>
        </div>
        <div class="p-2 md:p-0 order-1 md:order-2">
          <img class="md:h-[350px] rounded-md" :src="items?.image?.link" alt=""></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Object,
    default: () => {},
  },
})
</script>

<style lang="scss" scoped>

</style>