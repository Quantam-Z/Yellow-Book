<template>
  <div class="pt-[120px]">
    <div class="container mx-auto px-2 flex justify-center">
      <div v-if="isLoading">
        <CommonShareLoader />
      </div>
      <div v-else class="w-full">
        <!-- first 3 -->
        <div v-if="ranking && ranking.length">
          <!-- rank card -->
          <div class="grid grid-cols-6 gap-4 bg-green-200 py-5 rounded-[20px]">
            <!-- second -->
            <div
              v-if="ranking && ranking[1]"
              class="order-2 md:order-1 rounded-md col-span-3 md:col-span-2 flex justify-center items-end"
            >
              <CommonCardsRankinCard
                image="2"
                :rank="ranking[1]"
                position="second"
              />
            </div>
            <!-- first -->
            <div
              v-if="ranking && ranking[0]"
              class="order-1 md:order-2 rounded-md col-span-6 md:col-span-2 flex justify-center"
            >
              <CommonCardsRankinCard
                position="first"
                image="1"
                :rank="ranking[0]"
              />
            </div>
            <!-- third -->
            <div
              v-if="ranking && ranking[2]"
              class="order-3 md:order-3 rounded-md col-span-3 md:col-span-2 flex justify-center items-end"
            >
              <CommonCardsRankinCard
                image="3"
                :rank="ranking[2]"
                position="third"
              />
            </div>
          </div>
          <!-- all rankin -->
          <div
            v-if="ranking && ranking.length >= 3"
            class="bg-[#F6F8FC] my-4 rounded-md p-4"
          >
            <div v-for="(rank, i) in ranking.slice(3)" :key="i">
              <div
                :class="user.data?.id == rank?.id ? 'bg-sky-200' : 'bg-white'"
                class="rounded-md my-2 p-2 flex justify-between items-center px-2 md:px-8"
              >
                <div
                  class="w-14 h-14 bg-green-900 text-white flex justify-center items-center rounded-lg"
                >
                  {{ i + 4 }}
                </div>
                <div>
                  <p class="text-[18px]">{{ rank.user.name }}</p>
                  <!-- <p>{{ rank.institution }}</p> -->
                </div>
                <div class="flex items-center gap-1 text-[18px]">
                  <p>
                    <Icon
                      color="red"
                      name="streamline:interface-lighting-light-bulb-lighting-light-incandescent-bulb-lights"
                    />
                  </p>
                  <p>{{ rank.duration }} sec</p>
                </div>
                <div class="flex items-center gap-1 text-[18px]">
                  <p class="text-center">
                    <Icon
                      color="blue"
                      name="streamline:interface-time-clock-circle-clock-loading-measure-time-circle"
                    />
                  </p>
                  <p>{{ rank.marks }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="flex justify-center items-center"
          style="height: calc(100vh - 400px)"
        >
          <p class="text-center w-full text-[25px]">Ranking is unavailable</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import $api from "~~/src/composables/useRequest";
import { useAuthStore } from "~~/src/stores/auth";

const route = useRoute();
const examId = route.params.rankingId;
const isLoading = ref(false);
const ranking = ref([]);
const { user } = useAuthStore();

const init = async () => {
  isLoading.value = true;
  const { data, pending, error } = await $api.get(`/ranking/${examId}`);
  if (error && error._value) {
    console.log(error);
  } else {
    ranking.value = data.value.rankings;
    console.log(ranking.value);
  }
  isLoading.value = false;
};

init();
</script>

<style lang="scss" scoped></style>
