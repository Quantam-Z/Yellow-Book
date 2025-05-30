<template>
  <div class="container my-6">
      <div v-for="(ia, i) in items" :key="i">
        <div :class="`my-2 ${targetClick == i ?'bg-[#E9F6FF]':'bg-[#F6F8FC]'} rounded-2xl w-full`">
          <div
            @click="openSutter(i)"
            class="flex justify-between items-center cursor-pointer px-4 pb-3 pt-4"
          >
            <p class="text-[20px]">{{ia.title}}</p>
            <p>
              <Icon color="#0072BB" :name="targetClick == i? 'ion:ios-arrow-up':'ion:chevron-down'"></Icon>
            </p>
          </div>
          <div v-if="isOpen && targetClick === i" class="px-6 pb-3">
            <p>{{ ia.body }}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
const props = defineProps({
  items:{
    type: Array,
    default: []
  }
})
const isOpen = ref(false);
const targetClick = ref(-1);
const openSutter = (i) => {
  if(i === targetClick.value){    
    targetClick.value = -1;
    isOpen.value = !isOpen.value;
  }
  else{
    targetClick.value = i;
    isOpen.value = true;
  }
};
</script>

<!-- https://icones.js.org/ -->
