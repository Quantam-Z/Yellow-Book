<template>
  <div class="w-full relative flex-shrink-0 text-left text-base text-[#616161] bg-gradient-to-br from-[#fff9e6] to-[#feecb2] rounded-sm font-['Plus_Jakarta_Sans'] pb-12 boat-bottom-radius shadow-lg">
    <div class="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-[120px] py-6 sm:py-8 flex flex-col">
      <!-- Top Navigation -->
      <div class="flex items-center justify-between mb-8 sm:mb-12 md:mb-16">
        <!-- Logo -->
        <nuxt-link
          to="/"
          class="w-[140px] sm:w-[150px] md:w-[160px] rounded-[8px] flex flex-col items-start p-3 box-border hover:scale-105 transition-transform duration-200"
        >
          <img
            class="self-stretch max-w-full overflow-hidden h-[40px] sm:h-[45px] md:h-[50px] flex-shrink-0 object-contain"
            src="/logo/logo.png"
            alt="Yellow Book Logo"
          />
        </nuxt-link>

        <!-- Desktop Links -->
        <div class="hidden lg:flex items-center gap-10">
          <nuxt-link
            to="/catagory"
            class="flex flex-col items-center gap-[6px] text-[#212121] cursor-pointer no-underline group hover:scale-105 transition-all duration-200"
          >
            <div class="relative leading-[160%] font-semibold text-lg group-hover:text-primary-200 transition-colors">Category</div>
            <div class="w-[35px] bg-[#212121] h-[3px] rounded-full group-hover:bg-primary-200 transition-colors"></div>
          </nuxt-link>

          <nuxt-link
            to="/agency"
            class="flex items-center justify-center cursor-pointer no-underline group hover:scale-105 transition-all duration-200"
          >
            <div class="relative leading-[160%] font-medium text-lg text-[#616161] group-hover:text-[#212121] transition-colors">Popular Listing</div>
          </nuxt-link>

          <nuxt-link
            to="/faq"
            class="flex items-center justify-center cursor-pointer no-underline group hover:scale-105 transition-all duration-200"
          >
            <div class="relative leading-[160%] font-medium text-lg text-[#616161] group-hover:text-[#212121] transition-colors">FAQ</div>
          </nuxt-link>
        </div>

        <!-- Desktop Actions -->
        <div class="hidden lg:flex items-center gap-8 text-[#212121]">
          <div class="flex items-center justify-center cursor-pointer group hover:scale-105 transition-all duration-200" @click="openLoginModal">
            <div class="relative leading-[160%] font-semibold text-lg group-hover:text-primary-200 transition-colors">Login</div>
          </div>
          <nuxt-link
            to="/agency"
            class="relative rounded-xl border-2 border-primary-200 border-solid box-border h-14 flex items-center justify-center py-4 px-8 text-center text-lg text-[#212121] font-plus-jakarta-sans no-underline bg-gradient-to-r from-primary-200 to-primary-300 hover:from-primary-300 hover:to-primary-200 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div class="relative leading-[130%] capitalize font-bold">List Your Agency</div>
          </nuxt-link>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="lg:hidden p-3 rounded-full border-2 border-primary-200 bg-white shadow-lg z-50 relative transform hover:scale-110 transition-all duration-300 hover:shadow-xl"
          aria-label="Toggle menu"
        >
          <component :is="isMobileMenuOpen ? 'X' : 'Menu'" class="w-7 h-7 text-[#212121]" />
        </button>
      </div>

      <!-- Overlay -->
      <transition name="overlay">
        <div
          v-if="isMobileMenuOpen"
          @click="toggleMobileMenu"
          class="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        ></div>
      </transition>

      <!-- Mobile Menu -->
      <transition name="slide">
        <div
          v-if="isMobileMenuOpen"
          class="lg:hidden fixed top-0 right-0 h-screen w-[85vw] max-w-[450px] bg-white shadow-2xl z-50 overflow-y-auto"
        >
          <div class="p-8 h-full flex flex-col">
            <div class="flex justify-end mb-10">
              <button @click="toggleMobileMenu" class="p-3 hover:bg-[#fff9e6] rounded-full transition-all duration-300">
                <svg class="w-7 h-7 text-[#212121]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Mobile Nav Links -->
            <nav class="flex-1 flex flex-col space-y-4 text-xl">
              <nuxt-link
                to="/catagory"
                class="py-5 px-6 text-[#212121] font-bold hover:bg-gradient-to-r hover:from-[#fff9e6] hover:to-[#feecb2] rounded-xl transition-all duration-300 border-b-2 border-primary-200/20 hover:border-primary-200 no-underline"
                @click.native="closeMobileMenu"
              >
                Category
              </nuxt-link>

              <nuxt-link
                to="/agency"
                class="py-5 px-6 text-[#616161] font-semibold hover:bg-gradient-to-r hover:from-[#fff9e6] hover:to-[#feecb2] rounded-xl transition-all duration-300 border-b-2 border-gray-100 hover:border-primary-200 no-underline"
                @click.native="closeMobileMenu"
              >
                Popular Listing
              </nuxt-link>

              <nuxt-link
                to="/faq"
                class="py-5 px-6 text-[#616161] font-semibold hover:bg-gradient-to-r hover:from-[#fff9e6] hover:to-[#feecb2] rounded-xl transition-all duration-300 border-b-2 border-gray-100 hover:border-primary-200 no-underline"
                @click.native="closeMobileMenu"
              >
                FAQ
              </nuxt-link>
            </nav>

            <!-- Mobile Footer Buttons -->
            <div class="space-y-4 mt-auto pt-8 border-t-2 border-primary-200/20">
              <button
                @click="openLoginModal"
                class="w-full py-4 px-8 text-[#212121] font-bold text-xl border-2 border-[#212121] rounded-xl hover:bg-[#212121] hover:text-white transition-all duration-300 hover:scale-105"
              >
                Login
              </button>
              <nuxt-link
                to="/agency"
                class="w-full py-4 px-8 bg-gradient-to-r from-primary-200 to-primary-300 text-[#212121] font-bold text-xl rounded-xl hover:from-primary-300 hover:to-primary-200 transition-all duration-300 text-center no-underline block hover:scale-105 shadow-lg"
                @click.native="closeMobileMenu"
              >
                List Your Agency
              </nuxt-link>
            </div>
          </div>
        </div>
      </transition>

      <!-- Hero Section -->
      <div class="flex-1 flex justify-center items-start">
        <div class="max-w-[800px] w-full mx-auto flex flex-col items-center gap-8 sm:gap-10 text-center text-[#212121]">
          <div class="w-full flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10">
            <h1 class="w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[120%] sm:leading-[115%] capitalize font-bold px-4 bg-gradient-to-r from-[#212121] to-[#616161] bg-clip-text text-transparent">
              Trusted Help, Right When<br />You Need It
            </h1>
            <p class="w-full max-w-[600px] text-lg sm:text-xl md:text-2xl leading-[140%] text-[#616161] px-4 font-medium">
              Reliable support from real people, solving everyday problems with care, speed, and integrity.
            </p>
          </div>

          <!-- Search Box -->
          <div ref="searchContainer" class="w-full relative px-4">
            <div
              class="backdrop-blur-[20px] rounded-2xl sm:rounded-3xl bg-white/90 shadow-2xl flex flex-row items-center p-4 sm:p-5 md:p-6 gap-4 sm:gap-5 md:gap-6 text-[16px] sm:text-[18px] md:text-[20px] border border-primary-200/20"
            >
              <div class="flex-1 rounded-xl bg-gradient-to-r from-[#fff9e6] to-[#feecb2] flex flex-col items-start justify-center p-4 min-h-[56px] sm:min-h-[60px] shadow-inner">
                <div class="w-full flex items-center">
                  <div class="relative leading-[160%] capitalize truncate text-lg sm:text-xl md:text-xl font-semibold text-[#212121]">
                    {{ selectedSearch }}
                  </div>
                </div>
              </div>

              <div
                class="relative rounded-xl bg-gradient-to-r from-primary-200 to-primary-300 border-2 border-primary-300 border-solid box-border flex items-center p-4 gap-3 text-center text-xl text-white font-plus-jakarta-sans cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                @click="toggleDropdown"
              >
                <div class="relative leading-[160%] capitalize font-bold">Search</div>
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <!-- Dropdown -->
            <transition name="dropdown">
              <div
                v-if="showDropdown"
                class="absolute top-full mt-3 left-4 right-4 rounded-2xl border-2 border-primary-200/30 overflow-hidden bg-white shadow-2xl z-20 max-h-[250px] sm:max-h-[300px] md:max-h-[350px] overflow-y-auto backdrop-blur-sm"
              >
                <div
                  v-for="(item, index) in searchData"
                  :key="index"
                  @click="selectSearch(item)"
                  :class="[
                    'w-full h-[50px] sm:h-[56px] flex items-center px-5 sm:px-6 cursor-pointer transition-all text-sm sm:text-base md:text-lg active:scale-[0.98] hover:bg-gradient-to-r hover:from-[#fff9e6] hover:to-[#feecb2]',
                    index === 0 ? 'bg-gradient-to-r from-[#f6fafd] to-[#e3f2fd] hover:from-[#e3f2fd] hover:to-[#f6fafd]' : 'bg-white hover:bg-gradient-to-r hover:from-[#fff9e6] hover:to-[#feecb2]',
                    index !== searchData.length - 1 ? 'border-b border-[#e0e0e0]/50' : ''
                  ]"
                >
                  <div class="leading-[170%] capitalize font-medium text-[#212121]">{{ item }}</div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <LoginModal :isOpen="showLoginModal" @close="closeLoginModal" />
  </div>
