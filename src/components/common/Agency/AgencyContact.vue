<template>
    <div :class="$style.frameParent">
          <div :class="$style.frameGroup">
                <div :class="$style.home13StrokeRounded1Parent">
                      <img :class="$style.home13StrokeRounded1Icon" alt="" />
                      <div :class="$style.companyInformation">Company Information</div>
                </div>
                <div :class="$style.frameContainer">
                      <div :class="$style.frameDiv">
                            <div :class="$style.frameParent2">
                                  <div :class="$style.world2Parent">
                                        <img :class="$style.home13StrokeRounded1Icon" alt="" />
                                        <div :class="$style.website">Website</div>
                                  </div>
                                  <div :class="$style.website">:</div>
                            </div>
                            <div :class="$style.wwwmongoliaExplorerTravelcParent">
                                  <div :class="$style.wwwmongoliaExplorerTravelc">www.Mongolia Explorer Travel.com</div>
                                  <img :class="$style.home13StrokeRounded1Icon" alt="" />
                            </div>
                      </div>
                      <div :class="$style.frameParent3">
                            <div :class="$style.frameParent2">
                                  <div :class="$style.world2Parent">
                                        <img :class="$style.home13StrokeRounded1Icon" alt="" />
                                        <div :class="$style.website">Phone Number</div>
                                  </div>
                                  <div :class="$style.website">:</div>
                            </div>
                            <div :class="$style.div3">+976 1234 5678</div>
                      </div>
                      <div :class="$style.frameParent3">
                            <div :class="$style.frameParent2">
                                  <div :class="$style.world2Parent">
                                        <img :class="$style.home13StrokeRounded1Icon" alt="" />
                                        <div :class="$style.website">Work email</div>
                                  </div>
                                  <div :class="$style.website">:</div>
                            </div>
                            <div :class="$style.contacttechsolutionscom">contact@techsolutions.com</div>
                      </div>
                      <div :class="$style.frameParent3">
                            <div :class="$style.frameParent2">
                                  <div :class="$style.world2Parent">
                                        <img :class="$style.pinIcon" alt="" />
                                        <div :class="$style.website">Location</div>
                                  </div>
                                  <div :class="$style.website">:</div>
                            </div>
                            <div :class="$style.ulaanbaatarMongolia">Ulaanbaatar, Mongolia</div>
                      </div>
                      <div :class="$style.frameParent3">
                            <div :class="$style.frameParent2">
                                  <div :class="$style.world2Parent">
                                        <img :class="$style.home13StrokeRounded1Icon" alt="" />
                                        <div :class="$style.website">Annual Revenue</div>
                                  </div>
                                  <div :class="$style.website">:</div>
                            </div>
                            <div :class="$style.contacttechsolutionscom">$1M-$10M</div>
                      </div>
                      <div :class="$style.frameParent3">
                            <div :class="$style.frameParent2">
                                  <div :class="$style.world2Parent">
                                        <img :class="$style.home13StrokeRounded1Icon" alt="" />
                                        <div :class="$style.website">number of Employees</div>
                                  </div>
                                  <div :class="$style.website">:</div>
                            </div>
                            <div :class="$style.softwareDevelopment">10-20</div>
                      </div>
                      <div :class="$style.frameParent3">
                            <div :class="$style.frameParent2">
                                  <div :class="$style.world2Parent">
                                        <img :class="$style.home13StrokeRounded1Icon" alt="" />
                                        <div :class="$style.website">Industry</div>
                                  </div>
                                  <div :class="$style.website">:</div>
                            </div>
                            <div :class="$style.softwareDevelopment">Software development</div>
                      </div>
                      <div :class="$style.frameParent3">
                            <div :class="$style.frameParent2">
                                  <div :class="$style.world2Parent">
                                        <img :class="$style.home13StrokeRounded1Icon" alt="" />
                                        <div :class="$style.website">Company Category</div>
                                  </div>
                                  <div :class="$style.website">:</div>
                            </div>
                            <div :class="$style.softwareDevelopment">Technology</div>
                      </div>
                </div>
          </div>
          <div :class="$style.frameParent17">
                <div :class="$style.frameParent18">
                      <img :class="$style.frameChild" alt="" />
                      <div :class="$style.cameronWilliamsonParent">
                            <div :class="$style.cameronWilliamson">Cameron Williamson</div>
                            <div :class="$style.ceoFounder">CEO & Founder</div>
                      </div>
                </div>
                <div :class="$style.imADedicated">“I’m a dedicated agency owner passionate about delivering trusted services, building client relationships, and helping everyday users solve real-world problems with care and integrity”</div>
          </div>
    </div>
