<template>
  <div>
    <nuxt-link :to="`/e-books/${item.slug}`">
      <div class="bg-white rounded-3xl w-full h-[260px] md:h-[350px] set_border hoverable overflow-hidden">
        <div style="
                          border-top-left-radius: 10px;
                          border-top-right-radius: 10px;
                        " class="h-[150px] md:h-[60%]">
          <img class="w-full h-[100%] rounded-t-[8px]"
            :src="item.image?.link ? item?.image?.link : '/images/no_image.jpg'" alt="e-book image" />
        </div>
        <div class="text-center py-4 pb-4 px-2 h-32 md:h-32 overflow-hidden">
          <p
            class="text-[14px] md:text-[20px] text-[#2B2B2B] leading-[22px] md:leading-[28px]"
          >
            {{ item.title }}
          </p>
          <p
            v-if="item.authors && item.authors.length"
            class="text-[12px] md:text-[16px] text-[#2B2B2B] leading-[20px]"
          >
            {{ item.authors[0].name }}
          </p>
          <template
            v-if="item.price && item.price.amount && !item.subscription_status"
          >
            <div class="flex justify-center md:gap-x-4 gap-2 items-center">
              <p
                v-if="item.price.discount"
                class="text-[16px] md:text-[20px] line-through text-slate-500"
              >
                ৳{{ item.price?.amount }}
              </p>
              <p
                v-if="item.price.discount"
                class="text-[18px] md:text-[24px] text-[#0072BB]"
              >
                ৳{{ item.price.amount - item.price.discount }}
              </p>
              <p v-else class="text-[18px] md:text-[24px] text-[#0072BB]">
                ৳{{ item.price?.amount }}
              </p>
            </div>
          </template>
          <div v-if="item.subscription_status" class="text-center mt-2">
            <p><span class="bg-green-500 text-white px-2 py-1 rounded-md">Purchased</span></p>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});
</script>

<style lang="scss" scoped>
.set_border {
  border: 1px solid #8cd3ff96;
}

.hoverable {
  overflow: hidden;
}

.hoverable:hover {
  box-shadow: 3px 3px 0px 2px #8fd2fd;
  -webkit-box-shadow: 3px 3px 0px 2px #8fd2fd;
  -moz-box-shadow: 3px 3px 0px 2px #8fd2fd;
  transition: 0.8s;

  img {
    transform: scale(1.1);
    transition: 0.7s;
  }
}
</style>
