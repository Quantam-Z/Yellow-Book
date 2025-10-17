<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5" @click="closeModal">
    <div class="relative bg-white rounded-xl w-full max-w-[550px] max-h-[90vh] overflow-y-auto flex flex-col box-border font-['Plus_Jakarta_Sans']" @click.stop>
      
      <!-- Step 1: Account Creation -->
      <div v-if="currentStep === 1">
        <div class="px-5 pt-5 flex flex-col gap-4">
          <div class="text-[20px] font-semibold text-[#1877f2] capitalize leading-[1.3]">Step 1 of 3</div>
          <div class="flex gap-4">
            <div class="flex-1 h-2 bg-[#1877f2] rounded" />
            <div class="flex-1 h-2 bg-[#e0e0e0] rounded" />
            <div class="flex-1 h-2 bg-[#e0e0e0] rounded" />
          </div>
        </div>
        
        <div class="shadow-[0px_4px_16px_rgba(168,168,168,0.24)] rounded-lg bg-white mx-5 my-4 p-5 flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-[24px] font-semibold text-[#424242] m-0 capitalize leading-[1.3]">welcome to Yellow.Book</h2>
            <p class="text-[16px] text-[#616161] m-0 leading-[1.6] capitalize">
              <span class="underline font-semibold">Create your business account</span> 
              to get started with trusted travel listings and client engagement.
            </p>
          </div>

          <div class="flex flex-col gap-4">
            <button class="flex items-center justify-center gap-3 px-6 py-3 border border-[#bdbdbd] rounded bg-white cursor-pointer transition-colors duration-200 text-[16px] font-medium text-[#424242] capitalize hover:bg-[#f6fafd]" type="button">
              <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
            <button class="flex items-center justify-center gap-3 px-6 py-3 border border-[#bdbdbd] rounded bg-white cursor-pointer transition-colors duration-200 text-[16px] font-medium text-[#424242] capitalize hover:bg-[#f6fafd]" type="button">
              <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Signup with Facebook
            </button>
          </div>

          <div class="flex items-center gap-4 text-[#9e9e9e]">
            <div class="flex-1 h-px bg-[#bdbdbd]" />
            <span class="text-[16px] font-medium capitalize">OR continue with email</span>
            <div class="flex-1 h-px bg-[#bdbdbd]" />
          </div>

          <form class="flex flex-col gap-5" @submit.prevent="nextStep">
            <div class="flex flex-col gap-2 flex-1">
              <label class="text-[16px] font-medium text-[#424242] capitalize">Work Email</label>
              <input 
                type="email" 
                class="h-[46px] px-3 border border-[#bdbdbd] rounded bg-[#eee] text-[16px] text-[#424242] outline-none transition-colors duration-200 focus:border-[#1877f2] focus:bg-white placeholder:text-[#9e9e9e]"
                placeholder="Name@company.com" 
                v-model="formData.email" 
                required
              />
            </div>

            <div class="flex flex-col gap-2 flex-1">
              <label class="text-[16px] font-medium text-[#424242] capitalize">Password</label>
              <input 
                type="password" 
                class="h-[46px] px-3 border border-[#bdbdbd] rounded bg-[#eee] text-[16px] text-[#424242] outline-none transition-colors duration-200 focus:border-[#1877f2] focus:bg-white placeholder:text-[#9e9e9e]"
                placeholder="*******" 
                v-model="formData.password" 
                required
              />
            </div>

            <div class="flex flex-col gap-2 flex-1">
              <label class="text-[16px] font-medium text-[#424242] capitalize">Confirm Password</label>
              <input 
                type="password" 
                class="h-[46px] px-3 border border-[#bdbdbd] rounded bg-[#eee] text-[16px] text-[#424242] outline-none transition-colors duration-200 focus:border-[#1877f2] focus:bg-white placeholder:text-[#9e9e9e]"
                placeholder="*******" 
                v-model="formData.confirmPassword" 
                required
              />
            </div>

            <div class="flex items-center gap-2">
              <input 
                type="checkbox" 
                class="w-[18px] h-[18px] accent-[#1877f2]"
                v-model="isChecked" 
                id="demo-checkbox"
              />
              <label class="text-[14px] text-[#616161] leading-[1.7] capitalize" for="demo-checkbox">
                I'd like to receive a demo of Yellow.Book's paid plans.
              </label>
            </div>

            <button class="h-12 bg-[#fcc207] border-none rounded text-[#212121] text-[16px] font-semibold capitalize cursor-pointer transition-colors duration-200 hover:bg-[#e5b106]" type="submit">Next</button>
          </form>

          <div class="text-center flex flex-col gap-4">
            <p class="text-[16px] font-semibold text-[#424242] m-0 capitalize">
              Already have an account 
              <span class="text-[#28aed8] cursor-pointer hover:underline" @click="$emit('switchToLogin')">sign in</span> 
              now
            </p>
            <div class="flex justify-center gap-8 text-[14px]">
              <span class="text-[#28aed8] cursor-pointer hover:underline">Terms & Conditions</span>
              <span class="text-[#28aed8] cursor-pointer hover:underline">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Business Information -->
      <div v-if="currentStep === 2">
        <div class="px-5 pt-5 flex flex-col gap-4">
          <div class="text-[20px] font-semibold text-[#1877f2] capitalize leading-[1.3]">Step 2 of 3</div>
          <div class="flex gap-4">
            <div class="flex-1 h-2 bg-[#1877f2] rounded" />
            <div class="flex-1 h-2 bg-[#1877f2] rounded" />
            <div class="flex-1 h-2 bg-[#e0e0e0] rounded" />
          </div>
        </div>

        <div class="shadow-[0px_4px_16px_rgba(168,168,168,0.24)] rounded-lg bg-white mx-5 my-4 p-5 flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-[24px] font-semibold text-[#424242] m-0 capitalize leading-[1.3]">Tell Us About Your Business</h2>
            <p class="text-[16px] text-[#616161] m-0 leading-[1.6] capitalize">
              Help us understand your business better so we can serve you more effectively.
            </p>
          </div>

          <form class="flex flex-col gap-5" @submit.prevent="nextStep">
            <div class="flex flex-col gap-2 flex-1">
              <label class="text-[16px] font-medium text-[#424242] capitalize">Website</label>
              <input 
                type="url" 
                class="h-[46px] px-3 border border-[#bdbdbd] rounded bg-[#eee] text-[16px] text-[#424242] outline-none transition-colors duration-200 focus:border-[#1877f2] focus:bg-white placeholder:text-[#9e9e9e]"
                placeholder="https://www.yourcompany.com" 
                v-model="formData.website" 
              />
            </div>

            <div class="flex flex-col gap-2 flex-1">
              <label class="text-[16px] font-medium text-[#424242] capitalize">Company Name</label>
              <input 
                type="text" 
                class="h-[46px] px-3 border border-[#bdbdbd] rounded bg-[#eee] text-[16px] text-[#424242] outline-none transition-colors duration-200 focus:border-[#1877f2] focus:bg-white placeholder:text-[#9e9e9e]"
                placeholder="e.g., Yellow.Book" 
                v-model="formData.companyName" 
                required
              />
            </div>

            <div class="flex flex-col gap-2 flex-1">
              <label class="text-[16px] font-medium text-[#424242] capitalize">Company category</label>
              <div class="relative">
                <div 
                  class="h-[46px] px-3 border border-[#bdbdbd] rounded bg-[#eee] flex items-center justify-between cursor-pointer text-[16px] text-[#424242] outline-none transition-colors duration-200 focus:border-[#1877f2] focus:bg-white"
                  @click="toggleDropdown('category')"
                >
                  <span :class="{'text-[#9e9e9e]': !formData.category}">{{ formData.category || 'Select category' }}</span>
                  <svg class="w-6 h-6 text-[#9e9e9e] flex-shrink-0 transition-transform duration-200" :class="{'rotate-180': dropdowns.category}" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                  </svg>
                </div>
                <div v-if="dropdowns.category" class="absolute top-full left-0 right-0 bg-white border border-[#bdbdbd] border-t-0 rounded-b z-10 max-h-[200px] overflow-y-auto shadow-lg">
                  <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 border-b border-[#f0f0f0] transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectOption('category', 'Travel & Tourism')">
                    Travel & Tourism
                  </div>
                  <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 border-b border-[#f0f0f0] transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectOption('category', 'Hospitality')">
                    Hospitality
                  </div>
                  <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectOption('category', 'Adventure Tours')">
                    Adventure Tours
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-2 flex-1">
              <label class="text-[16px] font-medium text-[#424242] capitalize">Type of Service</label>
              <div class="relative">
                <div 
                  class="h-[46px] px-3 border border-[#bdbdbd] rounded bg-[#eee] flex items-center justify-between cursor-pointer text-[16px] text-[#424242] outline-none transition-colors duration-200 focus:border-[#1877f2] focus:bg-white"
                  @click="toggleDropdown('service')"
                >
                  <span :class="{'text-[#9e9e9e]': !formData.service}">{{ formData.service || 'Select Service' }}</span>
                  <svg class="w-6 h-6 text-[#9e9e9e] flex-shrink-0 transition-transform duration-200" :class="{'rotate-180': dropdowns.service}" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                  </svg>
                </div>
                <div v-if="dropdowns.service" class="absolute top-full left-0 right-0 bg-white border border-[#bdbdbd] border-t-0 rounded-b z-10 max-h-[200px] overflow-y-auto shadow-lg">
                  <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 border-b border-[#f0f0f0] transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectOption('service', 'Tour Packages')">
                    Tour Packages
                  </div>
                  <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 border-b border-[#f0f0f0] transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectOption('service', 'Transportation')">
                    Transportation
                  </div>
                  <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectOption('service', 'Accommodation')">
                    Accommodation
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-2 flex-1">
              <label class="text-[16px] font-medium text-[#424242] capitalize">Company Destination</label>
              <div class="relative">
                <div 
                  class="h-[46px] px-3 border border-[#bdbdbd] rounded bg-[#eee] flex items-center justify-between cursor-pointer text-[16px] text-[#424242] outline-none transition-colors duration-200 focus:border-[#1877f2] focus:bg-white"
                  @click="toggleDropdown('destination')"
                >
                  <span :class="{'text-[#9e9e9e]': !formData.destination}">{{ formData.destination || 'Select Destination' }}</span>
                  <svg class="w-6 h-6 text-[#9e9e9e] flex-shrink-0 transition-transform duration-200" :class="{'rotate-180': dropdowns.destination}" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                  </svg>
                </div>
                <div v-if="dropdowns.destination" class="absolute top-full left-0 right-0 bg-white border border-[#bdbdbd] border-t-0 rounded-b z-10 max-h-[200px] overflow-y-auto shadow-lg">
                  <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 border-b border-[#f0f0f0] transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectOption('destination', 'Ulaanbaatar')">
                    Ulaanbaatar
                  </div>
                  <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 border-b border-[#f0f0f0] transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectOption('destination', 'Gobi Desert')">
                    Gobi Desert
                  </div>
                  <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectOption('destination', 'Altai Mountains')">
                    Altai Mountains
                  </div>
                </div>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="flex flex-col gap-2 flex-1">
                <label class="text-[16px] font-medium text-[#424242] capitalize">Number of Employees</label>
                <div class="relative">
                  <div 
                    class="h-[46px] px-3 border border-[#bdbdbd] rounded bg-[#eee] flex items-center justify-between cursor-pointer text-[16px] text-[#424242] outline-none transition-colors duration-200 focus:border-[#1877f2] focus:bg-white"
                    @click="toggleDropdown('employees')"
                  >
                    <span :class="{'text-[#9e9e9e]': !formData.employees}">{{ formData.employees || 'Select Employees' }}</span>
                    <svg class="w-6 h-6 text-[#9e9e9e] flex-shrink-0 transition-transform duration-200" :class="{'rotate-180': dropdowns.employees}" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                    </svg>
                  </div>
                  <div v-if="dropdowns.employees" class="absolute top-full left-0 right-0 bg-white border border-[#bdbdbd] border-t-0 rounded-b z-10 max-h-[200px] overflow-y-auto shadow-lg">
                    <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 border-b border-[#f0f0f0] transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectOption('employees', '1–10')">1–10</div>
                    <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 border-b border-[#f0f0f0] transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectOption('employees', '11–30')">11–30</div>
                    <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectOption('employees', '31–50')">31–50</div>
                  </div>
                </div>
              </div>

              <div class="flex flex-col gap-2 flex-1">
                <label class="text-[16px] font-medium text-[#424242] capitalize">Annual Revenue</label>
                <div class="relative">
                  <div 
                    class="h-[46px] px-3 border border-[#bdbdbd] rounded bg-[#eee] flex items-center justify-between cursor-pointer text-[16px] text-[#424242] outline-none transition-colors duration-200 focus:border-[#1877f2] focus:bg-white"
                    @click="toggleDropdown('revenue')"
                  >
                    <span :class="{'text-[#9e9e9e]': !formData.revenue}">{{ formData.revenue || 'Select Revenue' }}</span>
                    <svg class="w-6 h-6 text-[#9e9e9e] flex-shrink-0 transition-transform duration-200" :class="{'rotate-180': dropdowns.revenue}" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                    </svg>
                  </div>
                  <div v-if="dropdowns.revenue" class="absolute top-full left-0 right-0 bg-white border border-[#bdbdbd] border-t-0 rounded-b z-10 max-h-[200px] overflow-y-auto shadow-lg">
                    <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 border-b border-[#f0f0f0] transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectOption('revenue', '< 10M MNT')">&lt; 10M MNT</div>
                    <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 border-b border-[#f0f0f0] transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectOption('revenue', '10M - 50M MNT')">10M - 50M MNT</div>
                    <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectOption('revenue', '> 50M MNT')">&gt; 50M MNT</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex gap-6">
              <button class="flex-1 h-12 bg-[#424242] border border-[#dbe7ff] rounded text-[#fafafa] text-[16px] font-semibold capitalize cursor-pointer transition-colors duration-200 hover:bg-[#616161]" type="button" @click="prevStep">Back</button>
              <button class="flex-1 h-12 bg-[#fcc207] border-none rounded text-[#212121] text-[16px] font-semibold capitalize cursor-pointer transition-colors duration-200 hover:bg-[#e5b106]" type="submit">Next</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Step 3: Personal Information -->
      <div v-if="currentStep === 3">
        <div class="px-5 pt-5 flex flex-col gap-4">
          <div class="text-[20px] font-semibold text-[#1877f2] capitalize leading-[1.3]">Step 3 of 3</div>
          <div class="flex gap-4">
            <div class="flex-1 h-2 bg-[#1877f2] rounded" />
            <div class="flex-1 h-2 bg-[#1877f2] rounded" />
            <div class="flex-1 h-2 bg-[#1877f2] rounded" />
          </div>
        </div>

        <div class="shadow-[0px_4px_16px_rgba(168,168,168,0.24)] rounded-lg bg-white mx-5 my-4 p-5 flex flex-col gap-8">
          <div class="text-center flex flex-col gap-4">
            <h2 class="text-[24px] font-semibold text-[#424242] m-0 capitalize leading-[1.3]">Tell Us About Yourself</h2>
            <p class="text-[16px] text-[#616161] m-0 leading-[1.6] capitalize">
              Complete your profile to start listing your services on Yellow.Book.
            </p>
          </div>

          <form class="flex flex-col gap-5" @submit.prevent="completeRegistration">
            <div class="flex gap-4">
              <div class="flex flex-col gap-2 flex-1">
                <label class="text-[16px] font-medium text-[#424242] capitalize">First Name</label>
                <input 
                  type="text" 
                  class="h-[46px] px-3 border border-[#bdbdbd] rounded bg-[#eee] text-[16px] text-[#424242] outline-none transition-colors duration-200 focus:border-[#1877f2] focus:bg-white placeholder:text-[#9e9e9e]"
                  placeholder="John" 
                  v-model="formData.firstName" 
                  required
                />
              </div>

              <div class="flex flex-col gap-2 flex-1">
                <label class="text-[16px] font-medium text-[#424242] capitalize">Last Name</label>
                <input 
                  type="text" 
                  class="h-[46px] px-3 border border-[#bdbdbd] rounded bg-[#eee] text-[16px] text-[#424242] outline-none transition-colors duration-200 focus:border-[#1877f2] focus:bg-white placeholder:text-[#9e9e9e]"
                  placeholder="Doe" 
                  v-model="formData.lastName" 
                  required
                />
              </div>
            </div>

            <div class="flex flex-col gap-2 flex-1">
              <label class="text-[16px] font-medium text-[#424242] capitalize">Job Title</label>
              <input 
                type="text" 
                class="h-[46px] px-3 border border-[#bdbdbd] rounded bg-[#eee] text-[16px] text-[#424242] outline-none transition-colors duration-200 focus:border-[#1877f2] focus:bg-white placeholder:text-[#9e9e9e]"
                placeholder="e.g., CEO, Travel Agent" 
                v-model="formData.jobTitle" 
                required
              />
            </div>

            <div class="flex gap-4">
              <div class="flex flex-col gap-2 flex-1">
                <label class="text-[16px] font-medium text-[#424242] capitalize">Country</label>
                <div class="relative">
                  <div 
                    class="h-[46px] px-3 border border-[#bdbdbd] rounded bg-[#eee] flex items-center justify-between cursor-pointer text-[16px] text-[#424242] outline-none transition-colors duration-200 focus:border-[#1877f2] focus:bg-white"
                    @click="toggleDropdown('country')"
                  >
                    <div class="flex items-center gap-2">
                      <span>{{ selectedFlag || '🇲🇳' }}</span>
                      <span :class="{'text-[#9e9e9e]': !formData.country}">{{ formData.country || 'Select Country' }}</span>
                    </div>
                    <svg class="w-6 h-6 text-[#9e9e9e] flex-shrink-0 transition-transform duration-200" :class="{'rotate-180': dropdowns.country}" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                    </svg>
                  </div>
                  <div v-if="dropdowns.country" class="absolute top-full left-0 right-0 bg-white border border-[#bdbdbd] border-t-0 rounded-b z-10 max-h-[200px] overflow-y-auto shadow-lg">
                    <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 border-b border-[#f0f0f0] transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectCountry('Mongolia', '🇲🇳')">
                      <span>🇲🇳</span>
                      <span>Mongolia</span>
                    </div>
                    <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 border-b border-[#f0f0f0] transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectCountry('China', '🇨🇳')">
                      <span>🇨🇳</span>
                      <span>China</span>
                    </div>
                    <div class="px-3 py-3 cursor-pointer text-[16px] text-[#424242] flex items-center gap-2 transition-colors duration-200 hover:bg-[#e3f2fd]" @click="selectCountry('Russia', '🇷🇺')">
                      <span>🇷🇺</span>
                      <span>Russia</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex flex-col gap-2 flex-1">
                <label class="text-[16px] font-medium text-[#424242] capitalize">Phone Number</label>
                <div class="flex items-center h-[46px] border border-[#bdbdbd] rounded bg-[#eee] overflow-hidden transition-colors duration-200 focus-within:border-[#1877f2] focus-within:bg-white">
                  <span class="px-3 bg-[#f0f0f0] text-[#424242] font-medium border-r border-[#bdbdbd] flex-shrink-0 h-full flex items-center">{{ formData.countryCode || '+976' }}</span>
                  <input 
                    type="tel" 
                    class="h-full px-3 border-none bg-transparent text-[16px] text-[#424242] outline-none flex-1 placeholder:text-[#9e9e9e]"
                    placeholder="12345678" 
                    v-model="formData.phoneNumber" 
                    required
                  />
                </div>
              </div>
            </div>

            <div class="flex gap-6">
              <button class="flex-1 h-12 bg-[#424242] border border-[#dbe7ff] rounded text-[#fafafa] text-[16px] font-semibold capitalize cursor-pointer transition-colors duration-200 hover:bg-[#616161]" type="button" @click="prevStep">Back</button>
              <button class="flex-1 h-12 bg-[#fcc207] border-none rounded text-[#212121] text-[16px] font-semibold capitalize cursor-pointer transition-colors duration-200 hover:bg-[#e5b106]" type="submit">Complete</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistrationModal',
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
      selectedFlag: '🇲🇳',
      dropdowns: {
        category: false,
        service: false,
        destination: false,
        employees: false,
        revenue: false,
        country: false
      },
      formData: {
        email: '',
        password: '',
        confirmPassword: '',
        website: '',
        companyName: '',
        category: '',
        service: '',
        destination: '',
        employees: '',
        revenue: '',
        firstName: '',
        lastName: '',
        jobTitle: '',
        country: '',
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
    toggleDropdown(type) {
      // Close all other dropdowns first
      Object.keys(this.dropdowns).forEach(key => {
        if (key !== type) {
          this.dropdowns[key] = false
        }
      })
      // Toggle the clicked dropdown
      this.dropdowns[type] = !this.dropdowns[type]
    },
    selectOption(type, value) {
      this.formData[type] = value
      this.dropdowns[type] = false
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
      this.dropdowns.country = false
    },
    completeRegistration() {
      this.$emit('complete', this.formData)
      this.resetForm()
    },
    resetForm() {
      this.currentStep = 1
      this.isChecked = false
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
        destination: '',
        employees: '',
        revenue: '',
        firstName: '',
        lastName: '',
        jobTitle: '',
        country: '',
        countryCode: '+976',
        phoneNumber: ''
      }
    },
    handleClickOutside(event) {
      // Close dropdowns when clicking outside
      Object.keys(this.dropdowns).forEach(key => {
        this.dropdowns[key] = false
      })
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style scoped>
/* Responsive Design */
@media (max-width: 768px) {
  .fixed.inset-0.bg-black.bg-opacity-50.flex.items-center.justify-center.z-50.p-5 {
    padding: 10px;
  }
  
  .relative.bg-white.rounded-xl.w-full.max-w-\[550px\] {
    max-width: 100%;
  }
  
  .px-5.pt-5 {
    padding: 16px 16px 0;
  }
  
  .shadow-\[0px_4px_16px_rgba\(168\,168\,168\,0\.24\)\].rounded-lg.bg-white.mx-5.my-4.p-5 {
    margin: 16px;
    padding: 16px;
    gap: 24px;
  }
  
  .flex.gap-4 {
    gap: 12px;
  }
  
  .text-\[24px\] {
    font-size: 20px;
  }
  
  .flex.gap-4.flex-row {
    flex-direction: column;
    gap: 20px;
  }
  
  .flex.gap-6.flex-row {
    flex-direction: column;
    gap: 16px;
  }
  
  .flex.justify-center.gap-8.text-\[14px\] {
    flex-direction: column;
    gap: 16px;
  }
}

@media (max-width: 576px) {
  .text-\[20px\] {
    font-size: 18px;
  }
  
  .text-\[24px\] {
    font-size: 18px;
  }
  
  .flex.items-center.justify-center.gap-3.px-6.py-3 {
    padding: 10px 16px;
    font-size: 14px;
  }
  
  .h-\[46px\] {
    height: 42px;
    font-size: 14px;
  }
  
  .h-12 {
    height: 42px;
    font-size: 14px;
  }
  
  .flex.items-center.h-\[46px\] {
    height: 42px;
  }
}

/* Dropdown animations */
.rotate-180 {
  transform: rotate(180deg);
}
</style>