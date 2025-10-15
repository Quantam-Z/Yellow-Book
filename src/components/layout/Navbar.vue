<template>
  <div class="w-full relative flex-shrink-0 text-left text-num-16 text-dimgray bg-oldlace rounded-sm font-plus-jakarta-sans pb-7 boat-bottom-radius overflow-hidden">
      
      <!-- oversized background circle to mirror template -->
      <div class="absolute bottom-0 left-[calc(50%_-_4744px)] rounded-[50%] bg-oldlace w-[9487px] h-[9487px]"></div>

      <div class="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-[120px] py-4 sm:py-6 flex flex-col gap-[77px]">
        <div class="flex items-center justify-between mb-6 sm:mb-12 md:mb-16">
        <div class="w-[120px] sm:w-[118px] md:w-[118px] rounded-[4px]  flex flex-col items-start p-2 box-border">
          <img class="self-stretch max-w-full overflow-hidden h-[34px] sm:h-[30px] md:h-[30px] flex-shrink-0 object-cover" src="/logo/logo.png" alt="Logo" />
        </div>

        <div class="hidden lg:flex items-center gap-8 navbar-links">
          <div
            v-for="(item, index) in effectiveMenuItems"
            :key="index"
            class="flex flex-col items-center gap-[4px] cursor-pointer"
          >
            <NuxtLink
              :to="item.to"
              class="relative leading-[160%] capitalize font-medium text-base no-underline"
              :class="isActive(item.to) ? 'text-gray-200' : 'text-dimgray font-normal'"
            >
              {{ item.label }}
            </NuxtLink>
            <div v-if="isActive(item.to)" class="w-[37px] h-0.5 bg-gray-200 rounded-sm"></div>
          </div>
        </div>

        <div class="hidden lg:flex items-center gap-6 text-gray-200">
          <div class="flex items-center justify-center cursor-pointer" @click="openLoginModal">
            <div class="relative leading-[160%] capitalize font-medium">Login</div>
          </div>
          <NuxtLink
            :to="ctaLink"
            class="h-12 rounded border-gray-200 border-solid border-[1px] box-border flex items-center justify-center py-[18px] px-9 text-center"
          >
            <div class="relative leading-[130%] capitalize font-semibold">List Your Agency</div>
          </NuxtLink>

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

            <nav class="flex-1 flex flex-col space-y-2 text-lg navbar-mobile">
              <NuxtLink
                v-for="(item, index) in effectiveMenuItems"
                :key="index"
                :to="item.to"
                @click="handleMobileNavigate"
                class="py-4 px-4 rounded-lg transition-colors border-b border-gray-100 no-underline"
                :class="isActive(item.to) ? 'text-[#212121] font-semibold bg-[#fff9e6]' : 'text-[#616161] hover:bg-[#fff9e6]'"
              >
                {{ item.label }}
              </NuxtLink>
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

      <div v-if="showHeroSection" class="flex-1 flex justify-center items-start">
  <div class="max-w-[676px] w-full mx-auto flex flex-col items-center gap-[35px] text-center text-gray-200">
    
    <div class="self-stretch flex flex-col items-center justify-center gap-[26px]">
      <h1 class="w-[574px] text-[46px] leading-[122%] capitalize font-medium hidden md:block">
        Trusted Help, Right When You Need It
      </h1>
      <h1 class="w-full text-3xl sm:text-4xl leading-[122%] capitalize font-medium md:hidden px-4">
        Trusted Help, Right When You Need It
      </h1>
      <p class="w-[536px] text-num-16 leading-[130%] capitalize text-dimgray hidden md:block">
        Reliable support from real people, solving everyday problems with care, speed, and integrity.
      </p>
      <p class="w-full max-w-[536px] text-sm sm:text-base leading-[130%] capitalize text-dimgray md:hidden px-4">
        Reliable support from real people, solving everyday problems with care, speed, and integrity.
      </p>
    </div>

    <div ref="searchContainer" class="self-stretch px-4 md:px-0 relative">
      <div class="self-stretch [backdrop-filter:blur(16px)] rounded-2xl bg-palegoldenrod flex items-center p-2 sm:p-3 md:p-4 gap-2 sm:gap-3 md:gap-6 text-num-14">

        <div class="self-stretch flex-1 rounded-num-8 bg-oldlace flex flex-col items-start justify-center p-num-10">
          <div class="w-full flex items-center">
            <div class="relative leading-[170%] capitalize">{{ selectedSearch }}</div>
          </div>
        </div>

        <div 
          class="rounded-num-8 bg-gold border-goldenrod border-solid border-b-[2px] flex items-center p-num-10 gap-2 text-[18px] cursor-pointer"
          @click="toggleDropdown"
        >
          <div class="relative leading-[160%] capitalize font-medium">Search</div>
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>

      </div>

      <transition name="dropdown">
        <div v-if="showDropdown" class="absolute top-full mt-2 left-4 right-4 md:left-0 md:right-0 rounded-num-8 border border-khaki overflow-hidden bg-white shadow-xl z-20 max-h-[300px] overflow-y-auto">
          <div v-for="(item, index) in searchData" :key="index" @click="selectSearch(item)" class="w-full h-11 flex items-center px-4 cursor-pointer transition-colors text-num-14 border-b border-gainsboro last:border-b-0"
            :class="index === 0 ? 'bg-ghostwhite hover:bg-gray-100' : 'bg-gray-100 hover:bg-ghostwhite'">
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
  props: {
    menuItems: {
      type: Array,
      default: () => ([
        { label: 'Category', to: '/catagory' },
        { label: 'Popular Listing', to: '/agency' },
        { label: 'FAQ', to: '/contact' },
      ])
    },
    ctaLink: {
      type: [String, Object],
      default: '/auth/register'
    }
  },
  data() {
    return {
      showDropdown: false,
      selectedSearch: 'Nomadic Travel',
      showLoginModal: false,
      isMobileMenuOpen: false,
      searchData: [
        'Nomadic Travel','Altai Tours','Steppe Adventure','Discover Mongolia','Desert Expeditions','Mountain Hiking','Cultural Tours','Wildlife Safari','City Exploration','Beach Resort'
      ],
      _onDocClick: null,
    }
  },
  computed: {
    showHeroSection(){
      try {
        return this.$route?.path === '/' || this.$route?.name === 'index';
      } catch (e) { return false; }
    },
    effectiveMenuItems(){
      if (Array.isArray(this.menuItems) && this.menuItems.length > 0) return this.menuItems;
      return [
        { label: 'Category', to: '/catagory' },
        { label: 'Popular Listing', to: '/agency' },
        { label: 'FAQ', to: '/contact' },
      ];
    }
  },
  methods: {
    toggleDropdown(){ this.showDropdown=!this.showDropdown; },
    selectSearch(item){ this.selectedSearch=item; this.showDropdown=false; },
    openLoginModal(){ this.showLoginModal=true; this.isMobileMenuOpen=false; },
    closeLoginModal(){ this.showLoginModal=false; },
    toggleMobileMenu(){
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      if (process.client) {
        document.body.classList.toggle('menu-open', this.isMobileMenuOpen);
      }
    },
    handleMobileNavigate(){
      this.isMobileMenuOpen = false;
      if (process.client) {
        document.body.classList.remove('menu-open');
      }
    },
    isActive(to){
      try {
        const targetPath = typeof to === 'string' ? to : (to && (to.path || to.to || to.href)) || '';
        return this.$route && this.$route.path === targetPath;
      } catch (e) {
        return false;
      }
    }
  },
  mounted(){
    this._onDocClick = (e) => {
      const searchContainer=this.$refs.searchContainer;
      if (searchContainer && !searchContainer.contains(e.target)) this.showDropdown=false;
    };
    if (process.client) {
      document.addEventListener('click', this._onDocClick);
    }
  },
  beforeUnmount(){
    if (process.client && this._onDocClick) {
      document.removeEventListener('click', this._onDocClick);
    }
  }
}
</script>

<style scoped>
.navbar-links :deep(a),
.navbar-mobile :deep(a) {
  text-decoration: none !important;
}

.mobile-height { height: 100vh; min-height: 100vh; }
@media (max-width: 1023px) { 
  .mobile-height { 
      height: 50vh; 
      min-height: 50vh; 
  } 
}

/* ---------------------------------------------------- */
/* NEW BOAT SHAPE STYLE */
/* Applies a large bottom-border-radius to create the "boat" or concave effect */
.boat-bottom-radius {
    /* Base style for smaller screens */
    border-bottom-left-radius: 150px 40px; 
    border-bottom-right-radius: 150px 40px; 
}

@media (min-width: 640px) { /* sm breakpoint */
    .boat-bottom-radius {
        border-bottom-left-radius: 250px 60px;
        border-bottom-right-radius: 250px 60px;
    }
}

@media (min-width: 1024px) { /* lg breakpoint */
    .boat-bottom-radius {
        border-bottom-left-radius: 400px 90px;
        border-bottom-right-radius: 400px 90px;
    }
}
/* ---------------------------------------------------- */


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