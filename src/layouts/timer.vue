<template>
    <main class="set_bg min-h-screen bg-sky-200">
        <slot></slot>
    </main>
</template>
  
<script setup>
</script>
<style>
.set_bg {
    background-image: url('/gif/gif_2.gif');

    background-repeat: no-repeat;
    width: 100%;
    background-size: cover;
    background-position: center;
    min-height: 90vh;
}
</style>