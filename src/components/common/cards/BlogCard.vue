<template>
  <div>
    <nuxt-link :to="`/blogs/${item.slug}`">
      <div
          class=""
          :class="`bg-[#ffffff] ${
          cardType == 'normal'
            ? 'w-[280px] md:w-[340px] lg:w-[380px] xl:w-[400px]'
            : 'w-[290px] md:w-[390px] '
        }  rounded-lg shadow-xl hover:hover:shadow-red-300 hover:transition-all`"
      >
        <div class="p-4 h-[212px] md:h-[220px]">
          <!--           <img
                      class="rounded-t-2xl w-full h-full"
                      :src="item.image?.link ? item.image?.link : '/images/no_image.jpg'"
                    /> -->
          <img class=" w-full h-full"
                    :src="item.image?.link ? item.image?.link : '/images/no_image.jpg'"  loading="lazy" preload  />
        </div>
        <div class="px-4 pb-2 md:pb-1">
          <div v-if="item.author_name">
            <p class="text-[16px] font-[400]  pr-4">{{ item.author_name }}<span class="pl-2 border_left  text-[#007acc] text-[16px] font-[400] ">{{ moment(item.created_at).format("ll") }}</span></p>
          </div>
          <div class="h-[60px] md:h-[80px] pt-2 overflow-clip">
            <p
                class="blog_title text-[14px] font-[600]  md:text-[20px] hoverClass"
            >
              {{ item.title }}
            </p>
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
  cardType: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.set_border {
  border: 1px solid #8cd3ff96;
}
.border_left {
  border-left: 2px solid #007acc;
  margin-left: 20px;
}
.hoverable {
  overflow: hidden;
}

.hoverable:hover {
  box-shadow: 3px 3px 0px 2px #007acc;
  -webkit-box-shadow: 3px 3px 0px 2px #007acc;
  -moz-box-shadow: 3px 3px 0px 2px #007acc;
  transition: 0.5s;

  img {
    transform: scale(1.1);
    transition: 0.7s;
  }

  .title {
    color: #0072bb;
  }
}
.blog_title {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.hoverClass{
  transition: all ease-in-out 0.5s;
  &:hover {
    color: #007acc;
    //padding-left: 5px;

  }
}
</style>
