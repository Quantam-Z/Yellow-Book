<script setup>
import { ref } from 'vue';

const faqs = ref([
  {
    id: 1,
    question: 'What is Yellow Book?',
    answer:
      'Yellow Book is a platform where users can discover, review, and connect with companies from different categories such as travel agencies, restaurants, and more.',
    open: true,
  },
  {
    id: 2,
    question: 'How can I register my company?',
    answer:
      'You can register your company by navigating to the "Register" section, filling out the company profile form, and submitting it for verification by our team.',
    open: false,
  },
  {
    id: 3,
    question: 'Are all companies verified?',
    answer:
      'We have a multi-step verification process for all listed companies, including checking legal documents and contact information to ensure reliability and user trust.',
    open: false,
  },
  {
    id: 4,
    question: 'How do reviews work?',
    answer:
      'Users can submit reviews for companies they have interacted with. Reviews are moderated for fairness and relevance before being published. Companies can respond to reviews directly.',
    open: false,
  },
]);

function toggleFaq(faqId) {
  faqs.value = faqs.value.map((faq) =>
    faq.id === faqId ? { ...faq, open: !faq.open } : faq
  );
}
</script>

<template>
  <div class="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center gap-6 sm:gap-8 text-center text-[#212121] font-['Plus_Jakarta_Sans'] mt-12 sm:mt-16 mb-6">
    <div class="self-stretch flex flex-col items-start gap-2 sm:gap-3">
      <h2 class="text-2xl sm:text-3xl lg:text-[30px] leading-[126%] capitalize font-semibold">
        Frequently Asked Questions
      </h2>
      <p class="text-sm sm:text-base leading-[160%] capitalize font-medium text-[#9e9e9e]">
        Everything you need to know about using Yellow Book.
      </p>
    </div>

    <div class="w-full max-w-3xl flex flex-col items-stretch gap-3 sm:gap-4">
      <div
        v-for="faq in faqs"
        :key="faq.id"
        class="rounded-[8px] bg-[#feecb2] transition-all duration-300 cursor-pointer text-left"
      >
        <button
          type="button"
          class="w-full flex items-center justify-between gap-3 p-4 sm:p-5"
          @click="toggleFaq(faq.id)"
          :aria-expanded="faq.open"
          :aria-controls="`faq-answer-${faq.id}`"
        >
          <span class="font-semibold leading-[160%] capitalize">{{ faq.question }}</span>
          <svg
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-[22px] bg-white p-2.5 text-[#212121] transition-transform duration-300 flex-shrink-0"
            :class="{ 'rotate-180': !faq.open }"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          </svg>
        </button>

        <div v-if="faq.open" :id="`faq-answer-${faq.id}`" class="px-4 sm:px-5 pb-4 sm:pb-5">
          <p class="text-sm sm:text-base text-[#424242] leading-[160%] capitalize">
            {{ faq.answer }}
          </p>
        </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
/* Tailwind-first styling; no breakpoint-specific class name hacks */
</style>
