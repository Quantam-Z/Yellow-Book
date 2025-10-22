<template>
  <div class="w-full min-h-screen bg-gray-50 p-4 sm:p-6 space-y-4 sm:space-y-6">
    <!-- Header Section -->
    <div class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 sm:p-4 md:p-6 mb-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Review Management</h1>
      </div>

      <!-- Search Bar -->
      <div class="w-full relative rounded-lg bg-white/80 backdrop-blur-sm flex items-center px-4 py-3 gap-3">
        <SearchIcon class="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
        <input
          type="text"
          v-model="searchQuery"
          @input="handleFilterChange"
          placeholder="Search Companies By Name Or Category"
          class="flex-1 outline-none border-none bg-transparent text-gray-700 placeholder-gray-400 text-base min-w-0 
                 focus:ring-0 focus:outline-none"
        />
      </div>
    </div>

    <div class="w-full relative flex items-center gap-4 text-left text-num-14 text-gray font-plus-jakarta-sans">
<div class="flex-1 rounded-num-8 bg-white border-whitesmoke border-solid border-[1px] flex items-center justify-center p-num-16 gap-4">
<img class="h-11 w-11 rounded-num-4" alt="" />
<div class="flex-1 flex flex-col items-start gap-4">
<div class="self-stretch relative leading-[130%] capitalize">Total Reviews</div>
<b class="self-stretch relative text-num-18 leading-[160%] capitalize">60</b>
</div>
</div>
<div class="flex-1 rounded-num-8 bg-white border-whitesmoke border-solid border-[1px] flex items-center justify-center p-num-16 gap-4">
<img class="h-11 w-11 rounded-num-4" alt="" />
<div class="flex-1 flex flex-col items-start gap-4">
<div class="self-stretch relative leading-[130%] capitalize">Pending</div>
<b class="self-stretch relative text-num-18 leading-[160%] capitalize">60</b>
</div>
</div>
<div class="flex-1 rounded-num-8 bg-white border-whitesmoke border-solid border-[1px] flex items-center justify-center p-num-16 gap-4">
<img class="h-11 w-11 rounded-num-4" alt="" />
<div class="flex-1 flex flex-col items-start gap-4">
<div class="self-stretch relative leading-[130%] capitalize"> Approved </div>
<b class="self-stretch relative text-num-18 leading-[160%] capitalize">60</b>
</div>
</div>
<div class="flex-1 rounded-num-8 bg-white border-whitesmoke border-solid border-[1px] flex items-center justify-center p-num-16 gap-4">
<img class="h-11 w-11 rounded-num-4" alt="" />
<div class="flex-1 flex flex-col items-start gap-4">
<div class="self-stretch relative leading-[130%] capitalize">Rejected</div>
<b class="self-stretch relative text-num-18 leading-[160%] capitalize">60</b>
</div>
</div>
<div class="flex-1 rounded-num-8 bg-white border-whitesmoke border-solid border-[1px] flex items-center justify-center p-num-16 gap-4">
<img class="h-11 w-11 rounded-num-4" alt="" />
<div class="flex-1 flex flex-col items-start gap-4">
<div class="self-stretch relative leading-[130%] capitalize">On Hold</div>
<b class="self-stretch relative text-num-18 leading-[160%] capitalize">60</b>
</div>
</div>
<div class="flex-1 rounded-num-8 bg-white border-whitesmoke border-solid border-[1px] flex items-center justify-center p-num-16 gap-4">
<img class="h-11 w-11 rounded-num-4" alt="" />
<div class="flex-1 flex flex-col items-start gap-4">
<div class="self-stretch relative leading-[130%] capitalize">Banned Users</div>
<b class="self-stretch relative text-num-18 leading-[160%] capitalize">60</b>
</div>
</div>
</div>


