<template>
  <div class="w-full relative overflow-hidden flex-shrink-0 text-left text-base text-[#616161] font-['Plus_Jakarta_Sans']">
    <div class="absolute bottom-0 left-[calc(50%-4744px)] rounded-full bg-[#fff9e6] w-[9487px] h-[9487px]" />
    
    <!-- Navbar -->
    <div class="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-[120px] py-4 sm:py-6 flex flex-col">
      <div class="flex items-center justify-between mb-6 sm:mb-12 md:mb-16">
        <!-- Logo -->
        <div class="w-[120px] sm:w-[118px] md:w-[118px] rounded-[4px] flex flex-col items-start p-2 box-border">
          <img class="self-stretch max-w-full overflow-hidden h-[34px] sm:h-[30px] md:h-[30px] flex-shrink-0 object-cover" src="/logo/logo.png" alt="Logo" />
        </div>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center gap-8">
          <div class="flex flex-col items-center gap-[4px] text-[#212121] cursor-pointer">
            <div class="relative leading-[160%] font-medium text-base">Category</div>
            <div class="w-[30px] bg-[#212121] h-[2px]"></div>
          </div>
          <div class="flex items-center justify-center cursor-pointer">
            <div class="relative leading-[160%] font-normal text-base text-[#616161]">Popular Listing</div>
          </div>
          <div class="flex items-center justify-center cursor-pointer">
            <div class="relative leading-[160%] font-normal text-base text-[#616161]">FAQ</div>
          </div>
        </div>

        <!-- Desktop Actions -->
        <div class="hidden lg:flex items-center gap-6 text-[#212121]">
          <div class="flex items-center justify-center cursor-pointer" @click="openLoginModal">
            <div class="relative leading-[160%] font-normal text-base">Login</div>
          </div>
          <div class="relative rounded border-gray border-solid border-[1px] box-border w-full h-12 flex items-center justify-center py-[18px] px-9 text-center text-base text-gray font-plus-jakarta-sans">
            <div class="relative leading-[130%] capitalize font-semibold">List Your Agency</div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
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

      <!-- Mobile Sidebar Overlay -->
      <transition name="overlay">
        <div 
  v-if="isMobileMenuOpen" 
  @click="toggleMobileMenu"
  class="lg:hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-white/80 backdrop-blur-sm z-40 rounded-2xl"
