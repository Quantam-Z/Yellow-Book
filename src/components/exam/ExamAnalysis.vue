<template>
  <div class="pt-3">
    <!-- <div class="flex justify-center gap-3 md:gap-8 mb-8">
      <div class="flex flex-col items-center bg-white px-4 md:px-10 py-4 rounded-2xl shadow-md">
        <p>সময় নিয়েছেন</p>
        <img class="h-12 md:h-auto py-2" src="/exam/time.png" alt="time">
        <p>{{ calculateMinuteAndSeconds(exam.result.duration) || 0 }}</p>
      </div>
      <div class="flex flex-col items-center bg-white px-3 md:px-10 py-4 rounded-2xl shadow-md">
        <p>নম্বর পেয়েছেন</p>
        <img class="h-12 md:h-auto py-2" src="/exam/gained.png" alt="">
        <p>{{ exam.result.marks || 0 }}</p>
      </div>
    </div> -->
    <p class="text-xl font-semibold mb-2">Exam : {{ exam.title }}</p>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      <!-- Time Taken -->
      <div class="flex items-center bg-white px-4 py-4 rounded-xl shadow-md">
        <Icon size="32" name="fluent-emoji-flat:eight-thirty" class="mr-4" />
        <div>
          <p class="text-sm font-medium text-gray-600">Time Taken</p>
          <p class="text-lg font-semibold">{{ calculateMinuteAndSeconds(exam.result.duration) || 0 }}</p>
        </div>
      </div>
      <!-- Total Questions -->
      <div class="flex items-center bg-white px-4 py-4 rounded-xl shadow-md">
        <Icon size="32" name="fluent-emoji-flat:heavy-equals-sign" class="mr-4" />
        <div>
          <p class="text-sm font-medium text-gray-600">Total Questions</p>
          <p class="text-lg font-semibold">{{ exam.question.body.sections[0].questions.length }}</p>
        </div>
      </div>

      <!-- Attempted Questions -->
      <div class="flex items-center bg-white px-4 py-4 rounded-xl shadow-md">
        <Icon size="32" name="fluent-emoji-flat:green-circle" class="mr-4" />
        <div>
          <p class="text-sm font-medium text-gray-600">Attempted</p>
          <p class="text-lg font-semibold">{{ exam.result?.answers[0]?.answers?.length || 0 }}</p>
        </div>
      </div>

      <!-- Skipped Questions -->
      <div class="flex items-center bg-white px-4 py-4 rounded-xl shadow-md">
        <Icon size="32" name="fluent-emoji-flat:hollow-red-circle" class="mr-4" />
        <div>
          <p class="text-sm font-medium text-gray-600">Skipped</p>
          <p class="text-lg font-semibold">
            {{ (exam.question.body.sections[0].questions.length - exam.result?.answers[0]?.answers?.length) || 0 }}
          </p>
        </div>
      </div>

      <!-- Correct Answers -->
      <div class="flex items-center bg-white px-4 py-4 rounded-xl shadow-md">
        <Icon size="32" name="fluent-emoji-flat:check-mark" class="mr-4" />
        <div>
          <p class="text-sm font-medium text-gray-600">Correct</p>
          <p class="text-lg font-semibold">{{ exam.result.positive_marks / exam.positive_marks || 0 }}</p>
        </div>
      </div>

      <!-- Wrong Answers -->
      <div class="flex items-center bg-white px-4 py-4 rounded-xl shadow-md">
        <Icon size="32" name="fluent-emoji-flat:cross-mark" class="mr-4" />
        <div>
          <p class="text-sm font-medium text-gray-600">Wrong</p>
          <p class="text-lg font-semibold">{{ exam.result.negative_marks / exam.negative_marks || 0 }}</p>
        </div>
      </div>

      <!-- Positive Marks -->
      <div class="flex items-center bg-white px-4 py-4 rounded-xl shadow-md">
        <Icon size="32" name="fluent-emoji:plus" class="mr-4" />
        <div>
          <p class="text-sm font-medium text-gray-600">Positive Marks</p>
          <p class="text-lg font-semibold">{{ exam.result.positive_marks || 0 }}</p>
        </div>
      </div>

        <!-- Negative Marks -->
      <div class="flex items-center bg-white px-4 py-4 rounded-xl shadow-md">
        <Icon size="32" name="fluent-emoji:minus" class="mr-4" />
        <div>
          <p class="text-sm font-medium text-gray-600">Negative Marks</p>
          <p class="text-lg font-semibold">{{ exam.result.negative_marks || 0 }}</p>
        </div>
      </div>

      <!-- Obtain Marks -->
      <div class="flex items-center bg-white px-4 py-4 rounded-xl shadow-md">
        <Icon size="32" name="fluent-emoji-flat:input-numbers" class="mr-4" />
        <div>
          <p class="text-sm font-medium text-gray-600">Obtained Marks</p>
          <p class="text-lg font-semibold">{{ exam.result.marks || 0 }}</p>
        </div>
      </div>

      <!-- Percentage -->
      <div class="flex items-center bg-white px-4 py-4 rounded-xl shadow-md">
        <Icon size="32" name="fluent-emoji-flat:hundred-points" class="mr-4" />
        <div>
          <p class="text-sm font-medium text-gray-600">Percentage</p>
          <p class="text-lg font-semibold">{{ Math.max((exam.result.marks / exam.total_marks) * 100, 0).toFixed(2) || 0
            }}%</p>
        </div>
      </div>

      <!-- Status -->
      <div class="flex items-center justify-center bg-white px-4 py-4 rounded-xl shadow-md col-span-2 ">
        <Icon size="32" name="fluent-emoji-flat:rocket" class="mr-4" />
        <div>
          <p class="text-sm font-medium text-gray-600">Status</p>
          <p class="text-lg font-semibold">
            {{
              exam.result.submitted
                ? (exam.result.marks >= exam.pass_marks ? 'Pass' : 'Fail')
                : 'Not Attempted'
            }}
          </p>
        </div>
      </div>
    </div>
    <template v-if="exam.question.body.sections && exam.question.body.sections.length">
      <div v-for="(section, index) in exam.question.body.sections" :key="index + section.title">
        <div v-for="(question, i) in section.questions" :key="i">
          <h2 class="text-[20px]">{{ i + 1 }}. <span v-katex="question.question" class="latex"></span></h2>
          <div class="flex justify-center py-2" v-if="question.question_image">
            <img class="w-[80%] md:w-[60%] rounded-md" :src="question.question_image" alt="" />
          </div>
          <div v-for="(option, index) in ['a', 'b', 'c', 'd', 'e']" :key="index"
            :class="checkAnswer(section.title, question, option)" class="option">
            <div class="flex justify-between items-center pr-2">
              <div v-if="question[option] && question[option].length" class="p-3">
                {{ option }}. <span v-katex="question[option]" class="latex"></span>
              </div>
              <div v-if="question[option] && question[option].length">
                <div v-html="setIcon(section.title, question, option)"></div>
              </div>
            </div>
          </div>
          <!-- <div class="explanation p-4 rounded-md mb-3" v-if="question.explanation">
            <p><span class="text-[#079F95]">ব্যাখা: </span> <span v-katex="findNewLine(question.explanation)"
                class="latex"></span></p>
            <div class="py-4 flex justify-center">
              <img :src="question.answer_image" alt="">
            </div>
          </div> -->

          <!-- Show explanation if either exists -->
          <div v-if="question.explanation || question.answer_image" class="explanation p-4 rounded-md mb-3">

            <!-- Show label only if one or both exist -->
            <p class="text-[#079F95] font-bold mb-2">ব্যাখা:</p>

            <!-- Show explanation if it exists -->
            <p v-if="question.explanation" class="mb-4">
              <span v-katex="findNewLine(question.explanation)" class="latex"></span>
            </p>

            <!-- Show answer image if it exists -->
            <div v-if="question.answer_image" class="py-4 flex justify-center">
              <img :src="question.answer_image" alt="Answer Image">
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  exam: { type: Object, required: true },
});
// const userAnswer = computed(() => props.exam.result.answers);
const userAnswer = ref(props.exam.result.answers);

