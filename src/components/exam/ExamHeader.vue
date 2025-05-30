<!-- <template>
  <div class="py-3 set_style px-2">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <h3 class="text-[14px] md:text-[26px] font-extrabold">
          # {{ exam.title }}
        </h3>
        <div class="hidden md:flex md:items-center md:gap-4">
          <p class="text-[20px]">মোট প্রশ্ন {{ countQuestion() || 0 }} টি </p>
          <p class="before_point"></p>
          <p class="text-[20px]">মোট নম্বরঃ {{ exam.total_marks || 0 }}</p>
          <p class="before_point"></p>
          <p class="text-[20px]">সময়ঃ {{ exam.duration }} min</p>
        </div>
      </div>
      <div v-show="!submitted" class="flex gap-3 items-center mr-10">
        
        <p class="text-[20px] hidden md:block">সময় বাকি আছে</p>
        <div class="rounded-md border-2 px-2 py-1" :class="warning()">
          <span
            id="countdown"
            style="font-weight: bold; font-size: 18px; color: white"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template> -->
<template>
  <div class="py-4 px-4 md:px-6 bg-green-200 rounded-lg shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Exam Info -->
      <div>
        <h3 class="text-lg md:text-2xl font-extrabold text-gray-800">
          {{ exam.title }}
        </h3>
        <div class="hidden md:flex md:items-center md:gap-6 mt-2 text-gray-700">
          <p class="text-lg flex items-center gap-1">
            <span class="font-semibold">মোট প্রশ্ন:</span> {{ countQuestion() || 0 }} টি
          </p>
          <p class="before_point"></p>
          <p class="text-lg flex items-center gap-1">
            <span class="font-semibold">মোট নম্বর:</span> {{ exam.total_marks || 0 }}
          </p>
          <p class="before_point"></p>
          <p class="text-lg flex items-center gap-1">
            <span class="font-semibold">সময়:</span> {{ exam.duration }} মিনিট
          </p>
        </div>
      </div>

      <!-- Timer Section -->
      <div v-show="!submitted" class="flex gap-4 items-center mr-2 md:mr-6">
        <p class="text-lg hidden md:block text-gray-800 font-semibold">⏳ সময় বাকি:</p>
        <div class="rounded-lg border-2 border-amber-500  px-4 py-2  text-white font-bold text-lg" :class="warning()">
          <span id="countdown"></span>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import moment from "moment";

const props = defineProps({
  exam: { type: Object, default: {} },
  submitted: { type: Boolean, required: true },
});
const emit = defineEmits(["startExam", "endExam"]);
const route = useRoute();
let timeInSecs = ref(0);
let timeTaken = ref(0);
let ticker = null;

if (!props.submitted) {
  function startTimer(secs) {
    timeInSecs.value = parseInt(secs);
    ticker = setInterval(tick, 1000);
  }

  function tick() {
    let secs = timeInSecs.value;
    if (secs > 0) {
      timeInSecs.value--;
      timeTaken.value++;
    } else {
      clearInterval(ticker);
      // startTimer(5 * 60); // 4 minutes in seconds
    }

    let mins = Math.floor(secs / 60);
    secs %= 60;
    let pretty = `${mins < 10 ? "0" : ""}${mins}:${
      secs < 10 ? "0" : ""
    }${secs}`;

    document.getElementById("countdown").innerHTML = pretty;
  }

  onMounted(() => {
    let duration = props.exam.duration * 60 || 0;
    // if (moment().isAfter(props.exam.start_time) && route.query.mode !== 'practice') {
    //   duration -= moment().diff(props.exam.start_time, "seconds");
    // }
    if (
      moment(props.exam.end_time).diff(moment(), "seconds") < duration &&
      route.query.mode !== "practice"
    ) {
      duration = moment(props.exam.end_time).diff(moment(), "seconds");
    }
    startTimer(duration);

    // startTimer(props.exam.duration * 60 || 0); // 5 minutes in seconds
  });

  onUnmounted(() => {
    clearInterval(ticker);
  });
}

watch(timeInSecs, (newValue) => {
  if (newValue === 0) {
    emit("endExam");
  }
});

watch(
  () => props.submitted,
  (newVal, oldVal) => {
    if (newVal === true) {
      emit("endExam", timeTaken.value);
    }
  }
);

const warning = () => {
  if (timeInSecs.value < 60) {
    return " bg-red-500";
  } else if (timeInSecs.value < 300) {
    return "bg-yellow-500";
  } else {
    return "bg-green-500";
  }
};

const countQuestion = () => {
  let count = 0;
  props.exam.question.body.sections.forEach((section) => {
    count += section.questions.length;
  });
  return count;
};
</script>

<style lang="scss" scoped>
/* .set_style {
  background-color: rgba(255, 255, 255, 0.4);
  offset: 0px, 4px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.75);
  z-index: 10;
} */
.set_style {
  background-color: white !important;
  position: sticky;
  top: 0;
  z-index: 10;
}

.container {
  background-color: inherit !important;
}
.before_point {
  width: 10px;
  height: 10px;
  background-color: black;
  border-radius: 50%;
}
</style>
