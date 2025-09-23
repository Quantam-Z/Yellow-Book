<template>
  <!-- Modal Overlay -->
  <div v-if="isOpen" :class="$style.modalOverlay" @click="closeModal">
    <div :class="$style.frameParent" @click.stop>
      
      <!-- Step 1: Account Creation -->
      <div v-if="currentStep === 1">
        <div :class="$style.frameGroup">
          <div :class="$style.step1Of3Parent">
            <div :class="$style.step1Of3">Step 1 of 3</div>
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
                  <input type="email" :class="$style.inputField" placeholder="Name@company.com" v-model="formData.email" />
                </div>
              </div>
              <div :class="$style.frameGroup">
                <div :class="$style.button6">Password</div>
                <div :class="$style.button7">
                  <input type="password" :class="$style.inputField" placeholder="*******" v-model="formData.password" />
                </div>
              </div>
              <div :class="$style.frameGroup">
                <div :class="$style.button6">Confirm Password</div>
                <div :class="$style.button7">
                  <input type="password" :class="$style.inputField" placeholder="*******" v-model="formData.confirmPassword" />
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
            <div :class="$style.button16" @click="nextStep">
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

      <!-- Step 2: Business Information -->
      <div v-if="currentStep === 2">
        <div :class="$style.step2of3Parent">
          <div :class="$style.tellUsAbout">Step 2 of 3</div>
          <div :class="$style.rectangleParent">
            <div :class="$style.frameChild" />
            <div :class="$style.frameChild" />
            <div :class="$style.frameInner" />
          </div>
        </div>
        <div :class="$style.frameGroup">
          <div :class="$style.tellUsAboutYourBusinessParent">
            <div :class="$style.tellUsAbout">Tell Us About Your Business</div>
            <div :class="$style.button">Help us understand your business better so we can serve you more effectively.</div>
          </div>
          <div :class="$style.frameContainer">
            <div :class="$style.frameDiv">
              <div :class="$style.step2of3Parent">
                <div>Website</div>
                <div :class="$style.button3">
                  <input type="url" :class="$style.inputField" placeholder="https://www.yourcompany.com" v-model="formData.website" />
                </div>
              </div>
              <div :class="$style.step2of3Parent">
                <div>Company Name</div>
                <div :class="$style.button3">
                  <input type="text" :class="$style.inputField" placeholder="e.g., Yellow.Book" v-model="formData.companyName" />
                </div>
              </div>
              <div :class="$style.step2of3Parent">
                <div>Company Category</div>
                <div :class="$style.buttonParent2" @click="toggleDropdown('category')">
                  <div :class="$style.button9">
                    <div :class="$style.button4">{{ formData.category || 'Company Category' }}</div>
                    <svg :class="$style.expandDownIcon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                    </svg>
                  </div>
                  <div v-if="dropdowns.category" :class="$style.dropdownOptions">
                    <div :class="$style.button11" @click="selectOption('category', 'Travel & Tourism')">
                      <div :class="$style.button4">Travel & Tourism</div>
                    </div>
                    <div :class="$style.button11" @click="selectOption('category', 'Hospitality')">
                      <div :class="$style.button4">Hospitality</div>
                    </div>
                    <div :class="$style.button15" @click="selectOption('category', 'Adventure Tours')">
                      <div :class="$style.button4">Adventure Tours</div>
                    </div>
                  </div>
                </div>
              </div>
              <div :class="$style.buttonParent3">
                <div>Type of service</div>
                <div :class="$style.buttonParent4" @click="toggleDropdown('service')">
                  <div :class="$style.button9">
                    <div :class="$style.button4">{{ formData.service || 'Type of service' }}</div>
                    <svg :class="$style.expandDownIcon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                    </svg>
                  </div>
                  <div v-if="dropdowns.service" :class="$style.dropdownOptions">
                    <div :class="$style.button11" @click="selectOption('service', 'Tour Packages')">
                      <div :class="$style.button4">Tour Packages</div>
                    </div>
                    <div :class="$style.button11" @click="selectOption('service', 'Transportation')">
                      <div :class="$style.button4">Transportation</div>
                    </div>
                    <div :class="$style.button15" @click="selectOption('service', 'Accommodation')">
                      <div :class="$style.button4">Accommodation</div>
                    </div>
                  </div>
                </div>
              </div>
              <div :class="$style.buttonParent3">
                <div :class="$style.button2">Animals treated</div>
                <div :class="$style.buttonParent4" @click="toggleDropdown('animals')">
                  <div :class="$style.button9">
                    <div :class="$style.button4">{{ formData.animals || 'Service' }}</div>
                    <svg :class="$style.expandDownIcon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                    </svg>
                  </div>
                  <div v-if="dropdowns.animals" :class="$style.dropdownOptions">
                    <div :class="$style.button11" @click="selectOption('animals', 'Horses')">
                      <div :class="$style.button4">Horses</div>
                    </div>
                    <div :class="$style.button11" @click="selectOption('animals', 'Camels')">
                      <div :class="$style.button4">Camels</div>
                    </div>
                    <div :class="$style.button15" @click="selectOption('animals', 'Yaks')">
                      <div :class="$style.button4">Yaks</div>
                    </div>
                  </div>
                </div>
              </div>
              <div :class="$style.step2of3Parent">
                <div :class="$style.button2">Company Destination</div>
                <div :class="$style.buttonParent2" @click="toggleDropdown('destination')">
                  <div :class="$style.button9">
                    <div :class="$style.button4">{{ formData.destination || 'Company Destination' }}</div>
                    <svg :class="$style.expandDownIcon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                    </svg>
                  </div>
                  <div v-if="dropdowns.destination" :class="$style.dropdownOptions">
                    <div :class="$style.button11" @click="selectOption('destination', 'Ulaanbaatar')">
                      <div :class="$style.button4">Ulaanbaatar</div>
                    </div>
                    <div :class="$style.button11" @click="selectOption('destination', 'Gobi Desert')">
                      <div :class="$style.button4">Gobi Desert</div>
                    </div>
                    <div :class="$style.button15" @click="selectOption('destination', 'Altai Mountains')">
                      <div :class="$style.button4">Altai Mountains</div>
                    </div>
                  </div>
                </div>
              </div>
              <div :class="$style.step2of3Parent">
                <div :class="$style.button2">Number of Employees</div>
                <div :class="$style.buttonParent2" @click="toggleDropdown('employees')">
                  <div :class="$style.button9">
                    <div :class="$style.button4">{{ formData.employees || '00' }}</div>
                    <svg :class="$style.expandDownIcon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                    </svg>
                  </div>
                  <div v-if="dropdowns.employees" :class="$style.dropdownOptions">
                    <div :class="$style.button11" @click="selectOption('employees', '1–10')">
                      <div :class="$style.button4">1–10</div>
                    </div>
                    <div :class="$style.button11" @click="selectOption('employees', '11–30')">
                      <div :class="$style.button4">11–30</div>
                    </div>
                    <div :class="$style.button15" @click="selectOption('employees', '31–50')">
                      <div :class="$style.button4">31–50</div>
                    </div>
                  </div>
                </div>
              </div>
              <div :class="$style.step2of3Parent">
                <div :class="$style.button2">Annual Revenue</div>
                <div :class="$style.buttonParent2" @click="toggleDropdown('revenue')">
                  <div :class="$style.button9">
                    <div :class="$style.button4">{{ formData.revenue || '00 MNT' }}</div>
                    <svg :class="$style.expandDownIcon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                    </svg>
                  </div>
                  <div v-if="dropdowns.revenue" :class="$style.dropdownOptions">
                    <div :class="$style.button11" @click="selectOption('revenue', '< 10M MNT')">
                      <div :class="$style.button4">< 10M MNT</div>
                    </div>
                    <div :class="$style.button11" @click="selectOption('revenue', '10M - 50M MNT')">
                      <div :class="$style.button4">10M - 50M MNT</div>
                    </div>
                    <div :class="$style.button15" @click="selectOption('revenue', '> 50M MNT')">
                      <div :class="$style.button4">> 50M MNT</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="$style.buttonParent13">
              <div :class="$style.button62" @click="prevStep">
                <div :class="$style.button63">Back</div>
              </div>
              <div :class="$style.button64" @click="nextStep">
                <div :class="$style.button65">Next</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Personal Information -->
      <div v-if="currentStep === 3">
        <div :class="$style.step3of3Parent">
          <div :class="$style.tellUsAbout">Step 3 of 3</div>
          <div :class="$style.rectangleParent">
            <div :class="$style.frameChild" />
            <div :class="$style.frameChild" />
            <div :class="$style.frameChild" />
          </div>
        </div>
        <div :class="$style.frameGroup">
          <div :class="$style.tellUsAboutYourselfParent">
            <div :class="$style.tellUsAbout">Tell Us About Yourself</div>
            <div :class="$style.button">Complete your profile to start listing your services on Yellow.Book.</div>
          </div>
          <div :class="$style.frameContainer">
            <div :class="$style.frameDiv">
              <div :class="$style.step3of3Parent">
                <div :class="$style.button2">First Name</div>
                <div :class="$style.button3">
                  <input type="text" :class="$style.inputField" placeholder="John" v-model="formData.firstName" />
                </div>
              </div>
              <div :class="$style.step3of3Parent">
                <div :class="$style.button2">Last Name</div>
                <div :class="$style.button3">
                  <input type="text" :class="$style.inputField" placeholder="Doe" v-model="formData.lastName" />
                </div>
              </div>
              <div :class="$style.step3of3Parent">
                <div :class="$style.button2">Job Title</div>
                <div :class="$style.button3">
                  <input type="text" :class="$style.inputField" placeholder="e.g., CEO, Travel Agent" v-model="formData.jobTitle" />
                </div>
              </div>
              <div :class="$style.frameParent2">
                <div :class="$style.buttonParent2">
                  <div :class="$style.button2">Country</div>
                  <div :class="$style.buttonParent3" @click="toggleCountryDropdown">
                    <div :class="$style.button12">
                      <div :class="$style.countryFlag">
                        <span>{{ selectedFlag || '🇲🇳' }}</span>
                        <span>{{ formData.country || 'Mongolia' }}</span>
                      </div>
                      <svg :class="$style.expandDownIcon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                      </svg>
                    </div>
                    <div v-if="showCountryDropdown" :class="$style.dropdownOptions">
                      <div :class="$style.button13" @click="selectCountry('Mongolia', '🇲🇳')">
                        <span>🇲🇳</span>
                        <span>Mongolia</span>
                      </div>
                      <div :class="$style.button13" @click="selectCountry('China', '🇨🇳')">
                        <span>🇨🇳</span>
                        <span>China</span>
                      </div>
                      <div :class="$style.button15" @click="selectCountry('Russia', '🇷🇺')">
                        <span>🇷🇺</span>
                        <span>Russia</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div :class="$style.buttonParent4">
                  <div :class="$style.button2">Phone Number</div>
                  <div :class="$style.button3">
                    <div :class="$style.phoneContainer">
                      <span :class="$style.countryCode">{{ formData.countryCode || '+976' }}</span>
                      <input type="tel" :class="$style.phoneInput" placeholder="12345678" v-model="formData.phoneNumber" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="$style.buttonParent5">
              <div :class="$style.button19" @click="prevStep">
                <div :class="$style.button20">Back</div>
              </div>
              <div :class="$style.button21" @click="completeRegistration">
                <div :class="$style.button22">Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'CombinedRegistrationModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'complete', 'switchToLogin'],
  data() {
    return {
      currentStep: 1,
      isChecked: false,
      showCountryDropdown: false,
      selectedFlag: '🇲🇳',
      dropdowns: {
        category: false,
        service: false,
        animals: false,
        destination: false,
        employees: false,
        revenue: false
      },
      formData: {
        // Step 1
        email: '',
        password: '',
        confirmPassword: '',
        // Step 2
        website: '',
        companyName: '',
        category: '',
        service: '',
        animals: '',
        destination: '',
        employees: '',
        revenue: '',
        // Step 3
        firstName: '',
        lastName: '',
        jobTitle: '',
        country: 'Mongolia',
        countryCode: '+976',
        phoneNumber: ''
      }
    }
  },
  methods: {
    closeModal() {
      this.resetForm()
      this.$emit('close')
    },
    nextStep() {
      if (this.currentStep < 3) {
        this.currentStep++
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    toggleCheckbox() {
      this.isChecked = !this.isChecked
    },
    toggleDropdown(type) {
      Object.keys(this.dropdowns).forEach(key => {
        this.dropdowns[key] = false
      })
      this.dropdowns[type] = true
    },
    selectOption(type, value) {
      this.formData[type] = value
      this.dropdowns[type] = false
    },
    toggleCountryDropdown() {
      this.showCountryDropdown = !this.showCountryDropdown
    },
    selectCountry(country, flag) {
      this.formData.country = country
      this.selectedFlag = flag
      
      const countryCodes = {
        'Mongolia': '+976',
        'China': '+86',
        'Russia': '+7'
      }
      this.formData.countryCode = countryCodes[country]
      this.showCountryDropdown = false
    },
    completeRegistration() {
      this.$emit('complete', this.formData)
      this.resetForm()
    },
    resetForm() {
      this.currentStep = 1
      this.isChecked = false
      this.showCountryDropdown = false
      this.selectedFlag = '🇲🇳'
      Object.keys(this.dropdowns).forEach(key => {
        this.dropdowns[key] = false
      })
      this.formData = {
        email: '',
        password: '',
        confirmPassword: '',
        website: '',
        companyName: '',
        category: '',
        service: '',
        animals: '',
        destination: '',
        employees: '',
        revenue: '',
        firstName: '',
        lastName: '',
        jobTitle: '',
        country: 'Mongolia',
        countryCode: '+976',
        phoneNumber: ''
      }
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
  max-width: 550px;
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

/* All your existing styles from the individual modals */
.frameGroup {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.step1Of3Parent,
.step2of3Parent,
.step3of3Parent {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.step1Of3,
.tellUsAbout {
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

.frameInner {
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

.welcomeToYellowbookParent,
.tellUsAboutYourBusinessParent,
.tellUsAboutYourselfParent {
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

.button6,
.button2 {
  align-self: stretch;
  position: relative;
  line-height: 160%;
  text-transform: capitalize;
  font-weight: 500;
}

.button7,
.button3 {
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

/* Step 2 & 3 specific styles */
.button4 {
  position: relative;
  line-height: 160%;
  text-transform: capitalize;
  font-weight: 500;
}

.buttonParent2,
.buttonParent4 {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #9e9e9e;
  position: relative;
  cursor: pointer;
}

.button9 {
  align-self: stretch;
  background-color: #fafafa;
  border-bottom: 1px solid #bdbdbd;
  box-sizing: border-box;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  gap: 20px;
}

.expandDownIcon {
  width: 24px;
  height: 24px;
  color: #9e9e9e;
  flex-shrink: 0;
}

.dropdownOptions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #bdbdbd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.button11,
.button13 {
  align-self: stretch;
  background-color: #f6fafd;
  border-bottom: 1px solid #bdbdbd;
  box-sizing: border-box;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 12px;
  cursor: pointer;
  gap: 8px;
  font-size: 14px;
}

.button11:hover,
.button13:hover {
  background-color: #e3f2fd;
}

.button15 {
  align-self: stretch;
  background-color: #f6fafd;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 12px;
  box-sizing: border-box;
  cursor: pointer;
  gap: 8px;
  font-size: 14px;
}

.button15:hover {
  background-color: #e3f2fd;
}

.buttonParent3 {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  font-size: 18px;
  color: #616161;
}

.buttonParent13,
.buttonParent5 {
  align-self: stretch;
  display: flex;
  align-items: flex-start;
  gap: 24px;
  color: #fafafa;
}

.button62,
.button19 {
  flex: 1;
  border-radius: 4px;
  background-color: #424242;
  border: 1px solid #dbe7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 24px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button62:hover,
.button19:hover {
  background-color: #616161;
}

.button63,
.button20 {
  position: relative;
  line-height: 160%;
  text-transform: capitalize;
  font-weight: 600;
}

.button64,
.button21 {
  flex: 0.8743;
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

.button64:hover,
.button21:hover {
  background-color: #e5b106;
}

.button65,
.button22 {
  position: relative;
  line-height: 130%;
  text-transform: capitalize;
  font-weight: 600;
}

/* Step 3 specific styles */
.buttonParent2 {
  width: 123px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.buttonParent3 {
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  cursor: pointer;
}

.button12 {
  align-self: stretch;
  background-color: #fafafa;
  border-bottom: 1px solid #bdbdbd;
  box-sizing: border-box;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  gap: 10px;
}

.countryFlag {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.phoneContainer {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.countryCode {
  color: #424242;
  font-weight: 500;
  flex-shrink: 0;
}

.phoneInput {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  color: #424242;
  font-size: 16px;
  font-family: inherit;
}

.phoneInput::placeholder {
  color: #9e9e9e;
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
  
  .rectangleParent {
    gap: 12px;
  }
  
  .frameChild,
  .frameItem,
  .frameInner {
    width: 120px;
  }
  
  .frameContainer {
    padding: 12px;
    gap: 24px;
  }
  
  .welcomeToYellowbookParent,
  .tellUsAboutYourBusinessParent,
  .tellUsAboutYourselfParent {
    font-size: 20px;
  }
  
  .frameParent3 {
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
  
  .frameParent2 {
    flex-direction: column;
    gap: 16px;
  }
  
  .buttonParent2 {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .frameParent {
    font-size: 18px;
  }
  
  .welcomeToYellowbookParent,
  .tellUsAboutYourBusinessParent,
  .tellUsAboutYourselfParent {
    font-size: 18px;
  }
  
  .button2 {
    padding: 10px 16px;
    font-size: 14px;
  }
  
  .button16,
  .button64,
  .button21 {
    padding: 16px 24px;
  }
  
  .buttonParent13,
  .buttonParent5 {
    flex-direction: column;
    gap: 16px;
  }
  
  .button62,
  .button64,
  .button19,
  .button21 {
    flex: 1;
    width: 100%;
  }
  
  .rectangleParent {
    flex-direction: column;
    gap: 8px;
  }
  
  .frameChild,
  .frameItem,
  .frameInner {
    width: 100%;
  }
}
</style>