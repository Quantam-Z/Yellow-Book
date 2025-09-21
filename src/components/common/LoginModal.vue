<template>
  <div v-if="isOpen" :class="$style.modalOverlay" @click="closeModal">
    <div :class="$style.frameParent" @click.stop>
      <div :class="$style.frameGroup">
        <div :class="$style.chooseYourRoleParent">
          <div :class="$style.chooseYourRole">Choose your role</div>
          <div :class="$style.frameContainer">
            <div :class="$style.frameDiv">
              <User :class="$style.frameIcon" />
              <div :class="$style.button">User</div>
            </div>
            <div :class="$style.frameDiv" @click.stop="handleBusinessClick">
  <Building :class="$style.frameIcon" />
  <div :class="$style.button">Business</div>
</div>

          </div>
        </div>
        <X :class="$style.closeIcon" @click="closeModal" />
      </div>
      <div :class="$style.frameParent3">
        <div :class="$style.loginAsATouristParent">
          <div :class="$style.chooseYourRole">Login as a Tourist</div>
          <div :class="$style.button3">Sign in quickly using your preferred social account or a one-time email code.</div>
        </div>
        <div :class="$style.buttonParent">
          <div :class="$style.button4">
            <svg :class="$style.icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <div :class="$style.button">Log in with Google</div>
          </div>
          <div :class="$style.button4">
            <svg :class="$style.icon" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <div :class="$style.button">Log in with Facebook</div>
          </div>
          <div :class="$style.button4">
            <svg :class="$style.icon" viewBox="0 0 24 24" fill="#000">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
            </svg>
            <div :class="$style.button">Log in with Apple</div>
          </div>
        </div>
        <div :class="$style.lineParent">
          <div :class="$style.frameChild" />
          <div :class="$style.button">OR</div>
          <div :class="$style.frameChild" />
        </div>
        <div :class="$style.emailCodeLoginParent">
          <div :class="$style.emailCodeLogin">Email Code Login</div>
          <div :class="$style.buttonGroup">
            <div :class="$style.button10">Enter your email/mobile number</div>
            <div :class="$style.button11">
              <div :class="$style.button12">your email/contact number</div>
            </div>
          </div>
          <div :class="$style.button13">
            <div :class="$style.button14">Send Code</div>
          </div>
        </div>
        <div :class="$style.frameParent4">
          <div :class="$style.buttonWrapper">
            <div :class="$style.button15">Terms & Conditions</div>
          </div>
          <div :class="$style.buttonContainer">
            <div :class="$style.button15">Privacy Policy</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { User, Building, X } from 'lucide-vue-next'
// Assuming BuisnessReg is a separate component you've created
// import BuisnessReg from '~/components/modal/BuisnessReg.vue'

export default {
  name: 'LoginModal',
  components: {
    User,
    Building,
    X
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  // Add the new 'open-business-reg' event to the emits option
  emits: ['close', 'open-business-reg'],
  methods: {
    closeModal() {
      this.$emit('close')
    },
    // Define the new method to handle the click
    handleBusinessClick() {
      // Emit the custom event to the parent component
      this.$emit('open-business-reg')
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
      max-width: 500px;
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
      color: #424242;
      font-family: 'Plus Jakarta Sans';
    }
    
    .frameGroup {
      align-self: stretch;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
    }
    
    .chooseYourRoleParent {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    
    .chooseYourRole {
      align-self: stretch;
      position: relative;
      line-height: 130%;
      text-transform: capitalize;
      font-weight: 600;
    }
    
    .frameContainer {
      align-self: stretch;
      display: flex;
      align-items: center;
      gap: 18px;
      font-size: 16px;
      color: #616161;
    }
    
    .frameDiv {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .frameIcon {
      width: 24px;
      height: 24px;
      color: #616161;
    }
    
    .closeIcon {
      width: 24px;
      height: 24px;
      color: #616161;
      cursor: pointer;
      flex-shrink: 0;
    }
    
    .closeIcon:hover {
      color: #212121;
    }
    
    .button {
      position: relative;
      line-height: 160%;
      text-transform: capitalize;
      font-weight: 500;
    }
    
    .frameParent3 {
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
    }
    
    .loginAsATouristParent {
      width: 100%;
      max-width: 376px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      text-align: center;
      font-size: 24px;
    }
    
    .button3 {
      align-self: stretch;
      position: relative;
      font-size: 16px;
      line-height: 160%;
      text-transform: capitalize;
      font-weight: 500;
      color: #616161;
    }
    
    .buttonParent {
      width: 100%;
      max-width: 440px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    
    .button4 {
      align-self: stretch;
      border-radius: 4px;
      background-color: #f6fafd;
      border: 1px solid #dbe7ff;
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
    
    .button4:hover {
      background-color: #e3f2fd;
    }
    
    .icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }
    
    .lineParent {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      text-align: center;
      color: #9e9e9e;
      width: 100%;
    }
    
    .frameChild {
      flex: 1;
      position: relative;
      border-top: 1px solid #dbe7ff;
      box-sizing: border-box;
      height: 1px;
    }
    
    .emailCodeLoginParent {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
    }
    
    .emailCodeLogin {
      align-self: stretch;
      position: relative;
      font-size: 20px;
      line-height: 130%;
      text-transform: capitalize;
      font-weight: 600;
    }
    
    .buttonGroup {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    
    .button10 {
      align-self: stretch;
      position: relative;
      line-height: 160%;
      text-transform: capitalize;
      font-weight: 500;
    }
    
    .button11 {
      align-self: stretch;
      border-radius: 4px;
      background-color: #eee;
      border: 1px solid #bdbdbd;
      box-sizing: border-box;
      height: 46px;
      display: flex;
      align-items: center;
      padding: 12px 10px;
      color: #9e9e9e;
    }
    
    .button12 {
      position: relative;
      line-height: 160%;
      text-transform: capitalize;
      font-weight: 500;
    }
    
    .button13 {
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
    
    .button13:hover {
      background-color: #e5b106;
    }
    
    .button14 {
      position: relative;
      line-height: 130%;
      text-transform: capitalize;
      font-weight: 600;
    }
    
    .frameParent4 {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      gap: 32px;
      font-size: 14px;
    }
    
    .buttonWrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .button15 {
      position: relative;
      line-height: 170%;
      text-transform: capitalize;
      cursor: pointer;
      color: #616161;
    }
    
    .button15:hover {
      color: #212121;
    }
    
    .buttonContainer {
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
      
      .frameGroup {
        gap: 10px;
      }
      
      .frameContainer {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
      }
      
      .frameDiv {
        gap: 8px;
      }
      
      .frameParent3 {
        padding: 12px;
        gap: 24px;
      }
      
      .loginAsATouristParent {
        font-size: 20px;
      }
      
      .frameParent4 {
        flex-direction: column;
        gap: 16px;
        align-items: center;
      }
    }
    
    @media (max-width: 576px) {
      .frameParent {
        font-size: 18px;
      }
      
      .loginAsATouristParent {
        font-size: 18px;
      }
      
      .button4 {
        padding: 10px 16px;
        font-size: 14px;
      }
      
      .button13 {
        padding: 16px 24px;
      }
    }
    </style>