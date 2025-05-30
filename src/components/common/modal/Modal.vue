<template>
  <TransitionRoot appear :show="modalOpen" as="template">
    <Dialog style="z-index: 199" as="div" @close="closeModal" class="relative">
      <TransitionChild 
        as="template" 
        enter="duration-300 ease-out" 
        enter-from="opacity-0" 
        enter-to="opacity-100"
        leave="duration-200 ease-in" 
        leave-from="opacity-100" 
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild 
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-3xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-2xl transition-all"
            >
              <!-- Header -->
              <div class="flex justify-between items-center bg-[#17107F] px-6 py-4 rounded-t-xl">
                <DialogTitle as="h3" class="text-base font-semibold leading-6 text-white">
                  {{ courseContent.title }}
                </DialogTitle>
                <button 
                  class="text-white hover:text-emerald-100 transition-colors"
                  @click="closeModal"
                >
                  <Icon name="ion:close" size="24" />
                </button>
              </div>

              <!-- Content -->
              <div class="p-6">
                <h2 class="text-base  text-[#17107F] mb-2">
                  {{ capitalize(courseContent.title) }}
                </h2>
                
                <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                  <!-- Video Content -->
                  <template v-if="courseContent.type === 'video'">
                    <div v-if="isAfterTime(courseContent.available_from)">
                      <div v-if="courseContent.video && Object.keys(courseContent.video)">
                        <div v-if="courseContent.video.source == 'embedded'">
                          <div v-html="courseContent.video.embedded" class="aspect-video"></div>
                        </div>
                        <div v-else>
                          <common-youtube-video :src="courseContent.video.link" />
                        </div>
                      </div>
                      <div v-else class="flex items-center w-full bg-amber-100 p-3 rounded-md">
                        <Icon name="ion:ios-bell-outline" class="text-red-500" />
                        <span class="ml-2">No video available</span>
                      </div>
                    </div>
                    <div v-else>
                      <CommonAlert type="warning">
                        Video available at {{ humanReadableTime(courseContent.available_from) }}
                      </CommonAlert>
                    </div>
                  </template>

                  <!-- Note Content -->
                  <template v-if="courseContent.type === 'note'">
                    <div v-if="isAfterTime(courseContent.available_from)">
                      <div v-if="courseContent.note && Object.keys(courseContent.note)">
                        <div class="prose max-w-none" v-html="courseContent.note.body"></div>
                      </div>
                      <div v-else class="flex items-center w-full bg-amber-100 p-3 rounded-md">
                        <Icon name="ion:ios-bell-outline" class="text-red-500" />
                        <span class="ml-2">No note available</span>
                      </div>
                    </div>
                    <div v-else>
                      <CommonAlert type="warning">
                        Note available at {{ humanReadableTime(courseContent.available_from) }}
                      </CommonAlert>
                    </div>
                  </template>

                  <!-- PDF Content -->
                  <template v-if="courseContent.type === 'pdf'">
                    <div v-if="isAfterTime(courseContent.available_from)">
                      <div v-if="courseContent.pdf && Object.keys(courseContent.pdf).length">
                        <div class="max-h-[70vh] w-full overflow-auto">
                          <template v-if="isPdfLoading">
                            <div class="flex justify-center items-center h-32">
                              <div class="animate-pulse">Loading PDF...</div>
                            </div>
                          </template>
                          <template v-else>
                            <div class="flex items-center justify-between mb-4">
                              <div class="flex items-center space-x-4">
                                <button 
                                  :disabled="page <= 1" 
                                  @click="page--"
                                  class="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
                                >
                                  ❮
                                </button>
                                <span v-if="!showAllPages">
                                  {{ page }} / {{ pageCount }}
                                </span>
                                <button 
                                  :disabled="page >= pageCount" 
                                  @click="page++"
                                  class="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
                                >
                                  ❯
                                </button>
                              </div>
                              <label class="flex items-center space-x-2">
                                <input 
                                  v-model="showAllPages" 
                                  type="checkbox" 
                                  class="rounded text-emerald-600"
                                />
                                <span>Show all pages</span>
                              </label>
                            </div>
                            <vue-pdf-embed 
                              ref="pdfRef" 
                              :source="courseContent.pdf.link" 
                              :page="page"
                              @rendered="handleDocumentRender" 
                              class="border"
                            />
                          </template>
                        </div>
                      </div>
                      <div v-else class="flex items-center w-full bg-amber-100 p-3 rounded-md">
                        <Icon name="ion:ios-bell-outline" class="text-red-500" />
                        <span class="ml-2">No PDF available</span>
                      </div>
                    </div>
                    <div v-else>
                      <CommonAlert type="warning">
                        PDF available at {{ humanReadableTime(courseContent.available_from) }}
                      </CommonAlert>
                    </div>
                  </template>

                  <!-- Exam Content -->
                  <template v-if="courseContent.type === 'exam'">
                    <div>
                      <div v-if="courseContent.exam && Object.keys(courseContent.exam)">
                        <ExamDetails state="before" :exam="courseContent" />
                      </div>
                      <div v-else class="flex items-center w-full bg-amber-100 p-3 rounded-md">
                        <Icon name="ion:ios-bell-outline" class="text-red-500" />
                        <span class="ml-2">No exam available</span>
                      </div>
                    </div>
                  </template>

                  <!-- Link Content -->
                  <template v-if="courseContent.type === 'link'">
                    <div v-if="isAfterTime(courseContent.available_from)">
                      <div v-if="courseContent.link && Object.keys(courseContent.link)">
                        <a 
                          :href="courseContent.link.link" 
                          target="_blank"
                          class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                        >
                          Go to link
                          <Icon name="ion:open-outline" class="ml-2" />
                        </a>
                      </div>
                      <div v-else class="flex items-center w-full bg-amber-100 p-3 rounded-md">
                        <Icon name="ion:ios-bell-outline" class="text-red-500" />
                        <span class="ml-2">No link available</span>
                      </div>
                    </div>
                    <div v-else>
                      <CommonAlert type="warning">
                        Link available at {{ humanReadableTime(courseContent.available_from) }}
                      </CommonAlert>
                    </div>
                  </template>

                  <!-- Live Content -->
                  <template v-if="courseContent.type === 'live'">
                    <div v-if="isAfterTime(courseContent.available_from)">
                      <div v-if="isBetweenTime(courseContent.live.start_time, courseContent.live.end_time)">
                        <div v-if="courseContent.live && Object.keys(courseContent.live)">
                          <a 
                            :href="courseContent.live.link" 
                            target="_blank"
                            class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                          >
                            Join live now
                            <Icon name="ion:videocam-outline" class="ml-2" />
                          </a>
                        </div>
                        <div v-else class="flex items-center w-full bg-amber-100 p-3 rounded-md">
                          <Icon name="ion:ios-bell-outline" class="text-red-500" />
                          <span class="ml-2">No live available</span>
                        </div>
                      </div>
                      <div v-else>
                        <CommonAlert type="warning">
                          Live session has ended
                        </CommonAlert>
                      </div>
                    </div>
                    <div v-else>
                      <CommonAlert type="warning">
                        Live available at {{ humanReadableTime(courseContent.available_from) }}
                      </CommonAlert>
                    </div>
                  </template>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const emit = defineEmits(["closeModal"]);
const props = defineProps({
  modalOpen: {
    type: Boolean,
    default: false,
  },
  courseContent: {
    type: Object,
    default: {},
  },
});

// PDF handling
const isPdfLoading = ref(true);
const page = ref(null);
const pageCount = ref(1);
const showAllPages = ref(true);
const pdfRef = ref(null);

watch(showAllPages, (val) => {
  page.value = showAllPages.value === true ? null : 1;
});

const handleDocumentRender = (event) => {
  isPdfLoading.value = false;
  pageCount.value = pdfRef.value.pageCount;
};

const closeModal = () => {
  emit("closeModal", false);
};
</script>

<style scoped>
/* Custom scrollbar for PDF container */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Smooth transitions for modal content */
.prose {
  line-height: 1.6;
}

.prose :where(p):not(:where([class~="not-prose"] *)) {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>