></div>
      </transition>

      <!-- Mobile Sidebar -->
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

      <!-- Hero + Search -->
      <div class="flex-1 flex justify-center items-center py-4 sm:py-6 md:py-8">
        <div class="max-w-[676px] w-full mx-auto flex flex-col items-center gap-4 sm:gap-6 text-center text-[#212121]">

          <!-- Heading + Paragraph -->
          <div class="w-full flex flex-col items-center justify-center gap-3 px-4 text-center">
            <h1 class="w-full font-medium capitalize text-[#212121] leading-[130%] mb-2 sm:mb-3"
              style="font-size: clamp(1.8rem, 4vw, 2.9rem);">
              Trusted Help, Right When<br class="hidden sm:block"/>You Need It
            </h1>
            <p class="w-full max-w-[536px] capitalize text-[#616161] leading-[150%]"
              style="font-size: clamp(0.9rem, 2vw, 1.25rem);">
              Reliable support from real people, solving everyday problems with care, speed, and integrity.
            </p>
          </div>

          <!-- Search Box -->
          <div ref="searchContainer" class="w-full relative px-4">
            <div class="backdrop-blur-[16px] rounded-[12px] sm:rounded-[16px] bg-[#feecb2] flex flex-row items-center p-2 sm:p-3 gap-2 sm:gap-3 md:gap-[20px] text-[14px] sm:text-[16px]">

              <!-- Input -->
              <div class="flex-1 rounded-[8px] bg-[#fff9e6] flex flex-col items-start justify-center p-[10px] min-h-[44px] sm:min-h-[48px]">
                <div class="w-full flex items-center">
                  <div class="relative leading-[160%] capitalize truncate text-sm sm:text-base md:text-base">{{ selectedSearch }}</div>
                </div>
              </div>

              <!-- Button -->
              <div 
                class="relative rounded-lg bg-gold border-goldenrod border-solid border-b-[2px] box-border flex items-center justify-center p-2.5 gap-2 text-center text-base sm:text-lg text-gray font-plus-jakarta-sans cursor-pointer min-w-[120px]"
                @click="toggleDropdown"
              >
                <div class="relative leading-[160%] capitalize font-medium">Search</div>
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>

            </div>

            <!-- Fixed Dropdown -->
            <transition name="dropdown">
              <div 
                v-if="showDropdown" 
                class="fixed left-4 right-4 rounded-[8px] border border-[#fee38d] overflow-hidden bg-white shadow-2xl z-[10000] max-h-[200px] sm:max-h-[250px] md:max-h-[300px] overflow-y-auto"
                :style="{ top: dropdownTop + 'px' }"
              >
                <div 
                  v-for="(item, index) in searchData" 
                  :key="index" 
                  @click="selectSearch(item)" 
                  :class="[
                    'w-full h-[50px] flex items-center px-4 cursor-pointer transition-all text-sm md:text-[14px] hover:bg-[#f8f9fa] border-b border-[#e0e0e0] last:border-b-0',
                    index === 0 ? 'bg-[#f6fafd]' : 'bg-white'
                  ]"
                >
                  <span class="leading-[170%] capitalize text-left w-full">{{ item }}</span>
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
        'Nomadic Travel','Altai Tours','Steppe Adventure','Discover Mongolia',
        'Desert Expeditions','Mountain Hiking','Cultural Tours','Wildlife Safari',
        'City Exploration','Beach Resort'
      ],
      dropdownTop: 0
    }
  },
  watch: {
    showDropdown(val) {
      document.body.style.overflow = val || this.isMobileMenuOpen ? 'hidden' : 'auto';
    },
    isMobileMenuOpen(val) {
      document.body.style.overflow = val || this.showDropdown ? 'hidden' : 'auto';
    }
  },
  methods: {
    toggleDropdown(){ 
      if (!this.showDropdown) {
        const searchContainer = this.$refs.searchContainer;
        if (searchContainer) {
          const rect = searchContainer.getBoundingClientRect();
          this.dropdownTop = rect.bottom + window.scrollY + 10;
        }
      }
      this.showDropdown = !this.showDropdown; 
    },
    selectSearch(item){ 
      this.selectedSearch = item; 
      this.showDropdown = false; 
    },
    openLoginModal(){ this.showLoginModal = true; this.isMobileMenuOpen = false; },
    closeLoginModal(){ this.showLoginModal = false; },
    toggleMobileMenu(){ this.isMobileMenuOpen = !this.isMobileMenuOpen; }
  },
  mounted(){
    document.addEventListener('click', (e)=>{
      const searchContainer = this.$refs.searchContainer;
      if(searchContainer && !searchContainer.contains(e.target)) this.showDropdown = false;
    });
  },
  beforeUnmount(){
    document.removeEventListener('click', ()=>{});
    document.body.style.overflow = 'auto';
  }
}
</script>

<style scoped>
/* Transition */
.overlay-enter-active, .overlay-leave-active{ transition: opacity 0.3s ease; }
.overlay-enter-from, .overlay-leave-to{ opacity:0; }
.slide-enter-active{ transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); }
.slide-leave-active{ transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); }
.slide-enter-from{ transform: translateX(100%); }
.slide-leave-to{ transform: translateX(100%); }
.dropdown-enter-active{ transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
.dropdown-leave-active{ transition: all 0.2s cubic-bezier(0.4,0,0.2,1); }
.dropdown-enter-from{ transform: translateY(-10px); opacity:0; }
.dropdown-leave-to{ transform: translateY(-10px); opacity:0; }

/* Scrollbar Styling */
.overflow-y-auto::-webkit-scrollbar{ width:6px; }
.overflow-y-auto::-webkit-scrollbar-track{ background:#f1f1f1;border-radius:3px; }
.overflow-y-auto::-webkit-scrollbar-thumb{ background:#fcc207;border-radius:3px; }
.overflow-y-auto::-webkit-scrollbar-thumb:hover{ background:#e5b106; }
</style>
