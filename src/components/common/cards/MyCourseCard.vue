<template>
  <div>
    <NuxtLink :to="linkTo(course)">
      <div class="w-[338px] rounded-2xl">
        <div>
          <img class="rounded-t-2xl w-full h-32" :src="course?.image?.link ? course.image.link : 'images/no_image.jpg'" alt="my image" />
        </div>
        <div class="p-2 bg-[#F6F8FC] rounded-b-2xl h-[70px] w-[338px]">
          <p>{{ course.title }}</p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  course: {
    type: Object,
    default: {},
  },
});

const linkTo = (item) => {
  if (item?.subscription_status?.status === 'active' || item?.subscription_status?.status === 'expiring-soon') {
    return `/my-courses/${item.slug}`
  } else {
    return `/courses/${item.slug}`
  }
};
</script>

<style lang="scss" scoped></style>