const calculateMinuteAndSeconds = (seconds) => {
  return moment.utc(seconds * 1000).format("HH:mm:ss");
};

const checkAnswer = (section_title, question, option) => {
  const section = userAnswer.value.find((item) => item.title === section_title);
  if (!section) {
    return option === question.answer ? "not-answered" : "";
  }
  const answer = section.answers.find((el) => el.mcq_id === question.id);
  if (!answer) {
    return option === question.answer ? "not-answered" : "";
  }
  return option === question.answer
    ? "correct-answer"
    : option === answer.user_answer
      ? "wrong-answer"
      : "";
};

const setIcon = (section_title, question, option) => {
  const section = userAnswer.value.find((item) => item.title === section_title);
  if (!section) {
    return option === question.answer ? "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
      "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12ZM12 7.75C11.379 7.75 10.875 8.254 10.875 8.875C10.875 9.07391 10.796 9.26468 10.6553 9.40533C10.5147 9.54598 10.3239 9.625 10.125 9.625C9.92609 9.625 9.73532 9.54598 9.59467 9.40533C9.45402 9.26468 9.375 9.07391 9.375 8.875C9.37501 8.44494 9.48069 8.02146 9.68274 7.64182C9.88479 7.26218 10.177 6.93799 10.5337 6.69777C10.8905 6.45754 11.3007 6.30865 11.7285 6.26416C12.1562 6.21968 12.5884 6.28098 12.9869 6.44266C13.3854 6.60435 13.7381 6.86147 14.0139 7.19142C14.2898 7.52137 14.4803 7.91403 14.5688 8.33489C14.6573 8.75575 14.6411 9.19191 14.5215 9.60501C14.4019 10.0181 14.1826 10.3955 13.883 10.704C13.791 10.799 13.703 10.887 13.619 10.971C13.4159 11.1644 13.2252 11.3705 13.048 11.588C12.828 11.87 12.75 12.077 12.75 12.25V13C12.75 13.1989 12.671 13.3897 12.5303 13.5303C12.3897 13.671 12.1989 13.75 12 13.75C11.8011 13.75 11.6103 13.671 11.4697 13.5303C11.329 13.3897 11.25 13.1989 11.25 13V12.25C11.25 11.595 11.555 11.064 11.864 10.667C12.093 10.373 12.38 10.087 12.614 9.853C12.684 9.783 12.75 9.718 12.807 9.659C12.9611 9.5004 13.0651 9.2999 13.1059 9.08255C13.1467 8.8652 13.1225 8.64065 13.0364 8.43696C12.9503 8.23326 12.8061 8.05947 12.6217 7.93729C12.4374 7.81511 12.2211 7.74997 12 7.75ZM12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16C13 15.7348 12.8946 15.4804 12.7071 15.2929C12.5196 15.1054 12.2652 15 12 15C11.7348 15 11.4804 15.1054 11.2929 15.2929C11.1054 15.4804 11 15.7348 11 16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17Z\" fill=\"#FF0000\"/>\n" +
      "</svg>" : "";
  }
  const answer = section.answers.find((el) => el.mcq_id === question.id);
  if (!answer) {
    return option === question.answer ? "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
      "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12ZM12 7.75C11.379 7.75 10.875 8.254 10.875 8.875C10.875 9.07391 10.796 9.26468 10.6553 9.40533C10.5147 9.54598 10.3239 9.625 10.125 9.625C9.92609 9.625 9.73532 9.54598 9.59467 9.40533C9.45402 9.26468 9.375 9.07391 9.375 8.875C9.37501 8.44494 9.48069 8.02146 9.68274 7.64182C9.88479 7.26218 10.177 6.93799 10.5337 6.69777C10.8905 6.45754 11.3007 6.30865 11.7285 6.26416C12.1562 6.21968 12.5884 6.28098 12.9869 6.44266C13.3854 6.60435 13.7381 6.86147 14.0139 7.19142C14.2898 7.52137 14.4803 7.91403 14.5688 8.33489C14.6573 8.75575 14.6411 9.19191 14.5215 9.60501C14.4019 10.0181 14.1826 10.3955 13.883 10.704C13.791 10.799 13.703 10.887 13.619 10.971C13.4159 11.1644 13.2252 11.3705 13.048 11.588C12.828 11.87 12.75 12.077 12.75 12.25V13C12.75 13.1989 12.671 13.3897 12.5303 13.5303C12.3897 13.671 12.1989 13.75 12 13.75C11.8011 13.75 11.6103 13.671 11.4697 13.5303C11.329 13.3897 11.25 13.1989 11.25 13V12.25C11.25 11.595 11.555 11.064 11.864 10.667C12.093 10.373 12.38 10.087 12.614 9.853C12.684 9.783 12.75 9.718 12.807 9.659C12.9611 9.5004 13.0651 9.2999 13.1059 9.08255C13.1467 8.8652 13.1225 8.64065 13.0364 8.43696C12.9503 8.23326 12.8061 8.05947 12.6217 7.93729C12.4374 7.81511 12.2211 7.74997 12 7.75ZM12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16C13 15.7348 12.8946 15.4804 12.7071 15.2929C12.5196 15.1054 12.2652 15 12 15C11.7348 15 11.4804 15.1054 11.2929 15.2929C11.1054 15.4804 11 15.7348 11 16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17Z\" fill=\"#FF0000\"/>\n" +
      "</svg>" : "";
  }
  return option === question.answer
    ? "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "<path d=\"M10 20.0009C4.48 19.9949 0.006 15.5209 0 10.0009V9.80088C0.11 4.30588 4.635 -0.0711243 10.13 0.000875677C15.627 0.0748757 20.034 4.56988 19.998 10.0659C19.962 15.5629 15.497 20.0009 10 20.0009ZM5.41 9.59088L4 11.0009L8 15.0009L16 7.00088L14.59 5.58088L8 12.1709L5.41 9.59088Z\" fill=\"#14AE5C\"/>\n" +
    "</svg>"
    : option === answer.user_answer
      ? "<svg width=\"21\" height=\"22\" viewBox=\"0 0 21 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
      "<path d=\"M18.0996 3.89961C14.1996 -0.000390567 7.79961 -0.000390567 3.89961 3.89961C-0.000390676 7.79961 -0.000390676 14.1996 3.89961 18.0996C7.79961 21.9996 14.0996 21.9996 17.9996 18.0996C21.8996 14.1996 21.9996 7.79961 18.0996 3.89961ZM13.7996 15.1996L10.9996 12.3996L8.19961 15.1996L6.79961 13.7996L9.59961 10.9996L6.79961 8.19961L8.19961 6.79961L10.9996 9.59961L13.7996 6.79961L15.1996 8.19961L12.3996 10.9996L15.1996 13.7996L13.7996 15.1996Z\" fill=\"#FF0000\"/>\n" +
      "</svg>"
      : "";
};
const findNewLine = (text) => {
  let isAlive = text.includes("\n");
  let string = ''
  if (isAlive) {
    const textArray = text.split('\n')
    textArray.forEach(el => {
      string += `<p>${el}</p>`
    });
    return string
  }
  return text
}
</script>
<style lang="scss" scoped>
@mixin backgroundBorder($color, $border-color) {
  background-color: $color;
  border: 0.5px solid $border-color;
  border-radius: 5px;
}

.explanation {
  background-color: rgba(247, 148, 29, 0.15);
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