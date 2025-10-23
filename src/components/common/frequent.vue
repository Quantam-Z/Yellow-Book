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
  <div class="w-full relative flex flex-col items-center gap-16 text-center text-[#212121] font-['Plus_Jakarta_Sans'] mt-24 mb-16 px-4">
    <div class="w-full max-w-4xl flex flex-col items-center gap-6">
      <div class="text-4xl sm:text-5xl lg:text-6xl leading-[120%] capitalize font-bold bg-gradient-to-r from-[#212121] to-[#616161] bg-clip-text text-transparent">Frequently Asked Questions</div>
      <div class="text-lg sm:text-xl lg:text-2xl leading-[140%] text-[#9e9e9e] font-medium max-w-2xl">Everything you need to know about using Yellow Book.</div>
    </div>
    
    <div class="w-full max-w-4xl flex flex-col items-start gap-6 text-lg">
      <div 
        v-for="faq in faqs" 
        :key="faq.id" 
        class="w-full rounded-2xl bg-gradient-to-r from-[#feecb2] to-[#fff9e6] flex flex-col items-start transition-all duration-500 cursor-pointer shadow-lg hover:shadow-xl"
        :class="faq.open ? 'p-6 gap-4' : 'p-6 gap-0'"
      >
        <div 
          class="w-full flex items-center justify-between gap-4"
          @click="toggleFaq(faq.id)"
          role="button"
          :aria-expanded="faq.open"
          :aria-controls="`faq-answer-${faq.id}`"
        >
          <div class="relative leading-[140%] capitalize font-bold text-left flex-grow text-xl text-[#212121]">{{ faq.question }}</div>
          
          <div class="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 hover:scale-110"
               :class="{ 'rotate-180': !faq.open }">
            <svg 
              class="w-6 h-6 text-[#212121]"
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
            </svg>
          </div>
        </div>
        
        <div 
          v-if="faq.open"
          :id="`faq-answer-${faq.id}`"
          class="w-full flex items-start py-4 text-left text-lg text-[#424242] leading-relaxed"
        >
          <div class="flex-1 relative font-medium">{{ faq.answer }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Enhanced responsive design with better mobile experience */
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