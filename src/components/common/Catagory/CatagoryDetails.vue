<template>
      <div :class="$style.frameParent">
        <!-- Sidebar Filters -->
        <div :class="$style.frameGroup">
          
          <!-- Price Range Filter -->
          <div :class="$style.frameContainer">
            <div :class="$style.priceRangeConsultationParent">
              <div :class="$style.priceRangeConsultation">Price range (consultation)</div>
              <svg :class="$style.frameIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
            <div :class="$style.frameDiv">
              <div :class="$style.parent">
                <div :class="$style.div">{{ minPrice }}$</div>
                <div :class="$style.div2">{{ maxPrice }}$</div>
              </div>
              <input 
                type="range" 
                :min="minPrice" 
                :max="maxPrice" 
                v-model="currentPrice"
                :class="$style.frameChild"
              />
            </div>
            <div :class="$style.frameParent2">
              <div :class="$style.wrapper">
                <b :class="$style.b">{{ currentPrice }}</b>
              </div>
              <div :class="$style.frameItem"></div>
            </div>
          </div>
    
          <!-- Emergency Service -->
          <div :class="$style.priceRangeConsultationGroup">
            <div :class="$style.priceRangeConsultation">Emergency Service Available</div>
            <div :class="$style.frameParent3">
              <div :class="$style.frameParent4" @click="setEmergencyService(true)">
                <div :class="$style.radioButton">
                  <div :class="[$style.radioInner, { [$style.radioSelected]: emergencyService === true }]"></div>
                </div>
                <div :class="$style.priceRangeConsultation">Yes</div>
              </div>
              <div :class="$style.frameParent4" @click="setEmergencyService(false)">
                <div :class="$style.radioButton">
                  <div :class="[$style.radioInner, { [$style.radioSelected]: emergencyService === false }]"></div>
                </div>
                <div :class="$style.priceRangeConsultation">No</div>
              </div>
            </div>
          </div>
    
          <!-- Type of Service -->
          <div :class="$style.frameParent6">
            <div :class="$style.typeOfServiceParent">
              <div :class="$style.priceRangeConsultation">Type of service</div>
              <div :class="$style.frameIcon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </div>
            </div>
            <div :class="$style.frameParent7">
              <div :class="$style.frameParent8">
                <div 
                  v-for="service in services" 
                  :key="service" 
                  :class="$style.checkBoxParent"
                  @click="toggleService(service)"
                >
                  <div :class="$style.checkBox">
                    <div :class="$style.checkboxOuter">
                      <div :class="$style.checkboxInner">
                        <div 
                          v-if="selectedServices.includes(service)" 
                          :class="$style.checkmark"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div :class="$style.veterinaryClinic">{{ service }}</div>
                </div>
              </div>
              <div :class="$style.frameParent9">
                <svg :class="$style.frameIcon4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="18,15 12,9 6,15"></polyline>
                </svg>
                <div :class="$style.frameInner"></div>
                <svg :class="$style.frameIcon4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
            </div>
          </div>
    
          <!-- Animals Treated -->
          <div :class="$style.frameParent6">
            <div :class="$style.typeOfServiceParent">
              <div :class="$style.priceRangeConsultation">Animals treated</div>
              <svg :class="$style.frameIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
            <div :class="$style.frameParent7">
              <div :class="$style.frameParent8">
                <div 
                  v-for="animal in animals" 
                  :key="animal" 
                  :class="$style.checkBoxParent"
                  @click="toggleAnimal(animal)"
                >
                  <div :class="$style.checkBox">
                    <div :class="$style.checkboxOuter">
                      <div :class="$style.checkboxInner">
                        <div 
                          v-if="selectedAnimals.includes(animal)" 
                          :class="$style.checkmark"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div :class="$style.veterinaryClinic">{{ animal }}</div>
                </div>
              </div>
              <div :class="$style.frameParent9">
                <svg :class="$style.frameIcon4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="18,15 12,9 6,15"></polyline>
                </svg>
                <div :class="$style.frameInner"></div>
                <svg :class="$style.frameIcon4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
    
        <!-- Main Content Area -->
        <div :class="$style.frameParent14">
          
          <!-- Sort Filter - Simple dropdown like in image -->
          <div :class="$style.sortContainer">
            <div :class="$style.sortButton" @click="toggleSortDropdown">
              <span :class="$style.sortText">Sort</span>
              <div :class="$style.sortIcon">
                <div :class="$style.sortLine"></div>
                <div :class="$style.sortLine"></div>
                <div :class="$style.sortLine"></div>
              </div>
            </div>
            <div v-if="showSortOptions" :class="$style.sortDropdown">
              <div 
                v-for="rating in ratings" 
                :key="rating" 
                :class="$style.sortOption"
                @click="toggleRating(rating)"
              >
                <div :class="$style.checkBox">
                  <div :class="$style.checkboxOuter">
                    <div :class="$style.checkboxInner">
                      <div 
                        v-if="selectedRatings.includes(rating)" 
                        :class="$style.checkmark"
                      ></div>
                    </div>
                  </div>
                </div>
                <span>{{ rating }}</span>
              </div>
            </div>
          </div>
          
          <!-- Service Listings -->
          <div 
            v-for="(listing, index) in serviceListings" 
            :key="listing.id" 
            :class="getListingClass(index)"
          >
            <div :class="$style.frameParent15">
              <div :class="$style.imageWrapper">
                <div :class="$style.imageIcon"></div>
              </div>
              <div :class="$style.frameParent16">
                <div :class="$style.frameParent17">
                  <div :class="$style.frameParent18">
                    <div :class="$style.steppeSpiritToursParent">
                      <div :class="$style.steppeSpiritTours">{{ listing.name }}</div>
                      <div :class="$style.frameParent19">
                        <svg 
                          v-for="star in 5" 
                          :key="star"
                          :class="$style.frameIcon9" 
                          viewBox="0 0 24 24" 
                          :fill="star <= listing.rating ? '#ffc107' : 'none'" 
                          stroke="#ffc107"
                        >
                          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                        </svg>
                      </div>
                    </div>
                    <svg :class="$style.frameChild3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                    </svg>
                  </div>
                  <div :class="$style.frameParent20">
                    <div :class="$style.frameWrapper2">
                      <div :class="$style.world2Parent">
                        <svg :class="$style.world2Icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="m2,12 c3,5.5 7,9 10,9 s7,-3.5 10,-9"></path>
                          <path d="m2,12 c3,-5.5 7,-9 10,-9 s7,3.5 10,9"></path>
                        </svg>
                        <div :class="$style.wwwnomadiccom">{{ listing.website }}</div>
                      </div>
                    </div>
                    <div :class="$style.world2Parent">
                      <svg :class="$style.world2Icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <div :class="$style.wwwnomadiccom">{{ listing.location }}</div>
                    </div>
                    <div :class="$style.world2Parent">
                      <svg :class="$style.world2Icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                      <div :class="$style.k1m">{{ listing.revenue }}</div>
                      <div :class="$style.annualRevenueWrapper">
                        <div :class="$style.wwwnomadiccom">Annual Revenue</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div :class="$style.lineDiv"></div>
                <div :class="$style.frameParent22">
                  <div :class="$style.frameParent23">
                    <div :class="$style.starParent">
                      <svg :class="$style.frameIcon" viewBox="0 0 24 24" fill="#ffc107" stroke="#ffc107">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                      </svg>
                      <div :class="$style.priceRangeConsultation">Rating</div>
                    </div>
                    <div :class="$style.k">{{ listing.ratingCount }}</div>
                  </div>
                  <div :class="$style.frameParent23">
                    <div :class="$style.starParent">
                      <svg :class="$style.commentIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
                      </svg>
                      <div :class="$style.priceRangeConsultation">Comment</div>
                    </div>
                    <div :class="$style.k">{{ listing.comments }}</div>
                  </div>
                  <div :class="$style.moreWrapper">
                    <div :class="$style.priceRangeConsultation">...More</div>
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
      name: 'VeterinarySearch',
      data() {
        return {
          minPrice: 10,
          maxPrice: 500,
          currentPrice: 240,
          emergencyService: null,
          showSortOptions: false,
          selectedServices: ['Veterinary Clinic'],
          selectedAnimals: ['Cats'],
          selectedRatings: ['2 Star', '3 star'],
          
          services: [
            'Veterinary Clinic',
            'Pet Grooming', 
            'Pet Boarding',
            'Pet Training',
            'Pet Supplies Store'
          ],
          
          animals: [
            'Dogs',
            'Cats', 
            'Bird',
            'Reptiles',
            'Small Mammals'
          ],
          
          ratings: [
            '1 star', 
            '2 Star', 
            '3 star', 
            '4 star', 
            '5 star'
          ],
          
          serviceListings: [
            {
              id: 1,
              name: 'Steppe Spirit Tours',
              website: 'WWW.Nomadic.com',
              location: 'Lomas de Zamora',
              revenue: '$845k-1M',
              rating: 5,
              ratingCount: 359,
              comments: '4K'
            },
            {
              id: 2,
              name: 'Paws & Claws Clinic',
              website: 'WWW.PawsClaws.com',
              location: 'Buenos Aires',
              revenue: '$500k-750k',
              rating: 4,
              ratingCount: 287,
              comments: '2.8K'
            },
            {
              id: 3,
              name: 'Pet Paradise Center',
              website: 'WWW.PetParadise.com',
              location: 'Córdoba',
              revenue: '$300k-500k',
              rating: 5,
              ratingCount: 451,
              comments: '5.2K'
            },
            {
              id: 4,
              name: 'Animal Care Plus',
              website: 'WWW.AnimalCare.com',
              location: 'Rosario',
              revenue: '$200k-300k',
              rating: 3,
              ratingCount: 198,
              comments: '1.5K'
            }
          ]
        }
      },
      
      methods: {
        toggleSortDropdown() {
          this.showSortOptions = !this.showSortOptions;
        },
        
        setEmergencyService(value) {
          this.emergencyService = value;
        },
        
        toggleService(service) {
          const index = this.selectedServices.indexOf(service);
          if (index > -1) {
            this.selectedServices.splice(index, 1);
          } else {
            this.selectedServices.push(service);
          }
        },
        
        toggleAnimal(animal) {
          const index = this.selectedAnimals.indexOf(animal);
          if (index > -1) {
            this.selectedAnimals.splice(index, 1);
          } else {
            this.selectedAnimals.push(animal);
          }
        },
        
        toggleRating(rating) {
          const index = this.selectedRatings.indexOf(rating);
          if (index > -1) {
            this.selectedRatings.splice(index, 1);
          } else {
            this.selectedRatings.push(rating);
          }
        },
        
        getListingClass(index) {
          const classes = [
            this.$style.frameWrapper,
            this.$style.frameWrapper3,
            this.$style.frameWrapper5,
            this.$style.frameWrapper7
          ];
          return classes[index] || this.$style.frameWrapper;
        }
      }
    }
    </script>
    
    <style module>
    .frameParent {
      position: relative;
      width: 100%;
      display: flex;
      align-items: flex-start;
      gap: 24px;
      text-align: center;
      font-size: 18px;
      color: #616161;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      padding: 20px;
      min-height: 100vh;
      background-color: #f8f9fa;
    }
    
    @media (max-width: 1200px) {
      .frameParent {
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }
    }
    
    .frameGroup {
      width: 382px;
      box-shadow: 4px 4px 19px rgba(158, 158, 158, 0.05);
      border-radius: 4px;
      background-color: #fff;
      border: 1px solid #e0e0e0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
      gap: 20px;
      position: sticky;
      top: 20px;
    }
    
    @media (max-width: 1200px) {
      .frameGroup {
        width: 100%;
        max-width: 500px;
        position: relative;
        top: 0;
      }
    }
    
    @media (max-width: 768px) {
      .frameGroup {
        max-width: 100%;
      }
    }
    
    .frameContainer {
      align-self: stretch;
      border-radius: 8px;
      background-color: #fff;
      border: 1px solid #e0e0e0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
      position: relative;
      gap: 16px;
    }
    
    .priceRangeConsultationParent {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      z-index: 0;
    }
    
    .priceRangeConsultation {
      position: relative;
      line-height: 160%;
      text-transform: capitalize;
      font-weight: 500;
    }
    
    .frameIcon {
      width: 24px;
      height: 24px;
      color: #616161;
      cursor: pointer;
    }
    
    .frameDiv {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      z-index: 1;
      text-align: left;
      font-size: 16px;
      color: #757575;
    }
    
    .parent {
      align-self: stretch;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0px;
    }
    
    .div {
      width: 34px;
      position: relative;
      line-height: 160%;
      text-transform: capitalize;
      font-weight: 500;
      display: inline-block;
      flex-shrink: 0;
    }
    
    .div2 {
      position: relative;
      line-height: 160%;
      text-transform: capitalize;
      font-weight: 500;
      text-align: right;
    }
    
    .frameChild {
      align-self: stretch;
      height: 18px;
      background: linear-gradient(to right, #fcc207 0%, #fcc207 var(--progress, 50%), #e0e0e0 var(--progress, 50%), #e0e0e0 100%);
      border-radius: 9px;
      border: none;
      outline: none;
      cursor: pointer;
      -webkit-appearance: none;
      appearance: none;
    }
    
    .frameChild::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #fcc207;
      cursor: pointer;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    .frameChild::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #fcc207;
      cursor: pointer;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    .frameParent2 {
      width: 32px;
      margin: 0 !important;
      position: absolute;
      top: 53px;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 2;
      font-size: 12px;
      color: #fcc207;
    }
    
    .wrapper {
      align-self: stretch;
      border-radius: 4px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
    }
    
    .b {
      position: relative;
      line-height: 170%;
      text-transform: capitalize;
    }
    
    .frameItem {
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid #fcc207;
      margin-top: -2px;
    }
    
    .priceRangeConsultationGroup {
      align-self: stretch;
      background-color: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
      gap: 24px;
    }
    
    .frameParent3 {
      display: flex;
      align-items: center;
      gap: 22px;
      font-size: 16px;
      color: #757575;
    }
    
    .frameParent4 {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    
    .radioButton {
      width: 24px;
      height: 24px;
      border: 2px solid #e0e0e0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
    }
    
    .radioInner {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: transparent;
      transition: background-color 0.2s;
    }
    
    .radioSelected {
      background: #fcc207;
    }
    
    .frameParent6 {
      align-self: stretch;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
      gap: 8px;
    }
    
    .typeOfServiceParent {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    
    .frameParent7 {
      align-self: stretch;
      background-color: #f6fafd;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
      position: relative;
      text-align: left;
      font-size: 16px;
      color: #424242;
    }
    
    .frameParent8 {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      z-index: 0;
    }
    
    .checkBoxParent {
      align-self: stretch;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      height: 40px;
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .checkBoxParent:hover {
      background-color: #f0f0f0;
    }
    
    .checkBox {
      width: 24px;
      position: relative;
      height: 24px;
      overflow: hidden;
      flex-shrink: 0;
    }
    
    .checkboxOuter {
      width: 100%;
      height: 100%;
      border: 2px solid #e0e0e0;
      border-radius: 2px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.2s, background-color 0.2s;
    }
    
    .checkboxInner {
      width: 18px;
      height: 18px;
      border: 1px solid #9e9e9e;
      border-radius: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      transition: background-color 0.2s;
    }
    
    .checkmark {
      width: 8px;
      height: 8px;
      background: #2196f3;
      border-radius: 1px;
    }
    
    .veterinaryClinic {
      position: relative;
      line-height: 130%;
      text-transform: capitalize;
      font-weight: 500;
    }
    
    .frameParent9 {
      width: 16px;
      margin: 0 !important;
      position: absolute;
      top: 0px;
      right: 0px;
      background-color: #fafafa;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
      gap: 0px;
      z-index: 1;
    }
    
    .frameIcon4 {
      width: 16px;
      height: 16px;
      color: #757575;
      cursor: pointer;
    }
    
    .frameIcon4:hover {
      color: #424242;
    }
    
    .frameInner {
      width: 4px;
      position: relative;
      border-radius: 2px;
      background-color: #757575;
      flex: 1;
      min-height: 40px;
    }
    
    .frameParent14 {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      gap: 20px;
      text-align: left;
      color: #424242;
    }
    
    @media (max-width: 1200px) {
      .frameParent14 {
        width: 100%;
      }
    }
    
    .frameWrapper,
    .frameWrapper3,
    .frameWrapper5,
    .frameWrapper7 {
      width: 100%;
      max-width: 792px;
      border-radius: 4px;
      background-color: #fff;
      border: 1px solid #e0e0e0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
      transition: box-shadow 0.2s;
    }
    
    .frameWrapper:hover,
    .frameWrapper3:hover,
    .frameWrapper5:hover,
    .frameWrapper7:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    @media (max-width: 768px) {
      .frameWrapper,
      .frameWrapper3,
      .frameWrapper5,
      .frameWrapper7 {
        padding: 16px;
      }
    }
    
    .frameParent15 {
      align-self: stretch;
      display: flex;
      align-items: flex-start;
      gap: 18px;
    }
    
    @media (max-width: 768px) {
      .frameParent15 {
        flex-direction: column;
        gap: 12px;
      }
    }
    
    .imageWrapper {
      width: 206px;
      height: 120px;
      position: relative;
      border-radius: 4px;
      border: 1.5px solid #eee;
      box-sizing: border-box;
      overflow: hidden;
      flex-shrink: 0;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    @media (max-width: 768px) {
      .imageWrapper {
        width: 100%;
        height: 180px;
      }
    }
    
    .imageIcon {
      width: 80px;
      height: 80px;
      background-color: #ddd;
      border-radius: 4px;
    }
    
    .frameParent16 {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 18px;
      min-width: 0;
    }
    
    .frameParent17 {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }
    
    .frameParent18 {
      align-self: stretch;
      display: flex;
      align-items: flex-start;
      gap: 15px;
    }
    
    .steppeSpiritToursParent {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
      min-width: 0;
    }
    
    .steppeSpiritTours {
      align-self: stretch;
      position: relative;
      line-height: 130%;
      text-transform: capitalize;
      font-weight: 500;
      font-size: 18px;
      word-wrap: break-word;
    }
    
    .frameParent19 {
      align-self: stretch;
      display: flex;
      align-items: center;
      gap: 2px;
      flex-wrap: wrap;
    }
    
    .frameIcon9 {
      width: 24px;
      height: 24px;
      border-radius: 1px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    .frameIcon9:hover {
      transform: scale(1.1);
    }
    
    .frameChild3 {
      height: 24px;
      width: 24px;
      color: #757575;
      cursor: pointer;
      transition: color 0.2s;
    }
    
    .frameChild3:hover {
      color: #424242;
    }
    
    .frameParent20 {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      font-size: 14px;
      color: #9e9e9e;
    }
    
    .frameWrapper2 {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    
    .world2Parent {
      align-self: stretch;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    
    .world2Icon {
      width: 20px;
      height: 20px;
      color: #9e9e9e;
      flex-shrink: 0;
    }
    
    .wwwnomadiccom {
      position: relative;
      line-height: 170%;
      text-transform: capitalize;
      font-weight: 500;
      word-wrap: break-word;
    }
    
    .k1m {
      flex: 1;
      position: relative;
      line-height: 170%;
      text-transform: capitalize;
      font-weight: 500;
      min-width: 0;
      word-wrap: break-word;
    }
    
    .annualRevenueWrapper {
      border-radius: 2px;
      background-color: #ffee80;
      border: 1px solid #ffdd00;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      font-size: 12px;
      color: #212121;
      flex-shrink: 0;
    }
    
    .lineDiv {
      align-self: stretch;
      position: relative;
      border-top: 1px solid #e0e0e0;
      box-sizing: border-box;
      height: 1px;
    }
    
    .frameParent22 {
      align-self: stretch;
      display: flex;
      align-items: center;
      gap: 25px;
      font-size: 16px;
      color: #9e9e9e;
      flex-wrap: wrap;
    }
    
    @media (max-width: 768px) {
      .frameParent22 {
        gap: 12px;
      }
    }
    
    .frameParent23 {
      flex: 1;
      min-width: 120px;
      border-radius: 4px;
      background-color: #f6fafd;
      border: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 8px;
      gap: 8px;
      transition: background-color 0.2s;
    }
    
    .frameParent23:hover {
      background-color: #e8f4fd;
    }
    
    .starParent {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .commentIcon {
      width: 24px;
      height: 24px;
      color: #9e9e9e;
    }
    
    .k {
      position: relative;
      line-height: 160%;
      text-transform: capitalize;
      font-weight: 500;
      color: #212121;
      white-space: nowrap;
    }
    
    .moreWrapper {
      flex: 1;
      min-width: 80px;
      border-radius: 4px;
      background-color: #f6fafd;
      border: 1px solid #f5f5f5;
      box-sizing: border-box;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px 8px;
      color: #28aed8;
      cursor: pointer;
      transition: background-color 0.2s, color 0.2s;
    }
    
    .moreWrapper:hover {
      background-color: #28aed8;
      color: white;
    }
    
    .sortContainer {
      width: 100%;
      max-width: 200px;
      margin: 0 0 20px auto;
      position: relative;
    }
    
    .sortButton {
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.2s;
      min-height: 40px;
    }
    
    .sortButton:hover {
      background-color: #e9ecef;
      border-color: #adb5bd;
    }
    
    .sortText {
      font-size: 14px;
      color: #6c757d;
      font-weight: 500;
    }
    
    .sortIcon {
      display: flex;
      flex-direction: column;
      gap: 2px;
      width: 16px;
    }
    
    .sortLine {
      height: 2px;
      background-color: #6c757d;
      border-radius: 1px;
    }
    
    .sortLine:nth-child(1) {
      width: 100%;
    }
    
    .sortLine:nth-child(2) {
      width: 75%;
    }
    
    .sortLine:nth-child(3) {
      width: 100%;
    }
    
    .sortDropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10;
      margin-top: 4px;
      max-height: 200px;
      overflow-y: auto;
    }
    
    .sortOption {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 14px;
      color: #495057;
      border-bottom: 1px solid #f8f9fa;
    }
    
    .sortOption:hover {
      background-color: #f8f9fa;
    }
    
    .sortOption:last-child {
      border-bottom: none;
    }
    
    @media (max-width: 1200px) {
      .frameParent55 {
        position: relative;
        width: 100%;
        max-width: 400px;
        top: 0;
        right: 0;
        margin: 0 auto;
      }
    }
    
    @media (max-width: 768px) {
      .frameParent55 {
        max-width: 100%;
      }
    }
    
    .frameWrapper9 {
      align-self: stretch;
      background-color: #f6fafd;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
      text-align: left;
      font-size: 16px;
      color: #424242;
      max-height: 200px;
      overflow-y: auto;
    }
    
    .frameParent56 {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
    }
    
    /* Responsive improvements */
    @media (max-width: 480px) {
      .frameParent {
        padding: 12px;
        gap: 12px;
      }
      
      .frameGroup {
        padding: 16px;
        gap: 16px;
      }
      
      .frameWrapper,
      .frameWrapper3,
      .frameWrapper5,
      .frameWrapper7 {
        padding: 12px;
      }
      
      .frameParent15 {
        gap: 8px;
      }
      
      .steppeSpiritTours {
        font-size: 16px;
      }
      
      .frameParent22 {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
      }
      
      .frameParent23,
      .moreWrapper {
        min-width: auto;
      }
    }
    </style>