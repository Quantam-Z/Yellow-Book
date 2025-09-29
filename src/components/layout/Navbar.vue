<template>
    <div class="w-full relative h-[577px] overflow-hidden flex-shrink-0 text-left text-base text-[#616161] font-['Plus_Jakarta_Sans']">
          <div class="absolute bottom-0 left-[calc(50%-4744px)] rounded-full bg-[#fff9e6] w-[9487px] h-[9487px]" />
          <div class="absolute top-[26px] left-[120px] w-[1200px] flex flex-col items-center gap-[77px]">
                <div class="self-stretch flex items-center gap-[189px]">
                      <div class="w-[118px] rounded-[4px] bg-white flex flex-col items-start p-2 box-border">
                        <img class="self-stretch max-w-full overflow-hidden h-[26.9px] flex-shrink-0 object-cover" src="/logo/logo.png" alt="Logo" />
                    </div>
                      <div class="flex items-center">
                            <div class="w-[120px] flex flex-col items-center py-1 box-border gap-[10px] text-[#212121]">
                                  <div class="relative leading-[160%] capitalize font-semibold">Category</div>
                                  <div class="w-[37px] relative rounded-[2px] bg-[#212121] h-[2px]" />
                            </div>
                            <div class="h-[32px] flex items-start justify-center p-1 box-border">
                                  <div class="relative leading-[160%] capitalize font-medium">Popular listing</div>
                            </div>
                            <div class="w-[120px] h-[32px] flex items-start justify-center p-1 box-border text-center">
                                  <div class="relative leading-[160%] capitalize font-medium">FAQ</div>
                            </div>
                      </div>
                      <div class="flex items-center gap-[17px] text-[#212121]">
                            <div class="self-stretch rounded-[4px] flex items-center justify-center p-4 cursor-pointer" @click="openLoginModal">
                                  <div class="relative leading-[160%] capitalize font-medium">Login</div>
                            </div>
                            <div class="rounded-[4px] border border-[#212121] box-border h-[48px] flex items-center justify-center p-[18px_36px] text-center">
                                  <div class="relative leading-[130%] capitalize font-semibold">List Your Agency</div>
                            </div>
                      </div>
                </div>
                <div class="w-[676px] flex flex-col items-start gap-[35px] text-center text-[46px] text-[#212121]">
                      <div class="self-stretch flex flex-col items-center justify-center gap-[26px]">
                            <div class="w-[574px] relative leading-[122%] capitalize font-medium inline-block">Trusted Help, Right When You Need It</div>
                            <div class="w-[536px] relative text-base leading-[130%] capitalize text-[#616161] inline-block">Reliable support from real people, solving everyday problems with care, speed, and integrity.</div>
                      </div>
                      <div class="self-stretch backdrop-blur-[16px] rounded-[16px] bg-[#feecb2] flex items-center p-4 gap-[24px] text-[14px]">
                        <div class="self-stretch flex-1 rounded-[8px] bg-[#fff9e6] flex flex-col items-start justify-center p-[10px]">
                          <div class="self-stretch flex items-center">
                            <div class="relative leading-[170%] capitalize">{{ selectedSearch }}</div>
                          </div>
                        </div>
                        <div class="rounded-[8px] bg-[#fcc207] border-b-2 border-[#e5b106] flex items-center p-[10px] gap-[8px] text-[18px] cursor-pointer" @click="toggleDropdown">
                              <div class="relative leading-[160%] capitalize font-medium">Search</div>
                              <img class="w-6 h-6 relative" src="/logo/Search.svg" alt="" />
                        </div>
                      </div>
                </div>
          </div>
          <div class="absolute top-[401px] left-[398px] rounded-[8px] border border-[#fee38d] box-border w-[507px] overflow-hidden flex flex-col items-start text-center text-[14px] bg-white z-10" v-if="showDropdown">
                <div v-for="(item, index) in searchData" 
                     :key="index"
                     @click="selectSearch(item)"
                     :class="[
                       index === 0 ? 'self-stretch bg-[#f6fafd] h-[44px] flex flex-col items-start justify-center p-[10px] box-border cursor-pointer hover:bg-[#e3f2fd]' : 
                       index === searchData.length - 1 ? 'self-stretch rounded-[0px_0px_8px_8px] bg-[#fafafa] h-[44px] flex flex-col items-start justify-center p-[10px] box-border cursor-pointer hover:bg-[#f0f0f0]' : 
                       'self-stretch bg-[#fafafa] border-b border-[#e0e0e0] box-border h-[44px] flex flex-col items-start justify-center p-[10px] cursor-pointer hover:bg-[#f0f0f0]'
                     ]">
                      <div class="self-stretch flex items-center">
                            <div class="relative leading-[170%] capitalize">{{ item }}</div>
                      </div>
                </div>
          </div>
          
          <!-- Login Modal -->
          <LoginModal :isOpen="showLoginModal" @close="closeLoginModal" />
    </div>
