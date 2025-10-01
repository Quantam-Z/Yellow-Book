
<template>
    <div class="w-full relative mobile-height overflow-hidden flex-shrink-0 text-left text-base text-[#616161] font-['Plus_Jakarta_Sans']">
        <div class="absolute bottom-0 left-[calc(50%-4744px)] rounded-full bg-[#fff9e6] w-[9487px] h-[9487px]" />
        <div class="relative z-10 w-full h-full px-4 sm:px-6 md:px-12 lg:px-[120px] py-4 sm:py-6 flex flex-col">
          <div class="flex items-center justify-between mb-6 sm:mb-12 md:mb-16">
          <div class="w-[120px] sm:w-[118px] md:w-[118px] rounded-[4px] bg-white flex flex-col items-start p-2 box-border">
            <img class="self-stretch max-w-full overflow-hidden h-[34px] sm:h-[30px] md:h-[30px] flex-shrink-0 object-cover" src="/logo/logo.png" alt="Logo" />
          </div>
  
          <div class="hidden lg:flex items-center">
            <div class="w-[120px] flex flex-col items-center py-1 box-border gap-[10px] text-[#212121]">
              <div class="relative leading-[160%] capitalize font-semibold text-base">Category</div>
              <div class="w-[37px] relative rounded-[2px] bg-[#212121] h-[2px]" />
            </div>
            <div class="h-[32px] flex items-start justify-center p-1 box-border">
              <div class="relative leading-[160%] capitalize font-medium text-base">Popular listing</div>
            </div>
            <div class="w-[120px] h-[32px] flex items-start justify-center p-1 box-border text-center">
              <div class="relative leading-[160%] capitalize font-medium text-base">FAQ</div>
            </div>
          </div>
  
          <div class="hidden lg:flex items-center gap-[17px] text-[#212121]">
            <div class="self-stretch rounded-[4px] flex items-center justify-center p-4 cursor-pointer hover:bg-gray-100 transition-colors" @click="openLoginModal">
              <div class="relative leading-[160%] capitalize font-medium text-base">Login</div>
            </div>
            <div class="w-full h-12 flex items-center justify-center border border-black rounded-md box-border px-9 py-4 text-center text-base text-black font-semibold font-sans">
    List Your Agency
  </div>
          </div>
  
          <button 
            @click="toggleMobileMenu" 
            class="lg:hidden p-2 rounded-md hover:bg-white/50 transition-all z-50 relative"
            aria-label="Toggle menu"
          >
            <svg v-if="!isMobileMenuOpen" class="w-6 h-6 text-[#212121]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6 text-[#212121]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
  
        <transition name="overlay">
          <div 
            v-if="isMobileMenuOpen" 
            @click="toggleMobileMenu"
            class="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          ></div>
        </transition>
  
        <transition name="slide">
          <div 
            v-if="isMobileMenuOpen" 
            class="lg:hidden fixed top-0 right-0 h-screen w-[80vw] max-w-[400px] bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div class="p-6 h-full flex flex-col">
              <div class="flex justify-end mb-8">
                <button @click="toggleMobileMenu" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
  
              <nav class="flex-1 flex flex-col space-y-2 text-lg">
                <a href="#" class="py-4 px-4 text-[#212121] font-semibold hover:bg-[#fff9e6] rounded-lg transition-colors border-b border-gray-100">Category</a>
                <a href="#" class="py-4 px-4 text-[#616161] hover:bg-[#fff9e6] rounded-lg transition-colors border-b border-gray-100">Popular listing</a>
                <a href="#" class="py-4 px-4 text-[#616161] hover:bg-[#fff9e6] rounded-lg transition-colors border-b border-gray-100">FAQ</a>
              </nav>
  
              <div class="space-y-3 mt-auto pt-6 border-t border-gray-200">
                <button @click="openLoginModal" class="w-full py-3 px-6 text-[#212121] font-semibold text-lg border-2 border-[#212121] rounded-lg hover:bg-[#212121] hover:text-white transition-all">
                  Login
                </button>
                <button class="w-full py-3 px-6 bg-[#fcc207] text-[#212121] font-semibold text-lg rounded-lg border-b-2 border-[#e5b106] hover:bg-[#e5b106] transition-all">
                  List Your Agency
                </button>
              </div>
            </div>
          </div>
        </transition>
  
        <div class="flex-1 flex justify-center mt-10 lg:mt-0" :class="['items-start', 'lg:items-center']">
          <div class="max-w-[676px] w-full mx-auto flex flex-col items-center gap-6 sm:gap-8 text-center text-[#212121]">
            <div class="w-full flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-[26px]">
                <h1 class="w-full text-3xl sm:text-4xl md:text-[46px] leading-[170%] capitalize font-medium px-4">
    Trusted Help, Right When<br>You Need It
