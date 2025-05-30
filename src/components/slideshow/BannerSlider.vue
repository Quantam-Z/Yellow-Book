<template>
  <swiper :scrollbar="{
        hide: true,
    }" :breakpoints="breakpoints" :slidesPerView="1" :spaceBetween="20" :grabCursor="true" :pagination="{
    clickable: true,
}" :autoplay="{
    delay: 3000,
    pauseOnMouseEnter: true,
    disableOnInteraction: false,
}" :modules="modules" class="mySwiper">
    <swiper-slide v-for="(item, i) in dataArray" :key="i">
      <a :href="item.title" target="_blank" class="mx-auto" :to="takeAction(item)">
        <img class="w-[100%] h-72 rounded-md" :src="item.image.link" alt="">
      </a>
    </swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "../../assets/css/style.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Scrollbar, Pagination, Autoplay, Navigation } from "swiper";
export default {
  props: {
    dataArray: {
      type: Array,
      default: [],
    },
    slideType: {
      type: String,
      default: "",
    },
    sideNav: {
      type: Boolean,
      default: false,
    },
    breakpoints: {
      type: Object,
      default: {
        "@0.00": {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        "@0.75": {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        "@1.00": {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        "@1.50": {
          slidesPerView: 1,
          spaceBetween: 40,
        },
      },
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(props) {
    const dataArray = ref(props.dataArray);
    const slide_type = ref(props.slideType);
    const nav = ref(props.sideNav);
    const breakpoints = ref(props.breakpoints);

    const takeAction = (item) => {
       if (item.type === "course") {
          return `/courses/${item.link}`;
        } else if (item.type === "blog") {
          return `/blogs/${item.link}`;
        } else if (item.type === "link") {
          return item.link;
        } else {
          return "/";
        }
    };

    return {
      modules: [Autoplay, Pagination, Navigation, Scrollbar],
      dataArray,
      breakpoints,
      slide_type,
      nav,
      takeAction
    };
  },
};
</script>