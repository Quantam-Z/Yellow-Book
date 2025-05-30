<template>
    <div class="mx-2 aspect-video rounded overflow-hidden shadow">
      <YouTube
        :src="src"
        @ready="onReady"
        ref="youtube"
        width="100%"
        height="100%"
        :player-vars="playerVars"
      />
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    src: { type: String, required: true },
  });
  
  // Optional: Customize player parameters
  const playerVars = {
    autoplay: 1,
    controls: 1,
    modestbranding: 1,
    rel: 0,
    showinfo: 0,
  };
  
  const onReady = (event) => {
    // Safety check and mute before play (optional)
    const player = event.target;
    player.mute(); // prevent autoplay issues on some browsers
    player.playVideo();
  };
  </script>
  