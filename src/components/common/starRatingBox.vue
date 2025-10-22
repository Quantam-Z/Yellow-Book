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
          border: star <= modelValue ? `3px solid #FBBF24` : '3px solid #9CA3AF',
          borderRadius: '4px',
          cursor: readonly ? 'default' : 'pointer',
          transition: 'all 0.2s',
          backgroundColor: '#FFFFFF',
          pointerEvents: readonly ? 'none' : 'auto',
        }"
        :role="readonly ? undefined : 'button'"
        :tabindex="readonly ? -1 : 0"
        @keyup.enter="rate(star)"
      >
        <Star
          :fill="star <= modelValue ? '#FBBF24' : 'none'"
          :style="{
            width: iconSize + 'px',
            height: iconSize + 'px',
            color: star <= modelValue ? '#FBBF24' : '#9CA3AF',
            transition: 'all 0.2s',
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
  boxSize: 60,
  iconSize: 36,
  filledBg: '#FFFFFF',
  filledColor: '#FBBF24',
  emptyColor: '#FBBF24',
  borderColor: '#FBBF24',
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