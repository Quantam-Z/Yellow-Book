<template>
    <div :class="$style.popularListingsParent">
          <div :class="$style.popularListings">Popular listings</div>
          <div :class="$style.frameParent">
                <div :class="$style.agencyCardParent">
                      <img :class="$style.agencyCardIcon" alt="" />
                      <div :class="$style.frameWrapper">
                            <div :class="$style.frameGroup">
                                  <div :class="$style.frameContainer">
                                        <div :class="$style.revolutionizingTechnologyParent">
                                              <div :class="$style.revolutionizingTechnology">Revolutionizing Technology</div>
                                              <div :class="$style.innovativeTechnologySolution">Innovative technology solutions for modern businesses</div>
                                        </div>
                                        <div :class="$style.frameDiv">
                                              <img :class="$style.frameIcon" alt="" />
                                              <img :class="$style.frameIcon" alt="" />
                                              <img :class="$style.frameIcon" alt="" />
                                              <img :class="$style.frameIcon" alt="" />
                                              <img :class="$style.frameIcon" alt="" />
                                        </div>
                                  </div>
                                  <div :class="$style.pinFillParent">
                                        <img :class="$style.pinFillIcon" alt="" />
                                        <div :class="$style.ulaanbaatarMongolia">Ulaanbaatar, Mongolia</div>
                                  </div>
                            </div>
                      </div>
                </div>
                <div :class="$style.agencyCardParent">
                      <img :class="$style.agencyCardIcon" alt="" />
                      <div :class="$style.frameWrapper">
                            <div :class="$style.frameGroup">
                                  <div :class="$style.frameContainer">
                                        <div :class="$style.revolutionizingTechnologyParent">
                                              <div :class="$style.popularListingsParentRevolutionizingTechnology">Revolutionizing Technology</div>
                                              <div :class="$style.innovativeTechnologySolution">Innovative technology solutions for modern businesses</div>
                                        </div>
                                        <div :class="$style.frameDiv">
                                              <img :class="$style.frameIcon" alt="" />
                                              <img :class="$style.frameIcon" alt="" />
                                              <img :class="$style.frameIcon" alt="" />
                                              <img :class="$style.frameIcon" alt="" />
                                              <img :class="$style.frameIcon" alt="" />
                                        </div>
                                  </div>
                                  <div :class="$style.pinFillParent">
                                        <img :class="$style.pinFillIcon" alt="" />
                                        <div :class="$style.ulaanbaatarMongolia">Ulaanbaatar, Mongolia</div>
                                  </div>
                            </div>
                      </div>
                </div>
                <div :class="$style.agencyCardParent">
                      <img :class="$style.agencyCardIcon" alt="" />
                      <div :class="$style.frameWrapper">
                            <div :class="$style.frameGroup">
                                  <div :class="$style.frameContainer">
                                        <div :class="$style.revolutionizingTechnologyParent">
                                              <div :class="$style.popularListingsParentRevolutionizingTechnology">Revolutionizing Technology</div>
                                              <div :class="$style.innovativeTechnologySolution">Innovative technology solutions for modern businesses</div>
                                        </div>
                                        <div :class="$style.frameDiv">
                                              <img :class="$style.frameIcon" alt="" />
                                              <img :class="$style.frameIcon" alt="" />
                                              <img :class="$style.frameIcon" alt="" />
                                              <img :class="$style.frameIcon" alt="" />
                                              <img :class="$style.frameIcon" alt="" />
                                        </div>
                                  </div>
                                  <div :class="$style.pinFillParent">
                                        <img :class="$style.pinFillIcon" alt="" />
                                        <div :class="$style.ulaanbaatarMongolia">Ulaanbaatar, Mongolia</div>
                                  </div>
                            </div>
                      </div>
                </div>
          </div>
    </div>
</template>

<style module>

.popularListingsParent {
  width: 100%;
  max-width: 1200px;       /* keeps content centered on large screens */
  margin: 0 auto;          /* center container */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 44px;
  text-align: center;
  font-size: 30px;
  color: #212121;
  font-family: 'Plus Jakarta Sans';
  padding: 0 20px;         /* add padding for smaller screens */
  box-sizing: border-box;
}

.popularListings {
  align-self: stretch;
  line-height: 126%;
  text-transform: capitalize;
  font-weight: 600;
}

.frameParent {
  width: 100%;
  display: flex;
  flex-wrap: wrap;           /* allow wrapping */
  justify-content: center;   /* center cards */
  align-items: flex-start;
  gap: 24px;
  font-size: 20px;
  color: #000;
}

.agencyCardParent {
  flex: 1 1 300px;           /* flexible responsive cards */
  max-width: 384px;          /* prevent stretching */
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #fff;
}

.agencyCardIcon {
  align-self: stretch;
  max-width: 100%;
  height: 288px;
  object-fit: cover;
}

.frameWrapper {
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
}

.frameGroup {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}

.frameContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.revolutionizingTechnologyParent {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.revolutionizingTechnology,
.popularListingsParentRevolutionizingTechnology {
  width: 100%;
  line-height: 122%;
  text-transform: capitalize;
  font-weight: 600;
  display: inline-block;
}

.innovativeTechnologySolution {
  width: 100%;
  font-size: 16px;
  line-height: 130%;
  text-transform: capitalize;
  color: #757575;
  text-align: left;
}

.frameDiv {
  display: flex;
  align-items: center;
  gap: 2px;
}

.frameIcon {
  width: 24px;
  height: 24px;
  border-radius: 1px;
}

.pinFillParent {
  display: flex;
  align-items: center;
  gap: 4px;
  text-align: left;
  font-size: 16px;
  color: #757575;
}

.pinFillIcon {
  width: 24px;
  height: 24px;
  object-fit: cover;
}

.ulaanbaatarMongolia {
  line-height: 160%;
  text-transform: capitalize;
  font-weight: 500;
}

/* Responsive Media Queries */
@media (max-width: 992px) {
  .popularListingsParent {
    gap: 36px;
    font-size: 28px;
  }
  .agencyCardIcon {
    height: 260px;
  }
}

@media (max-width: 768px) {
  .popularListingsParent {
    gap: 32px;
    font-size: 24px;
  }
  .frameParent {
    flex-direction: column;   /* stack vertically */
    gap: 24px;
  }
  .agencyCardParent {
    width: 100%;
    max-width: 384px;
    margin: 0 auto;          /* center single card */
  }
}

@media (max-width: 576px) {
  .popularListingsParent {
    gap: 28px;
    font-size: 22px;
    padding: 0 15px;
  }
  .agencyCardIcon {
    height: 220px;
  }
}

@media (max-width: 480px) {
  .popularListingsParent {
    gap: 24px;
    font-size: 20px;
    padding: 0 10px;
  }
  .agencyCardIcon {
    height: 200px;
  }
  .revolutionizingTechnology,
  .popularListingsParentRevolutionizingTechnology {
    font-size: 16px;
  }
  .innovativeTechnologySolution {
    font-size: 13px;
  }
  .pinFillParent {
    font-size: 14px;
  }
}

@media (max-width: 360px) {
  .popularListingsParent {
    font-size: 18px;
  }
  .agencyCardIcon {
    height: 180px;
  }
  .revolutionizingTechnology,
  .popularListingsParentRevolutionizingTechnology {
    font-size: 15px;
  }
  .innovativeTechnologySolution {
    font-size: 12px;
  }
}

</style>