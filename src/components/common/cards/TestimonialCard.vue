<template>
  <div>
    <div class="">
      <!-- <div class="profile-img">
          <img class="w-[100px] h-[100px] rounded-[50%]"
              :src="item?.image ? item.image.link : '/images/books/book.png'" alt="" />
      </div> -->
      <div
        class="h-auto lg:h-[420px] text-center bg-[#ffffff] border-dashed border-2 border-gray-300 col-span-1 flex flex-col justify-between"
      >
        <div>
          <div class="flex justify-center py-2">
            <img
              class="w-[100px] h-[100px] rounded-[50%]"
              :src="
                item.image?.link ? item?.image?.link : '/images/no_image.jpg'
              "
              alt=""
            />
          </div>
        </div>
        <div>
          <div v-if="item.name">
            <p
              class="text-[18px] md:text-[24px] font-[600]  text-[#3B3B3B]"
            >
              {{ truncate(item.name, 30) }}
            </p>
          </div>
        </div>
        <div>
          <div v-if="item.designation">
            <p
              class="text-[12px] md:text-[20px] font-[400] text-[#565656]"
            >
              {{ item.designation }}
            </p>
          </div>
        </div>
        <div>
          <div v-if="item.description" class="text-left px-4 mt-1 mb-4">
            <div class="flex justify-start">
              <img class="h-[14px] md:h-[20px]" src="/up.png" />
            </div>
            <div class="relative">
              <p
                class="text-[12px] md:text-[18px] font-[400] font-['Li_Ador_Noirrit'] text-[#3B3B3B] h-auto text-center overflow-clip"
              >
                {{ truncate(item.description, 200) }}
              </p>
            </div>
            <div class="flex justify-end">
              <img class="h-[14px] md:h-[20px]" src="/down.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
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
.star {
  color: #f4bd15;
  // font-size: 36px !important;
}

.min-height {
  overflow: hidden;
}

.profile-img {
  // position: absolute;
  height: 100px;
  width: 100px;
  // top: -50px;
  // left: 50%;
  transform: translateX(-50px);
  z-index: 2;
  // background: linear-gradient(0deg, #D9D9D9, #D9D9D9);
  // background: linear-gradient(180deg, rgba(157, 50, 146, 0.12) 0%, rgba(157, 50, 146, 0.06) 70.31%, rgba(157, 50, 146, 0) 100%);
  padding: 6px;
  border-radius: 50% !important;

  img {
    height: 100%;
    width: 100%;

    border-radius: 50%;
  }
}
</style>