<div class="w-full relative flex items-center justify-between gap-5 text-left text-[18px] text-gray-300 font-plus-jakarta-sans">
<b class="relative leading-[160%] capitalize whitespace-pre-wrap">All Review List</b>
<div class="flex items-center gap-2 text-num-14 text-dimgray">
<div class="flex items-center gap-2 text-silver">
<div class="h-12 rounded-num-12 bg-gray-100 border-whitesmoke border-solid border-[1px] box-border flex items-center py-num-0 pl-num-16 pr-num-5 gap-2">
<div class="flex items-center gap-1">
<div class="relative leading-[130%] capitalize">From:</div>
<div class="relative leading-[130%] capitalize font-semibold text-gray-200">09-10-2025</div>
</div>
<img class="h-num-37 w-[37px] rounded-num-7" alt="" />
</div>
<div class="h-12 rounded-num-12 bg-gray-100 border-whitesmoke border-solid border-[1px] box-border flex items-center py-num-0 pl-num-16 pr-num-5 gap-2">
<div class="flex items-center gap-1">
<div class="relative leading-[130%] capitalize">To</div>
<div class="relative leading-[130%] capitalize font-semibold text-gray-200">09-10-2025</div>
</div>
<img class="h-num-37 w-[37px] rounded-num-7" alt="" />
</div>
</div>
<div class="h-12 w-[199px] rounded-num-12 bg-gray-100 border-whitesmoke border-solid border-[1px] box-border flex items-center py-num-0 pl-num-16 pr-num-5 gap-4">
<div class="flex-1 relative leading-[130%] capitalize font-medium">Today</div>
<img class="h-num-37 w-[37px] rounded-num-7" alt="" />
</div>
<div class="h-12 w-[199px] rounded-num-12 bg-gray-100 border-whitesmoke border-solid border-[1px] box-border flex items-center py-num-0 pl-num-16 pr-num-5 gap-4">
<div class="flex-1 relative leading-[130%] capitalize font-medium">Select Rating</div>
<img class="h-num-37 w-[37px] rounded-num-7" alt="" />
</div>
<div class="h-12 w-[199px] rounded-num-12 bg-gray-100 border-whitesmoke border-solid border-[1px] box-border flex items-center py-num-0 pl-num-16 pr-num-5 gap-4">
<div class="flex-1 relative leading-[130%] capitalize font-medium">Status</div>
<img class="h-num-37 w-[37px] rounded-num-7" alt="" />
</div>
</div>
</div>

<div class="w-full h-11 relative rounded bg-gray" />
<div class="w-full relative flex flex-col items-start text-center text-num-14 text-gray font-plus-jakarta-sans">
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[19px] w-[1197px] h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">01</div>
<div class="absolute top-[0px] left-[311px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[522px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[702px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1055px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[57px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[958px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1141px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[18px] w-num-1198 h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">02</div>
<div class="absolute top-[0px] left-[312px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[523px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[703px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1051px] leading-[130%] capitalize text-forestgreen">Approved</div>
<div class="absolute top-[11px] left-[58px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[959px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1142px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[18px] w-num-1198 h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">03</div>
<div class="absolute top-[0px] left-[312px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[523px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[703px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1054px] leading-[130%] capitalize text-firebrick">Rejected</div>
<div class="absolute top-[11px] left-[58px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[959px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1142px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[17px] w-[1199px] h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">04</div>
<div class="absolute top-[0px] left-[313px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[524px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[704px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1055px] leading-[130%] capitalize text-deepskyblue">On-Hold</div>
<div class="absolute top-[11px] left-[59px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[960px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1143px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[18px] w-num-1198 h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">05</div>
<div class="absolute top-[0px] left-[312px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[523px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[703px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1056px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[58px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[959px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1142px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[18px] w-num-1198 h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">06</div>
<div class="absolute top-[0px] left-[312px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[523px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[703px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1056px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[58px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[959px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1142px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[18px] w-num-1198 h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">07</div>
<div class="absolute top-[0px] left-[312px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[523px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[703px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1056px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[58px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[959px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1142px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[17px] w-[1199px] h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">08</div>
<div class="absolute top-[0px] left-[313px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[524px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[704px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1057px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[59px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[960px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1143px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[18px] w-num-1198 h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">09</div>
<div class="absolute top-[0px] left-[312px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[523px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[703px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1056px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[58px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[959px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1142px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[19px] w-[1197px] h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">10</div>
<div class="absolute top-[0px] left-[311px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[522px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[702px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1055px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[57px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[958px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1141px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[22px] w-[1194px] h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">11</div>
<div class="absolute top-[0px] left-[308px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[519px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[699px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1052px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[54px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[955px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1138px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[20px] w-num-1196 h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">12</div>
<div class="absolute top-[0px] left-[310px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[521px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[701px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1054px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[56px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[957px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1140px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[20px] w-num-1196 h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">13</div>
<div class="absolute top-[0px] left-[310px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[521px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[701px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1054px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[56px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[957px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1140px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[20px] w-num-1196 h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">14</div>
<div class="absolute top-[0px] left-[310px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[521px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[701px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1054px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[56px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[957px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1140px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[20px] w-num-1196 h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">15</div>
<div class="absolute top-[0px] left-[310px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[521px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[701px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1054px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[56px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[957px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1140px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[20px] w-num-1196 h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">16</div>
<div class="absolute top-[0px] left-[310px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[521px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[701px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1054px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[56px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[957px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1140px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[21px] w-[1195px] h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">17</div>
<div class="absolute top-[0px] left-[309px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[520px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[700px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1053px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[55px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[956px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1139px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[20px] w-num-1196 h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">18</div>
<div class="absolute top-[0px] left-[310px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[521px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[701px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1054px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[56px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[957px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1140px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[20px] w-num-1196 h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">19</div>
<div class="absolute top-[0px] left-[310px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[521px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[701px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1054px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[56px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[957px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1140px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
<div class="w-num-1232 h-11 relative">
<div class="absolute top-[0px] left-[0px] rounded-num-4 border-whitesmoke border-solid border-b-[1px] box-border w-num-1232 h-11" />
<div class="absolute top-[6px] left-[18px] w-num-1198 h-8">
<div class="absolute top-[11px] left-[0px] leading-[130%] capitalize">20</div>
<div class="absolute top-[0px] left-[312px] flex items-center gap-4 text-darkslategray">
<img class="w-8 relative rounded-num-50 max-h-full object-cover" alt="" />
<div class="relative leading-[130%] capitalize">robat boss</div>
</div>
<div class="absolute top-[11px] left-[523px] leading-[130%] capitalize font-medium text-gold">Bluegrass Hemp Oil</div>
<div class="absolute top-[11px] left-[703px] leading-[130%] capitalize">Great experience working with ...</div>
<div class="absolute top-[11px] left-[1056px] leading-[130%] capitalize text-gold">Pending</div>
<div class="absolute top-[11px] left-[58px] leading-[130%] capitalize">12-june-2025 | 10:30 PM</div>
<div class="absolute top-[4px] left-[959px] flex items-center gap-1 text-darkslategray">
<img class="h-6 w-6 relative" alt="" />
<div class="relative leading-[130%] capitalize">5 Star</div>
</div>
<div class="absolute top-[4px] left-[1142px] flex items-center gap-2">
<img class="h-6 w-6 relative" alt="" />
<img class="h-6 w-6 relative" alt="" />
</div>
</div>
</div>
</div>


  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Pencil, CheckCircle, Trash2, Filter, Plus } from 'lucide-vue-next'
