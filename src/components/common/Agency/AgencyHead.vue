<template>
  <div :class="$style.frameParent">
    <!-- Back Button -->
    <div :class="$style.arrowAltLeftParent">
      <ArrowLeft :class="$style.arrowAltLeftIcon" />
      <div :class="$style.back">Back</div>
    </div>

    <!-- Breadcrumb -->
    <div :class="$style.frameGroup">
      <div :class="$style.categoryParent">
        <div :class="$style.category">Category</div>
        <ChevronRight :class="$style.arrowAltLeftIcon" />
      </div>
      <div :class="$style.categoryParent">
        <div :class="$style.category">Travel</div>
        <ChevronRight :class="$style.arrowAltLeftIcon" />
      </div>
      <div :class="$style.agencyProfileParent">
        <div :class="$style.category">Agency Profile</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft, ChevronRight } from "lucide-vue-next";
</script>

<style module>
.frameParent {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #000;
  font-family: 'Plus Jakarta Sans';
  padding: 8px 12px;
  box-sizing: border-box;
}

.arrowAltLeftParent {
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #bdbdbd;
  display: flex;
  align-items: center;
  padding: 6px 10px;
  gap: 6px;
  cursor: pointer;
  flex-shrink: 0;
}

.arrowAltLeftIcon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.back {
  line-height: 160%;
  text-transform: capitalize;
  font-weight: 500;
}

.frameGroup {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  color: #616161;
  min-width: 0;
}

.categoryParent {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}

.category {
  line-height: 160%;
  text-transform: capitalize;
  font-size: clamp(14px, 1.5vw, 16px);
}

.agencyProfileParent {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #28aed8;
  font-weight: 500;
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .frameParent {
    gap: 8px;
  }
  .arrowAltLeftParent {
    padding: 4px 8px;
  }
  .back {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .frameParent {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  .frameGroup {
    flex-wrap: wrap;
    gap: 4px;
  }
  .category {
    font-size: 14px;
  }
}
</style>
