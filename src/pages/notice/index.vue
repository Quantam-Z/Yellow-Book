<template>
  <div>
    <div v-if="isLoading">
      <CommonShareLoader />
    </div>
    <div v-else>
      <div class="pt-[30px] md:pt-20 ">
        <div class="">
          <!--          <CommonTextSection title="Notice"/>-->
        </div>
        <div class="container fluid mx-auto md:pt-8 px-2">
          <div class="pb-8 pt-[70px] md:pt-6">
            <p class="text-center text-[32px] text-[#17107F] font-[600] ">নোটিশ</p>
            <hr />
          </div>
          <div v-if="notices && notices.length">
            <div class="grid grid-cols-6 gap-x-4 py-2">
              <div class="px-2 rounded-md order-2 md:order-1 col-span-6 md:col-span-4">
                <NuxtPage :item="singleNotice" />
              </div>
              <div class="order-1 md:order-2 col-span-6 md:col-span-2">
                <div class="border border-[#F1F1F1] rounded-t-3xl">
                  <div class="bg-[#17107F] py-2 rounded-t-md">
                    <p class=" text-center bg-[#17107F] text-white text-[22px] font-[600] ">সর্বশেষ বিজ্ঞপ্তি</p>
                  </div>
                  <div v-for="(notice, i) in notices" :key="i">
                    <div class="p-4 bg-[white]">
                      <div @click="loadNotice(notice, i)" as="button"
                        :class="isActive == i ? 'bg-[#17107F] rounded-md' : ''" class="cursor-pointer">
                        <div class="flex items-center gap-x-2">
                          <div>
                            <!--                            <img class="h-[70px]" :src="notice.image.link"/>-->
                          </div>
                          <div class="p-2">
                            <p :class="isActive == i ? 'text-white' : 'text-[#787878]'" class="text-[14px]  font-[400] ">{{
                              moment(notice.created_at).format("ll") }}</p>
                            <p :class="isActive == i ? 'text-white' : 'text-black'" class="text-[16px] md:text-[18px] font-[400] ">{{ notice.title }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import $api from '~~/src/composables/useRequest';
import moment from "moment";

const isLoading = ref(false);
const notices = ref([]);
const singleNotice = ref({});
const isActive = ref(false);


const init = async () => {
  isLoading.value = true;
  const { data, pending, error, refresh } = await $api.get("notices");
  if (error._value) {
    console.log(error);
  } else {
    notices.value = data.value.data;
    if (notices.value && notices.value.length) {
      getFirstNotice(notices.value[0])
    }
  }
  isLoading.value = false;
};
const getFirstNotice = async (notice) => {
  console.log('inner');
  isLoading.value = true;
  const { data, pending, error, refresh } = await $api.get(`notices/${notice.slug}`);
  if (error && error._value) {
    console.log(error);
  } else {
    singleNotice.value = data.value.data;
  }
  isLoading.value = false;
};
const loadNotice = (notice, i = 0) => {
  getFirstNotice(notice);
  isActive.value = i;
}
init();
</script>

<style scoped>
.border-left {
  border-left: 4px solid #fd821c;
  border-radius: 10px;
  padding: 0px 6px;
}
</style>
  