import RatingStars from '~/components/common/ratingStars.vue'

const reviews = ref([])
const selectedRating = ref('')
const currentPage = ref(1)
const reviewsPerPage = 10
const dateFrom = ref('')
const dateTo = ref('')

// Load reviews from stubs
const { data: reviewsData } = await useFetch('/stubs/agencyReviews.json')

// Format date
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Get initials
const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

// Computed
const overallRating = computed(() => {
  if (!reviews.value.length) return 0
  const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

const totalReviews = computed(() => reviews.value.length)

const filteredReviews = computed(() => {
  let filtered = reviews.value

  if (selectedRating.value) {
    filtered = filtered.filter(r => r.rating === parseInt(selectedRating.value))
  }

  if (dateFrom.value) {
    filtered = filtered.filter(r => new Date(r.date) >= new Date(dateFrom.value))
  }
  if (dateTo.value) {
    filtered = filtered.filter(r => new Date(r.date) <= new Date(dateTo.value))
  }

  return filtered.slice(0, currentPage.value * reviewsPerPage)
})

const hasMoreReviews = computed(() => {
  let filtered = reviews.value
  if (selectedRating.value) {
    filtered = filtered.filter(r => r.rating === parseInt(selectedRating.value))
  }
  return filteredReviews.value.length < filtered.length
})

// Methods
const applyFilters = () => { 
  currentPage.value = 1 
}

const resetFilters = () => {
  selectedRating.value = ''
  dateFrom.value = ''
  dateTo.value = ''
  currentPage.value = 1
}

const approveReview = (id) => { 
}

const deleteReview = (id) => { 
  reviews.value = reviews.value.filter(r => r.id !== id) 
}

const loadMoreReviews = () => { 
  currentPage.value++ 
}

// Init
onMounted(() => { 
  reviews.value = reviewsData.value || [] 
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Improve mobile touch targets */
@media (max-width: 640px) {
  button, select, input {
    min-height: 44px;
  }
}
</style>