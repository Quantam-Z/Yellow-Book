<template>
    <div :class="$style.ellipseParent">
          <div :class="$style.frameChild" />
          <div :class="$style.frameParent">
                <div :class="$style.frameGroup">
                      <div :class="$style.logoWrapper">
                        <img :class="$style.logoIcon" src="/logo/logo.png" alt="Logo" />
                    </div>
                      <div :class="$style.frameContainer">
                            <div :class="$style.categoryParent">
                                  <div :class="$style.category">Category</div>
                                  <div :class="$style.frameItem" />
                            </div>
                            <div :class="$style.popularListingWrapper">
                                  <div :class="$style.popularListing">Popular listing</div>
                            </div>
                            <div :class="$style.faqWrapper">
                                  <div :class="$style.popularListing">FAQ</div>
                            </div>
                      </div>
                      <div :class="$style.frameDiv">
                            <div :class="$style.loginWrapper">
                                  <div :class="$style.popularListing">Login</div>
                            </div>
                            <div :class="$style.button">
                                  <div :class="$style.ellipseParentButton">List Your Agency</div>
                            </div>
                      </div>
                </div>
                <div :class="$style.ellipseParentFrameParent">
                      <div :class="$style.trustedHelpRightWhenYouNParent">
                            <div :class="$style.trustedHelpRight">Trusted Help, Right When You Need It</div>
                            <div :class="$style.reliableSupportFrom">Reliable support from real people, solving everyday problems with care, speed, and integrity.</div>
                      </div>
                      <div :class="$style.frameParent2">
                        <div :class="$style.frameWrapper">
  <div :class="$style.nomadicTravelWrapper">
    <!-- Shows updated selection -->
    <div :class="$style.nomadicTravel">{{ selectedSearch }}</div>
  </div>
</div>
                            <div :class="$style.searchParent" @click="toggleDropdown">
                                  <div :class="$style.popularListing">Search</div>
                                  <img :class="$style.searchIcon" src="/logo/Search.svg"  alt="" />
                            </div>
                      </div>
                </div>
          </div>
          <div :class="$style.frameParent3" v-if="showDropdown">
                <div v-for="(item, index) in searchData" 
                     :key="index"
                     @click="selectSearch(item)"
                     :class="[
                       index === 0 ? $style.ellipseParentFrameWrapper : 
                       index === searchData.length - 1 ? $style.frameWrapper4 : 
                       $style.frameWrapper2
                     ]">
                      <div :class="$style.nomadicTravelWrapper">
                            <div :class="$style.nomadicTravel">{{ item }}</div>
                      </div>
                </div>
          </div>
    </div>
</template>

<script>
export default {
  name: 'ResponsiveLandingPage',
  data() {
    return {
      showDropdown: false,
      selectedSearch: 'Nomadic Travel',
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
    }
  }
}
</script>

<style module>
.ellipseParent {
    width: 100%;
    position: relative;
    height: 577px;
    overflow: hidden;
    flex-shrink: 0;
    text-align: left;
    font-size: 16px;
    color: #616161;
    font-family: 'Plus Jakarta Sans';
}

.frameChild {
    position: absolute;
    bottom: 0px;
    left: calc(50% - 4744px);
    border-radius: 50%;
    background-color: #fff9e6;
    width: 9487px;
    height: 9487px;
}

.frameParent {
    position: absolute;
    top: 26px;
    left: 120px;
    width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 77px;
}

.frameGroup {
    align-self: stretch;
    display: flex;
    align-items: center;
    gap: 189px;
}

.logoWrapper {
    width: 118px;
    border-radius: 4px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px;
    box-sizing: border-box;
}

.logoIcon {
    align-self: stretch;
    max-width: 100%;
    overflow: hidden;
    height: 26.9px;
    flex-shrink: 0;
    object-fit: cover;
}

.frameContainer {
    display: flex;
    align-items: center;
}

.categoryParent {
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px 0px;
    box-sizing: border-box;
    gap: 10px;
    color: #212121;
}

.category {
    position: relative;
    line-height: 160%;
    text-transform: capitalize;
    font-weight: 600;
}

.frameItem {
    width: 37px;
    position: relative;
    border-radius: 2px;
    background-color: #212121;
    height: 2px;
}

.popularListingWrapper {
    height: 32px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 4px 10px;
    box-sizing: border-box;
}

.popularListing {
    position: relative;
    line-height: 160%;
    text-transform: capitalize;
    font-weight: 500;
}

.faqWrapper {
    width: 120px;
    height: 32px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 4px 10px;
    box-sizing: border-box;
    text-align: center;
}

.frameDiv {
    display: flex;
    align-items: center;
    gap: 17px;
    color: #212121;
}

.loginWrapper {
    align-self: stretch;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 36px;
}

.button {
    border-radius: 4px;
    border: 1px solid #212121;
    box-sizing: border-box;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px 36px;
    text-align: center;
}

.ellipseParentButton {
    position: relative;
    line-height: 130%;
    text-transform: capitalize;
    font-weight: 600;
}

