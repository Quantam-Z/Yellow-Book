<template>
    <div>
      <nuxt-link to="/">
        <div class="card_bg w-[250px] md:w-[240px] lg:w-[300px]">
          <div class="w-full p-4 h-[212px]">
            <img class="w-full h-full rounded-lg" :src="item.image?.link" alt="" />
          </div>
          <div class="p-3 px-4">
            <div class="h-20 pt-2 overflow-hidden">
              <p class="py-2 text-[20px]">{{ item.title }}</p>
            </div>
            <div class="flex justify-between items-center">
              <p class="text-[#7A86FC] text-[16px]">Chemistry</p>
              <p class="text-[24px] font-bold text-[#525FE1]">৳ 120.00</p>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    item: { type: Object, default: () => {} },
    myCourse: { type: Boolean, default: false },
  });
  </script>
  
  <style lang="scss" scoped>
  .card_bg {
    background-color: white;
    box-shadow: 5px 5px 5px 0px #6aac9d;
    border-radius: 10px;
  }
  .set_border {
    border: 1px solid #8cd3ff96;
  }
  
  .card_bg {
    overflow: hidden;
  }
  
  .card_bg:hover {
    box-shadow: 3px 3px 0px 2px #6cad9c;
    transition: 0.5s;
  
    img {
      transform: scale(1.1);
      transition: 0.7s;
    }
  
    .title {
      color: #0072bb;
    }
  }
  </style>
  