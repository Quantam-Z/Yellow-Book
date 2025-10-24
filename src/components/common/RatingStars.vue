<script setup lang="ts">
import { computed, withDefaults, defineProps } from 'vue';

const props = withDefaults(defineProps<{
  // Legacy API support
  value?: number;
  sizeClass?: string;
  filledClass?: string;
  emptyClass?: string;
  // New API
  rating?: number; // value between 0 and max (supports fractions)
  max?: number; // total stars
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string; // filled color
  emptyColor?: string; // empty star color
  strokeColor?: string; // outline color for filled
  gap?: number; // gap in px between stars
  showValue?: boolean; // show numeric value
  valueDigits?: number; // digits after decimal
  showCount?: boolean; // show (n reviews)
  count?: number; // review count
  align?: 'left' | 'center' | 'right';
  ariaLabel?: string;
}>(), {
  // Legacy defaults
  value: 0,
  sizeClass: 'w-4 h-4',
  filledClass: 'text-yellow-400 fill-yellow-400',
  emptyClass: 'text-gray-300',
  // New defaults
  rating: undefined,
  max: 5,
  size: 'md',
  color: '#ffc107',
  emptyColor: '#e0e0e0',
  strokeColor: '#ffc107',
  gap: 4,
  showValue: true,
  valueDigits: 1,
  showCount: false,
  count: 0,
  align: 'left',
  ariaLabel: 'rating'
});

const effectiveRating = computed(() => {
  const raw = props.rating ?? props.value ?? 0;
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
});

const clampedRating = computed(() => {
  const r = effectiveRating.value;
  const max = Number(props.max || 5);
  return Math.max(0, Math.min(max, r));
});

function computeStarPx(): number {
  switch (props.size) {
    case 'xs': return 12;
    case 'sm': return 16;
    case 'md': return 20;
    case 'lg': return 24;
  }
  // Fallback: try parse from legacy sizeClass like 'w-3 h-3'
  const match = (props.sizeClass || '').match(/w-(\d+)/);
  if (match) {
    const n = Number(match[1]);
    if (n === 3) return 12;
    if (n === 4) return 16;
    if (n === 5) return 20;
    if (n === 6) return 24;
    if (n === 7) return 28;
    if (n === 8) return 32;
  }
  return 20;
}

const starPx = computed(() => computeStarPx());

function fillPercentForIndex(index: number): number {
  const value = clampedRating.value;
  const full = Math.floor(value);
  if (index < full) return 100;
  if (index > full) return 0;
  const frac = value - full;
  return Math.round(frac * 100);
}
</script>

<template>
  <div
    class="inline-flex items-center select-none"
    :style="{ gap: `${gap}px`, justifyContent: align === 'center' ? 'center' : (align === 'right' ? 'flex-end' : 'flex-start') }"
    role="img"
    :aria-label="`${ariaLabel}: ${clampedRating.toFixed(valueDigits)} out of ${max}${showCount && count ? `, based on ${count} reviews` : ''}`"
  >
    <div class="flex items-center" :style="{ gap: `${gap}px` }">
      <div v-for="n in max" :key="n" class="relative" :style="{ width: `${starPx}px`, height: `${starPx}px` }" aria-hidden="true">
        <!-- Empty/base star -->
        <svg :width="starPx" :height="starPx" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            :fill="emptyColor"
            :stroke="emptyColor"
            stroke-width="1"
            fill-opacity="0.35"
          />
        </svg>
        <!-- Filled overlay with width mask -->
        <div class="absolute inset-0 overflow-hidden" :style="{ width: `${fillPercentForIndex(n-1)}%` }">
          <svg :width="starPx" :height="starPx" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              :fill="color"
              :stroke="strokeColor"
              stroke-width="1"
            />
          </svg>
        </div>
      </div>
    </div>
    <div v-if="showValue || showCount" class="flex items-center" :style="{ gap: `${Math.max(4, gap)}px` }">
      <span v-if="showValue" class="font-semibold text-[#212121]" :style="{ fontSize: `${Math.round(starPx * 0.9)}px`, lineHeight: 1 }">{{ clampedRating.toFixed(valueDigits) }}</span>
      <span v-if="showCount" class="text-gray-500" :style="{ fontSize: `${Math.round(starPx * 0.7)}px`, lineHeight: 1 }">({{ count }} reviews)</span>
    </div>
  </div>
</template>

<style scoped>
</style>
