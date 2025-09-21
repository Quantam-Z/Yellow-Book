<script setup lang="ts">
import { PawPrint, Sparkles, Utensils, Plane, Laptop, MoreHorizontal } from 'lucide-vue-next'
</script>

<template>
  <div :class="$style.categorysParent">
    <div :class="$style.categorys">Category's</div>
    <div :class="$style.frameParent">
      <div :class="$style.frameGroup">
        <div :class="$style.frameContainer">
          <PawPrint :class="$style.icon" />
          <div :class="$style.animalsPets">Animals & Pets</div>
        </div>
        <div :class="$style.frameContainer">
          <Sparkles :class="$style.icon" />
          <div :class="$style.animalsPets">Beauty & Well-beings</div>
        </div>
        <div :class="$style.categorysParentFrameParent">
          <Utensils :class="$style.icon" />
          <div :class="$style.animalsPets">Food & Beverage</div>
        </div>
      </div>

      <div :class="$style.frameParent2">
        <div :class="$style.frameContainer">
          <Plane :class="$style.icon" />
          <div :class="$style.animalsPets">Tourism & Hospitality</div>
        </div>
        <div :class="$style.frameContainer">
          <Laptop :class="$style.icon" />
          <div :class="$style.animalsPets">IT & Software</div>
        </div>
        <div :class="$style.frameParent5">
          <MoreHorizontal :class="$style.icon" />
          <div :class="$style.animalsPets">More</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.categorysParent {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  text-align: center;
  font-size: 30px;
  color: #212121;
  font-family: 'Plus Jakarta Sans';
}

.categorys {
  align-self: stretch;
  position: relative;
  line-height: 126%;
  text-transform: capitalize;
  font-weight: 600;
}

.frameParent {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  font-size: 20px;
  color: #757575;
}

.frameGroup {
  align-self: stretch;
  display: flex;
  align-items: center;
  gap: 24px;
}

.frameContainer {
  flex: 1;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 22px;
}

.animalsPets {
  align-self: stretch;
  position: relative;
  line-height: 130%;
  text-transform: capitalize;
  font-weight: 500;
}

.categorysParentFrameParent {
  flex: 1;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 22px;
  color: #212121;
}

.frameParent2 {
  align-self: stretch;
  display: flex;
  align-items: center;
  gap: 24px;
  color: #212121;
}

.frameParent5 {
  flex: 1;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 22px;
  color: #757575;
}

/* Icon styling */
.icon {
  width: 52px;
  height: 52px;
  color: #007bff;
}

/* Responsive Media Queries */
@media (max-width: 1200px) {
  .frameGroup,
  .frameParent2 {
    gap: 20px;
  }
  .frameContainer,
  .categorysParentFrameParent,
  .frameParent5 {
    height: 180px;
    padding: 18px;
    gap: 20px;
  }
}

@media (max-width: 992px) {
  .categorysParent {
    gap: 28px;
    font-size: 28px;
  }
  .frameParent {
    gap: 20px;
    font-size: 18px;
  }
  .frameGroup,
  .frameParent2 {
    gap: 16px;
  }
  .frameContainer,
  .categorysParentFrameParent,
  .frameParent5 {
    height: 160px;
    padding: 16px;
    gap: 18px;
  }
  .icon {
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 768px) {
  .categorysParent {
    gap: 24px;
    font-size: 24px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .frameParent {
    gap: 16px;
  }
  .frameGroup,
  .frameParent2 {
    flex-direction: column;
    gap: 16px;
  }
  .frameContainer,
  .categorysParentFrameParent,
  .frameParent5 {
    width: 100%;
    height: 140px;
    padding: 16px;
    gap: 16px;
  }
  .icon {
    width: 44px;
    height: 44px;
  }
}

@media (max-width: 576px) {
  .categorysParent {
    gap: 20px;
    font-size: 22px;
    padding: 0 15px;
  }
  .frameParent {
    font-size: 16px;
  }
  .frameGroup,
  .frameParent2 {
    gap: 12px;
  }
  .frameContainer,
  .categorysParentFrameParent,
  .frameParent5 {
    height: 120px;
    padding: 14px;
    gap: 14px;
  }
  .icon {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .categorysParent {
    gap: 18px;
    font-size: 20px;
    padding: 0 10px;
  }
  .frameParent {
    font-size: 15px;
  }
  .frameContainer,
  .categorysParentFrameParent,
  .frameParent5 {
    height: 110px;
    padding: 12px;
    gap: 12px;
  }
  .icon {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 360px) {
  .categorysParent {
    font-size: 18px;
  }
  .frameParent {
    font-size: 14px;
  }
  .frameContainer,
  .categorysParentFrameParent,
  .frameParent5 {
    height: 100px;
    padding: 10px;
    gap: 10px;
  }
  .icon {
    width: 32px;
    height: 32px;
  }
}
</style>
