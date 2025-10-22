<template>
  <div style="text-align: center;">
    <div style="display: flex; justify-content: center; gap: 0.5rem;">
      <div
        v-for="star in 5"
        :key="star"
        @click="rate(star)"
        :style="{
          width: props.boxSize + 'px',
          height: props.boxSize + 'px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: star <= props.modelValue
            ? `3px solid ${props.filledColor}`
            : `3px solid ${props.borderColor}`,
          borderRadius: '4px',
          cursor: props.readonly ? 'default' : 'pointer',
          transition: 'all 0.2s',
          backgroundColor: props.filledBg,
          pointerEvents: props.readonly ? 'none' : 'auto',
        }"
        :role="props.readonly ? undefined : 'button'"
        :tabindex="props.readonly ? -1 : 0"
        @keyup.enter="rate(star)"
        :aria-label="props.readonly ? undefined : `Rate ${star} star${star > 1 ? 's' : ''}`"
      >
        <Star
          :fill="star <= props.modelValue ? props.filledColor : 'none'"
          :style="{
            width: props.iconSize + 'px',
            height: props.iconSize + 'px',
            color: star <= props.modelValue ? props.filledColor : props.emptyColor,
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

const props = withDefaults(
  defineProps<{
    modelValue?: number;
    readonly?: boolean;
    boxSize?: number;
    iconSize?: number;
    filledBg?: string;
    filledColor?: string;
    emptyColor?: string;
    borderColor?: string;
  }>(),
  {
    modelValue: 0,
    readonly: false,
    boxSize: 60,
    iconSize: 36,
    filledBg: '#FFFFFF',
    filledColor: '#FBBF24',
    emptyColor: '#9CA3AF',
    borderColor: '#9CA3AF',
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

function rate(rating: number) {
  if (props.readonly) return;
  const newValue = props.modelValue === rating ? 0 : rating;
  emit('update:modelValue', newValue);
}
</script>
  
<style scoped>
</style>