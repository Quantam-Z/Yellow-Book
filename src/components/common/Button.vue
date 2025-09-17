<template>
    <button class="btn">
      <slot></slot>
    </button>
  </template>
  
  <style scoped>
  .btn {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  