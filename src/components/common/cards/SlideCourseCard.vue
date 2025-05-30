<template>
    <div>
      <nuxt-link :to="linkTo(item)">
        <div class="card_bg w-[280px] md:w-[340px] lg:w-[400px]">
          <div class="w-full h-[212px]">
            <img class="w-full h-full rounded-lg" :src="item.image?.link" alt="" />
          </div>
          <div class="p-3 px-4">
            <div class="h-[70px] my-3">
              <p class="title py-2 text-[18px] ">{{ item.title }}</p>
            </div>
            <div class="flex justify-between items-center">
              <p class="text-[20px] font-bold  text-[#525FE1]">৳ {{ item?.price?.amount }}</p>
              <p class="text-[16px] text-[#6F6B80] "><Icon class="text-[16px]" name="material-symbols:account-circle"/> 458 students</p>
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
  const linkTo = (item) => {
    if (
      item?.subscription_status?.status === "active" ||
      item?.subscription_status?.status === "expiring-soon"
    ) {
      return `/my-courses/${item.slug}`;
    } else if (
      item?.subscription_status?.status === "expired" &&
      item.subscription_status?.payment_type === "subscription"
    ) {
      return `/courses/${item.slug}/checkout`;
    } else if (
      item?.subscription_status?.status === "expired" &&
      item.subscription_status?.payment_type === "partial"
    ) {
      return `/expire/${item.slug}`;
    } else {
      return `/courses/${item.slug}`;
    }
  };
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
      color: #525FE1;
    }
  }
  </style>
  