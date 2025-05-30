<template>
    <div class="relative pb-0 set_bg overflow-hidden">
      <Container>
        <div class="text-center pt-[140px] md:pt-[150px] relative z-10">
          <h2 class="text-white text-[32px] md:text-[46px] font-bold mb-8 leading-tight">
            সবার থেকে সেরা <br> 
            <span class="relative inline-block">
              আমাদের কারিগরি
            </span>
            <span class="bg-[#FF7A00] rounded-md px-3 py-2 ml-2 inline-block transform hover:scale-105 transition-transform duration-300">
              পাঠশালা
            </span>
          </h2>
          
          <!-- Decorative elements -->
          <div class="absolute top-1/4 left-10 w-20 h-20 bg-[#FF7A00] rounded-full filter blur-3xl opacity-20 -z-10"></div>
          <div class="absolute bottom-1/4 right-10 w-24 h-24 bg-[#1A1475] rounded-full filter blur-3xl opacity-20 -z-10"></div>
        </div>
      </Container>
      
      <!-- Floating decorative elements -->
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#02031C] to-transparent z-10"></div>
    </div>
  </template>
  
  <script setup>
  import Container from "~/components/common/Container.vue";
  </script>
  
  <style scoped>
  .set_bg {
    background: linear-gradient(180deg, #02031C 0%, #2F2B2B 100%);
    padding-bottom: 16rem;
    position: relative;
  }
  
  .set_bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to bottom, rgba(2,3,28,0.9), transparent);
    z-index: 1;
  }
  
  /* Animation for the floating elements */
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  
  .floating {
    animation: float 6s ease-in-out infinite;
  }
  </style>