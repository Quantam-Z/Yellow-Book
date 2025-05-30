<template>
  <div
    :class="[
      position === 'first'
        ? 'bg-[url(/exam/ranking/ranking-first-bg.jpeg)] w-[312px] h-[252px]'
        : 'bg-[url(/exam/ranking/ranking-bg.jpeg)] w-[274px] h-[222px]',
      'bg-cover bg-center rounded-[20px]',
    ]"
  >
    <div class="pt-4 relative">
      <div>
        <div>
          <img
            :src="
              rank?.user?.image?.link
                ? rank?.user?.image?.link
                : '/author/user.jpeg'
            "
            alt="ranking image"
            class="h-[110px] w-[110px] object-cover rounded-full block mx-auto"
          />
        </div>
        <p class="text-center text-white my-3 text-[16px]">
          {{ rank.user.name }}
        </p>
        <p class="text-center text-white">{{ rank.institution }}</p>
        <div class="flex justify-center flex-wrap gap-4">
          <div class="flex items-center text-white">
            <Icon
              color="white"
              name="streamline:interface-time-clock-circle-clock-loading-measure-time-circle"
            />
            <p class="pl-2">{{ getDuration(rank?.duration) }} sec</p>
          </div>
          <div class="flex items-center text-white">
            <Icon
              color="white"
              name="streamline:interface-lighting-light-bulb-lighting-light-incandescent-bulb-lights"
            />
            <p class="pl-2">
              {{ rank.marks }}
            </p>
          </div>
        </div>
      </div>
      <div class="absolute top-2 right-2">
        <img
          :src="
            position === 'first'
              ? '/exam/ranking/rank-1.png'
              : position === 'second'
              ? '/exam/ranking/rank-2.png'
              : position === 'third'
              ? '/exam/ranking/rank-3.png'
              : '/exam/ranking/default-rank.png'
          "
          alt="rank"
        />
      </div>
    </div>
  </div>

  <!-- <div
    :class="
      position == 'first'
        ? 'flex justify-between items-center gap-4 md:block'
        : 'block'
    "
  >
    <div
      :class="position == 'first' ? '' : 'md:mt-6'"
      class="w-20 h-20 md:w-40 md:h-40 rounded-full bg-[#2a5bbc]"
    >
      <div>
        <div class="relative">
          <img
            class="w-20 h-20 md:w-40 md:h-40 rounded-full border-2 border-sky-700"
            :src="
              rank?.user?.image?.link
                ? rank?.user?.image?.link
                : '/author/user.jpeg'
            "
            alt="ranking image"
          />
          <img
            class="absolute top-[80%] left-[30%] md:top-[90%] md:left-[37%] bg-white rounded-full w-8 md:w-12"
            :src="`/exam/ranking/${image}.gif`"
            alt=""
          />
        </div>
      </div>
    </div>
    <div
      :class="position == 'first' ? 'md:mt-[50px]' : 'md:mt-8 mt-4'"
      class="py-4"
    >
      <p class="text-center">{{ rank.user.name }}</p>
      <p class="text-center">{{ rank.institution }}</p>
      <div class="flex justify-center gap-4">
        <div class="flex items-center">
          <p>
            <Icon
              color="blue"
              name="streamline:interface-time-clock-circle-clock-loading-measure-time-circle"
            />
          </p>
          <p class="pl-2">{{ getDuration(rank?.duration) }} sec</p>
        </div>
        <div class="flex items-center">
          <p>
            <Icon
              color="red"
              name="streamline:interface-lighting-light-bulb-lighting-light-incandescent-bulb-lights"
            />
          </p>
          <p class="pl-2">
            {{ rank.marks }}
          </p>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script setup>
const props = defineProps({
  rank: {
    type: Object,
    default: {},
  },
  position: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
});
const getDuration = (num) => {
  return new Date(num * 1000).toISOString().slice(11, 19);
};
</script>

<style lang="scss" scoped></style>
