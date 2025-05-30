<template>
    <client-only>
      <div v-if="link" id="videoPlayer" ref="videoPlayer" class="relative py-0 my-0 rounded-lg">
        <vue-plyr ref="plyr" class="video-wrap" :options="{ hideYouTubeDOMError: true }">
          <div
              class="rounded-lg"
              data-plyr-provider="youtube"
              :data-plyr-embed-id="link"
              style="height: 300px !important;"
          ></div>
        </vue-plyr>
        <div
            class="absolute top-1/2 left-0 w-full flex justify-between items-center -translate-y-1/2 pointer-events-none">
          <button
              class="control-button bg-black bg-opacity-50 text-white rounded-full w-12 h-12 flex justify-center items-center ml-3 pointer-events-auto"
              @click="seek(-10)"
          >
            <icon name="ic:outline-keyboard-double-arrow-left" />
          </button>
          <button
              class="control-button bg-black bg-opacity-50 text-white rounded-full w-12 h-12 flex justify-center items-center mr-3 pointer-events-auto"
              @click="seek(10)"
          >
            <icon name="ic:round-keyboard-double-arrow-right" />
          </button>
        </div>
      </div>
    </client-only>
  </template>
  
  <script setup>
  import {ref} from 'vue';
  
  // Props
  defineProps({
    link: {
      type: String,
      required: true
    }
  });
  
  // Refs
  const videoPlayer = ref(null);
  const plyr = ref(null);
  
  // Methods
  const seek = (seconds) => {
    const player = plyr.value?.player;
    if (player) {
      player.currentTime += seconds;
    }
  };
  </script>
  
  <style scoped>
  .video-wrap {
    border-radius: 0.5rem;
  }
  </style>