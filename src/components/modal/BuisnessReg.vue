<template>
    <!-- Modal Overlay -->
    <div v-if="isOpen" :class="$style.modalOverlay" @click="closeModal">
      <div :class="$style.frameParent" @click.stop>
            <div :class="$style.frameGroup">
                  <div :class="$style.step1Of3Parent">
                        <div :class="$style.step1Of3">Step 1 of 3</div>
                        <svg :class="$style.closeRoundIcon" @click="closeModal" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                        </svg>
                  </div>
                  <div :class="$style.rectangleParent">
                        <div :class="$style.frameChild" />
                        <div :class="$style.frameItem" />
                        <div :class="$style.frameItem" />
                  </div>
            </div>
            <div :class="$style.frameContainer">
                  <div :class="$style.welcomeToYellowbookParent">
                        <div :class="$style.welcomeToYellowbook">Welcome to Yellow.Book</div>
                        <div :class="$style.button">
                              <span :class="$style.createYourBusiness">Create your business account</span>
                              <span :class="$style.toGetStarted"> to get started with trusted travel listings and client engagement.</span>
                        </div>
                  </div>
                  <div :class="$style.buttonParent">
                        <div :class="$style.button2">
                              <svg :class="$style.icon" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                              </svg>
                              <div :class="$style.orContinueWith">Sign up with Google</div>
                        </div>
                        <div :class="$style.button2">
                              <svg :class="$style.icon" viewBox="0 0 24 24" fill="#1877F2">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                              </svg>
                              <div :class="$style.orContinueWith">signup with Facebook</div>
                        </div>
                  </div>
                  <div :class="$style.lineParent">
                        <div :class="$style.lineDiv" />
                        <div :class="$style.orContinueWith">OR continue with email</div>
                        <div :class="$style.lineDiv" />
                  </div>
                  <div :class="$style.frameDiv">
                        <div :class="$style.frameParent2">
                              <div :class="$style.frameGroup">
                                    <div :class="$style.button6">Work Email</div>
                                    <div :class="$style.button7">
                                          <input type="email" :class="$style.inputField" placeholder="Name@company.com" />
                                    </div>
                              </div>
                              <div :class="$style.frameGroup">
                                    <div :class="$style.button6">Password</div>
                                    <div :class="$style.button7">
                                          <input type="password" :class="$style.inputField" placeholder="*******" />
                                    </div>
                              </div>
                              <div :class="$style.frameGroup">
                                    <div :class="$style.button6">Confirm Password</div>
                                    <div :class="$style.button7">
                                          <input type="password" :class="$style.inputField" placeholder="*******" />
                                    </div>
                              </div>
                              <div :class="$style.checkBoxParent">
                                    <div :class="$style.checkBox" @click="toggleCheckbox">
                                          <svg v-if="!isChecked" :class="$style.vectorIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                          </svg>
                                          <svg v-else :class="$style.vectorIconChecked" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="#1877f2"/>
                                          </svg>
                                    </div>
                                    <div :class="$style.button15">I'd like to receive a demo of Yellow.Book's paid plans.</div>
                              </div>
                        </div>
                        <div :class="$style.button16">
                              <div :class="$style.step1Of3">Next</div>
                        </div>
                  </div>
                  <div :class="$style.buttonWrapper">
                        <div :class="$style.button18">
                              <span>Already have an account </span>
                              <span :class="$style.signIn" @click="$emit('switchToLogin')">sign in</span>
                              <span> now</span>
                        </div>
                  </div>
                  <div :class="$style.frameParent3">
                        <div :class="$style.buttonWrapper">
                              <div :class="$style.button15">Terms & Conditions</div>
                        </div>
                        <div :class="$style.buttonWrapper2">
                              <div :class="$style.button15">Privacy Policy</div>
                        </div>
                  </div>
            </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignupModal',
    props: {
      isOpen: {
        type: Boolean,
        default: false
      }
    },
    emits: ['close', 'switchToLogin'],
    data() {
      return {
        isChecked: false
      }
    },
    methods: {
      closeModal() {
        this.$emit('close')
      },
      toggleCheckbox() {
        this.isChecked = !this.isChecked
      }
    }
  }
  </script>
  
  <style module>
  .modalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .frameParent {
      position: relative;
      border-radius: 12px;
      background-color: #fff;
      width: 100%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
      box-sizing: border-box;
      gap: 32px;
      text-align: left;
      font-size: 20px;
      color: #1877f2;
      font-family: 'Plus Jakarta Sans';
  }
  
  .frameGroup {
        align-self: stretch;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
  }
  
  .step1Of3Parent {
        align-self: stretch;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 20px;
  }
  
  .step1Of3 {
        position: relative;
        line-height: 130%;
        text-transform: capitalize;
        font-weight: 600;
  }
  
  .closeRoundIcon {
        width: 24px;
        height: 24px;
        color: #616161;
        cursor: pointer;
        flex-shrink: 0;
  }
  
  .closeRoundIcon:hover {
        color: #212121;
  }
  
  .rectangleParent {
        display: flex;
        align-items: flex-start;
        gap: 16px;
  }
  
  .frameChild {
        width: 158px;
        position: relative;
        border-radius: 4px;
        background-color: #1877f2;
        height: 8px;
  }
  
  .frameItem {
        width: 158px;
        position: relative;
        border-radius: 4px;
        background-color: #e0e0e0;
        height: 8px;
  }
  
  .frameContainer {
        align-self: stretch;
        box-shadow: 0px 4px 16px rgba(168, 168, 168, 0.24);
        border-radius: 8px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        gap: 32px;
        font-size: 16px;
        color: #424242;
  }
  
  .welcomeToYellowbookParent {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        text-align: center;
        font-size: 24px;
  }
  
  .welcomeToYellowbook {
        align-self: stretch;
        position: relative;
        line-height: 130%;
        text-transform: capitalize;
        font-weight: 600;
  }
  
  .button {
        width: 100%;
        max-width: 418px;
        position: relative;
        font-size: 16px;
        line-height: 160%;
        text-transform: capitalize;
        color: #616161;
        display: inline-block;
  }
  
  .createYourBusiness {
        text-decoration: underline;
        font-weight: 600;
  }
  
  .toGetStarted {
        font-weight: 500;
  }
  
  .buttonParent {
        width: 100%;
        max-width: 440px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
  }
  
  .button2 {
        align-self: stretch;
        border-radius: 4px;
        border: 1px solid #bdbdbd;
        box-sizing: border-box;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 24px;
        gap: 12px;
        cursor: pointer;
        transition: background-color 0.2s ease;
  }
  
  .button2:hover {
        background-color: #f6fafd;
  }
  
  .icon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
  }
  
  .lineParent {
        width: 100%;
        max-width: 401px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        text-align: center;
        color: #9e9e9e;
  }
  
  .lineDiv {
        flex: 1;
        position: relative;
        border-top: 1px solid #bdbdbd;
        box-sizing: border-box;
        height: 1px;
  }
  
  .orContinueWith {
        position: relative;
        line-height: 160%;
        text-transform: capitalize;
        font-weight: 500;
  }
  
  .frameDiv {
        align-self: stretch;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
  }
  
  .frameParent2 {
        align-self: stretch;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
  }
  
  .button6 {
        align-self: stretch;
        position: relative;
        line-height: 160%;
        text-transform: capitalize;
        font-weight: 500;
  }
  
  .button7 {
        align-self: stretch;
        border-radius: 4px;
        background-color: #eee;
        border: 1px solid #bdbdbd;
        box-sizing: border-box;
        height: 46px;
        display: flex;
        align-items: center;
        padding: 12px;
        color: #9e9e9e;
  }
  
  .inputField {
        width: 100%;
        border: none;
        background: transparent;
        outline: none;
        color: #424242;
        font-size: 16px;
        font-family: inherit;
  }
  
  .inputField::placeholder {
        color: #9e9e9e;
  }
  
  .checkBoxParent {
        align-self: stretch;
        display: flex;
        align-items: center;
        gap: 8px;
        text-align: left;
        font-size: 14px;
        color: #616161;
  }
  
  .checkBox {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        cursor: pointer;
        color: #bdbdbd;
  }
  
  .vectorIcon {
        width: 24px;
        height: 24px;
  }
  
  .vectorIconChecked {
        width: 24px;
        height: 24px;
        color: #1877f2;
  }
  
  .button15 {
        position: relative;
        line-height: 170%;
        text-transform: capitalize;
  }
  
  .button16 {
        align-self: stretch;
        border-radius: 4px;
        background-color: #fcc207;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 18px 36px;
        box-sizing: border-box;
        text-align: center;
        color: #212121;
        cursor: pointer;
        transition: background-color 0.2s ease;
  }
  
  .button16:hover {
        background-color: #e5b106;
  }
  
  .buttonWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
  }
  
  .button18 {
        position: relative;
        line-height: 160%;
        text-transform: capitalize;
        font-weight: 600;
  }
  
  .signIn {
        color: #28aed8;
        cursor: pointer;
  }
  
  .signIn:hover {
        text-decoration: underline;
  }
  
  .frameParent3 {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        gap: 32px;
        font-size: 14px;
  }
  
  .buttonWrapper2 {
        display: flex;
        align-items: center;
        justify-content: center;
  }
  
  /* Responsive Media Queries */
  @media (max-width: 768px) {
    .modalOverlay {
      padding: 10px;
    }
    
    .frameParent {
      max-width: 100%;
      padding: 16px;
      gap: 24px;
    }
    
    .step1Of3Parent {
      gap: 10px;
    }
    
    .rectangleParent {
      gap: 12px;
    }
    
    .frameChild,
    .frameItem {
      width: 120px;
    }
    
    .frameContainer {
      padding: 12px;
      gap: 24px;
    }
    
    .welcomeToYellowbookParent {
      font-size: 20px;
    }
    
    .frameParent3 {
      flex-direction: column;
      gap: 16px;
      align-items: center;
    }
  }
  
  @media (max-width: 576px) {
    .frameParent {
      font-size: 18px;
    }
    
    .welcomeToYellowbookParent {
      font-size: 18px;
    }
    
    .button2 {
      padding: 10px 16px;
      font-size: 14px;
    }
    
    .button16 {
      padding: 16px 24px;
    }
    
    .rectangleParent {
      flex-direction: column;
      gap: 8px;
    }
    
    .frameChild,
    .frameItem {
      width: 100%;
    }
  }
  </style>