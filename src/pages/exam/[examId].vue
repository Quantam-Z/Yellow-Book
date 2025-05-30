<template>
  <div style="min-height: 70vh">
    <div v-if="isLoading">
      <CommonShareLoader />
    </div>
    <div v-else>
      <div
        v-if="showResultPublishWarning"
        class="container mx-auto mt-3 w-full md:w-[50%] bg-[#F4F7FD] rounded-md px-4 py-6"
      >
        <div class="mb-3">
          <h3 class="text-[16px] md:text-[26px] font-extrabold">
            {{ exam.title }}
          </h3>
          <div class="hidden md:flex md:items-center md:gap-4">
            <p class="text-[20px]">{{ countQuestion() || 0 }} Questions</p>
            <p class="before_point"></p>
            <p class="text-[20px]">Total Marks = {{ exam.total_marks || 0 }}</p>
            <p class="before_point"></p>
            <p class="text-[20px]">Duration = {{ exam.duration }} min</p>
          </div>
        </div>
        <Alert type="warning">
          Result is not published yet. Please wait for the result to be
          published. You can practice or analyze your exam after the result is
          published.
        </Alert>
        <Alert type="success">
          Result will be published on
          {{ moment(exam?.result_publish_time).format("lll") }}
        </Alert>
      </div>
      <div v-else>
        <div
          v-if="alertMessage && alertMessage.length"
          class="container mx-auto mt-3 w-full md:w-[50%] bg-[#F4F7FD] rounded-md px-4 py-6"
        >
          <Alert type="warning"> {{ alertMessage }}!</Alert>
        </div>
        <template v-else>
          <!-- exam header -->
          <div v-show="examMode" class="sticky top-0">
            <LazyExamHeader
              :exam="exam"
              :submitted="exam?.result.submitted"
              @endExam="endExam($event)"
            />
          </div>
          <div
            class="container mx-auto mt-3 w-full md:w-[50%] bg-[#F4F7FD] rounded-md px-4 py-6"
          >
            <div v-if="examMode">
              <exam-perform-exam
                :exam="exam"
                :exam-id="$route.params.examId"
                :submitted="exam?.result.submitted"
                :exam-time-end="examTimeEnd"
                @examFinished="takeAction($event)"
              />
            </div>
            <!-- answer -->
            <template v-if="answerMode">
              <exam-analysis :exam="exam" />
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import $api from "~/composables/useRequest";
import moment from "moment";
import Alert from "~/components/common/Alert.vue";

definePageMeta({
  layout: "exam",
});

const route = useRoute();
const isLoading = ref(false);
const examMode = ref(false);
const answerMode = ref(false);
const showResultPublishWarning = ref(false);
const examTimeEnd = ref(false);
const exam = ref(null);
const alertMessage = ref(null);

const init = async () => {
  isLoading.value = true;
  const { data, pending, error, refresh } = await $api.get(
    `/exams/${route.params.examId}`
  );
  if (error && error._value) {
    alertMessage.value = error.value.data?.message;
    console.log(alertMessage.value);
    isLoading.value = false;
    return;
  } else {
    exam.value = data.value.data;
    if (
      moment().isSameOrBefore(exam.value.result_publish_time) &&
      exam.value.result.submitted
    ) {
      showResultPublishWarning.value = true;
    } else {
      if (
        (moment().isBetween(
          moment(exam.value.start_time),
          moment(exam.value.end_time)
        ) &&
          !exam.value.result.submitted) ||
        route.query.mode === "practice"
      ) {
        exam.value.result.submitted = false;
        examMode.value = true;
      } else {
        answerMode.value = true;
      }
    }
  }
  isLoading.value = false;
};
init();

const endExam = async (event) => {
  examTimeEnd.value = true;
  exam.value.result.duration = event;
};

const takeAction = async (event) => {
  if (event.first_attempt) {
    examMode.value = false;
    if (moment().isSameOrBefore(exam.value.result_publish_time)) {
      showResultPublishWarning.value = true;
    } else {
      answerMode.value = true;
      exam.value.result = event.exam.result;
      exam.value.question = event.exam.question;
    }
  } else {
    await generateResult(event.userAnswers);
    exam.value.result.answers = event.userAnswers.sections;
    exam.value.result.submitted = true;

    examMode.value = false;
    answerMode.value = true;
  }
};

const generateResult = async (userAnswers) => {
  let correctOption = 0;
  let wrongOption = 0;

  userAnswers.sections.forEach((section) => {
    section.answers.forEach((answer) => {
      const mcq = exam.value.question.body.sections
        .find((sec) => sec.title === section.title)
        .questions.find((mcq) => mcq.id === answer.mcq_id);
      if (mcq.answer === answer.user_answer) {
        correctOption++;
      } else {
        wrongOption++;
      }
    });
  });

  exam.value.result.positive_marks = correctOption * exam.value.positive_marks;
  exam.value.result.negative_marks = wrongOption * exam.value.negative_marks;
  exam.value.result.marks =
    exam.value.result.positive_marks - exam.value.result.negative_marks;
  if (exam.value.marks < 0) {
    exam.value.marks = 0;
  }
};

const countQuestion = () => {
  let count = 0;
  exam.value.question.body.sections.forEach((section) => {
    count += section.questions.length;
  });
  return count;
};
</script>
<style lang="scss">
@mixin backgroundBorder($color, $border-color) {
  background-color: $color;
  border: 0.5px solid $border-color;
  border-radius: 5px;
}

.option {
  background-color: white;
  font-size: 18px;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
}

.selected-answer {
  @include backgroundBorder(#ddf5ff, #008fca);
}

.correct-answer {
  @include backgroundBorder(#ddf5ff, #008fca);
  background-color: #ddf5ff;
}

.wrong-answer {
  @include backgroundBorder(#fddddd, #f00);
  background-color: rgba(234, 183, 183, 0.3);
}

.not-answered {
  @include backgroundBorder(rgb(88, 178, 108), #f00);
}

.btn-submit {
  background-color: #0072bb;
  color: white;
  padding: 10px 20px;
}
</style>
