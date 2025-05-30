<template>
  <div>
    <nuxt-link :to="`/blogs/${item.slug}`">
      <div
        class="w-[350px] md:w-[800px] lg:w-[1000px] xl:w-[1250px] bg-[#FFFFFF] rounded-[30px] p-8"
      >
        <div class="md:flex justify-between">
          <div class="rounded-[15px] md:w-[50%]">
            <img
              class="w-full rounded-[15px]"
              :src="
                item.image?.link ? item?.image?.link : '/images/noimage.jpeg'
              "
            />
          </div>
          <div class="px-4 title md:py-0 pt-2 md:w-[70%] text-left">
            <p class="block md:hidden text-[20px]">
              {{ truncate(item.title, 50) }}
            </p>
            <p class="hidden md:block text-[20px] md:text-[30px]">
              {{ item.title }}
            </p>
            <p class="text-[12px] md:text-[20px]">{{ item.subtitle }}</p>
            <div
              class="flex justify-between md:gap-x-8 items-end mt-2 md:mt-8 pl-0 md:pl-4"
            >
              <div
                v-if="item.author_name && item.author_image"
                class="flex items-center"
              >
                <div class="w-[39px] h-[39px] rounded-full bg-red-300">
                  <img
                    class="rounded-full"
                    :src="
                      item.author_image
                        ? item.author_image
                        : '/images/noimage.jpeg'
                    "
                  />
                </div>
                <div class="pl-2">
                  <p class="text-[12px] text-[#0072BB]">Author</p>
                  <p>{{ item.author_name }}</p>
                </div>
              </div>
              <div v-else></div>
              <div
                class="flex px-2 md:px-4 py-1 text-[#0072BB] bg-white rounded-[8px] border border-[#8FD2FD]"
              >
                <span class="py-1"
                  ><img src="/images/icon/calendar.svg"
                /></span>
                <span class="px-1">
                  {{ moment(item.created_at).format("ll") }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup>
import moment from "moment";
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});
</script>

<style lang="scss" scoped>
.star {
  color: #0072bb;
  font-size: 20px;
}
</style>
