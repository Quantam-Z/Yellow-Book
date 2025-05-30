<template>
  <div class="header-container">
    <div :class="['header-content', { 'mb-[0px]': isM }]">
      <h3
        :class="[
          'text-[24px] md:text-[38px] font-semibold text-center leading-[126%] md:leading-[122%]',
          isWhiteText ? 'text-white' : 'text-gray-900'
        ]"
      >
        {{ title }}
      </h3>
      <p
        :class="[
          'text-[16px] font-medium text-center mt-4 md:mt-8',
          isWhiteText ? 'text-white' : 'text-[#424242]'
        ]"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>



<script setup>
const props = defineProps({
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  isM: { type: Boolean, default: false },
  courseSlug: {type: String, default:''} // 👈 Make sure this prop is passed in

});

const isWhiteText = computed(() =>
  props.courseSlug?.includes('sajesn') || props.courseSlug?.includes('suggestion')
);


</script>

<style scoped>
.header-container {
  @apply w-full max-w-6xl mx-auto px-4;
}

.header-content {
  @apply relative pb-2;
}

.line {
  @apply w-12 h-1.5 bg-[#1D4ED8] rounded-full;
}

/* Optional animation for the line */
.line {
  animation: lineGrow 0.6s ease-out forwards;
}

@keyframes lineGrow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
</style>