</template>

<script>
import LoginModal from '~/components/common/loginModal.vue'
import { Menu, X } from 'lucide-vue-next'

export default {
  name: 'ResponsiveLandingPage',
  components: { LoginModal, Menu, X },
  data() {
    return {
      showDropdown: false,
      selectedSearch: 'Nomadic Travel',
      showLoginModal: false,
      isMobileMenuOpen: false,
      searchData: [
        'Nomadic Travel',
        'Altai Tours',
        'Steppe Adventure',
        'Discover Mongolia',
        'Desert Expeditions',
        'Mountain Hiking',
        'Cultural Tours',
        'Wildlife Safari',
        'City Exploration',
        'Beach Resort'
      ]
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    selectSearch(item) {
      this.selectedSearch = item
      this.showDropdown = false
    },
    openLoginModal() {
      this.showLoginModal = true
      this.isMobileMenuOpen = false
    },
    closeLoginModal() {
      this.showLoginModal = false
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
    }
  },
  mounted() {
    document.addEventListener('click', e => {
      const searchContainer = this.$refs.searchContainer
      if (searchContainer && !searchContainer.contains(e.target)) this.showDropdown = false
    })
  },
  beforeUnmount() {
    document.removeEventListener('click', () => {})
  }
}
</script>

<style scoped>
.navbar-links :deep(a),
.navbar-mobile :deep(a) {
  text-decoration: none !important;
}

button,
a,
nuxt-link {
  touch-action: manipulation;
  cursor: pointer;
}

/* Height Control for Mobile */
.mobile-height {
  height: 100vh;
  min-height: 100vh;
}
@media (max-width: 1023px) {
  .mobile-height {
    height: 50vh;
    min-height: 50vh;
  }
}

/* Boat Bottom Shape */
.boat-bottom-radius {
  border-bottom-left-radius: 120px 30px;
  border-bottom-right-radius: 120px 30px;
}
@media (min-width: 640px) {
  .boat-bottom-radius {
    border-bottom-left-radius: 200px 50px;
    border-bottom-right-radius: 200px 50px;
  }
}
@media (min-width: 1024px) {
  .boat-bottom-radius {
    border-bottom-left-radius: 320px 70px;
    border-bottom-right-radius: 320px 70px;
  }
}

/* Overlay Transition */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

/* Slide Transition */
.slide-enter-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}

/* Dropdown Transition */
.dropdown-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.dropdown-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}
.dropdown-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Scrollbar Styling */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #fcc207;
  border-radius: 3px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #e5b106;
}
</style>