</template>

<style module>
.frameParent {
  width: 100%;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 24px;
  text-align: center;
  font-size: 16px;
  color: #000;
  font-family: 'Plus Jakarta Sans';
  flex-wrap: wrap; /* ✅ allow wrapping on small screens */
}

.frameGroup {
  flex: 1 1 600px;
  max-width: 690px;
  box-shadow: 0px 4px 16px rgba(158, 158, 158, 0.24);
  background-color: #fff;
  border: 1px solid #eee;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 20px;
  min-width: 280px; /* ✅ prevent collapsing */
}

.home13StrokeRounded1Parent {
  align-self: stretch;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  padding: 10px 0px;
  gap: 5px;
}

.home13StrokeRounded1Icon,
.pinIcon {
  width: 24px;
  height: 24px;
}

.companyInformation {
  line-height: 160%;
  text-transform: capitalize;
  font-weight: 600;
}

.frameContainer {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 0px 28px;
  gap: 16px;
  text-align: left;
  color: #616161;
}

.frameDiv,
.frameParent3 {
  display: flex;
  align-items: center;
  gap: 11px;
  flex-wrap: wrap; /* ✅ prevent overflow */
}

.frameParent2 {
  width: 220px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0px;
}

.world2Parent {
  display: flex;
  align-items: center;
  gap: 8px;
}

.website {
  line-height: 130%;
  text-transform: capitalize;
  font-weight: 500;
}

.wwwmongoliaExplorerTravelcParent {
  display: flex;
  align-items: center;
  color: #28aed8;
  flex-wrap: wrap;
  gap: 4px;
}

.wwwmongoliaExplorerTravelc,
.div3,
.contacttechsolutionscom,
.ulaanbaatarMongolia,
.softwareDevelopment {
  line-height: 160%;
  text-transform: capitalize;
  text-align: left;
  word-break: break-word; /* ✅ allow long text to wrap */
}

.contacttechsolutionscom {
  color: #757575;
}

.softwareDevelopment {
  color: #424242;
}

.frameParent17 {
  flex: 1 1 400px;
  max-width: 486px;
  box-shadow: 0px 4px 16px rgba(158, 158, 158, 0.24);
  background-color: #fff;
  border: 1px solid #eee;
  box-sizing: border-box;
  min-height: 408px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 17px;
  text-align: left;
  font-size: 24px;
  color: #616161;
  min-width: 280px;
}

.frameParent18 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
}

.frameChild {
  width: 200px;
  border-radius: 200px;
  object-fit: cover;
}

.cameronWilliamsonParent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.cameronWilliamson {
  line-height: 130%;
  text-transform: capitalize;
  font-weight: 600;
}

.ceoFounder {
  font-size: 16px;
  line-height: 130%;
  text-transform: capitalize;
  color: #9e9e9e;
  text-align: center;
}

.imADedicated {
  font-size: 16px;
  line-height: 130%;
  text-transform: capitalize;
  font-weight: 500;
  text-align: center;
  word-break: break-word;
}

/* ✅ Responsive tweaks */
@media (max-width: 1024px) {
  .frameParent {
    gap: 16px;
  }
  .frameParent17 {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .frameParent {
    flex-direction: column;
    align-items: stretch;
  }
  .frameGroup,
  .frameParent17 {
    max-width: 100%;
    width: 100%;
  }
  .frameChild {
    width: 150px;
  }
}

@media (max-width: 480px) {
  .frameParent {
    gap: 12px;
  }
  .frameGroup,
  .frameParent17 {
    padding: 16px;
  }
  .companyInformation {
    font-size: 14px;
  }
  .website {
    font-size: 14px;
  }
  .imADedicated {
    font-size: 14px;
  }
  .frameChild {
    width: 100px;
  }
}
</style>
