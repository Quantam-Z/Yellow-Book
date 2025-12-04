<script setup>
import { ref } from 'vue';

// Define the reactive data for the FAQs
const faqs = ref([
  {
    id: 1,
    question: 'What is Yellow Book?',
    answer: 'Yellow Book is a platform where users can discover, review, and connect with companies from different categories such as travel agencies, restaurants, and more.',
    open: true, // Start the first one open
  },
  {
    id: 2,
    question: 'How can I register my company?',
    answer: 'You can register your company by navigating to the "Register" section, filling out the company profile form, and submitting it for verification by our team.',
    open: false,
  },
  {
    id: 3,
    question: 'Are all companies verified?',
    answer: 'We have a multi-step verification process for all listed companies, including checking legal documents and contact information to ensure reliability and user trust.',
    open: false,
  },
  {
    id: 4,
    question: 'How do reviews work?',
    answer: 'Users can submit reviews for companies they have interacted with. Reviews are moderated for fairness and relevance before being published. Companies can respond to reviews directly.',
    open: false,
  },
]);

const toggleFaq = (faqId) => {
  faqs.value = faqs.value.map(faq => {
    if (faq.id === faqId) {
      return { ...faq, open: !faq.open };
    }
    return faq;
  });
};
</script>

<template>
  <div class="faq-shell w-full flex flex-col items-center gap-6 text-center text-[30px] text-[#212121] font-['Plus_Jakarta_Sans'] mt-8 mb-7 px-4 sm:px-6 md:px-8">
    <div class="faq-container w-full max-w-[1372px] flex flex-col items-stretch gap-4 text-[18px] px-2 sm:px-0">
      <div 
        v-for="faq in faqs" 
        :key="faq.id" 
        class="faq-item self-stretch rounded-[8px] bg-[#feecb2] flex flex-col items-start transition-all duration-300 cursor-pointer"
        :class="faq.open ? 'p-[10px_16px] gap-1' : 'p-[10px_16px] gap-0'"
      >
        <div 
          class="self-stretch flex items-center justify-between gap-[10px]"
          @click="toggleFaq(faq.id)"
          role="button"
          :aria-expanded="faq.open"
          :aria-controls="`faq-answer-${faq.id}`"
        >
          <div class="relative leading-[160%] capitalize font-semibold text-left flex-grow">{{ faq.question }}</div>
          
          <svg 
            class="w-11 h-11 rounded-[22px] bg-white p-[10px] box-border text-[#212121] transition-transform duration-300 flex-shrink-0"
            :class="{ 'rotate-180': !faq.open }"
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
          </svg>
        </div>
        
        <div 
          v-if="faq.open"
          :id="`faq-answer-${faq.id}`"
          class="self-stretch flex items-center py-[10px] text-left text-[16px] text-[#424242]"
        >
          <div class="flex-1 relative leading-[160%] capitalize font-medium">{{ faq.answer }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-shell {
  max-width: 1372px;
  margin-left: auto;
  margin-right: auto;
}

.faq-container {
  width: 100%;
}

.faq-item {
  min-height: 113px;
}

@media (min-width: 1024px) {
  .faq-item {
    height: 113px;
  }
}

.faq-item svg {
  min-width: 44px;
  min-height: 44px;
}

@media (max-width: 640px) {
  .faq-shell {
    gap: 32px;
  }
  .faq-item {
    min-height: auto;
  }
}
</style>