<script setup lang="ts">
import Catagory from '~/components/common/Catagory.vue';
import Frequent from '~/components/common/Frequent.vue';
import Popular from '~/components/common/Popular.vue';

</script>

<template>
  <div>
    <Navbar />
    <Catagory /> 
    <Popular />
    <Frequent />
    <Footer />
  </div>
</template>



<style scoped>
.hero {
  padding: 100px 0;
  background-color: #f0f8ff;
}
.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}
.hero p {
  font-size: 20px;
  margin-bottom: 30px;
}
.about {
  padding: 60px 0;
  background-color: #ffffff;
}
.about h2 {
  font-size: 36px;
  margin-bottom: 15px;
}
.about p {
  font-size: 18px;
  color: #555;
}
.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 6px;
  text-decoration: none;
}
.btn:hover {
  background-color: #0056b3;
}
</style>
