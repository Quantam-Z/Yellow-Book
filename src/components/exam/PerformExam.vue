<template>
  <div>
    <div class="pt-3">
      <template v-if="exam.question.body.sections && exam.question.body.sections.length">
        <div v-for="(section, index) in exam.question.body.sections" :key="index"
          :style="examTimeEnd ? 'pointer-events: none' : ''">
          <!--                    <h1 style="color:green; font-size: 24px;">section er title - {{ section.title }}</h1>-->
          <div v-for="(question, i) in section.questions" :key="i">
            <h2 class="text-[20px]">{{ i + 1 }}. <span v-katex="question.question" class="latex"></span></h2>
            <div class="flex justify-center py-2" v-if="question.question_image">
              <img class="w-[80%] md:w-[60%] rounded-md" :src="question.question_image" alt="" />
            </div>
            <div v-for="option in ['a', 'b', 'c', 'd', 'e']" :key="option">
              <div v-if="question[option] && question[option].length" @click="
                pushUserAnswerIntoQuestions(
                  section.title,
                  question.id,
                  option
                )
                " :class="`option p-3 ${selectedUserAnswer(section.title, question.id, option) ? 'selected-answer' : '' }`">
                {{ option }}. <span v-katex="question[option]" class="latex"></span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="p-10 flex justify-center">
      <button :disabled="!userAnswers.sections.length" v-if="!exam.result.submitted && $route.query.mode !== 'practice'"
        @click="confirmExam" :class="!userAnswers.sections.length ? 'bg-gray-500' : ''"
        class="cursor-pointer bg-[red] text-white w-full text-center md:w-[50%] rounded-md py-2">
        সাবমিট করুন
      </button>
      <button v-if="$route.query.mode === 'practice'" @click="finishPracticeExam"
        class="cursor-pointer bg-[red] text-white w-full text-center md:w-[50%] rounded-md py-2">
        সাবমিট করুন
      </button>
    </div>

    <!-- exam modal -->

    <div>
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-50">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
            leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95">
                <DialogPanel
                  class="w-full md:w-[30%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle as="h3" class="pt-6 text-lg font-medium leading-6 text-[#0072BB] text-center">
                    <p class="text-[#0072BB]">
                      আপনি কি পরীক্ষা সাবমিট করতে চাচ্ছেন ?
                    </p>
                  </DialogTitle>

                  <div class="mt-8 flex justify-center gap-8 pb-8">
                    <button type="button" class="bg-[#FF0000] text-white rounded-md px-6 py-2" @click="closeModal">
                      না
                    </button>
                    <button class="bg-[#14AE5C] text-white rounded-md px-6 py-2" @click="confirmModal">
                      হ্যাঁ
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </div>
</template>

<script setup>
import $api from "~/composables/useRequest";
import moment from "moment";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const props = defineProps({
  exam: { type: Object, required: true },
  examId: { type: [String, Number], required: true },
  examTimeEnd: { type: Boolean, required: true },
});
const emit = defineEmits(["examFinished"]);
const route = useRoute();

const isOpen = ref(false);
const isLoading = ref(false);
const userAnswers = ref({ sections: [] });
const examFinished = ref(false);

watch(() => props.examTimeEnd, (newVal, oldVal) => {
  if (newVal === true) {
    if (route.query.mode !== 'practice') {
      finishExam()
    } else {
      finishPracticeExam()
    }
  }
})

const pushUserAnswerIntoQuestions = (section_title, question_id, option) => {
  const sectionIndex = userAnswers.value.sections.findIndex((section) => section.title === section_title);
  if (sectionIndex !== -1) {
    const questionIndex = userAnswers.value.sections[sectionIndex].answers.findIndex((answer) => answer.mcq_id === question_id);
    if (questionIndex !== -1) {
      //do noting
      // userAnswers.value.sections[sectionIndex].answers[questionIndex].user_answer = option;
    } else {
      userAnswers.value.sections[sectionIndex].answers.push({
        mcq_id: question_id,
        user_answer: option,
      });
    }
  } else {
    userAnswers.value.sections.push({
      title: section_title,
      answers: [{ mcq_id: question_id, user_answer: option }],
    });
  }
};
const selectedUserAnswer = (section_title, question_id, option) => {
  const sectionIndex = userAnswers.value.sections.findIndex(
    (section) => section.title === section_title
  );
  if (sectionIndex !== -1) {
    const questionIndex = userAnswers.value.sections[
      sectionIndex
    ].answers.findIndex((answer) => answer.mcq_id === question_id);
    if (questionIndex !== -1) {
      return (
        userAnswers.value.sections[sectionIndex].answers[questionIndex]
          .user_answer === option
      );
    }
  }
  return false;
};

const finishExam = async () => {
  if (moment().isBetween(moment(props.exam.start_time), moment(props.exam.end_time).add(30, 'minute'))) {
    isLoading.value = true;
    examFinished.value = true;
    const options = {
      showSuccess: true,
      showError: true,
      successMessage: "Exam finished successfully",
    };
    const { data, pending, error, refresh } = await $api.post(`exams/${props.examId}`, userAnswers.value, options);
    if (error && error._value) {
      console.log(error);
    } else {
      const payload = {
        first_attempt: true,
        exam: data.value.data,
      };
      emit("examFinished", payload);
    }
    isLoading.value = true;
  } else {
    alert("Exam time is over")
  }
};

const confirmExam = () => {
  isOpen.value = true;
};
const confirmModal = () => {
  isOpen.value = false;
  finishExam();
};

const closeModal = () => {
  isOpen.value = false;
};

const finishPracticeExam = () => {
  isOpen.value = false;
  isLoading.value = true;
  examFinished.value = true;
  const payload = {
    first_attempt: false,
    userAnswers: userAnswers.value,
  };
  emit("examFinished", payload);
};
</script>
