<template>
  <main class="min-h-screen">
    <div class="">
      <Header/>
    </div>
    <main class=" pt-32">
      <slot></slot>
    </main>
  </main>
</template>

<script setup>
import Header from "~/components/common/Header.vue";
</script>


<style lang="scss">
.authBG {
  height: 100%;
  width: 100%;
  background: url("/images/authBg.png");
  background-position: center bottom;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
</style>
