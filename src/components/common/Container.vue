<template>
  <div :class="`container sm:px-2 px-4 mx-auto ${className}`">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  className: {type: String, default: ''}
})
</script>
