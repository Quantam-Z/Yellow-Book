<template>
    <div style="text-align: center;">
      <div style="display: flex; justify-content: center; gap: 0.5rem;">
        <div
          v-for="star in 5"
          :key="star"
          @click="rate(star)"
          :style="{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #9CA3AF',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            backgroundColor: star <= modelValue ? '#FDE68A' : 'transparent',
          }"
          role="button"
          tabindex="0"
          @keyup.enter="rate(star)"
        >
          <Star
            :style="{
              width: '24px',
              height: '24px',
              color: star <= modelValue ? '#F59E0B' : '#D1D5DB',
              transition: 'transform 0.2s',
              transform: star <= modelValue ? 'scale(1.1)' : 'scale(1)',
            }"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Star } from 'lucide-vue-next';
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    modelValue: number;
  }>();
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
  }>();
  

  function rate(rating: number) {
    const newValue = props.modelValue === rating ? 0 : rating;
    emit('update:modelValue', newValue);
  }
  </script>
  
  <style scoped>
  </style>
  