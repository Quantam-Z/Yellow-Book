<template>
    <div :class="$style.frameParent">
          <div :class="$style.frequentlyAskedQuestionsParent">
                <div :class="$style.frequentlyAskedQuestions">Frequently Asked Questions</div>
                <div :class="$style.everythingYouNeed">Everything you need to know about using Yellow Book.</div>
          </div>
          <div :class="$style.frameGroup">
                <div :class="$style.frameContainer">
                      <div :class="$style.whatIsYellowBookParent">
                            <div :class="$style.whatIsYellow">What is Yellow Book?</div>
                                  <img :class="$style.frameChild" alt="" />
                                  </div>
                                  <div :class="$style.yellowBookIsAPlatformWherWrapper">
                                        <div :class="$style.yellowBookIs">Yellow Book is a platform where users can discover, review, and connect with companies from different categories such as travel agencies, restaurants, and more.</div>
                                  </div>
                                  </div>
                                  <div :class="$style.frameWrapper">
                                        <div :class="$style.whatIsYellowBookParent">
                                              <div :class="$style.whatIsYellow">How can I register my company?</div>
                                                    <img :class="$style.frameChild" alt="" />
                                                    </div>
                                                    </div>
                                                    <div :class="$style.frameWrapper">
                                                          <div :class="$style.whatIsYellowBookParent">
                                                                <div :class="$style.whatIsYellow">Are all companies verified?</div>
                                                                      <img :class="$style.frameChild" alt="" />
                                                                      </div>
                                                                      </div>
                                                                      <div :class="$style.frameWrapper">
                                                                            <div :class="$style.whatIsYellowBookParent">
                                                                                  <div :class="$style.whatIsYellow">How do reviews work?</div>
                                                                                        <img :class="$style.frameChild" alt="" />
                                                                                        </div>
                                                                                        </div>
                                                                                        </div>
                                                                                        </div>
                                                                                        </template>
                                                                                        <style  module>.frameParent {
                                                                                              width: 100%;
                                                                                              position: relative;
                                                                                              display: flex;
                                                                                              flex-direction: column;
                                                                                              align-items: center;
                                                                                              gap: 44px;
                                                                                              text-align: center;
                                                                                              font-size: 30px;
                                                                                              color: #212121;
                                                                                              font-family: 'Plus Jakarta Sans';
                                                                                        }
                                                                                              .frequentlyAskedQuestionsParent {
                                                                                                    align-self: stretch;
                                                                                                    display: flex;
                                                                                                    flex-direction: column;
                                                                                                    align-items: flex-start;
                                                                                                    gap: 16px;
                                                                                              }
                                                                                              .frequentlyAskedQuestions {
                                                                                                    align-self: stretch;
                                                                                                    position: relative;
                                                                                                    line-height: 126%;
                                                                                                    text-transform: capitalize;
                                                                                                    font-weight: 600;
                                                                                              }
                                                                                              .everythingYouNeed {
                                                                                                    align-self: stretch;
                                                                                                    position: relative;
                                                                                                    font-size: 16px;
                                                                                                    line-height: 160%;
                                                                                                    text-transform: capitalize;
                                                                                                    font-weight: 500;
                                                                                                    color: #9e9e9e;
                                                                                              }
                                                                                              .frameGroup {
                                                                                                    width: 588px;
                                                                                                    display: flex;
                                                                                                    flex-direction: column;
                                                                                                    align-items: flex-start;
                                                                                                    gap: 16px;
                                                                                                    font-size: 18px;
                                                                                              }
                                                                                              .frameContainer {
                                                                                                    align-self: stretch;
                                                                                                    border-radius: 8px;
                                                                                                    background-color: #feecb2;
                                                                                                    display: flex;
                                                                                                    flex-direction: column;
                                                                                                    align-items: flex-start;
                                                                                                    padding: 10px 16px;
                                                                                                    gap: 4px;
                                                                                              }
                                                                                              .whatIsYellowBookParent {
                                                                                                    align-self: stretch;
                                                                                                    display: flex;
                                                                                                    align-items: center;
                                                                                                    justify-content: space-between;
                                                                                                    gap: 0px;
                                                                                              }
                                                                                              .whatIsYellow {
                                                                                                    position: relative;
                                                                                                    line-height: 160%;
                                                                                                    text-transform: capitalize;
                                                                                                    font-weight: 600;
                                                                                              }
                                                                                              .frameChild {
                                                                                                    width: 44px;
                                                                                                    border-radius: 22px;
                                                                                                    height: 44px;
                                                                                              }
                                                                                              .yellowBookIsAPlatformWherWrapper {
                                                                                                    align-self: stretch;
                                                                                                    display: flex;
                                                                                                    align-items: center;
                                                                                                    padding: 10px 0px;
                                                                                                    text-align: left;
                                                                                                    font-size: 16px;
                                                                                                    color: #424242;
                                                                                              }
                                                                                              .yellowBookIs {
                                                                                                    flex: 1;
                                                                                                    position: relative;
                                                                                                    line-height: 160%;
                                                                                                    text-transform: capitalize;
                                                                                                    font-weight: 500;
                                                                                              }
                                                                                              .frameWrapper {
                                                                                                    align-self: stretch;
                                                                                                    border-radius: 8px;
                                                                                                    background-color: #feecb2;
                                                                                                    display: flex;
                                                                                                    flex-direction: column;
                                                                                                    align-items: flex-start;
                                                                                                    padding: 10px 16px;
                                                                                              }
                                                                                        
                                                                                        </style>