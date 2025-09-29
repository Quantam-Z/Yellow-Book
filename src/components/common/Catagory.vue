<script setup lang="ts">
import { PawPrint, Sparkles, Utensils, Plane, Laptop, MoreHorizontal } from 'lucide-vue-next'
</script>

<template>
  <div class="w-full relative flex flex-col items-center gap-8 text-center text-[30px] text-[#212121] p-10 font-['Plus_Jakarta_Sans']">
    <div class="self-stretch relative leading-[126%] capitalize font-semibold">Category's</div>
    <div class="self-stretch flex flex-col items-start gap-6 text-[20px] text-[#757575]">
      <div class="self-stretch flex items-center gap-6">
        <div class="flex-1 w-full relative rounded-lg border-gainsboro border-solid border-[1px] box-border h-[200px] flex flex-col items-center justify-center p-5 gap-[22px] text-center text-xl text-gray font-plus-jakarta-sans">
          <PawPrint class="w-[52px] h-[52px] text-black" />
          <div class="self-stretch relative leading-[130%] capitalize font-medium">Animals & Pets</div>
        </div>
        <div class="flex-1 w-full relative rounded-lg border-gainsboro border-solid border-[1px] box-border h-[200px] flex flex-col items-center justify-center p-5 gap-[22px] text-center text-xl text-gray font-plus-jakarta-sans">
          <Sparkles class="w-[52px] h-[52px] text-black" />
          <div class="self-stretch relative leading-[130%] capitalize font-medium">Beauty & Well-beings</div>
        </div>
        <div class="flex-1 w-full relative rounded-lg border-gainsboro border-solid border-[1px] box-border h-[200px] flex flex-col items-center justify-center p-5 gap-[22px] text-center text-xl text-gray font-plus-jakarta-sans">
          <Utensils class="w-[52px] h-[52px] text-black" />
          <div class="self-stretch relative leading-[130%] capitalize font-medium">Food & Beverage</div>
        </div>
      </div>

      <div class="self-stretch flex items-center gap-6 text-[#212121]">
        <div class="flex-1 w-full relative rounded-lg border-gainsboro border-solid border-[1px] box-border h-[200px] flex flex-col items-center justify-center p-5 gap-[22px] text-center text-xl text-gray font-plus-jakarta-sans">
          <Plane class="w-[52px] h-[52px] text-black" />
          <div class="self-stretch relative leading-[130%] capitalize font-medium">Tourism & Hospitality</div>
        </div>
        <div class="flex-1 w-full relative rounded-lg border-gainsboro border-solid border-[1px] box-border h-[200px] flex flex-col items-center justify-center p-5 gap-[22px] text-center text-xl text-gray font-plus-jakarta-sans">
          <Laptop class="w-[52px] h-[52px] text-black" />
          <div class="self-stretch relative leading-[130%] capitalize font-medium">IT & Software</div>
        </div>
        <div class="flex-1 w-full relative rounded-lg border-gainsboro border-solid border-[1px] box-border h-[200px] flex flex-col items-center justify-center p-5 gap-[22px] text-center text-xl text-gray font-plus-jakarta-sans">
          <MoreHorizontal class="w-[52px] h-[52px] text-black" />
          <div class="self-stretch relative leading-[130%] capitalize font-medium">More</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Responsive Media Queries */
@media (max-width: 1200px) {
  .self-stretch\.flex\.items-center\.gap-6 {
    gap: 20px;
  }
  .flex-1\.rounded-\[8px\]\.border\.border-\[#e0e0e0\]\.box-border\.h-\[200px\] {
    height: 180px;
    padding: 18px;
    gap: 20px;
  }
}

@media (max-width: 992px) {
  .w-full\.relative\.flex\.flex-col\.items-center\.gap-8 {
    gap: 28px;
    font-size: 28px;
  }
  .self-stretch\.flex\.flex-col\.items-start\.gap-6 {
    gap: 20px;
    font-size: 18px;
  }
  .self-stretch\.flex\.items-center\.gap-6 {
    gap: 16px;
  }
  .flex-1\.rounded-\[8px\]\.border\.border-\[#e0e0e0\]\.box-border\.h-\[200px\] {
    height: 160px;
    padding: 16px;
    gap: 18px;
  }
  .w-\[52px\]\.h-\[52px\] {
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 768px) {
  .w-full\.relative\.flex\.flex-col\.items-center\.gap-8 {
    gap: 24px;
    font-size: 24px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .self-stretch\.flex\.flex-col\.items-start\.gap-6 {
    gap: 16px;
  }
  .self-stretch\.flex\.items-center\.gap-6 {
    flex-direction: column;
    gap: 16px;
  }
  .flex-1\.rounded-\[8px\]\.border\.border-\[#e0e0e0\]\.box-border\.h-\[200px\] {
    width: 100%;
    height: 140px;
    padding: 16px;
    gap: 16px;
  }
  .w-\[52px\]\.h-\[52px\] {
    width: 44px;
    height: 44px;
  }
}

@media (max-width: 576px) {
  .w-full\.relative\.flex\.flex-col\.items-center\.gap-8 {
    gap: 20px;
    font-size: 22px;
    padding: 0 15px;
  }
  .self-stretch\.flex\.flex-col\.items-start\.gap-6 {
    font-size: 16px;
  }
  .self-stretch\.flex\.items-center\.gap-6 {
    gap: 12px;
  }
  .flex-1\.rounded-\[8px\]\.border\.border-\[#e0e0e0\]\.box-border\.h-\[200px\] {
    height: 120px;
    padding: 14px;
    gap: 14px;
  }
  .w-\[52px\]\.h-\[52px\] {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .w-full\.relative\.flex\.flex-col\.items-center\.gap-8 {
    gap: 18px;
    font-size: 20px;
    padding: 0 10px;
  }
  .self-stretch\.flex\.flex-col\.items-start\.gap-6 {
    font-size: 15px;
  }
  .flex-1\.rounded-\[8px\]\.border\.border-\[#e0e0e0\]\.box-border\.h-\[200px\] {
    height: 110px;
    padding: 12px;
    gap: 12px;
  }
  .w-\[52px\]\.h-\[52px\] {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 360px) {
  .w-full\.relative\.flex\.flex-col\.items-center\.gap-8 {
    font-size: 18px;
  }
  .self-stretch\.flex\.flex-col\.items-start\.gap-6 {
    font-size: 14px;
  }
  .flex-1\.rounded-\[8px\]\.border\.border-\[#e0e0e0\]\.box-border\.h-\[200px\] {
    height: 100px;
    padding: 10px;
    gap: 10px;
  }
  .w-\[52px\]\.h-\[52px\] {
    width: 32px;
    height: 32px;
  }
}
</style>