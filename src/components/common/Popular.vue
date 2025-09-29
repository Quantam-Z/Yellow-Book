<template>
  <div class="w-full max-w-[1200px] mx-auto mt-[60px] relative flex flex-col items-center gap-[44px] text-center text-[30px] text-[#212121] font-['Plus_Jakarta_Sans'] px-5 box-border">
    <div class="self-stretch leading-[126%] capitalize font-semibold">Popular listings</div>

    <div class="w-full flex flex-wrap justify-center items-stretch gap-6 text-[20px] text-black">
      <!-- Card 1 -->
      <div class="flex-1 basis-[300px] max-w-[384px] rounded-[16px] overflow-hidden flex flex-col items-start bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-transform duration-200 hover:-translate-y-[6px]">
        <img class="self-stretch max-w-full h-[288px] object-cover" src="/logo/p1.png" alt="listing" />
        <div class="w-full bg-white flex flex-col flex-grow items-end justify-center p-4 box-border">
          <div class="flex-1 flex flex-col items-start gap-6">
            <div class="w-full flex flex-col items-start gap-5">
              <div class="w-full flex flex-col items-start gap-4">
                <div class="w-full leading-[122%] capitalize font-semibold inline-block">Revolutionizing Technology</div>
                <div class="w-full text-[16px] leading-[130%] capitalize text-[#757575] text-left">Innovative technology solutions for modern businesses</div>
              </div>
              <div class="flex items-center gap-1">
                <Star v-for="i in 5" :key="i" class="w-[22px] h-[22px] text-[#f5c518]" />
              </div>
            </div>
            <div class="flex items-center gap-[6px] text-left text-[16px] text-[#757575]">
              <MapPin class="w-5 h-5 text-[#007bff]" />
              <div class="leading-[160%] capitalize font-medium">Ulaanbaatar, Mongolia</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="flex-1 basis-[300px] max-w-[384px] rounded-[16px] overflow-hidden flex flex-col items-start bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-transform duration-200 hover:-translate-y-[6px]">
        <img class="self-stretch max-w-full h-[288px] object-cover" src="/logo/p2.png" alt="listing" />
        <div class="w-full bg-white flex flex-col flex-grow items-end justify-center p-4 box-border">
          <div class="flex-1 flex flex-col items-start gap-6">
            <div class="w-full flex flex-col items-start gap-5">
              <div class="w-full flex flex-col items-start gap-4">
                <div class="w-full leading-[122%] capitalize font-semibold inline-block">Creative Agency</div>
                <div class="w-full text-[16px] leading-[130%] capitalize text-[#757575] text-left">Building modern brands with style and vision</div>
              </div>
              <div class="flex items-center gap-1">
                <Star v-for="i in 4" :key="i" class="w-[22px] h-[22px] text-[#f5c518]" />
              </div>
            </div>
            <div class="flex items-center gap-[6px] text-left text-[16px] text-[#757575]">
              <MapPin class="w-5 h-5 text-[#007bff]" />
              <div class="leading-[160%] capitalize font-medium">Tokyo, Japan</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="flex-1 basis-[300px] max-w-[384px] rounded-[16px] overflow-hidden flex flex-col items-start bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-transform duration-200 hover:-translate-y-[6px]">
        <img class="self-stretch max-w-full h-[288px] object-cover" src="/logo/p3.png" alt="listing" />
        <div class="w-full bg-white flex flex-col flex-grow items-end justify-center p-4 box-border">
          <div class="flex-1 flex flex-col items-start gap-6">
            <div class="w-full flex flex-col items-start gap-5">
              <div class="w-full flex flex-col items-start gap-4">
                <div class="w-full leading-[122%] capitalize font-semibold inline-block">Food & Beverage</div>
                <div class="w-full text-[16px] leading-[130%] capitalize text-[#757575] text-left">Fresh, organic, and delicious products</div>
              </div>
              <div class="flex items-center gap-1">
                <Star v-for="i in 5" :key="i" class="w-[22px] h-[22px] text-[#f5c518]" />
              </div>
            </div>
            <div class="flex items-center gap-[6px] text-left text-[16px] text-[#757575]">
              <MapPin class="w-5 h-5 text-[#007bff]" />
              <div class="leading-[160%] capitalize font-medium">Berlin, Germany</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star, MapPin } from 'lucide-vue-next';
</script>

<style>
/* Responsive */
@media (max-width: 768px) {
  .w-full\.flex\.flex-wrap\.justify-center\.items-stretch\.gap-6 {
    flex-direction: column;
    align-items: center;
  }
  .flex-1\.basis-\[300px\]\.max-w-\[384px\] {
    width: 100%;
    max-width: 384px;
    margin: 0 auto;
  }
}
</style>