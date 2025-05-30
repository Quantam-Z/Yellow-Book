
<template>
  <div>
    <div v-if="source === 'youtube'" class="relative">
      <VideoComponent :link="extractUrl(src)" />
    </div>

    <div v-if="source === 'facebook'" class="relative w-full" style="padding-bottom: 56.25%; height: 0;">
      <div v-if="src">
        <a :href="src" target="_blank" class="underline text-blue-500 font-[600] text-[20px]">GO To Class</a>
      </div>
    </div>

  </div>
</template>

<script setup>
import {ref} from "vue";
import VideoComponent from "../VideoComponent.vue";

const props = defineProps({
  src: {type: String, required: true},
  source: {type: String, default: 'youtube'}
});
//for youtube video
const extractUrl = (url) => {
  if (url.includes('embed/')) {
    return `${url.split('?')[0]}?rel=0&fs=0&modestbranding=1&showinfo=0`;
  } else if (url.includes('watch?v=')) {
    const youtubeUrl = url.replace('watch?v=', 'embed/');
    return `${youtubeUrl.split('&')[0]}?rel=0&fs=0&modestbranding=1&showinfo=0`;
  } else if (url.includes('youtu.be')) {
    const videoId = url.split('/').pop().split('?')[0];
    return `https://www.youtube.com/embed/${videoId}?rel=0&fs=0&modestbranding=1&showinfo=0`;
  } else {
    return url;
  }
};

//for facebook video
const encodedFacebookUrl = (url) => {
  if (url.includes('/watch')) {
    const params = new URLSearchParams(url.split('?')[1]);
    const videoId = params.get('v');
    if (videoId) {
      return `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwatch%3Fv%3D${videoId}&show_text=false&autoplay=false`;
    }
  }
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=false`;
};
</script>

<style scoped>
.youtube-wrapper {
  width: 80%;
  height: 70%;
  border-radius: 15px;
  overflow: hidden;
}

.youtube-container {
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

@media (max-width: 768px) {
  .youtube-wrapper {
    width: 100%;
    height: 200px;
  }
}

.ytp-button:not([aria-disabled=true]):not([disabled]):not([aria-hidden=true]) {
  cursor: pointer;
  display: none !important;
}
</style>