<template>
  <div :class="$style.frameParent">
      <div :class="$style.logoParent">
          <img :class="$style.logoIcon" alt="" />
          <div :class="$style.frameGroup">
              <div :class="$style.categoryParent">
                  <div :class="$style.category">Category</div>
                  <div :class="$style.travelAgenciesParent">
                      <div :class="$style.travelAgencies">Travel Agencies </div>
                      <div :class="$style.travelAgencies">Horseback Trekking</div>
                      <div :class="$style.culturalTours">Cultural Tours  </div>
                      <div :class="$style.culturalTours">Seasonal Packages  </div>
                      <div :class="$style.travelAgencies">Hotels & Camps </div>
                  </div>
              </div>
              <div :class="$style.categoryParent">
                  <div :class="$style.category">For Agencies</div>
                  <div :class="$style.travelAgenciesParent">
                      <div :class="$style.registerYourCompany">Register Your Company </div>
                      <div :class="$style.travelAgencies">How It Works</div>
                      <div :class="$style.travelAgencies">Agency Dashboard</div>
                      <div :class="$style.culturalTours">FAQs  </div>
                  </div>
              </div>
              <div :class="$style.categoryParent">
                  <div :class="$style.category">Resources</div>
                  <div :class="$style.travelAgenciesParent">
                      <div :class="$style.culturalTours">About Us  </div>
                      <div :class="$style.culturalTours">Contact Support  </div>
                      <div :class="$style.registerYourCompany">Blog (Coming Soon)</div>
                      <div :class="$style.travelAgencies">Terms & Conditions</div>
                      <div :class="$style.travelAgencies">Privacy Policy</div>
                  </div>
              </div>
              <div :class="$style.connectWithUsParent">
                  <div :class="$style.category">Connect With Us</div>
                  <div :class="$style.frameContainer">
                      <div :class="$style.frameDiv">
                          <img :class="$style.frameIcon" alt="" />
                          <div :class="$style.facebook">Facebook  </div>
                      </div>
                      <div :class="$style.frameDiv">
                          <img :class="$style.frameIcon" alt="" />
                          <div :class="$style.facebook">Instagram    </div>
                      </div>
                      <div :class="$style.frameDiv">
                          <img :class="$style.frameIcon" alt="" />
                          <div :class="$style.facebook">Instagram    </div>
                      </div>
                      <div :class="$style.frameDiv">
                          <img :class="$style.messageFillIcon" alt="" />
                          <div :class="$style.facebook">support@yellowbook.mn      </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <img :class="$style.frameChild" alt="" />
      <div :class="$style.copyright2025"> Copyright © 2025 Yellow Book</div>
  </div>
</template>
<style  module>.frameParent {
  width: 100%;
  position: relative;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 120px 120px 42px;
  gap: 42px;
  text-align: left;
  font-size: 16px;
  color: #212121;
  font-family: 'Plus Jakarta Sans';
}
  .logoParent {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 62px;
  }
  .logoIcon {
      width: 118px;
      height: 30.7px;
      object-fit: cover;
  }
  .frameGroup {
      align-self: stretch;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0px;
  }
  .categoryParent {
      width: 245px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
  }
  .category {
      align-self: stretch;
      position: relative;
      line-height: 160%;
      text-transform: capitalize;
      font-weight: 600;
  }
  .travelAgenciesParent {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
      color: #616161;
  }
  .travelAgencies {
      align-self: stretch;
      position: relative;
      line-height: 160%;
      text-transform: capitalize;
      font-weight: 500;
  }
  .culturalTours {
      align-self: stretch;
      position: relative;
      line-height: 160%;
      text-transform: capitalize;
      font-weight: 500;
      white-space: pre-wrap;
  }
  .registerYourCompany {
      position: relative;
      line-height: 160%;
      text-transform: capitalize;
      font-weight: 500;
  }
  .connectWithUsParent {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
  }
  .frameContainer {
      width: 245px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      color: #616161;
  }
  .frameDiv {
      align-self: stretch;
      display: flex;
      align-items: center;
      gap: 8px;
  }
  .frameIcon {
      width: 24px;
      position: relative;
      height: 24px;
  }
  .facebook {
      position: relative;
      line-height: 160%;
      text-transform: capitalize;
      font-weight: 500;
      white-space: pre-wrap;
  }
  .messageFillIcon {
      width: 24px;
      position: relative;
      height: 24px;
      object-fit: cover;
  }
  .frameChild {
      align-self: stretch;
      position: relative;
      max-width: 100%;
      overflow: hidden;
      max-height: 100%;
  }
  .copyright2025 {
      align-self: stretch;
      position: relative;
      line-height: 160%;
      text-transform: capitalize;
      font-weight: 500;
      text-align: center;
  }

</style>