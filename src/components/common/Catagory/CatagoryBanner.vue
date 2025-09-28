<template>
    <div :class="$style.heroSection">
      <img src="/logo/Cat.jpeg" :class="$style.heroImage" alt="Hero" />
    </div>
  </template>
  
  <style module>
  .heroSection {
    width: 100%;
    display: flex;
    justify-content: center; /* center horizontally */
    padding: 20px; /* padding on both sides */
    box-sizing: border-box;
  }
  
  .heroImage {
    max-width: 100%;
    height: auto; /* keeps natural height */
    border-radius: 12px; /* optional, remove if not needed */
    object-fit: contain;
  }
  </style>
  