<template>
  <swiper
    :scrollbar="{
      hide: true,
    }"
    :breakpoints="breakpoints"
    :navigation="nav"
    :slidesPerView="3"
    :spaceBetween="4"
    :grabCursor="true"
    :pagination="false"
    :autoplay="{
      delay: 3000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(item, i) in dataArray" :key="i">
      <div class="mx-auto" v-if="slide_type == 'course'">
        <CourseCard :item="item" />
      </div>
      <div class="" v-if="slide_type == 'review'">
        <CommonCardsAboutCard :index="i" :item="item" />
      </div>
      <div class="" v-if="slide_type == 'instructor'">
        <InstructorSlideCard :item="item" />
      </div>
      <div class="mx-auto" v-if="slide_type == 'model_test'">
        <ModelTestCard :item="item" />
      </div>
      <div class="mx-auto" v-if="slide_type == 'blogSlide'">
        <BlogSlideCard :item="item" />
      </div>
      <div class="mx-auto" v-if="slide_type == 'preview'">
        <TestimonialCard :item="item" />
      </div>
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
import BlogCard from "../common/cards/BlogCard.vue";
import BookCard from "../common/cards/BookCard.vue";
import BlogSlideCard from "../common/cards/BlogSlideCard.vue";
import PreviewEbookCard from "../common/cards/PreviewEbookCard.vue";
import CourseCard from "../common/cards/CourseCard.vue";
import ModelTestCard from "../common/cards/ModelTestCard.vue";
import SlideCourseCard from "../common/cards/SlideCourseCard.vue";
import InstructorSlideCard from "../common/cards/InstructorSlideCard.vue";
import TestimonialCard from "../common/cards/TestimonialCard.vue";

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
    breakpoints: { type: Object, default: () => ({}) },
  },
  components: {
    Swiper,
    SwiperSlide,
    BlogCard,
    BookCard,
    BlogSlideCard,
    PreviewEbookCard,
    PreviewEbookCard,
    CourseCard,
    ModelTestCard,
    SlideCourseCard,
    CourseCard,
    InstructorSlideCard,
    TestimonialCard,
    TestimonialCard,
  },
  setup(props) {
    const dataArray = ref(props.dataArray);
    const slide_type = ref(props.slideType);
    const nav = ref(props.sideNav);
    const breakpoints = ref(props.breakpoints);
    return {
      modules: [Autoplay, Pagination, Navigation, Scrollbar],
      dataArray,
      breakpoints,
      slide_type,
      nav,
    };
  },
};
</script>
