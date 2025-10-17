<script setup>
import { ref } from 'vue';

// Define the reactive data for the FAQs
const faqs = ref([
  {
    id: 1,
    question: 'What is Yellow Book?',
    answer: 'Yellow Book is a platform where users can discover, review, and connect with companies from different categories such as travel agencies, restaurants, and more.',
    open: true,
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
  <div class="w-full relative flex flex-col items-center gap-[44px] text-center text-[30px] text-[#212121] font-['Plus_Jakarta_Sans'] mt-20 mb-7">
    <div class="self-stretch flex flex-col items-start gap-4">
      <div class="self-stretch relative leading-[126%] capitalize font-semibold">frequently Asked Questions</div>
      <div class="self-stretch relative text-[16px] leading-[160%] capitalize font-medium text-[#9e9e9e]">Everything you need to know about using Yellow Book.</div>
    </div>
    
    <div class="w-[588px] flex flex-col items-start gap-4 text-[18px]">
      <div 
        v-for="faq in faqs" 
        :key="faq.id" 
        class="self-stretch rounded-[8px] bg-[#feecb2] flex flex-col items-start transition-all duration-300 cursor-pointer"
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

<style>
/* Responsive Media Queries */
@media (max-width: 1200px) {
  .w-full\.relative\.flex\.flex-col\.items-center\.gap-\[44px\] {
    margin-top: 60px;
  }
  .w-\[588px\] {
    width: 100%;
    max-width: 588px;
  }
}

@media (max-width: 992px) {
  .w-full\.relative\.flex\.flex-col\.items-center\.gap-\[44px\] {
    gap: 36px;
    font-size: 28px;
    margin-top: 50px;
  }
  .w-\[588px\] {
    font-size: 16px;
  }
  .w-11\.h-11 {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 768px) {
  .w-full\.relative\.flex\.flex-col\.items-center\.gap-\[44px\] {
    gap: 32px;
    font-size: 24px;
    margin-top: 40px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .w-\[588px\] {
    width: 100%;
  }
  .self-stretch\.rounded-\[8px\]\.bg-\[#feecb2\] {
    padding: 12px 16px;
  }
  .w-11\.h-11 {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 576px) {
  .w-full\.relative\.flex\.flex-col\.items-center\.gap-\[44px\] {
    gap: 28px;
    font-size: 22px;
    margin-top: 30px;
    padding: 0 15px;
  }
  .w-\[588px\] {
    font-size: 16px;
    gap: 12px;
  }
  .self-stretch\.rounded-\[8px\]\.bg-\[#feecb2\] {
    padding: 10px 14px;
  }
  .relative\.leading-\[160\%\]\.capitalize\.font-semibold {
    font-size: 16px;
  }
  .w-11\.h-11 {
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 480px) {
  .w-full\.relative\.flex\.flex-col\.items-center\.gap-\[44px\] {
    font-size: 20px;
    margin-top: 25px;
    padding: 0 10px;
  }
  .w-\[588px\] {
    font-size: 15px;
  }
  .self-stretch\.relative\.text-\[16px\]\.leading-\[160\%\] {
    font-size: 14px;
  }
  .self-stretch\.flex\.items-center\.py-\[10px\] {
    font-size: 14px;
  }
}
</style>