</h1>
              <p class="w-full max-w-[536px] text-sm sm:text-base md:text-lg leading-[130%] capitalize text-[#616161] px-4">
                Reliable support from real people, solving everyday problems with care, speed, and integrity.
              </p>
            </div>
  
            <div ref="searchContainer" class="w-full relative px-4">
              <div class="backdrop-blur-[16px] rounded-[12px] sm:rounded-[16px] bg-[#feecb2] flex flex-row items-center p-2 sm:p-3 md:p-3 gap-2 sm:gap-3 md:gap-[20px] text-[14px] sm:text-[16px] md:text-[16px]">
                <div class="flex-1 rounded-[8px] bg-[#fff9e6] flex flex-col items-start justify-center p-[10px] min-h-[44px] sm:min-h-[48px]">
                  <div class="w-full flex items-center">
                    <div class="relative leading-[160%] capitalize truncate text-sm sm:text-base md:text-base">{{ selectedSearch }}</div>
                  </div>
                </div>
                <button class="rounded-[8px] bg-[#fcc207] border-b-2 border-[#e5b106] flex items-center justify-center p-[10px] gap-2 text-[14px] sm:text-[16px] md:text-[16px] cursor-pointer hover:bg-[#e5b106] transition-all active:scale-95 min-h-[44px] sm:min-h-[48px] font-medium w-auto flex-shrink-0" @click="toggleDropdown">
                  <span class="relative leading-[160%] capitalize">Search</span>
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </button>
              </div>
  
              <transition name="dropdown">
                <div v-if="showDropdown" class="absolute top-full mt-2 left-4 right-4 rounded-[8px] border border-[#fee38d] overflow-hidden bg-white shadow-xl z-20 max-h-[200px] sm:max-h-[250px] md:max-h-[300px] overflow-y-auto">
                  <div v-for="(item, index) in searchData" :key="index" @click="selectSearch(item)" :class="[
                      'w-full h-[40px] sm:h-[44px] flex items-center px-3 sm:px-4 cursor-pointer transition-all text-xs sm:text-sm md:text-[14px] active:scale-[0.98]',
                      index === 0 ? 'bg-[#f6fafd] hover:bg-[#e3f2fd]' : 'bg-[#fafafa] hover:bg-[#f0f0f0]',
                      index !== searchData.length - 1 ? 'border-b border-[#e0e0e0]' : ''
                    ]">
                    <div class="leading-[170%] capitalize">{{ item }}</div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
  
      </div>
  
      <LoginModal :isOpen="showLoginModal" @close="closeLoginModal" />
    </div>
  </template>
  
  <script>
  import LoginModal from '~/components/common/LoginModal.vue'
  export default {
    name: 'ResponsiveLandingPage',
    components: { LoginModal },
    data() {
      return {
        showDropdown: false,
        selectedSearch: 'Nomadic Travel',
        showLoginModal: false,
        isMobileMenuOpen: false,
        searchData: [
          'Nomadic Travel','Altai Tours','Steppe Adventure','Discover Mongolia','Desert Expeditions','Mountain Hiking','Cultural Tours','Wildlife Safari','City Exploration','Beach Resort'
        ]
      }
    },
    methods: {
      toggleDropdown(){ this.showDropdown=!this.showDropdown; },
      selectSearch(item){ this.selectedSearch=item; this.showDropdown=false; },
      openLoginModal(){ this.showLoginModal=true; this.isMobileMenuOpen=false; },
      closeLoginModal(){ this.showLoginModal=false; },
      toggleMobileMenu(){ this.isMobileMenuOpen=!this.isMobileMenuOpen; }
    },
    mounted(){
      document.addEventListener('click', (e)=>{
        const searchContainer=this.$refs.searchContainer;
        if(searchContainer&&!searchContainer.contains(e.target)) this.showDropdown=false;
      });
    },
    beforeUnmount(){
      document.removeEventListener('click', ()=>{});
    }
  }
  </script>
  
  <style scoped>
  .mobile-height { height: 100vh; min-height: 100vh; }
  @media (max-width: 1023px) { 
    .mobile-height { 
        height: 50vh; 
        min-height: 50vh; 
    } 
  }
  
  /* Overlay Transition */
  .overlay-enter-active, .overlay-leave-active{ transition: opacity 0.3s ease; }
  .overlay-enter-from, .overlay-leave-to{ opacity:0; }
  
  /* Slide Transition */
  .slide-enter-active{ transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); }
  .slide-leave-active{ transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); }
  .slide-enter-from{ transform: translateX(100%); }
  .slide-leave-to{ transform: translateX(100%); }
  
  /* Dropdown Transition */
  .dropdown-enter-active{ transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
  .dropdown-leave-active{ transition: all 0.2s cubic-bezier(0.4,0,0.2,1); }
  .dropdown-enter-from{ transform: translateY(-10px); opacity:0; }
  .dropdown-leave-to{ transform: translateY(-10px); opacity:0; }
  
  /* Scrollbar Styling */
  .overflow-y-auto::-webkit-scrollbar{ width:6px; }
  .overflow-y-auto::-webkit-scrollbar-track{ background:#f1f1f1;border-radius:3px; }
  .overflow-y-auto::-webkit-scrollbar-thumb{ background:#fcc207;border-radius:3px; }
  .overflow-y-auto::-webkit-scrollbar-thumb:hover{ background:#e5b106; }
  
  /* Body Lock */
  body.menu-open{ overflow:hidden; }
  </style>