.ellipseParentFrameParent {
    width: 676px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 35px;
    text-align: center;
    font-size: 46px;
    color: #212121;
}

.trustedHelpRightWhenYouNParent {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 26px;
}

.trustedHelpRight {
    width: 574px;
    position: relative;
    line-height: 122%;
    text-transform: capitalize;
    font-weight: 500;
    display: inline-block;
}

.reliableSupportFrom {
    width: 536px;
    position: relative;
    font-size: 16px;
    line-height: 130%;
    text-transform: capitalize;
    color: #616161;
    display: inline-block;
}

.frameParent2 {
    align-self: stretch;
    backdrop-filter: blur(16px);
    border-radius: 16px;
    background-color: #feecb2;
    display: flex;
    align-items: center;
    padding: 16px;
    gap: 24px;
    font-size: 14px;
}

.frameWrapper {
    align-self: stretch;
    flex: 1;
    border-radius: 8px;
    background-color: #fff9e6;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 10px;
}

.nomadicTravelWrapper {
    align-self: stretch;
    display: flex;
    align-items: center;
}

.nomadicTravel {
    position: relative;
    line-height: 170%;
    text-transform: capitalize;
}

.searchParent {
    border-radius: 8px;
    background-color: #fcc207;
    border-bottom: 2px solid #e5b106;
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 8px;
    font-size: 18px;
    cursor: pointer;
}

.searchIcon {
    width: 24px;
    position: relative;
    height: 24px;
}

.frameParent3 {
    position: absolute;
    top: 401px;
    left: 398px;
    border-radius: 8px;
    border: 1px solid #fee38d;
    box-sizing: border-box;
    width: 507px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
    font-size: 14px;
    background-color: #fff;
    z-index: 10;
}

.ellipseParentFrameWrapper {
    align-self: stretch;
    background-color: #f6fafd;
    height: 44px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
}

.ellipseParentFrameWrapper:hover {
    background-color: #e3f2fd;
}

.frameWrapper2 {
    align-self: stretch;
    background-color: #fafafa;
    border-bottom: 1px solid #e0e0e0;
    box-sizing: border-box;
    height: 44px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 10px;
    cursor: pointer;
}

.frameWrapper2:hover {
    background-color: #f0f0f0;
}

.frameWrapper4 {
    align-self: stretch;
    border-radius: 0px 0px 8px 8px;
    background-color: #fafafa;
    height: 44px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
}

.frameWrapper4:hover {
    background-color: #f0f0f0;
}

/* Responsive Media Queries */
@media (max-width: 1440px) {
    .frameParent {
        left: 5%;
        width: 90%;
    }
    .frameGroup {
        gap: 10%;
    }
    .frameParent3 {
        left: 25%;
    }
}

@media (max-width: 1200px) {
    .frameParent {
        left: 3%;
        width: 94%;
    }
    .frameGroup {
        gap: 5%;
    }
    .frameParent3 {
        left: 20%;
        width: 60%;
    }
}

@media (max-width: 992px) {
    .frameParent {
        left: 2%;
        width: 96%;
    }
    .frameGroup {
        gap: 3%;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .ellipseParentFrameParent {
        width: 100%;
    }
    .trustedHelpRight {
        width: 100%;
        font-size: 36px;
    }
    .reliableSupportFrom {
        width: 100%;
    }
    .frameParent3 {
        left: 15%;
        width: 70%;
    }
}

@media (max-width: 768px) {
    .ellipseParent {
        height: auto;
        min-height: 100vh;
    }
    .frameParent {
        position: relative;
        left: 0;
        top: 20px;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .frameGroup {
        flex-direction: column;
        gap: 20px;
        align-items: stretch;
    }
    .frameContainer {
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
    }
    .frameDiv {
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
    }
    .ellipseParentFrameParent {
        font-size: 32px;
    }
    .trustedHelpRight {
        font-size: 32px;
    }
    .frameParent2 {
        flex-direction: column;
        gap: 15px;
    }
    .frameParent3 {
        position: relative;
        top: 50px;
        left: 0;
        width: 100%;
        margin: 0 auto;
    }
}

@media (max-width: 576px) {
    .frameParent {
        padding: 0 15px;
        gap: 40px;
    }
    .frameContainer {
        flex-direction: column;
        gap: 10px;
    }
    .frameDiv {
        flex-direction: column;
        gap: 15px;
    }
    .loginWrapper {
        padding: 12px 20px;
    }
    .button {
        padding: 14px 20px;
    }
    .ellipseParentFrameParent {
        font-size: 28px;
        gap: 25px;
    }
    .trustedHelpRight {
        font-size: 28px;
    }
    .reliableSupportFrom {
        font-size: 14px;
    }
    .frameParent2 {
        padding: 12px;
        gap: 12px;
    }
    .frameParent3 {
        top: 30px;
        font-size: 12px;
    }
}

@media (max-width: 480px) {
    .frameParent {
        padding: 0 10px;
    }
    .ellipseParentFrameParent {
        font-size: 24px;
    }
    .trustedHelpRight {
        font-size: 24px;
    }
    .frameParent2 {
        padding: 10px;
    }
}
</style>