</template>

<script>
import LoginModal from '~/components/common/LoginModal.vue'

export default {
  name: 'ResponsiveLandingPage',
  components: {
    LoginModal
  },
  data() {
    return {
      showDropdown: false,
      selectedSearch: 'Nomadic Travel',
      showLoginModal: false,
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
      this.showDropdown = !this.showDropdown;
    },
    selectSearch(item) {
      this.selectedSearch = item;
      this.showDropdown = false;
    },
    openLoginModal() {
      this.showLoginModal = true;
    },
    closeLoginModal() {
      this.showLoginModal = false;
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.showDropdown = false;
      }
    });
  }
}
</script>

<style>
/* Responsive Media Queries */
@media (max-width: 1440px) {
    .absolute.top-\[26px\].left-\[120px\] {
        left: 5%;
        width: 90%;
    }
    .self-stretch.flex.items-center.gap-\[189px\] {
        gap: 10%;
    }
    .absolute.top-\[401px\].left-\[398px\] {
        left: 25%;
    }
}

@media (max-width: 1200px) {
    .absolute.top-\[26px\].left-\[120px\] {
        left: 3%;
        width: 94%;
    }
    .self-stretch.flex.items-center.gap-\[189px\] {
        gap: 5%;
    }
    .absolute.top-\[401px\].left-\[398px\] {
        left: 20%;
        width: 60%;
    }
}

@media (max-width: 992px) {
    .absolute.top-\[26px\].left-\[120px\] {
        left: 2%;
        width: 96%;
    }
    .self-stretch.flex.items-center.gap-\[189px\] {
        gap: 3%;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .w-\[676px\] {
        width: 100%;
    }
    .w-\[574px\] {
        width: 100%;
        font-size: 36px;
    }
    .w-\[536px\] {
        width: 100%;
    }
    .absolute.top-\[401px\].left-\[398px\] {
        left: 15%;
        width: 70%;
    }
}

@media (max-width: 768px) {
    .w-full.relative.h-\[577px\] {
        height: auto;
        min-height: 100vh;
    }
    .absolute.top-\[26px\].left-\[120px\] {
        position: relative;
        left: 0;
        top: 20px;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .self-stretch.flex.items-center.gap-\[189px\] {
        flex-direction: column;
        gap: 20px;
        align-items: stretch;
    }
    .flex.items-center {
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
    }
    .flex.items-center.gap-\[17px\] {
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
    }
    .w-\[676px\] {
        font-size: 32px;
    }
    .w-\[574px\] {
        font-size: 32px;
    }
    .self-stretch.backdrop-blur-\[16px\] {
        flex-direction: column;
        gap: 15px;
    }
    .absolute.top-\[401px\].left-\[398px\] {
        position: relative;
        top: 50px;
        left: 0;
        width: 100%;
        margin: 0 auto;
    }
}

@media (max-width: 576px) {
    .absolute.top-\[26px\].left-\[120px\] {
        padding: 0 15px;
        gap: 40px;
    }
    .flex.items-center {
        flex-direction: column;
        gap: 10px;
    }
    .flex.items-center.gap-\[17px\] {
        flex-direction: column;
        gap: 15px;
    }
    .self-stretch.rounded-\[4px\].flex.items-center.justify-center.p-4 {
        padding: 12px 20px;
    }
    .rounded-\[4px\].border.border-\[#212121\].box-border.h-\[48px\] {
        padding: 14px 20px;
    }
    .w-\[676px\] {
        font-size: 28px;
        gap: 25px;
    }
    .w-\[574px\] {
        font-size: 28px;
    }
    .w-\[536px\] {
        font-size: 14px;
    }
    .self-stretch.backdrop-blur-\[16px\] {
        padding: 12px;
        gap: 12px;
    }
    .absolute.top-\[401px\].left-\[398px\] {
        top: 30px;
        font-size: 12px;
    }
}

@media (max-width: 480px) {
    .absolute.top-\[26px\].left-\[120px\] {
        padding: 0 10px;
    }
    .w-\[676px\] {
        font-size: 24px;
    }
    .w-\[574px\] {
        font-size: 24px;
    }
    .self-stretch.backdrop-blur-\[16px\] {
        padding: 10px;
    }
}
</style>