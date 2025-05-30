<template>
  <div class="w-full p-4 rounded-md bg-white">
    <div>
      <p class="text-[20px] pb-4">Today’s Schedule</p>
    </div>
    <div>
      <div v-if="isLoading">
        <CommonShareLoader />
      </div>
      <div v-else>
        <TabGroup>
          <TabList
            class="flex w-full md:w-[50%] bg_gray space-x-1 rounded-xl p-1"
          >
            <Tab
              v-for="category in Object.keys(categories)"
              as="template"
              :key="category"
              v-slot="{ selected }"
            >
              <button
                :class="[
                  'w-full m-2 rounded-lg py-2 text-sm font-medium leading-5 text-black',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-[#007acc] focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-[#007acc] text-white shadow'
                    : 'text-[#808080] hover:text-black-500',
                ]"
              >
                {{ category }}
              </button>
            </Tab>
          </TabList>

          <TabPanels class="mt-2">
            <TabPanel
              v-for="(posts, idx) in Object.values(categories)"
              :key="idx"
              class="w-full"
            >
              <div>
                <div v-for="(post, i) in posts" :key="i">
                  <div class="bg-[#F6F8FC] p-3 rounded-md mb-4">
                    <div v-if="post.type == 'exam'">
                      <p class="text-blue-400">{{ post.course.title }}</p>
                      <div class="block md:flex items-center gap-4">
                        <div class="flex gap-3">
                          <p class="text-green-500">{{ post.title }}</p>
                          <p>{{ post.exam.total_marks }} marks</p>
                          <p>{{ post.exam.duration }} m</p>
                        </div>
                        <div class="flex gap-3 mt-2">
                          <div class="flex gap-x-2 ">
                            <nuxt-link v-if="post.exam && checkAbleToExam(post.exam)" :to="`/exam/${post.exam.id}`" class="px-5 py-2 rounded-md text-white bg-green-500">Start exam</nuxt-link>
                            <nuxt-link v-if="post.exam && post.exam.submitted" :to="`/exam/${post.exam.id}`" class="px-5 py-2 rounded-md text-white bg-green-500">Show answers</nuxt-link>
                            <div v-if="isAfterTime(post.exam.end_time)" class="px-5 py-2 rounded-md text-white bg-red-600">Exam end</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="w-full md:w-[50%]">
                      <div class="block md:flex md:justify-between items-center py-2">
                        <div class="flex md:block justify-between pr-2">
                          <p class="text-blue-500">{{ post.course.title }}</p>
                          <p>{{ post.title }}</p>
                        </div>
                        <div class="mt-4 md:mt-1">
                          <nuxt-link :to="`/my-courses/${post?.course.slug}/${post.slug}`" class="px-5 py-2 rounded-md text-white bg-green-500">Join now</nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import $api from "~~/src/composables/useRequest";
import moment from "moment";
import {useAuthStore} from "~/stores/auth";

definePageMeta({
  middleware: ["auth"],
});

const categories = ref({
  Class: [],
  Exam: [],
});

const isLoading = ref(false);

const authStore = useAuthStore();

onMounted( () => {
  setTimeout(() => {
    init()
  }, 100);
});

const init = async () => {
  isLoading.value = true;
  const { data, pending, error } = await $api.get("/todays-event");
  if (error && error._value) {
    console.log(error);
    if (error._value.status === 401) {
      await authStore.logout();
    }
  } else {
    filterCat(data.value.data);
  }
  isLoading.value = false;
};

const checkAbleToExam = (exam) => {
  return !exam.submitted && moment().isBetween(moment(exam.start_time), moment(exam.end_time));
};

const filterCat = (item) => {
  item.filter((el) => {
    if (el.type == "exam") {
      categories.value.Exam.push(el);
    } else {
      categories.value.Class.push(el);
    }
  });
};
</script>

<style lang="scss" scoped>
.bg_gray {
  background-color: rgba(46, 155, 214, 0.15);
}
</style>
