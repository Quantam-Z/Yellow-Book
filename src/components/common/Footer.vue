<template>
  <footer 
    class="body-font bg-[#171715] text-white py-4 rounded-t-3xl" 
    role="contentinfo"
    aria-label="Website footer"
  >
    <Container>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <!-- Column 1: Company -->
        <div>
          <h3 class="text-[16px] text-[#BDBDBD] font-[600] pb-4">Company</h3>
          <nav aria-label="Company navigation">
            <ul class="space-y-2">
              <li v-for="(item, i) in company" :key="i">
                <nuxt-link 
                  class="text-[14px] text-[#CAC9C4] font-[400] hover:text-[#17107F] transition-colors duration-300 " 
                  :to="item.link"
                >
                  {{ item.level }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Column 2: Links -->
        <div>
          <h3 class="text-[16px] text-[#BDBDBD] font-[600] pb-4">Links</h3>
          <nav aria-label="Quick links navigation">
            <ul class="space-y-2">
              <li v-for="(item, i) in links" :key="i">
                <nuxt-link 
                  class="text-[14px] text-[#CAC9C4] font-[400] hover:text-[#17107F] transition-colors duration-300  " 
                  :to="item.link"
                >
                  {{ item.level }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Column 3: Logo/Address -->
        <div>
          <div class="mb-4">
            <div class="flex justify-start pb-2">
              <Logo />
            </div>

            <address class="not-italic space-y-2">
              <div v-for="(item, i) in address" :key="i">
                <a 
                  target="_blank" 
                  :href="item.link"
                  class="flex items-start gap-3 text-[14px] text-[#CAC9C4] font-[400] hover:text-[#17107F] transition-colors duration-300"
                >
                  <!-- <Icon size="26" class="text-[14px] text-[#CAC9C4] font-[400] hover:text-[#17107F] transition-colors duration-300 flex-shrink-0" :name="item.icon" /> -->
                  <span class="text-[14px] text-[#CAC9C4] font-[400] hover:text-[#17107F] transition-colors duration-300">
                    {{ item.text }}
                  </span>
                </a>
              </div>
            </address>
          </div>
        </div>

        <!-- Column 4: Others -->
        <div>
          <!-- <h3 class="text-[16px] text-[#BDBDBD] font-[600] pb-4">অন্যান্য</h3> -->
          <!-- Placeholder for future content -->
           <CommonButtonsLinkBtn text="Call Now" styles="rounded-md"/>
        </div>
      </div>

      <hr class="border-[#333333] my-6" />

      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <!-- <p class="text-center md:text-left text-[#AAAAAA] text-[16px] font-[500]">
          এই ওয়েবসাইটের সকল ধরনের লেখা, ছবি, অডিও এবং ভিডিও অনুমতি ছাড়া ব্যবহার সম্পূর্ণ বেআইনি
        </p> -->
        <p class="text-center md:text-right text-[#AAAAAA] text-[16px] font-[500]">
          Copyright © Karigori Pathshala {{ currentYear }}
          <!-- <a 
            href="https://nextivesolution.com/" 
            target="_blank"
            class="text-[#3b6b53] hover:underline"
          >
            Nextive Solution
          </a> -->
        </p>
            <div class="flex justify-start ">
              <CommonShareFooterSocila aria-label="Social media links" />
            </div>
            <NuxtLink to="/privacy_policy">Privacy</NuxtLink>
      </div>
    </Container>
  </footer>
</template>

<script setup lang="ts">
import Container from "~/components/common/Container.vue";
import Logo from "~/components/common/Logo.vue";

const currentYear = new Date().getFullYear();

const address = [
  { link: "tel:01921214910", text: "01921214910 | 01832738636", icon: 'ph:phone' },
  { link: "mailto:support@karigoripatshala.com", text: "support@karigoripatshala.com", icon: 'ph:envelope-simple' },
  { link: "https://www.google.com/maps/search/11%2F3+Shiddeshwari+Dhaka/@23.7435211,90.4083317,17z/data=!3m1!4b1?entry=ttu", text: "Head Office: Salbon Mistry Para Rangpur Sadar", icon: 'ph:map-pin' },
];

const company = [
  { level: "আমাদের সম্পর্কে", link: "/about-us" },
  { level: "যোগাযোগ করুন", link: "/contact" },
  { level: "প্রাইভেসি পলিসি", link: "/privacy_policy" },
  { level: "শর্তাবলী", link: "/terms_conditions" },
  { level: "রিফান্ড পলিসি", link: "/refund_policy" },
];

const links = [
  { level: "কোর্স সমূহ", link: "/courses" },
  { level: "নোটিশ", link: "/notice" }
];
</script>