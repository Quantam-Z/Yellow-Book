<template>
  <div>
    <div v-if="isLoading">
      <LazyCommonShareLoader />
    </div>
    <div class="" v-else>
      <p class="text-lg text-[#17107F]">
        {{ capitalize(section.title ? section.title : "") }}
      </p>
      <div class="mt-2 py-5 px-4 bg-[#F8F8FF]">
        <!-- video -->
        <template v-if="section.type === 'video'">
          <div v-if="isAfterTime(section.available_from)">
            <div v-if="section.video && Object.keys(section.video)">
              <div v-if="section.video.source == 'embedded'">
                <div v-html="section.video.embedded"></div>
              </div>
              <div v-else>
                <common-youtube-video :src="section.video.link" />
              </div>
            </div>
            <p v-else class="flex items-center w-full bg-yellow-100 p-3 rounded-md">
              <Icon color="red" name="ion:ios-bell-outline" /><span class="pl-2">No video available</span>
            </p>
          </div>
          <div v-else>
            <CommonAlert type="warning">
              <p>
                video available at
                {{ humanReadableTime(section.available_from) }}
              </p>
            </CommonAlert>
          </div>
        </template>

        <!-- note -->

        <template v-if="section.type === 'note'">
          <div class="border rounded-lg shadow-sm overflow-hidden">
            <div v-if="isAfterTime(section.available_from)">
              <div v-if="section.note && Object.keys(section.note)" class="p-4 bg-white">
                <div class="flex items-center gap-2 text-lg font-medium text-gray-700 mb-3">
                  <Icon name="mdi:note" class="text-blue-500 w-5 h-5" />
                  <span>{{ section?.note?.title }}</span>
                </div>
                <div class="[&>p]:my-2 [&>a]:text-blue-600 [&>a]:hover:underline" v-html="section.note.body"></div>
              </div>
              <div v-else
                class="flex items-center gap-2 p-3 bg-yellow-50 text-yellow-700 rounded-md border border-yellow-200">
                <Icon name="ion:ios-bell-outline" class="text-yellow-600 w-5 h-5" />
                <span>No note available</span>
              </div>
            </div>
            <div v-else class="p-3 bg-orange-50">
              <CommonAlert type="warning" class="w-full">
                <div class="flex items-center">
                  <Icon name="ion:ios-time-outline" class="mr-2 w-5 h-5" />
                  <span>
                    Note will be available at
                    <strong>{{ humanReadableTime(section.available_from) }}</strong>
                  </span>
                </div>
              </CommonAlert>
            </div>
          </div>
        </template>

        <!-- pdf -->

        <template v-if="section.type === 'pdf'">
          <div v-if="isAfterTime(section.available_from)">
            <div v-if="section.pdf && Object.keys(section.pdf).length">
              <div style="max-height: 85vh; width: 100%; overflow: auto">
                <template v-if="isPdfLoading">Loading...</template>
                <template v-else>
                  <div class="flex justify-between px-2 mb-3">
                    <div>
                      <span v-if="showAllPages"> {{ pageCount }} page(s) </span>
                      <span v-else>
                        <button class="mr-2 md:mr-6 bg-slate-300 px-4 rounded-md" :disabled="page <= 1" @click="page--">
                          ❮
                        </button>
                        {{ page }} / {{ pageCount }}
                        <button class="ml-2 md:ml-6 bg-slate-300 px-4 rounded-md" :disabled="page >= pageCount"
                          @click="page++">
                          ❯
                        </button>
                      </span>
                    </div>
                    <div>
                      <label class="right">
                        <input v-model="showAllPages" type="checkbox" />
                        Show all pages
                      </label>
                    </div>
                  </div>
                </template>
                <vue-pdf-embed ref="pdfRef" :source="section.pdf.link" :page="page" @rendered="handleDocumentRender" />
              </div>
            </div>
            <p v-else class="flex items-center w-full bg-yellow-100 p-3 rounded-md">
              <Icon color="red" name="ion:ios-bell-outline" /><span class="pl-2">No pdf available</span>
            </p>
          </div>
          <div v-else>
            <CommonAlert type="warning">
              <p>
                pdf available at {{ humanReadableTime(section.available_from) }}
              </p>
            </CommonAlert>
          </div>
        </template>

        <!-- exam -->

        <template v-if="section.type === 'exam'">
          <div v-if="isAfterTime(section.available_from)">
            <div v-if="section.exam && Object.keys(section.exam)">
              <ExamDetails :exam="section" />
            </div>
            <p v-else class="flex items-center w-full bg-yellow-100 p-3 rounded-md">
              <Icon color="red" name="ion:ios-bell-outline" /><span class="pl-2">No exam available</span>
            </p>
          </div>
          <div v-else>
            <CommonAlert type="warning">
              <p>
                Exam available at
                {{ humanReadableTime(section.available_from) }}
              </p>
            </CommonAlert>
          </div>
        </template>

        <!-- link -->

        <template v-if="section.type === 'link'">
          <div class="border rounded-lg shadow-sm overflow-hidden">
            <div v-if="isAfterTime(section.available_from)">
              <div v-if="section.link && Object.keys(section.link)" class="p-4 bg-white space-y-3">
                <div class="flex items-center gap-2 text-lg font-medium text-gray-700">
                  <Icon name="mdi:link" class="text-[#17107F] w-5 h-5" />
                  <span>Resource Link</span>
                </div>

                <!-- Link URL displayed first -->
                <div class="p-3 bg-gray-50 rounded-md border border-gray-200 break-all">
                  <span class="text-gray-500 text-sm">URL:</span>
                  <p class="text-gray-800 mt-1">{{ section.link.link }}</p>
                </div>

                <!-- Visit Link Button -->
                <a :href="section.link.link" target="_blank" rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-2 bg-[#17107F] hover:bg-[#130b6b] text-white font-medium px-4 py-2.5 rounded-md transition-colors duration-200 w-full sm:w-auto">
                  <span>Visit Link</span>
                  <Icon name="mdi:arrow-right" class="w-4 h-4" />
                </a>
              </div>

              <div v-else
                class="flex items-center gap-2 p-3 bg-yellow-50 text-yellow-700 rounded-md border border-yellow-200">
                <Icon name="ion:ios-bell-outline" class="text-yellow-600 w-5 h-5" />
                <span>No link available</span>
              </div>
            </div>

            <div v-else class="p-3 bg-orange-50">
              <CommonAlert type="warning" class="w-full">
                <div class="flex items-center">
                  <Icon name="ion:ios-time-outline" class="mr-2 w-5 h-5" />
                  <span>
                    Link will be available at
                    <strong>{{ humanReadableTime(section.available_from) }}</strong>
                  </span>
                </div>
              </CommonAlert>
            </div>
          </div>
        </template>

        <!--live  -->

        <!-- <template v-if="section.type === 'live'">
          <div v-if="isAfterTime(section.available_from)">
            <div v-if="section.live && Object.keys(section.live)">
              <a :class="isBetweenTime(section.live.start_time, section.live.end_time)
                  ? ''
                  : 'disabled'
                " class="bg-[#3b6b53]  text-[18px] text-white px-4 py-2 rounded-md" :href="section.live.link"
                target="_blank">
                Join now
              </a>
              <div v-if="!isBetweenTime(section.live.start_time, section.live.end_time)" class="mt-2 md:mt-4">
                <p class="md:text-[18px]">Live Starts at : {{ humanReadableTime(section.live.start_time) }}</p>
                <p class="md:text-[18px]">Live Ends at : {{ humanReadableTime(section.live.end_time) }}</p>
              </div>
            </div>
            <p v-else class="flex items-center w-full bg-yellow-100 p-3  rounded-md">
              <Icon color="red" name="ion:ios-bell-outline" /><span class="pl-2">No live available</span>
            </p>
          </div>
          <div v-else>
            <CommonAlert type="warning">
              <p>
                Live available at
                {{ humanReadableTime(section.available_from) }}
              </p>
            </CommonAlert>
          </div>
        </template> -->
        <template v-if="section.type === 'live'">
          <div v-if="isAfterTime(section?.available_from)">
            <div v-if="section?.live && Object.keys(section?.live)">
              <div v-if="!timeCheck(section?.live)" class="mt-2 md:mt-4">
                <common-youtube-video :src="section?.live?.link" />
              </div>
              <div v-else>
                <common-youtube-video :src="section?.live?.link" />
              </div>
              <!-- <pre>{{ liveComments }}</pre> -->
              <div class="mt-4">
                <CommentSection  :content-id="contentID" :course-id="courseID" :section-id="sectionID" />
              </div>
            </div>
            <p v-else? class="flex items-center w-full bg-yellow-100 p-3 rounded-md">
              <Icon color="red" name="ion:ios-bell-outline" />
              <span class="pl-2">No live available</span>
            </p>
          </div>
          <div v-else>
            <CommonAlert type="warning">
              <p>
                Live available at
                {{ humanReadableTime(section?.available_from) }}
              </p>
            </CommonAlert>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import $api from "~~/src/composables/useRequest";
import {useAuthStore} from "~/stores/auth";
import moment from "moment";
import CommentSection from "~~/src/components/custom/CommentSection.vue";

const authStore = useAuthStore();
const section = ref({});
const route = useRoute();
const slug = route.params.contentslug;
const isLoading = ref(false);
//for pdf
const isPdfLoading = ref(true);
const page = ref(1);
const pageCount = ref(1);
const showAllPages = ref(false);
const pdfRef = ref(null);
const isLive = ref(false);
const courseID = ref(null);
const sectionID = ref(null);
const contentID = ref(null);




watch(showAllPages, (val) => {
  page.value = showAllPages.value === true ? null : 1;
});

onMounted(() => {
  setTimeout(() => {
    init();
    // loadLiveComments();
  }, 100);
});

const init = async () => {
  isLoading.value = true;
  const { data, pending, error, refresh } = await $api.get(`content/${slug}`);
  if (error && error._value) {
    console.log(error);
    if(error._value.status === 401) {
      await authStore.logout();
    }
  } else {
    section.value = data.value.data;
    courseID.value = data.value.data.course_id;
    sectionID.value = data.value.data.section_id;
    contentID.value = data.value.data.id;
  }
  isLoading.value = false;
};
// refresh();

const handleDocumentRender = (event) => {
  isPdfLoading.value = false;
  pageCount.value = pdfRef.value.pageCount;
};


const timeCheck = (live) => {
  isLive.value = moment(moment()).isBetween(live?.start_time, live?.end_time);
  return moment(moment()).isBetween(live?.start_time, live?.end_time);
};

</script>

<style scoped>
.disabled {
  pointer-events: none;
  background: red;
  cursor: not-allowed;
}
</style>
