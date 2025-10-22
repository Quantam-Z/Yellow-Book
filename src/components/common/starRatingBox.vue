<template>
  <div style="text-align: center;">
    <div style="display: flex; justify-content: center; gap: 0.5rem;">
      <div
        v-for="star in 5"
        :key="star"
        @click="rate(star)"
        :style="{
          width: boxSize + 'px',
          height: boxSize + 'px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${borderColor}`,
          borderRadius: '0.375rem',
          cursor: readonly ? 'default' : 'pointer',
          transition: 'all 0.2s',
          backgroundColor: star <= modelValue ? filledBg : 'transparent',
          pointerEvents: readonly ? 'none' : 'auto',
        }"
        :role="readonly ? undefined : 'button'"
        :tabindex="readonly ? -1 : 0"
        @keyup.enter="rate(star)"
      >
        <Star
          :style="{
            width: iconSize + 'px',
            height: iconSize + 'px',
            color: star <= modelValue ? filledColor : emptyColor,
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
import { withDefaults, defineProps, defineEmits } from 'vue';

const props = withDefaults(defineProps<{
  modelValue: number;
  readonly?: boolean;
  boxSize?: number;
  iconSize?: number;
  filledBg?: string;
  filledColor?: string;
  emptyColor?: string;
  borderColor?: string;
}>(), {
  readonly: false,
  boxSize: 40,
  iconSize: 24,
  filledBg: '#FDE68A',
  filledColor: '#F59E0B',
  emptyColor: '#D1D5DB',
  borderColor: '#9CA3AF',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const { readonly, boxSize, iconSize, filledBg, filledColor, emptyColor, borderColor, modelValue } = props;

function rate(rating: number) {
  if (readonly) return;
  const newValue = modelValue === rating ? 0 : rating;
  emit('update:modelValue', newValue);
}
</script>
  
  <style scoped>
  </style>
  