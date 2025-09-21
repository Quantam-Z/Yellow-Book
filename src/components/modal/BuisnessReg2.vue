<template>
    <!-- Modal Overlay -->
    <div v-if="isOpen" :class="$style.modalOverlay" @click="closeModal">
      <div :class="$style.frameParent" @click.stop>
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
                                    <div :class="$style.button2">Website</div>
                                    <div :class="$style.button3">
                                          <input type="url" :class="$style.inputField" placeholder="https://www.yourcompany.com" />
                                    </div>
                              </div>
                              <div :class="$style.step2of3Parent">
                                    <div :class="$style.button2">Company Name</div>
                                    <div :class="$style.button3">
                                          <input type="text" :class="$style.inputField" placeholder="e.g., Yellow.Book" />
                                    </div>
                              </div>
                              <div :class="$style.step2of3Parent">
                                    <div :class="$style.button2">Company Category</div>
                                    <div :class="$style.buttonParent2" @click="toggleDropdown('category')">
                                          <div :class="$style.button9">
                                                <div :class="$style.button4">{{ selectedCategory || 'Company Category' }}</div>
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
                                    <div :class="$style.button2">Type of service</div>
                                    <div :class="$style.buttonParent4" @click="toggleDropdown('service')">
                                          <div :class="$style.button9">
                                                <div :class="$style.button4">{{ selectedService || 'Type of service' }}</div>
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
                                                <div :class="$style.button4">{{ selectedAnimals || 'Service' }}</div>
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
                                                <div :class="$style.button4">{{ selectedDestination || 'Company Destination' }}</div>
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
                                                <div :class="$style.button4">{{ selectedEmployees || '00' }}</div>
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
                                                <div :class="$style.button4">{{ selectedRevenue || '00 MNT' }}</div>
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
                              <div :class="$style.button62" @click="$emit('goBack')">
                                    <div :class="$style.button63">Back</div>
                              </div>
                              <div :class="$style.button64" @click="$emit('goNext')">
                                    <div :class="$style.button65">Next</div>
                              </div>
                        </div>
                  </div>
            </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BusinessInfoModal',
    props: {
      isOpen: {
        type: Boolean,
        default: false
      }
    },
    emits: ['close', 'goBack', 'goNext'],
    data() {
      return {
        dropdowns: {
          category: false,
          service: false,
          animals: false,
          destination: false,
          employees: false,
          revenue: false
        },
        selectedCategory: '',
        selectedService: '',
        selectedAnimals: '',
        selectedDestination: '',
        selectedEmployees: '',
        selectedRevenue: ''
      }
    },
    methods: {
      closeModal() {
        this.$emit('close')
      },
      toggleDropdown(type) {
        // Close all dropdowns first
        Object.keys(this.dropdowns).forEach(key => {
          this.dropdowns[key] = false
        })
        // Open the selected dropdown
        this.dropdowns[type] = true
      },
      selectOption(type, value) {
        switch(type) {
          case 'category':
            this.selectedCategory = value
            break
          case 'service':
            this.selectedService = value
            break
          case 'animals':
            this.selectedAnimals = value
            break
          case 'destination':
            this.selectedDestination = value
            break
          case 'employees':
            this.selectedEmployees = value
            break
          case 'revenue':
            this.selectedRevenue = value
            break
        }
        // Close the dropdown after selection
        this.dropdowns[type] = false
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
        max-width: 700px;
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
  
  .step2of3Parent {
        align-self: stretch;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
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
  
  .frameInner {
        width: 158px;
        position: relative;
        border-radius: 4px;
        background-color: #e0e0e0;
        height: 8px;
  }
  
  .frameGroup {
        align-self: stretch;
        box-shadow: 0px 4px 16px rgba(168, 168, 168, 0.24);
        border-radius: 8px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        gap: 32px;
        text-align: center;
        font-size: 24px;
        color: #424242;
  }
  
  .tellUsAboutYourBusinessParent {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
  }
  
  .tellUsAbout {
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
        font-weight: 500;
        color: #616161;
        display: inline-block;
  }
  
  .frameContainer {
        align-self: stretch;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
        text-align: left;
        font-size: 16px;
  }
  
  .frameDiv {
        align-self: stretch;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
  }
  
  .button2 {
        align-self: stretch;
        position: relative;
        line-height: 160%;
        text-transform: capitalize;
        font-weight: 500;
  }
  
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
  
  .button4 {
        position: relative;
        line-height: 160%;
        text-transform: capitalize;
        font-weight: 500;
  }
  
  .buttonParent2 {
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
  
  .button11 {
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
  }
  
  .button11:hover {
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
        font-size: 16px;
        color: #9e9e9e;
        position: relative;
        cursor: pointer;
  }
  
  .buttonParent13 {
        align-self: stretch;
        display: flex;
        align-items: flex-start;
        gap: 24px;
        color: #fafafa;
  }
  
  .button62 {
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
  
  .button62:hover {
        background-color: #616161;
  }
  
  .button63 {
        position: relative;
        line-height: 160%;
        text-transform: capitalize;
        font-weight: 600;
  }
  
  .button64 {
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
  
  .button64:hover {
        background-color: #e5b106;
  }
  
  .button65 {
        position: relative;
        line-height: 130%;
        text-transform: capitalize;
        font-weight: 600;
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
    .frameInner {
      width: 120px;
    }
    
    .frameGroup {
      padding: 12px;
      gap: 24px;
    }
    
    .tellUsAboutYourBusinessParent {
      font-size: 20px;
    }
    
    .buttonParent2,
    .buttonParent4 {
      width: 100%;
    }
  }
  
  @media (max-width: 576px) {
    .frameParent {
      font-size: 18px;
    }
    
    .tellUsAboutYourBusinessParent {
      font-size: 18px;
    }
    
    .buttonParent13 {
      flex-direction: column;
      gap: 16px;
    }
    
    .button62,
    .button64 {
      flex: 1;
      width: 100%;
    }
    
    .rectangleParent {
      flex-direction: column;
      gap: 8px;
    }
    
    .frameChild,
    .frameInner {
      width: 100%;
    }
  }
  </style>