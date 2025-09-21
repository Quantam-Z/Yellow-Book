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
                                    <svg :class="$style.frameChild" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                                    </svg>
                                    </div>
                                    <div :class="$style.yellowBookIsAPlatformWherWrapper">
                                          <div :class="$style.yellowBookIs">Yellow Book is a platform where users can discover, review, and connect with companies from different categories such as travel agencies, restaurants, and more.</div>
                                    </div>
                                    </div>
                                    <div :class="$style.frameWrapper">
                                          <div :class="$style.whatIsYellowBookParent">
                                                <div :class="$style.whatIsYellow">How can I register my company?</div>
                                                      <svg :class="$style.frameChild" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                                                      </svg>
                                                      </div>
                                                      </div>
                                                      <div :class="$style.frameWrapper">
                                                            <div :class="$style.whatIsYellowBookParent">
                                                                  <div :class="$style.whatIsYellow">Are all companies verified?</div>
                                                                        <svg :class="$style.frameChild" viewBox="0 0 24 24" fill="currentColor">
                                                                          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                                                                        </svg>
                                                                        </div>
                                                                        </div>
                                                                        <div :class="$style.frameWrapper">
                                                                              <div :class="$style.whatIsYellowBookParent">
                                                                                    <div :class="$style.whatIsYellow">How do reviews work?</div>
                                                                                          <svg :class="$style.frameChild" viewBox="0 0 24 24" fill="currentColor">
                                                                                            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                                                                                          </svg>
                                                                                          </div>
                                                                                          </div>
                                                                                          </div>
                                                                                          </div>
  </template>
  
  <style module>
  .frameParent {
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
        margin-top: 80px;
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
        background-color: #fff;
        padding: 10px;
        box-sizing: border-box;
        color: #212121;
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
  
  /* Responsive Media Queries */
  @media (max-width: 1200px) {
        .frameParent {
              margin-top: 60px;
        }
        .frameGroup {
              width: 100%;
              max-width: 588px;
        }
  }
  
  @media (max-width: 992px) {
        .frameParent {
              gap: 36px;
              font-size: 28px;
              margin-top: 50px;
        }
        .frameGroup {
              font-size: 16px;
        }
        .frameChild {
              width: 40px;
              height: 40px;
        }
  }
  
  @media (max-width: 768px) {
        .frameParent {
              gap: 32px;
              font-size: 24px;
              margin-top: 40px;
              padding: 0 20px;
              box-sizing: border-box;
        }
        .frameGroup {
              width: 100%;
        }
        .frameContainer,
        .frameWrapper {
              padding: 12px 16px;
        }
        .frameChild {
              width: 36px;
              height: 36px;
        }
  }
  
  @media (max-width: 576px) {
        .frameParent {
              gap: 28px;
              font-size: 22px;
              margin-top: 30px;
              padding: 0 15px;
        }
        .frameGroup {
              font-size: 16px;
              gap: 12px;
        }
        .frameContainer,
        .frameWrapper {
              padding: 10px 14px;
        }
        .whatIsYellow {
              font-size: 16px;
        }
        .frameChild {
              width: 32px;
              height: 32px;
        }
  }
  
  @media (max-width: 480px) {
        .frameParent {
              font-size: 20px;
              margin-top: 25px;
              padding: 0 10px;
        }
        .frameGroup {
              font-size: 15px;
        }
        .everythingYouNeed {
              font-size: 14px;
        }
        .yellowBookIsAPlatformWherWrapper {
              font-size: 14px;
        }
  }
  </style>