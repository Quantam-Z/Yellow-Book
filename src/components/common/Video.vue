<template>
  <div v-if="video && video.value">
    <div class="">
      <div>
        <iframe
        class="rounded-2xl w-full h-auto md:h-[300px]"
          :src="getEmbededUrl(contain)"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  contain: {
    type: Object,
    default: {},
  },
});

const getEmbededUrl = (url) => {
  const youtubeUrl = url.replace('watch?v=', 'embed/')
  if(youtubeUrl.includes('&')){
    return youtubeUrl.split('&')[0];
  }else{
    return youtubeUrl;
  }
}
</script>

<style lang="scss" scoped></style>
