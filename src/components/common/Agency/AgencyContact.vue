<template>
  <div class="w-[95%] relative flex items-start justify-center gap-6 text-center text-base text-black font-['Plus_Jakarta_Sans'] flex-wrap mt-5 ml-[30px] mb-5">
    <div class="flex-1 basis-[600px] max-w-[690px] shadow-[0px_4px_16px_rgba(158,158,158,0.24)] bg-white border border-[#eee] box-border flex flex-col items-start p-5 gap-5 min-w-[280px]">
      <div class="self-stretch border-b border-[#e0e0e0] flex items-center py-[10px] gap-1">
        <img class="w-6 h-6" alt="" />
        <div class="leading-[160%] capitalize font-semibold">Company Information</div>
      </div>
      <div class="self-stretch flex flex-col items-start pl-7 gap-4 text-left text-[#616161]">
        <div class="flex items-center gap-[11px] flex-wrap">
          <div class="w-[220px] flex items-center justify-between gap-0">
            <div class="flex items-center gap-2">
              <img class="w-6 h-6" alt="" />
              <div class="leading-[130%] capitalize font-medium">Website</div>
            </div>
            <div class="leading-[130%] capitalize font-medium">:</div>
          </div>
          <div class="flex items-center text-[#28aed8] flex-wrap gap-1">
            <div class="leading-[160%] capitalize text-left break-words">www.Mongolia Explorer Travel.com</div>
            <img class="w-6 h-6" alt="" />
          </div>
        </div>
        <div class="flex items-center gap-[11px] flex-wrap">
          <div class="w-[220px] flex items-center justify-between gap-0">
            <div class="flex items-center gap-2">
              <img class="w-6 h-6" alt="" />
              <div class="leading-[130%] capitalize font-medium">Phone Number</div>
            </div>
            <div class="leading-[130%] capitalize font-medium">:</div>
          </div>
          <div class="leading-[160%] capitalize text-left break-words">+976 1234 5678</div>
        </div>
        <div class="flex items-center gap-[11px] flex-wrap">
          <div class="w-[220px] flex items-center justify-between gap-0">
            <div class="flex items-center gap-2">
              <img class="w-6 h-6" alt="" />
              <div class="leading-[130%] capitalize font-medium">Work email</div>
            </div>
            <div class="leading-[130%] capitalize font-medium">:</div>
          </div>
          <div class="leading-[160%] capitalize text-left break-words text-[#757575]">contact@techsolutions.com</div>
        </div>
        <div class="flex items-center gap-[11px] flex-wrap">
          <div class="w-[220px] flex items-center justify-between gap-0">
            <div class="flex items-center gap-2">
              <img class="w-6 h-6" alt="" />
              <div class="leading-[130%] capitalize font-medium">Location</div>
            </div>
            <div class="leading-[130%] capitalize font-medium">:</div>
          </div>
          <div class="leading-[160%] capitalize text-left break-words">Ulaanbaatar, Mongolia</div>
        </div>
        <div class="flex items-center gap-[11px] flex-wrap">
          <div class="w-[220px] flex items-center justify-between gap-0">
            <div class="flex items-center gap-2">
              <img class="w-6 h-6" alt="" />
              <div class="leading-[130%] capitalize font-medium">Annual Revenue</div>
            </div>
            <div class="leading-[130%] capitalize font-medium">:</div>
          </div>
          <div class="leading-[160%] capitalize text-left break-words text-[#757575]">$1M-$10M</div>
        </div>
        <div class="flex items-center gap-[11px] flex-wrap">
          <div class="w-[220px] flex items-center justify-between gap-0">
            <div class="flex items-center gap-2">
              <img class="w-6 h-6" alt="" />
              <div class="leading-[130%] capitalize font-medium">number of Employees</div>
            </div>
            <div class="leading-[130%] capitalize font-medium">:</div>
          </div>
          <div class="leading-[160%] capitalize text-left break-words text-[#424242]">10-20</div>
        </div>
        <div class="flex items-center gap-[11px] flex-wrap">
          <div class="w-[220px] flex items-center justify-between gap-0">
            <div class="flex items-center gap-2">
              <img class="w-6 h-6" alt="" />
              <div class="leading-[130%] capitalize font-medium">Industry</div>
            </div>
            <div class="leading-[130%] capitalize font-medium">:</div>
          </div>
          <div class="leading-[160%] capitalize text-left break-words text-[#424242]">Software development</div>
        </div>
        <div class="flex items-center gap-[11px] flex-wrap">
          <div class="w-[220px] flex items-center justify-between gap-0">
            <div class="flex items-center gap-2">
              <img class="w-6 h-6" alt="" />
              <div class="leading-[130%] capitalize font-medium">Company Category</div>
            </div>
            <div class="leading-[130%] capitalize font-medium">:</div>
          </div>
          <div class="leading-[160%] capitalize text-left break-words text-[#424242]">Technology</div>
        </div>
      </div>
    </div>
    <div class="flex-1 basis-[400px] max-w-[486px] shadow-[0px_4px_16px_rgba(158,158,158,0.24)] bg-white border border-[#eee] box-border min-h-[408px] flex flex-col items-center p-5 gap-[17px] text-left text-[24px] text-[#616161] min-w-[280px]">
      <div class="flex flex-col items-center gap-[17px]">
        <img class="w-[200px] rounded-[200px] object-cover" src="/profile.png" />
        <div class="flex flex-col items-center justify-center gap-[14px]">
          <div class="leading-[130%] capitalize font-semibold">Cameron Williamson</div>
          <div class="text-base leading-[130%] capitalize text-[#9e9e9e] text-center">CEO & Founder</div>
        </div>
      </div>
      <div class="text-base leading-[130%] capitalize font-medium text-center break-words">"I'm a dedicated agency owner passionate about delivering trusted services, building client relationships, and helping everyday users solve real-world problems with care and integrity"</div>
    </div>
  </div>
</template>

<style>
/* ✅ Responsive tweaks */
@media (max-width: 1024px) {
  .w-\[95\%\]\.relative\.flex\.items-start\.justify-center\.gap-6 {
    gap: 16px;
  }
  .flex-1\.basis-\[400px\]\.max-w-\[486px\] {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .w-\[95\%\]\.relative\.flex\.items-start\.justify-center\.gap-6 {
    flex-direction: column;
    align-items: stretch;
  }
  .flex-1\.basis-\[600px\]\.max-w-\[690px\],
  .flex-1\.basis-\[400px\]\.max-w-\[486px\] {
    max-width: 100%;
    width: 100%;
  }
  .w-\[200px\]\.rounded-\[200px\]\.object-cover {
    width: 150px;
  }
}

@media (max-width: 480px) {
  .w-\[95\%\]\.relative\.flex\.items-start\.justify-center\.gap-6 {
    gap: 12px;
  }
  .flex-1\.basis-\[600px\]\.max-w-\[690px\],
  .flex-1\.basis-\[400px\]\.max-w-\[486px\] {
    padding: 16px;
  }
  .leading-\[160\%\]\.capitalize\.font-semibold {
    font-size: 14px;
  }
  .leading-\[130\%\]\.capitalize\.font-medium {
    font-size: 14px;
  }
  .text-base\.leading-\[130\%\]\.capitalize\.font-medium {
    font-size: 14px;
  }
  .w-\[200px\]\.rounded-\[200px\]\.object-cover {
    width: 100px;
  }
}
</style>