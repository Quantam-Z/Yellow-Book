<script setup lang="ts">
import { Star, MapPin } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

// Define the data structure for the popular listings
const popularListings = [
    {
        title: "Revolutionizing Technology",
        description: "Innovative technology solutions for modern businesses",
        image: "/logo/p1.png",
        rating: 5,
        location: "Ulaanbaatar, Mongolia"
    },
    {
        title: "Creative Agency",
        description: "Building modern brands with style and vision",
        image: "/logo/p2.png",
        rating: 4,
        location: "Tokyo, Japan"
    },
    {
        title: "Food & Beverage",
        description: "Fresh, organic, and delicious products",
        image: "/logo/p3.png",
        rating: 5,
        location: "Berlin, Germany"
    },
];

// Helper function to generate an array for rating stars
const getStars = (rating: number) => Array(rating).fill(0);

const router = useRouter();
const goToAgency = () => {
    router.push('/agency'); // navigate to src/pages/agency.vue
};
</script>

<template>
  <div class="w-full max-w-[1200px] mx-auto mt-[60px] relative flex flex-col items-center gap-[44px] text-center text-[30px] text-[#212121] font-['Plus_Jakarta_Sans'] px-5 box-border">
    <div class="self-stretch leading-[126%] capitalize font-semibold">Popular listings</div>

    <div class="w-full flex flex-wrap justify-center items-stretch gap-6 text-[20px] text-black">
      <div 
          v-for="(listing, index) in popularListings"
          :key="index"
          class="flex-1 basis-[300px] max-w-full sm:max-w-[384px] rounded-[16px] overflow-hidden flex flex-col items-start bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-transform duration-200 hover:-translate-y-[6px] cursor-pointer"
          @click="goToAgency"
      >
        <img class="self-stretch max-w-full h-[288px] object-cover" :src="listing.image" :alt="listing.title" />
        
        <div class="w-full bg-white flex flex-col flex-grow items-start justify-center p-4 box-border text-left">
          <div class="flex-1 flex flex-col items-start gap-6 w-full">
            <div class="w-full flex flex-col items-start gap-5">
              <div class="w-full flex flex-col items-start gap-4">
                <div class="w-full leading-[122%] capitalize font-semibold text-xl inline-block">{{ listing.title }}</div>
                <div class="w-full text-[16px] leading-[130%] capitalize text-[#757575]">{{ listing.description }}</div>
              </div>
              <div class="flex items-center gap-1">
                <Star v-for="i in getStars(listing.rating).length" :key="i" class="w-[22px] h-[22px] text-[#f5c518] fill-[#f5c518]" />
              </div>
            </div>
            <div class="flex items-center gap-[6px] text-[16px] text-[#757575]">
              <MapPin class="w-5 h-5 text-[#007bff]" />
              <div class="leading-[160%] capitalize font-medium">{{ listing.location }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
