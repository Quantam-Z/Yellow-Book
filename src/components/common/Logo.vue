<template>
  <div class="">
    <img :class="className" src="/logo/logo2.png" alt="" />
  </div>
</template>

<script setup>
defineProps({
  className: { type: String, default: "h-[50px]  md:h-[60px] md:w-full object-fill" },
});
</script>
