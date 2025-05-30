<template>
  <div class="bg-[#F8F8FF]">
<table class="w-full border border-gray-400 text-left">
  <tbody>
    <tr class="bg-white border border-gray-400">
      <td class="p-3 font-semibold border border-gray-400 ">পরীক্ষার নাম</td>
      <td class="p-3 border border-gray-400">{{ exam.exam.title }}</td>
    </tr>
    <tr class="bg-green-100 border border-gray-400">
      <td class="p-3 font-semibold border border-gray-400">মোট নম্বর</td>
      <td class="p-3 border border-gray-400">{{ exam.exam.total_marks }}</td>
    </tr>
    <tr class="bg-white border border-gray-400">
      <td class="p-3 font-semibold border border-gray-400">পাশ নম্বর</td>
      <td class="p-3 border border-gray-400">{{ exam.exam.pass_marks }}</td>
    </tr>
    <tr class="bg-green-100 border border-gray-400">
      <td class="p-3 font-semibold border border-gray-400">পরীক্ষা শুরু হবে</td>
      <td class="p-3 border border-gray-400">{{ humanReadableTime(exam.exam.start_time) }}</td>
    </tr>
    <tr class="bg-white border border-gray-400">
      <td class="p-3 font-semibold border border-gray-400">পরীক্ষা শেষ হবে</td>
      <td class="p-3 border border-gray-400">{{ humanReadableTime(exam.exam.end_time) }}</td>
    </tr>
    <tr class="bg-green-100 border border-gray-400">
      <td class="p-3 font-semibold border border-gray-400">রেজাল্ট পাবলিশ হবে</td>
      <td class="p-3 border border-gray-400">{{ humanReadableTime(exam.exam.result_publish_time) }}</td>
    </tr>
    <tr class="bg-white border border-gray-400">
      <td class="p-3 font-semibold border border-gray-400">পরীক্ষার সময়</td>
      <td class="p-3 border border-gray-400">{{ exam.exam.duration }} মিনিট</td>
    </tr>
  </tbody>
</table>
    <div v-if="state == 'before'">
      <common-alert type="warning">
        <p>পরীক্ষায় অংশগ্রহণ করতে হলে আপনাকে প্রথমে কোর্সে ভর্তি হতে হবে।</p>
      </common-alert>
    </div>
    <div v-else class="mt-3 flex flex-nowrap">
      <div v-if="checkAbleToExam(exam.exam)">
        <button @click="openModal" class="bg-[#3b6b53] rounded-md px-2 md:px-3 py-2 text-[16px] text-white mx-2">পরীক্ষা শুরু করুন</button>
      </div>
      <div v-else-if="checkExamStart(exam.exam)">
        <common-alert  type="warning">
          পরীক্ষা এই সময়ের পরে অ্যাক্সেস করা যাবে {{ humanReadableTime(exam.exam.start_time) }}
        </common-alert>
      </div>
      <div v-else>
        <common-alert v-if="!exam.exam.submitted && checkExamEnd(exam.exam)" type="warning">
          আপনি পরীক্ষাটি মিস করেছেন। ইচ্ছা করলে আপনি পরীক্ষাটি প্র্যাকটিস করতে পারেন।
        </common-alert>
      <div class="flex flex-wrap gap-y-2 justify-start md:justify-start">
        <nuxt-link  :to="{ path: `/exam/${exam.exam.id}`, query: {mode: 'practice'}  } " class="bg-[red] rounded-md px-2 md:px-4 py-2  text-white mr-2">প্র্যাকটিস করুন</nuxt-link>
        <nuxt-link :to="`/exam/${exam.exam.id}`" class="bg-primary-color mr-2 px-2 md:px-4 py-2 rounded-md  text-white">উওরপত্র দেখুন</nuxt-link>
        <nuxt-link v-if="checkShowRank(exam.exam)" :to="`/ranking/${exam.exam?.id}`" class="bg-yellow-700 rounded-md px-2 md:px-4 py-2  text-white " to="">র‍্যাংকিং দেখুন</nuxt-link>
      </div>
      </div>
    </div>

    <!-- exam modal -->

    <div>
      <common-modal-confirm-modal
        @closeModal="closeModal($event)"
        :exam="exam"
        :isOpen="isOpen"
      />
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  exam: {
    type: Object,
    default: {},
  },
  state: {
    type: String,
    default: '',
  },
});
const isOpen = ref(false);

/* method */
const openModal = () => {
  isOpen.value = true;
};
const closeModal = (evn) => {
  isOpen.value = evn;
};

const checkAbleToExam = (exam) => {
  return !exam.submitted && moment().isBetween(moment(exam.start_time), moment(exam.end_time));
};

const checkExamStart = (exam) => {
  return !exam.submitted && moment().isBefore(moment(exam.start_time));
};

const checkExamEnd = (exam) => {
  return !exam.submitted && moment().isAfter(moment(exam.end_time));
};

const checkShowRank = (exam) => {
  return moment().isSameOrAfter(exam.result_publish_time);
};
</script>

<style lang="scss" scoped></style>

<!-- :to="`/exam/${exam.exam.id}` -->
